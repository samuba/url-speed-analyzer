import React from 'react';
import { URLAnalysis } from '../types/performance';
import { ArrowDown, ArrowUp, Clock, Percent, HardDrive } from 'lucide-react';

interface ComparisonResultsProps {
  analyses: URLAnalysis[];
}

type MetricKey = 'average' | 'min' | 'max' | 'percentile99' | 'averageSize';

interface MetricConfig {
  key: MetricKey;
  label: string;
  icon: typeof Clock;
  isSize?: boolean;
}

export default function ComparisonResults({ analyses }: ComparisonResultsProps) {
  if (analyses.length < 2) return null;

  const formatDiff = (value: number, isSize = false) => {
    const prefix = value > 0 ? '+' : '';
    if (isSize) {
      const abs = Math.abs(value);
      const units = ['B', 'KB', 'MB', 'GB'];
      let size = abs;
      let unitIndex = 0;
      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
      return `${prefix}${size.toFixed(2)} ${units[unitIndex]}`;
    }
    return `${prefix}${value.toFixed(2)}ms`;
  };

  const getComparisonClass = (value: number) => {
    if (value === 0) return 'text-gray-600';
    return value > 0 ? 'text-red-600' : 'text-green-600';
  };

  const metrics: MetricConfig[] = [
    { key: 'average', label: 'Average', icon: Clock },
    { key: 'min', label: 'Min', icon: ArrowDown },
    { key: 'max', label: 'Max', icon: ArrowUp },
    { key: 'percentile99', label: '99th %', icon: Percent },
    { key: 'averageSize', label: 'Avg Size', icon: HardDrive, isSize: true },
  ];

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Performance Comparison</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Metric</th>
              {analyses.map((analysis) => (
                <th key={analysis.url} className="text-right py-2 px-4">
                  <span className="text-sm font-medium text-gray-600 truncate block max-w-[200px]">
                    {new URL(analysis.url).hostname}
                  </span>
                </th>
              ))}
              <th className="text-right py-2">Difference</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {metrics.map(({ key, label, icon: Icon, isSize }) => (
              <tr key={key}>
                <td className="py-3 flex items-center gap-2">
                  <Icon size={16} className="text-gray-400" />
                  {label}
                </td>
                {analyses.map((analysis) => (
                  <td key={analysis.url} className="text-right px-4">
                    {formatDiff(analysis.stats[key], isSize)}
                  </td>
                ))}
                <td className="text-right">
                  <span className={getComparisonClass(
                    analyses[1].stats[key] - analyses[0].stats[key]
                  )}>
                    {formatDiff(
                      analyses[1].stats[key] - analyses[0].stats[key],
                      isSize
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}