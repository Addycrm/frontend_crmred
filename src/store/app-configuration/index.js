import {axiosIns} from '@/libs/axios'
import {ROLES_VISITANTE } from "@/libs/config/config.js";
import Swal from 'sweetalert2'

export default {
  namespaced: true,

  state: {
    window: window.innerWidth,
    overlay: false,
    options: {},
    tags: {
      etiquetas: [],
      stcita: [],
      tcita: [],
    },
    empresas: [],
    configuracion: {},
    dominio: null,
    url: null,
    empresa: JSON.parse(localStorage.getItem('empresa'))
  },
  mutations: {
    WINDOW_RESIZE: (state, value) => {
      state.window = value;
    },
    STATE_OVERLAY: (state, value) => {
      state.overlay = value;
    },
    SET_OPTIONS: (state, value) => {
      state.options = value
    },
    UPDATE_FEATURES:(state, value)=>{
      let index=state.options[value.path].findIndex((item)=>{
        return item.id === value.data.id
      })
      Object.assign(state.options[value.path][index],value.data)
    },
    SET_TAG: (state, value) => {
      state.tags.etiquetas.push(value)
    },

    SET_TAGS: (state, value) => {
      for(let prop in state.tags){
        state.tags[prop] = value[prop];
      }
    },
    SET_EMPRESAS(state, val) {
      state.empresas = val;
    },
    SET_CONFIGURATION(state, value) {
      state.configuracion = value
    },
    SET_DOMINIO(state, val) {
      state.dominio = val
    },
    SET_URL(state, dominio) {
      
      state.url = `https://www.${dominio}/`
    }
  },

  actions: {
    getEmpresa(ctx, agente) {
      return new Promise(resolve => {
        let user = localStorage.userData;
        if(user){
          user = JSON.parse(user);
          if(user.role.slug !== ROLES_VISITANTE && Object.keys(ctx.state.configuracion).length == 0){
            axiosIns.get("api/auth/agente/empresa")
            .then(res => {
              let {empresa, dominio} = res.data.data;
              if(empresa){
                ctx.commit("SET_URL", `${empresa.slug}.${dominio}`);
                ctx.commit("SET_DOMINIO", `${empresa.slug}.${dominio}`);
                ctx.commit("SET_CONFIGURATION", empresa);
              }
              resolve(true);
            }).catch(err => {
              console.error(err);
              resolve(false);
            });
          }else{
            resolve(true);
          }
        }else{
          resolve(false);
        }
      });
    },
    getOptionsSelect(ctx){
      return new Promise (resolve => {
        axiosIns({
          url: 'api/external/helpers',
          method: 'get'
        }).then(res => {
          ctx.commit('SET_OPTIONS', res.data.data);
          resolve(true);
        }).catch(err => {
          let {status} = err.response;
          if(status == 500){
            Swal.fire({
              title: "Algo salio mal!",
              text: 'Ocurrio un error inesperado actualiza el navegador. Si el problema persiste comunicate con soporte.',
              icon: "error",
              confirmButtonText: 'Actualizar',
              customClass: {
                confirmButton: "btn btn-danger",
              },
              buttonsStyling: false,
            }).then(res => {
              if(res.isConfirmed)
                location.reload();
            });
          }
          console.error(err);
          resolve(false)
        });
      })
    },
    getEmpresas(ctx) {
      return new Promise(resolve => {
        axiosIns.get("api/auth/agente/empresas")
        .then(res => {
          ctx.commit("SET_EMPRESAS", res.data.data.empresas);
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      });
    },
    getTaskTag(ctx){
      return new Promise (resolve => {
        if(ctx.state.tags.etiquetas.length == 0){
          axiosIns({
            url: 'api/external/helpers-agent-task',
            method: 'get'
          }).then(res => {
            let data = res.data.data;
            ctx.commit('SET_TAGS', data);
            resolve(data);
          }).catch(error => console.error(error));
        }else{
          resolve();
        }
      })
    },
    addEmpresa(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("api/auth/agente/empresas", data)
        .then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },

    updateEmpresa(data) {
      return new Promise((resolve, reject) => {
        axiosIns.put(`api/auth/agente/empresas/${data.id}`, data)
        .then((response) => {
          ctx.commit("SET_CONFIGURATION", response.data.data.empresa);
          resolve(response.data.data.empresa);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

/*===============*/
    

    getDominio(ctx, agente) {
      return new Promise((resolve, reject) => {
        if(!ctx.state.url){
          axiosIns.get(`api/auth/agente/empresa`)
          .then((response) => {
            const { dominio } = response.data.data
            ctx.commit("SET_DOMINIO", dominio);
            ctx.commit("SET_URL", dominio);
            resolve(dominio);
          })
          .catch((error) => {
            reject(error);
          });
        }
      });
    },


    getEmpresasForId(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("api/auth/agente/empresas")
        .then((response) => {
          ctx.commit("SET_EMPRESAS", response.data.data.empresas);
          resolve(response.data.data.empresas);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    addEmpresasEmails(agente) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`api/auth/agente/empresas/emails/${agente}`)
        .then((response) => {
          resolve(response.data.data.emails);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    getEmpresasEmails(agente) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`api/auth/agente/empresas/emails${agente}`)
        .then((response) => {
          resolve(response.data.data.emails);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    addEmpresasNumbers(agente) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`api/auth/agente/empresas/numbers/${agente}`)
        .then((response) => {
          resolve(response.data.data.number);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    getEmpresasNumbers(agente) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`api/auth/agente/empresas/numbers/${agente}`)
        .then((response) => {
          resolve(response.data.data.number);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    addEmpresasRedes(agente) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`api/auth/agente/empresas/redes/${agente}`)
        .then((response) => {
          resolve(response.data.data.redes);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    getEmpresasRedes(agente) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`api/auth/agente/empresas/redes/${agente}`)
        .then((response) => {
          resolve(response.data.data.redes);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
  },
};
