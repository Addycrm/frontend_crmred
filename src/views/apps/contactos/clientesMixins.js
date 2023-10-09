import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import imgExcel from './excel.png';
import mixinApis from '@/views/componente/mixinApis'
import moment from "moment";

export default {
  mixins: [mixinApis],
  data() {
    return {
      imgExcel,
      import_file: null,
      modalFile: false,
      btnExport: false,
      currentPage: 1,
      maxDateStart:moment().subtract(1, 'days').format('YYYY-MM-DD'),
      maxDateEnd:moment().format('YYYY-MM-DD'),
      propertiesPortal:[],
      query: {
        nombre: null,
        tipo_cliente: null,
        portal: null,
        genero: null,
        init: null,
        end: null,
        number_page: 5
      },

      overlay: false,
      columns: [
        {
          thClass: 'text-nowrap', field: "created", label: "Fecha de registro",
          formatFn: (date) => {
            let dateresult = new Date(date)
            return dateresult.toLocaleString();
          },
        },

        { thClass: 'text-nowrap td-sticky left', tdClass: 'td-sticky left', field: "inmueble", label: "Inmuebles Interesados" },
        {
          thClass: 'text-nowrap', field: "subportalescode", label: "Portal", width: '15em'
        },
        { thClass: 'text-nowrap', field: "nombre", label: "Contacto" },
        { thClass: 'text-nowrap', field: "main_cell_phone", label: "Celular" },
        { thClass: 'text-nowrap', field: "main_mail", label: "Correo Electronico" },
        { thClass: 'text-nowrap', field: "clasificacion", label: "Calificación" },
        // {thClass: 'text-nowrap', field: "whatsapp", label: "WhatsApp"},
        // {thClass: 'text-nowrap', field: "main_mail", label: "E-mail"},
        { thClass: 'text-nowrap td-sticky right', tdClass: 'td-sticky right', field: "actions", label: "Acción" }
      ],
      cliente: [{}],
      modal: {
        state: false
      },
      form: {
        id: null,
        tipo_cliente: null,
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
  // watch: {
  //   query(){
  //     this.watchQuerys();
  //   }
  // },
  props: {
    elegir: {
      type: Boolean
    },
    rango: {
      type: Boolean
    }
  },
  computed: {
    appPortales() {
      let _portales = [{ value:null, id:null,name:'Ver todos'},...this.$store.state.appPortales.portales];
      return _portales;
    },
    tipo_cliente() {
      return this.$store.state.appDocumentos.tipo_cliente;
    },
    tablaClientes() {
      return this.$store.state.appCliente.contact_portal
    },
    storeConfig() {
      return this.$store.state.appConfiguracion.options
    },
    apiClientes() {
      let filter = {};
      for (let prop in this.query)
        if (this.query[prop])
          filter[prop] = this.query[prop];
      return [
        {
          api: 'appDocumentos/getTipoCliente',
          data: {}
        },
        {
          api: 'appCliente/getContactPortal',
          params : { page: 1 },
          data: filter,
        },
      ]
    },
    pageOptions() {
      return [
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 20, text: '20' },
        // { value: this.tablaClientes.total, text: 'Ver Todos' }
      ]
    },
    goodTable() {
      let table = { props: {}, events: {} };
      Object.assign(table.props, {
        columns: this.columns,
        rows: this.tablaClientes.data,
        compactMode: true,
        paginationOptions: {
          enabled: true,
          perPage: Infinity
        }
      });

      if (this.elegir) {
        if (this.rango) {
          Object.assign(table.events, {
            'on-selected-rows-change': (a) => {
              this.cliente = a.selectedRows;
              this.$emit('sendActive', a.selectedRows ? false : true);
            }
          });
          Object.assign(table.props, {
            selectOptions: {
              enabled: true,
              selectionText: 'Filas seleccionadas',
              clearSelectionText: 'Limpiar',
            }
          });
        } else {
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
  mounted() {
    // this.initApis(this.apiClientes);
    this.getPortales();
    this.watchQuerys();
    this.getClientes();
  },
  destroyed() {
    this.$emit('sendActive', true);
  },
  methods: {

    closeModal() {
      this.modal.state = false;
      for (let prop in this.form)
        this.form[prop] = null;
    },
    validateDate(){
        if(this.query.end != null){
            this.getClientes();
        }
    },
    watchQuerys() {
      for (let prop in this.query) {
        this.$watch(() => this.query[prop],
          (a) => {
            if(prop ==='init' || prop ==='end'){
              this.validateDate()
            }else{
              if (prop != 'nombre' ){
                this.getClientes();
              }
            }


            
          })
      }
    },

    info(value, button) {
      this.propertiesPortal=[]
      if(value.portalescontact.length>0){
        this.propertiesPortal.push(value.portalescontact[0].inmueble)
        this.$refs.modalInmueblesInteresados.info(this.propertiesPortal, button)

      }else if(value.subportalescode.length>0) {
        this.propertiesPortal.push(value.subportalescode[0].inmueble)
        this.$refs.modalInmueblesInteresados.info(this.propertiesPortal, button)

      }else{
        this.$toast({
          component: ToastificationContent,
          props: {
            title: "Información",
            icon: "AlertCircleIcon",
            variant: "warning",
            text: "No hay inmuebles registrados",
          },
        });
      }
      // this.$refs.modalInmueblesInteresados.info(value, button)
    },


    async getPortales() {
      await this.$store.dispatch('appPortales/fetchPortales')
        .then((res) => {
        });
    },
    async getClientes(a = 1) {
      this.overlay = true;
      let params = { page: a };
      let data = {};
      for (let prop in this.query)
        if (this.query[prop])
          data[prop] = this.query[prop];

      await this.$store.dispatch("appCliente/getContactPortal", { data, params })
        .then(state => {
          if (!state) {
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
    async updateStar(data) {
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
    agregarCliente() {
      Object.assign(this.modal, {
        state: true,
        titulo: 'Agregar Cliente',
        props: {
          tipo: 'add',
        }
      });
    },
    editarCliente(data) {
      Object.assign(this.modal, {
        state: true,
        titulo: 'Editar Cliente',
        props: {
          tipo: 'edit',
          data
        }
      });
    },
    async onSubmit() {
      this.overlay = true;
      await this.$refs['ClientesForm'].onSubmit()
        .then(async ({ state, data }) => {
          if (state) {
            if (this.modal.props.tipo == 'add')
              this.createCliente(data);
            else
              this.updateCliente(data);

            this.modal.state = false;
          }
        });
      this.overlay = false;
    },
    async createCliente(data) {
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
    async updateCliente(data) {
      let swal = {
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      }
      await this.$http({
        url: `api/auth/clientes/${this.form.id}`,
        method: 'put',
        data
      }).then(res => {
        this.$store.commit('appCliente/UPDATE_CLIENTE', res.data.data.cliente);
        Object.assign(swal, {
          title: "¡Excelente!",
          text: "¡Datos actualizados exitosamente!",
          icon: "success",
        });
      }).catch(err => {
        Object.assign(swal, {
          title: "Algo salio mal!",
          text: 'Si el problema persiste recarga la pagina o comunicate con soporte',
          icon: "error",
        });
      });
      this.$swal(swal);

    },
    sendValue() {
      for (let item of this.cliente)
        Object.assign(item, { vgtSelected: false });

      return this.rango ? this.cliente : this.cliente[0];
    },
    rowStyleClass(row) {
      return this.cliente[0].id == row.id ? 'success' : '';
    },
    clienteSelected(a) {
      this.cliente = [a.row];
      this.$emit('sendActive', false);
    },

    async typeCustomers(api) {
      await this.$store
        .dispatch(api)
        .then((response) => {
          for (let item of response) {
            this.options.tipo_cliente.push({ value: item, text: item.nombre });
          }
        })
        .catch((error) => {
        });
    },
    clearFilter() {
      for (let i in this.query)
        if (i != 'number_page')
          this.query[i] = null;
    },
    onFileChange(e) {
      this.import_file = e.target.files[0];
    },
    async exportExcel() {
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