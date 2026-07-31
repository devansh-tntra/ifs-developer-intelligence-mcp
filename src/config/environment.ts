import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

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

export const config: Config = {
  docsUrl: process.env.IFS_DOCS_URL || 'https://docs.ifs.com/techdocs/',
  docsVersion: process.env.IFS_DOCS_VERSION || 'ALL',
  workspacePath: process.env.IFS_WORKSPACE_PATH || process.cwd(),
  port: parseInt(process.env.PORT || '3000', 10),
  transport: (process.env.MCP_TRANSPORT as 'stdio' | 'sse') || 'stdio',
  logLevel: process.env.LOG_LEVEL || 'info',
  openAiApiKey: process.env.OPENAI_API_KEY,
  dataDir: path.resolve(process.cwd(), '.data'),
};
