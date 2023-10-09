<template>
  <div>
    <tablep :data="data_punto_propiedad" />

    <div class="mt-2">
      <!-- <div class="demo-inline-spacing">
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="outline-success"
          pill
        >
          Sincronizar
        </b-button>
      </div> -->
      <h3><strong> Portal no disponble por el momento</strong></h3>

    </div>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import table_portalesVue from "./table_portales.vue";
export default {
  components: {
    BButton,
    tablep: table_portalesVue,
  },
  props: {
    data_punto_propiedad: {
      type: Object,
      required: true,
    },
  },
  directives: {
    Ripple,
  },
};
</script>

<style>
.img_portal {
  width: 10%;
}
</style>