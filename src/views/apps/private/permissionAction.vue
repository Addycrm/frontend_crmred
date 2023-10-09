<template>
  <div>
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
        <h1>Permisos & Acciones</h1>

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
      :items="permissionsActions"
      :fields="colunm"
      :busy="isBusy"
      class="mt-3"
      responsive
      :current-page="currentPagePA"
      :per-page="perPagePA"
      :filter="filter"
      :filter-included-fields="filterOn"
      show-empty
      @filtered="onFiltered"
      outlined
    >
      <template #cell(actions)="row">
        <div class="demo-inline-spacing">
          <b-badge
            variant="primary"
            v-for="actions in row.item.actions[0]"
            v-bind:key="actions.id"
          >
            <feather-icon icon="StarIcon" class="mr-25" />
            <span>{{ actions.title }}</span>
          </b-badge>
        </div>
      </template>
      <template #cell(action)="row">
        <div class="demo-inline-spacing">
          <b-button
            size="sm"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="warning"
            @click="infoAsignarPermisos(row.item, $event.target)"
          >
            <feather-icon icon="PlusSquareIcon" class="mr-50" />
            <span class="align-middle"> Asignar Acciones</span>
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
            v-model="perPagePA"
            :options="pageOptionsPA"
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
            v-model="currentPagePA"
            :total-rows="totalRowsPA"
            :per-page="perPagePA"
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
    <register-actions ref="addActions"> </register-actions>
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
  },

  data() {
    return {
      fields: [],
      totalRowsPA: 1,
      permissions: [],
      currentPagePA: 1,
      perPagePA: 5,
      pageOptionsPA: [5, 10, 15, { value: 100, text: "Show a lot" }],
      path: "http://wa.me/",
      filter: null,
      filterOn: [],
      colunm: [
        {
          key: "id",
          label: "Codigo",
          sortable: true,
          thStyle: { backgroundColor: "#7482D3", color: "#fff" },
        },
        {
          key: "title",
          label: "Nombre del rol",
          sortable: true,
          thStyle: { backgroundColor: "#7482D3", color: "#fff" },
        },
        {
          key: "subject",
          label: "code",
          sortable: true,
          thStyle: { backgroundColor: "#7482D3", color: "#fff" },
        },
        {
          key: "actions",
          label: "Interaciones",
          sortable: true,
          thStyle: { backgroundColor: "#7482D3", color: "#fff" },
        },

        {
          key: "action",
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
    permissionsActions() {
      return this.$store.state.appRole.permissions;
    },
  },

  created() {
    this.getModules();
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRowsPA = filteredItems.length;
      this.currentPNit = 1;
    },

    toggleBusy() {
      this.isBusy = !this.isBusy;
    },

    addRegisterModule(button) {
      this.$refs.addRegisterModule.info(button);
    },
    infoAsignarPermisos(code, button) {
      this.$refs.addActions.info(code, button);
    },

    infoAddActions() {
      this.$refs.addActions.info(code, button);
    },

    getModules() {
      this.$store.dispatch("appRole/getPermissionsActions").then((data) => {
        this.totalRowsPA = data.length
      });
    },
  },
};
</script>
