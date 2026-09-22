import React, { useState, useEffect } from 'react';
import { CareerItem, JobOfferStatus } from '../../types/cms';
import { RichTextEditor } from './RichTextEditor';
import { slugify } from '../../utils/slugify';
import { ArrowLeft, Save, Check, Globe } from 'lucide-react';

interface AdminCareerFormProps {
  initialData?: CareerItem | null;
  onSave: (data: Omit<CareerItem, 'created_at' | 'updated_at'> & { id?: string }) => Promise<void>;
  onCancel: () => void;
}

export const AdminCareerForm: React.FC<AdminCareerFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [position, setPosition] = useState(initialData?.position || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialData?.slug);
  const [location, setLocation] = useState(initialData?.location || 'Oświęcim (Zakład Wytwórczy) / delegacje');
  const [intro, setIntro] = useState(initialData?.intro || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [responsibilities, setResponsibilities] = useState(initialData?.responsibilities || '');
  const [requirements, setRequirements] = useState(initialData?.requirements || '');
  const [offer, setOffer] = useState(initialData?.offer || '');
  const [applicationInfo, setApplicationInfo] = useState(
    initialData?.application_information ||
      '<p>Aplikacje (CV) prosimy przesyłać na adres: <strong>kadry@chemorozruch.pl</strong> lub kontaktować się pod numerem: <strong>+48 33 843 00 81</strong>.</p>'
  );
  const [publicationDate, setPublicationDate] = useState(
    initialData?.publication_date || new Date().toISOString().split('T')[0]
  );
  const [status, setStatus] = useState<JobOfferStatus>(initialData?.status || 'published');
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto slug
  useEffect(() => {
    if (!isSlugManuallyEdited && position) {
      setSlug(slugify(position));
    }
  }, [position, isSlugManuallyEdited]);

  const handlePositionChange = (val: string) => {
    setPosition(val);
    if (!seoTitle || seoTitle.includes('Praca:')) {
      setSeoTitle(val ? `Praca: ${val} | CHEMOROZRUCH` : '');
    }
  };

  const handleIntroChange = (val: string) => {
    setIntro(val);
    if (!metaDescription || metaDescription === intro) {
      setMetaDescription(val);
    }
  };

  const handleSubmit = async (submitStatus: JobOfferStatus) => {
    if (!position.trim()) {
      setErrorMessage('Nazwa stanowiska jest wymagana.');
      return;
    }
    if (!slug.trim()) {
      setErrorMessage('Adres URL (slug) jest wymagany.');
      return;
    }
    if (!location.trim()) {
      setErrorMessage('Lokalizacja jest wymagana.');
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);
    try {
      await onSave({
        id: initialData?.id,
        position: position.trim(),
        slug: slugify(slug),
        location: location.trim(),
        intro: intro.trim(),
        description: description.trim(),
        responsibilities: responsibilities.trim(),
        requirements: requirements.trim(),
        offer: offer.trim(),
        application_information: applicationInfo.trim(),
        publication_date: publicationDate,
        status: submitStatus,
        seo_title: seoTitle.trim() || undefined,
        meta_description: metaDescription.trim() || undefined,
      });
    } catch {
      setErrorMessage('Wystąpił błąd podczas zapisywania oferty pracy.');
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
              {initialData ? 'Edytuj ofertę pracy' : 'Dodaj nową ofertę pracy'}
            </h2>
            <p className="text-xs text-slate-500">
              Wprowadź szczegóły stanowiska rekrutacyjnego w CHEMOROZRUCH.
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
            <span>Opublikuj ofertę</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="my-4 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
          {errorMessage}
        </div>
      )}

      {/* Main form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {/* Left 2 cols */}
        <div className="lg:col-span-2 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Stanowisko *
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => handlePositionChange(e.target.value)}
                placeholder="np. Spawacz TIG / MAG"
                className="w-full px-4 py-2.5 text-base font-medium rounded-xl border border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/15 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Lokalizacja *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="np. Oświęcim / Płock / delegacje"
                className="w-full px-4 py-2.5 text-base font-medium rounded-xl border border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/15 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Adres URL (Slug) *
            </label>
            <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/15 bg-white">
              <span className="text-slate-400 font-mono select-none">/kariera/</span>
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
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Krótki opis / Zajawka (Intro)
            </label>
            <textarea
              rows={2}
              value={intro}
              onChange={(e) => handleIntroChange(e.target.value)}
              placeholder="Krótki zarys oferty wyświetlany na liście ofert pracy..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/15 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Opis stanowiska
            </label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Ogólne wprowadzenie do stanowiska i specyfiki pracy..."
              minHeight="140px"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Zakres obowiązków
            </label>
            <RichTextEditor
              value={responsibilities}
              onChange={setResponsibilities}
              placeholder="Wypunktuj główne zadania i obowiązki..."
              minHeight="140px"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Wymagania
            </label>
            <RichTextEditor
              value={requirements}
              onChange={setRequirements}
              placeholder="Wypunktuj oczekiwane kwalifikacje, certyfikaty, doświadczenie..."
              minHeight="140px"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Oferujemy
            </label>
            <RichTextEditor
              value={offer}
              onChange={setOffer}
              placeholder="Wypunktuj warunki zatrudnienia, benefity, zakwaterowanie..."
              minHeight="140px"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Jak aplikować / Informacje kontaktowe
            </label>
            <RichTextEditor
              value={applicationInfo}
              onChange={setApplicationInfo}
              placeholder="Podaj adres e-mail i telefon do działu kadr..."
              minHeight="120px"
            />
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-6">
          {/* Status & Publication */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Status i Publikacja
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
                Status rekrutacji
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobOfferStatus)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-red-600 focus:outline-hidden bg-white font-medium"
              >
                <option value="published">Opublikowana (aktywna rekrutacja)</option>
                <option value="closed">Zamknięta (zakończona rekrutacja)</option>
                <option value="draft">Szkic (niewidoczna)</option>
              </select>
            </div>
          </div>

          {/* SEO */}
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
                placeholder="Tytuł dla Google..."
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
                placeholder="Opis oferty dla wyszukiwarki..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-red-600 focus:outline-hidden bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
