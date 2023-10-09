import {axiosIns} from '@/libs/axios'
export default {
  namespaced: true,
  state: {
    perfiles: {
      items: [],
      option: null 
    },
  },
  mutations: {
    SET_PERFILES: (state, value) => {
      for(let item of value)
        if(item.selected)
          state.perfiles.option = item.id
            
      state.perfiles.items = value;
    }
  },
  actions: {
    getPerfiles(ctx) {
      return new Promise(resolve => {
        if(!ctx.state.perfiles.items.length){
          axiosIns({
            url: 'api/auth/perfiles/list',
            method: 'get'
          }).then(res => {
            let {perfiles} = res.data.data;
            ctx.commit('SET_PERFILES', perfiles)
            resolve(true);
          }).catch(err => {
            console.error(err);
            resolve(false);
          })
        }else{
            resolve(true);
        }
      });
    },
    setPerfiles(ctx, id) {
      return new Promise(resolve => {
        axiosIns({
          url: `api/auth/perfiles/setperfiles/${id}`,
          method: 'post'
        }).then(res => {
          let {perfiles} = res.data.data;
          ctx.commit('SET_PERFILES', perfiles)
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        })
      })
    },
  }
}
