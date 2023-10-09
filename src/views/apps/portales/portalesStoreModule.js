import { axiosIns } from '@/libs/axios'

import axios from "axios";

export default {
    namespaced: true,
    state: {
        overlay: false,
        portales: [],
        localidades_ciencuadra: [],
        portalActivo: {},
        subportales: [],
        type_service: []
    },
    getters: {},
    mutations: {
        SET_PORTALES: (state, value) => {
            //   const portales = value.portales.filter((item) =>{
            //     return item.id!=4;
            //   })

            for (let item of value.portales) {
                Object.assign(item, { value: { id: item.id, codigo: null } });
            }

            state.portales = value.portales;
        },
        UPDATE_PORTALE(state, value) {
            state.portalActivo = value;
        },
        SET_SUBPORTALES(state, value) {
            state.subportales = value;

        },
        SET_TOKEN_CIENCUADRA: (state, payload) => {
            localStorage.setItem("token_ciencuadra", payload);
        },
        SET_LOCALIDADES_CIENCUADRA: (state, payload) => {
            state.localidades_ciencuadra = payload
        },
        STATE_OVERLAY: (state, value) => {
            state.overlay = value;
        },
        SET_STATE: (state, value) => {
            for (let prop in value)
                if (value[prop])
                    state[prop] = value[prop];
        }
    },
    actions: {
        getTypeService(ctx) {
            return new Promise(resolve => {
                if (!ctx.state.type_service.length) {
                    axiosIns.get('api/auth/portales/type-services')
                        .then(res => {
                            ctx.commit('SET_STATE', res.data.data)
                            resolve(true)
                        }).catch(err => {
                            console.error(err);
                            resolve(false)
                        })
                } else {
                    resolve(true)
                }
            })
        },
        addPortales(ctx, data) {
            return new Promise(resolve => {
                axiosIns({
                    url: 'api/auth/portales',
                    method: 'post',
                    data
                }).then(res => {
                    resolve(true)
                }).catch(err => {
                    resolve(false)
                    console.error(err)
                })
            })
        },
        editarPortales(ctx, data) {
            return new Promise(resolve => {
                axiosIns({
                    url: 'api/auth/portales/edit',
                    method: 'post',
                    data
                }).then(res => {
                    resolve(true)
                }).catch(err => {
                    resolve(false)
                    console.error(err)
                })
            })
        },
        fetchPortales(ctx) {
            return new Promise((resolve, reject) => {
                if (ctx.state.portales.length == 0) {
                    axiosIns.get('api/auth/portales')
                        .then(res => {
                            ctx.commit("SET_PORTALES", res.data.data);
                            resolve(res.data.data.portales)
                        }).catch(error => {
                            console.error(error);
                            reject(error);
                        });
                } else {
                    resolve(true);
                }
            })
        },
        fetchSubPortales(ctx) {
            return new Promise((resolve, reject) => {
                axiosIns.get('api/auth/subportales')
                    .then(res => {
                        ctx.commit("SET_SUBPORTALES", res.data.data.subportales);
                        resolve(res.data.data.subportales)
                    }).catch(error => {
                        console.error(error);
                        reject(error);
                    });


            })
        },
        syncPortal(ctx, config) {
            return new Promise(resolve => {
                axiosIns(config)
                    .then(res => {
                        let data = res.data.data.inmueble;
                        resolve({ state: true, data });
                    }).catch(err => {
                        console.error(err)
                        resolve({ state: false });
                    })
            });
        },
        /*========================================*/
        getTokensPortales(ctx, { portal, api }) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/portales/${api}/${portal}`)
                    .then((response) => {
                        resolve(response.data.data.credential)
                    })
                    .catch(error => reject(error))
            })
        },
        addTokensPortalesUser(ctx, { portal, api }) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/${api}`, portal)
                    .then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                        console.error(err);
                    })
            })
        },
        /*========================================*/
        /* === Start FincaRaiz === */
        syncUpFincaRaiz(ctx, { portal, inmueble }) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/portales/fincarraiz/${inmueble.id}`)
                    .then((response) => {
                        resolve(response);
                    }).catch(error => { reject(error) });
            })
        },
        unsyncUpFincaRaiz(ctx, { inmueble }) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/fincarraiz/despublicar/${inmueble.id}`)
                    .then((response) => {
                        resolve(response.data)
                    }).catch(error => { reject(error) });
            })
        },
        statusFincaRaiz(ctx, { inmueble }) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`api/auth/portales/fincarraiz-status/${inmueble.id}`)
                    .then((response) => {
                        resolve(response)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },
        /* === End FincaRaiz === */

        /* === Start Pais === */
        syncUpPais(ctx, { inmueble }) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/service/pais/sincronizar/${inmueble.id}`)
                    .then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },
        updatePais(ctx, { inmueble }) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/service/pais/update/${inmueble.id}`)
                    .then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },
        unsyncUpPais(ctx, { inmueble }) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/service/pais/desactivar/${inmueble.id}`)
                    .then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },
        /* === End Pais === */

        /* === Start MetroCuadrado === */
        syncUpMetroCuadrado(ctx, { inmueble }) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/service/metro_cuadrado/${inmueble.id}`)
                    .then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },

        updateMetroCuadrado(ctx, { inmueble }) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/service/metro_cuadrado/update/${inmueble.id}`)
                    .then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },

        unsyncUpMetroCuadrado(ctx, { inmueble }) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/service/metro_cuadrado/despublicar/${inmueble.id}`)
                    .then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },
        /* === End MetroCuadrado === */

        /* === Start Ciencuadras === */
        syncUpCiencuadra(ctx, { inmueble, localidad }) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/service/cienciuadra`, { inmueble: inmueble.id, localidad })
                    .then((response) => {
                        resolve(response.data.data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },

        updateCiencuadra(ctx, { inmueble, localidad }) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/service/cienciuadra/update`, inmueble.id)
                    .then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },

        unsyncUpCiencuadra(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/service/cienciuadra/desactivar/${inmueble.id}`)
                    .then((response) => {
                        resolve(response.data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },
        getLocalidadesCiencuadra(ctx, city) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`api/auth/ciencuadra/import/localidades/${city}`)
                    .then((response) => {
                        const { localidades } = response.data.data;
                        let result = {};
                        for (let item of localidades) {
                            Object.assign(result, {
                                [item.codigo]: item.nombre
                            })
                        }
                        ctx.commit("SET_LOCALIDADES_CIENCUADRA", result);
                        resolve(response.data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        },
        statusCiencuadras(ctx, { token, idRequest, inmueble }) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`api/auth/service/status`, { token, idRequest, inmueble }).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        /* === End Ciencuadras === */

        getCredentialesPortales(ctx, portal) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/portales/credential/${portal.portal}`)
                    .then((response) => {
                        resolve(response.data.data.credential)
                    })
                    .catch(error => reject(error))
            })
        },

        getCredencialesClasificadosPais(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/portales/credenciales_clasificados_pais/${data.portal}`).then((response) => {
                    resolve(response.data.data.credential)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        getCredencialesMetroCuadrado(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/portales/credenciales_metro_cuadrado/${data.portal}`).then((response) => {
                    resolve(response.data.data.credential)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        getCredencialesCienCuadra(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/portales/credenciales_ciencuadra/${data.portal}`).then((response) => {
                    resolve(response.data.data.credential)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addCountryPortal(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/contries_portal`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addCitiesPortal(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/cities_portal`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addStatePortal(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/states_portal`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addCaracteristicasInternas(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/caracteristicas_internas_portal`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addCaracteristicasExternas(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/caracteristicas_externas_portal`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addCredencialesPortalesUser(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/credenciales_portal`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },


        addCredencialesClasificadosPais(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/credenciales_regster_portal_clasificados_portal`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addCredencialesMetroCuadrado(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/credenciales_regster_portal_metro_cuadrado`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addCredencialesCiencuadra(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/credenciales_regster_portal_ciencuadra`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },


        getCredencialesPortalesUser(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/credenciales_get_portal`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },



        addTipoNegocioPortales(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/tipo_negocio_portal`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addEstadoFisicoPortales(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/estado_fisico_portal`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addTipoInmueblePortal(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/tipo_inmueble_portal`, data).then((response) => {
                    resolve(response.data.data)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        addZonaPortales(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/zonas_portales`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        addBarrioPortales(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.post(`/api/auth/portales/barrios_portales`, data).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        getTokenCiencuadra(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/portales_credentials_ciencuadra`, data).then((response) => {
                    ctx.commit("SET_TOKEN_CIENCUADRA", response.data.data.portales);
                    resolve(response.data.data.portales)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        getCodigoResponsePortal(ctx, data) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`/api/auth/portales_codigo_response`, data).then((response) => {
                    resolve(response.data.data.codigo_response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
    },
}
