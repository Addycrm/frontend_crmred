import {axiosIns} from '@/libs/axios';
export default {
  namespaced: true,
  state: {
    users: [],
    roles_users: [],
  },
  mutations: {
    SET_USERS(state, value) {
      state.users = value;
    },
    SET_ROLES(state, value) {
      state.roles_users = value;
    },
    ADD_USER(state, value){
      state.users.push(value);
    },
    UPDATE_USER(state, value){
      for(let user of state.users)
        if(user.id == value.id)
          Object.assign(user, value);
    }
  },
  actions: {
    addUser(ctx, data) {
      return new Promise(resolve => {
        axiosIns({
          url: 'api/auth/usuarios',
          method: 'post',
          data
        }).then(res => {
          let userdata = res.data.data.user;
          ctx.commit('ADD_USER', userdata);
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      });
    },
    updatedUser(ctx, data) {
      return new Promise(resolve => {
        axiosIns({
          url: `api/auth/usuarios/${data.id}`,
          method: 'put',
          data
        }).then(res => {
          ctx.commit('UPDATE_USER', res.data.data);
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      });
    },
    getRolesUsers(ctx) {
      return new Promise(resolve => {
        if(ctx.state.roles_users.length == 0){
          axiosIns.get('api/auth/roles-users-all')
          .then(res => {
            ctx.commit("SET_ROLES", res.data.data.roles);
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
    getUsers(ctx) {
      return new Promise((resolve, reject) => {
        if(ctx.state.users.length == 0){
          axiosIns.get('api/auth/usuarios')
          .then(res => {
            ctx.commit("SET_USERS", res.data.data.users);
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
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/usuarios', { params: queryParams })
        .then((response) => {
          ctx.commit("SET_USERS", response.data.data.users);

          resolve(response.data.data.users);
        })
        .catch((error) => reject(error));
      });
    },

    getUserSession(ctx, code) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/users/informacion/${code}`)
        .then((response) => {
          resolve(response.data.data.user);
        })
        .catch((error) => reject(error));
      });
    },

    fetchUser(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/apps/user/users/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
      });
    },
  },
};
