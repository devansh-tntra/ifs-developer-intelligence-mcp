# Installation & Setup Guide for IFS Developer Intelligence MCP Server

This guide provides step-by-step instructions to configure and connect the IFS MCP Server to Claude Desktop, Cursor, VS Code, Windsurf, ChatGPT, and Docker.

---

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **Git**

---

## 🛠️ Step 1: Clone & Install Dependencies

```bash
git clone <repository-url>
cd d:/MCP_IFS
npm install
```

---

## 🏗️ Step 2: Build the TypeScript Server

```bash
npm run build
```
This compiles the server into `./dist/index.js`.

---

## 🔗 Step 3: Connect Client Applications

### A. Claude Desktop

1. Locate your Claude Desktop configuration file:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Add the following entry:
```json
{
  "mcpServers": {
    "ifs-developer-intelligence": {
      "command": "node",
      "args": ["d:/MCP_IFS/dist/index.js"],
      "env": {
        "IFS_DOCS_VERSION": "26R1",
        "IFS_WORKSPACE_PATH": "d:/Project/clauger/clauger"
      }
    }
  }
}
```
3. Restart Claude Desktop.

---

### B. Cursor IDE

1. Open Cursor Settings -> MCP Servers -> Add new MCP Server.
2. Name: `ifs-developer-intelligence`
3. Type: `command`
4. Command: `node d:/MCP_IFS/dist/index.js`

---

### C. ChatGPT Custom Actions (Web / Remote Connection)

1. Launch the MCP Server in SSE/HTTP mode:
```bash
npm run start:sse
```
2. In ChatGPT -> Create a Custom GPT -> Actions -> Import from Schema.
3. Paste the contents of `clients/chatgpt_actions_openapi.json`.
4. Point server URL to `http://localhost:3000/api` (or exposed ngrok/tunnel URL).

---

## 🐳 Step 4: Docker Container Deployment

```bash
docker-compose up -d --build
```
Server will be available at `http://localhost:3000/sse`.
