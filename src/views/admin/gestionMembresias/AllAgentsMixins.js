import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import mixinApis from '@/views/componente/mixinApis'
import moment from "moment";

export default {
    mixins: [mixinApis],
    data() {
        return {
            selectallAgents: [],
            import_file: null,
            modalFile: false,
            btnExport: false,
            currentPage: 1,
            maxDateStart: moment().subtract(1, 'days').format('YYYY-MM-DD'),
            maxDateEnd: moment().format('YYYY-MM-DD'),
            query: {
                idAgent: null,
                nameAgent: null,
                plans: null,
                dateCreated: null,
                emailAgent: null,
                start: null,
                end: null
            },
            overlay: false,
            cliente: [{}],
            modal: {
                state: false
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
        optionsPlans() {
            return this.$store.state.appAgents.optionsPlans;
        },
        TableAllAgents() {
            return this.$store.state.appAgents.allAgents;
        },
        agentsAllSelected() {
            return this.$store.state.appAgents.selectallAgents;
        },
        ListAllAgents() {
            return this.$store.state.appAgents.allAgents.data;
        },
    },
    async created() {
        this.getOptionsPlans();
        this.watchQuerys();
        this.getAlLAgents()
        this.$store.commit('appAgents/SELECT_AGENTS_ALL', [])
    },
    destroyed() {
        this.$emit('sendActive', true);
    },
    methods: {
        getOptionsPlans() {
            this.$store.dispatch('appAgents/getOptionsPlans');
        },
        addAgent(agent) {

            let res = this.selectallAgents.some((item) => {
                return item.id === agent.item.id
            })
            if (!res) {
                this.$refs.selectableTable.selectRow(agent.index)
                this.selectallAgents.push(agent.item)
                this.$store.commit('appAgents/SELECT_AGENTS_ALL', this.selectallAgents)

            }
        },
        deleteAgent(agent) {
            this.selectallAgents = this.selectallAgents.filter((item) => {
                return item.id != agent.item.id
            })
            this.$refs.selectableTable.unselectRow(agent.index)
            this.$store.commit('appAgents/SELECT_AGENTS_ALL', this.selectallAgents)

        },
        // validateCheck(){
        //     if(this.ListAllAgents && this.agentsAllSelected){
        //         this.ListAllAgents.map((item,index) =>{
        //             this.agentsAllSelected.map((agent) =>{
        //                 if(item.id != agent.id){
        //                     this.$refs.selectableTable.unselectRow(index)
        //                 }
        //             })
        //         })
        //     }
        //   },

        validateCheck() {
            if (this.agentsAllSelected.length > 0) {
                this.ListAllAgents.map((item, index) => {
                    this.agentsAllSelected.map((agent) => {
                        if (item.id == agent.id) {
                            this.$refs.selectableTable.selectRow(index)
                        }
                    })
                })
            } else {
                this.$refs.selectableTable.clearSelected()
            }
        },
        clearFilter() {
            for (let i in this.query) {
                this.query[i] = null;
            }
        },
        showToast(props) {
            this.$toast({
                component: ToastificationContent,
                position: "top-center",
                props: props
            });
        },
        validateEmail(prop, value) {
            let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (emailRegex.test(value)) {
                this.query[prop] = value;
            } else {
                let props = {
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
                    this.validateEmail(prop, value);
                    break;
                default:
                    this.query[prop] = value;
                    break;

            }
        },
        async getAlLAgents() {
            let params = { page: 1 };
            let data = {}
            await this.$store.dispatch('appAgents/getAllAgents', { data, params })
        },
        closeModal() {
            this.modal.state = false;
            for (let prop in this.form)
                this.form[prop] = null;
        },
        watchQuerys() {
            for (let prop in this.query) {
                this.$watch(() => this.query[prop],
                    (a) => {
                        if (prop === 'start' || prop === 'end') {
                            if (this.query.end > this.query.start) {
                                this.getAgents();
                            }
                        } else {
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
            await this.$store.dispatch("appAgents/getAllAgents", { data, params })
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
                    console.error(error)
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
