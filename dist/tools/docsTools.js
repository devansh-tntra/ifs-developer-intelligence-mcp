import { z } from 'zod';
import { performHybridSearch } from '../rag/hybridSearch.js';
import { db } from '../storage/db.js';
export const docsTools = [
    {
        name: 'search_docs',
        description: 'Search official IFS Cloud Technical Documentation across all release versions (24R1, 24R2, 25R1, 25R2, 26R1) using Hybrid BM25 & Vector RAG search.',
        parameters: z.object({
            query: z.string().describe('Search query string (e.g. "Marble entity associations" or "Error_SYS")'),
            version: z.string().optional().describe('IFS release version filter e.g. "ALL", "26R1", "25R2", "25R1", "24R2", "24R1"')
        }),
        execute: async (args) => {
            const versionFilter = args.version === 'ALL' ? undefined : args.version;
            const results = performHybridSearch(args.query, versionFilter);
            return {
                query: args.query,
                searchedVersions: versionFilter || 'ALL (24R1, 24R2, 25R1, 25R2, 26R1)',
                count: results.length,
                results
            };
        }
    },
    {
        name: 'compare_version_docs',
        description: 'Compare an IFS feature, API, or Marble DSL concept between two release versions (e.g. 25R2 vs 26R1).',
        parameters: z.object({
            concept: z.string().describe('IFS feature or concept e.g. "Marble DSL", "Custom Attributes", "Projection Actions"'),
            fromVersion: z.string().describe('Base release version e.g. 25R2'),
            toVersion: z.string().describe('Target release version e.g. 26R1')
        }),
        execute: async (args) => {
            const fromDocs = db.searchDocChunks(args.concept, args.fromVersion);
            const toDocs = db.searchDocChunks(args.concept, args.toVersion);
            return {
                concept: args.concept,
                comparison: {
                    fromVersion: {
                        version: args.fromVersion,
                        matchesFound: fromDocs.length,
                        summary: fromDocs[0] ? fromDocs[0].content : `No specific ${args.fromVersion} chunk found.`
                    },
                    toVersion: {
                        version: args.toVersion,
                        matchesFound: toDocs.length,
                        summary: toDocs[0] ? toDocs[0].content : `No specific ${args.toVersion} chunk found.`
                    }
                }
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
        description: 'Summarize key points and technical guidelines from an IFS doc topic across releases.',
        parameters: z.object({
            topic: z.string().describe('Topic or module name (e.g. "Projection Architecture", "Developer Studio Setup")'),
            version: z.string().optional().describe('IFS release version context e.g. 26R1, 25R2, 24R2')
        }),
        execute: async (args) => {
            const docs = db.searchDocChunks(args.topic, args.version);
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
        description: 'Find related technical documentation articles for an IFS concept or file across all releases.',
        parameters: z.object({
            concept: z.string().describe('IFS concept e.g. "Custom Attributes", "State Machine", "OData Projection"')
        }),
        execute: async (args) => {
            const results = performHybridSearch(args.concept, undefined, 5);
            return {
                concept: args.concept,
                related: results.map(r => ({ title: r.title, score: r.score, snippet: r.snippet }))
            };
        }
    },
    {
        name: 'search_examples',
        description: 'Search official IFS code examples and DSL syntax templates across all versions.',
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
                            snippets.push({ title: d.title, version: d.version, code: cb });
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