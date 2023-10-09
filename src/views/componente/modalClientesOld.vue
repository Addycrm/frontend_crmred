<template>
  <b-modal
    centered
    size="xl"
    :id="infoModal.id"
    ref="modal-list-cliente"
    title="Seleccionar Clentes"
    ok-title="Seleccionar"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @ok="hendleOk"
  >
    <b-card no-body>
      <div class="m-2">
        <!-- Table Top -->

        <b-row>
          <b-col md="6">
            <b-form-group label="Tipo de cliente" label-for="tipo_clientes">
              <v-select
                v-model="cliente.tipo_cliente"
                :options="tipo_clientes"
                label="nombre"
                :value="tipo_clientes.id"
                input-id="tipo_clientes"
                @input="buscarInfo"
                placeholder="Seleccionar"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Generos" label-for="generos">
              <v-select
                v-model="cliente.genero"
                :options="generos"
                label="name"
                :value="generos.id"
                input-id="generos"
                @input="buscarInfo"
                placeholder="Seleccionar"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <div class="m-2"></div>
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
              v-model="perPageClients"
              :options="pageOptionsClients"
              :clearable="false"
              class="per-page-selector d-inline-block ml-50 mr-1"
            />
            <b-button variant="primary" @click="infoAddCliente($event.targuet)">
              Agregar clientes
            </b-button>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="filter"
                class="d-inline-block mr-1"
                placeholder="Buscar clientes..."
              />

              <!-- <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >limpiar</b-button
              >
            </b-input-group-append> -->
            </div>
          </b-col>
        </b-row>
      </div>

      <!-- Main table element -->
      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="data == null ? clientes : data"
        responsive
        :fields="fields"
        primary-key="id"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
        :current-page="currentPageClients"
        :per-page="perPageClients"
        :busy="isBusy"
        show-empty
        empty-text="No hay clientes registrados por el momento"
        striped
        hover
        small
        :bordered="true"
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
        <!-- Column: User -->

        <template #cell(correos)="row">
          <b-link v-if="row.item.correos.length > 0">
            <feather-icon
              icon="MailIcon"
              size="20"
              class="mx-1"
              @click="enviaremail(row.item.correos[0].email)"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              v-b-popover.hover="row.item.correos[0].email"
              title="Correo"
              variant="outline-primary"
            />
          </b-link>
          <strong v-else> No registra</strong>
        </template>

        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Cargando...</strong>
          </div>
        </template>
        <!-- Column: Role -->
        <template #cell(role)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="resolveUserRoleIcon(data.item.role)"
              size="18"
              class="mr-50"
              :class="`text-${resolveUserRoleVariant(data.item.role)}`"
            />
            <span class="align-text-top text-capitalize">{{
              data.item.role
            }}</span>
          </div>
        </template>

        <template #cell(telefono)="row">
          <template>
            <b-link>
              <div class="text-center col-6">
                <img
                  src="@/assets/images/whatsapp.png"
                  alt="${row.item.celular}"
                  @click="sendWhatsapp(row.item.telefono)"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  v-b-popover.hover="row.item.telefono"
                  title="WhatsApp"
                  variant="outline-primary"
                  style="max-width: 30px"
                />
              </div>
            </b-link>
          </template>
        </template>

        <template #cell(numeros)="row">
          <b-link v-if="row.item.numeros.length > 0">
            <feather-icon
              icon="PhoneCallIcon"
              size="20"
              class="mx-1"
              @click="llamadatelefono(row.item.numeros[0].number)"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              v-b-popover.hover="row.item.numeros[0].number"
              title="Celular"
              variant="outline-primary"
            />
          </b-link>
          <strong v-else>Sin registro</strong>
        </template>

        <!-- Column: Status -->

        <template #cell(genero)="data">
          <span v-if="data.item.genero != null">
            <b-badge
              v-if="data.item.genero.name == 'Femenino'"
              pill
              variant="light-primary"
              class="text-capitalize"
            >
              {{ data.item.genero.name }}
            </b-badge>

            <b-badge
              v-else
              pill
              variant="light-success"
              class="text-capitalize"
            >
              {{ data.item.genero.name }}
            </b-badge>
          </span>
          <strong v-else>Sin registro</strong>
        </template>

        <template #cell(clasificacion)="data">
          <b-form-rating
            v-model="data.item.clasificacion"
            variant="warning"
            inline
            no-border
            class="mt-1"
          />
        </template>

        <template #cell(tipo_cliente)="data">
          <b-badge
            v-if="data.item.tipo_cliente.nombre == 'Comprador'"
            pill
            variant="light-primary"
            class="text-capitalize"
          >
            {{ data.item.tipo_cliente.nombre }}
          </b-badge>
          <b-badge
            v-if="data.item.tipo_cliente.nombre == 'Arrendatario'"
            pill
            variant="light-secondary"
            class="text-capitalize"
          >
            {{ data.item.tipo_cliente.nombre }}
          </b-badge>
          <b-badge
            v-if="data.item.tipo_cliente.nombre == 'Propietario'"
            pill
            variant="light-success"
            class="text-capitalize"
          >
            {{ data.item.tipo_cliente.nombre }}
          </b-badge>
          <b-badge
            v-if="data.item.tipo_cliente.nombre == 'Familia'"
            pill
            variant="light-danger"
            class="text-capitalize"
          >
            {{ data.item.tipo_cliente.nombre }}
          </b-badge>
          <b-badge
            v-if="data.item.tipo_cliente.nombre == 'Amigos'"
            pill
            variant="light-warning"
            class="text-capitalize"
          >
            {{ data.item.tipo_cliente.nombre }}
          </b-badge>
          <b-badge
            v-if="data.item.tipo_cliente.nombre == 'Otros'"
            pill
            variant="light-info"
            class="text-capitalize"
          >
            {{ data.item.tipo_cliente.nombre }}
          </b-badge>
        </template>

        <template #cell(actions)="row">
          <b-button-group size="sm">
            <b-button
              :to="{ name: 'apps-cliente-edit', params: { id: row.item.id } }"
              variant="info"
              >Editar</b-button
            >
            <!-- <b-button variant="warning">Eliminar</b-button> -->
          </b-button-group>
        </template>

        <!-- Column: Actions -->
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            "
          >
            <b-badge pill variant="light-info" class="text-capitalize">
              Total: {{ totalRows }}
            </b-badge>
          </b-col>
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
        <modal-add-cliente ref="modalAddCliente" />
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
  BInputGroup,
  BInputGroupPrepend,
  BCard,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BTooltip,
  BFormSelect,
  BButtonGroup,
  BInputGroupAppend,
  BCardText,
  VBPopover,
  BPopover,
  BFormRating,
  BSpinner,
  BFormFile,
  BImg,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";
import vSelect from "vue-select";
import modalAgregarClienteVue from "./modalAgregarCliente.vue";

export default {
  name: "modalClientes",
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    quillEditor,
    BCard,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    BFormSelect,
    BButtonGroup,
    BInputGroupAppend,
    BCardText,
    VBPopover,
    BPopover,
    BFormRating,
    BSpinner,
    BFormFile,
    BImg,
    vSelect,
    "modal-add-cliente": modalAgregarClienteVue,
  },
  directives: {
    Ripple,
    "b-popover": VBPopover,
  },
  data() {
    return {
      infoModal: {
        id: "modal-list-cliente",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      form: {
        titulo: "",
        descripcion: "",
      },
      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus inmuebles.",
        readOnly: true,
      },
      module: "mercadeo",
      selectMode: "multi",
      fields: [
        { key: "selected", label: "Selecionar", sortable: true },

        { key: "tipo_cliente", label: "Tipo de cliente", sortable: true },

        { key: "apellido", sortable: true },
        { key: "genero", label: "Genero", sortable: true },
        { key: "numeros", label: "Celular", sortable: true },
        { key: "telefono", label: "whatsApp", sortable: true },

        { key: "correos", label: "correo", sortable: true },
      ],

      error: {},
      import_file: "",
      totalRows: 1,
      currentPageClients: 1,
      perPageClients: 5,
      pageOptionsClients: [5, 10, 15, { value: 100, text: "Show a lot" }],

      filter: null,
      filterOn: [],
      tipo_clientes: [],
      generos: [],

      cliente: {
        tipo_cliente: null,
        genero: null,
      },
      selected: null,
      data: null,
      isBusy: false,

      path: "http://wa.me/+57",
      path2: "tel:",
      path3: "mailto:",
    };
  },

  methods: {
    info(button, module) {
      this.getCliente();

      if (module != null) {
        this.module = module;
      }
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-list-cliente"].hide();
    },

    infoAddCliente(button) {
      this.$refs.modalAddCliente.info(button);
    },

    hendleOk(event) {
      let emit = "selectedClientesModal";
      if (this.module == "calendar") {
        this.selectMode = "single";
        emit = "selectedClientesCalendar";
      }

      if (this.module == "inmueble") {
        this.selectMode = "single";
        emit = "selectedClientesInmuebles";
      }
      this.$root.$emit(emit, {
        selected: this.selected,
      });
      this.hideModal();
    },

    getCliente() {
      this.$store
        .dispatch("appCliente/fetchClients")
        .then((response) => {
          this.totalRows = response.length;
          for (let i = 0; i < response.length; i++) {
            if (response[i].tipo_cliente) {
              this.tipo_clientes.push(response[i].tipo_cliente);
            }

            if (response[i].genero) {
              this.generos.push(response[i].genero);
            }
          }

          this.tipo_clientes = this.deleteDuplicate(this.tipo_clientes);
          this.generos = this.deleteDuplicate(this.generos);

        })
        .catch((error) => {
        });
    },

    buscarInfo() {
      this.isBusy = true;
      let cliente = this.cliente;
      this.$store
        .dispatch("appCliente/filterCliente", cliente)
        .then((response) => {
          setTimeout(() => {
            this.data = response.clientes;
            this.isBusy = false;
          }, 1000);
        })
        .catch((error) => {
        });
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pNits due to filtering
      this.totalRows = filteredItems.length;
      this.currentPNit = 1;
    },

    deleteDuplicate(arr = []) {
      let array = arr.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.id === thing.id)
      );
      return array;
    },

    enviaremail(email) {
      window.location.href = this.path3 + email;
    },

    llamadatelefono(telefono) {
      window.location.href = this.path2 + telefono;
    },

    sendWhatsapp(whatsapp) {
      window.open(this.path + whatsapp.replace(/ /g, "")); //para nueva pestaña
    },

    onRowSelected(items) {
      this.selected = items;
    },
  },

  computed: {
    usuario() {
      let store = this.$store.state.userData.userData;
      return store;
    },
    clientes() {
      return this.$store.state.appCliente.clientes;
    },
  },

  setup() {},
};
</script>