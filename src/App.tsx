/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { LightboxModal } from './components/LightboxModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { MessageDetailModal } from './components/MessageDetailModal';
import { EventRegistrationModal } from './components/EventRegistrationModal';
import { UniversityApplicationModal } from './components/UniversityApplicationModal';
import { AdminLoginModal } from './views/admin/AdminLoginModal';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { LeadershipView } from './views/LeadershipView';
import { MembersView } from './views/MembersView';
import { BibleUniversityView } from './views/BibleUniversityView';
import { BibleMessagesView } from './views/BibleMessagesView';
import { YouTubeView } from './views/YouTubeView';
import { EventsView } from './views/EventsView';
import { GalleryView } from './views/GalleryView';
import { AnnouncementsView } from './views/AnnouncementsView';
import { ContactView } from './views/ContactView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';

import { dbService } from './services/db';
import { authService } from './services/auth';
import { BibleMessage, YouTubeVideo, ChurchEvent, GalleryPhoto, Course } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [, setDbVersion] = useState(0);

  // Modal triggers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Selected item modal states
  const [selectedMessage, setSelectedMessage] = useState<BibleMessage | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Lightbox
  const [lightboxPhotos, setLightboxPhotos] = useState<GalleryPhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Subscribe to DB mutations
  useEffect(() => {
    const unsub = dbService.subscribe(() => {
      setDbVersion(v => v + 1);
    });
    return unsub;
  }, []);

  // Handle opening lightbox
  const handleOpenLightbox = (photos: GalleryPhoto[], index: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Scroll to top on navigation
  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If activeTab is 'admin' and authenticated, render full admin suite
  if (activeTab === 'admin' && authService.isAuthenticated()) {
    return (
      <AdminDashboardView onReturnToSite={() => handleNavigate('home')} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        openSearch={() => setIsSearchOpen(true)}
        openAdminLogin={() => {
          if (authService.isAuthenticated()) {
            handleNavigate('admin');
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

      {/* Main Public Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={handleNavigate}
            onOpenMessage={msg => setSelectedMessage(msg)}
            onOpenVideo={vid => setSelectedVideo(vid)}
            onOpenPhoto={handleOpenLightbox}
            onOpenEventRsvp={evt => setSelectedEvent(evt)}
          />
        )}

        {activeTab === 'about' && <AboutView />}

        {activeTab === 'leadership' && <LeadershipView />}

        {activeTab === 'members' && <MembersView />}

        {activeTab === 'university' && (
          <BibleUniversityView onApplyCourse={course => setSelectedCourse(course)} />
        )}

        {activeTab === 'messages' && (
          <BibleMessagesView onOpenMessage={msg => setSelectedMessage(msg)} />
        )}

        {activeTab === 'youtube' && (
          <YouTubeView onOpenVideo={vid => setSelectedVideo(vid)} />
        )}

        {activeTab === 'events' && (
          <EventsView onRegisterEvent={evt => setSelectedEvent(evt)} />
        )}

        {activeTab === 'gallery' && (
          <GalleryView onOpenLightbox={handleOpenLightbox} />
        )}

        {activeTab === 'announcements' && <AnnouncementsView />}

        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleNavigate}
        openAdminLogin={() => {
          if (authService.isAuthenticated()) {
            handleNavigate('admin');
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onSelectMessage={msg => setSelectedMessage(msg)}
        onSelectVideo={vid => setSelectedVideo(vid)}
      />

      {/* Admin Login Dialog */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => handleNavigate('admin')}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        photos={lightboxPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={idx => setLightboxIndex(idx)}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={selectedVideo !== null}
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Message Reader Modal */}
      <MessageDetailModal
        isOpen={selectedMessage !== null}
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />

      {/* Event RSVP Registration Modal */}
      <EventRegistrationModal
        isOpen={selectedEvent !== null}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* University Application Modal */}
      <UniversityApplicationModal
        isOpen={selectedCourse !== null}
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />

    </div>
  );
}
