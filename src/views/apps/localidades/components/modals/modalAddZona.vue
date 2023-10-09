<template>
  <b-modal
    ref="modal-add-zona"
    id="modal-add-zona"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    ok-title="Registrar"
    cancel-title="Cancelar"
    centered
    size="sm"
    title="Agregar Zona"
  >
    <b-card-text>
      <b-row>
        <b-col>
          <form ref="formZona" @submit.stop.prevent="handleSubmitZona">
            <b-form-group label="name" label-for="basicInput">
              <b-form-input
                v-model="zona.name"
                id="basicInput"
                placeholder="Ingresar el nombre de la zona"
              />
            </b-form-group>
            <b-form-group label="Descripcion" label-for="basicInput">
              <b-form-textarea
                v-model="zona.descripcion"
                id="basicInput"
                placeholder="Ingresa la descripcion"
              />
            </b-form-group>
          </form>
        </b-col>
      </b-row>
    </b-card-text>
  </b-modal>
</template>

<script>
import {
  BModal,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BCol,
  BRow,
  BCardText,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BModal,
    BFormGroup,
    BFormInput,
    BCol,
    BRow,
    BFormTextarea,
    BCardText,
  },

  directives: {
    Ripple,
  },
  data() {
    return {
      infoModal: {
        id: "modal-add-zona",
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
      zona: {},
    };
  },

  methods: {
    info(code, button) {
      this.zona = {};
      this.infoModal.content = { ...code };

      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-add-zona"].hide();
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

    handleOk() {
      let data = {
        ciudad_id: this.$route.params.id,
        name: this.zona.name,
      };

      this.$store
        .dispatch("appLocalidades/saveZona", data)
        .then(() => {
          let codigo = this.$route.params.id;
          this.$store
            .dispatch("appLocalidades/getZona", { codigo })
            .then(() => {})
            .catch((error) => {
            });

          this.hideModal();
        })
        .catch((error) => {
          this.hideModal();
        });
    },
  },
};
</script>

<style>
</style>