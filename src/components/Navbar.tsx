import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  Lock,
  Globe,
} from 'lucide-react';
import { authService } from '../services/auth';
import { dbService } from '../services/db';
import { useLanguage } from '../context/LanguageContext';

export type ActiveTab =
  | 'home'
  | 'about'
  | 'leadership'
  | 'members'
  | 'university'
  | 'messages'
  | 'youtube'
  | 'events'
  | 'gallery'
  | 'announcements'
  | 'contact'
  | 'admin';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openSearch: () => void;
  openAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openSearch,
  openAdminLogin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(authService.isAuthenticated());
  const { language, setLanguage, t, isTelugu } = useLanguage();
  const churchInfo = dbService.getSnapshot().church_info;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = authService.subscribe(() => {
      setIsAdminAuth(authService.isAuthenticated());
    });
    return unsub;
  }, []);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'leadership', label: t.nav.leadership },
    { id: 'members', label: t.nav.members },
    { id: 'university', label: t.nav.university },
    { id: 'messages', label: t.nav.messages },
    { id: 'youtube', label: t.nav.youtube },
    { id: 'events', label: t.nav.events },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'announcements', label: t.nav.announcements },
    { id: 'contact', label: t.nav.contact }
  ];

  const affiliationDisplay = isTelugu
    ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ ఇండియా & ఇంటర్నేషనల్ అనుబంధ సంస్థ'
    : (churchInfo.affiliation || 'Affiliated to Bible Open Universes India & International');

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-amber-500/20' : 'bg-slate-950 border-b border-slate-800'
    }`}>
      {/* Top Banner / Announcement ticker */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-900/60 font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              {t.common.mottoLabel}
            </span>
            <span className="font-medium tracking-wide">
              {t.common.motto}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="hidden md:flex items-center space-x-3">
              <span>{t.common.sundayWorship}</span>
              <span className="text-amber-200">|</span>
              <span>{t.common.helpline}: {churchInfo.phone}</span>
              <span className="text-amber-200">|</span>
            </div>

            {/* Quick Language Switcher in Top Bar */}
            <div className="flex items-center bg-amber-900/50 rounded-full p-0.5 border border-amber-300/40 text-[11px]">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all font-semibold ${
                  language === 'en'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-amber-100 hover:text-white'
                }`}
                title="Switch to English"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('te')}
                className={`px-2 py-0.5 rounded-full transition-all font-semibold ${
                  language === 'te'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-amber-100 hover:text-white'
                }`}
                title="తెలుగు భాషకు మార్చండి"
              >
                తెలుగు
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Church Branding */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-slate-950 font-bold text-2xl font-cinzel">✝</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white font-cinzel">
                  CHRIST <span className="text-amber-400">WORLD</span>
                </span>
                {isTelugu && (
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-amber-300/90 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    క్రీస్తు వరల్డ్
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-[11px] text-amber-300 font-semibold tracking-wide leading-tight">
                {affiliationDisplay}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === item.id
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Language Toggle, Search & Admin */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Selector Pill */}
            <div className="flex items-center bg-slate-900 border border-amber-500/30 rounded-lg p-0.5 text-xs shadow-inner">
              <div className="px-1.5 text-amber-400 hidden sm:block">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('te')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                  language === 'te'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="తెలుగు భాషలోనికి మార్చండి"
              >
                తెలుగు
              </button>
            </div>

            {/* Search */}
            <button
              onClick={openSearch}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center space-x-2 border border-slate-700/60 transition-colors text-xs font-medium"
              title={t.common.search}
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{t.common.search}</span>
            </button>

            {/* Admin */}
            {isAdminAuth ? (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 border transition-all ${
                  activeTab === 'admin'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border-amber-500/40'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.common.adminDashboard}</span>
              </button>
            ) : (
              <button
                onClick={openAdminLogin}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center space-x-1.5 border border-slate-700 transition-colors"
                title="Administrator Login"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.common.adminLogin}</span>
              </button>
            )}

            {/* Mobile menu trigger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          
          {/* Mobile Language Switcher bar */}
          <div className="flex items-center justify-between bg-slate-950/80 p-2.5 rounded-xl border border-amber-500/30 mb-2">
            <span className="text-xs font-semibold text-amber-300 flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.common.language} / భాష:</span>
            </span>
            <div className="flex space-x-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('te')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  language === 'te'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                తెలుగు
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 py-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-amber-500/20 text-amber-400 font-semibold border-l-4 border-amber-400'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <span className="text-xs text-amber-400">●</span>}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400">CHRIST WORLD • {isTelugu ? 'క్రీస్తు వరల్డ్' : 'Church & Universes'}</span>
            {isAdminAuth ? (
              <button
                onClick={() => {
                  setActiveTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-md border border-amber-500/30"
              >
                {t.common.adminDashboard}
              </button>
            ) : (
              <button
                onClick={() => {
                  openAdminLogin();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-medium text-slate-300 hover:text-amber-400 flex items-center space-x-1"
              >
                <Lock className="w-3 h-3" />
                <span>{t.common.adminLogin}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
