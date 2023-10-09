import {axiosIns} from '@/libs/axios'
export default {
  namespaced: true,
  state: {
    userData: localStorage.userData ? JSON.parse(localStorage.userData) : null,
  },
  getters: {},
  mutations: {
    UPDATE_USER_DATA(state, value){
      let userData;
      if(localStorage.userData){
        userData = JSON.parse(localStorage.userData) 
        Object.assign(userData, value)
      }else{
        userData = value;
      }

      localStorage.userData = JSON.stringify(userData);
      state.userData = value;
    },
    UPDATE_USER(state, val) {
      state.user = val
    },
    DELETE(state, value) {
      if(!localStorage.userData)
        state.userData = null;
    },
  },
  actions: {
    updatePerfilAgente(ctx, data) {
      return new Promise(resolve => {
        axiosIns({
          url: 'api/auth/perfiles/updperfilagente',
          method: 'post',
          data
        }).then(res => {

          ctx.commit("UPDATE_USER_DATA", res.data.data.user);
          resolve(true);
        }).catch(err => {
          console.error(err)
          resolve(false);
        })
      })
    },
  },
}
