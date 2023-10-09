<template>
  <b-modal
    :id="infoModal.id"
    ref="modal-editar-portales"
    title="Editar portal"
    ok-title="Registrar"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOkZona"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        :state="nameState"
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

      <b-form-group>
        <b-form-textarea
          v-model="infoModal.content.description"
          id="textarea-default"
          placeholder="Textarea"
          rows="3"
        />
      </b-form-group>
      <b-form-group label="Estado" label-for="service-input">
        <v-select
          v-model="infoModal.content.state"
          :options="estado"
          :reduce="type => type.value"
          label="text"
          :clearable="false"
        />
      </b-form-group>
      <b-form-group label="tipo de servicio" label-for="service-input">
        <v-select
          v-model="infoModal.content.type_service"
          :options="type_services"
          label="description"
          :clearable="false"
        />
      </b-form-group>
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
  VBPopover,
  BMedia,
  BInputGroupPrepend,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";
import vSelect from "vue-select";

export default {
  name: "modalEdictarPortal",
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormFile,
    BAvatar,
    BMedia,
    vSelect,
    BFormTextarea,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    quillEditor,
  },
  directives: {
    "b-popover": VBPopover,

    Ripple,
  },
  data() {
    return {
      infoModal: {
        id: "modal-editar-portales",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      data: {
        id: null,
      },

      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus inmuebles.",
        readOnly: true,
      },
      imageData: "",
      type_services: [],
      file: "",
      image: "",
      description: "",
      name: "",
      nameState: null,
      estado:[
        {value: 'active', text: 'Activo'},
        {value: 'inactive', text: 'Inactivo'}
      ],
      state: null
    };
  },

  methods: {
    info(code, button) {
      this.infoModal.content = { ...code };
      this.getTypeServices();
      this.imageData = "/storage/" + this.infoModal.content.image;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-editar-portales"].hide();
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
      this.infoModal.content.image = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    getTypeServices() {
      this.$store.dispatch("appPortales/getTypeService").then((data) => {
        this.type_services = data;
      });
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

      formData.append("id", this.infoModal.content.id);
      formData.append("name", this.infoModal.content.name);
      formData.append("image", this.infoModal.content.image);
      formData.append("description", this.infoModal.content.description);
      formData.append("state", this.infoModal.content.state);
      formData.append("type_service", this.infoModal.content.type_service.id);

      this.$store
        .dispatch("appPortales/editarPortales", formData)
        .then(() => {
          this.$store

            .dispatch("appPortales/fetchPortales")
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

