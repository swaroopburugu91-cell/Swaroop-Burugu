import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useLanguage } from '../context/LanguageContext';
import { Bell, Calendar, AlertTriangle, Tag, FileText, CheckCircle } from 'lucide-react';

export const AnnouncementsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const db = dbService.getSnapshot();
  const announcements = db.announcements.filter(a => a.status === 'published');
  const { isTelugu, t } = useLanguage();

  const categories = [
    { id: 'All', labelEn: 'All', labelTe: 'అన్నీ' },
    { id: 'General', labelEn: 'General', labelTe: 'సాధారణం' },
    { id: 'Worship', labelEn: 'Worship', labelTe: 'ఆరాధన' },
    { id: 'University', labelEn: 'University', labelTe: 'యూనివర్సెస్' },
    { id: 'Youth', labelEn: 'Youth', labelTe: 'యువజన' },
    { id: 'Urgent', labelEn: 'Urgent', labelTe: 'ముఖ్యమైనవి' }
  ];

  const filteredAnnouncements = announcements.filter(a => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Urgent') return a.is_important;
    return a.category === selectedCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          {isTelugu ? 'అధికారిక సర్క్యులర్లు' : 'Notices & Circulars'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-cinzel">
          {isTelugu ? 'చర్చ్ ముఖ్య ప్రకటనలు' : 'Church Announcements'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isTelugu
            ? 'ఆరాధనా సమయాలు, ఉపవాస కూడికలు, బైబిల్ ఓపెన్ యూనివర్సెస్ ప్రవేశాల సమాచారం మరియు సంఘ కార్యక్రమాల వివరాలు.'
            : 'Stay informed on service timings, upcoming fasting convocations, Bible Open Universes admissions alerts, and fellowship bulletins.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {isTelugu ? cat.labelTe : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {filteredAnnouncements.map(ann => (
          <div
            key={ann.id}
            className={`rounded-3xl p-6 sm:p-8 transition-all border ${
              ann.is_important
                ? 'bg-gradient-to-r from-amber-50/80 via-white to-amber-50/40 border-amber-300 shadow-md'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-amber-600 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                  {ann.category}
                </span>
                {ann.is_important && (
                  <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-extrabold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{isTelugu ? 'ముఖ్యమైనది' : 'Important'}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>{ann.date}</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-cinzel text-slate-900 mb-2">
              {ann.title}
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {ann.description}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{isTelugu ? 'జారీ చేసినవారు: చర్చ్ అడ్మినిస్ట్రేషన్' : 'Issued by: Church Administration'}</span>
              <span className="flex items-center space-x-1 text-emerald-600 font-semibold">
                <CheckCircle className="w-3 h-3" />
                <span>{isTelugu ? 'ధృవీకరించబడింది' : 'Official Notice'}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
