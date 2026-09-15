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
        { name: 'Offline', path: '/field-visit/fv-101/offline', icon: WifiOff },
        { name: 'Alerts', path: '/staff/notifications', icon: Bell },
      ]
    : [
        { name: 'Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
        { name: 'Tasks', path: '/ngo/tasks', icon: CheckSquare },
        { name: 'Documents', path: '/ngo/documents', icon: FileText },
        { name: 'Offline', path: '/field-visit/fv-101/offline', icon: WifiOff },
        { name: 'Alerts', path: '/ngo/notifications', icon: Bell },
      ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-[#E2E8F0] z-20 md:hidden flex justify-around py-1.5 shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 px-1 text-[10px] font-medium transition-colors ${
                isActive
                  ? isStaff
                    ? 'text-blue-600 font-bold'
                    : 'text-[#2E7D32] font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="truncate">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
