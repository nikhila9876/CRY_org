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
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border-2 border-amber-400 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500 text-white shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" />
                  <span>Urgent Next Action</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {nextImportantTask.countdownText}
                </span>
                <span className="text-xs text-slate-500 font-medium">Due: {nextImportantTask.dueDate}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {nextImportantTask.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                {nextImportantTask.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-slate-700 font-medium shadow-2xs">
                  Required Filing: <strong className="text-amber-900 font-bold">{nextImportantTask.requiredDocument}</strong>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-2xs">
                  Assigned Lead: <strong className="text-slate-800 font-bold">{nextImportantTask.assignedTo}</strong>
                </span>
              </div>
            </div>

            <Link
              to={nextImportantTask.actionUrl}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#D97706] hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
            >
              <span>Address Action Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Overview Cards Grid with Section 10 Colored Top Accents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Compliance Health Score Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] border-t-4 border-t-[#D97706] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Compliance Health</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#D97706] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-[#D97706] tracking-tight">78%</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                Satisfactory
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="bg-[#D97706] h-1.5 rounded-full transition-all" style={{ width: '78%' }} />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            1 document awaiting correction before Tranche 2 release.
          </div>
        </div>

        {/* Tasks Due Soon */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] border-t-4 border-t-[#2563EB] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Deliverables Due</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-[#172033] tracking-tight">{pendingTasks.length}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                Pending Actions
              </span>
            </div>
            {/* Urgency breakdown */}
            <div className="flex items-center space-x-2 mt-2 text-[11px] text-slate-500 font-medium">
              <span className="text-rose-600 font-bold">1 due today</span>
              <span>•</span>
              <span>1 due in 5 days</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            2 high priority deliverables due before month-end.
          </div>
        </div>

        {/* Documents Needing Correction */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] border-t-4 border-t-[#DC2626] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Correction Requests</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#DC2626] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-[#DC2626] tracking-tight">{correctionDocs.length}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 animate-pulse">
                Action Required
              </span>
            </div>
            <div className="mt-2 text-[11px] text-rose-700 font-semibold truncate">
              Q2 Utilization Certificate revision
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            Staff reviewer feedback provided.
          </div>
        </div>

        {/* Current Active Grant */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] border-t-4 border-t-[#2E7D32] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Grant</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#2E7D32] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black text-[#172033] tracking-tight">{currentProject.utilizationRate}%</span>
              <span className="text-xs font-bold text-emerald-700">Utilized</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div
                className="bg-[#2E7D32] h-1.5 rounded-full transition-all"
                style={{ width: `${currentProject.utilizationRate}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">Tranche {currentProject.disbursedTranche}/{currentProject.totalTranches}</span>
            <Link
              to="/ngo/projects"
              className="font-bold text-[#2563EB] hover:text-blue-800"
            >
              Milestones →
            </Link>
          </div>
        </div>
      </div>

      {/* Two-Column Section: Active Tasks & Upcoming Field Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): My Priority Tasks */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-base font-black text-[#172033] tracking-tight">Upcoming Deliverables & Tasks</h2>
              <p className="text-xs text-slate-500">Check off requirements to maintain project compliance</p>
            </div>
            <Link
              to="/ngo/tasks"
              className="text-xs font-bold text-[#2563EB] hover:text-blue-800 flex items-center space-x-1 group"
            >
              <span>View All Tasks ({pendingTasks.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          task.priority === 'high'
                            ? 'bg-rose-50 text-[#DC2626] border-rose-200'
                            : task.priority === 'medium'
                            ? 'bg-amber-50 text-[#D97706] border-amber-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                      <span className="text-xs font-bold text-[#172033]">{task.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-1.5">
                      <span>Assigned: <strong className="text-slate-600">{task.assignedTo}</strong></span>
                      <span>•</span>
                      <span>Required: <strong className="text-slate-600">{task.requiredDocument}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 self-start sm:self-center shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      task.dueCategory === 'today'
                        ? 'bg-rose-100 text-[#DC2626] border border-rose-200'
                        : 'bg-amber-50 text-[#D97706] border border-amber-200'
                    }`}
                  >
                    {task.countdownText}
                  </span>
                  <Link
                    to={task.actionUrl}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shadow-2xs"
                  >
                    Open Filing
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Col): Field Inspection & Staff Lead */}
        <div className="space-y-4">
          {/* Upcoming Inspection Card */}
          <div className="p-5 rounded-2xl bg-white border border-teal-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-[#172033] flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#0F766E]" />
                <span>Next Field Inspection</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-[#0F766E] border border-teal-200">
                Quarterly
              </span>
            </div>

            {upcomingVisit && (
              <div className="mt-3 space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-teal-900 font-semibold flex items-center justify-between">
                  <span>Inspection Date:</span>
                  <span className="font-bold text-[#0F766E]">{upcomingVisit.scheduledDate}</span>
                </div>

                <div className="text-slate-600 flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Clusters:</span>
                    <span>{upcomingVisit.location}</span>
                  </div>
                </div>

                <div className="text-slate-600">
                  <span className="font-bold text-slate-800 block">Lead CRY Frontliner:</span>
                  <span className="text-slate-700">{upcomingVisit.staffName}</span>
                </div>

                <div className="pt-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                    Inspection Checkpoints:
                  </span>
                  <ul className="space-y-1 text-slate-600 text-[11px]">
                    {upcomingVisit.objectives.slice(0, 2).map((obj, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/field-visit/${upcomingVisit.id}/offline`}
                    className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <Wifi className="w-3.5 h-3.5" />
                    <span>View Inspection Checklist</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* AI Assistance Quick Callout (Section 9) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-white border border-purple-200 shadow-2xs space-y-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#7C3AED] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black text-purple-900 uppercase tracking-wider">AI Recommendation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your revised Q2 Utilization Certificate today to ensure your Tranche 2 disbursal is cleared before the Oct 5 field visit.
            </p>
            <div className="pt-1">
              <Link
                to="/ngo/documents"
                className="text-xs font-bold text-[#7C3AED] hover:text-purple-900 inline-flex items-center space-x-1"
              >
                <span>Check Document Scanner →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
