import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Video, Calendar, Bell, Users, GraduationCap, ChevronRight } from 'lucide-react';
import { dbService } from '../services/db';
import { ActiveTab } from './Navbar';
import { BibleMessage, YouTubeVideo, ChurchEvent, Announcement, Course, Member } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab) => void;
  onSelectMessage?: (msg: BibleMessage) => void;
  onSelectVideo?: (vid: YouTubeVideo) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectMessage,
  onSelectVideo
}) => {
  const [query, setQuery] = useState('');
  const db = dbService.getSnapshot();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const messages = db.bible_messages.filter(
      m => m.status === 'published' && (
        m.title.toLowerCase().includes(q) ||
        m.bible_reference.toLowerCase().includes(q) ||
        m.speaker.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.short_description.toLowerCase().includes(q)
      )
    );

    const videos = db.youtube_videos.filter(
      v => v.status === 'published' && (
        v.title.toLowerCase().includes(q) ||
        v.speaker.toLowerCase().includes(q) ||
        v.bible_reference.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
      )
    );

    const events = db.events.filter(
      e => e.status === 'published' && (
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      )
    );

    const courses = db.courses.filter(
      c => c.status === 'published' && (
        c.course_name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.level.toLowerCase().includes(q)
      )
    );

    const announcements = db.announcements.filter(
      a => a.status === 'published' && (
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      )
    );

    const publicMembers = dbService.getPublicMembers().filter(
      m => m.name.toLowerCase().includes(q) ||
           m.role_or_ministry.toLowerCase().includes(q) ||
           m.biography.toLowerCase().includes(q)
    );

    const totalCount = messages.length + videos.length + events.length + courses.length + announcements.length + publicMembers.length;

    return {
      messages,
      videos,
      events,
      courses,
      announcements,
      publicMembers,
      totalCount
    };
  }, [query, db]);

  const { isTelugu, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center space-x-3 bg-slate-950/60">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={
              isTelugu
                ? 'సందేశాలు, వీడియోలు, కార్యక్రమాలు, కోర్సులు, ప్రకటనలు వెతకండి...'
                : 'Search Bible messages, videos, events, courses, announcements...'
            }
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded"
            >
              {isTelugu ? 'తొలగించు' : 'Clear'}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1 text-xs">
          {!query && (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="font-medium text-slate-300">
                {isTelugu ? 'త్వరిత గ్లోబల్ శోధన' : 'Quick Global Search'}
              </p>
              <p className="text-xs text-slate-500">
                {isTelugu
                  ? '"విశ్వాసము", "ప్రార్థన", "యోహాను", "సభలు", "డిప్లొమా" లేదా "కోర్సు" వంటి పదాలతో వెతకండి'
                  : 'Try searching for "grace", "prayer", "faith", "2 Peter", "conference", or "diploma"'}
              </p>
            </div>
          )}

          {query && results && results.totalCount === 0 && (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <p className="text-sm font-semibold text-slate-300">
                {isTelugu ? `"${query}" కొరకు ఫలితాలు లభించలేదు` : `No results found for "${query}"`}
              </p>
              <p className="text-xs text-slate-500">
                {isTelugu ? 'వేరే పదాలతో లేదా ఇతర విభాగాలలో ప్రయత్నించండి.' : 'Try broadening your keywords or check another category.'}
              </p>
            </div>
          )}

          {query && results && results.totalCount > 0 && (
            <div className="space-y-5">
              <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                Found {results.totalCount} result(s)
              </div>

              {/* Bible Messages */}
              {results.messages.length > 0 && (
                <div>
                  <h4 className="text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isTelugu ? 'బైబిల్ సందేశాలు' : 'Bible Messages'} ({results.messages.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.messages.map(m => (
                      <div
                        key={m.id}
                        onClick={() => {
                          onClose();
                          if (onSelectMessage) onSelectMessage(m);
                          else onNavigate('messages');
                        }}
                        className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer flex justify-between items-center group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                            {m.title}
                          </div>
                          <div className="text-slate-400 text-[11px] flex items-center space-x-2 mt-0.5">
                            <span className="text-amber-400 font-medium">{m.bible_reference}</span>
                            <span>•</span>
                            <span>{m.speaker}</span>
                            <span>•</span>
                            <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] text-slate-300">{m.category}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* YouTube Videos */}
              {results.videos.length > 0 && (
                <div>
                  <h4 className="text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Video className="w-3.5 h-3.5 text-red-400" />
                    <span>{isTelugu ? 'యూట్యూబ్ ఆరాధనలు & వీడియోలు' : 'YouTube Sermons & Praise'} ({results.videos.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.videos.map(v => (
                      <div
                        key={v.id}
                        onClick={() => {
                          onClose();
                          if (onSelectVideo) onSelectVideo(v);
                          else onNavigate('youtube');
                        }}
                        className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer flex justify-between items-center group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                            {v.title}
                          </div>
                          <div className="text-slate-400 text-[11px] flex items-center space-x-2 mt-0.5">
                            <span className="text-amber-400 font-medium">{v.bible_reference}</span>
                            <span>•</span>
                            <span>{v.speaker}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {results.events.length > 0 && (
                <div>
                  <h4 className="text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isTelugu ? 'కార్యక్రమాలు & సభలు' : 'Events & Conferences'} ({results.events.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.events.map(e => (
                      <div
                        key={e.id}
                        onClick={() => {
                          onClose();
                          onNavigate('events');
                        }}
                        className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer flex justify-between items-center group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-white group-hover:text-amber-300">
                            {e.title}
                          </div>
                          <div className="text-slate-400 text-[11px] mt-0.5">
                            {e.date} • {e.location}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bible University Courses */}
              {results.courses.length > 0 && (
                <div>
                  <h4 className="text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                    <span>
                      {isTelugu ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ కోర్సులు' : 'Bible Open Universes Courses'} ({results.courses.length})
                    </span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.courses.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onClose();
                          onNavigate('university');
                        }}
                        className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer flex justify-between items-center group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-white group-hover:text-amber-300">
                            {c.course_name} ({c.duration})
                          </div>
                          <div className="text-slate-400 text-[11px] mt-0.5">
                            {c.level} • {c.mode_of_study}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Announcements */}
              {results.announcements.length > 0 && (
                <div>
                  <h4 className="text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Bell className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {isTelugu ? 'ముఖ్య ప్రకటనలు' : 'Announcements'} ({results.announcements.length})
                    </span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.announcements.map(a => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onClose();
                          onNavigate('announcements');
                        }}
                        className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer flex justify-between items-center group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-white group-hover:text-amber-300">
                            {a.title}
                          </div>
                          <div className="text-slate-400 text-[11px] mt-0.5 line-clamp-1">
                            {a.date} — {a.description}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
          <span>CHRIST WORLD Relational Search Engine</span>
          <span>Press ESC or click close</span>
        </div>
      </div>
    </div>
  );
};
