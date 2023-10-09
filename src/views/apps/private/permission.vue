<template>
  <div id="permission">
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
              <span v-if="props.column.field === 'nombre'">
                <div v-b-tooltip.hover class="title-tab" :title="props.formattedRow[props.column.field]">
                  {{props.formattedRow[props.column.field]}}
                </div>
              </span>
              <span v-else-if="props.column.field === 'descripcion'" class="d-flex flex-wrap">
                <div v-html="props.formattedRow[props.column.field]"></div>
              </span>
              <span v-else-if="props.column.field === 'actions'" class="d-flex flex-wrap">
                <b-badge :style="{margin: '5px'}" variant="light-primary" v-for="item in props.formattedRow[props.column.field]" :key="item.id">
                  {{item.title}}
                </b-badge>
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
        <component :is="modal.is" v-bind="modal.prop" ref="modal"/>
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
  import mixinApis from '@/views/componente/mixinApis'
  import VModal from "@/views/componente/vModal"
  import { VueGoodTable } from 'vue-good-table'
  import ModalRoles from './component/ModalRoles'
  import ModalAccionesModulos from './component/ModalAccionesModulos'
  import ModalPermisosAcciones from './component/ModalPermisosAcciones'
  import ModalPermisosRoles from './component/ModalPermisosRoles'
  export default {
    name: 'permission',
    mixins:[mixinApis],
    components: {
      VModal,
      VueGoodTable,
      ModalRoles,
      ModalAccionesModulos,
      ModalPermisosAcciones,
      ModalPermisosRoles
    },
    data () {
      return {
        overlay: false,
        modal: {
          state: false,
        },
        apiOptions: [
          {
            api: 'appRole/getRoles',
            data: {}
          },
          {
            api: 'appRole/getPermissionsActions',
            data: {}
          },
          {
            api: 'appRole/getActions',
            data: {}
          },
          {
            api: 'appRole/getModules',
            data: {}
          },
        ]
      }
    },
    computed: {
      appRoles(){
        return this.$store.state.appRole
      },
      goodTable(){
        return [
          {
            titulo: 'Roles',
            btn: {
              texto: 'Crear Role',
              variant: 'success',
              modal: {
                titulo: 'Crear Role',
                is: 'ModalRoles',
                prop: {
                  inputs: {
                    nombre: {
                      label: 'Nombre',
                      value: null
                    },
                    descripcion: {
                      label: 'Descripción',
                      type: 'textarea',
                      value: null
                    },
                  }
                }
              }
            },
            config: {
              prop: '',
              btn: [{
                texto: 'Editar Role',
                variant: 'info',
                modal: {
                  nombre: 'Editar Role',
                  is: 'ModalRoles',                
                  prop: {
                    inputs: {
                      nombre: {
                        label: 'Nombre',
                        value: null
                      },
                      descripcion: {
                        label: 'Descripción',
                        type: 'textarea',
                        value: null
                      },
                    }
                  }
                }
              },{
                texto: 'Editar Permisos',
                variant: 'warning',
                modal: {
                  titulo: 'Editar Permisos',
                  is: 'ModalPermisosRoles',
                }
              }],
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "nombre", label: "Nombre", width: '18em'},
                {field: "descripcion", label: "Descripción"},
                {field: "settings", label: "Ajustes", width:'22em'},
              ],
              rows: this.appRoles.roles,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          },{
            titulo: 'Permisos',
            config: {
              btn: [{
                texto: 'Asignar Acciones',
                variant: 'warning',
                modal: {
                  titulo: 'Asignar Acciones',
                  is: 'ModalPermisosAcciones',
                }
              }]
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "title", label: "Tituló", width: '18em'},
                {field: "subject", label: "Modulo", width: '12em'},
                {field: "actions", label: "Acciones",},
                {field: "settings", label: "Ajustes", width:'12em'},
              ],
              rows: this.appRoles.permissions,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          },{
            titulo: 'Acciones',
            btn: {
              texto: 'Crear Acción',
              variant: 'success',
              modal: {
                titulo: 'Crear Acción',
                is: 'ModalAccionesModulos',
                prop: {
                  prop: 'actions',
                  config: {
                    url: 'api/auth/actions-modules',
                    method: 'post'
                  },
                  inputs: {
                    title: {
                      label: 'Tituló',
                      value: null
                    },
                    action: {
                      label: 'Acción',
                      value: null
                    },
                  }
                }
              }
            },
            config: {
              btn: [{
                texto: 'Editar',
                variant: 'info',
                modal: {
                  titulo: 'Editar Acción',
                  is: 'ModalAccionesModulos',
                  prop: {
                    prop: 'actions',
                    config: {
                      url: 'api/auth/actions-modules',
                      method: 'post'
                    },
                    inputs: {
                      title: {
                        label: 'Tituló',
                        value: null
                      },
                      action: {
                        label: 'Acción',
                        value: null
                      },
                    }
                  }
                }
              }]
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "title", label: "Tituló", width: '18em'},
                {field: "action", label: "Acción"},
                {field: "settings", label: "Ajustes", width:'8em'},
              ],
              rows: this.appRoles.actions,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          },{
            titulo: 'Modulos',
            btn: {
              texto: 'Crear Modulo',
              variant: 'success',
              modal: {
                titulo: 'Crear Modulo',
                is: 'ModalAccionesModulos',
                prop: {
                  prop: 'modules',
                  config: {
                    url: 'api/auth/permissions-module',
                    method: 'post'
                  },
                  inputs: {
                    title: {
                      label: 'Tituló',
                      value: null
                    },
                    subject: {
                      label: 'Modulo',
                      value: null
                    },
                  }
                }
              }
            },
            config: {
              btn: [{
                texto: 'Editar',
                variant: 'info',
                modal: {
                  titulo: 'Editar Modulo',
                  is: 'ModalAccionesModulos',
                  prop: {
                    prop: 'modules',
                    config: {
                      url: 'api/auth/permissions-module',
                      method: 'post'
                    },
                    inputs: {
                      title: {
                        label: 'Tituló',
                        value: null
                      },
                      subject: {
                        label: 'Modulo',
                        value: null
                      },
                    }
                  }
                }
              }]
            },
            tabla: {
              columns: [
                {field: "id", label: "ID", width:'6em'},
                {field: "title", label: "Tituló", width: '18em'},
                {field: "subject", label: "Modulo"},
                {field: "settings", label: "Ajustes", width:'8em'},
              ],
              rows: this.appRoles.modules,
              paginationOptions: {
                enabled: true,
                perPage: 10
              }
            }
          }
        ]
      }
    },
    mounted(){
      this.initApis(this.apiOptions);
    },
    methods: {
      async onSubmit(){
        this.overlay = true;
        await this.$refs['modal'].onSubmit()
        .then(state => {
          this.modal.state = !state;
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
              Object.assign(modal.prop.inputs[prop], {value: row[prop]});
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