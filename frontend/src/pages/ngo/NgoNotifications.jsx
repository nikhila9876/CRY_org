import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  ArrowRight,
  Wifi,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { MOCK_ALERTS } from '../../mock/data/mockAlerts';

export default function NgoNotifications() {
  const [notifications, setNotifications] = useState(
    MOCK_ALERTS.filter((a) => a.recipientRole === 'ngo_member')
  );
  const [activeFilter, setActiveFilter] = useState('ALL');

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const filteredNotifs = notifications.filter((item) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'UNREAD') return !item.isRead;
    return item.category === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Reminders & Alerts
            </span>
            <span className="text-xs text-slate-500">Bachpan Bachao Trust</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            Notifications & Compliance Alerts
          </h1>
          <p className="text-sm text-slate-500">
            7-day deadline notices, document approval confirmations, correction requests, and field inspection reminders.
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
          { key: 'ALL', label: 'All Alerts' },
          { key: 'UNREAD', label: 'Unread' },
          { key: 'correction', label: '🟡 Correction Requests' },
          { key: 'deadline', label: '⏰ Deadlines' },
          { key: 'approval', label: '🟢 Approvals' },
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
        {filteredNotifs.map((notif) => {
          const config = {
            correction: {
              icon: AlertTriangle,
              color: 'text-[#D97706]',
              bg: 'bg-amber-50/70 border-amber-300',
              badge: 'bg-amber-100 text-amber-900',
              label: 'Action Required',
            },
            deadline: {
              icon: Clock,
              color: 'text-blue-600',
              bg: 'bg-blue-50/70 border-blue-200',
              badge: 'bg-blue-100 text-blue-800',
              label: 'Deadline Reminder',
            },
            approval: {
              icon: CheckCircle2,
              color: 'text-[#2E7D32]',
              bg: 'bg-emerald-50/70 border-emerald-200',
              badge: 'bg-emerald-100 text-emerald-800',
              label: 'Approved by CRY Staff',
            },
          }[notif.category] || {
            icon: Bell,
            color: 'text-slate-600',
            bg: 'bg-slate-50 border-slate-200',
            badge: 'bg-slate-100 text-slate-700',
            label: 'Notice',
          };

          const Icon = config.icon;

          return (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                notif.isRead ? 'bg-white border-slate-200/80 shadow-2xs' : `${config.bg} shadow-xs`
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    notif.isRead ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${config.badge}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-[11px] text-slate-400">• {notif.timestamp}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#172033]">
                    {notif.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {notif.message}
                  </p>

                  <div className="pt-2 flex items-center space-x-3 text-xs">
                    <Link
                      to={notif.actionUrl}
                      className="font-bold text-[#2E7D32] hover:text-[#1B5E20] flex items-center space-x-1"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    {!notif.isRead && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="text-slate-400 hover:text-slate-600 font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {!notif.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 mt-1" />
              )}
            </div>
          );
        })}

        {filteredNotifs.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No unread notifications</h3>
            <p className="text-xs text-slate-500 mt-1">You are all caught up on deliverables.</p>
          </div>
        )}
      </div>
    </div>
  );
}
