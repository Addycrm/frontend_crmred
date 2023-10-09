<template>
  <b-overlay :show="overlay">
    <section class="container__btns">
      <div
        class="d-flex flex-column align-items-center"
        v-for="item in tipoFicha"
        :key="item.id"
      >
        <figure class="icon-ficha">
          <svg
            class="text-warning"
            fill="currentColor"
            v-if="item.code == 'FICHA_WEB_NOCONTACTO'"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 80"
            xml:space="preserve"
          >
            <defs></defs>
            <path
              d="M90.4,34.9l7.3-7.3c1.5-1.5,1.5-3.8,0-5.3s-3.8-1.5-5.3,0l-7.3,7.5l-7.3-7.3c-1.5-1.5-3.8-1.5-5.3,0c-1.5,1.5-1.5,3.8,0,5.3 l7.3,7.3l-7.3,7.3c-1.5,1.5-1.5,3.8,0,5.3c1.5,1.5,3.8,1.5,5.3,0l7.3-7.4l7.3,7.3c1.5,1.5,3.8,1.5,5.3,0c1.5-1.5,1.5-3.8,0-5.3 L90.4,34.9z M55,20c0,11-9,20-20,20s-20-9-20-20C15,9,24,0,35,0S55,9,55,20z M32.7,56.1l-5.2-8.6h15l-5.2,8.6l5.2,19.4l6.2-25.2 C60.8,52.2,70,62.6,70,75.2c0,2.6-2.2,4.8-4.8,4.8H4.8C2.1,80,0,77.8,0,75.2c0-12.6,9.2-23,21.3-24.9l6.2,25.2L32.7,56.1z"
            />
          </svg>
          <svg
            class="text-info"
            fill="currentColor"
            v-else
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 80"
            xml:space="preserve"
          >
            <defs></defs>
            <path
              d="M96.4,31.1h-7.5v-7.5c0-2.1-1.7-3.8-3.8-3.8s-3.8,1.7-3.8,3.8v7.5h-7.5c-2.1,0-3.8,1.7-3.8,3.8s1.7,3.8,3.8,3.8h7.5v7.5 c0,2.1,1.7,3.8,3.8,3.8s3.8-1.7,3.8-3.8v-7.5h7.5c2.1,0,3.8-1.7,3.8-3.8S98.4,31.1,96.4,31.1z M55,20c0,11-9,20-20,20s-20-9-20-20 C15,9,24,0,35,0S55,9,55,20z M32.7,56.1l-5.2-8.6h15l-5.2,8.6l5.2,19.4l6.2-25.2C60.8,52.2,70,62.6,70,75.2c0,2.6-2.2,4.8-4.8,4.8 H4.8C2.1,80,0,77.8,0,75.2c0-12.6,9.2-23,21.3-24.9l6.2,25.2L32.7,56.1z"
            />
          </svg>
          <figcaption class="mt-1 font-weight-bolder">
            {{ item.name }}
          </figcaption>
        </figure>
        <b-button
          size="sm"
          class="mt-auto"
          :variant="item.code == 'FICHA_WEB_NOCONTACTO' ? 'warning' : 'info'"
          :to="{
            name: 'inmuebles-details',
            params: { slug, code: item.code, type: tprofileData.id },
          }"
          target="_blank"
        >
          Ver Ficha
        </b-button>
      </div>
      <div class="d-flex flex-column align-items-center" v-if="!inmueble.mls" lg="4" md="6">
        <figure class="icon-ficha">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="text-warning"
                  fill="currentColor">
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z"/>
            </svg>
            <figcaption class="mt-1 font-weight-bolder">
              Ver en pagina web
            </figcaption>
          </figure>
          <b-button
            size="sm"
            class="mt-auto"
            variant="warning"
            target="_blank" 
            :href="urlInmueble"
          >
            Ver Inmueble
          </b-button>
      </div>
    </section>
  </b-overlay>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  name: "ModalFicha",
  data() {
    return {
      overlay: false,
    };
  },
  props: {
    inmueble:Object
  },
  computed: {
    slug(){
      return this.inmueble.slug;
    },
    tipoFicha() {
      return this.$store.state.apiInmueblePrivate.tipo_ficha;
    },
    tprofileData() {
      return this.$store.state.userData.userData;
    },
    url(){
      return this.$store.state.appConfiguracion.url
    },
    urlInmueble(){
      return `${this.url}inmuebles/detalle/${this.slug}`
    }
  },
  mounted() {
    this.getTipoFicha();
  },
  methods: {
    async getTipoFicha() {
      if (this.tipoFicha.length == 0) {
        this.overlay = true;
        await this.$store
          .dispatch("apiInmueblePrivate/getTipoFichas")
          .then(() => {
            this.overlay = false;
          })
          .catch(() => {
            this.$parent.closeModal(false);
            this.$toast(
              {
                component: ToastificationContent,
                props: {
                  title: "Algo ha ocurrido",
                  icon: "AlertCircleIcon",
                  text: "Si el problema persiste comunicate con nosotros",
                  variant: "danger",
                },
              },
              {
                timeout: 4000,
              }
            );
          });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.container__btns{
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
}
.icon-ficha {
  display: block;
}

.icon-ficha svg {
  width: 100px;
  opacity: 0.75;
  margin: 0 auto;
  display: block;
}
.btn__property{
  width: 100px;

}
.container_btn-propery{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}
</style>