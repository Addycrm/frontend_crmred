export default {
  methods:{
    getInmuebles(a){
      this.apiGetInmuebles({
        before: ()=>{
          this.query.page = typeof a == 'number' ? a : 1;
        },
        api: 'appInmueble/getInmuebles',
        query: this.query,
        msg: 'appInmueble/getInmuebles',
      });
    },
    async apiGetInmuebles({before, api, query, msg}){
      if(before)
        before();

      this.overlay = true;

      await this.$store.dispatch(api, query)
      .then(res=>{
        this.to = res.to;
        this.totalRows = res.total;
        this.overlay = false;

      }).catch((error) => {

        console.error(msg, error);
      });
    }, 
  }
}