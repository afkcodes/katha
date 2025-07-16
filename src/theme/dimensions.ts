import { clamp, deviceInfo, s, square, vs } from '~/utils/screen/screenutils';

// Spacing system based on 8px grid - made responsive
export const Spacing = {
  xs: s(4),
  sm: s(8),
  md: s(16),
  lg: s(24),
  xl: s(32),
  xxl: s(48),
  xxxl: s(64),
};

// Border radius system - made responsive
export const BorderRadius = {
  none: 0,
  xs: s(4),
  sm: s(8),
  md: s(12),
  lg: s(16),
  xl: s(24),
  full: 999,
};

// Elevation/Shadow system - enhanced for different device sizes
export const Elevation = {
  none: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowOffset: { width: 0, height: s(1) },
    shadowOpacity: 0.18,
    shadowRadius: s(1.0),
    elevation: deviceInfo.isTablet ? 2 : 1,
  },
  md: {
    shadowOffset: { width: 0, height: s(2) },
    shadowOpacity: 0.2,
    shadowRadius: s(2.62),
    elevation: deviceInfo.isTablet ? 6 : 4,
  },
  lg: {
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.23,
    shadowRadius: s(4.62),
    elevation: deviceInfo.isTablet ? 12 : 8,
  },
  xl: {
    shadowOffset: { width: 0, height: s(6) },
    shadowOpacity: 0.27,
    shadowRadius: s(6.65),
    elevation: deviceInfo.isTablet ? 18 : 12,
  },
};

// Animation durations - responsive based on device performance
export const Animation = {
  fast: deviceInfo.isTablet ? 120 : 150,
  normal: deviceInfo.isTablet ? 200 : 250,
  slow: deviceInfo.isTablet ? 280 : 350,
  slower: deviceInfo.isTablet ? 400 : 500,
};

// Component sizes - fully responsive
export const Sizes = {
  // Button heights - with accessibility minimum
  buttonSmall: clamp(32, 44, 48), // Ensures minimum touch target
  buttonMedium: clamp(40, 44, 56),
  buttonLarge: clamp(48, 52, 64),

  // Icon sizes - responsive scaling
  iconXs: s(12),
  iconSm: s(16),
  iconMd: s(20),
  iconLg: s(24),
  iconXl: s(32),
  iconXxl: s(48),

  // Sudoku game specific - using square scaling for consistent grid
  sudokuCellSize: square(40), // Square cells that scale uniformly
  sudokuCellSizeLarge: square(48), // Larger cells for accessibility
  sudokuGridSpacing: s(2), // Grid line thickness
  sudokuBlockSpacing: s(4), // Spacing between 3x3 blocks

  // Touch targets (minimum 44px for accessibility) - device aware
  touchTarget: Math.max(44, s(44)),

  // Header height - responsive
  headerHeight: vs(56),

  // Tab bar height - responsive
  tabBarHeight: vs(64),

  // Game-specific responsive sizes
  gameHeaderHeight: deviceInfo.isTablet ? vs(72) : vs(56),
  gameBoardMaxWidth: deviceInfo.isTablet ? s(500) : s(350),
  numberInputSize: square(48), // For number input buttons
  hintButtonSize: square(36), // For hint/note numbers
};

// Z-index layers - consistent across devices
export const ZIndex = {
  background: -1,
  content: 0,
  overlay: 10,
  modal: 20,
  popover: 30,
  tooltip: 40,
  notification: 50,
  max: 999,
};

// Device-specific adjustments
export const DeviceAdjustments = {
  // Tablet-specific enhancements
  tablet: {
    spacing: {
      xs: s(6),
      sm: s(12),
      md: s(20),
      lg: s(28),
      xl: s(36),
      xxl: s(52),
      xxxl: s(72),
    },
    sudokuCellSize: square(60),
    gameBoardPadding: s(32),
  },

  // Small phone adjustments
  smallPhone: {
    spacing: {
      xs: s(3),
      sm: s(6),
      md: s(12),
      lg: s(18),
      xl: s(24),
      xxl: s(36),
      xxxl: s(48),
    },
    sudokuCellSize: square(32),
    gameBoardPadding: s(8),
  },
};

// Responsive spacing function
export const getResponsiveSpacing = () => {
  if (deviceInfo.isTablet) return DeviceAdjustments.tablet.spacing;
  if (deviceInfo.isSmallPhone) return DeviceAdjustments.smallPhone.spacing;
  return Spacing;
};

// Responsive game board sizing
export const getGameBoardSize = () => {
  const cellSize = deviceInfo.isTablet
    ? DeviceAdjustments.tablet.sudokuCellSize
    : deviceInfo.isSmallPhone
      ? DeviceAdjustments.smallPhone.sudokuCellSize
      : Sizes.sudokuCellSize;

  return {
    cellSize,
    gridSize: cellSize * 9 + Sizes.sudokuGridSpacing * 8 + Sizes.sudokuBlockSpacing * 2,
    padding: deviceInfo.isTablet
      ? DeviceAdjustments.tablet.gameBoardPadding
      : deviceInfo.isSmallPhone
        ? DeviceAdjustments.smallPhone.gameBoardPadding
        : s(16),
  };
};

export type SpacingKey = keyof typeof Spacing;
export type BorderRadiusKey = keyof typeof BorderRadius;
export type ElevationKey = keyof typeof Elevation;

// Font size system - responsive and consistent
export const FontSize = {
  xs: s(10),
  sm: s(12),
  base: s(14),
  lg: s(16),
  xl: s(18),
  '2xl': s(20),
  '3xl': s(24),
  '4xl': s(28),
  '5xl': s(36),
  '6xl': s(48),
};

// Opacity levels for consistent transparency
export const Opacity = {
  none: 0,
  low: 0.25,
  medium: 0.5,
  high: 0.75,
  full: 1,
};

// Layout constants for common UI elements
export const Layout = {
  headerHeight: vs(56),
  tabBarHeight: vs(80),
  bottomSheetHeight: vs(300),
  cardMinHeight: vs(120),
};

export type FontSizeKey = keyof typeof FontSize;
export type OpacityKey = keyof typeof Opacity;

// Breakpoints for responsive design
export const Breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

// Transition and animation timing functions
export const Transitions = {
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// Common UI measurements and ratios
export const Measurements = {
  goldenRatio: 1.618,
  minTouchTarget: 44,
  maxLineLength: 65, // characters
  cardAspectRatio: 3 / 2,
  heroAspectRatio: 16 / 9,
};

// Semantic spacing for different UI contexts
export const SemanticSpacing = {
  // Component internal spacing
  componentPadding: {
    xs: Spacing.xs,
    sm: Spacing.sm,
    md: Spacing.md,
    lg: Spacing.lg,
  },

  // Layout spacing
  sectionGap: Spacing.xxl,
  containerPadding: Spacing.lg,
  cardGap: Spacing.md,

  // Typography spacing
  paragraphSpacing: Spacing.md,
  headingSpacing: Spacing.lg,
  captionSpacing: Spacing.xs,
};

// Semantic colors mapping (these would map to actual colors based on theme)
export const SemanticColors = {
  // Status colors
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',

  // UI element colors
  interactive: 'primary',
  disabled: 'muted',
  divider: 'border',
  overlay: 'overlay',

  // Contextual colors
  gameBoard: 'surface',
  gameCell: 'background',
  highlight: 'accent',
} as const;

// Typography scale with semantic names
export const TypographyScale = {
  // Display sizes (for hero text, large headings)
  display: {
    xl: FontSize['6xl'],
    lg: FontSize['5xl'],
    md: FontSize['4xl'],
    sm: FontSize['3xl'],
  },

  // Heading sizes
  heading: {
    xl: FontSize['3xl'],
    lg: FontSize['2xl'],
    md: FontSize.xl,
    sm: FontSize.lg,
  },

  // Body text sizes
  body: {
    lg: FontSize.lg,
    md: FontSize.base,
    sm: FontSize.sm,
  },

  // Utility text sizes
  caption: FontSize.xs,
  overline: FontSize.xs,
  label: FontSize.sm,
};

// Grid system configuration
export const Grid = {
  columns: 12,
  gutterWidth: Spacing.md,
  containerMaxWidth: {
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140,
    xxl: 1320,
  },
};

// Theme mode utilities
export const ThemeMode = {
  light: 'light' as const,
  dark: 'dark' as const,
  auto: 'auto' as const,
};

export type BreakpointKey = keyof typeof Breakpoints;
export type TransitionKey = keyof typeof Transitions;
export type SemanticColorKey = keyof typeof SemanticColors;
export type ThemeModeKey = keyof typeof ThemeMode;
