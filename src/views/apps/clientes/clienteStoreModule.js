import { axiosIns } from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    tabla: {
      data: [],
      total: 1
    },
    tablesEmbudo:null,
    tableStateEmbudo:null,
    copytableStateEmbudo:null,
    contact_portal: {
      data: [],
      total: 1
    },
    propietarios: [],
    optionsEmbudoForm:null,
    OptionsEstadoByID:null
  },
  getters: {},
  mutations: {
    SET_CLIENTES: (state, value) => {
      for (let prop in value.clientes)
        Object.assign(state.tabla, { [prop]: value.clientes[prop] });
    },
    SET_PROPIETARIOS: (state, value) => {
      state.propietarios = value.filter(item => item.inmuebles);
    },
    UPDATE_CLIENTE: (state, value) => {
      for (let item of state.tabla.data)
        if (item.id == value.id)
          Object.assign(item, value);

    },
    SET_CONTACT_PORTAL: (state, value) => {
      for (let prop in value)
        Object.assign(state.contact_portal, { [prop]: value[prop] });
    },
    ADD_CLIENTE: (state, value) => {
      state.tabla.data.unshift(value);
    }
  },
  actions: {
    async getStatesEmbudo(ctx,data){
      try{
        let res = await axiosIns({
          url:'api/auth/embudos-filter',
          method:'post',
          data
        })
        ctx.state.tablesEmbudo = res.data.data
        // ctx.state.tableStateEmbudo = res.data.data[0].embudo_states
        // console.log("res",res.data.data[0].embudo_states)
        // ctx.state.copytableStateEmbudo=ctx.state.tableStateEmbudo;
        return res.data.data

      }catch(err){

      }
    },
    async createTableEmbudo(ctx,data){

      return new Promise(async (resolve,reject)=>{
        try{
          let res = await axiosIns({
            url:'api/auth/embudos',
            method:'post',
            data
          })
          resolve(res.data)
        }catch(error){
          reject(error)
        }
      }
      
      )
    },
    async createColumnTableEmbudo(ctx,data){
      return new Promise( async(resolve,reject) =>{

          try{
            let res = await axiosIns({
              url:'api/auth/embudostate',
              method:'post',
              data
            })
            resolve(res)
          }catch(error){
            reject(error)
          }
      })
    },
    async deleteColumnTableEmbudo(ctx,id){
      return new Promise( async(resolve,reject) =>{
        try{
          let res = await axiosIns({
            url:`api/auth/embudostate/${id}`,
            method:'delete'
          })
          resolve(res)
        }catch(error){
          reject(error)
        }
      })
    },
    async getClientesForPipeline(ctx,data){
      return new Promise( async(resolve,reject) =>{
        try{
          let res = await axiosIns({
            url:'api/auth/embudo-clientes',
            method:'post',
            data
          })
          resolve(res)
        }catch(error){
          reject(error)
        }
      })
    },
    async getClienteById(ctx,id){
      return new Promise( async (resolve,reject)=>{
        try{
          let res = await axiosIns({
            method:'get',
            url:`api/auth/cliente/${id}`
          })
          resolve(res)
        }catch(error){
          reject(error)
        }
      })
    },
    async getOptionsEmbudo(ctx){
      return new Promise(async(resolve,reject)=>{
        try{
          let res = await axiosIns({
            method:'get',
            url:`api/auth/embudos-min`
          })
          resolve({state:true})
          ctx.state.optionsEmbudoForm = res.data.data
        }catch(error){
          reject(error)
        }
      })
    },
    async getOptionsEstadoByID(ctx,id){
      return new Promise(async(resolve,reject)=>{
        try{
          let res = await axiosIns({
            method:'get',
            url:`api/auth/embudos-state/${id}`
          })
          // ctx.state.OptionsEstadoByID=res.data.data
          resolve(res.data.data)
        }catch(error){
          reject(error)
        }
      })
    },
    async updateStatePipeline(ctx,data){

      return new Promise(async (resolve,reject)=>{
        try{
          await axiosIns({
            url:'api/auth/update-state-cliente',
            method:'post',
            data
          })
          resolve(true)
        }catch(error){
          resolve(false)
        }
      })
    },
    getClientes(ctx, { data, params }) {
      return new Promise(resolve => {
        axiosIns({
          url: 'api/auth/clientes/filter',
          method: 'post',
          params,
          data
        }).then(res => {
          ctx.commit("SET_CLIENTES", res.data.data);
          resolve(true);
        })
          .catch(err => {
            console.error(err)
            resolve(false);
          });
      });
    },
    getContactPortal(ctx, { data, params }) {
      return new Promise(resolve => {
        axiosIns({
          url: 'api/auth/subportales/contact',
          method: 'post',
          params,
          data
        }).then(res => {
          ctx.commit("SET_CONTACT_PORTAL", res.data.data.contact);
          resolve(true);
        })
          .catch(err => {
            console.error(err)
            resolve(false);
          });
      });
    },
    fetchClients(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/clientes', { params: { filter: data.filter } })
          .then((response) => {

            ctx.commit("SET_CLIENTES", response.data.data.clientes);
            resolve(response.data.data.clientes)
          })
          .catch(error => reject(error))
      })
    },

    fetchClientsPaginate(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/api/auth/clientes?page=' + data.page, { params: { filter: data.filter } })
          .then((response) => {
            ctx.commit("SET_CLIENTES", response.data.data.clientes);
            resolve(response.data.data.clientes)
          })
          .catch(error => reject(error))
      })
    },

    searchClientsPaginate(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/clientes-search', data)
          .then((response) => {
            ctx.commit("SET_CLIENTES", response.data.data.clientes);
            resolve(response.data.data.clientes)
          })
          .catch(error => reject(error))
      })
    },

    fetchClient(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/clientes/${id}`)
          .then((response) => {
            resolve(response.data.data.cliente)
          })
          .catch(error => reject(error))
      })
    },
    addClient(ctx, clienteData) {

      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/clientes', clienteData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    updateCliente(ctx, clienteData) {
      return new Promise((resolve, reject) => {
        axiosIns.put(`/api/auth/clientes/${clienteData.id}`, clienteData)
          .then((response) => {
            resolve(response.data)
          })
          .catch(error => reject(error))
      })
    },
    updateStar(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/api/auth/update-status-client', data)
          .then((response) => {
            resolve(response.data)
          })
          .catch(error => reject(error))
      })
    },
    filterCliente(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post("/api/auth/clientes/filter", data)
          .then((response) => {
            ctx.commit("SET_CLIENTES", response.data.data.clientes);
            resolve(response.data.data.clientes)
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    generoCliente() {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/generos")
          .then((response) => {
            resolve(response.data.data.generos);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    tipoCliente() {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/documento/tipo_cliente")
          .then((response) => {
            resolve(response.data.data.tipo_cliente);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    exportClientes() {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/clientes-export", { responseType: 'arraybuffer' })
          .then((response) => {
            let fileURL = window.URL.createObjectURL(new Blob([response.data]));
            let fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'clientes.xlsx');
            document.body.appendChild(fileLink);
            fileLink.click();
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      })
    },
    getPropietarios(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/api-inmueble/inmuebles-propietarios")
          .then((response) => {
            ctx.commit("SET_PROPIETARIOS", response.data.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      })
    }
  },
}
