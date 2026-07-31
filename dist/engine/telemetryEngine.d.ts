export interface TelemetryMetrics {
    serverStartTime: string;
    totalRequestsHandled: number;
    totalToolExecutions: number;
    successfulToolExecutions: number;
    failedToolExecutions: number;
    toolSuccessRatePercentage: number;
    averageToolLatencyMs: number;
    averageConfidenceScorePercentage: number;
    toolUsageBreakdown: Record<string, number>;
}
declare class TelemetryEngine {
    private startTime;
    private totalRequests;
    private totalToolExecutions;
    private successfulExecutions;
    private failedExecutions;
    private totalLatencyMs;
    private totalConfidenceScore;
    private confidenceScoreCount;
    private toolUsage;
    recordRequest(): void;
    recordToolExecution(toolName: string, latencyMs: number, isSuccess: boolean): void;
    recordConfidenceScore(score: number): void;
    getMetrics(): TelemetryMetrics;
}
export declare const telemetryEngine: TelemetryEngine;
export {};
