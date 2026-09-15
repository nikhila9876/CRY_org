import React from 'react';

export default function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-[#E2E8F0] z-20 md:hidden flex justify-around py-2 shadow-lg">
      <span className="text-xs text-slate-500 font-medium py-1">NGO360 Mobile Nav</span>
    </nav>
  );
}
