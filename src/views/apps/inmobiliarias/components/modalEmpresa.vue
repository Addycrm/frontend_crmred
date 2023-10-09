<template>
  <b-modal
    :id="infoModal.id"
    size="xl"
    ref="modal-empresa-admin"
    title="Editar Usuario"
    ok-title="Editar"
    cancel-title="Cancelar"
    hide-footer
    cancel-variant="outline-secondary"
  >
    <b-card>
      <b-tabs pills>
        <!-- Tab: Account -->
        <b-tab active>
          <template #title>
            <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Datos basicos</span>
          </template>
          <b-media class="mb-2">
            <b-row>
              <b-col cols="6" class="mb-2">
                <b-media class="mb-2">
                  <template #aside>
                    <b-avatar v-bind:src="imageData" size="90px" rounded />
                  </template>
                  <h4 class="mb-1">Logo empresa</h4>
                  <b-form-file
                    @change="previewImage"
                    ref="file-input"
                    placeholder="click para seleccionar una imagen"
                    browse-text="Cargar"
                    class="mb-2"
                  ></b-form-file>
                </b-media>
              </b-col>
            </b-row>
          </b-media>
          <b-row>
            <!-- Field: Username -->
            <b-col cols="12" md="4">
              <b-form-group label="Nombre" label-for="descripcion">
                <b-form-input
                  v-model="infoModal.content.nombre"
                  id="descripcion"
                />
              </b-form-group>
            </b-col>

            <!-- Field: Full Name -->
            <b-col cols="12" md="4">
              <b-form-group label="Slogan" label-for="slogan">
                <b-form-input v-model="infoModal.content.slogan" id="slogan" />
              </b-form-group>
            </b-col>

            <!-- Field: Email -->
            <b-col cols="12" md="4">
              <b-form-group label="Nit" label-for="nit">
                <b-form-input
                  v-model="infoModal.content.nit"
                  id="nit"
                  type="text"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12" md="4">
              <b-form-group label="Razon social" label-for="razon_social">
                <b-form-input
                  v-model="infoModal.content.razon_social"
                  id="razon_social"
                  type="razon_social"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12" md="4">
              <b-form-group label="Pagina web" label-for="pagina_web">
                <b-form-input
                  v-model="infoModal.content.pagina_web"
                  id="pagina_web"
                  type="text"
                />
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-row
                v-for="(item, index) in itemsCorreo"
                :id="item.id"
                :key="item.id"
                ref="row"
              >
                <b-col md="6">
                  <b-form-group
                    label="* Correo electronico"
                    label-for="v-correo"
                  >
                    <b-form-input
                      id="v-correo"
                      v-model="item.correo"
                      type="email"
                      placeholder="Escribe tu correo electronico"
                    />
                  </b-form-group>
                </b-col>
                <b-col>
                  <div class="demo-inline-spacing">
                    <b-button
                      v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                      variant="outline-danger"
                      class="mt-0 mt-md-2"
                      @click="removeItemEmails(index)"
                    >
                      <feather-icon icon="Trash2Icon" class="mr-25" />
                    </b-button>
                    <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      variant="primary"
                      @click="repeateAgainCorreo"
                    >
                      <feather-icon icon="PlusIcon" class="mr-25" />
                    </b-button>
                  </div>
                </b-col>
              </b-row>

              <!-- <list-email-empresas :emails="infoModal.contentempresa_emails" />
            <list-numbers-empresas :numbers="infoModal.contentempresa_numbers" /> -->
            </b-col>

            <b-col cols="6">
              <b-row
                v-for="(item, index) in itemsNumero"
                :id="item.id"
                :key="item.id"
                ref="row"
              >
                <b-col md="6">
                  <b-form-group label="* Celular" label-for="v-celular">
                    <b-form-input
                      id="v-correo"
                      v-model="item.numero"
                      type="text"
                      placeholder="Escribe tu celular"
                    />
                  </b-form-group>
                </b-col>
                <b-col>
                  <div class="demo-inline-spacing">
                    <b-button
                      v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                      variant="outline-danger"
                      class="mt-0 mt-md-2"
                      @click="removeItemNumero(index)"
                    >
                      <feather-icon icon="Trash2Icon" class="mr-25" />
                    </b-button>
                    <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      variant="primary"
                      @click="repeateAgainNumero"
                    >
                      <feather-icon icon="PlusIcon" class="mr-25" />
                    </b-button>
                  </div>
                </b-col>
              </b-row>

              <!-- <list-email-empresas :emails="infoModal.contentempresa_emails" />
            <list-numbers-empresas :numbers="infoModal.contentempresa_numbers" /> -->
            </b-col>
            <b-col md="12">
              <b-row>
                <b-col md="6" v-if="numeros.length > 0">
                  <list-numeros :numeros="numeros"></list-numeros>
                </b-col>

                <b-col md="6" v-if="numeros.length > 0">
                  <list-correos :correos="correos"></list-correos>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-tab>

        <b-tab>
          <template #title>
            <feather-icon icon="MapPinIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Ubicacion</span>
          </template>
          <b-row>
            <!-- Columna 1  -->
            <b-col md="12" lg="12">
              <b-card-actions
                border-variant="primary"
                bg-variant="transparent"
                class="shadow-none"
                title="Ubicaciones"
                action-collapse
              >
                <b-row>
                  <b-col>
                    <b-form-group label="Paises" label-for="paises">
                      <v-select
                        :options="paises"
                        :value="paises.id"
                        @input="getEstados"
                        v-model="infoModal.content.id_pais"
                        label="name"
                        placeholder="Seleccionar"
                      />
                    </b-form-group>
                  </b-col>

                  <!-- field: Departamento  -->
                  <b-col>
                    <b-form-group label="Departamento" label-for="states">
                      <v-select
                        :options="estados"
                        :value="estados.id"
                        @input="getCiudades"
                        v-model="infoModal.content.id_estado"
                        label="name"
                        placeholder="Seleccionar"
                      />
                    </b-form-group>
                  </b-col>

                  <!-- field: Ciudad  -->
                  <b-col>
                    <b-form-group label="Ciudad" label-for="ciudad">
                      <v-select
                        :options="ciudad"
                        :value="ciudad.id"
                        v-model="infoModal.content.id_ciudad"
                        label="name"
                        input-id="ciudad"
                        placeholder="Seleccionar"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card-actions>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
              <div>
                <div>
                  <GmapAutocomplete
                    @place_changed="setPlace"
                    class="button-google"
                    :options="{
                      fields: [
                        'geometry',
                        'formatted_address',
                        'address_components',
                      ],
                    }"
                  />
                  <b-button variant="primary" @click="addMarker"
                    >Buscar</b-button
                  >
                </div>
                <br />
                <GmapMap
                  :center="center"
                  :zoom="18"
                  style="width: 100%; height: 400px"
                >
                  <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="center = m.position"
                  />
                </GmapMap>
              </div>
            </b-col>
          </b-row>
        </b-tab>

        <!-- Tab: Information -->
        <b-tab>
          <template #title>
            <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Descripcion</span>
          </template>

          <quill-editor
            v-model="infoModal.content.descripcion"
            :options="snowOption"
          />
        </b-tab>

        <!-- Tab: Social -->
        <b-tab>
          <template #title>
            <feather-icon icon="Share2Icon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Redes sociales</span>
          </template>
          <b-row>
            <b-col
              v-for="socialField in socialInputs"
              :key="socialField.dataField"
              cols="12"
              md="6"
              lg="4"
            >
              <b-form-group
                :label="socialField.label"
                :label-for="socialField.dataField"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon size="16" :icon="socialField.icon" />
                  </b-input-group-prepend>
                  <b-form-input
                    :id="socialField.dataField"
                    v-model="configuracion[socialField.dataField]"
                    type="url"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>

      <b-row class="mt-2">
        <b-col>
          <b-button
            variant="primary"
            class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            @click="sendData()"
          >
            Guardar cambios
          </b-button>
          <b-button
            variant="outline-secondary"
            type="reset"
            :block="$store.getters['app/currentBreakPoint'] === 'xs'"
          >
            Cancelar
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-modal>
</template>

<script>
import {
  BTab,
  BTabs,
  BCard,
  BAlert,
  BLink,
  BFormSelect,
  BFormInvalidFeedback,
  BFormCheckboxGroup,
  BFormDatepicker,
  BButtonGroup,
  BModal,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BMedia,
  BButton,
  BAvatar,
  BInputGroup,
  BFormFile,
  BFormRadio,
  BInputGroupPrepend,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import formValidation from "@core/comp-functions/forms/form-validation";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import { required, email, confirmed, password } from "@validations";
import vSelect from "vue-select";
export default {
  name: "edictRole",
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    BFormSelect,
    BFormInvalidFeedback,
    BFormCheckboxGroup,
    BFormDatepicker,
    BButtonGroup,
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BAvatar,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    quillEditor,
    required,
    email,
    confirmed,
    BFormRadio,
    password,
    BMedia,
    BFormFile,
    vSelect,
    ToastificationContent,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },

  paisesOptions: {
    type: Array,
    required: true,
  },

  data() {
    return {
      configuracion: {},
      imageData: "",
      correos: [],
      numeros: [],
      infoModal: {
        id: "modal-empresa-admin",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      itemsCorreo: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          correo: "",
        },
      ],
      itemsNumero: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          numero: "",
        },
      ],

      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus inmuebles.",
        readOnly: true,
      },

      socialInputs: [
        {
          icon: "LinkedinIcon",
          dataField: "linkedin",
          label: "linkedin",
        },
        {
          icon: "FacebookIcon",
          dataField: "facebook",
          label: "facebook",
        },
        {
          icon: "InstagramIcon",
          dataField: "instagram",
          label: "instagram",
        },
      ],
      configuracion: {
        id: null,
        logo: null,
        email: null,
        genero: null,
        nombre: null,
        slogan: null,
        nit: null,
        pagina_web: null,
        razon_social: "",
        direccion: "",
        latitud: null,
        longitud: null,
        correos: [],
        numeros: [],
        descripcion: "",
        id_pais: null,
        id_ciudad: null,
        id_estado: null,
        linkedin: "",
        facebook: "",
        instagram: "",
      },
      markers: [],
      places: [],
      center: null,
      name: "",
      nameState: null,
      submittedNames: [],
      states: [],
      ciudades: [],

      pais_id: null,
      state_id: null,
    };
  },
  mounted(){
     this.geolocate();
  },

  computed: {
    paises() {
      return this.$store.state.appLocalidades.paises;
    },

    roles() {
      return this.$store.state.appRole.roles;
    },

    userdata() {
      return this.$store.state.userData.userData;
    },

    configur() {
      return this.$store.state.appinfoModal.contentconfiguracion;
    },

    estados() {
      return this.$store.state.appLocalidades.estados;
    },

    ciudad() {
      return this.$store.state.appLocalidades.ciudades;
    },
  },

  methods: {
    repeateAgainCorreo() {
      this.itemsCorreo.push({
        id: (this.nextTodoId += this.nextTodoId),
      });

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
      });
    },

    getPaises() {
      this.$store
        .dispatch("appLocalidades/getPaises")
        .then((response) => {})
        .catch((error) => {
        });
    },

    getEstados() {
      this.$store
        .dispatch("appLocalidades/getStates", {
          codigo: this.infoModal.contentid_pais.id,
        })
        .then((response) => {})
        .catch((error) => {
        });
    },

    getCiudades() {
      this.$store
        .dispatch("appLocalidades/getCiudades", {
          codigo: this.infoModal.contentid_estado.id,
        })
        .then((response) => {})
        .catch((error) => {
        });
    },

    removeItemEmails(index) {
      this.itemsCorreo.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },

    removeItemNumero(index) {
      this.itemsNumero.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },

    repeateAgainNumero() {
      this.itemsNumero.push({
        id: (this.nextTodoId += this.nextTodoId),
      });

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
      });
    },

    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => {});
    },
    sendData() {
      this.enviarData();
    },
    enviarData() {
      if (this.itemsNumero.lenght > 0) {
        this.itemsNumero.forEach((element) => {
          this.infoModal.content.numeros.push({ numero: element.numero });
        });
      }

      if (this.itemsCorreo.lenght > 0) {
        this.itemsCorreo.forEach((element) => {
          this.infoModal.content.correos.push({ correo: element.correo });
        });
      }
      let formData = new FormData();

      if (this.infoModal.content.logo != "") {
        formData.append("logo", this.infoModal.content.logo);
      }
      formData.append("id", this.infoModal.content.id);

      formData.append("agente", this.userdata.id);
      formData.append(
        "id_pais",
        JSON.stringify(this.infoModal.content.id_pais)
      );
      formData.append(
        "id_estado",
        JSON.stringify(this.infoModal.content.id_estado)
      );
      formData.append(
        "id_ciudad",
        JSON.stringify(this.infoModal.content.id_ciudad)
      );
      formData.append("slogan", this.infoModal.content.slogan);
      formData.append("nombre", this.infoModal.content.nombre);
      formData.append("nit", this.infoModal.content.nit);
      formData.append("logo", this.infoModal.content.logo);
      formData.append("razon_social", this.infoModal.content.razon_social);

      formData.append("emails", JSON.stringify(this.infoModal.content.correos));
      formData.append(
        "numbers",
        JSON.stringify(this.infoModal.content.numeros)
      );

      formData.append("pagina_web", this.infoModal.content.pagina_web);
      formData.append("descripcion", this.infoModal.content.descripcion);
      formData.append("facebook", this.infoModal.content.facebook);
      formData.append("instagram", this.infoModal.content.instagram);
      formData.append("linkedin", this.infoModal.content.linkedin);
      formData.append("latitud", this.infoModal.content.latitud);
      formData.append("longitud", this.infoModal.content.longitud);
      formData.append("direccion", this.infoModal.content.direccion);

      this.$store
        .dispatch("appConfiguracion/addEmpresa", formData)
        .then((response) => {
           this.$root.$emit("inmobiliariaModal");
          this.hideModal();
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Se edito correctamente",
              icon: "EditIcon",
              variant: "success",
            },
          });

         
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: error.data.message,
              icon: "EditIcon",
              variant: "danger",
            },
          });
        });
    },



    setPlace(place) {
      this.infoModal.content.direccion = place.formatted_address;
      this.infoModal.content.latitud = place.geometry.location.lat();
      this.infoModal.content.longitud = place.geometry.location.lng();

      this.currentPlace = place;
    },

    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },

    previewImage: function (event) {
      var input = event.target;
      this.infoModal.content.logo = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    geolocate: function () {
      if (this.infoModal.content.id != null) {
        const marker = {
          lat: parseFloat(this.infoModal.content.latitud),
          lng: parseFloat(this.infoModal.content.longitud),
        };
        this.markers.push({
          position: marker,
          title: this.infoModal.content.direccion,
        });
        this.center = marker;
      } else {
        this.center = {
          lat: 3.42158,
          lng: -76.5205,
        };
      }
    },

    getStates() {
      this.$store
        .dispatch("appLocalidades/getStates", {
          codigo: this.infoModal.content.id_pais.id,
        })
        .then((data) => {
          this.states = data;
        })
        .catch(() => {});
    },

    getCiudad() {
      this.$store
        .dispatch("appLocalidades/getCiudades", {
          codigo: this.infoModal.content.id_estado.id,
        })
        .then((data) => {
          this.ciudades = data;
        })
        .catch(() => {});
    },

    info(code, button) {
      this.infoModal.content = { ...code };
      this.imageData = "/storage/" + this.infoModal.content.logo;
      this.geolocate();
      this.getStates();
      this.getCiudad();

      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-empresa-admin"].hide();
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },

    resetModal() {
      this.name = "";
      this.nameState = null;
    },

    handleOk(bvModalEvt) {
      this.handleSubmit();
    },

    handleSubmit() {
      this.$store
        .dispatch("app-user/updatedUser", this.infoModal.content)
        .then(() => {
          this.$store.dispatch("appUser/fetchUsers");
          this.hideModal();
        })
        .catch((error) => {
          this.infoModal.content = {}; //this.hideModal();
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
.button-google {
  width: 60%;
  height: 37px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  -webkit-background-clip: padding-box; /* for Safari */
  background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */

  opacity: 0.5;
}
</style>

