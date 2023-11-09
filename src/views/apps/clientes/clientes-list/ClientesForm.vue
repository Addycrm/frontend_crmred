<template>
  <ValidationObserver v-slot="data" ref="ClientesForm">
    <b-form id="ClientesForm">
      <b-row>
        <b-col cols="12" md="6">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <b-form-group label="Nombres" class="required">
              <b-form-input id="nombre" name="nombre" v-model="form.nombre" type="text" :state="errorState(errors)"/>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col cols="12" md="6">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <b-form-group label="Apellidos" class="required">
              <b-form-input id="apellido" name="apellido" v-model="form.apellido" type="text" :state="errorState(errors)"/>
            </b-form-group>
          </ValidationProvider>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group label="Tipo de cliente">
            <v-select
              input-id="tipo_cliente"
              v-model="form.tipo_cliente"
              label="nombre"
              :options="tipo_cliente"
              :reduce="type => type.id"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="6" v-if="optionsEmbudoForm">
          <b-form-group label="Embudo">
            <v-select
              input-id="embudoId"
              v-model="form.embudoId"
              label="name"
              :options="optionsEmbudoForm"
              :reduce="type => type.id"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="Estado" v-if="OptionsEstadoByID">
            <v-select
              v-model="form.estadoId"
              label="name"
              :options="OptionsEstadoByID"
              :reduce="type => type.id"
              :clearable="false"
              :disabled="(form.estadoId)?(OptionsEstadoByID.length>0)?false:true:false"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="6">
          <b-form-group label="Tipo de documento">
            <v-select
              input-id="tipo_documento"
              v-model="form.identification_type"
              label="nombre"
              :options="storeConfig.document_type"
              :reduce="type => type.id"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="Numero de identificación">
            <b-form-input
              id="identification_number"
              v-model="form.identification_number"
              type="number"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row style="position: relative; z-index:2;">
        <b-col cols="12" md="6">
          <ValidationProvider v-slot="{errors}" rules="required">
            <b-form-group label="Celular" class="required">
              <vue-phone-number-input
                ref="inputCelular"
                v-model="phone.main_cell_phone"
                :error="errors.length > 0"
                show-code-on-list
                :default-country-code="userData.phonecode"
                @update="(event) => {
                    form.main_cell_phone = event.nationalNumber;
                    wame.number = event.e164;
                    exampleLabel(event)
                  if(wame.state)
                    phone.whatsapp = event.e164;
                }"
                :translations="{
                  countrySelectorLabel: 'Código país',
                  countrySelectorError: 'Elije un código',
                  phoneNumberLabel: 'Celular',
                  example: 'Ejemplo :',
                }"
              />
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col cols="12" md="6">
          <ValidationProvider v-slot="{errors}" rules="required">
            <b-form-group label="WhatsApp" class="required">
              <vue-phone-number-input
                ref="whatsapp"
                v-model="phone.whatsapp"
                :error="errors.length > 0"
                show-code-on-list
                :default-country-code="userData.phonecode"
                @update="form.whatsapp = $event.e164"
                :translations="{
                  countrySelectorLabel: 'Código país',
                  countrySelectorError: 'Elije un código',
                  phoneNumberLabel: 'WhatsApp',
                  example: 'Ejemplo :',
                }"
                :disabled='wame.state'
              />
            </b-form-group>
          </ValidationProvider>
          <b-form-checkbox
            id="wame"
            v-model="wame.state"
            name="wame"
            class="mb-0 mt-1"
          >
            Usar el mismo numero de Celular
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <b-form-group label="Correo electrónico" class="required">
              <b-form-input id="main_mail" v-model="form.main_mail" type="email" :state="errorState(errors)"/>
            </b-form-group>
          </ValidationProvider>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="auto">
          <b-form-group label="Genero">
            <b-form-radio-group v-model="form.genero" name="genero">
              <b-form-radio v-for="item in storeConfig.gender" :key="item.id" :value="item.id">
                {{item.name}}
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col cols="auto" v-if="tipo != 'add'">
          <b-form-group label="Calificación del cliente">
            <b-form-rating v-model="form.clasificacion" variant="warning" no-border class="p-0" inline style="height:auto" size="lg"></b-form-rating>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="tipo != 'add'">
        <b-col cols="12"
          v-for="(value, prop) in ubicaciones"
          :key="prop"
        >
          <b-form-group :label="value.props.label">
            <v-select
              :input-id="prop"
              :options="prop == 'pais' ? storeConfig.country : ubicaciones[prop].options"
              v-model="ubicaciones[prop].value"
              :disabled="prop == 'pais' ? storeConfig.country.length == 0 : ubicaciones[prop].options.length == 0"
              @input="() => {
                value.props.api ?
                resetUbicacion(prop):
                null;
              }"
              label="name"
              :reduce="type => type.id"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="tipo != 'add'">
        <b-col>
          <b-form-group label="Observaciones">
            <div id="quill-toolbar" class="d-flex align-items-center justify-content-center">
              <button class="ql-bold" />
              <button class="ql-italic" />
              <button class="ql-underline" />
            </div>
            <quill-editor
              v-model="form.observaciones"
              :options="quillOption"
              id="quill-content"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <div v-if="data.failed" class="list-error">
        <div
          class="alert alert-danger p-1 mb-0 flex-grow-1 text-center"
          :style="{ fontSize: '14px' }"
        >
          <p>Uno o más campos obligatorios se encuentran vacios, Valida e intenta nuevamente. </p>
        </div>
      </div>
  </ValidationObserver>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";

import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from "vee-validate";
import * as rules from 'vee-validate/dist/rules';

import { quillEditor } from "vue-quill-editor";
import vSelect from "vue-select";
import "cleave.js/dist/addons/cleave-phone.us";
export default {

  name: 'ClientesForm',
  components: {
    ValidationProvider,
    ValidationObserver,
    vSelect,
    quillEditor
  },
  props: {
    form: Object,
    tipo: String,
    data: Object,
  },
  data() {
    setInteractionMode('eager');
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });

    return {
      OptionsEstadoByID:[],
      exampleNumber:10,
      phone:{
        main_cell_phone: null,
        whatsapp: null,
      },
      wame: {
        state: false,
        number: null
      },
      ubicaciones: {
        pais: {
          value: null,
          options: [],
          props: {
            api: 'appLocalidades/getStates',
            name: 'Departamentos',
            label: 'Pais'
          }
        },
        departamento: {
          value: null,
          options: [],
          props: {
            api: 'appLocalidades/getCiudades',
            name: 'Ciudades',
            label: 'Departamento'
          }
        },
        ciudad: {
          value: null,
          options: [],
          props: {
            label: 'Ciudad'
          }
        },
      },

      quillOption: {
        modules: {
          toolbar: "#quill-toolbar",
        },
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus clientes.",
      },
    }
  },
  watch: {
    'wame.state'(a){
      if(a){
        this.form.whatsapp = this.wame.number
        this.phone.whatsapp = this.phone.main_cell_phone
      }
    },
    'phone.main_cell_phone'(){
      this.phone.main_cell_phone=this.validateLengthNum(this.phone.main_cell_phone)
    },
    'phone.whatsapp'(){
      this.phone.whatsapp=this.validateLengthNum(this.phone.whatsapp)
    },
    'form.embudoId'(){
      this.getOptionsEstadoByID()
    }
  },
  computed:{
    // OptionsEstadoByID(){
    //   if(this.$store.state.appCliente.OptionsEstadoByID){
    //     return this.$store.state.appCliente.OptionsEstadoByID;
    //   }else{
    //     return []
    //   }
    // },
    optionsEmbudoForm(){
      return this.$store.state.appCliente.optionsEmbudoForm;
    },
    storeConfig(){
      return this.$store.state.appConfiguracion.options
    },

    userData() {
      return this.$store.state.userData.userData;
    },
    tipo_cliente(){
      return this.$store.state.appDocumentos.tipo_cliente;
    },
  },
  mounted(){
    this.getOptionsEmbudo()
    for(let prop in this.ubicaciones){
      this.$watch(() => this.ubicaciones[prop].value, (codigo) => {

        Object.assign(this.form,{
          [prop]: codigo
        });

        let keys = Object.keys(this.ubicaciones);
        if(prop != keys[keys.length - 1] && codigo != null){
          let index = keys.indexOf(prop);

          this.getUbicacion({
            codigo,
            prop: keys[index + 1],
            api: this.ubicaciones[prop].props.api,
            name: this.ubicaciones[prop].props.name,
          });

        }
      });
    }
    if(this.tipo == 'edit')
      this.getClienteEdit(this.data);

  },
  methods:{
    async getOptionsEstadoByID(){
        // this.form.estadoId=null
      try{
        let res = await this.$store.dispatch("appCliente/getOptionsEstadoByID",this.form.embudoId);
        this.OptionsEstadoByID = res
      }catch(error){
        this.OptionsEstadoByID =[]
      }
    },
    getOptionsEmbudo(){
      this.$store.dispatch("appCliente/getOptionsEmbudo");
    },
    validateLengthNum(num){
      if(num !=null){
        let lengthNumber= num.replace(/\s+/g, '')
        if(lengthNumber.length>=this.exampleNumber){
          return lengthNumber.slice(0,this.exampleNumber);
        }else{
          return num
        }
      }
    },
    exampleLabel(e){
      let example= this.$refs['inputCelular'].$children[1].$refs.label.innerText;
      if(example!='Celular'){
        example = example.split(':')[1].replace(/\s+/g, '');
        this.exampleNumber=example.length;
      }
    },
    errorState(error){
      return error.length > 0 ? false : null;
    },
    resetUbicacion(prop){
      let keys = Object.keys(this.ubicaciones),
          index = keys.indexOf(prop);
      if(prop){
        keys.shift();
        keys.splice(0, index);
      }
      for(let key of keys){
        Object.assign(this.form, { [key]: null });
        Object.assign(this.ubicaciones[key], { value: null, options: [] });
      }
    },
    async getUbicacion({codigo, api, name, prop}){
      await this.$store
        .dispatch(api, { codigo })
        .then(res => {
          this.ubicaciones[prop].options = res;
        }).catch((error) => {
          console.error(name, error);
        });
    },
    onSubmit(){
      return new Promise(resolve => {
        this.$refs['ClientesForm'].validate()
        .then(state => {
          let data = {};
          for(let prop in this.form)
            if(this.form[prop] != null)
              Object.assign(data, {[prop]: this.form[prop].id ? this.form[prop].id : this.form[prop]});
          resolve({state, data});
        });
      })
    },
    async getClienteEdit(cliente) {
      for(let prop in this.form){
          switch(prop){
            case 'main_cell_phone':
            case 'whatsapp':
                Object.assign(this.phone,{[prop]: cliente['main_cell_phone']});
                Object.assign(this.form,{[prop]: cliente[prop]});
              break;
            case 'pais':
            case 'departamento':
            case 'ciudad':
              if(cliente[prop]){
                Object.assign(this.ubicaciones[prop],{
                  value: cliente[prop].id
                });
              }
              break;
            case 'embudoId':
              if(cliente.cliente_state_embudo){
                Object.assign(this.form,{'embudoId':cliente.cliente_state_embudo.embudo_id});
                this.getOptionsEstadoByID()
              }
              break;
            case 'estadoId':
              if(cliente.cliente_state_embudo){
                Object.assign(this.form,{'estadoId':cliente.cliente_state_embudo.state});
              }
              break;
            default:
              if(cliente[prop]){
                Object.assign(this.form, {
                  [prop]: cliente[prop].id ? cliente[prop].id : cliente[prop]
                })
              }
          }

      }
      if(this.phone['main_cell_phone'] == this.phone['whatsapp']){
          Object.assign(this.wame, {
            state: true,
            number: cliente['whatsapp']
          });
        }
    },
  }
}
</script>

<style lang="css">

  .ql-editor{
    min-height:200px;
  }
  .ql-container.ql-snow {
    border-radius: 0 0 0.351rem 0.351rem!important;
    border-top: none;
  }
</style>
