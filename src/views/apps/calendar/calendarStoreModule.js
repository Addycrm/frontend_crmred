import {axiosIns} from '@/libs/axios'
import store from '@/store'
export default {
  namespaced: true,
  state: {
    escritorio:[],
    dataGoogle: [],
    agenda: [],
    calendarOptions: [],
    calendarOptionsGoogle: [{
      color: 'primary',
      label: 'Personal',
    },],
    selectedCalendars: [],
    state_agenda_cita: [],
    calendars: {
      filter: {
        t_cita: {
          value: [],
          all: false,
          state: false,
        },
        assignee: {
          value: [],
          all: false,
          state: false,
        }
      },
      full: [],
      result: [],
    },
  },
  mutations: {
    SET_VALUE_FILTER: (state, {props, prop,  value}) => {
      state.calendars.filter[props][prop] = value
    },
    SET_FILTER({calendars}) {
      calendars.result = 
      calendars.full.filter(item => {
        let result = [];

        for(let prop in calendars.filter)
          if(calendars.filter[prop].value.length)
            result.push(Boolean(item[prop]) && calendars.filter[prop].value.includes(item[prop].id));

        return !result.includes(false);
      });
    },
    SET_ESCRITORIO(state, value){
      value.sort((x, y) => (x.end > y.end ? 1 : x.end < y.end ? -1 : 0))
      let result = value.filter(item => new Date() < new Date(item.end))
      state.escritorio = result.slice(0, 4);
    },
    SET_DATA_EVENT(state, val) {
      state.selectedCalendars = val
    },
    SET_DATA_GOOGLE(state, val) {
      state.dataGoogle = val
    },
    SET_DATA_AGENDA(state, val) {
      state.agenda = val
    },
    SET_TIPO_CITAS(state, val) {
      state.calendarOptions = val
    },
    SET_ESTADO_AGENDA_CITA(state, val) {
      state.state_agenda_cita = val
    },
    SET_CALENDARS(state, calendars){
      Object.assign(state.calendars,{
        full: calendars,
        result: calendars,
      })
    },
    REMOVE_CALENDARS:(state, id) => {
      state.calendars.full = state.calendars.full.filter(item => !(item.id == id));
      state.calendars.result = state.calendars.result.filter(item => !(item.id == id));
    },
    ADD_CALENDARS:({calendars}, value) => {
      calendars.full.push(value.agendas);
    },
    UPDATE_CALENDARS:(state, value) => {
      for(let item of state.calendars.full){
        if(item.id === value.agendas.id)
          Object.assign(item, value.agendas);
      }
    }
  },
  actions: {
    getEventos(ctx, params) {
      return new Promise(resolve => {
        if(ctx.state.calendars.full.length == 0){
          // store.commit('appConfiguracion/STATE_OVERLAY', true);
          axiosIns({
            url: 'api/auth/api-agenda',
            method: 'get',
            params
          }).then(res => {
            let agenda = res.data.data.agenda;
            ctx.commit('SET_ESCRITORIO', agenda);
            ctx.commit('SET_CALENDARS', agenda);
            store.commit('appConfiguracion/STATE_OVERLAY', false);
            resolve(agenda)
          }).catch(err => console.error(err))
        }else{
          resolve();
        }
      })
    },
    sendEvent(ctx, {data, id}){
      return new Promise(resolve => {
        axiosIns({
          url: 'api/auth/api-agenda',
          method: 'post',
          data
        }).then(res => {
          let agendas = res.data.data;
          if(id){
            ctx.commit('UPDATE_CALENDARS', agendas);
          } else{
            ctx.commit('ADD_CALENDARS', agendas);
            ctx.commit('SET_FILTER');
          }
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      });
    },
    fetchReporteAgente(ctx, data){
      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/api-agenda-reporte/'+ data)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch(error => reject(error))
      })
    },

    fetchTipoCitas(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/api-agenda-tipo/tipo_citas')
        .then((response) => {
          ctx.commit("SET_TIPO_CITAS", response.data.data.tipo_citas);
          resolve(response.data.data.tipo_citas)
        })
        .catch(error => reject(error))
      })
    },

    fetchEstadoAgendaCitas(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/api-agenda-state/agenda_cita')
        .then((response) => {
          ctx.commit("SET_ESTADO_AGENDA_CITA", response.data.data.agendas_estado_citas);
          resolve(response.data.data.agendas_estado_citas)
        })
        .catch(error => reject(error))
      })
    },

    fetchEstadoAgendaCitasForInmueble(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/api-agenda-state/agenda_cita/' + data.id)
        .then((response) => {
          resolve(response.data.data.estado)
        })
        .catch(error => reject(error))
      })
    },

    addEstadoAgendaReport(ctx,  data) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/api-agenda-state/register', data)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },

    updateEstadoAgendaReport(ctx, { event }) {
      return new Promise((resolve, reject) => {
        axiosIns.put(`/api/auth/api-agenda-state/update/${event.id}`, { event })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },


    

    addEvent(ctx, { event }) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/api-agenda', { event })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    updateEvent(ctx, { event }) {
      return new Promise((resolve, reject) => {
        axiosIns.put(`/api/auth/api-agenda/${event.id}`, { event })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    removeEvent(ctx, id) {
      return new Promise((resolve, reject) => {
        axiosIns.delete(`api/auth/api-agenda/${id}`)
        .then(res => resolve({state: true, data: res}))
        .catch(res => resolve({state: false, data: res}));
      })
    },
    agendarCita(ctx, { event }){
      return new Promise((resolve, reject)=>{
        axiosIns.post('/api/auth/api-agenda-create', { event })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
  },
}
