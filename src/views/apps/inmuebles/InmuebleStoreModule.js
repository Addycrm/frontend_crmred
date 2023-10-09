import {axiosIns} from '@/libs/axios';
import { promiseTimeout } from "@vueuse/shared";

export default {
  namespaced: true,
  state: {
    inmuebles: [],
    inmuebles_list: [],
    tipo_ficha: [],
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
    getTipoFichas(ctx){
      return new Promise((resolve, reject) => {
         axiosIns.get("/api/auth/api-inmueble-type_ficha")
        .then((response) => {
          const {data} = response.data;
          data.sort((a, b) => {
            return a['id'] < b['id'] ? 1 : a['id'] > b['id'] ? -1 : 0;
          });
          ctx.commit('SET_TIPO_FICHA', data);
          resolve(data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
      });
    },

    getInmuebles(ctx, userData) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/inmuebles/" + userData, {})
          .then((response) => {
            ctx.commit("SET_INMUEBLES", response.data.data.inmuebles);
            // resolve(response.data.data.inmuebles);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getInmueblesList(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/app-inmueble/inmuebles/list")
          .then((response) => {
            
            ctx.commit("SET_INMUEBLES_LIST", response.data.data.inmuebles);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchInmueble(ctx, productId) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/api-inmueble/inmuebles/${productId.productSlug}`)
          .then((response) => {
            resolve(response.data.data.inmueble);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    removeImage(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("api/auth/api-inmueble/delete-image", data)
          .then((response) => {
            resolve(response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editImage(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("api/auth/api-inmueble/edit-image", data)
          .then((response) => {
            resolve(response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addImage(ctx, data, progress) {
      return new Promise((resolve, reject) => {
        axiosIns.post("api/auth/api-inmueble/add-image", data)
          .then((response) => {
            resolve(response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    updImage(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("api/auth/api-inmueble/upd-image", data)
          .then((response) => {
            resolve(response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    delImage(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("api/auth/api-inmueble/del-image", data)
          .then((response) => {
            resolve(response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },


    getReferidoForId(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/users/${id}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },

    updateReferido(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.put("api/auth/users/" + data.id_referido, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getPorcentageArrendo(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/api-inmueble/arrendo`)
          .then((response) => {
            let data = response.data.data.inventario_arriendo

            chartInfo = {
              icon: null,
              name: null,
              iconColor: 'text-primary',
              usage: 0,
              upDown: 0,
            };

            let tipo_inmueble = [];

            for (let i = 0; i < data.length; i++) {
              tipo_inmueble.push(data[i].tipo_inmueble)
            }

            resolve(tipo_inmueble);

          })
          .catch(error => reject(error))
      })
    },

    getPorcentageVenta() {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/api-inmueble/arrendo`)
          .then((response) => {
          })
          .catch(error => reject(error))
      })
    },

    fetchReferidosAdicional(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("api/auth/referidos/adicional", data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    validateCampos(ctx, referido) {
      return new Promise((resolve, reject) => {
        axiosIns.post("api/auth/referidos/validacion", referido)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    saveInmuebles(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("/api/auth/api-inmueble", data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.data);
          });
      });
    },

    getPdf(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("/api/auth/api-inmueble/get_pdf/" + data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editInmuebles(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("/api/auth/api-inmueble/editar_inmueble", data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.data);
          });
      });
    },
  },
};
