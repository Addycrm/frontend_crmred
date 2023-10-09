<template>
  <b-card
    title="Editar Entrada de Blog"
    class="blog-edit-wrapper"
  >

    <!-- media -->
    <b-media
      no-body
      vertical-align="center"
    >
      <b-media-aside class="mr-75">
        <b-avatar
          size="38"
          :src="blog.avatar"
        />
      </b-media-aside>
      <b-media-body>
        <h6 class="mb-25">
          {{ blog.userFullName }}
        </h6>
        <b-card-text>{{ blog.createdTime }}</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        <b-col md="12">
          <b-form-group
            label="Titulo"
            label-for="blog-edit-title"
            class="mb-2"
          >
            <b-form-input
              id="blog-edit-title"
              v-model="generarSlug"
            />
          </b-form-group>
        </b-col>

         <b-col md="12">
          <b-form-group
            label="Descripcion"
            label-for="blog-edit-title"
            class="mb-2"
          >
            <b-form-input
              id="blog-edit-title"
              v-model="blog.descripcion"
            />
          </b-form-group>
        </b-col>
        <!--b-col md="6">
          <b-form-group
            label="Category"
            label-for="blog-edit-category"
            class="mb-2"
          >
            <v-select
              id="blog-edit-category"
              v-model="blog.categorias"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              :options="categoryOption"
            />
          </b-form-group>
        </b-col-->
        <b-col md="12">
          <b-form-group
            label="Slug"
            label-for="blog-edit-slug"
            class="mb-2"
          >
            <b-form-input
              id="blog-edit-slug"
              v-model="blog.slug"
            />
          </b-form-group>
        </b-col>
        <!--b-col md="6">
          <b-form-group
            label="Status"
            label-for="blog-edit-category"
            class="mb-2"
          >
            <v-select
              id="blog-edit-category"
              v-model="blog.estado_registro"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOption"
            />
          </b-form-group>
        </b-col-->
        <b-col cols="12">
          <b-form-group
            label="Content"
            label-for="blog-content"
            class="mb-2"
          >
            <quill-editor
              id="blog-content"
              v-model="blog.contenido"
              :options="snowOption"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          class="mb-2"
        >
          <div class="border rounded p-2">
            <h4 class="mb-1">
              Imagen
            </h4>
            <b-media
              no-body
              vertical-align="center"
              class="flex-column flex-md-row"
            >
              <b-media-aside>

                <b-img
                v-if="blog.image"
                  ref="refPreviewEl"
                  :src="blog.image"
                  height="110"
                  width="170"
                  class="rounded mr-2 mb-1 mb-md-0"
                />
              </b-media-aside>
              <b-media-body>
                <small class="text-muted">Se recomineda una imagen de 800x600, max 10mb.</small>
                <b-card-text class="my-50">
                  <b-link id="blog-image-text">
                  {{ blogFile ? blogFile.name : 'banner.jpg' }}
                  </b-link>
                </b-card-text>
                <div class="d-inline-block">
                  <b-form-file
                    ref="refInputEl"
                    v-model="blogFile"
                    accept=".jpg, .png, .gif"
                    placeholder="Buscar Archivo"
                    @input="inputImageRenderer"
                  />
                </div>
              </b-media-body>
            </b-media>
          </div>
        </b-col>
        <b-col
          cols="12"
          class="mt-50"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-1"
             @click="sendData()"
          >
            Guardar
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
          >
            Cancelar
          </b-button>
        </b-col>
      </b-row>
    </b-form>
    <!--/ form -->
  </b-card>
</template>

<script>
import {
  BCard, BMedia, BAvatar, BCardText, BMediaAside, BMediaBody, BForm, BRow, BCol, BFormGroup, BFormInput, BImg, BFormFile, BLink, BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { quillEditor } from 'vue-quill-editor'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'

export default {
  components: {
    BCard,
    BMedia,
    BAvatar,
    BCardText,
    BMediaAside,
    BMediaBody,
    BForm,
    BLink,
    BImg,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BFormFile,
    vSelect,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      blog: {
        avatar:'',
        userFullName:'',
        createdTime:'',
        titulo:'',
        categorias:'',
        slug:'',
        estado_registro:'',
        contenido:'',
        image:'',
      },
      id:this.$route.params.id,
      blogEdit: {},
      blogFile: null,
      categoryOption: ['Fashion', 'Food', 'Gaming', 'Quote', 'Video'],
      statusOption: ['Published', 'Pending', 'Draft'],
      snowOption: {
        theme: 'snow',
      },
    }
  },
  computed:{
    generarSlug:{
      get(){
        this.blog.slug=this.blog.titulo;
        this.blog.slug = this.blog.slug.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
        this.blog.slug = this.blog.slug.replace(/^\s+|\s+$/gm, '');
        this.blog.slug = this.blog.slug.replace(/\s+/g, '-');

        return this.blog.titulo;
      },
      set(newValue){
        this.blog.titulo=newValue;
      }
    }
  },
  created() {
     this.getBlog();
  },
  setup() {
    const refInputEl = ref(null)
    const refPreviewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => { refPreviewEl.value.src = base64 })

    return {
      refInputEl,
      refPreviewEl,
      inputImageRenderer,
    }
  },

  methods: {

    sendData() {
      
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("titulo", this.blog.titulo);
      formData.append("descripcion", this.blog.descripcion);
      formData.append("categorias", this.blog.categorias);
      formData.append("slug", this.blog.slug);
      formData.append("status", this.blog.status);
      formData.append("contenido", this.blog.excerpt);
      formData.append("files[]", this.blogFile);
        this.$store
          .dispatch("banners/updblog", formData)
          .then((response) => {
            this.$router.push({ name: "blogs-list" });
          })
          .catch((error) => {
           
             
          });
      },

      getBlog() {
      
      let formData = new FormData();

      formData.append("id", this.id);
        this.$store
          .dispatch("banners/getblog", formData)
          .then((response) => {
            
              this.blog=response.data.data.blog;

            
          })
          .catch((error) => {
           
              
          });
      },




   },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-blog.scss';
</style>
