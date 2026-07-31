import { z } from 'zod';
export declare const devStudioTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        topic: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        topic: string;
    }, {
        topic: string;
    }>;
    execute: (args: {
        topic: string;
    }) => Promise<{
        topic: string;
        guidelines: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        targetType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        targetType: string;
    }, {
        targetType: string;
    }>;
    execute: (args: {
        targetType: string;
    }) => Promise<{
        instructions: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        issueType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        issueType: string;
    }, {
        issueType: string;
    }>;
    execute: (args: {
        issueType: string;
    }) => Promise<{
        steps: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        modelType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        modelType: string;
    }, {
        modelType: string;
    }>;
    execute: (args: {
        modelType: string;
    }) => Promise<{
        bestPractices: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        wizardName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        wizardName: string;
    }, {
        wizardName: string;
    }>;
    execute: (args: {
        wizardName: string;
    }) => Promise<{
        wizardGuide: string;
    }>;
})[];
