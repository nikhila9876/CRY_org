import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Modal: Accessible, responsive modal dialog wrapper
 * Adheres to Section 12 & 16 of NGO360 specification.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className={`bg-white rounded-2xl border border-slate-200 w-full ${maxWidth} p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto`}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            {subtitle && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {subtitle}
              </span>
            )}
            <h3 id="modal-title" className="text-base sm:text-lg font-bold text-[#172033]">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="text-xs sm:text-sm text-slate-600 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}
