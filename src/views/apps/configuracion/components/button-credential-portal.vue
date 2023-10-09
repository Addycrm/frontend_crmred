<template>
  <div>
    <b-button
      size="sm"
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="primary"
      @click="portal()"
    >
      <feather-icon icon="LockIcon" class="mr-50" />
      <span class="align-middle">Credenciales portal</span>
    </b-button>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BButton,
  },

  props: {
    portal_pros: {
      type: Object,
      required: true,
    },
  },
  directives: {
    Ripple,
  },

  methods: {
    portal() {
      this.$root.$emit("portal-credential", this.portal_pros);
    },
  },
};
</script>

<style>
</style>