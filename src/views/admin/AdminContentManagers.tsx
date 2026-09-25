import React, { useState } from 'react';
import { dbService } from '../../services/db';
import {
  Leader,
  Member,
  BibleMessage,
  YouTubeVideo,
  ChurchEvent,
  Announcement,
  Course,
  GalleryPhoto,
  GalleryAlbum,
  ChurchInfo
} from '../../types';
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Check,
  X,
  Save,
  BookOpen,
  Video,
  Calendar,
  Image as ImageIcon,
  Bell,
  GraduationCap,
  Users,
  Award,
  Globe
} from 'lucide-react';

interface ContentManagerProps {
  section: string;
}

export const AdminContentManagers: React.FC<ContentManagerProps> = ({ section }) => {
  const db = dbService.getSnapshot();

  // Modal / Form states for creation
  const [showAddModal, setShowAddModal] = useState(false);
  const [churchInfoForm, setChurchInfoForm] = useState<ChurchInfo>(db.church_info);
  const [infoSavedMessage, setInfoSavedMessage] = useState(false);

  // Simple state for creating a message
  const [msgTitle, setMsgTitle] = useState('');
  const [msgRef, setMsgRef] = useState('');
  const [msgSpeaker, setMsgSpeaker] = useState('');
  const [msgCategory, setMsgCategory] = useState<BibleMessage['category']>('Faith');
  const [msgDesc, setMsgDesc] = useState('');
  const [msgContent, setMsgContent] = useState('');

  // Simple state for creating a video
  const [ytTitle, setYtTitle] = useState('');
  const [ytUrl, setYtUrl] = useState('');
  const [ytId, setYtId] = useState('');
  const [ytRef, setYtRef] = useState('');
  const [ytSpeaker, setYtSpeaker] = useState('');
  const [ytDesc, setYtDesc] = useState('');

  // Simple state for creating an event
  const [evtTitle, setEvtTitle] = useState('');
  const [evtDate, setEvtDate] = useState('2026-10-15');
  const [evtTime, setEvtTime] = useState('09:30 AM – 12:00 PM');
  const [evtLocation, setEvtLocation] = useState('');
  const [evtDesc, setEvtDesc] = useState('');
  const [evtCategory, setEvtCategory] = useState<ChurchEvent['category']>('Worship Service');

  // Simple state for creating an announcement
  const [annTitle, setAnnTitle] = useState('');
  const [annDate, setAnnDate] = useState('2026-09-25');
  const [annDesc, setAnnDesc] = useState('');
  const [annImportant, setAnnImportant] = useState(false);
  const [annCategory, setAnnCategory] = useState<Announcement['category']>('General');

  // Simple state for creating a course
  const [crsName, setCrsName] = useState('');
  const [crsCode, setCrsCode] = useState('');
  const [crsDuration, setCrsDuration] = useState('6 Months');
  const [crsLevel, setCrsLevel] = useState<Course['level']>('Certificate');
  const [crsDesc, setCrsDesc] = useState('');
  const [crsMode, setCrsMode] = useState<Course['mode_of_study']>('Online / Distance Learning');

  // Simple state for adding a leader
  const [ldrName, setLdrName] = useState('');
  const [ldrPosition, setLdrPosition] = useState('Pastor');
  const [ldrDept, setLdrDept] = useState('');
  const [ldrBio, setLdrBio] = useState('');

  // Simple state for adding a member
  const [mbrName, setMbrName] = useState('');
  const [mbrRole, setMbrRole] = useState('Volunteer');
  const [mbrBio, setMbrBio] = useState('');
  const [mbrPublic, setMbrPublic] = useState(true);

  // --- CHURCH INFO SAVE ---
  const handleSaveChurchInfo = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.updateChurchInfo(churchInfoForm);
    setInfoSavedMessage(true);
    setTimeout(() => setInfoSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. CHURCH INFO */}
      {section === 'church_info' && (
        <form onSubmit={handleSaveChurchInfo} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-xs text-slate-300">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-white">Church Profile & General Information</h3>
              <p className="text-[11px] text-slate-400">Edit church name, mission statement, service times, and contact metadata</p>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          {infoSavedMessage && (
            <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-600/60 text-emerald-300 text-xs">
              Church information saved and updated across all public pages!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Church Name</label>
              <input
                type="text"
                value={churchInfoForm.name}
                onChange={e => setChurchInfoForm({ ...churchInfoForm, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Affiliation (Below Name)</label>
              <input
                type="text"
                value={churchInfoForm.affiliation || ''}
                placeholder="Affiliated to Bible Open Universes India & International"
                onChange={e => setChurchInfoForm({ ...churchInfoForm, affiliation: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Motto / Tagline</label>
              <input
                type="text"
                value={churchInfoForm.tagline}
                onChange={e => setChurchInfoForm({ ...churchInfoForm, tagline: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Welcome Introduction (Home Page)</label>
            <textarea
              rows={3}
              value={churchInfoForm.welcome_intro}
              onChange={e => setChurchInfoForm({ ...churchInfoForm, welcome_intro: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Mission</label>
              <textarea
                rows={3}
                value={churchInfoForm.mission}
                onChange={e => setChurchInfoForm({ ...churchInfoForm, mission: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white resize-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Vision</label>
              <textarea
                rows={3}
                value={churchInfoForm.vision}
                onChange={e => setChurchInfoForm({ ...churchInfoForm, vision: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Helpline Phone</label>
              <input
                type="text"
                value={churchInfoForm.phone}
                onChange={e => setChurchInfoForm({ ...churchInfoForm, phone: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Office Email</label>
              <input
                type="email"
                value={churchInfoForm.email}
                onChange={e => setChurchInfoForm({ ...churchInfoForm, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official WhatsApp</label>
              <input
                type="text"
                value={churchInfoForm.whatsapp_number}
                onChange={e => setChurchInfoForm({ ...churchInfoForm, whatsapp_number: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Physical Address</label>
            <input
              type="text"
              value={churchInfoForm.address}
              onChange={e => setChurchInfoForm({ ...churchInfoForm, address: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
            />
          </div>
        </form>
      )}

      {/* 2. BIBLE MESSAGES CRUD */}
      {section === 'messages' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-white">Bible Messages & Sermons</h3>
              <p className="text-xs text-slate-400">Draft, publish, edit, or remove sermon expositions</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Message</span>
            </button>
          </div>

          {/* Add Message Form Modal */}
          {showAddModal && (
            <div className="p-5 bg-slate-800/90 rounded-2xl border border-amber-500/40 space-y-4 text-xs">
              <div className="flex justify-between items-center text-amber-300 font-bold">
                <span>Create New Bible Message</span>
                <button onClick={() => setShowAddModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Message Title *"
                  value={msgTitle}
                  onChange={e => setMsgTitle(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Bible Reference (e.g. 2 Peter 3:18) *"
                  value={msgRef}
                  onChange={e => setMsgRef(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Speaker Name *"
                  value={msgSpeaker}
                  onChange={e => setMsgSpeaker(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
                <select
                  value={msgCategory}
                  onChange={e => setMsgCategory(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="Faith">Faith</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Spiritual Growth">Spiritual Growth</option>
                  <option value="Christian Life">Christian Life</option>
                  <option value="Family">Family</option>
                  <option value="Youth">Youth</option>
                  <option value="Old Testament">Old Testament</option>
                  <option value="New Testament">New Testament</option>
                </select>
              </div>
              <textarea
                rows={2}
                placeholder="Short Description / Summary *"
                value={msgDesc}
                onChange={e => setMsgDesc(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white resize-none"
              />
              <textarea
                rows={4}
                placeholder="Full Message / Sermon Expository Notes *"
                value={msgContent}
                onChange={e => setMsgContent(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white resize-none"
              />
              <button
                onClick={() => {
                  if (!msgTitle || !msgRef || !msgSpeaker) return;
                  dbService.addBibleMessage({
                    title: msgTitle,
                    bible_reference: msgRef,
                    speaker: msgSpeaker,
                    date: new Date().toISOString().split('T')[0],
                    category: msgCategory,
                    short_description: msgDesc || 'Sermon exposition from CHRIST WORLD.',
                    full_content: msgContent || msgDesc,
                    featured_image_url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80',
                    status: 'published'
                  });
                  setShowAddModal(false);
                  setMsgTitle('');
                  setMsgRef('');
                  setMsgSpeaker('');
                  setMsgDesc('');
                  setMsgContent('');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg"
              >
                Publish Sermon
              </button>
            </div>
          )}

          {/* Messages Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Title & Reference</th>
                  <th className="p-3">Speaker</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {db.bible_messages.map(m => (
                  <tr key={m.id} className="hover:bg-slate-800/40">
                    <td className="p-3">
                      <div className="font-semibold text-white">{m.title}</div>
                      <div className="text-amber-400 text-[11px]">{m.bible_reference}</div>
                    </td>
                    <td className="p-3">{m.speaker}</td>
                    <td className="p-3"><span className="bg-slate-800 px-2 py-0.5 rounded">{m.category}</span></td>
                    <td className="p-3">
                      <button
                        onClick={() => dbService.togglePublishStatus('bible_messages', m.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {m.status.toUpperCase()}
                      </button>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => dbService.deleteBibleMessage(m.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/20"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. YOUTUBE VIDEOS CRUD */}
      {section === 'youtube' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-white">YouTube Sermons & Media</h3>
              <p className="text-xs text-slate-400">Embed videos, set scripture anchors, and manage channel links</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add YouTube Video</span>
            </button>
          </div>

          {showAddModal && (
            <div className="p-5 bg-slate-800/90 rounded-2xl border border-red-500/40 space-y-4 text-xs">
              <div className="flex justify-between items-center text-red-400 font-bold">
                <span>Add YouTube Sermon Video</span>
                <button onClick={() => setShowAddModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Video Title *"
                  value={ytTitle}
                  onChange={e => setYtTitle(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
                <input
                  type="text"
                  placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ) *"
                  value={ytId}
                  onChange={e => setYtId(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Bible Reference *"
                  value={ytRef}
                  onChange={e => setYtRef(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Speaker *"
                  value={ytSpeaker}
                  onChange={e => setYtSpeaker(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Video Description *"
                value={ytDesc}
                onChange={e => setYtDesc(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white resize-none"
              />
              <button
                onClick={() => {
                  if (!ytTitle || !ytId) return;
                  dbService.addYouTubeVideo({
                    title: ytTitle,
                    youtube_video_id: ytId,
                    youtube_url: `https://www.youtube.com/watch?v=${ytId}`,
                    bible_reference: ytRef || '2 Peter 3:18',
                    speaker: ytSpeaker || 'Pastoral Team',
                    date: new Date().toISOString().split('T')[0],
                    description: ytDesc || ytTitle,
                    thumbnail_url: 'https://images.unsplash.com/photo-1510519138161-58474ebf8496?auto=format&fit=crop&w=800&q=80',
                    is_featured: false,
                    status: 'published'
                  });
                  setShowAddModal(false);
                  setYtTitle('');
                  setYtId('');
                  setYtRef('');
                  setYtSpeaker('');
                  setYtDesc('');
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
              >
                Publish Video
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Video Title & ID</th>
                  <th className="p-3">Reference & Speaker</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {db.youtube_videos.map(v => (
                  <tr key={v.id} className="hover:bg-slate-800/40">
                    <td className="p-3">
                      <div className="font-semibold text-white">{v.title}</div>
                      <div className="text-slate-400 text-[10px] font-mono">ID: {v.youtube_video_id}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-amber-400">{v.bible_reference}</div>
                      <div className="text-slate-400 text-[11px]">{v.speaker}</div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => dbService.togglePublishStatus('youtube_videos', v.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {v.status.toUpperCase()}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => dbService.deleteYouTubeVideo(v.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. EVENTS CRUD */}
      {section === 'events' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-white">Conferences & Events Management</h3>
              <p className="text-xs text-slate-400">Create church events and view attendee RSVP registrations</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>

          {showAddModal && (
            <div className="p-5 bg-slate-800/90 rounded-2xl border border-amber-500/40 space-y-4 text-xs">
              <div className="flex justify-between items-center text-amber-300 font-bold">
                <span>Create New Event</span>
                <button onClick={() => setShowAddModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Event Title *"
                  value={evtTitle}
                  onChange={e => setEvtTitle(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
                <input
                  type="date"
                  value={evtDate}
                  onChange={e => setEvtDate(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Time (e.g. 09:30 AM – 12:00 PM)"
                  value={evtTime}
                  onChange={e => setEvtTime(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Location / Venue *"
                  value={evtLocation}
                  onChange={e => setEvtLocation(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Description *"
                value={evtDesc}
                onChange={e => setEvtDesc(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white resize-none"
              />
              <button
                onClick={() => {
                  if (!evtTitle || !evtLocation) return;
                  dbService.addEvent({
                    title: evtTitle,
                    date: evtDate,
                    time: evtTime,
                    location: evtLocation,
                    description: evtDesc || evtTitle,
                    image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
                    category: evtCategory,
                    registration_required: true,
                    contact_info: 'Church Office: +91 98765 43210',
                    status: 'published'
                  });
                  setShowAddModal(false);
                  setEvtTitle('');
                  setEvtLocation('');
                  setEvtDesc('');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg"
              >
                Save Event
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Event Title</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {db.events.map(e => (
                  <tr key={e.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{e.title}</td>
                    <td className="p-3 text-amber-400">{e.date} ({e.time})</td>
                    <td className="p-3 text-slate-400">{e.location}</td>
                    <td className="p-3">
                      <button
                        onClick={() => dbService.togglePublishStatus('events', e.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          e.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {e.status.toUpperCase()}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => dbService.deleteEvent(e.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. LEADERSHIP CRUD */}
      {section === 'leadership' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-white">Pastoral & Ministry Leaders</h3>
              <p className="text-xs text-slate-400">Add or manage leadership profiles and pastoral biographies</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Leader</span>
            </button>
          </div>

          {showAddModal && (
            <div className="p-5 bg-slate-800/90 rounded-2xl border border-amber-500/40 space-y-4 text-xs">
              <div className="flex justify-between items-center text-amber-300 font-bold">
                <span>Add Leader</span>
                <button onClick={() => setShowAddModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Leader Full Name *"
                  value={ldrName}
                  onChange={e => setLdrName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Position (e.g. Associate Pastor) *"
                  value={ldrPosition}
                  onChange={e => setLdrPosition(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <input
                type="text"
                placeholder="Ministry Department *"
                value={ldrDept}
                onChange={e => setLdrDept(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              />
              <textarea
                rows={3}
                placeholder="Biography *"
                value={ldrBio}
                onChange={e => setLdrBio(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white resize-none"
              />
              <button
                onClick={() => {
                  if (!ldrName || !ldrPosition) return;
                  dbService.addLeader({
                    name: ldrName,
                    position: ldrPosition,
                    ministry_department: ldrDept || 'General Pastoral Care',
                    biography: ldrBio || 'Faithful servant leader in CHRIST WORLD.',
                    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
                    display_order: db.leaders.length + 1,
                    status: 'published'
                  });
                  setShowAddModal(false);
                  setLdrName('');
                  setLdrPosition('Pastor');
                  setLdrDept('');
                  setLdrBio('');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg"
              >
                Save Leader
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Leader Name</th>
                  <th className="p-3">Position</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {db.leaders.map(l => (
                  <tr key={l.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{l.name}</td>
                    <td className="p-3 text-amber-400 font-medium">{l.position}</td>
                    <td className="p-3 text-slate-400">{l.ministry_department}</td>
                    <td className="p-3">
                      <button
                        onClick={() => dbService.togglePublishStatus('leaders', l.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          l.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {l.status.toUpperCase()}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => dbService.deleteLeader(l.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. MEMBERS CRUD (Security/Privacy Protection) */}
      {section === 'members' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-white">Church Members Directory</h3>
              <p className="text-xs text-slate-400">Control public visibility and protect member confidential information</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>

          {showAddModal && (
            <div className="p-5 bg-slate-800/90 rounded-2xl border border-amber-500/40 space-y-4 text-xs">
              <div className="flex justify-between items-center text-amber-300 font-bold">
                <span>Add Church Member</span>
                <button onClick={() => setShowAddModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={mbrName}
                  onChange={e => setMbrName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Role / Ministry (e.g. Choir, Usher) *"
                  value={mbrRole}
                  onChange={e => setMbrRole(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Biography *"
                value={mbrBio}
                onChange={e => setMbrBio(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white resize-none"
              />
              <div className="flex items-center space-x-2 text-slate-300">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={mbrPublic}
                  onChange={e => setMbrPublic(e.target.checked)}
                />
                <label htmlFor="pubCheck">Display on Public Members Directory (with consent)</label>
              </div>
              <button
                onClick={() => {
                  if (!mbrName || !mbrRole) return;
                  dbService.addMember({
                    name: mbrName,
                    role_or_ministry: mbrRole,
                    biography: mbrBio || 'Active servant in church ministries.',
                    photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
                    consent_given: true,
                    is_public: mbrPublic
                  });
                  setShowAddModal(false);
                  setMbrName('');
                  setMbrRole('Volunteer');
                  setMbrBio('');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg"
              >
                Save Member Record
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Member</th>
                  <th className="p-3">Ministry Role</th>
                  <th className="p-3">Public Directory</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {db.members.map(m => (
                  <tr key={m.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{m.name}</td>
                    <td className="p-3 text-amber-400">{m.role_or_ministry}</td>
                    <td className="p-3">
                      <button
                        onClick={() => dbService.updateMember(m.id, { is_public: !m.is_public })}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.is_public ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {m.is_public ? 'SHOWN' : 'HIDDEN'}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => dbService.deleteMember(m.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. ANNOUNCEMENTS CRUD */}
      {section === 'announcements' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-white">Announcements & Circulars</h3>
              <p className="text-xs text-slate-400">Post bulletins, urgent notices, and important church circulars</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Announcement</span>
            </button>
          </div>

          {showAddModal && (
            <div className="p-5 bg-slate-800/90 rounded-2xl border border-amber-500/40 space-y-4 text-xs">
              <div className="flex justify-between items-center text-amber-300 font-bold">
                <span>Create Announcement</span>
                <button onClick={() => setShowAddModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <input
                type="text"
                placeholder="Title *"
                value={annTitle}
                onChange={e => setAnnTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              />
              <textarea
                rows={3}
                placeholder="Announcement Details *"
                value={annDesc}
                onChange={e => setAnnDesc(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white resize-none"
              />
              <div className="flex items-center space-x-2 text-slate-300">
                <input
                  type="checkbox"
                  id="annImp"
                  checked={annImportant}
                  onChange={e => setAnnImportant(e.target.checked)}
                />
                <label htmlFor="annImp">Mark as Urgent / Important</label>
              </div>
              <button
                onClick={() => {
                  if (!annTitle) return;
                  dbService.addAnnouncement({
                    title: annTitle,
                    date: annDate,
                    description: annDesc || annTitle,
                    is_important: annImportant,
                    category: annCategory,
                    status: 'published'
                  });
                  setShowAddModal(false);
                  setAnnTitle('');
                  setAnnDesc('');
                  setAnnImportant(false);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg"
              >
                Publish Announcement
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Title & Category</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {db.announcements.map(a => (
                  <tr key={a.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{a.title}</td>
                    <td className="p-3 text-slate-400">{a.date}</td>
                    <td className="p-3">
                      {a.is_important ? (
                        <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold">IMPORTANT</span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Standard</span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => dbService.togglePublishStatus('announcements', a.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          a.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {a.status.toUpperCase()}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => dbService.deleteAnnouncement(a.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. BIBLE OPEN UNIVERSITY COURSES */}
      {section === 'university' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-white">Bible Open Universes (BOU) Courses</h3>
              <p className="text-xs text-slate-400">Manage curriculum, duration, eligibility, and certificate details</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>

          {showAddModal && (
            <div className="p-5 bg-slate-800/90 rounded-2xl border border-purple-500/40 space-y-4 text-xs">
              <div className="flex justify-between items-center text-purple-300 font-bold">
                <span>Add BOU Course</span>
                <button onClick={() => setShowAddModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Course Name *"
                  value={crsName}
                  onChange={e => setCrsName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Course Code (e.g. BOU-CBF101) *"
                  value={crsCode}
                  onChange={e => setCrsCode(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Duration (e.g. 6 Months, 1 Year)"
                  value={crsDuration}
                  onChange={e => setCrsDuration(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
                <select
                  value={crsLevel}
                  onChange={e => setCrsLevel(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="Certificate">Certificate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor in Biblical Studies">Bachelor in Biblical Studies</option>
                  <option value="Master of Ministry">Master of Ministry</option>
                  <option value="Leadership Track">Leadership Track</option>
                </select>
              </div>
              <textarea
                rows={2}
                placeholder="Course Description *"
                value={crsDesc}
                onChange={e => setCrsDesc(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white resize-none"
              />
              <button
                onClick={() => {
                  if (!crsName || !crsCode) return;
                  dbService.addCourse({
                    course_name: crsName,
                    code: crsCode,
                    duration: crsDuration,
                    level: crsLevel,
                    description: crsDesc || crsName,
                    eligibility: 'Open to believers with pastoral recommendation.',
                    mode_of_study: crsMode,
                    certificate_information: 'Conferred upon completion of coursework.',
                    modules_count: 6,
                    featured_image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
                    status: 'published'
                  });
                  setShowAddModal(false);
                  setCrsName('');
                  setCrsCode('');
                  setCrsDesc('');
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg"
              >
                Save Course
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Course & Code</th>
                  <th className="p-3">Level & Duration</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {db.courses.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/40">
                    <td className="p-3">
                      <div className="font-semibold text-white">{c.course_name}</div>
                      <div className="text-purple-400 text-[10px] font-mono">{c.code}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-slate-200">{c.level}</div>
                      <div className="text-amber-400 text-[11px]">{c.duration}</div>
                    </td>
                    <td className="p-3 text-slate-400">{c.mode_of_study}</td>
                    <td className="p-3">
                      <button
                        onClick={() => dbService.togglePublishStatus('courses', c.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {c.status.toUpperCase()}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => dbService.deleteCourse(c.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 9. CONTACT ENQUIRIES INBOX */}
      {section === 'enquiries' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold font-cinzel text-white">Contact & Prayer Enquiries Inbox</h3>
          <div className="space-y-3">
            {db.contacts.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-white text-sm">{c.name} ({c.email})</div>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    c.status === 'unread' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <div className="text-amber-300 font-semibold">{c.subject}</div>
                <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  {c.message}
                </p>
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span>Phone: {c.phone} • {c.created_at}</span>
                  {c.status === 'unread' && (
                    <button
                      onClick={() => dbService.updateEnquiryStatus(c.id, 'read')}
                      className="text-amber-400 hover:underline font-semibold"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
