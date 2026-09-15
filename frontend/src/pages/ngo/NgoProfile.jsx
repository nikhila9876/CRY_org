import React, { useState } from 'react';
import {
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Globe,
  Bell,
  Check,
  Save,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_NGOS } from '../../mock/data/mockNgos';

export default function NgoProfile() {
  const { user } = useAuth();
  const ngo = MOCK_NGOS[0]; // Bachpan Bachao Trust

  const [contactName, setContactName] = useState(ngo.contactPerson);
  const [contactEmail, setContactEmail] = useState(ngo.contactEmail);
  const [contactPhone, setContactPhone] = useState(ngo.contactPhone);
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Organization Profile
            </span>
            <span className="text-xs text-slate-500">Legal & Communication Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] mt-1 tracking-tight">
            NGO Profile & Frontliner Coordination
          </h1>
          <p className="text-sm text-slate-500">
            Manage your organization details, assigned CRY officer channel, and notification preferences.
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Settings Saved Successfully</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Legal Profile & Contact Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Org Header Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2E7D32] to-emerald-500 text-white flex items-center justify-center font-black text-2xl shadow-sm shrink-0">
                B
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#172033]">{ngo.name}</h2>
                <p className="text-xs text-slate-500">
                  Govt Reg No: <strong className="text-slate-700">{ngo.regNumber}</strong>
                </p>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Seelampur Cluster Office, {ngo.district}, {ngo.state}</span>
                </div>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center self-start sm:self-center">
              Active Grant Partner
            </div>
          </div>

          {/* Contact Details Form */}
          <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#172033] border-b border-slate-100 pb-2">
              Primary Contact & Communication Channels
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Authorized Coordinator</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Official Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Official Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Preferred UI Language</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">हिन्दी (Hindi)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Deadline & Compliance Notification Preferences
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="rounded border-slate-300 text-[#2E7D32] focus:ring-[#2E7D32] w-4 h-4"
                  />
                  <span>Email notifications for 7-day deadline reminders</span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsReminders}
                    onChange={(e) => setSmsReminders(e.target.checked)}
                    className="rounded border-slate-300 text-[#2E7D32] focus:ring-[#2E7D32] w-4 h-4"
                  />
                  <span>SMS alerts for urgent correction requests and field visit schedules</span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={weeklyDigest}
                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                    className="rounded border-slate-300 text-[#2E7D32] focus:ring-[#2E7D32] w-4 h-4"
                  />
                  <span>Weekly compliance summary briefing every Monday</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Preferences</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column (1 Col): Assigned Frontliner & Statutory Identity */}
        <div className="space-y-6">
          {/* Assigned CRY Frontliner Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-[#172033]">Assigned CRY Staff Lead</span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>

            <div className="flex items-center space-x-3 pt-1">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                PS
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{ngo.assignedStaff}</h4>
                <p className="text-[11px] text-slate-400">Senior Project Monitoring Officer</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>priya.sharma@cry.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91 98101 23456</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900">
              For urgent grant disbursal queries or reporting guidelines, contact your assigned officer.
            </div>
          </div>

          {/* Statutory Registration Status */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Legal Status
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">NITI Aayog DARPAN</span>
                <span className="font-bold text-emerald-700">Verified ✓</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">12A & 80G Approval</span>
                <span className="font-bold text-emerald-700">Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">FCRA Registration</span>
                <span className="font-bold text-emerald-700">Compliant</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">Project Cycle</span>
                <span className="font-bold text-slate-800">{ngo.currentCycle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
