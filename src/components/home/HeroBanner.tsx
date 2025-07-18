import { LinearGradient } from 'expo-linear-gradient';
import type React from 'react';
import { ImageBackground, View } from 'react-native';
import { GradientButton } from '~/components/GradientButton';
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
    height: 580,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroTitleOverlay: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  heroTitleText: {
    color: 'rgba(255, 215, 0, 0.9)', // Gold color
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  heroContent: {
    width: '80%',
  },
  heroTitle: {
    color: theme.colors.textOnPrimary,
    letterSpacing: 1,
    marginBottom: theme.spacing.xs,
  },
  heroDescription: {
    color: theme.colors.textOnPrimary,
    marginBottom: theme.spacing.lg,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    opacity: 0.9,
    lineHeight: 20,
  },
  heroLogo: {
    width: 200,
    height: 60,
    marginBottom: theme.spacing.lg,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.lg,
  },
  tag: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: 16,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tagText: {
    color: theme.colors.textOnPrimary,
  },
  tagAccent: {
    backgroundColor: `${theme.colors.accent}AA`,
  },
  tagPrimary: {
    backgroundColor: `${theme.colors.primary}AA`,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: theme.spacing.xs,
  },
  buttonText: {
    color: theme.colors.textOnPrimary,
    letterSpacing: 0.5,
  },
  primaryButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  secondaryButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
}));

export const HeroBanner: React.FC<HeroBannerProps> = ({ heroContent }) => {
  const colors = useColors();
  const styles = useStaticThemedStyles(createHeroBannerStyles);
  const { t } = useI18n();

  // Gradient constants
  const gradientColors = [
    'transparent',
    'rgba(0,0,0,0.6)',
    'rgba(0,0,0,0.85)',
    colors.background,
  ] as const;

  const gradientLocations = [0, 0.4, 0.75, 1] as const;

  return (
    <View style={styles.heroSection}>
      <ImageBackground source={{ uri: heroContent.imageUrl }} style={styles.heroImage}>
        <LinearGradient
          colors={gradientColors}
          locations={gradientLocations}
          style={styles.heroGradient}
        >
          <View style={styles.heroContent}>
            <ThemedText variant="headlineLarge" style={styles.heroTitle}>
              {heroContent.title}
            </ThemedText>

            <ThemedText variant="bodyMedium" style={styles.heroDescription}>
              {heroContent.description}
            </ThemedText>

            <View style={styles.tagContainer}>
              {heroContent.tags?.map((tag) => (
                <View key={`tag-${tag}`} style={[styles.tag, styles.tagAccent]}>
                  <ThemedText variant="bodySmall" style={styles.tagText}>
                    {tag}
                  </ThemedText>
                </View>
              ))}
              {heroContent.releaseYear && (
                <View style={[styles.tag, styles.tagPrimary]}>
                  <ThemedText variant="labelSmall" style={styles.tagText}>
                    {heroContent.releaseYear}
                  </ThemedText>
                </View>
              )}
            </View>

            <View style={styles.buttonRow}>
              <GradientButton
                label={heroContent.buttonLabel || t('home.hero.watch')}
                variant="primary"
                size="medium"
                textVariant="labelLarge"
                style={{ marginRight: 12 }}
              />

              <GradientButton
                label={t('home.hero.myList')}
                variant="secondary"
                size="medium"
                textVariant="labelLarge"
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
