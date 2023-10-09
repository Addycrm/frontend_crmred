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

          <!-- form -->
          <ValidationObserver v-slot="{ handleSubmit }">
            <b-form class="auth-login-form mt-2" @submit.prevent="handleSubmit(onSubmit)">
              <!-- email -->
              <h3 class="text-center mb-1">Registrarse</h3>
              <b-form-group label="Nombre de usuario" label-for="form-username">
                <ValidationProvider v-slot="{ errors, valid, invalid }" rules="required">
                  <b-form-input
                    id="form-username"
                    v-model="form.username"
                    name="form-username"
                    placeholder="Usuario"
                  />
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Registra un nombre de usuario
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>

              <b-form-group label="Correo electrónico" label-for="form-email">
                <ValidationProvider v-slot="{ errors }" rules="required|email">
                  <b-form-input
                    id="form-email"
                    v-model="form.email"
                    name="form-email"
                    placeholder="correo@empresa.com"
                  />
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Registra un correo electrónico valido
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>
              
              <!-- forgot password -->
              <b-form-group label="Contraseña" label-for="form-password">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="form-password"
                      v-model="form.password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="form-password"
                      placeholder="Contraseña"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Registra una contraseña
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>
              <b-form-group label="Confirmar contraseña" label-for="form-password-confirm">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="form-password-confirm"
                      v-model="form.password_confirmation"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="form-password-confirm"
                      placeholder="Confirmar contraseña"
                      @input="() => {password_confirmation = (form.password == form.password_confirmation)}"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <b-form-invalid-feedback :state="password_confirmation">
                    Confirma tu contraseña
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <ValidationProvider v-slot="{ errors, valid, invalid}" rules="required">
                  <b-form-checkbox id="register-privacy-policy" v-model="aceptar_condiciones" :unchecked-value="null" name="checkbox-1">
                    Acepto las 
                    <b-link :to="{ name: 'terminos' }" target="_blank" > política de privacidad y términos y condiciones</b-link>
                  </b-form-checkbox>
                  
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Debes acepto las política de privacidad y términos y condiciones
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block>
                Registrarse
              </b-button>
            </b-form>
          </ValidationObserver>
          <b-card-text class="text-center mt-2">
            <span>¿Ya tienes una cuenta?</span>
            <b-link :to="{ name: 'auth-login' }"><br>
              <span>¡Inciar sesión aqui!</span>
            </b-link>
          </b-card-text>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">Iniciar sesión con</div>
          </div>

          <div class="auth-footer-btn d-flex justify-content-center">
            <login-google></login-google>
          </div>

          <div class="mt-2">
            <center>
              <soporte-whatsapp />
            </center>
          </div>
        </b-card>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend, setInteractionMode } from "vee-validate";
import * as rules from 'vee-validate/dist/rules';

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import loginGoogle from "./components/LoginGoogle.vue";

import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import soporteWhatsapp from "../../componente/Soporte-whatsapp.vue";

import { $themeConfig } from '@themeConfig'

export default {
  components: {
    VuexyLogo,
    "soporte-whatsapp": soporteWhatsapp,
    "login-google": loginGoogle,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  setup(){
    const { appName, appLogoImage } = $themeConfig.app;
    
    return{
      appLogoImage
    }
  },
  provide(){
    return{
      overlay: (value) => {
        this.overlay = value;
      }
    }
  },
  data() {
    setInteractionMode('eager');
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    return {
      Politica: 'https://res.cloudinary.com/addycrm/image/upload/v1653001354/default/politica-de_privacidad-crmred_sj1vvu.pdf',
      TyC: '@/assets/docs/terminos-y-condiciones-crmred.pdf',
      form:{
        username: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      overlay: false,
      password_confirmation: true,
      aceptar_condiciones: null,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    onSubmit(){

      this.overlay = true;

      this.$http.post('/api/signup', this.form)
      .then(response => {

        this.$swal({
          title: "Registro exitoso",
          text: response.data.message,
          icon: "info",
          customClass: {
            confirmButton: "btn btn-info",
          },
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
        }).then((okay) => {
          
          if(okay)
            this.$router.push({ name: "auth-login" });

        });
        this.overlay = false;

      }).catch( error => {
        console.error('onSubmit', error);
        let _list = error.response.data.error;

        for(let i in _list){
          let timeout = 3000 * (Number(i) + 1);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Algo salio mal',
              icon: '',
              text: _list[i],
              variant: "danger",
            },
          },{timeout});
        }

        this.overlay = false;
      })
    }
  },
}
/* eslint-disable global-require */
</script>
<style lang="css" scoped>
  .brand-logo img{
    width: 100%;
    max-width: 210px;
  }
  .swal2-html-container {line-height: 1.6;}
</style>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
