/**
 * Theme type definitions to avoid circular dependencies
 */

import type { ColorPalette } from './colors';
import type {
  Animation,
  BorderRadius,
  Breakpoints,
  Elevation,
  FontSize,
  Grid,
  Layout,
  Measurements,
  Opacity,
  SemanticColors,
  SemanticSpacing,
  Sizes,
  Spacing,
  ThemeMode,
  Transitions,
  TypographyScale,
  ZIndex,
} from './dimensions';
import type { Typography } from './typography';

export type Theme = {
  colors: ColorPalette;
  typography: typeof Typography;
  spacing: typeof Spacing;
  borderRadius: typeof BorderRadius;
  elevation: typeof Elevation;
  animation: typeof Animation;
  sizes: typeof Sizes;
  zIndex: typeof ZIndex;

  // Enhanced theme properties
  mode: 'light' | 'dark' | 'paper';
  isDark: boolean;
  isLight: boolean;

  // Font size utilities
  fontSize: typeof FontSize;

  // Additional utilities
  opacity: typeof Opacity;

  // Layout utilities
  layout: typeof Layout;

  // Responsive design utilities
  breakpoints: typeof Breakpoints;
  grid: typeof Grid;

  // Design system utilities
  measurements: typeof Measurements;
  transitions: typeof Transitions;
  typographyScale: typeof TypographyScale;

  // Semantic utilities
  semanticColors: typeof SemanticColors;
  semanticSpacing: typeof SemanticSpacing;

  // Theme mode utilities
  themeMode: typeof ThemeMode;
};
