import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle, Clock } from 'lucide-react';
import { Course } from '../types';
import { dbService } from '../services/db';

interface UniversityApplicationModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UniversityApplicationModal: React.FC<UniversityApplicationModalProps> = ({
  course,
  isOpen,
  onClose
}) => {
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('');
  const [qualification, setQualification] = useState('Bachelor Degree');
  const [statementOfFaith, setStatementOfFaith] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in your name, email, and contact phone number.');
      return;
    }

    dbService.submitUniversityApplication({
      course_id: course.id,
      course_name: course.course_name,
      applicant_name: applicantName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country: country.trim(),
      city: city.trim(),
      highest_qualification: qualification,
      statement_of_faith: statementOfFaith.trim()
    });

    setIsSuccess(true);
  };

  const handleReset = () => {
    setApplicantName('');
    setEmail('');
    setPhone('');
    setCountry('India');
    setCity('');
    setQualification('Bachelor Degree');
    setStatementOfFaith('');
    setIsSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Bible Open Universes Application</span>
              <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1">{course.course_name}</h3>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white">Application Submitted!</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for applying to <span className="font-semibold text-amber-300">{course.course_name}</span>. Your application ID has been recorded in the university registry. The Academic Admissions Committee will contact you at <span className="text-white font-medium">{email}</span>.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-400 border border-slate-800 max-w-sm mx-auto">
                <div className="flex items-center justify-center space-x-2 text-amber-400 font-semibold mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Review Status: Pending Evaluation</span>
                </div>
                <span>Duration: {course.duration} • Mode: {course.mode_of_study}</span>
              </div>
              <div className="pt-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md"
                >
                  Return to University Page
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
                <span>Code: <strong className="text-white">{course.code}</strong></span>
                <span>Duration: <strong className="text-amber-400">{course.duration}</strong></span>
                <span>Mode: <strong className="text-slate-300">{course.mode_of_study}</strong></span>
              </div>

              {error && (
                <div className="p-2.5 rounded bg-red-900/40 border border-red-700/60 text-red-300 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Applicant Full Name *</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={e => setApplicantName(e.target.value)}
                  placeholder="e.g. John Emmanuel"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    placeholder="e.g. India, USA, Singapore"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City / Region</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="e.g. Hyderabad, Chennai"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Highest Academic Qualification</label>
                <select
                  value={qualification}
                  onChange={e => setQualification(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="High School / 10th Standard">High School / 10th Standard</option>
                  <option value="Higher Secondary / 12th / Pre-University">Higher Secondary / 12th / Pre-University</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor Degree">Bachelor Degree (B.A., B.Sc., B.Tech, etc.)</option>
                  <option value="Master Degree">Master Degree (M.A., M.Sc., MBA, etc.)</option>
                  <option value="Theological Degree">Previous Theological Credential</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Brief Statement of Faith / Ministry Burden</label>
                <textarea
                  rows={3}
                  value={statementOfFaith}
                  onChange={e => setStatementOfFaith(e.target.value)}
                  placeholder="Share your personal testimony and why you wish to study this biblical curriculum."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="p-3 bg-amber-950/20 border border-amber-600/30 rounded-lg text-[11px] text-amber-300/80">
                Notice: Information provided is handled confidentially for university admission evaluation.
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
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
