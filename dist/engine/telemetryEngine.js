class TelemetryEngine {
    startTime = new Date();
    totalRequests = 0;
    totalToolExecutions = 0;
    successfulExecutions = 0;
    failedExecutions = 0;
    totalLatencyMs = 0;
    totalConfidenceScore = 0;
    confidenceScoreCount = 0;
    toolUsage = {};
    recordRequest() {
        this.totalRequests++;
    }
    recordToolExecution(toolName, latencyMs, isSuccess) {
        this.totalToolExecutions++;
        if (isSuccess) {
            this.successfulExecutions++;
        }
        else {
            this.failedExecutions++;
        }
        this.totalLatencyMs += latencyMs;
        this.toolUsage[toolName] = (this.toolUsage[toolName] || 0) + 1;
    }
    recordConfidenceScore(score) {
        this.totalConfidenceScore += score;
        this.confidenceScoreCount++;
    }
    getMetrics() {
        const successRate = this.totalToolExecutions > 0
            ? (this.successfulExecutions / this.totalToolExecutions) * 100
            : 100;
        const avgLatency = this.totalToolExecutions > 0
            ? this.totalLatencyMs / this.totalToolExecutions
            : 0;
        const avgConfidence = this.confidenceScoreCount > 0
            ? this.totalConfidenceScore / this.confidenceScoreCount
            : 85;
        return {
            serverStartTime: this.startTime.toISOString(),
            totalRequestsHandled: this.totalRequests,
            totalToolExecutions: this.totalToolExecutions,
            successfulToolExecutions: this.successfulExecutions,
            failedToolExecutions: this.failedExecutions,
            toolSuccessRatePercentage: Math.round(successRate * 100) / 100,
            averageToolLatencyMs: Math.round(avgLatency * 100) / 100,
            averageConfidenceScorePercentage: Math.round(avgConfidence * 100) / 100,
            toolUsageBreakdown: { ...this.toolUsage }
        };
    }
}
export const telemetryEngine = new TelemetryEngine();
//# sourceMappingURL=telemetryEngine.js.map