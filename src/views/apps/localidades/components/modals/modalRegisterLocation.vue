<template>
  <div class="container">
    <b-modal ref="modal-create-loca" hide-footer title="Crear Localidades" v-s>
      <div>
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-1" label="Codigo Ciencuadras:" label-for="input-1" label-size="md"
            description="ingresar el numero de codigo cien cuadras.">
            <b-form-input id="input-1" type="text" placeholder="Ingrese el Codigo" v-model="form.codigo"
              required></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Nombre de Localidad:" label-for="input-2" label-size="md">
            <b-form-input id="input-2" placeholder="Ingrese el Nombre" v-model="form.nombre" required></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Crear</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  data() {
    return {
      idCity: null,
      form: {
        codigo: null,
        id_city: null,
        nombre: ''
      },
    }
  },
  methods: {
    showModal(id_city) {
      this.idCity = id_city
      this.$refs['modal-create-loca'].show()
    },
    async callCreateLocation() {
      const API = '/api/auth/ciencuadra/import/localidades';
      await this.$http.post(API, this.form)
        .then((result) => {
          this.$root.$emit('update-location');
          this.$refs['modal-create-loca'].hide();

          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Registro',
              icon: "CheckCircleIcon",
              text: result.data.data.message,
              variant: "success",
            }
          })
        }).catch((err) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'error',
              icon: "CheckCircleIcon",
              text: result.data.data.message,
              variant: "danger",
            }
          })
        });
    },
    onSubmit(event) {
      event.preventDefault()
      this.form.id_city = this.idCity;
      this.callCreateLocation();
      this.form.codigo=null;
      this.form.id_city=null;
      this.form.nombre=null;
    },
  }
}
</script>