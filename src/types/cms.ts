export type CmsContentStatus = 'draft' | 'published';
export type JobOfferStatus = 'draft' | 'published' | 'closed';

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Sanitized HTML
  cover_image: string;
  image_alt: string;
  publication_date: string; // YYYY-MM-DD
  created_at: string;
  updated_at: string;
  status: CmsContentStatus;
  seo_title?: string;
  meta_description?: string;
}

export interface CareerItem {
  id: string;
  position: string;
  slug: string;
  location: string;
  intro: string;
  description: string; // Sanitized HTML
  responsibilities: string; // Sanitized HTML / List
  requirements: string; // Sanitized HTML / List
  offer: string; // Sanitized HTML / List
  application_information: string; // Sanitized HTML
  publication_date: string; // YYYY-MM-DD
  created_at: string;
  updated_at: string;
  status: JobOfferStatus;
  seo_title?: string;
  meta_description?: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  username?: string;
  csrfToken?: string;
  expiresAt?: string;
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  csrfToken?: string;
}
