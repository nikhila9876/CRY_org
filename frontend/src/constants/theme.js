/**
 * NGO360 Design Tokens & Color System
 * Strictly adheres to Section 10 of NGO360 specification
 */

export const THEME_COLORS = {
  // Primary Green - NGO / nature / healthy / on-track status
  green: {
    DEFAULT: '#2E7D32',
    hover: '#1B5E20',
    light: '#E8F5E9',
    text: '#1B5E20',
    border: '#A5D6A7',
  },
  // Blue - Navigation, information, project progress
  blue: {
    DEFAULT: '#2563EB',
    hover: '#1D4ED8',
    light: '#EFF6FF',
    text: '#1E40AF',
    border: '#BFDBFE',
  },
  // Purple - AI features and intelligent insights
  purple: {
    DEFAULT: '#7C3AED',
    hover: '#6D28D9',
    light: '#F5F3FF',
    text: '#5B21B6',
    border: '#DDD6FE',
  },
  // Amber - Approaching deadlines and attention required
  amber: {
    DEFAULT: '#D97706',
    hover: '#B45309',
    light: '#FFFBEB',
    text: '#92400E',
    border: '#FDE68A',
  },
  // Red - Overdue and critical issues
  red: {
    DEFAULT: '#DC2626',
    hover: '#B91C1C',
    light: '#FEF2F2',
    text: '#991B1B',
    border: '#FECACA',
  },
  // Teal - Offline/online synchronization and system status
  teal: {
    DEFAULT: '#0F766E',
    hover: '#115E59',
    light: '#F0FDFA',
    text: '#134E4A',
    border: '#99F6E4',
  },
  // Neutrals
  neutral: {
    heading: '#172033',
    body: '#334155',
    secondary: '#64748B',
    muted: '#94A3B8',
    border: '#E2E8F0',
    bg: '#F8FAFC',
    card: '#FFFFFF',
  },
};

export const STATUS_THEMES = {
  // Document and task statuses
  approved: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Approved',
  },
  on_track: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'On Track',
  },
  pending_review: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
    label: 'Pending Review',
  },
  in_progress: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
    label: 'In Progress',
  },
  needs_correction: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'Needs Correction',
  },
  attention: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'Attention Required',
  },
  rejected: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
    label: 'Rejected',
  },
  overdue: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
    label: 'Overdue',
  },
  critical: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
    label: 'Critical Risk',
  },
  synced: {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
    dot: 'bg-teal-500',
    label: 'Synced',
  },
  syncing: {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
    dot: 'bg-teal-500',
    label: 'Syncing...',
  },
  waiting_to_sync: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'Waiting to Sync',
  },
  offline: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-300',
    dot: 'bg-slate-400',
    label: 'Offline Draft',
  },
  ai: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    dot: 'bg-purple-500',
    label: 'AI Insight',
  },
};
