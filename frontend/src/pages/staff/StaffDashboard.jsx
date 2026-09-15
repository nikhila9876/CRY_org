import React from 'react';

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-[#172033]">CRY Staff Dashboard</h1>
          <p className="text-sm text-slate-500">Regional Overview, Partner Monitoring & Critical Action Items</p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl border border-slate-200 text-sm text-slate-600">
        Staff Dashboard workspace initialized.
      </div>
    </div>
  );
}
