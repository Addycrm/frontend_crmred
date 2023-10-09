export default {
  mounted(){
    // this.watchUbicaciones();
  },
	methods: {
		watchUbicaciones(){
      for(let prop in this.ubicaciones){
        this.$watch(() => this.ubicaciones[prop].value,
        (codigo) => {
          Object.assign(this.query.filter,{[prop]: codigo});

          this.getInmuebles()
          .then(() => {
            let keys = Object.keys(this.ubicaciones);
            if(prop != keys[keys.length - 1] && codigo != null){
              let index = keys.indexOf(prop);
                this.getUbicacion({
                  codigo,
                  prop: keys[index + 1],
                  api: this.ubicaciones[prop].props.api,
                  name: this.ubicaciones[prop].props.name,
              })
            }
          });
        });
      }
    },
	}
}