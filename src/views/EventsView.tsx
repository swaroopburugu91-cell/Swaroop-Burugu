import React, { useState } from 'react';
import { dbService } from '../services/db';
import { ChurchEvent } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

interface EventsViewProps {
  onRegisterEvent: (evt: ChurchEvent) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onRegisterEvent }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous'>('upcoming');
  const db = dbService.getSnapshot();
  const allEvents = db.events.filter(e => e.status === 'published');
  const { isTelugu, t } = useLanguage();

  // Today reference in our demo scope: 2026-09-25
  const today = '2026-09-25';

  const upcomingEvents = allEvents.filter(e => e.date >= today);
  const previousEvents = allEvents.filter(e => e.date < today);

  const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : previousEvents;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          {isTelugu ? 'ఆత్మీయ కూడికలు & సహవాసం' : 'Gatherings & Fellowship'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-cinzel">
          {isTelugu ? 'చర్చ్ ప్రత్యేక కార్యక్రమాలు' : 'Church Events & Conferences'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isTelugu
            ? 'రాబోయే ఉపవాస ప్రార్థనలు, సమ్మేళనాలు, యూత్ క్యాంపులు, కన్వెన్షన్లు మరియు సేవా కార్యక్రమాల వివరాలు.'
            : 'Stay connected with our spiritual calendar: upcoming conferences, retreats, youth camps, fasting prayer convocations, and compassion outreaches.'}
        </p>
      </div>

      {/* Tabs: Upcoming vs Previous Events */}
      <div className="flex justify-center">
        <div className="bg-slate-200/80 p-1 rounded-2xl flex space-x-1 shadow-inner">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            {isTelugu ? `రాబోయే కార్యక్రమాలు (${upcomingEvents.length})` : `Upcoming Events (${upcomingEvents.length})`}
          </button>
          <button
            onClick={() => setActiveTab('previous')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'previous'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            {isTelugu ? `గతించిన కార్యక్రమాలు (${previousEvents.length})` : `Previous Events (${previousEvents.length})`}
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {displayedEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 font-cinzel">
            {isTelugu ? 'ఈ విభాగంలో కార్యక్రమాలు లేవు' : 'No Events in this Category'}
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            {isTelugu ? 'నవీకరించబడిన వివరాల కోసం త్వరలో మళ్లీ చూడండి.' : 'Check back soon for updated announcements.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedEvents.map(evt => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={evt.image_url}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/90 text-amber-400 font-bold text-xs px-3 py-1 rounded-full shadow">
                    {evt.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-amber-700 font-bold">
                    <Calendar className="w-4 h-4" />
                    <span>{evt.date}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4 ml-1" />
                    <span>{evt.time}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-cinzel group-hover:text-amber-700 transition-colors">
                    {evt.title}
                  </h3>

                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{evt.location}</span>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                    <span>
                      {isTelugu ? 'సంప్రదించండి: ' : 'Contact: '}
                      <strong className="text-slate-700">{evt.contact_info}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onRegisterEvent(evt)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow flex items-center justify-center space-x-2 transition-all"
                >
                  <span>{isTelugu ? 'నమోదు చేసుకోండి (RSVP)' : 'Register / RSVP Now'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
