<template>
  <div>
    <b-overlay :show="show" rounded="sm">
      <tablep :data="data_fincarraiz" />

      <span v-for="inm in inmueble.portales_codigo_response" :key="inm.id">
        <div v-if="inm.id_portal == data_fincarraiz.id">
          <h3>
            <strong>Codigo fincaraiz.com.co: {{ inm.codigo }}</strong>
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
            @click="sincronizar"
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
    data_fincarraiz: {
      type: Object,
      required: true,
    },

    inmueble: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      inmueble_p: null,
      show: false,
    };
  },
  computed: {
    showPortal() {
      let data = this.inmueble.portale_state_inmueble.filter(
        (x) => x.id_portal == this.data_fincarraiz.id
      );
      return data;
    },
  },
  mounted() {
    this.$root.$on(
      "fincarraiz_sincronizado",
      function (payLoad) {
        if (this.payLoad != payLoad) {
          this.show = false;
          this.inmueble = payLoad;
        }
      }.bind(this)
    );
  },

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
        .dispatch("appInmueble/soatAction", {
          id: this.inmueble.id,
          data: this.data_fincarraiz,
        })
        .then((data) => {
          this.show = false;
          this.$store
            .dispatch("appInmueble/fetchInmueble", {
              productSlug: this.inmueble.slug,
            })
            .then((response) => {
              this.$store.commit("appInmueble/UPDATE_INMUEBLE", response);
              this.$root.$emit("infomodal", response);
              this.$root.$emit("message", data);
            });
        })
        .catch((error) => {
          this.show = false;
          console.error(error);
        });
    },

    verInmueble() {
      window.open(
        "https://www.fincaraiz.com.co/detail.aspx?a=" +
          this.inmueble.portales_codigo_response[0].codigo +
          "&preview=ov"
      );
    },

    despublicar() {
      this.show = true;
      this.$store
        .dispatch("appPortales/despublicarFincaRaiz", this.inmueble.id)
        .then((res) => {
          this.$store
            .dispatch("appInmueble/fetchInmueble", {
              productSlug: this.inmueble.slug,
            })
            .then((response) => {
              this.show = false;
              this.inmueble.portales_codigo_response =
                response.portales_codigo_response;
              this.inmueble.portale_state_inmueble =
                response.portale_state_inmueble;
              this.$swal({
                position: "top-end",
                icon: "success",
                title: res.message,
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
              });
            });
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