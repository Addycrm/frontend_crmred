<template>
  <b-container>
    <h2>Sincronizar con google</h2>
    <b-card style="max-width: 100rem" class="mb-2">
      <b-row>
        <b-col>
          <b-button
            variant="primary"
            v-if="!authorized"
            @click="handleAuthClick"
          >
            <feather-icon icon="UserIcon" class="mr-25" />
            <span>Iniciar sesion</span>
          </b-button>
          <b-button
            variant="warning"
            v-if="authorized"
            @click="handleSignoutClick"
          >
            <feather-icon icon="UserIcon" class="mr-25" />
            <span>cerrar sesion</span>
          </b-button>
        </b-col>
        <b-col>
          <b-button variant="info" v-if="authorized" @click="getData">
            <feather-icon icon="PlusIcon" class="mr-25" />
            <span>Obtener calendario</span>
          </b-button>
        </b-col>

        <b-col>
          <b-button
            v-if="authorized"
            :class="visible ? null : 'collapsed'"
            variant="primary"
            aria-controls="register-event"
            @click="openCollapseEvent"
          >
            {{ registerEvent }}
          </b-button>
        </b-col>
      </b-row>
      <b-collapse id="register-event" v-model="visible" class="mt-2">
        <b-container v-if="authorized">
          <hr />

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
                  <h5>Ubicación del evento</h5>
                  <div>
                    <GmapAutocomplete
                      @place_changed="setPlace"
                      class="button-google"
                    />
                    <b-button variant="primary" @click="addMarker"
                      >Buscar</b-button
                    >
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
        </b-container>
      </b-collapse>
      <hr />
    </b-card>
  </b-container>
</template>

<script>
const CLIENT_ID = process.env.MIX_CLIENT_ID_GOOGE_CALENDAR;
const API_KEY = process.env.MIX_API_KEY_GOOGE_CALENDAR;

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES =
  "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.settings.readonly https://www.googleapis.com/auth/calendar.addons.execute";

import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import flatPickr from "vue-flatpickr-component";

import {
  BButton,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormTextarea,
  BContainer,
  BCard,
  BCollapse,
  VBToggle,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  name: "googleData",
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],
      registerEvent: "Registrar evento",
      visible: false,

      items: undefined,
      api: undefined,
      authorized: false,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
      },

      event: {
        summary: "",
        location: "",
        description: "",
        start: {
          dateTime: "",
          timeZone: "America/Bogota",
        },
        end: {
          dateTime: "",
          timeZone: "America/Bogota",
        },
      },

      events: [],
    };
  },
  components: {
    FullCalendar,
    BButton,
    BContainer,
    BRow,
    BCollapse,
    BCol,
    BForm,
    BFormGroup,
    BFormTextarea,
    BCard,

    flatPickr,
  },

  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },

  mounted() {
    this.geolocate();
    this.$root.$on("executeGetData", () => {
      this.getData();
    });
  },

  created() {
    this.api = gapi;
    this.handleClientLoad();
  },

  methods: {
    openCollapseEvent() {
      if (this.visible) {
        this.visible = false;
        this.registerEvent = "Registrar evento";
      } else {
        this.visible = true;
        this.registerEvent = "Cerrar formulario";
      }
    },

    handleClientLoad() {
      this.api.load("client:auth2", this.initClient);
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

      this.getData();

      this.visible = false;
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

    initClient() {
      let vm = this;

      vm.api.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then((_) => {
          // Listen for sign-in state changes.
          vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
        })
        .catch((error) => {
        });
    },

    handleAuthClick(event) {
      Promise.resolve(this.api.auth2.getAuthInstance().signIn()).then((_) => {
        this.authorized = true;
      });
    },

    handleSignoutClick(event) {
      Promise.resolve(this.api.auth2.getAuthInstance().signOut()).then((_) => {
        this.authorized = false;
      });
    },

    info(button) {
      this.$refs.registerEvenGoogle.info(button);
    },

    getData() {
      let vm = this;

      vm.api.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        })
        .then((response) => {
          let data = [];
          let payLoad = response.result.items;

          for (let x = 0; x < payLoad.length; x++) {
            data.push({
              id: payLoad[x].id,
              title: payLoad[x].summary,
              start: payLoad[x].start.dateTime,
              end: payLoad[x].end.dateTime,
              allDay: false,
              extendedProps: {
                calendar: "Business",
              },
            });
          }
          //this.$store.commit("calendar/SET_DATA_GOOGLE", data);
          this.$root.$emit("dataCalendarGoogle", data);
        });
    },
  },
};
</script>
<style lang="scss">
.button-google {
  width: 60%;
  height: 37px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  -webkit-background-clip: padding-box; /* for Safari */
  background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */

  opacity: 0.5;
}
</style>