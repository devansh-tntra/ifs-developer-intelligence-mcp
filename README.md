# IFS Developer Intelligence MCP Server

An enterprise-grade Model Context Protocol (MCP) server transforming official IFS Cloud Technical Documentation (`docs.ifs.com`), local workspace code (`*.entity`, `*.projection`, `*.client`, `*.plsql`), and Oracle error knowledge into an AI-powered senior development intelligence platform.

---

## 🌟 Key Features

- **60+ Specialized MCP Tools**: Tools across Documentation, Code Generation, Code Review, Error Diagnosis, Deployment, Security, Integrations, Reporting, Marble DSL, Developer Studio, Database Schema, Git, and Local Workspace Knowledge.
- **Hybrid RAG Pipeline**: Keyword BM25 + Dense Vector TF-IDF Cosine Similarity + Reciprocal Rank Fusion (RRF).
- **Oracle & IFS Error Knowledge Base**: Root cause diagnosis and step-by-step remediation for ORA-*, PLS-*, and IFS `Error_SYS` exceptions.
- **Marble DSL & PL/SQL Generators**: Instant generation of complete `.entity`, `.projection`, `.client`, `.page`, PL/SQL package headers (`*.api`) and bodies (`*.apy`).
- **Multi-Client Support**: Seamless connectivity with **Claude Desktop**, **Cursor**, **VS Code**, **Windsurf**, **ChatGPT (SSE / Custom Actions)**, **Codex**, and **Gemini CLI**.

---

## 🚀 Quick Start

### 1. Build Server
```bash
npm install
npm run build
```

### 2. Run via STDIO (For Claude Desktop, Cursor, VS Code)
```bash
npm start
```

### 3. Run via HTTP / SSE (For ChatGPT Actions & Web Clients)
```bash
npm run start:sse
# SSE Endpoint: http://localhost:3000/sse
# REST API Endpoint: http://localhost:3000/api/tools
```

---

## ⚙️ Client Configurations

Pre-built client configs are available in `clients/`:

- **Claude Desktop**: Copy `clients/claude_desktop_config.json` into `%APPDATA%\Claude\claude_desktop_config.json`
- **Cursor**: Copy `clients/cursor_mcp.json` into `.cursor/mcp.json`
- **VS Code**: Copy `clients/vscode_mcp.json` into `.vscode/mcp.json`
- **Windsurf**: Copy `clients/windsurf_mcp.json` into `.windsurf/mcp.json`
- **ChatGPT Actions**: Import `clients/chatgpt_actions_openapi.json` as a Custom Action OpenAPI schema.

---

## 🧪 Testing

```bash
npm test
```

---

## 🛡️ License

MIT License. Developed for IFS Enterprise Development & AI Engineering.
