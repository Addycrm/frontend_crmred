<template>
  <div>
    <b-modal
      centered
      size="sm"
      :id="infoModal.id"
      ref="modal-register-module-permissions"
      :header-bg-variant="headerBgVariant"
      title="Registrar Modulo"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      cancel-variant="outline-secondary"
      ok-title="Registrar"
      cancel-title="Cancelar"
    >
      <template #modal-header="{ close }">
        <h3 class="text-light">Registrar Modulo</h3>
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
                label="Titulo"
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
                :state="subjectState"
                label="Nombre"
                label-for="subject"
                invalid-feedback="action is required"
              >
                <b-form-input
                  id="subject"
                  v-model="subject"
                  :state="subjectState"
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
      subject: "",
      subjectState: null,
      titleState: null,
      submitted: [],
      infoModal: {
        id: "modal-register-module-permissions",
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
      this.titleState = valid;
      this.subjectState = valid;
      return valid;
    },
    resetModal() {
      this.title = "";
      this.subject = "";
      this.titleState = null;
      this.subjectState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$store
        .dispatch("appRole/addPermissions", {
          subject: this.subject,
          title: this.title,
        })
        .then((data) => {
          this.$store.dispatch("appRole/getPermissions");
        });
      this.$nextTick(() => {
        this.$refs["modal-register-module-permissions"].toggle("#toggle-btn");
      });
    },
  },
};
</script>
