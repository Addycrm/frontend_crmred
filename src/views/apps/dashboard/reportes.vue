<template>
  <div>
    
    
    <b-row class="match-height">

       <b-col lg="6" md="6" style="height:30em;">
        <b-card no-body class="card-employee-task">
          <b-card-header>
            <b-card-title>Ver Teléfono x Mes</b-card-title>
           
          </b-card-header>
          <b-card-body>

            <b-row>
              <b-col>
              <vue-apex-charts id="referidosChart" width="100%" height="300px" type="area" :options="referidos.options" :series="referidos.series"></vue-apex-charts>
              </b-col>
            </b-row>
            
          </b-card-body>
        </b-card>
      </b-col>



      <b-col lg="6" md="6" style="height:30em;">
        <b-card no-body class="card-employee-task">
          <b-card-header>
            <b-card-title>Visitas a Inmuebles</b-card-title>
           
          </b-card-header>
          <b-card-body>

            <b-row>
              <b-col>
              <vue-apex-charts id="visitasChart" width="100%" height="300px" type="bar" :options="visitas.options" :series="visitas.series"></vue-apex-charts>
              </b-col>
            </b-row>
            
          </b-card-body>
        </b-card>
      </b-col>


    <b-col lg="6" md="6" style="height:30em;">
        <b-card no-body class="card-employee-task">
          <b-card-header>
            <b-card-title>Contactos a Inmuebles</b-card-title>
           
          </b-card-header>
          <b-card-body>

            <b-row>
              <b-col>
              <vue-apex-charts id="contactosChart" width="100%" height="300px" type="bar" :options="c.options" :series="c.series"></vue-apex-charts>
              </b-col>
            </b-row>
            
          </b-card-body>
        </b-card>
      </b-col>



      <b-col lg="6" md="6" style="height:30em;">
        <b-card no-body class="card-employee-task">
          <b-card-header>
            <b-card-title>Inmuebles Registrados</b-card-title>
           
          </b-card-header>
          <b-card-body>

            <b-row>
              <b-col>
              <vue-apex-charts id="inmueblesChart" width="100%" height="300px" type="line" :options="inm.options" :series="inm.series"></vue-apex-charts>
              </b-col>
            </b-row>
            
          </b-card-body>
        </b-card>
      </b-col>


      <b-col lg="6" md="6" style="height:30em;">
        <b-card no-body class="card-employee-task">
          <b-card-header>
            <b-card-title>Inmuebles</b-card-title>
           
          </b-card-header>
          <b-card-body>

            <b-row>
              <b-col>
              <vue-apex-charts id="tipoChart" width="100%" height="300px" type="donut" :options="tipos.options" :series="tipos.series"></vue-apex-charts>
              </b-col>
            </b-row>
            
          </b-card-body>
        </b-card>
      </b-col>

      <b-col lg="6" md="6" style="height:30em;">
        <b-card no-body class="card-employee-task">
          <b-card-header>
            <b-card-title>Tipos de Propiedad</b-card-title>
           
          </b-card-header>
          <b-card-body>

            <b-row>
              <b-col>
              <vue-apex-charts id="proChart" width="100%" height="300px" type="donut" :options="pro.options" :series="pro.series"></vue-apex-charts>
              </b-col>
            </b-row>
            
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BAvatarGroup,
  BCardText,
  BCardTitle,
  BCardHeader,
  BContainer,
  BMedia,
  BMediaBody,
  BMediaAside,
  VBTooltip,
  BAvatar,
  BModal,
  BDropdown,
  BTable,
  BImg,
  BButton,
} from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";
import StatisticCardHorizontal from "@core/components/statistics-cards/StatisticCardHorizontal.vue";
import DashboardStoreModule from "./DashboardStoreModule";
import store from "@/store";
import Ripple from "vue-ripple-directive";

import { ref, onUnmounted, computed } from "@vue/composition-api";
/* eslint-disable global-require */
const $trackBgColor = "#e9ecef";
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardText,
    BCardTitle,
    BContainer,
    BModal,
    BMedia,
    BMediaBody,
    BMediaAside,
    BAvatar,
    BTable,
    BCardBody,
    BAvatarGroup,
    BImg,
    BButton,
    VueApexCharts,
    BCardHeader,
    BDropdown,

    StatisticCardHorizontal,
  },

  directives: {
    Ripple,
  },

  data() {
    return {
      visitas:{
        options: {
          chart: {
            id: ''
          },
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          }
        },
      series: [{
        name: '',
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
      }]
      },
      referidos:{
        options: {
          chart: {
            id: ''
          },
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          }
        },
      series: [{
        name: '',
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
      }]
      },

      c:{
        options: {
          chart: {
            id: ''
          },
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          }
        },
      series: [{
        name: '',
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
      }]
      },

      inm:{
        options: {
          chart: {
            id: ''
          },
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          }
        },
      series: [{
        name: '',
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
      }]
      },

      cli:{
        options: {
          chart: {
            id: ''
          },
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          }
        },
      series: [{
        name: '',
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
      }]
      },

      tipos:{
        series: [0, 0],
        labels: ['Venta', 'Alquiler'],
        options: {
          labels: ['Venta', 'Alquiler'],
          chart: {
            type: 'donut',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
          },
      },

      pro:{
        series: [0, 0],
        options: {
          labels: ['Casa', 'Apartamento'],
          chart: {
            type: 'donut',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
          },
      },


      tipo: "Arriedo",
      modalShow: false,
      show_arrendo: true,
      show_ventas: false,
      today: new Date().toISOString().slice(0, 10),
      avatar: require("@/assets/images/avatars/identifica-01.png"),

      fields: [
        {
          key: "title",
          label: "titulo",
          sortable: true,
        },
        {
          key: "description",
          label: "descripción",
          sortable: false,
        },
        {
          key: "isImportant",
          label: "importante",
          sortable: false,
        },
        {
          key: "dueDate",
          label: "Fecha",
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          variant: "danger",
        },
      ],
      fieldsAgenda: [
        {
          key: "title",
          label: "titulo",
          sortable: true,
        },
        {
          key: "start",
          label: "Hora Inicio",
          sortable: true,
        },
        {
          key: "end",
          label: "Hora Final",
          sortable: true,
          variant: "danger",
        },
      ],
      solidColor: [
        {
          bg: "primary",
          title: "Clientes",
          count: 0,
          id: "cli",
          icon: "UserPlusIcon",
        },
        {
          bg: "warning",
          title: "Contactos pagina web",
          count: 0,
          id: "ref",
          icon: "UsersIcon",
        },
        {
          bg: "success",
          title: " Inmuebles en Arriendo",
          id: "inm_arrendo",
          count: 0,
          icon: "HomeIcon",
        },
        {
          bg: "success",
          title: "Inmuebles en Venta",
          id: "inm_venta",
          count: 0,
          icon: "HomeIcon",
        },
      ],
      mediaData: [
        {
          avatar: "CalendarIcon",
          title: "Sat, May 25, 2020",
          subtitle: "10:AM to 6:PM",
        },
        {
          avatar: "MapPinIcon",
          title: "Central Park",
          subtitle: "Manhattan, New york City",
        },
      ],
      avatars: [
        {
          avatar: require("@/assets/images/portrait/small/avatar-s-9.jpg"),
          fullName: "Billy Hopkins",
        },
        {
          avatar: require("@/assets/images/portrait/small/avatar-s-6.jpg"),
          fullName: "Amy Carson",
        },
        {
          avatar: require("@/assets/images/portrait/small/avatar-s-8.jpg"),
          fullName: "Brandon Miles",
        },
        {
          avatar: require("@/assets/images/portrait/small/avatar-s-7.jpg"),
          fullName: "Daisy Weber",
        },
        {
          avatar: require("@/assets/images/portrait/small/avatar-s-20.jpg"),
          fullName: "Jenny Looper",
        },
      ],

      chartData: [],
      chartColor: [
        $themeColors.primary,
        $themeColors.danger,
        $themeColors.success,
        $themeColors.secondary,
        $themeColors.warning,
        $themeColors.primary,
      ],
      chartSeries: [45, 65, 60, 35, 65, 80],
      employeeData: [
        {
          avatar: require("@/assets/images/avatars/identifica-01.png"),
          userFullName: "Ryan Harrington",
          designation: "iOS Developer",
          duration: "9hr 20m",
        },
        {
          avatar: require("@/assets/images/portrait/small/avatar-s-20.jpg"),
          userFullName: "Louisa Norton",
          designation: "UI Designer",
          duration: "4hr 17m",
        },
        {
          avatar: require("@/assets/images/portrait/small/avatar-s-1.jpg"),
          userFullName: "Jayden Duncan",
          designation: "Java Developer",
          duration: "12hr 8m",
        },
        {
          avatar: require("@/assets/images/portrait/small/avatar-s-20.jpg"),
          userFullName: "Cynthia Howell",
          designation: "Anguler Developer",
          duration: "3hr 19m",
        },
        {
          avatar: require("@/assets/images/portrait/small/avatar-s-16.jpg"),
          userFullName: "Helena Payne",
          designation: "Marketing",
          duration: "9hr 50m",
        },
        {
          avatar: require("@/assets/images/portrait/small/avatar-s-13.jpg"),
          userFullName: "Troy Jensen",
          designation: "iOS Developer",
          duration: "4hr 48m",
        },
      ],
      chart: {
        series: [65],
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [$themeColors.primary],
          plotOptions: {
            radialBar: {
              hollow: {
                size: "22%",
              },
              track: {
                background: $trackBgColor,
              },
              dataLabels: {
                showOn: "always",
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
        },
      },
      type_inmueble_arriendo: [],
      type_inmueble_venta: [],

      chartDataCircle: {},
      sessionsByDeviceDonutArriendo: {
        series: [],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          labels: [],
          dataLabels: {
            enabled: false,
          },
          legend: { show: false },
          comparedResult: [],
          stroke: { width: 0 },
          colors: [
            $themeColors.primary,
            $themeColors.warning,
            $themeColors.danger,
          ],
        },
      },
      sessionsByDeviceDonutVenta: {
        series: [],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          labels: [],
          dataLabels: {
            enabled: false,
          },
          legend: { show: false },
          comparedResult: [],
          stroke: { width: 0 },
          colors: [
            $themeColors.primary,
            $themeColors.warning,
            $themeColors.danger,
          ],
        },
      },
    };
  },

  computed: {

    contacto() {
      return this.$store.state.appDashboard.contactos;
    },

    agendas() {
      return this.$store.state.appCalendario.agenda;
    },

    cliente() {
      return this.$store.state.appDashboard.clientes;
    },

    tareas() {
      return this.$store.state.appTareas.tareas;
    },

    inmueble_venta() {
      return this.$store.state.appDashboard.inmuebles_vendas;
    },

    inmueble_arriendo() {
      return this.$store.state.appDashboard.inmuebles_arriendo;
    },

    tprofileData() {
      return this.$store.state.userData.userData;
    },
  },

  mounted() {
    //this.getPorcentageArriendo();
  },

  created() {

    if(this.employeeData){
        for (let i = 0; i < this.employeeData.length; i += 1) {
          const chartClone = JSON.parse(JSON.stringify(this.chart));
          chartClone.options.colors[0] = this.chartColor[i];
          chartClone.series[0] = this.chartSeries[i];
          this.chartData.push(chartClone);
        }
    }
    

    this.$http.get("/card/card-analytics/sessions-device").then((res) => {
      this.chartDataCircle = res.data;
    });
    this.getPorcentageArriendo();
    this.getPorcentageVenta();
    this.$store.dispatch("appDashboard/getDashboard");
   // this.getTareas();
    //this.getCalendar();
    this.getVisitas();
  },

  methods: {

  
      hideModal() {
        this.modalShow=false;
      },
    ocultar(data) {
      if (data == "arrendo") {
        this.show_ventas = false;
        this.show_arrendo = true;
      }

      if (data == "venta") {
        this.show_arrendo = false;
        this.show_ventas = true;
      }
    },

    filterObject(obj, callback) {
      return Object.fromEntries(
        Object.entries(obj).filter(([key, val]) => callback(val, key))
      );
    },

    

    getPorcentageArriendo() {
      this.$store
        .dispatch("apiInmueblePrivate/getTipoInmueble", {})
        .then((response) => {
          let total = 0;

          this.$store
            .dispatch("appDashboard/getPorcentageArrendo")
            .then((data) => {
              for (let i = 0; i < response.length; i++) {
                response[i].count = 0;
                for (let j = 0; j < data.length; j++) {
                  if (response[i].id == data[j].id) {
                    response[i].count += 1;
                  }
                }
              }

              for (let j = 0; j < response.length; j++) {
                if (response[j].count > 0) {
                  this.type_inmueble_arriendo.push(response[j]);
                  total += response[j].count;
                }
              }

              for (let j = 0; j < response.length; j++) {
                if (response[j].count > 0) {
                  this.sessionsByDeviceDonutArriendo.chartOptions.labels.push(
                    response[j].tipo
                  );
                  let porcentage = (response[j].count * 100) / total;
                  this.sessionsByDeviceDonutArriendo.series.push(porcentage);
                  response[j].porcentage = porcentage;
                }
              }
            });
        })
        .catch((error) => {
        });
    },

    getPorcentageVenta() {
      this.$store
        .dispatch("apiInmueblePrivate/getTipoInmueble", {})
        .then((response) => {
          let total = 0;
          this.$store
            .dispatch("appDashboard/getPorcentageVenta")
            .then((data) => {
              for (let i = 0; i < response.length; i++) {
                response[i].count = 0;
                for (let j = 0; j < data.length; j++) {
                  if (response[i].id == data[j].id) {
                    response[i].count += 1;
                  }
                }
              }

              for (let j = 0; j < response.length; j++) {
                total += response[j].count;
              }

              for (let j = 0; j < response.length; j++) {
                if (response[j].count > 0) {
                  this.type_inmueble_venta.push(response[j]);

                  this.sessionsByDeviceDonutVenta.chartOptions.labels.push(
                    response[j].tipo
                  );
                  let porcentage = (response[j].count * 100) / total;
                  this.sessionsByDeviceDonutVenta.series.push(porcentage);
                  response[j].porcentage = porcentage;
                }
              }
            });
        })
        .catch((error) => {
        });
    },

    getCalendar() {
      this.$store.dispatch("appCalendario/getEventos").then(( res ) => {
      });
    },

    getTareas() {
      this.$store.dispatch("appTareas/getTareas");
    },

     getVisitas() {
      this.$store
        .dispatch("appDashboard/getDashboard")
        .then((response) => {
        this.visitas={
        options: {
          chart: {
            id: response.visitas.options.chart.id,
          },
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          }
        },
      series: [{
        name: response.visitas.series.name,
        data: response.visitas.series.data
      }]
      },

      this.referidos={
        options: {
          chart: {
            id: response.telefonos.options.chart.id,
          },
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          }
        },
      series: [{
        name: response.telefonos.series.name,
        data: response.telefonos.series.data
      }]
      },



         this.c.options.chart.id=response.c.options.chart.id;
         this.c.options.xaxis.categories=response.c.options.xaxis.categories;
         this.c.series[0]=response.c.series;
         this.c.series[0].name=response.c.series.name;

          this.inm.options.chart.id=response.inmuebles.options.chart.id;
         this.inm.options.xaxis.categories=response.inmuebles.options.xaxis.categories;
         this.inm.series[0]=response.inmuebles.series;
         this.inm.series[0].name=response.inmuebles.series.name;

          this.cli.options.chart.id=response.cli.options.chart.id;
         this.cli.options.xaxis.categories=response.cli.options.xaxis.categories;
         this.cli.series[0]=response.cli.series;
         this.cli.series[0].name=response.cli.series.name;

        
         this.tipos.series[0]=parseInt(response.inmuebles_arrendo);
         this.tipos.series[1]=parseInt(response.inmuebles_ventas);

         this.pro.series[0]=parseInt(response.casa);
         this.pro.series[1]=parseInt(response.apartamento );

         


         var proChart = new ApexCharts(
            document.querySelector("#proChart"),
            this.tipos.options, this.tipos.series
          );

          proChart.render();


         var tipoChart = new ApexCharts(
            document.querySelector("#tipoChart"),
            this.tipos.options, this.tipos.series
          );

          tipoChart.render();



         var chartClientes = new ApexCharts(
            document.querySelector("#clientesChart"),
            this.cli.options, this.cli.series
          );

          chartClientes.render();


         var chartInmuebles = new ApexCharts(
            document.querySelector("#inmueblesChart"),
            this.inm.options, this.inm.series
          );

          chartInmuebles.render();



       /*  var chart = new ApexCharts(
            document.querySelector("#visitasChart"),
            this.visitas.options, this.visitas.series
          );

          chart.render();*/

          var contactosChart = new ApexCharts(
            document.querySelector("#contactosChart"),
            this.c.options, this.c.series
          );

          contactosChart.render()

        })
        .catch((error) => {
        });
    },


  },
};
</script>
<style lang="scss" scoped>
.color-count {
  color: #fff;
}

.modalseccion{
  border: 1px solid #7367f0;
    border-radius: 10px;
    padding: 1em;
}
</style>