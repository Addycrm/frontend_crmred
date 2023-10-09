<template>
  <b-overlay :show="overlay">
    <b-card no-body>
      <template #header>
        <h3 class="mb-1 mr-2">
          Historial de Envíos
        </h3>
        <div class="d-flex align-items-center mr-auto">
          <b-button variant="info"  :to="{ name: 'email-create' }" class="text-nowrap d-flex align-items-center mb-1" size="md">
            <span class="align-middle">Programar Email</span>
          </b-button>     
        </div>
      </template>
    </b-card>
    <b-card>
      <VueGoodTable
        styleClass="vgt-table striped" 
        :columns="columns"
        :rows="registros"
        :pagination-options="{
          enabled: true,
          perPage:perPage
        }"
        :search-options="{
          enabled: true
        }"
      >
        <template slot="emptystate">
          <div class="text-center p-1">No hay registros de envió</div>
        </template>
        <template
          slot="table-row"
          slot-scope="props"
        >
          <!-- Column: Action -->
          <span v-if="props.column.field === 'delivered'">
            <b-badge pill :variant="props.formattedRow[props.column.field] == 'Enviado'? 'light-primary': 'light-warning'">
              {{ props.formattedRow[props.column.field] }}
            </b-badge>
          </span>
          <span v-else-if="props.column.field === 'send_date'">
            {{formatDate(props.formattedRow[props.column.field], { month: "long", day: "numeric", year: 'numeric'})}}<br>
            {{formatDate(props.formattedRow[props.column.field], { hourCycle: 'h12', hour: 'numeric', minute: 'numeric'})}}
          </span>

          <!-- Column: Common -->
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div v-if="registros.length > perPage" class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap">
                Mostrando 1 a
              </span>
              <b-form-select
                v-model="perPage"
                :options="['10','20','100']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap"> de {{ props.total }} registros </span>
            </div>
            <div>
              <b-pagination
                v-if="props.total > perPage"
                :value="1"
                :total-rows="props.total"
                :per-page="perPage"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
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
  </b-overlay>
</template>

<script>
import { formatDate, avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import { VueGoodTable } from "vue-good-table";


export default {
  data() {
    return {

      formatDate,
      columns: [
        {label: 'ID', field: 'id',},
        {label: 'Asunto', field: 'title'},
        {label: 'Estado', field: 'delivered'},
        {label: 'Fecha de envió', field: 'send_date'},
      ],
      perPage: 10,
      overlay: true,
    };
  },

  components: {
    vSelect,
    VueGoodTable,
  },

  mounted() {
    this.getMessages();
  },

  computed: {
    registros() {
      return this.$store.state.appMercadeo.messages;
    },
  },
  methods: {
    async getMessages() {
      this.overlay = true;
      await this.$store
      .dispatch("appMercadeo/getMessages")
      .then((response) => {
        this.overlay = false;
      })
      .catch((error) => {
        this.overlay = false;
        console.error(error);
      });
    },
  },
};
</script>