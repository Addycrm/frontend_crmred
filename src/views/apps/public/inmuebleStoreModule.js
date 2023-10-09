import { axiosIns } from '@/libs/axios';
import store from '@/store'
export default {
  namespaced: true,

  state: {
    tabla: {
      data: [],
      total: 1
    },
    inmuebleSelect:null,
    inmuebles: [],
    inmueblesAll: [],
    antiguedad: [],
    inmueblesList: [],
    resultInmuebles: [],
    inmueblesDetail: [],
    inmueblesDetailFull: [],
    // 
    result: [],
    page: [],
    total: Infinity,
  },
  getters: {},
  mutations: {
    SET_TABLA: (state, value) => {
      for (let prop in value)
        Object.assign(state.tabla, { [prop]: value[prop] })
    },
    SET_TABLA_AGENT:(state,data)=>{
      state.tabla = data
    },
    SET_RESULT: (state, { result, page, total }) => {
      if (state.result.length < state.total) {
        state.result.push(result);
        state.page.push(page);
      }
      if (state.total == Infinity)
        state.total = total;
    },
    SET_INMUEBLES: (state, value) => {
      state.inmueblesList = value.list;
      state.inmueblesDetail = value.detail;
      state.resultInmuebles = value.list;
    },
    SET_INMUEBLES_FULL: (state, value) => {
      state.inmueblesDetailFull = value;
    },

    SET_FILTROS: (state, value) => {
      state.resultInmuebles = value;
    },
    UPDATE_PORTALES: (state, inmueble) => {
      const { portale_state_inmueble, portales_codigo_response } = inmueble;
      state.inmueblesDetail.filter(item => {
        if (item.id === inmueble.id) {
          Object.assign(item, { portale_state_inmueble, portales_codigo_response });
        }
      });
    },
    SET_INMUEBLES_ALL: (state, payload) => {
      state.inmueblesAll = payload;
    },
    SET_ANTIGUEDAD(state, payload) {
      state.antiguedad = payload;
    },
    ADD_INMUEBLE: (state, value) => {
      state.tabla.data.unshift(value);
    },
    SET_INMUEBLE_SELECT(state,inmueble){
      state.inmuebleSelect=inmueble
    },
    UPDATE_INMUEBLE: (state, value) => {
      for (let item of state.tabla.data){
        if (item.id === value.id){
          Object.assign(item, value);
          state.inmuebleSelect = value
        }
      }
    }
  },
  actions: {

    // INMUEBLES DE AGENTES

    depublicateMasiveAgent(ctx,data){
      return new Promise((resolve, reject) => {
        axiosIns({
          url: `api/auth/usuarios-despublicacion-maxiva`,
          method: 'post',
          data,
        }).then(res => {
          resolve(true);
        }).catch(err => {
          resolve(false);
        });
      });
    },

    getInmueblesAgentFilter(ctx, {data,params}) {
      return new Promise((resolve, reject) => {
        axiosIns({
          url: `api/auth/elite/get-properties`,
          method: 'post',
          data,
          params
        }).then(res => {
          ctx.state.tabla=res.data
          resolve(true);
        }).catch(err => {
          console.error(err)
          resolve(false);
        });
      });
    },
    // async getInmueblesAgent(ctx){
    //   try{
    //       let res= await axiosIns({
    //           url:`api/auth/elite/get-properties/${id}`,
    //           method:'get'
    //       })
    //       ctx.state.tabla=res.data
    //   }catch(error){
    //       console.error(error)
    //   }
    // },

    //////////////////
    getInmueblesPublic(ctx, { data, params }) {
      return new Promise((resolve, reject) => {
        axiosIns({
          url: 'api/auth/api-inmueble/inmuebles-public/filter',
          method: 'post',
          data,
          params
        }).then(res => {
          ctx.commit('SET_TABLA', res.data.data);
          // store.commit('appConfiguracion/STATE_OVERLAY', false);
          resolve(true);
        }).catch(err => {
          console.error(err)
          resolve(false);
        });
      });
    },
    getInmuebles(ctx, { data, params }) {
      return new Promise((resolve, reject) => {
        axiosIns({
          url: 'api/auth/api-inmueble/inmuebles/filter',
          method: 'post',
          data,
          params
        }).then(res => {
          ctx.commit('SET_TABLA', res.data.data);
          // store.commit('appConfiguracion/STATE_OVERLAY', false);
          resolve(true);
        }).catch(err => {
          console.error(err)
          resolve(false);
        });
      });
    },
    getInmueblesAll(ctx, payload) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api-inmueble/inmuebles")
          .then((response) => {
            ctx.commit("SET_INMUEBLES_ALL", response.data.data.inmuebles);
            let data = response.data.data;
            const { q = '', sortBy = 'featured', perPage = 9, page = 1 } = payload

            const queryLowered = q.toLowerCase()

            const filteredData = data.inmuebles.filter(product => product.titulo_inmueble.toLowerCase().includes(queryLowered))

            let sortDesc = false
            const sortByKey = (() => {
              if (sortBy === 'price-desc') {
                sortDesc = true
                return 'price'
              }
              if (sortBy === 'price-asc') {
                return 'price'
              }
              sortDesc = true
              return 'id'
            })()

            const sortedData = filteredData.sort(sortCompare(sortByKey))

            if (sortDesc) sortedData.reverse()

            const paginatedData = JSON.parse(JSON.stringify(paginateArray(sortedData, perPage, page)))

            paginatedData.forEach(product => {
              /* eslint-disable no-param-reassign */
              product.isInWishlist = data.userWishlist.findIndex(p => p.productId === product.id) > -1
              product.isInCart = data.userCart.findIndex(p => p.productId === product.id) > -1
              /* eslint-enable */
            })

            return [
              200,
              {
                products: paginatedData,
                total: filteredData.length,
                userWishlist: data.userWishlist,
                userCart: data.userCart,
              },
            ]

          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    orderImage(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("/api/auth/api-inmueble/order-image", data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getEstadoInmueble(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble-state")
          .then((response) => {
            resolve(response.data.data.state_property);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getAgenteInmueble(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/users-agentes")
          .then((response) => {
            resolve(response.data.data.agente);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    filterInmueble(ctx, value) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble-filter", { params: value })
          .then((response) => {
            let inmuebles = response.data.data.inmuebles.data;
            ctx.commit("SET_INMUEBLES", _inmuebles(inmuebles));
            resolve(response.data.data.inmuebles);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    downloadPdf(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/api-inmueble/download_pdf`, { params: data.data, responseType: 'arraybuffer' })
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;

            let mensaje = "documento";

            if (data.type == 'cedula') {
              mensaje = 'cedula'
            }
            if (data.type == 'predial') {
              mensaje = 'predial'
            }
            if (data.type == 'certificado_tradiccion') {
              mensaje = 'certificado de tradiccion'
            }

            fileLink.setAttribute('download', `${mensaje}.pdf`);
            document.body.appendChild(fileLink);
            fileLink.click();

            resolve(true)

          })
          .catch((error) => reject(error));
      });
    },


    showPDF(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/api-inmueble/download_pdf`, { params: data.data, responseType: 'arraybuffer' })
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            //fileLink.setAttribute('download', `${mensaje}.pdf`);
            document.body.appendChild(fileLink);
            //fileLink.click();

            resolve(fileLink)

          })
          .catch((error) => reject(error));
      });
    },

    exportInmueble(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/api-inmueble/export`, { params: data, responseType: 'arraybuffer' })
          .then((response) => {
            let fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            let fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'inmuebles.xlsx');
            document.body.appendChild(fileLink);
            fileLink.click();
            resolve(true)

          })
          .catch((error) => reject(error));
      });
    },

    importInmueble() {

    },

    soatAction(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`/api/auth/service`, data)
          .then((response) => resolve(response.data))
          .catch((error) => reject(error));
      });

    },

    fetchInmuebles(ctx, payload) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/apps/ecommerce/products", { params: payload })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },


    getAntiguedad(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/antiguedad")
          .then((response) => {
            ctx.commit("SET_ANTIGUEDAD", response.data.data.antiguedad);

            resolve(response.data.data.antiguedad);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },


    fetchInmueble(ctx, { slug, code }) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/api-inmueble/inmuebles/url`, { params: { slug, code } })
          .then((response) => {
            resolve(response.data.data.inmueble);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    detailInmueble(ctx, slug) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/api-inmueble/inmuebles/url/${slug}`)
          .then((response) => {
            resolve(response.data.data.inmueble);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

  },
};