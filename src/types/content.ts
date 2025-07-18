/**
 * Types for the streaming-style content items
 */

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  type: 'episode' | 'bhajan' | 'story' | 'movie';
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
}
