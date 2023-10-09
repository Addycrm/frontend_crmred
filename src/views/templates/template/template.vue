<template>
  <b-card title="Crear Template">
    <b-container style="background-color: #fff">
      <b-row>
        <b-col md="8" xl="8">
          <b-col cols="12">
            <b-form-group label="Nombre" label-for="Nombre" label-size="lg">
              <b-form-input
                placeholder="Nombre"
                type="text"
                v-model="nombre"
                id="nombre"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Descripción" label-for="Descripción" label-size="lg">
              <b-form-textarea
                id="textarea"
                v-model="descripcion"
                placeholder="Descripción"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Ip del Servidor" label-for="IP" label-size="lg">
              <b-form-input
                placeholder="Ip del Servidor"
                type="text"
                v-model="url"
                id="IP"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Posición" label-for="Posicion" label-size="lg">
              <b-form-input
                placeholder="Posición"
                type="text"
                v-model="posicion"
                id="posicion"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Imagen" label-for="Imagen" label-size="lg">
              <b-form-file
                v-model="image"
                :state="Boolean(image)"
                placeholder="Seleccione o arraste su imagen"
                drop-placeholder="Sortal imagen aqui "
              ></b-form-file>
            </b-form-group>
          </b-col>

          <div class="mt-2">
            <b-img
              v-if="hasImage"
              :src="imageSrc"
              class="mb-3"
              fluid
              block
              rounded
            ></b-img>
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col>
          <b-button
            size="lg"
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
  },

  data() {
    return {
      text: "",
      nombre: "",
      descripcion: "",
      url: "",
      posicion: "",
      file1: null,
      file2: null,
      image: null,
      imageSrc: null,
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

  methods: {
    sendData() {
      let formData = new FormData();

      formData.append("nombre", this.nombre);
      formData.append("descripcion", this.descripcion);
      formData.append("url", this.url);
      formData.append("posicion", this.posicion);
      formData.append("files[]", this.image);

      this.$store
        .dispatch("banners/addtemplate", formData)
        .then((response) => {
          this.$router.push({ name: "template-list" });
        })
        .catch((error) => {
          this.show = false;
        });
    },
  },
};
</script>
