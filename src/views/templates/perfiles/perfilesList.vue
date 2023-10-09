<template>
 <b-card>
 <h3 class="d-flex flex-wrap justify-content-between">
  <h4 class="mb-1 my-auto">Listado de perfiles </h4>  
  <b-button
  :to="{ name: 'perfiles' }"
  variant="success"
  >Crear Perfil</b-button>
</h3>
<b-container fluid style="background-color: #fff; margin-top: 2em;" class="pb-4">

  <!-- User Interface controls -->
  <b-row>

    <b-col sm="4" md="4" lg="4" class="mb-1 d-flex align-items-center justify-content-start mb-1 mb-md-0 ">
      <b-form-group
      label=""
      label-for="per-page-select"
      label-cols-sm="6"
      label-cols-md="4"
      label-cols-lg="3"
      label-align-sm="right"
      label-size="sm"
      class="mb-0"
      >
      <b-form-select
      id="per-page-select"
      v-model="perPage"
      :options="pageOptions"
      size="sm"
      ></b-form-select>
    </b-form-group>
  </b-col>

  <b-col sm="12" md="" lg="8" class="mb-1 d-flex align-items-center justify-content-end center_search">
    <b-form-group
    label=""
    label-for="filter-input"
    label-cols-sm="3"
    label-align-sm="right"
    label-size="sm"
    class="mb-0"
    >
    <b-input-group size="sm">
      <b-form-input
      id="filter-input"
      v-model="filter"
      type="search"
      placeholder="Buscar"
      ></b-form-input>


    </b-input-group>
  </b-form-group>
</b-col>
</b-row>
<b-row>
  <b-col style="overflow-x: auto;">
    <!-- Main table element -->
    <b-table responsive 
    :items="items"
    :fields="fields"
    :current-page="currentPage"
    :per-page="perPage"
    :filter="filter"
    :filter-included-fields="filterOn"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :sort-direction="sortDirection"
    stacked="md"
    show-empty
    small
    @filtered="onFiltered"
    >
    <template #cell(imagen)="row">

      <div v-if="row.item.imagen">
        <img v-if="row.item.imagen.substr(0,4)=='http'" :src="row.item.imagen.replace('upload', 'upload/c_scale,h_90,w_90')" style="width:90px" />
        <img v-else :src="'/storage/'+row.item.imagen" style="width:90px" />

      </div>
    </template>

    <template #cell(actions)="row">

      <b-button size="sm"
      :to="{ name: 'perfiles-edit', params: { id: row.item.id } }"
      variant="info"
      ><feather-icon icon="EditIcon" /></b-button>

      <b-button size="sm" @click="row.toggleDetails">
        <feather-icon icon="EyeIcon" />
      </b-button>

      <b-button variant="danger" size="sm" @click="eliminarItem(row.item.id)">
        <feather-icon icon="TrashIcon" />
      </b-button>

    </template>

    <template #row-details="row">
      <b-card>
        <ul>
          <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
        </ul>
      </b-card>
    </template>
  </b-table>
</b-col>
</b-row>

<b-row class="pagination">
  <b-col sm="7" md="6" class="my-1 d-flex
  align-items-center
  justify-content-center justify-content-sm-end col-sm-6 col-12">
  <b-pagination
  v-model="currentPage"
  :total-rows="totalRows"
  :per-page="perPage"
  align="fill"
  size="sm"
  class="my-0"
  ></b-pagination>
</b-col>
</b-row>

<!-- Info modal -->
<b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
  <pre>{{ infoModal.content }}</pre>
</b-modal>
</b-container>

</b-card>
</template>

<script>
  import {
    BInputGroup,
    BIcon,
    BPagination,
    BTable,
    BImg,
    BFormFile,
    BFormInput,
    BFormTextarea,
    BFormGroup,
    BCard,
    BCardText,
    BCardTitle,
    BContainer,
    BRow,
    BCol,
    BButton,
    BFormSelect,
  } from "bootstrap-vue";
  import imageComponent from "../../componente/Image-component.vue";
  import store from "@/store";

  export default {
    components: {
      BInputGroup,
      BIcon,
      BPagination,
      BFormSelect,
      BFormInput,
      BFormTextarea,
      BFormFile,
      BFormGroup,
      BImg,
      BCard,
      BCardText,
      BCardTitle,
      BContainer,
      BRow,
      BCol,
      BTable,
      BButton,
      "image-component": imageComponent,
    },
    data() {
      return {
        items: [],
        fields: [
        { key: 'id', label: 'Id', sortable: true, sortDirection: 'desc' },
        { key: 'nombre', label: 'Nombre', sortable: true, sortDirection: 'desc' },
        { key: 'descripcion', label: 'Descripcion', sortable: true, class: 'text-center' },
        { key: 'imagen', label: 'Imagen', sortable: true, class: 'text-center' },
        { key: 'actions', label: 'Actions' }
        ],
        eliminar: null,
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Todos" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    created() {

      this.getperfiles();

    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      async getperfiles(){
        await this.$store
        .dispatch("banners/getperfiles")
        .then((response) => {
          this.items = response;
          }).catch((error) => {
        });

      },
      eliminarItem(index) {

        let formData = new FormData();

        formData.append("id", index);
        this.$store
        .dispatch("banners/delPerfiles", formData)
        .then((response) => {
          this.getperfiles();
        })
        .catch((error) => {

        });
      },
    }
  }
</script>
<style> 

  @media(max-width:767px){
    .center_search{
      justify-content: center !important;
    }
  }
</style>