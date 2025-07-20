import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThumbnailImage } from '~/components/OptimizedFastImage';
import ThemedText from '~/components/ThemedText/ThemedText';
import { createStyleFactory, useStaticThemedStyles } from '~/theme';
import type { EpisodeItem } from '~/types/content';
import { font, s, vs } from '~/utils/screen/screenutils';

interface EpisodeCardProps {
  episode: EpisodeItem;
  onPress: (episode: EpisodeItem) => void;
  index?: number;
}

const createEpisodeCardStyles = createStyleFactory((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  episodeContent: {
    flexDirection: 'row',
    alignItems: 'center', // Center all items vertically
  },
  posterContainer: {
    width: s(120),
    height: vs(68), // 16:9 aspect ratio
    position: 'relative',
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginRight: theme.spacing.md,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: s(32),
    height: s(32),
    borderRadius: s(16),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: font(16),
    fontWeight: '600',
    color: theme.colors.text,
    lineHeight: vs(22),
    marginBottom: theme.spacing.xs, // Add proper spacing
  },
  description: {
    color: theme.colors.textSecondary,
    opacity: 0.85,
  },
}));

const EpisodeCard: React.FC<EpisodeCardProps> = memo(({ episode, onPress }) => {
  const styles = useStaticThemedStyles(createEpisodeCardStyles);

  const handlePress = useCallback(() => {
    onPress(episode);
  }, [episode, onPress]);

  // Truncate description for compact design
  const truncatedDescription = useMemo(() => {
    const maxLength = 100;
    if (episode.description.length > maxLength) {
      return `${episode.description.substring(0, maxLength)}...`;
    }
    return episode.description;
  }, [episode.description]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.episodeContent}>
        <View style={styles.posterContainer}>
          <ThumbnailImage source={{ uri: episode.poster.hq }} style={styles.poster} />
        </View>

        <View style={styles.textContent}>
          <ThemedText style={styles.title} numberOfLines={2}>
            {episode.title}
          </ThemedText>

          <ThemedText variant="bodySmall" style={styles.description} numberOfLines={1}>
            {truncatedDescription}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
});

EpisodeCard.displayName = 'EpisodeCard';

export { EpisodeCard };
