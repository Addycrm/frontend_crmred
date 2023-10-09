import {axiosIns} from '@/libs/axios'
export default {
  namespaced: true,
  state: {
    informes:[]
  },
  mutations: {

  },
  actions: {
    sendEmail(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/report/agents-properties', data)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
}