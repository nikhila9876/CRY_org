import React from 'react';
import { useParams } from 'react-router-dom';

export default function OfflineFieldVisit() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-[#172033]">Offline Field Visit Mode</h1>
          <p className="text-sm text-slate-500">Visit Ref: {id || 'fv-101'} — Cached on device for low-connectivity operation</p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl border border-slate-200 text-sm text-slate-600">
        Offline Field Visit workspace initialized.
      </div>
    </div>
  );
}
