import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Copy,
  Check,
  HelpCircle,
  BookOpen,
  Scale,
  FileCheck,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

const SUGGESTED_QUERIES = [
  {
    icon: Scale,
    title: 'FC-4 Filing Guide',
    query: 'Explain FC-4 statutory requirements and deadlines in simple terms for our field team.',
    response: `### FC-4 Annual Return Statutory Summary:

1. **Submission Window:** Annual return in Form FC-4 must be uploaded electronically on the MHA FCRA portal within 9 months of the financial year close (by December 31st).
2. **Mandatory Attachments:**
   - Audited Balance Sheet & Income/Expenditure Statement
   - CA Certificate in Form FC-4 format with UDIN
   - Dedicated SBI Main Branch (New Delhi) bank account statement
3. **Common Rejection Triggers:**
   - Failure to disclose local interest accrued on FC funds.
   - Admin expense ratio exceeding statutory **20% limit** without prior approval.`,
  },
  {
    icon: FileCheck,
    title: 'Tranche 2 Prerequisites',
    query: 'What documents do we need cleared before CRY can disburse Tranche 2 funds?',
    response: `### Tranche 2 Release Checklist for CRY Partners:

1. **Utilization Rate:** Minimum **70% actual expenditure** of Tranche 1 funds evidenced through physical vouchers.
2. **Audited Deliverables:**
   - Q2 Utilization Certificate (UC) stamped by external chartered accountant.
   - Q2 Narrative Program Report detailing enrollment progress at bridge centers.
3. **Statutory Active Flags:**
   - Active NGO DARPAN UID without expiry flag.
   - Valid SBI FCRA bank account details verified on file.
4. **Staff Inspection:** Satisfactory verification visit clearance from assigned CRY Project Officer.`,
  },
  {
    icon: BookOpen,
    title: '20% Admin Ceiling Rule',
    query: 'How do we calculate the 20% administrative expense ceiling under amended FCRA rules?',
    response: `### Calculating 20% Admin Ceiling (FCRA Amendment):

Under Section 8(1)(b) of the FCRA, administrative expenses cannot exceed **20% of foreign contributions received during the fiscal year**.

- **Permissible Administrative Costs:**
  - Head office rent, utility bills, internet subscriptions
  - Central director/trustee compensation & accountant fees
  - Annual statutory audit charges
- **Project Program Costs (Exempt from 20% Ceiling):**
  - Field community worker & teacher honorariums
  - Child nutrition kits, textbooks, classroom supplies
  - Field visit bus/rail travel directly related to project delivery.`,
  },
  {
    icon: HelpCircle,
    title: 'Draft Correction Response',
    query: 'Draft a professional response to CRY staff reviewer remarks on UC-Q2 voucher variance.',
    response: `### Draft Response for Reviewer Priya Sharma:

**Subject:** Rectified Submission for Utilization Certificate (Q2) — Ref: UC-Q2

Dear Priya,

Thank you for your review comments regarding our Q2 Utilization Certificate submission.

We have addressed the two noted items:
1. **Auditor Stamp Legibility:** Our statutory auditor has re-stamped and signed Page 3 with high-resolution clarity along with the valid UDIN.
2. **Line Item 4.2 Variance:** The difference of Rs 14,500 has been reconciled in the attached annexure. It represents advance logistics booking for rural child welfare kits delivered on Aug 28.

The revised PDF has been uploaded via the NGO360 portal for your re-assessment.

Warm regards,  
Bachpan Bachao Trust Finance Team`,
  },
];

export default function AIAssistantDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello! I am your **CRY NGO360 AI Compliance Assistant**. How can I help clarify statutory compliance, reporting deadlines, or document corrections today?',
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleSend = (textToSend = inputText) => {
    const query = textToSend.trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Look for matching pre-defined answer or intelligent fallback
    setTimeout(() => {
      const matched = SUGGESTED_QUERIES.find(
        (q) => query.toLowerCase().includes(q.title.toLowerCase()) || q.query.toLowerCase().includes(query.toLowerCase())
      );

      const aiResponseText = matched
        ? matched.response
        : `### AI Compliance Guidance:

Thank you for your question regarding **"${query}"**.

Based on CRY India Partner Operational Guidelines and current Ministry of Corporate Affairs / MHA compliance rules:

1. **Standard Operational Procedure:** Maintain physical and digital paper trails for all project ledger vouchers exceeding INR 5,000.
2. **Statutory Reference:** Ensure your NGO DARPAN registration is updated annually with executive trustee contact details.
3. **Action Step:** You can attach supporting justifications directly through the **NGO Documents** portal under the relevant cycle tranche.

*Note: For official legal binding clarifications, please consult your chartered accountant or contact your designated CRY Project Officer.*`;

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in"
    >
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-purple-100 animate-in slide-in-from-right duration-200">
        {/* Header (Section 10 Purple Token #7C3AED) */}
        <div className="p-4 sm:p-5 bg-purple-700 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-wide">CRY NGO AI Assistant</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/50 text-purple-100 border border-purple-400/40">
                  Compliance Copilot
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                Statutory answers & document pre-submission guidance
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close AI drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-purple-50 border-b border-purple-100 overflow-x-auto flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 shrink-0">
            Quick Topics:
          </span>
          {SUGGESTED_QUERIES.map((sq) => {
            const Icon = sq.icon;
            return (
              <button
                key={sq.title}
                type="button"
                onClick={() => handleSend(sq.query)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-purple-100/80 border border-purple-200 text-purple-900 text-xs font-bold whitespace-nowrap shadow-2xs transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-purple-600" />
                {sq.title}
              </button>
            );
          })}
        </div>

        {/* Chat Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 text-xs sm:text-sm">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-7 h-7 rounded-lg bg-purple-700 text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 shadow-2xs ${
                    isAI
                      ? 'bg-white text-slate-800 border border-purple-100'
                      : 'bg-purple-700 text-white'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed font-sans">
                    {msg.text}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] opacity-70">
                    <span>{msg.timestamp}</span>
                    {isAI && (
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="inline-flex items-center gap-1 hover:opacity-100 font-bold"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {!isAI && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-purple-700 font-semibold p-2">
              <Bot className="w-4 h-4 animate-bounce" />
              <span>Analyzing compliance requirements...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-slate-200 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about FCRA, DARPAN, tranches, or draft remarks..."
              className="flex-1 text-xs sm:text-sm p-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-purple-50/20 text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-3 rounded-xl font-bold transition-all shrink-0 ${
                inputText.trim()
                  ? 'bg-purple-700 hover:bg-purple-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Statutory AI guidance based on CRY compliance rules. Zero secrets transmitted.
          </p>
        </div>
      </div>
    </div>
  );
}
