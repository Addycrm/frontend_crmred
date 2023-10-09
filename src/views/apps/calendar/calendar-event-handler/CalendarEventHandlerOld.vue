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
            <feather-icon
              v-if="eventLocal.id"
              icon="TrashIcon"
              class="cursor-pointer"
              @click="
                $emit('remove-event');
                hide();
              "
            />
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
              name="Calendar"
              rules="required"
            >
              <b-form-group
                label="Tipo de cita"
                label-for="calendar"
                :state="getValidationState(validationContext)"
              >
                <v-select
                  v-model="eventLocal.extendedProps.t_cita"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
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
            <validation-provider
              #default="validationContext"
              name="Start Date"
              rules="required"
            >
              <b-form-group
                label="Fecha inicial"
                label-for="start-date"
                :state="getValidationState(validationContext)"
              >
                <VueCtkDateTimePicker
                  label="Seleciona tu fecha"
                  :no-button-now="true"
                  v-model="eventLocal.start"
                />
                <!-- <flat-pickr
                  v-model="eventLocal.start"
                  class="form-control"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                /> -->
                <b-form-invalid-feedback
                  :state="getValidationState(validationContext)"
                >
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- End Date -->
            <validation-provider
              #default="validationContext"
              name="End Date"
              rules="required"
            >
              <b-form-group
                label="Fecha final"
                label-for="end-date"
                :state="getValidationState(validationContext)"
              >
                <VueCtkDateTimePicker
                  label="Seleciona tu fecha"
                  :no-button-now="true"
                  v-model="eventLocal.end"
                />

                <b-form-invalid-feedback
                  :state="getValidationState(validationContext)"
                >
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Guests -->
            <b-form-group label="Seleccionar Cliente" label-for="add-guests">
              Seleccionar Cliente

              <b-button @click="info($event.target)" variant="success"
                >+</b-button
              >
              <hr />
             
              <table id="customers" v-if="eventLocal.extendedProps.cliente_id != null">
                <tr>
                  <th>Correo</th>
                  <th>Nombre</th>
                </tr>
                <tr>
                  <td>
                    {{ eventLocal.extendedProps.cliente_id.correos[0].email }}
                  </td>
                  <td>
                    {{ eventLocal.extendedProps.cliente_id.nombre }}
                  </td>
                </tr>
              </table>
            </b-form-group>

           

            <b-form-group label="Seleccionar Inmueble" label-for="add-guests">
              Seleccionar inmueble

              <b-button
                @click="infoInmuebleModal($event.target)"
                variant="success"
                >+</b-button
              >
           
              <hr />
              <table id="customers" v-if="eventLocal.extendedProps.inmueble_id != null">
                <tr>
                  <th>Nombre</th>
                  <th>Direccion</th>
                </tr>
                <tr>
                  <td>
                    {{ eventLocal.extendedProps.inmueble_id.titulo_inmueble }}
                  </td>
                  <td>
                    {{ eventLocal.extendedProps.inmueble_id.direccion }}
                  </td>
                </tr>
              </table>
            </b-form-group>

            <!-- Location -->
            <b-form-group label="Direccion" label-for="event-location">
              <b-form-input
                id="event-location"
                v-model="eventLocal.extendedProps.direccion"
                trim
                placeholder=""
              />
            </b-form-group>

            <!-- Textarea -->
            <b-form-group label="Notas" label-for="event-description">
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
      <v-modal v-if="modalState" @close="modalState = false" titulo="Seleccionar cliente" size="lg" footer>
        <TablaClientes elegirCliente ref="clientesTabla" @sendActive="sendActive"/>
        <template #footer>
          <b-button variant="success" size="sm" @click="getCliente" :disabled="sendState">
            Seleccionar
          </b-button>
        </template>
      </v-modal>
    </transition>
    <modal-cliente ref="modalClientes" />
    <modal-inmueble ref="modalInmueble" />
    <modal-estado-cita ref="modalEstadoCita"/>
  </div>
</template>

<script>
import VModal from "@/views/componente/vModal";
import TablaClientes from '@/views/apps/clientes/clientes-list/tablaClientes'

import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import Ripple from "vue-ripple-directive";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email, url } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import { ref, toRefs } from "@vue/composition-api";
import useCalendarEventHandler from "./useCalendarEventHandler";
import modalClientesVue from "@/views/componente/modalClientes.vue";
import modalInmueblesVue from "../../mercadeo/email/components/modalInmuebles.vue";
import modalEstadoCitaVue from '@/views/componente/modal-estado-cita.vue';

export default {
  components: {
    VModal,
    TablaClientes,
    vSelect,
    flatPickr,
    ValidationProvider,
    ValidationObserver,
    "modal-cliente": modalClientesVue,
    "modal-inmueble": modalInmueblesVue,
    "modal-estado-cita": modalEstadoCitaVue
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
    return {
      required,
      email,
      url,
    };
  },
  methods: {
    info(button) {
      return this.$refs.modalClientes.info(button, "calendar");
    },

    infoInmuebleModal(data = null, button, type = "calendar") {
      return this.$refs.modalInmueble.info(data, button, type);
    },

    infoEstadoCita(item, button) {
      return this.$refs.modalEstadoCita.info(item, button)
    }
  },

  mounted() {
    this.$root.$on(
      "selectedClientesCalendar",
      function (payLoad) {
        if (this.payLoad != payLoad) {
          return (this.eventLocal.extendedProps.cliente_id = payLoad.selected[0]);
        }
      }.bind(this)
    );

    this.$root.$on(
      "selectedInmuebleModalCalendar",
      function (payLoad) {
        if (this.payLoad != payLoad) {
          this.eventLocal.extendedProps.inmueble_id = payLoad.selected[0];
        }
      }.bind(this)
    );
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

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.sidevar-letf {
  width: 30%;
}
</style>
