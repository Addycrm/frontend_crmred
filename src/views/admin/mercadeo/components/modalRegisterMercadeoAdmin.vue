<template>
  <b-modal
    :id="infoModal.id"
    ref="modal-register-portales"
    title="Registrar portal"
    ok-title="Registrar"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOkZona"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Nombre"
        label-for="name-input"
        invalid-feedback="Nombre es requerido"
      >
        <b-form-input
          id="name-input"
          v-model="name"
          :state="nameState"
          required
        />
      </b-form-group>

      <b-form-group
        label="Template"
        label-for="template-input"
        invalid-feedback="Template es requerido"
      >
        <b-form-input id="template-input" v-model="template" required />
      </b-form-group>

      <b-form-group label="Tipo de Inmueble" label-for="tipo_inmueble">
        <v-select
          v-model="mercadeo_type"
          :options="mercadeotype"
          :clearable="false"
          label="name"
          :reduce="(option) => option.id"
          placeholder="Seleccionar"
        />
      </b-form-group>

      <b-media class="mb-2">
        <template #aside>
          <b-avatar v-bind:src="imageData" size="90px" rounded />
        </template>
        <h4 class="mb-1">Cargar imagen</h4>
        <b-form-file
          @change="previewImage"
          ref="file-input"
          placeholder="click para seleccionar una imagen"
          browse-text="Cargar"
          class="mb-2"
        ></b-form-file>
      </b-media>
    </form>
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
  BFormFile,
  BFormTextarea,
  BAvatar,
  BInputGroup,
  BMedia,
  BInputGroupPrepend,
} from "bootstrap-vue";
import vSelect from "vue-select";

import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "edictRole",
  components: {
    BModal,
    vSelect,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormFile,
    BAvatar,
    BMedia,
    BFormTextarea,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      infoModal: {
        id: "modal-register-portales",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      type_service: null,
      type_services: [],

      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus inmuebles.",
        readOnly: true,
      },
      imageData: "",

      file: "",
      image: "",
      description: "",
      mercadeo_type: null,
      template: "mails.",
      name: "",
      nameState: null,
    };
  },

  computed: {
    mercadeotype() {
      return this.$store.state.appMercadeoAdmin.mercadeo_type;
    },
  },

  methods: {
    info(code, button) {
      this.infoModal.content = { ...code };
   
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-register-portales"].hide();
    },

    checkFormValidityZona() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },

    previewImage: function (event) {
      var input = event.target;
      this.image = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    handleOkZona(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitZona();
    },

    handleSubmitZona() {
      if (!this.checkFormValidityZona()) {
        return;
      }

      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("template", this.template);
      formData.append("image", this.image);
      formData.append("mercadeo_type", this.mercadeo_type);

      this.$store
        .dispatch("appMercadeoAdmin/addMercadeoAdmin", formData)
        .then(() => {
          this.$store
            .dispatch("appMercadeoAdmin/fetchMercadeoAdmin")
            .then(() => {})
            .catch(() => {});
          this.hideModal();
        })
        .catch((error) => {
          this.hideModal();
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>

