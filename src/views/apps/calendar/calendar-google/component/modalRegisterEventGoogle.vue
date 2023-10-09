<template>
  <b-modal
    centered
    size="lg"
    :id="infoModal.id"
    ref="modalRefGoogle"
    hide-footer
  >
    <b-form @submit.prevent>
      <b-row>
        <!-- first name -->

        <!-- email -->
        <b-col md="6">
          <b-form-group>
            <h5>Fecha inicial</h5>
            <flat-pickr
              v-model="event.start.dateTime"
              class="form-control"
              :config="{ enableTime: true, dateFormat: 'Y-m-dTH:i:ss' }"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group>
            <h5>Fecha final</h5>
            <flat-pickr
              v-model="event.end.dateTime"
              class="form-control"
              :config="{ enableTime: true, dateFormat: 'Y-m-dTH:i:ss' }"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group>
            <h5>Titulo</h5>
            <b-form-textarea
              v-model="event.summary"
              id="textarea-summary"
              placeholder="Escribe el titulo del evento"
              rows="3"
              no-resize
            />
          </b-form-group>
        </b-col>
        <!-- mobile -->
        <b-col cols="6">
          <b-form-group>
            <h5>Descripcion</h5>
            <b-form-textarea
              v-model="event.description"
              id="textarea-descripcion"
              placeholder="Escribe la descripcion del evento"
              rows="3"
              no-resize
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mb-2">
          <div>
            <h5>UbicaciÓn del evento</h5>
            <div>
              <GmapAutocomplete
                @place_changed="setPlace"
                class="button-google"
              />
              <b-button variant="primary" @click="addMarker">Buscar</b-button>
            </div>
            <br />
            <GmapMap
              :center="center"
              :zoom="18"
              style="width: 100%; height: 10rem"
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

      <!-- password -->

      <!-- checkbox -->

      <!-- reset and submit -->
      <b-col cols="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
          @click="addEvent"
        >
          Registrar
        </b-button>
      </b-col>
    </b-form>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BModal,
  BFormTextarea,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";
import flatPickr from "vue-flatpickr-component";

export default {
  name: "registerEvenGoogle",
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BInputGroup,
    BInputGroupPrepend,
    BForm,
    BButton,
    BModal,
    quillEditor,
    flatPickr,
    BFormTextarea,
  },

  directives: {
    Ripple,
  },

  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],

      api: undefined,
      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus clientes.",
        readOnly: true,
      },
      infoModal: {
        id: "modal-register-event-google",
        title: "",
        content: {},
      },
      ubicaciones: {
        latitud: null,
        longitud: null,
        direccion: null,
      },
  
    };
  },

  mounted() {
    this.geolocate();
  },

  created() {
    this.api = gapi;
  },

  methods: {
    info(item, button) {
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    setPlace(place) {

      this.event.location = place.formatted_address;

      this.currentPlace = place;
    },

    geolocate: function () {
      // navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: 3.42158,
        lng: -76.5205,
      };
      // });
    },

    async addEvent() {
      this.event.end.dateTime = String(this.event.end.dateTime);
      this.event.start.dateTime = String(this.event.start.dateTime);

      var request = this.api.client.calendar.events.insert({
        calendarId: "primary",
        conferenceDataVersion: 1,
        resource: this.event,
      });

      await request.execute(function (event) {
      });

      this.$root.$emit("executeGetData");

      this.hideModal();
    },
    hideModal() {
      this.$refs["modalRefGoogle"].hide();
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
  },
};
</script>

<style lang="scss">
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
