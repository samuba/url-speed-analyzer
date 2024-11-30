import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import UrlForm from './components/UrlForm';
import ResultsDisplay from './components/ResultsDisplay';
import StatusResults from './components/StatusResults';
import ErrorMessage from './components/ErrorMessage';
import UrlList from './components/UrlList';
import ComparisonResults from './components/ComparisonResults';
import { analyzeUrlPerformance, FetchError } from './utils/api';
import { calculateStats } from './utils/performanceMetrics';
import { URLAnalysis } from './types/performance';

const ITERATIONS = 20;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyses, setAnalyses] = useState<URLAnalysis[]>([]);

  const analyzeUrl = async (url: string) => {
    // Check if URL has already been analyzed
    if (analyses.some(analysis => analysis.url === url)) {
      setError('This URL has already been analyzed. Please try a different URL.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const results = await analyzeUrlPerformance(url, ITERATIONS);
      const stats = calculateStats(results);
      
      setAnalyses(prev => [...prev, {
        url,
        stats,
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error('Error analyzing URL:', error);
      if (error instanceof FetchError) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeUrl = (url: string) => {
    setAnalyses(prev => prev.filter(analysis => analysis.url !== url));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Activity size={32} className="text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">URL Performance Analyzer</h1>
            </div>
            <p className="text-gray-600 max-w-xl">
              Compare performance metrics across multiple URLs. Each URL will be tested {ITERATIONS} times
              to calculate average loading speed, size, and other metrics.
            </p>
          </div>

          <UrlForm onAnalyze={analyzeUrl} isLoading={isLoading} />
          
          {error && <ErrorMessage message={error} />}
          
          {isLoading && (
            <div className="text-center text-gray-600">
              Running {ITERATIONS} tests, please wait...
            </div>
          )}

          <UrlList urls={analyses} onRemove={removeUrl} />

          {analyses.length >= 2 && (
            <ComparisonResults analyses={analyses} />
          )}

          {analyses.map((analysis) => (
            <div key={analysis.url} className="w-full">
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
                Results for {new URL(analysis.url).hostname}
              </h3>
              <ResultsDisplay stats={analysis.stats} />
              <div className="mt-4">
                <StatusResults 
                  statusCodes={analysis.stats.statusCodes} 
                  totalRequests={ITERATIONS} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;