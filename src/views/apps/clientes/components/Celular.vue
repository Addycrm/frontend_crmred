<template>
  <div>
    <b-modal
      centered
      size="lg"
      title="Registrar Numero de celular"
      :id="infoModal.id"
      ok-title="Registrar"
      cancel-title="Cancelar"
      ref="modal"
      @ok="handleOk"
      ><form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="* Teléfono Celular"
          invalid-feedback="Phone is required"
          :state="nameState"
          label-for="v-celular"
        >
          <vue-phone-number-input
            default-country-code="CO"
            :translations="{
              countrySelectorLabel: 'Codigo pais',
              countrySelectorError: 'Choisir un pays',
              phoneNumberLabel: 'Numéro de Celular',
              example: 'Ejemplo :',
            }"
            v-model="form.numero"
            @update="results = $event"
          />
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {
  BFormGroup,
  BModal,
  VBModal,
  BRow,
  BCol,
  BContainer,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  name: "CelularComponent",

  components: {
    BModal,
    VBModal,
    BFormGroup,
    BRow,
    BCol,
    BContainer,
  },

  directives: {
    Ripple,
  },

  data() {
    return {
      nameState: null,
      submittedNames: [],
      infoModal: {
        id: "modal-add-celular",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      form: {
        cliente: null,
        numero: null,
      },
    };
  },

  methods: {
    handleOk(bvModalEvt) {
      // Prevent modal from closing

      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names

      this.$store
        .dispatch("appDocumentos/registerNumerosClientes", this.form)
        .then((response) => {
          this.$root.$emit("registerNumero", response);
          this.$nextTick(() => {
            this.$refs["modal"].hide();
          });
          this.form.numero = null;
        })
        .catch((error) => {
        });
      // Trigger submit handler
      this.handleSubmit();
    },

    handleSubmit() {
      // Hide the modal manually
    },

    info(item, button) {
      this.infoModal.content = item;

      this.form.cliente = item;

      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
  },
};
</script>

<style>
.img-modal {
  width: 100%;
  height: 100%;
}
</style>
