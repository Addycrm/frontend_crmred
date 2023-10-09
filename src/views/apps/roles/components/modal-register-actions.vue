<template>
  <div>
    <b-modal
      centered
      size="lg"
      :id="infoModal.id"
      ref="modal-register-permission-action"
      :header-bg-variant="headerBgVariant"
      :title="infoModal.content.nombre"
      @ok="handleOk"
      ok-title="Registrar"
      cancel-title="Cancelar"
    >
      <template #modal-header="{ close }">
        <h3 class="text-light">Registrar Accion</h3>
        <b-button size="sm" variant="outline-light" @click="close()">
          x
        </b-button>
      </template>

      <b-overlay :show="show" rounded="sm" spinner-variant="primary">
        <div class="demo-inline-spacing">
          <span v-for="action in actions" v-bind:key="action.id">
            <b-form-checkbox v-model="selected" :value="action.id">
              {{ action.title }}
            </b-form-checkbox>
          </span>
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
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";
import { filter } from "postcss-rtl/lib/affected-props";

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
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      show: true,
      actions: [],
      selected: [],
      infoModal: {
        id: "modal-actions-private",
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

      headerBgVariant: "primary",
    };
  },

  created() {},

  methods: {
    info(code, button) {
      this.selected = [];
      this.infoModal.content = { ...code };

      this.getActions();
      this.getActionsForId(this.infoModal.content.actions[0]);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-register-permission-action"].hide();
    },

    getActions() {
      this.$store.dispatch("appRole/getActions").then((res) => {
        this.actions = res;
      });
    },

    getActionsForId(data) {
      for (let i = 0; i < data.length; i++) {
        this.selected.push(data[i].id);
      }
      this.show = false;
    },

    handleOk() {
      this.selected = [...new Set(this.selected)];

      this.$store
        .dispatch("appRole/addPermissionAction", {
          actions: this.selected,
          permission: this.infoModal.content.id,
        })
        .then((data) => {
          this.$store.dispatch("appRole/getPermissionsActions");
        });
    },
  },
};
</script>