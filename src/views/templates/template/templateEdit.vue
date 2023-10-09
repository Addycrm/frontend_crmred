<template>

      <b-card
    title="Editar Template"
  >

    <b-container style="background-color: #fff">
      <b-row>
        <b-col cols="12" >
          <h1>Editar Template</h1> 
        </b-col>
        
        <b-col md="8" xl="8" >

          <b-col cols="12" >
            <b-form-group label="Nombre" label-for="Nombre">
              <b-form-input
                placeholder="Nombre"
                type="text"
                v-model="item.nombre"
                id="nombre"
              />
            </b-form-group>
          </b-col>
        
          <b-col cols="12" >
            <b-form-group label="Descripción" label-for="Descripción">
              <b-form-textarea
              id="textarea"
              v-model="item.descripcion"
              placeholder="Descripción"
              rows="3"
              max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>

          <b-col cols="12" >
            <b-form-group label="Ip del servidor" label-for="Ip del servidor">
              <b-form-input
                placeholder="Url"
                type="text"
                v-model="item.url"
                id="ip"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12" >
            <b-form-group label="Posicion" label-for="Posicion">
              <b-form-input
                placeholder="Posicion"
                type="text"
                v-model="item.posicion"
                id="posicion"
              />
            </b-form-group>
          </b-col>


          <b-col cols="12" >
            <b-form-group label="Imagen" label-for="Imagen">
            <b-form-file
              v-model="image"
              :state="Boolean(image)"
              placeholder="Seleccione o arraste su imagen"
              drop-placeholder="Sortal imagen aqui "
            ></b-form-file>
            </b-form-group>
          </b-col>

          <div class="mt-2">
              <img style="width:60px;" :src="item.imagen">
            
          </div>

        </b-col>
      </b-row>

        <b-row class="mt-3">
        <b-col>
          <b-button
            variant="primary"
            class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            @click="sendData()"
          >
            Guardar cambios
          </b-button>
        </b-col>
      </b-row>


    
    </b-container>

  </b-card>
</template>

<script>

const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


import {
  BImg,
  BFormFile,
  BFormInput,
  BFormTextarea,
  BFormGroup,
  BCard,
  BCardText,
  BContainer,
  BRow,
  BCol,
  BButton,
} from "bootstrap-vue";
import imageComponent from "../../componente/Image-component.vue";
import store from "@/store";



export default {
  components: {
  BFormInput,
  BFormTextarea,
  BFormFile,
   BFormGroup,
  BImg,
     BCard,
    BCardText,
    BContainer,
    BRow,
    BCol,
    BButton,
    "image-component": imageComponent,
  },

  computed: {
    
     hasImage() {
      return !!this.image;
    }
  },


  data() {
    return {
        id: this.$route.params.id,
        text: '',
        titulo: '',
        descripcion: '',
        enlace: '',
        posicion: '',
        file1: null,
        file2: null,
        image: null,
        imageSrc: null,
        items: [],
        item: [],
    }
  },
  watch: {
    image(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then(value => {
              this.imageSrc = value;
            })
            .catch(() => {
              this.imageSrc = null;
            });
        } else {
          this.imageSrc = null;
        }
      }
    }
  },

  created() {
    this.getTemplate();
  },

   methods: {

       getBanners(){

          this.$store
          .dispatch("banners/getBanners")
          .then((response) => {
            this.items=response.data.banners;
          })
          .catch((error) => {
          });

      },

    sendData() {
      
      let formData = new FormData();

      formData.append("id", this.id);
      formData.append("nombre", this.item.nombre);
      formData.append("descripcion", this.item.descripcion);
      formData.append("url", this.item.url);
      formData.append("posicion", this.item.posicion);
      formData.append("files[]", this.image);


        this.$store
          .dispatch("banners/updtemplate", formData)
          .then((response) => {

            this.$router.push({ name: "template-list" });

          })
          .catch((error) => {
            this.show = false;
            
          });
      },
      getTemplate() {
      
      let formData = new FormData();

      formData.append("id", this.id);


        this.$store
          .dispatch("banners/gettemplate", formData)
          .then((response) => {
            
              this.item=response.data.data.template;
            
          })
          .catch((error) => {
            this.show = false;
             
          });
      },


   },
  
};
</script>