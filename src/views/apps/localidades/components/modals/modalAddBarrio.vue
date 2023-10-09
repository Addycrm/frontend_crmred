<template>
  <b-modal
    ref="modal-add-barrio"
    id="modal-add-barrio"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    ok-title="Registrar"
    cancel-title="Cancelar"
    centered
    size="sm"
    title="Agregar barrio"
  >
    <b-card-text>
      <b-row>
        <b-col>
          <form ref="formbarrio" @submit.stop.prevent="handleSubmitbarrio">
            <b-form-group label="name" label-for="basicInput">
              <b-form-input
                v-model="barrio.name"
                id="basicInput"
                placeholder="Ingresar el nombre de la barrio"
              />
            </b-form-group>
            <b-form-group label="Descripcion" label-for="basicInput">
              <b-form-textarea
                v-model="barrio.descripcion"
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
        id: "modal-add-barrio",
        title: "",
        content: {},
        contentPreguntas: {},
      }, 
    
      barrio: {},
    };
  },

  methods: {
    info(button) {
      this.barrio = {};

      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-add-barrio"].hide();
    },

    checkFormValiditybarrio() {
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
        zona_id: this.$route.params.id,
        name: this.barrio.name,
      };

      this.$store
        .dispatch("appLocalidades/saveBarrio", data)
        .then(() => {
          let codigo = this.$route.params.id;
          this.$store
            .dispatch("appLocalidades/getBarrio", { codigo })
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