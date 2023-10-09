import store from "@/store"
import appTask from './taskStoreModule'
export default {
	setup(){
    const dispatch = "appTask";
    if (!store.hasModule(dispatch))
      store.registerModule(dispatch, appTask);
  },
  data(){
  	this.api.push({
      api: 'appTask/getTask',
      data: {}
    },{
      api: 'appConfiguracion/getTaskTag',
      data: {}
    })
  },
  computed: {
  	task() {
      return this.$store.state.appTask;
    },
  }
}