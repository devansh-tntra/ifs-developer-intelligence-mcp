export interface DependencyNode {
    name: string;
    type: 'Entity' | 'Projection' | 'Package' | 'View' | 'Table' | 'CustomField' | 'SecurityGrant' | 'ODataEndpoint';
    component?: string;
}
export interface ImpactAnalysisResult {
    targetObject: string;
    objectType: string;
    directUpstreamDependencies: DependencyNode[];
    downstreamAffectedObjects: DependencyNode[];
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    impactSummary: string;
    recommendedValidationSteps: string[];
}
export declare function analyzeObjectImpact(objectName: string): ImpactAnalysisResult;
