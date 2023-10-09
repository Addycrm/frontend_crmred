import store from "@/store"
import appProfile from './profileStoreModule'
export default {
	setup(){
    const dispatch = "appProfile";
    if (!store.hasModule(dispatch))
      store.registerModule(dispatch, appProfile);
  },
  data(){
    this.api.push({
      api: 'appProfile/getPerfiles',
      data: {},
      end: () => {this.stateForm = true},
    })
  },
  computed: {
  	perfiles(){
      return this.$store.state.appProfile.perfiles;
    },
    imgBgP1() {
      return this.$store.state.appProfile.perfiles.items[0].perfiles_background;
    },
    imgBgP2() {
      return this.$store.state.appProfile.perfiles.items[1].perfiles_background;
    }
  }
}