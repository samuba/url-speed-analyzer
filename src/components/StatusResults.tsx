import React from 'react';
import { AlertCircle } from 'lucide-react';

interface StatusResultsProps {
  statusCodes: Map<number, number>;
  totalRequests: number;
}

const getStatusColor = (status: number): string => {
  if (status >= 500) return 'bg-red-100 text-red-800 border-red-200';
  if (status >= 400) return 'bg-orange-100 text-orange-800 border-orange-200';
  if (status >= 300) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (status >= 200) return 'bg-green-100 text-green-800 border-green-200';
  return 'bg-blue-100 text-blue-800 border-blue-200';
};

const getStatusCategory = (status: number): string => {
  if (status >= 500) return 'Server Error';
  if (status >= 400) return 'Client Error';
  if (status >= 300) return 'Redirection';
  if (status >= 200) return 'Success';
  return 'Informational';
};

export default function StatusResults({ statusCodes, totalRequests }: StatusResultsProps) {
  const sortedEntries = Array.from(statusCodes.entries())
    .sort(([a], [b]) => a - b);

  if (sortedEntries.length === 0) return null;

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">HTTP Status Results</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="grid gap-4">
            {sortedEntries.map(([status, count]) => (
              <div key={status} className={`p-4 rounded-lg border ${getStatusColor(status)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={20} />
                    <div>
                      <div className="font-mono font-bold">{status}</div>
                      <div className="text-sm">{getStatusCategory(status)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{count} requests</div>
                    <div className="text-sm">
                      {((count / totalRequests) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}