import {axiosIns} from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    contact: [],
    interested: [],
  },
  getters: {},
  mutations: {
    SET_STATE(state, value){
      for(let prop in value)
        state[prop] = value[prop];
    },
    SET_CONTACT: (state, value) => {
      state.contact = value;
    },
    SET_CONTACT_INTERESTED(state, value) {
      state.interested = value;
    }
  },
  actions: {
    getContacts(ctx, {url}) {
      return new Promise(resolve => {
        axiosIns({
          method: 'get',
          url,
        }).then(res => {
          ctx.commit("SET_STATE", res.data.data);
          resolve(true)
        }).catch(err => {
          console.error(err);
          resolve(false);
        })
      })
    },
    getContact(ctx, url) {
      return new Promise(resolve => {
        axiosIns({
          url: 'api/auth/cliente_contact',
          method: 'get',
        }).then(res => {
          let {contact} = res.data.data;
          ctx.commit("SET_CONTACT", contact);
          resolve(true)
        })
        .catch(error => reject(error))
      })
    },

    fetchInterested(ctx,{params}) {
      return new Promise((resolve, reject) => {
        axiosIns({
          url:'/api/auth/cliente_interested',
          method:'get',
          params
        })
        .then((response) => {
          const INTERESTED = response.data.data;
          ctx.commit("SET_CONTACT_INTERESTED", INTERESTED);
          resolve(INTERESTED)
        })
        .catch(error => reject(error))
      })
    }

  },


}
