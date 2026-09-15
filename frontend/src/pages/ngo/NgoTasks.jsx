import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileText,
  ArrowRight,
  Filter,
  User,
  ChevronRight,
  Check,
} from 'lucide-react';
import { MOCK_TASKS } from '../../mock/data/mockTasks';
import DeadlineFilters from '../../components/common/DeadlineFilters';
import SearchBar from '../../components/common/SearchBar';

export default function NgoTasks() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHorizon, setActiveHorizon] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

  const handleToggleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
          return {
            ...t,
            status: nextStatus,
            countdownText: nextStatus === 'completed' ? 'Completed' : 'Pending',
          };
        }
        return t;
      })
    );
  };

  const taskCounts = {
    all: tasks.filter((t) => t.status !== 'completed').length,
    overdue: tasks.filter((t) => t.daysRemaining < 0 && t.status !== 'completed').length,
    due24h: tasks.filter((t) => t.daysRemaining >= 0 && t.daysRemaining <= 1 && t.status !== 'completed').length,
    due7d: tasks.filter((t) => t.daysRemaining >= 0 && t.daysRemaining <= 7 && t.status !== 'completed').length,
    due30d: tasks.filter((t) => t.daysRemaining >= 0 && t.daysRemaining <= 30 && t.status !== 'completed').length,
  };

  const filteredTasks = tasks.filter((task) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q) ||
        task.requiredDocument.toLowerCase().includes(q) ||
        task.assignedTo.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (activeHorizon === 'OVERDUE') {
      if (!(task.daysRemaining < 0 && task.status !== 'completed')) return false;
    } else if (activeHorizon === '24H') {
      if (!(task.daysRemaining >= 0 && task.daysRemaining <= 1 && task.status !== 'completed')) return false;
    } else if (activeHorizon === '7D') {
      if (!(task.daysRemaining >= 0 && task.daysRemaining <= 7 && task.status !== 'completed')) return false;
    } else if (activeHorizon === '30D') {
      if (!(task.daysRemaining >= 0 && task.daysRemaining <= 30 && task.status !== 'completed')) return false;
    }

    if (activeCategory !== 'ALL' && task.category !== activeCategory) {
      return false;
    }

    if (selectedPriority !== 'ALL' && task.priority !== selectedPriority) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Deliverables & Filings
            </span>
            <span className="text-xs text-slate-500">Bachpan Bachao Trust</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            My Action Items & Deliverables
          </h1>
          <p className="text-sm text-slate-500">
            Track urgent compliance tasks, milestone countdowns, and statutory document submissions.
          </p>
        </div>

        <Link
          to="/ngo/documents"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-xs font-bold text-white shadow-xs transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Go to Document Center</span>
        </Link>
      </div>

      {/* Search Input */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search action items, deadlines, required documents, or assigned team..."
      />

      {/* Search Active Indicator */}
      {searchQuery && (
        <div className="text-xs text-slate-500 flex items-center justify-between px-1">
          <span>
            Found <strong className="text-slate-800 font-bold">{filteredTasks.length}</strong> tasks matching "{searchQuery}"
          </span>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-rose-600 hover:underline font-semibold"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Deadline Horizons & Category Filters */}
      <DeadlineFilters
        activeHorizon={activeHorizon}
        onHorizonChange={setActiveHorizon}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        taskCounts={taskCounts}
      />

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isDone = task.status === 'completed';

          const priorityBadge = {
            high: 'bg-rose-50 text-[#DC2626] border-rose-200',
            medium: 'bg-amber-50 text-[#D97706] border-amber-200',
            low: 'bg-slate-100 text-slate-700 border-slate-200',
          }[task.priority];

          return (
            <div
              key={task.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200/80 opacity-75'
                  : task.dueCategory === 'today'
                  ? 'bg-rose-50/30 border-rose-200 shadow-2xs'
                  : 'bg-white border-[#E2E8F0] shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                {/* Complete checkbox button */}
                <button
                  type="button"
                  onClick={() => handleToggleTaskStatus(task.id)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors mt-0.5 shrink-0 ${
                    isDone
                      ? 'bg-[#2E7D32] border-[#2E7D32] text-white'
                      : 'border-slate-300 hover:border-[#2E7D32] bg-white'
                  }`}
                  title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${priorityBadge}`}
                    >
                      {task.priority} Priority
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Due: {task.dueDate}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        task.dueCategory === 'today'
                          ? 'bg-rose-100 text-rose-800 animate-pulse'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {task.countdownText}
                    </span>
                  </div>

                  <h3
                    className={`text-sm sm:text-base font-bold ${
                      isDone ? 'text-slate-400 line-through' : 'text-[#172033]'
                    }`}
                  >
                    {task.title}
                  </h3>

                  <p className="text-xs text-slate-600 max-w-3xl leading-relaxed line-clamp-2">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{task.assignedTo}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 text-slate-600 font-semibold">
                      <FileText className="w-3 h-3 text-blue-600" />
                      <span>Required: {task.requiredDocument}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 self-start sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedTaskDetails(task)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                >
                  Details
                </button>

                <Link
                  to={task.actionUrl}
                  className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-xs font-bold text-white transition-colors shadow-2xs"
                >
                  <span>Go to Filing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No tasks match this filter</h3>
            <p className="text-xs text-slate-500 mt-1">All action items are up to date.</p>
          </div>
        )}
      </div>

      {/* Task Details Modal */}
      {selectedTaskDetails && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Deliverable Details
                </span>
                <h3 className="text-lg font-bold text-[#172033]">{selectedTaskDetails.title}</h3>
                <span className="text-xs text-slate-500">Ref: {selectedTaskDetails.id}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTaskDetails(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Detailed Instructions:
                </span>
                <p className="text-slate-700 leading-relaxed">{selectedTaskDetails.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Deadline</span>
                  <span className="font-bold text-slate-800">{selectedTaskDetails.dueDate}</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Lead Owner</span>
                  <span className="font-bold text-slate-800">{selectedTaskDetails.assignedTo}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                <strong>Mandatory Statutory Upload: </strong>
                <span>{selectedTaskDetails.requiredDocument}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setSelectedTaskDetails(null)}
                className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <Link
                to={selectedTaskDetails.actionUrl}
                className="px-4 py-2 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-xs font-bold text-white transition-colors"
              >
                Open Filing Form
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
