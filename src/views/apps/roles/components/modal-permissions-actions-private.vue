<template>
  <div>
    <b-modal
      centered
      size="lg"
      :id="infoModal.id"
      ref="modal-register-permission-action-private"
      :header-bg-variant="headerBgVariant"
      :title="infoModal.content.nombre"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h3 class="text-light">{{ infoModal.content.nombre }}</h3>
        <b-button size="sm" variant="outline-light" @click="close()">
          x
        </b-button>
      </template>
      <b-overlay :show="show" rounded="sm" spinner-variant="primary">
        <span v-for="perm in permissions" v-bind:key="perm.id">
          <hr />
          <div class="row-container">
            <div class="col-container">
              <div class="tabs">
                <div class="taba">
                  <input type="radio" :id="perm.id" name="rd" />
                  <span style="color: black"
                    ><strong> {{ perm.title }} </strong></span
                  >

                  <label
                    class="taba-label"
                    @click="getActions(perm.id)"
                    :for="perm.id"
                    >{{ perm.title }}</label
                  >
                  <div class="taba-content">
                    <div v-for="acti in actions" v-bind:key="acti.id">
                      <b-form-checkbox
                        v-model="selected"
                        :value="acti.id"
                        disabled
                      >
                        {{ acti.action }}
                      </b-form-checkbox>
                    </div>
                    <hr />
                    <b-button
                      @click="addActivePermissionsActions(perm.id)"
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      size="sm"
                      variant="primary"
                      disabled
                    >
                      Asignar accion
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
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
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
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
    AppCollapse,
    AppCollapseItem,
  },

  directives: {
    Ripple,
  },

  data() {
    return {
      show: true,
      selected: [],
      permissions: [],
      permissions_active: [],
      actions: [],

      infoModal: {
        id: "modal-permission-action-private",
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
    tprofileData() {
      return this.$store.state.userData.userData;
    },
  },

  created() {},

  methods: {
    getActions(data) {
      this.getActivePermissionActions(data);
      this.actions = [];
      this.selected = [];

      let act = this.permissions.filter((code) => {
        return data == code.id;
      });

      this.actions = act[0].actions[0];
    },
    info(code, button) {
      this.permissions = [];
      this.infoModal.content = { ...code };
      this.getPermissionsActionsForRoleId();
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-register-permission-action-private"].hide();
    },

    getPermissions() {
      this.$store.dispatch("appRole/getPermissions");
    },

    getPermissionsActionsForRoleId() {
      this.$store
        .dispatch("appRole/getPermissionsActionsForRoleId", {
          role: this.infoModal.content.id,
        })
        .then((data) => {
          this.permissions = data;
          this.show = false;
        })
        .catch((error) => {});
    },

    addActivePermissionsActions(code) {
      this.selected = this.selected.filter(function (el) {
        return el != null;
      });

      let data = {
        role: this.infoModal.content.id,
        permission: code,
        actions: this.selected,
      };

      this.$store
        .dispatch("appRole/addActivePermissionsActions", data)
        .then((data) => {
        })
        .catch((error) => {
        });
    },

    getActivePermissionActions(code) {
      let data = {
        permission: code,
        role: this.infoModal.content.id,
      };
      this.$store
        .dispatch("appRole/getPermissionActiveRole", data)
        .then((datas) => {
          for (let i = 0; i < datas.length; i++) {
            this.selected.push(datas[i].action);
          }

          this.getPermissionsActionsForRoleId();
        });
    },

    async getModules() {
      await this.$store.dispatch("appRole/getModules").then((data) => {
        this.permissions = data;
      });
    },
  },
};
</script>