import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

interface StatusCategory {
  range: string;
  title: string;
  codes: Array<{
    code: number;
    name: string;
    description: string;
  }>;
}

const HTTP_STATUS_CATEGORIES: StatusCategory[] = [
  {
    range: '1xx',
    title: 'Informational',
    codes: [
      { code: 100, name: 'Continue', description: 'The server has received the request headers and the client should proceed to send the request body.' },
      { code: 101, name: 'Switching Protocols', description: 'The server is switching protocols as requested by the client.' },
      { code: 102, name: 'Processing', description: 'The server is processing the request but no response is available yet.' }
    ]
  },
  {
    range: '2xx',
    title: 'Success',
    codes: [
      { code: 200, name: 'OK', description: 'The request succeeded.' },
      { code: 201, name: 'Created', description: 'The request succeeded and a new resource was created.' },
      { code: 204, name: 'No Content', description: 'The request succeeded but there is no content to send.' }
    ]
  },
  {
    range: '3xx',
    title: 'Redirection',
    codes: [
      { code: 301, name: 'Moved Permanently', description: 'The requested resource has been permanently moved to a new URL.' },
      { code: 302, name: 'Found', description: 'The requested resource temporarily resides under a different URL.' },
      { code: 304, name: 'Not Modified', description: 'The client can use cached data.' }
    ]
  },
  {
    range: '4xx',
    title: 'Client Errors',
    codes: [
      { code: 400, name: 'Bad Request', description: 'The server cannot process the request due to client error.' },
      { code: 401, name: 'Unauthorized', description: 'Authentication is required and has failed or not been provided.' },
      { code: 403, name: 'Forbidden', description: 'The server understood the request but refuses to authorize it.' },
      { code: 404, name: 'Not Found', description: 'The requested resource could not be found on the server.' },
      { code: 429, name: 'Too Many Requests', description: 'The user has sent too many requests in a given amount of time.' }
    ]
  },
  {
    range: '5xx',
    title: 'Server Errors',
    codes: [
      { code: 500, name: 'Internal Server Error', description: 'The server encountered an unexpected condition.' },
      { code: 502, name: 'Bad Gateway', description: 'The server received an invalid response from the upstream server.' },
      { code: 503, name: 'Service Unavailable', description: 'The server is temporarily unable to handle the request.' },
      { code: 504, name: 'Gateway Timeout', description: 'The upstream server failed to send a request in time.' }
    ]
  }
];

export default function HttpStatusInfo() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-50 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <Info className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">HTTP Status Codes Reference</h2>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {HTTP_STATUS_CATEGORIES.map((category) => (
          <div key={category.range} className="overflow-hidden">
            <button
              onClick={() => setExpandedCategory(
                expandedCategory === category.range ? null : category.range
              )}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {category.range}
                </span>
                <span className="font-medium text-gray-900">{category.title}</span>
              </div>
              {expandedCategory === category.range ? (
                <ChevronUp className="text-gray-500" size={20} />
              ) : (
                <ChevronDown className="text-gray-500" size={20} />
              )}
            </button>
            
            {expandedCategory === category.range && (
              <div className="px-4 py-3 bg-gray-50">
                <div className="space-y-3">
                  {category.codes.map((status) => (
                    <div key={status.code} className="pl-4 border-l-2 border-blue-200">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-blue-700">
                          {status.code}
                        </span>
                        <span className="font-medium text-gray-900">
                          {status.name}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {status.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}