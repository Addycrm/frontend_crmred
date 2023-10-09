<template>
  <div id="ModalPortales">
      <ul class="portales-inmueble">
        <li class="item-portales-inmueble ">
            <div class="item-header">
              <img :src="portal.current.image" alt="">
              <b-badge variant="light-success" class="header__badge">Sincronizado</b-badge>
            </div>
            <div class="item-footer">
              <div>
                <b>CODIGO: </b>{{codePortal(portal.current, portal.inmueble.portales_codigo_response)}}
              </div>
              <b-button-group class="container__btns">
                <b-button 
                  variant="outline-success"
                  @click="syncPortal('update', {inmueble: portal.inmueble, portal: portal.current.id, slug: portal.current.slug})"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon__svg icon__svg-green">
                    <path d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"/></svg>
                  <span class="ml-1">
                    Actualizar
                  </span>
                </b-button>
                <b-button variant="outline-info" 
                  v-if="linkPortal(portal.current, portal.inmueble.portales_urls)"
                  class="text-nowrap"
                  :href="portal.current.link" target="_blank"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon__svg icon__svg-blue">
                    <path d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z"/></svg>
                  <span class="ml-1">
                    Ver Inmueble
                  </span>
                </b-button>
                <b-button 
                  variant="outline-danger"
                  @click="syncPortal('delete', {inmueble: portal.inmueble, portal: portal.current.id, slug: portal.current.slug})"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="icon__svg icon__svg-warning">
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                  <span class="ml-1">
                    Despublicar
                  </span>
                </b-button>
              </b-button-group>
            </div>
        </li>
      </ul>
  </div>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import mixinPortales from "@/views/apps/inmuebles/mixinPortales";
import mixinInmuebles from "@/views/apps/inmuebles/mixinInmuebles";

export default {
  name: "StatePortales",
  mixins:[mixinPortales, mixinInmuebles],
  props:{
    portal: Object
  },
  methods: {
    codePortal(portal, code){
      let codigo = null;
      for(let item of code){
        if(portal.id === item.id_portal){
          codigo = item.codigo;
        }
      }
      return codigo
    },
  }
};
</script>
<style scoped>
ul{
  padding: 0;
  margin: 0;
}
.badge.badge-light-success {
  background-color: #c9f1db;
}
.icon__svg{
  width: 20px;
  fill: var(--primary);
}
.portales-inmueble{
  display: flex;
  justify-content: center;
}
.item-portales-inmueble {
  max-width: 530px;
}
.item-header{
  position: relative;
}
.header__badge{
  position: absolute;
  top: 10px;
  left: 10px;
}
.icon__svg-blue{
  fill: #00c1ff;
}
.icon__svg-green{
  fill: #28c76f;
}
.icon__svg-warning{
  fill: #ea5455;
}

@media (max-width:620px) {
  .container__btns{
    display: flex;
    flex-direction: column;
  }
}
</style>

