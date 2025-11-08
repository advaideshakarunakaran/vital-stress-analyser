
import React from 'react';
import { User } from '../types';

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <div className="w-full max-w-4xl mx-auto text-slate-200">
      <h1 className="text-3xl font-bold text-white mb-6">Profile Management</h1>

      {/* Profile Details Card */}
      <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Your Details</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img 
              src={user.profilePictureUrl} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-slate-600"
            />
            <button className="absolute bottom-0 right-0 bg-cyan-500 w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-cyan-600 transition-colors border-2 border-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
            </button>
          </div>
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                <input type="text" id="name" defaultValue={user.name} className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                <input type="email" id="email" defaultValue={user.email} className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2" />
              </div>
            </div>
            <button className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Activity History Card */}
      <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Activity History</h2>
        <ul className="divide-y divide-slate-700">
          {user.activityHistory.map((activity, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-300">{activity.action}</p>
                {activity.details && <p className="text-sm text-slate-400">{activity.details}</p>}
              </div>
              <p className="text-sm text-slate-500">{activity.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
