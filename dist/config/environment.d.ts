export interface Config {
    docsUrl: string;
    docsVersion: string;
    workspacePath: string;
    port: number;
    transport: 'stdio' | 'sse';
    logLevel: string;
    openAiApiKey?: string;
    dataDir: string;
}
export declare const config: Config;
