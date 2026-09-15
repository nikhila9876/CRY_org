import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  AlertCircle,
  FileCheck,
  Building2,
  DollarSign,
  MapPin,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { MOCK_NGOS } from '../../mock/data/mockNgos';

export const ANNUAL_TIMELINE_EVENTS = [
  {
    id: 'evt-1',
    quarter: 'Q1 (Apr - Jun)',
    date: '2026-04-15',
    title: 'Annual Grant Agreement Execution & Tranche 1 Disbursal',
    type: 'disbursal',
    status: 'completed',
    ngoId: 'all',
    description: 'Grant agreement signed and initial 35% mobilization tranche released to all active partners.',
    documentsRequired: ['Project MOU', 'Bank Verification Form', 'Annual Activity Plan'],
  },
  {
    id: 'evt-2',
    quarter: 'Q1 (Apr - Jun)',
    date: '2026-06-30',
    title: 'Q1 Field Inspection & Baseline Validation',
    type: 'field_visit',
    status: 'completed',
    ngoId: 'all',
    description: 'On-ground verification of target enrollment in bridge learning centers and nutrition camps.',
    documentsRequired: ['Quarterly Field Visit Report', 'Attendance Registers'],
  },
  {
    id: 'evt-3',
    quarter: 'Q2 (Jul - Sep)',
    date: '2026-07-31',
    title: 'Income Tax Return (ITR-7) & Annual Audit Verification',
    type: 'compliance',
    status: 'completed',
    ngoId: 'all',
    description: 'Statutory compliance verification on income tax portal with audited balance sheets.',
    documentsRequired: ['ITR-7 Acknowledgement', 'Audited Financial Statements'],
  },
  {
    id: 'evt-4',
    quarter: 'Q2 (Jul - Sep)',
    date: '2026-08-31',
    title: 'Mid-Year DRS Review & Tranche 2 Disbursal Checkpoint',
    type: 'disbursal',
    status: 'completed',
    ngoId: 'ngo-1',
    description: 'Desk Review & Scrutiny (DRS Stage 2) for financial ledger reconciliation.',
    documentsRequired: ['Financial Utilization Report (FUR-H1)', 'Bank Statements'],
  },
  {
    id: 'evt-5',
    quarter: 'Q2 (Jul - Sep)',
    date: '2026-09-05',
    title: 'FC-4 Foreign Contribution Annual Return Deadline',
    type: 'compliance',
    status: 'overdue',
    ngoId: 'ngo-3',
    description: 'Statutory deadline for filing FC-4 on Ministry of Home Affairs portal.',
    documentsRequired: ['FC-4 Form', 'MHA Acknowledgement Receipt', 'Chartered Accountant Certificate'],
  },
  {
    id: 'evt-6',
    quarter: 'Q2 (Jul - Sep)',
    date: '2026-09-20',
    title: 'Q2 Program Report & Utilization Certificate Filing',
    type: 'document',
    status: 'in_progress',
    ngoId: 'all',
    description: 'Submission of quarterly progress metrics against planned KPIs and expense vouchers.',
    documentsRequired: ['Utilization Certificate (Q2)', 'Program Narrative Report'],
  },
  {
    id: 'evt-7',
    quarter: 'Q3 (Oct - Dec)',
    date: '2026-10-05',
    title: 'Quarterly Field Visit: Seelampur & Barmer Operations',
    type: 'field_visit',
    status: 'upcoming',
    ngoId: 'ngo-1',
    description: 'Quarterly field inspection and classroom observation in urban slums and desert clusters.',
    documentsRequired: ['Offline Field Inspection Checklist', 'Community Survey Notes'],
  },
  {
    id: 'evt-8',
    quarter: 'Q3 (Oct - Dec)',
    date: '2026-11-30',
    title: 'Tranche 3 Fund Disbursal Checkpoint',
    type: 'disbursal',
    status: 'upcoming',
    ngoId: 'all',
    description: 'Release of 30% project tranche subject to clearance of Q2 Utilization Certificates.',
    documentsRequired: ['Approved UC-Q2', 'DRS Stage 2 Sign-off'],
  },
  {
    id: 'evt-9',
    quarter: 'Q4 (Jan - Mar)',
    date: '2027-03-31',
    title: 'Annual Project Evaluation & Impact Assessment',
    type: 'evaluation',
    status: 'upcoming',
    ngoId: 'all',
    description: 'Comprehensive annual evaluation of child protection outcomes and end-of-year grant closure.',
    documentsRequired: ['Annual Program Impact Report', 'Final Audited Utilization Certificate'],
  },
];

export default function StaffTimeline() {
  const [selectedNgoFilter, setSelectedNgoFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');

  const filteredEvents = ANNUAL_TIMELINE_EVENTS.filter((evt) => {
    const matchesNgo =
      selectedNgoFilter === 'ALL' || evt.ngoId === 'all' || evt.ngoId === selectedNgoFilter;
    const matchesStatus =
      selectedStatusFilter === 'ALL' || evt.status === selectedStatusFilter;
    return matchesNgo && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              Annual Governance
            </span>
            <span className="text-xs text-slate-500">Project Cycle 2025-2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            CRY Master Project Timeline & Milestones
          </h1>
          <p className="text-sm text-slate-500">
            Chronological roadmap of quarterly visits, DRS reviews, statutory filing deadlines, and fund disbursal tranches.
          </p>
        </div>

        <Link
          to="/staff/projects"
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
        >
          <span>View Project Cards</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Filter Status:</span>
          </span>
          {['ALL', 'completed', 'in_progress', 'upcoming', 'overdue'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedStatusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' && 'All Checkpoints'}
              {st === 'completed' && '🟢 Completed'}
              {st === 'in_progress' && '🔵 In Progress'}
              {st === 'upcoming' && '🟡 Upcoming'}
              {st === 'overdue' && '🔴 Overdue'}
            </button>
          ))}

          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider ml-2">
            NGO:
          </span>
          <select
            value={selectedNgoFilter}
            onChange={(e) => setSelectedNgoFilter(e.target.value)}
            className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="ALL">All Partners (Master Cycle)</option>
            {MOCK_NGOS.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 relative">
        {/* Continuous timeline vertical line */}
        <div className="absolute left-9 top-10 bottom-10 w-0.5 bg-slate-200 hidden sm:block" />

        <div className="space-y-8">
          {filteredEvents.map((evt, idx) => {
            const statusConfig = {
              completed: {
                icon: CheckCircle2,
                color: 'text-[#2E7D32]',
                bg: 'bg-emerald-50 border-emerald-300',
                badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                label: 'Completed',
              },
              in_progress: {
                icon: Clock,
                color: 'text-[#2563EB]',
                bg: 'bg-blue-50 border-blue-300',
                badge: 'bg-blue-50 text-blue-800 border-blue-200',
                label: 'In Progress',
              },
              upcoming: {
                icon: Calendar,
                color: 'text-[#D97706]',
                bg: 'bg-amber-50 border-amber-300',
                badge: 'bg-amber-50 text-amber-800 border-amber-200',
                label: 'Upcoming Milestone',
              },
              overdue: {
                icon: AlertCircle,
                color: 'text-[#DC2626]',
                bg: 'bg-rose-50 border-rose-300',
                badge: 'bg-rose-50 text-rose-800 border-rose-200',
                label: 'Overdue Deadline',
              },
            }[evt.status];

            const Icon = statusConfig.icon;

            return (
              <div key={evt.id} className="relative flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-6">
                {/* Node icon */}
                <div
                  className={`w-8 h-8 rounded-full border-2 ${statusConfig.bg} flex items-center justify-center shrink-0 z-10 sm:ml-5 shadow-xs`}
                >
                  <Icon className={`w-4 h-4 ${statusConfig.color}`} />
                </div>

                {/* Event Card */}
                <div className="flex-1 bg-slate-50/60 rounded-xl border border-slate-200/80 p-4 hover:border-blue-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          {evt.quarter}
                        </span>
                        <span>•</span>
                        <span className="text-xs font-semibold text-slate-700">{evt.date}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#172033] mt-0.5">
                        {evt.title}
                      </h3>
                    </div>

                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border self-start sm:self-auto ${statusConfig.badge}`}
                    >
                      {statusConfig.label}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Required Documents Tags */}
                  {evt.documentsRequired && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase">
                        Prerequisites:
                      </span>
                      {evt.documentsRequired.map((docName) => (
                        <span
                          key={docName}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium"
                        >
                          {docName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
