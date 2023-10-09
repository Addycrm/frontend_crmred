import {axiosIns} from '@/libs/axios';

export default {
  namespaced: true,
  actions: {
    getUserdata(ctx ) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/userdata")
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
      });
    },
  },
};
