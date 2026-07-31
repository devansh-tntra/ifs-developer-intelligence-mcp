import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
export const config = {
    docsUrl: process.env.IFS_DOCS_URL || 'https://docs.ifs.com/techdocs/',
    docsVersion: process.env.IFS_DOCS_VERSION || '26R1',
    workspacePath: process.env.IFS_WORKSPACE_PATH || process.cwd(),
    port: parseInt(process.env.PORT || '3000', 10),
    transport: process.env.MCP_TRANSPORT || 'stdio',
    logLevel: process.env.LOG_LEVEL || 'info',
    openAiApiKey: process.env.OPENAI_API_KEY,
    dataDir: path.resolve(process.cwd(), '.data'),
};
//# sourceMappingURL=environment.js.map