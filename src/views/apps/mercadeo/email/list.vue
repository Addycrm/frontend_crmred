<template>
  <div>
    <b-card>
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text>
          <feather-icon icon="SearchIcon" />
        </b-input-group-prepend>
        <b-form-input
          v-model="search"
          placeholder="Buscar plantilla de correo"
        />
      </b-input-group>
    </b-card>

    <b-card>
      <b-row>
        <b-col cols="2" md="auto" v-for="item in filteredList" :key="item.id">
          <b-card
            :title="item.titulo"
            style="max-width: 50rem; border: 2px solid blue"
            tag="article"
            class="mb-2"
          >
            <span v-html="item.html"></span>
          </b-card>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BContainer,
  BCard,
  BRow,
  BCol,
  BInputGroup,
  BFormInput,
  BInputGroupPrepend,
  BInputGroupAppend,
  BFormGroup,
  BFormTextarea,
  BButton,
  BCardText,
} from "bootstrap-vue";
let user = JSON.parse(localStorage.getItem("userData"));

export default {
  components: {
    BContainer,
    BCard,
    BRow,
    BCol,
    BInputGroup,
    BFormInput,
    BInputGroupPrepend,
    BInputGroupAppend,
    BFormGroup,
    BFormTextarea,
    BButton,
    BCardText,
  },

  data() {
    return {
      search: "",
      data: [],
    };
  },

  created() {
    this.getMercadeos();
  },

  computed: {
    filteredList() {
      this.data = this.$store.state.appMercadeo.mercadeo;
      return this.data.filter((post) => {
        return post.titulo.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  methods: {
    getMercadeos() {
      this.$store
        .dispatch("appMercadeo/fetchMercadeos", { user_id: user.id })
        .then((response) => {})
        .catch((error) => {
        });
    },
  },
};
</script>

<style>
</style>