import store from "@/store"
// import appDashboard from './DashboardStoreModule'
export default {
	setup(){
    /*const dispatch = "appDashboard";
    if (!store.hasModule(dispatch))
      store.registerModule(dispatch, appDashboard);*/
  },
  data(){
    this.api.push({
      api: 'appCalendario/getEventos',
      data: {}
    },{
      api: 'appConfiguracion/getTaskTag',
      data: {}
    });
  },
}