import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  Building2,
  ExternalLink,
  Sparkles,
  WifiOff,
  User,
  X,
  FileText,
} from 'lucide-react';
import { MOCK_FIELD_VISITS } from '../../mock/data/mockFieldVisits';
import { MOCK_NGOS } from '../../mock/data/mockNgos';
import { MOCK_PROJECTS } from '../../mock/data/mockProjects';

export default function StaffFieldVisits() {
  const [visits, setVisits] = useState(MOCK_FIELD_VISITS);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedVisitReport, setSelectedVisitReport] = useState(null);

  // New Visit Form State
  const [ngoId, setNgoId] = useState(MOCK_NGOS[0].id);
  const [projectTitle, setProjectTitle] = useState(MOCK_PROJECTS[0].title);
  const [scheduledDate, setScheduledDate] = useState('2026-10-18');
  const [location, setLocation] = useState('Govindpuri & Tughlakabad Clusters, Delhi');
  const [newObjective, setNewObjective] = useState('');
  const [objectives, setObjectives] = useState([
    'Classroom attendance spot-check',
    'Mid-day meal hygiene audit',
    'Community parents interaction',
  ]);
  const [notes, setNotes] = useState('Verify enrollment registers against quarterly claim figures.');

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, newObjective.trim()]);
      setNewObjective('');
    }
  };

  const handleRemoveObjective = (index) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const handleCreateVisit = (e) => {
    e.preventDefault();
    const selectedNgo = MOCK_NGOS.find((n) => n.id === ngoId);

    const newVisit = {
      id: `fv-${Date.now().toString().slice(-4)}`,
      ngoId,
      ngoName: selectedNgo?.name || 'Partner NGO',
      projectTitle,
      staffName: 'Priya Sharma',
      scheduledDate,
      status: 'scheduled',
      location,
      objectives,
      completedActivities: [],
      notes,
      cachedLocally: true,
      lastDraftSaved: null,
      pendingSync: false,
    };

    setVisits([newVisit, ...visits]);
    setIsScheduleModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              Field Operations
            </span>
            <span className="text-xs text-slate-500">Quarterly Inspections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            Field Visit Planning & Report Scrutiny
          </h1>
          <p className="text-sm text-slate-500">
            Schedule on-ground verification visits, set activity checklists, and inspect synced offline reports.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsScheduleModalOpen(true)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-xs font-bold text-white shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Field Visit</span>
        </button>
      </div>

      {/* Offline Mode Spotlight Alert (Section 7) */}
      <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-start justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-teal-600 text-white shrink-0 mt-0.5">
            <WifiOff className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-teal-900">
              Offline Field Visit Mode Ready
            </h4>
            <p className="text-xs text-teal-800 mt-0.5 leading-relaxed">
              Frontliners visiting remote partner NGOs without cellular connectivity can use the device-cached checklist, capture geo-tagged photos, record audio notes, and save local drafts via IndexedDB.
            </p>
          </div>
        </div>
        <Link
          to="/field-visit/fv-101/offline"
          className="px-3 py-1.5 rounded-lg bg-white border border-teal-300 text-xs font-bold text-teal-800 hover:bg-teal-100/60 transition-colors shrink-0 flex items-center space-x-1"
        >
          <span>Test Offline Mode</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Visits List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visits.map((visit) => {
          const isCompleted = visit.status === 'completed';

          return (
            <div
              key={visit.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Ref: {visit.id}
                    </span>
                    <h3 className="text-base font-bold text-[#172033] mt-0.5">
                      {visit.ngoName}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}
                  >
                    {isCompleted ? 'Completed' : 'Scheduled'}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center space-x-1.5 text-slate-700 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{visit.scheduledDate}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{visit.location}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-500">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Lead: {visit.staffName}</span>
                  </div>
                </div>

                {/* Checklist Goals */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1.5">
                    Visit Goals ({visit.objectives.length})
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {visit.objectives.slice(0, 3).map((obj, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-[#2E7D32] font-bold">✓</span>
                        <span className="truncate">{obj}</span>
                      </li>
                    ))}
                    {visit.objectives.length > 3 && (
                      <li className="text-[10px] text-slate-400 italic">
                        +{visit.objectives.length - 3} more goals
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/field-visit/${visit.id}/offline`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-teal-700 hover:text-teal-900"
                >
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Offline Visit Mode</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedVisitReport(visit)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  {isCompleted ? 'Inspect Report' : 'View Plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Field Visit Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#172033]">Schedule Field Visit</h3>
                <p className="text-xs text-slate-500">Plan on-ground inspection and pre-cache checklist goals</p>
              </div>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateVisit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Partner NGO</label>
                <select
                  value={ngoId}
                  onChange={(e) => setNgoId(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                >
                  {MOCK_NGOS.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name} ({n.state})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Contract</label>
                <select
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                >
                  {MOCK_PROJECTS.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Field Location / Tehsil</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    placeholder="Cluster / village name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Visit Activity Objectives ({objectives.length})
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    placeholder="e.g., Audit Mid-day meal hygiene, child registers..."
                    className="flex-1 p-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                  <button
                    type="button"
                    onClick={handleAddObjective}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {objectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200"
                    >
                      <span className="truncate">{obj}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveObjective(idx)}
                        className="text-rose-500 font-bold hover:text-rose-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Pre-visit Remarks / Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] font-bold text-white transition-colors"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Field Visit Report Details Modal */}
      {selectedVisitReport && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Field Inspection Record
                </span>
                <h3 className="text-lg font-bold text-[#172033]">{selectedVisitReport.ngoName}</h3>
                <p className="text-xs text-blue-600">{selectedVisitReport.projectTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVisitReport(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Inspection Date</span>
                  <span className="font-semibold text-slate-800">{selectedVisitReport.scheduledDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Frontliner</span>
                  <span className="font-semibold text-slate-800">{selectedVisitReport.staffName}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold mb-1">
                  Activities & Objectives
                </span>
                <ul className="space-y-1 bg-white p-2.5 rounded-lg border border-slate-200">
                  {selectedVisitReport.objectives.map((obj, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedVisitReport.notes && (
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold mb-1">
                    Frontliner Observation Notes
                  </span>
                  <p className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-slate-700">
                    {selectedVisitReport.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setSelectedVisitReport(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 text-xs"
              >
                Close
              </button>
              <Link
                to={`/field-visit/${selectedVisitReport.id}/offline`}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 font-bold text-white text-xs flex items-center space-x-1"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>Open in Offline Mode</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
