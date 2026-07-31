export class LocalStorageDB {
    docChunks = new Map();
    workspaceAssets = new Map();
    constructor() {
        this.seedInitialKnowledge();
    }
    seedInitialKnowledge() {
        const seedDocs = [
            {
                id: 'techdocs-marble-overview',
                title: 'IFS Cloud Marble DSL Architecture Guide',
                url: 'https://docs.ifs.com/techdocs/26r1/marble_dsl_overview.htm',
                category: 'Development Guide',
                version: '26R1',
                content: `IFS Marble DSL is the domain specific language used in IFS Cloud Developer Studio to define Entity Models (*.entity), Projections (*.projection), Aurena Pages (*.client / *.page), and Fragments (*.fragment). Entity definitions map directly to Oracle tables and views while generating automatic PL/SQL packages (*_API). Projections define OData endpoints for Aurena client UI and REST APIs.`,
                codeBlocks: [
                    `entity CustomerOrder {\n  from = "CUSTOMER_ORDER_TAB";\n  attribute OrderNo Text { label = "Order No"; }\n}`
                ]
            },
            {
                id: 'techdocs-plsql-guidelines',
                title: 'IFS PL/SQL Programming Standards & Guidelines',
                url: 'https://docs.ifs.com/techdocs/26r1/plsql_standards.htm',
                category: 'Business Logic Development',
                version: '26R1',
                content: `All business logic in IFS Cloud resides inside PL/SQL packages ending with _API. Core LU packages override implementation methods like Prepare_Insert___, Check_Insert___, Insert___, Check_Update___, Update___, Check_Common___, and Check_Delete___. Never issue raw SQL DML in projection files; delegate all transactional persistence to PL/SQL LU packages. Use Error_SYS.Record_General to raise user-facing messages.`,
                codeBlocks: [
                    `Error_SYS.Record_General(lu_name_, 'INVALIDAMOUNT: Amount must be greater than zero.');`
                ]
            },
            {
                id: 'techdocs-security-grants',
                title: 'IFS Cloud Projection & Functional Security',
                url: 'https://docs.ifs.com/techdocs/26r1/security_overview.htm',
                category: 'Security',
                version: '26R1',
                content: `In IFS Cloud, security is enforced at both Projection level and PL/SQL LU level. End users require grants to Projections (e.g. CustomerOrderHandling) and functional security checkpoints. Use security_sys or Developer Studio grant annotations (@UncheckedAccess, @ServerOnlyAccess) to configure access controls.`,
                codeBlocks: [
                    `grant execution on CustomerOrderHandling to FND_ENDUSER;`
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
            if (version && chunk.version !== version)
                continue;
            const titleMatch = chunk.title.toLowerCase().includes(q);
            const contentMatch = chunk.content.toLowerCase().includes(q);
            const categoryMatch = chunk.category.toLowerCase().includes(q);
            if (titleMatch || contentMatch || categoryMatch) {
                let score = 0;
                if (titleMatch)
                    score += 10;
                if (contentMatch)
                    score += 5;
                if (categoryMatch)
                    score += 2;
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