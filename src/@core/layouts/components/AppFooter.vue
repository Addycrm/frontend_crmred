<template>
    <p class="clearfix mb-0">
      <span class="float-md-left d-block d-md-inline-block mt-25">
        COPYRIGHT  © {{ new Date().getFullYear() }}
        <b-link
          class="ml-25"
          href="https://crmred.co"
          target="_blank"
        >{{ appName }}</b-link>
        <span class="d-none d-sm-inline-block">, Derechos reservados</span>
      </span>
      <b-link href="https://wa.link/hl3jes" target="_blank">
      <span class="float-md-right d-none d-md-block">Soporte
        <feather-icon
          icon="SettingsIcon"
          size="21"
          class="text-primary stroke-current"
        />
      </span>
      </b-link>
    </p>
  </template>

  <script>
  import { BLink } from 'bootstrap-vue'

  export default {
    components: {
      BLink,
    },

    setup() {
        const { appName, appLogoImage } = $themeConfig.app;

        return {
            appLogoImage,
            appName
        }
    },
  }
  </script>
