import { LinearGradient } from 'expo-linear-gradient';
import type React from 'react';
import { StyleSheet, TouchableOpacity, View, type ViewStyle } from 'react-native';
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
  icon?: string; // Simple text icon support
}

// Create style factory for gradient button
const createGradientButtonStyles = createStyleFactory((theme) => ({
  buttonBase: {
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  // Size variants
  small: {
    paddingVertical: theme.spacing.xs + 2,
    paddingHorizontal: theme.spacing.md,
  },
  medium: {
    paddingVertical: theme.spacing.md + 2,
    paddingHorizontal: theme.spacing.lg,
  },
  large: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  // Text color
  buttonText: {
    color: theme.colors.textOnPrimary,
    letterSpacing: 0.8,
    fontWeight: '600',
  },
  // Icon and content layout
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: theme.spacing.xs,
    fontSize: 16,
    color: theme.colors.textOnPrimary,
  },
  // Secondary button (no gradient, just border)
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  icon,
}) => {
  const styles = useStaticThemedStyles(createGradientButtonStyles);

  // Define gradient colors based on theme - more elegant gradient
  const gradientColors = ['#A855F7', '#8B5CF6', '#7C3AED'] as const; // Enhanced violet gradient

  // Combine styles based on props
  const buttonStyle = StyleSheet.compose(
    StyleSheet.compose(styles.buttonBase, styles[size]),
    style
  );

  // If disabled, add disabled style
  const containerStyle = disabled ? [buttonStyle, styles.disabledButton] : buttonStyle;

  // Button content with icon support
  const ButtonContent = () => (
    <View style={styles.buttonContent}>
      {icon && <ThemedText style={styles.buttonIcon}>{icon}</ThemedText>}
      <ThemedText variant={textVariant} style={styles.buttonText}>
        {label}
      </ThemedText>
    </View>
  );

  return variant === 'primary' ? (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={containerStyle}
      >
        <ButtonContent />
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[containerStyle, styles.secondaryButton]}
    >
      <ButtonContent />
    </TouchableOpacity>
  );
};
