// Mythological color palette inspired by Indian epics and traditions
export const Colors = {
  // Dark Theme - Pure black and charcoal inspired by night and shadow
  dark: {
    // Background colors - True blacks and dark grays
    background: '#000000', // Pure black background
    surface: '#0D1117', // Very dark surface (GitHub dark)
    surfaceVariant: '#1C1C1E', // Card backgrounds (iOS dark)
    overlay: '#2C2C2E', // Modal overlays

    // Primary colors - Sacred saffron/orange (divine fire, sacred flames)
    primary: '#FF6B35', // Sacred saffron
    primaryVariant: '#E55A2B', // Deeper saffron
    primaryLight: '#FF8A5B', // Lighter saffron
    primaryContainer: '#1A0A08', // Very dark saffron container

    // Secondary colors - Muted divine blue (Krishna, Vishnu, celestial waters)
    secondary: '#4285F4', // Google blue (more neutral)
    secondaryVariant: '#1976D2', // Material blue
    secondaryLight: '#64B5F6', // Lighter blue
    secondaryContainer: '#0A0A0A', // Almost black container

    // Accent colors - Divine gold (sacred objects, divine attributes)
    accent: '#FFD700', // Divine gold
    accentVariant: '#DAA520', // Deeper gold
    accentLight: '#FFED4E', // Bright gold
    accentContainer: '#1A1A00', // Dark gold container

    // Text colors
    text: '#FFFFFF', // Pure white text
    textSecondary: '#E5E5E7', // Light gray text
    textTertiary: '#8E8E93', // Medium gray text
    textInverse: '#000000', // Black text for light backgrounds
    textOnPrimary: '#FFFFFF', // White text on saffron backgrounds

    // Story/content specific colors
    storyCard: '#1C1C1E', // Dark gray story cards
    characterCard: '#2C2C2E', // Darker gray character cards
    epicCard: '#3A3A3C', // Medium gray epic cards
    verse: '#1E1E1E', // Verse/shloka backgrounds
    dialogue: '#252525', // Character dialogue
    narrative: '#0F0F0F', // Narrative text background

    // Mythological element colors (keeping vibrant colors but on dark base)
    divine: '#8B5DFF', // Divine/godly elements (bright purple)
    heroic: '#34D399', // Heroic characters (bright emerald)
    demonic: '#FF5555', // Demonic/evil elements (bright red)
    nature: '#4ADE80', // Natural elements (bright green)
    celestial: '#A78BFA', // Celestial beings (bright violet)
    earthly: '#D97706', // Earthly realm (bright orange-brown)

    // Status colors
    success: '#22C55E', // Success actions
    warning: '#F59E0B', // Warnings
    error: '#FF5555', // Bright red errors
    info: '#60A5FA', // Light blue information

    // Border colors
    border: '#2C2C2E', // Dark gray borders
    borderFocus: '#FF6B35', // Focused borders (saffron)
    borderError: '#FF5555', // Error borders

    // Utility colors
    transparent: 'transparent',
    shadow: 'rgba(0, 0, 0, 0.8)', // Darker shadow for black backgrounds
  },

  // Light Theme - Day light and sacred illumination
  light: {
    // Background colors - Pure and sacred whites with warm undertones
    background: '#FFFBF7', // Warm white background
    surface: '#FEF7ED', // Elevated surfaces
    surfaceVariant: '#FDE68A', // Cards with warm tint
    overlay: '#F3E8FF', // Overlays

    // Primary colors - Vibrant saffron (sacred color in Hinduism)
    primary: '#EA580C', // Sacred saffron
    primaryVariant: '#C2410C', // Deeper saffron
    primaryLight: '#FB923C', // Lighter saffron
    primaryContainer: '#FED7AA', // Light saffron container

    // Secondary colors - Royal blue (divine wisdom)
    secondary: '#1E40AF', // Divine blue
    secondaryVariant: '#1E3A8A', // Darker blue
    secondaryLight: '#3B82F6', // Lighter blue
    secondaryContainer: '#DBEAFE', // Light blue container

    // Accent colors - Rich gold (divine prosperity)
    accent: '#D97706', // Rich gold
    accentVariant: '#B45309', // Deeper gold
    accentLight: '#F59E0B', // Bright gold
    accentContainer: '#FEF3C7', // Light gold container

    // Text colors
    text: '#1C1917', // Dark brown text
    textSecondary: '#57534E', // Medium brown
    textTertiary: '#78716C', // Light brown
    textInverse: '#F8FAFC', // Light text for dark backgrounds
    textOnPrimary: '#FFFFFF', // White text on saffron

    // Story/content specific colors
    storyCard: '#FFFFFF', // Story card backgrounds
    characterCard: '#FEF7ED', // Character card backgrounds
    epicCard: '#FDE68A', // Epic card backgrounds
    verse: '#F3F4F6', // Verse backgrounds
    dialogue: '#E0F2FE', // Character dialogue
    narrative: '#FAFAFA', // Narrative backgrounds

    // Mythological element colors
    divine: '#4F46E5', // Divine elements (indigo)
    heroic: '#059669', // Heroic characters (emerald)
    demonic: '#B91C1C', // Demonic elements (dark red)
    nature: '#16A34A', // Natural elements (green)
    celestial: '#7C3AED', // Celestial beings (purple)
    earthly: '#A16207', // Earthly realm (amber)

    // Status colors
    success: '#16A34A', // Success
    warning: '#D97706', // Warning
    error: '#DC2626', // Error
    info: '#2563EB', // Info

    // Border colors
    border: '#E7E5E4', // Default borders
    borderFocus: '#EA580C', // Focused borders
    borderError: '#DC2626', // Error borders

    // Utility colors
    transparent: 'transparent',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
};

export type ColorScheme = keyof typeof Colors;
export type ColorPalette = typeof Colors.dark;
