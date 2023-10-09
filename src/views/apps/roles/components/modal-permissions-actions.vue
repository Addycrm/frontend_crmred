<template>
  <div>
    <b-modal
      centered
      size="lg"
      :id="infoModal.id"
      ref="modal-register-permission-action"
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
        <app-collapse accordion>
          <app-collapse-item v-for="item in permissions" :key="item.id" :title="item.title" @show="getActions(item.id)">
            <template #header>
              <span class="lead collapse-title">{{item.title}}</span>
            </template>
            <div class="p-1">
              <b-row>
                <b-col>
                  <b-form-checkbox 
                    v-for="action in item.actions[0]"
                    :key="action.id"
                    :value="action.id"
                    v-model="selected"
                    inline
                  >
                    {{action.title}}
                  </b-form-checkbox>
                </b-col>
              </b-row>
              <b-row class="mt-1">
                <b-col>
                  <b-button
                      @click="addActivePermissionsActions(item.id)"
                      size="sm"
                      variant="primary"
                    >
                      Asignar accion
                    </b-button>
                </b-col>
              </b-row>
            </div>
          </app-collapse-item>
        </app-collapse>
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
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
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
      permiso:[],
      show: true,
      selected: [],
      permissions: [],
      permissions_active: [],
      actions: [],

      infoModal: {
        id: "modal-permission-action",
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
    getActions(id) {
      this.selected = [];
      this.getActivePermissionActions(id);
      // this.actions = [];

      let act = this.permissions.filter((code) => {
        return id == code.id;
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
      this.$refs["modal-register-permission-action"].hide();
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
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Permisos guardados',
              icon: "CheckCircleIcon",
              text: 'Permisos guardados exitosamente',
              variant: "success",
            }
          });
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Algo salio mal',
              icon: "AlertCircleIcon",
              text: 'Por favor intentalo más tarde',
              variant: "danger",
            },
          });

          console.error(error);
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
<style>
  
  .lead.collapse-title {padding: 1rem 2.8rem 1rem 1rem;margin: -1rem -2.8rem -1rem -1rem;display: block;cursor: pointer;flex-grow: 1;}
  
</style>