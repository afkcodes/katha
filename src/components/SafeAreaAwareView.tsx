import type React from 'react';
import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '~/theme';

interface SafeAreaAwareViewProps extends ViewProps {
  /**
   * Whether to apply safe area insets to the view
   * @default true
   */
  useSafeArea?: boolean;

  /**
   * Whether to use themed background color
   * @default true
   */
  useThemedBackground?: boolean;

  /**
   * Whether to apply bottom safe area inset
   * @default true
   */
  applyBottomInset?: boolean;

  /**
   * Whether to apply top safe area inset
   * @default true
   */
  applyTopInset?: boolean;

  /**
   * Edge insets to apply (overrides individual settings)
   * @example ['top', 'bottom']
   */
  edges?: ('top' | 'right' | 'bottom' | 'left')[];

  /**
   * Optional background color (overrides themed background)
   */
  backgroundColor?: string;

  /**
   * Content container style
   */
  contentContainerStyle?: ViewStyle;

  /**
   * Children components
   */
  children: React.ReactNode;
}

/**
 * A view component that automatically handles safe area insets and theming
 */
const SafeAreaAwareView: React.FC<SafeAreaAwareViewProps> = ({
  useSafeArea = true,
  useThemedBackground = true,
  applyBottomInset = true,
  applyTopInset = true,
  edges,
  backgroundColor,
  style,
  contentContainerStyle,
  children,
  ...rest
}) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  // Calculate background color
  const bgColor = backgroundColor || (useThemedBackground ? colors.background : undefined);

  // Calculate padding based on safe area insets
  const safeAreaPadding: ViewStyle = useSafeArea
    ? {
        paddingTop: edges?.includes('top') || applyTopInset ? insets.top : 0,
        paddingBottom: edges?.includes('bottom') || applyBottomInset ? insets.bottom : 0,
        paddingLeft: edges?.includes('left') ? insets.left : 0,
        paddingRight: edges?.includes('right') ? insets.right : 0,
      }
    : {};

  // If edges are defined, use SafeAreaView with specific edges
  if (useSafeArea && edges) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: bgColor }, style]}
        edges={edges}
        {...rest}
      >
        <View style={[styles.contentContainer, contentContainerStyle]}>{children}</View>
      </SafeAreaView>
    );
  }

  // Otherwise use a regular View with calculated padding
  return (
    <View
      style={[styles.container, { backgroundColor: bgColor }, safeAreaPadding, style]}
      {...rest}
    >
      <View style={[styles.contentContainer, contentContainerStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

export default SafeAreaAwareView;
