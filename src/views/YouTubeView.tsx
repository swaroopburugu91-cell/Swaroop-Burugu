import React, { useState } from 'react';
import { dbService } from '../services/db';
import { YouTubeVideo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Search, Video, Play, ExternalLink, BookOpen, Calendar, User } from 'lucide-react';

interface YouTubeViewProps {
  onOpenVideo: (video: YouTubeVideo) => void;
}

export const YouTubeView: React.FC<YouTubeViewProps> = ({ onOpenVideo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const db = dbService.getSnapshot();
  const videos = db.youtube_videos.filter(v => v.status === 'published');
  const { isTelugu, t } = useLanguage();

  const filteredVideos = videos.filter(
    v => v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         v.bible_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
         v.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
         v.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-red-600 font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-200">
          {isTelugu ? 'డిజిటల్ మీడియా & యూట్యూబ్ ప్రసారాలు' : 'Digital Ministry & Media'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-cinzel">
          {isTelugu ? 'యూట్యూబ్ ఆరాధనలు & వాక్య సందేశాలు' : 'YouTube Sermons & Worship Broadcasts'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isTelugu
            ? 'క్రీస్తు వరల్డ్ చర్చ్ ఆదివారపు ఆరాధనలు, ప్రత్యక్ష ప్రసారాలు (లైవ్), బైబిల్ క్లాసులు మరియు ప్రత్యేక సభల వీడియోలు.'
            : 'Watch uplifting Sunday sermons, midweek Bible studies, worship concerts, and special conference livestreams from CHRIST WORLD.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={
              isTelugu
                ? 'సందేశాలు, బోధకులు లేదా వాక్య భాగాలను వెతకండి...'
                : 'Search sermons, speakers, or Bible verses...'
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white"
          />
        </div>
        <div className="text-xs text-slate-500">
          {isTelugu ? (
            <span>మొత్తం <strong>{filteredVideos.length}</strong> వీడియోలు అందుబాటులో ఉన్నాయి</span>
          ) : (
            <span>Showing <strong className="text-slate-900">{filteredVideos.length}</strong> available video sermons</span>
          )}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map(video => (
          <div
            key={video.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail Container */}
              <div
                onClick={() => onOpenVideo(video)}
                className="relative aspect-video overflow-hidden cursor-pointer bg-slate-900"
              >
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-1 fill-white" />
                  </div>
                </div>

                {video.is_featured && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow">
                    Featured
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1 text-slate-600 font-medium">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    <span>{video.speaker}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{video.date}</span>
                  </span>
                </div>

                <h3
                  onClick={() => onOpenVideo(video)}
                  className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 cursor-pointer"
                >
                  {video.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                  {video.description}
                </p>

                {video.bible_reference && (
                  <div className="inline-block bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">
                    {video.bible_reference}
                  </div>
                )}
              </div>
            </div>

            {/* Action */}
            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">{video.speaker}</span>
              <button
                onClick={() => onOpenVideo(video)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs transition-colors flex items-center space-x-1.5 shadow"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isTelugu ? 'వీడియో చూడండి' : 'Watch Video'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
          <Video className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-base font-bold text-slate-700">
            {isTelugu ? 'వీడియోలు కనుగొనబడలేదు' : 'No videos found'}
          </p>
          <p className="text-xs text-slate-500">
            {isTelugu ? 'దయచేసి వేరే పేరుతో వెతకండి.' : 'Try changing your search keywords.'}
          </p>
        </div>
      )}

    </div>
  );
};
