<template>
  <div>
    <b-modal
      centered
      size="sm"
      :id="infoModal.id"
      ref="modal-edict-module"
      :header-bg-variant="headerBgVariant"
      title="Registro"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      cancel-variant="outline-secondary"
      ok-title="Registrar"
      cancel-title="Cancelar"
    >
      <template #modal-header="{ close }">
        <h3 class="text-light">Register</h3>
        <b-button size="sm" variant="outline-light" @click="close()">
          x
        </b-button>
      </template>

      <b-overlay :show="show" rounded="sm" spinner-variant="primary">
        <div class="demo-vertical-spacing">
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              :state="titleState"
              label="Titulo"
              label-for="title"
              invalid-feedback="title is required"
            >
              <b-form-input
                id="title"
                v-model="infoModal.content.title"
                :state="titleState"
                required
              />
            </b-form-group>
            <b-form-group
              :state="actionsState"
              label="Subject"
              label-for="subject"
              invalid-feedback="action is required"
            >
              <b-form-input
                id="subject"
                v-model="infoModal.content.subject"
                :state="actionsState"
                required
              />
            </b-form-group>
          </form>
        </div>
      </b-overlay>
    </b-modal>
  </div>
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
  BSpinner,
  BOverlay,
  BInputGroupPrepend,
  BInputGroupAppend,
  BFormTextarea,
  BContainer,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";

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
    BSpinner,
    BOverlay,
    BInputGroupPrepend,
    quillEditor,
    BInputGroupAppend,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
    BContainer,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      show: false,
      headerBgVariant: "primary",

      actionsState: null,
      titleState: null,
      submitted: [],
      infoModal: {
        id: "modal-edict-module",
        content: { nombre: "Registro" },
      },
    };
  },

  methods: {
    info(code, button) {
      this.infoModal.content = { ...code };

      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.actionsState = valid;
      this.titleState = valid;
      return valid;
    },
    resetModal() {
      this.actionsState = null;
      this.titleState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.$store
        .dispatch("appRole/addPermissions", {
          id: this.infoModal.content.id,
          subject: this.infoModal.content.subject,
          title: this.infoModal.content.title,
        })
        .then((data) => {
          this.$store.dispatch("appRole/getPermissions");
        });
      this.$nextTick(() => {
        this.$refs["modal-edict-module"].toggle("#toggle-btn");
      });
    },
  },
};
</script>