.<template>
  <div class="auth-wrapper auth-v1 px-8">
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
              <h3 class="text-center mb-1">Acceder</h3>
              <b-form-group label="Correo electrónico" label-for="login-email">
                <ValidationProvider v-slot="{ errors }" rules="required|email">
                  <b-form-input
                    id="login-email"
                    v-model="login.email"
                    name="login-email"
                    placeholder="correo@empresa.com"
                    trim
                  />
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Registra un correo electrónico valido
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group label="Contraseña" label-for="login-password">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="login-password"
                      v-model="login.password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Contraseña"
                      trim
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <b-link :to="{ name: 'auth-forgot-password' }">
                    <small>Olvidaste tu contraseña?</small>
                  </b-link>
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Registra una contraseña
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox id="remember-me" v-model="status" name="login">
                  Mantener sesión abierta
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block>
                Iniciar sesión
              </b-button>
            </b-form>
          </ValidationObserver>
          <b-card-text class="text-center mt-2">
            <span>¿No tienes cuenta? </span>
            <b-link :to="{ name: 'auth-register' }">
              <span>Registrarme</span>
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
    <div class="logoLogin">
      <img :src="banner" alt="">
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from "vee-validate";
import * as rules from 'vee-validate/dist/rules';

import VuexyLogo from "@core/layouts/components/Logo.vue";
// import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import mixinUserdata from "@/views/pages/authentication/mixinUserdata";
import store from "@/store/index";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import soporteWhatsapp from "../../componente/Soporte-whatsapp.vue";
import loginGoogle from "./components/LoginGoogle.vue";
import { HELPERS } from "@/libs/helpers.js";
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    VuexyLogo,
    "soporte-whatsapp": soporteWhatsapp,
    "login-google": loginGoogle,
    ValidationProvider,
    ValidationObserver,
  },

  mixins: [togglePasswordVisibility, mixinUserdata],
  setup(){
    const { appName, appLogoImage } = $themeConfig.app;

    return{
      appLogoImage
    }
  },
  data(){
    setInteractionMode('eager');
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    return {

      login:{
        email: null,
        password: null,
      },
      overlay: false,
      status: "",
      isConnected: false,
      name: "",
      email: "",
      personalID: "",
      picture: "",
      banner: require("@/assets/images/logo_paises/chile.png"),

      sideImg: require("@/assets/images/pages/login.svg"),
      imageLogo: require("@/assets/images/logo/logo_crmred.png"),
    };
  },
  provide(){
    return{
      overlay: (value) => {
        this.overlay = value;
      }
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },

    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    async onSubmit(){
      this.overlay = true;
      await this.$http.post(HELPERS.URL_API + '/api/login', this.login)
      .then(async response => {
        const { token } = response.data;

        Object.assign(localStorage,{
          accessToken: token.access_token,
          refreshToken: token.refresh_token
        });

        await this.setUserData()
        .then(async (userData) => {
          await this.$router.replace(getHomeRouteForLoggedInUser(userData.role.slug))
          .then(() => {
            this.overlay = false;
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Bienvenido',
                icon: "CheckCircleIcon",
                text: userData.username,
                variant: "success",
              }
            });
          });
        }).catch(error => {
          console.error(error);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Algo salio mal',
              icon: "AlertCircleIcon",
              text: 'Si el problema persiste recarga la pagina o comunica con soporte',
              variant: "danger",
            },
          });
        });
      }).catch(async error => {
        console.error(error);
        let {data} = error.response;
        await this.$swal({
          title: 'Alerta de verificación',
          text: data.errorMessage,
          icon: data.status === 404 ? 'info' : "warning",
          showDenyButton: data.status === 404,
          showConfirmButton: data.status !== 404,
          customClass: {
            denyButton: "btn btn-info",
            confirmButton: "btn btn-warning",
          },
          confirmButtonText: "Cerrar",
          denyButtonText: 'Registrarme',
          buttonsStyling: false,
        }).then(result =>{
          if(result.isDenied)
            this.$router.replace({path: '/register'})
        })
        this.overlay = false;
      });
    }
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";

</style>
<style lang="css" scoped>
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

.logoLogin{
  display: none;
  transition: all 0.3s ease-in-out;
}
.logoLogin img{
  transition: all 0.3s ease-in-out;
}

@media screen and (min-width: 820px) {
  .auth-wrapper{
  justify-content: center;
  gap: 20px;
}
  .auth-inner{
    width: 44%;
  }

  .logoLogin{
  display: block;
  width: 80%;
  height: 100%;
  padding-bottom: 252px;
}
.logoLogin img{
  width: 100%;
  object-fit: cover;
}

}
@media screen and (min-width: 930px) {
  .auth-wrapper{
  gap: 54px;
  }
  .auth-inner{
    width: 38%;
  }
  .logoLogin{
    width: 50%;
  }
}
@media screen and (min-width: 1150px) {
  .auth-wrapper{
    gap: 54px;
  }
  .auth-inner{
    width: 30%;
  }
  .logoLogin{
    width: 44%;
    padding-bottom: 180px;
  }
}

</style>
