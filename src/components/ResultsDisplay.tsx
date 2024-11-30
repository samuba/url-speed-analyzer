import React from 'react';
import { PerformanceStats } from '../utils/performanceMetrics';
import { Clock, ArrowDown, ArrowUp, Percent, HardDrive } from 'lucide-react';

interface ResultsDisplayProps {
  stats: PerformanceStats | null;
}

export default function ResultsDisplay({ stats }: ResultsDisplayProps) {
  if (!stats) return null;

  const formatMs = (ms: number) => `${ms.toFixed(2)}ms`;
  const formatSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const metrics = [
    { icon: Clock, label: 'Average', value: formatMs(stats.average) },
    { icon: ArrowDown, label: 'Min', value: formatMs(stats.min) },
    { icon: ArrowUp, label: 'Max', value: formatMs(stats.max) },
    { icon: Percent, label: '99th Percentile', value: formatMs(stats.percentile99) },
    { icon: HardDrive, label: 'Avg Size', value: formatSize(stats.averageSize) },
    { icon: HardDrive, label: 'Total Size', value: formatSize(stats.totalSize) },
  ];

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Performance Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="text-blue-600" size={20} />
              <span className="font-medium text-gray-600">{label}</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}