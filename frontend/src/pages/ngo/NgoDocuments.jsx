import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  RefreshCw,
  Sparkles,
  Download,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { MOCK_DOCUMENTS } from '../../mock/data/mockDocuments';

export default function NgoDocuments() {
  // Show only documents for this NGO (ngo-1: Bachpan Bachao Trust)
  const [documents, setDocuments] = useState(
    MOCK_DOCUMENTS.filter((d) => d.ngoId === 'ngo-1')
  );
  const [activeTab, setActiveTab] = useState('ALL');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [reuploadDoc, setReuploadDoc] = useState(null);
  const [feedbackDoc, setFeedbackDoc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleReuploadSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === reuploadDoc.id
            ? {
                ...d,
                version: `v${parseInt(d.version.replace('v', '') || '1', 10) + 1}`,
                status: 'pending_review',
                submissionDate: new Date().toISOString().split('T')[0],
                feedbackReason: null,
                fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
              }
            : d
        )
      );

      setIsUploading(false);
      setReuploadDoc(null);
      setSelectedFile(null);
      showToast('Revised document uploaded and submitted for CRY staff review!');
    }, 800);
  };

  const filteredDocs = documents.filter((doc) => {
    if (activeTab === 'ALL') return true;
    return doc.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700 animate-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Statutory Compliance
            </span>
            <span className="text-xs text-slate-500">Bachpan Bachao Trust</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            Compliance Filing & Statutory Documents
          </h1>
          <p className="text-sm text-slate-500">
            Mandatory CRY deliverables: Utilization Certificates, Program Reports, and Statutory Audit filings.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const correctionItem = documents.find((d) => d.status === 'needs_correction');
            if (correctionItem) setReuploadDoc(correctionItem);
            else showToast('No pending correction requested at this time.');
          }}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-xs font-bold text-white shadow-xs transition-colors"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Required Filing</span>
        </button>
      </div>

      {/* Action Required Banner for Documents Needing Correction */}
      {documents.some((d) => d.status === 'needs_correction') && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start justify-between gap-4 shadow-2xs">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-amber-900">
                Action Required: 1 Document Marked for Correction
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Staff reviewer Priya Sharma requested revisions on <strong>Utilization Certificate (Q2)</strong>. Please re-upload with clear auditor seal before Sept 15 to prevent grant disbursal delays.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const doc = documents.find((d) => d.status === 'needs_correction');
              setReuploadDoc(doc);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#D97706] hover:bg-amber-700 text-white text-xs font-bold shrink-0 shadow-xs"
          >
            Fix & Re-upload
          </button>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs text-xs">
        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider px-2">
          Status:
        </span>
        {[
          { key: 'ALL', label: 'All Project Documents' },
          { key: 'needs_correction', label: '🟡 Needs Correction' },
          { key: 'pending_review', label: '🔵 Pending Review' },
          { key: 'approved', label: '🟢 Approved' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => {
          const config = {
            approved: {
              icon: CheckCircle2,
              color: 'text-[#2E7D32]',
              badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
              label: 'Approved',
            },
            pending_review: {
              icon: Clock,
              color: 'text-[#2563EB]',
              badge: 'bg-blue-50 text-blue-800 border-blue-200',
              label: 'Under Review',
            },
            needs_correction: {
              icon: AlertTriangle,
              color: 'text-[#D97706]',
              badge: 'bg-amber-100 text-amber-900 border-amber-300',
              label: 'Correction Required',
            },
            rejected: {
              icon: XCircle,
              color: 'text-[#DC2626]',
              badge: 'bg-rose-50 text-rose-800 border-rose-200',
              label: 'Rejected',
            },
          }[doc.status];

          const Icon = config.icon;

          return (
            <div
              key={doc.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                doc.status === 'needs_correction'
                  ? 'bg-amber-50/30 border-amber-300 shadow-sm'
                  : 'bg-white border-[#E2E8F0] shadow-2xs hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                    {doc.code}
                  </span>
                  <span
                    className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config.badge}`}
                  >
                    <Icon className={`w-3 h-3 ${config.color}`} />
                    <span>{config.label}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#172033] mt-2">{doc.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Category: {doc.type}</p>

                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Version:</span>
                    <span className="font-bold text-slate-700">{doc.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Submitted On:</span>
                    <span className="font-semibold text-slate-700">{doc.submissionDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deadline:</span>
                    <span className="font-bold text-slate-800">{doc.deadline}</span>
                  </div>
                </div>

                {/* Feedback snippet if correction requested */}
                {doc.feedbackReason && (
                  <div className="mt-3 p-2.5 rounded-lg bg-amber-100/70 border border-amber-200 text-xs text-amber-900">
                    <span className="font-bold block text-[11px] uppercase">Staff Feedback:</span>
                    <p className="line-clamp-2 mt-0.5">{doc.feedbackReason}</p>
                    <button
                      type="button"
                      onClick={() => setFeedbackDoc(doc)}
                      className="text-amber-800 font-bold underline text-[11px] mt-1"
                    >
                      Read full feedback →
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(doc)}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReuploadDoc(doc)}
                  className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    doc.status === 'needs_correction'
                      ? 'bg-[#D97706] hover:bg-amber-700 text-white shadow-2xs'
                      : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{doc.status === 'needs_correction' ? 'Fix & Re-upload' : 'Replace File'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Feedback Modal */}
      {feedbackDoc && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  CRY Review Remarks
                </span>
                <h3 className="text-base font-bold text-[#172033]">{feedbackDoc.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setFeedbackDoc(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2 leading-relaxed">
              <div className="font-semibold">Reviewer: {feedbackDoc.reviewer || 'Priya Sharma (Staff)'}</div>
              <p>{feedbackDoc.feedbackReason}</p>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setFeedbackDoc(null)}
                className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setReuploadDoc(feedbackDoc);
                  setFeedbackDoc(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#D97706] hover:bg-amber-700 text-xs font-bold text-white"
              >
                Upload Revision
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reupload / Replace File Modal */}
      {reuploadDoc && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Document Submission Form
                </span>
                <h3 className="text-base font-bold text-[#172033]">{reuploadDoc.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setReuploadDoc(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReuploadSubmit} className="space-y-3.5 text-xs">
              <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center hover:border-[#2E7D32] transition-colors cursor-pointer bg-slate-50/50">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <label className="cursor-pointer">
                  <span className="text-xs font-bold text-[#2E7D32] hover:underline">
                    Click to select file
                  </span>
                  <span className="text-slate-500 text-xs"> or drag and drop</span>
                  <input
                    type="file"
                    required
                    accept=".pdf,.xlsx,.xls,.docx"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                <p className="text-[10px] text-slate-400 mt-1">PDF, Excel or Word (Max 15MB)</p>
                {selectedFile && (
                  <div className="mt-3 p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 font-semibold text-[11px] truncate">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setReuploadDoc(null)}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || isUploading}
                  className="px-4 py-2 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] font-bold text-white transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Submit to CRY Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#172033]">{previewDoc.title}</h3>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Document Type:</span>
                <span className="font-bold text-slate-800">{previewDoc.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Version:</span>
                <span className="font-bold text-slate-800">{previewDoc.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">File Size:</span>
                <span className="font-bold text-slate-800">{previewDoc.fileSize} ({previewDoc.fileType})</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
