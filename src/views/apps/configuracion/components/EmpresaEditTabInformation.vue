<template>
  <quill-editor v-model="configuracion.descripcion" :options="snowOption" />
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BButton,
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import { ref } from "@vue/composition-api";
import vSelect from "vue-select";
import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    flatPickr,
    BFormInput,
    vSelect,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BButton,
    quillEditor,
  },
  data() {
    return {
      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus clientes.",
        readOnly: true,
      },

      data: {
        descripcion: null,
      },
    };
  },

  props: {
    configuracion: {
      type: Object,
      required: true,
    },
  },


 
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/quill.scss";

.ql-editor {
  height: 12rem;

  resize: vertical;
  overflow-y: scroll;
}
</style>
