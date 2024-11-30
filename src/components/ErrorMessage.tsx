import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-2xl bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
      <div>
        <h3 className="font-semibold text-red-800">Error</h3>
        <p className="text-red-700 mt-1">{message}</p>
      </div>
    </div>
  );
}