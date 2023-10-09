export default {
  data(){
    this.api.push({
      api: 'appConfiguracion/getEmpresa',
      data: {},
    })
  },
	computed:{
		empresa(){
      return this.$store.state.appConfiguracion.configuracion;
    },
    emptyEmpresa(){
      return Object.keys(this.empresa).length === 0;
    },
    url(){
      return this.$store.state.appConfiguracion.url
    },
	},
}