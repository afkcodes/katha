/**
 * TypeScript definitions for enhanced style autocompletion
 * This file provides better IntelliSense for our theming system
 */

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { Theme } from '~/theme';

// Enhanced style property types for better autocomplete
export interface EnhancedViewStyle extends ViewStyle {
  // Common style patterns we use
  flex?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  backgroundColor?: string;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  borderRadius?: number;
}

export interface EnhancedTextStyle extends TextStyle {
  // Text-specific enhancements
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  color?: string;
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  lineHeight?: number;
  opacity?: number;
}

// Union type for all enhanced styles
export type EnhancedStyleProp = EnhancedViewStyle | EnhancedTextStyle | ImageStyle;

// Style factory with enhanced typing
export type EnhancedStyleFactory<T extends Record<string, EnhancedStyleProp>> = (theme: Theme) => T;

// Autocomplete helpers for theme properties
export interface ThemeColorSuggestions {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textSecondary: string;
  textInverse: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export interface ThemeSpacingSuggestions {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface ThemeBorderRadiusSuggestions {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}
