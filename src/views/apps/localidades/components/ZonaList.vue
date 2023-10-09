<template>
  <div id="OpcionesInmueble">
    <b-container>
      <buttonRegister
        :greeting-message="this.$route.params.id"
        :type="'zone'"
      />

      <b-card v-for="(item, index) in goodTable" :key="index">
        <h3 class="mb-2">
          {{ item.titulo }}
        </h3>
        <VueGoodTable
          styleClass="vgt-table striped"
          v-bind="item.tabla"
          :search-options="{
            enabled: true,
            placeholder: 'Buscar...',
          }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'name'">
              <div
                v-b-tooltip.hover
                class="title-tab"
                :title="props.formattedRow[props.column.field]"
              >
                {{ props.formattedRow[props.column.field] }}
              </div>
            </span>
            <span v-else-if="props.column.field === 'actions'" class="d-flex">
              <b-button
                @click="openModal(props.row, item.config)"
                size="sm"
                class="m-10"
                variant="info"
                :disabled="portales.length == 0"
              >
                Portales
              </b-button>
              <b-button
                size="sm"
                class="m-10"
                :to="{
                  name: 'localidades-barrios',
                  params: { id: props.row.id },
                }"
                variant="warning"
              >
                <span class="align-middle">Barrios</span>
              </b-button>
              <b-button
                @click="deleteZona(props.row)"
                size="sm"
                class="m-10"
                variant="danger"
              >
                Delete
              </b-button>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
          <template slot="pagination-bottom" slot-scope="props">
            <div class="d-flex flex-wrap align-items-center mt-1">
              <div class="d-flex align-items-center">
                <span class="text-nowrap"> Mostrando 1 a </span>
                <b-form-select
                  v-model="item.tabla.paginationOptions.perPage"
                  :options="['10', '20', '100']"
                  class="mx-1"
                  @input="
                    (value) => props.perPageChanged({ currentPerPage: value })
                  "
                />
                <span class="text-nowrap">
                  de {{ props.total }} registros
                </span>
              </div>
              <div
                v-if="props.total > item.tabla.paginationOptions.perPage"
                class="d-flex ml-auto"
              >
                <b-pagination
                  :value="1"
                  :total-rows="props.total"
                  :per-page="item.tabla.paginationOptions.perPage"
                  first-number
                  last-number
                  align="right"
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mb-0"
                  @input="(value) => props.pageChanged({ currentPage: value })"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </div>
            </div>
          </template>
        </VueGoodTable>
      </b-card>
    </b-container>
    <transition name="fade">
      <v-modal
        v-if="modal.state"
        @close="modal.state = false"
        titulo="Portales"
        size="sm"
        footer
      >
        <component
          is="FormCodePortales"
          ref="FormCodePortales"
          v-bind="modal"
        />
        <template #footer>
          <b-overlay :show="overlay">
            <b-button variant="info" @click="onSubmit"> Guardar </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
  </div>
</template>

<script>
import vSelect from "vue-select";
import VModal from "@/views/componente/vModal";
import FormCodePortales from "@/views/apps/inmuebles/opciones/components/FormCodePortales";
import { VueGoodTable } from "vue-good-table";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import buttonRegister from "./buttonRegister.vue";

export default {
  name: "LocalidadesPaises",
  components: {
    VModal,
    vSelect,
    FormCodePortales,
    VueGoodTable,
    buttonRegister,
  },

  data() {
    return {
      overlay: false,
      modal: {
        state: false,
      },
    };
  },
  computed: {
    zonas() {
      return this.$store.state.appLocalidades.zonas;
    },
    portales() {
      return this.$store.state.appPortales.portales;
    },
    goodTable() {
      return [
        {
          titulo: "Zonas",
          config: {
            prop: "portales_zona",
            config: {
              url: "api/auth/portales/zonas_portales",
              method: "post",
            },
          },
          tabla: {
            columns: [
              { field: "id", label: "ID", width: "6em" },
              { field: "name", label: "Zona" },
              { field: "actions", label: "Acciones", width: "10em" },
            ],
            rows: this.zonas,
            paginationOptions: {
              enabled: true,
              perPage: 10,
            },
          },
        },
      ];
    },
  },
  async mounted() {
    await this.$store.dispatch("appPortales/fetchPortales");
    this.$store.dispatch("appLocalidades/getZona", {
      codigo: this.$route.params.id,
    });
  },
  methods: {
    async deleteZona(id) {
      await this.$store
        .dispatch("appLocalidades/deleteZona", id.id)
        .then(() => {
          this.$store.commit("appLocalidades/DELETE_ZONA", id.id);
          this.toash("success", "Se elimino correctamente");
        })
        .catch((err) => {
          this.toash(
            "danger",
            "Ocurrio un error interno por favor intentalo de nuevo"
          );
        });
    },

    toash(params, message) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: message,
          icon: "EditIcon",
          variant: params,
        },
      });
    },
    async onSubmit() {
      this.overlay = true;
      await this.$refs["FormCodePortales"].onSubmit().then((state) => {
        let props = {
          title: "Algo ha ocurrido",
          icon: "AlertCircleIcon",
          text: "Actualiza el navegador. Si el problema persiste comunicate con nosotros",
          variant: "danger",
        };

        if (state) {
          this.modal.state = false;
          props = {
            title: "Actualizacion exitosa",
            icon: "CheckCircleIcon",
            text: "Tus datos se han actualizado exitosamente",
            variant: "success",
          };
        }

        this.$toast({
          component: ToastificationContent,
          props,
        });
      });
      this.overlay = false;
    },
    openModal(row, data) {
      Object.assign(
        this.modal,
        {
          state: true,
          row,
        },
        data
      );
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