import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { isValidUrl, normalizeUrl } from '../utils/urlUtils';

interface UrlFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function UrlForm({ onAnalyze, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!url.trim()) {
      setValidationError('Please enter a URL');
      return;
    }

    const normalizedUrl = normalizeUrl(url.trim());
    
    if (!isValidUrl(normalizedUrl)) {
      setValidationError('Please enter a valid HTTP or HTTPS URL');
      return;
    }

    onAnalyze(normalizedUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setValidationError(null);
            }}
            placeholder="Enter URL to analyze (e.g., https://example.com)"
            className={`flex-1 px-4 py-2 rounded-lg border ${
              validationError ? 'border-red-300' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search size={20} />
                Analyze
              </>
            )}
          </button>
        </div>
        {validationError && (
          <p className="text-red-600 text-sm">{validationError}</p>
        )}
      </div>
    </form>
  );
}