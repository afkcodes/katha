// Main theme export file

// Re-export font utilities for convenience
export {
  createTextStyle,
  type FontStyleKey,
  fontStyles,
  useFontStyles,
} from '../helpers/fontHelper';
// Re-export screen utilities for easy access
export {
  breakpoints,
  clamp,
  deviceInfo,
  font,
  h,
  metrics,
  ms,
  mvs,
  px,
  s,
  safeArea,
  square,
  vs,
  w,
} from '../utils/screen/screenutils';
export { type ColorPalette, type ColorScheme, Colors } from './colors';
export {
  Animation,
  BorderRadius,
  type BorderRadiusKey,
  type BreakpointKey,
  Breakpoints,
  DeviceAdjustments,
  Elevation,
  type ElevationKey,
  FontSize,
  type FontSizeKey,
  Grid,
  getGameBoardSize,
  getResponsiveSpacing,
  Layout,
  Measurements,
  Opacity,
  type OpacityKey,
  type SemanticColorKey,
  SemanticColors,
  SemanticSpacing,
  Sizes,
  Spacing,
  type SpacingKey,
  ThemeMode,
  type ThemeModeKey,
  type TransitionKey,
  Transitions,
  TypographyScale,
  ZIndex,
} from './dimensions';
export { createStyleFactory, useStaticThemedStyles, useThemedStyles } from './hooks';
export {
  ThemeProvider,
  useAnimations,
  useColors,
  useFontSize,
  useLayout,
  useResponsive,
  useSemantics,
  useSpacing,
  useTheme,
  useThemeMode,
  useTypography,
} from './ThemeProvider';
export type { Theme } from './types';
export { Typography, type TypographyVariant } from './typography';
