<template>
  <div>
    <b-modal
      centered
      size="lg"
      :id="infoModal.id"
      ref="modal-register-role-private"
      :header-bg-variant="headerBgVariant"
      :title="infoModal.content.nombre"
      @ok="handleOk"
    
      cancel-title="Cancelar"
    >
      <template #modal-header="{ close }">
        <h3 class="text-light">{{ infoModal.content.nombre }}</h3>
        <b-button size="sm" variant="outline-light" @click="close()">
          x
        </b-button>
      </template>
      <b-overlay :show="show" rounded="sm" spinner-variant="primary">
        <div class="demo-inline-spacing">
          <span v-for="perm in permissions" v-bind:key="perm.id">
            <b-form-checkbox
              v-model="selected"
              :value="perm"
              disabled
            >
              {{ perm.title }}
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

export default {
 
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
      disabled: true,
      selected: [],
      seleted_all: [],
      infoModal: {
        id: "modal-register-private",
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

  computed: {
    permissions() {
      return this.$store.state.appRole.permissions;
    },

    tprofileData() {
      return this.$store.state.userData.userData;
    },
  },

  created() {},

  methods: {
    info(code, button) {
      this.show = true;
      this.selected = [];
      this.seleted_all = [];
      this.infoModal.content = { ...code };
      this.getPermissions();
      this.getPermissionsForRoleId();
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-register-role-private"].hide();
    },

    getPermissions() {
      this.$store.dispatch("appRole/getPermissions");
    },

    getPermissionsForRoleId() {
      this.$store
        .dispatch("appRole/getPermissionsForRoleId", {
          role: this.infoModal.content.id,
        })
        .then((data) => {
          this.selected = data;
          this.seleted_all = data;
          this.show = false;
        })
        .catch((error) => {});
    },

    handleOk() {
      this.selected = this.selected.filter(function (el) {
        return el != null;
      });
      let data = this.selected;

      let selected_q = this.seleted_all.filter(function (cv) {
        return !data.find(function (e) {
          return e.id == cv.id;
        });
      });

      this.$store
        .dispatch("appRole/addPermissionsForId", {
          permissions: this.selected,
          deleted_permissions: selected_q,
          role: this.infoModal.content.id,
          user: this.tprofileData.id,
        })
        .then((data) => {})
        .catch((error) => {});
    },
  },
};
</script>