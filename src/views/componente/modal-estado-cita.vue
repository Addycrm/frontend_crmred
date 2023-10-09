<template>
  <b-form @submit="onSubmit">
    <b-row>
      <!-- first name -->
      <b-col cols="12">
        <b-form-group label="Estado cita" label-for="">
          <v-select
            v-model="form.state_cita"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="name"
            :options="state_agenda_cita"
            input-id="calendar"
          >
          </v-select>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group
          label="Comentario del Resultado de la Cita"
          label-for="description"
        >
          <b-form-textarea
            id="textarea-rows"
            v-model="form.comentario_cita"
            placeholder="Escribe tu descripcion"
            rows="8"
          />
        </b-form-group>
      </b-col>

      <b-col cols="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
        >
          Aceptar
        </b-button>
      </b-col>
    </b-row>
  </b-form>
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
  BFormTextarea,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";

export default {
  name: "registerRole",
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BFormTextarea,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      infoModal: {
        id: "modal-estado-cita",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      form: {
        id_agenda: null,
        state_cita: null,
        comentario_cita: null,
      },
      snowOption: {
        theme: "snow",
        placeholder: "",
        readOnly: true,
      },
    };
  },
  props:['prop'],
  computed: {
    state_agenda_cita() {
      return this.$store.state.appCalendar.state_agenda_cita;
    },
  },
  mounted(){
    this.info(this.prop);
  },
  methods: {
    info(id) {
      this.form = {
        id_agenda: id,
        state_cita: null,
        comentario_cita: null,
      }

      this.getEstateInmueble(id);
    },

    hideModal() {
      this.$emit('closeModal')
    },

    getEstateInmueble(id) {
      this.$store
        .dispatch("appCalendar/fetchEstadoAgendaCitasForInmueble", {
          id
        })
        .then((response) => {
          this.form = response;
        })
        .catch(() => {});
    },

    onSubmit(event) {
      event.preventDefault();
      this.$store
        .dispatch("appCalendar/addEstadoAgendaReport", this.form)
        .then(() => {
          this.hideModal();
        })
        .catch((data) => {
        });
    },

    onUpdate(event) {
      event.preventDefault();
      this.$store
        .dispatch("appCalendar/addEstadoAgendaReport", this.form)
        .then(() => {
          this.hideModal();
        })
        .catch((data) => {
        });
    },
  },

  setup() {},
};
</script>