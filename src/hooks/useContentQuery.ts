import { useQuery } from '@tanstack/react-query';
import {
  fetchLiveActionTitles,
  transformApiTitleToContentItem,
  transformApiTitleToHeroContent,
} from '~/services/api';
import type { HeroContent } from '~/types/content';

// Query keys
export const queryKeys = {
  titles: {
    all: ['titles'] as const,
    category: (category: string) => [...queryKeys.titles.all, category] as const,
    liveAction: () => [...queryKeys.titles.all, 'live_action'] as const,
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

// Hook to get hero content from the first live action title
export const useLiveActionHeroContent = (): {
  data: HeroContent | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
} => {
  const { data, isLoading, error, refetch } = useLiveActionTitles();

  const heroContent = data?.[0] ? transformApiTitleToHeroContent(data[0]) : undefined;

  return {
    data: heroContent,
    isLoading,
    error,
    refetch,
  };
};
