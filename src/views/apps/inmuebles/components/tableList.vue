
<template>
  <b-row>
    <b-col md="2" sm="4" class="my-1">
      <b-form-group class="mb-0">
        <label class="d-inline-block text-sm-left mr-50">Por pagina</label>
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          size="sm"
          :options="pageOptions"
          class="w-50"
        />
      </b-form-group>
    </b-col>

    <b-col cols="12">
      <b-table
        striped
        hover
        responsive
        ref="selectableTable"
        :items="properties"
        :fields="fields"
        :filter="filter"
        show-empty
        small
        selected-variant="primary"
        empty-text="No hay inmuebles"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
        @row-selected="onRowSelected"
        select-mode="single"
        selectable
      >
        <template #cell(inmueble_imagenes)="data">
          <span v-if="data.item.inmueble_imagenes.length > 0">
            <b-img
              v-bind="mainProps"
              rounded
              alt="Transparent image"
              class="d-inline-block mr-1 mb-1 border"
              :src="data.item.inmueble_imagenes[0].url"
            />
          </span>
        </template>
        <template #cell(tipo_inmueble)="data"
          ><h5>
            <strong>{{ data.item.tipo_inmueble.tipo }}</strong>
          </h5>
        </template>
        <template #cell(estado_id)="data"
          ><h5>
            <strong>{{ data.item.estado_id.name }}</strong>
          </h5>
        </template>
        <template #cell(ciudad_id)="data"
          ><h5>
            <strong>{{ data.item.ciudad_id.name }}</strong>
          </h5>
        </template>
        <template #cell(barrio_id)="data">
          <h5>
            <strong>{{ data.item.barrio_id.name }}</strong>
          </h5>
        </template>
        <template #cell(tipo_negocio)="data">
          <h5>
            <strong>{{ data.item.tipo_negocio.tipo }}</strong>

          </h5>
        </template>
        <template #cell(precio)="data">
          <h5>
            <span v-if="valTypeInmueble(data.item.tipo_negocio.tipo)">
              <strong> {{ data.item.selling_price | precio }} </strong>
            </span>
            <span v-else>
              <strong>{{ data.item.rental_price | precio }} </strong>
            </span>
          </h5>
        </template>

        <template #cell(ficha)="data">

          <b-button
            v-b-tooltip.hover
            title="Ver Ficha"
            pill
            variant="warning"
            v-if="$can('read', 'inmuebles')"
            :to="{
              name: 'inmuebles-details',
              params: { slug: data.item.slug, code: 'FICHA_WEB' },
            }"
            target="_blank"
            class="
              btn-icon
              d-flex
              justify-content-center
              align-items-center
              m-10
            "
            size="sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              :style="{
                width: '1.25em',
                height: '1em',
                margin: '-0.5em',
                fontSize: '12px',
              }"
              fill="currentColor"
            >
              <path
                d="M224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM96 224c17.67 0 32 14.33 32 32S113.7 288 96 288S64 273.7 64 256S78.33 224 96 224zM318.1 439.5C315.3 444.8 309.9 448 304 448h-224c-5.9 0-11.32-3.248-14.11-8.451c-2.783-5.201-2.479-11.52 .7949-16.42l53.33-80C122.1 338.7 127.1 336 133.3 336s10.35 2.674 13.31 7.125L160 363.2l45.35-68.03C208.3 290.7 213.3 288 218.7 288s10.35 2.674 13.31 7.125l85.33 128C320.6 428 320.9 434.3 318.1 439.5zM256 0v128h128L256 0z"
              />
            </svg>
          </b-button>
        </template>
      </b-table>
    </b-col>

    <b-col cols="12">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="center"
        size="sm"
        class="my-0"
      />
    </b-col>
    <transition name="fade">
      <v-modal
        v-if="fichaInmueble"
        @close="fichaInmueble = false"
        titulo="Ficha del Inmueble"
        footer
      >
        <components is="ModalFicha" :slug="propModalFicha" />
        <template #footer>
          <b-button variant="danger" @click="fichaInmueble = false">
            Cerrar
          </b-button>
        </template>
      </v-modal>
    </transition>

    <transition name="slide-to-left">
        <v-modal v-if="sideBarState" @close="closeSide"  titulo="Detalle del inmueble" sideBar
          size="md">
          <component is="DetailsInmuebles" :detail="rowSelected" />
        </v-modal>
      </transition>
  </b-row>
</template>
<script>
import inmueble from "@/store/inmueble";
import ModalFicha from "../components/ModalFicha";
import VModal from "@/views/componente/vModal";
import DetailsInmuebles from "./detailsInmuebles.vue";

export default {

  components: {
    ModalFicha,
    VModal,
    DetailsInmuebles
  },
  data() {
    return {
      sideBarState:null,
      rowSelected:null,
      propModalFicha: null,
      fichaInmueble: false,
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      mainProps: {
        blank: false,
        width: 75,
        height: 75,
        class: "m1",
      },
      fields: [
        {
          key: "id",
          label: "Id",
        },
        {
          key: "inmueble_imagenes",
          label: "Imagen",
        },
        {
          key: "titulo_inmueble",
          label: "Titulo del inmueble",
          sortable: true,
        },
        { key: "tipo_inmueble", label: "Tipo de inmueble",  },
        { key: "estado_id", label: "Departamento" },
        { key: "ciudad_id", label: "Cudad" },
        { key: "barrio_id", label: "Barrio" },
        { key: "tipo_negocio", label: "Tipo de negocio"},
        { key: "precio", label: "Precio" },
        { key: "ficha", label: "ficha" },
      ],
    };
  },
  props: {
    properties: {
      type: Array,
    },
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.properties.length;
  },
  methods: {
    closeSide(){
      this.sideBarState=false;
    },
    onRowSelected(items){
      this.inmuebleDetailTable(items[0])
    },
    inmuebleDetailTable(row){
      if(row){
        row.mls = true;
        this.rowSelected=row;
        // let arrayNewExter=this.rowSelected.caracteristicas_externas.map((item)=>{
        //   return item.caracteristicas_externas
        // })
        // this.rowSelected.caracteristicas_externas= arrayNewExter

        // let arrayNewInter=this.rowSelected.caracteristicas_internas.map((item)=>{
        //   return item.caracteristicas_internas
        // })
        // this.rowSelected.caracteristicas_internas= arrayNewInter

        this.sideBarState=true;
        this.$refs.selectableTable.clearSelected()
        this.$store.commit("appInmueble/SET_INMUEBLE_SELECT", this.rowSelected)
      }
    },
    valTypeInmueble(inmueble){
      let type = inmueble
      return type.toLowerCase()==='venta'?true:false
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    modalFicha(slug) {
      this.propModalFicha = slug;
      this.fichaInmueble = true;
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    clearSelected() {
        this.$refs.selectableTable.clearSelected()
    },
  },
};
</script>
