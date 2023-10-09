<template>
  <b-modal
    :id="infoModal.id"
    size="lg"
    ref="modal-user-view"
    title="Ver Usuario"
    hide-footer
  >
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <b-col md="6">
            <b-form-group label="Nombre" label-for="nombre">
              <b-form-input
                v-model="infoModal.content.primer_nombre"
                readonly
                placeholder="Tu nombre"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <b-form-group label="E-mail" label-for="email">
                <b-form-input
                  v-model="infoModal.content.email"
                  readonly
                  type="email"
                  placeholder="Your Email"
                />
              </b-form-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <b-form-group label="Direccion" label-for="direccion-modal">
                <b-form-input
                  v-model="infoModal.content.direccion_persona"
                  type="text"
                  placeholder=""
                  readonly
                />
              </b-form-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="Celular"
              rules="required"
            >
              <b-form-group label="Celular" label-for="celular">
                <vue-phone-number-input
                  default-country-code="CO"
                  :translations="{
                    countrySelectorLabel: 'Codigo pais',
                    countrySelectorError: 'Choisir un pays',
                    phoneNumberLabel: 'Numéro de celular',
                    example: 'Ejemplo:',
                  }"
                  v-model="infoModal.content.celular_movil"
                  @update="results = $event"
                  disabled
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="Whatsapp"
              rules="required"
            >
              <b-form-group label="WhatsApp" label-for="WhatsApp">
                <vue-phone-number-input
                  default-country-code="CO"
                  :translations="{
                    countrySelectorLabel: 'Codigo pais',
                    countrySelectorError: 'Choisir un pays',
                    phoneNumberLabel: 'Numéro de whatsapp',
                    example: 'Ejemplo:',
                  }"
                  v-model="infoModal.content.celular_whatsapp"
                  @update="results = $event"
                  disabled
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="Rol del usuario"
              rules="required"
            >
              <b-form-group
                label="Role"
                label-for="user-role-modal"
                :state="errors.length > 0 ? false : null"
              >
                <v-select
                  v-model="infoModal.content.roles"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="roles"
                  label="nombre"
                  :reduce="(val) => val.id"
                  :clearable="false"
                  input-id="user-role-modal"
                  disabled
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Plan -->
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="Country"
              rules="required"
            >
              <b-form-group
                label="Pais"
                label-for="country-modal"
                :state="errors.length > 0 ? false : null"
              >
                <v-select
                  v-model="infoModal.content.id_pais"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="paises"
                  label="name"
                  @input="getStates"
                  :clearable="false"
                  input-id="country-modal"
                  disabled
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="Departamento"
              rules="required"
            >
              <b-form-group
                label="Estados"
                label-for="estado-modal"
                :state="errors.length > 0 ? false : null"
              >
                <v-select
                  v-model="infoModal.content.id_estado"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="states"
                  @input="getCiudad"
                  label="name"
                  :clearable="false"
                  input-id="estado-modal"
                  disabled
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="Ciudad"
              rules="required"
            >
              <b-form-group
                label="Ciudad"
                label-for="ciudad-modal"
                :state="errors.length > 0 ? false : null"
              >
                <v-select
                  v-model="infoModal.content.id_ciudad"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="ciudades"
                  label="name"
                  :clearable="false"
                  input-id="ciudad-modal"
                  disabled
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col md="6">
            <div class="demo-inline-spacing">
              <b-form-radio
                v-model="infoModal.content.genero"
                name="masculino"
                value="1"
                class="custom-control-primary"
                disabled
              >
                Masculino
              </b-form-radio>
              <b-form-radio
                v-model="infoModal.content.genero"
                name="femenino"
                value="2"
                class="custom-control-primary"
                disabled
              >
                Femenino
              </b-form-radio>
            </div>
          </b-col>
          <!-- submit button -->
        </b-row>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import {
  BModal,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BInputGroup,
  BFormRadio,
  BInputGroupPrepend,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import formValidation from "@core/comp-functions/forms/form-validation";
import { required, email, confirmed, password } from "@validations";
import vSelect from "vue-select";
export default {
  name: "edictRole",
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    quillEditor,
    required,
    email,
    confirmed,
    BFormRadio,
    password,
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },

  paisesOptions: {
    type: Array,
    required: true,
  },

  data() {
    return {
      infoModal: {
        id: "modal-user-view",
        title: "",
        content: {},
        contentPreguntas: {},
      },

      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus inmuebles.",
        readOnly: true,
      },

      name: "",
      nameState: null,
      submittedNames: [],
      states: [],
      ciudades: [],

      pais_id: null,
      state_id: null,
    };
  },

  computed: {
    paises() {
      return this.$store.state.appLocalidades.paises;
    },

    roles() {
      return this.$store.state.appRole.roles;
    },
  },

  methods: {
    getStates() {
      this.$store
        .dispatch("appLocalidades/getStates", {
          codigo: this.infoModal.content.id_pais.id,
        })
        .then((data) => {
          this.states = data;
        })
        .catch(() => {});
    },

    getCiudad() {
      this.$store
        .dispatch("appLocalidades/getCiudades", {
          codigo: this.infoModal.content.id_estado.id,
        })
        .then((data) => {
          this.ciudades = data;
        })
        .catch(() => {});
    },

    info(code, button) {
      this.infoModal.content = { ...code };

      this.getStates();
      this.getCiudad();

      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

   

    // setup() {
    //   const roleOptions = computed(() => {
    //     return store.state.appRole.roles;
    //   });

    //   const paisesOptions = computed(() => {
    //     return store.state.appLocalidades.paises;
    //   });

    //   const statesOptions = computed(() => {
    //     return store.state.appLocalidades.estados;
    //   });

    //   const ciudadOptions = computed(() => {
    //     return store.state.appLocalidades.ciudades;
    //   });

    //   return {
    //     roleOptions,
    //     paisesOptions,
    //     statesOptions,
    //     ciudadOptions,
    //   };
    // },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>

