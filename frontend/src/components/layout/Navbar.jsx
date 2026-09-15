import React from 'react';
import { Menu } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <span className="w-7 h-7 rounded-lg bg-[#2E7D32] text-white flex items-center justify-center font-bold text-sm">
            C
          </span>
          <span className="font-bold text-base tracking-tight text-[#172033]">
            NGO<span className="text-[#2E7D32]">360</span>
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">| CRY Field & Compliance Platform</span>
        </div>
      </div>
    </header>
  );
}
