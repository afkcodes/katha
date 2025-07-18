import type React from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
import { useColors } from '~/theme';
import { Typography, type TypographyVariant } from '~/theme/typography';

export interface ThemedTextProps extends TextProps {
  /**
   * Typography variant from the design system
   */
  variant?: TypographyVariant;
  /**
   * Text color - can be a color name from theme or hex/rgb value
   */
  color?: string;
  /**
   * Custom font weight - will automatically map to appropriate Rubik font
   */
  fontWeight?: TextStyle['fontWeight'];
  /**
   * Center align text
   */
  center?: boolean;
  /**
   * Children content
   */
  children: React.ReactNode;
}

const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'bodyMedium',
  color,
  fontWeight,
  center,
  style,
  children,
  ...restProps
}) => {
  const colors = useColors();
  // Get base typography style
  const baseStyle = Typography[variant];
  // Determine font weight
  const finalFontWeight = fontWeight || baseStyle.fontWeight;
  // Determine text color
  const textColor = color || colors.text;
  // Combine all styles
  const combinedStyle: TextStyle = {
    ...baseStyle,
    fontFamily: getFontFamily(finalFontWeight),
    color: textColor,
    ...(center && { textAlign: 'center' }),
    ...(Array.isArray(style) ? Object.assign({}, ...style) : style),
  };
  return (
    <Text style={combinedStyle} {...restProps}>
      {children}
    </Text>
  );
};

// Helper function to get the appropriate font family based on font weight
function getFontFamily(weight?: TextStyle['fontWeight']): string {
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
}

export default ThemedText;
