<template>
  <b-modal
    :id="infoModal.id"
    size="lg"
    ref="modal-portales-credentials-ciencuadra"
    title="Credenciales Ciencuadras"
    ok-title="Registrar"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @ok="addCredencialesPortalesUser"
  >
    <div class="demo-inline-spacing">
      <b-row>
        <b-col md="6" lg="12" class="mb-1">
          <!-- basic -->

          <b-form-group label="Usuario(username)" label-for="correo_fincaraiz">
            <b-form-input
              v-model="data.username"
              id="correo_fincaraiz"
              placeholder="Escribe tu Usuario"
            />
          </b-form-group>
        </b-col>

        <b-col md="6" lg="12" class="mb-1">
          <!-- disabled input -->
          <b-form-group
            label="Contraseña(password)"
            label-for="usuario_fincaraiz"
          >
            <b-form-input
              v-model="data.password"
              id="usuario_fincaraiz"
              placeholder="Escribe tu Contraseña"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </div>
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
  BCardText,
  BButton,
  BFormFile,
  BAvatar,
  BInputGroup,
  BFormTextarea,
  BOverlay,
  BImg,
  BMedia,
  BTabs,
  BTab,
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
    BCardText,
    BFormFile,
    BAvatar,
    BMedia,
    BFormTextarea,
    BForm,

    BTabs,
    BTab,
    BImg,
    BButton,
    BOverlay,
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
        id: "modal-portales-credentials-ciencuadra",
        title: "",
        content: {},
        contentPreguntas: {},
      },

      data: {
        user_id: null,
        portale_id: null,
        username: null,
        password: null,
      },
      show_spinner_sin: false,
    };
  },

  computed: {
    usuario() {
      return this.$store.state.userData.userData;
    },
    portales() {
      return this.$store.state.appPortales.portales;
    },
  },

  methods: {
    info(code) {
      this.infoModal.content = { ...code };
      this.data = {
        user_id: null,
        portale_id: null,
        username: null,
        password: null,
      };
      this.getCredentialPortal();

      this.$root.$emit("bv::show::modal", this.infoModal.id);
    },

    hideModal() {
      this.$refs["modal-portales-credentials-ciencuadra"].hide();
    },

    async getCredentialPortal() {
      await this.$store
        .dispatch("appPortales/getCredencialesCienCuadra", {
          portal: this.infoModal.content.id,
        })
        .then((response) => {
          this.data = {
            user_id: response.user_id,
            portale_id: response.portale_id,
            username: response.username,
            password: response.password,
          
          };
        })
        .catch((error) => {
        });
    },

    async addCredencialesPortalesUser(data) {
      await this.$store
        .dispatch("appPortales/addCredencialesCiencuadra", {
          portal: this.infoModal.content.id,
          user_id: this.data.user_id,
          username: this.data.username,
          password: this.data.password,
        })
        .then(() => {})
        .catch((error) => {
        });
    },
  },
};
</script>

<style lang="scss">
</style>

