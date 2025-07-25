import type {
  ApiResponse,
  ApiTitle,
  ContentItem,
  EpisodeItem,
  EpisodeListResponse,
  HeroContent,
} from '~/types/content';

const API_BASE_URL = 'https://katha.afk.codes';

export const fetchTitles = async (category: string): Promise<ApiTitle[]> => {
  try {
    const url = `${API_BASE_URL}/titles?category=${category}`;
    console.log(`[API] Starting fetch request to: ${url}`);

    // Create a timeout promise for React Native compatibility
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 10000); // Increased to 10 seconds
    });

    const fetchPromise = fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log(`[API] Fetch promise created, waiting for response...`);

    // Race between fetch and timeout
    const response = (await Promise.race([fetchPromise, timeoutPromise])) as Response;

    console.log(`[API] Response received:`, {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      url: response.url,
      ok: response.ok,
      type: response.type,
      redirected: response.redirected,
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => 'Could not read error body');
      console.error(`[API] HTTP Error - Status: ${response.status}, Body: ${errorBody}`);
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();

    console.log(`[API] JSON parsing successful:`, {
      status: data.status,
      dataLength: data.data?.length || 0,
      message: data.message,
    });

    if (data.status !== 'success') {
      console.error(`[API] API returned non-success status:`, data);
      throw new Error(data.message || 'API request failed');
    }

    console.log(`[API] Successfully fetched ${data.data.length} titles`);

    // Debug: Log the first few poster URLs to check what we're getting
    if (data.data.length > 0) {
      console.log('[API] Sample poster URLs:');
      data.data.slice(0, 3).forEach((title, index) => {
        console.log(`  ${index + 1}. ${title.metaData.title}: ${title.metaData.poster}`);
      });
    }

    // Add a small delay for smoother UI transitions (50-80ms)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 30 + 50));

    return data.data;
  } catch (error) {
    console.error('[API] Detailed error information:');
    console.error('  Error type:', typeof error);
    console.error('  Error constructor:', error?.constructor?.name);

    if (error instanceof Error) {
      console.error('  Error name:', error.name);
      console.error('  Error message:', error.message);
      console.error('  Error stack:', error.stack);
    } else {
      console.error('  Raw error:', error);
    }

    // Check for specific error types
    if (error instanceof TypeError) {
      console.error('[API] TypeError detected - likely network/CORS issue');
      if (error.message.includes('Network request failed')) {
        console.error('[API] Network request failed - check internet connection or CORS policy');
        throw new Error('Unable to connect to server. Please check your connection and try again.');
      }
      if (error.message.includes('fetch')) {
        console.error('[API] Fetch-related error - possibly CORS or network issue');
      }
    }

    if (error instanceof Error && error.message === 'Request timeout') {
      console.error('[API] Request timeout - server took too long to respond');
      throw new Error('Request timeout. Please try again.');
    }

    // Log additional context
    console.error('[API] Additional context:');
    console.error('  API_BASE_URL:', API_BASE_URL);
    console.error('  Category:', category);
    console.error('  User Agent:', navigator.userAgent || 'Not available');

    throw error;
  }
};

export const fetchLiveActionTitles = (): Promise<ApiTitle[]> => {
  return fetchTitles('live_action');
};

export const fetchAnimatedTitles = (): Promise<ApiTitle[]> => {
  return fetchTitles('animated');
};

// New function to fetch episodes
export const fetchEpisodes = async (seriesId?: string): Promise<EpisodeItem[]> => {
  try {
    if (!seriesId) {
      throw new Error('Series ID is required to fetch episodes');
    }

    const url = `${API_BASE_URL}/titles/${seriesId}/episodes`;

    console.log(`[API] Starting fetch request for episodes: ${url}`);

    // Create a timeout promise for React Native compatibility
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 10000);
    });

    const fetchPromise = fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log(`[API] Episodes fetch promise created, waiting for response...`);

    // Race between fetch and timeout
    const response = (await Promise.race([fetchPromise, timeoutPromise])) as Response;

    console.log(`[API] Episodes response received:`, {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url,
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => 'Could not read error body');
      console.error(`[API] Episodes HTTP Error - Status: ${response.status}, Body: ${errorBody}`);
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data: EpisodeListResponse = await response.json();

    console.log(`[API] Episodes JSON parsing successful:`, {
      status: data.status,
      seriesId: data.data?._id,
      episodesLength: data.data?.episodes?.length || 0,
      message: data.message,
    });

    if (data.status !== 'success') {
      console.error(`[API] Episodes API returned non-success status:`, data);
      throw new Error(data.message || 'Episodes API request failed');
    }

    if (!data.data || !data.data.episodes || !Array.isArray(data.data.episodes)) {
      console.error('[API] Episodes - Invalid response format - episodes is not an array');
      throw new Error('Invalid response format from server');
    }

    console.log(
      `[API] Successfully fetched ${data.data.episodes.length} episodes for series: ${data.data._id}`
    );

    // Add a small delay for smoother UI transitions (50-80ms)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));

    return data.data.episodes;
  } catch (error) {
    console.error('[API] Episodes fetch error:', error);

    // Check for specific error types
    if (error instanceof TypeError) {
      console.error('[API] Episodes TypeError detected - likely network/CORS issue');
      if (error.message.includes('Network request failed')) {
        console.error(
          '[API] Episodes network request failed - check internet connection or CORS policy'
        );
        throw new Error('Unable to connect to server. Please check your connection and try again.');
      }
    }

    if (error instanceof Error && error.message === 'Request timeout') {
      console.error('[API] Episodes request timeout - server took too long to respond');
      throw new Error('Request timeout. Please try again.');
    }

    // Log additional context
    console.error('[API] Episodes additional context:');
    console.error('  API_BASE_URL:', API_BASE_URL);
    console.error('  seriesId:', seriesId);

    // Re-throw the error for the caller to handle
    throw error;
  }
};

// Helper functions to transform API data to app format
export const transformApiTitleToContentItem = (apiTitle: ApiTitle): ContentItem => {
  const { metaData } = apiTitle;

  // Handle image URL - provide fallback if poster is N/A or invalid
  const getImageUrl = (poster: string): string => {
    if (poster === 'N/A' || !poster || poster.trim() === '') {
      // Return a proper fallback - using a solid color placeholder
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMkEyQTJBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
    }

    // Ensure the URL is properly formatted
    const trimmedUrl = poster.trim();
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl;
    }

    // If it's not a complete URL, assume it needs https://
    return `https://${trimmedUrl}`;
  };

  // Map API type to app type - handle actual API type values
  const getContentType = (apiType: string): 'episode' | 'bhajan' | 'story' | 'movie' | 'series' => {
    if (!apiType || apiType === 'N/A') {
      return 'episode'; // Default fallback
    }

    const normalizedType = apiType.toLowerCase().trim();

    // Map actual API type values to our app types
    switch (normalizedType) {
      case 'bhajan':
        return 'bhajan';
      case 'playlist':
        return 'series'; // Playlists are series/collections of episodes
      case 'movie':
        return 'movie'; // Direct mapping for movies
      case 'episode':
      default:
        return 'episode';
    }
  };

  return {
    id: metaData.id, // Use metaData.id (YouTube playlist ID) instead of apiTitle._id
    title: metaData.title,
    description: metaData.description !== 'N/A' ? metaData.description : undefined,
    imageUrl: getImageUrl(metaData.poster),
    type: getContentType(metaData.type), // Use actual type from API instead of hardcoded 'episode'
    duration: formatDuration(metaData.duration),
    releaseYear: metaData.releaseYear !== 'N/A' ? Number.parseInt(metaData.releaseYear) : undefined,
    tags: metaData.actors.filter((actor) => actor !== 'N/A'),
  };
};

export const transformApiTitleToHeroContent = (apiTitle: ApiTitle): HeroContent => {
  const contentItem = transformApiTitleToContentItem(apiTitle);

  // Format rating properly - handle N/A and ensure it's a valid number
  const formatRating = (rating: string): string => {
    if (rating === 'N/A' || !rating || rating.trim() === '') {
      return 'Not Rated';
    }

    const numericRating = Number.parseFloat(rating);
    if (Number.isNaN(numericRating)) {
      return 'Not Rated';
    }

    // Format to 1 decimal place if it's not a whole number
    return numericRating % 1 === 0 ? `${numericRating}.0` : numericRating.toFixed(1);
  };

  const formattedRating = formatRating(apiTitle.metaData.rating);
  const ratingText = formattedRating === 'Not Rated' ? formattedRating : `${formattedRating}/10`;

  return {
    ...contentItem,
    buttonLabel: 'Watch Now',
    logoImageUrl: undefined,
    tagline: `${apiTitle.metaData.episodeCount} Episodes • ${ratingText}`,
    rating: formattedRating, // Add the formatted rating as a separate field
  };
};

// Helper function to format duration from seconds to readable format
const formatDuration = (durationString: string): string => {
  const seconds = Number.parseInt(durationString);

  if (Number.isNaN(seconds)) return 'N/A';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};
