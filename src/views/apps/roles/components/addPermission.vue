<template>
  <!-- PERMISSION TABLE -->
  <div>
    <b-card>
      <b-row>
        <b-col>
          <div class="roles">
            <div v-for="role in permissions_roles" :key="role.id">
              <a class="role" v-on:click="update(role)"
                >Select <b>{{ role.subject }}</b></a
              >
            </div>
          </div>
          {{ permissions }}
          <app-collapse hover>
            <app-collapse-item
              v-for="perm in permissions"
              v-bind:key="perm.id"
              :title="perm.title"
              v-model="currentPerms.subject"
            >
              <div class="demo-inline-spacing">
                <b-form-checkbox
                  v-for="data in perm.action"
                  v-bind:key="data.id"
                  :value="data.id"
                  v-model="currentPerms.action.id"
                >
                  {{ data.action }}
                </b-form-checkbox>
              </div>
            </app-collapse-item>
          </app-collapse>
        </b-col>
      </b-row>
      <hr />
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-toggle.collapse-1-inner
        size="xl"
        variant="outline-primary"
      >
        Registrar permisos
      </b-button>
    </b-card>
  </div>

  <!-- Action Buttons -->
</template>

<script>
import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BContainer,
  BModal,
  BFormCheckboxGroup,
  VBToggle,
} from "bootstrap-vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import Ripple from "vue-ripple-directive";
import { range, random } from "lodash";

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    BContainer,
    BModal,
    BFormCheckboxGroup,
    AppCollapse,
    AppCollapseItem,
  },

  data() {
    return {
      currentPerms: [],
      currentRole: null,
      param: this.$route.params.slug,
      permissions: [],
      permissions_roles: [],
      data: ["create", "updated", "read", "delete"],
    };
  },
  computed: {
    modules() {
      this.$store.state.appRole.modules;
    },
  },

  created() {
    this.getModules();
    //this.getPermissionRole()
  },

  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },

  methods: {
    info(code, button) {
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    update(role) {
      this.currentRole = role;
      let data = [];
      this.currentPerms = this.permissions.find(
        (x) => x.action.id === role.action.id
      );
      for (let i = 0; i < this.currentPerms.length; i++) {
        for (let j = 0; j < this.currentPerms.action.length; j++) {
          data.push();
        }
      }
    },

    async getPermissionRole() {
      let params = this.$route.params.slug;
      await this.$store
        .dispatch("appRole/getPermissionRole", { roles: params })
        .then((data) => {
          let datas = [];
          for (let index = 0; index < data.length; index++) {
            datas.push({
              id: data[index].id,
              role: data[index].role_id.nombre,
              subject: data[index].permission_id.subject,
              action: data[index].permission_action,
            });
          }
          this.permissions_roles = data;
        });
    },

    async getModules() {
      await this.$store.dispatch("appRole/getModules").then((data) => {
        this.permissions = data;
        this.getPermissionRole();
      });
    },
  },
};
</script>
<style>
.headerRow {
  padding: 0.75rem;
  background-color: #000000;
  color: #ffffff;
  font-weight: bold;
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.bodyRow {
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
}
</style>
