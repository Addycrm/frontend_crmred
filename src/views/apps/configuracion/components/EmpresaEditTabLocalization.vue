<template>
  <div>
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
                  v-model="configuracion.id_pais"
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
                  v-model="configuracion.id_estado"
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
                  v-model="configuracion.id_ciudad"
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
                fields: ['geometry', 'formatted_address', 'address_components'],
              }"
            />
            <b-button variant="primary" @click="addMarker">Buscar</b-button>
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
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BButton,
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import { ref } from "@vue/composition-api";
import vSelect from "vue-select";
import { quillEditor } from "vue-quill-editor";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import modalRegisterZonaVue from "./components-children/modal-register-zona.vue";
import modalRegisterBarrioVue from "./components-children/modal-register-barrio.vue";

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    flatPickr,
    BFormInput,
    vSelect,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BButton,
    quillEditor,
    BCardActions,
    "modal-register-zona": modalRegisterZonaVue,
    "modal-register-barrio": modalRegisterBarrioVue,
  },
  
  data() {
    return {
      data: {
        id_pais: null,
        id_ciudad: null,
        id_estado: null,
      },

      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],
    };
  },

  computed: {
    paises() {
      return this.$store.state.appLocalidades.paises;
    },
    estados() {
      return this.$store.state.appLocalidades.estados;
    },

    ciudad() {
      return this.$store.state.appLocalidades.ciudades;
    },
  },

  props: {
    configuracion: {
      type: Object,
      required: true,
    },
  },

  created() {
    if (this.configuracion.id_pais) {
      this.getEstados();
      if (this.configuracion.id_estado) {
        this.getCiudades();
      }
    }
  },

  methods: {
    getPaises() {
      this.$store
        .dispatch("appLocalidades/getPaises")
        .then((response) => {
        })
        .catch((error) => {
        });
    },

    getEstados() {
      this.$store
        .dispatch("appLocalidades/getStates", {
          codigo: this.configuracion.id_pais.id,
        })
        .then((response) => {
        })
        .catch((error) => {
        });
    },

    getCiudades() {
      this.$store
        .dispatch("appLocalidades/getCiudades", {
          codigo: this.configuracion.id_estado,
        })
        .then((response) => {
          this.ciudades = response;
        })
        .catch((error) => {
        });
    },

    setPlace(place) {
      this.configuracion.direccion = place.formatted_address;
      this.configuracion.latitud = place.geometry.location.lat();
      this.configuracion.longitud = place.geometry.location.lng();

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

    geolocate() {

      // const marker = {
      //   lat: parseFloat(this.configuracion.latitud),
      //   lng: parseFloat(this.configuracion.longitud),
      // };
      // this.markers.push({
      //   position: marker,
      //   title: this.configuracion.direccion,
      // });
      // this.center = marker;
    },

    /* Barrio */
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/quill.scss";

.ql-editor {
  height: 12rem;

  resize: vertical;
  overflow-y: scroll;
}

.button-google {
  width: 60%;
  height: 37px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  -webkit-background-clip: padding-box; /* for Safari */
  background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */
  border-radius: 10px;

  opacity: 0.5;
}
</style>
