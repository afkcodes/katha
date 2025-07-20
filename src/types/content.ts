/**
 * Types for the streaming-style content items
 */

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  type: 'episode' | 'bhajan' | 'story' | 'movie' | 'series';
  duration?: string;
  releaseYear?: number;
  tags?: string[];
}

export interface ContentCategory {
  id: string;
  title: string;
  items: ContentItem[];
}

export interface HeroContent extends ContentItem {
  buttonLabel?: string;
  logoImageUrl?: string;
  tagline?: string;
  rating?: string;
}

// API Response Types
export interface ApiMetaData {
  id: string;
  title: string;
  poster: string;
  rating: string;
  duration: string;
  imdbId: string;
  actors: string[];
  releaseYear: string;
  type: string;
  category: string;
  description: string;
  episodeCount: number;
}

export interface ApiTitle {
  metaData: ApiMetaData;
  _id: string;
}

export interface ApiResponse {
  status: string;
  data: ApiTitle[];
  message: string;
  code: number;
}

// Episode specific types
export interface EpisodePoster {
  lq: string;
  hq: string;
}

export interface EpisodeItem {
  _id: string;
  id: string; // YouTube video ID
  title: string;
  description: string;
  type: 'episode';
  poster: EpisodePoster;
}

export interface EpisodeListData {
  _id: string;
  episodes: EpisodeItem[];
}

export interface EpisodeListResponse {
  status: string;
  data: EpisodeListData;
  message?: string;
  code?: number;
}
