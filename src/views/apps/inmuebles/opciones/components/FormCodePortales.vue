<template>
  <div id="FormCodePortales">
    <b-form>
      <ul class="portales-inmueble">
        <template v-for="item in portales" v-if="portales.length>0">
          <li class="item-portales-inmueble" :key="item.id">
            <img :src="item.image" alt="" srcset="" />
            <b-form-input
              v-if="item.value"
              v-model="item.value.codigo"
              size="sm"
              class="mt-1 mx-auto text-center"
            ></b-form-input>
          </li>
        </template>
      </ul>
    </b-form>
  </div>
</template>
<script>
import store from "@/store";
export default {
  props: {
    config: Object,
    row: Object,
    prop: String,
  },
  mounted() {
    this.setCode();
  },
  computed: {
    portales() {
      return this.$store.state.appPortales.portales;
    },
  },
  methods: {
    setCode() {
      for (let portal of this.portales) {
        portal.value.codigo = null;
        for (let item of this.row[this.prop])
          if (portal.id == item.portale_id)
            Object.assign(portal.value, { codigo: item.codigo });
      }
    },
    onSubmit() {
      let portales = [];
      for (let item of this.portales)
        if (item.value.codigo) portales.push(item.value);

      let data = { portales, id: this.row.id };
      Object.assign(this.config, { data });
      return new Promise((resolve) => {
        this.$http(this.config)
          .then((res) => {
            Object.assign(this.row, { [this.prop]: res.data.data });
            resolve(true);
          })
          .catch((err) => {
            console.error(err);
            resolve(false);
          });
      });
    },
  },
};
</script>
<style lang="css" scoped>
.portales-inmueble {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: -6px -6px 0;
  position: relative;
  z-index: 3;
}

.item-portales-inmueble {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 6px;
}

.item-portales-inmueble img {
  display: block;
  height: 65px;
  outline: 1px solid #ebe9f1;
  border-radius: 0.358rem;
}
</style>