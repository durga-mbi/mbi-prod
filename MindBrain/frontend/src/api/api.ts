// Centralized API utility
// All backend calls go through these helpers.
// Base URL is read from the Vite env variable; falls back to the Vite dev proxy.

const BASE = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '');
const AUTH_TOKEN_KEY = 'mindbrain_auth_token';

function normalizeBody(body: unknown): BodyInit | undefined {
  if (
    body == null ||
    body instanceof FormData ||
    typeof body === 'string' ||
    body instanceof Blob ||
    body instanceof URLSearchParams
  ) {
    return body as BodyInit | undefined;
  }

  return JSON.stringify(body);
}

function clearStoredAuth() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export class ApiError extends Error {
  public data?: any;
  public status?: number;
  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function getStoredAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function storeAuthToken(token: string | null | undefined) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof token === 'string' && token.length > 0) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    return;
  }

  if (token === undefined) {
    return;
  }

  clearStoredAuth();
}

export function hasStoredAuthToken(): boolean {
  return Boolean(getStoredAuthToken());
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE}${path}`;
  const isFormData = options.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string>),
  };
  const authToken = getStoredAuthToken();

  if (authToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(url, { ...options, headers, credentials: 'include' });
  const json = await res.json().catch(() => ({ success: false, message: 'Invalid JSON response' }));

  if (!res.ok) {
    if (res.status === 401) {
      clearStoredAuth();
    }

    throw new ApiError(json?.message ?? `Request failed: ${res.status}`, res.status, json);
  }

  return json as T;
}

async function requestBlob(
  path: string,
  options: RequestInit = {}
): Promise<{ blob: Blob; fileName: string | null }> {
  const url = `${BASE}${path}`;
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  const authToken = getStoredAuthToken();

  if (authToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(url, { ...options, headers, credentials: 'include' });

  if (!res.ok) {
    const json = await res.json().catch(() => ({ message: `Request failed: ${res.status}` }));

    if (res.status === 401) {
      clearStoredAuth();
    }

    throw new Error(json?.message ?? `Request failed: ${res.status}`);
  }

  const disposition = res.headers.get('content-disposition') ?? '';
  const fileNameMatch =
    disposition.match(/filename\*=UTF-8''([^;]+)/i) ?? disposition.match(/filename="([^"]+)"/i);

  return {
    blob: await res.blob(),
    fileName: fileNameMatch ? decodeURIComponent(fileNameMatch[1]) : null,
  };
}

export function apiGet<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'GET' });
}

export function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    body: normalizeBody(body),
  });
}

export function apiPut<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'PUT',
    body: normalizeBody(body),
  });
}

export function apiDelete<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'DELETE' });
}

export function apiGetBlob(path: string): Promise<{ blob: Blob; fileName: string | null }> {
  return requestBlob(path, { method: 'GET' });
}

export function resolveApiAssetUrl(assetPath: string): string {
  if (!assetPath) {
    return assetPath;
  }

  if (/^(https?:)?\/\//i.test(assetPath) || assetPath.startsWith('data:')) {
    return assetPath;
  }

  if (BASE.startsWith('http')) {
    const baseUrl = new URL(BASE);
    return new URL(assetPath, `${baseUrl.origin}/`).toString();
  }

  return assetPath;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiProject {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  client: string;
  category: string;
  domain: string;
  liveUrl: string;
  githubUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface ProjectsResponse {
  projects: ApiProject[];
  pagination: Pagination;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  token?: string;
}

export interface AuthProfile {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUserRecord {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface ContactRecord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CareerApplicationRecord {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolioUrl: string;
  skills: string[];
  consent: boolean;
  resume: {
    fileName: string;
    mimeType: string;
    size: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface CareerPayload {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolioUrl?: string;
  skills: string[];
  consent: boolean;
  resume: {
    fileName: string;
    mimeType: string;
    size: number;
    data: string;
  };
}
