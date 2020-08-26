import { Promise } from 'uikit/src/js/util';
import polyfills from './polyfills';

// Import base
import UIkit from './base/uikit';

// Components
import googleMaps from './components/toolbox-google-maps';

// Import Modules

const app = () => {
  // Make UIkit accessible via browser console
  global.UIkit = UIkit;

  // Components
  UIkit.component('googlemap', googleMaps);

  // Modules
};

// Load polyfills first, then start the application
Promise.all(polyfills).then(app);
