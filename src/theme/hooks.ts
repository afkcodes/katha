import { useMemo } from 'react';
import { type ImageStyle, StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeProvider';
import type { Theme } from './types';

// Type for any React Native style
type StyleProp = ViewStyle | TextStyle | ImageStyle;

// Type for style factory function with proper constraint
export type StyleFactory<T extends Record<string, StyleProp>> = (theme: Theme) => T;

/**
 * Helper function to create a style factory with better TypeScript inference
 * This ensures that the return type is properly inferred for IntelliSense
 *
 * @param factory - Function that takes theme and returns style object
 * @returns The same function with explicit typing for better autocomplete
 */
export function createStyleFactory<T extends Record<string, StyleProp>>(
  factory: (theme: Theme) => T
) {
  // Return the factory with its exact type preserved
  return factory as (theme: Theme) => T;
}

/**
 * Hook for creating themed styles with automatic memoization
 * Only recreates styles when theme changes, preventing unnecessary renders
 *
 * @param styleFactory - Function that takes theme and returns style object
 * @returns Memoized StyleSheet with proper type inference
 */
export function useThemedStyles<T extends Record<string, StyleProp>>(
  styleFactory: (theme: Theme) => T
) {
  const theme = useTheme();

  return useMemo(() => StyleSheet.create(styleFactory(theme)) as T, [theme, styleFactory]);
}

/**
 * Alternative hook that provides better performance for static style factories
 * Use this when your style factory function is defined outside the component
 * and wrapped in useCallback or is a stable reference
 *
 * @param styleFactory - Stable function that takes theme and returns style object
 * @returns Memoized StyleSheet with proper type inference
 */
export function useStaticThemedStyles<T extends Record<string, StyleProp>>(
  styleFactory: (theme: Theme) => T
) {
  const theme = useTheme();

  return useMemo(
    () => StyleSheet.create(styleFactory(theme)) as T,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, styleFactory] // Only depend on theme, assuming styleFactory is stable
  );
}
