<template>
  <div>
    <!-- swiper1 -->
    <swiper
      ref="swiperTop"
      class="swiper-gallery gallery-top"
      :options="swiperOptions"
      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
    >
      <swiper-slide v-for="(data, index) in imagenes" :key="index">
        <b-img
          @click="openModal()"
          class="image-slider"
          :src="'/storage/' + data.url"
          fluid
        />
      </swiper-slide>

      <div slot="button-next" class="swiper-button-next swiper-button-white" />
      <div slot="button-prev" class="swiper-button-prev swiper-button-white" />
    </swiper>

    <!-- swiper2 Thumbs -->
    <swiper
      ref="swiperThumbs"
      class="swiper gallery-thumbs"
      :options="swiperOptionThumbs"
    >
      <swiper-slide v-for="(data, index) in imagenes" :key="index">
        <b-img class="image-slider-mini" :src="'/storage/' + data.url" fluid />
      </swiper-slide>
    </swiper>

    <div id="myModal" class="modal">
      <span class="close cursor" @click="closeModal()">&times;</span>
      <div class="modal-content ">
        <slider-component :imagenes="imagenes" />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { BImg, BContainer } from "bootstrap-vue";
import "swiper/css/swiper.css";
import sliderComponentVue from "./sliderComponent.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    BImg,
    BContainer,
    "slider-component": sliderComponentVue,
  },
  props: {
    imagenes: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      /* eslint-disable global-require */
      swiperData: [
        { img: require("@/assets/images/banner/banner-11.jpg") },
        { img: require("@/assets/images/banner/banner-12.jpg") },
        { img: require("@/assets/images/banner/banner-13.jpg") },
        { img: require("@/assets/images/banner/banner-15.jpg") },
        { img: require("@/assets/images/banner/banner-16.jpg") },
      ],
      swiperOptionsModal: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      /* eslint-disable global-require */

      swiperOptions: {
        loop: true,
        loopedSlides: 5,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 4,
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },

  methods: {
    openModal() {
      document.getElementById("myModal").style.display = "block";
    },

    closeModal() {
      document.getElementById("myModal").style.display = "none";
    },
  },
};
</script>

<style>
.image-slider {
  width: 100%;
  height: 50rem;
}
.image-slider-mini {
  width: 50rem;
  height: 15rem;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 98%;
  max-width: 90;
}

/* The Close Button */
.close {
  color: white;
  position: absolute;
  top: 10px;
  right: 25px;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
}
@media (max-width: 600px) {
  .image-slider {
    width: 100%;
    height: 10rem;
  }
  .image-slider-mini {
    width: 100%;
    height: 5rem;
  }
}
</style>