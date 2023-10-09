<template>
  <div>
    <b-overlay :show="show" rounded="sm">
      <tablep :data="data_ciencuadra" />
      <hr />

      <b-col md="12">
        <b-form-group label="Selecciona una localidad *" label-for="localidad">
          <v-select
            v-model="localidad_id"
            :options="localidades_ciencuadra"
            :clearable="false"
            label="nombre"
            input-id="localidad"
            placeholder="Seleccionar"
          />
        </b-form-group>
      </b-col>
      <hr />
      <div class="mt-2">
        <span
          v-for="inm in inmueble_ciencuadra.portales_codigo_response"
          :key="inm.id"
        >
          <div v-if="inm.id_portal == data_ciencuadra.id">
            <h3>
              <strong>Codigo ciencuadra.com.co: {{ inm.codigo }}</strong>
            </h3>
            <b-button
              v-if="showPortal[0].state != 'pendiente'"
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="primary"
              size="sm"
              @click="urlInmueble()"
              pill
            >
              Ver
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="success"
              size="sm"
              @click="updateApiSincronizacion"
              pill
            >
              Actualizar
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="danger"
              @click="desactivarCiencuadra()"
              size="sm"
              pill
            >
              Desactivar
            </b-button>
          </div>
        </span>

        <span v-if="showPortal.length > 0">
          <div class="demo-inline-spacing" v-if="!shouldDisplay">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="success"
              @click="sincronizar"
              pill
            >
              Sincronizar
            </b-button>
          </div>
        </span>

        <span v-if="showPortal.length == 0">
          <div class="demo-inline-spacing">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="success"
              @click="sincronizar"
              pill
            >
              Sincronizar
            </b-button>
          </div>
        </span>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { BButton, BOverlay, BCol, BFormGroup } from "bootstrap-vue";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import table_portalesVue from "./table_portales.vue";

export default {
  components: {
    BButton,
    BOverlay,
    tablep: table_portalesVue,
    BCol,
    BFormGroup,
    vSelect,
  },
  name:'InmueblesCiencuadras',
  data() {
    return {
      inmueble_c: null,
      show: false,
      payLoad: null,
      localidad_id: null,
    };
  },

  mounted() {
    this.$root.$on(
      "ciencuadra_sincronizado",
      function () {
        this.$store.dispatch("appInmueble/getInmuebles");
        this.show = false;
      }.bind(this)
    );
  },

  computed: {
    datas() {
      return this.$store.state.appInmueble.inmuebles;
    },

    localidades_ciencuadra() {
      return this.$store.state.appPortales.localidades_ciencuadra;
    },

    showPortal() {
      let data = this.inmueble_ciencuadra.portale_state_inmueble.filter(
        (x) => x.id_portal == this.data_ciencuadra.id
      );
      return data;
    },

    shouldDisplay: function () {
      switch (this.showPortal[0].state) {
        case "publicado":
          return true;
        case "actualizado":
          return true;
        case "pendiente":
          return true;
        default:
          return false;
      }
    },
  },

  props: {
    data_ciencuadra: {
      type: Object,
      required: true,
    },

    inmueble_ciencuadra: {
      type: Object,
      required: true,
    },
  },
  directives: {
    Ripple,
  },
  created() {
    this.localidad_id = this.inmueble_ciencuadra.localidad;
  },

  methods: {
    async sincronizar() {
      if (this.localidad_id != null) {
        this.show = true;
        await this.$store
          .dispatch("appPortales/sincronizarCiencuadra", {
            inmueble: this.inmueble_ciencuadra.id,
            localidad: this.localidad_id,
          })
          .then((res) => {
            this.getInmueble();
            this.$root.$emit("message", res.message);
            this.show = false;
          })
          .catch((error) => {
            this.show = false;
            this.$root.$emit("message_error", "La localidad es requerida");
          });
      } else {
        this.$root.$emit("message_error", "La localidad es requerida");
      }
    },

    getInmueble() {
      this.$store
        .dispatch("appInmueble/fetchInmueble", {
          productSlug: this.inmueble_ciencuadra.slug,
        })
        .then((response) => {
          this.$store.commit("appInmueble/UPDATE_INMUEBLE", response);
          this.$root.$emit("infomodal", response);
        });
    },

    updateApiSincronizacion() {
      this.show = true;
      this.$store
        .dispatch("appPortales/updateApiCiencuadra", {
          inmueble: this.inmueble_ciencuadra.id,
          localidad: this.localidad_id,
        })
        .then((response) => {
          this.$root.$emit("message", response);
          this.show = false;
        })
        .catch((error) => {
          this.$root.$emit(
            "message_error",
            "Hay un problema. Intentalo mas tarde"
          );
        });
    },

    desactivarCiencuadra() {
      this.show = true;
      this.$store
        .dispatch("appPortales/desactivarCiencuadra", {
          inmueble: this.inmueble_ciencuadra.id,
          localidad: this.localidad_id,
        })
        .then((response) => {
          this.getInmueble();
          this.$root.$emit("message", response.message);
          this.show = false;
        })
        .catch((error) => {
          this.$root.$emit(
            "message_error",
            "Hay un problema. Intentalo mas tarde"
          );
        });
    },

    urlInmueble() {
      var url = this.inmueble_ciencuadra.portales_urls;
      if (url.length > 0) {
        for (let i = 0; i < url.length; i++) {
          if (this.data_ciencuadra.id == url[i].portal_id) {
            window.open(url[i].url);
          }
        }
      }
    },

    // this.$root.$emit("ciencuadras", this.data_ciencuadra);
  },
  //appPortalesCredential
};
</script>

<style>
.img_portal {
  width: 10%;
}
</style>