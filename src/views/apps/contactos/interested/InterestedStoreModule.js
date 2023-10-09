import {axiosIns} from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    data: {
        data: [],
        first_page_url: 0,
        from: 0,
        last_page: 0,
        last_page_url: '',
        current_page: 0,
        next_page_url: '',
        path: '',
        per_page: 0,
        prev_page_url: '',
        to: 0,
        total: 0
    },

  },
  getters: {},

  mutations: {
    SET_CONTACT_INTERESTED(state, value){
      for(let prop in value)
        state.data[prop] = value[prop];
    },

  },
  actions: {

    fetchInterested(ctx, page) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`${page}`)
        .then((response) => {
          let interested = response.data;
          ctx.commit("SET_CONTACT_INTERESTED", interested.data);
          resolve(interested.message)
        })
        .catch(error => reject(error))
      })
    },

    searchInterested(ctx, data) {
        return new Promise((resolve, reject) => {
          axiosIns.post(`${data.url}`, data.data)
          .then((response) => {
            let interested = response.data;
            ctx.commit("SET_CONTACT_INTERESTED", interested.data);
            resolve(interested.message)
          })
          .catch(error => reject(error))
        })
      }


  },


}
