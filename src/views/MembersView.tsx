import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Lock, Search, Heart, CheckCircle2 } from 'lucide-react';

export const MembersView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const publicMembers = dbService.getPublicMembers();
  const { isTelugu, t } = useLanguage();

  const filteredMembers = publicMembers.filter(
    m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         m.role_or_ministry.toLowerCase().includes(searchTerm.toLowerCase()) ||
         m.biography.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          {isTelugu ? 'క్రీస్తు శరీరము' : 'Body of Christ'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-cinzel">
          {isTelugu ? 'సంఘ కుటుంబము & సభ్యుల డైరెక్టరీ' : 'Church Family & Members Directory'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isTelugu
            ? 'క్రీస్తు వరల్డ్ సంఘములో నమ్మకంగా సేవచేస్తున్న మరియు ఆరాధిస్తున్న విశ్వాసులు, సహోదర సహోదరీల వివరాలు.'
            : 'Celebrating the gifted brothers and sisters who faithfully volunteer, worship, and serve in diverse ministries across CHRIST WORLD.'}
        </p>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-5 text-xs text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="font-bold text-amber-950">
              {isTelugu ? 'సభ్యుల గోప్యతా విధానం (Privacy Notice)' : 'Privacy & Consent Compliance Notice'}
            </h4>
            <p className="text-amber-800 leading-relaxed text-[11px] sm:text-xs">
              {isTelugu
                ? 'సంఘ విధానాల ప్రకారం సభ్యుల ఫోటోలు మరియు పరిచర్య వివరాలు వారి ముందస్తు అంగీకారంతో మాత్రమే ప్రదర్శించబడుతున్నాయి. వ్యక్తిగత ఫోన్ నంబర్లు మరియు చిరునామాలు గోప్యంగా ఉంచబడతాయి.'
                : 'In accordance with church data privacy policies, member photographs and biographies are published strictly with verified voluntary consent. Personal contact details (phone numbers, residential addresses, and private emails) are never disclosed publicly and remain securely protected in administrative records.'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-xl font-semibold text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isTelugu ? 'ధృవీకరించబడింది' : 'Opt-In Verified'}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={isTelugu ? 'సభ్యుని పేరు లేదా పరిచర్యతో వెతకండి...' : 'Search by member name or ministry...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>
        <div className="text-xs text-slate-500">
          {isTelugu ? (
            <span>మొత్తం <strong>{filteredMembers.length}</strong> మంది సభ్యులు</span>
          ) : (
            <span>Showing <strong className="text-slate-900">{filteredMembers.length}</strong> members</span>
          )}
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map(member => (
          <div
            key={member.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow hover:shadow-lg transition-all p-6 flex flex-col items-center text-center group"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-amber-500/20 group-hover:border-amber-500 transition-colors shadow">
              <img
                src={member.photo_url}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <h3 className="font-bold text-slate-900 text-base font-cinzel">{member.name}</h3>
            <p className="text-xs font-semibold text-amber-700 mt-0.5">{member.role_or_ministry}</p>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed line-clamp-3">
              {member.biography}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
