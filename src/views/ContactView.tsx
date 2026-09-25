import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Clock,
  Compass
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const db = dbService.getSnapshot();
  const churchInfo = db.church_info;
  const { isTelugu, t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(
        isTelugu
          ? 'దయచేసి మీ పేరు, ఈమెయిల్ మరియు సందేశాన్ని పూరించండి.'
          : 'Please provide your name, email, and message content.'
      );
      return;
    }

    dbService.submitContactEnquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim() || (isTelugu ? 'చర్చ్ ప్రార్థనా విన్నపం / విచారణ' : 'General Church Enquiry'),
      message: message.trim()
    });

    setIsSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setError('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          {isTelugu ? 'మీ కొరకు మేము ఉన్నాము' : 'We Are Here For You'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-cinzel">
          {isTelugu ? 'క్రీస్తు వరల్డ్ సంప్రదించండి' : 'Contact CHRIST WORLD'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isTelugu
            ? 'మీకు ఆత్మీయ సలహా కావాలన్నా, ప్రార్థనా విన్నపం పంపాలనుకున్నా లేదా బైబిల్ ఓపెన్ యూనివర్సెస్ కోర్సుల వివరాలు తెలుసుకోవాలన్నా మా పాస్టరల్ కేర్ టీమ్ సిద్ధంగా ఉంది.'
            : 'Whether you seek spiritual counsel, have prayer requests, or wish to inquire regarding Bible Open Universes courses, our pastoral care team is available to assist you.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Column: Contact Cards & Details */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <h3 className="text-xl font-bold font-cinzel text-slate-900">
              {isTelugu ? 'చర్చ్ కార్యాలయం & చిరునామా' : 'Church Headquarters & Office'}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                    {isTelugu ? 'చర్చ్ చిరునామా' : 'Sanctuary Address'}
                  </span>
                  <p className="text-slate-600 mt-0.5">{churchInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                    {isTelugu ? 'చర్చ్ ఫోన్ సహాయవాణి' : 'Church Phone Helpline'}
                  </span>
                  <p className="text-slate-600 mt-0.5">{churchInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                    {isTelugu ? 'ఈమెయిల్ సంప్రదింపులు' : 'Email Communications'}
                  </span>
                  <p className="text-slate-600 mt-0.5">{churchInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                    {isTelugu ? 'వాట్సాప్ కేర్ డెస్క్' : 'WhatsApp Care Desk'}
                  </span>
                  <p className="text-slate-600 mt-0.5">{churchInfo.whatsapp_number}</p>
                  <a
                    href={`https://wa.me/${churchInfo.whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-emerald-700 font-semibold text-xs mt-1 hover:underline"
                  >
                    <span>{isTelugu ? 'నేరుగా వాట్సాప్‌లో మాట్లాడండి' : 'Click to open direct chat'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Social media connections */}
            <div className="pt-4 border-t border-slate-100 flex items-center space-x-3 text-xs">
              <span className="font-bold text-slate-800">{isTelugu ? 'సోషల్ మీడియా:' : 'Follow:'}</span>
              <a
                href={churchInfo.social_youtube}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition-colors"
              >
                YouTube Sermons
              </a>
              <a
                href={churchInfo.social_facebook}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                Facebook Page
              </a>
            </div>
          </div>

          {/* Interactive Simulated Map / Location Preview */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
            <div className="p-4 bg-slate-950 text-white flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">{isTelugu ? 'మార్గము మరియు లొకేషన్ మ్యాప్' : 'Interactive Location & Directions'}</span>
              </div>
              <span className="text-slate-400">Hyderabad Campus</span>
            </div>
            <div className="w-full h-64 bg-slate-200 relative">
              <iframe
                title="Church Location Map"
                src={churchInfo.google_maps_embed}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Prayer Request Form */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
          <div className="mb-6">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
              {isTelugu ? 'సందేశం పంపండి' : 'Send a Message'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900 mt-1">
              {isTelugu ? 'ప్రార్థన విన్నపం లేదా సాధారణ విచారణ' : 'Prayer Request or General Enquiry'}
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              {isTelugu
                ? 'మీ విన్నపం నేరుగా పాస్టరల్ రిజిస్ట్రీలో నమోదు చేయబడుతుంది మరియు భారముతో ప్రార్థించబడుతుంది.'
                : 'Your inquiry is saved directly into our administrative registry and attended to with prayerful care.'}
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {isTelugu ? 'సందేశం విజయవంతంగా చేరింది!' : 'Message Successfully Sent!'}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                {isTelugu
                  ? 'క్రీస్తు వరల్డ్ చర్చ్‌ను సంప్రదించినందుకు ధన్యవాదాలు. మా ప్రార్థనా బృందం మీ విన్నపం కొరకు ప్రార్థిస్తారు.'
                  : 'Thank you for reaching out to CHRIST WORLD. Our prayer and ministry team has received your communication.'}
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow"
              >
                {isTelugu ? 'మరొక సందేశం పంపండి' : 'Send another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {isTelugu ? 'మీ పూర్తి పేరు *' : 'Your Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={isTelugu ? 'ఉదా. రమేశ్ రావు' : 'e.g. Priscilla David'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isTelugu ? 'ఈమెయిల్ చిరునామా *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {isTelugu ? 'ఫోన్ / మొబైల్' : 'Phone / Mobile'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {isTelugu ? 'విషయం (సబ్జెక్ట్)' : 'Subject'}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder={isTelugu ? 'ఉదా. స్వస్థత కొరకు ప్రార్థన / బైబిల్ కోర్సు' : 'e.g. Prayer for Healing / Course Admissions'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {isTelugu ? 'మీ సందేశం లేదా ప్రార్థన విన్నపం *' : 'Message or Prayer Request *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={isTelugu ? 'మీ ప్రార్థన అవసరతను లేదా ప్రశ్నను ఇక్కడ వివరించండి...' : 'Share details of your situation, question, or thanksgiving...'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
              >
                <span>{isTelugu ? 'సందేశాన్ని సమర్పించండి' : 'Submit Communication'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
