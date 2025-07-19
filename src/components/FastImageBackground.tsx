import type React from 'react';
import { View, type ViewStyle } from 'react-native';
import { HeroCachedImage, Priority, type PriorityType } from './OptimizedFastImage';

interface FastImageBackgroundProps {
  source: string | { uri: string } | number;
  style?: ViewStyle;
  children?: React.ReactNode;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  priority?: PriorityType;
  onLoadStart?: () => void;
  onLoad?: () => void;
  onLoadEnd?: () => void;
  onError?: () => void;
  onLoadingStateChange?: (loading: boolean) => void;
}

export const FastImageBackground: React.FC<FastImageBackgroundProps> = ({
  source,
  style,
  children,
  resizeMode = 'cover',
  priority = Priority.normal,
  onLoadStart,
  onLoad,
  onLoadEnd,
  onError,
  onLoadingStateChange,
}) => {
  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <HeroCachedImage
        source={source}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
        resizeMode={resizeMode}
        priority={priority}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onLoadEnd={onLoadEnd}
        onError={onError}
        onLoadingStateChange={onLoadingStateChange}
      />
      {children}
    </View>
  );
};

export default FastImageBackground;
