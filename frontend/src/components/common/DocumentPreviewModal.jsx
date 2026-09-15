import React from 'react';
import { FileText, Download, X, ShieldCheck, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import DocumentStatusBadge from './DocumentStatusBadge';

/**
 * DocumentPreviewModal: Modal for inspecting document metadata, version history, and contents
 * Adheres to Section 4.4 and Section 12 of NGO360 specification.
 */
export default function DocumentPreviewModal({ document, onClose, onDownload }) {
  if (!document) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Document Inspection
              </span>
              <DocumentStatusBadge status={document.status} size="sm" />
            </div>
            <h3 className="text-lg font-bold text-[#172033] mt-0.5">{document.title}</h3>
            <p className="text-xs text-blue-600 font-medium">{document.ngoName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Type</span>
            <span className="font-semibold text-slate-800">{document.type}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Version</span>
            <span className="font-semibold text-slate-800">{document.version}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Size / Format</span>
            <span className="font-semibold text-slate-800">{document.fileSize} ({document.fileType})</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Submission</span>
            <span className="font-semibold text-slate-800">{document.submissionDate}</span>
          </div>
        </div>

        {/* Reviewer Feedback Notice if any */}
        {document.feedbackReason && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-bold block uppercase text-[10px] tracking-wider text-amber-800">
              Staff Reviewer Feedback ({document.reviewer || 'Priya Sharma'}):
            </span>
            <p className="leading-relaxed">{document.feedbackReason}</p>
          </div>
        )}

        {/* Simulated Document Viewer Canvas */}
        <div className="p-8 bg-slate-100/70 rounded-xl border border-dashed border-slate-300 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white text-slate-600 mx-auto flex items-center justify-center shadow-xs border border-slate-200">
            <FileText className="w-8 h-8 text-[#2E7D32]" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">
              Verified Compliance Document
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Ref: {document.code} • Signed with Institutional Digital Certificate
            </p>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-semibold text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Integrity Verified (SHA256: 3a7f...e92b)</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            Deadline: <strong>{document.deadline}</strong>
          </span>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => alert(`Downloading ${document.title}...`)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 font-bold text-white shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
