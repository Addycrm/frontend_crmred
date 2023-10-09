<template>
  <div>
    <!-- Media -->

    <!-- User Info: Input Fields -->
    <b-form>
      <b-row>
        <!-- Field: Username -->
        <b-col cols="12" md="8">
          <b-form-group label="* Nombre Completo" label-for="primer_nombre">
            <b-form-input v-model="userdata.primer_nombre" id="primer_nombre" />
          </b-form-group>
        </b-col>

        <b-col cols="12" md="4">
          <b-form-group label="Correo" label-for="email">
            <b-form-input v-model="userdata.email" id="email" type="email" />
          </b-form-group>
        </b-col>

        <b-col cols="12" md="4">
          <b-form-group label="" label-for="v-whatsapp">
            * WhatsApp
            <vue-phone-number-input
              default-country-code="CO"
              :translations="{
                countrySelectorLabel: 'Codigo pais',
                countrySelectorError: 'Choisir un pays',
                phoneNumberLabel: 'Numéro de WhatsApp',
                example: 'Ejemplo :',
              }"
              v-model="userdata.celular_whatsapp"
              @update="results = $event"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12" md="4">
          <b-form-group label="* Telefono de contacto" label-for="v-celular">
            <vue-phone-number-input
              default-country-code="CO"
              :translations="{
                countrySelectorLabel: 'Codigo pais',
                countrySelectorError: 'Choisir un pays',
                phoneNumberLabel: 'Numéro de Celular',
                example: 'Ejemplo :',
              }"
              v-model="userdata.celular_movil"
              @update="results = $event"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="4">
          <b-form-group label="Direccion" label-for="direccion_persona">
            <b-form-input
              v-model="userdata.direccion_persona"
              id="direccion_persona"
              type="text"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Seleccionar pais">
            <b-form-select
              v-model="userdata.codigo_pais"
              :options="paises"
              value-field="id"
              text-field="name"
              @input="getStates()"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Seleccionar estado">
            <b-form-select
              v-model="userdata.codigo_estado"
              :options="estados"
              value-field="id"
              @input="getCiudades()"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Seleccionar ciudad">
            <b-form-select
              v-model="userdata.codigo_ciudad"
              :options="ciudades"
              value-field="id"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Genero" label-for="gender" label-class="mb-1">
            <b-form-radio v-model="userdata.genero" name="some-radios" value="1"
              >Masculino</b-form-radio
            >
            <b-form-radio v-model="userdata.genero" name="some-radios" value="2"
              >Femenino</b-form-radio
            >
          </b-form-group>
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
} from "bootstrap-vue";
import vSelect from "vue-select";

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
  },

  props: {
    userdata: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ciudades() {
      return this.$store.state.appLocalidades.ciudades;
    },
    estados() {
      return this.$store.state.appLocalidades.estados;
    },
    zonas() {
      return this.$store.state.appLocalidades.zonas;
    },
    barrios() {
      return this.$store.state.appLocalidades.barrios;
    },
    paises() {
      return this.$store.state.appLocalidades.paises;
    },
  },

  data() {
    return {
      imageData: "",
      imageDataPortada: "",
      file: "",
      genderOptions: [
        { text: "Masculino", value: "1" },
        { text: "Femenino", value: "2" },
      ],
      tipo_documento: [
        { text: "Selecciona tu tipo de documento", value: null },
        { text: "Cedula de ciudadania", value: 1 },
        { text: "Cédula de extranjería", value: 1 },
        { text: "Pasaporte", value: 2 },
        { text: "ID", value: 1 },
      ],
    };
  },
  
  methods: {
    getStates() {
      this.$root.$emit("estados")
    },

    getCiudades() {
      this.$root.$emit('ciudades');
    }
  }
};
</script>


