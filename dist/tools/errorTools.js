import { z } from 'zod';
import { getOracleErrorDetails, searchOracleErrors } from '../oracle_kb/oracleErrors.js';
export const errorTools = [
    {
        name: 'explain_ora_error',
        description: 'Explain an Oracle ORA-* error code with standard cause and IFS Cloud specific remediation.',
        parameters: z.object({
            errorCode: z.string().describe('Oracle error code e.g. ORA-04063, ORA-00942')
        }),
        execute: async (args) => {
            const details = getOracleErrorDetails(args.errorCode);
            if (details)
                return details;
            return {
                errorCode: args.errorCode,
                title: 'Oracle Runtime Error',
                standardCause: 'Oracle Database Engine raised exception.',
                ifsSpecificCause: 'Review stack trace for specific PL/SQL LU line or database view compilation state.',
                remediationSteps: [
                    'Run SHOW ERRORS in SQL Developer for failing object.',
                    'Recompile package header and body in Developer Studio.'
                ]
            };
        }
    },
    {
        name: 'explain_pls_error',
        description: 'Explain a PL/SQL compilation PLS-* error code.',
        parameters: z.object({
            errorCode: z.string().describe('PLS error code e.g. PLS-00103')
        }),
        execute: async (args) => {
            const details = getOracleErrorDetails(args.errorCode);
            if (details)
                return details;
            return {
                errorCode: args.errorCode,
                title: 'PL/SQL Syntax / Compilation Error',
                standardCause: 'Syntax mismatch or invalid PL/SQL symbol.',
                remediationSteps: ['Check line number in PL/SQL file for missing semicolon or mismatched END block.']
            };
        }
    },
    {
        name: 'explain_ifs_error',
        description: 'Explain an IFS framework error message (e.g. Error_SYS.Record_General or Security_SYS).',
        parameters: z.object({
            messageKey: z.string().describe('Message key or error text e.g. NODESC or Security_SYS exception')
        }),
        execute: async (args) => {
            return {
                messageKey: args.messageKey,
                type: 'IFS Framework Business Logic Error',
                explanation: `Error raised by Error_SYS.Record_General or security check for key '${args.messageKey}'.`,
                remediation: 'Inspect the business condition in Check_Insert___ / Check_Update___ or verify user role permissions.'
            };
        }
    },
    {
        name: 'find_stacktrace_rootcause',
        description: 'Parse a full Oracle / IFS Java stack trace and extract the primary root cause error line.',
        parameters: z.object({
            stackTrace: z.string().describe('Complete error log / stack trace text')
        }),
        execute: async (args) => {
            const lines = args.stackTrace.split(/\r?\n/);
            const oraMatches = lines.filter(l => l.includes('ORA-') || l.includes('PLS-') || l.includes('Error_SYS'));
            return {
                rootCauseLine: oraMatches[0] || 'No explicit ORA- or PLS- line matched in stack trace.',
                allMatchedErrors: oraMatches,
                totalLinesParsed: lines.length
            };
        }
    },
    {
        name: 'suggest_fix',
        description: 'Suggest step-by-step code or configuration fixes for a given error context.',
        parameters: z.object({
            errorContext: z.string().describe('Error description or stack trace snippet')
        }),
        execute: async (args) => {
            const matches = searchOracleErrors(args.errorContext);
            return {
                suggestedFixes: matches.length > 0 ? matches[0].remediationSteps : [
                    'Verify LU package body compilation state.',
                    'Verify table column names in *.entity model.',
                    'Ensure dictionary cache is refreshed in IFS Cloud.'
                ]
            };
        }
    }
];
//# sourceMappingURL=errorTools.js.map