# ThemedText Component Usage Guide

The `ThemedText` component ensures consistent use of the Rubik font family throughout the entire app. It automatically applies the correct Rubik font variant based on the font weight and integrates seamlessly with the app's theming system.

## Basic Usage

```tsx
import { ThemedText } from '~/components';

// Using typography variants (recommended)
<ThemedText variant="headlineLarge">Main Title</ThemedText>
<ThemedText variant="bodyMedium">Regular text content</ThemedText>
<ThemedText variant="labelLarge">Button text</ThemedText>

// Custom color
<ThemedText variant="bodyMedium" color="#FF0000">Red text</ThemedText>

// Center aligned
<ThemedText variant="titleMedium" center>Centered text</ThemedText>

// Custom font weight (automatically maps to correct Rubik font)
<ThemedText variant="bodyMedium" fontWeight="600">Semi-bold text</ThemedText>
```

## Available Typography Variants

### Display Styles (Large, attention-grabbing text)

- `displayLarge` - 57px, Regular
- `displayMedium` - 45px, Regular
- `displaySmall` - 36px, Regular

### Headline Styles (Section headers)

- `headlineLarge` - 32px, SemiBold
- `headlineMedium` - 28px, SemiBold
- `headlineSmall` - 24px, SemiBold

### Title Styles (Prominent text)

- `titleLarge` - 22px, SemiBold
- `titleMedium` - 18px, SemiBold
- `titleSmall` - 16px, SemiBold

### Body Styles (Regular content)

- `bodyLarge` - 16px, Regular
- `bodyMedium` - 14px, Regular
- `bodySmall` - 12px, Regular

### Label Styles (Buttons, chips, small text)

- `labelLarge` - 14px, Medium
- `labelMedium` - 12px, Medium
- `labelSmall` - 10px, Medium

### Game-Specific Styles

- `sudokuNumber` - Responsive sizing, SemiBold
- `sudokuNumberSmall` - Responsive sizing, Regular
- `gameTimer` - 20px, SemiBold
- `difficulty` - 18px, Medium, Uppercase
- `gameScore` - 16px, SemiBold
- `gameHint` - Responsive sizing, Regular

## Font Weight Mapping

The component automatically maps font weights to the correct Rubik font files:

- `300`, `400`, `normal` → Rubik-Regular
- `500` → Rubik-Medium
- `600` → Rubik-SemiBold
- `700`, `800`, `900`, `bold` → Rubik-Bold

## Props

```tsx
interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant; // Typography variant from design system
  color?: string; // Text color (theme color or hex/rgb)
  fontWeight?: TextStyle['fontWeight']; // Custom font weight
  center?: boolean; // Center align text
  children: React.ReactNode; // Text content
}
```

## Examples

```tsx
// App title
<ThemedText variant="headlineLarge" center>
  Sudoku Master
</ThemedText>

// Subtitle
<ThemedText variant="bodyLarge" color={colors.textSecondary}>
  Challenge your mind with premium puzzles
</ThemedText>

// Button text
<ThemedText variant="labelLarge" fontWeight="600">
  START NEW GAME
</ThemedText>

// Game number
<ThemedText variant="sudokuNumber">
  {cellValue}
</ThemedText>

// Progress indicator
<ThemedText variant="labelSmall">
  75%
</ThemedText>
```

## Alternative: Direct Font Utilities

For direct styling without the component wrapper, use the font utilities:

```tsx
import { createTextStyle, RubikStyles } from '~/theme';

// Using helper function
const customStyle = createTextStyle(18, '600', { color: 'red' });

// Using predefined styles
<Text style={RubikStyles.h2}>Heading</Text>
<Text style={RubikStyles.bodyMedium}>Body text</Text>
```

## Best Practices

1. **Always use ThemedText** instead of React Native's Text component
2. **Prefer typography variants** over custom font sizes for consistency
3. **Use semantic color names** from the theme instead of hard-coded colors
4. **Let the component handle font family** - it automatically applies the correct Rubik variant
5. **Use center prop** instead of textAlign in styles for better readability

## Migration from Text

```tsx
// Before
<Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>
  Title
</Text>

// After
<ThemedText variant="titleMedium">
  Title
</ThemedText>
```

This ensures consistent typography and proper Rubik font usage throughout your app!
