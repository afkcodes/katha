import type { TextStyle } from 'react-native';
import { deviceInfo, font, vs } from '../utils/screen/screenutils';

// Typography scale based on Material Design 3 principles - made responsive
export const Typography = {
  // Display styles - For large, attention-grabbing text
  displayLarge: {
    fontSize: font(57),
    lineHeight: vs(64),
    fontWeight: '400' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontSize: font(45),
    lineHeight: vs(52),
    fontWeight: '400' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0,
  },
  displaySmall: {
    fontSize: font(36),
    lineHeight: vs(44),
    fontWeight: '400' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0,
  },

  // Headline styles - For section headers
  headlineLarge: {
    fontSize: font(32),
    lineHeight: vs(40),
    fontWeight: '600' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: font(28),
    lineHeight: vs(36),
    fontWeight: '600' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0,
  },
  headlineSmall: {
    fontSize: font(24),
    lineHeight: vs(32),
    fontWeight: '600' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0,
  },

  // Title styles - For prominent text
  titleLarge: {
    fontSize: font(22),
    lineHeight: vs(28),
    fontWeight: '600' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0,
  },
  titleMedium: {
    fontSize: font(18),
    lineHeight: vs(24),
    fontWeight: '600' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: font(16),
    lineHeight: vs(20),
    fontWeight: '600' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.1,
  },

  // Body styles - For regular text content
  bodyLarge: {
    fontSize: font(16),
    lineHeight: vs(24),
    fontWeight: '400' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontSize: font(14),
    lineHeight: vs(20),
    fontWeight: '400' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: font(12),
    lineHeight: vs(16),
    fontWeight: '400' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.4,
  },

  // Label styles - For buttons, chips, and small text
  labelLarge: {
    fontSize: font(14),
    lineHeight: vs(20),
    fontWeight: '500' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: font(12),
    lineHeight: vs(16),
    fontWeight: '500' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: font(10),
    lineHeight: vs(14),
    fontWeight: '500' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.5,
  },

  // Game-specific typography - responsive for different devices
  sudokuNumber: {
    fontSize: deviceInfo.isTablet ? font(32) : deviceInfo.isSmallPhone ? font(20) : font(24),
    lineHeight: deviceInfo.isTablet ? vs(40) : deviceInfo.isSmallPhone ? vs(24) : vs(32),
    fontWeight: '600' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0,
    textAlign: 'center' as TextStyle['textAlign'],
  },
  sudokuNumberSmall: {
    fontSize: deviceInfo.isTablet ? font(16) : deviceInfo.isSmallPhone ? font(10) : font(12),
    lineHeight: deviceInfo.isTablet ? vs(20) : deviceInfo.isSmallPhone ? vs(12) : vs(16),
    fontWeight: '400' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.5,
    textAlign: 'center' as TextStyle['textAlign'],
  },
  gameTimer: {
    fontSize: font(20),
    lineHeight: vs(24),
    fontWeight: '600' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.15,
  },
  difficulty: {
    fontSize: font(18),
    lineHeight: vs(24),
    fontWeight: '500' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.15,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },

  // Additional game-specific typography
  gameScore: {
    fontSize: font(16),
    lineHeight: vs(20),
    fontWeight: '600' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.1,
  },
  gameHint: {
    fontSize: deviceInfo.isTablet ? font(14) : font(12),
    lineHeight: deviceInfo.isTablet ? vs(18) : vs(16),
    fontWeight: '400' as TextStyle['fontWeight'],
    fontFamily: 'Rubik',
    letterSpacing: 0.25,
    textAlign: 'center' as TextStyle['textAlign'],
  },
};

export type TypographyVariant = keyof typeof Typography;
