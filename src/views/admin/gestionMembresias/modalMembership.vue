<template>
    <div v-if="TableAllAgents" id="TableAllAgents">
      <div class="mb-2" cols-lg="5" cols-sm="auto">
          <app-collapse >
            <app-collapse-item title="FILTRO GENERAL" :isVisible="true" >
              <!-- ID -->
              <div class="d-flex flex-wrap">
                <b-col cols="12" md="3">
                  <b-form-group label="ID Agente">
                    <b-form-input :value="query.idAgent" @change="setQuery('idAgent', $event)" placeholder="Buscar id..."
                      type="search" trim />
                  </b-form-group>
                </b-col>
                <!-- NOMBRE -->
                <b-col cols="12" md="3">
                  <b-form-group label="Nombre Agente">
                    <b-form-input :value="query.nameAgent" @change="setQuery('nameAgent', $event)" placeholder="Buscar nombre..."
                    type="search" trim />
                  </b-form-group>
                </b-col>
                <!-- CORREO -->
                <b-col cols="12" md="3">
                  <b-form-group label="Correo Agente">
                    <b-form-input 
                    :value="query.emailAgent"  
                    @change="setQuery('emailAgent', $event)" 
                    placeholder="Buscar correo..." 
                    type="email" 
                    trim 
                    />
                  </b-form-group>
                </b-col>
                <!-- AGENTE -->
              <b-col cols="12" md="3" v-if="optionsPlans">
                <b-form-group label="Plan">
                  <v-select 
                    v-model="query.plans" 
                    :options="optionsPlans" 
                    :reduce="(type) => type.value.id"
                    label="text" 
                    />
                </b-form-group>
              </b-col>
              </div>
            </app-collapse-item>
          </app-collapse>
        </div>
      <b-row>
        <b-col cols="auto" class="mx-auto my-1">
          Clientes: <b class="text-primary">{{ TableAllAgents.to }}</b> de
          <b>{{ TableAllAgents.total }}</b>
        </b-col>
      <b-col cols="12">
        <h5 v-if="agentsAllSelected.length>0">Has seleccionado: {{ agentsAllSelected.length }}</h5>
        <b-table
          hover 
          small 
          bordered 
          head-variant="primary" 
          thead-class="primaryColor"
          selected-variant="primary" 
          responsive 
          :items="ListAllAgents" 
          :fields="fields" 
          ref="selectableTable"
          select-mode="single" 
          @row-selected="onRowSelected"
          selectable
        >
        <!-- <template #cell(check)="{ rowSelected }">
          <template v-if="rowSelected">
            <span aria-hidden="true">&check;</span>
            <span class="sr-only">Selected</span>
          </template>
          <template v-else>
            <span aria-hidden="true">&nbsp;</span>
            <span class="sr-only">Not selected</span>
          </template>
        </template> -->
        <template #head(id)="data">
          <div class="header">
            <span >{{ data.label}}</span>
            <div class="header__btns">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="10" heigth="10">
                  <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"  width="10" heigth="10">
                  <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                </svg>
              </button>
            </div>
          </div>
        </template>
        <template #head(created_at)="data">
          <div class="header">
            <span >{{ data.label}}</span>
          </div>
        </template>
        <template #head(userdata.foto_persona)="data">
          <div class="header">
            <span >{{ data.label}}</span>
          </div>
        </template>
        <template #head(userdata.primer_nombre)="data">
          <div class="header">
            <span >{{ data.label}}</span>
          </div>
        </template>
        <template #head(email)="data">
          <div class="header">
            <span >{{ data.label}}</span>
          </div>
        </template>
        <template #head(empresa.nombre)="data">
          <div class="header">
            <span >{{ data.label}}</span>
          </div>
        </template>
        <template #head(code)="data">
          <div class="header">
            <span >{{ data.label}}</span>
          </div>
        </template>
        <template #head(action)="data">
          <div class="header">
            <span >{{ data.label}}</span>
          </div>
        </template>
          <template v-slot:cell(userdata.foto_persona)="data">
            <b-avatar :src="data.value" />
          </template>
          <template #cell(created_at)="data" >
              <span style="font-size: 0.9em;">{{ data.item.created_at | fechaFormating }} ({{
                dateCounter(data.item.created_at)
              }})
              </span>
          </template>
          <template #cell(code)="data">
            <span  class="badge badge-primary">
              {{ data.item.code }}
            </span>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <div class="d-flex flex-wrap align-items-center mt-1">
        <div class="d-flex">
          <b-pagination
            v-if="TableAllAgents.per_page < TableAllAgents.total"
            @change="getAgents"
            :value="currentPage"
            :per-page="TableAllAgents.per_page"
            :total-rows="TableAllAgents.total"
            first-number
            last-number
            prev-class="prev-arrow"
            next-class="next-arrow"
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
    </div>
  
  
  </template>
  
<script>
  import agentAllMixins from './AllAgentsMixins.js';
  
  import vSelect from 'vue-select'
  import modalVerificationAgent from './modal/modalVerificationAgent.vue';

  //date
  import flatPickr from "vue-flatpickr-component";
  import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
  import { Spanish } from "flatpickr/dist/l10n/es.js";
  //modal
  import VModal from "@/views/componente/vModal";
  //desplegables
  import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
  import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'

  import moment from "moment";
  import "moment/locale/es";
  
  export default {
    name: "membership",
    mixins: [agentAllMixins],
    components: {
      vSelect,
      modalVerificationAgent,
      flatPickr,
      AppCollapse,
      AppCollapseItem,
      VModal
    },
    data(){
      return{
        selectAgent:{},
        fields: [
          {
            key: 'id', label: 'Id'
          },
          {
            key: 'created_at', label: 'Fecha creación'
          },
          {
            key: 'userdata.foto_persona', label: 'imagen',
          },
          {
            key: 'userdata.primer_nombre', label: 'Nombre',
          },
          {
            key: 'email', label: 'correo',
          },
          {
            key: 'empresa.nombre', label: 'Nombre empresa',
          },
          {
            key: 'code', label: 'Membresia',
          },
        ],
        search:0,
        selected: null,
        locale: Spanish,
        plugins: [
          new confirmDatePlugin({
            confirmText: "Agregar",
            showAlways: true,
            theme: "dark",
          }),
        ],
        query: {
          titulo_inmueble: null,
        }
      }
    },
    filters: {
      fechaFormating: function (value) {
        if (value) {
          let date = moment(value).format('L'); 
          return date
        }
      }
    },
    updated() {
      this.validateCheck()
    },
    methods: {
      closeModal(){
        this.stateModal=false
      },
      onRowSelected(items){
      this.selectAgent=items[0]
      },
      getInfoAgent(){
        return this.selectAgent
      },
      dateCounter(date) {
        const newDate = new Date(date).getTime();
        const time = moment(newDate);
        return moment(time, "YYYYMMDD").fromNow();
      },
    }
  
  };
  </script>
  <!-- <style lang="scss" scoped>
  @import '@core/scss/vue/libs/vue-select.scss';
  </style> -->

  <style >
.primaryColor, .table thead th{
    background-color: #7367f0 !important;
    color: white !important;
}
</style>
  
  <style  lang="css" scoped>
  #TableAllAgents{
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
  }
  .actions__btns{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .actions__btns button {
    max-height: 60px;
    max-width: 180px;
    width: 100%;
    font-size: 0.8em;
    padding: 8px;
  }
  .btn__change{
    position: relative;
  }
  .label__btn{
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: var(--success);
    color: white;
    padding: 6px;
    border-radius: 50%;
  }
  
  .header{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    gap: 4px;
  }
  .header__btns{
    display: flex;
    flex-direction: column;
  }
  
  .header__btns button{
    background: none;
    border: none;
    padding: 0;
    height: auto;
  }
  .header__btns button svg{
    fill: white;
  }
  
  </style>