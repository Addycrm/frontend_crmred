<template>
  <b-card>
    <b-overlay :show="overlay">
      <ValidationObserver v-slot="{ handleSubmit }">
        <div >
          <b-row>
            <b-col>
              <b-media class="mb-2">
                <template #aside>
                  <b-avatar :src="image" size="90px" rounded />
                </template>
                <h4 class="mb-1">Foto de Perfil</h4>
                <!-- <b-form-file
                  @input="previewImage"
                  ref="file-input"
                  placeholder="Clic para buscar una imagen"
                  browse-text="Cargar"
                  class="mb-2"
                ></b-form-file> -->
                <button @click="showModalImage" class="btn__foto-perfil btn btn-primary">
                  <span class="modify_image">
                    Modificar foto perfil
                  </span>
                  <span class="load_image">
                    Cargar
                  </span>
                </button>
              </b-media>
            </b-col>
          </b-row>
          <!-- <CropImage
                  v-if="crop.state"
                  @close="crop.state = false"
                  v-model="imagen_path"
                  @prueba2="previewImage2"
                  @image="
                    (base64) => {
                      image = base64;
                    }
                  "
                  :imagen="image"
                ></CropImage> -->
          <b-row>
            <b-col>
              <b-form-group label="Nombre Completo" class="required">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <b-form-input
                    id="nombre"
                    name="nombre"
                    v-model="form.primer_nombre"
                    placeholder="Nombres y Apellidos"
                    :state="errors.length > 0 ? false : null"
                  />
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Registra un Nombre y Apellido
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="6" lg="6">
              <b-form-group label="Género">
                <b-form-radio-group v-model="form.genero" name="genero">
                  <b-form-radio
                    v-for="item in storeConfig.gender"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="6" lg="6">
              <ValidationProvider v-slot="{ errors }" rules="required">
              <b-form-group label="Tipo de Documento" class="required" :state="!(errors.length > 0)">
                  <v-select
                    input-id="tipo_documento"
                    v-model="form.tipo_identificacion"
                    label="nombre"
                    :options="storeConfig.document_type"
                    :reduce="(type) => type.id"
                    :clearable="false"
                  />
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Elije un tipo de documento
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <b-form-group label="N° de Identificación" class="required">
                <ValidationProvider v-slot="{ errors }" rules="required|min:6">
                  <b-form-input
                    id="n_identificacion"
                    name="n_identificacion"
                    placeholder="N° de Identificación"
                    v-model="form.numero_cedula"
                    :disabled="!Boolean(form.tipo_identificacion)"
                    :state="!(errors.length > 0)"
                  />
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Registra un numero de identificación valido
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="6" lg="6">
              <b-form-group label="Correo electrónico" class="required">
                <div class="form-control" readonly>
                  {{ form.email }}
                </div>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <ValidationProvider v-slot="{ errors }" rules="required">
              <b-form-group label="Fecha de nacimiento" class="required" :state="!(errors.length > 0)">
                <flat-pickr
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  v-model="form.fecha_nacimiento"
                  class="form-control"
                  :config="{ locale }"
                />
                  <input type="hidden" :value="form.fecha_nacimiento" />
                  <b-form-invalid-feedback :state="!(errors.length > 0)">
                    Registra una fecha de nacimiento
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="6" lg="6">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <b-form-group label="Celular" class="required" :state="!(errors.length > 0)">
                  <vue-phone-number-input
                    ref="inputCelular"
                    v-model="phone.celular"
                    :error="errors.length > 0"
                    default-country-code="CO"
                    no-flags:="true"
                    :preferred-countries="['CO']"
                    @update="
                      (event) => {
                        form.celular = event.nationalNumber;
                        wame.number = event.e164;
                        if (wame.state) phone.whatsapp = event.e164;
                        exampleLabel(event)
                      }
                    "
                    :translations="{
                      countrySelectorLabel: 'Código pais',
                      countrySelectorError: 'Elije un código',
                      phoneNumberLabel: 'Celular',
                      example: 'Ejemplo :',
                    }"
                  />
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <b-form-group label="WhatsApp" class="required" :state="!(errors.length > 0)">
                  <vue-phone-number-input
                    ref="whatsapp"
                    v-model="phone.whatsapp"
                    :error="errors.length > 0"
                    show-code-on-list
                    default-country-code="CO"
                    :preferred-countries="['CO']"
                    @update="(event)=>{
                      form.whatsapp = event.e164
                      }"
                    :translations="{
                      countrySelectorLabel: 'Código país',
                      countrySelectorError: 'Elije un código',
                      phoneNumberLabel: 'WhatsApp',
                      example: 'Ejemplo :',
                    }"
                    :disabled="wame.state"
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
            <b-col sm="12" md="6" lg="6">
              <b-form-group label="País">
                <v-select
                  input-id="id_pais"
                  v-model="ubicaciones['id_pais'].value"
                  @input="resetUbicacion('id_pais')"
                  label="name"
                  :options="storeConfig.country"
                  :reduce="(type) => type.id"
                  :clearable="false"
                />
              </b-form-group>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <b-form-group label="Departamento">
                <v-select
                  input-id="id_estado"
                  v-model="ubicaciones['id_estado'].value"
                  @input="resetUbicacion('id_estado')"
                  label="name"
                  :options="ubicaciones['id_estado'].options"
                  :reduce="(type) => type.id"
                  :disabled="ubicaciones['id_estado'].options.length == 0"
                  :clearable="false"
                />
              </b-form-group>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <b-form-group label="Ciudad">
                <v-select
                  input-id="id_ciudad"
                  v-model="ubicaciones['id_ciudad'].value"
                  @input="resetUbicacion('id_ciudad')"
                  label="name"
                  :options="ubicaciones['id_ciudad'].options"
                  :reduce="(type) => type.id"
                  :clearable="false"
                  :disabled="ubicaciones['id_ciudad'].options.length == 0"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-form-group label="Descripción">
                <div
                  id="quill-description-toolbar"
                  class="d-flex justify-content-center border-bottom-0"
                >
                  <!-- Add a bold button -->
                  <button class="ql-bold" />
                  <button class="ql-italic" />
                  <button class="ql-underline" />
                  <button class="ql-link" />
                  <button class="ql-clean" />
                </div>
                <quill-editor
                  v-model="form.descripcion"
                  :options="descriptionOptions"
                  id="quill-description"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <b-row class="socialMedia">
            <b-col sm="12" md="6" lg="6">
              <b-form-group label="Facebook">
                <b-input-group>
                  <b-input-group-prepend>
                    <i class="icon" style="color: #1b74e4"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                          d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg></i>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="form.facebook"
                    type="url"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <b-form-group label="Instagram">
                <b-input-group>
                  <b-input-group-prepend>
                    <i class="icon" style="color: #dd2a7b"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                        /></svg       ></i>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="form.instagram"
                    type="url"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <b-form-group label="LinkedIn">
                <b-input-group>
                  <b-input-group-prepend>
                    <i class="icon" style="color: #0a66c2"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                          d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                        /></svg></i>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="form.linkedin"
                    type="url"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <b-row class="mt-2">
            <b-col>
              <b-button variant="info" type="button" :disabled="overlay" @click="onSubmit()">
                Guardar
              </b-button>
            </b-col>
          </b-row>
        </div>
      </ValidationObserver>
      <v-modal v-if="stateCropImage"  @close="closeModal" ref="modalInmueble" titulo="Imagen de perfil" responsive
          size="md">
          <component is="selectImage" :image="image"  @closeModal="closeModal" @adjustImage="imageSelected"/>
    </v-modal>
    </b-overlay>
  </b-card>

</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import { quillEditor } from "vue-quill-editor";

import flatPickr from "vue-flatpickr-component";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import VModal from "@/views/componente/vModal";
import selectImage from "./selectImage.vue";
import store from "@/store/index";
import { type } from "os";


export default {
  name: "FormPerfil",
  components: {
    ValidationProvider,
    ValidationObserver,
    vSelect,
    quillEditor,
    VModal,
    selectImage
  },
  data() {
    Object.keys(rules).forEach((rule) => {
      extend(rule, rules[rule]);
    });

    return {
      crop: {
        state: false,
      },
      exampleNumber:10,
      pathcrop:null,
      stateCropImage:null,
      overlay: false,
      imagen_path: null,
      image2:null,
      phone: {
        celular: null,
        whatsapp: null,
      },
      wame: {
        state: false,
        number: null,
      },
      form: {
        id: null,
        foto_persona: null,
        primer_nombre: null,
        tipo_identificacion: null,
        numero_cedula: null,
        fecha_nacimiento: null,
        email: null,
        celular: null,
        whatsapp: null,
        genero: null,
        id_pais: null,
        id_estado: null,
        id_ciudad: null,
        descripcion: null,
        facebook: null,
        instagram: null,
        linkedin: null,
      },
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
          options: [],
          value: null,
        },
      },

      descriptionOptions: {
        modules: {
          toolbar: "#quill-description-toolbar",
        },
        placeholder: "Descripción del la empresa.",
      },
      locale: Spanish,
      image: null,
    };
  },
  watch: {
    "phone.whatsapp"(){
      if(!this.wame.state){
        this.phone.whatsapp=this.validateLengthNum(this.phone.whatsapp)
      }else{
        this.form.whatsapp = this.wame.number;
        this.phone.whatsapp =  this.validateLengthNum(this.phone.celular);
      }
    },
    "phone.celular"(e){
      this.phone.celular=this.validateLengthNum(this.phone.celular)
    }
  },
  computed: {
    storeConfig() {
      return this.$store.state.appConfiguracion.options;
    },
    userdata() {
      return this.$store.state.userData.userData;
    },
  },
  mounted() {
    this.watchUbicaciones();
    this.setForm();
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
    async imageSelected(blob,imagecrop){
      this.imagen_path= blob;
      this.image=imagecrop

    },

    closeModal() {
      this.stateCropImage = false;
    },
    showModalImage(){
      this.stateCropImage=true
    },
    setForm() {
      for (let prop in this.form) {
        switch (prop) {
          case "numero_cedula":
            Object.assign(this.form, {
              [prop]: this.userdata["cedula_persona"],
            });
            break;
          case "celular":
            Object.assign(this.phone, {
              [prop]: this.userdata["celular_movil"],
            });
            Object.assign(this.form, {
              [prop]: this.userdata["celular_movil"],
            });
            break;
          case "whatsapp":
            Object.assign(this.phone, {
              [prop]: this.userdata["celular_whatsapp"],
            });
            Object.assign(this.form, {
              [prop]: this.userdata["celular_whatsapp"],
            });
            break;
                // formData.append(prop, this.imagen_path);
                // break;

          case "id_pais":
          case "id_estado":
          case "id_ciudad":
            Object.assign(this.ubicaciones[prop], {
              value: this.userdata[prop],
            });
            break;
          default:
            Object.assign(this.form, { [prop]: this.userdata[prop] });
        }
      }

      this.image = this.userdata["foto_persona"];


      if (this.phone["celular_movil"] == this.phone["celular_whatsapp"]) {
        Object.assign(this.wame, {
          state: true,
          number: this.userdata["celular_movil"],
        });
      }

      this.$emit("setData", this.form);
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
    async onSubmit() {
      this.overlay = true;
      let formData = new FormData();
      let social = {};
      if(this.imagen_path) {
        this.form.foto_persona = this.imagen_path
      }
      for (let prop in this.form) {
        if (this.form[prop]) {
          switch (prop) {
            case "tipo_identificacion":
              formData.append("code_tipo_documento", this.form[prop]);
              break;
            case "id_pais":
              formData.append("codigo_pais", this.form[prop]);
              break;
            case "id_estado":
              formData.append("codigo_estado", this.form[prop]);
              break;
            case "id_ciudad":
              formData.append("codigo_ciudad", this.form[prop]);
              break;
            case "celular":
            case "whatsapp":
              formData.append(prop, this.form[prop].replace(" ", ""));
              break;
            case "facebook":
            case "instagram":
            case "linkedin":
              Object.assign(social, { [prop]: this.form[prop] });
              break;
            case "foto_persona":

            if(this.imagen_path){
                formData.append('foto_persona', this.imagen_path, 'name'+ new Date().getTime()+'.jpeg')
            }
            break;
              // formData.append("foto_persona", this.form[prop]);
            default:
              formData.append(prop, this.form[prop]);
          }
        }
      }
      formData.append("social", JSON.stringify(social));
      console.log("foto", this.imagen_path);

      await store
        .dispatch("appPerfil/updatePerfilAgente", formData)
        .then((response) => {
          this.overlay = false;
          let user = response.data.userData;
          this.form.foto_persona = user.foto_persona;

          localStorage.setItem("userData", JSON.stringify(user));
          this.$store.commit("userData/UPDATE_USER_DATA", user);
          this.$ability.update(user.ability);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Actualizacion exitosa",
              icon: "CheckCircleIcon",
              text: "Tus datos se han actualizado exitosamente",
              variant: "success",
            },
          });
        })
        .catch((error) => {
          const { message } = error.response.data;
          let keys = Object.keys(message);
          if (typeof message == "object") {
            for (let prop in message) {
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: "Algo ha ocurrido",
                    icon: "AlertCircleIcon",
                    text: message[prop][0],
                    variant: "danger",
                  },
                },
                {
                  timeout: 2000 * (keys.indexOf(prop) + 1),
                }
              );
            }
          } else {
            this.$toast(
              {
                component: ToastificationContent,
                props: {
                  title: "Algo ha ocurrido",
                  icon: "AlertCircleIcon",
                  text:
                    "Actualiza el navegador. Si el problema persiste comunicate con nosotros",
                  variant: "danger",
                },
              },
              {
                timeout: 4000,
              }
            );
          }

          this.overlay = false;
        });
    },
    async getUbicacion({ codigo, api, name, prop }) {
      await this.$store
        .dispatch(api, { codigo })
        .then((res) => {
          this.ubicaciones[prop].options = res;
        })
        .catch((err) => {
        });
    },
    // previewImage(file) {
    //   let input = event.target;
    //   this.imagen_path = input.files[0];
    //   console.log('files',input.files[0])
    //   console.log(input.files)
    //   if (input.files && input.files[0]) {
    //     let reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.image = e.target.result;
    //       console.log(this.image)
    //     };
    //     reader.readAsDataURL(input.files[0]);
    //     this.crop.state = true
    //   }

    //   if (file) {
    //     this.imagen_path = file;
    //     console.log(this.imagen_path)
    //     let reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.overlay = false;
    //       this.image = e.target.result;
    //       console.log('iamge 1',this.image)
    //       if(this.image){
    //         this.crop.state = true
    //       }
    //     };
    //     reader.readAsDataURL(file);
    //   } else {
    //     this.overlay = false;
    //   }
    // },
    // previewImage2(file){
    //   if (file) {
    //     console.log('flie previe 2',file)
    //     let reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.image2 = e.target.result;
    //       console.log(e.target.result)
    //       console.log('image2', this.image2)
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // }
  },
};
</script>

<style lang="css">
.quill-editor .ql-container {
  border-radius: 0 0 0.357rem 0.357rem !important;
}
.ql-editor {
  min-height: 200px;
}
.btn__foto-perfil{
  display: flex;
  padding:0.7rem 1rem;
  border: 1px solid #d8d6de;
  border-radius: 6px;
  background-color: white;
  width: 100%;
  justify-content: space-between;
}
.modify_image{
padding-right: 1rem;
}
.load_image{
  border-left: 2px solid #d8d6de;
  padding-left: 1rem;
}


.socialMedia .input-group-prepend i.icon {
  display: flex;
  font-size: 20px;
  padding: 0 6px;
  justify-content: center;
  align-items: center;
  border-radius: 0.357rem 0 0 0.357rem;
  background: currentColor;
}

.socialMedia .input-group-prepend i.icon svg {
  width: auto;
  width: 1.25em;
  height: 1em;
  fill: #fff;
}
</style>
