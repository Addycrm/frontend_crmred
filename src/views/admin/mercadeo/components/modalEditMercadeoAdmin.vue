<template>
  <b-modal
    :id="infoModal.id"
    ref="modal-edict-portales"
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
          v-model="infoModal.content.name"
          :state="nameState"
          required
        />
      </b-form-group>

      <b-form-group
        label="Template"
        label-for="template-input"
        invalid-feedback="Template es requerido"
      >
        <b-form-input
          id="template-input"
          v-model="infoModal.content.template"
          required
        />
      </b-form-group>
      <b-form-group label="Tipo de mercadeo" label-for="tipo_inmueble">
        <v-select
          v-model="infoModal.content.mercadeo_type"
          :options="mercadeotype"
          :clearable="false"
          label="name"
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
        id: "modal-edict-portales",
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
      mercadeo_type: null,
      description: "",
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
      this.imageData = "/storage/" + this.infoModal.content.url;
      this.image = this.infoModal.content.url;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-edict-portales"].hide();
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

    async handleSubmitZona() {
      if (!this.checkFormValidityZona()) {
        return;
      }

      let formData = new FormData();
      formData.append("id", this.infoModal.content.id);
      formData.append("name", this.infoModal.content.name);
      formData.append("template", this.infoModal.content.template);
      formData.append("image", this.image);
      formData.append(
        "mercadeo_type",
        JSON.stringify(this.infoModal.content.mercadeo_type)
      );

      await this.$store
        .dispatch("appMercadeoAdmin/editMercadeoAdmin", formData)
        .then(() => {
          this.$root.$emit("mercadeo");
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

