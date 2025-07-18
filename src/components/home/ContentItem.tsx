import { LinearGradient } from 'expo-linear-gradient';
import type React from 'react';
import { Animated, Image, TouchableOpacity, View } from 'react-native';
import ThemedText from '~/components/ThemedText/ThemedText';
import { useI18n } from '~/i18n/useI18n';
import { createStyleFactory, useColors, useStaticThemedStyles } from '~/theme';
import type { ContentItem as ContentItemType } from '~/types/content';

interface ContentItemProps {
  item: ContentItemType;
}

// Create a style factory for reusable content item styles
const createContentItemStyles = createStyleFactory((theme) => ({
  contentItem: {
    width: 150, // Slightly wider for better visibility
    marginRight: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  contentImageContainer: {
    position: 'relative',
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    elevation: 8, // Increased elevation for more prominence
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  contentImage: {
    width: 150, // Match container width
    height: 220, // Slightly taller for better visibility
    borderRadius: theme.borderRadius.md,
  },
  itemGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderRadius: theme.borderRadius.md,
  },
  itemTypeContainer: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: theme.spacing.xs,
  },
  itemTypeBadge: {
    paddingVertical: 2,
    paddingHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.xs,
  },
  durationBadge: {
    position: 'absolute',
    bottom: theme.spacing.xs,
    right: theme.spacing.xs,
    paddingVertical: 2,
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
    fontSize: 14,
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
}));

export const ContentItem: React.FC<ContentItemProps> = ({ item }) => {
  const colors = useColors();
  const styles = useStaticThemedStyles(createContentItemStyles);
  const { t } = useI18n();

  // Function to create an animated scale value for content items
  const createAnimatedScale = () => {
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

    return { scale, handlePressIn, handlePressOut };
  };

  const { scale, handlePressIn, handlePressOut } = createAnimatedScale();

  // Gradient colors
  const gradientColors = ['transparent', 'rgba(0,0,0,0.7)'] as const;

  // Get badge style based on item type
  const getTypeBadgeStyle = () => {
    switch (item.type) {
      case 'bhajan':
        return styles.bhajanBadge;
      case 'story':
        return styles.storyBadge;
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
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <View style={styles.contentImageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.contentImage} resizeMode="cover" />
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
