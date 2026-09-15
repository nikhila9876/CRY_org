import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  FileText,
  AlertTriangle,
  Calendar,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  TrendingUp,
  MapPin,
  UploadCloud,
  CheckCircle2,
  ExternalLink,
  Wifi,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_TASKS } from '../../mock/data/mockTasks';
import { MOCK_DOCUMENTS } from '../../mock/data/mockDocuments';
import { MOCK_PROJECTS } from '../../mock/data/mockProjects';
import { MOCK_FIELD_VISITS } from '../../mock/data/mockFieldVisits';

export default function NgoDashboard() {
  const { user } = useAuth();

  const currentProject = MOCK_PROJECTS[0]; // Mission Shiksha
  const pendingTasks = MOCK_TASKS.filter((t) => t.status !== 'completed');
  const correctionDocs = MOCK_DOCUMENTS.filter(
    (d) => d.ngoId === 'ngo-1' && d.status === 'needs_correction'
  );
  const pendingReviewDocs = MOCK_DOCUMENTS.filter(
    (d) => d.ngoId === 'ngo-1' && d.status === 'pending_review'
  );
  const upcomingVisit = MOCK_FIELD_VISITS.find((v) => v.ngoId === 'ngo-1');

  // Next most urgent action item
  const nextImportantTask = MOCK_TASKS.find((t) => t.id === 'tsk-101') || pendingTasks[0];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Partner NGO Portal
            </span>
            <span className="text-xs text-slate-500">{user?.ngoName || 'Bachpan Bachao Trust'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            Welcome back, {user?.name || 'Partner Member'} 👋
          </h1>
          <p className="text-sm text-slate-500">
            Track your grant deliverables, upcoming deadlines, and required statutory submissions.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            to="/ngo/documents"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-xs font-bold text-white shadow-xs transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Document</span>
          </Link>
          <Link
            to="/ngo/tasks"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
          >
            <CheckSquare className="w-4 h-4 text-slate-500" />
            <span>My Tasks ({pendingTasks.length})</span>
          </Link>
        </div>
      </div>

      {/* HERO SECTION: "Your Next Important Task" (Section 5.1 & 16) */}
      {nextImportantTask && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border-2 border-amber-300 shadow-xs relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white shadow-xs animate-pulse">
                  Urgent Next Action
                </span>
                <span className="text-xs font-bold text-amber-800">
                  {nextImportantTask.countdownText}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {nextImportantTask.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                {nextImportantTask.description}
              </p>

              <div className="flex items-center space-x-3 text-xs text-slate-500 pt-1">
                <span>Prerequisite: <strong>{nextImportantTask.requiredDocument}</strong></span>
                <span>•</span>
                <span>Lead: {nextImportantTask.assignedTo}</span>
              </div>
            </div>

            <Link
              to={nextImportantTask.actionUrl}
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-[#D97706] hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-md transition-transform active:scale-95 shrink-0"
            >
              <span>Address Action Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Compliance Health Score Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Compliance Health</span>
            <ShieldCheck className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-[#D97706]">78%</span>
            <span className="text-xs font-bold text-amber-700">Satisfactory</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            1 document awaiting correction before Tranche 2 release.
          </div>
        </div>

        {/* Tasks Due Soon */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Tasks Due This Week</span>
            <CheckSquare className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-[#172033]">{pendingTasks.length}</span>
            <span className="text-xs font-bold text-blue-600">Pending</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            2 high priority deliverables due before month-end.
          </div>
        </div>

        {/* Documents Needing Correction */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-900">Correction Requests</span>
            <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-[#D97706]">{correctionDocs.length}</span>
            <span className="text-xs font-bold text-amber-800">Action Required</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-800 font-medium">
            Revision required for Q2 Utilization Certificate.
          </div>
        </div>

        {/* Current Active Project */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Grant</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Cycle 2025-26
            </span>
          </div>
          <div className="mt-2">
            <span className="text-xs font-bold text-slate-800 block truncate">
              {currentProject.title}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Utilized: {currentProject.utilizationRate}% of ₹{(currentProject.budget / 100000).toFixed(1)}L
            </span>
          </div>
          <Link
            to="/ngo/projects"
            className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800 inline-block"
          >
            View Project Milestones →
          </Link>
        </div>
      </div>

      {/* Two-Column Section: Active Tasks & Upcoming Field Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): My Priority Tasks */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#172033]">Upcoming Deliverables & Tasks</h2>
              <p className="text-xs text-slate-500">Check off requirements to maintain project compliance</p>
            </div>
            <Link
              to="/ngo/tasks"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>View All Tasks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <CheckSquare className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{task.title}</div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {task.description}
                    </p>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-1">
                      <span>Assigned: {task.assignedTo}</span>
                      <span>•</span>
                      <span>Document: {task.requiredDocument}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 self-start sm:self-center shrink-0">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      task.dueCategory === 'today'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {task.countdownText}
                  </span>
                  <Link
                    to={task.actionUrl}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Col): Field Inspection & Staff Lead */}
        <div className="space-y-4">
          {/* Upcoming Inspection Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#172033] flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#2E7D32]" />
                <span>Next Field Inspection</span>
              </h3>
              <span className="text-xs font-semibold text-slate-400">Quarterly</span>
            </div>

            {upcomingVisit && (
              <div className="mt-3 space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Inspection Date:</span>
                  <span className="font-bold">{upcomingVisit.scheduledDate}</span>
                </div>

                <div className="text-slate-600">
                  <span className="font-semibold text-slate-800 block">Lead CRY Frontliner:</span>
                  <span>{upcomingVisit.staffName}</span>
                </div>

                <div className="text-slate-600">
                  <span className="font-semibold text-slate-800 block">Inspection Clusters:</span>
                  <span>{upcomingVisit.location}</span>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                    Checklist Focus:
                  </span>
                  <ul className="list-disc list-inside text-slate-600 text-[11px] space-y-0.5">
                    {upcomingVisit.objectives.slice(0, 2).map((obj, idx) => (
                      <li key={idx} className="truncate">{obj}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/field-visit/${upcomingVisit.id}/offline`}
                    className="w-full flex items-center justify-center space-x-1.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors shadow-2xs"
                  >
                    <Wifi className="w-3.5 h-3.5" />
                    <span>View Inspection Checklist</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* AI Assistance Quick Callout (Section 9) */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-purple-900">AI Recommendation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your revised Q2 Utilization Certificate today to ensure your Tranche 2 disbursal is cleared before the Oct 5 field visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
