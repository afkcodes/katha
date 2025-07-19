import FastImage, { type FastImageProps } from '@d11/react-native-fast-image';
import type React from 'react';
import { View, type ViewStyle } from 'react-native';

// FastImage constants
export const Priority = {
  low: 'low' as const,
  normal: 'normal' as const,
  high: 'high' as const,
};

export const ResizeMode = {
  contain: 'contain' as const,
  cover: 'cover' as const,
  stretch: 'stretch' as const,
  center: 'center' as const,
};

export type PriorityType = (typeof Priority)[keyof typeof Priority];
export type ResizeModeType = (typeof ResizeMode)[keyof typeof ResizeMode];

// Enhanced FastImage component with additional features
interface EnhancedFastImageProps extends Omit<FastImageProps, 'source' | 'onLoad'> {
  source: string | { uri: string } | number;
  fallbackSource?: string | { uri: string } | number;
  placeholder?: React.ReactNode;
  containerStyle?: ViewStyle;
  onLoadingStateChange?: (loading: boolean) => void;
  enableCache?: boolean;
  cachePolicy?: 'immutable' | 'web' | 'cacheOnly';
  priority?: PriorityType;
  resizeMode?: ResizeModeType;
  onLoad?: () => void;
}

export const OptimizedFastImage: React.FC<EnhancedFastImageProps> = ({
  source,
  fallbackSource,
  placeholder,
  containerStyle,
  onLoadingStateChange,
  enableCache = true,
  cachePolicy = 'immutable',
  resizeMode = 'cover',
  priority = Priority.normal,
  style,
  onLoad,
  onError,
  onLoadStart,
  onLoadEnd,
  ...props
}) => {
  // Convert source to FastImage format
  const getFastImageSource = (src: string | { uri: string } | number) => {
    if (typeof src === 'string') {
      return { uri: src };
    }
    if (typeof src === 'object' && 'uri' in src) {
      return { uri: src.uri };
    }
    return src; // For require() sources
  };

  const handleLoadStart = () => {
    onLoadingStateChange?.(true);
    onLoadStart?.();
  };

  const handleLoad = () => {
    onLoadingStateChange?.(false);
    onLoad?.();
  };

  const handleLoadEnd = () => {
    onLoadingStateChange?.(false);
    onLoadEnd?.();
  };

  const handleError = () => {
    onLoadingStateChange?.(false);
    console.warn('FastImage load error');
    onError?.();
  };

  const imageSource = getFastImageSource(source);

  const content = (
    <FastImage
      source={imageSource}
      resizeMode={resizeMode}
      style={style}
      onLoadStart={handleLoadStart}
      onLoad={handleLoad}
      onLoadEnd={handleLoadEnd}
      onError={handleError}
      {...props}
    />
  );

  if (containerStyle || placeholder) {
    return <View style={containerStyle}>{content}</View>;
  }

  return content;
};

// Preloading utility
export const preloadImages = (urls: string[]): void => {
  const sources = urls.map((url) => ({
    uri: url,
  }));

  FastImage.preload(sources);
};

// Cache management utilities
export const clearImageCache = (): void => {
  FastImage.clearMemoryCache();
  FastImage.clearDiskCache();
};

export const clearMemoryCache = (): void => {
  FastImage.clearMemoryCache();
};

export const clearDiskCache = (): void => {
  FastImage.clearDiskCache();
};

// Default export for easy import
export default OptimizedFastImage;

// FastImage component with default optimization settings
export const CachedImage: React.FC<Omit<EnhancedFastImageProps, 'enableCache' | 'cachePolicy'>> = (
  props
) => <OptimizedFastImage {...props} enableCache={true} cachePolicy="immutable" />;

// High priority image for hero content
export const HeroCachedImage: React.FC<Omit<EnhancedFastImageProps, 'enableCache'>> = (props) => (
  <OptimizedFastImage {...props} priority={Priority.high} enableCache={true} />
);

// Thumbnail image with lower priority
export const ThumbnailImage: React.FC<Omit<EnhancedFastImageProps, 'resizeMode'>> = (props) => (
  <OptimizedFastImage {...props} priority={Priority.low} resizeMode="cover" />
);
