import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FolderKanban,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileText,
  MapPin,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../mock/data/mockProjects';
import { MOCK_NGOS } from '../../mock/data/mockNgos';

export default function StaffProjects() {
  const [searchParams] = useSearchParams();
  const filterNgoId = searchParams.get('ngo');

  const [selectedCycle, setSelectedCycle] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const displayedProjects = MOCK_PROJECTS.filter((proj) => {
    const matchesNgo = !filterNgoId || proj.ngoId === filterNgoId;
    const matchesCycle = selectedCycle === 'ALL' || proj.cycle === selectedCycle;
    const matchesStatus = selectedStatus === 'ALL' || proj.status === selectedStatus;
    return matchesNgo && matchesCycle && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              Staff Operations
            </span>
            <span className="text-xs text-slate-500">Project Cycle Monitoring</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            Annual Projects, DRS Milestones & Fund Utilization
          </h1>
          <p className="text-sm text-slate-500">
            Track annual grant cycles, DRS scrutiny stages, tranche releases, and financial utilization.
          </p>
        </div>

        <Link
          to="/staff/timeline"
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-xs font-semibold text-white shadow-2xs transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>View Annual Master Timeline</span>
        </Link>
      </div>

      {/* Filter Chips */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Status:</span>
          {['ALL', 'on_track', 'needs_attention', 'critical'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedStatus === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' && 'All Projects'}
              {st === 'on_track' && '🟢 On Track'}
              {st === 'needs_attention' && '🟡 Needs Attention'}
              {st === 'critical' && '🔴 Critical'}
            </button>
          ))}

          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider ml-2">Cycle:</span>
          {['ALL', '2025-2026', '2026-2027'].map((cyc) => (
            <button
              key={cyc}
              type="button"
              onClick={() => setSelectedCycle(cyc)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedCycle === cyc
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cyc === 'ALL' ? 'All Cycles' : cyc}
            </button>
          ))}
        </div>

        {filterNgoId && (
          <Link
            to="/staff/projects"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Clear NGO filter (Showing filtered)
          </Link>
        )}
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedProjects.map((proj) => {
          const statusBadge =
            proj.status === 'on_track'
              ? 'bg-emerald-50 text-[#2E7D32] border-emerald-200'
              : proj.status === 'needs_attention'
              ? 'bg-amber-50 text-[#D97706] border-amber-200'
              : 'bg-rose-50 text-[#DC2626] border-rose-200';

          return (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      {proj.code} • Cycle {proj.cycle}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#172033] mt-0.5">
                      {proj.title}
                    </h3>
                    <Link
                      to={`/staff/ngos/${proj.ngoId}`}
                      className="text-xs font-semibold text-blue-600 hover:underline inline-block mt-0.5"
                    >
                      {proj.ngoName}
                    </Link>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 ${statusBadge}`}
                  >
                    {proj.status.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2">{proj.description}</p>

                {/* Financial Utilization Bar */}
                <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Financial Utilization</span>
                    <span className="font-black text-[#172033]">{proj.utilizationRate}%</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        proj.utilizationRate >= 75
                          ? 'bg-[#2E7D32]'
                          : proj.utilizationRate >= 50
                          ? 'bg-[#2563EB]'
                          : 'bg-[#DC2626]'
                      }`}
                      style={{ width: `${Math.min(proj.utilizationRate, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>Utilized: ₹{(proj.utilizedAmount / 100000).toFixed(2)} Lakhs</span>
                    <span>Total Grant: ₹{(proj.budget / 100000).toFixed(2)} Lakhs</span>
                  </div>
                </div>

                {/* Milestones & DRS Status */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg border border-slate-200/80 bg-white">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      DRS Milestone
                    </span>
                    <span className="font-bold text-slate-800 text-[11px] block mt-0.5 truncate">
                      {proj.drsMilestone}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200/80 bg-white">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      Disbursal Status
                    </span>
                    <span className="font-bold text-slate-800 text-[11px] block mt-0.5">
                      Tranche {proj.disbursedTranche} of {proj.totalTranches} Released
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200/80 bg-white">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      Annual Evaluation
                    </span>
                    <span className="font-bold text-blue-700 text-[11px] block mt-0.5">
                      {proj.annualEvaluationProgress}% Completed
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200/80 bg-white">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      Quarterly Visits
                    </span>
                    <span className="font-bold text-slate-800 text-[11px] block mt-0.5">
                      {proj.quarterlyVisitsCount} Visit(s) Logged
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Next Inspection: <strong>{proj.nextVisitDate}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(proj)}
                  className="inline-flex items-center space-x-1 font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>Milestone Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Deep-Dive Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Project Scrutiny & Milestones
                </span>
                <h3 className="text-lg font-bold text-[#172033]">{activeProjectModal.title}</h3>
                <p className="text-xs text-blue-600 font-medium">{activeProjectModal.ngoName}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="font-semibold text-slate-800">DRS Desk Review Milestone Breakdown:</div>
                <ul className="list-disc list-inside text-slate-600 space-y-1 pt-1">
                  <li><strong>Stage 1 (Eligibility & Governance):</strong> Verified & Signed off</li>
                  <li><strong>Stage 2 (Financial Ledger Reconciliation):</strong> {activeProjectModal.drsMilestone}</li>
                  <li><strong>Stage 3 (On-ground Impact Assessment):</strong> Scheduled for Q3 review</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                  <span className="text-blue-900 font-bold block">Fund Disbursal Plan</span>
                  <p className="text-slate-600 mt-1">
                    Tranche {activeProjectModal.disbursedTranche} released. Next tranche release pending Q2 UC verification.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-emerald-900 font-bold block">Utilization Health</span>
                  <p className="text-slate-600 mt-1">
                    {activeProjectModal.utilizationRate}% spent out of total ₹{(activeProjectModal.budget / 100000).toFixed(2)} Lakhs budget.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <Link
                to={`/staff/documents?ngo=${activeProjectModal.ngoId}`}
                className="px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
              >
                Review Project Documents
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
