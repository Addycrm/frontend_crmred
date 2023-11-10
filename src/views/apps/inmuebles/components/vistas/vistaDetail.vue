<template >
  <div class="table-info-inmueble m-0 cursor-pointer hover-row_item">
    <b-col class="p-10 col-sm-auto">
      <figure class="table-info-inmueble-thumbnail cursor-pointer">
        <template v-if="props.row.inmueble_imagenes[0]">
          <img :src="props.row.inmueble_imagenes[0].url
          " alt="" />
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z" />
          </svg>
        </template>
      </figure>
    </b-col>
    <b-col class="p-10 content-table-info-inmueble">
      <b-row class="mx-n10 mt-n10 order-1 order-sm-0" align-v="center">
        <b-col class="p-10 position-title">
          <h5 @click="inmuebleDetail(props.row)" class="title cursor-pointer">
            <b class="text-primary mr-10">{{ props.row.id }}:</b>{{ props.row.titulo_inmueble }}.
            <br />
            <b class="text-info_created">
              Fecha de creación:
              {{ props.row.created_at | fechaFormating }} ({{
                dateCounter(props.row.created_at)
              }})
            </b>
            <br/>
            <b v-if="$can('show_created_inmueble', 'inmuebles')"
            class="text-info_created text-info_created-color">
              <span v-if=" props.row.created_by.userdata">
                  Creado por:
                {{ props.row.created_by.userdata.primer_nombre }}
              </span>
            </b>
          </h5>
        </b-col>
        <b-col cols="12" sm="auto" class="p-10 m-auto">
          <b-badge class="m-sm-auto" :style="{ width: '80px' }" :variant="stateVariant(props.row.state_inmueble.id)"
              >
                {{ props.row.state_inmueble.name }}
              </b-badge>
          <!-- <b-dropdown text="center align" variant="link" block toggle-class="p-0" no-caret>
            <template #button-content class="container m-auto">
              <b-badge class="m-sm-auto" :style="{ width: '80px' }" :variant="
                stateVariant(props.row.state_inmueble.id)
              ">
                {{ props.row.state_inmueble.name }}
              </b-badge>
            </template>
            <b-dropdown-item v-for="item in storeConfig.state_property" :key="item.id"
              :disabled="props.row.state_inmueble.id == item.id"
              @click="
                stateProperty({
                  state: item.id,
                  property: props.row.id,
                })
              ">
              {{ item.name }}
            </b-dropdown-item>
          </b-dropdown> -->
        </b-col>
      </b-row>
      <hr class="my-10" />
      <b-row @click="inmuebleDetail(props.row)" class="mx-n10 mb-n10 grid-table-info-inmueble">
        <b-col class="p-10">
          <b class="label">Estado de la Propiedad:</b>
          <span class="value font-weight-bold text-success">
            {{ props.row.state_fisico.name }}
          </span>
        </b-col>
        <b-col class="p-10">
          <b class="label">Tipo de Negocio:</b>
          <span class="value" v-if="props.row.tipo_negocio">{{
            props.row.tipo_negocio.tipo
          }}</span>
        </b-col>
        <!-- VENTA -->
        <b-col class="p-10" v-if="props.row.tipo_negocio.tipo == 'Venta'">
          <b class="label container_price">Valor de Venta:</b>
          <span class="value font-weight-bolder text-primary container_price">
            {{ props.row.selling_price | precio }}
          </span>
        </b-col>
        <!-- ALQUILER -->
        <b-col class="p-10" v-else-if="props.row.tipo_negocio.tipo == 'Alquiler'">
          <b class="label container_price">Valor de Alquiler:</b>
          <span class="value font-weight-bolder text-primary container_price">
            {{ props.row.rental_price | precio }}
          </span>
        </b-col>
        <!-- AMBOS -->
        <b-col v-else class="p-10">
          <b-col class="p-10">
            <b class="label container_price">Valor de Venta:</b>
            <span class="value font-weight-bolder text-primary container_price">
              {{ props.row.selling_price | precio }}
            </span>
          </b-col>
          <b-col class="p-10">
            <b class="label container_price">Valor de Alquiler:</b>
            <span class="value font-weight-bolder text-primary container_price">
              {{ props.row.rental_price | precio }}
            </span>
          </b-col>
        </b-col>
        <!-- VALOR ADMIN -->
        <b-col class="p-10" v-if="props.row.precio_administracion >0" >
            <b class="label container_price" >Valor de Administación:</b>
            <span class="value font-weight-bolder text-primary container_price">
              $ {{currencyFormat(props.row.precio_administracion)}}
            </span>
          </b-col>
        <b-col class="p-10">
          <b class="label">Zona:</b>
          <span class="value">
            <template v-if="props.row.zona_id">
              {{ props.row.zona_id.name }}
            </template>
            <template v-else> ---- </template>
          </span>
        </b-col>
        <b-col class="p-10">
          <b class="label">Barrio:</b>
          <span class="value font-weight-bolder text-primary">
            <template v-if="props.row.barrio_id">
              {{ props.row.barrio_id.name }}
            </template>
            <template v-else> ---- </template>
          </span>
        </b-col>
        <b-col class="p-10">
          <b class="label">Ciudad:</b>
          <span class="value">
            <template v-if="props.row.ciudad_id">
              {{ props.row.ciudad_id.name }}
            </template>
            <template v-else> ---- </template>
          </span>
        </b-col>
        <b-col class="p-10">
          <b class="label">Departamento:</b>
          <span class="value">
            <template v-if="props.row.estado_id">
              {{ props.row.estado_id.name }}
            </template>
            <template v-else> ---- </template>
          </span>
        </b-col>
        <b-col class="p-10">
          <b class="label">Area Construida:</b>
          <span class="value">
            <template v-if="props.row.area_contruida">
              {{ props.row.area_contruida }} m<sup>2</sup>
            </template>
            <template v-else> ---- </template>
          </span>
        </b-col>
        <b-col class="p-10">
          <b class="label">Area Lote:</b>
          <span class="value">
            <template v-if="props.row.area_lote">
              {{ props.row.area_lote }} m<sup>2</sup>
            </template>
            <template v-else> ---- </template>
          </span>
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<script>
import { imgValidateURL } from "@/libs/helpers";
import moment from "moment";
import "moment/locale/es";

export default {
  data() {
    return {
      imgValidateURL
    }
  },

  components: {

  },
  props: {
    props:{
      type: Object,
      default: []
    }
  },
  filters: {
    fechaFormating: function (value) {
      if (value) {
        let date = new Date(value);
        return date.toLocaleString()
      }
    }
  },
  computed:{
    storeConfig() {
      return this.$store.state.appConfiguracion.options;
    },
  },
  methods: {
    currencyFormat(value) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP',minimumFractionDigits: 0, }).format(value);
    },
    dateCounter(date) {
      const newDate = new Date(date).getTime();
      const time = moment(newDate);
      return moment(time, "YYYYMMDD").fromNow();
    },
    inmuebleDetail(row) {
      return this.$emit('inmuebleDetail', row)
    },
    modalFicha(slug) {
      return this.$emit('modalFicha', slug)
    },
    stateVariant(state) {
      let variant;
      switch (state) {
        case 3:
          variant = "light-danger";
          break;
        case 4:
          variant = "light-warning";
          break;
        default:
          variant = "light-primary";
      }
      return variant;
    },
    stateProperty(data){
      return this.$emit('stateProperty', data)
    }
  },
}
</script>

<style scoped>

.text-info_created{
  display:inline-block;
  font-size: 10px;
  color: #333;
  padding-top: 8px;
}
.text-info_created-color{
  color: var(--primary);
  font-weight: bold;
}

.table-info-inmueble {
  display: flex;
  margin-top: 6px;
  margin-bottom: 6px;
  flex-direction: row;

}
.hover-row_item{
  padding: 0.5rem;
}
.table-info-inmueble-thumbnail {
  position: relative;
  width: 80px;
  height: 120px;
  z-index: 1;
  margin: 0;
  background: #d5d5d5;
  display: flex;
}

.table-info-inmueble-thumbnail img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.table-info-inmueble-thumbnail svg {
  width: 60%;
  margin: auto;
  fill: #000;
  opacity: 0.25;
}
.portales-content-table-info-inmueble {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: -3px;
  width: auto;
}

.portales-content-table-info-inmueble li {
  position: relative;
  outline: 1px solid #d5d5d5;
  outline-offset: -1px;
  z-index: 1;
  margin: 3px;
}

.portales-content-table-info-inmueble li .state-portal {
  position: absolute;
  inset: 0;
  display: block;
  z-index: 1;
}

.portales-content-table-info-inmueble li .state-portal.sync {
  outline: 3px solid #28c76f;
  outline-offset: -3px;
}
.table-info-inmueble .title {
  font-size: 1rem;
  font-weight: bold;
  color: black;
  margin: 0;
  text-transform: uppercase;
  border-bottom: 1px solid #888 ;
}
.table-info-inmueble .label {
  display: block;
  font-size: 0.9em;
  margin-bottom: 5px;
}
.grid-table-info-inmueble> * {
  width: 100%;
  flex-basis: inherit;
  flex-grow: 0;
}
.container_price{
  width: 150px;
}

@media (min-width: 480px) {
  .grid-table-info-inmueble> * {
    width: calc(100% / 2);
  }
}

@media (min-width: 768px) {
  .grid-table-info-inmueble> * {
    width: calc(100% / 4);
  }

}

@media (min-width: 1700px) {
  .grid-table-info-inmueble> * {
    width: auto;
    flex-basis: 0;
    flex-grow: 1;
  }

}

@media (max-width:560px) {
  .table-info-inmueble-thumbnail{
    margin: 0 auto;
  }
  .table-info-inmueble{
    flex-direction: column;
  }
}
</style>
