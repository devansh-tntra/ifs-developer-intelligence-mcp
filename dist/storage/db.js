export class LocalStorageDB {
    docChunks = new Map();
    workspaceAssets = new Map();
    constructor() {
        this.seedMultiVersionKnowledge();
    }
    seedMultiVersionKnowledge() {
        const versions = ['24R1', '24R2', '25R1', '25R2', '26R1'];
        const seedDocs = [
            // 26R1 Documentation Chunks
            {
                id: 'techdocs-marble-overview-26r1',
                title: 'IFS Cloud 26R1 Marble DSL Architecture & AI Assistant Integration',
                url: 'https://docs.ifs.com/techdocs/26r1/marble_dsl_overview.htm',
                category: 'Development Guide',
                version: '26R1',
                content: `IFS Cloud 26R1 introduces enhanced Marble DSL modeling capabilities, full AI copilot annotations (@AiAgent, @ODataStream), expanded entity action parameters, and native OData v4 stream features. Entity definitions map directly to Oracle tables and views while generating automatic PL/SQL packages (*_API). Projections define OData endpoints for Aurena client UI, IFS.ai assistants, and REST APIs.`,
                codeBlocks: [
                    `entity CustomerOrder {\n  from = "CUSTOMER_ORDER_TAB";\n  attribute OrderNo Text { label = "Order No"; }\n}`
                ]
            },
            {
                id: 'techdocs-plsql-guidelines-26r1',
                title: 'IFS Cloud 26R1 PL/SQL Programming Standards & Layering',
                url: 'https://docs.ifs.com/techdocs/26r1/plsql_standards.htm',
                category: 'Business Logic Development',
                version: '26R1',
                content: `In IFS Cloud 26R1, all business logic resides inside PL/SQL packages ending with _API. Core LU packages override implementation methods like Prepare_Insert___, Check_Insert___, Insert___, Check_Update___, Update___, Check_Common___, and Check_Delete___. Never issue raw SQL DML in projection files; delegate all transactional persistence to PL/SQL LU packages. Use Error_SYS.Record_General to raise user-facing messages.`,
                codeBlocks: [
                    `Error_SYS.Record_General(lu_name_, 'INVALIDAMOUNT: Amount must be greater than zero.');`
                ]
            },
            // 25R2 Documentation Chunks
            {
                id: 'techdocs-marble-overview-25r2',
                title: 'IFS Cloud 25R2 Marble DSL Architecture & Projection Grants',
                url: 'https://docs.ifs.com/techdocs/25r2/marble_dsl_overview.htm',
                category: 'Development Guide',
                version: '25R2',
                content: `IFS Cloud 25R2 Marble DSL supports Aurena web components, custom projection actions, and dynamic page state expressions. In 25R2, projection entities enforce strict read-only/CUD crud annotations (@Override entity CustomerOrder { crud = Create, Read, Update, Delete; }).`,
                codeBlocks: [
                    `projection CustomerOrderHandling;\nentityset CustomerOrderSet for CustomerOrder;`
                ]
            },
            {
                id: 'techdocs-upgrade-25r2-to-26r1',
                title: 'IFS Cloud Upgrade Guide: 25R2 to 26R1 Breaking Changes & API Migrations',
                url: 'https://docs.ifs.com/techdocs/26r1/upgrade_guide_25r2_26r1.htm',
                category: 'Upgrade Guide',
                version: '26R1',
                content: `When upgrading from IFS Cloud 25R2 to 26R1: 1) Verify all custom projection action signatures enforce initialcheck implementation; 2) Convert legacy custom fields to 26R1 Custom Attribute framework; 3) Recompile all custom PL/SQL packages (*.apy) and storage tables (*.storage).`,
                codeBlocks: [
                    `action ApproveOrder {\n   initialcheck implementation;\n   parameter OrderNo Text;\n}`
                ]
            },
            // 25R1 Documentation Chunks
            {
                id: 'techdocs-marble-overview-25r1',
                title: 'IFS Cloud 25R1 Business Logic & Projection Architecture',
                url: 'https://docs.ifs.com/techdocs/25r1/business_logic.htm',
                category: 'Business Logic Development',
                version: '25R1',
                content: `IFS Cloud 25R1 establishes the core Aurena component architecture. Logical Units (LUs) enforce separation between database storage (*.storage), views (*.views), package interface (*.api), and package implementation (*.apy).`,
                codeBlocks: [
                    `CREATE OR REPLACE PACKAGE BODY Customer_Order_API IS ...`
                ]
            },
            // 24R2 Documentation Chunks
            {
                id: 'techdocs-marble-overview-24r2',
                title: 'IFS Cloud 24R2 Developer Studio & Architecture Guide',
                url: 'https://docs.ifs.com/techdocs/24r2/developer_studio.htm',
                category: 'Developer Studio',
                version: '24R2',
                content: `IFS Cloud 24R2 Developer Studio setup and code generation tools for Marble models. Describes code generation templates for entity tables, projections, and Aurena client pages.`,
                codeBlocks: [
                    `client CustomerOrderHandling;\npage Form using CustomerOrderSet { ... }`
                ]
            },
            // 24R1 Documentation Chunks
            {
                id: 'techdocs-marble-overview-24r1',
                title: 'IFS Cloud 24R1 Architecture & Integration Fundamentals',
                url: 'https://docs.ifs.com/techdocs/24r1/architecture_overview.htm',
                category: 'Architecture Guide',
                version: '24R1',
                content: `IFS Cloud 24R1 foundation architecture detailing OData REST API integration, IFS Connect routing rules, message receivers, and PL/SQL business logic frameworks.`,
                codeBlocks: [
                    `curl -X GET "https://ifs.example.com/main/ifsadmin/projection/v1/CustomerOrderHandling.svc/CustomerOrderSet"`
                ]
            }
        ];
        for (const doc of seedDocs) {
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
            if (titleMatch || contentMatch || categoryMatch || versionMatch) {
                let score = 0;
                if (titleMatch)
                    score += 10;
                if (contentMatch)
                    score += 5;
                if (categoryMatch)
                    score += 2;
                if (versionMatch)
                    score += 4;
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