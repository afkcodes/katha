import type React from 'react';
import { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ContentCategory, HeroBanner, SafeAreaAwareView } from '~/components';
import type { ContentCategory as ContentCategoryType, HeroContent } from '~/types/content';

// Mock data for the home screen
const HERO_CONTENT: HeroContent = {
  id: 'hero1',
  title: 'Ramayana',
  description:
    'The epic journey of Lord Rama to rescue Sita from the demon king Ravana. Experience this divine tale of courage, honor, and righteousness.',
  imageUrl:
    'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
  logoImageUrl: undefined, // Removed problematic image
  type: 'story',
  buttonLabel: 'Watch Now',
  releaseYear: 2023,
  tags: ['Epic', 'Adventure', 'Spiritual'],
};

const TRENDING_NOW: ContentCategoryType = {
  id: 'trending',
  title: 'Trending Now',
  items: [
    {
      id: 'trend1',
      title: 'Krishna Leela',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'episode',
      duration: '22 min',
    },
    {
      id: 'trend2',
      title: 'Mahabharata: Kurukshetra',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'episode',
      duration: '45 min',
    },
    {
      id: 'trend3',
      title: 'Hanuman: The Divine Hero',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'story',
      duration: '30 min',
    },
    {
      id: 'trend4',
      title: 'Ganesha Origins',
      imageUrl:
        'https://www.dneg.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F3sjsytt3tkv5%2F4TZbGmtfPDnaK6oUTvpn55%2F5f293d924de5cf48d419f3460603de5d%2F1920X1080_DNEG_RD_With_Logo.jpg&w=3840&q=75',
      type: 'story',
      duration: '26 min',
    },
  ],
};

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

const Home: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaAwareView
      applyTopInset={false}
      applyBottomInset={false} // Don't apply bottom inset since we have tabs
      useThemedBackground={true}
      style={{ flex: 1 }}
    >
      <Animated.ScrollView
        style={{ flex: 1, height: '100%', width: '100%' }} // Ensure full width and height
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        decelerationRate="normal"
        bounces={true}
      >
        <HeroBanner heroContent={HERO_CONTENT} />
        <View style={{ paddingBottom: 0, paddingHorizontal: 0 }}>
          <ContentCategory category={TRENDING_NOW} />
          <ContentCategory category={CONTINUE_WATCHING} />
          <ContentCategory category={POPULAR_BHAJANS} />
        </View>
      </Animated.ScrollView>
    </SafeAreaAwareView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
    paddingHorizontal: 0,
  },
});

export default Home;
