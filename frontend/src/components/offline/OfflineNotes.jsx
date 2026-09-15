import React, { useState, useEffect, useRef } from 'react';
import {
  Save,
  Clock,
  Copy,
  Check,
  Tag,
  AlertCircle,
  FileCheck,
  Sparkles,
} from 'lucide-react';

const NOTE_TEMPLATES = [
  {
    title: 'Executive Impression',
    placeholder: 'Summarize the overall readiness of the learning centers, child enrollment trends, and partner team engagement...',
  },
  {
    title: 'Community & Child Interactions',
    placeholder: 'Document quotes, peer leader interviews, parent feedback regarding mid-day meals and school transport...',
  },
  {
    title: 'Discrepancies & Compliance Risks',
    placeholder: 'Note missing vouchers, discrepancies in physical ledger vs digital filing, unverified vendor receipts...',
  },
  {
    title: 'Recommendations & Next Steps',
    placeholder: 'Required corrective actions for partner NGO, proposed target date, support needed from CRY regional office...',
  },
];

export default function OfflineNotes({ initialNotes = '', onSave }) {
  const [sections, setSections] = useState({
    executive: initialNotes || 'Prior visit identified high dropout rate among 12-14 age group due to sibling caretaking. Current visit indicates 14 re-enrolled students actively attending afternoon remediation classes.',
    community: 'Interviewed Sunita (age 13) and Rajesh (age 14). Both reported regular attendance at the bridge center. Parents requested evening tutoring slots during harvesting season.',
    discrepancies: 'Physical voucher #8412 for learning kits lacks vendor rubber stamp. Need rectified receipt from Bachpan Bachao Trust by Oct 15.',
    recommendations: '1. Expedite FC-4 filing audit with external CA.\n2. Repair drinking water filtration candle.\n3. Conduct VCPC awareness drive next month.',
  });

  const [activeTags, setActiveTags] = useState(['Follow-up Required', 'High Priority']);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [copied, setCopied] = useState(false);

  const debounceTimerRef = useRef(null);

  const handleSectionChange = (key, value) => {
    setSections((prev) => {
      const next = { ...prev, [key]: value };
      triggerAutosave(next);
      return next;
    });
  };

  const triggerAutosave = (data) => {
    setIsSaving(true);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      setIsSaving(false);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSaved(timeStr);
      if (onSave) {
        onSave({ sections: data, tags: activeTags, timestamp: new Date().toISOString() });
      }
    }, 800);
  };

  const toggleTag = (tag) => {
    const updated = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag];
    setActiveTags(updated);
    if (onSave) {
      onSave({ sections, tags: updated, timestamp: new Date().toISOString() });
    }
  };

  const fullText = Object.entries(sections)
    .map(([k, v]) => `### ${k.toUpperCase()}\n${v}`)
    .join('\n\n');

  const wordCount = fullText.trim() ? fullText.trim().split(/\s+/).length : 0;
  const charCount = fullText.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Autosave Status & Word Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <Clock className="w-4 h-4 text-slate-400" />
            {isSaving ? (
              <span className="text-amber-600 font-bold animate-pulse">Saving changes locally...</span>
            ) : (
              <span>Local storage autosaved at {lastSaved}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy All'}
          </button>
        </div>
      </div>

      {/* Observation Priority Tags */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" /> Visit Classification Tags
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: 'High Priority', color: 'bg-red-50 text-red-700 border-red-200 active:bg-red-600' },
            { label: 'Follow-up Required', color: 'bg-amber-50 text-amber-700 border-amber-200 active:bg-amber-600' },
            { label: 'Best Practice Model', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 active:bg-emerald-600' },
            { label: 'Financial Audit Flag', color: 'bg-blue-50 text-blue-700 border-blue-200 active:bg-blue-600' },
            { label: 'Child Protection Alert', color: 'bg-purple-50 text-purple-700 border-purple-200 active:bg-purple-600' },
          ].map((tag) => {
            const isSelected = activeTags.includes(tag.label);
            return (
              <button
                key={tag.label}
                type="button"
                onClick={() => toggleTag(tag.label)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                  isSelected
                    ? 'bg-slate-800 text-white border-slate-800 shadow-2xs'
                    : `${tag.color} hover:opacity-80`
                }`}
              >
                {isSelected && '✓ '}
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Structured Sections */}
      <div className="space-y-4">
        {NOTE_TEMPLATES.map((tmpl, idx) => {
          const sectionKeys = ['executive', 'community', 'discrepancies', 'recommendations'];
          const key = sectionKeys[idx];
          return (
            <div
              key={key}
              className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2 hover:border-teal-200 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-[#172033] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  {tmpl.title}
                </h4>
                <span className="text-[11px] text-slate-400">Section {idx + 1} of 4</span>
              </div>
              <textarea
                rows={3}
                value={sections[key]}
                onChange={(e) => handleSectionChange(key, e.target.value)}
                placeholder={tmpl.placeholder}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0F766E] text-slate-700 font-sans"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
