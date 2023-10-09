import { Spanish } from "flatpickr/dist/l10n/es.js";
import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import {
    extend,
  } from "vee-validate";
  import * as rules from "vee-validate/dist/rules";

export default {
    data() {
        Object.keys(rules).forEach((rule) => {
            extend(rule, rules[rule]);
        });
        return {
            locale: Spanish,
            plugins: [
                new confirmDatePlugin({
                confirmText: "Agregar",
                showAlways: true,
                theme: "dark",
                }),
            ],
            formCreate:{
                price:null,
                saleDate:null,
                transactionSide:null,
                commissionRate:null,
                commissionAmount:null,
                commissionRateAgent:null,    
                commissionRateCompany:null
            },
            transactionAgentCompanyPorcentage:{
                agentMoneyAmount:null,
                companyMoneyAmount:null,
                totalAmount:null,
            },
            formAgent:{
                userId:null,
                agentPayments:null,
                price:null,
                estimatedDate:null,
                numPayment:null,
            },
            formPaymentTransaction:{
                methodPayments:null,
                paymentType:null,
                bankId:null,
            },
            formPaymentColounmValue:{
                price:null,
                numPayment:null,
                estimatedDate:null,
            },
            // arrayDates:[],
            ArrayAgents:[{
                agentPaymentsColounmValue:{}
            }],
            numberFormat: {
                numeralPositiveOnly: true,
                numeral: true,
                numeralDecimalMark: ",",
                delimiter: ".",
            },
            number: {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand',
            },
        }
    },
    methods: {
        changeMethodPayments(){
            for (let prop in this.formAgent){
                switch(prop){
                    case 'estimatedDate':
                        this.formAgent[prop] =null 
                        break;
                    case 'numPayment':
                        this.formAgent[prop] =null 
                        break;
                    case 'arrayDates':
                        this.formAgent[prop] =null 
                        break;
                    case 'price':
                        this.formAgent[prop] =null 
                        break;

                }
            };
        },
        generateArrayDates(){
            this.formAgent.estimatedDate=[]
            for (let index = 1; index <= this.formAgent.numPayment; index++) {
                this.formAgent.estimatedDate.push({
                    date:null,
                    name:`Fecha ${index}`,
                    price:null
                })
            }
        },
        generateArrayDatesTransactions(){
            this.formPaymentColounmValue.estimatedDate=[]
            for (let index = 1; index <= this.formPaymentColounmValue.numPayment; index++) {
                this.formPaymentColounmValue.estimatedDate.push({
                    date:null,
                    name:`Fecha ${index}`,
                    price:null
                })
            }
        },
        deleteAgent(index){
            if(this.ArrayAgents.length>1){
                this.ArrayAgents.splice(index,1)
            }
        },
        addAgent(){
            this.ArrayAgents.push({agentPaymentsColounmValue:{}})
            this.agentSelected.push('')
        },
        updateTransaction(value,target){
            if(value!=null){
                switch (target){
                    case 'methodPayments':
                        this.formPaymentTransaction[target]=value;
                        break;
                    default:
                        this.formPaymentTransaction.PaymentsColounmValue[target]=value;
                        break;
                }
            }
        },
        updateAgent(value,target,index){
            if(value!=null){
                switch (target){
                    case 'userId':
                        this.ArrayAgents[index][target]=value;
                        break;
                    case 'agentUnity':
                        this.ArrayAgents[index][target]=value;
                        break;
                    case 'agentPayments':
                        this.ArrayAgents[index][target]=value;
                        break;
                    default:
                        this.ArrayAgents[index].agentPaymentsColounmValue[target]=value;
                        break;
                }
            }
        },
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
        pageStart(){
            this.$router.push({ name: 'transactions-agente'})
        },
        backPage(){
            let keyTransaction = JSON.parse(localStorage.getItem('keyTransaction'));
            this.$router.push({ name: 'transactions-agente-form', params: { idTransaction: keyTransaction.idTransaction} })
        },
        async sendFormTransactions(){
            //FORMULARIO PROPIEDAD
            let data ={} 
            let transactions={}
            for (let prop in this.dataTransactions) {
                switch (prop){
                    case 'idUser':
                        transactions[prop]=this.dataTransactions[prop]
                        break;
                    case 'inmuebleId':
                        transactions[prop]=this.dataTransactions[prop]
                        break;
                    case 'tContractId':
                        transactions[prop]=this.dataTransactions[prop].id
                        break;
                    case 'Ttype':
                        transactions[prop]=this.dataTransactions[prop].id
                        break;
                }
            }
            Object.assign(data,{'transaction':transactions})
            // SUMMARY nAgentCompanyPorcentage
            Object.assign(data,{'transactionAgentCompanyPorcentage':this.transactionAgentCompanyPorcentage})
            // FORMULARIO DE DETALLES
            Object.assign(data,{'transactionForm':this.formCreate})
            // FORMULARIO PAGO TRANSACCION
            let colounmValue={}
            for (let prop in this.formPaymentColounmValue){
                if(this.formPaymentColounmValue[prop]!=null){
                    Object.assign(colounmValue,{[prop]:this.formPaymentColounmValue[prop]})
                }
            }
            let formTransaction={}
            for (let prop in this.formPaymentTransaction){
                if(this.formPaymentTransaction[prop]!=null){
                    Object.assign(formTransaction,{[prop]:this.formPaymentTransaction[prop]})
                }
            }
            Object.assign(formTransaction,{'agentPaymentsColounmValue':colounmValue})

            Object.assign(data,{'transactionPaymentForm':formTransaction})
            //AGENTES
            Object.assign(data,{'transactionFormAgent':this.ArrayAgents})
            const res = await this.$store.dispatch("appTransactions/sendFormTransactions",data)
            if(res){
                this.showAlert({
                    title:'Enviado',
                    text:'Se ha enviado correctamente la transacción.',
                    variant: "success"
                })
                this.pageStart()
            }else{
                this.showAlert({
                    title:'Algo salio mal',
                    text:'No se pudo enviar la transacción.',
                    variant: "danger"
                })
            }

        },
        calculatorRateComission(val){
            if(this.formCreate.price>0 ){
                let comission=0
                switch(val){
                    case'rateComssion':
                        comission = (this.formCreate.commissionRate*this.formCreate.price)/(100)
                        this.formCreate.commissionAmount= comission;
                        this.calculatorCommison()
                    break;
                    case 'commissionAmount':
                        comission = (this.formCreate.commissionAmount*100)/(this.formCreate.price)
                        this.formCreate.commissionRate= comission;
                        this.calculatorCommison()
                }

            }
        },
        calculatorCommison(){
            if(this.formCreate.commissionAmount!=null){
                setTimeout(()=>{
                    let comissionAgent = (this.formCreate.commissionRateAgent*this.formCreate.commissionAmount)/(100)
                    this.transactionAgentCompanyPorcentage.agentMoneyAmount= comissionAgent
                    this.transactionAgentCompanyPorcentage.companyMoneyAmount = this.formCreate.commissionAmount - comissionAgent;
                    this.formCreate.commissionRateCompany = 100-this.formCreate.commissionRateAgent
                    this.transactionAgentCompanyPorcentage.totalAmount= this.formCreate.commissionAmount

                },500)
            }
        },
        currencyFormat(value) {
            return new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
            }).format(value);
        },

    },
}