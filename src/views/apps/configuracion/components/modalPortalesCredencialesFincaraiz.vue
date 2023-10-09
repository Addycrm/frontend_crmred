<template>
  <b-modal
    :id="infoModal.id"
    size="lg"
    ref="modal-portales-credentials"
    title="Credenciales Fincaraiz"
    ok-title="Registrar"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @ok="addCredencialesPortalesUser"
  >
    <div class="demo-inline-spacing">
      <b-row>
        <b-col md="6" xl="6" class="mb-1">
          <!-- basic -->

          <b-form-group label="Correo fincaraiz" label-for="correo_fincaraiz">
            <b-form-input
              v-model="data.email"
              id="correo_fincaraiz"
              placeholder="Escribe tu email"
            />
          </b-form-group>
        </b-col>

        <b-col md="6" xl="6" class="mb-1">
          <!-- disabled input -->
          <b-form-group label="Usuario fincaraiz" label-for="usuario_fincaraiz">
            <b-form-input
              v-model="data.user"
              id="usuario_fincaraiz"
              placeholder="Escribe tu usuario"
            />
          </b-form-group>
        </b-col>

        <b-col md="6" xl="12" class="mb-1">
          <!-- disabled input -->
          <b-form-group label="token fincaraiz" label-for="token_fincaraiz">
            <b-form-textarea
              v-model="data.token"
              id="textarea-rows"
              placeholder="Escribe tu token"
              rows="8"
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
        id: "modal-portales-credentials",
        title: "",
        content: {},
        contentPreguntas: {},
      },

      data: {
        user_id: null,
        portale_id: null,
        user: null,
        email: null,
        token: null,
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
        user: null,
        email: null,
        token: null,
      };
      this.getCredentialPortal();

      this.$root.$emit("bv::show::modal", this.infoModal.id);
    },

    hideModal() {
      this.$refs["modal-portales-credentials"].hide();
    },

    async getCredentialPortal() {
      await this.$store
        .dispatch("appPortales/getCredentialesPortales", {
          portal: this.infoModal.content.id,
        })
        .then((response) => {
          this.data = {
            user_id: response.user_id,
            portale_id: response.portale_id,
            user: response.user,
            email: response.email,
            token: response.token,
          };
        })
        .catch((error) => {
        });
    },

    async addCredencialesPortalesUser(data) {
      await this.$store
        .dispatch("appPortales/addCredencialesPortalesUser", {
          portal: this.infoModal.content.id,
          user_id: this.data.user_id,
          email: this.data.email,
          user: this.data.user,
          token: this.data.token,
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

