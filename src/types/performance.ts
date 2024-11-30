export interface PerformanceResult {
  duration: number;
  size: number;
  status: number;
  statusText: string;
}

export interface PerformanceStats {
  average: number;
  min: number;
  max: number;
  percentile99: number;
  totalSize: number;
  averageSize: number;
  statusCodes: Map<number, number>;
}

export interface URLAnalysis {
  url: string;
  stats: PerformanceStats;
  timestamp: number;
}

export interface ComparisonMetrics {
  averageDiff: number;
  minDiff: number;
  maxDiff: number;
  p99Diff: number;
  sizeDiff: number;
}