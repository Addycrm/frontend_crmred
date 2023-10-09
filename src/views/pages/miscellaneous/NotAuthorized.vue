<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <b-card class="mb-0">
        <!-- logo -->
        <router-link class="brand-logo" :to="{ name: 'inicio-home' }">
          <b-img fluid :src="appLogoImage" alt="logo" />
        </router-link>
        <b-card-text class="text-center mt-2">
          <h3 class="text-center mb-1">
            ¡Acceso no autorizado!
          </h3>
          <div class="mb-2 text-warning">
            <feather-icon size="4x" icon="AlertCircleIcon" />
          </div>
          <p class="mb-2">
            No tienes autorizacion para acceder a este lugar!!!
          </p>
          <router-link class="btn btn-warning" :to="{name: 'dashboard-agente'}">
            Volver al inicio
          </router-link>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
  import { $themeConfig } from '@themeConfig'
  import store from '@/store/index'

  export default {
    setup(){
      const { appLogoImage } = $themeConfig.app;
      return{
        appLogoImage
      }
    }
  }
</script>
<style lang="css" scoped>
  .brand-logo img{
    width: 100%;
    max-width: 210px;
  }
</style>
<style lang="scss">
  @import "@core/scss/vue/pages/page-auth.scss";
</style>
