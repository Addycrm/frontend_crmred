<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <b-overlay :show="overlay" rounded="sm">
        <!-- Reset Password v1 -->
        <b-card class="mb-0">
          <!-- logo -->
          <router-link class="brand-logo" :to="{ name: 'inicio-home' }">
            <b-img fluid :src="appLogoImage" alt="logo" />
          </router-link>
          <div class="auth-login-form mt-2">
            <!-- email -->
            <h3 class="text-center mb-1">Revisa tu correo electrónico</h3>
            <b-card-text class="mb-2">
              Te enviamos un correo de reestablecimiento de contraseña.
            </b-card-text>
          </div>
          <b-card-text class="text-center mt-2">
            <b-link :to="{ name: 'auth-login' }">
              <feather-icon icon="ChevronLeftIcon" /> Volver al inicio de sesión
            </b-link>
          </b-card-text>
        </b-card>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { $themeConfig } from '@themeConfig'
export default {
  name: 'MessageEmail',
  setup(){
    const { appLogoImage } = $themeConfig.app;
    
    return{
      appLogoImage
    }
  },
}

</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";

</style>
<style>
.brand-logo img{
  width: 100%;
  max-width: 210px;
}
.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  border-radius: 20px;
  /* display:inline-block; */
}
.login {
  width: 200px;
  margin: auto;
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
  
</style>