<template>
  <!-- VISTA GRID -->
  <ul class="container-list"  v-if="inmueblesMap.length>0">
    <li class="grid" style=" gap=10px;" v-for="(inmueble, index) in inmueblesMap" :key="index">
      <div  class="card mb-8 cursor-pointer border_card"
        @click="inmuebleDetailGrid(inmueble)">
        <div class="container_span">
          <span class="span_state" v-if="inmueble.state_fisico.name!=null">{{ inmueble.state_fisico.name }}</span>
          <span class="span_state-tipo" v-if="inmueble.tipo_inmueble">
            <!-- APARTAMENTO -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="size_svg" v-if="validateTipoInmueble(inmueble.tipo_inmueble.tipo)=='apartaestudios' || validateTipoInmueble(inmueble.tipo_inmueble.tipo)=='apartamento'" >
              <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"/>
            </svg>
            <!-- CASA -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="size_svg" v-else-if="validateTipoInmueble(inmueble.tipo_inmueble.tipo)=='casa'">
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
            </svg>
            <!-- OTROS -->
            <svg xmlns="http://www.w3.org/2000/svg" class="size_svg" viewBox="0 0 24 24" v-else>
              <path d="M2.7,9.45a4.235,4.235,0,0,0,.3.3V22a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V9.752a4.235,4.235,0,0,0,.3-.3,4,4,0,0,0,.731-3.456L20.97,1.758A1,1,0,0,0,20,1H4a1,1,0,0,0-.97.758L1.972,5.994A4,4,0,0,0,2.7,9.45ZM13,21H11V16h2Zm6,0H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v6H5V10.9A3.989,3.989,0,0,0,8.914,9.61c.026.03.053.059.08.089A4.086,4.086,0,0,0,12.041,11a4.039,4.039,0,0,0,2.965-1.3c.027-.03.054-.059.08-.089A3.989,3.989,0,0,0,19,10.9ZM3.911,6.479,4.781,3H19.219l.87,3.479A2.029,2.029,0,0,1,18.12,9,2.041,2.041,0,0,1,16.1,7.14l-.042-.5a1,1,0,0,0-1.993.166v0a2.006,2.006,0,0,1-.529,1.539A2.059,2.059,0,0,1,11.959,9,2.029,2.029,0,0,1,9.937,6.806v0a1,1,0,0,0-.914-1.079.989.989,0,0,0-1.079.913l-.042.5A2.041,2.041,0,0,1,5.88,9,2.029,2.029,0,0,1,3.911,6.479Z"/>
            </svg>
            {{ inmueble.tipo_inmueble.tipo }}
          </span>
        </div>


        
        <picture>
          <b-card-img-lazy v-if="inmueble.inmueble_imagenes.length > 0" class="card-image"
            :src="inmueble.inmueble_imagenes[0].url" :alt="inmueble.titulo_inmueble">
          </b-card-img-lazy>
          <b-card-img-lazy v-else class="card-image"
            src="https://images.vexels.com/media/users/3/157257/isolated/preview/d3bd73477873ff05a127e686ee688f65-icono-de-casa-blanco-y-negro.png"
            :alt="inmueble.titulo_inmueble">
          </b-card-img-lazy>
        </picture>
        <div class="card-body" style="height: 9rem; overflow: hidden;">
          <b-card-title class="card-price">
            <b class="text-primary mr-12">{{ inmueble.id }}:</b>
            {{ textTransformTitle(inmueble.titulo_inmueble) }}
            <br />
          </b-card-title>
          <b-card-sub-title class="mb-1">
            <b class="text-info_created">
              Fecha de creación:
              {{ inmueble.created_at | fechaFormating }} ({{
                dateCounter(inmueble.created_at)
              }})
            </b>
            <br/>
            <b v-if="$can('show_created_inmueble', 'inmuebles')" 
            class="text-info_created text-info_created-color">
              <span v-if="inmueble.created_by">
                <span v-if="inmueble.created_by.userdata">
                    Creado por:
                    {{ inmueble.created_by.userdata.primer_nombre }}

                  </span>
              </span>
            </b>
          </b-card-sub-title>
          <b-card-text> </b-card-text>
        </div>
        <ul class="list-group list-group-flush">
          <li class="
                      card-price
                      value
                      font-weight-bolder
                      text-primary
                      list-group-item
                    " v-if="inmueble.selling_price">
            {{ currencyFormat(inmueble.selling_price) }}
          </li>
          <li class="
                      card-price
                      value
                      font-weight-bolder
                      text-primary
                      list-group-item
                    " v-else>
            {{ currencyFormat(inmueble.rental_price) }}
          </li>
          <li class="list-group-item">
            <strong> Ciudad: </strong><span>{{
              inmueble.ciudad_id != null
                ? inmueble.ciudad_id.name
                : null
            }}</span>
          </li>
          <li class="list-group-item">
            <strong>Barrio: </strong><span>{{
              inmueble.barrio_id != null
                ? inmueble.barrio_id.name
                : null
            }}
            </span>
          </li>
          <li class="list-group-item">
            <strong> Tipo Negocio: </strong><span>{{
              inmueble.tipo_negocio != null
                ? inmueble.tipo_negocio.tipo
                : null
            }}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
  <h5 v-else style="text-align: center;">No hay inmuebles registrados.</h5>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
export default {
  props: {
    inmueblesMap: {
      type: Array,
      default: []
    },
  },
  computed:{
    
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
    textTransformTitle(text){
      let title = text.toLowerCase()
      title = title.charAt(0).toUpperCase() + title.slice(1);
      return title;
    },
    validateTipoInmueble(tipo){
      let data = tipo.toLowerCase();
      return data;
    },
    currencyFormat(value) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP',minimumFractionDigits: 0, }).format(value);
    },
    dateCounter(date) {
      const newDate = new Date(date).getTime();
      const time = moment(newDate);
      return moment(time, "YYYYMMDD").fromNow();
    },
    inmuebleDetailGrid(row){
      return this.$emit('inmuebleDetailGrid',row)
    }
  },
}
</script>

<style scoped>

.container-list{
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(18rem,25rem));
  place-content: center;
  grid-auto-rows: 40rem;
  grid-gap: 1rem;
}
.text-info_created{
  display:inline-block;
  font-size: 12px;
}
.text-info_created-color{
  padding-top: 8px;
  color: var(--primary);
  
}
.border_card {
  border: 4px solid #e3e4e5;
}
.border_card:hover {
  box-shadow: 4px 4px 8px 8px rgba(0, 0, 0, 0.2) !important;
}

.container_span{
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: absolute;
  left: 4px;
  top: 4px;
  font-size: 0.8em;
}
.span_state{
  width:fit-content;
  padding: 4px;
  background-color: #accb86;
  color: white;
  border-radius: 5px;
}
.span_state-tipo {
  width:fit-content;
  padding: 4px;
  border-radius: 5px;
  background-color:#f2f6fd;
  color: black;

}
.size_svg{
  height: 14px;
  fill: var(--primary);
}

.card-image {
  max-height: 220px;
  margin-bottom: 0.8em;
}

.card-price {
  font-size: 1.2rem;
}
.size_title{
  font-size: 0.5em !important;
}

</style>