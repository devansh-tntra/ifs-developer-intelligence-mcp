import { z } from 'zod';
export declare const docsTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        query: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        query: string;
        version?: string | undefined;
    }, {
        query: string;
        version?: string | undefined;
    }>;
    execute: (args: {
        query: string;
        version?: string;
    }) => Promise<{
        query: string;
        count: number;
        results: import("../rag/hybridSearch.js").HybridSearchResult[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        docId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        docId: string;
    }, {
        docId: string;
    }>;
    execute: (args: {
        docId: string;
    }) => Promise<import("../types/ifs.js").DocChunk | {
        error: string;
    }>;
} | {
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
        summary: string;
        topic?: undefined;
        title?: undefined;
        version?: undefined;
        codeSnippet?: undefined;
    } | {
        topic: string;
        title: string;
        version: string;
        summary: string;
        codeSnippet: string | null;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        concept: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        concept: string;
    }, {
        concept: string;
    }>;
    execute: (args: {
        concept: string;
    }) => Promise<{
        concept: string;
        related: {
            title: string;
            score: number;
            snippet: string;
        }[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        keyword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        keyword: string;
    }, {
        keyword: string;
    }>;
    execute: (args: {
        keyword: string;
    }) => Promise<{
        keyword: string;
        count: number;
        snippets: {
            title: string;
            code: string;
        }[];
    }>;
})[];
