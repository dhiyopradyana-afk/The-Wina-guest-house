import { Article, SiteSettings } from '../types';
import { DEFAULT_SITE_SETTINGS, INITIAL_ARTICLES } from '../data/initialData';

const ARTICLES_STORAGE_KEY = 'the_wina_articles_v1';
const SETTINGS_STORAGE_KEY = 'the_wina_settings_v1';
const ADMIN_AUTH_KEY = 'the_wina_admin_auth';

export function getStoredArticles(): Article[] {
  try {
    const raw = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES));
      return INITIAL_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ARTICLES;
  } catch (error) {
    console.error('Failed to load articles from storage:', error);
    return INITIAL_ARTICLES;
  }
}

export function saveStoredArticles(articles: Article[]): void {
  try {
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
  } catch (error) {
    console.error('Failed to save articles to storage:', error);
  }
}

export function getStoredSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_SETTINGS));
      return DEFAULT_SITE_SETTINGS;
    }
    return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(raw) };
  } catch (error) {
    console.error('Failed to load settings from storage:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}

export function saveStoredSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings to storage:', error);
  }
}

export function getAdminAuthState(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthState(isAuth: boolean): void {
  try {
    if (isAuth) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch {
    // ignore
  }
}
