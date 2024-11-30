import React from 'react';
import { Trash2 } from 'lucide-react';
import { URLAnalysis } from '../types/performance';

interface UrlListProps {
  urls: URLAnalysis[];
  onRemove: (url: string) => void;
}

export default function UrlList({ urls, onRemove }: UrlListProps) {
  if (urls.length === 0) return null;

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-2">Analyzed URLs</h2>
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {urls.map((analysis) => (
          <div key={analysis.url} className="flex items-center justify-between p-3 hover:bg-gray-50">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{analysis.url}</p>
              <p className="text-xs text-gray-500">
                Analyzed {new Date(analysis.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onRemove(analysis.url)}
              className="ml-4 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
              title="Remove URL"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}