import React from 'react';
import { Calendar, Clock, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * DeadlineFilters: Specialized filtering bar for time horizons and statutory categories
 * Adheres to Section 5.2 and Section 12 of NGO360 specification.
 */
export default function DeadlineFilters({
  activeHorizon,
  onHorizonChange,
  activeCategory,
  onCategoryChange,
  taskCounts,
}) {
  const horizons = [
    { key: 'ALL', label: 'All Horizons', count: taskCounts.all },
    { key: 'OVERDUE', label: 'Overdue', count: taskCounts.overdue, alert: true },
    { key: '24H', label: 'Next 24 Hours', count: taskCounts.due24h, warning: true },
    { key: '7D', label: 'Next 7 Days', count: taskCounts.due7d },
    { key: '30D', label: 'Next 30 Days', count: taskCounts.due30d },
  ];

  const categories = [
    { key: 'ALL', label: 'All Deliverables' },
    { key: 'compliance', label: 'Statutory & Compliance' },
    { key: 'financial', label: 'Financial Ledgers & UC' },
    { key: 'program', label: 'Quarterly Reports' },
    { key: 'field', label: 'Field Preparations' },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs space-y-3">
      {/* Time Horizon Badges */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider flex items-center space-x-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Deadline Horizon:</span>
        </span>
        {horizons.map((h) => (
          <button
            key={h.key}
            type="button"
            onClick={() => onHorizonChange(h.key)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
              activeHorizon === h.key
                ? h.alert
                  ? 'bg-rose-600 text-white shadow-xs'
                  : h.warning
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{h.label}</span>
            {h.count !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeHorizon === h.key
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 text-slate-700 font-bold'
                }`}
              >
                {h.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Category Pills */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
          Category:
        </span>
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => onCategoryChange(c.key)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              activeCategory === c.key
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
