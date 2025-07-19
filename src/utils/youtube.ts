// Type definitions for YouTube video data structures
interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface BasicInfo {
  id: string;
  channel_id: string;
  title: string;
  duration: number;
  keywords: string[];
  is_owner_viewing: boolean;
  short_description: string;
  thumbnail: Thumbnail[];
  allow_ratings: boolean;
  view_count: number;
  author: string;
  is_private: boolean;
  is_live: boolean;
  is_live_content: boolean;
  is_live_dvr_enabled: boolean;
  is_low_latency_live_stream: boolean;
  is_upcoming: boolean;
  is_post_live_dvr: boolean;
  is_crawlable: boolean;
  url_canonical?: string;
}

interface ColorInfo {
  primaries: string;
  transfer_characteristics: string;
  matrix_coefficients: string;
}

interface Range {
  start: number;
  end: number;
}

interface AdaptiveFormat {
  itag: number;
  mime_type: string;
  is_type_otf: boolean;
  bitrate: number;
  average_bitrate: number;
  width?: number;
  height?: number;
  projection_type: string;
  init_range: Range;
  index_range: Range;
  last_modified: string;
  last_modified_ms: string;
  content_length: number;
  quality: string;
  quality_label?: string;
  fps?: number;
  url: string;
  approx_duration_ms: number;
  has_audio: boolean;
  has_video: boolean;
  has_text: boolean;
  color_info?: ColorInfo;
  audio_quality?: string;
  audio_sample_rate?: number;
  audio_channels?: number;
  loudness_db?: number;
  track_absolute_loudness_lkfs?: number;
  high_replication?: boolean;
  language?: string;
  is_drc?: boolean;
  is_dubbed?: boolean;
  is_descriptive?: boolean;
  is_secondary?: boolean;
  is_auto_dubbed?: boolean;
  is_original?: boolean;
}

interface StreamingData {
  expires: string;
  formats: any[];
  adaptive_formats: AdaptiveFormat[];
  hls_manifest_url: string;
  server_abr_streaming_url: string;
}

interface TextRun {
  text: string;
  bold: boolean;
  bracket: boolean;
  italics: boolean;
  strikethrough: boolean;
  error_underline: boolean;
  underline: boolean;
  deemphasize: boolean;
}

interface TextObject {
  runs: TextRun[];
  text: string;
  accessibility?: any;
  rtl: boolean;
}

interface CaptionTrack {
  base_url: string;
  name: TextObject;
  vss_id: string;
  language_code: string;
  is_translatable: boolean;
  kind?: string;
}

interface TranslationLanguage {
  language_code: string;
  language_name: TextObject;
}

interface Captions {
  type: string;
  caption_tracks: CaptionTrack[];
  audio_tracks: any[];
  default_audio_track_index: number;
  translation_languages: TranslationLanguage[];
}

interface EndscreenElement {
  type: string;
  style: string;
  title: TextObject;
  endpoint: any;
  image: Thumbnail[];
  metadata?: TextObject;
  left: number;
  width: number;
  top: number;
  aspect_ratio: number;
  start_ms: number;
  end_ms: number;
  id: string;
}

interface Endscreen {
  type: string;
  elements: EndscreenElement[];
  start_ms: string;
}

interface StoryboardBoard {
  type: string;
  template_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  thumbnail_count: number;
  interval: number;
  columns: number;
  rows: number;
  storyboard_count: number;
}

interface Storyboards {
  type: string;
  boards: StoryboardBoard[];
}

interface PlayabilityStatus {
  status: string;
  reason: string;
  embeddable: boolean;
  audio_only_playability?: any;
  error_screen?: any;
}

interface YouTubeVideoData {
  basic_info: BasicInfo;
  storyboards: Storyboards;
  endscreen: Endscreen;
  captions: Captions;
  streaming_data: StreamingData;
  playability_status: PlayabilityStatus;
  player_config: any;
}

// Parsed data interfaces
interface ParsedBasicInfo {
  id: string;
  title: string;
  author: string;
  channelId: string;
  duration: number;
  viewCount: number;
  description: string;
  keywords: string[];
  thumbnails: Thumbnail[];
  isLive: boolean;
  isPrivate: boolean;
  allowRatings: boolean;
  urlCanonical?: string;
}

interface ParsedVideoFormat {
  itag: number;
  mimeType: string;
  quality: string;
  qualityLabel?: string;
  width?: number;
  height?: number;
  fps?: number;
  bitrate: number;
  averageBitrate: number;
  contentLength: number;
  url: string;
  approxDurationMs: number;
  projectionType: string;
  colorInfo?: ColorInfo;
  lastModified: string;
  codec: string | null;
}

interface ParsedAudioFormat {
  itag: number;
  mimeType: string;
  bitrate: number;
  averageBitrate: number;
  audioQuality?: string;
  audioSampleRate?: number;
  audioChannels?: number;
  contentLength: number;
  url: string;
  approxDurationMs: number;
  loudnessDb?: number;
  trackAbsoluteLoudnessLkfs?: number;
  language?: string;
  isOriginal?: boolean;
  lastModified: string;
  codec: string | null;
}

interface ParsedCaptionTrack {
  baseUrl: string;
  name: string;
  languageCode: string;
  vssId: string;
  kind?: string;
  isTranslatable: boolean;
}

interface ParsedTranslationLanguage {
  languageCode: string;
  languageName: string;
}

interface ParsedCaptions {
  tracks: ParsedCaptionTrack[];
  translationLanguages: ParsedTranslationLanguage[];
}

interface ParsedEndscreenElement {
  type: string;
  title: string;
  endpoint: any;
  image: Thumbnail[];
  metadata: string;
  left: number;
  width: number;
  top: number;
  aspectRatio: number;
  startMs: number;
  endMs: number;
  id: string;
}

interface ParsedEndscreen {
  startMs: string;
  elements: ParsedEndscreenElement[];
}

interface ParsedStoryboardBoard {
  type: string;
  templateUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailCount: number;
  interval: number;
  columns: number;
  rows: number;
  storyboardCount: number;
}

interface ParsedStoryboards {
  type: string;
  boards: ParsedStoryboardBoard[];
}

interface ParsedPlayability {
  status: string;
  reason: string;
  embeddable: boolean;
  audioOnlyPlayability?: any;
  errorScreen?: any;
}

interface FormatCount {
  video: number;
  audio: number;
  total: number;
}

interface ParsedStreaming {
  expires: string;
  hlsManifestUrl: string;
  serverAbrStreamingUrl: string;
  formatCount: FormatCount;
}

interface ParsedData {
  basicInfo: ParsedBasicInfo;
  videoFormats: ParsedVideoFormat[];
  audioFormats: ParsedAudioFormat[];
  captions: ParsedCaptions;
  endscreen: ParsedEndscreen;
  storyboards: ParsedStoryboards;
  playability: ParsedPlayability;
  streaming: ParsedStreaming;
}

interface QualityUrls {
  [quality: string]: string;
}

interface BestUrls {
  video: string | null;
  audio: string | null;
}

interface FormatInfo {
  qualities: string[];
  codecs: string[];
  count: number;
}

interface FormatSummary {
  video: FormatInfo;
  audio: FormatInfo;
}

class YouTubeVideoParser {
  private data: YouTubeVideoData;

  constructor(data: YouTubeVideoData) {
    this.data = data;
  }

  /**
   * Parse all video information into a structured format
   */
  parse(): ParsedData {
    return {
      basicInfo: this.parseBasicInfo(),
      videoFormats: this.parseVideoFormats(),
      audioFormats: this.parseAudioFormats(),
      captions: this.parseCaptions(),
      endscreen: this.parseEndscreen(),
      storyboards: this.parseStoryboards(),
      playability: this.parsePlayability(),
      streaming: this.parseStreaming(),
    };
  }

  /**
   * Extract basic video information
   */
  parseBasicInfo(): ParsedBasicInfo {
    const basic = this.data.basic_info || ({} as BasicInfo);

    return {
      id: basic.id,
      title: basic.title,
      author: basic.author,
      channelId: basic.channel_id,
      duration: basic.duration,
      viewCount: basic.view_count,
      description: basic.short_description,
      keywords: basic.keywords || [],
      thumbnails: basic.thumbnail || [],
      isLive: basic.is_live,
      isPrivate: basic.is_private,
      allowRatings: basic.allow_ratings,
      urlCanonical: basic.url_canonical,
    };
  }

  /**
   * Extract video format information with URLs
   */
  parseVideoFormats(): ParsedVideoFormat[] {
    const adaptiveFormats = this.data.streaming_data?.adaptive_formats || [];

    return adaptiveFormats
      .filter((format: AdaptiveFormat) => format.has_video && !format.has_audio)
      .map(
        (format: AdaptiveFormat): ParsedVideoFormat => ({
          itag: format.itag,
          mimeType: format.mime_type,
          quality: format.quality,
          qualityLabel: format.quality_label,
          width: format.width,
          height: format.height,
          fps: format.fps,
          bitrate: format.bitrate,
          averageBitrate: format.average_bitrate,
          contentLength: format.content_length,
          url: format.url,
          approxDurationMs: format.approx_duration_ms,
          projectionType: format.projection_type,
          colorInfo: format.color_info,
          lastModified: format.last_modified,
          codec: this.extractCodec(format.mime_type),
        })
      )
      .sort((a, b) => (b.height || 0) - (a.height || 0)); // Sort by quality descending
  }

  /**
   * Extract audio format information with URLs
   */
  parseAudioFormats(): ParsedAudioFormat[] {
    const adaptiveFormats = this.data.streaming_data?.adaptive_formats || [];

    return adaptiveFormats
      .filter((format: AdaptiveFormat) => format.has_audio && !format.has_video)
      .map(
        (format: AdaptiveFormat): ParsedAudioFormat => ({
          itag: format.itag,
          mimeType: format.mime_type,
          bitrate: format.bitrate,
          averageBitrate: format.average_bitrate,
          audioQuality: format.audio_quality,
          audioSampleRate: format.audio_sample_rate,
          audioChannels: format.audio_channels,
          contentLength: format.content_length,
          url: format.url,
          approxDurationMs: format.approx_duration_ms,
          loudnessDb: format.loudness_db,
          trackAbsoluteLoudnessLkfs: format.track_absolute_loudness_lkfs,
          language: format.language,
          isOriginal: format.is_original,
          lastModified: format.last_modified,
          codec: this.extractCodec(format.mime_type),
        })
      )
      .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0)); // Sort by bitrate descending
  }

  /**
   * Extract caption/subtitle information
   */
  parseCaptions(): ParsedCaptions {
    const captions = this.data.captions || ({} as Captions);

    return {
      tracks: (captions.caption_tracks || []).map(
        (track: CaptionTrack): ParsedCaptionTrack => ({
          baseUrl: track.base_url,
          name: track.name?.text || '',
          languageCode: track.language_code,
          vssId: track.vss_id,
          kind: track.kind,
          isTranslatable: track.is_translatable,
        })
      ),
      translationLanguages: (captions.translation_languages || []).map(
        (lang: TranslationLanguage): ParsedTranslationLanguage => ({
          languageCode: lang.language_code,
          languageName: lang.language_name?.text || '',
        })
      ),
    };
  }

  /**
   * Extract endscreen information
   */
  parseEndscreen(): ParsedEndscreen {
    const endscreen = this.data.endscreen || ({} as Endscreen);

    return {
      startMs: endscreen.start_ms,
      elements: (endscreen.elements || []).map(
        (element: EndscreenElement): ParsedEndscreenElement => ({
          type: element.style,
          title: element.title?.text || '',
          endpoint: element.endpoint,
          image: element.image || [],
          metadata: element.metadata?.text || '',
          left: element.left,
          width: element.width,
          top: element.top,
          aspectRatio: element.aspect_ratio,
          startMs: element.start_ms,
          endMs: element.end_ms,
          id: element.id,
        })
      ),
    };
  }

  /**
   * Extract storyboard information for video previews
   */
  parseStoryboards(): ParsedStoryboards {
    const storyboards = this.data.storyboards || ({} as Storyboards);

    return {
      type: storyboards.type,
      boards: (storyboards.boards || []).map(
        (board: StoryboardBoard): ParsedStoryboardBoard => ({
          type: board.type,
          templateUrl: board.template_url,
          thumbnailWidth: board.thumbnail_width,
          thumbnailHeight: board.thumbnail_height,
          thumbnailCount: board.thumbnail_count,
          interval: board.interval,
          columns: board.columns,
          rows: board.rows,
          storyboardCount: board.storyboard_count,
        })
      ),
    };
  }

  /**
   * Extract playability status
   */
  parsePlayability(): ParsedPlayability {
    const playability = this.data.playability_status || ({} as PlayabilityStatus);

    return {
      status: playability.status,
      reason: playability.reason,
      embeddable: playability.embeddable,
      audioOnlyPlayability: playability.audio_only_playability,
      errorScreen: playability.error_screen,
    };
  }

  /**
   * Extract streaming information
   */
  parseStreaming(): ParsedStreaming {
    const streaming = this.data.streaming_data || ({} as StreamingData);

    return {
      expires: streaming.expires,
      hlsManifestUrl: streaming.hls_manifest_url,
      serverAbrStreamingUrl: streaming.server_abr_streaming_url,
      formatCount: {
        video: this.parseVideoFormats().length,
        audio: this.parseAudioFormats().length,
        total: (streaming.adaptive_formats || []).length,
      },
    };
  }

  /**
   * Get the best quality video URL
   */
  getBestVideoUrl(): string | null {
    const videos = this.parseVideoFormats();
    return videos.length > 0 ? videos[0].url : null;
  }

  /**
   * Get the best quality audio URL
   */
  getBestAudioUrl(): string | null {
    const audios = this.parseAudioFormats();
    return audios.length > 0 ? audios[0].url : null;
  }

  /**
   * Get video URLs by quality
   */
  getVideoUrlsByQuality(): QualityUrls {
    const videos = this.parseVideoFormats();
    const result: QualityUrls = {};

    videos.forEach((video) => {
      if (video.qualityLabel) {
        result[video.qualityLabel] = video.url;
      }
    });

    return result;
  }

  /**
   * Get audio URLs by quality
   */
  getAudioUrlsByQuality(): QualityUrls {
    const audios = this.parseAudioFormats();
    const result: QualityUrls = {};

    audios.forEach((audio) => {
      const quality = audio.audioQuality || `${audio.bitrate}kbps`;
      result[quality] = audio.url;
    });

    return result;
  }

  /**
   * Extract codec information from mime type
   */
  private extractCodec(mimeType: string): string | null {
    if (!mimeType) return null;

    const codecMatch = mimeType.match(/codecs="([^"]+)"/);
    return codecMatch ? codecMatch[1] : null;
  }

  /**
   * Get formatted duration
   */
  getFormattedDuration(): string | null {
    const duration = this.data.basic_info?.duration;
    if (!duration) return null;

    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Get formatted view count
   */
  getFormattedViewCount(): string | null {
    const views = this.data.basic_info?.view_count;
    if (!views) return null;

    if (views >= 1000000000) {
      return `${(views / 1000000000).toFixed(1)}B`;
    } else if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  }

  /**
   * Get summary of available formats
   */
  getFormatSummary(): FormatSummary {
    const videoFormats = this.parseVideoFormats();
    const audioFormats = this.parseAudioFormats();

    return {
      video: {
        qualities: [
          ...new Set(
            videoFormats
              .map((v) => v.qualityLabel)
              .filter(Boolean)
              .filter((q): q is string => q !== undefined)
          ),
        ],
        codecs: [
          ...new Set(
            videoFormats
              .map((v) => v.codec)
              .filter(Boolean)
              .filter((c): c is string => c !== null)
          ),
        ],
        count: videoFormats.length,
      },
      audio: {
        qualities: [
          ...new Set(
            audioFormats
              .map((a) => a.audioQuality)
              .filter(Boolean)
              .filter((q): q is string => q !== undefined)
          ),
        ],
        codecs: [
          ...new Set(
            audioFormats
              .map((a) => a.codec)
              .filter(Boolean)
              .filter((c): c is string => c !== null)
          ),
        ],
        count: audioFormats.length,
      },
    };
  }
}

// Utility functions
function parseYouTubeData(jsonData: YouTubeVideoData): ParsedData {
  const parser = new YouTubeVideoParser(jsonData);
  return parser.parse();
}

function getVideoUrls(jsonData: YouTubeVideoData): QualityUrls {
  const parser = new YouTubeVideoParser(jsonData);
  return parser.getVideoUrlsByQuality();
}

function getAudioUrls(jsonData: YouTubeVideoData): QualityUrls {
  const parser = new YouTubeVideoParser(jsonData);
  return parser.getAudioUrlsByQuality();
}

function getBestUrls(jsonData: YouTubeVideoData): BestUrls {
  const parser = new YouTubeVideoParser(jsonData);
  return {
    video: parser.getBestVideoUrl(),
    audio: parser.getBestAudioUrl(),
  };
}

// Export for use
export {
  getAudioUrls,
  getBestUrls,
  getVideoUrls,
  parseYouTubeData,
  YouTubeVideoParser,
  type BestUrls,
  type FormatSummary,
  type ParsedAudioFormat,
  type ParsedData,
  type ParsedVideoFormat,
  type QualityUrls,
  type YouTubeVideoData,
};

/* 
Example usage:

// Parse all data
const parsedData: ParsedData = parseYouTubeData(yourJsonData);

// Get just video URLs
const videoUrls: QualityUrls = getVideoUrls(yourJsonData);
console.log(videoUrls);
// Output: { "2160p": "https://...", "1440p": "https://...", "1080p": "https://..." }

// Get just audio URLs  
const audioUrls: QualityUrls = getAudioUrls(yourJsonData);
console.log(audioUrls);
// Output: { "AUDIO_QUALITY_MEDIUM": "https://...", "AUDIO_QUALITY_LOW": "https://..." }

// Get best quality URLs
const bestUrls: BestUrls = getBestUrls(yourJsonData);
console.log(bestUrls);
// Output: { video: "https://...", audio: "https://..." }

// Get format summary
const parser = new YouTubeVideoParser(yourJsonData);
const summary: FormatSummary = parser.getFormatSummary();
console.log(summary);

// Get formatted info
console.log(parser.getFormattedDuration()); // "3:33"
console.log(parser.getFormattedViewCount()); // "1.7B"
*/
