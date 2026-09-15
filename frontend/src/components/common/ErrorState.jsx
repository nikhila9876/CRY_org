import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * ErrorState: Universal error boundary card and failed API state placeholder
 */
export default function ErrorState({
  title = 'Failed to load data',
  message = 'An unexpected error occurred while communicating with the server. Please verify your connection or try again.',
  errorCode,
  onRetry,
  action,
  className = '',
}) {
  const navigate = useNavigate();

  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-red-50/50 rounded-2xl border border-red-200/80 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-red-100/80 border border-red-200 flex items-center justify-center text-red-600 mb-4 shadow-xs">
        <AlertCircle className="w-7 h-7 stroke-[1.75]" />
      </div>

      {errorCode && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 mb-1 px-2.5 py-0.5 rounded-full bg-red-100 border border-red-200">
          Error {errorCode}
        </span>
      )}

      <h3 className="text-base font-bold text-red-950 mb-1.5 mt-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-red-800/80 max-w-md leading-relaxed mb-6">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        )}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-colors"
          >
            {action.label}
          </button>
        )}
        {!action && (
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
