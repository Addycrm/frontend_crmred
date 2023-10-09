<template>
    <div id="OpcionesInmueble">
        <b-container>
          <b-nav tabs>
                <b-nav-item v-for="item in goodTable" :key="item.config.id" :active="(selectedNav==item.config.id)?true:false" @click="showFeatures(item.config.id)">
                    {{ item.titulo }}
                </b-nav-item>
          </b-nav>
        <b-card v-for="(item, index) in goodTable" :key="index" v-show="selectedNav==item.config.id">
          <h3 class="mb-2">
            {{item.titulo}}
          </h3>
          <div class="custom-search">
          <!-- advance search input -->
          <b-row>
            <b-col md="3" sm="12">
              <b-form-group>
                <label> ID Cpanel:</label>
                <b-form-input
                  placeholder="Buscar por ID Cpanel"
                  type="search"
                  trim
                  class="d-inline-block"
                  v-model="form.idCpanel"
                  @input="advanceSearch"
                />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12">
              <b-form-group>
                <label>Nombre de la Caracterisitca:</label>
                <b-form-input
                  placeholder="Buscar por nombre"
                  type="search"
                  trim
                  class="d-inline-block"
                  v-model="form.name"

                  @input="advanceSearch"
                />
              </b-form-group>
            </b-col>

          </b-row>
          </div>

          <VueGoodTable
            styleClass="vgt-table striped"          
            v-bind="item.tabla"
            :search-options="{
              enabled: true,
              externalQuery: searchTerm 
            }"
          >
            <template
              slot="table-row"
              slot-scope="props"
            >
              <span v-if="props.column.field == `${item.configEditFeatures.pathCpanel}.codigo`">
                  <p v-if="props.row[item.configEditFeatures.pathCpanel]">
                    <b-badge variant="success">{{props.formattedRow[props.column.field]}}</b-badge>
                  </p>
                  <p v-else>
                    <b-badge variant="warning">
                      No tiene código
                    </b-badge>
                  </p>
              </span>
              <span v-else-if="props.column.field == 'texto'">
                <div v-b-tooltip.hover class="title-tab">
                  {{props.formattedRow[props.column.field]}}
                </div>
              </span>
              <span v-else-if="props.column.field === 'actions'" class="actions__btns">
                <b-button @click="openModal( props.row, item.config)" size="sm" variant="primary" :disabled="portales.length == 0">
                  Portales
                </b-button>
                <b-button @click="openModalEdit(props.row, item.configEditFeatures)" size="sm" variant="success" :disabled="portales.length == 0" class="d-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" :style="{fill: 'white'}">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                  </svg>
                  Modificar
                </b-button>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
            <template slot="emptystate">
                <div class="text-center p-1">No hay caracteristicas registradas</div>
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
      <transition name="fade">
        <v-modal v-if="stateModalEditFeatures" @close="stateModalEditFeatures = false" titulo="Editar Caracteristicas" size="sm">
          <component is="FormEditFeatures" ref="ModalEdit" :propFeature="propsRow" @updateFeaturesTable="updateFeaturesTable"/>
        </v-modal>
      </transition>
    </div>
  </template>
  
  <script>
  import vSelect from "vue-select"
  import VModal from "@/views/componente/vModal"
  import FormCodePortales from '@/views/apps/inmuebles/opciones/components/FormCodePortales'
  import FormEditFeatures from "./components/FormEditFeatures.vue"
  import { VueGoodTable } from 'vue-good-table'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  import { BNav, BNavItem } from 'bootstrap-vue'

  export default {
    name: 'OpcionesInmueble',
    components: {
      VModal,
      vSelect,
      FormCodePortales,
      VueGoodTable,
      FormEditFeatures,
      BNav,
    BNavItem,
    },
  
    data() {
      return {
        overlay: false,
        stateModalEditFeatures:false,
        propsRow:{},
        modal: {
          state: false
        },
        selectedNav:1,
        features:[
            {
                id:1,
                name:'Caracteristicas internas',
                state:true
            },
            {
                id:2,
                name:'Caracteristicas externas',
                state:false
            }
        ],
        searchTerm:'',
        form:{
          idCpanel:null,
          name:null
        }
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
            titulo: 'Caracteristicas Internas',
            config: {
              id:1,
              prop: 'portales_caracteristicas_internas',
              config: {
                url: 'api/auth/portales/caracteristicas_internas_portal',
                method: 'post',
              }
            },
            configEditFeatures:{
              url:'carateristica-internas',
              pathHelpers:'caracteristicas_internas',
              pathCpanel:'cpanel_caracteristicas_internas'
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em',},
                {field: "cpanel_caracteristicas_internas.codigo", label: "ID CPANEL", width:'6em'},
                {field: "texto", label: "Nombre", width: '12em'},
                {field: "actions", label: "Acciones", width:'10em'},
              ],
              rows: this.storeConfig.caracteristicas_internas,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          },
          {
            titulo: 'Caracteristicas Externas',
            config: {
              id:2,
              prop: 'portales_caracteristicas_externas',
              config: {
                url: 'api/auth/portales/caracteristicas_externas_portal',
                method: 'post',
              }
            },
            configEditFeatures:{
              url:'carateristica-externas',
              pathHelpers:'caracteristicas_externas',
              pathCpanel:'cpanel_caracteristicas_externas'
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "cpanel_caracteristicas_externas.codigo", label: "ID CPANEL", width:'6em'},
                {field: "texto", label: "Nombre", width: '12em'},
                {field: "actions", label: "Acciones", width:'10em'},
              ],
              rows: this.storeConfig.caracteristicas_externas,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          },
          {
            titulo: 'Caracteristicas Clasificación',
            config: {
              id:3,
              prop: 'portales_caracteristicas_clasificacion',
              config: {
                url: 'api/auth/portales/carateristica-clasificacion',
                method: 'post',
              }
            },
            configEditFeatures:{
              url:'carateristica-clasificacion',
              pathHelpers:'caracteristicas_clasificacion',
              pathCpanel:'cpanel_caracteristicas_clasificacion'
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "cpanel_caracteristicas_clasificacion.codigo", label: "ID CPANEL", width:'6em'},
                {field: "texto", label: "Nombre", width: '12em'},
                {field: "actions", label: "Acciones", width:'10em'},
              ],
              rows: this.storeConfig.caracteristicas_clasificacion,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          },
          {
            titulo: 'Caracteristicas Ubicación',
            config: {
              id:4,
              prop: 'portales_caracteristicas_ubicacion',
              config: {
                url: 'api/auth/portales/carateristica-clasificacion',
                method: 'post',
              }
            },
            configEditFeatures:{
              url:'carateristica-ubicacion',
              pathHelpers:'caracteristicas_ubicacion',
              pathCpanel:'cpanel_caracteristicas_ubicacion'
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "cpanel_caracteristicas_ubicacion.codigo", label: "ID CPANEL", width:'6em'},
                {field: "texto", label: "Nombre", width: '12em'},
                {field: "actions", label: "Acciones", width:'10em'},
              ],
              rows: this.storeConfig.caracteristicas_ubicacion,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          },
          {
            titulo: 'Caracteristicas Orientación',
            config: {
                id:5,
              prop: 'portales_caracteristicas_externas',
              config: {
                url: 'api/auth/portales/caracteristicas_externas_portal',
                method: 'post',
              }
            },
            configEditFeatures:{
              url:'carateristica-orientacion',
              pathHelpers:'caracteristicas_orientacion',
              pathCpanel:'cpanel_caracteristicas_orientacion'
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "cpanel_caracteristicas_orientacion.codigo", label: "ID CPANEL", width:'6em'},
                {field: "texto", label: "Nombre", width: '12em'},
                {field: "actions", label: "Acciones", width:'10em'},
              ],
              rows: this.storeConfig.caracteristicas_orientacion,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          },
          {
            titulo: 'Caracteristicas Tipo Fachada',
            config: {
                id:6,
              prop: 'portales_caracteristicas_externas',
              config: {
                url: 'api/auth/portales/caracteristicas_externas_portal',
                method: 'post',
              }
            },
            configEditFeatures:{
              url:'carateristica-tipo-fachada',
              pathHelpers:'caracteristicas_tipo_fachada',
              pathCpanel:'cpanel_caracteristicas_tipo_fachada'
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "cpanel_caracteristicas_tipo_fachada.codigo", label: "ID CPANEL", width:'6em'},
                {field: "texto", label: "Nombre", width: '12em'},
                {field: "actions", label: "Acciones", width:'10em'},
              ],
              rows: this.storeConfig.caracteristicas_tipo_fachada,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          },
          {
            titulo: 'Caracteristicas Estado Construcción',
            config: {
                id:7,
              prop: 'portales_caracteristicas_externas',
              config: {
                url: 'api/auth/portales/caracteristicas_externas_portal',
                method: 'post',
              }
            },
            configEditFeatures:{
              url:'carateristica-estado-contruccion',
              pathHelpers:'caracteristicas_estado_construcion',
              pathCpanel:'cpanel_caracteristicas_estado_construccion'
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "cpanel_caracteristicas_estado_construccion.codigo", label: "ID CPANEL", width:'6em'},
                {field: "texto", label: "Nombre", width: '12em'},
                {field: "actions", label: "Acciones", width:'10em'},
              ],
              rows: this.storeConfig.caracteristicas_estado_construcion,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          },
          {
            titulo: 'Caracteristicas Tarifas adicionales Servicios',
            config: {
                id:8,
              prop: 'portales_caracteristicas_externas',
              config: {
                url: 'api/auth/portales/caracteristicas_externas_portal',
                method: 'post',
              }
            },
            configEditFeatures:{
              url:'carateristica-tarifas-adicionales-servicios-publicos',
              pathHelpers:'caracteristicas_tarifas_adicionales_servicios_publico',
              pathCpanel:'cpanel_caracteristicas_tarifas_adicionales_cp'
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "cpanel_caracteristicas_tarifas_adicionales_cp.codigo", label: "ID CPANEL", width:'6em'},
                {field: "texto", label: "Nombre", width: '12em'},
                {field: "actions", label: "Acciones", width:'10em'},
              ],
              rows: this.storeConfig.caracteristicas_tarifas_adicionales_servicios_publico
,
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
      advanceSearch(val) {
        // console.log( typeof(val))
        this.searchTerm = val.toString()
      },
      updateFeaturesTable(data){
        this.stateModalEditFeatures=false
        let path= this.propsRow.configUrl.pathHelpers
        this.$store.commit("appConfiguracion/UPDATE_FEATURES",{data,path})
      },
      openModalEdit(prop,config){
        this.stateModalEditFeatures=true;
        this.propsRow={
          data:prop,
          configUrl:config
        }
      },

        showFeatures(id){
            this.selectedNav=id
            this.searchTerm=''
            this.form.idCpanel=null;
            this.form.name=null;
        },
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
  .actions__btns{
    display: flex;
    gap: 1rem;
  }
  </style>
  
  
  