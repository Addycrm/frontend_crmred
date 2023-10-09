<template>
  <b-row>
    <!-- Field: Username -->
    <b-col cols="12" md="6">
      <b-form-group label="Nombre o Razon social" label-for="nombre">
        <b-form-input v-model="configuracion.nombre" id="nombre" />
      </b-form-group>
    </b-col>

    <b-col cols="12" md="4">
      <b-form-group label="Url de la empresa" label-for="nombre">
        <b-form-input v-model="slug" id="slug" />
      </b-form-group>
    </b-col>

    <b-col cols="12" md="2" style="padding: 2em 0em">
      {{ "." + dominio }}
    </b-col>

    <!-- Field: Full Name -->

    <!-- Field: Email -->
    <b-col cols="12" md="4">
      <b-row>
        <b-col cols="9">
          <b-form-group label="Nit" label-for="nit">
            <b-form-input
              placeholder="nit"
              v-model="configuracion.nit"
              id="nit"
              type="text"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="DV" label-for="DV">
            <b-form-input
              id="DV"
              type="text"
              placeholder="DV"
              v-model="configuracion.dv"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" md="4">
      <b-form-group label="Telefono" label-for="telefono">
        <b-form-input
          placeholder="Escribe tu telefono"
          type="number"
          v-model="configuracion.telefono"
          id="telefono"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12" md="4">
      <b-form-group label="E-mail" label-for="email">
        <b-form-input
          placeholder="Escribe tu email"
          type="email"
          v-model="configuracion.email"
          id="email"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12" md="4">
      <b-form-group label="Celular" label-for="celular">
        <b-form-input
          placeholder="Escribe tu celular"
          type="number"
          v-model="configuracion.celular"
          id="celular"
        />
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

    <b-col cols="12" md="4">
      <b-form-group
        label="Color Principal, Se usa en el Header, Footer y color de Botones."
        label-for="pagina_web"
      >
        <b-form-input
          v-model="configuracion.color_primario"
          id="pagina_web"
          type="color"
        />
      </b-form-group>
    </b-col>

    <b-col cols="12" md="4">
      <b-form-group
        label="Color Secundario, Se usara como fondo de las propiedades y blogs."
        label-for="pagina_web"
      >
        <b-form-input
          v-model="configuracion.color_secundario"
          id="pagina_web"
          type="color"
        />
      </b-form-group>
    </b-col>

    <b-col cols="12" md="4">
      <b-form-group
        label="Color Fuente, es el color de fuentes del Color primario"
        label-for="pagina_web"
      >
        <b-form-input
          v-model="configuracion.font_color"
          id="font_color"
          type="color"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
import {
  BTab,
  BTabs,
  BCard,
  BAlert,
  BLink,
  BButton,
  BCol,
  BRow,
  BMedia,
  BAvatar,
  BFormFile,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormInvalidFeedback,
  BFormCheckboxGroup,
  BFormRadio,
  BFormDatepicker,
  BButtonGroup,
  BInputGroupPrepend,
  BForm,
  BInputGroup,
} from "bootstrap-vue";
export default {
  name: "basicData",

  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    BButton,
    BCol,
    BRow,
    BMedia,
    BAvatar,
    BFormFile,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormInvalidFeedback,
    BFormCheckboxGroup,
    BFormRadio,
    BFormDatepicker,
    BButtonGroup,
    BInputGroupPrepend,
    BForm,
    BInputGroup,
  },

  props: {
    configuracion: {
      type: Object,
      require: true,
    },

    slug: {
      type: String,
      require: true,
    },

    dominio: {
      type: String,
      require: true,
    },
  },
};
</script>

<style>
</style>