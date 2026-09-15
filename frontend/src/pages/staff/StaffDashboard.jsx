import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { MOCK_NGOS } from '../../mock/data/mockNgos';
import { MOCK_PROJECTS } from '../../mock/data/mockProjects';
import { MOCK_DOCUMENTS } from '../../mock/data/mockDocuments';
import { MOCK_FIELD_VISITS } from '../../mock/data/mockFieldVisits';

export default function StaffDashboard() {
  const totalNgos = MOCK_NGOS.length;
  const activeProjects = MOCK_PROJECTS.length;
  const onTrackProjects = MOCK_PROJECTS.filter((p) => p.status === 'on_track').length;
  const attentionProjects = MOCK_PROJECTS.filter((p) => p.status === 'needs_attention').length;
  const criticalProjects = MOCK_PROJECTS.filter((p) => p.status === 'critical').length;
  const pendingDocReviews = MOCK_DOCUMENTS.filter((d) => d.status === 'pending_review').length;
  const upcomingVisits = MOCK_FIELD_VISITS.filter((v) => v.status === 'scheduled');
  const recentDocuments = MOCK_DOCUMENTS.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              Staff Portal
            </span>
            <span className="text-xs text-slate-500">North Regional Office (Delhi NCR)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            CRY Monitoring & Compliance Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Real-time compliance tracking, statutory filings, and field visit operations across 6 partner NGOs.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            to="/staff/field-visits"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Schedule Visit</span>
          </Link>
          <Link
            to="/staff/documents"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-xs font-semibold text-white shadow-2xs transition-colors"
          >
            <FileCheck className="w-4 h-4" />
            <span>Review Documents ({pendingDocReviews})</span>
          </Link>
        </div>
      </div>

      {/* AI Priority Summary Card (Purple Section 9 & 10) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-purple-50/70 to-indigo-50/50 border border-purple-200 shadow-xs">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  AI Compliance Intelligence
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-200/80 text-purple-900">
                  Daily Briefing
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Priority Attention: Shakti Child Foundation FC-4 Deadline Expired
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
                <strong className="text-slate-900">1 Critical Statutory Issue:</strong> Shakti Child Foundation's FC-4 annual return is 10 days overdue. Recommended frontliner action: call Director Meera Chundawat prior to the scheduled Sept 28 desert field visit. Additionally, 2 Q2 Program Reports from Bachpan Bachao Trust and Gramin Vikas Samiti require staff review before next tranche disbursal.
              </p>
            </div>
          </div>
          <Link
            to="/staff/ngos"
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-purple-200 text-xs font-bold text-purple-700 hover:bg-purple-100/60 shadow-2xs shrink-0 transition-colors"
          >
            <span>Review All Risks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Multi-Color KPI Metric Cards (Section 4.1 & 10) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total NGOs (Blue) */}
        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Assigned NGOs</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-[#172033]">{totalNgos}</div>
          <div className="mt-1 text-[11px] text-blue-600 font-semibold flex items-center">
            <span>6 Active Partners</span>
          </div>
        </div>

        {/* Active Projects (Blue) */}
        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Projects</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-[#172033]">{activeProjects}</div>
          <div className="mt-1 text-[11px] text-slate-500">Annual Cycles 25-27</div>
        </div>

        {/* Projects On Track (Primary Green #2E7D32) */}
        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-800">On Track</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#2E7D32] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-[#2E7D32]">{onTrackProjects}</div>
          <div className="mt-1 text-[11px] text-emerald-700 font-semibold">Healthy compliance</div>
        </div>

        {/* Needing Attention (Amber #D97706) */}
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-900">Needs Attention</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#D97706] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-[#D97706]">{attentionProjects}</div>
          <div className="mt-1 text-[11px] text-amber-800 font-semibold">Milestones pending</div>
        </div>

        {/* Critical Issues (Red #DC2626) */}
        <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-900">Critical Risk</span>
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-[#DC2626] flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-[#DC2626]">{criticalProjects}</div>
          <div className="mt-1 text-[11px] text-rose-700 font-semibold">Statutory breach</div>
        </div>

        {/* Pending Reviews (Blue #2563EB) */}
        <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-900">Doc Reviews</span>
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-[#2563EB]">{pendingDocReviews}</div>
          <div className="mt-1 text-[11px] text-blue-700 font-semibold">Awaiting sign-off</div>
        </div>
      </div>

      {/* Main Grid: Upcoming Field Visits & Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Recent Document Submissions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#172033]">Recent Partner Submissions</h2>
              <p className="text-xs text-slate-500">Utilization Certificates, Program Reports & Audit filings</p>
            </div>
            <Link
              to="/staff/documents"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>View All Documents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3">Document & NGO</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-slate-900">{doc.title}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{doc.ngoName}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">{doc.submissionDate}</td>
                    <td className="px-4 py-3.5">
                      {doc.status === 'approved' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Approved
                        </span>
                      )}
                      {doc.status === 'pending_review' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          Pending Review
                        </span>
                      )}
                      {doc.status === 'needs_correction' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Correction Req.
                        </span>
                      )}
                      {doc.status === 'rejected' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        to="/staff/documents"
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200 transition-colors"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (1 Col): Upcoming Field Visits */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#172033] flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Upcoming Field Visits</span>
              </h2>
              <span className="text-xs font-bold text-slate-400">{upcomingVisits.length} Scheduled</span>
            </div>

            <div className="mt-4 space-y-3.5">
              {upcomingVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-colors bg-slate-50/50"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-slate-900">{visit.ngoName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                      {visit.scheduledDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{visit.location}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">{visit.objectives.length} visit goals</span>
                    <Link
                      to={`/field-visit/${visit.id}/offline`}
                      className="font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
                    >
                      <span>Prepare Offline</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <Link
              to="/staff/field-visits"
              className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
            >
              <span>Manage Field Visits & Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
