import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import imgExcel from './excel.png';
import mixinApis from '@/views/componente/mixinApis'
import moment from "moment";

export default {
    mixins: [mixinApis],
    data() {
        return {
            currentPage: 1,
            maxDateStart:moment().subtract(1, 'days').format('YYYY-MM-DD'),
            maxDateEnd:moment().format('YYYY-MM-DD'),
            query: {
                idAgent:null,
                nameAgent: null,
                dateCreated:null,
                emailAgent:null,
                start:null,
                end:null
            },
            overlay: false,
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
    props: {
        elegir: {
            type: Boolean
        },
        rango: {
            type: Boolean
        }
    },
    computed: {
        tipo_cliente() {
            return this.$store.state.appDocumentos.tipo_cliente;
        },
        tableAgents() {
            return this.$store.state.appAgents.tabla
        },
        listAgentesPage(){
            return this.$store.state.appAgents.tabla.data;
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
                    api: 'appAgents/getAgents',
                    data: filter,
                },
            ]
        },
        pageOptions(){
            return [
                { value: 15, text: '15' },
                { value: 30, text: '30' },
                { value: this.tableAgents.total, text: 'Ver Todos' }
            ]
        },
    },
    mounted() {
        this.initApis(this.apiClientes);
        this.watchQuerys();
    },
    destroyed() {
        this.$emit('sendActive', true);
    },
    methods: {
        exportExcel(){
            this.btnExport = true;
            this.$store.dispatch('appAgents/exportAgents')
          .then(response => {
                this.btnExport = false;
                this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Archivo Descargado',
                icon: "CheckCircleIcon",
                text: 'Su lista de Agentes se descargo exitosamente',
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
        clearFilter(){
            for (let i in this.query) {
                this.query[i] = null;
            }
        },
        showToast(props){
            this.$toast({
                    component: ToastificationContent,
                    position: "top-center",
                    props: props
                });
        },
        validateEmail(prop,value){
            let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (emailRegex.test(value)) {
                this.query[prop] = value;
            }else{
                let props={ 
                    title: 'Información',
                    icon: "AlertCircleIcon",
                    text: 'Ingrese un correo valido',
                    variant: "info",
                }
                this.showToast(props)
                this.query[prop] = null;
            }
        },
        setQuery(prop, value) {
                switch (prop) {
                    case 'emailAgent':
                        this.validateEmail(prop,value);
                        break;
                    default:
                        this.query[prop] = value;
                        break;
    
                }
        },
        getInmueblesAgent(payload){
            // this.$store.commit("appAgents/SELECT_AGENT",data)
            localStorage.setItem('selectAgentElite',JSON.stringify(payload))

            // this.$store.dispatch("appAgents/getInmueblesAgent",data.id)
            // let data={
            //     idAgent:payload.id
            // }
            // this.$store.dispatch("appInmueble/getInmueblesAgentFilter",{data})
        },
        closeModal() {
            this.modal.state = false;
            for (let prop in this.form)
                this.form[prop] = null;
        },
        validateDate(){
            if(this.query.end != null){
                this.getAgents();
            }
        },
        watchQuerys() {
            for (let prop in this.query) {
                this.$watch(() => this.query[prop],
                    (a) => {
                        if(prop ==='start' || prop ==='end' ){
                            this.validateDate()
                        }else{
                            this.getAgents();
                        }
                })
            }
        },
        async getAgents(a = 1) {
            this.overlay = true;
            let params = { page: a };
            let data = {};
            for (let prop in this.query)
                if (this.query[prop])
                    data[prop] = this.query[prop];

            await this.$store.dispatch("appAgents/getAgents", { data, params })
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

                        let props={ 
                            title: 'Algo salio mal',
                            icon: "AlertCircleIcon",
                            text: 'Si el problema persiste recargar la pagina o comunicate con soporte',
                            variant: "danger",
                        }
                        this.showToast(props)
                    }
                });
            this.overlay = false;
        },
        async updateStar(data) {
            this.overlay = true;
            this.overlay = false;
        },
        agregarCliente() {

        },

        addAgend() {

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
                    console.error(error);
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
