import {axiosIns} from '@/libs/axios'
export default {
  namespaced: true,
  state: {
    empresa:[]
  },
  mutations: {
    SET_EMPRESAS: (state, payload) => {
      state.empresa = payload;
    },
  },
  actions: {
    fetchEmpresas(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/agente/empresas', {})
        .then(response => {
          ctx.commit('SET_EMPRESAS', response.data.data.empresas)
          resolve(response.data)
        }).catch(error => reject(error))
      })
    },
    fetchEmpresa(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchClients() {
      return new Promise((resolve, reject) => {
        axiosIns.get('/')
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    addEmpresa(ctx, empresa) {
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/empresas', empresa)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
}
