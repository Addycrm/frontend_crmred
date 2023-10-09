import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import imgExcel from './excel.png';
import mixinApis from '@/views/componente/mixinApis'
export default {
	mixins:[mixinApis],
	data () {
		return {
			imgExcel,
      changeInfoCliente:false,
			import_file: null,
			modalFile: false,
			btnExport: false,
			currentPage: 1,
			query: {
        nombre: null,
        tipo_cliente: null,
        genero: null,
        number_page: 10,
      },
			overlay: false,
			columns: [
        {thClass: 'text-nowrap td-sticky left', tdClass: 'td-sticky left', field: "id", label: "ID"},
        {thClass: 'text-nowrap', field: "tipo_cliente.nombre", label: "Tipo", width:'15em'},
        {thClass: 'text-nowrap', field: "nombre", label: "Cliente"},
        {thClass: 'text-nowrap', field: "genero.name", label: "Género"},
        {thClass: 'text-nowrap', field: "main_cell_phone", label: "Celular"},
        {thClass: 'text-nowrap', field: "clasificacion", label: "Calificación"},
        // {thClass: 'text-nowrap', field: "whatsapp", label: "WhatsApp"},
        // {thClass: 'text-nowrap', field: "main_mail", label: "E-mail"},
        {thClass: 'text-nowrap td-sticky right', tdClass: 'td-sticky right', field: "actions", label: "Acción"}
      ],
			cliente: [{}],
      clienteSelections:[],
			modal: {
				state: false
			},
			form: {
        id: null,
    		tipo_cliente: null,
        embudoId:null,
        estadoId:null,
				nombre: null,
				apellido: null,
				identification_type: null,
				identification_number: null,
				whatsapp: null,
				main_cell_phone: null,
        genero: null,
				clasificacion: null,
				main_mail: null,
        pais: null,
        departamento: null,
        ciudad: null,
        observaciones: null
    	},
		}
	},
	watch:{

	},
	props:{
		elegir: {
			type: Boolean
		},
		rango: {
			type: Boolean
		}
	},
	computed:{
		tipo_cliente(){
			return this.$store.state.appDocumentos.tipo_cliente;
		},
		tablaClientes(){
			return this.$store.state.appCliente.tabla
		},
		storeConfig(){
      return this.$store.state.appConfiguracion.options
    },
    apiClientes(){
      let filter = {};
      for(let prop in this.query)
        if(this.query[prop])
          filter[prop] = this.query[prop];
      return [
        {
          api: 'appDocumentos/getTipoCliente',
          data: {}
        },
        // {
        //   api: 'appCliente/getClientes',
        //   data: filter,
        // },
      ]
    },
    pageOptions(){
    	return [
				{ value: 10, text: '10'}, 
				{ value: 15, text: '15'}, 
				{ value: 20, text: '20'}
			]	
    },
		goodTable(){
      let table = {props:{}, events:{}};
      Object.assign(table.props, {
        columns: this.columns,
        rows: this.tablaClientes.data,
        compactMode: true,
        paginationOptions: {
          enabled: true,
          perPage: Infinity
        }
      });
     
      if(this.elegir){
      	if(this.rango){
	        Object.assign(table.events, {
	          'on-selected-rows-change':(a) => {
	            this.cliente = a.selectedRows;
                if(a.selectedRows.length>0){
                  this.clienteSelections=a.selectedRows;
                }
	            this.$emit('sendActive', a.selectedRows ? false : true);
	          }
	        });
	        Object.assign(table.props, {
	          selectOptions:{
	            enabled: true,
	            selectionText: 'Filas seleccionadas',
	            clearSelectionText: 'Limpiar',
	          }
	        });
      	}else{
      		Object.assign(table.events, {
	          'on-row-click': this.clienteSelected
	        });
	        Object.assign(table.props, {
	        	rowStyleClass: this.rowStyleClass
	        });
      	}
      }

      return table;
    }
	},
	mounted(){
		this.initApis(this.apiClientes);
    this.getClientes();
		this.watchQuerys();
    // this.selectRow();

	},

  created() {
  },
	destroyed(){
    this.$emit('sendActive', true);
  },
  updated() {
    this.selectRow()
  },
	methods:{
    selectClientes(){
      // PERMITE FILTRAR LOS SELECCIONADOS DE LOS QUE SE ENCUENTRAN EN EL LOCAL STORAGE
      if(this.clienteSelections.length>0){
        // traemos los datos de localStorage
        let data=localStorage.getItem('selectedClientes')
        let res = JSON.parse(data);
        let copia = this.clienteSelections;
        res.map((element) =>{
          const value = res.find(element2 => element2.id == element.id)
          copia = copia.filter((element) =>{
            return element.id != value.id
          })
        });
        let agentSelect= res.concat(copia)
        localStorage.setItem('selectedClientes',JSON.stringify(agentSelect));
        return agentSelect
        }
      }
    ,selectRow(){
      let data=localStorage.getItem('selectedClientes')
      if(data!=null){
        var res = JSON.parse(data)
      }
      if(this.goodTable.props.rows.length>0 && res!=null){
        this.goodTable.props.rows.map((row,index)=>{
          res.map((select)=>{
            if(row.id === select.id){
              this.$set(this.goodTable.props.rows[index], 'vgtSelected', true);
            }
          })
        })
      }
    },
		closeModal(){
			this.modal.state = false;
			for(let prop in this.form)
				this.form[prop] = null;
		},
		watchQuerys(){
      for(let prop in this.query){
        this.$watch(() => this.query[prop],
        (a) => {
          if(prop != 'nombre')
          	this.getClientes();
        })
      }
    },
		async getClientes(a = 1){
      this.overlay = true;
      let params = {page: a};
      let data = {};
      for(let prop in this.query)
        if(this.query[prop])
          data[prop] = this.query[prop];
          this.selectClientes()

        
      await this.$store.dispatch("appCliente/getClientes", {data, params})
      .then(state => {
        if(!state){
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Algo salio mal',
              icon: "AlertCircleIcon",
              text: 'Si el problema persiste recargar la pagina o comunicate con soporte',
              variant: "danger",
            },
          });
        }
      });
      this.overlay = false;
    },
		async updateStar(data){
			this.overlay = true;
			/*await this.$http({
				url: 'api/auth/update-status-client',
				method: 'post',
				data
			}).then(res => {
				this.$store.commit('appCliente/UPDATE_CLIENTE', res.data.data);
				this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Calificación Actualizada',
            icon: "CheckCircleIcon",
            variant: "success",
            text: 'Tu calificacion fue guardada exitosamente',
          }
        });
			}).catch( err => {
				this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Algo salio mal',
            icon: "AlertCircleIcon",
            text: 'Si el problema persiste recargar la pagina o comunicate con soporte',
            variant: "danger",
          },
        });
			});*/
			this.overlay = false;
    },
		agregarCliente(){
			Object.assign(this.modal, {
				state: true,
				titulo: 'Agregar Cliente',
				props: {
					tipo: 'add',
				}
			});
		},
		editarCliente(data){
			Object.assign(this.modal, {
				state: true,
				titulo: 'Editar Cliente',
				props: {
					tipo: 'edit',
					data
				}
			});
		},
		async onSubmit(){
			this.overlay = true;
      await this.$refs['ClientesForm'].onSubmit()
      .then(async ({state, data}) => {
      	if(state){
	      	if(this.modal.props.tipo == 'add')
	      		this.createCliente(data);
	      	else
          this.updateCliente(data);
	      	this.modal.state = false;
      	}
      });
			this.overlay = false;
    },
    async createCliente(data){
    	let swal = {
    		customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
    	}
    	await this.$http({
        url: 'api/auth/clientes',
        method: 'post',
        data
      }).then(res => {
        this.$store.commit('appCliente/ADD_CLIENTE', res.data.data.cliente);
        Object.assign(swal, {
	        title: "¡Excelente!",
	        text: "¡Cliente registro exitosamente!",
	        icon: "success",
	      });
      }).catch(() => {
	      Object.assign(swal, {
	        title: "Algo salio mal!",
	        text: 'Si el problema persiste recarga la pagina o comunicate con soporte',
	        icon: "error",
	      });
      });
      this.$swal(swal);
    },
    async updateCliente(data){

    	await this.$http({
        url: `api/auth/clientes/${this.form.id}`,
        method: 'put',
        data
      }).then(res => {
        this.changeInfoCliente=true

        this.showNoitification({
          title: "¡Excelente!",
	        text: "¡Datos actualizados exitosamente!",
	        icon: "success",
        })
        // Object.assign(swal, {
        //   title: "¡Excelente!",
	      //   text: "¡Datos actualizados exitosamente!",
	      //   icon: "success",
	      // });
        // this.$swal(
        //   {}
        // );

        this.$store.commit('appCliente/UPDATE_CLIENTE', res.data.data.cliente);
      }).catch(err => {
        this.showNoitification({
          title: "Algo salio mal!",
	        text: 'Si el problema persiste recarga la pagina o comunicate con soporte',
	        icon: "error",
        })
	      // Object.assign(swal, {
	      //   title: "Algo salio mal!",
	      //   text: 'Si el problema persiste recarga la pagina o comunicate con soporte',
	      //   icon: "error",
	      // });
      });
      // this.$swal(swal);

    },
    showNoitification({title,text,icon}){
      // this.$swal({
      //   icon,
      //   title,
      //   text,
      //   customClass: {
      //     confirmButton: "btn btn-primary",
      //   },
      //   buttonsStyling: false,
      // })

      this.$swal({
        icon,
        title,
        text,
        showCloseButton: true,
        customClass: {
          confirmButton: "btn btn-danger",
        },
        confirmButtonText: "Ok",
      });
    },
		sendValue(){
      this.selectClientes()
      let data=localStorage.getItem('selectedClientes')
      var res = JSON.parse(data);
      // console.log( this.cliente)
      if(res!=null){
        if(res.length>0){
          return res
        }
      }else{
        for(let item of this.cliente)
          Object.assign(item, { vgtSelected: false });
        return this.rango ? this.cliente : this.cliente[0];
      }
		},

		rowStyleClass(row){
      return this.cliente[0].id == row.id ? 'success' : '';
    },
    clienteSelected(a){
    	this.cliente = [a.row];
    	this.$emit('sendActive', false);
    },

		async typeCustomers(api){
			await this.$store
			.dispatch(api)
			.then((response) => {
				for(let item of response){
					this.options.tipo_cliente.push({value: item, text: item.nombre});
				}
			})
			.catch((error) => {
			});
		},
		clearFilter(){
      for(let i in this.query)
          if(i != 'number_page')
            this.query[i] = null;
    },
		onFileChange(e) {
      this.import_file = e.target.files[0];
    },
    async exportExcel(){
    	this.btnExport = true;
    	await this.$store.dispatch('appCliente/exportClientes')
      .then(response => {
    		this.btnExport = false;
    		this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Archivo Descargado',
            icon: "CheckCircleIcon",
            text: 'Su lista de clientes se descargo exitosamente',
            variant: "success",
          }
        });
      }).catch(error => {
    		this.btnExport = false;
    		this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Algo salio mal',
              icon: "AlertCircleIcon",
              text: 'No se logro descargar la lista de clientes',
              variant: "danger",
            },
          });
      });
    },
    async importExcel() {
    	this.overlay = true;
      let formData = new FormData();
      formData.append("file", this.import_file);

      await this.$http
        .post("api/auth/clientes/import", formData, {
          headers: { "Content-type": "multipart/form-data" },
        }).then((response) => {
          this.customers();
          if (response.status === 200) {
            this.overlay = false;
            this.modalFile = false;
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Archivo Importado',
                icon: "CheckCircleIcon",
                text: 'Clientes importados exitosamente',
                variant: "success",
              }
            });
          }
        })
        .catch((error) => {
          this.overlay = false;
          this.modalFile = false;
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Algo salio mal',
              icon: "AlertCircleIcon",
              text: error.response.data,
              variant: "danger",
            },
          });
        });
    },
	}
}