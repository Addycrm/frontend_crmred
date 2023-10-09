<template>
  <b-card title="Editar Perfil">
    <b-container style="background-color: #fff">
      <b-row>
        <b-col cols="12">
          <h1>Editar Perfil</h1>
        </b-col>
        <b-col md="8" xl="8">
          <b-col cols="12">
            <b-form-group label="Nombre" label-for="Nombre">
              <b-form-input
                placeholder="Nombre"
                type="text"
                v-model="form.nombre"
                id="nombre"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Patch" label-for="Patch">
              <b-form-input
                placeholder="Patch"
                type="text"
                v-model="form.patch"
                id="Patch"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Descripción" label-for="Descripción">
              <b-form-textarea
                id="textarea"
                v-model="form.descripcion"
                placeholder="Descripción"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>

          <b-col cols="12">
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
            <img style="width: 60px" :src="form.imagen" />
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
  },
  data() {
    return {
      text: "",
      titulo: "",
      descripcion: "",
      enlace: "",
      posicion: "",
      file1: null,
      file2: null,
      image: null,
      imageSrc: null,
      form:{
        id: this.$route.params.id,
        nombre: null,
        descripcion: null,
        image: null,
        patch: null,
      }
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

  mounted() {
    this.getPerfil();
  },
  methods: {

    sendData() {
      let formData = new FormData();
      formData.append("id", this.form.id);
      formData.append("nombre", this.form.nombre);
      formData.append("patch", this.form.patch);
      formData.append("descripcion", this.form.descripcion);
      formData.append("files[]", this.image);
      this.$store
        .dispatch("banners/updperfiles", formData)
        .then((response) => {
          this.$router.push({ name: "perfiles-list" });
        })
        .catch((error) => {
          this.show = false;
        });
    },

    async getPerfil() {
      await this.$store
        .dispatch("banners/getPerfil", this.form.id)
        .then((response) => {
          const {nombre, descripcion, imagen, patch} = response.data.data.perfiles;
          Object.assign(this.form, {nombre, descripcion, imagen, patch});
        }).catch(() => {
          this.show = false;
        });
    },
  },
};
</script>