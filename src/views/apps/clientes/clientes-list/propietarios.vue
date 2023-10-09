<template>
  <b-card>
    <div id="Propietarios">
      <b-row>
        <b-col cols="12">
          <b-overlay :show="overlay">
            <VueGoodTable
              styleClass="vgt-table striped"
              v-bind="goodTable.props"
              v-on="goodTable.events"
            >
              <template slot="emptystate">
                <div class="text-center p-1">No hay propietarios registrados</div>
              </template>
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field === 'propietario'">
                  <span v-if="props.row.primer_nombre">{{ props.row.primer_nombre }}</span>
                  <span v-if="props.row.primer_apellido">{{ props.row.primer_apellido }}</span>
                </span>
                <span v-else-if="props.column.field === 'inmueble'">
                  <b-badge v-if="props.row.inmuebles" variant="light-primary">
                    {{props.row.inmuebles.titulo_inmueble}}
                  </b-badge>
                </span>
                <span
                  v-else-if="props.column.field === 'whatsapp'"
                  class="text-center d-block"
                >
                  <b-button
                    v-if="props.row.telefono_fijo"
                    :href="'https://wa.me/57' + props.row.telefono_fijo"
                    pill
                    variant="success"
                    target="_blank"
                    class="
                      btn-icon
                      d-flex
                      justify-content-center
                      align-items-center
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      :style="{
                        width: '1.25em',
                        height: '1em',
                        margin: '-0.5em',
                        fontSize: '20px',
                      }"
                      fill="currentColor"
                    >
                      <path
                        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                      />
                    </svg>
                  </b-button>
                </span>
                <span
                  v-else-if="props.column.field === 'email'"
                  class="text-center d-block"
                >
                  <b-button
                    v-if="props.row.email"
                    :href="'mailto:' + props.row.email"
                    pill
                    variant="primary"
                    class="
                      btn-icon
                      d-flex
                      justify-content-center
                      align-items-center
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      :style="{
                        width: '1.25em',
                        height: '1em',
                        margin: '-0.5em',
                        fontSize: '15px',
                      }"
                      fill="currentColor"
                    >
                      <path
                        d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"
                      />
                    </svg>
                  </b-button>
                </span>
                <span
                  v-else-if="props.column.field === 'actions'"
                  class="d-flex justify-content-center"
                >
                  <b-button
                    variant="info"
                    size="sm"
                    class="d-inline-flex align-items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      :style="{
                        width: '1.25em',
                        height: '1em',
                        margin: '-0.5em',
                        marginRight: '0.8rem',
                        fontSize: '15px',
                      }"
                      fill="currentColor"
                    >
                      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path d="M304 16.58C304 7.555 310.1 0 320 0C443.7 0 544 100.3 544 224C544 233 536.4 240 527.4 240H304V16.58zM32 272C32 150.7 122.1 50.34 238.1 34.25C248.2 32.99 256 40.36 256 49.61V288L412.5 444.5C419.2 451.2 418.7 462.2 411 467.7C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zM558.4 288C567.6 288 575 295.8 573.8 305C566.1 360.9 539.1 410.6 499.9 447.3C493.9 452.1 484.5 452.5 478.7 446.7L320 288H558.4z"/>
                    </svg>
                    <span class="align-middle">Reporte</span>
                  </b-button>
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
              <template slot="pagination-bottom" slot-scope="props">
                <div v-show="propietarios.length > perPage" class="d-flex justify-content-between flex-wrap align-items-center p-1 mx-n1 mb-n1 sticky-pagination">
                  <div v-if="propietarios.length > perPage" class="d-flex align-items-center">
                    <span class="text-nowrap">
                      Mostrando 1 a
                    </span>
                    <b-form-select
                      v-model="perPage"
                      :options="['10','20','100']"
                      class="mx-1"
                      @input="(value)=>props.perPageChanged({currentPerPage:value})"
                    />
                    <span class="text-nowrap"> de {{ props.total }} registros </span>
                  </div>
                  <div v-if="props.total > perPage" class="d-flex">
                    <b-pagination
                      :value="1"
                      :total-rows="props.total"
                      :per-page="perPage"
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
          </b-overlay>
        </b-col>
      </b-row>
      <transition name="slide-to-left">
        <v-modal v-if="sideBarState" @close="clearTable" ref="modalInmueble" titulo="Detalle del inmueble" sideBar size="md">
          <component is="DetailsInmuebles" :detail="rowSelected[0]"/>
        </v-modal>
      </transition>
    </div>
  </b-card>
</template>

<script>
import VSelect from "vue-select";
import VModal from "@/views/componente/vModal";
import { VueGoodTable } from "vue-good-table";
import DetailsInmuebles from "@/views/apps/inmuebles/components/detailsInmuebles";

export default {
  name: "Propietarios",
  components: {
    VSelect,
    VModal,
    VueGoodTable,
    DetailsInmuebles,
  },
  data(){
    return{
      overlay: false,
      currentPage: 1,
      totalRows: 1,
      perPage: 10,
      rowSelected: [{}],
      sideBarState: false,
      columns: [
        {thClass: 'text-nowrap td-sticky left', tdClass: 'td-sticky left', field: "id", label: "ID"},
        {thClass: 'text-nowrap', field: "inmueble", label: "Inmueble"},
        {thClass: 'text-nowrap', field: "propietario", label: "Propietario", width:'15em'},
        {thClass: 'text-nowrap', field: "celular", label: "Celular", width:'15em'},
        {thClass: 'text-nowrap', field: "email", label: "E-mail", width: '10em'},
        {thClass: 'text-nowrap', field: "whatsapp", label: "WhatsApp", width: '10em'},
        // {thClass: 'text-nowrap td-sticky right', tdClass: 'td-sticky right', field: "actions", label: "Acción", width:'13em'}
      ],
    }
  },
  computed:{
    propietarios(){
      return this.$store.state.appCliente.propietarios;
    },
    goodTable(){
      let table = {props:{}, events:{}};
      Object.assign(table.props, {
        columns: this.columns,
        rows: this.propietarios,
        paginationOptions: {
          enabled: true,
          perPage: this.perPage,
          rowStyleClass: this.rowStyleClass
        }
      });

      Object.assign(table.events, {
        'on-row-click': this.inmuebleDetail
      });

      return table;
    }
  },
  mounted(){
    this.getPropietarios();
  },
  methods:{
    clearTable(){
      this.rowSelected = [{}];
      this.sideBarState = false;
    },
    rowStyleClass(a){
      return this.rowSelected[0].id == a.row.inmuebles.id ? 'success' : '';
    },
    inmuebleDetail(a){
      if(this.rowSelected[0].id == a.row.inmuebles.id){

        this.clearTable();
      }else{
        let inmueble = {};
        Object.assign(inmueble, a.row.inmuebles);
        Object.assign(inmueble, {
          inmueble_imagenes: inmueble.inmueble_imagenes.map(item => item.url),
        })

        let _json = ['tipo_inmueble','tipo_negocio','segmento_mercado','estrato'];
        for(let prop of _json){
          Object.assign(inmueble, {
            [prop]: inmueble[prop].tipo ? inmueble[prop].tipo : inmueble[prop].name,
          })          
        }

        this.rowSelected = [inmueble];
        this.sideBarState = true;
      }
    },
    async getPropietarios(){
      await this.$store.dispatch('appCliente/getPropietarios')
      .then().catch(error => {
        console.error(error)
      });
    },
  }
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
<style lang="css">
  .sticky-pagination{
    position: sticky;
    background: #fff;
    bottom: 0;
    z-index: 2;
  }
  .vgt-table tr.clickable.success td {background: #28c76f4d!important;}
</style>