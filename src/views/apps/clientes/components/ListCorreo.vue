<template>
  <b-row>
    <!-- <b-col md="6" class="my-1">
      <b-form-group class="mb-0">
        <label class="d-inline-block text-sm-left mr-50">Cantidad</label>
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          size="sm"
          :options="pageOptions"
          class="w-50"
        />
      </b-form-group>
    </b-col>

    <b-col md="6" class="my-1">
      <b-form-group
        label="Buscar"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        label-for="filterInput"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="filterInput"
            v-model="filter"
            type="search"
            placeholder="Buscar números"
          />
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">
              Limpiar
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col> -->

    <b-col cols="12">
      <b-table
        striped
        hover
        responsive
        :per-page="perPage"
        :current-page="currentPage"
        :items="correos"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
      >
       
      </b-table>
    </b-col>

    <!-- <b-col cols="12">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="center"
        size="sm"
        class="my-0"
      />
    </b-col> -->
  </b-row>
</template>

<script>
import {
  BTable,
  BAvatar,
  BBadge,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BModal,
} from "bootstrap-vue";
import CelularComponent from "./Celular.vue";
export default {
  name: "ListCorreo",
  components: {
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BModal,
    "celular-component": CelularComponent,
  },

  props: {
    correos: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
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
        id: "edictar-numero",
        title: "",
        content: "",
      },
      fields: [
        { key: "id", label: "codigo", sortable: true },

        { key: "email", label: "Correo", sortable: true },
        { key: "created_at", label: "Creación", sortable: true },

      ],
      items: [],
    };
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
    this.totalRows = this.items.length;
  },
  methods: {
    infoModalNumero(item, button) {
      this.$refs.celularComponent.info(item, button);
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    showModal(id) {
      this.$refs["modal-numero"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
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
  },
};
</script>
 