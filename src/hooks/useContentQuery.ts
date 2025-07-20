import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  fetchAnimatedTitles,
  fetchEpisodes,
  fetchLiveActionTitles,
  transformApiTitleToContentItem,
  transformApiTitleToHeroContent,
} from '../services/api';
import type { HeroContent } from '../types';

// Query keys
export const queryKeys = {
  titles: {
    all: ['titles'] as const,
    category: (category: string) => [...queryKeys.titles.all, category] as const,
    liveAction: () => [...queryKeys.titles.all, 'live_action'] as const,
    animated: () => [...queryKeys.titles.all, 'animated'] as const,
  },
  episodes: {
    all: ['episodes'] as const,
    list: (seriesId?: string) => [...queryKeys.episodes.all, 'list', seriesId] as const,
  },
} as const;

// Hook to fetch live action titles
export const useLiveActionTitles = () => {
  return useQuery({
    queryKey: queryKeys.titles.liveAction(),
    queryFn: fetchLiveActionTitles,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on network errors more than 2 times
      if (error instanceof Error && error.message.includes('connect')) {
        return failureCount < 2;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};

// Hook to get transformed content items from live action titles
export const useLiveActionContent = () => {
  const { data, refetch, ...rest } = useLiveActionTitles();

  const transformedData = data?.map(transformApiTitleToContentItem) || [];

  return {
    data: transformedData,
    refetch,
    ...rest,
  };
};

// Hook to get hero content from a random live action title
export const useLiveActionHeroContent = (): {
  data: HeroContent | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
} => {
  const { data, isLoading, error, refetch } = useLiveActionTitles();

  // Randomly select a hero content item from the available titles (stable selection per data change)
  const heroContent = useMemo(() => {
    if (!data || data.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * data.length);
    return transformApiTitleToHeroContent(data[randomIndex]);
  }, [data]);

  return {
    data: heroContent,
    isLoading,
    error,
    refetch,
  };
};

// Hook for animated content
export const useAnimatedContent = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.titles.animated(),
    queryFn: fetchAnimatedTitles,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  // Transform the data to ContentItem format
  const transformedData = data?.map(transformApiTitleToContentItem) || [];

  return {
    data: transformedData,
    isLoading,
    error,
    refetch,
  };
};

// Hook for animated hero content
export const useAnimatedHeroContent = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.titles.animated(),
    queryFn: fetchAnimatedTitles,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  // Transform the first item to hero content format
  const heroContent = data?.[0] ? transformApiTitleToHeroContent(data[0]) : undefined;

  return {
    data: heroContent,
    isLoading,
    error,
    refetch,
  };
};

// Hook to fetch episodes
export const useEpisodes = (seriesId?: string) => {
  const [isMinLoadingActive, setIsMinLoadingActive] = useState(false);
  const loadingStartTime = useRef<number | null>(null);

  const result = useQuery({
    queryKey: queryKeys.episodes.list(seriesId),
    queryFn: () => fetchEpisodes(seriesId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on network errors more than 2 times
      if (error instanceof Error && error.message.includes('connect')) {
        return failureCount < 2;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });

  // Handle minimum loading time
  useEffect(() => {
    // When loading/fetching starts
    if ((result.isFetching || result.isLoading) && loadingStartTime.current === null) {
      loadingStartTime.current = Date.now();
      setIsMinLoadingActive(true);
    }

    // When loading/fetching ends
    if (!result.isFetching && !result.isLoading && loadingStartTime.current !== null) {
      const elapsed = Date.now() - loadingStartTime.current;
      const remaining = Math.max(0, 100 - elapsed);

      if (remaining > 0) {
        // Still need to wait for minimum time
        const timer = setTimeout(() => {
          setIsMinLoadingActive(false);
          loadingStartTime.current = null;
        }, remaining);

        return () => clearTimeout(timer);
      } else {
        setIsMinLoadingActive(false);
        loadingStartTime.current = null;
      }
    }
  }, [result.isFetching, result.isLoading]);

  // Show loading state if either React Query is loading OR minimum timer is active
  const enhancedIsLoading = result.isLoading || isMinLoadingActive;

  return {
    ...result,
    isLoading: enhancedIsLoading,
  };
};
