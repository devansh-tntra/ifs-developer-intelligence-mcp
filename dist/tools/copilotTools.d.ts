import { z } from 'zod';
export declare const copilotTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        objectName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        objectName: string;
    }, {
        objectName: string;
    }>;
    execute: (args: {
        objectName: string;
    }) => Promise<import("../engine/dependencyGraphEngine.js").ImpactAnalysisResult>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        errorMessage: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        errorMessage: string;
    }, {
        errorMessage: string;
    }>;
    execute: (args: {
        errorMessage: string;
    }) => Promise<import("../engine/rootCauseEngine.js").RootCauseReport>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        codeSnippet: z.ZodString;
        fileType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        codeSnippet: string;
        fileType?: string | undefined;
    }, {
        codeSnippet: string;
        fileType?: string | undefined;
    }>;
    execute: (args: {
        codeSnippet: string;
        fileType?: string;
    }) => Promise<import("../engine/qualityGateEngine.js").QualityGateReport>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        topic: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        topic: string;
        version?: string | undefined;
    }, {
        topic: string;
        version?: string | undefined;
    }>;
    execute: (args: {
        topic: string;
        version?: string;
    }) => Promise<{
        consensus: import("../engine/consensusEngine.js").ConsensusResult;
        confidence: import("../engine/confidenceEngine.js").ConfidenceEvaluation;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        queryPrompt: z.ZodString;
        targetObject: z.ZodOptional<z.ZodString>;
        errorMessage: z.ZodOptional<z.ZodString>;
        codeSnippet: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        queryPrompt: string;
        version?: string | undefined;
        targetObject?: string | undefined;
        errorMessage?: string | undefined;
        codeSnippet?: string | undefined;
    }, {
        queryPrompt: string;
        version?: string | undefined;
        targetObject?: string | undefined;
        errorMessage?: string | undefined;
        codeSnippet?: string | undefined;
    }>;
    execute: (args: {
        queryPrompt: string;
        targetObject?: string;
        errorMessage?: string;
        codeSnippet?: string;
        version?: string;
    }) => Promise<import("../engine/multiAgentOrchestrator.js").CopilotOrchestratorResponse>;
})[];
