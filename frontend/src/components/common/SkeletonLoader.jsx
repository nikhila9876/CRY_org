import React from 'react';

/**
 * SkeletonLoader: Reusable animated placeholder component
 * Variants: 'text' | 'card' | 'table-row' | 'metric' | 'circular' | 'list'
 */
export default function SkeletonLoader({
  variant = 'text',
  count = 1,
  className = '',
  height,
  width,
}) {
  const items = Array.from({ length: count }, (_, i) => i);

  const renderSkeletonItem = (key) => {
    switch (variant) {
      case 'card':
        return (
          <div
            key={key}
            className={`p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs animate-pulse space-y-4 ${className}`}
          >
            <div className="flex items-center justify-between">
              <div className="h-4 bg-slate-200 rounded-md w-1/3" />
              <div className="h-6 w-6 bg-slate-200 rounded-full" />
            </div>
            <div className="h-8 bg-slate-200 rounded-lg w-1/2" />
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="h-3 bg-slate-200 rounded w-5/6" />
              <div className="h-3 bg-slate-200 rounded w-4/6" />
            </div>
          </div>
        );

      case 'metric':
        return (
          <div
            key={key}
            className={`p-4 rounded-xl bg-white border border-slate-200 shadow-xs animate-pulse flex items-center justify-between ${className}`}
          >
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-slate-200 rounded w-24" />
              <div className="h-7 bg-slate-200 rounded w-16" />
              <div className="h-2.5 bg-slate-200 rounded w-32" />
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-xl shrink-0" />
          </div>
        );

      case 'table-row':
        return (
          <div
            key={key}
            className={`flex items-center gap-4 py-3.5 px-4 border-b border-slate-100 animate-pulse ${className}`}
          >
            <div className="w-5 h-5 bg-slate-200 rounded" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 bg-slate-200 rounded w-48" />
              <div className="h-2.5 bg-slate-200 rounded w-28" />
            </div>
            <div className="h-6 bg-slate-200 rounded-full w-20" />
            <div className="h-3.5 bg-slate-200 rounded w-24 hidden sm:block" />
            <div className="h-8 bg-slate-200 rounded-lg w-16" />
          </div>
        );

      case 'list':
        return (
          <div
            key={key}
            className={`flex items-center gap-3 p-3 rounded-xl bg-slate-50 animate-pulse ${className}`}
          >
            <div className="w-9 h-9 bg-slate-200 rounded-lg shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-slate-200 rounded w-3/5" />
              <div className="h-2.5 bg-slate-200 rounded w-2/5" />
            </div>
            <div className="h-5 bg-slate-200 rounded w-12" />
          </div>
        );

      case 'circular':
        return (
          <div
            key={key}
            className={`rounded-full bg-slate-200 animate-pulse shrink-0 ${className}`}
            style={{
              width: width || '40px',
              height: height || '40px',
            }}
          />
        );

      case 'text':
      default:
        return (
          <div
            key={key}
            className={`bg-slate-200 rounded animate-pulse ${className}`}
            style={{
              height: height || '16px',
              width: width || '100%',
            }}
          />
        );
    }
  };

  return (
    <div className="space-y-3 w-full" role="status" aria-label="Loading content">
      {items.map((i) => renderSkeletonItem(i))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
