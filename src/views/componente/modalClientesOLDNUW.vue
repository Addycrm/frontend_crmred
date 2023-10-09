<template>
  <b-modal :id="infoModal.id" hide-footer size="xl">
    <template #modal-title>
      <span class="tituloModalInmueble">Seleccionar cliente</span>
    </template>
    <b-form class="filterForm row" ref="filterClientes">
      <b-form-group class="col mb-0" label="Por nombre">
        <b-form-input v-model="filter.search" name="search" size="sm" type="search" placeholder="Buscar..."></b-form-input>
      </b-form-group>
      <b-form-group class="col mb-0" label="Tipo de cliente">
        <b-form-select v-model="filter.tipo_cliente" :options="options.tipo_cliente" name="tipo_cliente" size="sm" :value="null">
          <template #first>
            <b-form-select-option :value="null" disabled>-- Elija un tipo de cliente --</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group class="col mb-0" label="Genero">
        <b-form-select v-model="filter.genero" :options="options.genero" name="genero" size="sm" :value="null">
          <template #first>
            <b-form-select-option :value="null" disabled>-- Elija un genero --</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
    </b-form>
    <b-row class="mt-2">
      <div class="col-auto">
        <div class="btn btn-primary btn-sm" @click="clearFilter">
          Limpiar
        </div>
      </div>
      <b-col cols="auto">
        <b-form-group>
          <b-form-select
            id="per-page-select"
            v-model="filter.number_page"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="auto ml-auto">
        <b-button size="sm" variant="primary" :to="{ name: 'apps-cliente-add' }">
          <feather-icon icon="PlusIcon" />
          <span class="align-middle">Agregar cliente</span>
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <!-- selected-variant="success" -->
        <!-- selectable -->
        <!-- @row-selected="clienteRowSelected" -->
        <b-table
        class="mb-0"
        ref="tableClientes"
        :fields="fields"
        :items="clientes.data" 
        :current-page = '1'
        :per-page = 'filter.number_page'
        select-mode="single"
        responsive
        :busy="busy"
        >
          <template #cell(genero.name)="data">
            <span v-if="data.item.genero != null">
              <b-badge pill :variant="data.item.genero.name == 'Femenino' ? 'pink' : 'blue' " class="text-capitalize">
                <span class="text">{{ data.item.genero.name }}</span>
              </b-badge>
            </span>
          </template>
          <template #cell(whatsapp)="data">
            <a :href="'https://wa.me/' + data.item.whatsapp" target="_blank">
              <i class="icon whatsapp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
              </i>
            </a>
          </template>
          <template #cell(main_mail)="data">
            <a :href="'mailto:' + data.item.main_mail">
              <i class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/></svg>
              </i>
            </a>
          </template>
          <template #cell(clasificacion)="data">
            <b-form-rating v-model="data.item.clasificacion" variant="warning" inline no-border class="p-0" />
          </template>
          <template #cell(actions)="row">
            <b-button :to="{ name: 'apps-cliente-edit', params: { id: row.item.id } }" variant="info" size="sm">Editar</b-button>
          </template>
        </b-table>
        <b-pagination class="mt-1 mb-0" v-if="filter.number_page < clientes.total" @change="pagination" :value="clientes.current_page" :per-page="filter.number_page" :total-rows="clientes.total" first-number last-number prev-class="prev arrow" next-class="next arrow">
          <template #prev-text> <span></span> </template>
          <template #next-text> <span></span> </template>
        </b-pagination>
      </b-col>
    </b-row>
    <div class="row">
      <div class="col-auto">
        <b-button class="mt-3" variant="success" size="sm">Seleccionar</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {

  name: 'ModalClientes',
  data () {
    return {
      infoModal: {
        id: "modal-list-cliente",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      items: [],
      filter: {
        search: null,
        tipo_cliente: null,
        genero: null,
        number_page: 15
      },
      options: {
        tipo_cliente: [],
        genero: [],
      },
      filterState: false,
      // perPage: 10,
      pageOptions: [15, 30, { value: 100, text: "Mostrar más" }],
      busy: false,
      fields: [
      { key: "id", label: "ID", sortable: false },
      { key: "tipo_cliente.nombre", label: "Tipo", sortable: true },
      { key: "nombre", label:"Nombre", sortable: true },
      { key: "genero.name", label: "Genero", sortable: true },
      { key: "main_cell_phone", label: "Celular", sortable: true },
      { key: "whatsapp", label: "WhatsApp", sortable: true },
      { key: "main_mail", label: "Correo", sortable: true },
      { key: "clasificacion", label: "Calificación", sortable: true },
      { key: "actions", label: "Acción", sortable: true },
      ],
    }
  },
  computed:{
    clientes(){
      return this.$store.state.appCliente.clientes;
    },
    /*inputs(){
      return this.$refs['filterClientes'].querySelectorAll('[name]');
    }*/
  },
  watch:{
    filterState(a){
      if(!a){
        this.customers();
      }
    },
    'filter.search': (a)=>{
      // this.filters('search');
    },
    'filter.tipo_cliente': (a)=>{
      // this.filters('tipo_cliente');
    },
    'filter.genero': (a)=>{
      // this.filters('genero');
    }
  },
  mounted(){
    this.genders('appCliente/generoCliente');
    this.typeCustomers('appCliente/tipoCliente');
    this.customers();
  },
  methods:{
    info(button) {
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    customers(){
      this.getCliente("appCliente/fetchClients", {filter: this.filter})
    },
    pagination(a){
      this.getCliente("appCliente/fetchClientsPaginate", {page: a, filter: this.filter})
    },
    async genders(api){
      await this.$store
      .dispatch(api)
      .then((response) => {
        for(let item of response){
          this.options.genero.push({value: JSON.stringify(item), text: item.name});
        }

      })
      .catch((error) => {
      });
    },
    async typeCustomers(api){
      await this.$store
      .dispatch(api)
      .then((response) => {
        for(let item of response){
          this.options.tipo_cliente.push({value: JSON.stringify(item), text: item.nombre});
        }

      })
      .catch((error) => {
      });
    },
    filters(type){;
      this.filterState = true;
      if(type == 'search'){
        this.getCliente("appCliente/searchClientsPaginate", {search: this.filter})
      }else{
        this.getCliente("appCliente/filterCliente", this.filter)
      }

    },
    clearFilter(){
      if(this.filterState){
        this.filter.search = null;
        this.filter.tipo_cliente = null;
        this.filter.genero = null;
        
        this.filterState = false;
      }
    },
    async getCliente(api, value) {
      this.busy = true;
      await this.$store
      .dispatch(api, value)
      .then((response) => {
        this.busy = false;
      })
      .catch((error) => {
      });
    },
  }
}
</script>

<style lang="css" scoped>
  .icon {width: 1.25em;font-size: 24px;display: flex;color: var(--primary);justify-content: center;/* margin: 0 auto; */}
  .icon svg {display: block;width: auto;height: 1em;fill: currentColor;}
  .icon.whatsapp {color: #57d163;}
  .badge {position: relative;z-index: 1;overflow: hidden;}
  .badge::after {content: '';position: absolute;inset: 0;display: block;background: currentColor;opacity: 0.15;}
  .badge-blue {color: #009aff;}
  .badge-pink {color: var(--pink);}
</style>