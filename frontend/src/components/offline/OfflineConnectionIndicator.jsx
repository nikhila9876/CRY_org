import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Radio,
  Signal,
  SignalZero,
  SignalLow,
  SignalMedium,
  CheckCircle2,
  AlertTriangle,
  Info,
  Server,
  Database,
  RefreshCw,
} from 'lucide-react';

/**
 * OfflineConnectionIndicator: Real-time network detection & connectivity simulation bar
 * Adheres to Section 10 (Teal for sync/offline) & Section 14 (Offline Field Mode).
 */
export default function OfflineConnectionIndicator({
  onStatusChange,
  className = '',
}) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);
  const [networkType, setNetworkType] = useState('4G LTE');
  const [latencyMs, setLatencyMs] = useState(48);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (onStatusChange) onStatusChange({ isOnline: true, isSimulated: isSimulatedOffline });
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (onStatusChange) onStatusChange({ isOnline: false, isSimulated: isSimulatedOffline });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Optional navigator.connection check
    if (navigator.connection) {
      setNetworkType(navigator.connection.effectiveType?.toUpperCase() || '4G LTE');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isSimulatedOffline, onStatusChange]);

  const effectiveOffline = !isOnline || isSimulatedOffline;

  const toggleSimulation = () => {
    const nextState = !isSimulatedOffline;
    setIsSimulatedOffline(nextState);
    if (onStatusChange) {
      onStatusChange({ isOnline: isOnline && !nextState, isSimulated: nextState });
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Network Ribbon */}
      <div
        className={`px-4 py-2.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-all shadow-xs ${
          effectiveOffline
            ? 'bg-amber-50/90 border-amber-200/90 text-amber-950'
            : 'bg-teal-50/90 border-teal-200/90 text-teal-950'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              effectiveOffline ? 'bg-amber-500 animate-pulse' : 'bg-[#0F766E]'
            }`}
          />
          {effectiveOffline ? (
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <WifiOff className="w-4 h-4" />
              <span>Offline Field Mode Active</span>
              {isSimulatedOffline && (
                <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 ml-1">
                  Simulation
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 font-bold text-[#0F766E]">
              <Wifi className="w-4 h-4" />
              <span>Online Network Connected</span>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-teal-200 text-teal-900 ml-1">
                {networkType}
              </span>
            </div>
          )}

          <span className="hidden md:inline text-slate-300">•</span>
          <span className="hidden md:inline text-slate-600 text-xs">
            {effectiveOffline
              ? 'Zero network requests. Local IndexedDB actively buffering form mutations.'
              : 'Direct bidirectional sync enabled with central CRY NGO360 server.'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSimulation}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-2xs ${
              isSimulatedOffline
                ? 'bg-slate-800 text-white hover:bg-slate-700'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {isSimulatedOffline ? 'Resume Real Network' : 'Simulate Low Connectivity'}
          </button>

          <button
            type="button"
            onClick={() => setShowDiagnostics(!showDiagnostics)}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white/60 transition-colors"
            title="Toggle network diagnostics"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Diagnostics Drawer Popover */}
      {showDiagnostics && (
        <div className="absolute top-full left-0 right-0 mt-2 z-30 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-[#0F766E]" />
              Network & Storage Diagnostics
            </h5>
            <button
              type="button"
              onClick={() => setShowDiagnostics(false)}
              className="text-xs text-slate-400 hover:text-slate-700 font-bold"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">Hardware Status</div>
              <div className="font-bold text-slate-800 mt-0.5">
                {isOnline ? 'Online (Physical NIC)' : 'No Connection'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">Simulated State</div>
              <div className="font-bold text-slate-800 mt-0.5">
                {isSimulatedOffline ? 'Forced Offline' : 'Pass-through'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">Roundtrip Latency</div>
              <div className="font-bold text-slate-800 mt-0.5">
                {effectiveOffline ? '∞ (Offline)' : `${latencyMs} ms`}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">IndexedDB Cache</div>
              <div className="font-bold text-teal-700 mt-0.5">
                2.4 MB allocated
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
