<template>
  <div>
    <b-card>
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text>
          <feather-icon icon="SearchIcon" />
        </b-input-group-prepend>
        <b-form-input placeholder="Buscar plantilla de correo" />
      </b-input-group>
    </b-card>
    <b-card>
      <b-row cols="4">
        <b-col v-for="item in object" :key="item.id">
          {{ item.image }}
          <b-card
            title="Email"
            :img-src="item.image"
            :img-alt="item.id"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto. Lorem Ipsum ha sido el texto de relleno
              estándar de las industrias desde el año 1500.
            </b-card-text>

            <b-button href="#" variant="primary">Ir</b-button>
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
} from "bootstrap-vue";
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
  },

  data() {
    return {
      object: [
        {
          id: 1,
          image: "https://picsum.photos/600/300/?image=25",
          descripcion: "",
        },
        {
          id: 2,
          image: "https://picsum.photos/600/300/?image=25",
        },
        {
          id: 3,
          image: "https://picsum.photos/600/300/?image=25",
        },
        {
          id: 4,
          image: "https://picsum.photos/600/300/?image=25",
        },
        {
          id: 5,
          image: "https://picsum.photos/600/300/?image=25",
        },
        {
          id: 6,
          image: "https://picsum.photos/600/300/?image=25",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style>
</style>