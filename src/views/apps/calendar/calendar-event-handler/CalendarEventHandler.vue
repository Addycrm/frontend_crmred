<template>
  <div>
    <b-sidebar
      id="sidebar-add-new-event"
      sidebar-class="sidebar-lg"
      :visible="isEventHandlerSidebarActive"
      bg-variant="white"
      class="sidevar-letf"
      backdrop
      no-header
      right
      @shown="showSideBar"
      @change="(val) => $emit('update:is-event-handler-sidebar-active', val)"
    >
      <template #default="{ hide }">
        <!-- Header -->
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            content-sidebar-header
            px-2
            py-1
          "
        >
          <h5 class="mb-0">
            {{ eventLocal.id ? "Actualizar" : "Agregar" }} Evento
          </h5>
          <div>
            <b-button class="btn-trash" variant="danger" size="sm" v-if="eventLocal.id" @click="$emit('remove-event'); hide(); ">
              <feather-icon icon="TrashIcon"class="cursor-pointer"/>
            </b-button>
            <feather-icon
              class="ml-1 cursor-pointer"
              icon="XIcon"
              size="16"
              @click="hide"
            />
          </div>
        </div>

        <!-- Body -->
        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
          <!-- Form -->
          <b-form
            class="p-2"
            @submit.prevent="handleSubmit(onSubmit)"
            @reset.prevent="resetForm"
          >
            <!-- Calendar -->
            <validation-provider
              #default="validationContext"
              name="Tipo de cita"
              rules="required"
            >

              <b-form-group
                label="Tipo de cita"
                class="required"
              >
                <v-select
                  v-model="eventLocal.extendedProps.t_cita"
                  :options="calendarOptions"
                  label="label"
                  input-id="calendar"
                >
                  <template #option="{ color, label }">
                    <div
                      class="rounded-circle d-inline-block mr-50"
                      :class="`bg-${color}`"
                      style="height: 10px; width: 10px"
                    />
                    <span> {{ label }}</span>
                  </template>

                  <template #selected-option="{ color, label }">
                    <div
                      class="rounded-circle d-inline-block mr-50"
                      :class="`bg-${color}`"
                      style="height: 10px; width: 10px"
                    />
                    <span> {{ label }}</span>
                  </template>
                </v-select>

                <b-form-invalid-feedback
                  :state="getValidationState(validationContext)"
                >
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Start Date -->
              <b-form-group label="Fecha inicial" class="required">
                <flat-pickr
                  v-model="eventLocal.start"
                  name="fechaInicio"
                  class="form-control"
                  :config="{
                    enableTime: true,
                    time_24hr: false,
                    locale,
                    dateFormat: 'Y-m-d G:i K',
                    plugins,
                  }"
                />
              <validation-provider #default="validationContext" name="Fecha inicio" rules="required">
                <input type="hidden" v-model="eventLocal.start">
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Fecha final" class="required">
              <flat-pickr
                v-model="eventLocal.end"
                name="fechaInicio"
                class="form-control"
                :config="{
                  enableTime: true,
                  time_24hr: false,
                  locale,
                  dateFormat: 'Y-m-d G:i K',
                  plugins,
                }"
              />
              <validation-provider #default="validationContext" name="Fecha final" rules="required">
                <input type="hidden" v-model="eventLocal.end">
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-form-group>

            <!-- End Date -->
            <b-form-group label="Cliente">
              <table v-if="cliente" class="table table-striped mb-1">
                <tbody>
                  <tr>
                    <th scope="row">ID:</th>
                    <td>{{ eventLocal.extendedProps.cliente_id.id }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Cliente:</th>
                    <td>{{ eventLocal.extendedProps.cliente_id.nombre }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Teléfono:</th>
                    <td>{{ eventLocal.extendedProps.cliente_id.main_cell_phone }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email:</th>
                    <td>{{ eventLocal.extendedProps.cliente_id.main_mail }}</td>
                  </tr>
                </tbody>
              </table>
              <b-row>
                <b-col v-show="!cliente" cols="auto" class="flex-grow-1">
                  <b-form-input
                    name="cliente"
                    :value="cliente"
                    placeholder="Elija un cliente"
                    trim
                    readonly
                  ></b-form-input>
                </b-col>
                <b-col cols="auto">
                  <b-button
                    variant="success"
                    @click="
                      openModal({
                        component: 'TablaClientes',
                        target: 'cliente',
                        id: 'cliente_id',
                      })
                    "
                    >{{ !cliente ? "+" : "Cambiar cliente" }}</b-button
                  >
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group label="Inmueble">
              <table v-if="inmueble" class="table table-striped mb-1">
                <tbody>
                  <tr>
                    <th scope="row">ID:</th>
                    <td>{{ eventLocal.extendedProps.inmueble_id.id }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Propiedad:</th>
                    <td>{{ eventLocal.extendedProps.inmueble_id.titulo_inmueble }}</td>
                  </tr>
                </tbody>
              </table>
              <b-row>
                <b-col v-show="!inmueble" cols="auto" class="flex-grow-1">
                  <b-form-input
                    name="inmueble"
                    :value="inmueble"
                    placeholder="Elija un inmueble"
                    trim
                    readonly
                  ></b-form-input>
                </b-col>
                <b-col cols="auto">
                  <b-button
                    variant="success"
                    @click="
                      openModal({
                        component: 'TableInmueble',
                        target: 'inmueble',
                        id: 'inmueble_id',
                      })
                    "
                    >{{ !inmueble ? "+" : "Cambiar inmueble" }}</b-button
                  >
                </b-col>
              </b-row>
            </b-form-group>
    

            <!-- Location -->
            <b-form-group label="Direccion">
              <b-form-input
                id="event-location"
                v-model="eventLocal.extendedProps.direccion"
                trim
                placeholder=""
              />
            </b-form-group>

            <!-- Textarea -->
            <b-form-group label="Notas">
              <b-form-textarea
                id="event-description"
                v-model="eventLocal.extendedProps.nota"
              />
            </b-form-group>

            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
              >
                {{ eventLocal.id ? "Actualizar" : "Agregar " }}
              </b-button>

              <b-button
                v-if="eventLocal.id"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="warning"
                @click="infoEstadoCita(eventLocal.id, $event.targuet)"
                class="mr-2"
              >
                Estado cita
              </b-button>
            </div>
          </b-form>
        </validation-observer>
      </template>
    </b-sidebar>
    <transition name="fade">
      <v-modal v-if="modalState" @close="modalState = false" :titulo="'Seleccionar ' + target" size="lg" footer >
        <components :is="tableList" elegir ref="tableList" @sendActive="sendActive"/>
        <template #footer>
          <b-button variant="success" @click="getValue({ target, id })" :disabled="sendState">
            Seleccionar
          </b-button>
        </template>
      </v-modal>
    </transition>
    <modal-estado-cita ref="modalEstadoCita" />
  </div>
</template>

<script>
import VModal from "@/views/componente/vModal";
import TablaClientes from "@/views/apps/clientes/clientes-list/tablaClientes";
import TableInmueble from "@/views/apps/inmuebles/inmueble-list/tableInmueble";

import vSelect from "vue-select";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";

import Ripple from "vue-ripple-directive";
import {ValidationProvider, ValidationObserver, setInteractionMode, extend, } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

import { required, email, url } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import { ref, toRefs } from "@vue/composition-api";
import useCalendarEventHandler from "./useCalendarEventHandler";
import modalClientesVue from "@/views/componente/modalClientes.vue";
import modalInmueblesVue from "../../mercadeo/email/components/modalInmuebles.vue";
import modalEstadoCitaVue from "@/views/componente/modal-estado-cita.vue";

export default {
  components: {
    VModal,
    TablaClientes,
    TableInmueble,
    vSelect,
    ValidationProvider,
    ValidationObserver,
    "modal-cliente": modalClientesVue,
    "modal-inmueble": modalInmueblesVue,
    "modal-estado-cita": modalEstadoCitaVue,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: "isEventHandlerSidebarActive",
    event: "update:is-event-handler-sidebar-active",
  },
  props: {
    isEventHandlerSidebarActive: {
      type: Boolean,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
    clearEventData: {
      type: Function,
      required: true,
    },
  },
  data() {
    setInteractionMode("eager");
    Object.keys(rules).forEach((rule) => {
      extend(rule, rules[rule]);
    });
    return {
      modalState: false,
      sendState: true,
      required,
      email,
      url,
      locale: Spanish,
      plugins: [
        new confirmDatePlugin({
          confirmText: "Agregar",
          showAlways: true,
          theme: "dark",
        }),
      ],
      cliente: null,
      inmueble: null,
      tableList: null,
      target: null,
      id: null,
    };
  },
  computed: {
    dataEvento() {
      return {
        cliente_id: JSON.parse(this.eventLocal.extendedProps.cliente_id),
        inmueble_id: JSON.parse(this.inmueble),
      };
    },
  },
  methods: {
    showSideBar(){
      if(!this.eventLocal.id){
        this.cliente = null;
        this.inmueble = null;
      }
    },
    sendActive(e) {
      this.sendState = e;
    },
    openModal({ component, target, id }) {
      this.tableList = component;
      this.target = target;
      this.id = id;
      this.modalState = true;
    },
    getValue({ target, id }) {
      let value = this.$refs["tableList"].sendValue();
      Object.assign(this.eventLocal.extendedProps, {
        [id]: value,
      });
      
      this[target] = JSON.stringify(value);
      this.modalState = false;
    },
    info(button) {
      return this.$refs.modalClientes.info(button, "calendar");
    },

    infoInmuebleModal(data = null, button, type = "calendar") {
      return this.$refs.modalInmueble.info(data, button, type);
    },

    infoEstadoCita(item, button) {
      return this.$refs.modalEstadoCita.info(item, button);
    },
  },
  updated(){
    /*if(this.eventLocal.id){
      this.cliente = JSON.stringify(this.eventLocal.extendedProps.cliente_id);
      this.inmueble = JSON.stringify(this.eventLocal.extendedProps.inmueble_id);
    }else{
      // this.cliente = null;
      // this.inmueble = null;
    }*/
  },
  mounted() {
    /*this.$root.$on(
      "selectedClientesCalendar",
      function (payLoad) {
        if (this.payLoad != payLoad) {
          this.cliente = payLoad.selected[0];
          return (this.eventLocal.extendedProps.cliente_id = payLoad.selected[0]);
        }
      }.bind(this)
    );

    this.$root.$on(
      "selectedInmuebleModalCalendar",
      function (payLoad) {
        if (this.payLoad != payLoad) {
          this.inmueble = payLoad.selected[0];
          this.eventLocal.extendedProps.inmueble_id = payLoad.selected[0];
        }
      }.bind(this)
    );*/
  },

  setup(props, { emit }) {
    const clearFormData = ref(null);

    const {
      eventLocal,
      resetEventLocal,
      calendarOptions,

      // UI
      onSubmit,
      guestsOptions,
    } = useCalendarEventHandler(toRefs(props), clearFormData, emit);

    const { refFormObserver, getValidationState, resetForm, clearForm } =
      formValidation(resetEventLocal, props.clearEventData);

    clearFormData.value = clearForm;
    return {
      // Add New Event
      eventLocal,
      calendarOptions,
      onSubmit,
      guestsOptions,

      // Form Validation
      resetForm,
      refFormObserver,
      getValidationState,
    };
  },
};
</script>
<style>
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
.btn.btn-trash {border-radius: 3em;padding: 0.5em;margin-top: -0.4em;margin-bottom: -0.4em;}
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.sidevar-letf {
  width: 30%;
}
</style>
