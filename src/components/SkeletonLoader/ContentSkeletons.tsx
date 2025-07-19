import type React from 'react';
import { View } from 'react-native';
import { createStyleFactory, s, useStaticThemedStyles, vs } from '~/theme';
import { SkeletonLoader } from './SkeletonLoader';

// Create a style factory for content skeleton styles
const createContentSkeletonStyles = createStyleFactory((theme) => ({
  contentItemSkeleton: {
    width: s(150),
    marginRight: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  contentImageSkeleton: {
    width: s(150),
    height: vs(220),
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  contentTitleSkeleton: {
    width: '80%',
    height: 16,
    borderRadius: theme.borderRadius.xs,
  },
  categorySkeleton: {
    marginTop: theme.spacing.xl,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  categoryTitleSkeleton: {
    width: 120,
    height: 20,
    borderRadius: theme.borderRadius.xs,
  },
  seeAllButtonSkeleton: {
    width: 60,
    height: 24,
    borderRadius: theme.borderRadius.lg,
  },
  categoryListSkeleton: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.xs,
    flexDirection: 'row',
  },
  heroBannerSkeleton: {
    width: '100%',
    height: 540,
    borderRadius: 0,
  },
}));

// Individual content item skeleton
export const ContentItemSkeleton: React.FC = () => {
  const styles = useStaticThemedStyles(createContentSkeletonStyles);

  return (
    <View style={styles.contentItemSkeleton}>
      <SkeletonLoader style={styles.contentImageSkeleton} />
      <SkeletonLoader style={styles.contentTitleSkeleton} />
    </View>
  );
};

// Content category skeleton with multiple items
export const ContentCategorySkeleton: React.FC = () => {
  const styles = useStaticThemedStyles(createContentSkeletonStyles);

  return (
    <View style={styles.categorySkeleton}>
      <View style={styles.categoryTitleContainer}>
        <SkeletonLoader style={styles.categoryTitleSkeleton} />
        <SkeletonLoader style={styles.seeAllButtonSkeleton} />
      </View>
      <View style={styles.categoryListSkeleton}>
        {Array.from({ length: 4 }, (_, index) => (
          <ContentItemSkeleton key={`content-skeleton-item-${Date.now()}-${index}`} />
        ))}
      </View>
    </View>
  );
};

// Hero banner skeleton
export const HeroBannerSkeleton: React.FC = () => {
  const styles = useStaticThemedStyles(createContentSkeletonStyles);

  return <SkeletonLoader style={styles.heroBannerSkeleton} />;
};
