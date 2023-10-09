<template>
  <b-overlay id="BannerList" :show="overlay">
    <b-card no-body>
      <template #header>
        <h3 class="mb-0 mr-2">
          Banners
        </h3>
        <b-button v-if="!emptyEmpresa" class="text-nowrap mr-auto d-flex align-items-center" size="md" variant="success" @click="formBanner()">
          <span class="align-middle">Crear Banner</span>
        </b-button>
      </template>
    </b-card>
    <b-card v-if="!emptyEmpresa">
      <draggable 
        v-if="banners.length > 0"
        class="row m-n1 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
        v-model="banners"
        @change="position"
      >
        <b-col class="p-1" v-for="(item, index) in banners" :key="item.id">
          <figure class="thumbnail cursor-move" v-b-tooltip.hover :title="item.titulo">
            <div class="actions d-flex p-10">
              <b-button @click="formBanner(item)" class="btn-icon d-flex justify-content-center align-items-center mr-10" size="sm" pill variant="success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '12px'}" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
              </b-button>
              <b-button @click="deleteBanner(item.id)" class="btn-icon d-flex justify-content-center align-items-center" size="sm" pill variant="danger">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '12px'}" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
              </b-button>
            </div>
            <cld-image v-if="item.imagen.indexOf('cloudinary') != -1" :public-id="item.imagen | urlImages" >
              <cld-transformation gravity="center" height="250" width="300" crop="thumb" />
            </cld-image>
            <div v-else class="imageStorage">
              <img :src="item.imagen" alt="">
            </div>
            <div class="title">
              {{item.titulo}}
            </div>
          </figure>
        </b-col>
      </draggable>
      <div v-else class="alert alert-info p-2">
        No hay Banner resgistrados
      </div>
    </b-card>
    <div v-else class="alert alert-warning p-2" :style="{fontSize: '16px'}">
      Debes configurar primero tus datos de Empresa para poder usar este módulo 
      <b-button class="ml-1" variant="warning" size="sm" :to="{ name: 'apps-configuration'}">
        Configurar
      </b-button>
    </div>

    <transition name="fade">
      <v-modal v-if="modalState" @close="modalState = false" size="sm" :titulo="modal.titulo" footer >
        <component is="FormBanner" ref="FormBanner" @send="consoleData" :prop="modal" />
        <template #footer>
          <b-overlay :show="overlay">
            <b-button variant="info"  @click="sendModal" :disabled="overlay" >
              {{modal.tipo != 'add' ? 'Guardar' : 'Crear Banner'}}
            </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
  </b-overlay>

</template>

<script>
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  import { imgValidateURL } from "@/libs/helpers"
  import VModal from "@/views/componente/vModal"
  import draggable from "vuedraggable"
  import FormBanner from './FormBanner'
  import mixinConfig from '@/views/componente/mixinConfig'
  import mixinApis from '@/views/componente/mixinApis'
  export default {
    name: 'BannersList',
    mixins:[mixinApis, mixinConfig],
    components: {
      draggable,
      VModal,
      FormBanner,
    },
    data() {
      return {
        overlay: false,
        imgValidateURL,
        modalState: false,
        modal: {},
      }
    },
    computed:{
      banners(){
        return this.$store.state.banners.banners;
      }
    },
    mounted() {
      this.getBanners();
    },
    methods: {
      consoleData(value){
        if(this.modal.tipo == 'add'){
          this.banners.push(value);
        }else{
          for(let item of this.banners){
            if(item.id == value.id){
              Object.assign(item, value);
            }
          }
        }
      },
      formBanner(item){
        Object.assign(this.modal, 
          item ?
          {
            titulo: 'Guardar Banner',
            tipo: 'edit',
            item
          }:{
            titulo: 'Crear Banner',
            tipo: 'add',
            posicion: this.banners.length
          }
        );
        this.modalState = true;
      },
      sendModal(){
        this.overlay = true;
        this.$refs['FormBanner'].onSubmit()
        .then( state => { 
          this.overlay = false;
          if(state){
            this.modalState = false;
          }
        });
      },
      async position(drag){
        for(let i in this.banners){
          Object.assign(this.banners[i], {
            posicion: Number(i)
          });

          await this.sendData(this.banners[i]);
        }
      },
      async sendData(item) {
        let formData = new FormData();

        let data = {
          id: null,
          titulo: null,
          descripcion: null,
          enlace: null,
          posicion: null,
          imagen: null
        }

        for(let prop in data){
          switch(prop){
            case 'imagen':
              formData.append("files", item[prop]);
              break;
            default:
              formData.append(prop, item[prop]);
          }
        }

        await this.$store.dispatch("banners/updBanners", formData)
        .then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title:"Banner Actualizado",
              icon: "CheckCircleIcon",
              text:'Tu Banner fue actualizado exitosamente',
              variant: "success"
            }
          });
          this.overlay = false;
        }).catch((error) => {

          console.error(error);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Algo ha ocurrido',
              icon: "AlertCircleIcon",
              text: 'Actualiza el navegador, si el problema persiste comunicate con nosotros',
              variant: "danger",
            },
          },{
            timeout: 4000
          });
          this.overlay = false;
        });
      },
      async deleteBanner(id){
        this.overlay = true;
        await this.$store.dispatch("banners/delBanners", {id})
        .then((response) => {
          const del = response.data.data;
          for(let index in this.banners){
            if(this.banners[index].id == del.id){
              this.banners.splice(index, 1);
            }
          }
          this.$toast({
            component: ToastificationContent,
            props: {
              title:"Banner Eliminado",
              icon: "CheckCircleIcon",
              text:'Tu Banner fue Eliminado exitosamente',
              variant: "success"
            }
          });
          this.overlay = false;
        }).catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Algo ha ocurrido',
              icon: "AlertCircleIcon",
              text: 'Actualiza el navegador, si el problema persiste comunicate con nosotros',
              variant: "danger",
            },
          },{
            timeout: 4000
          });
          this.overlay = false;
        });
      },
      async getBanners(){
        if(this.banners.length === 0){
          this.overlay = true;
          await this.$store.dispatch("banners/getBanners")
          .then((response) => {
            this.overlay = false;
          }).catch((error) => {

            console.error(error);
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Algo ha ocurrido',
                icon: "AlertCircleIcon",
                text: 'Actualiza el navegador, si el problema persiste comunicate con nosotros',
                variant: "danger",
              },
            },{
              timeout: 4000
            });
          });
        }
      },
    }
  }
</script>
<style>
  #BannerList .thumbnail {
    margin: 0;
    position: relative;
    padding-top: calc((100% / 6) * 5);
    z-index: 1;
    /*pointer-events: auto;*/
  }
  #BannerList .thumbnail img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    box-shadow: 1px 1px 10px #00000026;
    border: 1px solid #e8e8e8;
    overflow: hidden;
    border-radius: 1rem;
  }
  #BannerList .thumbnail .actions{
    position:absolute;
    z-index: 1;
    top:0;
    right:0;
  }
  #BannerList .thumbnail  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: linear-gradient(to top, #000000b3, #0000);
    width: 100%;
    border-radius: 0 0 1rem 1rem;
    padding: 3rem 2rem 1rem;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    text-shadow: 1px 1px 5px #00000080;
  }
</style>