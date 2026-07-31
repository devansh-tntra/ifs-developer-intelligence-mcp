import { db } from '../storage/db.js';
import { vectorStore } from '../storage/vectorStore.js';
import { DocChunk, WorkspaceAsset } from '../types/ifs.js';
import { expandQuerySynonyms } from './semanticSynonyms.js';

export interface HybridSearchResult {
  doc?: DocChunk;
  asset?: WorkspaceAsset;
  sourceType: 'documentation' | 'workspace';
  title: string;
  snippet: string;
  score: number;
}

export function performHybridSearch(query: string, version?: string, limit: number = 5): HybridSearchResult[] {
  const synonyms = expandQuerySynonyms(query);
  const expandedQuery = synonyms.join(' ');

  const bm25Docs = db.searchDocChunks(expandedQuery, version);
  const allDocs = db.getAllDocChunks();

  const combinedResults: HybridSearchResult[] = [];
  const kRrf = 60; // Reciprocal Rank Fusion constant

  // 1. Documentation RAG with Reciprocal Rank Fusion
  for (let i = 0; i < allDocs.length; i++) {
    const doc = allDocs[i];
    if (version && version !== 'ALL' && doc.version.toLowerCase() !== version.toLowerCase()) continue;

    const bm25RankIndex = bm25Docs.findIndex(d => d.id === doc.id);
    const vectorScore = vectorStore.computeCosineSimilarity(doc.content, expandedQuery);

    const bm25RrfScore = bm25RankIndex >= 0 ? (1 / (kRrf + bm25RankIndex + 1)) : 0;
    const vectorRrfScore = vectorScore > 0 ? (1 / (kRrf + Math.round((1 - vectorScore) * 10) + 1)) : 0;

    const finalRrfScore = bm25RrfScore + vectorRrfScore;

    if (finalRrfScore > 0.001 || bm25RankIndex >= 0) {
      combinedResults.push({
        doc,
        sourceType: 'documentation',
        title: doc.title,
        snippet: doc.content.slice(0, 300) + '...',
        score: Math.round(finalRrfScore * 1000) / 10
      });
    }
  }

  // 2. Workspace Codebase RAG
  const workspaceAssets = db.searchWorkspaceAssets(expandedQuery);
  for (let i = 0; i < workspaceAssets.length; i++) {
    const asset = workspaceAssets[i];
    const vectorScore = vectorStore.computeCosineSimilarity(asset.content, expandedQuery);
    const rrfScore = (1 / (kRrf + i + 1)) + (vectorScore * 0.05);

    combinedResults.push({
      asset,
      sourceType: 'workspace',
      title: `${asset.filename} (${asset.assetType})`,
      snippet: asset.content.slice(0, 300) + '...',
      score: Math.round(rrfScore * 1000) / 10
    });
  }

  return combinedResults
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
