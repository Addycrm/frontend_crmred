<template>
  <b-modal
    :id="infoModal.id"
    size="lg"
    ref="modal-cita"
    title=""
    ok-title="Registrar"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @ok="soatActions"
  >
    <b-form @submit.prevent>
      <b-row>
        <b-col md="6">
          <b-form-group label="" label-for="mc-first-name">
            <b-form-input id="mc-first-name" placeholder="First Name" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Last Name" label-for="mc-last-name">
            <VueCtkDateTimePicker
              label="Seleciona tu fecha"
              :no-button-now="true"
              v-model="data.send_date"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="City" label-for="mc-city">
            <b-form-input id="mc-city" placeholder="City" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Country" label-for="mc-country">
            <b-form-input id="mc-country" placeholder="Country" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Company" label-for="mc-company">
            <div class="form-label-group">
              <b-form-input id="mc-company" placeholder="Company" />
            </div>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label-for="mc-email" label="Email">
            <div class="form-label-group">
              <b-form-input id="mc-email" type="email" placeholder="Email" />
            </div>
          </b-form-group>
        </b-col>

        <!-- submit and reset -->
      </b-row>
    </b-form>
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
    BForm,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      infoModal: {
        id: "modal-cita",
        title: "",
        content: {},
        contentPreguntas: {},
      },

      data: {
        send_date: null,
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
    info(code, button) {
      this.infoModal.content = { ...code };

      this.getPortales();

      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-cita"].hide();
    },

    soatActions() {
      this.show_spinner_sin = true;
      this.$store
        .dispatch("appInmueble/soatAction", this.infoModal.content.id)
        .then((data) => {
          this.show_spinner_sin = false;
          this.infoModal();
        });
    },

    getPortales() {
      this.$store
        .dispatch("appPortales/fetchPortales")
        .then((response) => {
          let crp = response[0].credenciales_portales;

          this.data.email = crp.email;
          this.data.token = crp.token;
          this.data.user = crp.user;
        })
        .catch((error) => {
        });
    },

    getCredencialesPortalesUser(portal) {
      this.$store
        .dispatch("appPortales/addCredencialesPortalesUser", {
          portal: data,
          user_id: this.usuario.id,
          email: this.data.email,
          user: this.data.user,
          token: this.data.token,
        })
        .then((response) => {
        })
        .catch((error) => {
        });
    },

    addCredencialesPortalesUser(data) {
      this.$store
        .dispatch("appPortales/addCredencialesPortalesUser", {
          portal: data,
          user_id: this.usuario.id,
          email: this.data.email,
          user: this.data.user,
          token: this.data.token,
        })
        .then(() => {
          this.data = null;
          this.show_spinner_sin = false;
        })
        .catch((error) => {
        });
    },
  },
};
</script>

<style lang="scss">
</style>

