import { PlsqlPackage } from '../types/ifs.js';
export declare function parsePlsqlPackage(content: string, filename: string): PlsqlPackage;
export declare function extractErrorSysMessages(content: string): {
    key: string;
    text: string;
}[];
