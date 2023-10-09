<template>
  <div>
    <b-modal
      centered
      size="lg"
      :id="infoModal.id"
      ref="authenticate-modal"
      hide-footer
    >
     
        <img  class="img-modal" :src="infoModal.content" />
     
    </b-modal>
  </div>
</template>

<script>
import { BModal, VBModal, BRow, BCol, BContainer } from "bootstrap-vue";
export default {
  name: "imageComponent",

  components: {
    BModal,
    VBModal,
    BRow,
    BCol,
    BContainer,
  },
  data() {
    return {
      imgpath: null,
      infoModal: {
        id: "modal-preguntas",
        title: "",
        content: {},
        contentPreguntas: {},
      },
    };
  },

  methods: {
    info(item, button) {
      this.infoModal.content = item;

      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
  },
};
</script>

<style>
.img-modal {
  width: 100%;
  height: 100%;
}
</style>