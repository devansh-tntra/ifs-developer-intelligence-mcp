# IFS Engineering Copilot - Client Setup Guide & Web Search Prevention

This guide explains how to connect your **IFS Engineering Copilot Platform** to **ChatGPT**, **Claude Desktop**, **Cursor IDE**, **VS Code**, and **Windsurf**, and how to **disable generic Bing web searches in ChatGPT**.

---

## 🌐 Live Cloud Server Endpoints (100% Zero-Local Setup)

- **Cloud SSE Endpoint**: `https://ifs-mcp-server.onrender.com/sse`
- **Cloud Telemetry Endpoint**: `https://ifs-mcp-server.onrender.com/metrics`
- **Cloud Health Endpoint**: `https://ifs-mcp-server.onrender.com/health`
- **OpenAPI 3.1.0 Schema**: `https://ifs-mcp-server.onrender.com/openapi.json`

---

## 🛑 How to Fix ChatGPT Searching Generic Web Sites (WordPress, SAP, Qlik)

If ChatGPT is showing web search results from unrelated sites like WordPress, SAP, or Qlik (as seen in your screenshot), follow these **2 quick steps** in ChatGPT:

### Step 1: Update ChatGPT Custom GPT Instructions
1. Open **ChatGPT** -> **Explore GPTs** -> Find your **IFS Developer Assistant** -> Click **Edit GPT**.
2. In the **Instructions** text box, paste the updated text from `prompts/master_system_prompt.md` (which includes the **STRICT KNOWLEDGE SEARCH DIRECTIVE**).

### Step 2: Disable / Uncheck Web Search Capability in ChatGPT
1. In the **Configure** tab of your Custom GPT, look at the **Capabilities** section.
2. **Uncheck / Turn off "Web Search / Web Browsing"**.
3. Ensure **"Actions"** remains enabled.
4. Click **Save / Update** (top right).

> **Result**: ChatGPT will now **ONLY** use your connected IFS MCP Actions (`search_docs`, `copilot_orchestrated_query`, `compare_version_docs`) to search official IFS Cloud Documentation (`docs.ifs.com`), IFS Academy, and IFS Community!

---

## 🤖 1. ChatGPT (Web Actions / Custom GPTs Setup)

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
