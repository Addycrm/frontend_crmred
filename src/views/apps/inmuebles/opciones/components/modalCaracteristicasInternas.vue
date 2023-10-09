<template>
  <b-modal
    :id="infoModal.id"
    ref="modal-caraceristicas-internas-1"
    title=""
    ok-title="Registrar"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleSubmit"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <span v-for="portal in appPortal.portales" :key="portal.id">
        <div class="demo-inline-spacing">
          <img
            :src="portal.image"
            alt=""
            srcset=""
            style="max-width: 13%"
          />
          <b-form-group :label="portal.name" label-for="name-input">
            <b-form-input v-model="portal.codigo" />
          </b-form-group>
        </div>
      </span>
    </form>
  </b-modal>
</template>

<script>
import {
  BModal,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormFile,
  BFormTextarea,
  BAvatar,
  BInputGroup,
  BMedia,
  BInputGroupPrepend,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "edictRole",
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormFile,
    BAvatar,
    BMedia,
    BFormTextarea,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      infoModal: {
        id: "modal-caraceristicas-internas-1",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      portales: [],
      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus inmuebles.",
        readOnly: true,
      },
      imageData: "",
      form: null,
      file: "",
      image: "",
      description: "",
      name: "",
      nameState: null,
    };
  },
  computed:{
    appPortal(){
      return this.$store.state.appPortales;
    },
  },
  methods: {
    info(code, button) {
      this.portales = [];

      this.infoModal.content = { ...code };


      this.getPortales();

      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    getPortales() {
      this.$store
        .dispatch("appPortales/fetchPortales")
        .then((response) => {

          this.portales = response;

          var data = this.infoModal.content.portales_caracteristicas_internas;
          for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (response[i].id == data[j].portale_id) {
                response[i].codigo = data[j].codigo;
              }
            }
          }

          this.portales = response;

        })
        .catch(() => {});
    },

    hideModal() {
      this.$refs["modal-caraceristicas-internas-1"].hide();
    },

    checkFormValidityZona() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },

    previewImage: function (event) {
      var input = event.target;
      this.image = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    handleSubmit() {
      this.$store
        .dispatch("appPortales/addCaracteristicasInternas", {
          portales: this.portales,
          id: this.infoModal.content.id,
        })
        .then(() => {
          this.$store
            .dispatch("apiInmueblePrivate/getCaracteristicasInternas", {})
            .then(() => {});
          this.hideModal();
        })
        .catch((error) => {
          this.hideModal();
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>

