import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  AlertCircle,
  Wifi,
  WifiOff,
  RefreshCw,
  FileText,
  Calendar,
  ArrowRight,
} from 'lucide-react';

/**
 * HealthScoreCard: Circular SVG progress ring and score breakdown
 */
export function HealthScoreCard({ score = 78, riskLevel = 'medium', className = '' }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color =
    score >= 90 ? '#2E7D32' : score >= 70 ? '#D97706' : '#DC2626';

  return (
    <div className={`p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs flex items-center justify-between ${className}`}>
      <div>
        <span className="text-xs font-semibold text-slate-500 block">Compliance Standing</span>
        <div className="flex items-baseline space-x-1.5 mt-1">
          <span className="text-3xl font-black text-[#172033]">{score}%</span>
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              score >= 90
                ? 'text-[#2E7D32]'
                : score >= 70
                ? 'text-[#D97706]'
                : 'text-[#DC2626]'
            }`}
          >
            {riskLevel} Risk
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          {score >= 90
            ? 'All statutory returns and UCs cleared.'
            : '1 pending correction requires attention.'}
        </p>
      </div>

      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#F1F5F9"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className="absolute font-black text-xs text-[#172033]">{score}%</span>
      </div>
    </div>
  );
}

/**
 * SyncStatusBadge: Visual sync state indicator
 * States: 'offline' | 'waiting_to_sync' | 'syncing' | 'synced' | 'sync_failed'
 */
export function SyncStatusBadge({ status = 'synced', pendingCount = 0 }) {
  const configs = {
    synced: {
      label: 'Cloud Synced',
      classes: 'bg-teal-50 text-teal-800 border-teal-200',
      icon: CheckCircle2,
      color: 'text-[#0F766E]',
    },
    syncing: {
      label: 'Syncing Data...',
      classes: 'bg-teal-50 text-teal-800 border-teal-200',
      icon: RefreshCw,
      color: 'text-[#0F766E] animate-spin',
    },
    waiting_to_sync: {
      label: `${pendingCount} Draft(s) Queued`,
      classes: 'bg-amber-50 text-amber-800 border-amber-300',
      icon: Clock,
      color: 'text-[#D97706]',
    },
    offline: {
      label: 'Saved on Device',
      classes: 'bg-slate-100 text-slate-700 border-slate-300',
      icon: WifiOff,
      color: 'text-slate-500',
    },
    sync_failed: {
      label: 'Sync Error',
      classes: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: AlertCircle,
      color: 'text-[#DC2626]',
    },
  };

  const config = configs[status] || configs.synced;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-2xs ${config.classes}`}
    >
      <Icon className={`w-3 h-3 ${config.color} shrink-0`} />
      <span>{config.label}</span>
    </span>
  );
}

/**
 * FilterChips: Reusable chip selector
 */
export function FilterChips({ options, activeKey, onSelect, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 text-xs ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onSelect(opt.key)}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
            activeKey === opt.key
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {opt.label}
          {opt.count !== undefined && (
            <span className="ml-1.5 opacity-80 text-[10px]">({opt.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
