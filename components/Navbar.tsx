
import React from 'react';
import { User } from '../types';
import { LayoutDashboardIcon, UserIcon, ShieldCheckIcon, LogOutIcon, HeartPulseIcon } from './Icons';

type Page = 'dashboard' | 'profile' | 'admin';

interface NavbarProps {
  user: User;
  setPage: (page: Page) => void;
  onLogout: () => void;
  currentPage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ user, setPage, onLogout, currentPage }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboardIcon, page: 'dashboard' },
    { name: 'Profile', icon: UserIcon, page: 'profile' },
  ];

  if (user.role === 'admin') {
    navItems.push({ name: 'Admin Panel', icon: ShieldCheckIcon, page: 'admin' });
  }

  return (
    <nav className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 flex flex-col p-4">
      <div className="flex items-center gap-3 mb-8">
        <HeartPulseIcon className="w-8 h-8 text-cyan-400" />
        <span className="text-xl font-bold text-white">VitalStress</span>
      </div>

      <div className="flex items-center gap-4 p-2 rounded-lg bg-slate-700/50 mb-8">
        <img
          src={user.profilePictureUrl || 'https://i.pravatar.cc/150'}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-slate-500"
        />
        <div>
          <p className="font-semibold text-white">{user.name}</p>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>
      </div>

      <ul className="flex-1 space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => setPage(item.page as Page)}
              className={`w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors ${
                currentPage === item.page
                  ? 'bg-cyan-500 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
        >
          <LogOutIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
