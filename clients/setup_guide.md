# IFS Engineering Copilot - Client Setup Guide

This guide explains how to connect your **IFS Engineering Copilot Platform** to **ChatGPT**, **Claude Desktop**, **Cursor IDE**, **VS Code**, and **Windsurf**.

---

## 🌐 Live Cloud Server Endpoint (100% Zero-Local Setup)

- **Cloud SSE Endpoint**: `https://ifs-mcp-server.onrender.com/sse`
- **Cloud Health Endpoint**: `https://ifs-mcp-server.onrender.com/health`
- **OpenAPI 3.1.0 Schema**: `https://ifs-mcp-server.onrender.com/openapi.json`

---

## 🤖 1. ChatGPT (Web Actions / Custom GPTs)

1. Open **ChatGPT** -> **Explore GPTs** -> **Create / Edit GPT**.
2. Go to **Configure** -> **Actions** -> **Import from URL**.
3. Paste: `https://ifs-mcp-server.onrender.com/openapi.json`
4. Click **Import**.
5. Copy the contents of `prompts/master_system_prompt.md` into the **Instructions** text area.
6. Save and publish.

---

## 🧠 2. Claude Desktop

1. Open `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac).
2. Paste:
```json
{
  "mcpServers": {
    "ifs-developer-intelligence": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://ifs-mcp-server.onrender.com/sse"
      ]
    }
  }
}
```
3. Restart Claude Desktop.

---

## 🎯 3. Cursor IDE

1. Go to **Cursor Settings** -> **MCP**.
2. Click **Add new MCP Server**:
   - **Name**: `ifs-developer-intelligence`
   - **Type**: `command`
   - **Command**: `npx -y mcp-remote https://ifs-mcp-server.onrender.com/sse`

---

## 💻 4. VS Code (GitHub Copilot / Roo Code / Cline)

1. Open VS Code Settings -> search `MCP Servers` or edit `.vscode/mcp.json`:
```json
{
  "mcpServers": {
    "ifs-developer-intelligence": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://ifs-mcp-server.onrender.com/sse"
      ]
    }
  }
}
```

---

## 🌊 5. Windsurf IDE

1. Open `~/.codeium/windsurf/mcp_config.json`:
```json
{
  "mcpServers": {
    "ifs-developer-intelligence": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://ifs-mcp-server.onrender.com/sse"
      ]
    }
  }
}
```
