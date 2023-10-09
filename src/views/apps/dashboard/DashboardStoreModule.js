import {axiosIns} from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    currentDate:new Date(),
    visitas: 0,
    dashboard: {
      clientes: -1,
      contactos: -1,
      inmuebles_arrendo: -1,
      inmuebles_ventas: -1,
      total_leads:-1,
      contact_interested:-1,
    },
    chart:{
      line: {
        inmuebles: {
          color: '#7367f0',
          tooltip: {
            trigger: 'axis',
          },
          yAxis: [
            {
              type: 'value',
              minInterval: 1
            },
          ],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mes']
          },
          series: [{
            name: 'Inmuebles',
            data: [0],
            type: 'line',
            smooth: true,
            areaStyle: {
              opacity: 0.5,
            },
          }]
        },
        cli: {
          color: '#ff9f43',
          tooltip: {
            trigger: 'axis',
          },
          yAxis: [
            {
              type: 'value',
              minInterval: 1
            },
          ],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mes']
          },
          series: [{
            name: 'Clientes',
            data: [0],
            type: 'line',
            smooth: true,
            areaStyle: {
              opacity: 0.5,
            },
          }]
        }
      },
      pie:{
        tipo_negocios:{
          color: ['#003F54','#4DD2FF', '#266980', '#00BFFF', '#0099CC'],
          series: [{
            type: 'pie',
            radius: ['45%', '80%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: []
          }]
        },
        tipo_inmuebles:{
          color: ['#04472A','#0BC775', '#4BD096', '#1A4734', '#099458'],
          series: [{
            type: 'pie',
            radius: ['45%', '80%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: []
          }]
        },
      },
      bar:{
        pagina:{
          color:'#ea5455',
          tooltip: {
            trigger: 'item',
          },
          xAxis: {
            type: 'category',
            data: ['Mes']
          },
          yAxis: [
            {
              type: 'value',
              minInterval: 1
            },
          ],
          series: [{
            name: 'Visitas',
            data: [],
            type: 'bar'
          }]
        },
        c:{
          color:'#e83e8c',
          tooltip: {
            trigger: 'item',
          },
          xAxis: {
            type: 'category',
            data: ['Mes']
          },
          yAxis: [
            {
              type: 'value',
              minInterval: 1
            },
          ],
          series: [{
            name: 'Contactos',
            data: [],
            type: 'bar'
          }]
        },
        leads:{
          color:'#7367f0',
          tooltip: {
            trigger: 'item',
          },
          xAxis: {
            type: 'category',
            data: ['Mes']
          },
          yAxis: [
            {
              type: 'value',
              minInterval: 1
            },
          ],
          series: [{
            name: 'Leads Portales',
            data: [],
            type: 'bar'
          }]
        }
      }
    }
  },
  getters: {},
  mutations: {
    SET_METADATA: (state, value) =>{
      for(let prop in state.dashboard)
        state.dashboard[prop] = value[prop];
    },
    SET_CHART: (state, value) => {
      let currentMonth=state.currentDate.getMonth()+1;
      let eChart = {
        pie:{
          tooltip: {
            trigger: 'item',
            backgroundColor: '#fff',
            borderWidth: 1,
            textStyle:{
              color:'#444',
            }
          },
          legend: {
            type: 'scroll',
            orient: 'horizontal',
            bottom: '0',
            left: 'center'
          },
        },
        line:{
          grid: {
            top: 40,
            left: 40,
            right: 40,
            bottom: 40
          },
          tooltip: {
            backgroundColor: '#fff',
            borderWidth: 1,
            textStyle:{
              color:'#444',
            }
          },
        }
      };

      for(let prop in state.chart){
          let chart = state.chart[prop];
          switch(prop){
            case 'pie':
              for(let pie in chart){
                Object.assign(chart[pie], eChart.pie);

                let data = [];
                for(let i in value[pie].series){
                  if(value[pie].series[i] > 0){
                    data.push({
                      value: value[pie].series[i],
                      name: value[pie].options.labels[i]
                    });
                  }
                }
                Object.assign(chart[pie].series[0],{data});
              }
              break;
            case 'bar':
            case 'line':
              for(let line in chart){
                Object.assign(chart[line], eChart.line);
                let data = [];
                for(let cat of value[line].options.xaxis.categories){
                  data.push(cat.substr(0, 3));
                }
                const newArrayAxis = data.slice(0,currentMonth);
                data = newArrayAxis;
                Object.assign(chart[line].xAxis, { data });
                Object.assign(chart[line].series[0], { 
                  data: value[line].series.data
                });
                const newArrayData =chart[line].series[0].data.slice(0,currentMonth);
                chart[line].series[0].data = newArrayData
              }
              break;
          }
        }
    }
  },
  actions: {
    getDashboard(ctx, data) {
      let commit = ['SET_METADATA', 'SET_CHART'];
      return new Promise(resolve => {
        axiosIns({
          url: 'api/auth/dashboard',
          method: 'get',
          module: 'appDashboard',
          commit,
        }).then(res => {
          let dashboard = res.data.data;
          for(let item of commit)
            ctx.commit(item, dashboard);

          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        })
      })
    },

    //'api/auth/api-inmueble/arrendo'
    //'api/auth/api-inmueble/venta'
    getPorcentage(ctx, {url}) {
      return new Promise(resolve => {
        axiosIns({
          url,
          method: 'get'
        }).then(res => {
          resolve(true)
        }).catch(err => {
          console.error(err);
          resolve(false)
        })
      })
    },
  }
}
