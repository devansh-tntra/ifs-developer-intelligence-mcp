import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { ALL_MCP_TOOLS } from './tools/index.js';
import { config } from './config/environment.js';
import { indexWorkspaceDirectory } from './indexer/workspaceIndexer.js';
import { telemetryEngine } from './engine/telemetryEngine.js';
export async function createMcpServer() {
    const server = new Server({
        name: 'IFS Developer Intelligence MCP Server',
        version: '1.0.0'
    }, {
        capabilities: {
            tools: {}
        }
    });
    // Index project root (including resources/) and user workspace directory
    const rootDir = process.cwd();
    console.error(`[IFS-MCP] Indexing project resources & models at: ${rootDir}`);
    indexWorkspaceDirectory(rootDir).then(count => {
        console.error(`[IFS-MCP] Indexed ${count} project resources & model files.`);
    });
    if (config.workspacePath && path.resolve(config.workspacePath) !== path.resolve(rootDir)) {
        console.error(`[IFS-MCP] Indexing custom local workspace at: ${config.workspacePath}`);
        indexWorkspaceDirectory(config.workspacePath).then(count => {
            console.error(`[IFS-MCP] Indexed ${count} custom workspace files.`);
        });
    }
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        telemetryEngine.recordRequest();
        return {
            tools: ALL_MCP_TOOLS.map(t => {
                const shape = {};
                const zodShape = t.parameters.shape;
                for (const key in zodShape) {
                    shape[key] = {
                        type: 'string',
                        description: zodShape[key].description || ''
                    };
                }
                return {
                    name: t.name,
                    description: t.description,
                    inputSchema: {
                        type: 'object',
                        properties: shape,
                        required: Object.keys(shape)
                    }
                };
            })
        };
    });
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const name = request.params.name;
        const tool = ALL_MCP_TOOLS.find(t => t.name === name);
        const startMs = Date.now();
        telemetryEngine.recordRequest();
        if (!tool) {
            telemetryEngine.recordToolExecution(name, Date.now() - startMs, false);
            throw new Error(`Unknown MCP Tool: ${name}`);
        }
        try {
            const args = request.params.arguments || {};
            const result = await tool.execute(args);
            telemetryEngine.recordToolExecution(name, Date.now() - startMs, true);
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(result, null, 2)
                    }
                ]
            };
        }
        catch (err) {
            telemetryEngine.recordToolExecution(name, Date.now() - startMs, false);
            return {
                isError: true,
                content: [
                    {
                        type: 'text',
                        text: `Tool Execution Error [${name}]: ${err.message}`
                    }
                ]
            };
        }
    });
    return server;
}
export async function startStdioServer() {
    const server = await createMcpServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('[IFS-MCP] IFS Developer Intelligence MCP Server running via STDIO transport.');
}
export async function startSseServer() {
    const app = express();
    app.use(cors());
    app.use(express.json({ limit: '2mb' }));
    // Middleware telemetry tracking
    app.use((req, res, next) => {
        telemetryEngine.recordRequest();
        next();
    });
    // Health check endpoint
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
    });
    // Enterprise Telemetry Metrics endpoint
    app.get('/metrics', (req, res) => {
        res.status(200).json(telemetryEngine.getMetrics());
    });
    app.get('/api/metrics', (req, res) => {
        res.status(200).json(telemetryEngine.getMetrics());
    });
    // Serve OpenAPI 3.1.0 Schema for ChatGPT Actions
    app.get('/openapi.json', (req, res) => {
        const schemaPath = path.resolve(process.cwd(), 'clients', 'chatgpt_actions_openapi.json');
        if (fs.existsSync(schemaPath)) {
            res.sendFile(schemaPath);
        }
        else {
            res.status(404).json({ error: 'OpenAPI Schema not found' });
        }
    });
    const server = await createMcpServer();
    let sseTransport = null;
    app.get('/sse', async (req, res) => {
        sseTransport = new SSEServerTransport('/message', res);
        await server.connect(sseTransport);
    });
    app.post('/message', async (req, res) => {
        if (sseTransport) {
            await sseTransport.handlePostMessage(req, res);
        }
        else {
            res.status(400).send('SSE Connection not established.');
        }
    });
    app.get('/', (req, res) => {
        res.send('<h1>IFS Developer Intelligence MCP Server</h1><p>Status: Active (Render Production)</p><p><a href="/health">Health</a> | <a href="/metrics">Telemetry Metrics</a> | <a href="/openapi.json">OpenAPI Schema</a> | <a href="/api/tools">Tools JSON</a></p>');
    });
    app.get('/api/tools', async (req, res) => {
        res.json({
            tools: ALL_MCP_TOOLS.map(t => ({ name: t.name, description: t.description }))
        });
    });
    app.post('/api/tools/:name', async (req, res) => {
        const startMs = Date.now();
        const tool = ALL_MCP_TOOLS.find(t => t.name === req.params.name);
        if (!tool) {
            telemetryEngine.recordToolExecution(req.params.name, Date.now() - startMs, false);
            return res.status(404).json({ error: 'Tool not found' });
        }
        try {
            const result = await tool.execute(req.body);
            telemetryEngine.recordToolExecution(req.params.name, Date.now() - startMs, true);
            res.json(result);
        }
        catch (err) {
            telemetryEngine.recordToolExecution(req.params.name, Date.now() - startMs, false);
            res.status(500).json({ error: err.message });
        }
    });
    const startListening = (port) => {
        const httpServer = app.listen(port, () => {
            console.log(`[IFS-MCP] IFS Developer Intelligence Server running on HTTP/SSE port ${port}`);
            console.log(`[IFS-MCP] Health Check Endpoint: http://localhost:${port}/health`);
            console.log(`[IFS-MCP] OpenAPI Schema Endpoint: http://localhost:${port}/openapi.json`);
            console.log(`[IFS-MCP] Telemetry Endpoint: http://localhost:${port}/metrics`);
            console.log(`[IFS-MCP] SSE Endpoint: http://localhost:${port}/sse`);
        });
        httpServer.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.warn(`[IFS-MCP] Port ${port} is in use, trying port ${port + 1}...`);
                startListening(port + 1);
            }
            else {
                console.error('Server error:', err);
            }
        });
    };
    startListening(config.port);
}
//# sourceMappingURL=server.js.map