import {axiosIns} from '@/libs/axios'
export default {
  namespaced: true,
  state: {
    tipo_cliente: [],
  },
  getters: {},
  mutations: {
    SET_TIPO_CLIENTE: (state, value) => {
      state.tipo_cliente = value.tipo_cliente;
    }
  },
  actions: {
    getTipoCliente(ctx) {
      return new Promise(resolve => {
        if(ctx.state.tipo_cliente.length == 0){
          axiosIns.get("api/auth/documento/tipo_cliente")
          .then(res => {
            ctx.commit('SET_TIPO_CLIENTE', res.data.data);
            resolve(true);
          })
          .catch(err => {
            console.error(err);
            resolve(false);
          });
        }else{
            resolve(true);
        }
      });
    },

    getNumerosClientes(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/documento/celulares")
          .then((response) => {
            resolve(response.data.data.numero);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    registerNumerosClientes(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("api/auth/documento/celulares", data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    updateNumerosClientes(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.put("api/auth/documento/celulares")
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteNumerosClientes(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.delete("api/auth/documento/celulares")
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    






  },
};
