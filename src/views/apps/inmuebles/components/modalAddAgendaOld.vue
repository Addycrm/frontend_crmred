<template>
  <b-modal
    :id="infoModal.id"
    size="lg"
    ref="modal-add-agenda"
    title="Asignar Cita Inmueble"
    ok-title="Sincronizar"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    hide-footer
  >
    <validation-observer ref="validateAddAgenda">
      <!-- Form -->
      <b-form class="p-2">
        <validation-provider
          #default="{ errors }"
          name="Calendar"
          rules="required"
        >
          <b-form-group
            label="Tipo de cita"
            label-for="calendar"
            :state="errors.length > 0 ? false : null"
          >
            <v-select
              v-model="data.extendedProps.t_cita"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="citas"
              label="label"
              input-id="calendar"
            >
              <template #option="{ color, label }">
                <div
                  class="rounded-circle d-inline-block mr-50"
                  :class="`bg-${color}`"
                  style="height: 10px; width: 10px;  `bg-${color}`"
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

            <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <!-- Start Date -->
        <validation-provider
          #default="{ errors }"
          name="Start Date"
          rules="required"
        >
          <b-form-group
            label="Fecha inicial"
            label-for="start-date"
            :state="errors.length > 0 ? false : null"
          >
            <VueCtkDateTimePicker
              label="Seleciona tu fecha"
              :no-button-now="true"
              v-model="data.start"
            />
            <!-- <flat-pickr
                  v-model="data.extendedProps.start"
                  class="form-control"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                /> -->
            <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <!-- End Date -->
        <validation-provider
          #default="{ errors }"
          name="End Date"
          rules="required"
        >
          <b-form-group
            label="Fecha final"
            label-for="end-date"
            :state="errors.length > 0 ? false : null"
          >
            <VueCtkDateTimePicker
              label="Seleciona tu fecha"
              :no-button-now="true"
              v-model="data.end"
            />

            <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <!-- Guests -->
        <b-form-group label="Seleccionar Cliente" label-for="add-guests">
          Seleccionar Cliente

          <b-button
            @click="infoSeleccionarCliente($event.target)"
            variant="success"
            >+</b-button
          >
          <hr />
          <table id="customers" v-if="data.extendedProps.cliente_id != null">
            <tr>
              <th>Correo</th>
              <th>Nombre</th>
            </tr>
            <tr>
              <td>
                {{ data.extendedProps.cliente_id.correos[0].email }}
              </td>
              <td>
                {{ data.extendedProps.cliente_id.nombre }}
              </td>
            </tr>
          </table>
        </b-form-group>

        <!-- <b-form-group label="Seleccionar Inmueble" label-for="add-guests">
          Seleccionar Inmueble

          <b-button
            @click="infoSeleccionarInmueble($event.target)"
            variant="success"
            >+</b-button
          >
          <hr /> -->
        Inmueble Seleccionado
        <table id="customers" v-if="data.extendedProps.inmueble_id != null">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Direccion</th>
          </tr>
          <tr>
            <td>
              {{ data.extendedProps.inmueble_id.id }}
            </td>
            <td>
              {{ data.extendedProps.inmueble_id.titulo_inmueble }}
            </td>
            <td>
              {{ data.extendedProps.inmueble_id.direccion }}
            </td>
          </tr>
        </table>
        <!-- </b-form-group> -->

        <!-- Location -->
        <b-form-group label="Direccion" label-for="event-location">
          <b-form-input
            id="event-location"
            v-model="data.extendedProps.direccion"
            trim
            placeholder=""
          />
        </b-form-group>

        <!-- Textarea -->
        <b-form-group label="Notas" label-for="event-description">
          <b-form-textarea
            id="event-description"
            v-model="data.extendedProps.nota"
          />
        </b-form-group>

        <!-- Form Actions -->
        <div class="d-flex mt-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-2"
            @click.prevent="validationForm"
            type="submit"
          >
            Agregar
          </b-button>
        </div>
      </b-form>
    </validation-observer>
    <modal-cliente ref="modalClientes" />
    <modal-inmuebles ref="modalInmueble" />
  </b-modal>
</template>

<script>
import {
  BModal,
  BSidebar,
  BForm,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BAvatar,
  BFormTextarea,
  BButton,
  BFormInvalidFeedback,
} from "bootstrap-vue";

import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email, url } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import Ripple from "vue-ripple-directive";
import modalClientesVue from "@/views/componente/modalClientes.vue";
import modalInmueblesVue from "../../mercadeo/email/components/modalInmuebles.vue";

export default {
  name: "edictRole",
  components: {
    BModal,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BAvatar,
    BFormTextarea,
    BButton,
    BFormInvalidFeedback,
    vSelect,
    flatPickr,
    formValidation,
    ValidationProvider,
    ValidationObserver,
    required,
    email,
    url,
    "modal-cliente": modalClientesVue,
    "modal-inmuebles": modalInmueblesVue,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      infoModal: {
        id: "modal-add-agenda",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      selected: [],
      aprobe: true,
      data: {
        extendedProps: {
          cliente_id: null,
          inmueble_id: null,
        },
      },
      show_spinner_sin: false,
    };
  },

  computed: {
    usuario() {
      return this.$store.state.userdata.extendedProps.userData;
    },
    portales() {
      return this.$store.state.appPortales.portales;
    },

    citas() {
      return this.$store.state.appCalendar.calendarOptions;
    },
  },

  mounted() {
    this.$root.$on(
      "selectedClientesInmuebles",
      function (payLoad) {
        if (this.payLoad != payLoad) {
          this.data.extendedProps.cliente_id = payLoad.selected[0];
        }
      }.bind(this)
    );

    this.$root.$on(
      "selectedInmuebleModal",
      function (payLoad) {
        if (this.payLoad != payLoad) {
          this.data.extendedProps.inmueble_id = payLoad.selected[0];
        }
      }.bind(this)
    );
  },

  methods: {
    info(code, button) {
      this.data = { extendedProps: { cliente_id: null, inmueble_id: null } };
      this.data.extendedProps.inmueble_id = code;
      this.getTiposDeCitas();
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    infoSeleccionarInmueble(data = null, button, type = "inmueble") {
      return this.$refs.modalInmueble.info(data, button, type);
    },
    infoSeleccionarCliente(button) {
      return this.$refs.modalClientes.info(button, "inmueble");
    },

    getTiposDeCitas() {
      this.$store
        .dispatch("appCalendar/fetchTipoCitas")
        .then(() => {})
        .catch(() => {});
    },

    hideModal() {
      this.$refs["modal-add-agenda"].hide();
    },

    validationForm() {
      this.$refs.validateAddAgenda.validate().then((success) => {
        if (success) {
          this.$store
            .dispatch("appCalendar/addEvent", { event: this.data })
            .then(() => {
              this.$swal({
                title: "Excelente!",
                text: "Tu evento se registro correctamente!",
                icon: "success",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
              });
            })
            .catch((error) => {
              this.$swal({
                title: "Algo salio mal!",
                text: error,
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
              });
            });
        }
        this.hideModal();
      });
    },

    getPortales() {
      this.$store
        .dispatch("appPortales/fetchPortales")
        .then((response) => {})
        .catch((error) => {
        });
    },

    getCredencialesPortalesUser(portal) {
      this.$store
        .dispatch("appPortales/addCredencialesPortalesUser", {
          portal: data,
          user_id: this.usuario.id,
          email: this.data.extendedProps.email,
          user: this.data.extendedProps.user,
          token: this.data.extendedProps.token,
        })
        .then((response) => {
        })
        .catch((error) => {
        });
    },

    addCredencialesPortalesUser(data) {
      this.$store
        .dispatch("appPortales/addCredencialesPortalesUser", {
          portal: data,
          user_id: this.usuario.id,
          email: this.data.extendedProps.email,
          user: this.data.extendedProps.user,
          token: this.data.extendedProps.token,
        })
        .then(() => {
          this.data = null;
          this.show_spinner_sin = false;
        })
        .catch((error) => {
        });
    },
  },
};
</script>

<style lang="scss">
.img-responsive {
  width: 65%;
  max-width: 60%;
  height: 70%;
}
</style>

