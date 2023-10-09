<template>
  <div style="max-width: 50%">
    <div class="m-2">
      <h1>Acciones</h1>
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-button variant="primary" @click="infoAddActions($event.target)">
            Agregar acciones
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="filter"
              class="d-inline-block mr-1"
              placeholder="Buscar permisos..."
            />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >limpiar</b-button
              >
            </b-input-group-append>
          </div>
        </b-col>
      </b-row>
    </div>

    <b-table
      empty-text="No hay permisos registrados por el momento"
      :items="actions"
      :fields="colunm"
      :busy="isBusy"
      class="mt-3"
      responsive
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      show-empty
      @filtered="onFiltered"
      outlined
    >
      <template #cell(action)="row">
        <div class="demo-inline-spacing">
          <b-badge variant="primary" class="badge-glow">
            <feather-icon icon="StarIcon" class="mr-25" />
            <span>{{ row.item.action }}</span>
          </b-badge>
        </div>
      </template>

      <template #cell(actions)="row">
        <div class="demo-inline-spacing">
          <b-button
          size="sm"
            variant="success"
            @click="infoEdictActions(row.item, $event.target)"
          >Editar
            <feather-icon icon="EditIcon" />
          </b-button>
        </div>
      </template>

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Entradas</label>

          <v-select
            v-model="perPage"
            :options="pageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
        </b-col>
        <!-- Pagination -->
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
            :total-rows="totalRows"
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
    </div>
    <register-actions-module ref="registerActionsModule">
    </register-actions-module>
    <edict-actions-module ref="edictActionsModule"></edict-actions-module>
  </div>
</template>

<script>
import {
  BTable,
  BSpinner,
  BButton,
  BContainer,
  BRow,
  BCol,
  BFormInput,
  BInputGroupAppend,
  BPagination,
  BBadge,
} from "bootstrap-vue";
import modalRegisterActionsVue from "./component/modal-register-actions.vue";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import modalRegistrarActionsModuleVue from "./component/modal-registrar-actions-module.vue";
import modalEditActionsModuleVue from "./component/modal-edit-actions-module.vue";

export default {
  components: {
    BTable,
    BSpinner,
    BContainer,
    BButton,
    BRow,
    BBadge,
    BCol,
    BFormInput,
    BInputGroupAppend,
    BPagination,
    vSelect,
    "register-actions": modalRegisterActionsVue,
    "register-actions-module": modalRegistrarActionsModuleVue,
    "edict-actions-module": modalEditActionsModuleVue,
  },

  data() {
    return {
      fields: [],
      totalRows: 1,
      permissions: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      path: "http://wa.me/",
      filter: null,
      filterOn: [],
      colunm: [
        {
          key: "title",
          label: "Titulo",
          sortable: true,
          thStyle: { backgroundColor: "#7482D3", color: "#fff" },
        },
        {
          key: "action",
          label: "codigo",
          sortable: true,
          thStyle: { backgroundColor: "#7482D3", color: "#fff" },
        },
      
        {
          key: "actions",
          label: "Acciones",
          sortable: true,
          thStyle: { backgroundColor: "#3eef33" },
        },
      ],
      isBusy: false,
    };
  },

  directives: {
    Ripple,
  },

  computed: {
    actions() {
      return this.$store.state.appRole.actions;
    },
  },

  created() {
    this.getModules();
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPNit = 1;
    },

    toggleBusy() {
      this.isBusy = !this.isBusy;
    },

    infoAddActions(button) {
      this.$refs.registerActionsModule.info(button);
    },

    infoEdictActions(code, button) {
      this.$refs.edictActionsModule.info(code, button);
    },

    getModules() {
      this.$store.dispatch("appRole/getActions").then(() => {});
    },
  },
};
</script>
