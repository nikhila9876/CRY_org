import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  WifiOff,
  Wifi,
  Save,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Building2,
  FileText,
  Camera,
  Mic,
  ListChecks,
  RefreshCw,
  AlertTriangle,
  UploadCloud,
} from 'lucide-react';
import { MOCK_FIELD_VISITS } from '../../mock/data/mockFieldVisits';
import OfflineChecklist from '../../components/offline/OfflineChecklist';
import OfflineNotes from '../../components/offline/OfflineNotes';

export default function OfflineFieldVisit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find target visit or default to first
  const visitData =
    MOCK_FIELD_VISITS.find((v) => v.id === id) || MOCK_FIELD_VISITS[0];

  const [activeTab, setActiveTab] = useState('checklist');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [simulatedOffline, setSimulatedOffline] = useState(false);
  const [lastSaved, setLastSaved] = useState('Just now');
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  // Network listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const effectiveOffline = !isOnline || simulatedOffline;

  const handleManualSave = () => {
    setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setHasPendingChanges(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner: Connection & Storage State */}
      <div
        className={`px-4 py-3 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-colors ${
          effectiveOffline
            ? 'bg-amber-50/80 border-amber-200 text-amber-900'
            : 'bg-teal-50/80 border-teal-200 text-teal-900'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {effectiveOffline ? (
            <div className="flex items-center gap-1.5 text-amber-700 font-bold">
              <WifiOff className="w-4 h-4" />
              <span>Offline Field Mode Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-teal-700 font-bold">
              <Wifi className="w-4 h-4" />
              <span>Online Network Connected</span>
            </div>
          )}
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline">
            {effectiveOffline
              ? 'Changes are being saved locally to IndexedDB storage.'
              : 'Direct live sync available with central CRY server.'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSimulatedOffline(!simulatedOffline)}
            className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-slate-700 border border-slate-300 text-xs font-semibold shadow-2xs transition-colors"
          >
            {simulatedOffline ? 'Resume Real Network' : 'Simulate Low Connectivity'}
          </button>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 pl-2 border-l border-slate-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Saved: {lastSaved}</span>
          </div>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/staff/field-visits"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Return to field visits list"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#2563EB]/10 text-[#2563EB]">
                  {visitData.id.toUpperCase()}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Cached on Device
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#172033] mt-1">
                {visitData.projectTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleManualSave}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-colors"
            >
              <Save className="w-4 h-4 text-slate-500" />
              Save Draft
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <UploadCloud className="w-4 h-4" />
              Sync Visit
            </button>
          </div>
        </div>

        {/* Meta details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-slate-600">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Partner NGO</div>
              <div className="font-semibold text-slate-800">{visitData.ngoName}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Location</div>
              <div className="font-semibold text-slate-800 truncate max-w-[200px]" title={visitData.location}>
                {visitData.location}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Scheduled Date</div>
              <div className="font-semibold text-slate-800">{visitData.scheduledDate}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Assigned Officer</div>
              <div className="font-semibold text-slate-800">{visitData.staffName}</div>
            </div>
          </div>
        </div>

        {/* Field Verification Progress */}
        <div className="pt-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1.5">
            <span>Field Verification Progress</span>
            <span className="text-[#0F766E]">45% Complete</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#0F766E] h-2 rounded-full transition-all duration-300"
              style={{ width: '45%' }}
            />
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-px">
        {[
          { id: 'checklist', label: 'Checklist & Criteria', icon: ListChecks, badge: '4/8' },
          { id: 'notes', label: 'Observation Notes', icon: FileText, badge: 'Drafted' },
          { id: 'photos', label: 'Geo-Tagged Photos', icon: Camera, badge: '3 captured' },
          { id: 'audio', label: 'Voice Memos', icon: Mic, badge: '1 memo' },
          { id: 'sync', label: 'Sync Queue', icon: RefreshCw, badge: '2 pending' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-[#0F766E] text-[#0F766E] bg-teal-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-teal-100 text-teal-900'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs min-h-[360px]">
        {activeTab === 'checklist' && (
          <OfflineChecklist onUpdate={() => setHasPendingChanges(true)} />
        )}

        {activeTab === 'notes' && (
          <OfflineNotes
            initialNotes={visitData.notes}
            onSave={() => setHasPendingChanges(true)}
          />
        )}

        {activeTab === 'photos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#172033]">
                  Geo-Tagged Photo Evidence
                </h3>
                <p className="text-xs text-slate-500">
                  Capture field activities, school classrooms, and ledger receipts.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F766E] text-white text-xs font-bold"
              >
                <Camera className="w-3.5 h-3.5" />
                Capture Photo
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer min-h-[140px]">
                <Camera className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-600">Add Field Photo</span>
                <span className="text-[10px] text-slate-400">Base64 / Local Blob</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audio' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#172033]">
                Offline Voice Memos
              </h3>
              <p className="text-xs text-slate-500">
                Record quick spoken interviews or voice logs when typing is inconvenient.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-[#0F766E] flex items-center justify-center mx-auto">
                <Mic className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Voice Note Recorder</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Press record to capture audio memos up to 5 minutes each. Audio is encoded locally in browser storage.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Mic className="w-4 h-4" />
                Start Voice Recording
              </button>
            </div>
          </div>
        )}

        {activeTab === 'sync' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#172033]">
                Pending Sync Queue & Storage
              </h3>
              <p className="text-xs text-slate-500">
                Items stored in browser IndexedDB waiting for connection restoration.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">2 Items Pending Remote Upload</div>
                <div className="text-[11px] text-slate-500">1 Check-in update, 1 Observation draft</div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F766E] text-white text-xs font-bold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Process Queue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
