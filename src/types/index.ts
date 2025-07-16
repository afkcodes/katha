/**
 * Type definitions for the Katha mythological app
 */

import type {
  CharacterCategory,
  ContentType,
  Epic as EpicType,
  Language,
  StoryCategory,
  ThemeMode,
} from '~/constants';

// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Epic/Scripture types
export interface Epic extends BaseEntity {
  name: string;
  nameTransliterated: string;
  nameSanskrit?: string;
  description: string;
  shortDescription: string;
  category: EpicType;
  language: Language;
  estimatedReadingTime: number; // in minutes
  totalChapters: number;
  totalVerses?: number;
  coverImage: string;
  thumbnailImage: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
  rating: number;
}

// Character types
export interface Character extends BaseEntity {
  name: string;
  nameTransliterated: string;
  nameSanskrit?: string;
  title?: string;
  category: CharacterCategory;
  epics: Epic[];
  description: string;
  shortBio: string;
  attributes: string[];
  relationships: CharacterRelationship[];
  images: CharacterImage[];
  symbolism: string[];
  stories: string[]; // Story IDs
  weapons?: string[];
  powers?: string[];
  mantras?: string[];
  significance: string;
  moralLessons: string[];
}

export interface CharacterRelationship {
  characterId: string;
  relationshipType: string;
  description: string;
}

export interface CharacterImage {
  url: string;
  caption: string;
  type: 'portrait' | 'scene' | 'symbol' | 'artwork';
  artist?: string;
  source?: string;
}

// Story types
export interface Story extends BaseEntity {
  title: string;
  titleTransliterated: string;
  titleSanskrit?: string;
  epic: Epic;
  category: StoryCategory;
  chapter?: number;
  verse?: number;
  summary: string;
  content: StoryContent[];
  characters: string[]; // Character IDs
  locations: string[];
  themes: string[];
  moralLessons: string[];
  estimatedReadingTime: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  ageGroup: 'children' | 'teens' | 'adults' | 'all';
  language: Language;
  narrator?: string;
  audioUrl?: string;
  imageUrl?: string;
  tags: string[];
  prerequisites?: string[]; // Story IDs that should be read first
  relatedStories: string[]; // Related Story IDs
  popularity: number;
  rating: number;
}

export interface StoryContent {
  type: ContentType;
  order: number;
  content: string;
  metadata?: Record<string, unknown>;
}

// User types
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  readingProgress: ReadingProgress[];
  favorites: Favorites;
  achievements: Achievement[];
}

export interface UserPreferences {
  theme: ThemeMode;
  language: Language;
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  audioSpeed: number;
  autoplayAudio: boolean;
  notifications: NotificationPreferences;
  accessibility: AccessibilityPreferences;
}

export interface NotificationPreferences {
  dailyReminder: boolean;
  newContent: boolean;
  achievements: boolean;
  newsletter: boolean;
}

export interface AccessibilityPreferences {
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  reducedMotion: boolean;
}

export interface ReadingProgress {
  storyId: string;
  progress: number; // 0-100
  lastPosition: number;
  timeSpent: number; // in seconds
  completed: boolean;
  lastReadAt: string;
}

export interface Favorites {
  stories: string[];
  characters: string[];
  epics: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'reading' | 'knowledge' | 'engagement' | 'milestone';
}

// Search types
export interface SearchResult {
  type: 'story' | 'character' | 'epic';
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  relevanceScore: number;
  highlightedText?: string;
}

export interface SearchFilters {
  type?: ('story' | 'character' | 'epic')[];
  epic?: EpicType[];
  category?: (CharacterCategory | StoryCategory)[];
  difficulty?: ('beginner' | 'intermediate' | 'advanced')[];
  language?: Language[];
  tags?: string[];
}

// Navigation types
export interface NavigationParams {
  Home: undefined;
  Stories: { epic?: EpicType; category?: StoryCategory };
  Characters: { category?: CharacterCategory; epic?: EpicType };
  Epics: undefined;
  Search: { query?: string; filters?: SearchFilters };
  Favorites: undefined;
  Settings: undefined;
  Profile: undefined;
  StoryDetail: { storyId: string };
  CharacterDetail: { characterId: string };
  EpicDetail: { epicId: string };
}

// API types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Component prop types
export interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeMode;
}

export interface StoryCardProps {
  story: Story;
  onPress: (story: Story) => void;
  showProgress?: boolean;
  compact?: boolean;
}

export interface CharacterCardProps {
  character: Character;
  onPress: (character: Character) => void;
  compact?: boolean;
}

export interface EpicCardProps {
  epic: Epic;
  onPress: (epic: Epic) => void;
  showProgress?: boolean;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
