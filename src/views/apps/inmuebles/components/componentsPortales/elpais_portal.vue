<template>
  <div>
    <b-overlay :show="show" rounded="sm">
      <tablep :data="portal" />

      <div class="mt-2">
        <span v-for="inm in inmueble.portales_codigo_response" :key="inm.id">
          <div v-if="inm.id_portal == portal.id">
            <h3>
              <strong>Codigo ciencuadra.com.co: {{ inm.codigo }}</strong>
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
              @click="updatePais"
              pill
            >
              Actualizar
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="danger"
              @click="desactivar()"
              size="sm"
              pill
            >
              Desactivar
            </b-button>
          </div>
        </span>

        <span v-if="showPortal.length > 0">
          <div
            class="demo-inline-spacing"
            v-if="
              showPortal[0].state != 'publicado' &&
              showPortal[0].state != 'pendiente'
            "
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
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { BButton, BOverlay } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import table_portalesVue from "./table_portales.vue";

export default {
  components: {
    BOverlay,
    BButton,
    tablep: table_portalesVue,
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    showPortal() {
      let data = this.inmueble.portale_state_inmueble.filter(
        (x) => x.id_portal == this.portal.id
      );
      return data;
    },
  },
  props: {
    portal: {
      type: Object,
      required: true,
    },

    inmueble: {
      type: Object,
      required: true,
    },
  },
  directives: {
    Ripple,
  },

  methods: {
    async sincronizar() {
      this.show = true;
      await this.$store
        .dispatch("appPortales/sincronizarPais", this.inmueble.id)
        .then((res) => {
          this.getInmueble();
          this.$root.$emit("message", res.message);
          this.show = false;
        })
        .catch((error) => {
        });
    },

    getInmueble() {
      this.$store
        .dispatch("appInmueble/fetchInmueble", {
          productSlug: this.inmueble.slug,
        })
        .then((response) => {
          this.$store.commit("appInmueble/UPDATE_INMUEBLE", response);
          this.$root.$emit("infomodal", response);
        });
    },

    updatePais() {
      this.show = true;
      this.$store
        .dispatch("appPortales/updateApiPais", this.inmueble.id)
        .then((response) => {
          this.$root.$emit("message", response.message);
          this.show = false;
        })
        .catch((error) => {
        });
    },

    desactivar() {
      this.show = true;
      this.$store
        .dispatch("appPortales/desactivarPais", this.inmueble.id)
        .then((response) => {
          this.getInmueble();
          this.$root.$emit("message", response.message);
          this.show = false;
        })
        .catch((error) => {
        });
    },

    verInmueble() {
      var status = this.inmueble.portale_state_inmueble;
      for (let index = 0; index < status.length; index++) {
        if (this.portal.id == status[index].id_portal) {
          if (status[index].state == "publicado") {
            this.urlInmueble();
          } else {
            this.$store
              .dispatch("appPortales/sincronizarCiencuadra", this.inmueble.id)
              .then((res) => {
                this.getInmueble();
                this.show = false;
              })
              .catch((error) => {
              });
            this.urlInmueble();
          }
        }
      }
    },

    urlInmueble() {
      var url = this.inmueble.portales_urls;
      if (url.length > 0) {
        for (let i = 0; i < url.length; i++) {
          if (this.portal.id == url[i].portal_id) {
            window.open(url[i].url);
          }
        }
      }
    },

    // this.$root.$emit("ciencuadras", this.data_ciencuadra);
  },
};
</script>

<style>
.img_portal {
  width: 10%;
}
</style>