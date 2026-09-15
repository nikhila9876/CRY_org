import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  Volume2,
  Clock,
  Radio,
  FileAudio,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const INITIAL_VOICE_MEMOS = [
  {
    id: 'memo-1',
    title: 'Interview with Peer Leader Sunita (Age 13)',
    category: 'Community Voice',
    durationSeconds: 94,
    durationFormatted: '01:34',
    timestamp: '2026-10-05 11:45 AM',
    sizeBytes: '740 KB',
    audioUrl: null, // Simulated audio memo
  },
  {
    id: 'memo-2',
    title: 'Center Coordinator Debrief on FC-4 Status',
    category: 'Field Debrief',
    durationSeconds: 152,
    durationFormatted: '02:32',
    timestamp: '2026-10-05 01:15 PM',
    sizeBytes: '1.2 MB',
    audioUrl: null,
  },
];

export default function OfflineVoiceNote({ onUpdate }) {
  const [memos, setMemos] = useState(INITIAL_VOICE_MEMOS);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [memoTitle, setMemoTitle] = useState('');
  const [playingId, setPlayingId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Community Voice');

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordDuration((prev) => {
          if (prev >= 300) {
            // Auto stop at 5 mins
            stopRecording();
            return 300;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const formatSeconds = (sec) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setRecordDuration(0);
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    const duration = recordDuration || 1;
    const newMemo = {
      id: `memo-${Date.now()}`,
      title: memoTitle.trim() || `${activeCategory} Memo`,
      category: activeCategory,
      durationSeconds: duration,
      durationFormatted: formatSeconds(duration),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sizeBytes: `${Math.round(duration * 8)} KB`,
      audioUrl: null,
    };

    const updated = [newMemo, ...memos];
    setMemos(updated);
    setMemoTitle('');
    setRecordDuration(0);
    if (onUpdate) onUpdate(updated);
  };

  const togglePlayback = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // Simulate playback finish after duration
      const target = memos.find((m) => m.id === id);
      const dur = target ? target.durationSeconds : 3;
      setTimeout(() => {
        setPlayingId((curr) => (curr === id ? null : curr));
      }, Math.min(dur * 1000, 8000));
    }
  };

  const handleDeleteMemo = (id) => {
    const updated = memos.filter((m) => m.id !== id);
    setMemos(updated);
    if (playingId === id) setPlayingId(null);
    if (onUpdate) onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      {/* Recorder Terminal Card */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-lg space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-slate-500'}`} />
            <h4 className="text-sm font-bold tracking-wide">
              {isRecording ? 'LIVE VOICE MEMO RECORDING' : 'OFFLINE VOICE RECORDER'}
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
            {formatSeconds(recordDuration)} / 05:00 MAX
          </span>
        </div>

        {/* Dynamic Waveform Visualizer simulation */}
        <div className="h-16 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
          {Array.from({ length: 28 }).map((_, idx) => {
            const height = isRecording
              ? `${Math.max(15, Math.floor(Math.sin((idx + recordDuration * 3) * 0.5) * 45 + 50))}%`
              : '20%';
            return (
              <div
                key={idx}
                className={`w-1.5 rounded-full transition-all duration-150 ${
                  isRecording
                    ? 'bg-red-500'
                    : 'bg-slate-600'
                }`}
                style={{ height }}
              />
            );
          })}
        </div>

        {/* Inputs & Controls */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {['Community Voice', 'Teacher Discussion', 'Field Debrief', 'Safeguarding Alert'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-teal-500 text-slate-950 font-black'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <input
              type="text"
              value={memoTitle}
              onChange={(e) => setMemoTitle(e.target.value)}
              placeholder="Voice memo label (e.g. 'Interview with Parent Committee Leader')..."
              className="flex-1 w-full text-xs sm:text-sm p-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {isRecording ? (
              <button
                type="button"
                onClick={stopRecording}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
              >
                <Square className="w-4 h-4 fill-white" />
                Stop & Save Memo
              </button>
            ) : (
              <button
                type="button"
                onClick={startRecording}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
              >
                <Mic className="w-4 h-4" />
                Start Recording
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stored Voice Memos List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[#172033] flex items-center gap-2">
            <FileAudio className="w-4 h-4 text-[#0F766E]" />
            Saved Voice Memos ({memos.length})
          </h4>
          <span className="text-xs text-slate-500">Audio cached in browser storage</span>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
          {memos.map((memo) => {
            const isPlaying = playingId === memo.id;
            return (
              <div
                key={memo.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => togglePlayback(memo.id)}
                    className={`p-2.5 rounded-xl text-white transition-transform active:scale-95 shrink-0 mt-0.5 ${
                      isPlaying ? 'bg-amber-500' : 'bg-[#0F766E] hover:bg-[#0D655E]'
                    }`}
                    title={isPlaying ? 'Pause playback' : 'Play memo'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-50 text-[#0F766E] border border-teal-100">
                        {memo.category}
                      </span>
                      {isPlaying && (
                        <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1 animate-pulse">
                          <Radio className="w-3 h-3 text-amber-500" /> Playing Audio...
                        </span>
                      )}
                    </div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#172033]">{memo.title}</h5>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 font-mono font-semibold text-slate-600">
                        <Clock className="w-3 h-3" /> {memo.durationFormatted}
                      </span>
                      <span>•</span>
                      <span>{memo.sizeBytes}</span>
                      <span>•</span>
                      <span>{memo.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteMemo(memo.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete voice note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
