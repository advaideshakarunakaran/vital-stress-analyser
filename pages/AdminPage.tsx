import React from 'react';
import { mockUserList, mockAdminHistory } from '../data/mock';
import { UserIcon, BanIcon, TrashIcon, DatabaseBackupIcon, FileClockIcon } from '../components/Icons';
import { AdminHistoryItem } from '../types';

const AdminPage: React.FC = () => {
  const stats = [
    { title: 'Total Users', value: '1,254', icon: UserIcon },
    { title: 'Analyses Today', value: '382', icon: HeartPulseIcon },
    { title: 'Avg. Stress Level', value: '58%', icon: ActivityIcon },
    { title: 'Active Admins', value: '3', icon: ShieldCheckIcon },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto text-slate-200">
      <h1 className="text-3xl font-bold text-white mb-6">Admin Panel</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">{stat.title}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <stat.icon className="w-8 h-8 text-cyan-400" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management Table */}
        <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 overflow-hidden self-start">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white">User Management</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="p-4 font-semibold text-sm text-slate-300">Name</th>
                <th className="p-4 font-semibold text-sm text-slate-300">Email</th>
                <th className="p-4 font-semibold text-sm text-slate-300">Role</th>
                <th className="p-4 font-semibold text-sm text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mockUserList.map((user) => (
                <tr key={user.id}>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === 'admin' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Admin History Panel */}
        <div className="lg:col-span-1 bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 overflow-hidden">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-white">Admin Activity Log</h2>
            </div>
            <div className="p-6 pt-0">
                <ul className="space-y-4">
                    {mockAdminHistory.map((item) => (
                    <li key={item.id} className="flex items-start gap-4">
                        <div className="bg-slate-700/50 p-2 rounded-full mt-1">
                        <HistoryIcon type={item.icon} />
                        </div>
                        <div className="flex-1">
                        <p className="font-semibold text-slate-300 text-sm">{item.action}: <span className="font-normal">{item.details}</span></p>
                        <p className="text-xs text-slate-500">By {item.adminName} on {item.timestamp}</p>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for dynamic history icons
const HistoryIcon: React.FC<{ type: AdminHistoryItem['icon'] }> = ({ type }) => {
    const iconClasses = "w-5 h-5 text-slate-400";
    switch (type) {
        case 'ban': return <BanIcon className={iconClasses} />;
        case 'delete': return <TrashIcon className={iconClasses} />;
        case 'backup': return <DatabaseBackupIcon className={iconClasses} />;
        case 'audit': return <FileClockIcon className={iconClasses} />;
        default: return <UserIcon className={iconClasses} />;
    }
};

// Dummy icons for stats
const HeartPulseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.7-1 2.1 4.4 3-7.3 1.2 2.3H21" /></svg>
);
const ActivityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
);
const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default AdminPage;