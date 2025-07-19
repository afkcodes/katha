import type React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, type DimensionValue, View, type ViewStyle } from 'react-native';
import { createStyleFactory, useColors, useStaticThemedStyles } from '~/theme';

interface SkeletonLoaderProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

// Create a style factory for reusable skeleton styles
const createSkeletonStyles = createStyleFactory((_theme) => ({
  skeleton: {
    overflow: 'hidden',
  },
  shimmerContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    right: 0,
    bottom: 0,
    opacity: 0.4,
  },
}));

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const styles = useStaticThemedStyles(createSkeletonStyles);
  const colors = useColors();
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = () => {
      shimmerAnimation.setValue(0);
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start(() => shimmer());
    };

    shimmer();
  }, [shimmerAnimation]);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  // Use theme colors for better integration
  const skeletonBaseColor = colors.surface || 'rgba(255, 255, 255, 0.1)';
  const shimmerColor = colors.surfaceVariant || 'rgba(255, 255, 255, 0.2)';

  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: skeletonBaseColor,
        },
        style,
      ]}
    >
      <View style={styles.shimmerContainer}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              backgroundColor: shimmerColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default SkeletonLoader;
