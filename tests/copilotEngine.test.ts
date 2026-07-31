import { describe, it, expect } from 'vitest';
import { evaluateConsensus } from '../src/engine/consensusEngine.js';
import { computeConfidenceScore } from '../src/engine/confidenceEngine.js';
import { performDeepRootCauseAnalysis } from '../src/engine/rootCauseEngine.js';
import { analyzeObjectImpact } from '../src/engine/dependencyGraphEngine.js';
import { evaluateQualityGate } from '../src/engine/qualityGateEngine.js';
import { processCopilotRequest } from '../src/engine/multiAgentOrchestrator.js';

describe('IFS Copilot Enterprise vNext Engines', () => {
  it('should compute consensus and confidence score', () => {
    const consensus = evaluateConsensus('CustomerOrder', '26R1');
    const confidence = computeConfidenceScore(consensus, 20);

    expect(consensus.topic).toBe('CustomerOrder');
    expect(confidence.confidencePercentage).toBeGreaterThanOrEqual(50);
    expect(['A+', 'A', 'B', 'C']).toContain(confidence.qualityGrade);
  });

  it('should perform deep root cause analysis for ORA-04063', () => {
    const report = performDeepRootCauseAnalysis('ORA-04063: view "IFSAPP.CUSTOMER_ORDER_CFV" has errors');
    expect(report.primaryError).toContain('ORA-04063');
    expect(report.traceChain.length).toBeGreaterThan(1);
    expect(report.remediationSteps.length).toBeGreaterThan(0);
  });

  it('should perform dependency graph impact analysis for CustomerOrder', () => {
    const impact = analyzeObjectImpact('CustomerOrder');
    expect(impact.targetObject).toBe('CustomerOrder');
    expect(impact.downstreamAffectedObjects.length).toBeGreaterThan(0);
    expect(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).toContain(impact.riskLevel);
  });

  it('should evaluate static quality gate and detect missing initialcheck', () => {
    const badCode = `
    projection CustomerOrderHandling;
    action ReleaseOrder {
       parameter OrderNo Text;
    }
    `;
    const gate = evaluateQualityGate(badCode, 'Cust');
    expect(gate.passed).toBe(false);
    expect(gate.violations.some(v => v.ruleId === 'IFS-SEC-001')).toBe(true);
  });

  it('should orchestrate multi-agent copilot request', async () => {
    const response = await processCopilotRequest('How to customize CustomerOrder projection in Cust layer?', {
      targetObject: 'CustomerOrder',
      version: '26R1'
    });

    expect(response.agentReports.length).toBeGreaterThanOrEqual(2);
    expect(response.confidence.confidencePercentage).toBeGreaterThanOrEqual(50);
    expect(response.synthesizedRecommendation).toContain('Synthesized analysis complete');
  });
});
