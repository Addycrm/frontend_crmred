<template>
    <b-card no-body>
      <b-card-body class="card-statistics d-flex justify-content-between align-items-center" :class="`text-${color}`">
        <div class="bg-icon">
          <slot name="icon"></slot>
        </div>
        <div class="truncate text-right ml-auto">
          <h2 class="mb-25 font-weight-bolder" v-if="statistic>=0">
            {{ statistic }}
          </h2>
          <div  v-else>
            <b-spinner
              variant="primary"
            />
          </div>
          <span class="font-weight-bolder">{{ statisticTitle }}</span>
        </div>
      </b-card-body>
    </b-card>
  </template>

  <script>
  import { BCard, BCardBody, BAvatar } from 'bootstrap-vue'
  import { BSpinner } from 'bootstrap-vue'

  export default {
    components: {
      BCard,
      BCardBody,
      BAvatar,
      BSpinner
    },
    props: {
      statistic: {
        type: [Number, String],
        required: true,
      },
      statisticTitle: {
        type: String,
        default: '',
      },
      color: {
        type: String,
        default: 'primary',
      },
    },
  }
  </script>
  <style lang="css" scoped>
    .card{
      overflow: hidden;
    }
    .card-statistics{
      position: relative;
      z-index: 1;
    }
    .card-statistics::before{
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      background: currentColor;
      opacity: 0.2;
    }
    .bg-icon {
      position: absolute;
      z-index: -1;
      top: 1rem;
      left: 1rem;
      height: 100%;
      width: 5.5rem;
      opacity: 0.75;
    }
  </style>
