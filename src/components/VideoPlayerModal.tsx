import React from 'react';
import { X, ExternalLink, BookOpen, User, Calendar } from 'lucide-react';
import { YouTubeVideo } from '../types';

interface VideoPlayerModalProps {
  video: YouTubeVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, isOpen, onClose }) => {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1 font-cinzel">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Embed / Responsive Container */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtube_video_id}?autoplay=1&rel=0`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Details & Scripture Reference */}
        <div className="p-5 overflow-y-auto space-y-4 bg-slate-900 text-xs text-slate-300">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-md font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Scripture: {video.bible_reference}</span>
              </span>
              <span className="flex items-center space-x-1 text-slate-300">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Speaker: {video.speaker}</span>
              </span>
              <span className="flex items-center space-x-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{video.date}</span>
              </span>
            </div>

            <a
              href={video.youtube_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1 text-red-400 hover:text-red-300 font-semibold px-2 py-1 rounded bg-red-950/40 border border-red-900/60"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Message Overview</h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {video.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
