export default {
    namespaced: true,
    state: {
        estimado:'',
        cantReferidos: 0,
    },
    getters: {},
    mutations: {
        UPDATE_ESTIMADO(state, val){
            state.estimado = val

        },

        UPDATE_CANT_REFERIDOS(state, val){
            state.cantReferidos = val

        },

    },
    actions: {},
  }
  