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

export const calculateStats = (results: PerformanceResult[]): PerformanceStats => {
  const durations = results.map(r => r.duration);
  const sizes = results.map(r => r.size);
  
  durations.sort((a, b) => a - b);
  
  const average = durations.reduce((a, b) => a + b, 0) / durations.length;
  const min = durations[0];
  const max = durations[durations.length - 1];
  const p99Index = Math.floor(durations.length * 0.99);
  const percentile99 = durations[p99Index];
  const totalSize = sizes.reduce((a, b) => a + b, 0);
  const averageSize = totalSize / sizes.length;

  // Calculate status code frequencies
  const statusCodes = new Map<number, number>();
  results.forEach(result => {
    const count = statusCodes.get(result.status) || 0;
    statusCodes.set(result.status, count + 1);
  });

  return {
    average,
    min,
    max,
    percentile99,
    totalSize,
    averageSize,
    statusCodes
  };
};