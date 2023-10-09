import {axiosIns} from '@/libs/axios';
import { promiseTimeout } from "@vueuse/shared";

export default {
  namespaced: true,
  state: {
    newFeatures:{}
  },
  getters: {},
  mutations: {

    // ======
    SET_INMUEBLES: (state, payload) => {
      state.inmuebles = payload;
    },

    SET_INMUEBLES_LIST: (state, payload) => {
      state.inmuebles_list = payload
    },

    SET_STATE_PUBLICACION(state, payload) {
      state.state_publication = payload
    },

    SET_STATE_FISICO: (state, payload) => {
      state.state_fisico = payload
    },

    SET_TIPO_PARQUEADERO(state, payload) {
      state.tipo_parqueadero = payload;
    },

    RANGUE_PRICE: (state, payload) => {
      state.rangue_price = payload
    },

    SET_TIPO_FICHA: (state, value) => {
      state.tipo_ficha = value;
    },

  },
  actions: {
    async sendFormFeatures(ctx, {id,value,cpanel,configUrl}){
      try{
        let res = await axiosIns({
          url:`api/auth/${configUrl}`,
          method:'post',
          data:{
            id,
            value,
            cpanel
          }
        })
        return res.data;
      }catch(error){

      }
  },
}
}
