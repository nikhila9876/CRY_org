import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type = 'info', title, message, duration = 4000, action }) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast = { id, type, title, message, action };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const toast = {
    success: (message, title = 'Success', duration = 4000) =>
      showToast({ type: 'success', title, message, duration }),
    error: (message, title = 'Error', duration = 5000) =>
      showToast({ type: 'error', title, message, duration }),
    warning: (message, title = 'Warning', duration = 4500) =>
      showToast({ type: 'warning', title, message, duration }),
    info: (message, title = 'Information', duration = 4000) =>
      showToast({ type: 'info', title, message, duration }),
    dismiss: dismissToast,
  };

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
          accent: 'bg-emerald-600',
        };
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200 text-red-900',
          icon: <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />,
          accent: 'bg-red-600',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
          accent: 'bg-amber-600',
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50 border-blue-200 text-blue-900',
          icon: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
          accent: 'bg-blue-600',
        };
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, dismissToast, toast }}>
      {children}
      {/* Toast Render Container */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3"
      >
        {toasts.map((t) => {
          const styles = getToastStyles(t.type);
          return (
            <div
              key={t.id}
              role="alert"
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg ${styles.bg} transition-all duration-200 animate-in slide-in-from-bottom-2`}
            >
              {styles.icon}
              <div className="flex-1 min-w-0">
                {t.title && (
                  <h4 className="text-xs font-bold leading-none mb-1">
                    {t.title}
                  </h4>
                )}
                {t.message && (
                  <p className="text-xs leading-relaxed opacity-90 break-words">
                    {t.message}
                  </p>
                )}
                {t.action && (
                  <button
                    type="button"
                    onClick={() => {
                      t.action.onClick();
                      dismissToast(t.id);
                    }}
                    className="mt-2 text-xs font-semibold underline hover:opacity-80 transition-opacity"
                  >
                    {t.action.label}
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
