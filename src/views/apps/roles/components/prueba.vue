<template>
  <!-- PERMISSION TABLE -->
  <div>
    <b-card>
      <b-row>
        <b-col>
          <b-container>
            <div id="permissionsTable">
              <b-row class="headerRow">
                <b-col cols="3">Permissions</b-col>
                <b-col v-for="role in roles" v-bind:key="role.name">{{
                  role.name
                }}</b-col>
              </b-row>
              <b-row
                v-for="permission in permissions"
                v-bind:key="permission.name"
                class="bodyRow"
              >
                <b-col cols="3">{{ permission.name }}</b-col>
                <b-col v-for="(role, index) in roles" v-bind:key="role.name">
                  <b-form-checkbox-group
                    v-bind:id="role.name"
                    v-bind:name="role.name + 'Permissions'"
                    v-model="roles[index].permissions"
                  >
                    <b-form-checkbox v-bind:value="permission.id" />
                  </b-form-checkbox-group>
                </b-col>
              </b-row>
            </div>
          </b-container>
        </b-col>
      </b-row>
    </b-card>
    <b-card no-body class="border mt-1">
      <b-card-header class="p-1">
        <b-card-title class="font-medium-2">
          <feather-icon icon="LockIcon" size="18" />
          <span class="align-middle ml-50">Permisos</span>
        </b-card-title>
      </b-card-header>

      <b-table striped responsive class="mb-0" :items="permissions">
        <template #cell(modulos)="data">
          {{ data.value }}
        </template>
        <template #cell()="data">
          <b-form-checkbox :checked="data.value" />
        </template>
      </b-table>

      <b-button variant="primary" class="mb-1 mb-sm-0 mr-0 mr-sm-1">
        Guardar cambios
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
  BModal,
} from "bootstrap-vue";

export default {
  name: "modalPermission",
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

    BModal,
  },

  data() {
    return {
      permissions: [],

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
    this.getPermissionRole();
  },

  methods: {
    info(code, button) {
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    getPermissionRole() {
      let params = this.$route.params.slug;
      this.$store
        .dispatch("appRole/getPermissionRole", { roles: params })
        .then((data) => {
        });
    },

    getModules() {
      this.$store.dispatch("appRole/getModules").then((data) => {
        data.forEach((element) => {
          this.permissions.push({
            modulos: element.subject,
            crear: element.action == "create" ? true : false,
            Actualizar: element.action == 2 ? true : false,
            Leer: element.action == "read" ? true : false,
            Eliminar: element.action == 4 ? true : false,
          });
        });
      });
    },
  },
};
</script>