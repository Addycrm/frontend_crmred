<template>
  <b-card
    no-body
    class="card-payment"
  >
    <b-card-header>
      <b-card-title>Recarga </b-card-title>
      <b-card-title class="text-primary">
        $ 800.000
      </b-card-title>
    </b-card-header>
    <b-card-body>
      <!-- form -->
      <b-form>
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Numero de Tarjeta"
              label-for="payment-card-number"
              class="mb-2"
            >
              <cleave
                id="payment-card-number"
                v-model="cardNumber"
                class="form-control"
                :raw="false"
                :options="options.creditCard"
                placeholder="2133 3244 4567 8921"
              />
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Expiración"
              label-for="expiry"
              class="mb-2"
            >
              <b-form-input
                id="expiry"
                type="number"
                placeholder="MM/YY"
              />
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="CVV / CVC"
              label-for="cvv-cvc"
              class="mb-2"
            >
              <b-form-input
                id="cvv-cvc "
                type="number"
                placeholder="123"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Nombre"
              label-for="name"
              class="mb-2"
            >
              <b-form-input
                id="name"
                placeholder="Curtis Stone"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              block
              variant="primary"
            >
              Realizar Pago
            </b-button>
          </b-col>
        </b-row>
      </b-form>
      <!--/ form -->
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BRow, BCol, BFormGroup, BFormInput, BButton, BForm,
} from 'bootstrap-vue'
import Cleave from 'vue-cleave-component'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    Cleave,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      cardNumber: '',
      options: {
        creditCard: {
          creditCard: true,
        },
      },
    }
  },
}
</script>
