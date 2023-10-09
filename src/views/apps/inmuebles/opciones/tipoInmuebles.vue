<template>
  <!-- Table Container Card -->
  <b-container fluid>
    <div class="demo-inline-spacing">
      <b-card no-body style="width: 45%">
        <div class="m-2">
          <b-row>
            <b-col cols="12" md="12">
              <div class="d-flex align-items-center justify-content-end">
                <b-form-input
                  v-model="filter"
                  class="d-inline-block mr-1"
                  placeholder="Buscar tipo de inmueble..."
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
          empty-text="No hay tipos de inmueble registrado por el momento"
          :items="inmueblesOptions.tipo_inmuebles"
          :fields="fields"
          responsive
          :current-page="currentPageTP"
          :per-page="perPageTP"
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
                @click="infoTipoInmueble(data.item, $event.target)"
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
              class="
                d-flex
                align-items-center
                justify-content-start
                mb-1 mb-md-0
              "
            >
              <label>Entradas</label>

              <v-select
                v-model="perPageTP"
                :options="pageOptionsTP"
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
                v-model="currentPageTP"
                :total-rows="totalRowsTP"
                :per-page="perPageTP"
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

        <modal-tipo-inmueble ref="modalTipoInmueble" />
      </b-card>
    </div>
  </b-container>
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
import modalTipoInmuebleVue from "./components/modalTipoInmueble.vue";

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

    "modal-tipo-inmueble": modalTipoInmuebleVue,
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
        { key: "tipo", label: "Nombre", sortable: true },
        { key: "portales", label: "portales" },
      ],
      totalRowsTP: 1,
      currentPageTP: 1,
      perPageTP: 5,
      pageOptionsTP: [5, 10, 15, { value: 100, text: "Show a lot" }],

      path: "http://wa.me/",
      filter: null,
      filterOn: [],
    };
  },

  mounted() {},
  setup() {},

  methods: {
    onFiltered(filteredItems) {
      this.totalRowsTP = filteredItems.length;
      this.currentPNit = 1;
    },

    infoTipoInmueble(data, button) {
      return this.$refs.modalTipoInmueble.info(data, button);
    },

    async getTipoInmuebles() {
      await this.$store.dispatch("apiInmueblePrivate/getTipoInmueble").then((res) => {
        this.totalRowsTP = res.length;
      });
    },
  },
  created() {
    this.getTipoInmuebles();
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


