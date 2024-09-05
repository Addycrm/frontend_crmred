<template>
  <div id="tableProperty">
    <app-collapse>
        <app-collapse-item title="FILTRO CÓDIGO" :isVisible="true">
              <div class="d-flex flex-wrap container__filter">
                <span class="span-title">FILTRO CÓDIGO</span>
                <!-- <b-col cols="12" md="3">
                  <b-form-group label="Código externo">
                    <b-form-input :value="query.codigo_externo" @change="setQuery('codigo_externo', $event)"
                      placeholder="Código..." name="code" type="text" trim />
                  </b-form-group>
                </b-col> -->
                <b-col cols="12" md="3">
                  <b-form-group label="Código homiup">
                    <b-form-input :value="query.id" @change="setQuery('id', $event)" placeholder="Ingrese el código..." name="code"
                      type="text" trim />
                  </b-form-group>
                </b-col>
              </div>
        </app-collapse-item>          
      </app-collapse>
      <b-overlay :show="overlay">
        <div v-if="tablaInmuebles.data.length>0">
          <b-table 
            hover 
            small 
            bordered 
            head-variant="primary" 
            thead-class="primaryColor"
            selected-variant="primary" 
            responsive 
            :items="tablaInmuebles.data" 
            :fields="fields" 
            ref="selectableTable"
            select-mode="single" 
            @row-selected="onRowSelected"
            selectable
          >
            <template #cell(image)="data">
              <div v-if="data.item.inmueble_imagenes[0]">
                <img class="item__image" :src="data.item.inmueble_imagenes[0].url" />
              </div>
            </template>
            <template #cell(created_at)="data">
                {{ formatingDate(data.item.created_at) }}
              </template>
              <template #cell(created_by)="data">
                {{ data.item.created_by.userdata.primer_nombre }}
              </template>
          </b-table>
      
          <b-pagination v-if="tablaInmuebles.per_page < tablaInmuebles.total" @change="getInmuebles"
            :value="currentPage" :per-page="tablaInmuebles.per_page" :total-rows="tablaInmuebles.total"
            first-number last-number prev-class="prev-arrow" next-class="next-arrow">
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </div>
        <div v-else>
          <h4>No hay inmuebles registrados.</h4>
        </div>
      </b-overlay>
  </div>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
//desplegables
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import moment from "moment";

export default {

  components:{
    AppCollapse,
    AppCollapseItem,
  },
  props:{
    agenElitetSelected:{
      type:Object
    }
  },
  data() {
    return {
      query:{
        codigo_externo:null,
        id:null
      },
      overlay: false,
      selectProperty:null,
      currentPage: 1,
      fields: [
        {
          key:'image', label:'IMAGEN'
        },
        {
            key: 'id', label: 'ID'
        },
        {
            key: 'titulo_inmueble', label: 'NOMBRE INMUEBLE'
        },
        {
          key: 'created_at', label: 'FECHA REGISTRO'
        },
        {
          key: 'tipo_inmueble.tipo', label: 'TIPO INMUEBLE'
        },
        {
          key: 'tipo_negocio.tipo', label: 'TIPO NEGOCIO',
        },
        {
            key: 'created_by', label: 'CREADPO POR'
        },
      ],
    }
  },
  computed:{
    tablaInmuebles() {
      return this.$store.state.appInmueble.tabla;
    },
  },
  created(){
    this.watchQuerys();
  },
  methods: {
    formatingDate(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    onRowSelected(items){
      this.selectProperty=items[0]
    },
    getInfoProperty(){
      return this.selectProperty
    },
    watchQuerys() {
      for (let prop in this.query) {
        this.$watch(
          () => this.query[prop],
          (a) => {
            this.getInmuebles();
          }
        );
      }
    },
    setQuery(prop, value) {
      this.query[prop] = value;
    },
    async getInmuebles(a = 1) {
      this.overlay = true;
      let params = { page: a };
      let data = {
        idAgent:this.agenElitetSelected.id
      };
      for (let prop in this.query)
        if (this.query[prop]) data[prop] = this.query[prop];
      try{
        let res
        if(this.agenElitetSelected.id!=null){

          res = await this.$store.dispatch("appInmueble/getInmueblesAgentFilter", { data, params })
        }
        this.overlay = false;
        if (!res) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: "Algo salio mal",
            icon: "AlertCircleIcon",
            text: "Si el problema persiste recargar la pagina o comunicate con soporte",
            variant: "danger",
          },
        });
      }
      }catch(error){
      }
    },
  },

}
</script>
<style scoped>
  .item__image{
    max-width: 100px;
    object-fit: cover;
  }
  .container__filter {
  position: relative;
  border: 2px solid #7367f0;
  padding: 1.2rem 0;
  border-radius: 16px;
  margin-bottom: 1.4rem;
}

.span-title {
  position: absolute;
  left: 1rem;
  top: -1rem;
  background-color: white;
  z-index: 5;
  padding: 6px;
  font-weight: bold;
  color: #7367f0;
}
</style>