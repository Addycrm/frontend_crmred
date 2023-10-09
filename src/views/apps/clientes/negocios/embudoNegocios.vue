<template>
  <b-card>
    <div id="embudo" >
      <header>
        <h3 class="title">Embudo de Negocios</h3>
        <div>
          <app-collapse accordion>
            <app-collapse-item title="FILTRO GENERAL" :isVisible="true">
              <b-row>
                <b-col cols="12" md="3" v-if="tablesEmbudo">
                  <b-form-group label="Seleccionar Embudo">
                    <v-select
                      autocomplete="off"
                      @change="handleChangeTable"
                      v-model="formEmbudo.selectTable"
                      label="name"
                      :options="tablesEmbudo"
                      :reduce="(type) => type.id"
                    />
                  </b-form-group>
                </b-col>
                <!-- <b-col cols="12" md="3">
                  <b-form-group  label="Tipo de cliente">
                    <v-select
                      v-model="formEmbudo.tipo_cliente"
                      :options="tipo_cliente"
                      :reduce="type => type.id"
                      label="nombre"
                      :clearable="false"
                    />
                  </b-form-group>
                </b-col> -->
              </b-row>
            </app-collapse-item>
          </app-collapse>
        </div>
      </header>
      <section v-if="dataTableSelect" class="section-body">
        <section class="section-subtitle" v-if="dataTableSelect.name">
          <h3 class="subtitle">
            Seguimiento de {{ dataTableSelect.name }}
          </h3>
          <b-button variant="success" @click="addNewEmbudo()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
            :style="{
              width: '1.25em',
              height: '1em',
              fontSize: '1em',
            }" fill="currentColor">
              <path
                d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
            </svg>
            Añadir Embudo
          </b-button>
        </section>
        <section class="list-card"  v-if="!stateLoading">
          <div class=" item-card " v-for="(state,index) in dataTableSelect.embudo_states" :key="index" :class="getClassName(state.id)">
            <h6 class="text-primary font-weight-bold my-1 text-center  d-flex justify-content-between align-items-center">
              <p class="d-flex align-items-center">
                <b-form-input 
                  :readonly="(selectEditColumn===state.id)?false:true"
                  @input="getNewNameState($event)"
                  :value="state.name"
                  size="sm"
                  >
                </b-form-input>
                <div class="d-flex" v-if="(selectEditColumn===state.id)?true:false">
                  <b-button
                    variant="success"
                    size="sm"
                    class="btn-icon"
                    @click="confirmEditNameColumn(dataTableSelect.id,state.id)"
                  >
                    <feather-icon  icon="CheckIcon" />
                  </b-button>
                  <b-button
                    variant="danger"
                    size="sm"
                    class="btn-icon"
                    @click="cancelEditNameColumn(state.id)"
                  >
                    <feather-icon icon="XIcon" />
                  </b-button>
                </div>
              </p>
              <template v-if="dataTableSelect.id!=1">
                <b-dropdown
                    v-if="(selectEditColumn===state.id)?false:true"
                    id="dropdown-grouped"
                    right
                    class="dropdown-icon-wrapper"
                    variant="flat-primary"
                    size="sm"
                  >
                  <template #button-content >
                    <feather-icon
                      icon="MoreVerticalIcon"
                      size="16"
                      class="align-middle"
                    />
                  </template>
                  <b-dropdown-item @click="modifyColumn(state.id)">
                    <feather-icon
                      icon="EditIcon"
                      size="12"
                      class="align-middle"
                    />
                    Modificar
                  </b-dropdown-item>
                  <b-dropdown-item @click="deleteColumn(state.id,state.name)">
                    <feather-icon
                      icon="Trash2Icon"
                      size="12"
                      class="align-middle"
                    />
                    Borrar
                  </b-dropdown-item>
                </b-dropdown>

              </template>
            </h6>
            <b-row>
              <b-col cols="12">
                  <b-form-group >
                    <b-form-input 
                    placeholder="Buscar por nombre" 
                    @change="filterStates($event,state.id)" 
                    name="search" 
                    type="search"
                    size="sm"
                    trim
                    />
                  </b-form-group>
                </b-col>
            </b-row>
            <!-- v-scroll-end="handleScrollTableOne" -->
            <draggable
              v-if="state.clientes"
              :list="state.clientes"
              @change="(ref)=>changeTable(ref,state.id)"
              tag="ul"
              group="tableClientes"
              class="list-group list-group-flush cursor-move card-column scrollableTableOne"
            >
              <template v-if="state.clientes.length>0">
                <b-list-group-item
                  v-for="(listItem, index) in state.clientes"
                  :key="index"
                  tag="li"
                  class="item-list"
                >
                <button class="btn__see-more" @click="getInformationCliente(state.id,listItem)">
                  Ver más
                </button>                    
                  <div class=" c-avatar">
                    <b-avatar :text="listItem.nombre.slice(0,2)" />
                    <div>
                      <div class="d-flex justify-content-end">
                      </div>
                      <p class="mb-0 font-weight-bold text-item" v-if="listItem.nombre">
                        <span v-if="listItem.nombre">
                          {{ listItem.nombre}}
                        </span>
                        <span v-if="listItem.apellido">
                          {{ listItem.apellido }}
                        </span>
                      </p>
                      <p class="text-item" v-if="listItem.main_mail">
                        <a :href="`mailto:${listItem.main_mail}`">
                          <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 512 512" class="iconSvg">
                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                          </svg>
                        </a>
                        {{ listItem.main_mail }}
                      </p>
                      <p class="text-item" v-if="listItem.main_cell_phone">
                        <a :href="`tel:${listItem.main_cell_phone}`">
                          <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 512 512" class="iconSvg">
                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                          </svg>
                        </a>
                        {{ listItem.main_cell_phone }}
                      </p>
                      <b-badge variant="primary" style="margin-bottom: 0.2rem;" v-if="listItem.tipo_cliente">{{ listItem.tipo_cliente.descripcion }}</b-badge>
                    </div>
                  </div>
                </b-list-group-item>
              </template>
              <p v-else class="my-2 text-center font-weight-bold">No hay clientes</p>
            </draggable>
          </div>
          <template v-if="dataTableSelect.id!=1">
            <div class="item-card" :class="getClassName()">
              <div class="d-flex justify-content-center my-1" v-if="!isFormAddColumn">
                <b-button variant="outline-primary" @click="onAddColumn()" >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
                    :style="{
                      width: '1.25em',
                      height: '1em',
                      fontSize: '1em',
                    }" fill="currentColor">
                      <path
                        d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                  </svg>
                  Añadir Estado
                </b-button>
              </div>
              <div v-else class=" my-1">
                <b-col cols="12" >
                    <validation-observer  ref="formCreateColumn">
                      <b-form-group >
                        <validation-provider #default="{errors}" name="Nombre columna" rules="required">
                        <b-form-input 
                          v-model="formRegisterColumn.addName" 
                          :state="errors.length > 0 ? false : null"
                          placeholder="Titulo para este estado" 
                          size="sm"
                        />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                  </validation-observer>
                      <div>
                        <b-button variant="success" size="sm" @click="confirmAddColumn(dataTableSelect.id)">
                          Añadir
                        </b-button>
                        <b-button variant="danger" size="sm" @click="cancelAddColumn()">
                          Cancelar
                        </b-button>
                      </div>
                  </b-col>            
              </div>
            </div>
          </template>
        </section>
        <loadingContact  v-else/>

      </section>
      <loadingContact  v-else/>
    </div>
    <transition name="fade">
      <v-modal
        v-if="modal.state"
        @close="closeModal"
        size="sm"
        :titulo="modal.titulo"
        footer
      >
        <ClientesForm ref="ClientesForm" :form="form" v-bind="modal.props" />
        <template #footer>
          <b-overlay :show="overlay">
            <b-button variant="info"  @click="onSubmit" :disabled="overlay">
              {{modal.props.tipo != 'add' ? 'Guardar' : 'Agregar cliente'}}
            </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
  </b-card>
  </template>
  
  <script>
  import {
    BListGroupItem, BAvatar, BRow, BCol,
  } from 'bootstrap-vue'
  import draggable from 'vuedraggable'
  import Prism from 'vue-prism-component'
  import 'prismjs'
  import 'prismjs/themes/prism-tomorrow.css'
  import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
  import vSelect from "vue-select";

  // vista loading
  import loadingContact from "@/views/componente/loadingContact.vue";
  //DESPLEGABLES
  import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
  import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'

  //VALIDACION FORMS
  import {
    ValidationProvider,
    ValidationObserver,
} from "vee-validate";
import {
  required
} from '@validations'

import ClientesMixins from "@/views/apps/clientes/clientes-list/clientesMixins.js";

import VModal from "@/views/componente/vModal";
import ClientesForm from "@/views/apps/clientes/clientes-list/ClientesForm";

  export default {
    mixins: [ClientesMixins],

    components: {
      ValidationProvider,
      ValidationObserver,
      BAvatar,
      BListGroupItem,
      BRow,
      BCol,
      Prism,
      draggable,
      vSelect,
      loadingContact,
      AppCollapse,
      AppCollapseItem,
      VModal,
      ClientesForm
    },
    data() {
      return {
        required,
        modal: {
				  state: false
			  },
        newNameState:null,
        KEYADD:'added',
        newNameTable:null,
        dataTableSelect:null,
        isFormAddColumn:false,
        copyTableSelect:null,
        selectEditColumn:null,
        formEmbudo:{
          selectTable:1,
          tipo_cliente:null
        },
        formRegisterColumn:{
          addName:null
        },
        stateLoading:false
      }
    },
    directives: {
        'scroll-end': {
        inserted(el, binding, vnode) {
            el.addEventListener('scroll', () => {
            vnode.context[binding.expression]();
            });
        }
        },
    },
    watch:{
      'formEmbudo.selectTable'(){
        // this.handleChangeTable()
      },
      'changeInfoCliente'(){
        if(this.changeInfoCliente){
          this.handleChangeTable()
        }
      }
    },
    computed:{
      tablesEmbudo(){
        return this.$store.state.appCliente.tablesEmbudo
      },
      tableStateEmbudo(){
        return this.$store.state.appCliente.tableStateEmbudo;
      }
    },
    created(){
      // this.getStatesEmbudo();
    },
    mounted() {
        // this.getClientes();
        this.handleChangeTable()
        this.watchQuery()
    },
    methods: {
      watchQuery(){
        for (let prop in this.formEmbudo) {
          this.$watch(
              () => this.formEmbudo[prop],
              (a) => {
                this.handleChangeTable();
              }
            );
          }
      },
      handleScroll() {
      },
      async getInformationCliente(refTable,item){
        let res = await this.$store.dispatch("appCliente/getClienteById",item.id) 
        Object.assign(this.modal, {
          state: true,
          titulo: 'Editar Cliente',
          props: {
            tipo: 'edit',
            data:res.data.data
          }
        });
      },
      
      getClassName(ref){
        switch(ref){
          case 1:
            return 'color-new';
            break;
          case 2:
            return 'color-process';
            break;
          case 3:
            return 'color-convert';
            break;
          case 4:
            return 'color-recovered';
            break;
          case 5:
            return 'color-lost';
            break;
          default:
            return 'color-default';
            break;
        }
      },
      changeTable(e,ref){
        this.updateStatePipeline(e,ref)
      },
      async updateStatePipeline(e,ref){
        let key = Object.keys(e)[0];

        if(key===this.KEYADD){
          let data = {
            'cliente_id': e.added.element.id,
            state:ref
          }
          let indexPos = this.copyTableSelect.embudo_states.findIndex((item)=>{
            return item.id ==ref
          })
          this.copyTableSelect.embudo_states[indexPos].clientes.push(e.added.element)
          let res = await  this.$store.dispatch("appCliente/updateStatePipeline",{...data})
          
          if(!res){
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Algo salio mal",
                icon: "AlertCircleIcon",
                text: "Intenta Nuevamente",
                variant: "danger",
              },
            });
          }
        } 
        if(key=='removed'){
          let indexPos = this.copyTableSelect.embudo_states.findIndex((item)=>{
            return item.id ==ref
          })
          let indexPosCliente = this.copyTableSelect.embudo_states[indexPos].clientes.findIndex((item)=>{
            return item.id == e.removed.element.id
          })
          this.copyTableSelect.embudo_states[indexPos].clientes.splice(indexPosCliente,1)
        }
      },
      searchName(array,nombre,indexPos){
        if (nombre.trim() === "") {
          return this.copyTableSelect.embudo_states[indexPos].clientes;
        }
        const nombreEncontrado = array.filter((item) => {
          return item.nombre.toLowerCase().includes(nombre.toLowerCase());
        });
        return nombreEncontrado ? nombreEncontrado : [];
      },
      filterStates(event,ref){
        let indexPos=this.copyTableSelect.embudo_states.findIndex((item)=>{
          return item.id === ref
        })
        let search = this.searchName(this.copyTableSelect.embudo_states[indexPos].clientes,event,indexPos);
        this.dataTableSelect.embudo_states[indexPos].clientes = search;
      },

      handleScrollTableOne() {
        const element = document.querySelector('.scrollableTableOne');
        if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
          // Se ha realizado el scroll al final del div
          this.pageNew+=1;

          // this.getClientes(this.pageNew)
        }
      },
      addNewEmbudo(){
        this.$swal({
          title: 'Añadir un título al Embudo',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
            placeholder:'Ingresar un titulo',
            value:this.newNameTable
          },
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonText: 'Crear Embudo',
          cancelButtonText:'Cancelar',
          showLoaderOnConfirm: true,
          preConfirm: (name) => {
            if(name){
              return this.$store.dispatch("appCliente/createTableEmbudo",{name:name})
                .then(response => {
                  if (!response.success) {
                    throw new Error(response.statusText)
                  }
                  return response
                })
                .catch(error => {
                  this.$swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            }else{
              this.$swal.showValidationMessage('Ingrese un nombre al campo')
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal({
              icon: 'success',
              title: `Se ha registrado correctamente el embudo: ${result.value.data.name}.`,
            })
            this.addEmbudoRender(result.value.data)
          }
        })
      },
      modifyColumn(ref){
        this.selectEditColumn=ref;
      },
      cancelEditNameColumn(ref){
        this.selectEditColumn=null;
      },
      onAddColumn(){
        this.isFormAddColumn=true;
      },
      cancelAddColumn(){
        this.isFormAddColumn=false;
        this.formRegisterColumn.addName=null
      },
      deleteColumn(ref,name){
        this.$swal({
          title: 'Estas seguro?',
          text: `Desea eliminar la columna ${name}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText:'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteColumnTableEmbudo(ref)
            this.confirmDeleteColumn(ref)
           
          }
        })
      },
      async deleteColumnTableEmbudo(ref){
        this.$store.dispatch("appCliente/deleteColumnTableEmbudo",ref)
        .then((res)=>{
          // console.log(res)
          // this.confirmDeleteColumn()
        })
        .catch((error)=>{
          this.$swal({
          title: 'Hubo Error!',
          text: `hubo un error al eliminar el estado, intenta nuevamente`,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        })
        })
      },
      async confirmDeleteColumn(ref){
        let findIndex= this.dataTableSelect.embudo_states.findIndex((item)=>{
          return item.id === ref
        })
          this.dataTableSelect.embudo_states.splice(findIndex,1)
          this.$swal(
              'Eliminado!',
              'Se ha eliminado correctamente.',
              'success'
            )


      },
      async handleChangeTable(){
        this.stateLoading=true
        let data ={}
        // if(this.formEmbudo.tipo_cliente){
        //   data = {
        //     tipo_cliente:this.formEmbudo.tipo_cliente
        //   }
        // }
        let res = await this.$store.dispatch("appCliente/getStatesEmbudo",{...data});
        this.dataTableSelect= await res.find((item)=>{
          return item.id == this.formEmbudo.selectTable
        })
        this.copyTableSelect=JSON.parse(JSON.stringify(this.dataTableSelect))
        this.stateLoading=false;
        this.changeInfoCliente=false

      },
      async confirmAddColumn(ref){
        this.$refs.formCreateColumn.validate().then(success => {
            if (success) {
                this.sendFormAddColumn(ref)
            } 
        }) 
      },
      notifacationAlert(props){
        this.$toast({
              component: ToastificationContent,
              props
            });

      },
      sendFormAddColumn(ref){
        let data = {
          name:this.formRegisterColumn.addName,
          embudo_id:ref
        }
        this.$store.dispatch("appCliente/createColumnTableEmbudo",{...data})
          .then((res)=>{
            this.notifacationAlert(
              {
                title:'Se ha creado correctamente',
                text:'Se creo correctamente la nueva columna',
                variant:'success',
                icon:'CheckCircleIcon'
              }
            )
            this.addColumnRender(ref,res.data.data)
          })  
          .catch((error)=>{
          })
      },
      addColumnRender(ref,res){
        this.dataTableSelect.embudo_states.push(res)
        this.cancelAddColumn()
      },
      addEmbudoRender(res){
        this.tablesEmbudo.push(res)
      },
      confirmEditNameColumn(embudo_id,idState){
        let data = {
          embudo_id,
          id:idState,
          name:this.newNameState
        }
        this.$store.dispatch("appCliente/createColumnTableEmbudo",{...data})
          .then((res)=>{
            this.cancelEditNameColumn()
            this.notifacationAlert(
              {
                title:'Se ha modificado correctamente',
                text:'Se modifico correctamente el nombre del estado a: '+ res.data.data.name,
                variant:'success',
                icon:'CheckCircleIcon'
              }
            )
            this.addColumnRender(ref,res.data.data)
          })  
          .catch((error)=>{
          })

      },
      getNewNameState(event){
        this.newNameState=event
      }
    },
  }
  </script>

<style>
  :root{
    --color-new:#ff702f;
    --color-process:#368ee0;
    --color-convert:#27b34b;
    --color-recovered:#efb900;
    --color-lost:#e32225;
    --color-default:#57555546;
  }
.swal2-actions{
  gap: 0.5rem !important;
}
</style>
<style scoped>


p{
  margin: 0;
}
::-webkit-scrollbar {
  width: 24px;
}
#embudo{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-body{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.section-subtitle{
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--primary);
  padding-bottom: 0.6rem;
}

.subtitle{
  font-size: 18px;
  margin: 0;
}

/* .list-card{
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
  grid-auto-rows: auto;
} */

.list-card{
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 2rem;
  height: 680px;
}

.item-card{
  min-width: 250px;
  border-radius: 10px;
  padding: 4px;
}
.card-column{
  height:500px;
  overflow-y: auto;
  padding: 6px 4px;
}
.color-new{
  border: 2px solid var(--color-new);
  border-top: 8px solid var(--color-new);

}
.color-process{
  border: 2px solid var(--color-process);
  border-top: 8px solid var(--color-process);

}
.color-convert{
  border: 2px solid var(--color-convert);
  border-top: 8px solid var(--color-convert);
}
.color-recovered{
  border: 2px solid var(--color-recovered);
  border-top: 8px solid var(--color-recovered);

}
.color-lost{
  border: 2px solid var(--color-lost);
  border-top: 8px solid var(--color-lost);
}
.color-default{
  border: 2px solid var(--color-default);
  border-top: 8px solid var(--color-default);
}


.btn__see-more{
  font-size: 0.7rem;
  border-radius: 8px;
  background-color: #28c76f;
  border: 1px solid #28c76f;
  color: white;
  padding: 4px;
  font-weight: bold;
}

.text-item{
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 10px;
}
.item-list{
  border: 1px solid gray !important;
  border-radius: 10px;
  margin-bottom: 6px;
  max-width: 250px;
  margin-right: 6px;
}
.c-avatar{
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  overflow: auto;
}
.iconSvg{
  fill: var(--primary);
}

@media (max-width:500px) {
  .section-subtitle{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 0.6rem;
}
  
}
@media (min-width:900px) {
  ::-webkit-scrollbar {
    width: 8px;
  }
  .title{
    font-size: 24px;
  }
  
}



</style>