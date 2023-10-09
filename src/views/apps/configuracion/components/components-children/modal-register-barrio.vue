<template>
  <b-modal
    :id="infoModal.id"
    ref="modal-register-barrio"
    title="Registrar barrio"
    ok-title="Registrar"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOkBarrio"
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
          v-model="name"
          :state="nameState"
          required
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
  BInputGroup,
  BInputGroupPrepend,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";

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
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      infoModal: {
        id: "modal-register-barrio",
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
    };
  },

  methods: {
    info(code, button) {
      this.infoModal.content = { ...code };
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-register-barrio"].hide();
    },

    checkFormValidityBarrio() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },

    handleOkBarrio(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitBarrio();
    },

    handleSubmitBarrio() {
      if (!this.checkFormValidityBarrio()) {
        return;
      }

      let data = {
        zona_id: this.infoModal.content.id,
        name: this.name,
      };

      this.$store
        .dispatch("appLocalidades/saveBarrio", data)
        .then((response) => {
          this.$root.$emit("ejecutarGetBarrios", response);
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

