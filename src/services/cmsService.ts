import { NewsItem, CareerItem, AuthSession, UploadResponse, ApiResponse } from '../types/cms';
import { INITIAL_NEWS, INITIAL_CAREERS } from '../data/initialCmsData';

const LOCAL_STORAGE_KEY_NEWS = 'chemorozruch_cms_news';
const LOCAL_STORAGE_KEY_CAREERS = 'chemorozruch_cms_careers';
const LOCAL_STORAGE_KEY_SESSION = 'chemorozruch_cms_session';

/**
 * Helper to initialize local storage data if not present
 */
function initLocalStorageData() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(LOCAL_STORAGE_KEY_NEWS)) {
    localStorage.setItem(LOCAL_STORAGE_KEY_NEWS, JSON.stringify(INITIAL_NEWS));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_KEY_CAREERS)) {
    localStorage.setItem(LOCAL_STORAGE_KEY_CAREERS, JSON.stringify(INITIAL_CAREERS));
  }
}

/**
 * Universal CMS Service
 * Interacts with PHP backend endpoints when available,
 * and gracefully provides local reactive storage when in offline/static preview.
 */
export const cmsService = {
  // ==========================================
  // AUTHENTICATION
  // ==========================================

  async checkSession(): Promise<AuthSession> {
    try {
      const response = await fetch('/api/auth.php?action=check', {
        headers: { credentials: 'include' },
      });
      if (response.ok) {
        const json = await response.json();
        return {
          isAuthenticated: !!json.authenticated,
          username: json.username || 'admin',
          csrfToken: json.csrfToken,
        };
      }
    } catch {
      // Backend not running / static mode fallback
    }

    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(LOCAL_STORAGE_KEY_SESSION);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed;
        } catch {
          // ignore
        }
      }
    }

    return { isAuthenticated: false };
  },

  async login(password: string): Promise<{ success: boolean; error?: string; session?: AuthSession }> {
    try {
      const response = await fetch('/api/auth.php?action=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          const session: AuthSession = {
            isAuthenticated: true,
            username: json.username || 'admin',
            csrfToken: json.csrfToken,
          };
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(LOCAL_STORAGE_KEY_SESSION, JSON.stringify(session));
          }
          return { success: true, session };
        } else {
          return { success: false, error: json.error || 'Nieprawidłowe hasło dostępowe.' };
        }
      } else {
        const errJson = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errJson.error || 'Błąd autoryzacji serwera.',
        };
      }
    } catch {
      // Offline / Static Preview Password Handling (Development simulation)
      // When deployed to PHP server, api/auth.php performs password_verify() with Argon2/Bcrypt hash.
      if (password === 'chemorozruch2026' || password === 'admin' || password.length >= 6) {
        const session: AuthSession = {
          isAuthenticated: true,
          username: 'admin',
          csrfToken: 'dev-csrf-token-' + Date.now(),
        };
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(LOCAL_STORAGE_KEY_SESSION, JSON.stringify(session));
        }
        return { success: true, session };
      } else {
        return { success: false, error: 'Nieprawidłowe hasło dostępowe.' };
      }
    }
  },

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth.php?action=logout', { method: 'POST' });
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(LOCAL_STORAGE_KEY_SESSION);
    }
  },

  // ==========================================
  // NEWS (AKTUALNOŚCI)
  // ==========================================

  async getPublishedNews(): Promise<NewsItem[]> {
    try {
      const response = await fetch('/api/news.php');
      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {
      // fallback to local storage
    }

    initLocalStorageData();
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_NEWS);
      if (raw) {
        try {
          const items: NewsItem[] = JSON.parse(raw);
          return items
            .filter((item) => item.status === 'published')
            .sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());
        } catch {
          return INITIAL_NEWS;
        }
      }
    }
    return INITIAL_NEWS;
  },

  async getAllNewsForAdmin(): Promise<NewsItem[]> {
    try {
      const response = await fetch('/api/news.php?all=1');
      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {
      // fallback
    }

    initLocalStorageData();
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_NEWS);
      if (raw) {
        try {
          const items: NewsItem[] = JSON.parse(raw);
          return items.sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());
        } catch {
          return INITIAL_NEWS;
        }
      }
    }
    return INITIAL_NEWS;
  },

  async getNewsBySlug(slug: string): Promise<NewsItem | null> {
    try {
      const response = await fetch(`/api/news.php?slug=${encodeURIComponent(slug)}`);
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch {
      // fallback
    }

    initLocalStorageData();
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_NEWS);
      if (raw) {
        try {
          const items: NewsItem[] = JSON.parse(raw);
          return items.find((item) => item.slug === slug) || null;
        } catch {
          return INITIAL_NEWS.find((i) => i.slug === slug) || null;
        }
      }
    }
    return INITIAL_NEWS.find((i) => i.slug === slug) || null;
  },

  async saveNews(news: Omit<NewsItem, 'created_at' | 'updated_at'> & { id?: string }): Promise<ApiResponse<NewsItem>> {
    try {
      const response = await fetch('/api/news.php', {
        method: news.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(news),
      });
      if (response.ok) {
        const json = await response.json();
        return json;
      }
    } catch {
      // fallback
    }

    initLocalStorageData();
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_NEWS);
    let items: NewsItem[] = raw ? JSON.parse(raw) : [...INITIAL_NEWS];
    const now = new Date().toISOString();

    let savedItem: NewsItem;
    if (news.id) {
      const existingIdx = items.findIndex((i) => i.id === news.id);
      if (existingIdx >= 0) {
        savedItem = {
          ...items[existingIdx],
          ...news,
          updated_at: now,
        } as NewsItem;
        items[existingIdx] = savedItem;
      } else {
        savedItem = {
          ...news,
          id: news.id,
          created_at: now,
          updated_at: now,
        } as NewsItem;
        items.unshift(savedItem);
      }
    } else {
      savedItem = {
        ...news,
        id: 'news-' + Date.now(),
        created_at: now,
        updated_at: now,
      } as NewsItem;
      items.unshift(savedItem);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY_NEWS, JSON.stringify(items));
    return { success: true, data: savedItem };
  },

  async deleteNews(id: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await fetch(`/api/news.php?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // fallback
    }

    initLocalStorageData();
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_NEWS);
    if (raw) {
      const items: NewsItem[] = JSON.parse(raw);
      const filtered = items.filter((i) => i.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY_NEWS, JSON.stringify(filtered));
    }
    return { success: true, data: true };
  },

  // ==========================================
  // CAREERS (KARIERA)
  // ==========================================

  async getPublishedCareers(): Promise<CareerItem[]> {
    try {
      const response = await fetch('/api/careers.php');
      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {
      // fallback
    }

    initLocalStorageData();
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CAREERS);
      if (raw) {
        try {
          const items: CareerItem[] = JSON.parse(raw);
          return items
            .filter((item) => item.status === 'published')
            .sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());
        } catch {
          return INITIAL_CAREERS;
        }
      }
    }
    return INITIAL_CAREERS;
  },

  async getAllCareersForAdmin(): Promise<CareerItem[]> {
    try {
      const response = await fetch('/api/careers.php?all=1');
      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {
      // fallback
    }

    initLocalStorageData();
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CAREERS);
      if (raw) {
        try {
          const items: CareerItem[] = JSON.parse(raw);
          return items.sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());
        } catch {
          return INITIAL_CAREERS;
        }
      }
    }
    return INITIAL_CAREERS;
  },

  async getCareerBySlug(slug: string): Promise<CareerItem | null> {
    try {
      const response = await fetch(`/api/careers.php?slug=${encodeURIComponent(slug)}`);
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch {
      // fallback
    }

    initLocalStorageData();
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CAREERS);
      if (raw) {
        try {
          const items: CareerItem[] = JSON.parse(raw);
          return items.find((item) => item.slug === slug) || null;
        } catch {
          return INITIAL_CAREERS.find((i) => i.slug === slug) || null;
        }
      }
    }
    return INITIAL_CAREERS.find((i) => i.slug === slug) || null;
  },

  async saveCareer(career: Omit<CareerItem, 'created_at' | 'updated_at'> & { id?: string }): Promise<ApiResponse<CareerItem>> {
    try {
      const response = await fetch('/api/careers.php', {
        method: career.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(career),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // fallback
    }

    initLocalStorageData();
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CAREERS);
    let items: CareerItem[] = raw ? JSON.parse(raw) : [...INITIAL_CAREERS];
    const now = new Date().toISOString();

    let savedItem: CareerItem;
    if (career.id) {
      const existingIdx = items.findIndex((i) => i.id === career.id);
      if (existingIdx >= 0) {
        savedItem = {
          ...items[existingIdx],
          ...career,
          updated_at: now,
        } as CareerItem;
        items[existingIdx] = savedItem;
      } else {
        savedItem = {
          ...career,
          id: career.id,
          created_at: now,
          updated_at: now,
        } as CareerItem;
        items.unshift(savedItem);
      }
    } else {
      savedItem = {
        ...career,
        id: 'job-' + Date.now(),
        created_at: now,
        updated_at: now,
      } as CareerItem;
      items.unshift(savedItem);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY_CAREERS, JSON.stringify(items));
    return { success: true, data: savedItem };
  },

  async updateCareerStatus(id: string, status: 'draft' | 'published' | 'closed'): Promise<ApiResponse<CareerItem>> {
    try {
      const response = await fetch(`/api/careers.php?id=${encodeURIComponent(id)}&action=status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // fallback
    }

    initLocalStorageData();
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CAREERS);
    if (raw) {
      const items: CareerItem[] = JSON.parse(raw);
      const idx = items.findIndex((i) => i.id === id);
      if (idx >= 0) {
        items[idx].status = status;
        items[idx].updated_at = new Date().toISOString();
        localStorage.setItem(LOCAL_STORAGE_KEY_CAREERS, JSON.stringify(items));
        return { success: true, data: items[idx] };
      }
    }
    return { success: false, error: 'Nie znaleziono oferty.' };
  },

  async deleteCareer(id: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await fetch(`/api/careers.php?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // fallback
    }

    initLocalStorageData();
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CAREERS);
    if (raw) {
      const items: CareerItem[] = JSON.parse(raw);
      const filtered = items.filter((i) => i.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY_CAREERS, JSON.stringify(filtered));
    }
    return { success: true, data: true };
  },

  // ==========================================
  // IMAGE UPLOAD
  // ==========================================

  async uploadImage(file: File, folder: 'aktualnosci' | 'kariera'): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();
        return json;
      }
    } catch {
      // fallback: Base64 data URL for preview demonstration
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          success: true,
          url: reader.result as string,
          filename: file.name,
        });
      };
      reader.onerror = () => {
        resolve({
          success: false,
          error: 'Błąd podczas odczytu pliku graficznego.',
        });
      };
      reader.readAsDataURL(file);
    });
  },
};
