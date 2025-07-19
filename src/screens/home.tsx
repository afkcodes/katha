import type React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ContentCategory, ErrorState, HeroBanner, SafeAreaAwareView } from '~/components';
import { useLiveActionContent, useLiveActionHeroContent } from '~/hooks/useContentQuery';
import useNestedScroll from '~/hooks/useNestedScroll';
import type { ContentCategory as ContentCategoryType, HeroContent } from '~/types/content';

// Mock data for fallback content - moved outside component to prevent re-creation
const POPULAR_BHAJANS: ContentCategoryType = {
  id: 'bhajans',
  title: 'Popular Bhajans',
  items: [
    {
      id: 'bhajan1',
      title: 'Hanuman Chalisa',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'bhajan',
      duration: '9 min',
    },
    {
      id: 'bhajan2',
      title: 'Shiv Tandav Stotram',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'bhajan',
      duration: '7 min',
    },
    {
      id: 'bhajan3',
      title: 'Achyutam Keshavam',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'bhajan',
      duration: '5 min',
    },
    {
      id: 'bhajan4',
      title: 'Radhe Krishna Bhajan',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'bhajan',
      duration: '6 min',
    },
  ],
};

const CONTINUE_WATCHING: ContentCategoryType = {
  id: 'continue',
  title: 'Continue Watching',
  items: [
    {
      id: 'cont1',
      title: 'Ramayana: Episode 4',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'episode',
      duration: '40 min',
    },
    {
      id: 'cont2',
      title: 'Bhagavad Gita: Chapter 3',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'episode',
      duration: '25 min',
    },
    {
      id: 'cont3',
      title: 'Stories of Ganesha',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'story',
      duration: '15 min',
    },
  ],
};

// Default hero content as fallback - moved outside to prevent re-creation
const DEFAULT_HERO_CONTENT: HeroContent = {
  id: 'hero1',
  title: 'Ramayana',
  description:
    'The epic journey of Lord Rama to rescue Sita from the demon king Ravana. Experience this divine tale of courage, honor, and righteousness.',
  imageUrl:
    'https://m.media-amazon.com/images/M/MV5BZmY3MTZmMmItNjQ4My00Njg5LWIxNjctZGQwOTFlYTAxNjM4XkEyXkFqcGc@._V1_.jpg',
  logoImageUrl: undefined,
  type: 'story',
  buttonLabel: 'Watch Now',
  releaseYear: 2023,
  tags: ['Epic', 'Adventure', 'Spiritual'],
};

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

  // Memoize error and loading states to prevent unnecessary re-renders
  const hasError = heroError && contentError;
  const isLoading = heroLoading && contentLoading;

  const handleRetry = async () => {
    await Promise.all([refetchHero(), refetchContent()]);
  };

  // Show error state if both queries failed
  if (hasError && !isLoading) {
    return (
      <SafeAreaAwareView
        applyTopInset={false}
        applyBottomInset={false}
        useThemedBackground={true}
        style={styles.container}
      >
        <ErrorState
          error={heroError || contentError}
          onRetry={handleRetry}
          title="Unable to load content"
          subtitle="Please check your connection and try again."
        />
      </SafeAreaAwareView>
    );
  }

  // Use fallback hero content if needed
  const displayHeroContent = heroContent || DEFAULT_HERO_CONTENT;

  // Create live action category only when needed
  const liveActionCategory: ContentCategoryType | null =
    liveActionContent && liveActionContent.length > 0
      ? {
          id: 'live_action',
          title: 'Live Action Series',
          items: liveActionContent,
        }
      : null;

  return (
    <SafeAreaAwareView
      applyTopInset={false}
      applyBottomInset={false} // Don't apply bottom inset since we have tabs
      useThemedBackground={true}
      style={styles.container}
    >
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        removeClippedSubviews={true} // Performance optimization
        {...parentProps}
      >
        <HeroBanner heroContent={displayHeroContent} />
        <View style={styles.contentWrapper}>
          {liveActionCategory && (
            <ContentCategory category={liveActionCategory} scrollProps={childProps} />
          )}
          <ContentCategory category={POPULAR_BHAJANS} scrollProps={childProps} />
          <ContentCategory category={CONTINUE_WATCHING} scrollProps={childProps} />
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
