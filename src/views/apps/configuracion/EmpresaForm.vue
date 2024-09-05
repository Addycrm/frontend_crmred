<template>
  <b-overlay :show="overlay">
    <form-wizard ref="wizardForm" color="#7367F0" :title="null" :subtitle="null" :layout="type != 'editar' ? 'vertical' : 'horizontal'"   class="wizard-vertical">
      <tab-content title="Información básica" icon="feather icon-user" :before-change="() => wizardFormValidate('wizardFormBasica')">
        <ValidationObserver v-slot="{ failed }" ref="wizardFormBasica">
          <b-row>
            <b-col ms="12" md="6" ls="6" xl="6">
              <b-form-group>
                <b-media>
                  <template #aside>
                    <b-avatar :src="image" size="90px" rounded />
                  </template>
                  <h4 class="mb-1">Logo de la Empresa</h4>
                  <button @click="showModalImage" class="btn__foto-perfil btn btn-primary">
                    <span class="modify_image">
                      Modificar foto perfil
                    </span>
                    <span class="load_image">
                      Cargar
                    </span>
                  </button>
                  
                  <!-- <b-form-file
                    @change="previewImage"
                    ref="file-input"
                    placeholder="Clic para buscar una imagen"
                    browse-text="Cargar"
                    class="mb-2"
                  ></b-form-file> -->
                </b-media>
              </b-form-group>
            </b-col>
            <div class="w-100">

            </div>
            <b-col ms="12" md="6" ls="6" xl="6">
              <b-form-group label="Nombre o Razón social" class="required">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <b-form-input :state="errors.length > 0 ? false : null" id="razon_social" name="razon_social"
                    v-model="form.razon_social" @input="slug" placeholder="Nombre o Razon social" />
                </ValidationProvider>
              </b-form-group>
            </b-col>
            <b-col>
              <b-row>
                <b-col ms="12" md="6" ls="8" xl="8">
                  <b-form-group label="Nit" class="required">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <b-form-input :state="errors.length > 0 ? false : null" id="nit" name="nit" v-model="form.nit" />
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col ms="12" md="6" ls="4" xl="4">
                  <b-form-group label="DV" class="required">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <b-form-input :state="errors.length > 0 ? false : null" id="dv" name="dv" v-model="form.dv" />
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col ms="12" md="6" ls="6" xl="4">
              <b-form-group label="URL de la empresa" class="required">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <b-input-group
                    append=".inmob.site" 
                    class="input-group-merge"
                  >
                    <b-form-input :state="errors.length > 0 ? false : null" id="slug_empresa" name="slug_empresa"
                      v-model="form.slug" @input="slug" placeholder="Nombre o Razon social" />
                  </b-input-group>
                </ValidationProvider>
                <div>
                  <span>Dominio: </span>
                  <span>{{form.slug}}.homiup.com</span>
                </div>
              </b-form-group>
            </b-col>
            <div class="w-100"></div>
            <b-col ms="12" md="6" ls="6" xl="4">
              <b-form-group label="Correo electrónico" class="required">
                <ValidationProvider v-slot="{ errors }" rules="required|email">
                  <b-form-input :state="errors.length > 0 ? false : null" id="email" type="email" v-model="form.email" />
                </ValidationProvider>
              </b-form-group>
            </b-col>
            <b-col ms="12" md="6" ls="4" xl="4">
              <b-form-group label="Teléfono">
                <b-form-input id="telefono" type="text" v-model="form.telefono" />
              </b-form-group>
            </b-col>
            <b-col ms="12" md="6" ls="4" xl="4">
              <b-form-group label="Celular" class="required">
                <ValidationProvider v-slot="{ errors }" :rules="`required|min:${exampleNumber}`">
                  <vue-phone-number-input 
                    ref="inputCelular"
                    default-country-code="CO" 
                    :error="errors.length > 0" 
                    v-model="form.celular" 
                    @update="
                      (event) => {
                        form.celular = event.nationalNumber;
                        exampleLabel(event)
                      }
                    "
                    :translations="{
                      countrySelectorLabel: 'Código país',
                      countrySelectorError: 'Elije un código',
                      phoneNumberLabel: 'Celular',
                      example: 'Ejemplo :',
                    }"
                    />
                </ValidationProvider>
              </b-form-group>
            </b-col>
            <b-col ms="12" md="6" ls="4" xl="4">
              <b-form-group label="Página Web">
                <b-form-input id="pagina_web" type="text" v-model="form.pagina_web" />
              </b-form-group>
            </b-col>
            <div class="w-100"></div>
            <b-col ms="12" md="6" ls="4" xl="4">
              <b-form-group label="Color Principal"
                description="Se usara para resaltar elementor importantes en el sitio web de la cuenta.">
                <b-form-input id="color_primario" name="color_primario" type="color" v-model="form.color_primario" />
              </b-form-group>
            </b-col>
            <b-col ms="12" md="6" ls="4" xl="4">
              <b-form-group label="Color Secundario" description="Es un color complementario.">
                <b-form-input id="color_secundario" name="color_secundario" type="color"
                  v-model="form.color_secundario" />
              </b-form-group>
            </b-col>
            <b-col ms="12" md="6" ls="4" xl="4">
              <b-form-group label="Color de fuente" description="Es el color principal del texto del sitio web.">
                <b-form-input id="color_fuente" name="color_fuente" type="color" v-model="form.font_color" />
              </b-form-group>
            </b-col>
          </b-row>
          <div v-if="failed" class="list-error">
            <div class="alert alert-danger p-1 mb-0 flex-grow-1 text-center" :style="{ fontSize: '14px' }">
              <b>Uno o más campos obligatorios no han sido registrados
                correctamente.</b>
            </div>
          </div>
        </ValidationObserver>
      </tab-content>
      <tab-content title="Ubicación" icon="feather icon-map-pin" :before-change="() => wizardFormValidate('wizardFormUbicacion')">
        <ValidationObserver ref="wizardFormUbicacion">
          <b-row>
            <b-col>
              <b-row>
                <b-col ms="12" md="6" ls="6" xl="6">
                  <b-form-group label="País">
                    <v-select v-model="ubicaciones['id_pais'].value" @input="resetUbicacion('id_pais')" label="name"
                      :options="storeConfig.country" :reduce="(type) => type.id" :clearable="false" />
                  </b-form-group>
                </b-col>
                <b-col ms="12" md="6" ls="6" xl="6">
                  <b-form-group label="Departamento">
                    <v-select v-model="ubicaciones['id_estado'].value" @input="resetUbicacion('id_estado')" label="name"
                      :options="ubicaciones['id_estado'].options" :reduce="(type) => type.id"
                      :disabled="ubicaciones['id_estado'].options.length == 0" :clearable="false" />
                  </b-form-group>
                </b-col>
                <b-col ms="12" md="6" ls="6" xl="6">
                  <b-form-group label="Ciudad">
                    <v-select v-model="ubicaciones['id_ciudad'].value" @input="resetUbicacion('id_ciudad')" label="name"
                      :options="ubicaciones['id_ciudad'].options" :reduce="(type) => type.id"
                      :disabled="ubicaciones['id_ciudad'].options.length == 0" :clearable="false" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row align-v="center">
                <b-col ms="12" md="6" ls="6" xl="6">
                  <b-form-group label="Dirección">
                    <b-input-group>
                      <GmapAutocomplete @place_changed="setPlace" class="form-control" @input="setAddress"
                        :value="form.direccion" :options="{
                          fields: [
                            'geometry',
                            'formatted_address',
                            'address_components',
                          ],
                        }">
                      </GmapAutocomplete>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col cols="auto" :style="{ width: '10em' }">
                  <b-form-group label="Latitud">
                    <b-form-input id="latitud" name="latitud" v-model="form.latitud" type="text" />
                  </b-form-group>
                </b-col>
                <b-col cols="auto" class="p-0 pt-1"> - </b-col>
                <b-col cols="auto" :style="{ width: '10em' }">
                  <b-form-group label="Longitud">
                    <b-form-input id="longitud" name="longitud" v-model="form.longitud" type="text" />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <p class="mb-1">
                <b-badge variant="light-warning" class="font-weight-bold">En caso de que tu dirección no este registrada,
                  <b>ubicala dando clic en el mapa.</b></b-badge>
              </p>
              <GmapMap v-if="map.show" @click="clickMap" :center="map.center" :zoom="15"
                style="width: 100%; height: 300px">
                <GmapMarker :key="index" v-for="(m, index) in map.markers" :position="m.position"
                  @click="map.center = m.position" />
              </GmapMap>
            </b-col>
          </b-row>
        </ValidationObserver>
      </tab-content>
      <tab-content title="Descripción" icon="feather icon-info" :before-change="() => wizardFormValidate('wizardFormBasica')">
        <ValidationObserver ref="wizardFormDescripcion">
          <b-row>
            <b-col>
              <b-form-group label="Descripción de la Empresa">
                <div id="quill-description-toolbar" class="d-flex justify-content-center border-bottom-0">
                  <!-- Add a bold button -->
                  <button class="ql-bold" />
                  <button class="ql-italic" />
                  <button class="ql-underline" />
                  <button class="ql-link" />
                </div>
                <quill-editor v-model="form.descripcion" :options="descriptionOptions" id="quill-description" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Misión">
                <div id="quill-mision-toolbar" class="d-flex justify-content-end border-bottom-0">
                  <!-- Add a bold button -->
                  <button class="ql-bold" />
                  <button class="ql-italic" />
                  <button class="ql-underline" />
                  <button class="ql-link" />
                </div>
                <quill-editor v-model="form.mision" :options="misionOptions" id="quill-mision" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Visión">
                <div id="quill-vision-toolbar" class="d-flex justify-content-end border-bottom-0">
                  <!-- Add a bold button -->
                  <button class="ql-bold" />
                  <button class="ql-italic" />
                  <button class="ql-underline" />
                  <button class="ql-link" />
                </div>
                <quill-editor v-model="form.vision" :options="visionOptions" id="quill-vision" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col ms="12" md="6" ls="6" xl="6">
              <b-form-group label="Facebook">
                <b-input-group>
                  <b-input-group-prepend>
                    <i class="icon" style="color: #1b74e4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                          d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                      </svg></i>
                  </b-input-group-prepend>
                  <b-form-input v-model="form.facebook" type="url"></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col ms="12" md="6" ls="6" xl="6">
              <b-form-group label="Instagram">
                <b-input-group>
                  <b-input-group-prepend>
                    <i class="icon" style="color: #dd2a7b"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg></i>
                  </b-input-group-prepend>
                  <b-form-input v-model="form.instagram" type="url"></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col ms="12" md="6" ls="6" xl="6">
              <b-form-group label="LinkedIn">
                <b-input-group>
                  <b-input-group-prepend>
                    <i class="icon" style="color: #0a66c2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                          d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                      </svg></i>
                  </b-input-group-prepend>
                  <b-form-input v-model="form.linkedin" type="url"></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </ValidationObserver>
        <v-modal v-if="stateCropImage" @close="closeModal" ref="modalInmueble" titulo="Imagen de perfil" responsive
          size="md">
          <component is="selectImage" :image="image" @closeModal="closeModal" @adjustImage="imageSelected" />
        </v-modal>
      </tab-content>
      <template v-if="type != 'registrar'" slot="footer" slot-scope="props">
        <b-button  :variant="!props.isLastStep ? 'primary' : 'success'"
          @click=" !props.isLastStep? props.nextTab() :wizardFormValidate(props.activeTabIndex)" :disabled="overlay" >
          <span class="align-middle" >{{
                    !props.isLastStep ? "Siguiente" : "Guardar"
          }}</span>
        </b-button>
      </template>
    </form-wizard>
  </b-overlay>
</template>

<script>
import {BInputGroup} from 'bootstrap-vue'

import { FormWizard, TabContent, WizardButton } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import VModal from "@/views/componente/vModal";
import selectImage from '@/views/pages/profile/component/selectImage.vue';

import { quillEditor } from "vue-quill-editor";


export default {
  name: "EmpresaForm",
  components: {
    FormWizard,
    BInputGroup,
    TabContent,
    WizardButton,
    ToastificationContent,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    flatPickr,
    quillEditor,
    VModal,
    selectImage
  },
  data() {
    Object.keys(rules).forEach((rule) => {
      extend(rule, rules[rule]);
    });
    return {
      exampleNumber:10,
      image: null,
      stateCropImage: null,
      defaultPlace: "Colombia",
      overlay: false,
      imagen_path: null,
      form: {
        id: null,
        logo: null,
        razon_social: null,
        nit: null,
        dv: null,
        slug: null,
        email: null,
        telefono: null,
        celular: null,
        pagina_web: null,
        color_primario: "#7367f0",
        color_secundario: "#4e3cff",
        font_color: "#444444",

        direccion: null,
        id_pais: null,
        id_estado: null,
        id_ciudad: null,

        latitud: null,
        longitud: null,

        descripcion: null,
        mision: null,
        vision: null,
        facebook: null,
        instagram: null,
        linkedin: null,
      },
      dominio: null,

      ubicaciones: {
        id_pais: {
          value: null,
          props: {
            api: "appLocalidades/getStates",
            name: "Departamentos",
          },
        },
        id_estado: {
          value: null,
          options: [],
          props: {
            api: "appLocalidades/getCiudades",
            name: "Ciudades",
          },
        },
        id_ciudad: {
          value: null,
          options: [],
        },
      },

      wame: false,

      currentPlace: null,
      map: {
        markers: [{ position: { lat: 3.4516467, lng: -76.5319854 } }],
        center: { lat: 3.4516467, lng: -76.5319854 },
        show: false,
      },
      descriptionOptions: {
        modules: {
          toolbar: "#quill-description-toolbar",
        },
        placeholder: "Descripción del la empresa.",
      },
      misionOptions: {
        modules: {
          toolbar: "#quill-mision-toolbar",
        },
        placeholder: "Misión de la empresa.",
      },
      visionOptions: {
        modules: {
          toolbar: "#quill-vision-toolbar",
        },
        placeholder: "Visión de la empresa.",
      },
    };
  },
  watch: {
    wame(a) {
      if (a) this.form.whatsapp = this.form.celular;
    },
    ['form.slug'](){
      this.slug(this.form.slug)
    },
    ['form.celular'](){
      this.form.celular = this.validateLengthNum(this.form.celular)
    },
    empresa(empresa) {
      this.setEmpresa(empresa);
    },
  },
  props: {
    type: {
      type: String,
      default: () => "registrar",
    },
    row: {
      type: Object,
    },
  },
  computed: {
    storeConfig() {
      return this.$store.state.appConfiguracion.options;
    },
    infoPopUp() {
      return {
        content: `
						<h5 style="font-size: 14px;font-weight: 600;text-transform: uppercase;margin-bottom: 10px;">${this.form.razon_social}</h5>
						<ul style="padding: 0;list-style: none;margin: 0;font-size: 12px;" >
							<li class="address"><b style="font-weight: 500;">${this.form.direccion}</b></li>
						</ul>
					`,
        pixelOffset: {
          width: 0,
          height: -35,
        },
      };
    },
    empresa() {
      return this.$store.state.appConfiguracion.configuracion;
    },
  },
  mounted() {
    this.$refs["wizardForm"].activateAll();
    this.watchUbicaciones();


    switch (this.type) {
      case "editar":
        this.$store.dispatch("appConfiguracion/getEmpresa");
        this.setEmpresa(this.empresa);

        break;
      case "modal":
        this.setEmpresa(this.row);

        break;
    }
  },
  methods: {
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
    async imageSelected(blob, imagecrop) {
      this.imagen_path = blob
      this.image = imagecrop
    },
    closeModal() {
      this.stateCropImage = false;
    },
    showModalImage() {
      this.stateCropImage = true
    },
    watchUbicaciones() {
      for (let prop in this.ubicaciones) {
        this.$watch(
          () => this.ubicaciones[prop].value,
          (codigo) => {
            Object.assign(this.form, { [prop]: codigo });

            let keys = Object.keys(this.ubicaciones);
            if (prop != keys[keys.length - 1] && codigo != null) {
              let index = keys.indexOf(prop);

              this.getUbicacion({
                codigo,
                prop: keys[index + 1],
                api: this.ubicaciones[prop].props.api,
                name: this.ubicaciones[prop].props.name,
              });
            }
          }
        );
      }
    },
    resetUbicacion(prop) {
      let keys = Object.keys(this.ubicaciones),
        index = keys.indexOf(prop);
      keys.shift();
      keys.splice(0, index);
      for (let key of keys) {
        Object.assign(this.form, { [key]: null });
        Object.assign(this.ubicaciones[key], { value: null, options: [] });
      }
    },
    slug(a) {
      let slug = a.replace("&", "");
      slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      slug = slug.replace(/[^a-zA-Z ]/g, "");
      slug = slug.replace(/ /g, "");
      this.form.slug = slug.toLowerCase().trim();
    },
    async getEmpresa() {
      await this.$store
        .dispatch("appConfiguracion/getEmpresa")
        .then()
        .catch((error) => {
          console.error("appConfiguracion/getEmpresa", error);
        });
    },
    setEmpresa(empresa) {
      for (let prop in this.form) {

        if (empresa[prop]) {
          switch (prop) {
            case "id_pais":
            case "id_estado":
            case "id_ciudad":
              Object.assign(this.ubicaciones[prop], {
                value: empresa[prop].id,
              });
              break;
            case "latitud":
              Object.assign(this.form, {
                latitud: Number(empresa["latitud"]),
                longitud: Number(empresa["longitud"]),
              });
              Object.assign(this.map.center, {
                lat: Number(empresa["latitud"]),
                lng: Number(empresa["longitud"]),
              });
              Object.assign(this.map.markers[0].position, {
                lat: Number(empresa["latitud"]),
                lng: Number(empresa["longitud"]),
              });
              break;
            case "logo":
              this.image = empresa[prop];
              break;
            default:
              this.form[prop] = empresa[prop];
          }
        }
      }
    },
    async wizardFormValidate(ref) {
      let observer =
        typeof ref == "string"
          ? this.$refs[ref]
          : this.$refs["wizardForm"].$children[ref].$children[0];

      return await observer.validate().then(async (state) => {
        if (typeof ref == "number" && state) {
          this.overlay = true;
          await this.wizardFormComplete();
          this.overlay = false;
        }
        return state;
      });
    },
    async wizardFormComplete() {
      let data = new FormData();
      for (let prop in this.form) {
        if (prop != "logo") {
          if(this.form[prop]!=null){
            data.append(
              prop,
              this.form[prop]
            );
          }
        } else {
          if (this.imagen_path) {
            data.append('logo', this.imagen_path, 'name' + new Date().getTime() + '.jpeg')
          }else{
            data.append(
              prop,
              this.image
            );
          }
        }
      }
      await this.$http({
        url: "api/auth/agente/empresas",
        method: "post",
        data,
      })
        .then((res) => {
          let { empresa } = res.data.data;
          this.$store.commit("appConfiguracion/SET_CONFIGURATION", empresa);
          this.$swal({
            title:
              this.type != "editar" ? "Registro exitoso" : "Datos Actualizados",
            text:
              this.type != "editar"
                ? "Tu Empresa ha sido registrada exitosamente"
                : "Tu Datos se han actualizado exitosamente",
            icon: "success",
            confirmButtonText: "Cerrar",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });

          if (this.type == "modal") this.$parent.closeModal(false);
        })
        .catch((err) => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: "Algo ha ocurrido",
                icon: "AlertCircleIcon",
                text: "Actualiza el navegador, si el problema persiste comunicate con nosotros",
                variant: "danger",
              },
            },
            {
              timeout: 4000,
            }
          );
        });
    },
    wizardFormChange(next) {
      if (next === 1) Object.assign(this.map, { show: true });
    },
    setAddress(a) {
      Object.assign(this.form, {
        direccion: a.target.value,
      });
    },
    setPlace(place) {
      if (place.name) {
        Object.assign(this.form, {
          direccion: place.name,
        });
      } else {
        Object.assign(this.form, {
          direccion: place.formatted_address,
          latitud: place.geometry.location.lat(),
          longitud: place.geometry.location.lng(),
        });

        let marker = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        Object.assign(this.map.markers[0].position, marker);
        Object.assign(this.map.center, marker);
      }
    },
    clickMap(location) {
      let marker = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };

      Object.assign(this.form, {
        latitud: marker.lat,
        longitud: marker.lng,
      });
      Object.assign(this.map.markers[0].position, marker);
    },
    async getUbicacion({ codigo, api, name, prop }) {
      await this.$store
        .dispatch(api, { codigo })
        .then((res) => {
          this.ubicaciones[prop].options = res;
        })
        .catch((error) => {
        });
    },
    previewImage(event) {
      var input = event.target;
      this.form.logo = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>
<style >
.quill-editor .ql-container {
  border-radius: 0 0 0.357rem 0.357rem !important;
}
.ql-editor {
  min-height: 200px;
}

.input-group-prepend i.icon {
  display: flex;
  font-size: 20px;
  padding: 0 6px;
  justify-content: center;
  align-items: center;
  border-radius: 0.357rem 0 0 0.357rem;
  background: currentColor;
}

.input-group-prepend i.icon svg {
  width: auto;
  width: 1.25em;
  height: 1em;
  fill: #fff;
}
.modify_image{
padding-right: 1rem;
}
.load_image{
  border-left: 2px solid #d8d6de;
  padding-left: 1rem;
}
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-wizard.scss";
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/quill.scss";
</style>