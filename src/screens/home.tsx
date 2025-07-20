import type React from 'react';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import {
  ContentCategory,
  ContentCategorySkeleton,
  ErrorState,
  HeroBanner,
  HeroBannerSkeleton,
  SafeAreaAwareView,
} from '~/components';
import {
  useAnimatedContent,
  useLiveActionContent,
  useLiveActionHeroContent,
} from '~/hooks/useContentQuery';
import useNestedScroll from '~/hooks/useNestedScroll';
import type { ContentCategory as ContentCategoryType } from '~/types/content';
import { vs } from '~/utils/screen/screenutils';

const Home: React.FC = () => {
  // Disable debug logging for better performance
  const { parentProps, childProps } = useNestedScroll(false);

  // Animation state
  const [isContentReady, setIsContentReady] = useState(false);
  const [showLoaderUntil, setShowLoaderUntil] = useState<number>(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Fetch hero content and live action titles
  const {
    data: heroContent,
    error: heroError,
    refetch: refetchHero,
    isLoading: heroLoading,
  } = useLiveActionHeroContent();

  const {
    data: liveActionContent,
    error: contentError,
    refetch: refetchContent,
    isLoading: contentLoading,
  } = useLiveActionContent();

  const {
    data: animatedContent,
    error: animatedError,
    refetch: refetchAnimated,
    isLoading: animatedLoading,
  } = useAnimatedContent();

  // Memoize error and loading states to prevent unnecessary re-renders
  const hasError = heroError && contentError && animatedError;
  const isLoading = heroLoading || contentLoading || animatedLoading;

  // Set minimum loader time when loading starts
  useEffect(() => {
    if (isLoading) {
      setShowLoaderUntil(100); // Show loader for at least 100ms
    }
  }, [isLoading]);

  // Handle content ready state with delay and animation
  useEffect(() => {
    const hasContent = heroContent || liveActionContent || animatedContent;

    if (!isLoading && hasContent) {
      // Check if minimum loader time has passed
      const now = Date.now();
      const remainingLoaderTime = Math.max(0, showLoaderUntil - now);

      const timer = setTimeout(
        () => {
          setIsContentReady(true);
          // Fade in animation
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }).start();
        },
        Math.max(remainingLoaderTime, 100)
      ); // Ensure minimum 100ms total or 50-80ms delay

      return () => clearTimeout(timer);
    } else {
      setIsContentReady(false);
      fadeAnim.setValue(0);
    }
  }, [isLoading, heroContent, liveActionContent, animatedContent, fadeAnim, showLoaderUntil]);

  const handleRetry = async () => {
    setIsContentReady(false);
    setShowLoaderUntil(100); // Minimum loader time for retry
    fadeAnim.setValue(0);
    await Promise.all([refetchHero(), refetchContent(), refetchAnimated()]);
  };

  // Show error state if both queries failed and not loading
  if (hasError && !isLoading) {
    return (
      <SafeAreaAwareView
        applyTopInset={false}
        applyBottomInset={false}
        useThemedBackground={true}
        style={styles.container}
      >
        <ErrorState
          error={heroError || contentError || animatedError}
          onRetry={handleRetry}
          title="Unable to load content"
          subtitle="Please check your connection and try again."
        />
      </SafeAreaAwareView>
    );
  }

  // Create live action category only when data exists
  const liveActionCategory: ContentCategoryType | null =
    liveActionContent && liveActionContent.length > 0
      ? {
          id: 'live_action',
          title: 'Live Action Series',
          items: liveActionContent,
        }
      : null;

  // Create animated category only when data exists
  const animatedCategory: ContentCategoryType | null =
    animatedContent && animatedContent.length > 0
      ? {
          id: 'animated',
          title: 'Animated Movies',
          items: animatedContent,
        }
      : null;

  return (
    <SafeAreaAwareView
      applyTopInset={false}
      applyBottomInset={false}
      useThemedBackground={true}
      style={styles.container}
    >
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        removeClippedSubviews={true}
        {...parentProps}
      >
        {isLoading || !isContentReady ? (
          <>
            <HeroBannerSkeleton />
            <View style={styles.contentWrapper}>
              <ContentCategorySkeleton />
              <ContentCategorySkeleton />
              <ContentCategorySkeleton />
            </View>
          </>
        ) : (
          <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
            {heroContent && <HeroBanner heroContent={heroContent} />}

            <View style={styles.contentWrapper}>
              {liveActionCategory && (
                <ContentCategory category={liveActionCategory} scrollProps={childProps} />
              )}

              {animatedCategory && (
                <ContentCategory category={animatedCategory} scrollProps={childProps} />
              )}
            </View>
          </Animated.View>
        )}
      </Animated.ScrollView>
    </SafeAreaAwareView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  scrollContent: {
    paddingBottom: vs(40),
    flexGrow: 1,
    paddingHorizontal: 0,
  },
  contentWrapper: {
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  animatedContainer: {
    flex: 1,
  },
});

export default Home;
