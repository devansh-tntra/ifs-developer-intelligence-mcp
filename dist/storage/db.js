export class LocalStorageDB {
    docChunks = new Map();
    workspaceAssets = new Map();
    constructor() {
        this.seedComprehensiveTechDocs();
    }
    seedComprehensiveTechDocs() {
        const comprehensiveDocs = [
            // ---------------------------------------------------------------------
            // DEVELOPER STUDIO & ARCHITECTURE / LAYERING GUIDE
            // ---------------------------------------------------------------------
            {
                id: 'techdocs-layering-architecture',
                title: 'IFS Cloud Layering Architecture & Customization Standards (Cust Layer)',
                url: 'https://docs.ifs.com/techdocs/26r1/layering_architecture.htm',
                category: 'Architecture Guide',
                version: '26R1',
                content: `IFS Cloud code is structured into layers: Core, Extension, and Customization (Cust). Customizations MUST always reside in the Cust layer without altering Core files directly. In Developer Studio, customization models extend existing LUs using @Override annotations on PL/SQL packages (*.apy) and Marble entities (*.entity). Never modify Core files directly; create Cust layer files with identical LU names in the component's customization folder (e.g. apps/order/model/order/CustomerOrder.entity).`,
                codeBlocks: [
                    `-- Cust Layer Override Example in Customer_Order_API.apy\n@Override\nPROCEDURE Check_Insert___\nIS\nBEGIN\n   super(newrec_, indrec_, attr_);\n   -- Cust Layer Validation Logic\nEND Check_Insert___;`
                ]
            },
            {
                id: 'techdocs-devstudio-project-setup',
                title: 'IFS Developer Studio Project Setup & Code Generation Workflow',
                url: 'https://docs.ifs.com/techdocs/26r1/devstudio_setup.htm',
                category: 'Developer Studio',
                version: '26R1',
                content: `IFS Developer Studio is the primary IDE for designing Marble DSL files (*.entity, *.projection, *.client) and PL/SQL LUs. Project setup requires configuring target Oracle database connection details, component model directories, and dictionary cache targets. Code generation automatically compiles Marble models into PL/SQL LU packages (*_API) and Aurena metadata definitions upon build.`,
                codeBlocks: [
                    `ant -f build.xml compile`
                ]
            },
            // ---------------------------------------------------------------------
            // MARBLE DSL (ENTITIES, PROJECTIONS, CLIENT PAGES)
            // ---------------------------------------------------------------------
            {
                id: 'techdocs-marble-entity-guide',
                title: 'IFS Marble DSL Entity Syntax & Association Syntax Guide',
                url: 'https://docs.ifs.com/techdocs/26r1/marble_entity_syntax.htm',
                category: 'Marble DSL',
                version: '26R1',
                content: `An Entity (*.entity) maps a logical unit to an Oracle database table/view. Key components include: from (base table), attributes (column definitions with Text, Number, Date, Timestamp, Enumeration), keys (primary key block), and associations (foreign key relationships). Attribute modifiers include label, maxlength, editable, and format.`,
                codeBlocks: [
                    `entity CustomerOrder {\n   from = "CUSTOMER_ORDER_TAB";\n   attribute OrderNo Text {\n      label = "Order No";\n      maxlength = 30;\n      editable = [ETag = null];\n   }\n   attribute Description Text;\n   keys {\n      key OrderNo;\n   }\n   association CustomerRef for CustomerInfo {\n      cardinality = "1..*";\n      where = "CustomerNo = :CustomerId";\n   }\n}`
                ]
            },
            {
                id: 'techdocs-marble-projection-guide',
                title: 'IFS Marble DSL Projection Architecture & OData Endpoint Modeling',
                url: 'https://docs.ifs.com/techdocs/26r1/marble_projection_syntax.htm',
                category: 'Marble DSL',
                version: '26R1',
                content: `A Projection (*.projection) defines the OData service interface exposed to Aurena clients and REST API consumers. It declares entitysets, CRUD permissions, actions (state-changing mutations requiring initialcheck implementation), functions (read-only queries), and unbound structures. Actions MUST include 'initialcheck implementation;' for security checks.`,
                codeBlocks: [
                    `projection CustomerOrderHandling;\ncomponent ORDER;\nlayer Core;\n\nentityset CustomerOrderSet for CustomerOrder;\n\n@Override\nentity CustomerOrder {\n   crud = Create, Read, Update, Delete;\n}\n\naction ReleaseOrder {\n   initialcheck implementation;\n   parameter OrderNo Text;\n}`
                ]
            },
            {
                id: 'techdocs-marble-client-guide',
                title: 'IFS Aurena Client UX Syntax (Pages, Groups, Lists, Commands)',
                url: 'https://docs.ifs.com/techdocs/26r1/marble_client_syntax.htm',
                category: 'Marble DSL',
                version: '26R1',
                content: `Client files (*.client / *.page) construct Aurena responsive web pages using components like page, group, list, selector, dialog, assistant, and command. Commands execute actions, call functions, navigate pages, or display confirm/success messages. Use expressions like enabled = [State = "Planned"] for dynamic UI state control.`,
                codeBlocks: [
                    `client CustomerOrderHandling;\ncomponent ORDER;\nprojection CustomerOrderHandling;\n\npage Form using CustomerOrderSet {\n   label = "Customer Order";\n   selector CustomerOrderSelector;\n   group CustomerOrderMainGroup;\n   command ReleaseOrderCommand;\n}\n\ncommand ReleaseOrderCommand for CustomerOrder {\n   label = "Release Order";\n   enabled = [State = "Planned"];\n   execute {\n      confirm("Are you sure you want to release order ${'${OrderNo}'}?") {\n         when OK {\n            call ReleaseOrder(OrderNo);\n            success("Order released.");\n         }\n      }\n   }\n}`
                ]
            },
            // ---------------------------------------------------------------------
            // PL/SQL LU BUSINESS LOGIC & FRAMEWORK APIS
            // ---------------------------------------------------------------------
            {
                id: 'techdocs-plsql-lu-framework',
                title: 'IFS PL/SQL LU Implementation Methods & Core Framework APIs',
                url: 'https://docs.ifs.com/techdocs/26r1/plsql_lu_framework.htm',
                category: 'Business Logic Development',
                version: '26R1',
                content: `IFS PL/SQL packages (*_API) enforce business logic using standard lifecycle hooks: Prepare_Insert___ (default values), Check_Insert___ / Check_Update___ (validations), Insert___ / Update___ (database DML), Check_Common___ (shared validations), and Check_Delete___ / Delete___ (cascade/restricted deletes). Use Error_SYS.Record_General to raise user errors. Use Client_SYS to parse attribute strings (attr_). Never issue raw COMMIT or ROLLBACK inside LU methods.`,
                codeBlocks: [
                    `@Override\nPROCEDURE Check_Common___ (\n   oldrec_ IN     customer_order_tab%ROWTYPE,\n   newrec_ IN OUT customer_order_tab%ROWTYPE,\n   indrec_ IN OUT Indicator_Rec,\n   attr_   IN OUT VARCHAR2 )\nIS\nBEGIN\n   super(oldrec_, newrec_, indrec_, attr_);\n   IF newrec_.amount < 0 THEN\n      Error_SYS.Record_General(lu_name_, 'INVALIDAMT: Order amount cannot be negative.');\n   END IF;\nEND Check_Common___;`
                ]
            },
            // ---------------------------------------------------------------------
            // ORACLE FUNDAMENTAL DATABASE RESOURCES & PL/SQL DEVELOPER MANUAL (MANUAL.PDF)
            // ---------------------------------------------------------------------
            {
                id: 'manual-plsql-dev-compilation-debugging',
                title: 'Oracle Fundamental DB (Manual.pdf / PL/SQL Developer User Guide): Compilation, Debugging & Run-time Error Stack Analysis',
                url: 'file:///D:/MCP_IFS/Manual.pdf#page=16',
                category: 'Oracle DB Fundamentals (Manual.pdf)',
                version: 'ALL',
                content: `Source: Uploaded manual (Manual.pdf - PL/SQL Developer 10.0 User Guide). Fundamental Oracle PL/SQL compilation and debugging guide: 1) Program units include procedures, functions, packages, types, and triggers; 2) Integrated debugging: Step Into, Step Over, Step Out, Run until exception; 3) Conditional Breakpoint expressions (e.g. upper(:ename) = 'SMITH'); 4) Run-time Error Stack tracing highlights line numbers and call hierarchy causing ORA- / PLS- exceptions; 5) Package session state resets (ORA-04068) occur after package recompilation.`,
                codeBlocks: [
                    `-- Conditional Breakpoint Syntax in PL/SQL Debugger\nupper(:ename) = 'SMITH'\n\n-- DBMS_TRACE Execution Logging\nEXEC DBMS_TRACE.set_plsql_trace(DBMS_TRACE.trace_all_calls);`
                ]
            },
            {
                id: 'manual-plsql-dev-profiling-tuning',
                title: 'Oracle Fundamental DB (Manual.pdf / PL/SQL Developer User Guide): SQL Tuning, Explain Plan, DBMS_PROFILER & TKPROF',
                url: 'file:///D:/MCP_IFS/Manual.pdf#page=32',
                category: 'Oracle DB Fundamentals (Manual.pdf)',
                version: 'ALL',
                content: `Source: Uploaded manual (Manual.pdf - PL/SQL Developer 10.0 User Guide). Oracle SQL and PL/SQL performance tuning principles: 1) Explain Plan (F5) analyzes execution paths, cost, cardinality, and index scans; 2) PL/SQL Profiler (DBMS_PROFILER) records line-by-line execution time, minimum/maximum/average times, and execution counts; 3) Automatic session statistics (V$SESSION, V$STATNAME, V$SESSTAT) track physical reads, logical reads, sorts (disk/memory), and full table scans; 4) TKPROF trace utility analyzes database server trace files (ora*.trc) for CPU and parse times.`,
                codeBlocks: [
                    `-- Generate Oracle Explain Plan\nEXPLAIN PLAN FOR SELECT * FROM customer_order_tab WHERE state = 'Planned';\nSELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());\n\n-- Start PL/SQL Profiler Session\nEXEC DBMS_PROFILER.start_profiler('Order_Validation_Benchmark');`
                ]
            },
            {
                id: 'manual-plsql-dev-db-objects',
                title: 'Oracle Fundamental DB (Manual.pdf / PL/SQL Developer User Guide): Database Object Management, Scheduler & Queues',
                url: 'file:///D:/MCP_IFS/Manual.pdf#page=53',
                category: 'Oracle DB Fundamentals (Manual.pdf)',
                version: 'ALL',
                content: `Source: Uploaded manual (Manual.pdf - PL/SQL Developer 10.0 User Guide). Fundamental Oracle Database object definitions and administration: 1) Table Editor: column data types, primary/foreign key constraints, check constraints, indexes (Normal, Unique, Bitmap), storage parameters (PCTFREE, INITRANS); 2) DBMS_SCHEDULER: Programs, Schedules, Chains, Windows, and Jobs; 3) Advanced Queuing (DBMS_AQ): Queue tables and payload types; 4) Security Administration: Users, Roles, System Privileges, Object Privileges, and Database Links.`,
                codeBlocks: [
                    `-- Recompile Schema Invalid Objects\nEXEC DBMS_UTILITY.compile_schema(schema => USER, compile_all => FALSE);\n\n-- DBMS_SCHEDULER Job Definition\nEXEC DBMS_SCHEDULER.create_job(job_name => 'PURGE_LOGS_JOB', job_type => 'STORED_PROCEDURE', job_action => 'Audit_Log_API.Purge_Old_Logs');`
                ]
            },
            // ---------------------------------------------------------------------
            // IFS ACADEMY RESOURCE PORTAL (KNOWLEDGE & TRAINING)
            // ---------------------------------------------------------------------
            {
                id: 'academy-developer-masterclass',
                title: 'IFS Academy Resource Portal: Developer Certification & Aurena Best Practices',
                url: 'https://resourceportal.ifsacademyworld.com/developer_masterclass',
                category: 'IFS Academy',
                version: 'ALL',
                content: `Official training guidelines from the IFS Academy Resource Portal: 1) Master Marble entity-projection pairing for all Aurena UX components; 2) Ensure custom projections isolate database DML inside PL/SQL package bodies (*.apy); 3) Use Developer Studio validation tools before committing code; 4) Implement strict permission security sets for all customized projections.`,
                codeBlocks: [
                    `-- IFS Academy Standard Projection Action Signature\naction ValidateCustOrder {\n   initialcheck implementation;\n   parameter OrderNo Text;\n}`
                ]
            },
            // ---------------------------------------------------------------------
            // IFS COMMUNITY FORUM KNOWLEDGE & DISCUSSIONS
            // ---------------------------------------------------------------------
            {
                id: 'community-developer-solutions',
                title: 'IFS Community Forum: Known Technical Issues, ORA Solutions & Customization Tips',
                url: 'https://community.ifs.com/developer-discussions',
                category: 'IFS Community',
                version: 'ALL',
                content: `Expert developer solutions from IFS Community discussions: 1) ORA-04063 on view: Resolved by dictionary rebuild (Dictionary_SYS.Rebuild_Dictionary_()) or checking table grants to IFSSYS; 2) Custom Field expression syntax error: Use CF_<LU_NAME>_CFV view with objkey parameter; 3) OData REST API auth 401 error: Verify OAuth client ID secret & FND_ENDUSER permission set grants.`,
                codeBlocks: [
                    `EXEC Dictionary_SYS.Rebuild_Dictionary_();\nGRANT SELECT ON CUSTOMER_ORDER_CFV TO IFSSYS;`
                ]
            }
        ];
        for (const doc of comprehensiveDocs) {
            this.docChunks.set(doc.id, doc);
        }
    }
    addDocChunk(chunk) {
        this.docChunks.set(chunk.id, chunk);
    }
    addWorkspaceAsset(asset) {
        this.workspaceAssets.set(asset.path, asset);
    }
    searchDocChunks(query, version) {
        const q = query.toLowerCase();
        const results = [];
        for (const chunk of this.docChunks.values()) {
            if (version && version !== 'ALL' && chunk.version.toLowerCase() !== version.toLowerCase())
                continue;
            const titleMatch = chunk.title.toLowerCase().includes(q);
            const contentMatch = chunk.content.toLowerCase().includes(q);
            const categoryMatch = chunk.category.toLowerCase().includes(q);
            const versionMatch = chunk.version.toLowerCase().includes(q);
            const urlMatch = chunk.url.toLowerCase().includes(q);
            if (titleMatch || contentMatch || categoryMatch || versionMatch || urlMatch) {
                let score = 0;
                if (titleMatch)
                    score += 10;
                if (contentMatch)
                    score += 5;
                if (categoryMatch)
                    score += 2;
                if (versionMatch)
                    score += 4;
                if (urlMatch)
                    score += 8;
                results.push({ ...chunk, score });
            }
        }
        return results.sort((a, b) => (b.score || 0) - (a.score || 0));
    }
    searchWorkspaceAssets(query, assetType) {
        const q = query.toLowerCase();
        const results = [];
        for (const asset of this.workspaceAssets.values()) {
            if (assetType && asset.assetType !== assetType)
                continue;
            if (asset.filename.toLowerCase().includes(q) ||
                asset.content.toLowerCase().includes(q) ||
                asset.path.toLowerCase().includes(q)) {
                results.push(asset);
            }
        }
        return results;
    }
    getAllWorkspaceAssets() {
        return Array.from(this.workspaceAssets.values());
    }
    getAllDocChunks() {
        return Array.from(this.docChunks.values());
    }
}
export const db = new LocalStorageDB();
//# sourceMappingURL=db.js.map