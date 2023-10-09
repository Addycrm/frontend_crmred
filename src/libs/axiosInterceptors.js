import store from "@/store";
export default (axiosIns, axiosToken) => {

  return new Promise((resolve, reject) => {

    axiosIns.interceptors.request
    .use(config => {
      const {accessToken} = localStorage;

      if(accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

      return config;
    }, error => {
      return Promise.reject(error);
    });

    axiosIns.interceptors.response
    .use(res => {
      return res;
    }, async err => {
      // console.error(err.response);
      let {config, status} = err.response;
      if(status === 401)
        reject(err);
      // if(err.response && status === 401){
      //   await axiosToken.post('api/refresh_token', {
      //     refresh_token: localStorage.refreshToken,
      //   }).then(res => {
      //     let {access_token, refresh_token, error} = res.data.data;
      //     if(!error && localStorage.accessToken){
      //       localStorage.setItem('accessToken', access_token,);
      //       localStorage.setItem('refreshToken', refresh_token);
      //       axiosIns(config)
      //       .then(res => {
      //         for(let commit of config.commit)
      //           store.commit(`${config.module}/${commit}`, res.data.data);
      //       });
      //     }else{
      //       reject(err);
      //     }
      //   }).catch(e => {
      //     reject(e);
      //   })
      // }
      return Promise.reject(err);
    });
  })
}
