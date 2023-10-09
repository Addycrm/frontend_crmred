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
              <h3 class="text-center mb-1">¿Olvidaste la contraseña?</h3>
              <b-card-text class="mb-2">
                Por favor, ingresa el correo electrónico con el cual te
                registraste, enviaremos un mensaje de recuperación
              </b-card-text>
              <b-form-group label="Correo electrónico" label-for="forgot-password-email">
                <ValidationProvider v-slot="{ errors }" rules="required|email">
                  <b-form-input
                      id="forgot-password-email"
                      v-model="userEmail"
                      name="forgot-password-email"
                      placeholder="john@example.com"
                    />
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Registra un correo electrónico valido
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>
              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block>
                Iniciar sesión
              </b-button>
            </b-form>
          </ValidationObserver>
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
import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from "vee-validate";
import * as rules from 'vee-validate/dist/rules';
import { required, email } from "@validations";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { $themeConfig } from '@themeConfig'
export default {
  data() {
    setInteractionMode('eager');
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    return {
      userEmail: null,
      required,
      email,
      overlay: false
    };
  },
  setup(){
    const { appName, appLogoImage } = $themeConfig.app;
    
    return{
      appLogoImage
    }
  },
  components:{
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    onSubmit() {
      this.overlay = true;
      this.$http.post("/api/password/email", {
        email: this.userEmail,
      }).then((response) => {
        this.overlay = false;
        this.$swal({
          title: "Correo de confirmación enviado!!!",
          text: response.data.message,
          icon: "info",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
        }).then((okay) => {
          if (okay) {
            this.$router.push({ name: "message-reestablecer" });
          }
        });
      }).catch((error) => {
        this.overlay = false;
        this.$swal({
          title: "Tu correo no existe!!!",
          text: error.response.data.message,
          icon: "info",
          customClass: {
            confirmButton: "btn btn-danger",
          },
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
        })
      });
    },
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
