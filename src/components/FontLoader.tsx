import { useFonts } from 'expo-font';
import type React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useColors } from '~/theme';

interface FontLoaderProps {
  children: React.ReactNode;
}

export const FontLoader: React.FC<FontLoaderProps> = ({ children }) => {
  const colors = useColors();

  // Load the fonts with specific font family names
  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../src/assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('../../src/assets/fonts/Rubik-Medium.ttf'),
    'Rubik-SemiBold': require('../../src/assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Bold': require('../../src/assets/fonts/Rubik-Bold.ttf'),
  });

  // If fonts aren't loaded yet, show a loading screen
  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Fonts are loaded, render the app
  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
