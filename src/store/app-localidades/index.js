import { axiosIns } from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    paises: [],
    contry_id: [],
    id_pais: [],

    estados: [],
    state_id: [],
    id_estado: [],

    ciudades: [],
    city_id: [],
    id_ciudad: [],

    zonas: [],

    barrios: [],
  },
  getters: {},
  mutations: {
    GET_PAISES(state, value) {
      state.paises = value;
      state.contry_id = value;
    },


    GET_STATES(state, value) {
      Object.assign(state, {
        estados: value,
        state_id: value,
        id_estado: value,
      });
    },
    SET_STATE(state, value) {
      state.estados.push(value);
    },
    GET_CIUDADES(state, value) {
      state.ciudades = value;
    },
    SET_CITY(city, value) {
      city.ciudades.push(value);
    },
    DELETE_BARRIOS( state, value) {
      state.barrios = state.barrios.filter(item => !(item.id == value));
    },
    GET_BARRIOS(state, value) {
      state.barrios = value;
    },
    SET_BARRIO(barrio, value) {
      barrio.barrios.push(value);
    },
    GET_ZONAS(state, value) {
      state.zonas = value;
    },
    SET_ZONA(state, value) {
      state.zonas.push(value);
    },

    DELETE_ZONA( state, value) {
      state.zonas = state.zonas.filter(item => !(item.id == value));
    },
  },
  actions: {
    getPaises(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/localidad/paises")
          .then((response) => {

            ctx.commit("GET_PAISES", response.data.data.paises);
            resolve(response.data.data.paises);
          }).catch((error) => {

          });
      });
    },

    getStates(ctx, id_country) {
      const { codigo } = id_country;

      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/localidad/states/" + codigo)
          .then((response) => {
            const { estados } = response.data.data
            ctx.commit("GET_STATES", estados);
            resolve(estados);
          }).catch((error) => {
          });
      });
    },

    getCiudades(ctx, id_state) {
      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/localidad/ciudades/" + id_state.codigo)
          .then((response) => {
            const { ciudades } = response.data.data;
            ctx.commit("GET_CIUDADES", ciudades);
            resolve(ciudades);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getZona(ctx, id_ciudad) {
      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/localidad/zona/" + id_ciudad.codigo)
          .then((response) => {
            const { zonas } = response.data.data;
            ctx.commit("GET_ZONAS", zonas);
            resolve(response.data.data.zonas);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getBarrio(ctx, id_zona) {
      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/localidad/barrio/" + id_zona.codigo)
          .then((response) => {
            ctx.commit("GET_BARRIOS", response.data.data.barrios);
            resolve(response.data.data.barrios);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteBarrio(ctx, codigo) {
      return new Promise((resolve, reject) => {
        axiosIns.delete("api/auth/localidad/barrio/" + codigo)
          .then((response) => {
            ctx.commit("DELETE_BARRIOS", codigo);
            resolve(response.data.data.barrios);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    saveZona(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`/api/auth/localidad/zona`, data)
          .then((response) => {
            resolve(response.data.data.zona);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteZona(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.delete(`/api/auth/localidad/zona/${data}`)
          .then((response) => {
            ctx.commit("DELETE_ZONA", data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    saveBarrio(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`/api/auth/localidad/barrio`, data)
          .then((response) => {
            resolve(response.data.data.barrio);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
