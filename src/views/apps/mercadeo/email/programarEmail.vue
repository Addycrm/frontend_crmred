<template>
  <section class="container-email">
    <b-card class="email__card_form">
      <b-overlay :show="overlay">
        <ValidationObserver ref="formMarketing">
          <b-row>
            <b-col>
              <form>
                <b-form-group label="Asunto" class="required" label-size="lg">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <b-form-input id="title" name="title" v-model="title" />
                    <b-form-invalid-feedback :state="!(errors.length > 0)">
                      Debes registar un asunto para tu Email
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
                <hr class="my-2" />
                <b-form-group label="Destinatarios" class="required" label-size="lg">
                  <b-row class="m-n1">
                    <b-col cols="auto" class="p-1">
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-radio-group
                          v-model="showClientes"
                          id="clientes"
                          name="clientes"
                        >
                          <!-- <b-form-radio :value="false" @change="inmueble = []" class="pb-1">
                            Todos los Clientes
                          </b-form-radio> -->
                          <b-form-radio :value="true" class="pb-1">
                            Seleccionar Clientes
                          </b-form-radio>
                        </b-form-radio-group>
                        <b-form-invalid-feedback :state="!(errors.length > 0)">
                          Debes elegir una opción de destinatario
                        </b-form-invalid-feedback>
                      </ValidationProvider>
                    </b-col>
                    <b-col cols="12" class="px-1 pb-1" v-if="showClientes">
                      <VueGoodTable
                        styleClass="vgt-table striped"
                        :columns="customers"
                        :rows="cliente"
                        :pagination-options="{
                          enabled: true,
                          perPage: pageCustomers,
                        }"
                      >
                        <template slot="emptystate">
                          <div class="text-center p-1">
                            No hay clientes seleccionados
                          </div>
                        </template>
                        <template slot="table-row" slot-scope="props">
                          <!-- Column: Action -->
                          <span
                            class="d-block text-center"
                            v-if="props.column.field === 'action'"
                          >
                            <b-button
                              class="btn-trash"
                              pill
                              variant="danger"
                              @click="deleteClient(props.row)"
                            >
                              <feather-icon icon="TrashIcon" />
                            </b-button>
                          </span>
                          <span
                            class="d-block text-center"
                            v-else-if="props.column.field === 'genero.name'"
                          >
                            <b-badge
                              v-if="props.formattedRow[props.column.field]"
                              :variant="
                                generoVariant(
                                  props.formattedRow[props.column.field]
                                )
                              "
                            >
                              {{ props.formattedRow[props.column.field] }}
                            </b-badge>
                          </span>
  
                          <!-- Column: Common -->
                          <span v-else>
                            {{ props.formattedRow[props.column.field] }}
                          </span>
                        </template>
                        <template slot="pagination-bottom" slot-scope="props">
                          <div
                            class="
                              d-flex
                              justify-content-between
                              flex-wrap
                              align-items-center
                              mt-1
                            "
                          >
                            <div class="d-flex">
                              <b-button
                                class="mr-1 text-nowrap"
                                variant="success"
                                @click="
                                  openModal({
                                    component: 'TablaClientes',
                                    target: 'cliente',
                                    id: 'cliente_id',
                                    typeSelected: true,
                                  })
                                "
                              >
                                Buscar clientes
                              </b-button>
                            </div>
                            <div
                              v-if="cliente.length > pageCustomers"
                              class="d-flex"
                            >
                              <span class="text-nowrap"> Mostrando 1 a </span>
                              <b-form-select
                                v-model="pageCustomers"
                                :options="['10', '20', '100']"
                                class="mx-1"
                                @input="
                                  (value) =>
                                    props.perPageChanged({
                                      currentPerPage: value,
                                    })
                                "
                              />
                              <span class="text-nowrap">
                                de {{ props.total }} registros
                              </span>
                            </div>
                            <div
                              v-if="props.total > pageCustomers"
                              class="d-flex"
                            >
                              <b-pagination
                                :value="1"
                                :total-rows="props.total"
                                :per-page="pageCustomers"
                                first-number
                                last-number
                                align="right"
                                prev-class="prev-item"
                                next-class="next-item"
                                class="mb-0"
                                @input="
                                  (value) =>
                                    props.pageChanged({ currentPage: value })
                                "
                              >
                                <template #prev-text>
                                  <feather-icon
                                    icon="ChevronLeftIcon"
                                    class="icon_pagination"
                                  />
                                </template>
                                <template #next-text>
                                  <feather-icon
                                    icon="ChevronRightIcon"
                                    class="icon_pagination"
                                  />
                                </template>
                              </b-pagination>
                            </div>
                          </div>
                        </template>
                      </VueGoodTable>
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <input type="hidden" :value="cliente" />
                        <b-form-invalid-feedback :state="!(errors.length > 0)">
                          Debes elegir por lo menos un cliente
                        </b-form-invalid-feedback>
                      </ValidationProvider>
                    </b-col>
                  </b-row>
                </b-form-group>
                <hr class="my-2" />
                <b-form-group label="Programar envío" class="required" label-size="lg">
                  <b-row class="m-n1">
                    <b-col cols="auto" class="p-1">
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-radio-group
                          v-model="dateState"
                          id="fecha"
                          name="fecha"
                        >
                          <b-form-radio :value="false" class="pb-1"
                            >Enviar ahora
                          </b-form-radio>
                          <b-form-radio :value="true" class="pb-1">
                            Elegir una fecha</b-form-radio
                          >
                        </b-form-radio-group>
                        <b-form-invalid-feedback :state="!(errors.length > 0)">
                          Debes elegir una opción de programar envío
                        </b-form-invalid-feedback>
                      </ValidationProvider>
                    </b-col>
                    <b-col cols="12" class="px-1 pb-1" v-if="dateState">
                      <flat-pickr
                        v-model="send_date"
                        name="fechaEnvio"
                        class="form-control"
                        :config="{
                          enableTime: true,
                          time_24hr: false,
                          locale,
                          dateFormat: 'Y-m-d G:i K',
                          plugins,
                        }"
                      />
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <input type="hidden" :value="send_date" />
                        <b-form-invalid-feedback :state="!(errors.length > 0)">
                          Debes registrar una fecha de programación
                        </b-form-invalid-feedback>
                      </ValidationProvider>
                    </b-col>
                  </b-row>
                </b-form-group>
                <hr class="my-2" />
                <b-form-group label="Tipo de Email" class="required" label-size="lg">
                  <b-row class="m-n1">
                    <b-col cols="auto" class="p-1">
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-radio-group v-model="showType" name="type">
                          <b-form-radio
                            class="pb-1"
                            v-for="item in tipoEmail.normal"
                            :key="item.id"
                            :state="errorState(errors)"
                            :value="{
                              id: item.id,
                              name: item.name,
                              specials_date: item.specials_date,
                            }"
                          >
                            {{ item.description  }}
                          </b-form-radio>
                          <b-form-radio
                            class="pb-1"
                            :state="errorState(errors)"
                            :value="{ specials_date: 1 }"
                            >Días Especiales</b-form-radio
                          >
                        </b-form-radio-group>
                      </ValidationProvider>
                    </b-col>
                    <template v-if="showType">
                      <b-col
                        cols="12"
                        v-if="showType.specials_date == 1"
                        class="p-1"
                      >
                        <ValidationProvider v-slot="{ errors }" rules="required">
                          <b-form-radio-group
                            v-model="specialType"
                            name="specialType"
                            class="box_solid"
                          >
                            <b-form-radio
                              class="pb-1"
                              v-for="item in tipoEmail.special"
                              :key="item.id"
                              :state="errorState(errors)"
                              :value="{ id: item.id, name: item.name }"
                            >
                              {{ item.description }}
                            </b-form-radio>
                          </b-form-radio-group>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{ errors }" rules="required">
                          <b-form-group
                            label="Mensaje"
                            class="required mt-2 mb-0"
                            :state="!(errors.length > 0)"
                          >
                            <quill-editor
                              v-model="message"
                              :options="descriptionOptions"
                              id="quill-description"
                            />
                          </b-form-group>
                        </ValidationProvider>
                      </b-col>
                      <b-col cols="12" class="px-1 pb-1" v-if="showType.id == 2">
                        <VueGoodTable
                          styleClass="vgt-table striped"
                          :selectOptions="{ enabled: false }"
                          :columns="property"
                          :rows="inmueble"
                          :pagination-options="{
                            enabled: true,
                            perPage: pageProperty,
                          }"
                        >
                          <template slot="emptystate">
                            <div class="text-center p-1">
                              No hay inmueble seleccionado
                            </div>
                          </template>
                          <template slot="table-row" slot-scope="props">
                            <!-- Column: Action -->
                            <span
                              class="d-block"
                              v-if="
                                props.column.field === 'rental_price' ||
                                props.column.field === 'selling_price'
                              "
                            >
                              {{
                                props.formattedRow[props.column.field] | precio
                              }}
                            </span>
  
                            <!-- Column: Common -->
                            <span v-else>
                              {{ props.formattedRow[props.column.field] }}
                            </span>
                          </template>
                          <template slot="pagination-bottom" slot-scope="props">
                            <div
                              class="
                                d-flex
                                justify-content-between
                                flex-wrap
                                align-items-center
                                mt-1
                              "
                            >
                              <div class="d-flex">
                                <b-button
                                  class="mr-1 text-nowrap"
                                  variant="success"
                                  @click="
                                    openModal({
                                      component: 'TableInmueble',
                                      target: 'inmueble',
                                      id: 'inmueble_id',
                                      typeSelected: false,
                                    })
                                  "
                                >
                                  Buscar inmuebles
                                </b-button>
                              </div>
                              <div
                                v-if="inmueble.length > pageProperty"
                                class="d-flex"
                              >
                                <span class="text-nowrap"> Mostrando 1 a </span>
                                <b-form-select
                                  v-model="pageProperty"
                                  :options="['10', '20', '100']"
                                  class="mx-1"
                                  @input="
                                    (value) =>
                                      props.perPageChanged({
                                        currentPerPage: value,
                                      })
                                  "
                                />
                                <span class="text-nowrap">
                                  de {{ props.total }} registros
                                </span>
                              </div>
                              <div
                                v-if="props.total > pageProperty"
                                class="d-flex"
                              >
                                <b-pagination
                                  :value="1"
                                  :total-rows="props.total"
                                  :per-page="pageProperty"
                                  first-number
                                  last-number
                                  align="right"
                                  prev-class="prev-item"
                                  next-class="next-item"
                                  class="mb-0"
                                  @input="
                                    (value) =>
                                      props.pageChanged({ currentPage: value })
                                  "
                                >
                                  <template #prev-text>
                                    <feather-icon
                                      icon="ChevronLeftIcon"
                                      size="lg"
                                    />
                                  </template>
                                  <template #next-text>
                                    <feather-icon
                                      icon="ChevronRightIcon"
                                      size="lg"
                                    />
                                  </template>
                                </b-pagination>
                              </div>
                            </div>
                          </template>
                        </VueGoodTable>
                        <ValidationProvider v-slot="{ errors }" rules="required">
                          <input type="hidden" v-model="inmueble" />
                          <b-form-invalid-feedback :state="!(errors.length > 0)">
                            Debes elegir un inmueble
                          </b-form-invalid-feedback>
                        </ValidationProvider>
                      </b-col>
                    </template>
                  </b-row>
                </b-form-group>
                <hr class="my-2" />
                <predeterminate-template
                  v-model="mercadeo_id"
                  :type="templateType.id"
                />
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <input type="hidden" :value="mercadeo_id" />
                  <b-form-invalid-feedback
                    :state="!(errors.length > 0)"
                    class="mb-1 mt-n1"
                  >
                    Elije una plantilla
                  </b-form-invalid-feedback>
                </ValidationProvider>
                <!-- <b-row>
                  <div class="d-flex flex-column"  v-if="cliente.length>0 && inmueble.length>0 ">
                    <h4>Modificar Campos</h4>
                    <b-nav tabs>
                      <b-nav-item v-for="item in optionsEditEmail" :key="item.id" :active="(selectedNav==item.id)?true:false" @click="showFeatures(item.id)">
                              {{ item.name }}
                          </b-nav-item>
                    </b-nav>
                      <b-card v-show="selectedNav==1">
                        <b-col v-if="showType.id == 1 || showType.id == 2">
                          <b-form-group label="Descripción Agente">
                            <div
                              id="quill-description-toolbar-1"
                              class="d-flex justify-content-center border-bottom-0"
                            >
                              <button class="ql-bold" />
                              <button class="ql-italic" />
                              <button class="ql-underline" />
                              <button class="ql-link" />
                              <button class="ql-clean" />
                            </div>
                            <quill-editor
                              v-model="user.descripcion"
                              :options="descriptionOptionsFormAgent"
                              id="quill-description"
                            />
                          </b-form-group>
                        </b-col>
                      </b-card>
                      <b-card  v-show="selectedNav==2">
                        <b-col v-if="inmueble.length>0 ">
                          <b-form-group label="Descripción Inmueble">
                            <div
                              id="quill-description-toolbar-2"
                              class="d-flex justify-content-center border-bottom-0"
                            >
                              <button class="ql-bold" />
                              <button class="ql-italic" />
                              <button class="ql-underline" />
                              <button class="ql-link" />
                              <button class="ql-clean" />
                            </div>
                            <quill-editor
                              v-model="inmueble[0].descripcion"
                              :options="descriptionOptionsFormInmueble"
                              id="quill-description"
                            />
                          </b-form-group>
                        </b-col>
                        <p v-else>Selecciona un inmueble</p>
                      </b-card>
                  </div>
                </b-row> -->
                <b-row class="mb-4">
                  <b-col class="d-flex align-items-center" style="gap: 8px;">
                    <b-button
                      variant="info"
                      @click="formValidate"
                      class="d-flex align-items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        :style="{
                          width: '1.25em',
                          height: '1em',
                          margin: '-0.5em',
                          marginRight: '0.8rem',
                          fontSize: '15px',
                        }"
                        fill="currentColor"
                      >
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                          d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
                        />
                      </svg>
                      <span class="align-middle">Enviar</span>
                    </b-button>
                    <spinnerLoading v-if="loadingEmail"></spinnerLoading>
                  </b-col>
                </b-row>
              </form>
            </b-col>
          </b-row>
        </ValidationObserver>
      </b-overlay>
      <transition name="fade">
        <v-modal
          v-if="modalState"
          @close="modalState = false"
          :titulo="'Seleccionar ' + target"
          size="lg"
          footer
        >
          <components
            :is="tableList"
            elegir
            :rango="typeSelected"
            ref="tableList"
            @sendActive="sendActive"
          />
          <template #footer>
            <b-button
              variant="success"
              @click="getValue({ target, id })"
              :disabled="sendState"
            >
              Seleccionar
            </b-button>
  
          </template>
        </v-modal>
      </transition>
    </b-card>
    <b-card class="email__card_prev" >
      <h5 class="title_card">Visualización de tu correo</h5>
      <div v-if="cliente.length" class="container_prev">
        <fichaAgent  v-if="showType.id == 1"  :user="user"/>
        <FichaProperty v-else-if="showType.id == 2 && inmueble" :user="user" :inmuebles="inmueble"/>
        <div v-else-if="showType.specials_date == 1">
          <fichaHallowen v-if="specialType.id == 3" :user="user" :message="message"/>
          <fichaDayMother  v-if="specialType.id == 4" :user="user" :message="message"/>
          <fichaDayFather  v-if="specialType.id == 5" :user="user" :message="message"/>
          <FichaChristmas v-if="specialType.id == 6" :user="user" :message="message"/>
          <FichaDayValentine  v-if="specialType.id == 9" :user="user" :message="message"/>
        </div>
      </div>
      <div v-else>
        <!-- <editEmail/> -->
        <p>
          1. Escribe el asunto del correo que vas a enviar.
        </p>
        <p>
          2. Selecciona el cliente o los clientes destinatarios.
        </p>
        <p>
          3. Selecciona la plantilla requerida y presiona enviar.
        </p>
        <img :src="themeConfig.appLogoImage" :alt="themeConfig.appName" class="theme_logo">
      </div>
    </b-card>

  </section>

</template>

<script>
import VModal from "@/views/componente/vModal";
import TablaClientes from "@/views/apps/clientes/clientes-list/tablaClientes";
import TableInmueble from "@/views/apps/inmuebles/inmueble-list/tableInmueble";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import { VueGoodTable } from "vue-good-table";

import vSelect from "vue-select";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
import { quillEditor } from "vue-quill-editor";

import {
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
  extend,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";

import userTemplatesVue from "./components/userTemplates.vue";
import predeterminateTemplatesVue from "./components/predeterminateTemplates.vue";
import mixinInputState from "@/views/componente/mixinInputState";

import spinnerLoading from "./components/spinnerLoading.vue";
import FichaProperty from "./components/fichas/fichaProperty.vue";
import fichaAgent from "./components/fichas/fichaAgent.vue"
import editEmail from "./components/fichas/editEmail.vue";
import FichaHallowen from "./components/fichas/fichaHalloween.vue"
import fichaDayMother from "./components/fichas/fichaDayMother.vue"
import fichaDayFather from "./components/fichas/fichaDayFather.vue"
import { $themeConfig } from '@themeConfig'
import FichaChristmas from "./components/fichas/fichaChristmas.vue";
import FichaDayValentine from "./components/fichas/fichaDayValentine.vue";


export default {
  name: "ProgramarEmail",
  mixins: [mixinInputState],
  data() {
    setInteractionMode("eager");
    Object.keys(rules).forEach((rule) => {
      extend(rule, rules[rule]);
    });
    return {
      user:JSON.parse(localStorage.getItem("userData")),
      selectedNav:2,
      optionsEditEmail:[
      {
        id:1,
        name:"Descripcion inmueble",
        pathForm:'inmueble[0].descripcion'
      }
      ],
      formEdit:{
        cliente:{
          descripcion:''
        }
      },
      themeConfig:$themeConfig.app,
      customers: [
        { label: "ID", field: "id" },
        { label: "Nombre", field: "nombre" },
        { label: "Género", field: "genero.name" },
        { label: "Celular", field: "main_cell_phone" },
        { label: "Email", field: "main_mail" },
        { label: "Acción", field: "action" },
      ],
      property: [
        { label: "ID", field: "id" },
        { label: "Título", field: "titulo_inmueble" },
        { label: "Tipo", field: "tipo_inmueble.text" },
        { label: "Tipo negocio", field: "tipo_negocio.text" },
        { label: "Alquiler", field: "rental_price" },
        { label: "Venta", field: "selling_price" },
      ],
      genero: [
        {
          1: "Femenino",
          2: "Masculino",
        },
        {
          1: "light-danger",
          2: "light-info",
        },
      ],
      pageCustomers: 10,
      pageProperty: 10,

      overlay: false,
      modalState: false,
      sendState: false,

      cliente: [],
      inmueble: [],

      tableList: null,
      target: null,
      id: null,

      typeSelected: null,
      showClientes: false,

      showType: {id:1,
          name: 'agente',
          specials_date:0,
        },
      specialType: {},

      dateState: false,
      send_date: null,
      locale: Spanish,
      plugins: [
        new confirmDatePlugin({
          confirmText: "Agregar",
          showAlways: true,
          theme: "dark",
        }),
      ],

      show_select: false,
      show: true,
      show_loading: false,
      send_now: true,
      loading: false,
      title: "",
      body: "",
      message: null,
      isBusy: false,
      isBusyMessage: false,
      item: "now",
      search: "",
      data: [],
      mercadeo_id: null,
      payLoad: null,
      dir: "ltr",
      selectedReferido: [],
      selectedCliente: [],
      descriptionOptions: {
        placeholder: "Mensaje del Email.",
      },
      descriptionOptionsFormAgent:{
        modules: {
          toolbar: "#quill-description-toolbar-1",
        },
        placeholder: "Descripción del agente.",
      },
      descriptionOptionsFormInmueble:{
        modules: {
          toolbar: "#quill-description-toolbar-2",
        },
        placeholder: "Descripción del agente.",
      },
      loadingEmail:null,
    };
  },

  components: {
    quillEditor,
    VModal,
    vSelect,
    TablaClientes,
    TableInmueble,
    VueGoodTable,
    ValidationProvider,
    ValidationObserver,
    "user-template": userTemplatesVue,
    "predeterminate-template": predeterminateTemplatesVue,
    spinnerLoading,
    FichaProperty,
    fichaAgent,
    editEmail,
    FichaHallowen,
    fichaDayMother,
    fichaDayFather,
    FichaChristmas,
    FichaDayValentine
},
  computed: {

    templateType() {
      let { showType, specialType } = this;
      return showType.id ? showType : specialType;
    },
    generoVariant() {
      const statusColor = {
        Femenino: "light-danger",
        Masculino: "light-info",
      };

      return (status) => statusColor[status];
    },
    clientes() {
      return this.$store.state.appCliente.clientes;
    },
    referidos() {
      return this.$store.state.referidoStoreModule.referido;
    },
    disabled() {
      return this.title === "" || !this.title || this.loading;
    },
    tipoEmail() {
      let typeEmail = { normal: [], special: [] };
      let { type } = this.$store.state.appMercadeo;

      for (let item of type)
        !item.specials_date
          ? typeEmail.normal.push(item)
          : typeEmail.special.push(item);

      return typeEmail;
    },
  },

  watch: {
    cliente(a) {
      this.selectedCliente = a;
    },
    showType(a) {
      const { id, name } = this.tipoEmail.special[0];
      if (a.specials_date == 1) this.specialType = { id, name };
    },
  },

  mounted() {
    this.getMercadeos();
    this.getMercadeoPrivate();
    this.$store.dispatch("appMercadeo/getMercadeoType");
    localStorage.setItem('selectedClientes',JSON.stringify([]));
  },
  destroyed() {
    localStorage.removeItem("selectedClientes");
  },

  methods: {
    showFeatures(id){
      this.selectedNav=id
    },
    deleteClient(value) {
      let data=localStorage.getItem('selectedClientes')
      var res = JSON.parse(data);

      res=res.filter((item) =>{
        return item.id != value.id
      })
      localStorage.setItem('selectedClientes',JSON.stringify(res))

      this.cliente = this.cliente.filter((item) => {
        if (item.id == value.id) return false;
        return true;
      });
    },
    openModal({ component, target, id, typeSelected }) {
      this.tableList = component;
      this.target = target;
      this.id = id;
      this.typeSelected = typeSelected;
      this.modalState = true;
    },
    getValue({ target, id }) {
      let value = this.$refs["tableList"].sendValue();
      this[target] = value.length > 0 ? value : [value];
      this.modalState = false;

    },
    sendActive(e) {
      this.sendState = e;
    },
    deleteKeyArrayClientes(payload) {
      var removeIndex = this.selectedCliente
        .map(function (item) {
          return item.id;
        })
        .indexOf(payload.id);
      this.selectedCliente.splice(removeIndex, 1);
    },

    infoModalListClientes(button) {
      this.$refs.modalClientes.info(button);
    },

    predeterminateTemplatePublic() {
      this.$root.$on(
        "predeterminateTemplatePublic",
        function (payLoad) {
          if (this.payLoad != payLoad) {
            this.mercadeo_id = payLoad;
          }
        }.bind(this)
      );
    },
    predeterminateTemplatePrivate() {
      this.$root.$on(
        "predeterminateTemplatePrivate",
        function (payLoad) {
          if (this.payLoad != payLoad) {
            this.mercadeo_id = payLoad;
          }
        }.bind(this)
      );
    },
    async getCliente() {
      await this.$store
        .dispatch("appCliente/fetchClients")
        .then(() => {})
        .catch(() => {});
    },

    async getMercadeos() {
      await this.$store
        .dispatch("appMercadeo/fetchMercadeos", { user_id: this.user.id })
        .then(() => {})
        .catch((error) => {
        });
    },
    async getMercadeoPrivate() {
      await this.$store
        .dispatch("appMercadeoAdmin/fetchMercadeoAdmin")
        .then(() => {})
        .catch((error) => {
        });
    },

    async formValidate() {
      // await this.$store.dispatch(`apiInmueblePrivate/editInmuebles`,{...this.inmueble[0]})
      await this.$refs["formMarketing"].validate().then((success) => {
        if (success) {
          this.sendEmail();
          this.loadingEmail=true

        }
      });
    },
    async sendEmail() {
      // this.overlay = true;
      const sendData = {
        title: this.title,
        body: this.body,
        send_date: this.send_date,
        item: this.dateState ? null : "now",
        email_type: this.templateType,
        mercadeo_id: this.mercadeo_id,
        selectedCliente: this.cliente,
      };
      if (this.showType.id === 2) {
        Object.assign(sendData.mercadeo_id, {
          property: this.inmueble,
        });
      }

      if (this.specialType) {
        Object.assign(sendData, { message: this.message });
      }

      await this.$store
        .dispatch("appMercadeo/sendNotifications", sendData)
        .then(() => {
          this.title = "";
          this.body = "";
          this.send_date = "";
          this.cliente = [];
          this.inmueble = [];

          if (this.dateState) {
            this.$swal({
              title: "Programado!",
              text: "Email programado! Tu correo se enviara mas tarde",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              confirmButtonText: "Cerrar",
              buttonsStyling: false,
            });
          } else {
            this.loadingEmail=false;

            this.$swal({
              title: "Enviado!",
              text: "Tu E-Mail ha sido enviado",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              confirmButtonText: "Cerrar",
              buttonsStyling: false,
            });
          }
          this.overlay = false;
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            position: "top-center",
            props: {
              title: "Algo salio mal",
              icon: "CoffeeIcon",
              variant: "danger",
              text: "Intentalo mas tarde",
            },
          });
          this.overlay = false;
        });
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

      this.$router.push({ name: "programar-email" });
    },
  },
};
</script>
<style lang="scss" >
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
<style lang="scss" scoped>




label[for] {
  cursor: pointer;
}

.theme_logo{
  display: block;
  max-width: 300px;
  height: auto;
  margin: 0 auto;
  margin-top: 2rem;
}

.container-email{
  width: 100%;
  display: flex;
  justify-content: space-around;

}
.email__card_form{
  width:56%;
  padding: 1rem 0;
  height: 100vh;
  overflow-y: scroll;
}
.email__card_prev{
  width: 42%;
  height: 100vh;
  overflow-y: scroll;

  .container_prev{
    width: 600px;
    overflow-x: auto;
  }
  .title_card{
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
  }
}

.icon_pagination{
  width: 22px;
  height: 20px;
  margin: auto 0;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
table.vgt-table td {
  vertical-align: middle;
}
.btn-trash {
  padding: 0.5rem;
}
.flatpickr-confirm.darkTheme {
  cursor: pointer;
  background: var(--success);
  color: #fff;
  padding: 5px 15px !important;
}
.flatpickr-confirm.darkTheme svg {
  margin-left: 10px;
}
.flatpickr-confirm.darkTheme svg * {
  fill: currentColor;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.box_solid{
  border: 2px solid #7367ef;
  padding: 6px;
  border-radius: 10px;
}
@media (max-width:650px) {
  .email__card_prev{
    display: none;
  }
}

@media (max-width:1000px) {
  .email__card_form{
    width: 100% ;
  }
  .email__card_prev{
    width: 100% ;
  }

  .container-email{
    flex-direction: column;
    gap: 1rem;
  }
}




</style>
