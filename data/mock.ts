import { User, AdminHistoryItem } from './types';

export const mockUser: User = {
  id: 1,
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  role: 'user',
  profilePictureUrl: `https://i.pravatar.cc/150?u=${encodeURIComponent('alex.doe@example.com')}`,
  activityHistory: [
    { date: '2024-07-29', action: 'Analyzed Vitals', details: 'Result: 45% Stress' },
    { date: '2024-07-28', action: 'Updated Profile', details: 'Changed name' },
    { date: '2024-07-25', action: 'Analyzed Vitals', details: 'Result: 62% Stress' },
  ],
};

export const mockAdmin: User = {
  id: 2,
  name: 'Sam Admin',
  email: 'sam.admin@example.com',
  role: 'admin',
  profilePictureUrl: `https://i.pravatar.cc/150?u=${encodeURIComponent('sam.admin@example.com')}`,
  activityHistory: [
    { date: '2024-07-29', action: 'Viewed User List', details: '' },
    { date: '2024-07-28', action: 'Analyzed Vitals', details: 'Result: 28% Stress' },
  ],
};

export const mockUserList: Omit<User, 'activityHistory' | 'profilePictureUrl'>[] = [
    { id: 1, name: 'Alex Doe', email: 'alex.doe@example.com', role: 'user' },
    { id: 3, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'user' },
    { id: 4, name: 'Peter Jones', email: 'peter.jones@example.com', role: 'user' },
    { id: 5, name: 'Mary Brown', email: 'mary.brown@example.com', role: 'user' },
];

export const mockAdminHistory: AdminHistoryItem[] = [
    { id: 1, action: 'Banned User', details: 'jane.smith@example.com', adminName: 'Sam Admin', timestamp: '2024-07-30 14:20', icon: 'ban' },
    { id: 2, action: 'Deleted Content', details: 'Post ID #12345', adminName: 'Sam Admin', timestamp: '2024-07-30 11:05', icon: 'delete' },
    { id: 3, action: 'System Backup', details: 'Completed successfully', adminName: 'System', timestamp: '2024-07-30 04:00', icon: 'backup' },
    { id: 4, action: 'Viewed Audit Log', details: 'User activity for Alex Doe', adminName: 'Sam Admin', timestamp: '2024-07-29 18:12', icon: 'audit' },
    { id: 5, action: 'Updated User Role', details: 'Peter Jones to User', adminName: 'Sam Admin', timestamp: '2024-07-29 16:45', icon: 'ban' },
];