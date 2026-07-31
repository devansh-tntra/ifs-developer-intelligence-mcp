import { evaluateConsensus } from './consensusEngine.js';
import { computeConfidenceScore } from './confidenceEngine.js';
import { analyzeObjectImpact } from './dependencyGraphEngine.js';
import { evaluateQualityGate } from './qualityGateEngine.js';
import { performDeepRootCauseAnalysis } from './rootCauseEngine.js';
export async function processCopilotRequest(queryPrompt, options) {
    const agentReports = [];
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
    let impactAnalysis;
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
    let rootCauseAnalysis;
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
    let qualityGate;
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
//# sourceMappingURL=multiAgentOrchestrator.js.map