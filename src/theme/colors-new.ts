/**
 * Mythological color palette inspired by Indian epics and traditions
 * Designed for the Katha storytelling app
 */

export const Colors = {
  // Dark theme - Night sky and divine darkness
  dark: {
    // Background colors
    background: '#0A0E1A',
    surface: '#141B2E',
    surfaceVariant: '#1F2937',
    overlay: '#374151',

    // Primary colors - Sacred saffron
    primary: '#FF6B35',
    primaryVariant: '#E55A2B',
    primaryLight: '#FF8A5B',
    primaryContainer: '#4A1810',

    // Secondary colors - Divine blue
    secondary: '#1E40AF',
    secondaryVariant: '#1E3A8A',
    secondaryLight: '#3B82F6',
    secondaryContainer: '#0F172A',

    // Accent colors - Divine gold
    accent: '#FFD700',
    accentVariant: '#DAA520',
    accentLight: '#FFED4E',
    accentContainer: '#451A03',

    // Text colors
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textTertiary: '#94A3B8',
    textInverse: '#0F172A',
    textOnPrimary: '#FFFFFF',

    // Story content colors
    storyCard: '#1F2937',
    characterCard: '#374151',
    epicCard: '#4B5563',
    verse: '#2D3748',
    dialogue: '#2A4A5B',
    narrative: '#1A2332',

    // Mythological elements
    divine: '#6366F1',
    heroic: '#10B981',
    demonic: '#DC2626',
    nature: '#059669',
    celestial: '#8B5CF6',
    earthly: '#92400E',

    // Status colors
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    // Borders
    border: '#374151',
    borderFocus: '#FF6B35',
    borderError: '#EF4444',

    // Utilities
    transparent: 'transparent',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },

  // Light theme - Day light and sacred illumination
  light: {
    // Background colors
    background: '#FFFBF7',
    surface: '#FEF7ED',
    surfaceVariant: '#FDE68A',
    overlay: '#F3E8FF',

    // Primary colors
    primary: '#EA580C',
    primaryVariant: '#C2410C',
    primaryLight: '#FB923C',
    primaryContainer: '#FED7AA',

    // Secondary colors
    secondary: '#1E40AF',
    secondaryVariant: '#1E3A8A',
    secondaryLight: '#3B82F6',
    secondaryContainer: '#DBEAFE',

    // Accent colors
    accent: '#D97706',
    accentVariant: '#B45309',
    accentLight: '#F59E0B',
    accentContainer: '#FEF3C7',

    // Text colors
    text: '#1C1917',
    textSecondary: '#57534E',
    textTertiary: '#78716C',
    textInverse: '#F8FAFC',
    textOnPrimary: '#FFFFFF',

    // Story content colors
    storyCard: '#FFFFFF',
    characterCard: '#FEF7ED',
    epicCard: '#FDE68A',
    verse: '#F3F4F6',
    dialogue: '#E0F2FE',
    narrative: '#FAFAFA',

    // Mythological elements
    divine: '#4F46E5',
    heroic: '#059669',
    demonic: '#B91C1C',
    nature: '#16A34A',
    celestial: '#7C3AED',
    earthly: '#A16207',

    // Status colors
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626',
    info: '#2563EB',

    // Borders
    border: '#E7E5E4',
    borderFocus: '#EA580C',
    borderError: '#DC2626',

    // Utilities
    transparent: 'transparent',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },

  // Ancient theme - Manuscript inspired
  ancient: {
    // Background colors
    background: '#F5F0E8',
    surface: '#EDE4D3',
    surfaceVariant: '#E0D3BD',
    overlay: '#D4C4A8',

    // Primary colors
    primary: '#B7410E',
    primaryVariant: '#9F3A0C',
    primaryLight: '#D2691E',
    primaryContainer: '#F4E4BC',

    // Secondary colors
    secondary: '#1E3A8A',
    secondaryVariant: '#1E2460',
    secondaryLight: '#3B4F8C',
    secondaryContainer: '#E8F0FF',

    // Accent colors
    accent: '#B8860B',
    accentVariant: '#9A7209',
    accentLight: '#DAA520',
    accentContainer: '#F7F1D3',

    // Text colors
    text: '#2D1810',
    textSecondary: '#4A2C20',
    textTertiary: '#6B4423',
    textInverse: '#F5F0E8',
    textOnPrimary: '#F5F0E8',

    // Story content colors
    storyCard: '#F5F0E8',
    characterCard: '#EDE4D3',
    epicCard: '#E0D3BD',
    verse: '#F0E8D6',
    dialogue: '#E8F4F8',
    narrative: '#F8F6F0',

    // Mythological elements
    divine: '#6B46C1',
    heroic: '#047857',
    demonic: '#991B1B',
    nature: '#166534',
    celestial: '#7E22CE',
    earthly: '#92400E',

    // Status colors
    success: '#15803D',
    warning: '#CA8A04',
    error: '#B91C1C',
    info: '#1E40AF',

    // Borders
    border: '#D2B48C',
    borderFocus: '#B7410E',
    borderError: '#B91C1C',

    // Utilities
    transparent: 'transparent',
    shadow: 'rgba(45, 24, 16, 0.15)',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ColorPalette = typeof Colors.dark;
