@echo off
title IFS Developer Intelligence MCP Server (SSE Mode)
set PATH=C:\Users\DELL\AppData\Local\OpenAI\Codex\runtimes\cua_node\f8d2abcb7481383b\bin;%PATH%
cd /d d:\MCP_IFS
echo Starting IFS Developer Intelligence MCP Server on http://localhost:3000/sse ...
node dist/index.js --transport sse
pause
