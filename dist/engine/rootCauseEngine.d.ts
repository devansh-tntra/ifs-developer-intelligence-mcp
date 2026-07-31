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
export declare function performDeepRootCauseAnalysis(errorMessageOrStacktrace: string): RootCauseReport;
