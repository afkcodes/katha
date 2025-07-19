import { LinearGradient } from 'expo-linear-gradient';
import { Play, Plus, Star } from 'lucide-react-native';
import type React from 'react';
import { memo, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FastImageBackground } from '~/components/FastImageBackground';
import ThemedText from '~/components/ThemedText/ThemedText';
import { useI18n } from '~/i18n/useI18n';
import { createStyleFactory, useColors, useStaticThemedStyles } from '~/theme';
import type { HeroContent } from '~/types/content';

interface HeroBannerProps {
  heroContent: HeroContent;
}

// Create a style factory for reusable hero banner styles
const createHeroBannerStyles = createStyleFactory((theme) => ({
  heroSection: {
    width: '100%',
    height: 540,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  heroTitle: {
    color: 'white',
    marginBottom: theme.spacing.sm,
  },
  heroDescription: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  yearBadge: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  yearText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  genreTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
  },
  genreText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md + 2,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.sm,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    flex: 1,
    maxWidth: 200,
    overflow: 'hidden',
    gap: theme.spacing.md,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: theme.spacing.xs,
    letterSpacing: 0.3,
  },
  secondaryButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
}));

const HeroBannerComponent: React.FC<HeroBannerProps> = ({ heroContent }) => {
  const styles = useStaticThemedStyles(createHeroBannerStyles);
  const colors = useColors();
  const { t } = useI18n();

  // Memoize gradient colors to prevent recreation on every render
  const gradientColors = useMemo(
    () =>
      [
        'transparent',
        'rgba(0,0,0,0.2)',
        'rgba(0,0,0,0.6)',
        'rgba(0,0,0,0.8)',
        colors.background,
      ] as const,
    [colors.background]
  );

  const gradientLocations = useMemo(() => [0, 0.35, 0.6, 0.8, 1] as const, []);

  return (
    <View style={styles.heroSection}>
      <FastImageBackground
        source={{ uri: heroContent.imageUrl }}
        style={styles.heroImage}
        priority="high"
        onError={() => {
          // Silent error handling for better performance
        }}
      >
        <LinearGradient
          colors={gradientColors}
          locations={gradientLocations}
          style={styles.gradientOverlay}
        />
        <View style={styles.heroContent}>
          <ThemedText variant="displayMedium" fontWeight="700" style={styles.heroTitle}>
            {heroContent.title}
          </ThemedText>

          <ThemedText style={styles.heroDescription}>{heroContent.description}</ThemedText>

          <View style={styles.heroMeta}>
            {heroContent.releaseYear && (
              <View style={styles.yearBadge}>
                <ThemedText style={styles.yearText}>{heroContent.releaseYear}</ThemedText>
              </View>
            )}

            <View style={styles.ratingContainer}>
              <Star size={14} color="gold" fill="gold" />
              <ThemedText style={styles.ratingText}>4.8</ThemedText>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <Plus size={22} color="white" strokeWidth={2.5} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9}>
              <LinearGradient
                colors={[colors.primary, colors.primaryVariant]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryButton}
              >
                <Play size={20} color="white" fill="white" />
                <ThemedText style={styles.primaryButtonText}>
                  {heroContent.buttonLabel || t('home.hero.watch')}
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </FastImageBackground>
    </View>
  );
};

// Export memoized component
export const HeroBanner = memo(HeroBannerComponent);
