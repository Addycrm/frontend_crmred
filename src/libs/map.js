import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { HELPERS } from './helpers';


Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: HELPERS.MIX_API_GOOGLE_KEY_MAP,
    libraries: 'places',
    installComponents: false,

  }
});
