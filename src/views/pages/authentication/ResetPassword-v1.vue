<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <b-overlay :show="show" rounded="sm">
        <!-- Reset Password v1 -->
        <b-card class="mb-0">
          <!-- logo -->
          <!-- logo -->
          <router-link class="brand-logo" :to="{ name: 'inicio-home' }">
            <b-img fluid :src="appLogoImage" alt="logo" />
          </router-link>
          <h3 class="text-center mb-1">Restablecer contraseña</h3>
          <b-card-text class="mb-2">
            Su nueva contraseña debe ser diferente de las contraseñas utilizadas anteriormente
          </b-card-text>          
          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form
              method="POST"
              class="auth-reset-password-form mt-2"
              @submit.prevent="validationForm"
            >
              <b-form-group
                label="correo electronico"
                label-for="register-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="register-email"
                    v-model="userEmail"
                    name="register-email"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Escribe tu correo electronico"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- password -->
              <b-form-group label-for="register-password" label="Contraseña">
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required|min:8"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false : null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group
                label-for="password_confirmation"
                label="Confirmar contraseña"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Confirmar contraseña"
                  vid="password_confirmation"
                  rules="required|confirmed:password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="password_confirmation"
                      v-model="password_confirmation"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false : null"
                      name="password_confirmation"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit button -->
              <b-button type="submit" variant="primary" block>
                Establecer nueva contraseña
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <b-link :to="{ name: 'auth-login' }">
              <feather-icon icon="ChevronLeftIcon" /> Volver al inicio de sesión
            </b-link>
          </b-card-text>
        </b-card>
        <!-- /Reset Password v1 -->
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import { $themeConfig } from '@themeConfig'
import {
  BCard,
  BCardTitle,
  BCardText,
  BForm,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BLink,
  BFormInput,
  BButton,
  BOverlay,
} from "bootstrap-vue";
import { required } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    VuexyLogo,
    BCard,
    BButton,
    BCardTitle,
    BCardText,
    BForm,
    BFormGroup,
    BInputGroup,
    BLink,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
    BOverlay,
  },
  mixins: [togglePasswordVisibility],
  setup(){
    const { appLogoImage } = $themeConfig.app;
    return{
      appLogoImage
    }
  },
  data() {
    return {
      userEmail: "",
      password_confirmation: "",
      password: "",
      // validation
      required,
      show: false,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.password1FieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },


  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          this.show = true;
          this.$http
            .post("/api/password/reset", {
              token: this.$route.query.token,
              email: this.userEmail,
              password: this.password,
              password_confirmation: this.password_confirmation,
            })
            .then((response) => {
              this.show = false;
              this.$router.push({ name: "auth-login" });
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: response.data.message,
                  icon: "EditIcon",
                  variant: "success",
                },
              });
            })
            .catch((error) => {
              this.show = false;
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: error.data.success.message,
                  icon: "EditIcon",
                  variant: "danger",
                },
              });
            });
        }
      });
    },
  },
};
</script>
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
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
