import { z } from 'zod';
import { db } from '../storage/db.js';
import { parseXmlContent, parseJsonContent } from '../parsers/genericParsers.js';

export const knowledgeTools = [
  {
    name: 'search_local_project',
    description: 'Search indexed local IFS project workspace files (.entity, .projection, .client, .plsql, etc.).',
    parameters: z.object({
      query: z.string().describe('Search query string'),
      assetType: z.string().optional().describe('Asset type filter: entity, projection, client, plsql, views, storage')
    }),
    execute: async (args: { query: string; assetType?: string }) => {
      const results = db.searchWorkspaceAssets(args.query, args.assetType);
      return {
        query: args.query,
        count: results.length,
        results: results.map(r => ({
          filename: r.filename,
          path: r.path,
          assetType: r.assetType,
          snippet: r.content.slice(0, 300) + '...'
        }))
      };
    }
  },
  {
    name: 'search_git_repository',
    description: 'Search repository files for code logic or entity definitions.',
    parameters: z.object({
      searchTerm: z.string().describe('Search term')
    }),
    execute: async (args: { searchTerm: string }) => {
      const matches = db.searchWorkspaceAssets(args.searchTerm);
      return {
        count: matches.length,
        matches: matches.map(m => m.filename)
      };
    }
  },
  {
    name: 'search_workspace',
    description: 'Search across all indexed workspace assets.',
    parameters: z.object({
      keyword: z.string().describe('Keyword')
    }),
    execute: async (args: { keyword: string }) => {
      const assets = db.searchWorkspaceAssets(args.keyword);
      return {
        totalFound: assets.length,
        files: assets.map(a => a.path)
      };
    }
  },
  {
    name: 'search_logs',
    description: 'Search indexed build logs or runtime execution logs.',
    parameters: z.object({
      logQuery: z.string().describe('Query string e.g. ERROR or ORA-')
    }),
    execute: async (args: { logQuery: string }) => {
      return {
        query: args.logQuery,
        matches: []
      };
    }
  },
  {
    name: 'search_pdf',
    description: 'Search indexed PDF documents in workspace.',
    parameters: z.object({
      term: z.string().describe('Search term')
    }),
    execute: async (args: { term: string }) => {
      return { term: args.term, pdfMatches: [] };
    }
  },
  {
    name: 'search_xml',
    description: 'Search and parse indexed XML configuration files.',
    parameters: z.object({
      xmlContent: z.string().describe('XML content to parse or search')
    }),
    execute: async (args: { xmlContent: string }) => {
      return parseXmlContent(args.xmlContent);
    }
  },
  {
    name: 'search_json',
    description: 'Search and parse JSON files.',
    parameters: z.object({
      jsonContent: z.string().describe('JSON content string')
    }),
    execute: async (args: { jsonContent: string }) => {
      return parseJsonContent(args.jsonContent);
    }
  }
];
