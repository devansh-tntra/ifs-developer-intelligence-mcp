import { z } from 'zod';
export declare const knowledgeTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        query: z.ZodString;
        assetType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        query: string;
        assetType?: string | undefined;
    }, {
        query: string;
        assetType?: string | undefined;
    }>;
    execute: (args: {
        query: string;
        assetType?: string;
    }) => Promise<{
        query: string;
        count: number;
        results: {
            filename: string;
            path: string;
            assetType: "entity" | "projection" | "client" | "page" | "fragment" | "plsql" | "views" | "storage" | "xml" | "rdl" | "other";
            snippet: string;
        }[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        searchTerm: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        searchTerm: string;
    }, {
        searchTerm: string;
    }>;
    execute: (args: {
        searchTerm: string;
    }) => Promise<{
        count: number;
        matches: string[];
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
        totalFound: number;
        files: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        logQuery: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        logQuery: string;
    }, {
        logQuery: string;
    }>;
    execute: (args: {
        logQuery: string;
    }) => Promise<{
        query: string;
        matches: never[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        term: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        term: string;
    }, {
        term: string;
    }>;
    execute: (args: {
        term: string;
    }) => Promise<{
        term: string;
        pdfMatches: never[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        xmlContent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        xmlContent: string;
    }, {
        xmlContent: string;
    }>;
    execute: (args: {
        xmlContent: string;
    }) => Promise<any>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        jsonContent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        jsonContent: string;
    }, {
        jsonContent: string;
    }>;
    execute: (args: {
        jsonContent: string;
    }) => Promise<any>;
})[];
