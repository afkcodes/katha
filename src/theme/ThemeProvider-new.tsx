/**
 * Simple Theme Provider for Katha mythological app
 */
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { type ColorScheme, Colors } from './colors-new';
import { borderRadius, shadows, spacing } from './spacing-new';
import { Typography } from './typography-new';

// Theme context type
interface ThemeContextType {
  colorScheme: ColorScheme;
  colors: typeof Colors.dark | typeof Colors.light | typeof Colors.ancient;
  typography: typeof Typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  isDark: boolean;
  isLight: boolean;
  toggleTheme: () => void;
  setTheme: (scheme: ColorScheme) => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | null>(null);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ColorScheme;
}

// Theme provider component
export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(initialTheme || 'light');

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: systemScheme }) => {
      if (!initialTheme && systemScheme) {
        setColorScheme(systemScheme === 'dark' ? 'dark' : 'light');
      }
    });

    return () => subscription?.remove();
  }, [initialTheme]);

  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';
  const isLight = colorScheme === 'light';

  const toggleTheme = () => {
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (scheme: ColorScheme) => {
    setColorScheme(scheme);
  };

  const contextValue: ThemeContextType = {
    colorScheme,
    colors,
    typography: Typography,
    spacing,
    borderRadius,
    shadows,
    isDark,
    isLight,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

// Hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Convenient hooks for specific theme parts
export function useColors() {
  return useTheme().colors;
}

export function useTypography() {
  return useTheme().typography;
}

export function useSpacing() {
  return useTheme().spacing;
}

export function useBorderRadius() {
  return useTheme().borderRadius;
}

export function useShadows() {
  return useTheme().shadows;
}
