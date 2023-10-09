<template>
  <!-- Table Container Card -->
  <b-card no-body>
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
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
          <!-- <b-button variant="primary" :to="{ name: 'apps-referido-add' }">
            Agregar Departamentos
          </b-button> -->
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="filter"
              class="d-inline-block mr-1"
              placeholder="Buscar ciudades..."
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

    <!-- Main table element -->
    <b-table
      empty-text="No hay ciudades registrados por el momento"
      :items="ciudad"
      :fields="fields"
      responsive
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      show-empty
      @filtered="onFiltered"
      class="position-relative"
      outlined
    >
      <template #cell(id)="data">
        <b-badge pill variant="light-success">
          {{ data.item.id }}
        </b-badge>
      </template>

      <template #cell(actions)="data">
        <b-button-group size="sm">
          <b-button
            size="sm"
            :to="{
              name: 'localidades-zonas',
              params: { id: data.item.id },
            }"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-success"
          >
            <span class="align-middle">zonas</span>
          </b-button>
        </b-button-group>
      </template>

      <template #cell(portales)="data">
        <b-button-group size="sm">
          <b-button
            size="sm"
            @click="infoPortalCities(data.item, $event.target)"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
          >
            <span class="align-middle">Portales</span>
          </b-button>
        </b-button-group>
      </template>

      <template #cell(phone_code)="data">
        <b-badge pill variant="light-danger">
          + {{ data.item.phone_code }}
        </b-badge>
      </template>
    </b-table>

    <div class="mx-2 mb-2">
      <b-row>
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
    <modal-add-portal-cities ref="modalAddPortalCities" />
  </b-card>
</template>

<script>
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
  BFormGroup,
  BFormSelect,
  BButtonGroup,
  BInputGroupAppend,
  BCardText,
  VBPopover,
  BPopover,
  BModal,
  VBModal,
} from "bootstrap-vue";
import vSelect from "vue-select";
import BCardCode from "@core/components/b-card-code";
import Ripple from "vue-ripple-directive";
import modalAddPortalCitiesVue from "./modals/modalAddPortalCities.vue";

export default {
  components: {
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
    BFormGroup,
    BFormSelect,
    vSelect,
    BButtonGroup,
    BInputGroupAppend,
    BCardCode,
    BCardText,
    Ripple,
    BPopover,
    BModal,
    VBModal,
    "modal-add-portal-cities": modalAddPortalCitiesVue,
  },

  directives: {
    "b-popover": VBPopover,
    "b-modal": VBModal,
    Ripple,
  },

  data() {
    return {
      fields: [
        { key: "id", label: "Codigo", sortable: true },
        { key: "name", label: "Nombre", sortable: true },
        { key: "country_id", label: "Pais", sortable: true },
        { key: "country_code", label: "Codigo pais", sortable: true },
        { key: "latitude", label: "Latitud", sortable: true },
        { key: "portales", label: "portales", sortable: true },
        { key: "longitude", label: "Longitud", sortable: true },
        { key: "actions", label: "Acciones", sortable: true },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      path: "http://wa.me/",
      filter: null,
      filterOn: [],
    };
  },

  mounted() {},
  setup() {},

  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pNits due to filtering
      this.totalRows = filteredItems.length;
      this.currentPNit = 1;
    },

    infoPortalCities(id, button) {
      this.$refs.modalAddPortalCities.info(id, button);
    },

    getCiudades() {
      this.$store
        .dispatch("appLocalidades/getCiudades", {
          codigo: this.$route.params.id,
        })
        .then((response) => {
          this.totalRows = response.length;
        })
        .catch((error) => {
        });
    },
  },
  created() {
    this.getCiudades();
  },

  computed: {
    ciudad() {
      return this.$store.state.appLocalidades.ciudades;
    },
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
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
.per-page-selector {
  width: 90px;
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
</style>


