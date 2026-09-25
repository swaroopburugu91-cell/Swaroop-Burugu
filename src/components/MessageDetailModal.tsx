import React from 'react';
import { X, BookOpen, User, Calendar, Tag, Eye, Share2, Quote } from 'lucide-react';
import { BibleMessage } from '../types';

interface MessageDetailModalProps {
  message: BibleMessage | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MessageDetailModal: React.FC<MessageDetailModalProps> = ({ message, isOpen, onClose }) => {
  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded text-xs">
              {message.category}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-amber-300 font-semibold text-xs">
              {message.bible_reference}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300">
          {/* Title & Metadata */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-cinzel leading-snug">
              {message.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-white font-medium">{message.speaker}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{message.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{message.views_count} reads</span>
              </span>
            </div>
          </div>

          {/* Scripture Verse Quote Card */}
          {message.scripture_verse_text && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-800/60 to-slate-900 border-l-4 border-amber-500 shadow-inner">
              <div className="flex items-start space-x-3">
                <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="italic text-amber-100 font-serif text-sm sm:text-base leading-relaxed">
                  "{message.scripture_verse_text}"
                </p>
              </div>
            </div>
          )}

          {/* Featured Image if available */}
          {message.featured_image_url && (
            <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden shadow-lg border border-slate-800">
              <img
                src={message.featured_image_url}
                alt={message.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Full Expository Notes */}
          <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-200">
            {message.full_content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Reflection Footer */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Knowing Christ • Growing in Christ
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              May the Holy Spirit illuminate this word to your spiritual growth. Share this message with family, fellowship groups, or friends seeking encouragement.
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            Close Sermon Reader
          </button>
        </div>

      </div>
    </div>
  );
};
