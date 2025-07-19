import type React from 'react';
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

const Home: React.FC = () => {
  // Disable debug logging for better performance
  const { parentProps, childProps } = useNestedScroll(false);

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

  const handleRetry = async () => {
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
        {heroLoading && !heroContent ? (
          <HeroBannerSkeleton />
        ) : heroContent ? (
          <HeroBanner heroContent={heroContent} />
        ) : null}

        <View style={styles.contentWrapper}>
          {contentLoading && !liveActionContent ? (
            <ContentCategorySkeleton />
          ) : liveActionCategory ? (
            <ContentCategory category={liveActionCategory} scrollProps={childProps} />
          ) : null}

          {animatedLoading && !animatedContent ? (
            <ContentCategorySkeleton />
          ) : animatedCategory ? (
            <ContentCategory category={animatedCategory} scrollProps={childProps} />
          ) : null}

          {(heroLoading || contentLoading || animatedLoading) && (
            <>
              <ContentCategorySkeleton />
              <ContentCategorySkeleton />
            </>
          )}
        </View>
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
    paddingBottom: 40,
    flexGrow: 1,
    paddingHorizontal: 0,
  },
  contentWrapper: {
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
});

export default Home;
