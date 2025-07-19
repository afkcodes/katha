import type React from 'react';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { type ColorPalette, type ColorScheme, Colors } from './colors';
import {
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
import { Typography } from './typography';

// Storage instance for theme persistence
const storage = new MMKV({
  id: 'sudoku-theme',
  encryptionKey: 'sudoku-theme-key',
});

// Custom theme interface for extensibility
interface CustomTheme {
  name: string;
  colors: ColorPalette;
}

// Theme context interface
interface ThemeContextType {
  // Current theme state
  colorScheme: ColorScheme;
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
  fontSize: typeof FontSize;
  opacity: typeof Opacity;
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

  // Theme management
  isDark: boolean;
  isLight: boolean;
  toggleTheme: () => void;
  setTheme: (scheme: ColorScheme | 'auto') => void;

  // Custom themes
  customThemes: CustomTheme[];
  addCustomTheme: (theme: CustomTheme) => void;
  removeCustomTheme: (name: string) => void;
  setCustomTheme: (name: string) => void;

  // Current theme info
  isSystemTheme: boolean;
  currentThemeName: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ColorScheme | 'auto';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'auto',
}) => {
  // Get stored theme preference or use initial theme
  const getStoredTheme = (): ColorScheme | 'auto' => {
    try {
      const stored = storage.getString('theme-preference');
      return (stored as ColorScheme | 'auto') || initialTheme;
    } catch {
      return initialTheme;
    }
  };

  const [themePreference, setThemePreference] = useState<ColorScheme | 'auto'>(getStoredTheme);
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>(() => {
    try {
      const stored = storage.getString('custom-themes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Determine current color scheme
  const getCurrentColorScheme = (): ColorScheme => {
    if (themePreference === 'auto') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return themePreference;
  };

  const colorScheme = getCurrentColorScheme();
  const isDark = colorScheme === 'dark';
  const isLight = colorScheme === 'light';
  const isSystemTheme = themePreference === 'auto';

  // Get current theme name
  const getCurrentThemeName = (): string => {
    if (themePreference === 'auto') {
      return `System (${systemColorScheme})`;
    }

    // Check if it's a custom theme
    const customTheme = customThemes.find(
      (theme) => JSON.stringify(theme.colors) === JSON.stringify(Colors[colorScheme])
    );

    if (customTheme) {
      return customTheme.name;
    }

    // Return the appropriate theme name
    switch (colorScheme) {
      case 'dark':
        return 'Dark';
      default:
        return 'Light';
    }
  };

  // Listen to system color scheme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      setSystemColorScheme(newColorScheme);
    });

    return () => subscription.remove();
  }, []);

  // Theme management functions
  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const setTheme = (scheme: ColorScheme | 'auto') => {
    setThemePreference(scheme);
    try {
      storage.set('theme-preference', scheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  // Custom theme management
  const addCustomTheme = (theme: CustomTheme) => {
    const newCustomThemes = [...customThemes.filter((t) => t.name !== theme.name), theme];
    setCustomThemes(newCustomThemes);
    try {
      storage.set('custom-themes', JSON.stringify(newCustomThemes));
    } catch (error) {
      console.warn('Failed to save custom theme:', error);
    }
  };

  const removeCustomTheme = (name: string) => {
    const newCustomThemes = customThemes.filter((theme) => theme.name !== name);
    setCustomThemes(newCustomThemes);
    try {
      storage.set('custom-themes', JSON.stringify(newCustomThemes));
    } catch (error) {
      console.warn('Failed to remove custom theme:', error);
    }
  };

  const setCustomTheme = (name: string) => {
    const customTheme = customThemes.find((theme) => theme.name === name);
    if (customTheme) {
      // For custom themes, we need a different approach
      // This is a simplified version - you might want to extend the color scheme type
      console.warn('Custom theme application not fully implemented');
    }
  };

  const contextValue: ThemeContextType = {
    // Current theme state
    colorScheme,
    colors: Colors[colorScheme],
    typography: Typography,
    spacing: Spacing,
    borderRadius: BorderRadius,
    elevation: Elevation,
    animation: Animation,
    sizes: Sizes,
    zIndex: ZIndex,

    // Enhanced theme properties
    mode: colorScheme,
    fontSize: FontSize,
    opacity: Opacity,
    layout: Layout,

    // Responsive design utilities
    breakpoints: Breakpoints,
    grid: Grid,

    // Design system utilities
    measurements: Measurements,
    transitions: Transitions,
    typographyScale: TypographyScale,

    // Semantic utilities
    semanticColors: SemanticColors,
    semanticSpacing: SemanticSpacing,

    // Theme mode utilities
    themeMode: ThemeMode,

    // Theme management
    isDark,
    isLight,
    toggleTheme,
    setTheme,

    // Custom themes
    customThemes,
    addCustomTheme,
    removeCustomTheme,
    setCustomTheme,

    // Current theme info
    isSystemTheme,
    currentThemeName: getCurrentThemeName(),
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

// Hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook for convenient color access
export const useColors = (): ColorPalette => {
  const { colors } = useTheme();
  return colors as ColorPalette;
};

// Hook for convenient spacing access
export const useSpacing = () => {
  const { spacing } = useTheme();
  return spacing;
};

// Hook for convenient font size access
export const useFontSize = () => {
  const { fontSize } = useTheme();
  return fontSize;
};

// Hook for convenient typography access
export const useTypography = () => {
  const { typography, typographyScale } = useTheme();
  return { typography, typographyScale };
};

// Hook for accessing semantic utilities
export const useSemantics = () => {
  const { semanticColors, semanticSpacing } = useTheme();
  return { semanticColors, semanticSpacing };
};

// Hook for accessing layout and measurements
export const useLayout = () => {
  const { layout, measurements, grid, breakpoints } = useTheme();
  return { layout, measurements, grid, breakpoints };
};

// Hook for accessing animation and transitions
export const useAnimations = () => {
  const { animation, transitions } = useTheme();
  return { animation, transitions };
};

// Hook for theme mode utilities
export const useThemeMode = () => {
  const { mode, isDark, isLight, themeMode, toggleTheme, setTheme } = useTheme();
  return {
    mode,
    isDark,
    isLight,
    themeMode,
    toggleTheme,
    setTheme,
    // Utility methods
    isMode: (checkMode: 'light' | 'dark') => mode === checkMode,
    prefersDark: () => isDark,
    prefersLight: () => isLight,
  };
};

// Hook for responsive design
export const useResponsive = () => {
  const { deviceInfo } = require('../utils/screen/screenutils');
  const { breakpoints, grid } = useTheme();

  return {
    // Device info
    isSmallScreen: deviceInfo.isSmallPhone,
    isMediumScreen: deviceInfo.isPhone && !deviceInfo.isSmallPhone,
    isLargeScreen: deviceInfo.isTablet,
    isPhone: deviceInfo.isPhone,
    isTablet: deviceInfo.isTablet,
    screenWidth: deviceInfo.screenWidth,
    screenHeight: deviceInfo.screenHeight,
    scale: deviceInfo.scale,

    // Breakpoints
    breakpoints,
    grid,

    // Responsive helper functions
    getSize: (small: number, medium: number, large: number) => {
      if (deviceInfo.isSmallPhone) return small;
      if (deviceInfo.isTablet) return large;
      return medium;
    },

    getSpacing: (base: number, multiplier: number = 1) => {
      if (deviceInfo.isSmallPhone) return base * 0.75 * multiplier;
      if (deviceInfo.isTablet) return base * 1.25 * multiplier;
      return base * multiplier;
    },

    // Responsive font size
    getFontSize: (base: number, scale: { small?: number; large?: number } = {}) => {
      const { small = 0.875, large = 1.125 } = scale;
      if (deviceInfo.isSmallPhone) return base * small;
      if (deviceInfo.isTablet) return base * large;
      return base;
    },

    // Responsive grid columns
    getColumns: (defaultCols: number, overrides: { small?: number; large?: number } = {}) => {
      const { small = Math.max(1, defaultCols - 2), large = Math.min(12, defaultCols + 2) } =
        overrides;
      if (deviceInfo.isSmallPhone) return small;
      if (deviceInfo.isTablet) return large;
      return defaultCols;
    },
  };
};
