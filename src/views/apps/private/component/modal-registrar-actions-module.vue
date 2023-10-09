<template>
  <div>
    <b-modal
      centered
      size="sm"
      :id="infoModal.id"
      ref="modal-register-action-module"
      :header-bg-variant="headerBgVariant"
      :title="infoModal.content.nombre"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      cancel-variant="outline-secondary"
      ok-title="Registrar"
      cancel-title="Cancelar"
    >
      <template #modal-header="{ close }">
        <h3 class="text-light">Registrar accines</h3>
        <b-button size="sm" variant="outline-light" @click="close()">
          x
        </b-button>
      </template>

      <b-overlay :show="show" rounded="sm" spinner-variant="primary">
        <b-container style="max-width: 60%">
          <div class="demo-vertical-spacing">
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                :state="titleState"
                label="title"
                label-for="title"
                invalid-feedback="title is required"
              >
                <b-form-input
                  id="title"
                  v-model="title"
                  :state="titleState"
                  required
                />
              </b-form-group>
              <b-form-group
                :state="actionsState"
                label="actions"
                label-for="actions"
                invalid-feedback="action is required"
              >
                <b-form-input
                  id="actions"
                  v-model="action"
                  :state="actionsState"
                  required
                />
              </b-form-group>
            </form>
          </div>
        </b-container>
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
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      show: false,
      title: "",
      action: "",
      actionsState: null,
      titleState: null,
      submitted: [],
      infoModal: {
        id: "modal-actions-module",
        content: { nombre: "Registro" },
      },
      headerBgVariant: "primary",
    };
  },

  methods: {
    info(button) {
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.actionsState = valid;
      this.titleState = valid;
      return valid;
    },
    resetModal() {
      this.title = "";
      this.action = "";
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
        .dispatch("appRole/addActions", {
          action: this.action,
          title: this.title,
        })
        .then((data) => {
          this.$store.dispatch("appRole/getActions");
        });
      this.$nextTick(() => {
        this.$refs["modal-register-action-module"].toggle("#toggle-btn");
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
