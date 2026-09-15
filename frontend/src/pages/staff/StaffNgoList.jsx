import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Building2,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Calendar,
  FileText,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { MOCK_NGOS } from '../../mock/data/mockNgos';

export default function StaffNgoList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [cycleFilter, setCycleFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [selectedNgo, setSelectedNgo] = useState(null);

  const filteredNgos = useMemo(() => {
    return MOCK_NGOS.filter((ngo) => {
      const matchesSearch =
        ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.focusArea.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'ALL' || ngo.status === statusFilter;
      const matchesCycle = cycleFilter === 'ALL' || ngo.currentCycle.includes(cycleFilter);
      const matchesRisk = riskFilter === 'ALL' || ngo.riskLevel === riskFilter;

      return matchesSearch && matchesStatus && matchesCycle && matchesRisk;
    });
  }, [searchQuery, statusFilter, cycleFilter, riskFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              Staff Monitoring
            </span>
            <span className="text-xs text-slate-500">6 Partner Organizations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            Partner NGOs Directory & Oversight
          </h1>
          <p className="text-sm text-slate-500">
            Search, filter, and inspect compliance standing across all regional NGO partners.
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by NGO name, registration ID, state, or child-care focus..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-slate-900"
            />
          </div>

          {/* Quick Clear */}
          {(searchQuery || statusFilter !== 'ALL' || cycleFilter !== 'ALL' || riskFilter !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
                setCycleFilter('ALL');
                setRiskFilter('ALL');
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Status:</span>
          </span>
          {['ALL', 'on_track', 'needs_attention', 'critical'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' && 'All Statuses'}
              {st === 'on_track' && '🟢 On Track'}
              {st === 'needs_attention' && '🟡 Needs Attention'}
              {st === 'critical' && '🔴 Critical Risk'}
            </button>
          ))}

          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider ml-2">
            Cycle:
          </span>
          {['ALL', 'Cycle 1', 'Cycle 2', 'Cycle 3'].map((cyc) => (
            <button
              key={cyc}
              type="button"
              onClick={() => setCycleFilter(cyc)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                cycleFilter === cyc
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cyc === 'ALL' ? 'All Cycles' : cyc}
            </button>
          ))}

          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider ml-2">
            Risk:
          </span>
          {['ALL', 'low', 'medium', 'high'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRiskFilter(r)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                riskFilter === r
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r === 'ALL' ? 'All Risks' : r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* NGO Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNgos.map((ngo) => {
          const scoreColor =
            ngo.complianceScore >= 90
              ? 'text-[#2E7D32] bg-emerald-50 border-emerald-200'
              : ngo.complianceScore >= 70
              ? 'text-[#D97706] bg-amber-50 border-amber-200'
              : 'text-[#DC2626] bg-rose-50 border-rose-200';

          return (
            <div
              key={ngo.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header with Compliance Score & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-[#172033] hover:text-blue-600 transition-colors">
                      {ngo.name}
                    </h3>
                    <span className="text-[11px] font-medium text-slate-400">
                      {ngo.regNumber}
                    </span>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-xl text-xs font-black border flex flex-col items-center leading-none ${scoreColor}`}
                    title="Compliance Health Score"
                  >
                    <span>{ngo.complianceScore}%</span>
                    <span className="text-[8px] font-semibold uppercase mt-0.5">Score</span>
                  </div>
                </div>

                {/* State & Focus */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center space-x-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ngo.district}, {ngo.state}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {ngo.focusArea}
                  </div>
                </div>

                {/* Metadata Badges */}
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Cycle</span>
                    <span className="font-semibold text-slate-700">{ngo.currentCycle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Staff Lead</span>
                    <span className="font-semibold text-slate-700">{ngo.assignedStaff}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Pending Actions</span>
                    <span
                      className={`font-bold ${
                        ngo.pendingActionsCount > 0 ? 'text-amber-600' : 'text-emerald-600'
                      }`}
                    >
                      {ngo.pendingActionsCount} task(s)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Doc Status</span>
                    <span className="font-semibold text-slate-700 truncate block">
                      {ngo.documentsStatus}
                    </span>
                  </div>
                </div>

                {/* Recent Activity Alert */}
                <div className="mt-3 p-2 rounded-lg bg-blue-50/50 border border-blue-100 text-[11px] text-slate-600">
                  <span className="font-bold text-blue-800">Recent: </span>
                  {ngo.recentActivity}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/staff/projects?ngo=${ngo.id}`}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Projects ({ngo.activeProjectsCount})
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedNgo(ngo)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 transition-colors"
                >
                  <span>Quick Inspect</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNgos.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No partner NGOs match your filters</h3>
          <p className="text-xs text-slate-500 mt-1">Try modifying your search term or status criteria.</p>
        </div>
      )}

      {/* Quick NGO Detail Modal (Milestone 11 integration) */}
      {selectedNgo && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Partner Overview
                </span>
                <h3 className="text-lg font-bold text-[#172033]">{selectedNgo.name}</h3>
                <p className="text-xs text-slate-500">{selectedNgo.regNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNgo(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Contact Person</span>
                  <span className="font-semibold text-slate-800">{selectedNgo.contactPerson}</span>
                  <div className="text-[10px] text-slate-500">{selectedNgo.contactEmail}</div>
                  <div className="text-[10px] text-slate-500">{selectedNgo.contactPhone}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Compliance Status</span>
                  <span className="font-bold text-slate-800">{selectedNgo.complianceScore}% Score</span>
                  <div className="text-[10px] text-slate-500">Risk: {selectedNgo.riskLevel.toUpperCase()}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Bank Verified ✓</div>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold mb-1">
                  Child Rights Program Focus
                </span>
                <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                  {selectedNgo.focusArea}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-blue-50/60 border border-blue-100">
                  <span className="text-blue-900 font-semibold block">Last Field Visit</span>
                  <span className="text-slate-600">{selectedNgo.lastVisitedDate}</span>
                </div>
                <div className="p-2 rounded-lg bg-teal-50/60 border border-teal-100">
                  <span className="text-teal-900 font-semibold block">Next Scheduled Visit</span>
                  <span className="text-slate-600">{selectedNgo.nextVisitDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setSelectedNgo(null)}
                className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <Link
                to={`/staff/documents?ngo=${selectedNgo.id}`}
                className="px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
              >
                Review Documents
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
