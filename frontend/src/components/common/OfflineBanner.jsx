import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, AlertCircle } from 'lucide-react';

/**
 * OfflineBanner: Real-time network and synchronization indicator
 * Complies with Section 7 & 10 (Teal/Amber/Red indicators).
 */
export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Read initial pending count from localStorage if available
    try {
      const count = parseInt(localStorage.getItem('ngo360_pending_sync_count') || '0', 10);
      setPendingSyncCount(count);
    } catch {
      // Ignore
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const effectivelyOffline = !isOnline || isSimulatedOffline;

  if (!effectivelyOffline && pendingSyncCount === 0) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors duration-200 border-b flex items-center justify-between shadow-xs ${
        effectivelyOffline
          ? 'bg-amber-50 border-amber-200 text-amber-900'
          : 'bg-teal-50 border-teal-200 text-teal-900'
      }`}
    >
      <div className="flex items-center space-x-2.5 max-w-7xl mx-auto w-full">
        {effectivelyOffline ? (
          <WifiOff className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
        ) : (
          <RefreshCw className="w-4 h-4 text-teal-600 shrink-0" />
        )}
        <div className="flex-1 flex flex-wrap items-center justify-between gap-2">
          <span>
            {effectivelyOffline ? (
              <>
                <strong className="font-semibold">Offline Mode Active:</strong> Field reports and checklists are saved locally on this device.
              </>
            ) : (
              <>
                <strong className="font-semibold">Online:</strong> {pendingSyncCount} draft(s) waiting for cloud synchronization.
              </>
            )}
          </span>
          {pendingSyncCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-white text-teal-800 border border-teal-300">
              {pendingSyncCount} queued
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
