<template>
  <b-card title="Correos" header-tag="header" footer-tag="footer">
    <template #header>
      <h6 class="mb-0">Listado de correos</h6>
    </template>
    <div>
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <b-button
              size="sm"
              variant="primary"
              @click="infoAddActions($event.target)"
            >
              Agregar E-mails
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
        empty-text="No hay correos registrados por el momento"
        :items="emails"
        :fields="fields"
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
    </div>
    <template #footer>
      <em>Pie de pagina</em>
    </template>
  </b-card>
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
  BCard,
  BCardGroup,
} from "bootstrap-vue";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";

export default {
  name: "listEmailEmpresas",

  data() {
    return {
      isBusy: false,
      totalRows: 1,
      permissions: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      filter: null,
      filterOn: [],
      fields: [
        { key: "email", label: "Correo" },
        { key: "actions", label: "Opciones" },
      ],
    };
  },

  props: {
    emails: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPNit = 1;
    },
  },

  components: {
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
    BCard,
    BCardActions,
    BCardGroup,
  },
};
</script>

<style>
</style>