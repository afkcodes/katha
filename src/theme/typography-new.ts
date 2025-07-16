/**
 * Typography system for mythological storytelling
 * Designed for the Katha app with cultural sensitivity
 */
import type { TextStyle } from 'react-native';

// Base typography scale
export const Typography = {
  // Display styles - For epic titles
  displayLarge: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: -0.5,
  },
  displayMedium: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: -0.25,
  },
  displaySmall: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0,
  },

  // Headlines - For chapter titles
  headlineLarge: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.15,
  },
  headlineSmall: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.1,
  },

  // Titles - For story and character names
  titleLarge: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.1,
  },

  // Body text - For story content
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.4,
  },

  // Labels - For UI elements
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
  },

  // Special mythological styles
  sanskrit: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
    fontStyle: 'italic' as const,
  },
  verse: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.3,
    fontStyle: 'italic' as const,
    textAlign: 'center' as const,
  },
  characterName: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  dialogue: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.25,
    fontStyle: 'italic' as const,
  },
  moral: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.3,
    textAlign: 'center' as const,
  },
  narrator: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.2,
  },

  // Button styles
  buttonLarge: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
  },
  buttonMedium: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0.25,
  },
  buttonSmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
  },
} as const;

export type TypographyVariant = keyof typeof Typography;
