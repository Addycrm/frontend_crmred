<template>
  <VueGoodTable
    styleClass="vgt-table striped" 
    :columns="columns"
    :rows="registros"
    :pagination-options="{
      enabled: true,
      perPage:perPage
    }"
  >
    <template slot="emptystate">
      <div class="text-center p-1">No hay citas registradas</div>
    </template>
    <template
      slot="table-row"
      slot-scope="props"
    > 
      <b-row class="m-0">
        <b-col cols="12" class="p-0">
          <h4 class="d-flex align-items-center mb-0">
            <span
              class="rounded-circle d-inline-block mr-50"
              :class="`bg-${props.row.t_cita.color}`"
              :style="{padding: '5px'}"
            />
            <span>{{ props.row.t_cita.label }}</span> 
            <template v-if="props.row.direccion">
              <span class="mx-1">|</span> {{props.row.direccion}}
            </template>
          </h4>
        </b-col>
      </b-row>
      <hr>
      <b-row class="m-0">
        <b-col class="p-0">
          <table class="table-data" width="100%">
            <colgroup> <col :style="{width: '10em'}"> </colgroup>
            <tr>
              <td><b>Fecha Inicio:</b></td>
              <td>{{formatDate(props.row.start, { month: "long", day: "numeric", year: 'numeric'})}}</td>
            </tr>
            <tr>
              <td><b>Fecha Final:</b></td>
              <td>{{formatDate(props.row.end, { hourCycle: 'h12', hour: 'numeric', minute: 'numeric'})}}</td>
            </tr>
          </table>
        </b-col>
        <b-col class="p-0">
          <table class="table-data" width="100%">
            <colgroup> <col :style="{width: '6em'}"> </colgroup>
            <tr>
              <td><b>Asesor:</b></td>
              <td>
                <template v-if="props.row.assignee">
                  {{props.row.assignee.userdata.primer_nombre}}
                </template>
                <template v-else>
                  ----
                </template>
              </td>
            </tr>
            <tr>
              <td><b>Cliente:</b></td>
              <td>
                <template v-if="props.row.cliente_id">
                  {{props.row.cliente_id.nombre}}
                </template>
                <template v-else>
                  ----
                </template>
              </td>
            </tr>
          </table>
        </b-col>
        <b-col class="p-0">
          <table class="table-data" width="100%">
            <tr>
              <td><b>Inmueble:</b></td>
            </tr>
            <tr>
              <td>
                {{props.row.inmueble_id.titulo_inmueble}}<br>
                <small><i>{{props.row.inmueble_id.direccion}}</i></small>
              </td>
            </tr>
          </table>
        </b-col>
      </b-row>
      <b-row class="m-0">
        <b-col class="p-0">
          <table class="table-data" width="100%">
            <tr>
              <td><b>Nota:</b></td>
            </tr>
            <tr>
              <td>
                <template v-if="props.row.nota">
                  {{props.row.nota}}
                </template>
                <template v-else>
                  ----
                </template>
              </td>
            </tr>
          </table>
        </b-col>
      </b-row>
    </template>
    <template
      slot="pagination-bottom"
      slot-scope="props"
    >
      <div class="d-flex justify-content-between flex-wrap">
        <div v-if="registros.length > perPage" class="d-flex align-items-center mb-0 mt-1">
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
        <div>
          <b-pagination
            v-if="props.total > perPage"
            :value="1"
            :total-rows="props.total"
            :per-page="perPage"
            first-number
            last-number
            align="right"
            prev-class="prev-item"
            next-class="next-item"
            class="mt-1 mb-0"
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
</template>

<script>
  import { formatDate, avatarText } from "@core/utils/filter";
  import { VueGoodTable } from 'vue-good-table'
  export default {
    name: "ModalHistorial",
    props:{
      inmueble: Object
    },
    components:{
      VueGoodTable
    },
    data() {
      return {
        formatDate,
        columns: [
          {label: 'Citas Agendadas', field: 'citas',},
        ],
        registros: [],
        perPage: 10,
      };
    },
    mounted(){
      this.getHistorialAgenda(this.inmueble);
    },
    methods: {
      async getHistorialAgenda({id}) {
        this.$store
        .dispatch("appCalendar/fetchReporteAgente", id)
        .then(res => {
          res.sort((a, b) => {
              return a['id'] < b['id'] ? 1 : a['id'] > b['id'] ? -1 : 0;
          });
          this.registros = res;
        }).catch(err => {
          console.error(err);
        });
      },
    },
  };
</script>
<style>
  .nota span{display: block;line-height: 1.6;max-height: calc(1.6em * 4);overflow-x: hidden;}
  .table-data td, .table-data tr{
    background:transparent!important;
    border: none!important;
  }
</style>

