<template>
  <div>
    <v-modal v-if="stateModal" @close="closeTable" ref="tableList" titulo="Inmuebles" size="xl" >
      <component is="tableList"  :properties="inmuebles" />
    </v-modal>
  </div>
</template>
  
  <script>
import tableList from "@/views/apps/inmuebles/components/tableList.vue";
import VModal from "@/views/componente/vModal";

export default {
  name: "modalInmueblesInteresados",

  components: {
    VModal,
    tableList,
  },
  data() {
    return {
      stateModal:null,
      fields: ["id", "titulo_inmueble", "tipo_inmueble"],
      imgpath: null,
      subportales: [],
      // inmuebles: [],
      infoModal: {
        id: "modal-preguntas",
        title: "",
        content: {},
        contentPreguntas: {},
      },
      mainProps: {
        width: 100,
        height: 100,
        class: "m1",
      },
    };
  },
  props:{
    inmuebles:{
      type:Array
    }
  },

  computed: {
    portales() {
      return this.$store.state.appPortales.subportales;
    },
  },

  methods: {
    closeTable(){
      this.stateModal=false
    },
    info(item, button) {
      this.infoModal.content = item;
      // this.getPropertiesInterested();
      this.stateModal=true
      // this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    async getPropertiesInterested() {
      this.$http
        .get("/api/auth/subportales/contact/" + this.infoModal.content)
        .then((res) => {
          let inmuebles = res.data.data.contact.subportalescode;
          let data = [];
          for (let i = 0; i < inmuebles.length; i++) {
            data.push(inmuebles[i].inmueble);
          }

          this.inmuebles = data.filter(
            (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
          );
        });
    },
  },
};
</script>
  
  <style>
.img-modal {
  width: 100%;
  height: 100%;
}
</style>