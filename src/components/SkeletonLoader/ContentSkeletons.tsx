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
    height: vs(16),
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
    width: s(120),
    height: vs(20),
    borderRadius: theme.borderRadius.xs,
  },
  seeAllButtonSkeleton: {
    width: s(60),
    height: vs(24),
    borderRadius: theme.borderRadius.lg,
  },
  categoryListSkeleton: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.xs,
    flexDirection: 'row',
  },
  heroBannerSkeleton: {
    width: '100%',
    height: vs(540),
    borderRadius: 0,
  },
  episodeCardSkeleton: {
    paddingHorizontal: s(16),
    paddingVertical: vs(12),
    backgroundColor: 'transparent',
  },
  episodeContentSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  episodePosterSkeleton: {
    width: s(120),
    height: vs(68),
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  episodeTextContentSkeleton: {
    flex: 1,
    justifyContent: 'center',
  },
  episodeTitleSkeleton: {
    width: '85%',
    height: vs(16),
    borderRadius: theme.borderRadius.xs,
    marginBottom: theme.spacing.xs,
  },
  episodeDescriptionSkeleton: {
    width: '70%',
    height: vs(12),
    borderRadius: theme.borderRadius.xs,
  },
  episodeListHeaderSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
    paddingVertical: vs(12),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  episodeBackButtonSkeleton: {
    width: s(40),
    height: vs(32),
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.md,
  },
  episodeHeaderContentSkeleton: {
    flex: 1,
  },
  episodeHeaderTitleSkeleton: {
    width: '60%',
    height: vs(20),
    borderRadius: theme.borderRadius.xs,
    marginBottom: 4,
  },
  episodeHeaderSubtitleSkeleton: {
    width: '40%',
    height: vs(14),
    borderRadius: theme.borderRadius.xs,
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

// Episode card skeleton
export const EpisodeCardSkeleton: React.FC = () => {
  const styles = useStaticThemedStyles(createContentSkeletonStyles);

  return (
    <View style={styles.episodeCardSkeleton}>
      <View style={styles.episodeContentSkeleton}>
        <SkeletonLoader style={styles.episodePosterSkeleton} />
        <View style={styles.episodeTextContentSkeleton}>
          <SkeletonLoader style={styles.episodeTitleSkeleton} />
          <SkeletonLoader style={styles.episodeDescriptionSkeleton} />
        </View>
      </View>
    </View>
  );
};

// Episode list header skeleton
export const EpisodeListHeaderSkeleton: React.FC = () => {
  const styles = useStaticThemedStyles(createContentSkeletonStyles);

  return (
    <View style={styles.episodeListHeaderSkeleton}>
      <SkeletonLoader style={styles.episodeBackButtonSkeleton} />
      <View style={styles.episodeHeaderContentSkeleton}>
        <SkeletonLoader style={styles.episodeHeaderTitleSkeleton} />
        <SkeletonLoader style={styles.episodeHeaderSubtitleSkeleton} />
      </View>
    </View>
  );
};

// Episode list skeleton with multiple episode cards
export const EpisodeListSkeleton: React.FC = () => {
  return (
    <>
      <EpisodeListHeaderSkeleton />
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        {Array.from({ length: 8 }, (_, index) => (
          <EpisodeCardSkeleton key={`episode-skeleton-${Date.now()}-${index}`} />
        ))}
      </View>
    </>
  );
};
