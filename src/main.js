import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

// 3rd party plugins
import "@axios";
import "@/libs/socialAuth";
import "@/libs/acl";

import "@/libs/toastification";
import "@/libs/vue-select";
import  "@/libs/map";
import "@/libs/portal-vue";
import setupInterceptors from  "@/libs/setupInterceptors";



// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)
// Composition API
// Vue.use(VueCompositionAPI);
require("@core/assets/fonts/feather/iconfont.css"); // For form-wizard
// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

setupInterceptors(store);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
