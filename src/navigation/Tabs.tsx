import { StateNavigator } from 'navigation';
import { NavigationHandler } from 'navigation-react';
import {
  CoordinatorLayout,
  NavigationBar,
  NavigationStack,
  Scene,
  TabBar,
  TabBarItem,
} from 'navigation-react-native';

import { useI18n } from '~/i18n/useI18n';
import Bhajan from '~/screens/bhajans';
import Home from '~/screens/home';
import Settings from '~/screens/settings';

import { useColors } from '~/theme';

const homeNavigator = new StateNavigator([{ key: 'home' }]);
const settingsNavigator = new StateNavigator([{ key: 'settings' }]);
const BhajanNavigator = new StateNavigator([{ key: 'bhajan' }]);

const Tabs = () => {
  const colors = useColors();
  const { t } = useI18n();
  return (
    <CoordinatorLayout>
      <NavigationBar hidden={true} />
      <TabBar
        primary={true}
        bottomTabs={true}
        barTintColor={colors.background}
        activeIndicatorColor={`${colors.primary}40`}
        unselectedTintColor={colors.textSecondary}
        selectedTintColor={colors.primary}
        rippleColor={`${colors.primary}10`}
        preventFouc={true}
        labelVisibilityMode="labeled"
      >
        <TabBarItem
          title={t('navigation.home')}
          image={require('../assets/navigation/home.png')}
          fontFamily="Rubik"
          fontSize={16}
          fontWeight="bold"
        >
          <NavigationHandler stateNavigator={homeNavigator}>
            <NavigationStack>
              <Scene stateKey="home">
                <Home />
              </Scene>
            </NavigationStack>
          </NavigationHandler>
        </TabBarItem>
        <TabBarItem
          title={t('navigation.bhajans')}
          image={require('../assets/navigation/calender.png')}
          fontFamily="Rubik"
          fontSize={16}
          fontWeight="bold"
        >
          <NavigationHandler stateNavigator={BhajanNavigator}>
            <NavigationStack>
              <Scene stateKey="bhajan">
                <Bhajan />
              </Scene>
            </NavigationStack>
          </NavigationHandler>
        </TabBarItem>

        <TabBarItem
          title={t('navigation.settings')}
          image={require('../assets/navigation/settings.png')}
          fontFamily="Rubik"
          fontSize={16}
          fontWeight="bold"
        >
          <NavigationHandler stateNavigator={settingsNavigator}>
            <NavigationStack>
              <Scene stateKey="settings">
                <Settings />
              </Scene>
            </NavigationStack>
          </NavigationHandler>
        </TabBarItem>
      </TabBar>
    </CoordinatorLayout>
  );
};

export default Tabs;
