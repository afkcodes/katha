import { StateNavigator } from 'navigation';
import { NavigationHandler } from 'navigation-react';
import { NavigationStack, Scene } from 'navigation-react-native';
import React from 'react';
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontLoader } from '~/components';
import '~/i18n'; // Initialize i18n
import Tabs from '~/navigation/Tabs';
import { ReactQueryProvider } from '~/providers/ReactQueryProvider';
import { ThemeProvider, useTheme } from '~/theme';

const baseNavigator = new StateNavigator([{ key: 'base' }]);

const AppContent = () => {
  const { isDark } = useTheme();

  return (
    <>
      <SystemBars style={isDark ? 'light' : 'dark'} />
      <NavigationHandler stateNavigator={baseNavigator}>
        <NavigationStack>
          <Scene stateKey="base">
            <Tabs />
          </Scene>
        </NavigationStack>
      </NavigationHandler>
    </>
  );
};

const App = () => {
  return (
    <ReactQueryProvider>
      <ThemeProvider initialTheme="auto">
        <SafeAreaProvider>
          <FontLoader>
            <AppContent />
          </FontLoader>
        </SafeAreaProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};

export default App;
