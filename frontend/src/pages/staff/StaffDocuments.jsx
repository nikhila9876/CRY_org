import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Filter,
  Eye,
  Download,
  Send,
  Building2,
  FileText,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { MOCK_DOCUMENTS } from '../../mock/data/mockDocuments';
import { MOCK_NGOS } from '../../mock/data/mockNgos';

export default function StaffDocuments() {
  const [searchParams] = useSearchParams();
  const initialNgo = searchParams.get('ngo') || 'ALL';

  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [ngoFilter, setNgoFilter] = useState(initialNgo);
  const [selectedDocForPreview, setSelectedDocForPreview] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'correction' | 'reject'
  const [targetDoc, setTargetDoc] = useState(null);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleApprove = (docId) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              status: 'approved',
              reviewer: 'Priya Sharma',
              reviewedAt: new Date().toISOString().split('T')[0],
              feedbackReason: 'Approved without remarks. All statutory verifications satisfied.',
            }
          : d
      )
    );
    showToast('Document approved successfully and partner NGO notified.');
  };

  const handleOpenActionModal = (doc, actionType) => {
    setTargetDoc(doc);
    setModalAction(actionType);
    setFeedbackInput(
      actionType === 'correction'
        ? 'Please re-upload with clear auditor seal and reconciled ledger annexure.'
        : 'Statutory form does not match government filing portal records.'
    );
  };

  const handleConfirmAction = () => {
    if (!feedbackInput.trim()) return;

    setDocuments((prev) =>
      prev.map((d) =>
        d.id === targetDoc.id
          ? {
              ...d,
              status: modalAction === 'correction' ? 'needs_correction' : 'rejected',
              reviewer: 'Priya Sharma',
              reviewedAt: new Date().toISOString().split('T')[0],
              feedbackReason: feedbackInput,
            }
          : d
      )
    );

    showToast(
      modalAction === 'correction'
        ? 'Correction requested. Feedback sent to partner NGO.'
        : 'Document marked rejected with formal reason.'
    );

    setModalAction(null);
    setTargetDoc(null);
    setFeedbackInput('');
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesNgo = ngoFilter === 'ALL' || doc.ngoId === ngoFilter;
    const matchesStatus = statusFilter === 'ALL' || doc.status === statusFilter;
    return matchesNgo && matchesStatus;
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              Compliance Review
            </span>
            <span className="text-xs text-slate-500">Statutory & Quarterly Submissions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            Partner Document Reviews & Statutory Scrutiny
          </h1>
          <p className="text-sm text-slate-500">
            Review Utilization Certificates, Program Reports, ITR filings, and FC-4 returns from partner NGOs.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Status:</span>
          </span>
          {['ALL', 'pending_review', 'approved', 'needs_correction', 'rejected'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' && 'All Statuses'}
              {st === 'pending_review' && '🔵 Pending Review'}
              {st === 'approved' && '🟢 Approved'}
              {st === 'needs_correction' && '🟡 Needs Correction'}
              {st === 'rejected' && '🔴 Rejected'}
            </button>
          ))}

          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider ml-2">
            NGO:
          </span>
          <select
            value={ngoFilter}
            onChange={(e) => setNgoFilter(e.target.value)}
            className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="ALL">All Partner NGOs</option>
            {MOCK_NGOS.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDocs.map((doc) => {
          const statusConfig = {
            approved: {
              badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
              label: 'Approved',
              icon: CheckCircle2,
              color: 'text-[#2E7D32]',
            },
            pending_review: {
              badge: 'bg-blue-50 text-blue-800 border-blue-200',
              label: 'Pending Review',
              icon: Clock,
              color: 'text-[#2563EB]',
            },
            needs_correction: {
              badge: 'bg-amber-50 text-amber-800 border-amber-200',
              label: 'Needs Correction',
              icon: AlertTriangle,
              color: 'text-[#D97706]',
            },
            rejected: {
              badge: 'bg-rose-50 text-rose-800 border-rose-200',
              label: 'Rejected',
              icon: XCircle,
              color: 'text-[#DC2626]',
            },
          }[doc.status];

          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex flex-col items-center justify-center font-bold text-xs shrink-0 border border-slate-200">
                  <span>{doc.fileType}</span>
                  <span className="text-[9px] font-normal text-slate-400">{doc.fileSize}</span>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-[#172033]">{doc.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                      {doc.version}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="font-semibold text-blue-700">{doc.ngoName}</span>
                    <span>•</span>
                    <span>Submitted: {doc.submissionDate}</span>
                    <span>•</span>
                    <span>Deadline: {doc.deadline}</span>
                    {doc.isOverdue && (
                      <span className="text-rose-600 font-bold">(Overdue)</span>
                    )}
                  </div>

                  {/* Feedback comment if any */}
                  {doc.feedbackReason && (
                    <div className="mt-2 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                      <strong className="font-bold">Staff Remarks: </strong>
                      {doc.feedbackReason}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Badge & Review Actions */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
                <span
                  className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${statusConfig.badge}`}
                >
                  <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.color}`} />
                  <span>{statusConfig.label}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedDocForPreview(doc)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preview</span>
                </button>

                {/* Review Action Controls */}
                {doc.status !== 'approved' && (
                  <button
                    type="button"
                    onClick={() => handleApprove(doc.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold transition-colors"
                  >
                    Approve
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleOpenActionModal(doc, 'correction')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-colors"
                >
                  Correction
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenActionModal(doc, 'reject')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Document Metadata Preview
                </span>
                <h3 className="text-lg font-bold text-[#172033]">{selectedDocForPreview.title}</h3>
                <p className="text-xs text-blue-600">{selectedDocForPreview.ngoName}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocForPreview(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Document Type</span>
                  <span className="font-semibold text-slate-800">{selectedDocForPreview.type}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Version</span>
                  <span className="font-semibold text-slate-800">{selectedDocForPreview.version}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">File Size / Format</span>
                  <span className="font-semibold text-slate-800">{selectedDocForPreview.fileSize} ({selectedDocForPreview.fileType})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Submission Date</span>
                  <span className="font-semibold text-slate-800">{selectedDocForPreview.submissionDate}</span>
                </div>
              </div>

              {selectedDocForPreview.feedbackReason && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                  <strong>Reviewer Feedback: </strong>
                  {selectedDocForPreview.feedbackReason}
                </div>
              )}

              {/* Simulated Document Paper Mockup */}
              <div className="mt-3 p-6 bg-white rounded-lg border border-dashed border-slate-300 text-center space-y-2">
                <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-xs font-semibold text-slate-700">Official Statutory Document Container</p>
                <p className="text-[11px] text-slate-400">
                  Digital cryptographic verification hash: SHA256: 8f9b...a10c
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setSelectedDocForPreview(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal (Correction or Rejection Reason) */}
      {modalAction && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#172033]">
                {modalAction === 'correction' ? 'Request Document Correction' : 'Reject Document'}
              </h3>
              <button
                type="button"
                onClick={() => setModalAction(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Please enter specific instructions for {targetDoc?.ngoName} regarding {targetDoc?.title}:
            </p>

            <textarea
              rows={4}
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              placeholder="Specify the reason or missing pages..."
              className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setModalAction(null)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-lg text-xs font-bold text-white transition-colors ${
                  modalAction === 'correction'
                    ? 'bg-amber-500 hover:bg-amber-600'
                    : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {modalAction === 'correction' ? 'Dispatch Correction Request' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
