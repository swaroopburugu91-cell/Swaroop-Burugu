import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';

export const LeadershipView: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const db = dbService.getSnapshot();
  const leaders = db.leaders
    .filter(l => l.status === 'published')
    .sort((a, b) => a.display_order - b.display_order);
  const { isTelugu, t } = useLanguage();

  const categories = [
    { id: 'All', labelEn: 'All', labelTe: 'అందరూ' },
    { id: 'Pastoral', labelEn: 'Pastoral', labelTe: 'పాస్టర్లు' },
    { id: 'Teaching & University', labelEn: 'Teaching & University', labelTe: 'బోధకులు & యూనివర్సెస్' },
    { id: 'Youth & Children', labelEn: 'Youth & Children', labelTe: 'యువజన & సండే స్కూల్' },
    { id: 'Missions', labelEn: 'Missions', labelTe: 'మిషన్స్ & పెద్దలు' }
  ];

  const filteredLeaders = leaders.filter(l => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Pastoral') return l.position.includes('Pastor');
    if (selectedFilter === 'Teaching & University') return l.position.includes('Teacher') || l.ministry_department.includes('University');
    if (selectedFilter === 'Youth & Children') return l.position.includes('Youth') || l.position.includes('Children');
    if (selectedFilter === 'Missions') return l.position.includes('Elder') || l.ministry_department.includes('Missions');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          {isTelugu ? 'దైవ సేవకులు & కాపరులు' : 'Shepherds & Servant Leaders'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-cinzel">
          {isTelugu ? 'పాస్టర్లు & పరిచర్య నాయకులు' : 'Pastoral & Ministry Leadership'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isTelugu
            ? 'క్రీస్తు వరల్డ్ సంఘాన్ని ఆత్మీయంగా నడిపించుటకు, వాక్యోపదేశం మరియు ప్రార్థనల ద్వారా విశ్వాసులను స్థిరపరచుటకు నియమించబడిన సేవకులు.'
            : 'Meet the ordained ministers, Bible teachers, and ministry heads entrusted with shepherding the flock and discipling the body of Christ at CHRIST WORLD.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {isTelugu ? cat.labelTe : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Leaders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLeaders.map(leader => (
          <div
            key={leader.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={leader.photo_url}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-slate-900/90 text-amber-400 text-xs font-bold px-3 py-1 rounded-full shadow backdrop-blur-sm">
                  {leader.ministry_department}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-bold font-cinzel text-slate-900 group-hover:text-amber-700 transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mt-0.5">
                    {leader.position}
                  </p>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-4">
                  {leader.biography}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center space-x-2 pt-2">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>{leader.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>{leader.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
