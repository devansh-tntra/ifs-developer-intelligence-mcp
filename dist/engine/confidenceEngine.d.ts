import { ConsensusResult } from './consensusEngine.js';
export interface ConfidenceEvaluation {
    confidencePercentage: number;
    qualityGrade: 'A+' | 'A' | 'B' | 'C' | 'D';
    evidenceQualityScore: number;
    missingContextFlags: string[];
    recommendation: 'PROCEED' | 'REQUEST_MORE_CONTEXT' | 'WARNING';
}
export declare function computeConfidenceScore(consensus: ConsensusResult, queryContextLength: number): ConfidenceEvaluation;
