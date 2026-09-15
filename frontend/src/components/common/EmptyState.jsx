import React from 'react';
import { FolderOpen, ArrowRight } from 'lucide-react';

/**
 * EmptyState: Universal empty state card for tables, search results, and queues
 */
export default function EmptyState({
  icon: Icon = FolderOpen,
  title = 'No items found',
  description = 'There are no records matching your current criteria or filters.',
  action,
  secondaryAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-2xs">
        <Icon className="w-7 h-7 stroke-[1.5]" />
      </div>
      <h3 className="text-base font-bold text-[#172033] mb-1.5">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed mb-6">
        {description}
      </p>
      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#2563EB] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
            >
              {action.icon && <action.icon className="w-4 h-4" />}
              {action.label}
              {!action.icon && <ArrowRight className="w-4 h-4" />}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
