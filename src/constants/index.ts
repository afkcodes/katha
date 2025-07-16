/**
 * App-wide constants for the Katha mythological app
 */

// App information
export const APP_INFO = {
  name: 'Katha',
  version: '1.0.0',
  description: 'Explore the rich world of Indian mythology through Ramayana, Mahabharata, and more',
} as const;

// Mythological epics and series
export const EPICS = {
  RAMAYANA: 'ramayana',
  MAHABHARATA: 'mahabharata',
  PURANAS: 'puranas',
  VEDAS: 'vedas',
  UPANISHADS: 'upanishads',
} as const;

// Character categories
export const CHARACTER_CATEGORIES = {
  GODS: 'gods',
  GODDESSES: 'goddesses',
  HEROES: 'heroes',
  HEROINES: 'heroines',
  DEMONS: 'demons',
  SAGES: 'sages',
  ANIMALS: 'animals',
  OTHERS: 'others',
} as const;

// Story categories
export const STORY_CATEGORIES = {
  MAIN_STORY: 'main_story',
  SUB_STORY: 'sub_story',
  MORAL_TALE: 'moral_tale',
  LEGEND: 'legend',
  FOLKLORE: 'folklore',
} as const;

// Content types
export const CONTENT_TYPES = {
  TEXT: 'text',
  AUDIO: 'audio',
  IMAGE: 'image',
  VIDEO: 'video',
  INTERACTIVE: 'interactive',
} as const;

// Languages supported
export const LANGUAGES = {
  ENGLISH: 'en',
  HINDI: 'hi',
  SANSKRIT: 'sa',
  TAMIL: 'ta',
  TELUGU: 'te',
  BENGALI: 'bn',
  GUJARATI: 'gu',
  MARATHI: 'mr',
  KANNADA: 'kn',
  MALAYALAM: 'ml',
} as const;

// Theme preferences
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Screen names for navigation
export const SCREEN_NAMES = {
  HOME: 'Home',
  STORIES: 'Stories',
  CHARACTERS: 'Characters',
  EPICS: 'Epics',
  SEARCH: 'Search',
  FAVORITES: 'Favorites',
  SETTINGS: 'Settings',
  PROFILE: 'Profile',
  STORY_DETAIL: 'StoryDetail',
  CHARACTER_DETAIL: 'CharacterDetail',
  EPIC_DETAIL: 'EpicDetail',
} as const;

// Storage keys for AsyncStorage
export const STORAGE_KEYS = {
  THEME_MODE: '@katha_theme_mode',
  LANGUAGE: '@katha_language',
  FAVORITES: '@katha_favorites',
  READING_PROGRESS: '@katha_reading_progress',
  USER_PREFERENCES: '@katha_user_preferences',
  FIRST_LAUNCH: '@katha_first_launch',
} as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
  BASE_URL: 'https://api.katha.app',
  STORIES: '/stories',
  CHARACTERS: '/characters',
  EPICS: '/epics',
  SEARCH: '/search',
  USER: '/user',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  CONTENT_NOT_FOUND: 'The requested content could not be found.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  LOADING_ERROR: 'Failed to load content. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  FAVORITE_ADDED: 'Added to favorites',
  FAVORITE_REMOVED: 'Removed from favorites',
  SETTINGS_SAVED: 'Settings saved successfully',
  PROGRESS_SAVED: 'Progress saved',
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
} as const;

// Common dimensions
export const DIMENSIONS = {
  HEADER_HEIGHT: 56,
  TAB_BAR_HEIGHT: 64,
  STORY_CARD_HEIGHT: 200,
  CHARACTER_CARD_HEIGHT: 150,
  BANNER_HEIGHT: 120,
} as const;

export type Epic = keyof typeof EPICS;
export type CharacterCategory = keyof typeof CHARACTER_CATEGORIES;
export type StoryCategory = keyof typeof STORY_CATEGORIES;
export type ContentType = keyof typeof CONTENT_TYPES;
export type Language = keyof typeof LANGUAGES;
export type ThemeMode = keyof typeof THEME_MODES;
export type ScreenName = keyof typeof SCREEN_NAMES;
