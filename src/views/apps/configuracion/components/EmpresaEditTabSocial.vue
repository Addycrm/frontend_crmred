<template>
  <b-form>
    <b-row>
      <b-col
        v-for="socialField in socialInputs"
        :key="socialField.dataField"
        cols="12"
        md="6"
        lg="4"
      >
        <b-form-group
          :label="socialField.label"
          :label-for="socialField.dataField"
        >
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon size="16" :icon="socialField.icon" />
            </b-input-group-prepend>
            <b-form-input
              :id="socialField.dataField"
              v-model="configuracion[socialField.dataField]"
              type="url"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
} from "bootstrap-vue";

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
  },

  data() {
    return {
      redes: [],
      configuracionSocial: {
        linkedin: "",
        facebook: "",
        instagram: "",
      },
      socialInputs: [
        {
          icon: "LinkedinIcon",
          dataField: "linkedin",
          label: "linkedin",
        },
        {
          icon: "FacebookIcon",
          dataField: "facebook",
          label: "facebook",
        },
        {
          icon: "InstagramIcon",
          dataField: "instagram",
          label: "instagram",
        },
      ],
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

<style>
</style>
