import React, { useState } from 'react';
import { dbService } from '../../services/db';
import { WhatsAppContact, WhatsAppGroup, WhatsAppMessage } from '../../types';
import {
  MessageSquare,
  Users,
  Send,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Check,
  Plus,
  Trash2,
  AlertTriangle,
  History,
  PhoneCall
} from 'lucide-react';

export const AdminWhatsAppModule: React.FC = () => {
  const db = dbService.getSnapshot();
  const [activeSubTab, setActiveSubTab] = useState<'broadcast' | 'contacts' | 'groups' | 'history'>('broadcast');

  // Broadcast state
  const [campaignTitle, setCampaignTitle] = useState('');
  const [targetGroup, setTargetGroup] = useState<string>('all');
  const [messageTemplate, setMessageTemplate] = useState(
    'Greetings in Christ {{name}}! Reminder: CHRIST WORLD worship service begins this Sunday at 09:30 AM followed by holy communion. Theme: "Growing in Christ". Bring your family and friends. Location: Faith Enclave. God bless you!'
  );
  const [broadcastResult, setBroadcastResult] = useState<string | null>(null);

  // New Contact state
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('+91');
  const [newContactSource, setNewContactSource] = useState<WhatsAppContact['consent_source']>('Church Registration');
  const [newContactConsent, setNewContactConsent] = useState(true);

  // Filter contacts by opt-in status
  const optedInContacts = db.whatsapp_contacts.filter(c => c.consent_given && c.status === 'Active');

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignTitle.trim() || !messageTemplate.trim()) return;

    const result = dbService.sendWhatsAppBroadcast(campaignTitle.trim(), targetGroup, messageTemplate.trim());
    setBroadcastResult(`Successfully dispatched message to ${result.historyCount} verified opted-in contact(s) via authorized WhatsApp Business API.`);
    setTimeout(() => setBroadcastResult(null), 6000);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    dbService.addWhatsAppContact({
      name: newContactName.trim(),
      phone: newContactPhone.trim(),
      group_ids: ['wag-1'],
      consent_given: newContactConsent,
      consent_timestamp: new Date().toISOString(),
      consent_source: newContactSource,
      status: 'Active'
    });

    setNewContactName('');
    setNewContactPhone('+91');
  };

  // Live preview variable replacement with sample contact
  const sampleName = optedInContacts.length > 0 ? optedInContacts[0].name : 'Beloved Member';
  const previewText = messageTemplate
    .replace(/{{name}}/g, sampleName)
    .replace(/{{church}}/g, db.church_info.name);

  return (
    <div className="space-y-6 text-xs text-slate-300">
      
      {/* Module Header & Regulatory Compliance Banner */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-cinzel text-white">Authorized WhatsApp Business Hub</h2>
              <p className="text-slate-400 text-xs">Official church broadcast and pastoral communication center</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-semibold text-[11px]">API Integration Active & Opt-In Enforced</span>
          </div>
        </div>

        {/* Regulatory Banner as required */}
        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-400 flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-amber-300">Compliance & Anti-Spam Safeguards: </strong>
            In accordance with WhatsApp Business messaging policies, messages are only sent to contacts who have explicitly opted in with verified consent. Unsolicited bulk spamming or unauthorized account automation is strictly barred.
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('broadcast')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'broadcast'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Compose Broadcast
        </button>
        <button
          onClick={() => setActiveSubTab('contacts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'contacts'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Opted-In Contacts ({db.whatsapp_contacts.length})
        </button>
        <button
          onClick={() => setActiveSubTab('groups')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'groups'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Contact Groups ({db.whatsapp_groups.length})
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'history'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Delivery History ({db.message_history.length})
        </button>
      </div>

      {/* 1. COMPOSE BROADCAST */}
      {activeSubTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Message Editor */}
          <form onSubmit={handleSendBroadcast} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-cinzel">New WhatsApp Broadcast</h3>

            {broadcastResult && (
              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-600/60 text-emerald-300">
                {broadcastResult}
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Campaign Title *</label>
              <input
                type="text"
                required
                value={campaignTitle}
                onChange={e => setCampaignTitle(e.target.value)}
                placeholder="e.g. Sunday Service & Communion Alert"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Group</label>
              <select
                value={targetGroup}
                onChange={e => setTargetGroup(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
              >
                <option value="all">All Opted-In Church Contacts ({optedInContacts.length})</option>
                {db.whatsapp_groups.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-semibold">Message Template *</label>
                <div className="flex space-x-1">
                  <button
                    type="button"
                    onClick={() => setMessageTemplate(messageTemplate + ' {{name}}')}
                    className="px-2 py-0.5 bg-slate-800 text-[10px] text-amber-400 rounded hover:bg-slate-700"
                  >
                    + Add &#123;&#123;name&#125;&#125;
                  </button>
                  <button
                    type="button"
                    onClick={() => setMessageTemplate(messageTemplate + ' {{church}}')}
                    className="px-2 py-0.5 bg-slate-800 text-[10px] text-amber-400 rounded hover:bg-slate-700"
                  >
                    + Add &#123;&#123;church&#125;&#125;
                  </button>
                </div>
              </div>
              <textarea
                rows={5}
                required
                value={messageTemplate}
                onChange={e => setMessageTemplate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center space-x-2 shadow transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Broadcast via WhatsApp Business API</span>
            </button>
          </form>

          {/* Right: Live Realistic WhatsApp Chat Preview Bubble */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white font-cinzel">Recipient Live Chat Preview</h3>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded font-mono">
                  Target: {sampleName}
                </span>
              </div>

              {/* Simulated Phone Screen */}
              <div className="bg-[#0b141a] rounded-2xl p-4 border border-[#202c33] shadow-2xl relative overflow-hidden">
                <div className="bg-[#202c33] p-3 rounded-xl flex items-center space-x-3 mb-4 text-white">
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                    ✝
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">CHRIST WORLD Official</h4>
                    <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                      <span>WhatsApp Verified Business Account</span>
                      <CheckCircle2 className="w-3 h-3 fill-emerald-400 text-[#202c33]" />
                    </span>
                  </div>
                </div>

                {/* WhatsApp Chat Bubble */}
                <div className="bg-[#005c4b] text-white p-3.5 rounded-2xl rounded-tr-none max-w-sm ml-auto space-y-2 shadow">
                  <p className="leading-relaxed text-xs whitespace-pre-line">
                    {previewText}
                  </p>
                  <div className="flex justify-end items-center space-x-1 text-[10px] text-[#8696a0] pt-1">
                    <span>08:15 AM</span>
                    <span className="text-blue-400">✓✓</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 text-[11px] text-slate-400">
              Note: Template placeholders &#123;&#123;name&#125;&#125; are automatically customized for every recipient upon dispatch.
            </div>
          </div>
        </div>
      )}

      {/* 2. OPTED-IN CONTACTS */}
      {activeSubTab === 'contacts' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white font-cinzel">Opted-In Contacts Registry</h3>
              <p className="text-[11px] text-slate-400">Managing verified subscribers with recorded consent timestamps</p>
            </div>
          </div>

          {/* Quick add contact form */}
          <form onSubmit={handleAddContact} className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              required
              placeholder="Contact Name *"
              value={newContactName}
              onChange={e => setNewContactName(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
            />
            <input
              type="tel"
              required
              placeholder="Phone (E.164 e.g. +919876543210) *"
              value={newContactPhone}
              onChange={e => setNewContactPhone(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
            />
            <select
              value={newContactSource}
              onChange={e => setNewContactSource(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
            >
              <option value="Church Registration">Church Registration</option>
              <option value="Bible University Form">Bible University Form</option>
              <option value="Visitor Card">Visitor Card</option>
              <option value="Direct Admin Opt-In">Direct Admin Opt-In</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center justify-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Opt-In Contact</span>
            </button>
          </form>

          {/* Contacts Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone (E.164)</th>
                  <th className="p-3">Consent Source</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {db.whatsapp_contacts.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{c.name}</td>
                    <td className="p-3 font-mono text-emerald-400">{c.phone}</td>
                    <td className="p-3 text-slate-400">
                      <div>{c.consent_source}</div>
                      <div className="text-[10px] text-slate-500">{c.consent_timestamp.split('T')[0]}</div>
                    </td>
                    <td className="p-3">
                      <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => dbService.deleteWhatsAppContact(c.id)}
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

      {/* 3. CONTACT GROUPS */}
      {activeSubTab === 'groups' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-cinzel">Contact Distribution Groups</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {db.whatsapp_groups.map(g => (
              <div key={g.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: g.color_code }} />
                  <h4 className="font-bold text-white text-sm">{g.name}</h4>
                </div>
                <p className="text-slate-400 text-xs">{g.description}</p>
                <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                  Active Opted-in Members in group
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. DELIVERY HISTORY & LOGS */}
      {activeSubTab === 'history' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-cinzel">Message Delivery & Status Reports</h3>
          <div className="space-y-2">
            {db.message_history.map(h => (
              <div key={h.id} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{h.contact_name}</span>
                    <span className="font-mono text-emerald-400 text-[10px]">{h.phone}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{h.personalized_content}</p>
                  <p className="text-[10px] text-slate-500 font-mono">Provider ID: {h.provider_message_id}</p>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    h.status === 'Read' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {h.status}
                  </span>
                  <span className="text-[10px] text-slate-500">{h.timestamp.split('T')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
