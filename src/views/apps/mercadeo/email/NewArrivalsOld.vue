<template>
  <div>
    <b-card no-body class="">
      <b-container>
        <div class="m-2">
          <!-- Table Top -->
          <b-row>
            <!-- Per Page -->
            <b-col
              cols="12"
              md="6"
              class="
                d-flex
                align-items-center
                justify-content-start
                mb-1 mb-md-0
              "
            >
              Entradas
              <v-select
                v-model="perPageMessage"
                :options="pageOptionsMessage"
                :clearable="false"
                class="per-page-selector d-inline-block ml-50 mr-1"
              />
              <b-button variant="primary" :to="{ name: 'email-create' }">
                Programar email
              </b-button>
            </b-col>

            <!-- Search -->
            <b-col cols="12" md="6">
              <div class="d-flex align-items-center justify-content-end">
                <b-form-input
                  v-model="filterMessage"
                  class="d-inline-block mr-1"
                  placeholder="Buscar mensajes..."
                />
                <b-input-group-append>
                  <b-button
                    :disabled="!filterMessage"
                    @click="filterMessage = ''"
                    >limpiar</b-button
                  >
                </b-input-group-append>
              </div>
            </b-col>
          </b-row>
        </div>

        <b-table
          ref="refUserListTable"
          class="position-relative"
          :items="messages"
          responsive
          :fields="fieldsMessage"
          primary-key="id"
          :filter="filterMessage"
          :filter-included-fields="filterOnMessage"
          @filtered="onFilteredMessage"
          :current-page="currentPageMessage"
          :per-page="perPageMessage"
          :busy="isBusyMessage"
          show-empty
          empty-text="No hay usuarios registrados por el momento"
        >
          <template #cell(delivered)="row">
            <b-badge
              pill
              :variant="
                row.item.delivered == 'Enviado'
                  ? 'light-primary'
                  : 'light-warning'
              "
            >
              {{ row.item.delivered }}
            </b-badge>
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
                v-model="currentPageMessage"
                :total-rows="totalRowsMessage"
                :per-page="perPageMessage"
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
      </b-container>
    </b-card>

    <!-- The Modal -->
    <b-modal ref="modal-send-email" hide-footer title="Programar email">
      <form @submit.prevent="sendEmail">
        <div class="modal-body">
          <div class="form-group">
            <label>Titulo del email</label>
            <input
              v-model="title"
              type="text"
              name="title"
              placeholder="Titulo del email"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>Descripcion del correo</label>
            <textarea
              v-model="body"
              name="body"
              id="body"
              placeholder="Descripcion del correo"
              class="form-control"
              rows="5"
            >
            </textarea>
          </div>
          <div class="form-group">
            <label style="margin-bottom: 10px">Cuando lo envia?</label>
            <div class="form-control">
              <span style="margin-right: 20px">
                <input
                  type="radio"
                  name="sending"
                  value="now"
                  v-model="item"
                  checked
                />
                <label>Enviar ahora</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="sending"
                  value="later"
                  v-model="item"
                />
                <label>Enviar mas tarde</label>
              </span>
            </div>
          </div>
        </div>
        <div v-if="item === 'later'">
          <VueCtkDateTimePicker
            label="Seleciona tu fecha"
            :no-button-now="true"
            v-model="send_date"
          />
        </div>

        <div class="modal-footer">
          <b-button
            :disabled="disabled"
            v-if="loading && item === 'now'"
            @click="showModal"
            type="submit"
            class="btn btn-success"
          >
            Cargando Email...
          </b-button>
          <b-button
            :disabled="disabled"
            v-if="!loading && item === 'now'"
            type="submit"
            class="btn btn-success"
          >
            enviar email
          </b-button>
          <button
            v-if="!loading && item === 'later'"
            :disabled="disabled"
            type="submit"
            class="btn btn-success"
          >
            Enviar mas tarde
          </button>
        </div>
      </form>
    </b-modal>
    <!-- End Modal -->
  </div>
</template>

<script>
import {
  BModal,
  BButton,
  BAvatar,
  BTable,
  BRow,
  BCol,
  BBadge,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BCard,
  BContainer,
  BButtonGroup,
  BInputGroupAppend,
} from "bootstrap-vue";
import vSelect from "vue-select";

import { VueGoodTable } from "vue-good-table";
import store from "@/store/index";
import Ripple from "vue-ripple-directive";

export default {
  data() {
    return {
      fields: [
        { key: "username", sortable: true },
        { key: "email", sortable: true },
        { key: "created_at", label: "Creación", sortable: true },
        { key: "acciones" },
      ],
      fieldsMessage: [
        { key: "title", label: "titulo", sortable: true },
        { key: "body", label: "Descripcion", sortable: true },
        { key: "delivered", label: "entregado", sortable: true },
        { key: "send_date", label: "fecha de envió", sortable: true },
      ],

      totalRows: 1,
      totalRowsMessage: 1,
      currentPageMessage: 1,
      perPageMessage: 5,
      pageOptionsMessage: [5, 10, 15, { value: 100, text: "Show a lot" }],

      currentPageClients: 1,
      perPageClients: 5,
      pageOptionsClients: [5, 10, 15, { value: 100, text: "Show a lot" }],

      filter: null,
      filterMessage: null,
      filterOn: [],
      filterOnMessage: [],

      send_now: true,
      loading: false,
      title: "",
      body: "",
      send_date: "",
      isBusy: false,
      isBusyMessage: false,
      item: "now",
    };
  },
  directives: {
    Ripple,
  },

  components: {
    BModal,
    BButton,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    vSelect,
    BDropdown,
    BDropdownItem,
    VueGoodTable,
    BCard,
    BContainer,
    BTable,
    BRow,
    BButtonGroup,
    BInputGroupAppend,
    BCol,
  },

  created() {
    this.getUsers();
    this.getMessages();
  },

  computed: {
    users() {
      return this.$store.state.appMercadeo.users;
    },

    messages() {
      return this.$store.state.appMercadeo.messages;
    },

    disabled() {
      return (
        this.title === "" ||
        !this.title ||
        this.body === "" ||
        !this.body ||
        this.loading
      );
    },

    statusVariant() {
      const statusColor = {
        Current: "light-primary",
        Professional: "light-success",
        Rejected: "light-danger",
        Resigned: "light-warning",
        Applied: "light-info",
      };

      return (status) => statusColor[status];
    },

    direction() {
      if (store.state.appConfig.isRTL) {
        this.dir = true;
        return this.dir;
      }
      this.dir = false;
      return this.dir;
    },
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPNit = 1;
    },

    onFilteredMessage(filteredItems) {
      this.totalRowsMessage = filteredItems.length;
      this.currentPNit = 1;
    },

    getUsers() {
      this.$store
        .dispatch("appMercadeo/getUsers")
        .then((response) => {
        })
        .catch((error) => {
        });
    },
    getMessages() {
      this.$store
        .dispatch("appMercadeo/getMessages")
        .then((response) => {
        })
        .catch((error) => {
        });
    },

    sendEmail() {
      this.loading = true;
      const sendData = {
        title: this.title,
        body: this.body,
        send_date: this.send_date,
        item: this.item,
      };
      this.$store
        .dispatch("appMercadeo/sendNotifications", sendData)
        .then((resp) => {
          this.hideModal();
          if (this.item == "now") {
            this.AlerSwall("Enviado!", "Tu E-Mail ha sido enviado");
          } else {
            this.AlerSwall(
              "Programado!",
              "Email programado! Tu E-Mail se enviara mas tarde"
            );
          }
          this.title = "";
          this.body = "";
          this.send_date = "";
          this.loading = false;
          setTimeout(() => {
            this.getMessages();
          }, 1000);
        })
        .catch((error) => console.log(error));
    },

    AlerSwall(type, message) {
      this.$swal({
        title: type,
        text: message,
        icon: "success",
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });
    },

    showModal() {
      this.$refs["modal-send-email"].show();
    },
    hideModal() {
      this.$refs["modal-send-email"].hide();
    },
    toggleModal() {
      this.$refs["modal-send-email"].toggle("#toggle-btn");
    },
  },
};
</script>

<style scoped>
.btn {
  margin-right: 10px;
  margin-bottom: 10px;
}

.table-width {
  max-width: 80%;
}

.center {
  margin: auto;
  width: 80%;
  border: 1px solid rgb(50, 152, 236);
  padding: 10px;
}
</style>