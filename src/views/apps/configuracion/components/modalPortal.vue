<template>
  <ValidationObserver ref="modal">
    <b-form @submit="onSubmit">
      <b-row
        v-if="prop.slug == 'fincaraiz' && prop.state == 'active'"
        ref="fincaraiz"
      >
        <b-col>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Email" class="required">
              <b-form-input v-model="form.email" trim></b-form-input>
              <b-form-invalid-feedback :state="!(errors.length > 0)">
                Debes registrar el Email de tu portal
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Contraseña" class="required">
              <b-form-input v-model="form.user" trim></b-form-input>
              <b-form-invalid-feedback :state="!(errors.length > 0)">
                Debes registrar la contraseña de tu portal
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <!-- <b-col cols="12">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Token" class="required">
              <b-form-input v-model="form.token" trim></b-form-input>
            <b-form-invalid-feedback :state="!(errors.length > 0)">
              Debes registrar el Token de tu portal
            </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col> -->
      </b-row>
      <b-row
        v-if="prop.slug == 'clasificados_el_pais' && prop.state == 'active'"
        ref="clasificados-el-pais"
      >
        <b-col>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Codigo cliente(CustomerId)" class="required">
              <b-form-input v-model="form.username" trim></b-form-input>
              <b-form-invalid-feedback :state="!(errors.length > 0)">
                Debes registrar el codigo del cliente de tu portal
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <!-- <b-col>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Contraseña" class="required">
              <b-form-input v-model="form.password" trim type="password"></b-form-input>
            <b-form-invalid-feedback :state="!(errors.length > 0)">
              Debes registrar la Contraseña de tu portal
            </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col> -->
        <!-- <b-col cols="12">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Token" class="required">
              <b-form-input v-model="form.authorization" trim></b-form-input>
            <b-form-invalid-feedback :state="!(errors.length > 0)">
              Debes registrar el Token de tu portal
            </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col> -->
      </b-row>
      <b-row
        v-if="prop.slug == 'metro_cuadrado' && prop.state == 'active'"
        ref="metro-cuadrado"
      >
        <b-col>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Nombre de usuario" class="required">
              <b-form-input v-model="form.username" trim></b-form-input>
              <b-form-invalid-feedback :state="!(errors.length > 0)">
                Debes registrar el Nombre de usuario de tu portal
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Contraseña" class="required">
              <b-form-input
                v-model="form.password"
                trim
                type="password"
              ></b-form-input>
              <b-form-invalid-feedback :state="!(errors.length > 0)">
                Debes registrar la Contraseña de tu portal
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col cols="12">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Token (Client ID)" class="required">
              <b-form-input v-model="form.client_id" trim></b-form-input>
              <b-form-invalid-feedback :state="!(errors.length > 0)">
                Debes registrar el Token de tu portal
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col cols="12">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="X API KEY" class="required">
              <b-form-input v-model="form.xapikey" trim></b-form-input>
              <b-form-invalid-feedback :state="!(errors.length > 0)">
                Debes registrar el X API KEY de tu portal
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
      </b-row>
      <b-row
        v-if="prop.slug == 'ciencuadras' && prop.state == 'active'"
        ref="ciencuadras"
      >
        <b-col>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Nombre de usuario" class="required">
              <b-form-input v-model="form.username" trim></b-form-input>
              <b-form-invalid-feedback :state="!(errors.length > 0)">
                Debes registrar el Nombre de usuario de tu portal
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Contraseña" class="required">
              <b-form-input
                v-model="form.password"
                type="password"
                trim
              ></b-form-input>
              <b-form-invalid-feedback :state="!(errors.length > 0)">
                Debes registrar la Contraseña de tu portal
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
      </b-row>
      <b-row
        v-if="prop.slug == 'mercado_libre' && prop.state == 'active'"
        ref="mercado_libre"
      >
        <b-col ms="12" lg="6" xl="6">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Correo Electrónico" class="required">
              <b-form-input
                v-model="form.email"
                trim
                :state="errors.length > 0 ? false : null"
              />
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col ms="12" lg="6" xl="6">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Contraseña" class="required">
              <b-form-input
                v-model="form.password"
                trim
                :state="errors.length > 0 ? false : null"
              />
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col ms="12" lg="6" xl="6">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Cliente codigo(client_id)">
              <b-form-input
                v-model="form.client_id"
                trim
                :state="errors.length"
              >
              </b-form-input>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col ms="12" lg="6" xl="6">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Secreto del cliente(client_secret)">
              <b-form-input
                v-model="form.client_secret"
                trim
                :state="errors.length"
              >
              </b-form-input>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col ms="12" lg="6" xl="6">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Redirigir uri(redirect_uri)">
              <b-form-input
                v-model="form.redirect_uri"
                trim
                :state="errors.length"
              >
              </b-form-input>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col ms="12" lg="6" xl="6">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <b-form-group label="Codigo(code)">
              <b-form-input
                v-model="form.code"
                trim
                :state="errors.length"
              >
              </b-form-input>
            </b-form-group>
          </ValidationProvider>
        </b-col>
      </b-row>
    </b-form>
  </ValidationObserver>
</template>
<script>
import {
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
  extend,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  name: "modalPortal",
  inject: ["overlay", "closeModal"],
  props: {
    prop: Object,
  },
  data() {
    setInteractionMode("eager");
    Object.keys(rules).forEach((rule) => {
      extend(rule, rules[rule]);
    });
    return {
      form: {
        user_id: null,
        portale_id: null,

        email: null,
        user: null,
        token: null,
        username: null,
        password: null,
        authorization: null,
        client_id: null,
        xapikey: null,
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  mounted() {
    this.overlay();
    const { id, slug } = this.prop;

    Object.assign(this.form, {
      portale_id: id,
    });

    let tokens = { portal: id },
      api = "";
    switch (slug) {
      case "fincaraiz":
        api = "credential";
        break;
      case "clasificados_el_pais":
        api = "credenciales_clasificados_pais";
        break;
      case "metro_cuadrado":
        api = "credenciales_metro_cuadrado";
        break;
      case "ciencuadras":
        api = "credenciales_ciencuadra";
        break;
      case "mercado_libre":
        api = "credenciales/mercadolibre";
        break;
    }
    Object.assign(tokens, { api });
    this.getCredentialPortal(tokens);
  },
  methods: {
    async getCredentialPortal(tokens) {
      await this.$store
        .dispatch("appPortales/getTokensPortales", tokens)
        .then((response) => {
          Object.assign(this.form, response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onSubmit() {
      let { slug } = this.prop;
      let api = "";

      switch (slug) {
        case "fincaraiz":
          api = "credenciales_portal";
          break;
        case "clasificados_el_pais":
          api = "credenciales_regster_portal_clasificados_portal";
          break;
        case "metro_cuadrado":
          api = "credenciales_regster_portal_metro_cuadrado";
          break;
        case "ciencuadras":
          api = "credenciales_regster_portal_ciencuadra";
        case "mercado_libre":
          api = "credenciales/mercadolibre";
          break;
      }

      let portal = {};

      for (let prop in this.form)
        if (this.form[prop])
          Object.assign(portal, {
            [prop == "portale_id" ? "portal" : prop]: this.form[prop],
          });

      return new Promise((resolve) => {
        this.$refs["modal"].validate().then((state) => {
          if (state) {
            this.$store
              .dispatch("appPortales/addTokensPortalesUser", { portal, api })
              .then((res) => {
                this.$toast({
                  component: ToastificationContent,
                  position: "top-center",
                  props: {
                    title: "Credenciales guardadas",
                    icon: "CheckCircleIcon",
                    variant: "success",
                    text: "Tu credenciales fueron guardadas exitosamente",
                  },
                });
                resolve(true);
              })
              .catch((err) => {
                this.$toast({
                  component: ToastificationContent,
                  position: "top-center",
                  props: {
                    title: "Algo salio mal",
                    icon: "AlertCircleIcon",
                    variant: "danger",
                    text: "No se lograron guardar tus credenciales, intentalo mas tarde o comunicate con nuestro equipo de soporte al cliente",
                  },
                });
                resolve(false);
              });
          } else {
            resolve(state);
          }
        });
      });
    },
  },
};
</script>

<style lang="css" scoped>
</style>
