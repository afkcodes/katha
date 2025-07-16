/**
 * Main theme exports for Katha mythological app
 */

// Export types
export type { ColorScheme } from './colors-new';
// Export theme components
export { Colors } from './colors-new';
export type { BorderRadius, Shadows, Spacing } from './spacing-new';
export { borderRadius, shadows, spacing } from './spacing-new';
export {
  ThemeProvider,
  useBorderRadius,
  useColors,
  useShadows,
  useSpacing,
  useTheme,
  useTypography,
} from './ThemeProvider-new';
export type { TypographyVariant } from './typography-new';
export { Typography } from './typography-new';
