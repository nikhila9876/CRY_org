import React from 'react';

export default function NgoDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-[#172033]">Partner NGO Dashboard</h1>
          <p className="text-sm text-slate-500">Action items, Compliance Health, and Next Steps</p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl border border-slate-200 text-sm text-slate-600">
        NGO Dashboard workspace initialized.
      </div>
    </div>
  );
}
