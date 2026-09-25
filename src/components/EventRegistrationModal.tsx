import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, Users } from 'lucide-react';
import { ChurchEvent } from '../types';
import { dbService } from '../services/db';

interface EventRegistrationModalProps {
  event: ChurchEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  event,
  isOpen,
  onClose
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendeesCount, setAttendeesCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setError('Please provide your name and contact phone number.');
      return;
    }

    dbService.registerForEvent({
      event_id: event.id,
      event_title: event.title,
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      attendees_count: attendeesCount,
      notes: notes.trim()
    });

    setIsSuccess(true);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setAttendeesCount(1);
    setNotes('');
    setIsSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Event RSVP Registration</span>
            <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1">{event.title}</h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Registration Confirmed!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{fullName}</span>. We look forward to welcoming you and your companions to <span className="text-amber-400">{event.title}</span>.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg text-[11px] text-slate-400 border border-slate-800 mt-2">
                <span>Date: {event.date} • {event.time}</span>
                <br />
                <span>Venue: {event.location}</span>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1 text-slate-400">
                <div className="flex items-center space-x-1.5 text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold">{event.date} ({event.time})</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{event.location}</span>
                </div>
              </div>

              {error && (
                <div className="p-2.5 rounded bg-red-900/40 border border-red-700/60 text-red-300 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Samuel Paul"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 00000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. samuel@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Number of Attendees</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={attendeesCount}
                    onChange={e => setAttendeesCount(parseInt(e.target.value) || 1)}
                    className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-slate-400 text-xs">Person(s) attending with you</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Special Notes / Needs (Optional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Need wheelchair accessibility, dietary request, or child seating"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-md"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
