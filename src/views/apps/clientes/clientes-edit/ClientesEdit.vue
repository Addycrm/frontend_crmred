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
          finish-button-text="Editar"
          back-button-text="Atras"
          next-button-text="Siguiente"
          class="wizard-vertical mb-3"
          @on-complete="validationTipoform"
        >
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
                  <b-form-group
                    label="* Tipo de documento"
                    label-for="tipo_documento"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="tipo documento"
                      rules="required"
                    >
                      <v-select
                        v-model="form.tipo_identificacion"
                        :options="tipo_documento"
                        label="nombre"
                        :value="tipo_documento.id"
                        :clearable="false"
                        input-id="tipo_documento"
                      />

                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group
                    label="* Numero de documento"
                    label-for="v-numero_cedula"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="numero_cedula"
                      rules="required|min:5|max:14"
                    >
                      <b-form-input
                        id="v-numero_cedula"
                        v-model="form.n_identificacion"
                        type="number"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Escribe tu número de cedula"
                      />
                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                        El numero debe tener entre 5 a 14 numeros
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
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

                <celular-component ref="celularComponent"></celular-component>

                <b-col md="6">
                  <b-form-group label="* WhatsApp" label-for="v-telefono">
                    <validation-provider
                      #default="{ errors }"
                      name="telefono|min:13"
                      rules="required"
                    >
                      <vue-phone-number-input
                        default-country-code="CO"
                        :translations="{
                          countrySelectorLabel: 'Codigo pais',
                          countrySelectorError: 'Choisir un pays',
                          phoneNumberLabel: 'Numéro de telefono',
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
                  <b-form-group label="* Celular" label-for="v-celular">
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
                          phoneNumberLabel: 'Numéro de celular',
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
                  <b-form-group
                    label="* Fecha de nacimiento"
                    label-for="v-fecha_nacimiento"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="fecha_nacimiento"
                      rules="required"
                    >
                      <flat-pickr
                        v-model="form.fecha_nacimiento"
                        class="form-control"
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
                  <b-form-group label="*correo" label-for="v-correo">
                    <validation-provider
                      #default="{ errors }"
                      name="correo"
                      rules="required"
                    >
                      <b-form-input
                        id="v-correo"
                        v-model="form.main_mail"
                        type="text"
                        placeholder="Escribe tu correo"
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
                  <div class="item-rating">
                    <b-form-group
                      label="* Calificación del cliente"
                      label-for="v-clasificacion"
                    >
                      <div class="rate">
                        <input
                          type="radio"
                          v-model="form.clasificacion"
                          id="star5"
                          name="rate"
                          value="5"
                        />
                        <label for="star5" title="text">5 stars</label>
                        <input
                          type="radio"
                          v-model="form.clasificacion"
                          id="star4"
                          name="rate"
                          value="4"
                        />
                        <label for="star4" title="text">4 stars</label>
                        <input
                          type="radio"
                          v-model="form.clasificacion"
                          id="star3"
                          name="rate"
                          value="3"
                        />
                        <label for="star3" title="text">3 stars</label>
                        <input
                          type="radio"
                          v-model="form.clasificacion"
                          id="star2"
                          name="rate"
                          value="2"
                        />
                        <label for="star2" title="text">2 stars</label>
                        <input
                          type="radio"
                          v-model="form.clasificacion"
                          id="star1"
                          name="rate"
                          value="1"
                        />
                        <label for="star1" title="text">1 star</label>
                      </div>
                    </b-form-group>
                  </div>
                </b-col>
              </b-row>
            </validation-observer>
          </tab-content>

          <!-- personal info tab -->
          <tab-content title="Ubicación">
            <validation-observer ref="validacionTipoform">
              <b-row>
                <b-col cols="12" class="mb-2">
                  <h5 class="mb-0">Ubicación</h5>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-group label="Seleccionar pais" label-for="pais">
                    <validation-provider
                      #default="{ errors }"
                      name="estados"
                      rules="required"
                    >
                      <v-select
                        v-model="form.pais"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="paises"
                        label="name"
                        :value="paises.id"
                        @input="getEstados"
                        :clearable="false"
                        input-id="pais"
                      />
                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group
                    label="Seleccionar departamento"
                    label-for="estados"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="estados"
                      rules="required"
                    >
                      <v-select
                        v-model="form.departamento"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="estados"
                        label="name"
                        @input="getCiudades"
                        :clearable="false"
                        input-id="estado"
                      />

                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group label="Seleccionar ciudades">
                    <validation-provider
                      #default="{ errors }"
                      name="ciudad"
                      rules="required"
                    >
                      <v-select
                        v-model="form.ciudad"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="ciudades"
                        label="name"
                        :value="ciudades.id"
                        :clearable="false"
                        input-id="ciudad"
                      />
                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group label="*Dirección" label-for="v-direccion">
                    <validation-provider
                      #default="{ errors }"
                      name="direccion"
                      rules="required"
                    >
                      <b-form-input
                        id="v-direccion"
                        v-model="form.direccion"
                        type="text"
                        placeholder="Escribe tu direccion"
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
              </b-row>
            </validation-observer>
          </tab-content>

          <tab-content title="Observaciones">
            <b-row>
              <b-col>
                <quill-editor
                  v-model="form.observaciones"
                  :options="snowOption"
                  id="quil-content"
                  class="border-bottom-0"
                />
                <div
                  id="quill-toolbar"
                  class="d-flex justify-content-end border-top-0"
                >
                  <button class="ql-bold" />
                  <button class="ql-italic" />
                  <button class="ql-underline" />
                  <button class="ql-align" />
                  <button class="ql-link" />
                </div>
              </b-col>
            </b-row>
          </tab-content>
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
import CelularComponent from "../components/Celular.vue";
import ListCelular from "../components/ListCelular.vue";
import ListCorreo from "../components/ListCorreo.vue";

import {
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
  BInputGroupPrepend,
  BButtonGroup,
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import { required, email } from "@validations";
import { quillEditor } from "vue-quill-editor";
import flatPickr from "vue-flatpickr-component";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    BFormSelect,
    BFormCheckbox,
    BFormFile,
    BButton,
    BButtonGroup,
    BFormRadio,
    BFormInvalidFeedback,
    BFormCheckboxGroup,
    ValidationProvider,
    ValidationObserver,
    BFormDatepicker,
    Cleave,
    BInputGroupPrepend,
    BFormCheckbox,
    ToastificationContent,
    quillEditor,
    flatPickr,
    "list-celulares": ListCelular,
    "celular-component": CelularComponent,
    "list-correo": ListCorreo,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      snowOption: {
        modules: {
          toolbar: "#quill-toolbar",
        },
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus clientes.",
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

      items: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          celular: "",
        },
      ],

      estados: [],
      ciudades: [],
      required,

      itemsCorreo: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          correo: "",
        },
      ],

      form: {
        id: this.$route.params.id,
        user_id: JSON.parse(localStorage.getItem("userData")),
        estado: null,
        tipo_identificacion: null,
        tipo_cliente: null,
        clasificacion: null,
        nombre: null,
        apellido: null,
        correos: [{ correo: "" }],
        telefono: null,
        celulares: [{ numero: "" }],
        fecha_nacimiento: null,
        n_identificacion: null,
        adiciona: null,
        pais: null,
        ciudad: null,
        departamento: null,
        direccion: null,
        observaciones: null,
      },
      tipo_clientes: [],
      results: null,
      path2: "tel:",
    };
  },

  mounted() {
    this.$root.$on(
      "registerNumero",
      function (payLoad) {
        if (this.payLoad != payLoad) {
          this.getClienteEdit();
        }
      }.bind(this)
    );

    var wizard = this.$refs.wizard;
    wizard.activateAll();
    this.initTrHeight();
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
    info(item, button) {
      this.$refs.celularComponent.info(this.form.id, button);
    },

    getTipoCliente() {
      this.$store
        .dispatch("appDocumentos/getTipoCliente")
        .then((response) => {
          this.tipo_clientes = response;
        })
        .catch((error) => {
        });
    },

    getTipoDocumento() {
      this.$store
        .dispatch("appDocumentos/getTipoDocumento")
        .then((response) => {})
        .catch((error) => {
        });
    },
    getPaises() {
      this.$store
        .dispatch("appLocalidades/getPaises")
        .then((response) => {})
        .catch((error) => {
        });
    },

    getEstados() {
      let codigo = this.form.pais.id;
      this.$store
        .dispatch("appLocalidades/getStates", { codigo })
        .then((response) => {
          this.estados = response;
        })
        .catch((error) => {
        });
    },

    getCiudades() {
      let codigo = this.form.departamento.id;
      this.$store
        .dispatch("appLocalidades/getCiudades", { codigo })
        .then((response) => {
          this.ciudades = response;
        })
        .catch((error) => {
        });
    },

    

    getClienteEdit() {
      this.$store
        .dispatch("appCliente/fetchClient", { id: this.form.id })
        .then((response) => {
          this.form = response;
        })
        .catch((error) => {
        });
    },

    validationTipoform() {
      this.$store
        .dispatch("appCliente/updateCliente", this.form)
        .then((response) => {
          var clientes = this.$store.state.appCliente.clientes;
          if (clientes.length > 0) {
            this.$store.commit(
              "appCliente/UPDATE_CLIENTE",
              response.data.cliente
            );
          } else {
              this.$store.dispatch("appCliente/fetchClients");
          }

          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.message,
              icon: "EditIcon",
              variant: "success",
            },
          });

          this.$router.push({ name: "apps-cliente-list" });
        })
        .catch((error) => {
        });
    },
  },

  created() {
    this.getClienteEdit();
    this.getTipoDocumento();
    this.getTipoCliente();
    this.getPaises();
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

.rate {
  float: left;
  height: 46px;
  padding: 0 10px;
}
.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}
.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
}
.rate:not(:checked) > label:before {
  content: "★ ";
}
.rate > input:checked ~ label {
  color: #ffc700;
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
}
</style>
