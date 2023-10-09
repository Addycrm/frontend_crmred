<template>
  <b-col cols="12">
    <b-table v-if="inmueblesMap.length>0" hover thead-class="primaryColor" small bordered  head-variant="primary"  selected-variant="primary" sticky-header="800px" responsive
      :items="inmueblesMap" :fields="fields" select-mode="single" ref="selectableTable" @row-selected="onRowSelected"
      selectable
      >
      <template #head(id)="data" >
        <div class="header">
          <span class="primary" style="font-weight: bold;">{{ data.label.toUpperCase() }}</span>
        </div>
      </template>
      <template #head(titulo_inmueble)="data">
        <div class="header">
          <span class="primary" style="font-weight: bold;">{{ data.label.toUpperCase() }}</span>
        </div>
      </template>
      <template #head(area_contruida)="data">
        <div class="header">
          <span class="primary" style="font-weight: bold;">{{ data.label.toUpperCase() }}</span>
          <buttonAscDesc :nameFilter="data.column" @sortingChanged="sortingChanged"/>
        </div>
      </template>
      <template #head(tipo_negocio.tipo)="data">
        <div class="header">
          <span class="primary" style="font-weight: bold;">{{ data.label.toUpperCase() }}</span>
        </div>
      </template>
      <template #head(valor_price)="data">
        <div class="header">
          <span class="primary" style="font-weight: bold;">{{ data.label.toUpperCase() }}</span>
          <buttonAscDesc :nameFilter="data.column" @sortingChanged="sortingChanged"/>
        </div>
      </template>
      <template #head(estado_id.name)="data">
        <div class="header">
          <span class="primary" style="font-weight: bold;">{{ data.label.toUpperCase() }}</span>
        </div>
      </template>
      <template #head(ciudad_id.name)="data">
        <div class="header">
          <span class="primary" style="font-weight: bold;">{{ data.label.toUpperCase() }}</span>
        </div>
      </template>
      <template #head(barrio_id.name)="data">
        <div class="header">
          <span class="primary" style="font-weight: bold;">{{ data.label.toUpperCase() }}</span>
        </div>
      </template>
      <template #head(created_at)="data">
        <div class="header">
          <span class="primary" style="font-weight: bold;">{{ data.label.toUpperCase() }}</span>
          <buttonAscDesc :nameFilter="data.column" @sortingChanged="sortingChanged"/>
        </div>
      </template>
      <template #cell(area_contruida)="data">
        <span>
          {{ data.item.area_contruida }} m<sup>2</sup>
        </span>
      </template>
      <template #cell(valor_price)="data">
        <span v-if="data.item.rental_price > 0">
          {{ currencyFormat(data.item.rental_price) }}
        </span>
        <span v-else>
          {{ currencyFormat(data.item.selling_price) }}
        </span>
      </template>
      <template #cell(created_at)="data">
          <span style="font-size: 0.8em;">{{ data.item.created_at | fechaFormating }} ({{
          dateCounter(data.item.created_at)
        }})
        </span>
      </template>
    </b-table>
    <h5 v-else style="text-align: center;">No hay inmuebles registrados.</h5>
  </b-col>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
import buttonAscDesc from "./buttonAscDesc.vue";
  export default{
    data(){
      return{
        fields: [
        {
          key: 'id', label: 'Id'
        },
        {
          key: 'titulo_inmueble', label: 'Nombre inmueble', headerTitle:"Nombre del inmueble"
        },
        {
          key: 'area_contruida', label: 'Area construida', headerTitle:"Area construida del inmueble" 
        },
        {
          key: 'tipo_negocio.tipo', label: 'Tipo negocio', headerTitle:"Tipo negocio del inmueble"
        },
        {
          key: 'valor_price', label: 'valor', headerTitle:"valor del inmueble"
        },
        {
          key: 'estado_id.name', label: 'Departamento',
        },
        {
          key: 'ciudad_id.name', label: 'Ciudad',
        },
        {
          key: 'barrio_id.name', label: 'Barrio',
        }
        ,
        {
          key: 'created_at', label: 'fecha creacion'
        }
      ],
      }
    },
    components:{
      buttonAscDesc
    },
    props:{
      inmueblesMap: {
      type: Array,
      default: []
    },
    },
    filters: {
      fechaFormating: function (value) {
        if (value) {
          let date = new Date(value);
          return date.toLocaleString()
        }
      }
    },
  methods: {
    sortingChanged(context){
      this.$emit('sortingChanged', context)
    },
    currencyFormat(value) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP',minimumFractionDigits: 0, }).format(value);
    },
    dateCounter(date) {
      const newDate = new Date(date).getTime();
      const time = moment(newDate);
      return moment(time, "YYYYMMDD").fromNow();
    },
    inmuebleDetailTable(row){
      return this.$emit('inmuebleDetailTable',row)
    },
    onRowSelected(items){
      this.inmuebleDetailTable(items[0])
    },
  },
  }
</script>
<style >
.primaryColor, .table thead th{
    background-color: #7367f0 !important;
    color: white !important;
}
.sr-only{
  height: 40px !important;
}
.header{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  gap: 4px;
}
</style>