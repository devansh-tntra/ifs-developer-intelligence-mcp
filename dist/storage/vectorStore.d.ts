export declare class TFIDFVectorStore {
    private vocabulary;
    private tokenize;
    computeCosineSimilarity(docText: string, queryText: string): number;
}
export declare const vectorStore: TFIDFVectorStore;
