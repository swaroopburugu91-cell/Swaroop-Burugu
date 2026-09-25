import React from 'react';
import { dbService } from '../../services/db';
import {
  Users,
  Award,
  BookOpen,
  Video,
  Calendar,
  Image as ImageIcon,
  Bell,
  GraduationCap,
  MessageSquare,
  Mail,
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';

interface AdminOverviewProps {
  onSelectTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onSelectTab }) => {
  const db = dbService.getSnapshot();

  const stats = [
    { label: 'Total Members', count: db.members.length, icon: <Users className="w-5 h-5 text-blue-400" />, tab: 'members', bg: 'bg-blue-500/10 border-blue-500/30' },
    { label: 'Pastoral Leaders', count: db.leaders.length, icon: <Award className="w-5 h-5 text-amber-400" />, tab: 'leadership', bg: 'bg-amber-500/10 border-amber-500/30' },
    { label: 'Bible Messages', count: db.bible_messages.length, icon: <BookOpen className="w-5 h-5 text-emerald-400" />, tab: 'messages', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    { label: 'YouTube Sermons', count: db.youtube_videos.length, icon: <Video className="w-5 h-5 text-red-400" />, tab: 'youtube', bg: 'bg-red-500/10 border-red-500/30' },
    { label: 'Events & Conferences', count: db.events.length, icon: <Calendar className="w-5 h-5 text-indigo-400" />, tab: 'events', bg: 'bg-indigo-500/10 border-indigo-500/30' },
    { label: 'Gallery Photos', count: db.gallery_photos.length, icon: <ImageIcon className="w-5 h-5 text-pink-400" />, tab: 'gallery', bg: 'bg-pink-500/10 border-pink-500/30' },
    { label: 'Announcements', count: db.announcements.length, icon: <Bell className="w-5 h-5 text-yellow-400" />, tab: 'announcements', bg: 'bg-yellow-500/10 border-yellow-500/30' },
    { label: 'BOU Courses', count: db.courses.length, icon: <GraduationCap className="w-5 h-5 text-purple-400" />, tab: 'university', bg: 'bg-purple-500/10 border-purple-500/30' },
    { label: 'WhatsApp Contacts', count: db.whatsapp_contacts.length, icon: <MessageSquare className="w-5 h-5 text-emerald-400" />, tab: 'whatsapp', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    { label: 'Contact Enquiries', count: db.contacts.length, icon: <Mail className="w-5 h-5 text-cyan-400" />, tab: 'enquiries', bg: 'bg-cyan-500/10 border-cyan-500/30' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 rounded-3xl border border-slate-700/80 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
            Executive Management Console
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-white mt-0.5">
            CHRIST WORLD System Overview
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Real-time status of church records, discipleship media, university admissions, and WhatsApp broadcast operations.
          </p>
        </div>
        <button
          onClick={() => onSelectTab('database')}
          className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center space-x-1.5 transition-all shadow"
        >
          <span>SQL Database Console</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(s => (
          <div
            key={s.label}
            onClick={() => onSelectTab(s.tab)}
            className={`p-4 rounded-2xl border ${s.bg} bg-slate-900/60 cursor-pointer hover:scale-102 transition-all shadow-sm flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between">
              {s.icon}
              <span className="text-2xl font-extrabold text-white font-cinzel">{s.count}</span>
            </div>
            <div className="mt-3">
              <span className="text-xs font-semibold text-slate-200 block">{s.label}</span>
              <span className="text-[10px] text-slate-400 hover:text-amber-400 flex items-center space-x-0.5 mt-0.5">
                <span>Manage</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Event RSVPs */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white font-cinzel flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Recent Event Registrations ({db.event_registrations.length})</span>
            </h3>
            <button onClick={() => onSelectTab('events')} className="text-xs text-amber-400 hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {db.event_registrations.slice(0, 4).map(r => (
              <div key={r.id} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-semibold text-white">{r.full_name}</h4>
                  <p className="text-[11px] text-slate-400">{r.event_title} • {r.attendees_count} attendee(s)</p>
                </div>
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono">
                  {r.phone}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent University Applications */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white font-cinzel flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>BOU Admissions Registry ({db.university_applications.length})</span>
            </h3>
            <button onClick={() => onSelectTab('university')} className="text-xs text-amber-400 hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {db.university_applications.slice(0, 4).map(app => (
              <div key={app.id} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-semibold text-white">{app.applicant_name}</h4>
                  <p className="text-[11px] text-slate-400">{app.course_name} ({app.country})</p>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded font-medium">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
