<template>
  <b-modal centered size="lg" :id="infoModal.id" ref="modal-roles" hide-footer>
    <b-form @submit="onSubmit">
      <b-row>
        <!-- first name -->
        <b-col cols="12">
          <b-form-group label="Titulo" label-for="vi-first-name">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="UserIcon" />
              </b-input-group-prepend>
              <b-form-input
                v-model="form.titulo"
                id="vi-first-name"
                placeholder="Escribe el nombre del rol"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col col="12">
          <b-form-group
            label="Descripción Actividad"
            label-for="task-description"
          >
            <quill-editor
              v-model="form.descripcion"
              id="quil-content"
              :options="snowOption"
              class="border-bottom-0"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mr-1"
          >
            Registrar
          </b-button>
        </b-col>
      </b-row>
    </b-form>
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
  name: "registerRole",
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
        id: "modal-register-role",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      form: {
        titulo: "",
        descripcion: "",
      },
      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus inmuebles.",
        readOnly: true,
      },
    };
  },

  methods: {
    info(button) {
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-roles"].hide();
    },

    onSubmit(event) {
      event.preventDefault();
      this.$store
        .dispatch("appRole/addRoles", { roles: this.form })
        .then((response) => {
          this.$store.dispatch("appRole/getRoles");
          this.hideModal();
        })
        .catch((data) => {
        });
    },
  },

  setup() {},
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>