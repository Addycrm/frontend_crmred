import {axiosIns} from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    roles: [],
    permissions: [],
    actions: [],
    modules: [],

    role_users: [],
    role_users_all: []
  },
  getters: {},
  mutations: {
    SET_ROLES_USER(state, value) {
      state.role_users = value
    },
    SET_ROLES_USER_ALL(state, payload) {
      state.role_users_all = payload
    },

    SET_ROLES(state, value) {
      state.roles = value
    },
    SET_PERMISSIONS(state, value) {
      state.permissions = value
    },
    SET_ACTIONS(state, value) {
      state.actions = value
    },

    SET_MODULOS(state, value) {
      state.modules = value
    },

    SET_STATE(state, value){
      for(let prop in value)
        state[prop] = value[prop];
    },
    ADD_STATE(state, {prop, value}) {
      state[prop].unshift(value);
    },
    UPDATE_STATE(state, {prop, value}) {
      for(let item of state[prop]){
        if(item.id == value.id)
          Object.assign(item, value);
      }
    },
  },
  actions:{
    getRolesForUser(ctx) {
      return new Promise(resolve => {
        if(ctx.state.role_users.length == 0){
          axiosIns.get('api/auth/roles-users')
          .then(res => {
            ctx.commit("SET_ROLES_USER", res.data.data.roles)
            resolve(true);
          }).catch(err => {
            console.error(err);
            resolve(false);
          })
        }else{
          resolve(true);
        }
      })
    },
    getRoles(ctx) {
      return new Promise(resolve => {
        if(ctx.state.roles.length == 0){
          axiosIns.get('api/auth/roles')
          .then(res => {
            ctx.commit('SET_ROLES', res.data.data.roles)
            resolve(true);
          }).catch(err => {
            console.error(err);
            resolve(false);
          });
        }else{
          resolve(true);
        }
        
      })
    },
    sendPermissions(ctx, data){
      return new Promise(resolve => {
        /*{
          "titulo": "Jefe",
          "descripcion": "<p>prueba</p>"
        }*/
        axiosIns({
          url: 'api/auth/roles',
          method: 'post',
          data
        }).then(res => {
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      })
    },
    getModules(ctx) {
      return new Promise(resolve => {
        axiosIns.get('api/auth/permission')
        .then(res => {
          ctx.commit('SET_MODULOS', res.data.data.permissions)
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      })
    },
    // edita modulos
    sendModules(ctx, data){
      return new Promise(resolve => {
        /*{
          "id": 27,
          "subject": "developer",
          "title": "Developer"
        }*/
        axiosIns({
          url: 'api/auth/permissions-module',
          method: 'post',
          data
        }).then(res => {
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      })
    },
    getActions(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get('api/auth/actions')
        .then(res => {
          ctx.commit('SET_ACTIONS', res.data.data.actions)
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      })
    },
    // edita action
    sendAction(ctx, data){
      return new Promise(resolve => {
        /*{
          "id": 7,
          "action": "assignee",
          "title": "Asignar agente"
        }*/
        axiosIns({
          url: 'api/auth/actions-modules',
          method: 'post',
          data
        }).then(res => {
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      })
    },
    getPermissionsActions(ctx) {
      return new Promise(resolve => {
        if(ctx.state.permissions.length == 0){
          axiosIns.get('api/auth/permissions-actions')
          .then(res => {
            ctx.commit('SET_PERMISSIONS', res.data.data.permissions)
            resolve(true);
          }).catch(err => {
            console.error(err);
            resolve(false);
          });
        }else{
          resolve(true);
        }
      })
    },

/*==================================================*/
    getActionsPermissions(ctx, id){
      return new Promise(resolve =>{
        axiosIns.get(`api/auth/permission/role-permission/${id}`)
        .then(res => {
          // resolve(response.data.data.permissions)
          resolve(true);
        }).catch(err => {
          console.error(err);
        })
      })
    },


    getRolesForUserAll(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`api/auth/roles-users-all`)
        .then(response => {
          ctx.commit("SET_ROLES_USER_ALL", response.data.data.roles)
          resolve(response.data.data.roles)
        })
        .catch(error => reject(error))
      })
    },



  /*  getModules(ctx, id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`api/auth/permission/${id}`)
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => reject(error))
      })
    },*/

    

    addPermissions(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`api/auth/permissions-module`, data)
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => reject(error))
      })
    },



    

    getActionsForId(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`api/auth/actions/${data.id}`)
        .then(response => {
          resolve(response.data.data.actions_id)
        })
        .catch(error => reject(error))
      })

    },
    addActions(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`api/auth/actions-modules`, data)
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => reject(error))
      })

    },


    addPermissionAction(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`api/auth/actions`, data)
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => reject(error))
      })
    },

    addPermissionsForId(cxt, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`api/auth/permission`, data)
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => reject(error))
      })
    },


    getPermissionsForRoleId(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`api/auth/permission/role/${data.role}`)
        .then(response => {
          resolve(response.data.data.permissions)
        })
        .catch(error => reject(error))
      })
    },

    getPermissionsActionsForRoleId(ctx, data){
      return new Promise((resolve, reject) =>{
        axiosIns.get(`api/auth/permission/role-permission/${data.role}`)
        .then(response => {
          resolve(response.data.data.permissions)
        })
        .catch(error => reject(error))
      })
    },

    getPermissionActiveRole(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`api/auth/permissions-active-actions`, data)
        .then(response => {
          resolve(response.data.data.active_permissions)
        })
        .catch(error => reject(error))
      })
    },



    addActivePermissionsActions(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`api/auth/permission/permissions-active-role`, data)
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => reject(error))
      })
    },


    getPermissionRole(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`api/auth/roles/permission/${data.roles}`)
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => reject(error))
      })
    },

    addPermissionRole(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`api/auth/roles/permission/`, data)
        .then(response => {
          resolve()
        })
        .catch(error => reject(error))
      })
    },

    edictRoles(ctx, roles) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/roles', roles.roles)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    addRoles(ctx, roles) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/roles', roles.roles)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
  },
}
