
import React, { useState } from 'react';
import { User } from './types';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';

type Page = 'dashboard' | 'profile' | 'admin';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>('dashboard');

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch(page) {
      case 'dashboard':
        return <DashboardPage user={user} />;
      case 'profile':
        return <ProfilePage user={user} />;
      case 'admin':
        return user.role === 'admin' ? <AdminPage /> : <DashboardPage user={user} />; // Fallback to dashboard if not admin
      default:
        return <DashboardPage user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex text-slate-200">
      <Navbar user={user} setPage={setPage} onLogout={handleLogout} currentPage={page} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
