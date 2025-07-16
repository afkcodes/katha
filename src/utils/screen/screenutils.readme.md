# React Native Scaling Utility

A comprehensive utility for handling responsive scaling in React Native applications. This utility provides various functions to ensure your UI components scale appropriately across different device sizes and pixel densities.

## 🎯 **Enhanced Features**

This version includes advanced features for responsive design:

- **Device Detection**: Automatic phone, tablet, and small phone detection
- **Accessibility Compliance**: Built-in minimum touch target enforcement
- **Performance Optimization**: Device-aware animations and effects
- **Theme Integration**: Seamlessly works with design systems

## Quick Reference

| Function   | Purpose                                           | When to Use                                            |
| ---------- | ------------------------------------------------- | ------------------------------------------------------ |
| `s()`      | Scales based on screen width and pixel density    | Widths, horizontal padding/margins, icon sizes         |
| `vs()`     | Scales based on screen height and pixel density   | Heights, vertical padding/margins, spacings            |
| `ms()`     | Moderately scales based on width (less dramatic)  | Subtle horizontal scaling, maintaining proportions     |
| `mvs()`    | Moderately scales based on height (less dramatic) | Subtle vertical scaling, maintaining proportions       |
| `font()`   | Scales fonts considering accessibility settings   | All text sizes                                         |
| `w()`      | Calculates width as percentage of screen width    | Responsive widths, full-width components               |
| `h()`      | Calculates height as percentage of screen height  | Responsive heights, full-height components             |
| `px()`     | Converts fixed pixel values to responsive sizes   | Translating exact design values to responsive sizes    |
| `clamp()`  | **NEW** - Clamps values between min/max bounds    | Ensuring accessibility compliance, preventing extremes |
| `square()` | **NEW** - Uniform scaling for square elements     | Icons, grid cells, circular elements                   |

## 📱 **Device Detection**

The utility automatically detects device types and provides information:

```javascript
import { deviceInfo, breakpoints } from './screenutils';

// Device type detection
console.log(deviceInfo.isPhone); // true on phones
console.log(deviceInfo.isTablet); // true on tablets
console.log(deviceInfo.isSmallPhone); // true on small phones (< 375px)
console.log(deviceInfo.isLargePhone); // true on large phones (> 400px)

// Screen information
console.log(deviceInfo.screenWidth); // Current screen width
console.log(deviceInfo.screenHeight); // Current screen height
console.log(deviceInfo.scale); // Current scale factor
console.log(deviceInfo.pixelRatio); // Device pixel ratio

// Breakpoints
console.log(breakpoints.phone); // 0
console.log(breakpoints.tablet); // 768
console.log(breakpoints.desktop); // 1024
```

## Installation

```javascript
// Basic scaling functions
import { s, vs, ms, mvs, font, w, h, px } from './screenutils';

// Enhanced functions
import { clamp, square, deviceInfo } from './screenutils';

// Everything
import { metrics, deviceInfo, breakpoints, safeArea } from './screenutils';
```

## 🎮 **Game Development Examples**

### Sudoku Grid Cells

Perfect scaling for game grids that need to maintain aspect ratios:

```javascript
const sudokuStyles = {
  // Square cells that scale uniformly
  cell: {
    width: square(40), // Maintains 1:1 aspect ratio
    height: square(40), // Always perfectly square
    borderRadius: s(4),
  },

  // Responsive grid based on device
  grid: {
    width: deviceInfo.isTablet ? square(500) : square(350),
    padding: deviceInfo.isSmallPhone ? s(8) : s(16),
  },

  // Touch-friendly number buttons
  numberButton: {
    width: clamp(40, 44, 60), // Min 44px for accessibility
    height: clamp(40, 44, 60), // Max 60px to prevent oversizing
    fontSize: font(18),
  },
};
```

### Responsive UI Components

Components that adapt beautifully to different devices:

```javascript
const gameUIStyles = {
  // Header that adapts to device
  header: {
    height: deviceInfo.isTablet ? vs(72) : vs(56),
    paddingHorizontal: s(16),
    paddingTop: safeArea.top, // Safe area support
  },

  // Buttons with guaranteed accessibility
  button: {
    height: clamp(44, 48, 56), // Always meets 44px minimum
    paddingHorizontal: s(20),
    borderRadius: s(12),
    fontSize: font(16),
  },

  // Modal that scales appropriately
  modal: {
    width: deviceInfo.isTablet ? w(60) : w(90),
    maxWidth: s(400),
    padding: s(24),
    borderRadius: s(16),
  },
};
```

## Common UI Components

### Enhanced Buttons

Buttons with accessibility and device optimization:

```javascript
const buttonStyles = {
  // Responsive button with accessibility compliance
  primary: {
    width: deviceInfo.isTablet ? s(200) : s(160),
    height: clamp(44, 48, 56), // Ensures 44px minimum
    paddingHorizontal: s(20),
    paddingVertical: vs(12),
    borderRadius: s(12),
    fontSize: font(16),
  },

  // Icon button with perfect touch target
  icon: {
    width: clamp(44, 48, 52), // Perfect square touch target
    height: clamp(44, 48, 52),
    borderRadius: square(24), // Always circular
    justifyContent: 'center',
    alignItems: 'center',
  },
};
```

### Responsive Cards

Cards that adapt to different screen sizes:

```javascript
const cardStyles = {
  // Card that scales intelligently
  container: {
    width: deviceInfo.isTablet ? w(45) : w(90), // 2 columns on tablet
    minHeight: vs(120),
    maxHeight: vs(200),
    padding: s(16),
    margin: s(8),
    borderRadius: s(12),
  },

  // Content spacing that adapts
  title: {
    fontSize: deviceInfo.isTablet ? font(20) : font(18),
    marginBottom: vs(8),
  },

  description: {
    fontSize: font(14),
    lineHeight: vs(20),
    marginBottom: vs(12),
  },
};
```

### Smart Lists

Lists that optimize for different devices:

```javascript
const listStyles = {
  // List item with device-appropriate sizing
  item: {
    width: w(100),
    height: clamp(60, 64, 72), // Comfortable on all devices
    paddingHorizontal: s(16),
    paddingVertical: vs(12),
    borderRadius: s(8),
  },

  // Avatar that scales with device
  avatar: {
    width: square(48),
    height: square(48),
    borderRadius: square(24),
    marginRight: s(12),
  },

  // Separator with subtle scaling
  separator: {
    height: ms(1, 0.5), // Very subtle scaling
    marginLeft: s(16),
    opacity: 0.2,
  },
};
```

## 🔧 **Advanced Usage**

### Device-Specific Styling

```javascript
const adaptiveStyles = {
  container: {
    padding: deviceInfo.isTablet ? s(32) : s(16),
    flexDirection: deviceInfo.isTablet ? 'row' : 'column',
  },

  // Performance-optimized animations
  animation: {
    duration: deviceInfo.isTablet ? 200 : 250,
  },

  // Content density based on device
  spacing: deviceInfo.isSmallPhone ? vs(8) : vs(12),
};
```

### Safe Area Integration

```javascript
import { safeArea } from './screenutils';

const safeStyles = {
  screen: {
    paddingTop: safeArea.top,
    paddingBottom: safeArea.bottom,
    paddingLeft: safeArea.left,
    paddingRight: safeArea.right,
  },
};
```

### Clamping for Accessibility

```javascript
const accessibleStyles = {
  // Ensure buttons meet minimum requirements
  touchTarget: {
    minWidth: clamp(44, 48, 64),
    minHeight: clamp(44, 48, 64),
  },

  // Prevent text from becoming too small or large
  text: {
    fontSize: clamp(12, font(14), 24),
  },

  // Responsive spacing with bounds
  margin: {
    marginVertical: clamp(8, vs(12), 20),
    marginHorizontal: clamp(12, s(16), 24),
  },
};
```

## 🎯 **Best Practices**

### 1. **Accessibility First**

```javascript
// Always ensure minimum touch targets
height: clamp(44, vs(48), 64);

// Use font() for all text to respect user settings
fontSize: font(16);

// Test with large font sizes enabled
```

### 2. **Performance Optimization**

```javascript
// Use device-aware settings
animationDuration: deviceInfo.isTablet ? 200 : 250;

// Optimize shadow complexity for device
elevation: deviceInfo.isTablet ? 12 : 8;
```

### 3. **Consistent Scaling**

```javascript
// Use square() for elements that should maintain aspect ratio
iconSize: square(24)

// Use same scaling function family for related elements
padding: s(16),
margin: s(8),
borderRadius: s(12)
```

### 4. **Device-Aware Layouts**

```javascript
// Adapt layouts for different devices
flexDirection: deviceInfo.isTablet ? 'row' : 'column';
width: deviceInfo.isTablet ? w(50) : w(100);
```

## Base Device Specifications

The scaling calculations are based on the iPhone 14 as the reference device:

- **Base Width**: 390px
- **Base Height**: 844px
- **Base Pixel Ratio**: 3
- **Breakpoints**: Phone (0), Tablet (768), Desktop (1024)

## 🚀 **Integration with Theme Systems**

This utility integrates seamlessly with design systems:

```javascript
// Theme system integration
export const Spacing = {
  xs: s(4),
  sm: s(8),
  md: s(16),
  lg: s(24),
  xl: s(32),
};

export const Sizes = {
  buttonHeight: clamp(44, 48, 56),
  iconSize: square(24),
  touchTarget: clamp(44, 48, 64),
};
```

## Testing Across Devices

**Recommended test devices:**

- **Small Phone**: iPhone SE (375x667)
- **Standard Phone**: iPhone 14 (390x844)
- **Large Phone**: iPhone 14 Pro Max (430x932)
- **Tablet**: iPad (768x1024)

**What to verify:**

- ✅ All touch targets ≥ 44px
- ✅ Text remains readable
- ✅ Layouts don't break
- ✅ Performance stays smooth
- ✅ Content fits without scrolling where expected

This enhanced utility ensures your React Native app delivers a premium experience across all devices! 🎮✨
