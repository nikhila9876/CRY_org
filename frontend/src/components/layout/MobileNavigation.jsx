import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  FileCheck,
  CheckSquare,
  FileText,
  WifiOff,
  Bell,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MobileNavigation() {
  const { role } = useAuth();
  const isStaff = role === 'cry_staff';

  const items = isStaff
    ? [
        { name: 'Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
        { name: 'NGOs', path: '/staff/ngos', icon: Building2 },
        { name: 'Reviews', path: '/staff/documents', icon: FileCheck },
        { name: 'Field Mode', path: '/field-visit/fv-101/offline', icon: WifiOff },
        { name: 'Alerts', path: '/staff/notifications', icon: Bell },
      ]
    : [
        { name: 'Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
        { name: 'Tasks', path: '/ngo/tasks', icon: CheckSquare },
        { name: 'Documents', path: '/ngo/documents', icon: FileText },
        { name: 'Field Mode', path: '/field-visit/fv-101/offline', icon: WifiOff },
        { name: 'Alerts', path: '/ngo/notifications', icon: Bell },
      ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 md:hidden flex justify-around py-2 px-1 shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-[10px] font-bold transition-all ${
                isActive
                  ? isStaff
                    ? 'text-blue-700 bg-blue-50/80 shadow-2xs'
                    : 'text-[#2E7D32] bg-emerald-50/80 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="truncate">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
