export interface MarbleEntity {
  name: string;
  component: string;
  tableName: string;
  attributes: {
    name: string;
    type: string;
    isKey?: boolean;
    isNullable?: boolean;
    label?: string;
  }[];
  associations: {
    name: string;
    targetEntity: string;
    cardinality: string;
    keys: { parent: string; child: string }[];
  }[];
}

export interface MarbleProjection {
  name: string;
  component: string;
  category: string;
  mainEntity?: string;
  entities: string[];
  queries: string[];
  actions: string[];
  functions: string[];
}

export interface MarbleClient {
  name: string;
  component: string;
  pages: string[];
  lists: string[];
  selectors: string[];
  dialogs: string[];
  commands: string[];
}

export interface PlsqlPackage {
  name: string;
  component: string;
  type: 'api' | 'apy';
  procedures: {
    name: string;
    params: { name: string; type: string; mode: string }[];
  }[];
  functions: {
    name: string;
    params: { name: string; type: string; mode: string }[];
    returnType: string;
  }[];
}

export interface OracleErrorDetail {
  errorCode: string; // ORA-04063, PLS-00103, etc.
  title: string;
  standardCause: string;
  ifsSpecificCause: string;
  remediationSteps: string[];
  exampleStacktrace?: string;
  ifsPackageContext?: string;
}

export interface DocChunk {
  id: string;
  title: string;
  url: string;
  category: string;
  version: string;
  content: string;
  codeBlocks: string[];
  score?: number;
}

export interface WorkspaceAsset {
  path: string;
  filename: string;
  extension: string;
  assetType: 'entity' | 'projection' | 'client' | 'page' | 'fragment' | 'plsql' | 'views' | 'storage' | 'xml' | 'rdl' | 'other';
  content: string;
  lastModified: number;
}
