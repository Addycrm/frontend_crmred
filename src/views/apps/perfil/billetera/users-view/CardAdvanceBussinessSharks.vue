<template>
  <b-card
    no-body
    class="business-card"
  >
    <b-card-header class="pb-1">
      <b-card-title>AddyCreditos</b-card-title>
      <feather-icon
        icon="MoreVerticalIcon"
        size="18"
        class="cursor-pointer"
      />
    </b-card-header>

    <b-card-body>
      <b-card-text>Los AddyCreditos son los creditos con los que puedes adquirir servicios en Addy. Recarga y Listo!!!</b-card-text>
      <h6 class="mb-75">
        AddyCreditos = AC
      </h6>
      <div class="business-items">
        <div
          v-for="businessItem in businessItems"
          :key="businessItem.option"
          class="business-item"
        >
          <div class="d-flex align-items-center justify-content-between">
            <b-form-checkbox :checked="businessItem.checked">
              {{ businessItem.option }}
            </b-form-checkbox>
            <b-badge :variant="businessItem.badgeColor">
              {{ businessItem.money }}
            </b-badge>
          </div>
        </div>
      </div>

      <!-- button -->
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        block
      >
        Comprar
      </b-button>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BCardText, BFormCheckbox, BBadge, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BBadge,
    BButton,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BCardText,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      businessItems: [
        {
          option: '500 AC', money: '$400.000', badgeColor: 'light-success', checked: false,
        },
        {
          option: '800 AC', money: '$ 600.000', badgeColor: 'light-primary', checked: true,
        },
        {
          option: '1300 AC', money: '$ 1.000.000', badgeColor: 'light-success', checked: false,
        },
        // {
        //   option: 'Option #4', money: '+$459', badgeColor: 'light-success', checked: false,
        // },
      ],
    }
  },
}
</script>
