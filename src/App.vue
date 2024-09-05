<template>
    <div id="app" class="h-100" :class="[skinClasses]">
      <b-overlay :show="portal.overlay" no-wrap fixed :z-index="9999" />
      <component :is="layout">
        <router-view />
      </component>
      <a
        href="mailto:soporte@homiup.com"
        class="float"
        target="_blank"
        v-b-tooltip.hover title="Soporte técnico!"
      >
        <img width="50px" height="50px" src="@/assets/images/mailIcon.svg" alt="Soporte técnico" class="image_support">
      </a>

      <scroll-to-top v-if="enableScrollToTop" />
    </div>
  </template>

  <script>
  import ScrollToTop from "@core/components/scroll-to-top/ScrollToTop.vue";

  // This will be populated in `beforeCreate` hook
  import { $themeColors, $themeBreakpoints, $themeConfig } from "@themeConfig";
  import { provideToast } from "vue-toastification/composition";
  import useAppConfig from "@core/app-config/useAppConfig";

  import { useWindowSize, useCssVar } from "@vueuse/core";
  import { BAvatar } from "bootstrap-vue";

  import store from "@/store";
  import { watch } from "@vue/composition-api";


  const LayoutVertical = () => import("@/layouts/vertical/LayoutVertical.vue");
  const LayoutHorizontal = () =>
  import("@/layouts/horizontal/LayoutHorizontal.vue");
  const LayoutFull = () => import("@/layouts/full/LayoutFull.vue");

  import {axiosIns, axiosToken} from '@/libs/axios'
  import axiosInterceptors from '@/libs/axiosInterceptors'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';


  export default {
    mounted(){
      window.onresize = (a) => {
        this.$store.commit('appConfiguracion/WINDOW_RESIZE', window.innerWidth);
      }

      axiosInterceptors(axiosIns, axiosToken)
      .catch(error => {
        let keys = ['userData', 'accessToken', 'refreshToken'];
        for(let key of keys)
          localStorage.removeItem(key);

        this.$router.push({ name: "auth-login" });
        this.$toast({
          component: ToastificationContent,
          props: {
            title: "Sesión Caducada",
            icon: "AlertCircleIcon",
            text: 'Tu sesión ha caducado',
            variant: "info"
          }
        });
      });
    },
    name: 'App',
    data(){
      return {
        show: false
      }
    },
    components: {
      LayoutHorizontal,
      LayoutVertical,
      LayoutFull,
      ScrollToTop,
      BAvatar,
    },
    // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
    // Currently, router.currentRoute is not reactive and doesn't trigger any change
    watch:{
      '$route': (a) => {
        let vModal = document.querySelectorAll('.vModal');
        if(vModal.length > 0){
          vModal.forEach(item => {
            item.remove();
          });
        }
      }
    },
    computed: {
      layout() {
        if (this.$route.meta.layout === "full") return "layout-full";
        return `layout-${this.contentLayoutType}`;
      },
      contentLayoutType() {
        return this.$store.state.appConfig.layout.type;
      },
      portal(){
        return this.$store.state.appPortales;
      }
    },
    beforeCreate() {

      // Set colors in theme
      const colors = [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "light",
        "dark",
      ];

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = colors.length; i < len; i++) {
        $themeColors[colors[i]] = useCssVar(
          `--${colors[i]}`,
          document.documentElement
        ).value.trim();
      }

      // Set Theme Breakpoints
      const breakpoints = ["xs", "sm", "md", "lg", "xl"];

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = breakpoints.length; i < len; i++) {
        $themeBreakpoints[breakpoints[i]] = Number(
          useCssVar(
            `--breakpoint-${breakpoints[i]}`,
            document.documentElement
          ).value.slice(0, -2)
        );
      }

      // Set RTL
      const { isRTL } = $themeConfig.layout;
      document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    },
    setup() {
      const { skin, skinClasses } = useAppConfig();
      const { enableScrollToTop } = $themeConfig.layout;

      // If skin is dark when initialized => Add class to body
      if (skin.value === "dark") document.body.classList.add("dark-layout");

      // Provide toast for Composition API usage
      // This for those apps/components which uses composition API
      // Demos will still use Options API for ease
      provideToast({
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
        icon: false,
        timeout: 3000,
        transition: "Vue-Toastification__fade",
      });

      // Set Window Width in store
      store.commit("app/UPDATE_WINDOW_WIDTH", window.innerWidth);
      const { width: windowWidth } = useWindowSize();
      watch(windowWidth, (val) => {
        store.commit("app/UPDATE_WINDOW_WIDTH", val);
      });

      if(!localStorage.getItem('ui-setting')){
        localStorage.setItem('ui-setting', JSON.stringify({
          listStyle: 'list'
        }));
      }

      return {
        skinClasses,
        enableScrollToTop,
      };
    },
  };
  </script>
  <style>
  :root{
    --primary:#7367f0;
  }

  ul{
    margin: 0;
    padding: 0;
  }

  li{
    list-style: none;
  }

  .input-tel.has-error:not(.is-valid) .input-tel__input {
    background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23ea5455' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23ea5455' stroke='none'/%3e%3c/svg%3e") right 10px center / 16.3px no-repeat;
  }
  .form-group.is-invalid .v-select .vs__dropdown-toggle {
    background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23ea5455' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23ea5455' stroke='none'/%3e%3c/svg%3e") right 25px center / 16.3px no-repeat;
  }
  .form-group.required .col-form-label::after {content: '*';margin-left: 6px;color: red;}
  .float {
    position: fixed;
    width: 40px;
    height: 40px;
    bottom: 40px;
    right: 20px;
    background-color: #fff;
    border-radius: 50%;
    background-clip: content-box;
    text-align: center;
    font-size: 30px;
    z-index: 1100;
  }
  .image_support{
    animation: rotation 4s infinite linear;
  }
  .image_support:hover{
    animation: rotation 0s infinite linear;
  }


  @keyframes rotation {
      from {
          transform: rotate(0deg);
      }
      to {
          transform: rotate(359deg);
      }
  }

  .my-float {
    margin-top: 16px;
  }

  .content-body {
    display: flex;
    flex-direction: column;
  }
  ::-webkit-scrollbar{
    width: 8px;
    height: 8px;
  }
  /* Track */
  ::-webkit-scrollbar-track{
    background: #00000026;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb{
    background: #00000026;
    border-radius: 10px;
  }
  hr {
    border-top: 1px solid #000!important;
    opacity: 0.08;
  }
  .swal2-title {
    font-size: 22px;
  }

  .swal2-html-container {
    font-size: 15px;
    line-height: 1.6;
  }
  .bar-sticky-top, .bar-sticky-footer{
      background: #fff;
      position: sticky;
      z-index: 9;
  }
  .bar-sticky-top{
      top: 80.6px;
  }
  .bar-sticky-footer{
      bottom: 0;
  }
  .is-invalid .ql-toolbar.ql-snow,
  .is-invalid .quill-editor .ql-container {
    border-color: red!important;
  }

  .vs__selected-options{
    width: 1px;
  }
  .vs--single .vs__selected{
    position: absolute;
    inset: 0;
  }
  .vs__selected {
    line-height: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block!important;
  }

  /* ESTILO DEL AUTOCOMPLETADO MAPA */
  div.pac-container {
    z-index: 1050 !important;
  }
  .pac-container {
      background-color: #FFF;
      z-index: 20 !important;
      position: fixed;
      display: inline-block;
      float: left;
  }
  .modal{
      z-index: 20;
  }
  .modal-backdrop{
      z-index: 10;
  }

  /* */​
  .vs__deselect {
    vertical-align: middle;
  }

  /* ESTILO DEL AUTOCOMPLETADO MAPA */
  div.pac-container {
    z-index: 1050 !important;
  }
  .pac-container {
      background-color: #FFF;
      z-index: 20 !important;
      position: fixed;
      display: inline-block;
      float: left;
  }
  .modal{
      z-index: 20;
  }
  .modal-backdrop{
      z-index: 10;
  }

  /* */

  @media (max-width: 576px){
    .vgt-compact td {
      display:flex!important;
      justify-content:space-between;
      align-items:center;
    }
  }

  </style>
  <style lang="scss" id="styleApp">
    @import "@core/scss/vue/libs/quill.scss";
    @import "@core/scss/vue/libs/vue-flatpicker.scss";
    @import "@core/scss/vue/libs/vue-select.scss";
    @import "@core/scss/vue/libs/vue-wizard.scss";
    @import '@core/scss/vue/libs/vue-good-table.scss';
  </style>
