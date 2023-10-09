import {axiosIns} from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    mercadeo_admin: [],
    mercadeo_type: []
  },
  mutations: {
    SET_MERCADEO_ADMIN: (state, payload) => {
      state.mercadeo_admin = payload;
    },

    SET_MERCADEO_TYPE: (state, payload) => {
      state.mercadeo_type = payload
    }

  },
  actions: {
    sendMercadeoType(ctx, data){
      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/mercadeo-type', data)
        .then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    fetchMercadeoAdmin(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/mercadeo_admin`)
        .then((response) => {
          ctx.commit("SET_MERCADEO_ADMIN", response.data.data.mercadeo_admin);
          resolve(response.data.data.mercadeo_admin)
        })
        .catch(error => reject(error))
      })
    },

    addMercadeoAdmin(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/mercadeo_admin', data)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },

    editMercadeoAdmin(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`/api/auth/mercadeo_admin/edit`, data)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },

    fetchTypeMercadeo(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/mercadeo-type`)
        .then((response) => {
          ctx.commit("SET_MERCADEO_TYPE", response.data.data.mercadeo_type);
          resolve(response.data.data.mercadeo_type)
        })
        .catch(error => reject(error))
      })
    },
  },
}
