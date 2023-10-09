<template>
  <div id="CalendarForm">
    <ValidationObserver ref="FormObserver">
      <b-form>
        <ValidationProvider v-slot="{ errors }" name="Tipo de cita" rules="required">
          <b-form-group label="Tipo de cita" class="required" :state="!(errors.length > 0)">
            <v-select v-model="calendar.event.t_cita" :options="tipoCita" :reduce="type => type.id" label="label">
              <template v-slot:option="{ color, label }">
                <div class="rounded-circle d-inline-block mr-50" :class="`bg-${color}`"
                  style="height: 10px; width: 10px" />
                <span>{{ label }}</span>
              </template>
              <template v-slot:selected-option="{ color, label }">
                <div class="rounded-circle d-inline-block mr-50" :class="`bg-${color}`"
                  style="height: 10px; width: 10px" />
                <span>{{ label }}</span>
              </template>
            </v-select>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required">
          <b-form-group label="Fecha Inicial" class="required" :state="!(errors.length > 0)">
            <input type="hidden" :value="calendar.event.start">
            <flat-pickr v-model="calendar.event.start" name="fechaInicio" class="form-control"
              :config="{ enableTime: true, time_24hr: false, locale, plugins, dateFormat: 'Y-m-d h:i K' }" />
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required">
          <b-form-group label="Fecha Final" class="required" :state="!(errors.length > 0)">
            <input type="hidden" :value="calendar.event.end">
            <flat-pickr v-model="calendar.event.end" name="fechaFinal" class="form-control"
              :config="{ enableTime: true, time_24hr: false, locale, plugins, dateFormat: 'Y-m-d h:i K' }" />
          </b-form-group>
        </ValidationProvider>
        <!-- <b-form-group label="Asignar Asesor" v-if="$can('assignee', 'agendas')"> -->
        <b-form-group label="Asignar Asesor">
          <v-select v-model="calendar.event.assignee" :options="storeConfig.agentes" :reduce="type => type.id"
            label="primer_nombre" class="assignee-selector">
          </v-select>
        </b-form-group>
        <b-form-group label="Cliente">
          <table v-if="calendar.event.cliente_id" class="table table-striped mb-1">
            <tbody>
              <tr>
                <th scope="row">ID:</th>
                <td>{{ calendar.event.cliente_id.id }}</td>
              </tr>
              <tr>
                <th scope="row">Cliente:</th>
                <td>{{ calendar.event.cliente_id.nombre }}</td>
              </tr>
              <tr v-if="calendar.event.cliente_id.main_cell_phone">
                <th scope="row" >Teléfono:</th>
                <td>{{ calendar.event.cliente_id.main_cell_phone }}
                  <span >
                    <b-img thumbnail class="img-width-contact" :src="require('@/assets/images/redes/phone.png')"
                      @click="openLink(calendar.event.cliente_id.main_cell_phone)" alt="Image 1"></b-img>
                  </span>

                </td>
              </tr>
              <tr>
                <th scope="row">Email:</th>
                <td>{{ calendar.event.cliente_id.main_mail }}</td>
              </tr>
            </tbody>
          </table>
          <b-row align-v="center">
            <b-col v-show="!calendar.event.cliente_id" cols="auto" class="flex-grow-1">
              <b-form-input name="cliente" placeholder="Elija un cliente" trim readonly></b-form-input>
            </b-col>
            <b-col cols="auto">
              <b-button :pill="!calendar.event.cliente_id" :class="{ 'btn-icon': !calendar.event.cliente_id }"
                variant="success" class="d-inline-flex justify-content-center align-items-center" @click="
                  openModal({
                    component: 'TablaClientes',
                    target: 'cliente',
                    id: 'cliente_id',
                  })
                ">
                <svg v-if="!calendar.event.cliente_id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                  :style="{ width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '15px' }"
                  fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                </svg>
                <span v-else class="align-middle">Cambiar cliente</span>
              </b-button>
            </b-col>
          </b-row>
        </b-form-group>
        <b-form-group label="Inmueble">
          <table v-if="calendar.event.inmueble_id" class="table table-striped mb-1">
            <tbody>
              <tr>
                <th scope="row">ID:</th>
                <td>{{ calendar.event.inmueble_id.id }}</td>
              </tr>
              <tr>
                <th scope="row">Propiedad:</th>
                <td>{{ calendar.event.inmueble_id.titulo_inmueble }}</td>
              </tr>
            </tbody>
          </table>
          <b-row>
            <b-col v-show="!calendar.event.inmueble_id" cols="auto" class="flex-grow-1">
              <b-form-input name="inmueble" placeholder="Elija un inmueble" trim readonly></b-form-input>
            </b-col>
            <b-col cols="auto" class="d-flex flex-wrap" style="gap:8px;">
              <b-button :pill="!calendar.event.inmueble_id" :class="{ 'btn-icon': !calendar.event.inmueble_id }"
                variant="success" class="d-inline-flex justify-content-center align-items-center" @click="
                  openModal({
                    component: 'TableInmueble',
                    target: 'inmueble',
                    id: 'inmueble_id',
                  })
                ">
                <svg v-if="!calendar.event.inmueble_id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                  :style="{ width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '15px' }"
                  fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                </svg>
                <span v-else class="align-middle">Cambiar inmueble</span>
              </b-button>
              <div  v-if="selectInmueble">
                <b-button class="btn_detail-inmueble" v-if="$can('read', 'inmuebles')" 
                  :to="{
                    name: 'inmuebles-details',
                    params: { slug: selectInmueble.slug, code: 'FICHA_WEB' },
                  }" target="_blank">
                      Detalle inmueble
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-form-group>
        <b-form-group label="Dirección">
          <b-form-input v-model="calendar.event.direccion" trim />
        </b-form-group>
        <b-form-group label="Nota">
          <b-form-textarea v-model="calendar.event.nota" />
        </b-form-group>
      </b-form>
    </ValidationObserver>
    <transition name="fade">
      <v-modal v-if="modalState" @close="modalState = false" :titulo="'Seleccionar ' + modal.target" size="lg" footer>
        <components :is="modal.component" elegir ref="tableList" @sendActive="sendActive"
          :viewCalendarInmueble="viewCalendarInmueble" />
        <template #footer>
          <b-button variant="success" @click="getValue(modal)" :disabled="sendState">
            Seleccionar
          </b-button>
        </template>
      </v-modal>
    </transition>
  </div>
</template>

<script>
import VModal from "@/views/componente/vModal";
import TablaClientes from "@/views/apps/clientes/clientes-list/tablaClientes";
import TableInmueble from "@/views/apps/inmuebles/inmueble-list/tableInmueble";
import DetailsInmuebles from "../../inmuebles/components/detailsInmuebles.vue";
import vSelect from "vue-select";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";

import { ValidationProvider, ValidationObserver, setInteractionMode, extend, } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { reject } from "q";
import { resolve } from "path";
import moment from "moment";


export default {
  components: {
    VModal,
    TablaClientes,
    TableInmueble,
    vSelect,
    ValidationProvider,
    ValidationObserver,
    DetailsInmuebles
  },

  props: {
    calendar: Object,
  },
  data() {
    setInteractionMode("eager");
    this.viewCalendarInmueble = 'detail-list',
      Object.keys(rules).forEach((rule) => {
        extend(rule, rules[rule]);
      });
    return {
      sideBarState: false,
      selectInmueble: null,
      modalCitas: false,
      propCitas: null,

      modalState: false,
      sendState: true,

      locale: Spanish,
      plugins: [
        new confirmDatePlugin({
          confirmText: "Agregar",
          showAlways: true,
          theme: "dark",
        }),
      ],
      modal: {},
    };
  },
  computed: {
    storeConfig() {
      return this.$store.state.appConfiguracion.options
    },
    tipoCita() {
      return this.$store.state.appConfiguracion.tags.tcita;
    }
  },

  mounted() {
    this.selectInmueble = this.calendar.event.inmueble_id

    
  },
  methods: {

    openLink(tel) {
      window.open(`tel:${tel}`);
    },
    fechaFormating(value) {
      if (value) {
        let date = moment(value).format('YYYY-MM-DD HH:mm:ss');
        return date;
      }
    },
    sendActive(e) {
      this.sendState = e;
    },
    viewList() {

    },
    openModal({ component, target, id }) {

      Object.assign(this.modal, { component, target, id });
      this.modalState = true;
    },
    getValue({ target, id }) {
      let value = this.$refs["tableList"].sendValue();
      if(target==='inmueble'){
        this.selectInmueble = value;        
      }
      Object.assign(this.calendar.event, {
        [id]: value,
      });

      this.modalState = false;
    },
    validateData() {
      var dateNow =  moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss');
      // let dateNow = new Date()
      if(this.fechaFormating(this.calendar.event.start)>=dateNow){
        if(this.fechaFormating(this.calendar.event.end) > this.fechaFormating(this.calendar.event.start)){
          return {
            state:true
          }
        }else{
          return {
            state:false,
            error: "Por favor verifica la fecha final no puede ser menor a la fecha inicial."
          }
        }
      }else{
        return {
            state:false,
            error: `No se puede agendar cita para semanas anteriores a la  semana actual (${dateNow})`
          }
      }

    },
    onSubmit() {
      return new Promise(resolve => {
        this.$refs['FormObserver'].validate()
          .then(state => {
            if (state) {
              let calendar = { event: {} };
              if (this.calendar.id)
                calendar.id = this.calendar.id;
              for (let prop in this.calendar.event)
                if (this.calendar.event[prop] != null)
                  Object.assign(calendar.event, { [prop]: this.calendar.event[prop].id ? this.calendar.event[prop].id : this.calendar.event[prop] })
              resolve(calendar);
            } else {
              resolve(false);
            }
          });
      })
    },
    makeToast(text) {
      this.$bvToast.toast(text, {
        title: "Fechas no coinciden",
        variant: 'danger',
        solid: true,
      })
    },
  },
};
</script>
<style scoped>
.btn_detail-inmueble{
  background-color: var(--primary) !important;
}
.img-width-contact {
  min-width: 30px;
  max-height: 30px;
  margin-left: 6px;
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

.btn.btn-trash {
  border-radius: 3em;
  padding: 0.5em;
  margin-top: -0.4em;
  margin-bottom: -0.4em;
}
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.sidevar-letf {
  width: 30%;
}
</style>
