<template>
  <!-- Table Container Card -->
  <div id="MercadeoAdmin">
    <b-card no-body>
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Entradas</label>

            <v-select
              v-model="perPage"
              :options="pageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block ml-50 mr-1"
            />
            <b-button
              variant="primary"
              @click="infoRegisterMercadeoAdmin($event.target)"
            >
              Registrar
            </b-button>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="filter"
                class="d-inline-block mr-1"
                placeholder="Buscar mercadeo..."
              />
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Limpiar</b-button
                >
              </b-input-group-append>
            </div>
          </b-col>
        </b-row>
      </div>

      <!-- Main table element -->

      <b-table
        empty-text="No hay mercadeo registrados por el momento"
        :items="mercadeo"
        :fields="fields"
        responsive
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        show-empty
        @filtered="onFiltered"
        class="position-relative"
        outlined
      >
        <template #cell(id)="data">
          <b-badge pill variant="light-success">
            {{ data.item.id }}
          </b-badge>
        </template>

        <template #cell(url)="data">
          <b-img class="img-width-admin-mercadeo" :src="data.item.url"></b-img>
        </template>

        <template #cell(actions)="data">
          <b-button
            variant="success"
            @click="infoEditMercadeoAdmin(data.item, $event.target)"
            >Editar</b-button
          >
        </template>
      </b-table>

      <div class="mx-2 mb-2">
        <b-row>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
      <modal-register-mercadeo-admin
        ref="modalRegisterMercadeoAdmin"
      ></modal-register-mercadeo-admin>
      <modal-edict-mercadeo-admin
        ref="modalEdictMercadeoAdmin"
      ></modal-edict-mercadeo-admin>
      <!-- <modal-add-portal-cities ref="modalAddPortalCities" /> -->
    </b-card>
    <b-card>
      <template #header>
        <b-row>
          <b-col class="d-flex align-items-center">
            <h3 class="mb-0 mr-2">
              Tipos de Email
            </h3>
            <b-button
              variant="success"
              class="d-inline-flex align-items-center"
              size="md"
              @click="modalState = true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                :style="{
                  width: '1.25em',
                  height: '1em',
                  margin: '-0.5em',
                  marginRight: '0.8rem',
                  fontSize: '1em',
                }"
                fill="currentColor"
              >
                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                />
              </svg>
              <span class="align-middle">Crear Tipo de Email</span>
            </b-button>
          </b-col>
        </b-row>
      </template>
      <VueGoodTable
        styleClass="vgt-table striped" 
        :selectOptions="{enabled: false}"
        :columns="typeColumns"
        :rows="storeAppMercadeoAdmin.mercadeo_type"
        :pagination-options="{
          enabled: true,
          perPage:pageType
        }"
      >
        <template slot="emptystate">
          <div class="text-center p-1">No hay tipos de Email registrados</div>
        </template>
        <template
          slot="table-row"
          slot-scope="props"
        >
          <span v-if="props.column.field === 'actions'" class="d-flex justify-content-center">
            <b-button
              v-b-tooltip.hover
              title="Editar"
              pill variant="success" 
              @click="editTipoEmail(props.row)"
              class="btn-icon d-flex justify-content-center align-items-center"
            > 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '15px'}" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
            </b-button>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap align-items-center">
            <div class="d-flex align-items-center mt-1" v-if="storeAppMercadeoAdmin.mercadeo_type.length > pageType">
              <span class="text-nowrap">
                Mostrando 1 a
              </span>
              <b-form-select
                v-model="pageType"
                :options="['10','20','100']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap"> de {{ props.total }} registros </span>
            </div>
            <div v-if="props.total > pageType" class="d-flex mt-1">
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageType"
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
    </b-card>
    <transition name="fade">
      <v-modal v-if="modalState" @close="modalState = false" :titulo="'Crear Tipo de Email'" size="sm" footer>
        <component is="FormTipoEmail" ref="FormTipoEmail" v-bind="props"/>
        <template #footer>
          <b-overlay :show="overlay">
            <b-button variant="info" type="submit"  @click="sendModal" :disabled="overlay">
              Registrar
            </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
    
  </div>
</template>

<script>
import vSelect from "vue-select";
import BCardCode from "@core/components/b-card-code";
import Ripple from "vue-ripple-directive";
import modalRegisterMercadeoAdminVue from "./components/modalRegisterMercadeoAdmin.vue";
import modalEditMercadeoAdminVue from "./components/modalEditMercadeoAdmin.vue";
import VModal from "@/views/componente/vModal";
import { HELPERS } from "@/libs/helpers";

import { VueGoodTable } from 'vue-good-table'

import FormTipoEmail from './components/FormTipoEmail'

export default {
  components: {
    VueGoodTable,
    FormTipoEmail,
    VModal,
    Ripple,
    vSelect,
    "modal-register-mercadeo-admin": modalRegisterMercadeoAdminVue,
    "modal-edict-mercadeo-admin": modalEditMercadeoAdminVue,
  },

  directives: {
    Ripple,
  },
  provide(){
    return{
      closeModal: () => {
        this.modalState = false;
      }
    }
  },
  data() {
    return {
      fields: [
        { key: "id", label: "Codigo", sortable: true },
        { key: "url", label: "Imagen", sortable: true },
        { key: "name", label: "Nombre", sortable: true },
        { key: "actions", label: "Acciones", sortable: true },
      ],
      path_storage: process.env.MIX_API_URL + "storage/",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      path: "http://wa.me/",
      filter: null,
      filterOn: [],
      mercadeo: [],

      // ====== 
      modalState: false,
      overlay: false,
      typeColumns: [
        { field: "id", label: "ID" },
        { field: "name", label: "Nombre" },
        { field: "actions", label: "Acciones", width:'8em' },
      ],
      pageType: 10,
      props:{
        prop: null
      }
    };
  },
  computed: {
    storeAppMercadeoAdmin(){
      return this.$store.state.appMercadeoAdmin;
    }
  },
  mounted() {
    this.$root.$on("mercadeo", () => {
      this.getMercadeoAdmin();
    });
  },

  methods: {
    editTipoEmail(row){
      Object.assign(this.props, {
        prop: row
      });
      this.modalState = true;
    },
    sendModal(){
      this.$refs['FormTipoEmail'].onSubmit()
      .then( state => { 
        if(state){
          this.getMercadeoType();
          this.modalState = false;
        }
      });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPNit = 1;
    },

    async getMercadeoType() {
      await this.$store.dispatch("appMercadeoAdmin/fetchTypeMercadeo");
    },

    infoRegisterMercadeoAdmin(button) {
      this.$refs.modalRegisterMercadeoAdmin.info(button);
    },

    infoEditMercadeoAdmin(item, button) {
      this.$refs.modalEdictMercadeoAdmin.info(item, button);
    },

    async getMercadeoAdmin() {
      await this.$store
        .dispatch("appMercadeoAdmin/fetchMercadeoAdmin")
        .then((response) => {
          this.totalRows = response.length;
          for (let i = 0; i < response.length; i++) {
            if (HELPERS.isValidHttpUrl(response[i].url)) {
              response[i].url = response[i].url;
            } else {
              response[i].url = this.path_storage + response[i].url;
            }
          }

          this.mercadeo = response;
        })
        .catch((error) => {
        });
    },
  },
  created() {
    this.getMercadeoAdmin();
    this.getMercadeoType();
  },

};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
.img-width-admin-mercadeo {
  width: 10%;
}
.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>


