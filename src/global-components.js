import Vue from "vue";

import FeatherIcon from "@core/components/feather-icon/FeatherIcon.vue";
Vue.component(FeatherIcon.name, FeatherIcon);

import VuePhoneNumberInput from "vue-phone-number-input";
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
Vue.component("vue-phone-number-input", VuePhoneNumberInput);

import VueSocialSharing from "vue-social-sharing";
Vue.component("VueSocialSharing", VueSocialSharing);

import VueFlatPickr from 'vue-flatpickr-component';
Vue.use(VueFlatPickr)

// import VueSweetalert2 from 'vue-sweetalert2';
// Vue.use(VueSweetalert2);

import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)

Vue.filter('precio', (value) => {
  if(['', null, undefined].indexOf(value) === -1){

    let precio = parseInt(value),
        divisa = Intl.NumberFormat("es-CO");
        precio = divisa.format(precio);
    return `$ ${precio} COP`;
  }
});

Vue.filter('urlImages', (value) => {
  if(['', null, undefined].indexOf(value) === -1){
    let url = value.split('/');
    url = url.pop();
    url = url.split('.');
    url.pop();
    url = url.join('.');

    let urlFolder = ['default/', 'inmuebles/', 'users/', 'portales/', 'blogs/', 'empresas/', 'mercadeo/'],
        folder = '';
    for(let _item of urlFolder){
      if(value.indexOf(_item) != -1){
        folder = _item;
      }
    }

    return folder + url;
  }
});

Vue.filter('layerImages', (value) => {
  if(['', null, undefined].indexOf(value) === -1){
    let url = value.split('/');
    url = url.pop();
    url = url.split('.');
    url.pop();
    url = url.join('.');

    let urlFolder = ['default/', 'inmuebles/', 'users/', 'portales/', 'blogs/', 'empresas/', 'mercadeo/'],
        folder = '';
    for(let _item of urlFolder){
      if(value.indexOf(_item) != -1){
        folder = _item;
      }
    }
    return folder.replace('/', ':') + url;
  }
});

Vue.filter('first', (value) => {
  if(['', null, undefined].indexOf(value) === -1){
    let x = value.split(' ');
    x = x.shift();

    return x.trim();
  }
});
