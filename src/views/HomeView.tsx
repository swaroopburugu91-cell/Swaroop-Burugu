import React from 'react';
import { ActiveTab } from '../components/Navbar';
import { dbService } from '../services/db';
import { BibleMessage, YouTubeVideo, ChurchEvent, GalleryPhoto } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  BookOpen,
  Video,
  Calendar,
  GraduationCap,
  Users,
  Image as ImageIcon,
  Bell,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Play,
  Sparkles,
  ExternalLink,
  Clock
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenMessage: (msg: BibleMessage) => void;
  onOpenVideo: (vid: YouTubeVideo) => void;
  onOpenPhoto: (photos: GalleryPhoto[], index: number) => void;
  onOpenEventRsvp: (evt: ChurchEvent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onOpenMessage,
  onOpenVideo,
  onOpenPhoto,
  onOpenEventRsvp
}) => {
  const db = dbService.getSnapshot();
  const churchInfo = db.church_info;
  const university = db.bible_university;
  const { language, t, isTelugu } = useLanguage();

  // Content items
  const latestMessage = db.bible_messages.find(m => m.status === 'published');
  const featuredVideo = db.youtube_videos.find(v => v.status === 'published' && v.is_featured) ||
                        db.youtube_videos.find(v => v.status === 'published');
  const upcomingEvents = db.events
    .filter(e => e.status === 'published' && new Date(e.date) >= new Date('2026-09-01'))
    .slice(0, 3);
  const featuredCourses = db.courses.filter(c => c.status === 'published').slice(0, 3);
  const churchFamily = dbService.getPublicMembers().slice(0, 4);
  const galleryPreview = db.gallery_photos.slice(0, 6);
  const latestAnnouncements = db.announcements.filter(a => a.status === 'published').slice(0, 3);

  const affiliationDisplay = isTelugu
    ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ ఇండియా & ఇంటర్నేషనల్ అనుబంధ సంస్థ'
    : (churchInfo.affiliation || 'Affiliated to Bible Open Universes India & International');

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[82vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with Dark & Royal Navy Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={churchInfo.banner_image_url}
            alt="CHRIST WORLD Church Sanctuary"
            className="w-full h-full object-cover scale-105 transform animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg backdrop-blur-sm">
            <span className="text-amber-400">✝</span>
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white font-cinzel tracking-tight leading-tight">
            CHRIST <span className="gold-text-gradient">WORLD</span>
          </h1>

          <div className="mt-3 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm md:text-base font-semibold tracking-wide shadow-lg backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{affiliationDisplay}</span>
          </div>

          <p className="mt-4 text-lg sm:text-2xl text-amber-200/90 font-medium tracking-wide max-w-2xl">
            {t.common.motto}
          </p>

          <p className="mt-4 text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Scripture Verse Box */}
          <div className="mt-6 max-w-xl mx-auto px-5 py-3 rounded-2xl bg-slate-900/60 border border-amber-500/30 backdrop-blur-sm text-xs text-amber-200/90 italic">
            <p className="font-serif leading-relaxed">
              {t.hero.verseText}
            </p>
            <span className="block text-right font-sans not-italic text-amber-400 font-bold mt-1 text-[11px]">
              — {t.hero.verseRef}
            </span>
          </div>

          {/* 4 Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('about')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/20 transform hover:-translate-y-0.5 transition-all"
            >
              {isTelugu ? 'మా గురించి & విశ్వాసాలు' : 'Learn More'}
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 hover:border-amber-500/50 shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isTelugu ? 'బైబిల్ సందేశాలు' : 'Watch Messages'}</span>
            </button>
            <button
              onClick={() => setActiveTab('university')}
              className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-semibold text-xs sm:text-sm border border-amber-500/40 hover:border-amber-400 shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>{isTelugu ? 'బైబిల్ ఓపెన్ యూనివర్సెస్' : 'Bible Open Universes'}</span>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              {isTelugu ? 'మమ్మల్ని సంప్రదించండి' : 'Contact Us'}
            </button>
          </div>

          {/* Quick Schedule summary badge */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-left w-full max-w-4xl">
            <div className="bg-slate-900/70 backdrop-blur-sm p-3.5 rounded-xl border border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {isTelugu ? 'ఆదివారం ఆరాధన' : 'Sunday Worship'}
              </span>
              <p className="text-white font-semibold text-xs mt-0.5">09:30 AM – 12:30 PM</p>
              <p className="text-slate-400 text-[11px]">
                {isTelugu ? 'ముఖ్య ఆరాధన & వాక్యం' : 'Main Expository Service'}
              </p>
            </div>
            <div className="bg-slate-900/70 backdrop-blur-sm p-3.5 rounded-xl border border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {isTelugu ? 'బైబిల్ అధ్యయనం' : 'Bible Study'}
              </span>
              <p className="text-white font-semibold text-xs mt-0.5">
                {isTelugu ? 'బుధవారం 07:00 PM' : 'Wednesday 07:00 PM'}
              </p>
              <p className="text-slate-400 text-[11px]">
                {isTelugu ? 'వచన-వచన వివరణ' : 'Verse-by-Verse Study'}
              </p>
            </div>
            <div className="bg-slate-900/70 backdrop-blur-sm p-3.5 rounded-xl border border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {isTelugu ? 'ఉపవాస ప్రార్థన' : 'Fasting Prayer'}
              </span>
              <p className="text-white font-semibold text-xs mt-0.5">
                {isTelugu ? 'శుక్రవారం 09:00 PM' : 'Friday 09:00 PM'}
              </p>
              <p className="text-slate-400 text-[11px]">
                {isTelugu ? 'స్వస్థత & విజ్ఞాపన' : 'Intercession & Healing'}
              </p>
            </div>
            <div className="bg-slate-900/70 backdrop-blur-sm p-3.5 rounded-xl border border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {isTelugu ? 'యూత్ పరిచర్య' : 'Youth Fellowship'}
              </span>
              <p className="text-white font-semibold text-xs mt-0.5">
                {isTelugu ? 'శనివారం 05:30 PM' : 'Saturday 05:30 PM'}
              </p>
              <p className="text-slate-400 text-[11px]">
                {isTelugu ? 'యువత శిష్యరికం' : 'Ignite Discipleship'}
              </p>
            </div>
          </div>

        </div>
      </section>



      {/* 3. LATEST SERMON & YOUTUBE STREAMING SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Latest Bible Message */}
          {latestMessage && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-3">
                  <span className="bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isTelugu ? 'తాజా సందేశం' : 'Latest Bible Exposition'}</span>
                  </span>
                  <span>{latestMessage.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white leading-snug">
                  {latestMessage.title}
                </h3>
                <p className="text-amber-300 font-semibold text-xs mt-1.5 flex items-center space-x-1">
                  <span>{isTelugu ? 'వాక్య భాగం' : 'Scripture'}:</span>
                  <span className="italic">{latestMessage.bible_reference}</span>
                </p>
                <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                  {latestMessage.short_description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {isTelugu ? 'బోధకులు' : 'Speaker'}: <strong className="text-slate-200">{latestMessage.speaker}</strong>
                </span>
                <button
                  onClick={() => onOpenMessage(latestMessage)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <span>{isTelugu ? 'సందేశం చదవండి' : 'Read Full Message'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* YouTube Live / Featured Video */}
          {featuredVideo && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between text-xs text-red-400 font-semibold mb-3">
                  <span className="bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 flex items-center space-x-1.5">
                    <Video className="w-3.5 h-3.5" />
                    <span>{isTelugu ? 'యూట్యూబ్ వీడియో' : 'YouTube Channel Feature'}</span>
                  </span>
                  {featuredVideo.is_featured && (
                    <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                      Featured
                    </span>
                  )}
                </div>

                <div
                  onClick={() => onOpenVideo(featuredVideo)}
                  className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group mb-4 shadow-lg border border-slate-700/60"
                >
                  <img
                    src={featuredVideo.thumbnail_url}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-1 fill-white" />
                    </div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                  {featuredVideo.title}
                </h3>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400">{featuredVideo.speaker}</span>
                <button
                  onClick={() => setActiveTab('youtube')}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
                >
                  <span>{isTelugu ? 'అన్ని వీడియోలు చూడండి' : 'More Videos & Sermons'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. UPCOMING CHURCH EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>{isTelugu ? 'కార్యక్రమాలు' : 'Calendar & Convocations'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel mt-1">
              {isTelugu ? 'రాబోయే ప్రత్యేక కార్యక్రమాలు' : 'Upcoming Church Events & Conferences'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('events')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
          >
            <span>{isTelugu ? 'అన్ని కార్యక్రమాలు చూడండి' : 'View Full Events Calendar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map(evt => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={evt.image_url}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm text-amber-400 font-bold text-xs px-2.5 py-1 rounded-lg border border-amber-500/30">
                    {evt.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-amber-600 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base font-cinzel line-clamp-1 group-hover:text-amber-700 transition-colors">
                    {evt.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{evt.location}</span>
                  </div>
                  <p className="text-slate-600 text-xs line-clamp-2 pt-1 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenEventRsvp(evt)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>{isTelugu ? 'నమోదు చేసుకోండి (RSVP)' : 'Register / RSVP'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BIBLE OPEN UNIVERSES HIGHLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl navy-gradient p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-amber-500/30">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-4">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>{isTelugu ? 'థియోలాజికల్ విభాగం' : university.title} – India & International</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-white leading-tight">
              {isTelugu
                ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ – దైవజనుల శిక్షణా కేంద్రం'
                : 'Bible Open Universes – Theological Education for India & Global Disciples'}
            </h2>

            <p className="mt-4 text-xs sm:text-base text-slate-300 leading-relaxed">
              {isTelugu ? t.bou.description : 'Equipping pastors, evangelists, church workers, and believers with rigorous biblical exegesis, hermeneutics, and ministry leadership through distance learning, modular courses, and regional centers.'}
            </p>

            {/* Sub-areas: India & International */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-xs text-slate-300">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">
                  {isTelugu ? 'భారతదేశ వ్యాప్తంగా కోర్సులు' : 'Programs Across India'}
                </span>
                <p>
                  {isTelugu
                    ? 'కరస్పాండెన్స్ కోర్సులు, తెలుగు మరియు ఇంగ్లీష్ మాధ్యమాలలో స్టడీ మెటీరియల్స్, వీకెండ్ సెమినార్లు.'
                    : 'Correspondence modules, regional vernacular training, weekend seminars, and grassroots church planter preparation.'}
                </p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">
                  {isTelugu ? 'అంతర్జాతీయ శిక్షణ' : 'International Global Cohorts'}
                </span>
                <p>
                  {isTelugu
                    ? 'విదేశీ విద్యార్థుల కోసం ఆన్‌లైన్ తరగతులు, గ్లోబల్ మిషన్స్ గైడెన్స్ మరియు డిప్లొమా ప్రోగ్రాములు.'
                    : 'Digital distance learning for overseas students, interactive theological forums, and missions mentorship.'}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('university')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-xl flex items-center space-x-2 transition-all"
              >
                <span>{isTelugu ? 'కోర్సులు & ప్రవేశాల వివరాలు' : 'Learn More & View Courses'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-xs text-amber-300 font-medium">
                {t.bou.admissionsOpen}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CHURCH FAMILY & LEADERS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-amber-500" />
              <span>{isTelugu ? 'మా సంఘము' : 'Our Community'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel mt-1">
              {isTelugu ? 'పాస్టర్లు & నాయకత్వ బృందం' : 'Church Family & Leadership'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('leadership')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
          >
            <span>{isTelugu ? 'నాయకులందరినీ చూడండి' : 'Meet All Pastors & Leaders'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {churchFamily.map(m => (
            <div
              key={m.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow hover:shadow-lg transition-all p-5 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-amber-500/30 group-hover:border-amber-500 transition-colors shadow">
                <img
                  src={m.photo_url}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-slate-900 text-sm font-cinzel">{m.name}</h3>
              <p className="text-[11px] font-semibold text-amber-700 mt-0.5">{m.role_or_ministry}</p>
              <p className="text-slate-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                {m.biography}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center space-x-1.5">
              <ImageIcon className="w-4 h-4 text-amber-500" />
              <span>{isTelugu ? 'కృపా జ్ఞాపకాలు' : 'Memories of Grace'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel mt-1">
              {isTelugu ? 'చర్చ్ ఫోటో గ్యాలరీ' : 'Recent Church Photographs'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('gallery')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
          >
            <span>{isTelugu ? 'మొత్తం గ్యాలరీ చూడండి' : 'Open Full Photo Gallery'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {galleryPreview.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => onOpenPhoto(galleryPreview, index)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md"
            >
              <img
                src={photo.photo_url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                <span className="text-white text-[11px] font-semibold line-clamp-2">{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LATEST ANNOUNCEMENTS */}
      {latestAnnouncements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-cinzel text-white">
                    {isTelugu ? 'ముఖ్య ప్రకటనలు' : 'Latest Church Announcements'}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    {isTelugu ? 'చర్చ్ పరిపాలన మరియు కార్యక్రమాల సమాచారం' : 'Stay informed with updates from church administration'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('announcements')}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                {t.common.viewAll}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {latestAnnouncements.map(ann => (
                <div
                  key={ann.id}
                  className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/70 hover:border-amber-500/50 transition-colors space-y-2"
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-amber-400 font-semibold">{ann.date}</span>
                    {ann.is_important && (
                      <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-bold uppercase">
                        {isTelugu ? 'ముఖ్యమైనది' : 'Important'}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{ann.title}</h4>
                  <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                    {ann.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. CONTACT QUICK PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{isTelugu ? 'మమ్మల్ని కలవండి లేదా సంప్రదించండి' : 'Visit Us or Reach Out'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel">
                {isTelugu ? 'క్రీస్తు వరల్డ్ సంఘంలోనికి మీకు సాదర స్వాగతం' : 'We Would Love to Welcome You to CHRIST WORLD'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                {isTelugu
                  ? 'చర్చ్, పరిచర్యలు లేదా బైబిల్ ఓపెన్ యూనివర్సెస్ కోర్సుల గురించి సందేహాలు ఉన్నా, ప్రార్థన సహాయం కావాలన్నా మా పాస్టరల్ బృందాన్ని సంప్రదించండి.'
                  : 'Have questions about our church, ministries, or Bible Open Universes courses? Need prayer support? Reach out to our pastoral team.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{churchInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{churchInfo.email}</span>
                </div>
                <div className="flex items-start space-x-2 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{churchInfo.address}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => setActiveTab('contact')}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>{isTelugu ? 'ప్రార్థన విన్నపం పంపండి' : 'Send a Message & Prayer Request'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/${churchInfo.whatsapp_number.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>{isTelugu ? 'వాట్సాప్ ద్వారా సంప్రదించండి' : 'Chat via Official WhatsApp'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
