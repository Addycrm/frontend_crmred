<template>
  <b-card
    class="card-transaction"
    no-body
  >
    <b-card-header>
      <b-card-title>Transacciones</b-card-title>
      <feather-icon
        icon="MoreVerticalIcon"
        size="18"
        class="cursor-pointer"
      />
    </b-card-header>

    <b-card-body>
      <div
        v-for="transaction in transactionData"
        :key="transaction.mode"
        class="transaction-item"
      >
        <b-media no-body>
          <b-media-aside>
            <b-avatar
              rounded
              size="42"
              :variant="transaction.avatarVariant"
            >
              <feather-icon
                size="18"
                :icon="transaction.avatar"
              />
            </b-avatar>
          </b-media-aside>
          <b-media-body>
            <h6 class="transaction-title">
              {{ transaction.mode }}
            </h6>
            <small>{{ transaction.types }}</small>
          </b-media-body>
        </b-media>
        <div
          class="font-weight-bolder"
          :class="transaction.deduction ? 'text-danger':'text-success'"
        >
          {{ transaction.payment }}
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BMediaBody, BMedia, BMediaAside, BAvatar,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
  },
  data() {
    return {
      transactionData: [
        {
          mode: 'Billetera',
          types: 'AddyCreditos',
          avatar: 'PocketIcon',
          avatarVariant: 'light-primary',
          payment: '+$200',
          deduction: false,
        },
        {
          mode: 'Billetera.',
          types: 'Dolares',
          avatar: 'DollarSignIcon',
          avatarVariant: 'light-success',
          payment: '+$480',
          deduction: false,
        },
        {
          mode: 'Transferencias',
          types: 'Internas',
          avatar: 'PocketIcon',
          avatarVariant: 'light-danger',
          payment: '+$480',
          deduction: false,
        },
        {
          mode: 'Transferencias.',
          types: 'En Dolares',
          avatar: 'DollarSignIcon',
          avatarVariant: 'light-warning',
          payment: '-$23',
          deduction: true,
        },
        // {
        //   mode: 'Transfer',
        //   types: 'Refund',
        //   avatar: 'TrendingUpIcon',
        //   avatarVariant: 'light-info',
        //   payment: '+$98',
        //   deduction: false,
        // },
      ],
    }
  },
}
</script>
