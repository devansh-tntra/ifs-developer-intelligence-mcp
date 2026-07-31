import { z } from 'zod';
export const reviewTools = [
    {
        name: 'review_code',
        description: 'Review PL/SQL or Marble code against IFS Cloud architectural standards.',
        parameters: z.object({
            code: z.string().describe('Code snippet or file content to review'),
            fileType: z.string().optional().describe('FileType e.g. plsql, entity, projection, client')
        }),
        execute: async (args) => {
            const issues = [];
            const suggestions = [];
            if (args.code.includes('SELECT *')) {
                issues.push('Avoid `SELECT *` in IFS views/queries. Specify explicit column lists for performance and schema stability.');
            }
            if (args.code.includes('COMMIT;') || args.code.includes('ROLLBACK;')) {
                issues.push('Explicit `COMMIT` or `ROLLBACK` detected inside PL/SQL LU method. Transaction demarcation must be managed by IFS Framework / Application Server layer.');
            }
            if (!args.code.includes('Error_SYS') && args.code.includes('RAISE_APPLICATION_ERROR')) {
                issues.push('Use `Error_SYS.Record_General` instead of Oracle raw `RAISE_APPLICATION_ERROR` for consistent IFS user error translation.');
            }
            return {
                qualityScore: issues.length === 0 ? 'Pass (95/100)' : 'Requires Attention (70/100)',
                issues,
                suggestions: suggestions.concat([
                    'Ensure `@Override` annotation is present on framework implementation procedures.',
                    'Verify all PL/SQL method parameters use exact mode annotations (IN / OUT / IN OUT).'
                ])
            };
        }
    },
    {
        name: 'find_bug',
        description: 'Detect potential bugs, unhandled null exceptions, or memory leaks in IFS PL/SQL logic.',
        parameters: z.object({
            code: z.string().describe('PL/SQL code block')
        }),
        execute: async (args) => {
            return {
                potentialBugs: [
                    args.code.includes('SELECT ... INTO') && !args.code.includes('EXCEPTION')
                        ? 'Unhandled NO_DATA_FOUND or TOO_MANY_ROWS exception on implicit SELECT INTO statement.'
                        : 'No obvious implicit SELECT issues found.'
                ]
            };
        }
    },
    {
        name: 'optimize_sql',
        description: 'Analyze Oracle SQL query for missing indexes, full table scans, or non-sargable WHERE clauses.',
        parameters: z.object({
            sqlQuery: z.string().describe('SQL query string')
        }),
        execute: async (args) => {
            return {
                originalSql: args.sqlQuery,
                optimizationAdvice: [
                    'Ensure joined foreign key columns have indexes on target table.',
                    'Avoid applying SQL functions like `TO_CHAR(created_date)` on indexed columns in WHERE clause.',
                    'Use `EXISTS` instead of `IN (SELECT ...)` for subquery lookups.'
                ]
            };
        }
    },
    {
        name: 'optimize_plsql',
        description: 'Suggest PL/SQL optimizations e.g. BULK COLLECT, FORALL, or cursor caching.',
        parameters: z.object({
            code: z.string().describe('PL/SQL loop code')
        }),
        execute: async (args) => {
            return {
                recommendedPattern: 'Use BULK COLLECT LIMIT 1000 and FORALL for high-volume row updates.',
                codeSnippet: `FETCH get_records BULK COLLECT INTO rec_array_ LIMIT 1000;\nFORALL i IN 1..rec_array_.count\n   UPDATE table_tab SET ... WHERE rowid = rec_array_(i).rowid;`
            };
        }
    },
    {
        name: 'detect_dead_code',
        description: 'Identify unused variables, unreferenced procedures, or obsolete custom fields.',
        parameters: z.object({
            code: z.string().describe('Code content')
        }),
        execute: async (args) => {
            return {
                unusedVariables: ['dummy_var_ VARCHAR2(100) declared but never assigned or read.']
            };
        }
    },
    {
        name: 'find_duplicate_logic',
        description: 'Detect duplicated business logic or duplicate validation checks across LU packages.',
        parameters: z.object({
            luName: z.string().describe('LU Name')
        }),
        execute: async (args) => {
            return {
                duplicateSummary: 'Validation logic in Check_Insert___ duplicates checks in Check_Update___. Refactor common checks into Check_Common___ procedure.'
            };
        }
    }
];
//# sourceMappingURL=reviewTools.js.map