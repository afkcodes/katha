import { LinearGradient } from 'expo-linear-gradient';
import type React from 'react';
import { StyleSheet, TouchableOpacity, type ViewStyle } from 'react-native';
import ThemedText from '~/components/ThemedText/ThemedText';
import { createStyleFactory, useStaticThemedStyles } from '~/theme';

interface GradientButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  textVariant?: keyof typeof import('~/theme/typography').Typography;
  style?: ViewStyle;
  disabled?: boolean;
}

// Create style factory for gradient button
const createGradientButtonStyles = createStyleFactory((theme) => ({
  buttonBase: {
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  // Size variants
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
  },
  medium: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  large: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl * 1.5,
  },
  // Text color
  buttonText: {
    color: theme.colors.textOnPrimary,
    letterSpacing: 0.5,
  },
  // Secondary button (no gradient, just border)
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  // Disabled state
  disabledButton: {
    opacity: 0.6,
  },
}));

export const GradientButton: React.FC<GradientButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  textVariant = 'labelLarge',
  style,
  disabled = false,
}) => {
  const styles = useStaticThemedStyles(createGradientButtonStyles);

  // Define gradient colors based on theme
  const gradientColors = ['#8B5CF6', '#6D28D9'] as const; // Divine violet gradient

  // Combine styles based on props
  const buttonStyle = StyleSheet.compose(
    StyleSheet.compose(styles.buttonBase, styles[size]),
    style
  );

  // If disabled, add disabled style
  const containerStyle = disabled ? [buttonStyle, styles.disabledButton] : buttonStyle;

  return variant === 'primary' ? (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={containerStyle}
      >
        <ThemedText variant={textVariant} style={styles.buttonText}>
          {label}
        </ThemedText>
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[containerStyle, styles.secondaryButton]}
    >
      <ThemedText variant={textVariant} style={styles.buttonText}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
};
