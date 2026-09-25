import React from 'react';
import { ActiveTab } from './Navbar';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Globe, ExternalLink } from 'lucide-react';
import { dbService } from '../services/db';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openAdminLogin }) => {
  const churchInfo = dbService.getSnapshot().church_info;
  const { language, setLanguage, t, isTelugu } = useLanguage();

  const affiliationDisplay = isTelugu
    ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ ఇండియా & ఇంటర్నేషనల్ అనుబంధ సంస్థ'
    : (churchInfo.affiliation || 'Affiliated to Bible Open Universes India & International');

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Upper Footer: Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Branding & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shrink-0">
                ✝
              </div>
              <div>
                <span className="text-2xl font-bold tracking-wider text-white font-cinzel block">
                  CHRIST <span className="text-amber-400">WORLD</span>
                </span>
                <span className="text-[11px] text-amber-300 font-semibold tracking-wide block mt-0.5">
                  {affiliationDisplay}
                </span>
              </div>
            </div>

            <p className="text-amber-400/90 font-medium text-xs tracking-wide">
              {t.common.motto}
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.footer.desc}
            </p>

            {/* Language Selection in Footer */}
            <div className="pt-2 flex items-center space-x-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400">{t.common.language}:</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('te')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  language === 'te'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                తెలుగు (Telugu)
              </button>
            </div>

            {/* Social Links */}
            <div className="pt-1 flex items-center space-x-3">
              <a
                href={churchInfo.social_youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600/20 text-slate-300 hover:text-red-400 border border-slate-800 flex items-center justify-center transition-colors text-xs"
                title="YouTube Sermons"
              >
                YT
              </a>
              <a
                href={churchInfo.social_facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 border border-slate-800 flex items-center justify-center transition-colors text-xs"
                title="Facebook"
              >
                FB
              </a>
              <a
                href={churchInfo.social_instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-pink-600/20 text-slate-300 hover:text-pink-400 border border-slate-800 flex items-center justify-center transition-colors text-xs"
                title="Instagram"
              >
                IG
              </a>
              <a
                href={`https://wa.me/${churchInfo.whatsapp_number.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-400 border border-slate-800 flex items-center justify-center transition-colors text-xs"
                title="WhatsApp Contact"
              >
                WA
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-amber-500/20 pb-2 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{t.footer.quickLinks}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-amber-400 transition-colors">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('leadership')} className="hover:text-amber-400 transition-colors">
                  {t.nav.leadership}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('members')} className="hover:text-amber-400 transition-colors">
                  {t.nav.members}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('university')} className="hover:text-amber-400 transition-colors text-amber-300 font-medium">
                  {t.nav.university}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('messages')} className="hover:text-amber-400 transition-colors">
                  {t.nav.messages}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('youtube')} className="hover:text-amber-400 transition-colors">
                  {t.nav.youtube}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('events')} className="hover:text-amber-400 transition-colors">
                  {t.nav.events}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gallery')} className="hover:text-amber-400 transition-colors">
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('announcements')} className="hover:text-amber-400 transition-colors">
                  {t.nav.announcements}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-amber-400 transition-colors">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Timings */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-amber-500/20 pb-2 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{isTelugu ? 'ఆరాధనా కూడికలు' : 'Worship Gatherings'}</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center text-amber-300 font-semibold mb-0.5">
                  <span>{isTelugu ? 'ఆదివారం' : 'Sunday'}</span>
                  <span className="text-[11px] text-slate-300">09:30 AM – 12:30 PM</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  {isTelugu ? 'ఆదివారపు ముఖ్య ఆరాధన & ప్రభువు బల్ల' : 'Main Sunday Expository Worship Service'}
                </p>
              </div>

              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center text-amber-300 font-semibold mb-0.5">
                  <span>{isTelugu ? 'బుధవారం' : 'Wednesday'}</span>
                  <span className="text-[11px] text-slate-300">07:00 PM – 08:30 PM</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  {isTelugu ? 'బైబిల్ అధ్యయనం & వాక్య ధ్యానం' : 'Midweek Expository Bible Study'}
                </p>
              </div>

              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center text-amber-300 font-semibold mb-0.5">
                  <span>{isTelugu ? 'శుక్రవారం' : 'Friday'}</span>
                  <span className="text-[11px] text-slate-300">09:00 PM – 01:00 AM</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  {isTelugu ? 'రాత్రంతా ఉపవాస ప్రార్థన & స్వస్థత కూడిక' : 'All-Night Fasting & Miracle Intercession'}
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-amber-500/20 pb-2 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{t.footer.contactInfo}</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{churchInfo.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{churchInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{churchInfo.email}</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setActiveTab('contact')}
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>{isTelugu ? 'సంప్రదించండి & మార్గము' : 'Get Directions & Enquire'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-900/90 border-t border-slate-800/80 py-4 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-slate-400 text-center sm:text-left">
            <p className="font-medium text-slate-300">
              CHRIST WORLD – Church Information & Communication Management System
            </p>
            <p className="text-[11px] text-slate-500">
              {isTelugu
                ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ ఇండియా & ఇంటర్నేషనల్ అనుబంధ సంస్థ • తెలుగు & ఇంగ్లీష్ ద్విభాషా పోర్టల్'
                : 'Affiliated to Bible Open Universes India & International • English & Telugu Bilingual Portal'}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <button
              onClick={openAdminLogin}
              className="text-amber-400/90 hover:text-amber-300 font-semibold flex items-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.common.adminLogin}</span>
            </button>
            <span className="text-slate-600">•</span>
            <span>© 2026 CHRIST WORLD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
