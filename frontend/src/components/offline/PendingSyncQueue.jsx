import React, { useState } from 'react';
import {
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  UploadCloud,
  Database,
  Trash2,
  ArrowUpRight,
  FileText,
  Camera,
  Mic,
  ListChecks,
  Check,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const INITIAL_QUEUE_ITEMS = [
  {
    id: 'queue-1',
    type: 'checklist',
    title: 'Audit Checklist Status & Inspector Remarks',
    target: 'Field Visit #FV-101',
    timestamp: '10 mins ago',
    size: '14 KB',
    status: 'pending', // 'pending' | 'syncing' | 'synced' | 'error'
    icon: ListChecks,
  },
  {
    id: 'queue-2',
    type: 'notes',
    title: 'Qualitative Field Observations & Action Plan',
    target: 'Field Visit #FV-101',
    timestamp: '6 mins ago',
    size: '8 KB',
    status: 'pending',
    icon: FileText,
  },
  {
    id: 'queue-3',
    type: 'photos',
    title: '2 Geo-Tagged Evidence Photos',
    target: 'Physical Voucher & Learning Center',
    timestamp: '3 mins ago',
    size: '1.8 MB',
    status: 'pending',
    icon: Camera,
  },
  {
    id: 'queue-4',
    type: 'audio',
    title: '1 Spoken Interview Voice Memo (01:34)',
    target: 'Peer Leader Sunita Audio Recording',
    timestamp: 'Just now',
    size: '740 KB',
    status: 'pending',
    icon: Mic,
  },
];

export default function PendingSyncQueue({ isOnline = true, onSyncComplete }) {
  const [queue, setQueue] = useState(INITIAL_QUEUE_ITEMS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState('2026-10-05 09:30 AM');
  const { toast } = useToast();

  const pendingCount = queue.filter((q) => q.status === 'pending' || q.status === 'error').length;
  const syncedCount = queue.filter((q) => q.status === 'synced').length;

  const handleSyncNow = async () => {
    if (!isOnline) {
      toast.warning('Cannot sync while offline. Please connect to internet or disable simulation mode.', 'Offline Mode');
      return;
    }

    setIsSyncing(true);
    setSyncProgress(10);

    // Step-by-step sync simulation
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: 'syncing' } : q))
      );

      await new Promise((r) => setTimeout(r, 600));

      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: 'synced' } : q))
      );
      setSyncProgress(Math.round(((i + 1) / queue.length) * 100));
    }

    setIsSyncing(false);
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastSyncTime(nowStr);
    toast.success('All local changes successfully synchronized with CRY NGO360 Central Server!', 'Sync Completed');

    if (onSyncComplete) onSyncComplete();
  };

  const handleClearSynced = () => {
    setQueue((prev) => prev.filter((q) => q.status !== 'synced'));
    toast.info('Cleared synced records from local cache view.', 'Cache Cleaned');
  };

  return (
    <div className="space-y-6">
      {/* Sync Control Header Card */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-[#0F766E] flex items-center justify-center shrink-0">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#172033]">
                IndexedDB Local Outbox & Sync Queue
              </h4>
              <p className="text-xs text-slate-500">
                {pendingCount > 0
                  ? `${pendingCount} item(s) buffered on this device waiting for server synchronization.`
                  : 'All field visit data is up to date with the central server.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {syncedCount > 0 && (
              <button
                type="button"
                onClick={handleClearSynced}
                className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold transition-colors"
              >
                Clear Synced
              </button>
            )}
            <button
              type="button"
              disabled={isSyncing || pendingCount === 0}
              onClick={handleSyncNow}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-xs transition-all ${
                isSyncing || pendingCount === 0
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                  : 'bg-[#0F766E] hover:bg-[#0D655E] cursor-pointer'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? `Syncing (${syncProgress}%)...` : 'Sync Queue Now'}
            </button>
          </div>
        </div>

        {/* Sync Progress Bar */}
        {isSyncing && (
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Transmitting local records over secure SSL...</span>
              <span className="text-[#0F766E]">{syncProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#0F766E] h-2 rounded-full transition-all duration-300"
                style={{ width: `${syncProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Sync Stats footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-slate-400" />
            <span>Storage: <strong>IndexedDB (CRY_FieldOps_DB)</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Last Remote Sync: <strong>{lastSyncTime}</strong></span>
          </div>
        </div>
      </div>

      {/* Queue Items Table / List */}
      <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Queue Records ({queue.length})
          </h5>
          <span className="text-xs font-bold text-slate-400">Deterministic FIFO Order</span>
        </div>

        <div className="divide-y divide-slate-100">
          {queue.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Queue is empty. No pending local mutations.
            </div>
          ) : (
            queue.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h6 className="text-xs sm:text-sm font-bold text-[#172033]">
                        {item.title}
                      </h6>
                      <div className="text-[11px] text-slate-500">{item.target}</div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span>{item.timestamp}</span>
                        <span>•</span>
                        <span>{item.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {item.status === 'pending' && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending Upload
                      </span>
                    )}
                    {item.status === 'syncing' && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Uploading...
                      </span>
                    )}
                    {item.status === 'synced' && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Synced to Server
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
