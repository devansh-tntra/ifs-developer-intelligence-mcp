import { docsTools } from './docsTools.js';
import { codeGenTools } from './codeGenTools.js';
import { reviewTools } from './reviewTools.js';
import { errorTools } from './errorTools.js';
import { deploymentTools } from './deploymentTools.js';
import { securityTools } from './securityTools.js';
import { integrationTools } from './integrationTools.js';
import { reportingTools } from './reportingTools.js';
import { marbleTools } from './marbleTools.js';
import { devStudioTools } from './devStudioTools.js';
import { databaseTools } from './databaseTools.js';
import { gitTools } from './gitTools.js';
import { knowledgeTools } from './knowledgeTools.js';

export const ALL_MCP_TOOLS = [
  ...docsTools,
  ...codeGenTools,
  ...reviewTools,
  ...errorTools,
  ...deploymentTools,
  ...securityTools,
  ...integrationTools,
  ...reportingTools,
  ...marbleTools,
  ...devStudioTools,
  ...databaseTools,
  ...gitTools,
  ...knowledgeTools
];
