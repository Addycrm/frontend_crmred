<template>
    <div id="SliderInmuebleDetail">
        <div class="slider" ref="slider">
            <div v-for="(item, i) in items" :key="i" class="itemsSlider carousel__slide"
                :data-src="imgValidateURL(item.url)" data-fancybox="gallery">
                <figure class="imageSlider m-0 imageSlider__main">

                    <img :src="imgValidateURL(item.url)" alt="" class="image-card__slider">

                </figure>
            </div>
        </div>
        <div class="sliderThumbnails" ref="sliderThumbnails">
            <div v-for="(item, i) in items" :key="i" class="itemsSlider carousel__slide">
                <figure class="imageSlider m-0">
                        <img :src="imgValidateURL(item.url)" alt="">
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import { Carousel } from "@fancyapps/ui"
import { imgValidateURL } from "@/libs/helpers"
import "@fancyapps/ui/dist/fancybox.css"
import { $themeConfig } from '@themeConfig'
import mixinConfig from '@/views/componente/mixinConfig'
import mixinApis from '@/views/componente/mixinApis'
export default {
    setup() {
        const { appName, appLogoImage } = $themeConfig.app;
        return {
            appLogoImage
        }
    },
    mixins: [mixinApis, mixinConfig],
    name: 'Slider',
    props: {
        items: {
            type: Array
        },
        mounted: Boolean,
    },
    data() {
        return {
            imgValidateURL,
            slider: null,
            thumbnails: null,
            stateHook: false
        }
    },
    updated() {
        if (!this.mounted && this.stateHook)
            this.initSlider();
    },
    mounted() {
        this
        this.stateHook = true;

        if (this.mounted) {
            this.initSlider();
        }
    },
    methods: {
        initSlider() {
            this.slider = new Carousel(this.$refs['slider'], {
                Dots: false,
                dragFree: true
            });

            this.thumbnails = new Carousel(this.$refs['sliderThumbnails'], {
                Sync: {
                    target: this.slider,
                    friction: 0,
                },
                Dots: false,
                Navigation: false,
                center: true,
                slidesPerPage: 1,
                infinite: false,
            });
        },
        destroySlider() {
            this.slider.destroy();
            this.thumbnails.destroy();
            this.initSlider();
        },
    }
}
</script>

<style lang="css" >
#SliderInmuebleDetail {
    margin: -5px;
    width: 100%;
    margin: 0 auto;
}

#SliderInmuebleDetail .slider {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 0 0.25rem;
    --carousel-button-color: #170724;
    --carousel-button-bg: #fff;
    --carousel-button-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%),
        0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);

    --carousel-button-svg-width: 20px;
    --carousel-button-svg-height: 20px;
    --carousel-button-svg-stroke-width: 2.5;
}

#SliderInmuebleDetail .carousel__viewport {
    margin: -5px 0;
}

#SliderInmuebleDetail .carousel__slide {
    overflow: hidden;
    cursor: pointer;
}

#SliderInmuebleDetail .carousel__slide .imageSlider {
    position: relative;
    padding-top: 50%;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 0px 0px 6px #00000040;
}

.imageSlider.imageSlider__main {
    height: auto;
}

@media (min-width:700px) {
    .imageSlider.imageSlider__main {
        height: 500px;
    }

}

#SliderInmuebleDetail .carousel__slide .imageSlider img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
}

#SliderInmuebleDetail .carousel__nav {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    inset: 0 -1.25rem;
    pointer-events: none;
}

#SliderInmuebleDetail .slider .carousel__slide {
    width: 100%;
    padding: 5px;
    margin: 5px;
}

#SliderInmuebleDetail .slider .carousel__button {
    position: static;
    transform: none;
}

#SliderInmuebleDetail .slider .carousel__button:focus {
    outline: none;
    box-shadow: 0 0 0 4px var(--tm-color);
}

#SliderInmuebleDetail .sliderThumbnails .carousel__slide .imageSlider {
    border-radius: 4px;
}

#SliderInmuebleDetail .sliderThumbnails .carousel__slide {
    opacity: 0.5;
    padding: 0.25rem;
    width: 96px;
    transition: all ease 0.4s;
}

#SliderInmuebleDetail .sliderThumbnails .carousel__slide.is-nav-selected,
#SliderInmuebleDetail .sliderThumbnails .carousel__slide:hover {
    opacity: 1;
}

.image-card__slider {
    /* object-fit: contain !important; */
    object-fit: cover !important;
}
</style>
