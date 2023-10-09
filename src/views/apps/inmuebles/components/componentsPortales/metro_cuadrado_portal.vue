<template>
  <div>
    <b-overlay :show="show" rounded="sm">
      <tablep :data="data_metro_cuadrado" />

      <span
        v-for="inm in inmueble_metro_cuadrado.portales_codigo_response"
        :key="inm.id"
      >
        <div v-if="inm.id_portal == data_metro_cuadrado.id">
          <h3>
            <strong>Codigo metrocuadrado.com.co: {{ inm.codigo }}</strong>
          </h3>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="primary"
            size="sm"
            @click="verInmueble()"
            pill
          >
            Ver
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="success"
            size="sm"
            @click="actualizar()"
            pill
          >
            Actualizar
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="danger"
            @click="despublicar()"
            size="sm"
            pill
          >
            Despublicar
          </b-button>
        </div>
      </span>
      {{ showPortal }}

      <span v-if="showPortal.length > 0">
        <div
          class="demo-inline-spacing"
          v-if="showPortal[0].state != 'publicado'"
        >
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
    </b-overlay>
  </div>
</template>

<script>
import { BButton, BOverlay } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import table_portalesVue from "./table_portales.vue";

export default {
  props: {
    data_metro_cuadrado: {
      type: Object,
      required: true,
    },

    inmueble_metro_cuadrado: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      mt: null,
      show: false,
    };
  },
  computed: {
    showPortal() {
      let data = this.inmueble_metro_cuadrado.portale_state_inmueble.filter(
        (x) => x.id_portal == this.data_metro_cuadrado.id
      );

      return data;
    },
  },
  mounted() {},

  components: {
    BButton,
    BOverlay,
    tablep: table_portalesVue,
  },
  directives: {
    Ripple,
  },

  methods: {
    async sincronizar() {
      this.show = true;
      await this.$store
        .dispatch(
          "appPortales/sincronizarMetrocuadrado",
          this.inmueble_metro_cuadrado.id
        )
        .then((res) => {
          this.getInmueble();
          this.$root.$emit("message", res.message);
          this.show = false;
        })
        .catch((error) => {
          this.show = false;
          this.$root.$emit("message", error);
        });
    },

    getInmueble() {
      this.$store
        .dispatch("appInmueble/fetchInmueble", {
          productSlug: this.inmueble_metro_cuadrado.slug,
        })
        .then((response) => {
          this.$store.commit("appInmueble/UPDATE_INMUEBLE", response);

          this.$root.$emit("infomodal", response);
        });
    },

    async actualizar() {
      this.show = true;
      await this.$store
        .dispatch(
          "appPortales/updateApiMetrocuadrado",
          this.inmueble_metro_cuadrado.id
        )
        .then((res) => {
          this.getInmueble();
          this.$root.$emit("message", res.message);
          this.show = false;
        })
        .catch((error) => {
        });
    },

    verInmueble() {
      var url = this.inmueble_metro_cuadrado.portales_urls;
      if (url.length > 0) {
        for (let i = 0; i < url.length; i++) {
          if (this.data_metro_cuadrado.id == url[i].portal_id) {
            window.open(url[i].url);
          }
        }
      }
    },

    async despublicar() {
      this.show = true;
      await this.$store
        .dispatch(
          "appPortales/despublicarMetrocuadrado",
          this.inmueble_metro_cuadrado.id
        )
        .then((res) => {
          this.getInmueble();
          this.$root.$emit("message", res.message);
          this.show = false;
        })
        .catch((error) => {
        });
    },
  },
};
</script>

<style>
.img_portal {
  width: 10%;
}
</style>