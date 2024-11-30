import { PerformanceResult } from './performanceMetrics';
import { isValidUrl, normalizeUrl } from './urlUtils';

export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export const fetchWithTimeout = async (url: string, timeout = 10000): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // First try direct fetch
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        mode: 'cors',
      });
      return response;
    } catch (error) {
      // If direct fetch fails, try with CORS proxy
      if (error instanceof Error && error.name !== 'AbortError') {
        const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;
        const proxyResponse = await fetch(proxyUrl, {
          signal: controller.signal,
        });
        return proxyResponse;
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new FetchError('Request timed out');
      }
      throw new FetchError(error.message);
    }
    throw new FetchError('An unknown error occurred');
  } finally {
    clearTimeout(timeoutId);
  }
};

export const analyzeUrlPerformance = async (
  url: string,
  iterations: number
): Promise<PerformanceResult[]> => {
  if (!isValidUrl(url)) {
    throw new FetchError('Invalid URL format. Please enter a valid HTTP or HTTPS URL.');
  }

  const normalizedUrl = normalizeUrl(url);
  const results: PerformanceResult[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    try {
      const response = await fetchWithTimeout(normalizedUrl);
      const blob = await response.blob();
      const duration = performance.now() - start;
      
      results.push({
        duration,
        size: blob.size,
        status: response.status,
        statusText: response.statusText
      });
    } catch (error) {
      if (error instanceof FetchError && error.status) {
        results.push({
          duration: performance.now() - start,
          size: 0,
          status: error.status,
          statusText: error.statusText || 'Error'
        });
      } else {
        throw error;
      }
    }
  }

  return results;
};