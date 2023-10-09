<template>
  <b-card>
    <div class="tablaClientes">
      <div class="mb-2" cols-lg="5" cols-sm="auto">
        <app-collapse>
          <app-collapse-item title="FILTRO GENERAL" :isVisible="true" >
            <div class="d-flex flex-wrap">
              <b-col cols="12" md="3">
                <b-form-group  label="Por nombre contacto" >
                  <b-form-input
                    name="search"
                    @change="getClientes"
                    v-model="query.nombre"
                    type="search"
                    placeholder="Buscar nombre..."
                  ></b-form-input>
                </b-form-group>
              </b-col>
              
              <b-col cols="12" md="3">
                <b-form-group label="Portales">
                  <div class="container__flat-pickr">
                    <v-select
                      v-model="query.portal"
                      :options="appPortales"
                      :reduce="(portal) => portal.id"
                      label="name"
                      :clearable="false"
                    />
                    <button class="flat-pickr__btn" @click="deleteDate('portal')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="15" heigth="15" >
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                      </svg>
                    </button>
                  </div>
                  </b-form-group>
              </b-col>
            </div>
  
          </app-collapse-item>
          <app-collapse-item  title="FILTRO POR FECHAS"> 
            <div class="d-flex flex-wrap">
              <b-col cols="12" md="3">
                <b-form-group label="Fecha Inicial" >
                  <div class="container__flat-pickr">
                    <flat-pickr
                      v-model="query.init"
                      name="fechaInicio"
                      class="form-control"
                      :config="{
                        enableTime: false,
                        time_24hr: false,
                        maxDate:maxDateStart,
                        locale,
                        plugins,
                        dateFormat: 'Y-m-d'
                      }"
                    />
                    <button class="flat-pickr__btn" @click="deleteDate('init')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="15" heigth="15" >
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                      </svg>
                    </button>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group label="Fecha Final" >
                  <div class="container__flat-pickr">
                    <flat-pickr
                      v-model="query.end"
                      name="fechaInicio"
                      class="form-control"
                      :config="{
                        enableTime: false,
                        time_24hr: false,
                        maxDate:maxDateEnd,
                        minDate:query.init,
                        locale,
                        plugins,
                        dateFormat: 'Y-m-d'
                      }"
                    />
                    <button class="flat-pickr__btn" @click="deleteDate('end')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="15" heigth="15" >
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                      </svg>
                    </button>
                  </div>
                </b-form-group>
              </b-col>
            </div>
          </app-collapse-item>
        </app-collapse>
      </div>
      <b-row class="mt-2" align-v="end">
        <div class="col-auto">
          <b-button variant="secondary" @click="clearFilter">
            Limpiar
          </b-button>
        </div>
        <b-col cols="auto" :style="{ width: '8em' }">
          <b-form-group class="mb-0">
            <v-select
              v-model="query.number_page"
              :options="pageOptions"
              :reduce="(type) => type.value"
              label="text"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-1" v-show="!overlay">
        <b-col cols="auto" class="mx-auto mt-2">
          Clientes: <b class="text-primary">{{ tablaClientes.to }}</b> de
          <b>{{ tablaClientes.total }}</b>
        </b-col>
        <b-col cols="12">
            <VueGoodTable
              styleClass="vgt-table striped"
              v-bind="goodTable.props"
              v-on="goodTable.events"
            >
              <template slot="emptystate">
                <div class="text-center p-1">No hay clientes registrados</div>
              </template>
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field === 'created'">
                  {{ props.row.created_at| formatDate }}
                </span>
                <span v-if="props.column.field === 'inmueble'">
                  <!-- <b-button
                    variant="primary"
                    @click="info(props.row.id, $event.target)"
                  >
                    inmuebles
                  </b-button> -->
                  <b-button
                    variant="primary"
                    @click="info(props.row, $event.target)"
                  >
                    Ver inmuebles
                  </b-button>
                </span>
                <span v-if="props.column.field === 'genero.name'">
                  <b-badge
                    v-if="props.formattedRow[props.column.field]"
                    :variant="
                      props.row.genero.id == 2 ? 'light-info' : 'light-danger'
                    "
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </b-badge>
                </span>
                <span v-else-if="props.column.field === 'clasificacion'">
                  <b-form-rating
                    class="bg-transparent p-0"
                    :value="props.row.clasificacion"
                    variant="warning"
                    inline
                    readonly
                    no-border
                  />
                </span>
                <span
                  v-else-if="props.column.field === 'subportalescode'"
                  class="d-inline-flex justify-content-center"
                >
                <div v-if="props.row.subportalescode.length>0">
                  <img
                    v-bind="mainProps"
                    rounded
                    alt="Transparent image"
                    class="image_portal"
                    :src="props.row.subportalescode[0] | formatingSubPortalescode"
                  />
                </div>
                <div v-else>
                  <img
                    v-bind="mainProps"
                    rounded
                    alt="Transparent image"
                    class="image_portal"
                    :src="props.row.portalescontact[0] | formatingPortalesContact"
                  />
                </div>
                </span>
                <span
                  v-else-if="props.column.field === 'actions'"
                  class="d-inline-flex justify-content-center"
                >
                  <b-button
                    v-if="props.row.whatsapp"
                    :href="`https://wa.me/${props.row.whatsapp.substring(
                      1,
                      props.row.whatsapp.length
                    )}`"
                    pill
                    variant="success"
                    target="_blank"
                    class="
                      btn-icon
                      d-flex
                      justify-content-center
                      align-items-center
                      m-10
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      :style="{
                        width: '1.25em',
                        height: '1em',
                        margin: '-0.5em',
                        fontSize: '20px',
                      }"
                      fill="currentColor"
                    >
                      <path
                        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                      />
                    </svg>
                  </b-button>
                  <b-button
                    v-if="props.row.main_mail"
                    :href="'mailto:' + props.row.main_mail"
                    pill
                    variant="primary"
                    class="
                      btn-icon
                      d-flex
                      justify-content-center
                      align-items-center
                      m-10
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      :style="{
                        width: '1.25em',
                        height: '1em',
                        margin: '-0.5em',
                        fontSize: '15px',
                      }"
                      fill="currentColor"
                    >
                      <path
                        d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"
                      />
                    </svg>
                  </b-button>
                  <b-button
                    v-b-tooltip.hover
                    title="Editar"
                    pill
                    variant="info"
                    v-if="$can('updated', 'inmuebles')"
                    @click="editarCliente(props.row)"
                    class="
                      btn-icon
                      d-flex
                      justify-content-center
                      align-items-center
                      m-10
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      :style="{
                        width: '1.25em',
                        height: '1em',
                        margin: '-0.5em',
                        fontSize: '15px',
                      }"
                      fill="currentColor"
                    >
                      <path
                        d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"
                      />
                    </svg>
                  </b-button>
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
              <template slot="pagination-bottom" slot-scope="props">
                <div class="d-flex flex-wrap align-items-center mt-1">
                  <div class="d-flex">
                    <b-pagination
                      v-if="tablaClientes.per_page < tablaClientes.total"
                      @change="getClientes"
                      :value="currentPage"
                      :per-page="tablaClientes.per_page"
                      :total-rows="tablaClientes.total"
                      first-number
                      last-number
                      prev-class="prev-arrow"
                      next-class="next-arrow"
                    >
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>
                  </div>
                </div>
              </template>
            </VueGoodTable>
        </b-col>
      </b-row>
      <loadingContact  class="mt-3" v-show="overlay"/>
      <transition name="fade">
        <v-modal
          v-if="modal.state"
          @close="closeModal"
          size="sm"
          :titulo="modal.titulo"
          footer
        >
          <ClientesForm ref="ClientesForm" :form="form" v-bind="modal.props" />
          <template #footer>
            <b-overlay :show="overlay">
              <b-button variant="info" @click="onSubmit" :disabled="overlay">
                {{ modal.props.tipo != "add" ? "Guardar" : "Agregar cliente" }}
              </b-button>
            </b-overlay>
          </template>
        </v-modal>
      </transition>
      <transition name="fade">
        <v-modal
          v-if="modalFile"
          @close="modalFile = false"
          size="sm"
          titulo="Importar Excel"
          footer
        >
          <b-form-file
            placeholder="Elija un archivo o déjelo aquí...."
            drop-placeholder="Deja el archivo aquí...."
            browse-text="Buscar"
            @change="onFileChange"
            :disabled="overlay"
          />
          <img :src="imgExcel" class="img-fluid d-block mx-auto mt-1" alt="" />

          <template #footer>
            <b-overlay :show="overlay">
              <b-button
                variant="success"
                @click="importExcel"
                :disabled="!import_file"
              >
                Subir archivo
              </b-button>
              <b-button
                variant="warning"
                href="https://res.cloudinary.com/reality-inmo/raw/upload/v1671461011/excel/clientes_ni8tix.xlsx"
                download="plantilla-clientes.xlsx"
              >
                Descargar plantilla
              </b-button>
            </b-overlay>
          </template>
        </v-modal>
      </transition>
      <modal-inmuebles-interesados
        ref="modalInmueblesInteresados"
        :inmuebles="propertiesPortal"
      ></modal-inmuebles-interesados>
    </div>
  </b-card>
</template>

<script>
import ClientesMixins from "./clientesMixins.js";
import VSelect from "vue-select";
import VModal from "@/views/componente/vModal";
import { VueGoodTable } from "vue-good-table";
import ClientesForm from "@/views/apps/clientes/clientes-list/ClientesForm";
import modalInmueblesInteresados from "./components/modalInmueblesInteresados.vue";
import flatPickr from "vue-flatpickr-component";
import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import moment from "moment";
//desplegables
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'

// vista loading
import loadingContact from "@/views/componente/loadingContact.vue";
export default {
  name: "tablaClientes",
  mixins: [ClientesMixins],
  data() {
    return {
      mainProps: {
        blank: false,
        width: 75,
        height: 75,
        class: "m1",
      },
      locale: Spanish,
      plugins: [
        new confirmDatePlugin({
          confirmText: "Agregar",
          showAlways: true,
          theme: "dark",
        }),
      ],
    };
  },
  filters: {
    formatingSubPortalescode(data) {
      if (data) {
        var res = JSON.stringify(data);
        var response = JSON.parse(res);

        return response.subportal.portal_id.image;

      } else {
        return "https://res.cloudinary.com/reality-inmo/image/upload/v1667514340/profile/No-Image-Placeholder.svg_otsdq0.png";
      }
    },

    formatDate(date){
      return moment(date).format("YYYY-MM-DD")
    },
    formatingPortalesContact(data) {
      if (data) {
        var res = JSON.stringify(data);
        var response = JSON.parse(res);

        return response.portal_id.image;

      } else {
        return "https://res.cloudinary.com/reality-inmo/image/upload/v1667514340/profile/No-Image-Placeholder.svg_otsdq0.png";
      }
    },
  },
  components: {
    "modal-inmuebles-interesados": modalInmueblesInteresados,
    VSelect,
    VModal,
    ClientesForm,
    VueGoodTable,
    flatPickr,
    loadingContact,
    AppCollapse,
    AppCollapseItem,
},
methods:{
  deleteDate(data){
      this.query[data]=null;
    },
}
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>

<style lang="scss" scoped>
.container__flat-pickr{
  display: flex;
  width: 100%;
  .v-select{
    width: 90%;
  }
}
.flat-pickr__btn{
  border: 1px solid #d9d7df;
  background-color: white;
}
.flat-pickr__btn svg{
  fill: var(--primary);
}

.flat-pickr__btn svg:hover{
    fill: red;

}

.flatpickr-confirm.darkTheme {
  background: var(--success);
  color: #fff;
  padding: 5px 15px !important;
  cursor: pointer;
}
.flatpickr-confirm.darkTheme svg {
  margin-left: 10px;
}
.flatpickr-confirm.darkTheme svg * {
  fill: currentColor;
}
.image_portal{
  width: 100px ;
  height: 60px;
}
.icon {
  width: 1.25em;
  font-size: 24px;
  display: flex;
  color: var(--primary);
  justify-content: center; /* margin: 0 auto; */
}
.icon svg {
  display: block;
  width: auto;
  height: 1em;
  fill: currentColor;
}
.icon.whatsapp {
  color: #57d163;
}
.badge {
  position: relative;
  z-index: 1;
  overflow: hidden;
}
.badge::after {
  content: "";
  position: absolute;
  inset: 0;
  display: block;
  background: currentColor;
  opacity: 0.15;
}
.badge-blue {
  color: #009aff;
}
.badge-pink {
  color: var(--pink);
}

.vgt-table tr.clickable.success td {
  background: #28c76f4d !important;
}
</style>