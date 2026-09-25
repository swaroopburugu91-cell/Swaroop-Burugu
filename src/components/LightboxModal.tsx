import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface LightboxModalProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length]);

  if (!isOpen || photos.length === 0 || currentIndex < 0 || currentIndex >= photos.length) {
    return null;
  }

  const currentPhoto = photos[currentIndex];

  const handlePrev = () => {
    const prev = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(prev);
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % photos.length;
    onNavigate(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-all shadow-lg"
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation arrows */}
      {photos.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-all shadow-lg"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-all shadow-lg"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image & Caption Box */}
      <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
        <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-black/40">
          <img
            src={currentPhoto.photo_url}
            alt={currentPhoto.title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
          />
        </div>

        {/* Caption & Metadata Bar */}
        <div className="w-full mt-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-white text-base font-bold font-cinzel">{currentPhoto.title}</h3>
            {currentPhoto.caption && (
              <p className="text-slate-300 text-xs mt-0.5">{currentPhoto.caption}</p>
            )}
            <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-1">
              <span className="flex items-center space-x-1">
                <Tag className="w-3 h-3 text-amber-400" />
                <span className="text-amber-300 font-medium">{currentPhoto.category}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{currentPhoto.date}</span>
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium bg-slate-800 px-3 py-1 rounded-full self-end sm:self-center">
            Photo {currentIndex + 1} of {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
};
