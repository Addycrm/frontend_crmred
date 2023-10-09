<template>
  <b-modal
    :id="infoModal.id"
    size="lg"
    ref="modal-portales-credentials-punto-propiedad"
    title="Credenciales Punto propiedad"
    ok-title="Registrar"
    hide-footer
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @ok="addCredencialesPortalesUser"
  >
    <div class="demo-inline-spacing">
      <h1><strong> No disponible por el momento </strong></h1>
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
        id: "modal-portales-credentials-punto-propiedad",
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
      this.$refs["modal-portales-credentials-punto-propiedad"].hide();
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

