<template>
  <div>
    <b-row>
      <b-col cols="12">
        <form-wizard
          color="#7367F0"
          :title="null"
          :subtitle="null"
          layout="vertical"
          finish-button-text="Actualizar"
          back-button-text="Atras"
          next-button-text="Siguiente"
          class="wizard-vertical mb-3"
          @on-complete="confirmText"
        >
          <!-- account datails tab -->
          <tab-content
            title="Información básica"
            :before-change="validationInformacionBasica"
          >
            <validation-observer ref="validacionInfoBasica">
              <b-row>
                <b-col cols="12" class="mb-2">
                  <b-media class="mb-2">
                    <template #aside>
                      <b-avatar v-bind:src="imageData" size="90px" rounded />
                    </template>
                    <h4 class="mb-1">Perfil</h4>
                    <b-form-file
                      @change="previewImage"
                      ref="file-input"
                      placeholder="click para seleccionar una imagen"
                      browse-text="Cargar"
                      class="mb-2"
                    ></b-form-file>
                  </b-media>
                </b-col>

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
                      <b-form-select
                        id="tipo_documento"
                        v-model="form.code_tipo_documento"
                        :state="errors.length > 0 ? false : null"
                        :options="tipo_documento"
                        placeholder=""
                      ></b-form-select>
                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group
                    label="* Numero de Cedula"
                    label-for="v-numero_cedula"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="numero_cedula"
                      rules="required|min:5|max:14"
                    >
                      <b-form-input
                        id="v-numero_cedula"
                        v-model="form.numero_cedula"
                        disabled
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
                <b-col md="12">
                  <b-form-group
                    label="* Nombre  Completo"
                    label-for="v-primer_nombre"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="nombre"
                      rules="required"
                    >
                      <b-form-input
                        id="v-primer_nombre"
                        v-model="form.primer_nombre"
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
                  <b-form-group label="Seleccionar paises">
                    <validation-provider
                      #default="{ errors }"
                      name="pais"
                      rules="required"
                    >
                      <b-form-select
                        v-model="form.codigo_pais"
                        :options="paises"
                        value-field="id"
                        text-field="name"
                        @change="CambiarPais()"
                        :state="errors.length > 0 ? false : null"
                        disabled-field="notEnabled"
                      ></b-form-select>
                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group label="Seleccionar estados">
                    <validation-provider
                      #default="{ errors }"
                      name="estados"
                      rules="required"
                    >
                      <b-form-select
                        v-model="form.codigo_estado"
                        :options="estados"
                        value-field="id"
                        @change="getCiudades()"
                        text-field="name"
                        :state="errors.length > 0 ? false : null"
                        disabled-field="notEnabled"
                      ></b-form-select>
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
                      <b-form-select
                        v-model="form.codigo_ciudad"
                        :options="ciudades"
                        value-field="id"
                        text-field="name"
                        :state="errors.length > 0 ? false : null"
                        disabled-field="notEnabled"
                      ></b-form-select>
                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group label="" label-for="v-whatsapp">
                    <validation-provider
                      #default="{ errors }"
                      name="whatsApp"
                      rules="required|min:4|max:16"
                    >
                      * WhatsApp

                      <vue-phone-number-input
                        default-country-code="CO"
                        :translations="{
                          countrySelectorLabel: 'Codigo pais',
                          countrySelectorError: 'Choisir un pays',
                          phoneNumberLabel: 'Numéro de WhatsApp',
                          example: 'Ejemplo :',
                        }"
                        v-model="form.whatsApp"
                        @update="results = $event"
                      />
                      <b-form-checkbox
                        id="llenar_cel"
                        name="llenar_cel"
                        style="float: right"
                        v-model="checked"
                        @change="chekiar()"
                      >
                        Autocompletar celular
                      </b-form-checkbox>

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
                    label="* Telefono de contacto"
                    label-for="v-celular"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="celular|min:13"
                      rules="required|min:4|max:16"
                    >
                      <vue-phone-number-input
                        default-country-code="CO"
                        :translations="{
                          countrySelectorLabel: 'Codigo pais',
                          countrySelectorError: 'Choisir un pays',
                          phoneNumberLabel: 'Numéro de Celular',
                          example: 'Ejemplo :',
                        }"
                        v-model="form.celular"
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
                  <b-form-group label="* Correo" label-for="v-correo">
                    <validation-provider
                      #default="{ errors }"
                      name="correo"
                      rules="required|email"
                    >
                      <b-form-input
                        id="v-correo"
                        v-model="correo"
                        disabled
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
              </b-row>
            </validation-observer>
          </tab-content>
        </form-wizard>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormFile,
  BFormCheckbox,
  BFormInvalidFeedback,
  BButton,
  BFormCheckboxGroup,
  BFormDatepicker,
  BTabs,
  BTab,
  BCardText,
  BMedia,
  BAvatar,
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { codeIndeterminate, codeVueBasic, codeIcon, codeBasic } from "../code";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store/index";
import vSelect from "vue-select";
import { required, email } from "@validations";

import perfilStoreModule from "../perfilStoreModule";
import BCardCode from "@core/components/b-card-code";
import Cleave from "vue-cleave-component";
import "cleave.js/dist/addons/cleave-phone.us";

const PERFIL_APP_STORE_MODULE_NAME = "appPerfil";

// Register module
if (!store.hasModule(PERFIL_APP_STORE_MODULE_NAME))
  store.registerModule(PERFIL_APP_STORE_MODULE_NAME, perfilStoreModule);

// UnRegister on leave
onUnmounted(() => {
  if (store.hasModule(PERFIL_APP_STORE_MODULE_NAME))
    store.unregisterModule(PERFIL_APP_STORE_MODULE_NAME);
});

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    Cleave,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    BFormSelect,
    BCardCode,
    BFormFile,
    BButton,
    BFormInvalidFeedback,
    BFormCheckboxGroup,
    ValidationProvider,
    ValidationObserver,
    BFormDatepicker,

    BFormCheckbox,
    BMedia,
    BAvatar,

    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    BTabs,
    BTab,
    BCardText,
  },

  data() {
    return {
      storage: "",
      userData: null,
      userDataPersona: null,
      nextButtonText: {
        type: String,
        default: "Siguiente",
      },
      options: {
        phone: {
          phone: true,
          phoneRegionCode: "US",
        },
        prefix: {
          prefix: "",
          blocks: [3, 3, 3, 4],
          uppercase: true,
        },
      },
      imageData: "",
      imageDataPortada: "",
      codeVueBasic,
      file: "",
      username: null,
      tipo_documento: [
        { text: "Selecciona tu tipo de documento", value: null },
        { text: "Cedula de ciudadania", value: 1 },
        { text: "Cédula de extranjería", value: 1 },
        { text: "Pasaporte", value: 2 },
        { text: "ID", value: 1 },
      ],
      ciudades: [],
      estados: [],
      paises: [],
      Selected_socio_referido: false,
      Selected_agente: false,
      tipo_cliente: [],
      correo: null,
      numero_cedula: null,
      form: {
        id: null,
        codigo_pais: null,
        codigo_estado: null,
        codigo_ciudad: null,

        foto_persona: "",
        foto_portada: "",
        code_tipo_documento: 1,
        numero_cedula: null,
        telefono_fijo: null,
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        fecha_nacimiento: "",
        celular: "",
        whatsApp: null,
        correo: null,
        tipo_cliente: "socio_referidor",
        estado_persona: 1,
        fecha_nacimiento: null,
        direccion_persona: null,
        codigo_postal: null,
        cedula: null,
        rut: null,
      },

      checked: false,
      indeterminate: false,
      codeIndeterminate,
      codeIcon,
      codeBasic,
      email,
      required,
    };
  },

  created() {
    this.userData = JSON.parse(localStorage.getItem("userData"));

    if(this.userdata.foto_persona.substr(0,4)=='http'){

        this.imageData =  this.userdata.foto_persona;

      }else{
        this.imageData = "/storage/" + this.userdata.foto_persona;
      }

      if(this.userdata.foto_portada_persona.substr(0,4)=='http'){
        
        this.imageDataPortada =  this.userdata.foto_portada_persona;

      }else{
        this.imageDataPortada = "/storage/" + this.userdata.foto_portada_persona;
      }

    this.correo = this.userData.email;
    //this.imageData = "/storage/" + this.userData.foto_persona;
   // this.imageDataPortada = "/storage/" + this.userData.foto_portada_persona;
    this.form.primer_nombre = this.userData.primer_nombre;
    this.form.numero_cedula = this.userData.cedula_persona;
    this.form.segundo_nombre = this.userData.segundo_nombre;
    this.form.codigo_pais = this.userData.id_pais;
    this.form.codigo_estado = this.userData.id_estado;
    this.form.codigo_ciudad = this.userData.id_ciudad;
    this.form.primer_apellido = this.userData.primer_apellido;
    this.form.segundo_apellido = this.userData.segundo_apellido;
    this.form.celular = this.userData.celular_movil;

    this.form.whatsApp = this.userData.celular_whatsapp;

    this.getPaises();
    this.getEstados();
    this.getCiudades();
  },
  computed: {},

  methods: {
    chekiar() {
      if (this.checked == true) {
        this.form.celular = this.form.whatsApp;
      }

      // Sweetalert - Modal
    },

    CambiarPais() {
      this.getEstados();
    },

    getPaises() {
      this.$store
        .dispatch("appLocalidades/getPaises")
        .then((response) => {
          this.paises = response;
        })
        .catch((error) => {
        });
    },

    getEstados() {
      let codigo = this.form.codigo_pais;
      this.$store
        .dispatch("appLocalidades/getStates", { codigo })
        .then((response) => {
          this.estados = response;
        })
        .catch((error) => {
        });
    },

    getCiudades() {
      let codigo = this.form.codigo_estado;
      this.$store
        .dispatch("appLocalidades/getCiudades", { codigo })
        .then((response) => {
          this.ciudades = response;
        })
        .catch((error) => {
        });
    },
    confirmText() {
      this.$swal({
        title: "Editar!!!",
        text: "Estas seguro?",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "Ok",
        // cancelButtonText: "Cancelar",
        customClass: {
          confirmButton: "btn btn-primary",
          // cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.enviarData();
          //this.$router.push({ name: "pages-profile" });
        }
      });
    },

    validationInformacionBasica() {
      return new Promise((resolve, reject) => {
        this.$refs.validacionInfoBasica.validate().then((success) => {
          if (success) {
            this.enviarData();
          } else {
            reject();
          }
        });
      });
    },

    enviarData() {
      this.form.id = this.userData.id_user;

      let formData = new FormData();

      if (this.form.foto_persona != "") {
        formData.append("foto_persona", this.form.foto_persona);
      }

      if (this.form.foto_portada != "") {
        formData.append("foto_portada", this.form.foto_portada);
      }
      formData.append("telefono_fijo", this.form.telefono_fijo);
      formData.append("primer_nombre", this.form.primer_nombre);
      formData.append("code_tipo_documento", this.form.code_tipo_documento),
        formData.append("numero_cedula", this.form.numero_cedula);
      formData.append("segundo_nombre", this.form.segundo_nombre);
      formData.append("codigo_pais", this.form.codigo_pais);
      formData.append("codigo_estado", this.form.codigo_estado);
      formData.append("codigo_ciudad", this.form.codigo_ciudad);
      formData.append("primer_apellido", this.form.primer_apellido);
      formData.append("segundo_apellido", this.form.segundo_apellido);

      formData.append("celular", this.form.celular);

      formData.append("whatsApp", this.form.whatsApp);

      store
        .dispatch("appPerfil/updatePerfil", formData)
        .then((response) => {
          let user = response.data.userData;
          localStorage.setItem("userData", JSON.stringify(user));

          this.$store.commit("userData/UPDATE_USER_DATA", user);

          this.$ability.update(user.ability);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Actualizacion exitosa",
              icon: "EditIcon",
              variant: "success",
            },
          });
          this.$router.push({ name: "pages-profile" });
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: error.data.message,
              icon: "EditIcon",
              variant: "danger",
            },
          });
        });
    },

    previewImage: function (event) {
      var input = event.target;
      this.form.foto_persona = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    previewImagePortada: function (event) {
      var input = event.target;
      this.form.foto_portada = input.files[0];

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageDataPortada = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    socio(data) {
      let user = JSON.parse(localStorage.getItem("userData"));
      this.form.id = user.id_user;
      if (data === "agentes") {
        this.form.tipo_cliente = "agentes";
      } else {
        this.form.tipo_cliente = "socio_referidor";
      }
    },
    validationTipoCliente() {
      this.enviarData();
    },
    toggleIndeterminate() {
      this.indeterminate = !this.indeterminate;
    },

    //formulario para enviar informacion
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-wizard.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
