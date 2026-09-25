import React, { useState } from 'react';
import { dbService } from '../services/db';
import { BibleMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Search, BookOpen, Calendar, User, Eye, ArrowRight, Filter } from 'lucide-react';

interface BibleMessagesViewProps {
  onOpenMessage: (msg: BibleMessage) => void;
}

export const BibleMessagesView: React.FC<BibleMessagesViewProps> = ({ onOpenMessage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { isTelugu, t } = useLanguage();

  const db = dbService.getSnapshot();
  const publishedMessages = db.bible_messages.filter(m => m.status === 'published');

  const categories = [
    { id: 'All', labelEn: 'All', labelTe: 'అన్నీ' },
    { id: 'Faith', labelEn: 'Faith', labelTe: 'విశ్వాసము' },
    { id: 'Prayer', labelEn: 'Prayer', labelTe: 'ప్రార్థన' },
    { id: 'Spiritual Growth', labelEn: 'Spiritual Growth', labelTe: 'ఆత్మీయ ఎదుగుదల' },
    { id: 'Christian Life', labelEn: 'Christian Life', labelTe: 'క్రైస్తవ జీవితము' },
    { id: 'Family', labelEn: 'Family', labelTe: 'కుటుంబము' },
    { id: 'Youth', labelEn: 'Youth', labelTe: 'యువజన' },
    { id: 'Old Testament', labelEn: 'Old Testament', labelTe: 'పాత నిబంధన' },
    { id: 'New Testament', labelEn: 'New Testament', labelTe: 'క్రొత్త నిబంధన' }
  ];

  const filteredMessages = publishedMessages.filter(msg => {
    const matchesCategory = selectedCategory === 'All' || msg.category === selectedCategory;
    const matchesSearch =
      msg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.bible_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.short_description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          {isTelugu ? 'జీవముగల దేవుని వాక్యము' : 'The Living Word'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-cinzel">
          {isTelugu ? 'బైబిల్ సందేశాలు & వాక్యోపదేశాలు' : 'Bible Messages & Sermon Expositions'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isTelugu
            ? 'దేవుని వాక్యములో లోతుగా పాతుకుపోవుటకు పాస్టర్లు మరియు దైవజనులచే అందించబడిన వచన-వచన వివరణలు మరియు ఆత్మీయ సందేశాలు.'
            : 'Expository scripture teachings, topical studies, and faith-building messages from our pastors and guest teachers to anchor your soul in the truth of God.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={
              isTelugu
                ? 'సందేశం పేరు, బైబిల్ రిఫరెన్స్ (ఉదా. 2 పేతురు 3:18), బోధకుని పేరుతో వెతకండి...'
                : 'Search by sermon title, Bible reference (e.g. 2 Peter 3:18), speaker, or theme...'
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'విభాగం:' : 'Category:'}</span>
          </span>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isTelugu ? cat.labelTe : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMessages.map(msg => (
          <div
            key={msg.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={msg.featured_image_url}
                  alt={msg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded shadow">
                  {msg.bible_reference}
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/90 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                  {msg.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1 text-slate-600 font-medium">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    <span>{msg.speaker}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{msg.date}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-cinzel group-hover:text-amber-700 transition-colors line-clamp-2">
                  {msg.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {msg.short_description}
                </p>
              </div>
            </div>

            {/* Read More button */}
            <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex justify-between items-center">
              <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{msg.views_count} {isTelugu ? 'వీక్షణలు' : 'reads'}</span>
              </span>

              <button
                onClick={() => onOpenMessage(msg)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white hover:text-slate-950 font-bold text-xs transition-colors flex items-center space-x-1.5 shadow"
              >
                <span>{isTelugu ? 'పూర్తి సందేశం చదవండి' : 'Read More'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-base font-bold text-slate-700">
            {isTelugu ? 'సందేశాలు కనుగొనబడలేదు' : 'No sermons found'}
          </p>
          <p className="text-xs text-slate-500">
            {isTelugu ? 'దయచేసి వేరే కేటగిరీని ఎంచుకోండి లేదా శోధనను మార్చండి.' : 'Try choosing a different category or clearing the search text.'}
          </p>
        </div>
      )}

    </div>
  );
};
