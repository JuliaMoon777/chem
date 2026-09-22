import React, { useState, useEffect } from 'react';
import { NewsItem, CareerItem, JobOfferStatus, CmsContentStatus } from '../../types/cms';
import { cmsService } from '../../services/cmsService';
import { AdminNewsForm } from './AdminNewsForm';
import { AdminCareerForm } from './AdminCareerForm';
import {
  Newspaper,
  Briefcase,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
  onNavigatePublic: (path: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onLogout,
  onNavigatePublic,
}) => {
  const [activeTab, setActiveTab] = useState<'news' | 'careers'>('news');
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [careersList, setCareersList] = useState<CareerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [editingNews, setEditingNews] = useState<NewsItem | null | 'new'>(null);
  const [editingCareer, setEditingCareer] = useState<CareerItem | null | 'new'>(null);

  // Delete confirmations
  const [itemToDelete, setItemToDelete] = useState<{ type: 'news' | 'career'; id: string; name: string } | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allNews, allCareers] = await Promise.all([
        cmsService.getAllNewsForAdmin(),
        cmsService.getAllCareersForAdmin(),
      ]);
      setNewsList(allNews);
      setCareersList(allCareers);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // News Actions
  const handleSaveNews = async (data: Omit<NewsItem, 'created_at' | 'updated_at'> & { id?: string }) => {
    const res = await cmsService.saveNews(data);
    if (res.success) {
      setEditingNews(null);
      await loadData();
    }
  };

  const handleDeleteNews = async (id: string) => {
    await cmsService.deleteNews(id);
    setItemToDelete(null);
    await loadData();
  };

  // Careers Actions
  const handleSaveCareer = async (data: Omit<CareerItem, 'created_at' | 'updated_at'> & { id?: string }) => {
    const res = await cmsService.saveCareer(data);
    if (res.success) {
      setEditingCareer(null);
      await loadData();
    }
  };

  const handleToggleCloseCareer = async (id: string, currentStatus: JobOfferStatus) => {
    const nextStatus: JobOfferStatus = currentStatus === 'closed' ? 'published' : 'closed';
    await cmsService.updateCareerStatus(id, nextStatus);
    await loadData();
  };

  const handleDeleteCareer = async (id: string) => {
    await cmsService.deleteCareer(id);
    setItemToDelete(null);
    await loadData();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans pb-16">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold tracking-tight text-lg text-slate-900">
                CHEMOROZRUCH
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                Panel redakcyjny
              </span>
            </div>

            {/* Tabs */}
            <nav className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('news');
                  setEditingNews(null);
                  setEditingCareer(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'news'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>Aktualności</span>
                <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white">
                  {newsList.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('careers');
                  setEditingNews(null);
                  setEditingCareer(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'careers'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Kariera</span>
                <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white">
                  {careersList.length}
                </span>
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigatePublic('/')}
              className="text-xs font-medium text-slate-600 hover:text-red-600 flex items-center gap-1 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Podgląd strony głównej</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-red-600 hover:bg-red-50 transition-colors border border-slate-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Wyloguj</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* =========================================================================
            1. AKTUALNOŚCI TAB
        ========================================================================= */}
        {activeTab === 'news' && (
          <div>
            {editingNews ? (
              <AdminNewsForm
                initialData={editingNews === 'new' ? null : editingNews}
                onSave={handleSaveNews}
                onCancel={() => setEditingNews(null)}
              />
            ) : (
              <div className="space-y-6">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">
                      Aktualności i Komunikaty
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Zarządzaj artykułami, wydarzeniami i komunikatami prasowymi CHEMOROZRUCH.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingNews('new')}
                    className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Dodaj aktualność</span>
                  </button>
                </div>

                {/* News Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  {isLoading ? (
                    <div className="p-12 text-center text-slate-500 text-xs flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Ładowanie danych...</span>
                    </div>
                  ) : newsList.length === 0 ? (
                    <div className="p-12 text-center">
                      <Newspaper className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-slate-700">
                        Brak dodanych aktualności
                      </p>
                      <p className="text-xs text-slate-500 mt-1 mb-4">
                        Dodaj pierwszy wpis, aby pojawił się na stronie.
                      </p>
                      <button
                        type="button"
                        onClick={() => setEditingNews('new')}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
                      >
                        + Dodaj pierwszą aktualność
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          <tr>
                            <th className="py-3.5 px-4 sm:px-6">Tytuł</th>
                            <th className="py-3.5 px-4">Data publikacji</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Akcje</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {newsList.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="py-4 px-4 sm:px-6">
                                <div className="flex items-center gap-3">
                                  {item.cover_image && (
                                    <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                      <img
                                        src={item.cover_image}
                                        alt={item.image_alt || item.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <div className="font-bold text-slate-900 text-sm line-clamp-1">
                                      {item.title}
                                    </div>
                                    <div className="text-[11px] font-mono text-slate-400">
                                      /aktualnosci/{item.slug}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{item.publication_date}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4 whitespace-nowrap">
                                {item.status === 'published' ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Opublikowane</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                    <Clock className="w-3 h-3" />
                                    <span>Szkic</span>
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-4 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => onNavigatePublic(`/aktualnosci/${item.slug}`)}
                                    title="Zobacz na stronie"
                                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingNews(item)}
                                    title="Edytuj"
                                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setItemToDelete({
                                        type: 'news',
                                        id: item.id,
                                        name: item.title,
                                      })
                                    }
                                    title="Usuń"
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            2. KARIERA TAB
        ========================================================================= */}
        {activeTab === 'careers' && (
          <div>
            {editingCareer ? (
              <AdminCareerForm
                initialData={editingCareer === 'new' ? null : editingCareer}
                onSave={handleSaveCareer}
                onCancel={() => setEditingCareer(null)}
              />
            ) : (
              <div className="space-y-6">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">
                      Oferty Pracy i Rekrutacja
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Zarządzaj ogłoszeniami rekrutacyjnymi dla monterów, spawaczy i kadry technicznej.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingCareer('new')}
                    className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Dodaj ofertę pracy</span>
                  </button>
                </div>

                {/* Careers Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  {isLoading ? (
                    <div className="p-12 text-center text-slate-500 text-xs flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Ładowanie danych...</span>
                    </div>
                  ) : careersList.length === 0 ? (
                    <div className="p-12 text-center">
                      <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-slate-700">
                        Brak ofert pracy
                      </p>
                      <p className="text-xs text-slate-500 mt-1 mb-4">
                        Dodaj pierwsze ogłoszenie rekrutacyjne.
                      </p>
                      <button
                        type="button"
                        onClick={() => setEditingCareer('new')}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
                      >
                        + Dodaj pierwszą ofertę
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          <tr>
                            <th className="py-3.5 px-4 sm:px-6">Stanowisko</th>
                            <th className="py-3.5 px-4">Lokalizacja</th>
                            <th className="py-3.5 px-4">Data</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Akcje</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {careersList.map((job) => (
                            <tr key={job.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="py-4 px-4 sm:px-6">
                                <div>
                                  <div className="font-bold text-slate-900 text-sm">
                                    {job.position}
                                  </div>
                                  <div className="text-[11px] font-mono text-slate-400">
                                    /kariera/{job.slug}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="truncate max-w-[200px]">{job.location}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                                <span>{job.publication_date}</span>
                              </td>
                              <td className="py-4 px-4 whitespace-nowrap">
                                {job.status === 'published' ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Aktywna</span>
                                  </span>
                                ) : job.status === 'closed' ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                    <XCircle className="w-3 h-3" />
                                    <span>Zamknięta</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                    <Clock className="w-3 h-3" />
                                    <span>Szkic</span>
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-4 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => onNavigatePublic(`/kariera/${job.slug}`)}
                                    title="Zobacz na stronie"
                                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleCloseCareer(job.id, job.status)}
                                    title={job.status === 'closed' ? 'Wznów ofertę' : 'Zamknij ofertę (1-klik)'}
                                    className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                      job.status === 'closed'
                                        ? 'text-emerald-700 hover:bg-emerald-50'
                                        : 'text-amber-700 hover:bg-amber-50'
                                    }`}
                                  >
                                    {job.status === 'closed' ? 'Wznów' : 'Zamknij'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingCareer(job)}
                                    title="Edytuj"
                                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setItemToDelete({
                                        type: 'career',
                                        id: job.id,
                                        name: job.position,
                                      })
                                    }
                                    title="Usuń"
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="p-2.5 rounded-full bg-red-50">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Potwierdź usunięcie
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Czy na pewno chcesz bezpowrotnie usunąć wpis{' '}
              <strong className="text-slate-900 font-semibold">„{itemToDelete.name}”</strong>?
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Anuluj
              </button>
              <button
                type="button"
                onClick={() =>
                  itemToDelete.type === 'news'
                    ? handleDeleteNews(itemToDelete.id)
                    : handleDeleteCareer(itemToDelete.id)
                }
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs"
              >
                Usuń trwale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
