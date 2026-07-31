export interface QualityGateViolation {
    ruleId: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    category: 'IFS Standard' | 'Security' | 'Performance' | 'Clean Code';
    message: string;
    recommendation: string;
}
export interface QualityGateReport {
    passed: boolean;
    qualityScore: number;
    violations: QualityGateViolation[];
    summary: string;
    improvedCodeSnippet?: string;
}
export declare function evaluateQualityGate(codeSnippet: string, fileType?: string): QualityGateReport;
