


<template>
  <div>
    <b-row>
      <b-col cols="12">
        <form-wizard
          ref="wizard"
          color="#7367F0"
          :title="null"
          :subtitle="null"
          shape="square"
          finish-button-text="Registrar"
          back-button-text="Atras"
          next-button-text="Siguiente"
          class="wizard-vertical mb-3"
          @on-complete="validationTipoform"
        >
          <b-overlay :show="show" rounded="sm">
            <!-- account datails tab -->
            <tab-content title="Información básica">
              <validation-observer>
                <b-row>
                  <b-col cols="12" class="mb-2">
                    <h5 class="mb-0">Información básica</h5>
                    <small class="text-muted">
                      Ingresa todos los campos, si tienes (*) Son
                      obligatorios</small
                    >
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="* Tipo cliente" label-for="v-tipo">
                      <validation-provider
                        #default="{ errors }"
                        name="tipo"
                        rules="required"
                      >
                        <v-select
                          v-model="form.tipo_cliente"
                          :options="tipo_clientes"
                          label="nombre"
                          :value="tipo_clientes.id"
                          :clearable="false"
                          input-id="tipo_cliente"
                        />

                        <b-form-invalid-feedback
                          :state="errors.length > 0 ? false : null"
                        >
                          campo requerido
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group
                      label="* Correo electronico"
                      label-for="v-correo"
                    >
                      <validation-provider
                        #default="{ errors }"
                        name="correo"
                        rules="required|email"
                      >
                        <b-form-input
                          id="v-correo"
                          v-model="form.main_mail"
                          type="email"
                          placeholder="Escribe tu correo electronico"
                          :state="errors.length > 0 ? false : null"
                        />
                        <b-form-invalid-feedback
                          :state="errors.length > 0 ? false : null"
                        >
                          campo requerido
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <b-col md="6">
                    <b-form-group label="* Nombres" label-for="v-nombre">
                      <validation-provider
                        #default="{ errors }"
                        name="nombre"
                        rules="required"
                      >
                        <b-form-input
                          id="v-primer_nombre"
                          v-model="form.nombre"
                          type="text"
                          :state="errors.length > 0 ? false : null"
                          placeholder="Escribe tu nombre"
                        />
                        <b-form-invalid-feedback
                          :state="errors.length > 0 ? false : null"
                        >
                          campo requerido
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <b-col md="6">
                    <b-form-group label="*Apellidos" label-for="v-apellido">
                      <validation-provider
                        #default="{ errors }"
                        name="apellido"
                        rules="required"
                      >
                        <b-form-input
                          id="v-apellido"
                          v-model="form.apellido"
                          type="text"
                          placeholder="Escribe tu apellido"
                          :state="errors.length > 0 ? false : null"
                        />
                        <b-form-invalid-feedback
                          :state="errors.length > 0 ? false : null"
                        >
                          campo requerido
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <b-col md="6">
                    <b-form-group
                      label="* Telefono Celular"
                      label-for="v-celular"
                    >
                      <validation-provider
                        #default="{ errors }"
                        name="celular|min:13"
                        rules="required"
                      >
                        <vue-phone-number-input
                          default-country-code="CO"
                          :translations="{
                            countrySelectorLabel: 'Codigo pais',
                            countrySelectorError: 'Choisir un pays',
                            phoneNumberLabel: 'Numéro de Celular',
                            example: 'Ejemplo :',
                          }"
                          v-model="form.main_cell_phone"
                          @update="results = $event"
                        />

                        <b-form-invalid-feedback
                          :state="errors.length > 0 ? false : null"
                        >
                          campo requerido
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <b-col md="6">
                    <b-form-group label="* WhatsApp" label-for="v-whatsapp">
                      <validation-provider
                        #default="{ errors }"
                        name="whatsapp|min:13"
                        rules="required"
                      >
                        <vue-phone-number-input
                          default-country-code="CO"
                          :translations="{
                            countrySelectorLabel: 'Codigo pais',
                            countrySelectorError: 'Choisir un pays',
                            phoneNumberLabel: 'Numéro de whatsapp',
                            example: 'Ejemplo :',
                          }"
                          v-model="form.whatsapp"
                          @update="results = $event"
                        />

                        <b-form-invalid-feedback
                          :state="errors.length > 0 ? false : null"
                        >
                          campo requerido
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <b-col md="6">
                    <b-form-group label="* Genero" label-for="v-genero">
                      <div class="demo-inline-spacing">
                        <b-form-radio
                          v-model="form.genero"
                          name="masculino"
                          value="2"
                          class="custom-control-primary"
                        >
                          Masculino
                        </b-form-radio>
                        <b-form-radio
                          v-model="form.genero"
                          name="femenino"
                          value="1"
                          class="custom-control-primary"
                        >
                          Femenino
                        </b-form-radio>
                      </div>
                    </b-form-group>
                  </b-col>
                </b-row>
              </validation-observer>
            </tab-content>
          </b-overlay>
        </form-wizard>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Cleave from "vue-cleave-component";
import "cleave.js/dist/addons/cleave-phone.us";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import {
  BAlert,
  BRow,
  BCol,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormFile,
  BFormInvalidFeedback,
  BButton,
  BFormCheckboxGroup,
  BFormRadio,
  BFormDatepicker,
  BButtonGroup,
  BInputGroupPrepend,
  BOverlay,
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import { required, email } from "@validations";
import { quillEditor } from "vue-quill-editor";
import flatPickr from "vue-flatpickr-component";
import celular from "../components/Celular.vue";
import { heightTransition } from "@core/mixins/ui/transition";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    FormWizard,
    TabContent,
    BAlert,
    BRow,
    BCol,
    BFormGroup,
    BButtonGroup,
    BFormInput,
    celular,
    vSelect,
    BFormSelect,
    BFormCheckbox,
    BFormFile,
    BButton,
    BFormRadio,
    BFormInvalidFeedback,
    BFormCheckboxGroup,
    ValidationProvider,
    ValidationObserver,
    BFormDatepicker,
    Cleave,
    BInputGroupPrepend,
    BFormCheckbox,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    quillEditor,
    flatPickr,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],

  data() {
    return {
      items: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          celular: "",
        },
      ],

      itemsCorreo: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          correo: "",
        },
      ],
      nextTodoId: 2,
      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus clientes.",
        readOnly: true,
      },

      options: {
        phone: {
          phone: true,
          phoneRegionCode: "US",
        },
        prefix: {
          prefix: "+57",
          blocks: [3, 3, 3, 4],
          uppercase: true,
        },
      },

      estados: [],
      ciudades: [],
      required,
      checked: false,
      needEmail: false,
      needPhone: false,
      email,

      form: {
        user_id: JSON.parse(localStorage.getItem("userData")),
        tipo_cliente: null,
        nombre: null,
        apellido: null,
        main_mail: null,
        whatsapp: null,
        main_cell_phone: null,
        genero: null,
      },
      tipo_clientes: [],
      results: null,

      show: false,
    };
  },

  mounted() {
    this.initTrHeight();
    var wizard = this.$refs.wizard;
    wizard.activateAll();
  },

  computed: {
    paises() {
      return this.$store.state.appLocalidades.paises;
    },

    tipo_documento() {
      return this.$store.state.appDocumentos.tipo_documento;
    },
  },

  methods: {
    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form);
      });
    },

    chekiar() {
      if (this.checked == true) {
        this.form.telefono = this.form.celular;
      }
    },
    getTipoCliente() {
      this.$store
        .dispatch("appDocumentos/getTipoCliente")
        .then((response) => {
          this.tipo_clientes = response;
        })
        .catch(() => {});
    },

    getTipoDocumento() {
      this.$store
        .dispatch("appDocumentos/getTipoDocumento")
        .then(() => {})
        .catch(() => {});
    },
    getPaises() {
      this.$store
        .dispatch("appLocalidades/getPaises")
        .then(() => {})
        .catch(() => {});
    },

    getEstados() {
      let codigo = this.form.pais.id;
      this.$store
        .dispatch("appLocalidades/getStates", { codigo })
        .then((response) => {
          this.estados = response;
        })
        .catch(() => {});
    },

    getCiudades() {
      let codigo = this.form.departamento.id;
      this.$store
        .dispatch("appLocalidades/getCiudades", { codigo })
        .then((response) => {
          this.ciudades = response;
        })
        .catch((error) => {});
    },

    validationTipoform() {
      this.show = true;

      this.$store
        .dispatch("appCliente/addClient", this.form)
        .then((response) => {
          this.show = false;

          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.data.message,
              icon: "EditIcon",
              variant: "success",
            },
          });

          this.$router.push({ name: "apps-cliente-list" });
        })
        .catch(() => {
          this.show = false;

          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Llena todos los campos",
              icon: "EditIcon",
              variant: "danger",
            },
          });
        });
    },
  },

  created() {
    this.getTipoDocumento();
    this.getTipoCliente();
    this.getPaises();

    window.addEventListener("resize", this.initTrHeight);
  },

  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-wizard.scss";
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/quill.scss";

.ql-editor {
  height: 12rem;

  resize: vertical;
  overflow-y: scroll;
}
</style>
