import { evaluateConsensus, ConsensusResult } from './consensusEngine.js';
import { computeConfidenceScore, ConfidenceEvaluation } from './confidenceEngine.js';
import { analyzeObjectImpact, ImpactAnalysisResult } from './dependencyGraphEngine.js';
import { evaluateQualityGate, QualityGateReport } from './qualityGateEngine.js';
import { performDeepRootCauseAnalysis, RootCauseReport } from './rootCauseEngine.js';

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

export async function processCopilotRequest(
  queryPrompt: string,
  options?: { targetObject?: string; errorMessage?: string; codeSnippet?: string; version?: string }
): Promise<CopilotOrchestratorResponse> {
  const agentReports: AgentReport[] = [];

  // 1. Documentation Agent & Consensus Gathering
  const consensus = evaluateConsensus(queryPrompt, options?.version);
  agentReports.push({
    agentName: 'Documentation & Knowledge Agent',
    role: 'Cross-references official TechDocs, IFS Academy, and IFS Community',
    findings: consensus.consensusSummary,
    evidenceCount: consensus.evidenceCollected.length
  });

  // 2. Confidence Evaluation
  const confidence = computeConfidenceScore(consensus, queryPrompt.length);

  // 3. Impact Analysis Agent
  let impactAnalysis: ImpactAnalysisResult | undefined;
  if (options?.targetObject) {
    impactAnalysis = analyzeObjectImpact(options.targetObject);
    agentReports.push({
      agentName: 'Dependency Graph & Impact Analysis Agent',
      role: 'Maps upstream and downstream LU dependencies',
      findings: impactAnalysis.impactSummary,
      evidenceCount: impactAnalysis.downstreamAffectedObjects.length
    });
  }

  // 4. Root Cause Analysis Agent
  let rootCauseAnalysis: RootCauseReport | undefined;
  if (options?.errorMessage) {
    rootCauseAnalysis = performDeepRootCauseAnalysis(options.errorMessage);
    agentReports.push({
      agentName: 'Root Cause & Error Debugging Agent',
      role: 'Performs recursive error backtrace analysis',
      findings: `Deepest Root Cause: ${rootCauseAnalysis.deepestRootCause}`,
      evidenceCount: rootCauseAnalysis.traceChain.length
    });
  }

  // 5. Code Review & Quality Gate Agent
  let qualityGate: QualityGateReport | undefined;
  if (options?.codeSnippet) {
    qualityGate = evaluateQualityGate(options.codeSnippet);
    agentReports.push({
      agentName: 'Quality Gate & Static Review Agent',
      role: 'Evaluates SOLID, security injection, and IFS Cust-layer standards',
      findings: qualityGate.summary,
      evidenceCount: qualityGate.violations.length
    });
  }

  return {
    queryPrompt,
    confidence,
    consensus,
    agentReports,
    impactAnalysis,
    rootCauseAnalysis,
    qualityGate,
    synthesizedRecommendation: `Synthesized analysis complete with ${confidence.confidencePercentage}% confidence grade ${confidence.qualityGrade}. Dispatched ${agentReports.length} specialized virtual agents.`
  };
}
