
<template>
  <div class="tableAgents">
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
            </div>
          </app-collapse-item>
        </app-collapse>
      </div>
    <b-row class="mt-2" align-v="end">
      <div class="col-auto">
        <b-button variant="secondary" @click="clearFilter()"> Limpiar </b-button>
      </div>
      <b-col cols="auto" :style="{ width: '8em' }">
      </b-col>
      <b-col cols="auto" class="mx-auto my-1">
        Clientes: <b class="text-primary">{{ tableAgents.to }}</b> de
        <b>{{ tableAgents.total }}</b>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col cols="12">
        <b-overlay :show="overlay">
          <!-- TABLA DE AGENTES -->
          <b-col cols="12">
            <b-table 
              hover 
              small 
              bordered 
              head-variant="primary" 
              thead-class="primaryColor"
              selected-variant="primary" 

              responsive 
              :items="listAgentesPage" 
              :fields="fields" 
              ref="selectableTable"
              select-mode="single" 
              @row-selected="onRowSelected"
              selectable

            >
              <template #cell(userdata.foto_persona)="data">
                <b-avatar class="mr-1" :src="data.value" size="4rem" />
              </template>
              <template #cell(created_at)="data">
                {{ formatingDate(data.item.created_at) }}
              </template>
              <template #cell(count)="data" >
                <div class="d-flex justify-content-center">
                  <b-badge variant="primary" class="">
                    {{data.item.count  }}
                  </b-badge>
                </div>
              </template>
              <template #cell(action)="data">
                <b-button variant="primary" :to="toRedirectAgent" ref="buttonRedirect"
                  @click="showListEstate(data.item)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-house-up" viewBox="0 0 16 16">
                    <path
                      d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z" />
                    <path
                      d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 1 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.707l1.5-1.5a.5.5 0 0 1 .708 0Z" />
                  </svg>
                  Ver inmuebles
                </b-button>

              </template>
            </b-table>

          </b-col>
          <div class="d-flex flex-wrap align-items-center mt-1">
            <div class="d-flex">
              <b-pagination v-if="tableAgents.per_page < tableAgents.total" @change="getAgents" :value="currentPage"
                :per-page="tableAgents.per_page" :total-rows="tableAgents.total" first-number last-number
                prev-class="prev-arrow" next-class="next-arrow">
                <template #prev-text>
                  <feather-icon icon="ChevronLeftIcon" size="18" />
                </template>
                <template #next-text>
                  <feather-icon icon="ChevronRightIcon" size="18" />
                </template>
              </b-pagination>
            </div>
          </div>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import agentEliteMixins from "./agentEliteMixins.js";
import VSelect from "vue-select";
import VModal from "@/views/componente/vModal";
import Ripple from 'vue-ripple-directive';
import moment from "moment";
//desplegables
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
//date


export default {

  name: "modalAgentElite",
  directives: {
    Ripple,
  },
  mixins: [agentEliteMixins],
  components: {
    VSelect,
    VModal,
    AppCollapse,
    AppCollapseItem,
  },
  data() {
    return {
      selectAgent:null,
      fields: [
                {
                    key: 'id', label: 'ID Agente'
                },
                {
                    key: 'userdata.foto_persona', label: 'Imagen', headerTitle:"Imagen del agente"
                },
                {
                    key: 'created_at', label: 'Fecha registro', headerTitle:"Fecha registro" 
                },
                {
                    key: 'userdata.primer_nombre', label: 'Cliente', headerTitle:"Nombre del cliente"
                },
                {
                    key: 'email', label: 'Email', headerTitle:"Email del agente"
                },
                {
                    key: 'userdata.celular_movil', label: 'Celular',
                },
                {
                    key: 'empresa.nombre', label: 'Empresa',
                },
                {
                    key: 'count', label: 'Num. Inmuebles',
                },
            ],
    }
  },
  methods: {
    cleanDate(data){
      this.query[data]=null;
    },
    formatingDate(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    onRowSelected(items){
      this.selectAgent=items[0]
    },
    getInfoAgent(){
      return this.selectAgent
    }
  },

};
</script>
<!-- <style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style> -->

<style lang="css" scoped>
.container__flat-pickr{
  display: flex ;
}

.flat-pickr__btn{
  border: 1px solid #d9d7df;
  background-color: white;
}
.flat-pickr__btn svg{
  fill: var(--primary);
}
.icon {
  width: 1.25em;
  font-size: 24px;
  display: flex;
  color: var(--primary);
  justify-content: center;
  /* margin: 0 auto; */
}

.icon svg {
  display: block;
  width: auto;
  height: 1em;
  fill: currentColor;
}

.icon.whatsapp {
  color: #57d163;
}

.badge {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.badge::after {
  content: "";
  position: absolute;
  inset: 0;
  display: block;
  background: currentColor;
  opacity: 0.15;
}

.badge-blue {
  color: #009aff;
}

.badge-pink {
  color: var(--pink);
}

.vgt-table tr.clickable.success td {
  background: #28c76f4d !important;
}

@media(max-width: 676px) {
  .marginLeft {
    margin: auto;
    margin-top: 8px;
  }
}
</style>
