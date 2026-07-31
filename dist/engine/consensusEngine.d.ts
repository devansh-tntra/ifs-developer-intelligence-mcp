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
export declare function evaluateConsensus(topic: string, version?: string): ConsensusResult;
