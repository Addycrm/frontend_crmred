<template>
  <div>
    <b-card>
      <div class="d-flex justify-content-start align-items-center mb-1">
        <b-card style="font-size: 1.2rem;">
          <!-- about -->
          <div class="mt-2">
            <p>
              <strong > Nombre : </strong> {{ primer_nombre }}
            </p>
          </div>
          <div class="mt-2">
            <p><strong>E-Mail : </strong> {{ userdata.email }} </p>
          </div>
          <div class="mt-2">
            <p>
              <strong>Cedula: </strong> {{ cedula_persona }}
            </p>
          </div>
          <div class="mt-2">
            <p>
              <strong>Ciudad : </strong>Cali 
              </p>
          </div>
          <div class="mt-2">
            <p> <strong> Pais : </strong> Colombia </p>
          </div>
        </b-card>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BAlert,
  BAvatar,
  BCard,
  BCardText,
  BCardTitle,
  BImg,
  BLink,
  BRow,
  BCol,
  BAvatarGroup,
  VBTooltip,
  BFormTextarea,
  BButton,
  BFormGroup,
  BEmbed,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { kFormatter } from "@core/utils/filter";

export default {
  components: {
    BAvatar,
    BCard,
    BCardText,
    BCardTitle,
    BButton,
    BFormTextarea,
    BImg,
    BFormGroup,
    BRow,
    BLink,
    BCol,
    BAvatarGroup,
    BEmbed,
    BAlert,
  },
  data() {
    return {
      primer_nombre: "",
      primer_apellido: "",
      email: "",
      cedula_persona: "",

      fullName: null,
      rol: null,
      tipoidentificacion: null,
    };
  },
  created() {
    if (this.userdata != undefined) {
      this.email = this.userdata.correo_persona;
      this.primer_nombre = this.userdata.primer_nombre;
      this.primer_apellido = this.userdata.primer_apellido;
      this.cedula_persona = this.userdata.cedula_persona;

      if (this.userdata.tipo_identificacion === 1) {
        this.tipoidentificacion = "CC";
      }
    }
  },

  directives: {
    "b-tooltip": VBTooltip,
    Ripple,
  },
  props: {
    userdata: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    kFormatter,
  },
};
</script>
