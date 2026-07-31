import { z } from 'zod';
import { performHybridSearch } from '../rag/hybridSearch.js';
import { db } from '../storage/db.js';
export const docsTools = [
    {
        name: 'search_docs',
        description: 'Search official IFS Cloud Technical Documentation using Hybrid BM25 & Vector RAG search.',
        parameters: z.object({
            query: z.string().describe('Search query string (e.g. "Marble entity associations" or "Error_SYS")'),
            version: z.string().optional().describe('IFS release version context e.g. 26R1, 25R2, 24R2')
        }),
        execute: async (args) => {
            const results = performHybridSearch(args.query, args.version);
            return {
                query: args.query,
                count: results.length,
                results
            };
        }
    },
    {
        name: 'fetch_doc',
        description: 'Fetch complete document content by ID or URL from indexed IFS documentation.',
        parameters: z.object({
            docId: z.string().describe('Document ID or URL')
        }),
        execute: async (args) => {
            const doc = db.getAllDocChunks().find(d => d.id === args.docId || d.url === args.docId);
            if (!doc) {
                return { error: `Document '${args.docId}' not found in index.` };
            }
            return doc;
        }
    },
    {
        name: 'summarize_doc',
        description: 'Summarize key points and technical guidelines from an IFS doc topic.',
        parameters: z.object({
            topic: z.string().describe('Topic or module name (e.g. "Projection Architecture", "Developer Studio Setup")')
        }),
        execute: async (args) => {
            const docs = db.searchDocChunks(args.topic);
            if (docs.length === 0) {
                return { summary: `No detailed documentation found for topic '${args.topic}'.` };
            }
            const primary = docs[0];
            return {
                topic: args.topic,
                title: primary.title,
                version: primary.version,
                summary: `IFS ${primary.version} Architecture overview for ${args.topic}: ${primary.content.slice(0, 500)}...`,
                codeSnippet: primary.codeBlocks[0] || null
            };
        }
    },
    {
        name: 'related_docs',
        description: 'Find related technical documentation articles for an IFS concept or file.',
        parameters: z.object({
            concept: z.string().describe('IFS concept e.g. "Custom Attributes", "State Machine", "OData Projection"')
        }),
        execute: async (args) => {
            const results = performHybridSearch(args.concept, undefined, 4);
            return {
                concept: args.concept,
                related: results.map(r => ({ title: r.title, score: r.score, snippet: r.snippet }))
            };
        }
    },
    {
        name: 'search_examples',
        description: 'Search official IFS code examples and DSL syntax templates.',
        parameters: z.object({
            keyword: z.string().describe('Keyword or DSL type e.g. "entity", "projection action", "PL/SQL procedure"')
        }),
        execute: async (args) => {
            const allDocs = db.getAllDocChunks();
            const snippets = [];
            for (const d of allDocs) {
                if (d.codeBlocks && d.codeBlocks.length > 0) {
                    for (const cb of d.codeBlocks) {
                        if (cb.toLowerCase().includes(args.keyword.toLowerCase())) {
                            snippets.push({ title: d.title, code: cb });
                        }
                    }
                }
            }
            return {
                keyword: args.keyword,
                count: snippets.length,
                snippets
            };
        }
    }
];
//# sourceMappingURL=docsTools.js.map