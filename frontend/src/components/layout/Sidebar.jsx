import React from 'react';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#E2E8F0] transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
        <span className="font-semibold text-sm text-slate-700">Navigation</span>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-slate-600 text-sm"
        >
          Close
        </button>
      </div>
      <nav className="p-4 space-y-1">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu</div>
      </nav>
    </aside>
  );
}
