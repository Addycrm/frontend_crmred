<template>
  <b-overlay id="BlogList" :show="overlay">
    <b-card no-body>
      <template #header>
        <h3 class="mb-0 mr-2">
          Blogs
        </h3>
        <div class="d-flex align-items-center mr-auto" v-if="!emptyEmpresa">
          <b-button class="text-nowrap d-flex align-items-center" size="md" variant="success" @click="formBlog()">
            <span class="align-middle">Crear Blog</span>
          </b-button>
          <b-button @click="grid = !grid" class="btn-icon d-flex justify-content-center align-items-center ml-1" size="sm" variant="primary" pill>
            <svg v-if="grid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '15px'}" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M88 48C101.3 48 112 58.75 112 72V120C112 133.3 101.3 144 88 144H40C26.75 144 16 133.3 16 120V72C16 58.75 26.75 48 40 48H88zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H192C174.3 128 160 113.7 160 96C160 78.33 174.3 64 192 64H480zM480 224C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H192C174.3 288 160 273.7 160 256C160 238.3 174.3 224 192 224H480zM480 384C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H192C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384H480zM16 232C16 218.7 26.75 208 40 208H88C101.3 208 112 218.7 112 232V280C112 293.3 101.3 304 88 304H40C26.75 304 16 293.3 16 280V232zM88 368C101.3 368 112 378.7 112 392V440C112 453.3 101.3 464 88 464H40C26.75 464 16 453.3 16 440V392C16 378.7 26.75 368 40 368H88z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '15px'}" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M128 184C128 206.1 110.1 224 88 224H40C17.91 224 0 206.1 0 184V136C0 113.9 17.91 96 40 96H88C110.1 96 128 113.9 128 136V184zM128 376C128 398.1 110.1 416 88 416H40C17.91 416 0 398.1 0 376V328C0 305.9 17.91 288 40 288H88C110.1 288 128 305.9 128 328V376zM160 136C160 113.9 177.9 96 200 96H248C270.1 96 288 113.9 288 136V184C288 206.1 270.1 224 248 224H200C177.9 224 160 206.1 160 184V136zM288 376C288 398.1 270.1 416 248 416H200C177.9 416 160 398.1 160 376V328C160 305.9 177.9 288 200 288H248C270.1 288 288 305.9 288 328V376zM320 136C320 113.9 337.9 96 360 96H408C430.1 96 448 113.9 448 136V184C448 206.1 430.1 224 408 224H360C337.9 224 320 206.1 320 184V136zM448 376C448 398.1 430.1 416 408 416H360C337.9 416 320 398.1 320 376V328C320 305.9 337.9 288 360 288H408C430.1 288 448 305.9 448 328V376z"/></svg>
          </b-button>        
        </div>
      </template>
    </b-card>
    <b-card v-if="!emptyEmpresa">
      <b-row v-if="blogs.length > 0">
        <b-col>
          <b-row class="col-sm-12 col-md-3 center_grid" v-if="grid" >
            <b-col class="p-1 d-flex flex-column" v-for="(item, index) in blogs" :key="item.id">
              <div class="blog-card d-flex flex-column flex-grow-1">
                <figure class="thumbnail cursor-move" v-b-tooltip.hover :title="item.titulo">
                  <div class="actions d-flex p-10">
                    <b-button @click="formBlog(item)" class="btn-icon d-flex justify-content-center align-items-center mr-10" size="sm" pill variant="success">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '12px'}" fill="currentColor"><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
                    </b-button>
                    <b-button :href="url + 'blog/detalle/' + item.slug" target="_blank" class="btn-icon d-flex justify-content-center align-items-center mr-10" size="sm" pill variant="info">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '12px'}" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M480 32H128C110.3 32 96 46.33 96 64v336C96 408.8 88.84 416 80 416S64 408.8 64 400V96H32C14.33 96 0 110.3 0 128v288c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V64C512 46.33 497.7 32 480 32zM272 416h-96C167.2 416 160 408.8 160 400C160 391.2 167.2 384 176 384h96c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 320h-96C167.2 320 160 312.8 160 304C160 295.2 167.2 288 176 288h96C280.8 288 288 295.2 288 304C288 312.8 280.8 320 272 320zM432 416h-96c-8.836 0-16-7.164-16-16c0-8.838 7.164-16 16-16h96c8.836 0 16 7.162 16 16C448 408.8 440.8 416 432 416zM432 320h-96C327.2 320 320 312.8 320 304C320 295.2 327.2 288 336 288h96C440.8 288 448 295.2 448 304C448 312.8 440.8 320 432 320zM448 208C448 216.8 440.8 224 432 224h-256C167.2 224 160 216.8 160 208v-96C160 103.2 167.2 96 176 96h256C440.8 96 448 103.2 448 112V208z"/></svg>
                    </b-button>
                    <b-button @click="deleteBlog(item.id)" class="btn-icon d-flex justify-content-center align-items-center" size="sm" pill variant="danger">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '12px'}" fill="currentColor"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                    </b-button>
                  </div>
                  <cld-image v-if="item.image.indexOf('cloudinary') != -1" :public-id="item.image | urlImages" >
                    <cld-transformation gravity="center" height="180" width="300" crop="thumb" />
                  </cld-image>
                  <div v-else class="imageStorage">
                    <img :src="item.image" alt="">
                  </div>
                  <div class="title">
                    {{item.titulo}}
                  </div>
                </figure>
                <div class="caption flex-grow-1">
                  {{item.descripcion}}
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col>
              <VueGoodTable
                styleClass="vgt-table striped"          
                v-bind="goodTable"
              >
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <span v-if="props.column.field == 'titulo'">
                    <div v-b-tooltip.hover class="title-tab" :title="props.formattedRow[props.column.field]">
                      {{props.formattedRow[props.column.field]}}
                    </div>
                  </span>
                  <div v-else-if="props.column.field === 'image'">
                    <figure class="thumbnail-table">
                      <cld-image v-if="props.row.image.indexOf('cloudinary') != -1" :public-id="props.row.image | urlImages" >
                        <cld-transformation gravity="center" height="50" width="50" crop="thumb" />
                      </cld-image>
                      <div v-else class="imageStorage">
                        <img :src="props.row.image" alt="">
                      </div>
                    </figure>
                  </div>
                  <span v-else-if="props.column.field === 'created_at'">
                    {{formatDate(props.formattedRow[props.column.field], { month: "long", day: "numeric", year: 'numeric'})}}<br>
                    {{formatDate(props.formattedRow[props.column.field], { hourCycle: 'h12', hour: 'numeric', minute: 'numeric'})}}
                  </span>
                  <span v-else-if="props.column.field === 'actions'" class="d-flex">
                    <b-button @click="formBlog(props.row)" class="btn-icon d-flex justify-content-center align-items-center mr-10" pill variant="success">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '15px'}" fill="currentColor"><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
                    </b-button>
                    <b-button :href="url + 'blog/detalle/' + props.row.slug" target="_blank" class="btn-icon d-flex justify-content-center align-items-center mr-10" pill variant="info">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '15px'}" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M480 32H128C110.3 32 96 46.33 96 64v336C96 408.8 88.84 416 80 416S64 408.8 64 400V96H32C14.33 96 0 110.3 0 128v288c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V64C512 46.33 497.7 32 480 32zM272 416h-96C167.2 416 160 408.8 160 400C160 391.2 167.2 384 176 384h96c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 320h-96C167.2 320 160 312.8 160 304C160 295.2 167.2 288 176 288h96C280.8 288 288 295.2 288 304C288 312.8 280.8 320 272 320zM432 416h-96c-8.836 0-16-7.164-16-16c0-8.838 7.164-16 16-16h96c8.836 0 16 7.162 16 16C448 408.8 440.8 416 432 416zM432 320h-96C327.2 320 320 312.8 320 304C320 295.2 327.2 288 336 288h96C440.8 288 448 295.2 448 304C448 312.8 440.8 320 432 320zM448 208C448 216.8 440.8 224 432 224h-256C167.2 224 160 216.8 160 208v-96C160 103.2 167.2 96 176 96h256C440.8 96 448 103.2 448 112V208z"/></svg>
                    </b-button>
                    <b-button @click="deleteBlog(props.row.id)" class="btn-icon d-flex justify-content-center align-items-center" pill variant="danger">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '15px'}" fill="currentColor"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                    </b-button>
                  </span>
                  <span v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </span>
                </template>
                <template
                  slot="pagination-bottom"
                  slot-scope="props"
                >
                  <div class="d-flex flex-wrap align-items-center mt-1">
                    <div v-if="blogs.length > perPage" class="d-flex align-items-center">
                      <span class="text-nowrap">
                        Mostrando 1 a
                      </span>
                      <b-form-select
                        v-model="perPage"
                        :options="['10','20','100']"
                        class="mx-1"
                        @input="(value)=>props.perPageChanged({currentPerPage:value})"
                      />
                      <span class="text-nowrap"> de {{ props.total }} registros </span>
                    </div>
                    <div v-if="props.total > perPage" class="d-flex ml-auto">
                       <b-pagination :value="1"
                        :total-rows="props.total"
                        :per-page="perPage"
                        first-number
                        last-number
                        align="right"
                        prev-class="prev-item"
                        next-class="next-item"
                        class="mb-0"
                        @input="(value)=>props.pageChanged({currentPage:value})"
                      >
                        <template #prev-text>
                          <feather-icon
                            icon="ChevronLeftIcon"
                            size="18"
                          />
                        </template>
                        <template #next-text>
                          <feather-icon
                            icon="ChevronRightIcon"
                            size="18"
                          />
                        </template>
                      </b-pagination>
                    </div>
                  </div>
                </template>
              </VueGoodTable>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <div v-else class="alert alert-info p-2">
        No hay Articulos resgistrados
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
        <component is="FormBlog" ref="FormBlog" @send="consoleData" :prop="modal" />
        <template #footer>
          <b-overlay :show="overlay">
            <b-button variant="info"  @click="sendModal" :disabled="overlay">
              {{modal.tipo != 'add' ? 'Guardar' : 'Crear Blog'}}
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
  import { VueGoodTable } from 'vue-good-table'
  import { formatDate } from "@core/utils/filter";
  import FormBlog from './FormBlog'
  import mixinConfig from '@/views/componente/mixinConfig'
  import mixinApis from '@/views/componente/mixinApis'
  export default {
    name: 'BlogList',
    mixins:[mixinApis, mixinConfig],
    components: {
      VModal,
      VueGoodTable,
      FormBlog
    },
    data() {
      return {
        overlay: false,
        imgValidateURL,
        formatDate,
        modalState: false,
        modal: {},

        grid: false,
        columns: [
          {field: "id", label: "ID", width:'6em'},
          {field: "image", label: "Imagen", width: '7em'},
          {field: "titulo", label: "Título", width: '12em'},
          {field: "descripcion", label: "Descripcíon" },
          {field: "created_at", label: "Fecha", width: '15em'},
          {field: "actions", label: "Acciones", width:'10em'},
        ],
        perPage: 10,
      }
    },
    computed:{
      goodTable(){
        return {
          columns: this.columns,
          rows: this.blogs,
          paginationOptions: {
            enabled: true,
            perPage: this.perPage
          }
        }
      },
      blogs(){
        return this.$store.state.banners.blogs;
      },
    },
    mounted() {
      this.getBlogs();
    },
    methods: {
      consoleData(value){
        if(this.modal.tipo == 'add'){
          this.blogs.push(value);
        }else{
          for(let item of this.blogs){
            if(item.id == value.id){
              Object.assign(item, value);
            }
          }
        }
      },
      formBlog(item){
        Object.assign(this.modal, 
          item ?
          {
            titulo: 'Guardar Blog',
            tipo: 'edit',
            item
          }:{
            titulo: 'Crear Blog',
            tipo: 'add',
          }
        );
        this.modalState = true;
      },
      sendModal(){
        this.overlay = true;
        this.$refs['FormBlog'].onSubmit()
        .then( state => { 
          this.overlay = false;
          if(state){
            this.modalState = false;
          }
        });
      },
      async deleteBlog(id) {
        this.overlay = true;
        await this.$store.dispatch("banners/delBlog", {id})
        .then((response) => {
          const del = response.data.data;
          for(let index in this.blogs){
            if(this.blogs[index].id == del.id){
              this.blogs.splice(index, 1);
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
      async getBlogs(){
        if(this.blogs.length === 0){
          this.overlay = true;
          await this.$store.dispatch("banners/getBlogs")
          .then((response) => {
            this.overlay = false;
          }).catch((error) => {
            console.error(error);
          });
        }

      },

    }
  }
</script>
<style lang="css">
  .title-tab {
    overflow: hidden;
    white-space: nowrap;
    width: 12em;
    text-overflow: ellipsis;
  }
  #BlogList .blog-card{
    border-radius: 1rem;
    box-shadow: 1px 1px 10px #00000026;
    overflow: hidden;
  }
  #BlogList .thumbnail {
    position: relative;
    padding-top: calc((100% / 5) * 3);
    margin: 0;
    z-index: 1;
  }
  #BlogList .thumbnail img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border: 1px solid #e8e8e8;
  }
  #BlogList .caption{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.6;
    max-height: 3.2em;
    overflow: hidden;
    margin: 1rem 1.5rem;
  }
  #BlogList .thumbnail .actions{
    position:absolute;
    z-index: 1;
    top:0;
    right:0;
  }
  #BlogList .thumbnail  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: linear-gradient(to top, #000000b3, #0000);
    width: 100%;
    padding: 3rem 2rem 1rem;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    text-shadow: 1px 1px 5px #00000080;
  }
  #BlogList .thumbnail-table {
    position: relative;
    height: 50px;
    display: block;
    width: 50px;
    margin: 0 auto;
  }

  #BlogList .thumbnail-table img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media(max-width:767px){
    .center_grid{
      margin:auto;
    }
  }
</style>