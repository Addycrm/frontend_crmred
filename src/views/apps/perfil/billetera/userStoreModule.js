import {axiosIns} from '@/libs/axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/apps/user/users', { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchUser(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/apps/user/users/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/apps/user/users', { user: userData })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
  },
}
