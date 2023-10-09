import {axiosIns} from '@/libs/axios'
export default {
  namespaced: true,
  state: {
    tableTransactions:[],
    typeContract:null,
    typeTransactions:null,
    isValidateFormDetail:false,
    optionsTransactions:null,
    optionsPayment:null,
    optionsBanks:null,
    optionsTypePayments:null,
    optionsStateTransactions:[]
  },
  mutations: {
   changeIsValidateFormDetail: (state, value) => {
    state.isValidateFormDetail=value
  },
  addOptionsStateTransactions:(state,value)=>{
    let data =value
    state.optionsStateTransactions=data
  },
  changeItemTableTransactions(state,value){
    const index = state.tableTransactions.data.findIndex((item)=>{
        return item.id === value.id
    })
    state.tableTransactions.data[index].transaction_state = value.transaction_state
  }
  },
  actions: {
    async getTypeContract({state}) {
        try {
            let res = await axiosIns({
                method:'get',
                url:'api/auth/transactions/type-contract'
            })
            state.typeContract=res.data.data;
        } catch (error) {
            console.error(error)
        }
    },
    async getTypeTransactions({state}) {
        try {
            let res = await axiosIns({
                method:'get',
                url:'api/auth/transactions/type-transactions'
            })
            state.typeTransactions=res.data.data;
        } catch (error) {
            console.error(error)
        }
    },
    async getoOptionsTransactions({state}){
        try{
            let res = await axiosIns.get('api/auth/transactions/side-transactions');
            state.optionsTransactions = res.data.data

        }catch(error){

        }
    },
    async getOptionsPayment({state}){
        try{
            let res = await axiosIns.get('api/auth/transactions/payments-transactions');
            state.optionsPayment = res.data.data

        }catch(error){

        }
    },
    async getOptionsBanks({state}){
        try{
            let res = await axiosIns.get('api/auth/transactions/banks');
            state.optionsBanks = res.data.data
        }catch(error){

        }
    },
    async getOptionsTypePayments({state}){
        try{
            let res = await axiosIns.get('api/auth/transactions/payment-type');
            state.optionsTypePayments = res.data.data
        }catch(error){

        }
    },
    async getOptionsStateTransactions({state},data={}){
        try{
            // let res = await axiosIns.get('api/auth/transactions/state-transactions');
            let res = await axiosIns({
                method:'post',
                url:'api/auth/transactions/state-transactions',
                data:data
            })
            state.optionsStateTransactions=res.data.data
        }catch(error){

        }
    },
    async sendFormTransactions(ctx,data){
        try{
            let res = await axiosIns({
                method:'post',
                url:'/api/auth/transactions',
                data:data
            })
            return res.data.success
        }catch(error){
            console.error(error)
            return false
        }
    },
    async getTableTransactions({state},{data,params}){
        try{
            let res = await axiosIns({
                method:'post',
                url:'/api/auth/transactions-get',
                data,
                params
            })
            state.tableTransactions=res.data.data
            return{
                state:true
            }
        }catch(error){
            return {
                state:false
            }
        }
    },

    async sendChangeStateTransaction(ctx,{data}){
        try{
            let res = await axiosIns({
                method:'post',
                url:'/api/auth/transactions/change-state',
                data,

            })
            return {
                data:res.data.data,
                state:true
            }
        }catch(error){
            return {
                state:false
            }
        }
    }

},
}