<template>
  <div id="Inmobiliaria">
    <b-container>
      <b-overlay :show="overlay">
        <b-card v-for="(item, index) in goodTable" :key="index">
          <template #header>
            <h2 class="mb-1 mr-2 d-flex align-items-center">
              {{item.titulo}}
            </h2>
            <div class="d-flex align-items-center mr-auto" v-if="item.btn">
              <b-button class=" mb-1 text-nowrap d-flex align-items-center" size="md" :variant="item.btn.variant" @click="openModal(item.btn.modal)">
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
              <span v-if="props.column.field === 'user'">
                <b-media class="align-items-center">
                  <template #aside>
                    <b-avatar
                      size="60"
                      variant="light-primary"
                      :to="{ name: 'apps-users-view', params: { id: props.row.id } }"
                    >
                      <template v-slot:default>
                        <template v-if="props.row.userdata.foto_persona">
                          <cld-image 
                            v-if="props.row.userdata.foto_persona.indexOf('cloudinary') != -1"
                            :public-id="props.row.userdata.foto_persona | urlImages"
                            class="img-fluid mx-auto d-block"
                          >
                            <cld-transformation fetch-format="png" />
                            <cld-transformation gravity="face" height="60" width="60" zoom="0.4" crop="thumb" />
                            <cld-transformation radius="300" />
                          </cld-image>
                          <img 
                            v-else="props.row.userdata.foto_persona.indexOf('googleusercontent') != -1"
                            :src="props.row.userdata.foto_persona" 
                            class="img-fluid mx-auto d-block"
                          />
                      </template>
                      <template v-else>
                        <span :style="{fontSize: '18px'}">{{avatarText(props.row.username)}}</span>
                      </template>
                      </template>
                    </b-avatar>
                  </template>
                  <b-link
                    :to="{ name: 'apps-users-view', params: { id: props.row.id } }"
                    class="font-weight-bold d-block text-nowrap"
                  >
                    {{ props.row.username }}
                  </b-link>
                  <small class="text-muted">@{{ props.row.username }}</small>
                </b-media>
              </span>
              <span v-if="props.column.field === 'empresa'">
                <b-media class="align-items-center" v-if="props.row.empresa">
                  <b-link class="font-weight-bold d-block text-nowrap" @click.prevent="openModal(modalEmpresa, props.row.empresa)">
                    {{ props.row.empresa.nombre }}
                  </b-link>
                  <small class="text-muted">{{ props.row.roles[0].nombre }}</small>
                </b-media>
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
  import { avatarText } from "@core/utils/filter";
  import { VueGoodTable } from 'vue-good-table'
  import VModal from "@/views/componente/vModal"
  import ToastificationContent from '@core/components/toastification/ToastificationContent'
  import EmpresaForm from '@/views/apps/configuracion/EmpresaForm'
  import FormUser from '@/views/apps/user/users-list/FormUser'
  import mixinApis from '@/views/componente/mixinApis'
  export default {
    name: 'Inmobiirias',
    mixins: [mixinApis],
    components: {
      VueGoodTable,
      VModal,
      EmpresaForm,
      FormUser,
    },
    data () {
      return {
        avatarText,
        overlay: false,
        modal: {
          state: false,
        },
        api: [{
          api: 'appInmobiliaria/getInmobiliaria',
          data: {}
        },]
      }
    },
    computed: {
      appInmobiliaria() {
        return this.$store.state.appInmobiliaria;
      },
      modalEmpresa(){
        return{
          titulo: 'Datos de Empresa',
          is: 'EmpresaForm',
          size: 'lg',
          footer: false,
          prop: {
            type: 'modal'
          }
        }
      },
      goodTable(){
        return [
          {
            titulo: 'Inmobiliarias',
            btn: {
              texto: 'Crear Inmobiliaria',
              variant: 'info',
              modal: {
                titulo: 'Crear Inmobiliaria',
                is: 'FormUser',
                prop: {
                  type: 'inmobiliria'
                }
              }
            },
            config: {
              prop: '',
              btn: [{
                texto: 'Editar Portal',
                variant: 'success',
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
                {field: "user", label: "Usuario", width:'6em'},
                {field: "email", label: "Email"},
                {field: "celular_movil", label: "Celular"},
                {field: "estado_user", label: "Estado"},
                {field: "empresa", label: "Empresa"},
                {field: "settings", label: "Ajustes", width:'12em'},
              ],
              rows: this.appInmobiliaria.users,
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