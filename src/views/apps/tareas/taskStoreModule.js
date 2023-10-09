import {axiosIns} from '@/libs/axios';
import store from '@/store'
let userData;
if(localStorage.userData)
  userData = JSON.parse(localStorage.userData);

export default {
  namespaced: true,
  state: {
    tareas: [],
    escritorio: [],
    tareas_result: [],
    etiquetas: [],
    etiquetas_local: [],
  },
  mutations: {
    SET_ESCRITORIO: (state, value) => {
      let result = value.filter(item => new Date() < new Date(item.dueDate) && (!item.isCompleted || !item.isDeleted));
      state.escritorio = result.slice(0, 3);
    },
    SET_TAREAS: (state, value) => {
      value.sort((x, y) => x['dueDate'] > y['dueDate'] ? 1 : x['dueDate'] < y['dueDate'] ? -1 : 0);
      state.tareas = value;
    },
    SET_TAREAS_RESULT: (state, value) => {
      value.sort((a, b) => a['created_at'] < b['created_at'] ? 1 : a['created_at'] > b['created_at'] ? -1 : 0);
      state.tareas_result = value;
    },
    ADD_TAREA: (state, value) => {
      state.tareas.unshift(value);
    },
    UPDATE_TAREA: (state, value) => {
      for(let item of state.tareas)
        if(item.id == value.id)
          Object.assign(item, value, {overlay:false});
    },
    REMOVE_TAREA: (state, {id, isDeleted}) => {
      for(let item of state.tareas)
        if(item.id == id)
          Object.assign(item, {isDeleted});
    },
  },
  actions: {
    getTask(ctx) {
      let commit = ['SET_TAREAS', 'SET_ESCRITORIO'];
      return new Promise(resolve => {
        if(!ctx.state.tareas.length){
          axiosIns.get("api/auth/task")
          .then(res => {

            let data = res.data.data.map(item => {
              item.overlay = false;
              return item;
            });

            for(let item of commit)
              ctx.commit(item, data);

            resolve(data)
          }).catch( error => {
            console.error(error)
            resolve(false);
          });
        }else{
          resolve(true);
        }
      })
    },    
    createTask(ctx, data) {
      return new Promise(resolve => {
        axiosIns({
          url: 'api/auth/task',
          method: 'post',
          data
        }).then(res => {
          ctx.commit("ADD_TAREA", res.data.data);
          resolve(true);
        }).catch(err => {
          console.error(err);
          resolve(false);
        });
      });
    },
    updateTask(ctx, task) {
      return new Promise(resolve => {
        axiosIns.put(`/api/auth/task/${task.id}`, task)
        .then(res => {
          ctx.commit("UPDATE_TAREA", res.data.data);
          resolve(true);
        }).catch(err => {
          console.error(err);
          Object.assign(task, {overlay: false, [prop]: !state});
          resolve(false);
        });
      });
    },
    removeTask(ctx, task) {
      let {id} = task;
      return new Promise(resolve => {
        axiosIns.delete(`/api/auth/task/${id}`)
        .then(res => {
          let {isDeleted} = res.data.data;
          ctx.commit("REMOVE_TAREA", {id, isDeleted});
          resolve(true);
        }).catch(err => {
          console.error(err);
          Object.assign(task, {overlay: false});
          resolve(false);
        });
      });
    },

    fetchEtiquetas(ctx) {
      return new Promise((resolve, reject) => {
        if(ctx.state.etiquetas.length == 0){
          axiosIns.get('/api/auth/etiquetas')
          .then(response => {
            let {etiquetas} = response.data.data
            ctx.commit("SET_ETIQUETAS", etiquetas);
            resolve(etiquetas);
          }).catch(error => console.error(error));

        }
      });
    },

    addEtiquetasRegister(ctx, data) {
      return new Promise((resolve, reject) => {
        axiosIns.post(`/api/auth/etiquetas`, data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => reject(error));
      });
    },

    getEtiquetas(ctx) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/api/auth/task/etiquetas/${userData.id}`)
        .then((response) => {
          ctx.commit("SET_ETIQUETAS", response.data.data);
          resolve(response.data.data)
        })
        .catch((error) => reject(error));
      });
    },

    addEtiquetas(ctx, etiquetas) {
      etiquetas.user_id = userData.id
      return new Promise((resolve, reject) => {
        axiosIns.post(`/api/auth/task/etiquetas`, etiquetas)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
      });
    },
    
  },
};
