<template>
  <b-row class="m-n1 justify-content-center">
    <b-col cols="auto" class="p-1" v-for="item in portales" :key="item.id">
      <b-card
        class="mb-0 overflow-hidde portal"
        :class="{ inactive: item.state != 'active' }"
        :img-src="item.image"
        :img-alt="item.name"
        no-body
        footer-tag="footer"
      >
        <template #footer v-if="(item.state) == 'active'">
          <b-button v-if="isElite && item.name != 'Fincaraiz'"
            :variant="'success'"
            size="sm"
          >
            <feather-icon icon="GridIcon" class="mr-50" />
            Conectado
          </b-button>
          <b-button
            v-else
            :variant="item.credenciales_portales ? 'success' : 'primary'"
            size="sm"
            @click="openModal({ titulo: item.name, portal: item })"
          >
            <feather-icon icon="GridIcon" class="mr-50" />
            {{ item.credenciales_portales ? "Conectado" : "Conectar" }}
          </b-button>
        </template>
      </b-card>
    </b-col>
    <transition name="fade">
      <v-modal
        v-if="modalState"
        @close="modalState = false"
        :titulo="`Portal ${modal.titulo}`"
        footer
      >
        <component is="modalPortal" :prop="modal.portal" ref="modal" />
        <template #footer>
          <b-overlay :show="overlay">
            <b-button @click="onSubmit" variant="success" :disabled="overlay">
              Conectar
            </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
  </b-row>
</template>

<script>
import VModal from "@/views/componente/vModal";
import modalPortal from "./components/modalPortal.vue";
export default {
  name: "portales-credentiales",
  provide() {
    return {
      overlay: () => {
        this.overlay = false;
      },
      closeModal: () => {
        this.modalState = false;
      },
    };
  },
  data() {
    return {
      modalState: false,
      overlay: false,
      modal: {},
      userRol: 'BASICO',
    };
  },
  components: {
    VModal,
    modalPortal,
  },
  computed: {
    portales() {
      return this.$store.state.appPortales.portales;
    },
    isElite() {
      this.userRol = JSON.parse(localStorage.getItem('userData')).code;
      return this.userRol == 'ELITE'
    },
  },
  mounted() {
    this.$store.dispatch("appPortales/fetchPortales");
  },
  methods: {
    openModal({ titulo, portal }) {
      Object.assign(this.modal, { titulo, portal });
      this.modalState = true;
      this.overlay = true;
    },
    async onSubmit() {
      this.overlay = true;
      await this.$refs["modal"].onSubmit().then((state) => {
        if (state) this.modalState = false;
      });
      this.overlay = false;
    },
  },
};
</script>

<style lang="css">
.portal {
  position: relative;
}
.portal.inactive img {
  filter: grayscale(1);
}
.portal.inactive::before {
  content: "Próximamente";
  background: #fff;
  color: var(--danger);
  font-weight: 500;
  line-height: 1;
  font-size: 16px;
  padding: 0.2em 1em;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-weight: 700;
}
</style>
