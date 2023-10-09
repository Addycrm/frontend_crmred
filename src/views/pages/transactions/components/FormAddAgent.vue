<template>
    <div class="form__agent">
        <validation-observer ref="formAgent">
            <div class="form__agent-data">

                <b-col md="12" lg="4" v-if="isAdmin">
                    <b-form-group>
                        <label for="barrio" class="required">ID Agente</label>
                        <b-form-input id="barrio" placeholder="id..." :value="formAgent.userId" :readonly="isAdmin" />
                    </b-form-group>
                </b-col>
                <b-col md="12" lg="4" v-else >
                    <validation-provider #default="{ errors }" name="Selecciona un agente" rules="required">
                        <b-form-group :state="errors.length > 0 ? false : null" >
                            <label for="selectAgents" class="required">Seleccionar agentes</label>
                            <v-select 
                                autocomplete="on" 
                                v-model="formAgent.userId" 
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" 
                                label="name"
                                :options="allAgents"
                                :reduce="(type) => type.id"
                            />
                        </b-form-group>
                    </validation-provider>                                      
                </b-col>
                <b-col md="12" lg="4" v-if="optionsPayment">
                    <validation-provider #default="{ errors }" name="Lado de Transacción" rules="required">
                        <b-form-group :state="errors.length > 0 ? false : null">
                            <label for="payment" class="required">Selecciona Metodo pago</label>
                            <v-select 
                                v-model="formAgent.agentPayments" 
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" 
                                label="name"
                                :options="optionsPayment"
                                :reduce="(type) => type.id"

                            />
                        </b-form-group>
                    </validation-provider> 
                </b-col>
            </div>
        </validation-observer>
        <div class="form__agent-payment">
            <div v-if="validateMetodPayment() ===1">
                <validation-observer ref="paymentMethod1">
                    <b-row>
                        <b-col  md="12" lg="6">
                            <validation-provider #default="{ errors }" name="Precio" rules="required">
                                <b-form-group>
                                    <label for="price" class="required">Precio</label>
                                    <b-input-group prepend="$" append="COP"  >
                                        <Cleave
                                            id="price"
                                            class="form-control"
                                            v-model="formAgent.price"
                                            :raw="true"
                                            :options="numberFormat"
                                            :class="{ 'is-invalid': errors.length > 0 }"
                                        >
                                        </Cleave>
                                    </b-input-group>   
                                </b-form-group>
                            </validation-provider>
                        </b-col>
                        <b-col  md="12" lg="6">
                            <validation-provider #default="{ errors }" name="Fecha Estimada" rules="required">
                                <b-form-group :state="errors.length > 0 ? false : null">
                                    <label for="dateEstimation" class="required">Fecha Estimada</label>
                                    <input id="dateEstimation" type="hidden" v-model="formAgent.estimatedDate" >
                                    <flat-pickr
                                        v-model="formAgent.estimatedDate"
                                        name="fecha"
                                        class="form-control"
                                        :config="{enableTime: false, time_24hr: false, locale, dateFormat: 'Y-m-d', plugins}"
                                    />
                                </b-form-group>
                            </validation-provider>
                        </b-col>
                    </b-row>
                </validation-observer>
            </div>
            <div v-else-if="validateMetodPayment()===2">
                <validation-observer ref="paymentMethod2">
                    <div class="form__payment">
                        <b-row md="12" lg="12">
                            <b-col md="12" lg="4">
                                <validation-provider #default="{ errors }" name="Numero pagos" rules="required">
                                    <b-form-group>
                                        <label for="Npagos" class="required">N. Pagos</label>
                                        <b-form-input 
                                            id="Npagos" type="number" 
                                            :state="errors.length > 0 ? false : null"
                                            v-model="formAgent.numPayment" 
                                            @change="generateArrayDates()"
                                        />
                                    </b-form-group>
                                </validation-provider>
                            </b-col>
                        </b-row>
                        <div  class="list__items-payments">
                            <b-col v-for="(item,index) in  this.formAgent.estimatedDate" :key="index" class="item_payment">
                                <b-col  md="12" lg="12">
                                    <validation-provider #default="{ errors }" :name="item.name" rules="required">
                                        <b-form-group :state="errors.length > 0 ? false : null">
                                            <label :for="item.name" class="required">{{item.name}} pago</label>
                                            <input :id="item.name" type="hidden" v-model="item.date" >
                                            <flat-pickr
                                                v-model="item.date"
                                                :name="item.name"
                                                class="form-control"
                                                :config="{enableTime: false, time_24hr: false, locale, dateFormat: 'Y-m-d', plugins}"
                                            />
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                                <b-col  md="12" lg="12">
                                    <validation-provider #default="{ errors }" :name="`price${index}`" rules="required">
                                        <b-form-group>
                                            <label :for="`price${index}`" class="required">Pago</label>
                                            <b-input-group prepend="$" append="COP" >
                                            <Cleave
                                                :id="`price${index}`"
                                                class="form-control"
                                                v-model="item.price"
                                                :raw="true"
                                                :options="numberFormat"
                                                :class="{ 'is-invalid': errors.length > 0 }"
                                            ></Cleave>
                                            </b-input-group>   
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                            </b-col>
                        </div>
                    </div>
                </validation-observer>
            </div>
        </div>
    </div>
</template>

<script>
import Cleave from "vue-cleave-component";
import vSelect from "vue-select";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate";
import VModal from "@/views/componente/vModal";

import mixinCreateTransaction from "./mixinCreateTransaction";
import flatPickr from "vue-flatpickr-component";
import modalMembership from "@/views/admin/gestionMembresias/modalMembership.vue";

export default {
    mixins:[mixinCreateTransaction],
    components:{
        vSelect,
        Cleave,
        flatPickr,
        ValidationProvider,
        ValidationObserver,
        modalMembership,
        VModal,
    },
    data() {
        return {
            modalSelectAgent:false
        }
    },
    computed:{
        helpers(){
            return this.$store.state.appConfiguracion.options;
        },
        allAgents(){
            return this.helpers.agentes.map((agente) =>{
                return {'name':agente.primer_nombre, 'id':agente.id}
            })
        },
        isStateFormDetail(){
            return this.$store.state.appTransactions.isValidateFormDetail
        },
        optionsPayment(){
            return this.$store.state.appTransactions.optionsPayment
        },
    },
    watch:{
        ['formAgent.agentPayments'](){
            this.changeMethodPayments()
            this.$emit('changePayments', this.index)
        },
        agentSelected(){
            this.formAgent.userId=this.agentSelected
        }
    },
    props:{
        index:{
            type:Number
        },
        isAdmin:{
            type:Boolean
        },
        agentSelected:{
            type:String,
            default:null
        }
    },
    components:{
    vSelect,
    ValidationProvider,
    ValidationObserver,

    
    flatPickr,
    Cleave
},
    mounted() {
        this.watchForm()
        this.$parent.$on('validateFormAgent', this.validationFormAgent);
    },
    methods: {
        getInfoAgent(){
            let value = this.$refs["tableAgents"].getInfoAgent();
            this.agenElitetSelected=value
            this.modalAgentElite=false;
        },
        openModalAgenteElite(){
            this.modalSelectAgent=true
        }, 
        watchForm(){
            for (let prop in this.formAgent) {
            this.$watch(() => this.formAgent[prop],
                () => {
                    this.$emit('update', this.formAgent[prop],prop)
                }    
            )
            }
        },
        validateMetodPayment(){
            if(this.formAgent.agentPayments){
                return (this.formAgent.agentPayments===1)?1:2
            }
        },
        // async validPaymentAgent(){
        //     let res;
        //     if(this.formAgent.agentPayments){
        //         if(this.formAgent.agentPayments===1){
        //             res= await this.$refs.paymentMethod1.validate().then(success => {
        //                 return (success)?true:false
        //             })
        //             return res;
        //         }else{
        //             res=this.$refs.paymentMethod2.validate().then(success => {
        //                 return (success)?true:false
        //             })
        //             return res;
        //         }
        //     }else{
        //         res= false
        //         return res
        //     }
        // },
        // async validationFormAgent(){
        //     let res= await this.$refs.formAgent.validate().then(success => {
        //         return(success)?true:false
        //     })
        //     return res
        // },
        async validateFullFields(){
            let val1,val2=null;
            let isStateForm=false;
            val1 = new Promise((resolve,reject)=>{
                this.$refs.formAgent.validate().then(success => {
                    if (success) {
                        resolve(true)
                    } else {
                        reject(false)
                    }
                }) 
            })
            if(this.formAgent.agentPayments!=null){
                if(this.formAgent.agentPayments==1){
                    val2 = new Promise((resolve,reject)=>{
                        this.$refs.paymentMethod1.validate().then(success => {
                            if (success) {
                                resolve(true)
                            } else {
                                reject(false)
                            }
                        }) 
                    })
                }else{
                    val2 = new Promise((resolve,reject)=>{
                        this.$refs.paymentMethod2.validate().then(success => {
                            if (success) {
                                resolve(true)
                            } else {
                                reject(false)
                            }
                        }) 
                    })
                }
                await Promise.all([val1, val2])
                    .then(() => {
                        isStateForm=true
                    }).catch(() => {
                        isStateForm=false
                });
            }
            return isStateForm
        }
    }
}
</script>

<style scoped lang="scss">

.form__agent-data{
    display: flex;
    flex-wrap: wrap;
}
.form__agent-payment{
    display: flex;
    flex-direction: column;
    padding:0 1rem;
}
.required {
    span {
        color: red;
    }
}
.required::after {
    content: "*";
    color: #f00;
    margin-left: 6px;
}
.form__payment{
    display: flex;
    flex-direction: column;
}
.list__items-payments{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(250px,350px));
    grid-auto-rows: auto;
    grid-gap: 1.5rem;
}
.item_payment{
    box-shadow: 0 0 5px 5px gray;
    border-radius: 10px;
    padding: 8px;
    width: 350px;
}
</style>