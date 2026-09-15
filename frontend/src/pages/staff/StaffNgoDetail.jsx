import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Calendar,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Clock,
  ShieldCheck,
  TrendingUp,
  FileText,
  Send,
  AlertCircle,
} from 'lucide-react';
import { MOCK_NGOS } from '../../mock/data/mockNgos';
import { MOCK_PROJECTS } from '../../mock/data/mockProjects';
import { MOCK_DOCUMENTS } from '../../mock/data/mockDocuments';
import { MOCK_FIELD_VISITS } from '../../mock/data/mockFieldVisits';

export default function StaffNgoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reminderSent, setReminderSent] = useState(false);

  const ngo = MOCK_NGOS.find((n) => n.id === id) || MOCK_NGOS[0];
  const projects = MOCK_PROJECTS.filter((p) => p.ngoId === ngo.id);
  const documents = MOCK_DOCUMENTS.filter((d) => d.ngoId === ngo.id);
  const visits = MOCK_FIELD_VISITS.filter((v) => v.ngoId === ngo.id);

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Back Button & Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/staff/ngos')}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Partner Directory</span>
        </button>

        <div className="flex items-center space-x-2">
          <Link
            to={`/staff/field-visits?ngo=${ngo.id}`}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
          >
            Schedule Visit
          </Link>
          <button
            type="button"
            onClick={handleSendReminder}
            className="px-3 py-1.5 rounded-lg bg-[#D97706] hover:bg-amber-700 text-white text-xs font-semibold transition-colors flex items-center space-x-1"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{reminderSent ? 'Notice Dispatched ✓' : 'Send Compliance Reminder'}</span>
          </button>
        </div>
      </div>

      {/* Main NGO Profile Header */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2E7D32] to-emerald-500 text-white flex items-center justify-center font-black text-2xl shadow-sm shrink-0">
            {ngo.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-[#172033]">{ngo.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                {ngo.regNumber}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{ngo.district}, {ngo.state}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{ngo.contactEmail}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{ngo.contactPhone}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Compliance Score Gauge */}
        <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100 shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              Compliance Health
            </div>
            <div className="text-2xl font-black text-[#172033]">{ngo.complianceScore}%</div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                ngo.riskLevel === 'low'
                  ? 'text-emerald-600'
                  : ngo.riskLevel === 'medium'
                  ? 'text-amber-600'
                  : 'text-rose-600'
              }`}
            >
              {ngo.riskLevel} Risk
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-xs text-emerald-700 bg-emerald-50">
            ✓
          </div>
        </div>
      </div>

      {/* Grid: Legal Identity & Oversight Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Statutory Registrations */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Statutory & Legal Verification
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">DARPAN Portal ID</span>
              <span className="font-semibold text-slate-800">DL/2019/02194</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">FCRA Registration</span>
              <span className="font-semibold text-emerald-700">Valid (FCRA-99410)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">12A / 80G Certificate</span>
              <span className="font-semibold text-emerald-700">Perpetual Approved</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">Primary Bank Verification</span>
              <span className="font-semibold text-emerald-700">SBI Main Branch ✓</span>
            </div>
          </div>
        </div>

        {/* Card 2: Current Operations */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Field Lead & Schedule
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">Assigned Frontliner</span>
              <span className="font-semibold text-slate-800">{ngo.assignedStaff}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">Project Cycle</span>
              <span className="font-semibold text-slate-800">{ngo.currentCycle}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-600">Last Field Visit</span>
              <span className="font-semibold text-slate-800">{ngo.lastVisitedDate}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-teal-50 border border-teal-100">
              <span className="text-teal-900 font-semibold">Next Scheduled Visit</span>
              <span className="font-bold text-teal-800">{ngo.nextVisitDate}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Action Items Summary */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Pending Tasks & Action Items
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
              <div className="font-bold">Utilization Certificate Revision</div>
              <div className="text-[11px] text-amber-800 mt-0.5">Correction feedback sent on Sept 10</div>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
              <div className="font-bold">Quarterly Program Report Review</div>
              <div className="text-[11px] text-blue-800 mt-0.5">Awaiting staff sign-off</div>
            </div>
          </div>
        </div>
      </div>

      {/* Linked Documents Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#172033]">Compliance Documents History</h2>
            <p className="text-xs text-slate-500">Statutory and quarterly reporting files submitted by this partner</p>
          </div>
          <Link
            to={`/staff/documents?ngo=${ngo.id}`}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Manage in Document Reviewer →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                  {doc.fileType}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{doc.title}</div>
                  <div className="text-[11px] text-slate-400">
                    Version: {doc.version} • Submitted: {doc.submissionDate} • Due: {doc.deadline}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    doc.status === 'approved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : doc.status === 'needs_correction'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {doc.status.replace('_', ' ').toUpperCase()}
                </span>
                <Link
                  to="/staff/documents"
                  className="px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-200 hover:bg-white text-slate-700"
                >
                  Inspect
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
