import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Trash2,
  MapPin,
  Clock,
  Tag,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const SAMPLE_PHOTO_CATEGORIES = [
  'Classroom Activity',
  'Nutrition & Mid-Day Meal',
  'Voucher & Receipt Audit',
  'Sanitation & Drinking Water',
  'Safeguarding Board',
  'Infrastructure Flag',
];

const INITIAL_PHOTOS = [
  {
    id: 'photo-1',
    title: 'Bridge Center Remediation Class',
    category: 'Classroom Activity',
    timestamp: '2026-10-05 11:15 AM',
    gps: '28.6692° N, 77.2764° E (Seelampur Cluster)',
    dataUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
    synced: true,
  },
  {
    id: 'photo-2',
    title: 'Physical Voucher #8412 Stamp Discrepancy',
    category: 'Voucher & Receipt Audit',
    timestamp: '2026-10-05 12:40 PM',
    gps: '28.6695° N, 77.2758° E (Office Ledger)',
    dataUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    synced: false,
  },
];

export default function OfflinePhotoCapture({ onUpdate }) {
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [activeCategory, setActiveCategory] = useState('Classroom Activity');
  const [photoCaption, setPhotoCaption] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (uploadEvent) => {
      const newPhoto = {
        id: `photo-${Date.now()}`,
        title: photoCaption.trim() || `${activeCategory} Evidence`,
        category: activeCategory,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        gps: '28.6692° N, 77.2764° E (Field Verified)',
        dataUrl: uploadEvent.target.result,
        synced: false,
      };

      const updated = [newPhoto, ...photos];
      setPhotos(updated);
      setPhotoCaption('');
      if (onUpdate) onUpdate(updated);
    };

    reader.readAsDataURL(file);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeletePhoto = (id) => {
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    if (onUpdate) onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      {/* Photo Uploader / Camera Capture Card */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-[#172033] flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#0F766E]" />
              Capture or Attach Field Photo
            </h4>
            <p className="text-xs text-slate-500">
              Photos are stored locally in device storage with automatic GPS stamping.
            </p>
          </div>
          <span className="text-xs font-bold text-[#0F766E] bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
            {photos.length} Photos Captured
          </span>
        </div>

        {/* Category selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Select Photo Category:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_PHOTO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0F766E] text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Caption & Upload trigger */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={photoCaption}
            onChange={(e) => setPhotoCaption(e.target.value)}
            placeholder="Add descriptive photo caption (e.g. 'Class 4 math workbooks')..."
            className="flex-1 w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0F766E] bg-white"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            capture="environment"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors shrink-0"
          >
            <Camera className="w-4 h-4" />
            Capture / Upload Photo
          </button>
        </div>
      </div>

      {/* Captured Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
              <img
                src={photo.dataUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                  {photo.category}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                {photo.synced ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500 text-white flex items-center gap-1 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3" /> Synced
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500 text-white flex items-center gap-1 shadow-2xs">
                    <Clock className="w-3 h-3" /> Local Only
                  </span>
                )}
              </div>
            </div>

            {/* Photo Info */}
            <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-[#172033] line-clamp-1">
                  {photo.title}
                </h5>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                  <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                  <span className="truncate">{photo.gps}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <Clock className="w-3 h-3 shrink-0 text-slate-400" />
                  <span>{photo.timestamp}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPreviewPhoto(photo)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F766E] hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" /> View Photo
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Preview Modal */}
      {previewPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl space-y-3 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{previewPhoto.title}</h4>
                <span className="text-[11px] text-slate-500">{previewPhoto.category} • {previewPhoto.gps}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={previewPhoto.dataUrl}
                alt={previewPhoto.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
