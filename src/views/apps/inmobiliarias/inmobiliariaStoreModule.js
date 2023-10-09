import {axiosIns} from '@/libs/axios';
export default {
  namespaced: true,
  state: {
    users: [],
  },
  mutations: {
    SET_USERS: (state, value) => {
      state.users = value;
    },
    ADD_USER(state, value){
      state.users.push(value);
    },
  },
  actions: {
    addUser(ctx, data) {
      return new Promise(resolve => {
        axiosIns({
          url: 'api/auth/usuarios',
          method: 'post',
          data
        }).then(res => {
          let {userdata} = res.data.data.user;
          ctx.commit('ADD_USER', userdata);
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      });
    },
    getInmobiliaria(ctx, params) {
      return new Promise(resolve => {
        if(!ctx.state.users.length){
          axiosIns.get("api/auth/usuarios/admin-all", { params })
          .then(res => {
            ctx.commit("SET_USERS", res.data.data.users);
            resolve(true);
          }).catch(err => {
            console.error(err);
            resolve(false);
          });
        }else{
          resolve(true);
        }
      });
    }
  }
};
