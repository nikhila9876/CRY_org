import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Calendar,
  FileText,
  Filter,
  ArrowRight,
  WifiOff,
  Sparkles,
} from 'lucide-react';
import { MOCK_ALERTS } from '../../mock/data/mockAlerts';

export default function StaffNotifications() {
  const [alerts, setAlerts] = useState(
    MOCK_ALERTS.filter((a) => a.recipientRole === 'cry_staff' || !a.recipientRole)
  );
  const [activeFilter, setActiveFilter] = useState('ALL');

  const handleMarkAsRead = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, isRead: true } : a))
    );
  };

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'UNREAD') return !alert.isRead;
    return alert.type === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              Staff Alerts
            </span>
            <span className="text-xs text-slate-500">Compliance & Operations Inbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            Staff Priority Alerts & Reminders
          </h1>
          <p className="text-sm text-slate-500">
            Real-time compliance alerts, overdue submissions, field visit schedules, and synchronization warnings.
          </p>
        </div>

        <button
          type="button"
          onClick={handleMarkAllRead}
          className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
        >
          Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs text-xs">
        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider px-2">
          Filter:
        </span>
        {[
          { key: 'ALL', label: 'All Notices' },
          { key: 'UNREAD', label: 'Unread' },
          { key: 'critical', label: '🔴 Critical Overdue' },
          { key: 'warning', label: '🟡 Deadlines & Visits' },
          { key: 'info', label: '🔵 Submissions' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveFilter(tab.key)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeFilter === tab.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const typeConfig = {
            critical: {
              icon: AlertCircle,
              color: 'text-[#DC2626]',
              bg: 'bg-rose-50/70 border-rose-200',
              badge: 'bg-rose-100 text-rose-800',
              label: 'Critical Risk',
            },
            warning: {
              icon: AlertTriangle,
              color: 'text-[#D97706]',
              bg: 'bg-amber-50/70 border-amber-200',
              badge: 'bg-amber-100 text-amber-800',
              label: 'Upcoming Deadline',
            },
            info: {
              icon: Info,
              color: 'text-[#2563EB]',
              bg: 'bg-blue-50/70 border-blue-200',
              badge: 'bg-blue-100 text-blue-800',
              label: 'Document Submission',
            },
          }[alert.type] || {
            icon: Info,
            color: 'text-slate-600',
            bg: 'bg-slate-50 border-slate-200',
            badge: 'bg-slate-100 text-slate-700',
            label: 'Notice',
          };

          const Icon = typeConfig.icon;

          return (
            <div
              key={alert.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                alert.isRead ? 'bg-white border-slate-200/80 shadow-2xs' : `${typeConfig.bg} shadow-xs`
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    alert.isRead ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${typeConfig.color}`} />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${typeConfig.badge}`}
                    >
                      {typeConfig.label}
                    </span>
                    <span className="font-bold text-xs text-slate-800">{alert.ngoName}</span>
                    <span className="text-[11px] text-slate-400">• {alert.timestamp}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#172033]">
                    {alert.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {alert.message}
                  </p>

                  <div className="pt-2 flex items-center space-x-3 text-xs">
                    <Link
                      to={alert.actionUrl}
                      className="font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    {!alert.isRead && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(alert.id)}
                        className="text-slate-400 hover:text-slate-600 font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {!alert.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 mt-1" />
              )}
            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">All alerts cleared</h3>
            <p className="text-xs text-slate-500 mt-1">No notices match your selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
