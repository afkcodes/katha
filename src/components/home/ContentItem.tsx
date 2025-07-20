import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContext } from 'navigation-react';
import type React from 'react';
import { memo, useContext } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { ThumbnailImage } from '~/components/OptimizedFastImage';
import ThemedText from '~/components/ThemedText/ThemedText';
import { useI18n } from '~/i18n/useI18n';
import { createStyleFactory, font, s, useColors, useStaticThemedStyles, vs } from '~/theme';
import type { ContentItem as ContentItemType } from '~/types/content';

interface ContentItemProps {
  item: ContentItemType;
}

// Create a style factory for reusable content item styles
const createContentItemStyles = createStyleFactory((theme) => ({
  contentItem: {
    width: s(150), // Slightly wider for better visibility
    marginRight: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  contentImageContainer: {
    position: 'relative',
    width: s(150), // Explicit width
    height: vs(220), // Explicit height
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden', // This ensures the image and gradient respect the border radius
    elevation: 8, // Increased elevation for more prominence
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backgroundColor: theme.colors.surface, // Add background color to prevent bleeding
  },
  contentImage: {
    width: '100%', // Use full width of container
    height: '100%', // Use full height of container
    // Remove explicit dimensions to prevent any scaling issues
  },
  itemGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    // Remove borderRadius from gradient since container handles it
  },
  itemTypeContainer: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: theme.spacing.xs,
  },
  itemTypeBadge: {
    paddingVertical: vs(2),
    paddingHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.xs,
  },
  durationBadge: {
    position: 'absolute',
    bottom: theme.spacing.xs,
    right: theme.spacing.xs,
    paddingVertical: vs(2),
    paddingHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.xs,
  },
  durationText: {
    color: theme.colors.textOnPrimary,
  },
  typeText: {
    color: theme.colors.textOnPrimary,
    textTransform: 'uppercase',
  },
  itemTitle: {
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
    fontWeight: '500',
    fontSize: font(14),
    letterSpacing: 0.2,
  },
  bhajanBadge: {
    backgroundColor: `${theme.colors.accent}CC`,
  },
  storyBadge: {
    backgroundColor: `${theme.colors.divine}CC`,
  },
  episodeBadge: {
    backgroundColor: `${theme.colors.secondary}CC`,
  },
  seriesBadge: {
    backgroundColor: `${theme.colors.primary}CC`,
  },
}));

const ContentItemComponent: React.FC<ContentItemProps> = ({ item }) => {
  const colors = useColors();
  const styles = useStaticThemedStyles(createContentItemStyles);
  const { t } = useI18n();
  const { stateNavigator } = useContext(NavigationContext);

  // Optimize animation by creating it once
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 30,
      tension: 40,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  };

  const handlePress = () => {
    // Navigate to episode list if the item type is series or has episodes
    if (item.type === 'series' || item.type === 'episode') {
      try {
        stateNavigator.navigate('episode_list', {
          seriesId: item.id,
          seriesTitle: item.title,
          seriesImageUrl: item.imageUrl,
        });
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else {
      // For other types (bhajan, story, movie), you could implement different navigation
      console.log('Playing content:', item.title);
    }
  };

  // Memoize gradient colors to prevent recreation
  const gradientColors = ['transparent', 'rgba(0,0,0,0.7)'] as const;

  // Get badge style based on item type
  const getTypeBadgeStyle = () => {
    switch (item.type) {
      case 'bhajan':
        return styles.bhajanBadge;
      case 'story':
        return styles.storyBadge;
      case 'series':
        return styles.seriesBadge;
      default:
        return styles.episodeBadge;
    }
  };

  return (
    <TouchableOpacity
      style={styles.contentItem}
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <View style={styles.contentImageContainer}>
          <ThumbnailImage
            source={item.imageUrl}
            style={[
              styles.contentImage,
              {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            ]}
            onError={() => {
              // Silent error handling for better performance
            }}
          />
          <LinearGradient colors={gradientColors} style={styles.itemGradient} />
          {item.duration && (
            <View style={[styles.durationBadge, { backgroundColor: `${colors.primary}CC` }]}>
              <ThemedText variant="labelSmall" style={styles.durationText}>
                {item.duration}
              </ThemedText>
            </View>
          )}
          <View style={styles.itemTypeContainer}>
            <View style={[styles.itemTypeBadge, getTypeBadgeStyle()]}>
              <ThemedText variant="labelSmall" style={styles.typeText}>
                {t(`home.contentType.${item.type}`)}
              </ThemedText>
            </View>
          </View>
        </View>
        <ThemedText variant="titleSmall" style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </ThemedText>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Export memoized component for better performance
export const ContentItem = memo(ContentItemComponent);
