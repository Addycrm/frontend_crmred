import { axiosIns } from '@/libs/axios';
import store from '@/store'
let userData;
if (localStorage.userData)
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
  getters: {},
  mutations: {
    SET_ESCRITORIO: (state, value) => {
      let result = value.filter(item => new Date() < new Date(item.dueDate) && (!item.isCompleted || !item.isDeleted));
      state.escritorio = result.slice(0, 3);
    },
    SET_TAREAS: (state, value) => {
      value.sort((x, y) => {
        return x['dueDate'] > y['dueDate'] ? 1 : x['dueDate'] < y['dueDate'] ? -1 : 0;
      });
      state.tareas = value;
    },
    SET_TAREAS_RESULT: (state, value) => {
      value.sort((a, b) => {
        return a['created_at'] < b['created_at'] ? 1 : a['created_at'] > b['created_at'] ? -1 : 0;
      });
      state.tareas_result = value;
    },
    PUSH_TAREA: (state, value) => {
      state.tareas.unshift(value);
    },
    SET_ETIQUETAS: (state, payload) => {
      state.etiquetas = payload;
    },

    SET_ETIQUETAS_LOCAL: (state, payload) => {
      state.etiquetas_local = payload;
    }

  },
  actions: {
    fetchTasks(ctx, payload) {
      return new Promise((resolve, reject) => {
        axiosIns.get("/api/auth/task", { params: payload })
          .then((response) => {
            let value = response.data.data;
            ctx.commit("SET_TAREAS", value);
            ctx.commit("SET_ESCRITORIO", value);

            resolve(response.data.data);
          }).catch((error) => reject(error));
      });
    },

    getTareas(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.state.tareas.length == 0) {
          // store.commit('appConfiguracion/STATE_OVERLAY', true);
          axiosIns.get("/api/auth/task")
            .then(res => {
              let data = res.data.data.map(item => {
                item.overlay = false;
                return item;
              });
              ctx.commit("SET_TAREAS", data);
              ctx.commit("SET_ESCRITORIO", data);
              store.commit('appConfiguracion/STATE_OVERLAY', false);
              resolve(data)
            }).catch(error => console.error(error));
        } else {
          resolve();
        }
      })
    },

    addTask(ctx, taskData) {
      return new Promise((resolve, reject) => {
        axiosIns.post("/api/auth/task", taskData)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },

    fetchEtiquetas(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.state.etiquetas.length == 0) {
          axiosIns.get('/api/auth/etiquetas')
            .then(response => {
              let { etiquetas } = response.data.data
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
            resolve(response.data.data)
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
    updateTask(ctx, { task }) {
      return new Promise((resolve, reject) => {
        axiosIns.put(`/api/auth/task/${task.id}`, task)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    removeTask(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axiosIns.delete(`/api/auth/task/${id}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
};
