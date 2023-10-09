<template>
  <b-form>
    <b-row>
      <input-social-icon
        :socialField="linkedin"
        v-model="userdata.linkedin"
      ></input-social-icon>
      <input-social-icon
        :socialField="facebook"
        v-model="userdata.facebook"
      ></input-social-icon>
      <input-social-icon
        :socialField="instagram"
        v-model="userdata.instagram"
      ></input-social-icon>
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
import inputSocialIcon from "./inputSocialIcon.vue";

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
    "input-social-icon": inputSocialIcon,
  },

  data() {
    return {
      linkedin: {
        icon: "LinkedinIcon",
        dataField: "linkedin",
        label: "linkedin",
      },
      facebook: {
        icon: "FacebookIcon",
        dataField: "facebook",
        label: "facebook",
      },
      instagram: {
        icon: "InstagramIcon",
        dataField: "instagram",
        label: "instagram",
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