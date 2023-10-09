<template>
  <b-card title="Editar Banner">
    <b-container style="background-color: #fff">
      <b-row>
        <b-col cols="12">
          <h1>Editar Banner</h1>
        </b-col>

        <b-col md="8" xl="8">
          <b-col cols="12">
            <b-form-group label="Titulo" label-for="Titulo">
              <b-form-input
                placeholder="Titulo"
                type="text"
                v-model="item.titulo"
                id="titulo"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
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

          <b-col cols="12">
            <b-form-group label="Enlace" label-for="Enlace">
              <b-form-input
                @change="previewImage"
                placeholder="Enlace"
                type="text"
                v-model="item.enlace"
                id="enlace"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Posicion" label-for="Posicion">
              <b-form-input
                placeholder="Posicion"
                type="text"
                v-model="item.posicion"
                id="posicion"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Imagen" label-for="Imagen">
              <b-form-file
                @change="previewImage"
                v-model="image"
                :state="Boolean(image)"
                placeholder="Seleccione o arraste su imagen"
                drop-placeholder="Sortal imagen aqui "
              ></b-form-file>
            </b-form-group>
          </b-col>

          <div class="mt-2" v-if="item.imagen">
            <img
              v-if="item.imagen.substr(0, 4) == 'http'"
              style="width: 60px"
              :src="item.imagen"
            />
            <img
              v-else-if="item.imagen.substr(0, 4) == 'data'"
              style="width: 60px"
              :src="item.imagen"
            />
            <img v-else style="width: 60px" :src="'/storage/' + item.imagen" />
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
const base64Encode = (data) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
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
    },

    hasImage() {
      return !!this.image;
    },
  },

  data() {
    return {
      id: this.$route.params.id,
      text: "",
      titulo: "",
      descripcion: "",
      enlace: "",
      posicion: "",
      file1: null,
      file2: null,
      image: null,
      imageSrc: null,
      items: [],
      item: [],
    };
  },
  watch: {
    image(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then((value) => {
              this.imageSrc = value;
            })
            .catch(() => {
              this.imageSrc = null;
            });
        } else {
          this.imageSrc = null;
        }
      }
    },
  },

  created() {
    this.getBanner();
  },

  methods: {
    previewImage: function (event) {
      var input = event.target;
      this.item.imagen = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.item.imagen = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    getBanners() {
      this.$store
        .dispatch("banners/getBanners")
        .then((response) => {
          this.items = response.data.banners;
        })
        .catch((error) => {
        });
    },

    sendData() {
      let formData = new FormData();

      formData.append("id", this.id);
      formData.append("titulo", this.item.titulo);
      formData.append("descripcion", this.item.descripcion);
      formData.append("enlace", this.item.enlace);
      formData.append("posicion", this.item.posicion);
      formData.append("files[]", this.image);

      this.$store
        .dispatch("banners/updBanners", formData)
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
    getBanner() {
      let formData = new FormData();

      formData.append("id", this.id);

      this.$store
        .dispatch("banners/getBanner", formData)
        .then((response) => {
          this.item = response.data.data.banner;
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