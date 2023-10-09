import {axiosIns} from '@/libs/axios'

export default {
  namespaced: true,

  state: {
    perfil: [],
  },
  getters: {

  },
  mutations: {
    SET_PERFIL: (state, payload) => {
      state.perfil = payload;
    },
  },
  actions: {
    fetchPerfil(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get('api/auth/referidos', {})
        .then(response => {
          ctx.commit('SET_PERFIL', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
      })
    },



    fetchCreatePerfil(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get('api/auth/referidos/create', {})
        .then(response => {

          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    getProfile(ctx, data) {

      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/personas/perfil', { id_usuario: data.id_user })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    fetchPerfilAdicional(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/personas/perfil/adicional', data)
        .then(response => {

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    updatePerfil(ctx, referido) {

      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/users/perfil/update/informacion', referido)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    updatePerfilAgente(ctx, referido) { 
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/users/perfil/update/informacion_agente', referido)
        .then(response => {

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
      
    },
    addPerfil(ctx, value){
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/users/perfil/update', value)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    validateCampos(ctx, referido) {
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/personas/perfil/validacion', referido)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  },
}
