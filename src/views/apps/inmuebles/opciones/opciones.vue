<template>
  <div id="OpcionesInmueble">
    <b-container>
      <b-card v-for="(item, index) in goodTable" :key="index">
        <h3 class="mb-2">
          {{item.titulo}}
        </h3>
        <VueGoodTable
          styleClass="vgt-table striped"          
          v-bind="item.tabla"
        >
          <template
            slot="table-row"
            slot-scope="props"
          >
            <span v-if="props.column.field == 'texto'">
              <div v-b-tooltip.hover class="title-tab" :title="props.formattedRow[props.column.field]">
                {{props.formattedRow[props.column.field]}}
              </div>
            </span>
            <span v-else-if="props.column.field === 'actions'" class="d-flex">
              <b-button @click="openModal( props.row, item.config)" size="sm" variant="primary" :disabled="portales.length == 0">
                Portales
              </b-button>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <div class="d-flex flex-wrap align-items-center mt-1">
              <div class="d-flex align-items-center">
                <span class="text-nowrap">
                  Mostrando 1 a
                </span>
                <b-form-select
                  v-model="item.tabla.paginationOptions.perPage"
                  :options="['10','20','100']"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage:value})"
                />
                <span class="text-nowrap"> de {{ props.total }} registros </span>
              </div>
              <div v-if="props.total > item.tabla.paginationOptions.perPage" class="d-flex ml-auto">
                 <b-pagination :value="1"
                  :total-rows="props.total"
                  :per-page="item.tabla.paginationOptions.perPage"
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
      </b-card>
    </b-container>
    <transition name="fade">
      <v-modal v-if="modal.state" @close="modal.state = false" titulo="Portales" size="sm" footer>
        <component is="FormCodePortales" ref="FormCodePortales" v-bind="modal"/>
        <template #footer>
          <b-overlay :show="overlay">
            <b-button variant="info" @click="onSubmit">
              Guardar
            </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
  </div>
</template>

<script>
import vSelect from "vue-select"
import VModal from "@/views/componente/vModal"
import FormCodePortales from '@/views/apps/inmuebles/opciones/components/FormCodePortales'
import { VueGoodTable } from 'vue-good-table'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'OpcionesInmueble',
  components: {
    VModal,
    vSelect,
    FormCodePortales,
    VueGoodTable,
  },

  data() {
    return {
      overlay: false,
      modal: {
        state: false
      },
    };
  },
  computed: {
    storeConfig(){
      return this.$store.state.appConfiguracion.options
    },
    portales(){
      return this.$store.state.appPortales.portales;
    },
    goodTable(){
      return [
        {
          titulo: 'Tipo de Inmueble',
          config: {
            prop: 'portales_tipo_inmueble',
            config: {
              url: 'api/auth/portales/tipo_inmueble_portal',
              method: 'post',
            }
          },
          tabla: {
            columns: [
              {field: "id", label: "ID", width:'6em'},
              {field: "tipo", label: "Nombre", width: '12em'},
              {field: "actions", label: "Acciones", width:'10em'},
            ],
            rows: this.storeConfig.property_type,
            paginationOptions: {
              enabled: true,
              perPage: 10
            }
          }
        },{
          titulo: 'Tipo de Negocio',
          config: {
            prop: 'portales_inmuebles_tipo_negocio',
            config: {
              url: 'api/auth/portales/tipo_negocio_portal',
              method: 'post',
            }
          },
          tabla: {
            columns: [
              {field: "id", label: "ID", width:'6em'},
              {field: "tipo", label: "Nombre", width: '12em'},
              {field: "actions", label: "Acciones", width:'10em'},
            ],
            rows: this.storeConfig.business_type,
            paginationOptions: {
              enabled: true,
              perPage: 10
            }
          }
        },
      ]
    }
  },
  mounted(){
    this.$store.dispatch("appPortales/fetchPortales");
  },
  methods: {
    async onSubmit(){
      this.overlay = true;
      await this.$refs['FormCodePortales'].onSubmit()
      .then(state => {
        let props = {
          title: 'Algo ha ocurrido',
          icon: "AlertCircleIcon",
          text: 'Actualiza el navegador. Si el problema persiste comunicate con nosotros',
          variant: "danger",
        };

        if(state){
          this.modal.state = false;
          props = {
            title: "Actualizacion exitosa",
            icon: "CheckCircleIcon",
            text: 'Tus datos se han actualizado exitosamente',
            variant: "success"
          }
        }
        
        this.$toast({
          component: ToastificationContent,
          props
        });
      });
      this.overlay = false;
    },
    openModal(row, data){
      Object.assign(this.modal, {
        state: true,
        row
      }, data);
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


