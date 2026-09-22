import React, { useState, useEffect } from 'react';
import { NewsItem, CmsContentStatus } from '../../types/cms';
import { RichTextEditor } from './RichTextEditor';
import { ImageUploader } from './ImageUploader';
import { slugify } from '../../utils/slugify';
import { ArrowLeft, Save, Eye, Check, Globe } from 'lucide-react';

interface AdminNewsFormProps {
  initialData?: NewsItem | null;
  onSave: (data: Omit<NewsItem, 'created_at' | 'updated_at'> & { id?: string }) => Promise<void>;
  onCancel: () => void;
}

export const AdminNewsForm: React.FC<AdminNewsFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialData?.slug);
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || '');
  const [imageAlt, setImageAlt] = useState(initialData?.image_alt || '');
  const [publicationDate, setPublicationDate] = useState(
    initialData?.publication_date || new Date().toISOString().split('T')[0]
  );
  const [status, setStatus] = useState<CmsContentStatus>(initialData?.status || 'published');
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-slug generation when title changes
  useEffect(() => {
    if (!isSlugManuallyEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, isSlugManuallyEdited]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!seoTitle || seoTitle === title + ' | CHEMOROZRUCH') {
      setSeoTitle(val ? `${val} | CHEMOROZRUCH` : '');
    }
  };

  const handleExcerptChange = (val: string) => {
    setExcerpt(val);
    if (!metaDescription || metaDescription === excerpt) {
      setMetaDescription(val);
    }
  };

  const handleSubmit = async (submitStatus: CmsContentStatus) => {
    if (!title.trim()) {
      setErrorMessage('Tytuł aktualności jest wymagany.');
      return;
    }
    if (!slug.trim()) {
      setErrorMessage('Adres URL (slug) jest wymagany.');
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);
    try {
      await onSave({
        id: initialData?.id,
        title: title.trim(),
        slug: slugify(slug),
        excerpt: excerpt.trim(),
        content: content.trim(),
        cover_image: coverImage,
        image_alt: imageAlt.trim(),
        publication_date: publicationDate,
        status: submitStatus,
        seo_title: seoTitle.trim() || undefined,
        meta_description: metaDescription.trim() || undefined,
      });
    } catch {
      setErrorMessage('Wystąpił błąd podczas zapisywania aktualności.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {initialData ? 'Edytuj aktualność' : 'Dodaj nową aktualność'}
            </h2>
            <p className="text-xs text-slate-500">
              Uzupełnij treść i opublikuj komunikat natychmiast na stronie.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Anuluj
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSubmit('draft')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Zapisz jako szkic</span>
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSubmit('published')}
            className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Opublikuj wpis</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="my-4 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
          {errorMessage}
        </div>
      )}

      {/* Main form body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {/* Left 2 cols: Content */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Tytuł aktualności *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Wpisz chwytliwy, czytelny tytuł..."
              className="w-full px-4 py-2.5 text-base font-medium rounded-xl border border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/15 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Adres URL (Slug) *
            </label>
            <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/15 bg-white">
              <span className="text-slate-400 font-mono select-none">/aktualnosci/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setIsSlugManuallyEdited(true);
                }}
                className="w-full bg-transparent font-mono text-slate-800 focus:outline-hidden pl-1"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              Generowany automatycznie. Zawiera wyłącznie małe litery bez znaków specjalnych.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Krótki opis (Wstęp / Excerpt)
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => handleExcerptChange(e.target.value)}
              placeholder="Krótkie podsumowanie widoczne na liście artykułów (1-2 zdania)..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/15 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Pełna treść artykułu *
            </label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Napisz lub wklej treść artykułu..."
              minHeight="240px"
            />
          </div>
        </div>

        {/* Right col: Image, Date, SEO, Status */}
        <div className="space-y-6">
          {/* Cover image */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Zdjęcie główne
            </h3>
            <ImageUploader
              image={coverImage}
              imageAlt={imageAlt}
              folder="aktualnosci"
              onImageChange={setCoverImage}
              onAltChange={setImageAlt}
            />
          </div>

          {/* Publishing details */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Publikacja
            </h3>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Data publikacji
              </label>
              <input
                type="date"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-red-600 focus:outline-hidden bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CmsContentStatus)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-red-600 focus:outline-hidden bg-white font-medium"
              >
                <option value="published">Opublikowane (widoczne dla wszystkich)</option>
                <option value="draft">Szkic (niewidoczne na stronie)</option>
              </select>
            </div>
          </div>

          {/* SEO metadata */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span>Optymalizacja SEO</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                SEO Title (Tytuł w Google)
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Tytuł dla wyszukiwarki..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-red-600 focus:outline-hidden bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Meta Description (Opis w Google)
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Krótki opis dla Google..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-red-600 focus:outline-hidden bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
