import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, CheckCircle2, WifiOff, ArrowUpRight, User } from 'lucide-react';
import { MOCK_FIELD_VISITS } from '../../mock/data/mockFieldVisits';

export default function NgoFieldVisits() {
  const visits = MOCK_FIELD_VISITS.filter((v) => v.ngoId === 'ngo-1');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#172033]">
            Scheduled Field Inspections
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Upcoming on-ground verification visits by assigned CRY project officers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#2563EB]/10 text-[#2563EB]">
                  {visit.id.toUpperCase()}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                  <WifiOff className="w-3 h-3" /> Offline Mode Ready
                </span>
              </div>

              <h3 className="text-base font-bold text-[#172033]">
                {visit.projectTitle}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Scheduled: <strong>{visit.scheduledDate}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{visit.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Officer: <strong>{visit.staffName}</strong></span>
                </div>
              </div>

              {/* Objectives list */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Inspection Scope:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {visit.objectives.slice(0, 3).map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#2E7D32] font-bold">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">
                Status: <strong className="text-slate-700 capitalize">{visit.status}</strong>
              </span>
              <Link
                to={`/field-visit/${visit.id}/offline`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold transition-colors"
              >
                <span>Open Offline Field Mode</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
