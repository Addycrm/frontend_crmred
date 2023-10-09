export default {
    data(){
        return{
            isAdmin:false,
            arrayStates:[
                {name:'aprobado',id:3,variant:'success'},
                {name:'pendiente',id:4,variant:'warning'},
                {name:'rechazado',id:1,variant:'danger'},
            ]
        }
    },
    created() {
        this.isAdmin= this.$can('transaction_management', 'transaction')
    },
    methods: {
        handleSendTransaction({name,id,idState}){
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: `${name} TRANSACCIÓN`,
                text: `Desea cambiar el estado de la transacción a ${name}`,
                icon: 'question',
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
                reverseButtons: true
                }).then((result) => {
                if (result.isConfirmed) {
                    this.sendChangeStateTransaction({swalWithBootstrapButtons,id,idState})
                }    
            })
        },
        async sendChangeStateTransaction({swalWithBootstrapButtons,id,idState}){
            let data ={
                transactionId:id,
                state:idState
            }
            let res = await this.$store.dispatch("appTransactions/sendChangeStateTransaction", { data })
            if(res.state){
                swalWithBootstrapButtons.fire(
                    'ESTADO CAMBIADO!',
                    'Se cambio correctamente.',
                    'success'
                )
                this.$store.commit("appTransactions/changeItemTableTransactions",res.data)
            }else{
                swalWithBootstrapButtons.fire(
                    'HUBO UN ERROR!',
                    'Intenta nuevamente.',
                    'warning'
                )
            }
        },
        stateTransaction(state){
            const select= this.arrayStates.find((item)=>{
                return item.id == state
            })
            return(select)?select.variant : 'info'
        },
        currencyFormat(value) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP',minimumFractionDigits: 0, }).format(value);
        },
    },
}