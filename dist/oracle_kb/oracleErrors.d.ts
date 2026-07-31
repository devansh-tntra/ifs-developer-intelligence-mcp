import { OracleErrorDetail } from '../types/ifs.js';
export declare const ORACLE_ERROR_KNOWLEDGE_BASE: Record<string, OracleErrorDetail>;
export declare function getOracleErrorDetails(errorCode: string): OracleErrorDetail | undefined;
export declare function searchOracleErrors(query: string): OracleErrorDetail[];
