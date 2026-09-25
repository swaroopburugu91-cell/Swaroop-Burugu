import React, { useState } from 'react';
import { dbService } from '../services/db';
import { GalleryPhoto, GalleryAlbum } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Image as ImageIcon, Calendar, Tag, Layers } from 'lucide-react';

interface GalleryViewProps {
  onOpenLightbox: (photos: GalleryPhoto[], index: number) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onOpenLightbox }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const { isTelugu, t } = useLanguage();

  const db = dbService.getSnapshot();
  const albums = db.gallery_albums;
  const photos = db.gallery_photos;

  const categories = [
    { id: 'All', labelEn: 'All', labelTe: 'అన్నీ' },
    { id: 'Church Services', labelEn: 'Church Services', labelTe: 'ఆరాధనలు' },
    { id: 'Bible Studies', labelEn: 'Bible Studies', labelTe: 'బైబిల్ క్లాసులు' },
    { id: 'Youth', labelEn: 'Youth', labelTe: 'యువజన' },
    { id: "Children's Ministry", labelEn: "Children's Ministry", labelTe: 'సండే స్కూల్' },
    { id: "Women's Ministry", labelEn: "Women's Ministry", labelTe: 'మహిళా పరిచర్య' },
    { id: 'Special Events', labelEn: 'Special Events', labelTe: 'ప్రత్యేక సభలు' },
    { id: 'Bible Open Universes', labelEn: 'Bible Open Universes', labelTe: 'బైబిల్ ఓపెన్ యూనివర్సెస్' },
    { id: 'Community Activities', labelEn: 'Community Activities', labelTe: 'సేవా కార్యక్రమాలు' }
  ];

  const filteredPhotos = photos.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesAlbum = selectedAlbumId === 'all' || p.album_id === selectedAlbumId;
    return matchesCategory && matchesAlbum;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          {isTelugu ? 'కృపా జ్ఞాపకాలు' : 'Visual Memories of Grace'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-cinzel">
          {isTelugu ? 'చర్చ్ ఫోటో గ్యాలరీ & ఆల్బమ్స్' : 'Church Photo Gallery & Albums'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isTelugu
            ? 'ఆరాధనా కూడికలు, ప్రార్థన రాత్రులు, యువజన శిబిరాలు, సండే స్కూల్ మరియు బైబిల్ ఓపెన్ యూనివర్సెస్ జ్ఞాపకాలు. ఫోటోను పెద్దదిగా చూడడానికి దానిపై క్లిక్ చేయండి.'
            : 'Glimpses of worship gatherings, prayer nights, youth retreats, children’s ministry, Bible Open Universes events, and community outreaches. Click any photograph to open the interactive lightbox.'}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSelectedAlbumId('all');
            }}
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

      {/* Featured Albums Carousel / Grid */}
      {albums.length > 0 && selectedCategory === 'All' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm font-cinzel">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>{isTelugu ? 'ప్రత్యేక ఫోటో ఆల్బమ్‌లు' : 'Curated Church Albums'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {albums.map(album => {
              const albumPhotos = photos.filter(p => p.album_id === album.id);
              const isSelected = selectedAlbumId === album.id;

              return (
                <div
                  key={album.id}
                  onClick={() => setSelectedAlbumId(isSelected ? 'all' : album.id)}
                  className={`bg-white rounded-3xl overflow-hidden border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                      : 'border-slate-200 hover:border-amber-300 shadow-sm'
                  }`}
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={album.cover_image_url}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                      {albumPhotos.length} {isTelugu ? 'ఫోటోలు' : 'photos'}
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    {album.event_date && (
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                        {album.event_date}
                      </span>
                    )}
                    <h4 className="font-bold text-slate-900 text-sm font-cinzel">{album.title}</h4>
                    <p className="text-slate-500 text-xs line-clamp-2">{album.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Photos Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>
            {isTelugu
              ? `మొత్తం ${filteredPhotos.length} ఫోటోలు కనిపిస్తున్నాయి`
              : `Showing ${filteredPhotos.length} photographs`}
          </span>
          {selectedAlbumId !== 'all' && (
            <button
              onClick={() => setSelectedAlbumId('all')}
              className="text-amber-700 hover:text-amber-800 font-semibold"
            >
              {isTelugu ? 'ఆల్బమ్ ఫిల్టర్‌ను తీసివేయండి' : 'Clear album filter'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(filteredPhotos, index)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all border border-slate-200"
            >
              <img
                src={photo.photo_url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <span className="text-xs font-bold line-clamp-1">{photo.title}</span>
                <span className="text-[10px] text-amber-300 font-semibold">{photo.category}</span>
                {photo.date && (
                  <span className="text-[9px] text-slate-300">{photo.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-base font-bold text-slate-700">
            {isTelugu ? 'ఫోటోలు కనుగొనబడలేదు' : 'No photos found'}
          </p>
          <p className="text-xs text-slate-500">
            {isTelugu ? 'దయచేసి వేరే కేటగిరీని ఎంచుకోండి.' : 'Try choosing another category or clearing the album filter.'}
          </p>
        </div>
      )}

    </div>
  );
};
