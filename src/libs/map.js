import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.MIX_API_GOOGLE_KEY_MAP,
    libraries: 'places',
    installComponents: false,

  }
});