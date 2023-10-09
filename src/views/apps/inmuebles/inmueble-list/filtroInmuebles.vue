<template>
  <b-row>
    <b-form class="filterForm col-12" ref="filterInmuebles">
      <div class="row">
        <b-form-group class="col mb-0" label="Estado de inmueble">
          <b-form-select
            name="state_fisico"
            :value="null"
            :options="filtros.state_fisico"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-form-group class="col mb-0" label="Tipo de inmueble">
          <b-form-select
            name="tipo_inmueble"
            :value="null"
            :options="filtros.tipo_inmueble"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-form-group class="col mb-0" label="Tipo de negocio">
          <b-form-select
            name="tipo_negocio"
            :value="null"
            :options="filtros.tipo_negocio"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-form-group class="col mb-0" label="Departamento">
          <b-form-select
            v-model="state"
            name="estado_id"
            :value="state"
            :options="filtros.estado_id"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-form-group class="col mb-0" label="Ciudad">
          <b-form-select
            name="ciudad_id"
            :value="null"
            size="sm"
            :disabled="state == null ? true : false"
          >
            <b-form-select-option v-model="city" :value="city"
              >Elije una ciudad</b-form-select-option
            >
            <b-form-select-option
              v-for="option in filtros.ciudad_id"
              :key="option.value"
              :value="option.value"
              :style="{ display: option.state == state ? 'block' : 'none' }"
            >
              {{ option.text }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
      </div>
    </b-form>
    <div class="col-12 mt-2">
      <div class="btn btn-primary btn-sm" ref="btnClear">Limpiar</div>
    </div>
  </b-row>
</template>

<script>
import vSelect from "vue-select";
export default {
  name: "filtroInmuebles",
  components: {
    vSelect,
  },
  data() {
    return {
      state: null,
      city: null,
    };
  },
  watch: {
    state() {
      this.city = null;
    },
  },
  computed: {
    filtros() {
      return this.$store.state.appInmueble.filterInmueblesList;
    },
    inmueblesList() {
      return this.$store.state.appInmueble.inmueblesList;
    },
    resultInmuebles() {
      return this.$store.state.appInmueble.resultInmuebles;
    },
  },
  mounted() {
    this.initFilter();
  },
  methods: {
    getFiltro(input) {
      let search = {};
      for (let item of input) {
        if (item.value != "") {
          search[item.name] = item.value;
        }
      }

      let r = this.inmueblesList.filter((item) => {
        let result = [];
        for (let e in search) {
          if (search[e] == item[e].value) {
            result.push(item[e]);
          }
        }

        let searchLength = Object.keys(search).length;
        return result.length == searchLength;
      });
      this.$store.commit("appInmueble/SET_FILTROS", r);
    },
    initFilter() {
      let inputs =
        this.$refs["filterInmuebles"].querySelectorAll("select[name]");
      inputs.forEach((item) => {
        item.onchange = () => {
          this.getFiltro(inputs);
        };
      });

      let clear = this.$refs["btnClear"];
      clear.onclick = () => {
        this.clearFiltro(inputs);
      };
    },
    clearFiltro(input) {
      for (let item of input) {
        item.value = "";
      }
      this.state = null;

      this.getFiltro(input);
    },
  },
};
</script>

<style lang="css" scoped>
</style>