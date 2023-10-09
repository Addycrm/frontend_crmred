<template>
  <div>
    <b-modal
      centered
      size="xl"
      :id="infoModal.id"
      ref="authenticate-modal"
      hide-footer
    >
      <b-carousel
        id="carousel-fade"
        :interval="2000"
        controls
        style="text-shadow: 0px 0px 2px #000"
        indicators
      >
        <b-carousel-slide
          class="img-carrouce"
          v-for="img in infoModal.content"
          :key="img.id"
          :img-src="'/storage/' + img.url"
          
        ></b-carousel-slide>
      </b-carousel>
      <!-- <img class="img-modal" :src="infoModal.content" /> -->
    </b-modal>
  </div>
</template>

<script>
import {
  BModal,
  VBModal,
  BRow,
  BCol,
  BContainer,
  BCarousel,
  BCarouselSlide,
} from "bootstrap-vue";
export default {
  name: "imageComponent",

  components: {
    BModal,
    VBModal,
    BRow,
    BCol,
    BContainer,
    BCarousel,
    BCarouselSlide,
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
      this.infoModal.content = { ...item };
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