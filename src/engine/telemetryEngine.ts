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

class TelemetryEngine {
  private startTime: Date = new Date();
  private totalRequests: number = 0;
  private totalToolExecutions: number = 0;
  private successfulExecutions: number = 0;
  private failedExecutions: number = 0;
  private totalLatencyMs: number = 0;
  private totalConfidenceScore: number = 0;
  private confidenceScoreCount: number = 0;
  private toolUsage: Record<string, number> = {};

  public recordRequest() {
    this.totalRequests++;
  }

  public recordToolExecution(toolName: string, latencyMs: number, isSuccess: boolean) {
    this.totalToolExecutions++;
    if (isSuccess) {
      this.successfulExecutions++;
    } else {
      this.failedExecutions++;
    }
    this.totalLatencyMs += latencyMs;
    this.toolUsage[toolName] = (this.toolUsage[toolName] || 0) + 1;
  }

  public recordConfidenceScore(score: number) {
    this.totalConfidenceScore += score;
    this.confidenceScoreCount++;
  }

  public getMetrics(): TelemetryMetrics {
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
