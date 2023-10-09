<template>
  <div id="InmuebleDetail" ref="InmuebleDetail">
    <b-overlay>
      <div class="row d-flex justify-content-center">
        <div>
          <input ref="input" type="file" name="image" accept="image/*" @change="setImage" />
          <div class="container_modify" style="gap:1rem;">
            <section class="cropper-area">
              <div class="img-cropper">
                <vue-cropper ref="cropper" :aspect-ratio="1/1" :view-mode="1" :src="imageOriginal" preview=".preview" v-if="imageOriginal!=null"/>
              </div>
              <div class="d-flex justify-content-center mt-1" style="gap:1rem;">
                <button type="button" class="btn btn-primary btn-modify" @click="cropImage" :disabled="!imageOriginal">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 1rem; height: 1rem; fill: white;">
                    <path d="M448 109.3l54.6-54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L402.7 64 160 64v64l178.7 0L128 338.7V32c0-17.7-14.3-32-32-32S64 14.3 64 32V64H32C14.3 64 0 78.3 0 96s14.3 32 32 32H64V384c0 35.3 28.7 64 64 64H352V384H173.3L384 173.3 384 480c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H448l0-274.7z"/>
                  </svg>
                  Recortar imagen 
                </button>
                <button  href="#"  type="button" class="btn btn-success btn-modify" @click.prevent="showFileChooser">
                  <span >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 1rem; height: 1rem; fill: white;">
                      <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V288H64V64H512z"/>
                    </svg>
                  </span>
                  Subir imagen desde ordenador
                </button>
              </div>
            </section>
            <section class="preview-area">
              <p class="text_title">Vista previa</p>
              <div class="container__vista-previa">
                <div class="preview" />
              </div>
            </section>
          </div>
        </div>

      </div>
    </b-overlay>
  </div>
</template>

<script >
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      cropImg: '',
      imageOriginal:this.image,
      data: null,
    };
  },
  props:{
    image:{
      type:String
    }
  },
  methods: {
    showToastNotification(variant,text) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Mi perfil',
          icon: 'UserIcon',
          text: text,
          variant,
        }
      })
    },
    showToastAlert(text){
      this.$swal({
            title:"Mi perfil",
            text: text,
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            confirmButtonText: "Cerrar",
            buttonsStyling: false,
          });
  },
    cropImage() {
      this.$refs.cropper.getCroppedCanvas().toBlob(
        blob => {
          // const formData = new FormData();
          //   // Add name for our image
          //   formData.append("name", "image-name-" + new Date().getTime())
          //   // Append image file
          //   formData.append("file", blob)

          this.uploadImage(blob)
        });

    },
    uploadImage(data){
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$emit('adjustImage',data,this.cropImg);
      this.showToastNotification('success','Se ha recortado y subido al sistema correctamente la imagen')
      this.$emit('closeModal');


    },
    setImage(e) {
      const file = e.target.files[0];
      // this.imageOriginal=file;
      if (file.type.indexOf('image/') === -1) {
        this.showToastNotification('warning','Por favor selecciona un archivo tipo imagen')
        return;
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          this.imageOriginal= event.target.result;
          this.showToastAlert('Se ha cargado correctamente la imagen, Ahora recorta la imagen a tu preferencia.')


          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('El archivo seleccionado no es soportado, debe ser extensión imagen: JPG,PNG.');
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  width: 1024px;
  margin: 0 auto;
}

.container_modify{
  display: flex;
  justify-content: center;
}

input[type="file"] {
  display: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}

.header h2 {
  margin: 0;
}

.header a {
  text-decoration: none;
  color: black;
}

.content {
  display: flex;
  justify-content: space-between;
}

.cropper-area {
  width: 100%;
  max-width: 400px;
}
.container__vista-previa{
  display: flex;
  flex-direction: column;
  padding: 6px;
  border: solid 2px var(--primary);
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;
}

.actions {
  margin-top: 1rem;
}

.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062CC;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.text_title{
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--primary);
  text-align: center;
  background-color: white;
}

.preview-area {
  max-width: 400px;
  min-width: 300px;
  margin: 0 auto;
  position: relative;
}


.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}

.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}

.cropped-image img {
  max-width: 100%;
}
@media (max-width:800px) {
  .container_modify{
    flex-direction: column;
}
}
@media (max-width:400px) {
  .cropper-area,.container__vista-previa{
    max-width: 270px;
    margin: 0 auto;
  }
  .text_title{
    font-size: 0.8rem;
  }
  .btn-modify{
    font-size: 0.8rem;
  }
}
</style>