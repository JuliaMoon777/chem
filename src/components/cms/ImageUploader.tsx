import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { cmsService } from '../../services/cmsService';

interface ImageUploaderProps {
  image: string;
  imageAlt: string;
  folder: 'aktualnosci' | 'kariera';
  onImageChange: (url: string) => void;
  onAltChange: (alt: string) => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  imageAlt,
  folder,
  onImageChange,
  onAltChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    setErrorMessage(null);

    // Validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMessage('Dozwolone formaty to wyłącznie: JPG, PNG, WebP.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('Maksymalny rozmiar pliku wynosi 5 MB.');
      return;
    }

    setIsUploading(true);
    try {
      const response = await cmsService.uploadImage(file, folder);
      if (response.success && response.url) {
        onImageChange(response.url);
      } else {
        setErrorMessage(response.error || 'Nie udało się wgrać pliku.');
      }
    } catch {
      setErrorMessage('Wystąpił nieoczekiwany błąd podczas przesyłania zdjęcia.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange('');
    onAltChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {image ? (
        /* Image Preview & Controls */
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="relative aspect-video max-h-56 w-full rounded-lg overflow-hidden bg-slate-900/5 border border-slate-200/80 group">
            <img
              src={image}
              alt={imageAlt || 'Podgląd wgranego zdjęcia'}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              title="Usuń zdjęcie"
              className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 hover:bg-red-600 text-white transition-colors shadow-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
            >
              Zmień zdjęcie
            </button>
            <span className="text-[11px] text-slate-400">Podgląd gotowy</span>
          </div>

          <div className="mt-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Opis alternatywny (ALT dla Google i czytników ekranu) *
            </label>
            <input
              type="text"
              value={imageAlt}
              onChange={(e) => onAltChange(e.target.value)}
              placeholder="np. Prace spawalnicze przy aparacie ciśnieniowym w Oświęcimiu"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-hidden bg-white"
            />
          </div>
        </div>
      ) : (
        /* Upload Drag and Drop Area */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
            isDragging
              ? 'border-red-600 bg-red-50/50'
              : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 rounded-full bg-white shadow-xs text-slate-600 border border-slate-200">
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div className="text-xs font-semibold text-slate-800">
              {isUploading ? 'Przesyłanie zdjęcia...' : 'Kliknij lub przeciągnij zdjęcie tutaj'}
            </div>
            <p className="text-[11px] text-slate-500">
              Formaty: JPG, PNG, WebP (Maksymalnie 5 MB)
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 p-2.5 text-xs text-red-700 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
