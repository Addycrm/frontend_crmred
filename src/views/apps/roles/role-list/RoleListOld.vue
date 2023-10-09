<template>
  <div id="RolesPermisos">
    <b-card>
      <template #header>
        <h3 class="mb-0 mr-2">
          Tus Roles y Permisos
        </h3>
        <b-button class="text-nowrap mr-auto d-flex align-items-center" size="sm" variant="success" @click="info($event.target)">
          <span class="align-middle">Crear Rol</span>
        </b-button>
      </template>
      <!-- <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Entradas</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button variant="primary" @click="info($event.target)">
            Agregar roles
          </b-button>
        </b-col>
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="filter"
              class="d-inline-block mr-1"
              placeholder="Buscar roles..."
            />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >limpiar</b-button
              >
            </b-input-group-append>
          </div>
        </b-col>
      </b-row> -->
      <register-role ref="registerRole"></register-role>
      <b-row>
        <b-col>
          <VueGoodTable
            :columns="columns"
            :rows="rows"
            :pagination-options="{
              enabled: true,
              perPage:pageTable
            }"
            styleClass="vgt-table striped"
          >
            <template
              slot="table-row"
              slot-scope="props"
            >
              <!-- Column: Action -->
              <span class="d-block text-left" v-if="props.column.field === 'descripcion'">
                <div v-html="props.formattedRow[props.column.field]"></div>
              </span>
              <span class="d-block text-right" v-else-if="props.column.field === 'action'">
                <b-button
                  size="sm"
                  variant="success"
                  @click="infoEdict(props.row, $event.target)"
                >
                  <feather-icon icon="EditIcon" class="mr-50" />
                  <span class="align-middle">Editar</span>
                </b-button>

                <b-button
                  size="sm"
                  variant="warning"
                  @click="infoPermissions(props.row, $event.target)"
                >
                  <feather-icon icon="PlusSquareIcon" class="mr-50" />
                  <span class="align-middle"> Asignar permisos</span>
                </b-button>
                <b-button
                  size="sm"
                  variant="primary"
                  @click="infoAddPermissionAction(props.row, $event.target)"
                >
                  <feather-icon icon="PlusSquareIcon" class="mr-50" />
                  <span class="align-middle">Permisos</span>
                </b-button>
              </span>

              <!-- Column: Common -->
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
            <template
              slot="pagination-bottom"
              slot-scope="props"
            >
              <div class="d-flex justify-content-between flex-wrap align-items-center mt-1">
                <div v-if="rows.length > pageTable" class="d-flex">
                  <span class="text-nowrap">
                    Mostrando 1 a
                  </span>
                  <b-form-select
                    v-model="pageTable"
                    :options="['10','20','100']"
                    class="mx-1"
                    @input="(value)=>props.perPageChanged({currentPerPage:value})"
                  />
                  <span class="text-nowrap"> de {{ props.total }} registros </span>
                </div>
                <div v-if="props.total > pageTable" class="d-flex">
                  <b-pagination
                    :value="1"
                    :total-rows="props.total"
                    :per-page="pageTable"
                    first-number
                    last-number
                    align="right"
                    prev-class="prev-item"
                    next-class="next-item"
                    class="mb-0"
                    @input="(value)=>props.pageChanged({currentPage:value})"
                  >
                    <template #prev-text>
                      <feather-icon
                        icon="ChevronLeftIcon"
                        size="18"
                      />
                    </template>
                    <template #next-text>
                      <feather-icon
                        icon="ChevronRightIcon"
                        size="18"
                      />
                    </template>
                  </b-pagination>
                </div>
              </div>
            </template>
          </VueGoodTable>
        </b-col>
      </b-row>
      <!-- <b-table
        ref="refInvoiceListTable"
        :items="roles"
        responsive
        :fields="tableColumns"
        :filter="filter"
        :per-page="perPage"
        :current-page="currentPage"
        :filter-included-fields="filterOn"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No hay roles registrados por el momento"
        :sort-desc.sync="isSortDirDesc"
        class="position-relative"
        outlined
      >
        
        <template #cell(id)="row">
          <b-badge pill variant="light-primary" class="text-capitalize">{{
            row.item.id
          }}</b-badge>
        </template>
        <template #cell(descripcion)="row">
          <span v-html="row.item.descripcion"></span>
        </template>
        <template #cell(action)="row">
          <div class="demo-inline-spacing">
            <b-button
              size="sm"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="success"
              @click="infoEdict(row.item, $event.target)"
            >
              <feather-icon icon="EditIcon" class="mr-50" />
              <span class="align-middle">Editar</span>
            </b-button>

            <b-button
              size="sm"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="warning"
              @click="infoPermissions(row.item, $event.target)"
            >
              <feather-icon icon="PlusSquareIcon" class="mr-50" />
              <span class="align-middle"> Asignar permisos</span>
            </b-button>
            <b-button
              size="sm"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="infoAddPermissionAction(row.item, $event.target)"
            >
              <feather-icon icon="PlusSquareIcon" class="mr-50" />
              <span class="align-middle">Persmisos</span>
            </b-button>
          </div>
        </template>

        <template #row-details="row">
          <user-permissions-card :roles="row.item" />
        </template>
      </b-table> -->
      <edict-role ref="edictRole"></edict-role>
      <add-permissions ref="addPermissions"></add-permissions>

      <add-permissions-actions
        ref="addPermissionsActions"
      ></add-permissions-actions>
      <!-- <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            "
          >
         Total: {{totalRoles}}
          </b-col>
          
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRoles"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div> -->
    
  </b-card>
    <b-card>
      <role-private />
    </b-card>
  </div>
  <!-- Table Container Card -->
  
</template>

<script>
  import { VueGoodTable } from 'vue-good-table'
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BTooltip,
  BContainer,
  BInputGroupAppend,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { computed, onUnmounted } from "@vue/composition-api";
import store from "@/store";
import useRoleList from "./useRoleList";

import Ripple from "vue-ripple-directive";
import roleStoreModule from "../roleStoreModule";
import UserPermissionsCardVue from "../components/UserPermissionsCard.vue";
import modalRegisterRoleVue from "../components/modal-register-role.vue";
import modalRegisterPermissionsVue from "../components/modal-register-permissions.vue";
import modalEdictRoleVue from "../components/modal-edict-role.vue";
import modalPermissionsActionsVue from "../components/modal-permissions-actions.vue";
import permissionActionVue from "../../private/permissionAction.vue";
import RoleListPrivateVue from "./RoleList-private.vue";

export default {
  components: {
    VueGoodTable,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,

    vSelect,
    BContainer,
    BInputGroupAppend,
    "user-permissions-card": UserPermissionsCardVue,
    "register-role": modalRegisterRoleVue,
    "add-permissions": modalRegisterPermissionsVue,
    "edict-role": modalEdictRoleVue,
    "add-permissions-actions": modalPermissionsActionsVue,
    "permission-actions": permissionActionVue,
    "role-private": RoleListPrivateVue,
  },
  directives: {
    Ripple,
  },
  data(){
    return{
      pageTable: 10,
      columns: [
        {label: 'Nombre', field: 'nombre', width: '25em'},
        {label: 'Descripción', field: 'descripcion',},
        {label: 'Acciónes', field: 'action', width: '30em'},
      ],
    }
  },
  mounted() {
    this.fetchRoles();
  },

  methods: {
    infoEdict(code, button) {
      this.$refs.edictRole.info(code, button);
    },

    infoPermissions(code, button) {
      this.$refs.addPermissions.info(code, button);
    },

    infoAddPermissionAction(code, button) {
      this.$refs.addPermissionsActions.info(code, button);
    },

    info(button) {
      this.$refs.registerRole.info(button);
    },
    infoEdict(code, button) {
      this.$refs.edictRole.info(code, button);
    },

    infoPermission(code, button) {
      this.$refs.addPermission.info(code, button);
    },

    info(button) {
      this.$refs.registerRole.info(button);
    },
  },

  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "app-invoice";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(INVOICE_APP_STORE_MODULE_NAME, roleStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    const statusOptions = [
      "Downloaded",
      "Draft",
      "Paid",
      "Partial Payment",
      "Past Due",
    ];

    const roles = computed(() => {
      return store.state.appRole.role_users;
    });
    const rows = computed(() => {
      return store.state.appRole.role_users;
    });

    const permission_roles = [];

    const {
      fetchRoles,
      onfiltered,
      tableColumns,
      currentPage,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      totalRoles,
      statusFilter,
      filter,
      filterOn,
      perPage,
      refetchData,
    } = useRoleList();

    return {
      fetchRoles,
      onfiltered,
      tableColumns,
      perPage,
      currentPage,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      totalRoles,
      statusFilter,
      filter,
      filterOn,
      refetchData,
      permission_roles,
      statusOptions,
      rows,
      roles,
    };
  },
};
</script>
<style lang="css">
.tableColorWidth {
  background-color: #3eef33;
  color: red;
}
.vgt-table th.sortable::before, .vgt-table th.sortable::after{right:1rem!important; }
</style>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
.width-container {
  width: 90%;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}

.table .bTableThStyle {
  max-width: 12rem !important;
  text-overflow: ellipsis !important;
}
</style>
