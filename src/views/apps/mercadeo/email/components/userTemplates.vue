<template>
  <div>
    <b-input-group class="input-group-merge input-width">
      <b-input-group-prepend is-text>
        <feather-icon icon="SearchIcon" />
      </b-input-group-prepend>
      <b-form-input v-model="search" placeholder="Buscar plantilla de correo" />
    </b-input-group>
    <hr />
    <b-row>
      <b-col cols="3" md="auto" v-for="item in filteredList" :key="item.id">
        <b-card
          :title="item.titulo"
          style="max-width: 50rem; border: 2px solid blue"
          tag="article"
          class="mb-2"
        >
          <b-form-radio
            @input="checkData"
            v-model="mercadeo_id"
            name="some-radios-mercadeo"
            :value="item.id"
          >
            Seleccionar esta plantilla</b-form-radio
          >
          <span v-html="item.html"></span>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  BCard,
  BRow,
  BCol,
  BFormRadio,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
} from "bootstrap-vue";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormRadio,
    BInputGroup,
    BFormInput,
    BInputGroupPrepend,
  },

  data() {
    return {
      show_select: false,
      show: true,
      show_loading: false,
      send_now: true,
      loading: false,
      title: "",
      body: "",
      send_date: "",
      isBusy: false,
      isBusyMessage: false,
      item: "now",
      search: "",
      data: [],
      mercadeo_id: null,
      dir: "ltr",
    };
  },

  computed: {
    filteredList() {
      this.data = this.$store.state.appMercadeo.mercadeo;
      return this.data.filter((post) => {
        return post.titulo.toLowerCase().includes(this.search.toLowerCase());
      });
    },

    checkData() {
      this.$root.$emit("predeterminateTemplatePublic", {
        type: "public",
        mercadeo: this.mercadeo_id,
      });
    },
  },
};
</script>

<style>
.input-width {
  width: 50%;
  align-content: center;
}
</style>