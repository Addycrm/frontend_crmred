<template>
  <b-modal
    size="xl"
    :id="infoModal.id"
    :ref="infoModal.id"
    title="Seleccionar Inmueble"
    ok-title="Seleccionar"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOkZona"
  >
    <b-card no-body>
      <div class="m-2">
        <b-row>
          <b-col md="6">
            <b-form-group label="Estado del inmueble" label-for="state_fisico">
              <v-select
                v-model="inmueble.state_fisico"
                :options="state_fisico"
                label="name"
                :value="state_fisico.id"
                input-id="state_fisico"
                @input="buscarInfo"
                placeholder="Seleccionar"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Tipo negocio" label-for="tipo_negocio">
              <v-select
                v-model="inmueble.tipo_negocio"
                :options="tipo_negocio"
                label="descripcion"
                :value="tipo_negocio.id"
                input-id="tipo_negocio"
                @input="buscarInfo"
                placeholder="Seleccionar"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Agentes" label-for="agentes">
              <v-select
                v-model="inmueble.agente"
                :options="agente"
                label="username"
                :value="agente.id"
                input-id="agentes"
                @input="buscarInfo"
                placeholder="Seleccionar"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Tipo de inmueble" label-for="tipo_inmueble">
              <v-select
                v-model="inmueble.tipo_inmueble"
                :options="tipo_inmuebles"
                label="tipo"
                :value="tipo_inmuebles.id"
                input-id="tipo_inmueble"
                @input="buscarInfo"
                placeholder="Seleccionar"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <b-form-group label="Departamento" label-for="departamento">
              <v-select
                v-model="inmueble.state_id"
                :options="states"
                label="name"
                :value="states.id"
                input-id="departamento"
                @input="buscarInfo"
                placeholder="Seleccionar"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Ciudad" label-for="ciudad">
              <v-select
                v-model="inmueble.city_id"
                :options="city"
                label="name"
                :value="city.id"
                input-id="ciudad"
                @input="buscarInfo"
                placeholder="Seleccionar"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Barrio" label-for="barrio">
              <v-select
                v-model="inmueble.barrio_id"
                :options="barrio"
                label="name"
                :value="barrio.id"
                input-id="barrio"
                @input="buscarInfo"
                placeholder="Seleccionar"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Zona" label-for="zona">
              <v-select
                v-model="inmueble.zona_id"
                :options="zona"
                label="name"
                :value="zona.id"
                input-id="zona"
                @input="buscarInfo"
                placeholder="Seleccionar"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <div class="m-2">
        <b-row> </b-row>

        <b-row>
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Entradas </label>

            <v-select
              v-model="perPageClients"
              :options="pageOptionsClients"
              :clearable="false"
              class="per-page-selector d-inline-block ml-50 mr-1"
            />
            <b-button
              v-if="$can('create', 'inmuebles')"
              variant="primary"
              :to="{ name: 'agregar-inmueble' }"
            >
              Agregar Inmuebles
            </b-button>
          </b-col>

          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="filter"
                class="d-inline-block mr-1"
                placeholder="Buscar Inmuebles..."
              />
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >limpiar</b-button
                >
              </b-input-group-append>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        responsive
        striped
        hover
        empty-text="No hay Inmuebles registrados por el momento"
        :items="data == null ? datas : data"
        small
        :bordered="true"
        :fields="fields"
        :current-page="currentPageClients"
        :per-page="perPageClients"
        :filter="filter"
        :filter-included-fields="filterOn"
        show-empty
        @filtered="onFiltered"
        class="position-relative"
        :select-mode="selectMode"
        selected-variant="success"
        selectable
        @row-selected="onRowSelected"
        outlined
      >
        <template #cell(selected)="{ rowSelected }">
          <template v-if="rowSelected">
            <span aria-hidden="true">&check;</span>
            <span class="sr-only">Selected</span>
          </template>
          <template v-else>
            <span aria-hidden="true">&nbsp;</span>
            <span class="sr-only">Not selected</span>
          </template>
        </template>

        <template #cell(area_lote)="data">
          <span
            v-if="data.item.area_lote != 'null' && data.item.area_lote != null"
          >
            <strong>{{ data.item.area_lote + "m2" }}</strong>
          </span>
          <span v-else>
            <strong>{{ "0 m2" }}</strong>
          </span>
        </template>
        <template #cell(area_contruida)="data">
          <span
            v-if="
              data.item.area_contruida != 'null' && data.item.area_lote != null
            "
          >
            <strong>{{ data.item.area_contruida + "m2" }}</strong>
          </span>
          <span v-else>
            <strong>{{ "0 m2" }}</strong>
          </span>
        </template>

        <template #cell(precio_alquiler)="data">
          <span v-if="data.item.precio_alquiler != 'null'">
            <strong
              >${{
                data.item.precio_alquiler == ""
                  ? 0
                  : data.item.precio_alquiler | priceFormattin
              }}</strong
            >
          </span>
          <span v-else>
            <strong>{{ "$0" }}</strong>
          </span>
        </template>

        <template #cell(precio_venta)="data">
          <span v-if="data.item.precio_alquiler != 'null'">
            <strong
              >${{
                data.item.precio_venta == ""
                  ? 0
                  : data.item.precio_venta | priceFormattin
              }}</strong
            >
          </span>
          <span v-else>
            <strong>{{ "$0" }}</strong>
          </span>
        </template>

        <template #cell(zona_id)="data">
          <div v-if="data.item.zona_id != null">
            {{ data.item.zona_id.name }}
          </div>
        </template>

        <template #cell(ciudad_id)="data">
          <div v-if="data.item.ciudad_id != null">
            {{ data.item.ciudad_id.name }}
          </div>
        </template>

        <template #cell(tipo_negocio)="data">
          <div v-if="data.item.tipo_negocio != null">
            {{ data.item.tipo_negocio.descripcion }}
          </div>
        </template>

        <template #cell(state_inmueble)="data">
          <div v-if="data.item.state_inmueble == 2">
            <b-badge variant="light-primary"> Activo </b-badge>
          </div>
          <div v-if="data.item.state_inmueble == 3">
            <b-badge variant="light-danger"> Eliminado </b-badge>
          </div>
          <div v-if="data.item.state_inmueble == 4">
            <b-badge variant="light-warning"> Inactivo </b-badge>
          </div>
        </template>

        <template #cell(tipo_inmueble)="data">
          <div v-if="data.item.tipo_inmueble != null">
            {{ data.item.tipo_inmueble.tipo }}
          </div>
        </template>

        <template #cell(barrio_id)="data">
          <div v-if="data.item.barrio_id != null">
            {{ data.item.barrio_id.name }}
          </div>
        </template>

        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Cargando...</strong>
          </div>
        </template>

        <template #cell(user_id)="row">
          <strong>{{ row.item.user_id.username }}</strong>
        </template>
      </b-table>

      <div class="mx-2 mb-2">
        <b-row>
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
              v-model="currentPageClients"
              :total-rows="totalRows"
              :per-page="perPageClients"
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

        <b-row> </b-row>
      </div>
    </b-card>
  </b-modal>
</template>

<script>
import {
  BModal,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormFile,
  BFormTextarea,
  BAvatar,
  BInputGroup,
  BMedia,
  BInputGroupPrepend,
  BCard,
  BInputGroupAppend,
  BTable,
  BPagination,
  BBadge,
  BFormRadio,
} from "bootstrap-vue";
import vSelect from "vue-select";

import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";
import Templates from "@/views/templates/templates.vue";

export default {
  name: "edictRole",
  components: {
    BModal,
    vSelect,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormRadio,
    BFormFile,
    BAvatar,
    BMedia,
    BFormTextarea,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    quillEditor,
    BCard,
    BInputGroupAppend,
    BTable,
    BPagination,
    Templates,
    BBadge,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      path: process.env.MIX_API_URL + "private/inmuebles/",
      isBusy: false,
      show_spinner_sin: false,
      selectMode: "single",

      modes: ["single"],
      fields: [
        { key: "selected", label: "Selecionar", sortable: true },
        { key: "id", label: "Codigo", sortable: true },
        { key: "tipo_inmueble", label: "Tipo", sortable: true },
        { key: "tipo_negocio", label: "Tipo negocio", sortable: true },
        { key: "zona_id", label: "Zona", sortable: true },
        { key: "ciudad_id", label: "Ciudad", sortable: true },
        { key: "state_inmueble", label: "Estados", sortable: true },
        { key: "barrio_id", label: "Barrio", sortable: true },
        { key: "titulo_inmueble", label: "Titulo", sortable: true },
        { key: "area_lote", label: "A. Lote", sortable: true },
        { key: "area_contruida", label: "A. Construida", sortable: true },
        { key: "precio_alquiler", label: "Alquiler", sortable: true },
        { key: "precio_venta", label: "Venta", sortable: true },
      ],
      totalRows: 1,
      currentPageClients: 1,
      perPageClients: 5,
      pageOptionsClients: [5, 10, 15, { value: 100, text: "Show a lot" }],
      filter: null,
      filterOn: [],
      userData: null,
      tipo_negocio: [],
      state_fisico: [],
      inmueble: {
        state_fisico: null,
        tipo_negocio: null,
        tipo_inmueble: null,
        state_id: null,
        city_id: null,
        zona_id: null,
        barrio_id: null,
        agente: null,
      },

      tipo_inmuebles: [],
      states: [],
      city: [],
      zona: [],
      barrio: [],
      agente: [],
      typeParam: "mercado",

      selected: null,

      data: null,

      infoModal: {
        id: "modal-list-inmueble-1",
        title: "",
        content: {},
        contentPreguntas: {},
      },
    };
  },

  filters: {
    priceFormattin: function (value) {
      let format = parseInt(value);
      let dollarUSLocale = Intl.NumberFormat("es-CO");
      let price = dollarUSLocale.format(format);
      return price;
    },
  },

  methods: {
    info(item, button, type) {
      this.infoModal.content = item;
      this.typeParam = type;
      this.getInmuebles();
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-list-inmueble-1"].hide();
    },

    buscarInfo() {
      this.isBusy = true;
      let inmueble = this.inmueble;
      this.$store
        .dispatch("appInmueble/filterInmueble", inmueble)
        .then((response) => {
          setTimeout(() => {
            this.data = response.inmuebles;
            this.isBusy = false;
          }, 1000);
        })
        .catch((error) => {
        });
    },
    deleteDuplicate(arr = []) {
      let array = arr.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.id === thing.id)
      );
      return array;
    },

    getInmuebles() {
      this.$store
        .dispatch("appInmueble/getInmuebles")
        .then((response) => {
          this.totalRows = response.length;

          for (let i = 0; i < response.length; i++) {
            if (response[i].tipo_inmueble) {
              this.tipo_inmuebles.push(response[i].tipo_inmueble);
            }
            if (response[i].estado_id != null) {
              this.states.push(response[i].estado_id);
            }
            if (response[i].ciudad_id != null) {
              this.city.push(response[i].ciudad_id);
            }
            if (response[i].zona_id != null) {
              this.zona.push(response[i].zona_id);
            }

            if (response[i].barrio_id != null) {
              this.barrio.push(response[i].barrio_id);
            }

            if (response[i].user_id != null) {
              this.agente.push(response[i].user_id);
            }
            if (response[i].tipo_negocio != null) {
              this.tipo_negocio.push(response[i].tipo_negocio);
            }

            if (response[i].state_fisico != null) {
              this.state_fisico.push(response[i].state_fisico);
            }
          }

          this.tipo_inmuebles = this.deleteDuplicate(this.tipo_inmuebles);
          this.states = this.deleteDuplicate(this.states);
          this.city = this.deleteDuplicate(this.city);
          this.zona = this.deleteDuplicate(this.zona);
          this.barrio = this.deleteDuplicate(this.barrio);
          this.agente = this.deleteDuplicate(this.agente);
          this.tipo_negocio = this.deleteDuplicate(this.tipo_negocio);
        })
        .catch((error) => {
        });
    },
    checkFormValidityZona() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },

    getTypeServices() {
      this.$store.dispatch("appPortales/getTypeService").then((data) => {
        this.type_services = data;
      });
    },

    previewImage: function (event) {
      var input = event.target;
      this.image = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    handleOkZona(bvModalEvt) {
      this.handleSubmitZona();
    },

    handleSubmitZona() {
      if (this.typeParam == "mercadeo") {
        this.$root.$emit("predeterminateTemplatePrivate", {
          type: "private",
          mercadeo: this.infoModal.content,
          selected: this.selected,
        });
      }

      if (this.typeParam == "inmueble") {
        this.$root.$emit("selectedInmuebleModal", {
          selected: this.selected,
        });
      }
      if (this.typeParam == "calendar") {
        this.$root.$emit("selectedInmuebleModalCalendar", {
          selected: this.selected,
        });
      }

      this.hideModal();
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPNit = 1;
    },
    onRowSelected(items) {
      this.selected = items;
    },
  },

  computed: {
    datas() {
      return this.$store.state.appInmueble.inmuebles;
    },
  },
};
</script>
<style scoped>
.table tbody tr.b-table-row-selected th {
  background-color: #91c27d;
}
</style>


