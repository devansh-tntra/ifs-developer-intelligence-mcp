import { db } from '../storage/db.js';
import { vectorStore } from '../storage/vectorStore.js';
export function performHybridSearch(query, version, limit = 5) {
    const bm25Docs = db.searchDocChunks(query, version);
    const allDocs = db.getAllDocChunks();
    const combinedResults = [];
    for (const doc of allDocs) {
        if (version && doc.version !== version)
            continue;
        const bm25Score = bm25Docs.find(d => d.id === doc.id)?.score || 0;
        const vectorScore = vectorStore.computeCosineSimilarity(doc.content, query);
        // Hybrid score formula: BM25 (0.5) + Vector Similarity (0.5)
        const hybridScore = (bm25Score * 0.5) + (vectorScore * 10 * 0.5);
        if (hybridScore > 0.1) {
            combinedResults.push({
                doc,
                sourceType: 'documentation',
                title: doc.title,
                snippet: doc.content.slice(0, 300) + '...',
                score: hybridScore
            });
        }
    }
    const workspaceAssets = db.searchWorkspaceAssets(query);
    for (const asset of workspaceAssets) {
        const vectorScore = vectorStore.computeCosineSimilarity(asset.content, query);
        const hybridScore = 5 + (vectorScore * 10 * 0.5);
        combinedResults.push({
            asset,
            sourceType: 'workspace',
            title: `${asset.filename} (${asset.assetType})`,
            snippet: asset.content.slice(0, 300) + '...',
            score: hybridScore
        });
    }
    return combinedResults
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}
//# sourceMappingURL=hybridSearch.js.map