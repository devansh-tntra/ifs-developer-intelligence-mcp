import { ConsensusResult } from './consensusEngine.js';
import { ConfidenceEvaluation } from './confidenceEngine.js';
import { ImpactAnalysisResult } from './dependencyGraphEngine.js';
import { QualityGateReport } from './qualityGateEngine.js';
import { RootCauseReport } from './rootCauseEngine.js';
export interface AgentReport {
    agentName: string;
    role: string;
    findings: string;
    evidenceCount: number;
}
export interface CopilotOrchestratorResponse {
    queryPrompt: string;
    confidence: ConfidenceEvaluation;
    consensus: ConsensusResult;
    agentReports: AgentReport[];
    impactAnalysis?: ImpactAnalysisResult;
    rootCauseAnalysis?: RootCauseReport;
    qualityGate?: QualityGateReport;
    synthesizedRecommendation: string;
}
export declare function processCopilotRequest(queryPrompt: string, options?: {
    targetObject?: string;
    errorMessage?: string;
    codeSnippet?: string;
    version?: string;
}): Promise<CopilotOrchestratorResponse>;
