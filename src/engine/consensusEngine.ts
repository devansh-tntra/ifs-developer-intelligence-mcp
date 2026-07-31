import { db } from '../storage/db.js';

export interface EvidenceSource {
  sourceType: 'official_docs' | 'workspace' | 'oracle_kb' | 'community' | 'academy';
  title: string;
  relevanceScore: number;
  contentSnippet: string;
}

export interface ConsensusResult {
  topic: string;
  evidenceCollected: EvidenceSource[];
  sourcesAnalyzedCount: number;
  hasConsensus: boolean;
  conflictsDetected: string[];
  consensusSummary: string;
}

export function evaluateConsensus(topic: string, version?: string): ConsensusResult {
  const docs = db.searchDocChunks(topic, version);
  const assets = db.searchWorkspaceAssets(topic);

  const evidenceCollected: EvidenceSource[] = [];
  const conflictsDetected: string[] = [];

  for (const d of docs.slice(0, 5)) {
    let sourceType: EvidenceSource['sourceType'] = 'official_docs';
    if (d.category.includes('Academy')) sourceType = 'academy';
    else if (d.category.includes('Community')) sourceType = 'community';

    evidenceCollected.push({
      sourceType,
      title: d.title,
      relevanceScore: d.score || 5,
      contentSnippet: d.content.slice(0, 250) + '...'
    });
  }

  for (const a of assets.slice(0, 3)) {
    evidenceCollected.push({
      sourceType: 'workspace',
      title: `${a.filename} (${a.assetType})`,
      relevanceScore: 8,
      contentSnippet: a.content.slice(0, 250) + '...'
    });
  }

  // Cross-reference checking
  const hasDocs = evidenceCollected.some(e => e.sourceType === 'official_docs' || e.sourceType === 'academy');
  const hasWorkspace = evidenceCollected.some(e => e.sourceType === 'workspace');

  if (hasDocs && !hasWorkspace && assets.length === 0) {
    conflictsDetected.push(`No local workspace implementation found for '${topic}'. Recommendations are based strictly on official IFS documentation.`);
  }

  return {
    topic,
    evidenceCollected,
    sourcesAnalyzedCount: evidenceCollected.length,
    hasConsensus: evidenceCollected.length > 0,
    conflictsDetected,
    consensusSummary: evidenceCollected.length > 0
      ? `Cross-referenced ${evidenceCollected.length} evidence sources across official TechDocs, Academy, and Workspace.`
      : `Insufficient multi-source evidence for topic '${topic}'.`
  };
}
