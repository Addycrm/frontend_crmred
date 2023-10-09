<template>
<b-card
    title="Crear Banner"
  >
  <b-container style="background-color: #fff">

    <b-row>
      <b-col md="8" xl="8" >
        <b-col cols="12" >
          <b-form-group label="Titulo" label-for="Titulo">
            <b-form-input
              placeholder="Titulo"
              type="text"
              v-model="titulo"
              id="titulo"
            />
          </b-form-group>
        </b-col>
      
        <b-col cols="12" >
          <b-form-group label="Descripción" label-for="Descripción">
            <b-form-textarea
            id="textarea"
            v-model="descripcion"
            placeholder="Descripción"
            rows="3"
            max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-col>

        <b-col cols="12" >
          <b-form-group label="Enlace" label-for="Enlace">
            <b-form-input
              placeholder="Enlace"
              type="text"
              v-model="enlace"
              id="enlace"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12" >
          <b-form-group label="Posicion" label-for="Posicion">
            <b-form-input
              placeholder="Posicion"
              type="text"
              v-model="posicion"
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
          <b-img v-if="hasImage" :src="imageSrc" class="mb-3" fluid block rounded></b-img>
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
import imageComponent from "@/views/componente/Image-component.vue";
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
      text: '',
      titulo: '',
      descripcion: '',
      enlace: '',
      posicion: '',
      file1: null,
      file2: null,
      image: null,
      imageSrc: null
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

   methods: {

    sendData() {
      
      let formData = new FormData();

      formData.append("titulo", this.titulo);
      formData.append("descripcion", this.descripcion);
      formData.append("enlace", this.enlace);
      formData.append("posicion", this.posicion);
      formData.append("file", this.image);
        this.$store
          .dispatch("banners/addBanners", formData)
          .then((response) => {
            this.$router.push({ name: "banners-list" });
          })
          .catch((error) => {
            this.show = false;
            this.form.correos = [];
            this.form.numeros = [];
              this.$toast({
              component: ToastificationContent,
              props: {
                title: "Llena todos los campos",
                icon: "EditIcon",
                variant: "danger",
              },
            });
          });
      },
   },
};
</script>