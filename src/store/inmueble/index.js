import {axiosIns} from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    inmuebles: [],
    inmuebles_list: [],
    tipo_ficha: [],
    options: {
      antiguedad: [],
      caracteristicas_externas: [],
      caracteristicas_internas: [],
      estrato: [],
      parqueadero: [],
      periodo_admon: [],
      rangue_price: [],
      segmento_mercado: [],
      state_fisicos: [], 
      state_publication: [],
      tiempo_alquiler: [],
      tipo_inmuebles: [],
      tipo_negocio: [],
      tipo_precio: [],
    }
  },
  getters: {},
  mutations: {
    SET_ANTIGUEDAD: (state, value) => {

      Object.assign(state.options, {antiguedad: value});
    },
    SET_CARACTERISTICAS_EXTERNAS: (state, value) => {

      Object.assign(state.options, {caracteristicas_externas: value});
    },
    SET_CARACTERISTICAS_INTERNAS: (state, value) => {

      Object.assign(state.options, {caracteristicas_internas: value});
    },
    SET_ESTRATO: (state, value) => {

      Object.assign(state.options, {estrato: value});
    },
    SET_PARQUEADERO: (state, value) => {

      Object.assign(state.options, {parqueadero: value});
    },
    SET_PERIODO_ADMON: (state, value) => {

      Object.assign(state.options, {periodo_admon: value});
    },
    SET_RANGUE_PRICE: (state, value) => {

      Object.assign(state.options, {rangue_price: value});
    },
    SET_SEGMENTO_MERCADO: (state, value) => {

      Object.assign(state.options, {segmento_mercado: value});
    },
    SET_STATE_FISICOS: (state, value) => {

      Object.assign(state.options, {state_fisicos: value});
    },
    SET_STATE_PUBLICATION: (state, value) => {

      Object.assign(state.options, {state_publication: value});
    },
    SET_TIEMPO_ALQUILER: (state, value) => {

      Object.assign(state.options, {tiempo_alquiler: value});
    },
    SET_TIPO_INMUEBLES: (state, value) => {

      Object.assign(state.options, {tipo_inmuebles: value});
    },
    SET_TIPO_NEGOCIO: (state, value) => {

      Object.assign(state.options, {tipo_negocio: value});
    },
    SET_TIPO_PRECIO: (state, value) => {

      Object.assign(state.options, {tipo_precio: value});
    },


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
    getAntiguedad(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/antiguedad")
        .then((response) => {
          let value = response.data.data.antiguedad;

          ctx.commit("SET_ANTIGUEDAD", value);
          resolve(value);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    getCaracteristicasExternas(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/api-inmueble/caracteristicas_externas")
        .then((response) => {
          let value = response.data.data.caracteristicas_externas;

          ctx.commit('SET_CARACTERISTICAS_EXTERNAS', value);
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getCaracteristicasInternas(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/api-inmueble/caracteristicas_internas")
        .then((response) => {
          let value = response.data.data.caracteristicas_internas;

          ctx.commit('SET_CARACTERISTICAS_INTERNAS', value);
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getEstratoFisico(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/estratos")
        .then((response) => {
          let value = response.data.data.estratos;

          ctx.commit('SET_ESTRATO', value)
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getTipoParqueadero(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/parqueaderos")
        .then((response) => {
          let value = response.data.data.parqueaderos;

          ctx.commit('SET_PARQUEADERO', value)
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getPeridoAdmon(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/periodo_admon")
        .then((response) => {
          let value = response.data.data.periodo_admon;

          ctx.commit('SET_PERIODO_ADMON', value)
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getRanguePrice(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/rangue-price")
        .then((response) => {
          let value = response.data.data.rangue_price;

          ctx.commit('SET_RANGUE_PRICE', value)
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getSegmentoMercado(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/segmento_mercado")
        .then((response) => {
          let value = response.data.data.segmento_mercado;

          ctx.commit('SET_SEGMENTO_MERCADO', value);
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getStateFisico(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/estado_fisico")
        .then((response) => {
          let value = response.data.data.estado_fisico;

          ctx.commit('SET_STATE_FISICOS', value)
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getStatePublicacion(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/stete_publication")
        .then((response) => {
          let value = response.data.data.tipe_publication;

          ctx.commit('SET_STATE_PUBLICATION', value)
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getTipoTiempoAlquler(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/tiempo_alquiler")
        .then((response) => {
          let value = response.data.data.tiempo_alquiler;
          ctx.commit('SET_TIEMPO_ALQUILER', value)
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getTipoInmueble(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/api-inmueble/tipo_inmuebles")
        .then((response) => {
          let value = response.data.data.tipo_inmuebles;

          ctx.commit("SET_TIPO_INMUEBLES", value);
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getTipoNegocio(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/api-inmueble/tipo_negocio")
        .then((response) => {
          let  value = response.data.data.tipo_negocio;
          ctx.commit('SET_TIPO_NEGOCIO', value)
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    getTipoPrecios(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/precios")
        .then((response) => {
          let  value = response.data.data.precios;
          ctx.commit('SET_TIPO_PRECIO', value)
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    /*===========================================*/

    getInmuebles(ctx, userData) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/inmuebles/" + userData, {})
        .then((response) => {
          ctx.commit("SET_INMUEBLES", response.data.data.inmuebles);
          resolve(response.data.data.inmuebles);
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
