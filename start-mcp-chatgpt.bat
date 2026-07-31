@echo off
title IFS Developer Intelligence MCP Server (ChatGPT HTTPS Tunnel)
set PATH=C:\Users\DELL\AppData\Local\OpenAI\Codex\runtimes\cua_node\f8d2abcb7481383b\bin;%PATH%
cd /d d:\MCP_IFS
echo Starting IFS Server & HTTPS Tunnel for ChatGPT...
start node dist/index.js --transport sse
npx localtunnel --port 3000
