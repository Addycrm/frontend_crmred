<template>
  <div id="modalAgendar">
    <ValidationObserver ref="modalAgendar">
      <b-form>
        <b-row>
          <b-col cols="12">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group label="Tipo de cita" class="required" :state="!(errors.length > 0)">
                <v-select
                  v-model="form.t_cita"
                  :options="tipoCita"
                  :reduce="type => type.id"
                  label="label"
                >
                  <template v-slot:option="{ color, label }">
                    <div
                      class="rounded-circle d-inline-block mr-50"
                      :class="`bg-${color}`"
                      style="height: 10px; width: 10px"
                    />
                    <span>{{ label }}</span>
                  </template>
                  <template v-slot:selected-option="{ color, label }">
                    <div
                      class="rounded-circle d-inline-block mr-50"
                      :class="`bg-${color}`"
                      style="height: 10px; width: 10px"
                    />
                    <span>{{ label }}</span>
                  </template>
                </v-select>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group label="Fecha inicio" class="required" :state="!(errors.length > 0)">
                <input type="hidden" v-model="form.start">
                <flat-pickr
                  v-model="form.start"
                  name="fechaInicio"
                  class="form-control"
                  :config="{enableTime: true, time_24hr: false, locale, dateFormat: 'Y-m-d G:i K', plugins}"
                />
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col cols="6">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group label="Fecha final" class="required" :state="!(errors.length > 0)">
                <input type="hidden" v-model="form.end">
                <flat-pickr
                  v-model="form.end"
                  name="fechaInicio"
                  class="form-control"
                  :config="{enableTime: true, time_24hr: false, locale, dateFormat: 'Y-m-d G:i K', plugins}"
                />
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Asignar Asesor">
              <v-select
                v-model="form.assignee"
                :options="storeConfig.agentes"
                :reduce="type => type.id"
                label="primer_nombre"
                class="assignee-selector"
              >
              </v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Cliente" >
              <table v-if="form.cliente_id" class="table table-striped mb-1">
                <tbody>
                  <tr>
                    <th scope="row">ID:</th>
                    <td>{{form.cliente_id.id}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Nombre Cliente:</th>
                    <td>{{form.cliente_id.nombre}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Teléfono:</th>
                    <td>{{form.cliente_id.main_cell_phone}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email:</th>
                    <td>{{form.cliente_id.main_mail}}</td>
                  </tr>
                </tbody>
              </table>
              <b-row>
                <b-col v-show="!form.cliente_id" cols="auto" class="flex-grow-1">
                  <b-form-input class="mt-1" name="cliente" v-model="form.cliente_id" placeholder="Elija un cliente" trim readonly></b-form-input>
                </b-col>
                <b-col cols="auto">
                  <b-button variant="success" class="mt-1" @click="modalState = true">{{!form.cliente_id ? 'Buscar cliente' : 'Cambiar cliente'}}</b-button>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Inmueble">
              <table class="table table-striped">
                <tbody>
                  <tr v-if="form.inmueble_id.id">
                    <th scope="row">ID:</th>
                    <td>{{form.inmueble_id.id}}</td>
                  </tr>
                  <tr v-if="form.inmueble_id.titulo_inmueble">
                    <th scope="row">Propiedad:</th>
                    <td>{{form.inmueble_id.titulo_inmueble}}</td>
                  </tr>
                  <tr v-if="!form.inmueble_id.mls">
                    <th scope="row">Dirección:</th>
                    <td>{{`${form.inmueble_id.direccion}`}}</td>
                  </tr>
                </tbody>
              </table>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Dirección">
              <b-form-input v-model="form.direccion" trim />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Nota">
              <b-form-textarea v-model="form.nota" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
    <transition name="fade">
      <v-modal v-if="modalState" @close="modalState = false" titulo="Seleccionar cliente" size="lg" footer>
        <TablaClientes elegir ref="clientesTabla" @sendActive="sendActive"/>
        <template #footer>
          <b-button variant="success" @click="getCliente" :disabled="sendState">
            Seleccionar
          </b-button>
        </template>
      </v-modal>
    </transition>
  </div>
</template>

<script>
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import { Spanish } from "flatpickr/dist/l10n/es.js"
import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";

import VModal from "@/views/componente/vModal";
import modalInmueblesVue from "../../mercadeo/email/components/modalInmuebles.vue";
import TablaClientes from '@/views/apps/clientes/clientes-list/tablaClientes'

import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from "vee-validate";
import * as rules from 'vee-validate/dist/rules';
import mixinApis from '@/views/componente/mixinApis'

export default {
  name: "ModalAgendar",
  mixins:[mixinApis],
  components: {
    ValidationObserver,
    ValidationProvider,
    VModal,
    vSelect,
    flatPickr,
    TablaClientes,
  },
  props:{
    form: Object,
  },
  inject: {
    interesado: {
      from: 'interesado',
      default: () => {}
    },
  },
  data() {
    setInteractionMode("eager");
    Object.keys(rules).forEach((rule) => {
      extend(rule, rules[rule]);
    });
    return {
      modalState: false,
      sendState:true,
      locale: Spanish,
      plugins: [
        new confirmDatePlugin({
          confirmText: "Agregar",
          showAlways: true,
          theme: "dark",
        }),
      ],
      apiOptions: [
        {
          api: 'appConfiguracion/getTaskTag',
          data: {}
        },
      ]
    };
  },
  mounted(){
    this.initApis(this.apiOptions);
    if(this.interesado){
      if(Object.keys(this.interesado).length)
        this.form.cliente_id = this.interesado.value;
    }

  },
  computed: {
    storeConfig(){
      return this.$store.state.appConfiguracion.options
    },
    tipoCita(){
      return this.$store.state.appConfiguracion.tags.tcita;
    }
  },
  methods: {
    getCliente(){
      Object.assign(this.form, {
        cliente_id: this.$refs['clientesTabla'].sendValue()
      });

      this.modalState = false
    },
    sendActive(e){
      this.sendState = e;
    },
    onSubmit(){
      return new Promise(resolve => {
        this.$refs['modalAgendar'].validate()
        .then(state => {
          if(state){
            let calendar = {event: {}};
            for(let prop in this.form)
              if(this.form[prop] != null)
                Object.assign(calendar.event, {[prop]: this.form[prop].id ? this.form[prop].id : this.form[prop] })
            resolve(calendar);
          }
        });
      })
    },
  },
};
</script>
<style>
.flatpickr-confirm.darkTheme {cursor: pointer; background: var(--success); color: #fff; padding: 5px 15px !important; }
.flatpickr-confirm.darkTheme svg {margin-left: 10px; }
.flatpickr-confirm.darkTheme svg * {fill: currentColor; }
.fade-enter-active, .fade-leave-active {transition: opacity .5s }
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {opacity: 0 }
.labelInmueble {display: block;font-size: 16px;font-weight: 700;text-transform: uppercase;margin-bottom: 10px;}
.table th {font-weight: 500;}
.inputRequired {color: var(--danger);font-weight: 500;position: absolute;right: 25px;bottom: 5px;font-size: 10px;}
.form-group {position: relative;}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.img-responsive {
  width: 65%;
  max-width: 60%;
  height: 70%;
}

</style>

