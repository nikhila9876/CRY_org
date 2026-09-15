import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  DollarSign,
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../mock/data/mockProjects';

const NGO_MILESTONES = [
  {
    id: 'm-1',
    quarter: 'Q1 (Apr - Jun 2026)',
    date: 'April 15, 2026',
    title: 'Project Inception & Tranche 1 Fund Release',
    status: 'completed',
    description: 'Grant agreement signed and initial mobilization budget received in SBI dedicated account.',
    disbursalInfo: '₹6.50 Lakhs Received (Tranche 1 of 3)',
    documentRequired: 'Annual Activity Plan (Submitted ✓)',
    isActionRequired: false,
  },
  {
    id: 'm-2',
    quarter: 'Q1 (Apr - Jun 2026)',
    date: 'June 30, 2026',
    title: 'First Quarter Field Review by CRY Frontliner',
    status: 'completed',
    description: 'Field inspection completed by Priya Sharma across 4 bridge learning centers.',
    disbursalInfo: null,
    documentRequired: 'Q1 Field Report (Signed off ✓)',
    isActionRequired: false,
  },
  {
    id: 'm-3',
    quarter: 'Q2 (Jul - Sep 2026)',
    date: 'August 31, 2026',
    title: 'Mid-Year Financial Scrutiny (DRS Stage 2)',
    status: 'completed',
    description: 'First half-year financial statement and ledger reconciliation verified by CRY accounts.',
    disbursalInfo: 'Ledger Reconciled',
    documentRequired: 'FUR-H1 (Approved ✓)',
    isActionRequired: false,
  },
  {
    id: 'm-4',
    quarter: 'Q2 (Jul - Sep 2026)',
    date: 'September 15, 2026',
    title: 'Utilization Certificate (Q2) Resubmission',
    status: 'action_required',
    description: 'Resubmit revised UC-Q2 with clear CA stamp and variance clarification to trigger Tranche 2 disbursal.',
    disbursalInfo: 'Unlocks Tranche 2: ₹6.00 Lakhs',
    documentRequired: 'Revised Utilization Certificate (Q2)',
    isActionRequired: true,
    actionUrl: '/ngo/documents',
  },
  {
    id: 'm-5',
    quarter: 'Q2 (Jul - Sep 2026)',
    date: 'September 20, 2026',
    title: 'Q2 Program Progress Report Submission',
    status: 'in_progress',
    description: 'Quarterly achievement metrics, student roll counts, and classroom learning outcomes.',
    disbursalInfo: null,
    documentRequired: 'Program Report (Q2)',
    isActionRequired: true,
    actionUrl: '/ngo/documents',
  },
  {
    id: 'm-6',
    quarter: 'Q3 (Oct - Dec 2026)',
    date: 'October 05, 2026',
    title: 'Second Quarterly Field Inspection',
    status: 'upcoming',
    description: 'Frontliner Priya Sharma scheduled on-ground visit to Seelampur and Gautampuri learning centers.',
    disbursalInfo: null,
    documentRequired: 'Classroom Registers & Meal Logbooks',
    isActionRequired: false,
  },
  {
    id: 'm-7',
    quarter: 'Q4 (Jan - Mar 2027)',
    date: 'March 31, 2027',
    title: 'Annual Project Evaluation & Grant Closeout',
    status: 'upcoming',
    description: 'Final impact audit, external evaluation, and end-of-grant financial acquittal.',
    disbursalInfo: 'Final Tranche 3 Disbursal: ₹6.00 Lakhs',
    documentRequired: 'Final Audited UC & Annual Impact Report',
    isActionRequired: false,
  },
];

export default function NgoProjects() {
  const project = MOCK_PROJECTS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Grant Milestones
            </span>
            <span className="text-xs text-slate-500">Project Cycle 2025-2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            Annual Project Timeline & Milestones
          </h1>
          <p className="text-sm text-slate-500">
            A simple, step-by-step roadmap of deliverables required to keep your project on track and unlock grant funds.
          </p>
        </div>

        <Link
          to="/ngo/documents"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-xs font-bold text-white shadow-xs transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Upload Document</span>
        </Link>
      </div>

      {/* Grant Summary Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {project.code}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#172033] mt-0.5">
            {project.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{project.description}</p>
        </div>

        <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100 shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              Grant Utilization
            </div>
            <div className="text-2xl font-black text-[#172033]">{project.utilizationRate}%</div>
            <span className="text-[11px] text-slate-500">
              ₹{(project.utilizedAmount / 100000).toFixed(1)}L of ₹{(project.budget / 100000).toFixed(1)}L
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-[#2E7D32] flex items-center justify-center font-bold text-xs text-[#2E7D32] bg-emerald-50">
            {project.disbursedTranche}/{project.totalTranches}
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 relative">
        <div className="absolute left-9 top-10 bottom-10 w-0.5 bg-slate-200 hidden sm:block" />

        <div className="space-y-8">
          {NGO_MILESTONES.map((item) => {
            const config = {
              completed: {
                icon: CheckCircle2,
                color: 'text-[#2E7D32]',
                bg: 'bg-emerald-50 border-emerald-300',
                badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                label: 'Completed ✓',
              },
              action_required: {
                icon: AlertTriangle,
                color: 'text-[#D97706]',
                bg: 'bg-amber-50 border-amber-300',
                badge: 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse',
                label: 'Action Required',
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
                color: 'text-slate-400',
                bg: 'bg-slate-50 border-slate-300',
                badge: 'bg-slate-100 text-slate-600 border-slate-200',
                label: 'Upcoming Milestone',
              },
            }[item.status];

            const Icon = config.icon;

            return (
              <div
                key={item.id}
                className="relative flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-6"
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 ${config.bg} flex items-center justify-center shrink-0 z-10 sm:ml-5 shadow-xs`}
                >
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>

                <div
                  className={`flex-1 rounded-2xl border p-4 sm:p-5 transition-all ${
                    item.isActionRequired
                      ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <span className="font-bold uppercase tracking-wider text-[10px]">
                          {item.quarter}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700">{item.date}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#172033] mt-0.5">{item.title}</h3>
                    </div>

                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border self-start sm:self-auto ${config.badge}`}
                    >
                      {config.label}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.description}</p>

                  <div className="mt-3 pt-3 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 text-slate-700">
                        <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-semibold">Linked File: {item.documentRequired}</span>
                      </div>
                      {item.disbursalInfo && (
                        <div className="flex items-center space-x-1.5 text-emerald-700 font-bold text-[11px]">
                          <DollarSign className="w-3.5 h-3.5 shrink-0" />
                          <span>{item.disbursalInfo}</span>
                        </div>
                      )}
                    </div>

                    {item.isActionRequired && (
                      <Link
                        to={item.actionUrl}
                        className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#D97706] hover:bg-amber-700 text-white font-bold text-xs transition-colors self-start sm:self-auto shadow-xs"
                      >
                        <span>Submit Required Document</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
