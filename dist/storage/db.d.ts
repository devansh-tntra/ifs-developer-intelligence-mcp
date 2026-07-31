import { DocChunk, WorkspaceAsset } from '../types/ifs.js';
export declare class LocalStorageDB {
    private docChunks;
    private workspaceAssets;
    constructor();
    private seedMultiVersionKnowledge;
    addDocChunk(chunk: DocChunk): void;
    addWorkspaceAsset(asset: WorkspaceAsset): void;
    searchDocChunks(query: string, version?: string): DocChunk[];
    searchWorkspaceAssets(query: string, assetType?: string): WorkspaceAsset[];
    getAllWorkspaceAssets(): WorkspaceAsset[];
    getAllDocChunks(): DocChunk[];
}
export declare const db: LocalStorageDB;
