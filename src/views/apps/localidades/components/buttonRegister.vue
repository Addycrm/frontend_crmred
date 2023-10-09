<template>
  <div class="custom-search d-flex justify-content">
    <b-form-group>
      <div class="d-flex align-items-center">
        <b-button variant="relief-success" v-b-modal.localidadModal>
          Registrar
        </b-button>
      </div>
    </b-form-group>
    <b-modal
      id="localidadModal"
      ref="localidadModal"
      title="Registro"
      ok-only
      ok-title="Enviar"
      cancel-variant="outline-secondary"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-card-text>
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="nameState"
            label="Nombre"
            label-for="name-input"
            invalid-feedback="Nombre es requerido"
          >
            <b-form-input
              id="name-input"
              name="Nombre"
              v-model="name"
              :state="nameState"
              required
            />
          </b-form-group>
        </form>
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  name: "buttonRegister",

  data() {
    return {
      name: "",
      nameState: null,
    };
  },

  props: {
    greetingMessage: String,
    type: String,
  },

  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },

    resetModal() {
      this.name = "";
      this.code = null;
    },

    async handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (!this.checkFormValidity()) {
        return;
      }

      let url = "";
      let commit = "";
      switch (this.type) {
        case "dep":
          url = "state";
          commit = "SET_STATE";

          break;
        case "city":
          url = "ciudades";
          commit = "SET_CITY";

          break;
        case "zone":
          url = "zona";
          commit = "SET_ZONA";
          break;
        case "barrio":
          url = "barrio";
          commit = "SET_BARRIO";

          break;
        default:
          break;
      }

      await this.$http({
        url: "api/auth/localidad/" + url,
        method: "post",
        data: { name: this.name, code: this.greetingMessage },
      })
        .then((res) => {
          this.$store.commit("appLocalidades/" + commit, res.data.data);
          this.toash("success", "Se registro correctamente");
        })
        .catch((err) => {
          this.toash("danger", "Ocurrio un error interno por favor intentalo de nuevo");

        });

       this.$refs["localidadModal"].hide();


    },

    toash(params, message) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: message,
          icon: "EditIcon",
          variant: params,
        },
      });
    },
  },
};
</script>

<style>
</style>