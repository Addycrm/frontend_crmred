<template>
  <div>
    <h2 class="mb-1">
      <b>Roles Predeterminados</b>
    </h2>
    <!-- <b-row>
      Per Page
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
      Search
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
    </b-row>
    <hr /> -->
    <VueGoodTable
      :columns="columns"
      :rows="rows"
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

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </VueGoodTable>
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
            @click="infoPermissionsPrivate(row.item, $event.target)"
          >
            <feather-icon icon="PlusSquareIcon" class="mr-50" />
            <span class="align-middle"> Asignar permisos</span>
          </b-button>
          <b-button
            size="sm"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            @click="infoAddPermissionActionPrivate(row.item, $event.target)"
          >
            <feather-icon icon="PlusSquareIcon" class="mr-50" />
            <span class="align-middle">Permisos</span>
          </b-button>
        </div>
      </template>

      <template #row-details="row">
        <user-permissions-card :roles="row.item" />
      </template>
    </b-table> -->

    <add-permissions-private
      ref="addPermissionsPrivate"
    ></add-permissions-private>

    <add-permissions-actions-private
      ref="addPermissionsActionsPrivate"
    ></add-permissions-actions-private>
    
  </div>
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
import useRoleListPrivate from "./useRoleListPrivate";

import Ripple from "vue-ripple-directive";
import roleStoreModule from "../roleStoreModule";
import UserPermissionsCardVue from "../components/UserPermissionsCard.vue";
import modalRegisterRoleVue from "../components/modal-register-role.vue";
import modalPermissionsActionsPrivateVue from "../components/modal-permissions-actions-private.vue";
import modalRegisterPermissionsPrivateVue from "../components/modal-register-permissions-private.vue";

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
    "add-permissions-private": modalRegisterPermissionsPrivateVue,
    "add-permissions-actions-private": modalPermissionsActionsPrivateVue,
  },
  directives: {
    Ripple,
  },
  data(){
    return{
      columns: [
        {label: 'Nombre', field: 'nombre', width: '25em'},
        {label: 'Descripción', field: 'descripcion',},
      ],
    }
  },
  mounted() {
    this.fetchRoles();
  },

  methods: {
    infoPermissionsPrivate(code, button) {
      this.$refs.addPermissionsPrivate.info(code, button);
    },

    infoAddPermissionActionPrivate(code, button) {
      this.$refs.addPermissionsActionsPrivate.info(code, button);
    },

    infoEdict(code, button) {
      this.$refs.edictRole.info(code, button);
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
      return store.state.appRole.roles;
    });
    const rows = computed(() => {
      return store.state.appRole.roles;
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
    } = useRoleListPrivate();

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
      roles,
      rows
    };
  },
};
</script>
<style lang="css" scoped>
.tableColorWidth {
  background-color: #3eef33;
  color: red;
}
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
