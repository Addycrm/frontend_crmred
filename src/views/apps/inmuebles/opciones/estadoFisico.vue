<template>
  <b-card no-body style="width: 45%">
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->

        <!-- Search -->
        <b-col cols="12" md="12">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="filter"
              class="d-inline-block mr-1"
              placeholder="Buscar tipo de negocio..."
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
      empty-text="No hay estado fisico registrado por el momento"
      :items="inmueblesOptions.state_fisicos"
      :fields="fields"
      responsive
      :current-page="currentPageES"
      :per-page="perPageES"
      :filter="filter"
      :filter-included-fields="filterOn"
      show-empty
      @filtered="onFiltered"
      class="position-relative"
      outlined
    >
      <template #cell(portales)="data">
        <b-button-group size="sm">
          <b-button
            size="sm"
            @click="infoTipoNegocio(data.item, $event.target)"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
          >
            <span class="align-middle">Portales</span>
          </b-button>
        </b-button-group>
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
            v-model="perPageES"
            :options="pageOptionsES"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <!-- <b-button variant="primary" :to="{ name: 'apps-referido-add' }">
            Agregar Departamentos
          </b-button> -->
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
            v-model="currentPageES"
            :total-rows="totalRowsES"
            :per-page="perPageES"
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
    <modal-state-fisico ref="modalEstadoFisico" />
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
  BContainer,
  BPopover,
  BModal,
  VBModal,
} from "bootstrap-vue";
import vSelect from "vue-select";
import BCardCode from "@core/components/b-card-code";
import Ripple from "vue-ripple-directive";
import modalEstadoFisicoVue from "./components/modalEstadoFisico.vue";

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
    BContainer,
    Ripple,
    BPopover,
    BModal,
    VBModal,

    "modal-state-fisico": modalEstadoFisicoVue,
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
        { key: "portales", label: "portales" },
      ],

      totalRowsES: 1,
      currentPageES: 1,
      perPageES: 5,
      pageOptionsES: [5, 10, 15, { value: 100, text: "Show a lot" }],

      path: "http://wa.me/",

      filter: null,
      filterOn: [],
    };
  },

  mounted() {},
  setup() {},

  methods: {
    onFiltered(filteredItems) {
      this.totalRowsES = filteredItems.length;
      this.currentPNit = 1;
    },

    infoTipoNegocio(data, button) {
      return this.$refs.modalEstadoFisico.info(data, button);
    },

    getEstadoFisico() {
      this.$store.dispatch("apiInmueblePrivate/getStateFisico").then((res) => {
        this.totalRowsES = res.length;
      });
    },
  },
  created() {
    this.getEstadoFisico();
  },

  computed: {
    inmueblesOptions() {
      return this.$store.state.apiInmueblePrivate.options;
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

.width-data {
  max-width: 50%;
}
</style>


