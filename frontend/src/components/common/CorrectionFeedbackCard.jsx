import React from 'react';
import { AlertTriangle, User, Calendar, ArrowRight, RefreshCw } from 'lucide-react';

/**
 * CorrectionFeedbackCard: Displays CRY frontliner feedback reasons with clear remediation action
 * Adheres to Section 5.3 & Section 16 (Rule 274: Show document correction reasons clearly).
 */
export default function CorrectionFeedbackCard({
  documentTitle,
  reviewer = 'Priya Sharma (Senior Project Monitoring Officer)',
  reviewedAt = 'Sept 10, 2026',
  reason,
  onReuploadClick,
}) {
  return (
    <div className="p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 shadow-xs space-y-3.5 animate-in fade-in duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900">
                Correction Requested
              </span>
              <span className="text-xs font-semibold text-amber-800">{documentTitle}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-1">
              Revision Required from Reviewer
            </h3>
          </div>
        </div>

        {onReuploadClick && (
          <button
            type="button"
            onClick={onReuploadClick}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#D97706] hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Upload Revised Version</span>
          </button>
        )}
      </div>

      {/* Rationale Quote Block */}
      <div className="p-3.5 bg-white rounded-xl border border-amber-200 text-xs text-slate-800 leading-relaxed space-y-1 shadow-2xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
          Reviewer Remark:
        </span>
        <blockquote className="italic text-slate-700 font-medium">
          "{reason || 'Please re-verify the submitted schedule against the project budget ledger.'}"
        </blockquote>
      </div>

      {/* Reviewer Meta Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-amber-800 pt-1">
        <span className="flex items-center space-x-1.5 font-medium">
          <User className="w-3.5 h-3.5" />
          <span>Reviewer: {reviewer}</span>
        </span>
        <span className="flex items-center space-x-1 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          <span>Reviewed on: {reviewedAt}</span>
        </span>
      </div>
    </div>
  );
}
