<template>
  <div id="Dashboard">
    <ul class="container-card__dashboard">
      <li v-for="card in statusCard" :key="card.id" class="item-card__dashboard">
        <b-link
          :to="{name: `${card.redirect.name}`}"
        >
          <StatisticCardHorizontal
            :color="card.color"
            :statistic="storeDashboard.dashboard[card.id]"
            :statistic-title="card.title"
          >
            <template #icon>
              <div v-html="card.icon" class="icon_svg"></div>
            </template>
          </StatisticCardHorizontal>
        </b-link>
      </li>
    </ul>
    <b-row>
      <b-col cols="12" md="6" xl="4" class="d-flex flex-column">
        <b-card no-body :style="{minHeight: '360px'}" class="card-developer-meetup flex-grow-1">
          <b-card-header class="pb-2 px-3 pt-3">
            <b-card-title class="mb-1">Agenda</b-card-title>
            <b-button
              class="mb-1"
              size="sm"
              variant="warning"
              :to="{name: 'apps-calendar'}"
            >
              Ver Agenda
            </b-button>
          </b-card-header>
          <b-card-body class="d-flex flex-column pt-0 px-3 pb-3">
            <b-carousel
            v-if="eventos.length > 0"
            id="carousel-agenda"
            class="flex-grow-1"
            controls
            indicators
            :controls="eventos.length > 1"
            :indicators="eventos.length > 1"
            :interval="0"
            >
            <b-carousel-slide
            v-for="(item, i) in eventos"
            :key="item.id"
            img-blank=false
            img-width="196"
            img-height="106"
            >
                <div class="wrapper-calendar" style="color: black;">
                  <div class="meetup-header d-flex align-items-center">
                    <div class="meetup-day">
                      <h6 class="mb-0 text-uppercase">
                        {{ formatDate(today, { weekday: 'short' }) }}
                      </h6>
                      <h3 class="mb-0">
                        {{ formatDate(today, { day: "numeric" }) }}
                      </h3>
                    </div>
                    <div class="my-auto">
                      <h4
                        class="card-title mb-25"
                        :class="`text-${item.t_cita.color}`"
                      >
                        {{ item.t_cita.label }}
                      </h4>
                      <p
                        class="card-text mb-0"
                        :style="{fontSize: '12px'}"
                      >
                        <b>Inicio:</b> {{ formatDate(item.start, { month: "long", day: "numeric", year: "numeric", hourCycle: "h12", hour: "numeric", minute: "numeric"}) }}
                        <br>
                        <b>Final:</b> {{ formatDate(item.end, { month: "long", day: "numeric", year: "numeric", hourCycle: "h12", hour: "numeric", minute: "numeric"}) }}
                      </p>
                    </div>
                  </div>
                  <div
                    v-if="item.cliente_id"
                    class="media"
                  >
                    <div class="media-aside mr-1 align-self-start">
                      <span
                        class="b-avatar badge-light-primary rounded"
                        style="width: 34px; height: 34px;"
                      >
                        <span class="b-avatar-custom">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            width="18px"
                            height="18px"
                            fill="currentColor"
                          >
                          <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" /></svg>
                        </span>
                      </span>
                    </div>
                    <div class="media-body">
                      <h6 class="mb-0">
                        {{ item.cliente_id.nombre }} {{ item.cliente_id.apellido }}
                      </h6>
                      <small>
                        {{ item.cliente_id.main_mail }}
                      </small>
                    </div>
                  </div>
                  <div
                    v-if="item.inmueble_id"
                    class="media"
                  >
                    <div class="media-aside mr-1 align-self-start">
                      <span
                        class="b-avatar badge-light-primary rounded"
                        style="width: 34px; height: 34px;"
                      >
                        <span class="b-avatar-custom">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            width="18px"
                            height="18px"
                            fill="currentColor"
                          >
                          <path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z" /></svg>
                        </span>
                      </span>
                    </div>
                    <div class="media-body">
                      <h6 class="mb-0">
                        {{ item.inmueble_id.titulo_inmueble }}
                      </h6>
                      <small>
                        {{ item.inmueble_id.direccion }}
                      </small>
                    </div>
                  </div>
                </div>
              </b-carousel-slide>
            </b-carousel>
            <div
              v-else
              class="alert alert-info p-2"
            >
              No tienes eventos en tu agenda
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" md="6" xl="4" class="d-flex flex-column">
        <b-card :style="{minHeight: '360px'}" class="flex-grow-1">
          <b-card-header>
            <b-card-title class="mb-1">Tareas y Actividades</b-card-title>
            <b-button
              size="sm"
              class="mb-1"
              variant="warning"
              :to="{name: 'apps-todo'}"
            >
              Ver Tareas
            </b-button>
          </b-card-header>
          <b-card-body class="py-0">
            <!-- {{ task }} -->
            <div v-if="task.escritorio.length > 0">
              <app-timeline>
                <app-timeline-item
                  v-for="item in task.escritorio"
                  :key="item.id"
                  :title="item.title"
                  :time="formatDate(item.dueDate, { month: &quot;long&quot;, day: &quot;numeric&quot;, year: &quot;numeric&quot;, hourCycle: &quot;h12&quot;, hour: &quot;numeric&quot;, minute: &quot;numeric&quot;})"
                  variant="success"
                >
                  <div class="mt-1">
                    <b-badge
                      v-for="(tag, index) in item.tags"
                      :key="tag.id"
                      pill
                      :variant="`light-${variantState(tag.value)}`"
                      class="text-capitalize mr-1"
                    >
                      {{ tag.label }}
                    </b-badge>
                  </div>
                </app-timeline-item>
              </app-timeline>
            </div>
            <div
              v-else
              class="alert alert-info p-2"
            >
              No tienes tareas programadas
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" md="6" xl="4" class="d-flex flex-column">
        <b-card class="flex-grow-1">
          <b-card-header>
            <b-card-title>Tipo de Negocio</b-card-title>
          </b-card-header>
          <b-card-body>
            <div v-if="storeDashboard.chart.pie.tipo_negocios.series[0].data.length > 0" class="chart-wrapper">
              <div class="chart-content">
                <ECharts class="chart" :options="storeDashboard.chart.pie.tipo_negocios" />
              </div>
            </div>
            <div v-else class="alert alert-info p-2">
              No hay ningún inmueble publicado
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" md="6" xl="4" class="d-flex flex-column">
        <b-card class="flex-grow-1">
          <b-card-header>
            <b-card-title>Tipo de Propiedad</b-card-title>
          </b-card-header>
          <b-card-body>
            <div v-if="storeDashboard.chart.pie.tipo_inmuebles.series[0].data.length > 0" class="chart-wrapper pie">
              <div class="chart-content">
                <ECharts class="chart" :options="storeDashboard.chart.pie.tipo_inmuebles" />
              </div>
            </div>
            <div v-else class="alert alert-info p-2">
              No hay ningún inmueble publicado
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="8" class="d-flex flex-column">
        <b-card class="flex-grow-1">
          <b-card-header>
            <b-card-title>Inmuebles Registrados por mes</b-card-title>
          </b-card-header>
          <b-card-body>
            <div class="chart-wrapper line">
              <div class="chart-content">
                <ECharts class="chart" :options="storeDashboard.chart.line.inmuebles" />
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!-- Clientes -->
    <b-row>
      <b-col cols="12" xl="6">
        <b-card>
          <b-card-header>
            <b-card-title>Clientes Registrados por mes</b-card-title>
          </b-card-header>
          <b-card-body>
            <div class="chart-wrapper line">
              <div class="chart-content">
                <ECharts class="chart" :options="storeDashboard.chart.line.cli" />
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="6">
        <b-card>
          <b-card-header>
            <b-card-title>Leads Portales</b-card-title>
          </b-card-header>
          <b-card-body>
            <div class="chart-wrapper line">
              <div class="chart-content">
                <ECharts class="chart" :options="storeDashboard.chart.bar.leads" />
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="6">
        <b-card>
          <b-card-header>
            <b-card-title>Visitas a página web</b-card-title>
          </b-card-header>
          <b-card-body>
            <div class="chart-wrapper line">
              <div class="chart-content">
                <ECharts class="chart" :options="storeDashboard.chart.bar.pagina" />
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="6">
        <b-card>
          <b-card-header>
            <b-card-title>Interasados página web</b-card-title>
          </b-card-header>
          <b-card-body>
            <div class="chart-wrapper line">
              <div class="chart-content">
                <ECharts class="chart" :options="storeDashboard.chart.bar.c" />
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'

import { formatDate } from '@core/utils/filter'

import mixinPieChart from './chart/mixinPieChart'
import mixinApis from '@/views/componente/mixinApis'

import store from "@/store"
import mixinDashboard from '@/views/apps/dashboard/mixinDashboard'
import mixinTask from '@/views/apps/tareas/mixinTask'
import mixinCalendar from '@/views/apps/calendar/mixinCalendar'


export default {

  name: 'Dashboard',
  mixins:[mixinApis, mixinDashboard, mixinTask, mixinCalendar, mixinPieChart],
  components: {
    AppTimeline,
    AppTimelineItem,
    StatisticCardHorizontal,
  },
  data() {
    return {
      statusCard: [
        {
          color: 'primary',
          title: 'Clientes',
          count: 0,
          redirect:{
            path: '/clientes',
            name: 'apps-cliente-list'
          },
          id: 'clientes',
          icon: '<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 448 512"fill="currentColor"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" /></svg>',
        },
        {
          color: 'warning',
          title: 'Interesados página web',
          count: 0,
          redirect:{
            name: 'interested',
          },
          id: 'contact_interested',
          icon: '<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 576 512"fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M528 0h-480C21.5 0 0 21.5 0 48v320C0 394.5 21.5 416 48 416h192L224 464H152C138.8 464 128 474.8 128 488S138.8 512 152 512h272c13.25 0 24-10.75 24-24s-10.75-24-24-24H352L336 416h192c26.5 0 48-21.5 48-48v-320C576 21.5 554.5 0 528 0zM512 352H64V64h448V352z" /></svg>',
        },
        {
          color: 'info',
          title: ' Inmuebles en Arriendo',
          count: 0,
          redirect:{
            name: 'listar-inmueble',
          },
          id: 'inmuebles_arrendo',
          icon: '<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 576 512"fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M511.8 287.6L512.5 447.7C512.6 483.2 483.9 512 448.5 512H128.1C92.75 512 64.09 483.3 64.09 448V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L416 100.7V64C416 46.33 430.3 32 448 32H480C497.7 32 512 46.33 512 64V185L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6L511.8 287.6zM288 288C323.3 288 352 259.3 352 224C352 188.7 323.3 160 288 160C252.7 160 224 188.7 224 224C224 259.3 252.7 288 288 288zM192 416H384C392.8 416 400 408.8 400 400C400 355.8 364.2 320 320 320H256C211.8 320 176 355.8 176 400C176 408.8 183.2 416 192 416z" /></svg>',
        },
        {
          color: 'success',
          title: 'Inmuebles en Venta',
          id: 'inmuebles_ventas',
          count: 0,
          redirect:{
            name: 'listar-inmueble',
          },
          icon: '<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 640 512"fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L522.1 193.9C513.6 192.7 504.9 192 496 192C404.2 192 328.8 262.3 320.7 352L320 352zM640 368C640 447.5 575.5 512 496 512C416.5 512 352 447.5 352 368C352 288.5 416.5 224 496 224C575.5 224 640 288.5 640 368zM540.7 324.7L480 385.4L451.3 356.7C445.1 350.4 434.9 350.4 428.7 356.7C422.4 362.9 422.4 373.1 428.7 379.3L468.7 419.3C474.9 425.6 485.1 425.6 491.3 419.3L563.3 347.3C569.6 341.1 569.6 330.9 563.3 324.7C557.1 318.4 546.9 318.4 540.7 324.7H540.7z" /></svg>',
        },
        {
          color: 'primary',
          title: 'Leads Portales',
          id: 'total_leads',
          count: 0,
          redirect:{
            name: 'apps-cliente-contact',
          },
          icon: '<svg xmlns="http://www.w3.org/2000/svg" height="65" fill="currentColor"  viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M384 48c8.8 0 16 7.2 16 16V448c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H384zM96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM240 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H208zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"/></svg>',
        },
      ],
      formatDate,
      today: new Date(),
    }
  },
  computed: {
    eventos() {
      return this.$store.state.appCalendario.escritorio
    },
  },
  methods: {
    showClientes(){

    },
    variantState(tag) {
      switch (tag) {
        case 'alto':
          return 'danger'
          break
        case 'medio':
          return 'warning'
          break
        case 'bajo':
          return 'success'
          break
        case 'actualizado':
          return 'info'
          break
        default:
          return 'primary'
      }
    },
  },

}
</script>

<style lang="scss" scoped>
  ul{
    padding: 0;
  }

  @media (max-width:600px) {
    .container-card__dashboard{
      grid-gap: 0 !important;
    }
    .chart-wrapper .echarts {
      width: 110%;
      height: 100%;
    }
  }

    .container-card__dashboard{
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
      grid-template-rows: auto;
      grid-gap: 1rem;
      place-content: center;
    }

    .item-card__dashboard{
      align-self:center;
      width: 100%;
      margin: 0 auto;
      height: auto;
    }

    .chart-wrapper {
      position: relative;
      z-index: 1;
      width: 100%;
      margin: 0 auto;
    }
    .chart-wrapper::before {
      content: '';
      display: block;
      width: 100%;
      padding-top: 300px;
    }
    .chart-wrapper .chart-content{
      position: absolute;
      width:  100%;
      inset: 0;
    }
    .chart-wrapper .echarts {
      width: 100%;
      height: 100%;
    }
    .chart-wrapper.line .chart-content{
      inset: -25px;
    }
    .chart-wrapper.pie{
      max-width: 300px;
    }
    .chart-wrapper.pie::before {
      padding-top: 100%;
    }
    .app-timeline{
      margin: 0!important;
    }
    .carousel-item.caption-static .carousel-caption {position: static;text-align: left;color: inherit;padding: 0;}
</style>

<style lang="scss">
  // mio
  #carousel-agenda{
    position: relative;
    height: 300px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: inset 0px 0px 2px 0px rgba(0, 0, 0, 0.3);
    background-color: #f2f2f2;
    // max-height: 230px;

      .carousel-inner{
        position: absolute;
        bottom: 30px;
        height: fit-content;
        overflow: unset;

        .meetup-header, .media{
          justify-content: center;
        }

        .media-body{
          flex: none;
        }

      }

      .carousel-control-prev-icon{
        background-image: url('data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="purple" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"%3e%3cpolyline points="15 18 9 12 15 6"%3e%3c/polyline%3e%3c/svg%3e');
      }
      .carousel-control-next-icon{
        background-image: url('data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="purple" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"%3e%3cpolyline points="9 18 15 12 9 6"%3e%3c/polyline%3e%3c/svg%3e');
      }
      .carousel-indicators li{
        background-color: purple;
      }
}

  @media screen and (min-width: 550px) {
    #carousel-agenda{
      max-height: 252px;

      .carousel-inner{
          bottom: 40px;
        }
    }
  }
  @media screen and (min-width: 765px) {
    #carousel-agenda{
      .carousel-inner{
          bottom: 2px;
        }
    }
  }
  @media screen and (min-width: 1084px) {
    #carousel-agenda{
      max-height: 242px;

      .carousel-inner{
          bottom: 5px;
        }
    }
  }
</style>
