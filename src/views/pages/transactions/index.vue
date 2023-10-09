<template>
    <div id="transactions">
        <div class="tran__header">
            <h3 class="header__title">Modulo transacciones</h3>
            <b-button variant="primary" @click="handleNewTransactions()">
                Nueva Transacción
            </b-button>
        </div>
        <div class="tran__tabs">
            <div class="tabs__item" v-b-tooltip.hover
                :title="item.name"
                v-for="(item,index) in optionsStateTransactions"
                :key="index"
                @click="getFiltersTransactions(item.id)"
                :class="[(item.id===selectFilter)?'select__hover':'']">
                    <div class="item-left">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path
                                d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                        </svg>
                        <p>{{ item.name }}</p>
                    </div>
                    <div class="item-rigth">
                        <span>
                            {{ item.count }}
                        </span>
                    </div>
            </div>
        </div>
        <div class="tran__table" >
            <b-overlay :show="overlay" >
                <b-table
                hover
                thead-class="primaryColor"
                bordered
                head-variant="primary"
                selected-variant="primary"
                sticky-header="800px"
                striped
                :items="tableTransactions"
                :fields="fields"
                selectable
                responsive
                select-mode="single"
                ref="selectableTable"
                @row-selected="onRowSelected"
                >
                    <template #cell(updated_at)="data">
                        <span style="font-size: 0.8em;">{{ data.item.updated_at | fechaFormating }}
                        </span>
                    </template>
                    <template #cell(price)="data">
                        <span v-if="data.item.transactions_form.price > 0">
                        {{ currencyFormat(data.item.transactions_form.price) }}
                        </span>
                    </template>
                    <template #cell(state)="data">
                        <span>
                            <b-badge :variant="stateTransaction( data.item.transaction_state.id)">
                                {{ data.item.transaction_state.name }}
                            </b-badge>
                        </span>
                    </template>
                    <template #cell(id_agent)="data" v-if="isAdmin">
                        <div >
                            <span>{{ data.item.user_id.userdata.id }}</span>
                        </div>
                    </template>
                    <template #cell(name_agent)="data" v-if="isAdmin">
                        <div >
                            <span>{{ data.item.user_id.userdata.primer_nombre }}</span>
                        </div>
                    </template>
                    <template #cell(action)="data" v-if="isAdmin">
                        <div class="container__btns">
                            <b-button variant="success" size="sm" @click="handleSendTransaction({name:'APROBAR',id:data.item.id,idState:3})">
                                Aprobar Transacción
                            </b-button>
                            <b-button variant="danger" size="sm"  @click="handleSendTransaction({name:'RECHAZAR',id:data.item.id,idState:1})">
                                Rechazar Transacción
                            </b-button>
                        </div>
                    </template>
                </b-table>
            </b-overlay>
        </div>
        <div class="d-flex justify-content-center">
            <b-pagination v-if="dataTransactions.per_page < dataTransactions.total" @change="getFilterTransactions" :value="currentPage" :per-page="dataTransactions.per_page" :total-rows="dataTransactions.total" first-number last-number prev-class="prev-arrow" next-class="next-arrow">
            <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
            </b-pagination>
        </div>
        <transition name="slide-to-left">
            <v-modal v-if="stateModalInfo" @close="()=>stateModalInfo=false" ref="modalInfoDetail" titulo="Detalle de la transacción" sideBar
            size="md">
            <component is="ModalInfoTransaction" :propsDetail="propsDetail" />
            </v-modal>
        </transition>
        <!-- <v-modal v-if="stateModalManagment" @close="()=>stateModalManagment=false" ref="modalManagment" titulo="Gestion transacción" center
        size="md">
        <component is="transactionManagment"  :propsDetail="propsDetail"  />
        </v-modal> -->
    </div>
</template>

<script>
import VModal from "@/views/componente/vModal";
import formTransactions from './components/FormNewTransactions2.vue';
import ModalInfoTransaction from "./components/ModalInfoTransaction.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import mixinTransactions from "@/views/pages/transactions/mixinTransactions.js"

export default {
    mixins: [mixinTransactions],
    components:{
        VModal,
        formTransactions,
        ModalInfoTransaction,
    },
    data() {
        return {
            currentPage: 1,
            overlay:false,
            selectFilter:null,
            filtersForm:{
                agentId:null,
                state:null,
                nameAgent:null
            },
            userID:null,
            stateModalTransactions:false,
            stateModalInfo:false,
            propsDetail:null,
            isAdmin:false,
            fields: [
                {
                    key: 'id', label: 'ID'
                },
                {
                    key: 'updated_at', label: 'FECHA'
                },
                {
                    key: 'inmueble.titulo_inmueble', label: 'NOMBRE PROPIEDAD'
                },
                {
                    key: 'contract_type.name', label: 'TIPO CONTRATO',
                },
                {
                    key: 'transaction_type.name', label: 'TIPO TRANSACCIÓN',
                },
                {
                    key: 'price', label: 'PRECIO TRANSACCIÓN',
                },
                {
                    key: 'state', label: 'ESTADO'
                },
            ],
        }
    },
    filters: {
        fechaFormating: function (value) {
            if (value) {
            let date = new Date(value);
            return date.toLocaleString()
            }
        }
    },
    created() {
        localStorage.setItem('ordenTransaction',JSON.stringify({}))
        localStorage.setItem('keyTransaction',JSON.stringify({}))
        this.userID = JSON.parse(localStorage.getItem('userData'));
        this.watchQuerys()
        this.getTransactionsTable()
        this.handleFieldsTable(this.isAdmin)
    },
    computed:{
        tableTransactions(){
            return this.$store.state.appTransactions.tableTransactions.data;
        },
        dataTransactions(){
            return this.$store.state.appTransactions.tableTransactions;
        },
        optionsStateTransactions(){
            const data = this.$store.state.appTransactions.optionsStateTransactions;
            const arrayCount = data.map((item) => item.count)
            const sumCount = arrayCount.reduce((accumulator, currentValue) => accumulator + currentValue,0);
            const newData =[{
                id:'all',
                name:'Todas las Transacciones',
                count:sumCount
            },...data]
            return newData;
        }
    },
    methods: {
        showAlert({title,text,variant}){
            this.$toast({
                component: ToastificationContent,
                props: {
                title,
                icon: "AlertCircleIcon",
                text,
                variant,
                },
            });
        },
        watchQuerys() {
        for (let prop in this.filtersForm) {
                this.$watch(() => this.filtersForm[prop],
                    (a) => {
                            this.getFilterTransactions()
                    }
                )
            }
        },
        async getFilterTransactions(a=1){
            let params = { page: a };
            let data={}
            for (let prop in this.filtersForm)
                if (this.filtersForm[prop]){
                    data[prop] = this.filtersForm[prop];
                }
            let res = await this.$store.dispatch('appTransactions/getTableTransactions',{data,params})
            this.overlay=false
            if(!res){
                this.showAlert({
                    title:'Algo salio mal',
                    text:'Recarga la pagina e intenta nuevamente..',
                    variant: "warning"
                })
            }
        },
        getFiltersTransactions(id){
            this.overlay=true
            this.selectFilter=id
            this.filtersForm.state=id
        },
        getTransactionsTable(){
            if(this.isAdmin){
                this.getFilterTransactions()
            }else{
                this.filtersForm.agentId=this.userID.id
            }
        },
        // handleSendTransaction({name,id,idState}){
        //     const swalWithBootstrapButtons = this.$swal.mixin({
        //         customClass: {
        //             confirmButton: 'btn btn-success',
        //         },
        //         buttonsStyling: false
        //     })
        //     swalWithBootstrapButtons.fire({
        //         title: `${name} TRANSACCIÓN`,
        //         text: `Desea cambiar el estado de la transacción a ${name}`,
        //         icon: 'question',
        //         showCloseButton: true,
        //         confirmButtonText: 'Aceptar',
        //         reverseButtons: true
        //         }).then((result) => {
        //         if (result.isConfirmed) {
        //             this.sendChangeStateTransaction({swalWithBootstrapButtons,id,idState})

        //         }
        //     })
        // },
        // async sendChangeStateTransaction({swalWithBootstrapButtons,id,idState}){
        //     let data ={
        //         transactionId:id,
        //         state:idState
        //     }
        //     let res = await this.$store.dispatch("appTransactions/sendChangeStateTransaction", { data })
        //     if(res.state){
        //         swalWithBootstrapButtons.fire(
        //             'ESTADO CAMBIADO!',
        //             'Se cambio correctamente.',
        //             'success'
        //         )
        //         this.$store.commit("appTransactions/changeItemTableTransactions",res.data)
        //     }else{
        //         swalWithBootstrapButtons.fire(
        //             'HUBO UN ERROR!',
        //             'Intenta nuevamente.',
        //             'warning'
        //         )
        //     }
        // },
        // stateTransaction(state){
        //     let arrayStates= [
        //         {name:'aprobado',id:3,variant:'success'},
        //         {name:'pendiente',id:4,variant:'warning'},
        //         {name:'rechazado',id:1,variant:'danger'},
        //     ];
        //     const select= arrayStates.find((item)=>{
        //         return item.id == state
        //     })
        //     return(select)?select.variant : 'info'
        // },
        handleFieldsTable(res){
            if(res){
                this.fields.push(
                    {
                        key: 'id_agent',
                        label: 'ID AGENTE'
                    },
                    {
                        key: 'name_agent',
                        label: 'NOMBRE AGENTE'
                    },
                    {
                        key: 'action',
                        label: 'ACCIONES'
                    }
                )
                this.$store.dispatch('appTransactions/getOptionsStateTransactions')
            }else{
                let data = {
                    idUser : this.userID.id
                }
                this.$store.dispatch('appTransactions/getOptionsStateTransactions',data)
            }
        },
        handleNewTransactions(){
            let keyTransactions = {
                idTransaction: Math.floor(Math.random() * 100),
                idUser:this.userID.id
            }
            localStorage.setItem('keyTransaction',JSON.stringify(keyTransactions))
            this.$router.push({ name: 'transactions-agente-form', params: { idTransaction: keyTransactions.idTransaction} })
        },
        // currencyFormat(value) {
        //     return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP',minimumFractionDigits: 0, }).format(value);
        // },
        onRowSelected(items){
            if(items.length>0){
                this.stateModalInfo=true;
                this.propsDetail=items[0]
                this.$refs.selectableTable.clearSelected()
            }
        },
        // showModalManagement(item){
        //     this.stateModalManagment=true
        //     this.propsDetail=item
        // },
        // async getInmuebles(a = 1) {
        //     this.overlay = true;
        //     let params = { page: a };
        //     let data = {};
        //     let id =this.agenElitetSelected.id
        //     for (let prop in this.query)
        //         if (this.query[prop]) data[prop] = this.query[prop];
        //     try{
        //         let res
        //         if(id!=null){

        //         res = await this.$store.dispatch("appInmueble/getInmueblesAgentFilter", { data, params,id })
        //         }
        //         this.overlay = false;
        //         if (!res) {
        //         this.$toast({
        //         component: ToastificationContent,
        //         props: {
        //             title: "Algo salio mal",
        //             icon: "AlertCircleIcon",
        //             text: "Si el problema persiste recargar la pagina o comunicate con soporte",
        //             variant: "danger",
        //         },
        //         });
        //     }
        //     }catch(error){
        //     }
        // },
    }
}
</script>

<style scoped lang="scss" scoped>
.tabs__item.select__hover{
    background-color: var(--primary);
    color: white;
    svg{
        fill: white;
    }
    .item-rigth {
    span {
        color: var(--primary);
        background-color: white;
    }
}
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
#transactions {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 2rem;
    gap: 2rem;
    border-radius: 15px;
}

.tran__header {
    display: flex;
    justify-content: space-between;
}

.header__title{
    color: var(--primary);
    font-size: 1.7rem;
    font-weight: bold;
}

.tran__tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
}

.tabs__item {
    display: flex;
    justify-content: space-between;
    width: 170px;
    padding: 10px 14px;
    align-items: center;
    border: 2px solid var(--primary);
    border-radius: 10px;
}
.tabs__item:hover{
    cursor: pointer;
}


.item-left {
    display: flex;
    align-items: center;
    gap: 6px;
    width: auto;

    svg {
        fill: var(--primary);
        width: 20px;
        height: 30px;
    }

    p {
        width: 86px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.item-rigth {
    span {
        background-color: var(--primary);
        color: white;
        padding: 4px 6px;
        border-radius: 50%;
        font-size: 0.8em;
        font-weight: bold;
    }
}
.container__btns{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    button{
        max-width: 140px;
        height: 40px;
    }

}

@media (max-width: 550px) {
    #transactions{
        padding: 2rem 0.5rem;
    }
    .tran__header{
        flex-direction: column;
        align-items: center;
    }

    .tabs__item{
        font-size: 12px;
        width: 140px;
    }
    .item-left {
        svg {
            width: 20px;
            height: 25px;
        }
        p {
        width: 70px;
        }
    }
    .header__title{
        font-size: 1.4rem;
    }
}
</style>
