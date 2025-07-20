/** biome-ignore-all lint/suspicious/noArrayIndexKey: <not needed for loaders> */
import { LegendList } from '@legendapp/list';
import { ArrowLeft } from 'lucide-react-native';
import { NavigationContext } from 'navigation-react';
import type React from 'react';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert, Animated, TouchableOpacity, View } from 'react-native';
import { EpisodeCard, SafeAreaAwareView, SkeletonLoader } from '~/components';
import ThemedText from '~/components/ThemedText/ThemedText';
import { useEpisodes } from '~/hooks/useContentQuery';
import { useI18n } from '~/i18n/useI18n';
import { createStyleFactory, useColors, useStaticThemedStyles } from '~/theme';
import type { EpisodeItem } from '~/types/content';
import { s, vs } from '~/utils/screen/screenutils';

const EpisodeList: React.FC = () => {
  const styles = useStaticThemedStyles(createEpisodeListStyles);
  const colors = useColors();
  const { t } = useI18n();
  const { stateNavigator } = useContext(NavigationContext);

  // Get navigation parameters - this seriesId is the YouTube playlist ID
  const playlistId = stateNavigator.stateContext?.data?.seriesId;
  const seriesTitle = stateNavigator.stateContext?.data?.seriesTitle || t('episodes.title');
  const seriesImageUrl = stateNavigator.stateContext?.data?.seriesImageUrl;

  // Debug: Log navigation data
  console.log('[EpisodeList] Navigation data:', {
    playlistId,
    seriesTitle,
    seriesImageUrl,
    fullNavigationData: stateNavigator.stateContext?.data,
  });

  const { data: apiEpisodes, isLoading: loading, error } = useEpisodes(playlistId);

  const episodes = useMemo(() => {
    if (apiEpisodes && apiEpisodes.length > 0) {
      return apiEpisodes;
    }
    return [];
  }, [apiEpisodes]);

  const [isContentReady, setIsContentReady] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Handle content ready state with delay and animation
  useEffect(() => {
    if (!loading && episodes.length > 0) {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 100);
      setIsContentReady(true);

      return () => clearTimeout(timer);
    } else {
      setIsContentReady(false);
      fadeAnim.setValue(0);
    }
  }, [loading, episodes.length, fadeAnim]);

  const handleEpisodePress = useCallback(
    (episode: EpisodeItem) => {
      // Handle episode selection - could navigate to video player
      Alert.alert(t('episodes.playEpisode'), episode.title, [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('episodes.play'),
          onPress: () => {
            // TODO: Implement video player navigation
            console.log('Playing episode:', episode.id);
          },
        },
      ]);
    },
    [t]
  );

  const handleGoBack = useCallback(() => {
    try {
      stateNavigator.navigate('home');
    } catch (error) {
      console.error('Navigation back error:', error);
    }
  }, [stateNavigator]);

  const renderEpisode = useCallback(
    ({ item, index }: { item: EpisodeItem; index: number }) => (
      <EpisodeCard episode={item} onPress={handleEpisodePress} index={index} />
    ),
    [handleEpisodePress]
  );

  const keyExtractor = useCallback((item: EpisodeItem) => item._id, []);

  const renderEmptyState = useCallback(
    () => (
      <View style={styles.emptyState}>
        <ThemedText style={styles.emptyStateText}>
          {error ? `Error: ${error.message}` : t('episodes.noEpisodesAvailable')}
        </ThemedText>
      </View>
    ),
    [styles.emptyState, styles.emptyStateText, t, error]
  );

  if (!isContentReady && loading) {
    return (
      <SafeAreaAwareView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backButton}>
            <SkeletonLoader style={styles.headerBackButtonSkeleton} />
          </View>
          <View style={styles.headerContent}>
            <SkeletonLoader style={styles.headerTitleSkeleton} />
            <SkeletonLoader style={styles.headerSubtitleSkeleton} />
          </View>
        </View>
        <Animated.View style={[styles.animatedContainer, { opacity: 1 }]}>
          <View style={styles.listContainer}>
            <View style={styles.listContentContainer}>
              {Array.from({ length: 8 }, (_, index) => (
                <View
                  key={`episode-skeleton-loading-${index}`}
                  style={styles.episodeSkeletonContainer}
                >
                  <View style={styles.episodeSkeletonContent}>
                    <SkeletonLoader style={styles.episodeSkeletonThumbnail} />
                    <View style={styles.episodeSkeletonTextContent}>
                      <SkeletonLoader style={styles.episodeSkeletonTitle} />
                      <SkeletonLoader style={styles.episodeSkeletonDescription} />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </SafeAreaAwareView>
    );
  }
  return (
    <SafeAreaAwareView style={styles.container} useSafeArea={true} applyBottomInset={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack} activeOpacity={0.7}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <ThemedText variant="headlineSmall">{seriesTitle}</ThemedText>
          <ThemedText variant="bodySmall">{t('episodes.subtitle')}</ThemedText>
        </View>
      </View>

      {loading || !isContentReady ? (
        <Animated.View style={[styles.animatedContainer, { opacity: 1 }]}>
          <View style={styles.listContainer}>
            <View style={styles.listContentContainer}>
              {Array.from({ length: 8 }, (_, index) => (
                <View
                  key={`episode-skeleton-transition-${Date.now()}-${index}`}
                  style={styles.episodeSkeletonContainer}
                >
                  <View style={styles.episodeSkeletonContent}>
                    <SkeletonLoader style={styles.episodeSkeletonThumbnail} />
                    <View style={styles.episodeSkeletonTextContent}>
                      <SkeletonLoader style={styles.episodeSkeletonTitle} />
                      <SkeletonLoader style={styles.episodeSkeletonDescription} />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      ) : (
        <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
          <LegendList
            data={episodes}
            renderItem={renderEpisode}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listContentContainer}
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
            estimatedItemSize={100}
          />
        </Animated.View>
      )}
    </SafeAreaAwareView>
  );
};

export default memo(EpisodeList);

const createEpisodeListStyles = createStyleFactory((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  backButton: {
    marginRight: theme.spacing.md,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surface,
  },
  headerContent: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  animatedContainer: {
    flex: 1,
  },
  listContentContainer: {
    flexGrow: 1,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  // Skeleton styles
  headerBackButtonSkeleton: {
    width: s(24), // Match ArrowLeft size
    height: s(24), // Match ArrowLeft size
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.xs,
  },
  headerTitleSkeleton: {
    width: '60%',
    height: vs(24), // Better match for headlineSmall variant
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.xs,
    marginBottom: 4,
  },
  headerSubtitleSkeleton: {
    width: '40%',
    height: vs(16), // Better match for bodySmall variant
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.xs,
  },
  episodeSkeletonContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  episodeSkeletonContent: {
    flexDirection: 'row',
    alignItems: 'center', // Match the EpisodeCard alignItems: 'center'
  },
  episodeSkeletonThumbnail: {
    width: s(120),
    height: vs(68),
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  episodeSkeletonTextContent: {
    flex: 1,
    justifyContent: 'center',
  },
  episodeSkeletonTitle: {
    width: '85%',
    height: vs(22), // Match the lineHeight: 22 from EpisodeCard title
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.xs,
    marginBottom: theme.spacing.xs,
  },
  episodeSkeletonDescription: {
    width: '70%',
    height: vs(16), // Better match for bodySmall text height
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.xs,
  },
}));
