import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';

/**
 * UploadZone: Drag-and-drop document upload interface with size and format validation
 * Adheres to Section 11 & 12 of NGO360 specification.
 */
export default function UploadZone({
  onFileSelect,
  acceptedFormats = ['.pdf', '.xlsx', '.xls', '.docx', '.jpg', '.png'],
  maxSizeMB = 15,
  label = 'Upload Statutory Document',
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const validateAndSetFile = (file) => {
    setErrorMessage('');
    if (!file) return;

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`File size exceeds the ${maxSizeMB}MB limit. Please upload a compressed document.`);
      return;
    }

    // Check file extension
    const extension = `.${file.name.split('.').pop().toLowerCase()}`;
    if (!acceptedFormats.includes(extension)) {
      setErrorMessage(`Unsupported file format. Please upload ${acceptedFormats.join(', ')}.`);
      return;
    }

    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
          isDragOver
            ? 'border-[#2E7D32] bg-emerald-50/60 scale-[1.01]'
            : selectedFile
            ? 'border-emerald-300 bg-emerald-50/20 cursor-default'
            : 'border-slate-300 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={(e) => e.target.files && validateAndSetFile(e.target.files[0])}
          className="hidden"
        />

        {!selectedFile ? (
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-500 mx-auto flex items-center justify-center shadow-xs">
              <UploadCloud className="w-6 h-6 text-[#2E7D32]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                <span className="text-[#2E7D32] hover:underline">Choose file</span> or drag & drop here
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Supported: {acceptedFormats.join(', ').toUpperCase()} (Max {maxSizeMB}MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-emerald-200 text-left shadow-2xs">
              <div className="flex items-center space-x-3 truncate">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold text-xs shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-900 truncate">{selectedFile.name}</p>
                  <p className="text-[10px] text-slate-400">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for review
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  title="Replace file"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
