import { getOracleErrorDetails } from '../oracle_kb/oracleErrors.js';

export interface RootCauseTraceStep {
  stepIndex: number;
  layer: 'Client' | 'Projection' | 'PL/SQL LU' | 'Database View' | 'Storage Table';
  description: string;
  errorSymbol?: string;
}

export interface RootCauseReport {
  primaryError: string;
  deepestRootCause: string;
  traceChain: RootCauseTraceStep[];
  contributingFactors: string[];
  remediationSteps: string[];
  preventativeStrategy: string;
}

export function performDeepRootCauseAnalysis(errorMessageOrStacktrace: string): RootCauseReport {
  const stack = errorMessageOrStacktrace.trim();
  const traceChain: RootCauseTraceStep[] = [];
  const contributingFactors: string[] = [];

  let primaryError = 'Oracle / IFS Runtime Exception';
  let deepestRootCause = 'Unresolved database or model dependency error.';

  if (stack.includes('ORA-04063')) {
    primaryError = 'ORA-04063: view or package body has errors';
    deepestRootCause = 'Underlying Database View or PL/SQL LU Body (*.apy) failed compilation due to invalid column reference or stale dictionary cache.';
    
    traceChain.push({ stepIndex: 1, layer: 'Client', description: 'Aurena Client OData request failed with HTTP 500' });
    traceChain.push({ stepIndex: 2, layer: 'Projection', description: 'Projection Action / EntitySet handler invoked target PL/SQL LU' });
    traceChain.push({ stepIndex: 3, layer: 'PL/SQL LU', description: 'Package body invalidated during runtime execution' });
    traceChain.push({ stepIndex: 4, layer: 'Database View', description: 'View column definition refers to missing table attribute' });

    contributingFactors.push('LU dictionary cache not refreshed after DDL execution');
    contributingFactors.push('Missing GRANT SELECT ON base table to IFSSYS user');
  } else if (stack.includes('PLS-00103')) {
    primaryError = 'PLS-00103: Syntax / Symbol error in PL/SQL';
    deepestRootCause = 'Mismatched PL/SQL syntax token or invalid annotation formatting (missing semicolon or unmatched BEGIN...END block).';

    traceChain.push({ stepIndex: 1, layer: 'PL/SQL LU', description: 'PL/SQL compiler encountered unexpected symbol' });
  } else if (stack.includes('ORA-00942')) {
    primaryError = 'ORA-00942: table or view does not exist';
    deepestRootCause = 'Target Oracle table or view has not been created by *.storage DDL script or lacks grant privileges.';

    traceChain.push({ stepIndex: 1, layer: 'Storage Table', description: 'Oracle SQL execution engine could not find object in schema' });
  } else {
    traceChain.push({ stepIndex: 1, layer: 'PL/SQL LU', description: 'Runtime error inside procedure or trigger' });
  }

  const kbDetails = getOracleErrorDetails(primaryError.split(':')[0]);
  const remediationSteps = kbDetails ? kbDetails.remediationSteps : [
    'Recompile package spec and body in Developer Studio.',
    'Run Dictionary_SYS.Rebuild_Dictionary_() in SQL Developer.'
  ];

  return {
    primaryError,
    deepestRootCause,
    traceChain,
    contributingFactors,
    remediationSteps,
    preventativeStrategy: 'Enforce Developer Studio build compilation and dictionary cache refresh in CI/CD pipeline before deployment.'
  };
}
