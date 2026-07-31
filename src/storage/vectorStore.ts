import { DocChunk } from '../types/ifs.js';

export class TFIDFVectorStore {
  private vocabulary: Map<string, number> = new Map();

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9_\-\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2);
  }

  public computeCosineSimilarity(docText: string, queryText: string): number {
    const docTokens = this.tokenize(docText);
    const queryTokens = this.tokenize(queryText);

    if (docTokens.length === 0 || queryTokens.length === 0) return 0;

    const docFreq: Record<string, number> = {};
    for (const t of docTokens) docFreq[t] = (docFreq[t] || 0) + 1;

    let dotProduct = 0;
    let queryNorm = 0;

    for (const qt of queryTokens) {
      queryNorm += 1;
      if (docFreq[qt]) {
        dotProduct += docFreq[qt];
      }
    }

    let docNorm = 0;
    for (const val of Object.values(docFreq)) {
      docNorm += val * val;
    }

    const similarity = dotProduct / (Math.sqrt(docNorm) * Math.sqrt(queryNorm));
    return isNaN(similarity) ? 0 : similarity;
  }
}

export const vectorStore = new TFIDFVectorStore();
