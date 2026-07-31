# IFS Engineering Copilot Enterprise vNext

[![Render Status](https://img.shields.io/badge/Render-Active%2024%2F7-brightgreen)](https://ifs-mcp-server.onrender.com/health)
[![IFS Cloud Versions](https://img.shields.io/badge/IFS%20Cloud-23R2%20%7C%2024R1%20%7C%2024R2%20%7C%2025R1%20%7C%2025R2%20%7C%2026R1-blue)](https://docs.ifs.com/techdocs/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-grade, multi-agent AI engineering platform transforming official IFS Cloud Technical Documentation (`docs.ifs.com`), IFS Academy Resource Portal (`resourceportal.ifsacademyworld.com`), IFS Community Forum (`community.ifs.com`), local workspace models (`*.entity`, `*.projection`, `*.client`, `*.plsql`), and Oracle DBA knowledge into a senior-level Engineering Copilot for IFS Cloud development.

---

## 🚀 Key Architectural Capabilities (vNext Release)

### 1. Multi-Agent Request Orchestrator
- **Virtual Agent Dispatcher**: Coordinates specialized Virtual Agents (*Documentation Agent*, *Workspace Agent*, *PL/SQL Agent*, *Marble Agent*, *DBA Agent*, *Security Agent*, *Impact Analysis Agent*, *Quality Gate Agent*).
- **Evidence Synthesis**: Combines agent findings into a single, evidence-backed response.

### 2. Consensus & Evidence Comparison Engine
- Cross-references evidence across **Official TechDocs**, **IFS Academy**, **IFS Community**, **Oracle KB**, and **Local Workspace**.
- Detects conflicting context and enforces multi-source evidence verification.

### 3. Confidence Engine
- Computes **Confidence Score %** (0% - 100%), **Quality Grade (A+ to D)**, and evidence diversity metrics.
- Flags missing context indicators to eliminate AI hallucinations.

### 4. Deep Root Cause Tracing Engine
- Recursive backtrace engine: `ORA / PLS Error` → `Package Invalid` → `View Compilation Failure` → `Missing Column/Table` → `Root Cause, Remediation & Verification`.

### 5. Dependency Graph & Impact Analysis Engine
- Maps relationships across `Entity` ↔ `Projection` ↔ `Package` ↔ `View` ↔ `Table` ↔ `Custom Field` ↔ `Security Grants` ↔ `OData Endpoints`.
- Evaluates risk levels (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`) and downstream callers before code edits.

### 6. Self-Validating Quality Gate & Static Analyzer
- Evaluates code against **SOLID principles**, **Cust-layer customization rules**, **missing `initialcheck implementation;` declarations**, **raw `COMMIT` inside PL/SQL LUs**, and **SQL injection risks**.

### 7. Multi-Version Knowledge Base (23R2 to 26R1)
- Comprehensive indexed knowledge covering Marble DSL, PL/SQL LU framework hooks (`Check_Common___`, `Prepare_Insert___`), OData v4 REST endpoints, Operational Reporting (`Xml_Record_Writer_SYS`), IFS Connect, Security Grants, and Custom Fields.

---

## 🛠️ 75+ Specialized MCP Tools Across 14 Categories

| Category | Key MCP Tools |
| :--- | :--- |
| **Copilot & Orchestration** | `copilot_orchestrated_query`, `analyze_impact`, `trace_root_cause`, `evaluate_quality_gate`, `evaluate_consensus_confidence` |
| **Documentation & RAG** | `search_docs`, `compare_version_docs`, `related_docs`, `search_examples` |
| **Code Generation** | `generate_bulk_plsql`, `generate_autonomous_transaction`, `generate_plsql`, `generate_package`, `generate_entity`, `generate_projection`, `generate_page` |
| **Oracle DBA & Tuning** | `oracle_dba_help`, `explain_execution_plan`, `analyze_schema`, `find_table`, `find_view` |
| **Reporting & SSRS** | `generate_xml_report_writer`, `generate_rdf`, `generate_rdl`, `generate_report_parameters` |
| **Code Review & Quality** | `review_code`, `review_architecture`, `detect_code_smells` |
| **Oracle Error Diagnosis** | `explain_ora_error`, `suggest_fix`, `explain_plsql_error` |
| **Integration & REST** | `generate_rest_api`, `test_rest_endpoint`, `generate_ifs_connect_routing` |
| **Security & Grants** | `audit_security`, `grant_projection_access` |
| **Marble DSL** | `validate_model`, `parse_entity`, `parse_projection`, `parse_client` |
| **Workspace & Indexing** | `index_workspace`, `search_workspace` |

---

## 🌐 Universal 100% Local-Independent Cloud Connection

Your MCP Server is running 24/7 on Render cloud:
- **Cloud SSE Endpoint**: `https://ifs-mcp-server.onrender.com/sse`
- **Cloud Health Endpoint**: `https://ifs-mcp-server.onrender.com/health`
- **OpenAPI Schema for ChatGPT**: `https://ifs-mcp-server.onrender.com/openapi.json`

### 1. Claude Desktop
Copy `clients/claude_desktop_config.json` to `%APPDATA%\Claude\claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "ifs-developer-intelligence": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://ifs-mcp-server.onrender.com/sse"]
    }
  }
}
```

### 2. Cursor IDE
Add new MCP Server in Cursor Settings:
- **Type**: `command`
- **Command**: `npx -y mcp-remote https://ifs-mcp-server.onrender.com/sse`

### 3. VS Code / Windsurf
Use `clients/vscode_mcp.json` or `clients/windsurf_mcp.json`:
```json
{
  "mcpServers": {
    "ifs-developer-intelligence": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://ifs-mcp-server.onrender.com/sse"]
    }
  }
}
```

### 4. ChatGPT (Web Actions / Custom GPTs)
Import Action Schema from URL: `https://ifs-mcp-server.onrender.com/openapi.json`.

---

## ⚙️ Local Development & Testing

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run Vitest test suite (9 tests)
npm test

# Run HTTP / SSE Server locally
npm run start:sse
```

---

## 🛡️ License

MIT License. Built for Enterprise IFS Cloud Development & AI Architecture.
