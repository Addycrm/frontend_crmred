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
            Verifica tu Correo Electrónico
          </h3>
          <p>{{message}}</p>
          <router-link class="btn btn-primary" :to="{name: 'auth-login'}">
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
    },
    data(){
      return {
        message: ''
      }
    },
    beforeMount(){
      if(Object.keys(this.$route.query).length)
        this.$http.get("/api/email-verification", {
          params: this.$route.query,
        }).then(res => {
          this.message = res.data.message
        }).catch(err => {
          console.error(err)
        });
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