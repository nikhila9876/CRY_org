import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';

/**
 * DocumentStatusBadge: Semantic status indicator across CRY Staff and NGO dashboards
 * Adheres to Section 4.4, 5.3 & Section 10 multi-color guidelines.
 */
export default function DocumentStatusBadge({ status, size = 'md' }) {
  const configs = {
    approved: {
      icon: CheckCircle2,
      label: 'Approved',
      classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconColor: 'text-[#2E7D32]',
    },
    pending_review: {
      icon: Clock,
      label: 'Pending Review',
      classes: 'bg-blue-50 text-blue-800 border-blue-200',
      iconColor: 'text-[#2563EB]',
    },
    needs_correction: {
      icon: AlertTriangle,
      label: 'Needs Correction',
      classes: 'bg-amber-100 text-amber-900 border-amber-300',
      iconColor: 'text-[#D97706]',
    },
    rejected: {
      icon: XCircle,
      label: 'Rejected',
      classes: 'bg-rose-50 text-rose-800 border-rose-200',
      iconColor: 'text-[#DC2626]',
    },
  };

  const config = configs[status] || configs.pending_review;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-2.5 py-1 text-[10px]',
    lg: 'px-3 py-1.5 text-xs',
  }[size] || 'px-2.5 py-1 text-[10px]';

  return (
    <span
      className={`inline-flex items-center space-x-1 font-bold uppercase tracking-wider rounded-full border shadow-2xs ${sizeClasses} ${config.classes}`}
    >
      <Icon className={`w-3 h-3 ${config.iconColor} shrink-0`} />
      <span>{config.label}</span>
    </span>
  );
}
