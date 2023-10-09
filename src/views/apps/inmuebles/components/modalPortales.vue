<template>
  <div id="ModalPortales">
    <b-row>
      <b-col>
        <ul class="portales-inmueble">
            <li class="item-portales-inmueble">
              <img src="@/assets/images/logo/LOGO-RED-FINCA-RAIZ.png" style="width: 170px; height:90px ; padding: 8px 4px;"/>
                  <b-badge variant="light-success" class="badge__sincro">Sincronizado</b-badge>
                  <b-button v-b-tooltip.hover.left.bottom title="Ver Inmueble" size="sm" variant="outline-info" 
                    :href="(inmueble.slug)?`https://redfincaraiz.com/properties/${inmueble.slug}`:'https://redfincaraiz.com'" target="_blank" class="btn__state  btn__state-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z"/></svg>
                  </b-button>
            </li>
          <template v-for="item in appPortal.portales">
            <li class="item-portales-inmueble" :key="item.id" v-if="item.state == 'active'">
              <img :src="item.image"/>
              <b-button-group class="position-static">
                <b-button 
                  v-if="!statePortal(states, item, inmueble.portales_codigo_response)"
                  v-b-tooltip.hover.left.bottom
                  title="Sincronizar" size="sm" variant="outline-success"
                  @click="syncPortal('create', {inmueble, portal: item.id, slug: item.slug})"
                  class="btn__state btn__state-success"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"/></svg>
                </b-button>
                <template v-else>
                  <b-badge variant="light-success" class="badge__sincro">Sincronizado</b-badge>
                  <b-button 
                    v-b-tooltip.hover.left.bottom
                    title="Actualizar" size="sm" variant="outline-success"
                    @click="syncPortal('update', {inmueble, portal: item.id, slug: item.slug})"
                    class="btn__state btn__state-success"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"/></svg>
                  </b-button>
                  <b-button v-b-tooltip.hover.left.bottom title="Ver Inmueble" size="sm" variant="outline-info" v-if="linkPortal(item, inmueble.portales_urls)"
                    :href="item.link" target="_blank" class="btn__state  btn__state-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z"/></svg>
                  </b-button>
                  <b-button 
                    v-b-tooltip.hover.left.bottom 
                    title="Despublicar" size="sm" variant="outline-danger"
                    @click="syncPortal('delete', {inmueble, portal: item.id, slug: item.slug})"
                    class="btn__state  btn__state-danger"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                  </b-button>
                </template>
              </b-button-group>
            </li>
          </template>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import InmueblesPortales from './componentsPortales/InmueblesPortales'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import mixinPortales from "@/views/apps/inmuebles/mixinPortales";
import mixinInmuebles from "@/views/apps/inmuebles/mixinInmuebles";


export default {
  name: "ModalPortales",
  components: {
    InmueblesPortales,
  },
  mixins:[mixinPortales, mixinInmuebles],
  props:{
    inmueble: Object
  },
  mounted(){
    this.$store.dispatch("appPortales/fetchPortales");
  },
  computed: {
    states(){
      return this.inmueble.portale_state_inmueble;
    },
  },
};
</script>
<style>
ul.tabPortales {display: flex;list-style: none;flex-wrap: wrap;padding: 0;margin: -10px;justify-content: center;}
li.tabItemPortal {flex-basis: calc(100% / 6);padding: 10px;border-radius: 3px;cursor: pointer;position: relative;}
li.tabItemPortal.active img, li.tabItemPortal:hover img {outline: 3px solid var(--success);outline-offset: -3px;}
li.tabItemPortal img {border-radius: 3px;transition: all ease 0.4s;box-shadow: 1px 1px 6px #0000001a;}
li.tabItemPortal.active, .event-none {pointer-events: none!important;}
[disabled], .disabled {pointer-events: none!important;}
.tabItemPortal[sync]::after {content: 'Sinconizado';background: var(--success);color: #fff;font-weight: 500;line-height: 1;font-size: 12px;padding: 0.2em 1em;border-radius: 4px;position: absolute;bottom: 15px;left: 50%;transform: translateX(-50%);}
li.tabItemPortal.event-none::before{content: 'Próximamente';background: #fff;color: var(--danger);font-weight: 500;line-height: 1;font-size: 12px;padding: 0.2em 1em;border-radius: 4px;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 1;font-weight: 700;}
li.tabItemPortal.event-none img {filter: grayscale(1);}
.badge.badge-light-success {
  background-color: #c9f1db;
}

</style>

<style scoped lang="scss">
.portales-inmueble{
  display:flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.item-portales-inmueble{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 2px solid var(--primary);
  border-radius: 10px;
  padding: 8px 6px;
  img{
    max-width: 190px;
    object-fit: cover;
  }

}
.btn__state{
  svg{
    fill: var(--primary);
    width: 20px;
    height: 20px;
  }
}

.badge__sincro{
  position: absolute;
  top: 5px;
  left: 10px;
}
.btn__state-success{
  svg{
    fill: #28c76f;
  }
}
.btn__state-info{
  svg{
    fill: #00bfff;
  }
}
.btn__state-danger{
  svg{
    fill: #ea5455;
  }
}

@media (max-width:550px) {
  .item-portales-inmueble{
  img{
    max-width: 200px;
    object-fit: cover;
  }
}
}
</style>

