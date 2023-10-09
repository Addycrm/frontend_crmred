import {axiosIns} from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    mercadeo: [],
    users: [],
    messages: [],
    type: [],
  },
  getters: {},
  mutations: {
    SET_MERCADEO: (state, payload) => {
      state.mercadeo = payload;
    },

    SET_USERS: (state, payload) => {
      state.users = payload;
    },

    SET_MESSAGE: (state, payload) => {
      state.messages = payload;
    },
    SET_MERCADEO_TYPE: (state, value) => {
      state.type = value;
    },
  },
  actions: {
    getMercadeoType(ctx, data){
      if(ctx.state.type.length == 0){
        axiosIns.get('/api/auth/mercadeo-type')
        .then(response => {
          ctx.commit("SET_MERCADEO_TYPE", response.data.data.mercadeo_type);
        }).catch(error => {
          console.error(error);
        })
      }
    },
    fetchMercadeos(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/mercadeo/${data.user_id}`)
        .then((response) => {
          ctx.commit("SET_MERCADEO", response.data.data.mercadeo);
          resolve(response.data.data.mercadeo)
        })
        .catch(error => reject(error))
      })
    },

    fetchMercadeo(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/mercadeo/${id}`)
        .then((response) => {
          resolve(response.data.data.cliente)
        })
        .catch(error => reject(error))
      })
    },

    addMercadeo(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/mercadeo', data)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },

    getUsers(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/get_users`)
        .then((response) => {
          ctx.commit("SET_USERS", response.data.data.users);
          resolve(response.data.data.users)
        })
        .catch(error => reject(error))
      })
    },

    getMessages(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/get_messages`)
        .then((response) => {
          ctx.commit("SET_MESSAGE", response.data.data.message);
          resolve(response.data.data.message)
        })
        .catch(error => reject(error))
      })
    },
    sendNotifications(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`/api/auth/notifications`, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch(error => reject(error))
      })
    }
  },
}
