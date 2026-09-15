import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  MinusCircle,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCheck,
} from 'lucide-react';

const INITIAL_CHECKLIST_DATA = [
  {
    id: 'chk-1',
    category: 'Beneficiary & Attendance',
    title: 'Physical Register Verification',
    description: 'Verify handwritten daily attendance logs against digital monthly MIS submissions.',
    status: 'pass',
    remarks: 'Checked attendance for 42 children across 2 learning centers. Roll matches MIS.',
  },
  {
    id: 'chk-2',
    category: 'Beneficiary & Attendance',
    title: 'Identity & Age Cohort Sampling',
    description: 'Sample 5 adolescent students to confirm age verification and dropout prevention tracking.',
    status: 'pending',
    remarks: '',
  },
  {
    id: 'chk-3',
    category: 'Financial & Ledger Audit',
    title: 'Voucher & Spot Receipt Cross-Check',
    description: 'Physical audit of spot purchase receipts (stationery, learning kits) against cash book.',
    status: 'issue',
    remarks: 'Receipt #8412 for INR 4,200 lacks vendor stamp and authorized project coordinator signature.',
  },
  {
    id: 'chk-4',
    category: 'Financial & Ledger Audit',
    title: 'Field Worker Honorarium Disbursement Proof',
    description: 'Confirm direct bank transfer receipts or signed cash acknowledgement for para-teachers.',
    status: 'pass',
    remarks: 'September bank advice sheets verified for all 6 community teachers.',
  },
  {
    id: 'chk-5',
    category: 'Child Safeguarding & Safety',
    title: 'CRY Child Protection Policy Display',
    description: 'Verify regional child helpline number (1098) and CRY policy board are visibly posted.',
    status: 'pass',
    remarks: 'Poster prominently displayed in Hindi and English at entrance.',
  },
  {
    id: 'chk-6',
    category: 'Child Safeguarding & Safety',
    title: 'Clean Drinking Water & Sanitation',
    description: 'Inspect operational washroom privacy, soap availability, and potable drinking water filter.',
    status: 'issue',
    remarks: 'Water purifier filter overdue for periodic replacement; temporary bottled drinking water supplied.',
  },
  {
    id: 'chk-7',
    category: 'Community Governance',
    title: 'VCPC Meeting Minutes Log',
    description: 'Review quarterly Village Child Protection Committee meeting minutes and attendee register.',
    status: 'pending',
    remarks: '',
  },
  {
    id: 'chk-8',
    category: 'Physical Infrastructure',
    title: 'Adequate Ventilation & First Aid Readiness',
    description: 'Classroom lighting, structural safety, emergency kit contents, and expiration dates.',
    status: 'pass',
    remarks: 'First aid kit refreshed in August 2026; antiseptic and bandages fully stocked.',
  },
];

export default function OfflineChecklist({ onUpdate }) {
  const [items, setItems] = useState(INITIAL_CHECKLIST_DATA);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedRemarks, setExpandedRemarks] = useState({});

  const handleStatusChange = (id, newStatus) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setItems(updated);
    if (onUpdate) onUpdate(updated);
  };

  const handleRemarksChange = (id, remarks) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, remarks } : item
    );
    setItems(updated);
    if (onUpdate) onUpdate(updated);
  };

  const toggleRemarks = (id) => {
    setExpandedRemarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Stats calculation
  const total = items.length;
  const passed = items.filter((i) => i.status === 'pass').length;
  const issues = items.filter((i) => i.status === 'issue').length;
  const na = items.filter((i) => i.status === 'na').length;
  const pending = items.filter((i) => i.status === 'pending').length;
  const completionPercentage = Math.round(((total - pending) / total) * 100);

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Checklist Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800">Compliant / Pass</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950 mt-1">{passed}</div>
          <span className="text-[11px] text-emerald-700">Verified on-ground</span>
        </div>

        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-800">Issues Flagged</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-950 mt-1">{issues}</div>
          <span className="text-[11px] text-red-700">Requires correction</span>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800">Pending Review</span>
            <HelpCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-950 mt-1">{pending}</div>
          <span className="text-[11px] text-amber-700">Awaiting inspection</span>
        </div>

        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-800">Completion</span>
            <CheckCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-teal-950 mt-1">{completionPercentage}%</div>
          <span className="text-[11px] text-teal-700">{total - pending} of {total} checked</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { id: 'all', label: `All (${total})` },
            { id: 'pass', label: `Pass (${passed})` },
            { id: 'issue', label: `Issues (${issues})` },
            { id: 'pending', label: `Pending (${pending})` },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeFilter === f.id
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Items List */}
      <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
        {filteredItems.map((item) => {
          const isExpanded = !!expandedRemarks[item.id];
          return (
            <div key={item.id} className="p-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                    {item.status === 'pass' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Pass
                      </span>
                    )}
                    {item.status === 'issue' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-800 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Issue Flagged
                      </span>
                    )}
                    {item.status === 'pending' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" /> Pending
                      </span>
                    )}
                    {item.status === 'na' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 flex items-center gap-1">
                        <MinusCircle className="w-3 h-3" /> N/A
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#172033]">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</p>
                </div>

                {/* Status Toggle Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(item.id, 'pass')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      item.status === 'pass'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(item.id, 'issue')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      item.status === 'issue'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    Issue
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(item.id, 'na')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      item.status === 'na'
                        ? 'bg-slate-700 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    N/A
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleRemarks(item.id)}
                    className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                      item.remarks
                        ? 'border-teal-300 bg-teal-50 text-teal-800'
                        : 'border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                    title="Add observation remarks"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Remarks field */}
              {(isExpanded || item.remarks) && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Inspector Observation Remarks:
                  </label>
                  <textarea
                    value={item.remarks}
                    onChange={(e) => handleRemarksChange(item.id, e.target.value)}
                    placeholder="Enter factual observations, photo cross-reference, or rectifying timeline..."
                    rows={2}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0F766E] text-slate-700 font-sans"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
