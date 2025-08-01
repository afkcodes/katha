import type { TextStyle } from 'react-native';

/**
 * Helper function to get the appropriate font family based on font weight
 */
export const getFontFamily = (weight?: TextStyle['fontWeight']): string => {
  switch (weight) {
    case 'bold':
    case '700':
    case '800':
    case '900':
      return 'Rubik-Bold';
    case '600':
      return 'Rubik-SemiBold';
    case '500':
      return 'Rubik-Medium';
    case 'normal':
    case '400':
    case '300':
    case '200':
    case '100':
    default:
      return 'Rubik-Regular';
  }
};

/**
 * Utility function to create text styles with Rubik font family
 * This ensures consistent font usage across the entire app
 */
export const createTextStyle = (
  fontSize: number,
  fontWeight: TextStyle['fontWeight'] = '400',
  additionalStyles?: Partial<TextStyle>
): TextStyle => {
  return {
    fontSize,
    fontFamily: getFontFamily(fontWeight),
    fontWeight,
    ...additionalStyles,
  };
};

/**
 * Predefined Rubik font styles for quick use
 */
export const fontStyles = {
  // Headings
  h1: createTextStyle(32, '700'),
  h2: createTextStyle(28, '600'),
  h3: createTextStyle(24, '600'),
  h4: createTextStyle(20, '600'),
  h5: createTextStyle(18, '500'),
  h6: createTextStyle(16, '500'),

  // Body text
  bodyLarge: createTextStyle(16, '400'),
  bodyMedium: createTextStyle(14, '400'),
  bodySmall: createTextStyle(12, '400'),

  // Labels and buttons
  buttonLarge: createTextStyle(16, '600'),
  buttonMedium: createTextStyle(14, '600'),
  buttonSmall: createTextStyle(12, '600'),

  // Captions and misc
  caption: createTextStyle(12, '400'),
  overline: createTextStyle(10, '500', { textTransform: 'uppercase' }),

  // Game specific
  sudokuNumber: createTextStyle(24, '600', { textAlign: 'center' }),
  gameTimer: createTextStyle(20, '600'),
  gameScore: createTextStyle(16, '600'),
} as const;

export type FontStyleKey = keyof typeof fontStyles;

/**
 * Hook to get Rubik font styles with theme integration
 */
export const useFontStyles = () => {
  return fontStyles;
};
