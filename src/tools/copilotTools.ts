import { z } from 'zod';
import { analyzeObjectImpact } from '../engine/dependencyGraphEngine.js';
import { performDeepRootCauseAnalysis } from '../engine/rootCauseEngine.js';
import { evaluateQualityGate } from '../engine/qualityGateEngine.js';
import { evaluateConsensus } from '../engine/consensusEngine.js';
import { computeConfidenceScore } from '../engine/confidenceEngine.js';
import { processCopilotRequest } from '../engine/multiAgentOrchestrator.js';

export const copilotTools = [
  {
    name: 'analyze_impact',
    description: 'Perform dependency graph impact analysis for an IFS Logical Unit, Entity, Projection, or Table to determine downstream affected objects and risk level.',
    parameters: z.object({
      objectName: z.string().describe('Target IFS object, LU, or Entity name e.g. CustomerOrder')
    }),
    execute: async (args: { objectName: string }) => {
      return analyzeObjectImpact(args.objectName);
    }
  },
  {
    name: 'trace_root_cause',
    description: 'Perform recursive deep root-cause error backtrace analysis for Oracle ORA/PLS errors or IFS Error_SYS exceptions.',
    parameters: z.object({
      errorMessage: z.string().describe('Error message or stacktrace string e.g. ORA-04063 or PLS-00103')
    }),
    execute: async (args: { errorMessage: string }) => {
      return performDeepRootCauseAnalysis(args.errorMessage);
    }
  },
  {
    name: 'evaluate_quality_gate',
    description: 'Evaluate static code quality gate for Marble DSL or PL/SQL code against SOLID, IFS Cust-layer standards, security injection risks, and performance rules.',
    parameters: z.object({
      codeSnippet: z.string().describe('Code snippet to evaluate'),
      fileType: z.string().optional().describe('File type or layer e.g. "Cust", "Marble", "PLSQL"')
    }),
    execute: async (args: { codeSnippet: string; fileType?: string }) => {
      return evaluateQualityGate(args.codeSnippet, args.fileType);
    }
  },
  {
    name: 'evaluate_consensus_confidence',
    description: 'Cross-reference evidence across official TechDocs, IFS Academy, IFS Community, and local workspace to compute multi-source consensus and confidence score %.',
    parameters: z.object({
      topic: z.string().describe('Topic or query to evaluate consensus for'),
      version: z.string().optional().describe('Target IFS Cloud version or "ALL"')
    }),
    execute: async (args: { topic: string; version?: string }) => {
      const consensus = evaluateConsensus(args.topic, args.version);
      const confidence = computeConfidenceScore(consensus, args.topic.length);
      return {
        consensus,
        confidence
      };
    }
  },
  {
    name: 'copilot_orchestrated_query',
    description: 'Dispatches query through the multi-agent orchestrator combining specialized Virtual Agents (Docs, PLSQL, Marble, DBA, Security, Impact, Root Cause) into a single verified response.',
    parameters: z.object({
      queryPrompt: z.string().describe('Developer prompt or question'),
      targetObject: z.string().optional().describe('Target object or LU name if applicable'),
      errorMessage: z.string().optional().describe('Error message or stacktrace if troubleshooting'),
      codeSnippet: z.string().optional().describe('Code snippet if performing code review'),
      version: z.string().optional().describe('Target IFS Cloud version')
    }),
    execute: async (args: {
      queryPrompt: string;
      targetObject?: string;
      errorMessage?: string;
      codeSnippet?: string;
      version?: string;
    }) => {
      return processCopilotRequest(args.queryPrompt, {
        targetObject: args.targetObject,
        errorMessage: args.errorMessage,
        codeSnippet: args.codeSnippet,
        version: args.version
      });
    }
  }
];
