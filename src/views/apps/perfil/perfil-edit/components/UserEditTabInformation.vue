<template>
  <div>
    <quill-editor
      id="quil-content"
      class="border-bottom-0"
      v-model="userdata.descripcion"
      :options="snowOption"
    />
    <div id="quill-toolbar" class="d-flex justify-content-end border-top-0">
      <!-- Add a bold button -->
      <button class="ql-bold" />
      <button class="ql-italic" />
      <button class="ql-underline" />
      <button class="ql-align" />
      <button class="ql-link" />
    </div>
  </div>
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
        modules: {
          toolbar: "#quill-toolbar",
        },
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus clientes.",
      },

      data: {
        descripcion: "",
      },
    };
  },

  props: {
    userdata: {
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
