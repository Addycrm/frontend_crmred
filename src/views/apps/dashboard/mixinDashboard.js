import store from "@/store"
import appDashboard from './DashboardStoreModule'
export default {
	setup(){
    const dispatch = "appDashboard";
    if (!store.hasModule(dispatch))
      store.registerModule(dispatch, appDashboard);
  },
  data(){
    this.api.push({
      api: 'appDashboard/getDashboard',
      data: {},
    })
  },
  computed: {
  	storeDashboard() {
      return this.$store.state.appDashboard

    },
  }
}