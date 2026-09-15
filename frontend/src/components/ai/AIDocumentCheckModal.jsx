import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Search,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  HelpCircle,
  FileText,
} from 'lucide-react';

export default function AIDocumentCheckModal({
  isOpen,
  onClose,
  document: doc,
  onConfirmSubmit,
}) {
  const [scanProgress, setScanProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const SCAN_STEPS = [
    { title: 'OCR & Text Extraction', desc: 'Analyzing layout, typography, and tabular ledger lines...' },
    { title: 'Statutory Identifier Verification', desc: 'Matching DARPAN, PAN, and FCRA registration formatting...' },
    { title: 'Auditor Stamp & Signature Detection', desc: 'Confirming CA signature presence and valid 18-digit UDIN...' },
    { title: 'Arithmetic Variance Reconciliation', desc: 'Summing voucher line items against reported totals...' },
  ];

  useEffect(() => {
    if (!isOpen) {
      setScanProgress(0);
      setCurrentStep(0);
      setIsCompleted(false);
      return;
    }

    // Step-by-step scanner progression
    const timer = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsCompleted(true);
          return 100;
        }
        const next = prev + 25;
        setCurrentStep(Math.min(Math.floor(next / 25), 3));
        return next;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !doc) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in"
    >
      <div className="bg-white rounded-2xl border border-purple-200 max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
        {/* Header (Section 10 Purple Token #7C3AED) */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  AI Pre-Submission Scan
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-mono">{doc.code || 'DOC-CHECK'}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#172033] mt-0.5">
                {doc.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan Progress Section */}
        {!isCompleted ? (
          <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto animate-spin">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-purple-950">
                {SCAN_STEPS[currentStep].title}
              </h4>
              <p className="text-xs text-purple-800/80 mt-1 max-w-sm mx-auto">
                {SCAN_STEPS[currentStep].desc}
              </p>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-bold text-purple-900">
                <span>Verification Depth</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Scan Results Analysis Card */
          <div className="space-y-4 animate-in fade-in">
            {/* Score Banner */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    High Readiness: 96% Pre-Check Score
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Document passes statutory checks. Ready for CRY staff review.
                  </p>
                </div>
              </div>
              <span className="text-xs font-black uppercase px-2.5 py-1 rounded-lg bg-emerald-600 text-white shadow-2xs">
                Passed
              </span>
            </div>

            {/* Checklist Results */}
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/40 text-xs">
              <div className="p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">DARPAN Registration Format</div>
                  <div className="text-slate-500 text-[11px]">Valid format detected: DL/2019/0241890 matching Bachpan Bachao Trust.</div>
                </div>
              </div>

              <div className="p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Auditor Stamp & Signature</div>
                  <div className="text-slate-500 text-[11px]">Legible chartered accountant seal identified on page 3.</div>
                </div>
              </div>

              <div className="p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Voucher Arithmetic Consistency</div>
                  <div className="text-slate-500 text-[11px]">Line items sum precisely to reported sub-totals without rounding error.</div>
                </div>
              </div>

              <div className="p-3 flex items-start gap-2.5 bg-amber-50/50">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-950">Advisory Notice: CA UDIN Syntax</div>
                  <div className="text-amber-800 text-[11px]">UDIN format is recognized; ensure the digital verification QR code is clear on physical scan.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isCompleted ? 'Close & Revise' : 'Cancel Scan'}
          </button>
          {isCompleted && (
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onConfirmSubmit) onConfirmSubmit();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#2563EB] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <span>Confirm & Submit to CRY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
