import React, { useState } from 'react';
import { authService } from '../../services/auth';
import { ActiveTab } from '../../components/Navbar';
import { AdminOverview } from './AdminOverview';
import { AdminContentManagers } from './AdminContentManagers';
import { AdminWhatsAppModule } from './AdminWhatsAppModule';
import { AdminDatabaseConsole } from './AdminDatabaseConsole';
import {
  LayoutDashboard,
  Church,
  BookOpen,
  Video,
  Calendar,
  Users,
  Award,
  Bell,
  GraduationCap,
  MessageSquare,
  Database,
  Mail,
  LogOut,
  Shield,
  ArrowLeft
} from 'lucide-react';

interface AdminDashboardViewProps {
  onReturnToSite: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onReturnToSite }) => {
  const currentAdmin = authService.getCurrentAdmin();
  const [activeAdminTab, setActiveAdminTab] = useState<string>('overview');

  const handleLogout = () => {
    authService.logout();
    onReturnToSite();
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'church_info', label: 'Church Information', icon: <Church className="w-4 h-4" /> },
    { id: 'leadership', label: 'Leadership Directory', icon: <Award className="w-4 h-4" /> },
    { id: 'members', label: 'Members Registry', icon: <Users className="w-4 h-4" /> },
    { id: 'messages', label: 'Bible Messages', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'youtube', label: 'YouTube Sermons', icon: <Video className="w-4 h-4" /> },
    { id: 'events', label: 'Events & RSVPs', icon: <Calendar className="w-4 h-4" /> },
    { id: 'announcements', label: 'Announcements', icon: <Bell className="w-4 h-4" /> },
    { id: 'university', label: 'Bible Open Universes', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'whatsapp', label: 'WhatsApp Broadcast Hub', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'enquiries', label: 'Contact Enquiries', icon: <Mail className="w-4 h-4" /> },
    { id: 'database', label: 'Relational SQL Console', icon: <Database className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <button
            onClick={onReturnToSite}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Public Site</span>
          </button>
          <div className="h-5 w-px bg-slate-800 hidden sm:block" />
          <div>
            <h1 className="text-sm font-bold text-white font-cinzel">CHRIST WORLD Administration</h1>
            <p className="text-[10px] text-amber-400">Church Information & Communication Management System</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="hidden sm:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-200">{currentAdmin?.name || 'Administrator'}</span>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded font-bold">
              {currentAdmin?.role || 'Super Admin'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 flex items-center space-x-1 font-semibold transition-colors"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800 p-4 space-y-1 shrink-0 overflow-y-auto max-h-[calc(100vh-60px)]">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 block">
            Navigation Menu
          </span>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveAdminTab(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 transition-all ${
                activeAdminTab === item.id
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl overflow-y-auto">
          {activeAdminTab === 'overview' && (
            <AdminOverview onSelectTab={tab => setActiveAdminTab(tab)} />
          )}

          {activeAdminTab === 'whatsapp' && (
            <AdminWhatsAppModule />
          )}

          {activeAdminTab === 'database' && (
            <AdminDatabaseConsole />
          )}

          {[
            'church_info',
            'leadership',
            'members',
            'messages',
            'youtube',
            'events',
            'announcements',
            'university',
            'enquiries'
          ].includes(activeAdminTab) && (
            <AdminContentManagers section={activeAdminTab} />
          )}
        </main>
      </div>
    </div>
  );
};
