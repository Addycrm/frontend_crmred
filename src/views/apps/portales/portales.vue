<template>
  <div id="Portales">
    <b-container>
      <b-overlay :show="overlay">
        <b-card v-for="(item, index) in goodTable" :key="index">
          <template #header>
            <h2 class="mb-0 mr-2">
              {{item.titulo}}
            </h2>
            <div class="d-flex align-items-center ml-auto" v-if="item.btn">
              <b-button class="text-nowrap d-flex align-items-center" size="md" :variant="item.btn.variant" @click="openModal(item.btn.modal)">
                <span class="align-middle">{{item.btn.texto}}</span>
              </b-button>
            </div>
          </template>
          
          <VueGoodTable
            styleClass="vgt-table striped"          
            v-bind="item.tabla"
            :search-options="{
              enabled: true,
              placeholder: 'Buscar...'
            }"
          >
            <template
              slot="table-row"
              slot-scope="props"
            >
              <span v-if="props.column.field === 'name'">
                <div v-b-tooltip.hover class="title-tab" :title="props.formattedRow[props.column.field]">
                  {{props.formattedRow[props.column.field]}}
                </div>
              </span>
              <span v-else-if="props.column.field === 'state'" class="d-flex flex-column">
                <b-badge :style="{margin: '5px', width:'8em', textTransform: 'uppercase'}" class="d-block text-center" :variant="props.row.state =='active' ? 'light-success' : 'light-danger'">
                  {{props.row.state}}
                </b-badge>
              </span>
              <span v-else-if="props.column.field === 'image'" class="d-flex flex-wrap">
                <cld-image v-if="props.row.image.indexOf('cloudinary') != -1" :public-id="props.row.image | urlImages" >
                  <cld-transformation height="50" crop="scale" />
                </cld-image>
              </span>
              <span v-else-if="props.column.field === 'settings'" class="d-flex">
                <template v-for="(btn, index) in item.config.btn">
                  <b-button @click="openModal(btn.modal, props.row)" :key="index" size="sm" :variant="btn.variant" :style="{margin: '5px'}">
                    {{btn.texto}}
                  </b-button>
                </template>
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
                <!-- v-if="props.total > item.tabla.paginationOptions.perPage" -->
                <div  class="d-flex align-items-center">
                  <span class="text-nowrap">
                    Mostrando 1 a
                  </span>
                  <b-form-select
                    v-model="item.tabla.paginationOptions.perPage"
                    :options="['10','20','100']"
                    class="mx-1"
                    @input="value => props.perPageChanged({currentPerPage:value})"
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
                    @input="value => props.pageChanged({currentPage:value})"
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
      </b-overlay>
    </b-container>
    <transition name="fade">
      <v-modal v-if="modal.state" @close="modal.state = false" :titulo="modal.titulo" :size="modal.size" :footer="modal.footer">
        <component is="VForm" v-bind="modal.prop" ref="modal"/>
        <template #footer>
          <b-overlay :show="overlay">
            <b-button @click="onSubmit" variant="success" :disabled="overlay">
              {{modal.prop.row ? 'Guardar' : 'Crear'}}
            </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
  </div>
</template>

<script>
  import { VueGoodTable } from 'vue-good-table'
  import VForm from '@/views/componente/VForm'
  import VModal from "@/views/componente/vModal"
  import ToastificationContent from '@core/components/toastification/ToastificationContent'
  import mixinApis from '@/views/componente/mixinApis'
  export default {
    name: 'Portales',
    mixins: [mixinApis],
    components: {
      VueGoodTable,
      VForm,
      VModal
    },
    data () {
      return {
        overlay: false,
        modal: {
          state: false,

        },
        api: [{
          api: 'appPortales/fetchPortales',
          data: {}
        },{
          api: 'appPortales/getTypeService',
          data: {}
        }]
      }
    },
    computed: {
      appPortales() {
        return this.$store.state.appPortales;
      },
      modalForm(){
        return {
          image: {
            label: 'Imagen',
            value: null,
            type: 'file'
          },
          name: {
            label: 'Nombre',
            value: null,
            type: 'text'
          },
          slug: {
            label: 'Slug',
            value: null,
            type: 'vInput',
            props: {
              type: 'slug'
            }
          },
          state: {
            label: 'Estado',
            value: null,
            type: 'radio',
            options: [
              {value: 'active', text: 'Activo'},
              {value: 'inactive', text: 'Inactivo'}
            ]
          },
          type_service: {
            label: 'Tipo de Servicio',
            value: null,
            type: 'radio',
            options: this.appPortales.type_service.map(item => item ? {value: item.id, text: item.name} : item)
          },
        }
      },
      goodTable(){
        return [
          {
            titulo: 'Portales',
            btn: {
              texto: 'Crear Portal',
              variant: 'success',
              modal: {
                titulo: 'Crear Portal',
                prop: {
                  inputs: this.modalForm
                }
              }
            },
            config: {
              prop: '',
              btn: [{
                texto: 'Editar Portal',
                variant: 'info',
                modal: {
                  nombre: 'Editar Portal',
                  prop: {
                    inputs: this.modalForm
                  }
                }
              }],
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "image", label: "Imagen"},
                {field: "name", label: "Nombre"},
                {field: "slug", label: "Slug"},
                {field: "state", label: "Estado"},
                {field: "settings", label: "Ajustes", width:'12em'},
              ],
              rows: this.appPortales.portales,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          }
        ]
      }
    },
    methods: {
      async onSubmit(){
        await this.$refs['modal'].onSubmit()
        .then(({state, data}) => {
          if(state){
            if(!this.modal.prop.row)
              this.createPortal(data);
            else
              this.updatePortal(data);
          }
        });
      },
      async createPortal(data){
        this.overlay = true;
        await this.$store.dispatch('appPortales/addPortales', data)
        .then(state => {
          if(state){
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Portal Creado",
                icon: "CheckCircleIcon",
                text: "Portal inmobiliaro creado exitosamente",
                variant: "success"
              }
            });
          }else{
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Algo ha ocurrido',
                icon: "AlertCircleIcon",
                text: 'Actualiza el navegador, si el problema persiste comunicate con nosotros',
                variant: "danger",
              },
            },{
              timeout: 4000
            });
          }
        });
        this.overlay = false;
      },
      async updatePortal(data){
        this.overlay = true;
        await this.$store.dispatch('appPortales/editarPortales', data)
        .then(state => {
          if(state){
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Portal Actualizado",
                icon: "CheckCircleIcon",
                text: "Portal inmobiliaro actualizado exitosamente",
                variant: "success"
              }
            });
          }else{
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Algo ha ocurrido',
                icon: "AlertCircleIcon",
                text: 'Actualiza el navegador, si el problema persiste comunicate con nosotros',
                variant: "danger",
              },
            },{
              timeout: 4000
            });
          }
        });
        this.overlay = false;
      },
      openModal(modal, row){
        if(!modal.prop)
          Object.assign(modal,{prop:{}});

        if(modal.footer == undefined)
          Object.assign(modal,{footer: true});

        if(row){
          Object.assign(modal.prop, {row})

          if(modal.prop.inputs)
            for(let prop in modal.prop.inputs)
              Object.assign(modal.prop.inputs[prop], {value: row[prop] && row[prop].id ? row[prop].id : row[prop] });
        }else{
          for(let prop in this.modalForm)
            this.modalForm[prop].value = null;
        }
        Object.assign(this.modal, {
          state: true
        }, modal);
      },
    }
  }
</script>

<style lang="css" scoped>
</style>