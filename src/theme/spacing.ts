/**
 * Spacing and sizing system for the Katha app
 * Based on 8px grid system for consistency
 */

// Base spacing unit
const BASE = 8;

export const spacing = {
  0: 0,
  0.5: BASE * 0.5, // 4px
  1: BASE * 1, // 8px
  1.5: BASE * 1.5, // 12px
  2: BASE * 2, // 16px
  2.5: BASE * 2.5, // 20px
  3: BASE * 3, // 24px
  4: BASE * 4, // 32px
  5: BASE * 5, // 40px
  6: BASE * 6, // 48px
  8: BASE * 8, // 64px
  10: BASE * 10, // 80px
  12: BASE * 12, // 96px
  16: BASE * 16, // 128px
  20: BASE * 20, // 160px
  24: BASE * 24, // 192px
  32: BASE * 32, // 256px
} as const;

export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const shadows = {
  none: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
