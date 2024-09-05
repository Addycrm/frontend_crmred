<template>
  <div>
    <b-modal
      :id="infoModal.id"
      ok-only
      ok-title="Accept"
      modal-class="modal-primary"
      centered
      title="Gestion de HOMIUP"
      size="lg"
    >
      <b-container>
        <b-row class="match-height">
          fgfd
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { BModal, VBModal, BRow, BCol, BContainer } from "bootstrap-vue";
import ModalReferido from "./ModalReferido.vue";
import ModalRespuestas from "./ModalRespuestas.vue";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store/index";


export default {
  watch: {},

  data() {
    return {
      infoModal: {
        id: "modal-preguntas",
        title: "",
        content: {},
      
      },
    };
  },

  components: {
    BModal,
    VBModal,
    BRow,
    BCol,
    ModalRespuestas,
    ModalReferido,
    BContainer,
  },

  directives: {
    "b-modal": VBModal,
  },

  methods: {
    info(item, button) {
      this.getPreguntas(item.id_referido_primary);

      this.infoModal.content = { ...item };

      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

  
  
  },
};
</script>