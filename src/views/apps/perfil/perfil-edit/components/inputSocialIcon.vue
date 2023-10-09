<template>
  <b-col cols="12" md="6" lg="4">
    <b-form-group :label="socialField.label" :label-for="socialField.dataField">
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text>
          <feather-icon size="16" :icon="socialField.icon" />
        </b-input-group-prepend>
        <b-form-input
          :id="socialField.dataField"
          :value="value"
          v-model="value"
          type="url"
        />
      </b-input-group>
    </b-form-group>
  </b-col>
</template>

<script>
import {
  BCol,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
} from "bootstrap-vue";
import mixin from "./mixin.js";
export default {
  name: "inputSocialIcon",
  mixins: [mixin],

  components: {
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
  },

  props: {
    socialField: {
      type: Object,
      required: true,
    },
  },
};
</script>