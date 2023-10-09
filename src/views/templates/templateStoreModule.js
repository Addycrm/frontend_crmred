import {axiosIns} from '@/libs/axios'
export default {
  namespaced: true,
  state: {
    templates: {
      items: [],
      option: null 
    },
    banners: [],
    blogs: [],
    credenciales: [],
    perfiles: {
      items: [],
      option: null 
    },
    perfil: [],
  },
  getters: {},
  mutations: {
    SET_TEMPLATES: (state, value) => {
      Object.assign(state.templates,{
        items: value
      });
      for(let item of value){
        if(item.selected === 1)
          Object.assign(state.templates,{
            option: item.id
          });
      }
    },
    SET_BANNERS: (state, banners) => {
      banners.sort((x, y) => {
        return x['posicion'] > y['posicion'] ? 1 : x['posicion'] < y['posicion'] ? -1 : 0;
      });
      state.banners = banners;
    },
    SET_BLOGS: (state, blogs) => {
      state.blogs = blogs;
    },
    SET_PERFILES: (state, value) => {
      Object.assign(state.perfiles,{
        items: value
      });
      for(let item of value){
        if(item.selected === 1)
          Object.assign(state.perfiles,{
            option: item.id
          });
      }
    },
    SET_PERFIL: (state, payload) => {
      state.perfil = payload;
    },
    SET_CREDENCIALES: (state, payload) => {
      state.credenciales = payload;
    },
  },

  actions: {
    gettemplates(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/template/list', {})
        .then(response => {
          const { templates } = response.data.data;
          ctx.commit('SET_TEMPLATES', templates);
          resolve(templates);
        })
        .catch(error => reject(error))
      })
    },
    settemplates(ctx, id) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/template/settemplate/' + id)
        .then(response => {
          const { templates } = response.data.data;
          ctx.commit('SET_TEMPLATES', templates)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getBanners(ctx, queryParams) {

      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/banners/list', {})
        .then(response => {
          const { banners } = response.data.data;
          ctx.commit('SET_BANNERS', banners);
          resolve(banners);
        })
        .catch(error => reject(error))
      })
    },
    fetchBanner(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },


    addBanners(ctx, banners) {
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/banners/store', banners)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    delBanners(ctx, banners) {
      
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/banners/del', banners)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    updBanners(ctx, banners) {
      
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/banners/upd', banners)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getBanner(ctx, banners) {
      
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/banners/get', banners)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    /** Rutas de blogs  */

    getBlogs(ctx, queryParams) {

      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/blogs/list', {})
        .then(response => {
          const { blogs } = response.data.data;
          ctx.commit('SET_BLOGS', blogs);
          resolve(blogs);
        })
        .catch(error => reject(error))
      })
    },



    addblog(ctx, blog) {
      
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/blogs/store', blog)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    delBlog(ctx, blog) {
      
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/blogs/del', blog)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    updblog(ctx, blog) {
      
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/blogs/upd', blog)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getblog(ctx, blogs) {
      
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/blogs/get', blogs)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    addtemplate(ctx, template) {
      
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/template/store', template)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    deltemplate(ctx, template) {

      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/template/del', template)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    updtemplate(ctx, template) {

      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/template/upd', template)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    gettemplate(ctx, template) {

      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/template/get', template)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    getPerfilAgente(ctx, queryParams) {

      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/perfiles/getperfilagente', {})
        .then(response => {
          ctx.commit('SET_PERFIL', response.data)
          resolve(response.data)
        })
        .catch(error => reject(error))
      })
    },

    updperfilagente(ctx, formdata) {
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/perfiles/updperfilagente', formdata)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },


    getperfiles(ctx, queryParams) {

      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/perfiles/list', {})
        .then(response => {
          const { perfiles } = response.data.data;
          ctx.commit('SET_PERFILES', perfiles)
          resolve(perfiles)
        })
        .catch(error => reject(error))
      })
    },

    setperfiles(ctx, id) {

      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/perfiles/setperfiles/' + id)
        .then(response => {
          const { perfiles } = response.data.data;
          ctx.commit('SET_PERFILES', perfiles)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },



    addperfiles(ctx, perfiles) {
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/perfiles/store', perfiles)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    delPerfiles(ctx, perfiles) {

      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/perfiles/del', perfiles)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    updperfiles(ctx, perfiles) {

      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/perfiles/upd', perfiles)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    getPerfil(ctx, code) {
      return new Promise((resolve, reject) => {
        axiosIns.get('api/auth/perfiles/get/' + code)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    updcredenciales(ctx, credenciales) {
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/credenciales/store', credenciales)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getcredenciales(ctx, credenciales) {
      return new Promise((resolve, reject) => {
        axiosIns.post('api/auth/credenciales/get', credenciales)
        .then(response => {
          ctx.commit('SET_CREDENCIALES', response.data)

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
  },
}
