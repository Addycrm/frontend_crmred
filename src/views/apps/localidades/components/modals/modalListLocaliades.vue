<template>
  <div>
    <b-modal ref="my-modal" hide-footer title="Lista de Localidades">
      <b-button size="md" class="m-10" variant="relief-success" @click="createLocation">
        <span class="align-middle">Crear Localidad</span>
      </b-button>
      <div class="container">
        <div>
          <b-table hover :items="data" :fields="fields" show-empty responsive>
            <template #empty="scope">
              <h4>No hay localidades disponibles</h4>
            </template>
          </b-table>
        </div>
      </div>
    </b-modal>
    <modalCreateLocation ref="createLocation"></modalCreateLocation>
  </div>
</template>

<script>
import modalRegisterLocation from './modalRegisterLocation.vue'
export default {
  components: {
    "modalCreateLocation": modalRegisterLocation
  },
  data() {
    return {
      data: [],
      idCity: null,
      fields: [
        {
          key: 'id',
          label: 'codigo'
        },
        {
          key: 'id_city',
          label: 'codigo de ciudad'
        },
        {
          key: 'nombre',
          label: 'localidad'
        }
      ],
    }
  },
  mounted() {
    this.$root.$on('update-location', () => { this.callApiList() })
  }
  ,
  methods: {
    showModal(data) {
      this.idCity = data;
      this.$refs['my-modal'].show()
      this.callApiList()
    },
    async callApiList() {
      const API = '/api/auth/ciencuadra/import/localidades/';
      await this.$http.get(API + this.idCity).then((res) => {
        this.data = res.data.data.localidades;
      })
    },
    createLocation() {
      return this.$refs.createLocation.showModal(this.idCity);
    }

  }
}

</script>