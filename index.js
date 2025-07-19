import 'react-native-url-polyfill/auto';
import 'web-streams-polyfill';
import 'event-target-polyfill';
import 'text-encoding-polyfill';
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
