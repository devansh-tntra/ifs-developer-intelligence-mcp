import { DocChunk, WorkspaceAsset } from '../types/ifs.js';
export interface HybridSearchResult {
    doc?: DocChunk;
    asset?: WorkspaceAsset;
    sourceType: 'documentation' | 'workspace';
    title: string;
    snippet: string;
    score: number;
}
export declare function performHybridSearch(query: string, version?: string, limit?: number): HybridSearchResult[];
