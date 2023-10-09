<template>
  <b-card  title-md="lg">
    <h3>Credenciales</h3>
    <b-container style="background-color: #fff">

      <b-row class="mt-2">
        <b-col cols="12" >
          <h4>Dominio de la App</h4> 
        </b-col>
        
        <b-col md="8" xl="8" >
          <b-col cols="12" >
            <b-form-group label="Dominio" label-for="Dominio" label-size="lg">
              <b-form-input
                placeholder="Dominio de la App"
                type="text"
                v-model="item.dominio"
                id="dominio"
              />
            </b-form-group>
          </b-col>
        
        </b-col>
      </b-row>

      <hr>  


      <b-row class="mt-2">
        <b-col cols="12" >
          <h4>Credenciales de Cpanel</h4> 
        </b-col>
        
        <b-col md="8" xl="8" >

          <b-col cols="12" >
            <b-form-group label="Cpanel User" label-for="Cpanel User" label-size="lg">
              <b-form-input
                placeholder="Cpanel User"
                type="text"
                v-model="item.cpanel_user"
                id="cpanel_user"
              />
            </b-form-group>
          </b-col>
        
          <b-col cols="12" >
            <b-form-group label="Cpanel Token" label-for="Cpanel Token" label-size="lg">
              <b-form-input
                placeholder="Cpanel Token"
                type="text"
                v-model="item.cpanel_token"
                id="cpanel_token"
              />
            </b-form-group>
          </b-col>

        
        </b-col>
      </b-row>

        <b-row class="mt-3">
        <b-col>
          <b-button
            variant="success"
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
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import imageComponent from "../../componente/Image-component.vue";
import store from "@/store";



export default {
  components: {
    ToastificationContent,
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
    this.getCredenciales();
  },

   methods: {


    sendData() {
      
      let formData = new FormData();
      formData.append("dominio", this.item.dominio);
      formData.append("cpanel_user", this.item.cpanel_user);
      formData.append("cpanel_token", this.item.cpanel_token);
        this.$store
          .dispatch("banners/updcredenciales", formData)
          .then((response) => {

            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Se ha actualizaco correctamente la información',
                icon: "EditIcon",
                variant: "info",
              },
            });

          })
          .catch((error) => {
            this.show = false;
            
          });
      },
      getCredenciales() {
      
      let formData = new FormData();

      formData.append("id", this.id);
        this.$store
          .dispatch("banners/getcredenciales", formData)
          .then((response) => {
            this.item=response.data.data.credenciales;
          })
          .catch((error) => {
            this.show = false;
             
          });
      },


   },
  
};
</script>