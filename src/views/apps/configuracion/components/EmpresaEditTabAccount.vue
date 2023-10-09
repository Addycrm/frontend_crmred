<template>
  <div>
    <b-form>
      <b-row>
        <!-- Field: Username -->
        <b-col cols="12" md="4">
          <b-form-group label="Nombre" label-for="descripcion">
            <b-form-input v-model="configuracion.nombre" id="descripcion" />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col cols="12" md="4">
          <b-form-group label="Slogan" label-for="slogan">
            <b-form-input v-model="configuracion.slogan" id="slogan" />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col cols="12" md="4">
          <b-form-group label="Nit" label-for="nit">
            <b-form-input v-model="configuracion.nit" id="nit" type="text" />
          </b-form-group>
        </b-col>

        <b-col cols="12" md="4">
          <b-form-group label="Pagina web" label-for="pagina_web">
            <b-form-input
              v-model="configuracion.pagina_web"
              id="pagina_web"
              type="text"
            />
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-row
            v-for="(item, index) in itemsCorreo"
            :id="item.id"
            :key="item.id"
            ref="row"
          >
            <b-col md="6">
              <b-form-group label="* Correo electronico" label-for="v-correo">
                <b-form-input
                  id="v-correo"
                  v-model="configuracion.correos"
                  type="email"
                  placeholder="Escribe tu correo electronico"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <div class="demo-inline-spacing">
                <b-button
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  variant="outline-danger"
                  class="mt-0 mt-md-2"
                  @click="removeItemCorreo(index)"
                >
                  <feather-icon icon="Trash2Icon" class="mr-25" />
                </b-button>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  @click="repeateAgainCorreo"
                >
                  <feather-icon icon="PlusIcon" class="mr-25" />
                </b-button>
              </div>
            </b-col>
          </b-row>

        </b-col>

        <b-col cols="6">
          <b-row
            v-for="(item, index) in itemsNumero"
            :id="item.id"
            :key="item.id"
            ref="row"
          >
            <b-col md="6">
              <b-form-group label="* Celular" label-for="v-celular">
                <b-form-input
                  id="v-correo"
                  v-model="configuracion.numeros"
                  type="text"
                  placeholder="Escribe tu celular"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <div class="demo-inline-spacing">
                <b-button
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  variant="outline-danger"
                  class="mt-0 mt-md-2"
                  @click="removeItemNumero(index)"
                >
                  <feather-icon icon="Trash2Icon" class="mr-25" />
                </b-button>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  @click="repeateAgainNumero"
                >
                  <feather-icon icon="PlusIcon" class="mr-25" />
                </b-button>
              </div>
            </b-col>
          </b-row>

        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BFormRadioGroup,
  BFormFile,
  BFormSelect,
  BFormRadio,
  BCardGroup,
  BFormInvalidFeedback,
  BFormCheckboxGroup,
  BFormDatepicker,
  BButtonGroup,
  BInputGroupPrepend,
} from "bootstrap-vue";
import vSelect from "vue-select";
import listEmailEmpresasVue from "./components-children/list-email-empresas.vue";
import listNumerosEmpresasVue from "./components-children/list-numeros-empresas.vue";
import { required, email } from "@validations";

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    BFormRadioGroup,
    vSelect,
    BFormFile,
    BFormSelect,
    BFormRadio,
    BCardGroup,
    "list-email-empresas": listEmailEmpresasVue,
    "list-numbers-empresas": listNumerosEmpresasVue,
    BFormInvalidFeedback,
    BFormCheckboxGroup,
    required,
    email,
    BFormDatepicker,
    BButtonGroup,
    BInputGroupPrepend,
  },
  props: {
    configuracion: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      imageData: "",
      imageDataPortada: "",
      file: "",
      nextTodoIdCorreo: 2,
      nextTodoIdNumero: 2,
      itemsCorreo: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          correo: "",
        },
      ],
      itemsNumero: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          numero: "",
        },
      ],
      ciudades: [],
      estados: [],
      paises: [],

      data: {
        logo: null,
        email: null,
        genero: null,
        nombre: null,
        slogan: null,
        nit: null,
        pagina_web: null,
        emails: [],
        numeros: [],
      },
    };
  },

  created() {
    this.getPaises();
    this.getEstados();
    this.getCiudades();
  },

  methods: {
   
    repeateAgainCorreo() {
      this.itemsCorreo.push({
        id: (this.nextTodoIdCorreo += this.nextTodoIdCorreo),
      });

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
      });
    },

    removeItemNumero(index) {
      this.itemsNumero.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },

    repeateAgainNumero() {
      this.itemsNumero.push({
        id: (this.nextTodoIdNumero += this.nextTodoIdNumero),
      });

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
      });
    },

    removeItemNumero(index) {
      this.itemsNumero.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
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

    CambiarPais() {
      this.getEstados();
    },

    getEstados() {
      let codigo = this.configuracion.codigo_pais;
      this.$store
        .dispatch("appLocalidades/getStates", { codigo })
        .then((response) => {
          this.estados = response;
        })
        .catch((error) => {
        });
    },

    getCiudades() {
      let codigo = this.configuracion.codigo_estado;
      this.$store
        .dispatch("appLocalidades/getCiudades", { codigo })
        .then((response) => {
          this.ciudades = response;
        })
        .catch((error) => {
        });
    },
  },
};
</script>


