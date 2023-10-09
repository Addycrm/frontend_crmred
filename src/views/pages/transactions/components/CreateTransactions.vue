<template>
    <div id="newTransactions">
        <b-button variant="primary" class="btn__back" @click="backPage()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="16" height="16">
                <path
                    d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            <span>Volver</span>
        </b-button>
        <div class="trans__header">
            <div class="trans__header-left" v-if="dataTransactions">
                <p>Nueva Transacción</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="10" heigth="10">
                    <path
                        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
                <p>{{ dataTransactions.tContractId.name }}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="10" heigth="10">
                    <path
                        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
                <p>{{ dataTransactions.Ttype.name }}</p>
            </div>
            <div class="trans__header-right">
                <b-button variant="success" @click="checkFieldsForm()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="25" height="25">
                        <path
                            d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0l57.4-43c23.9-59.8 79.7-103.3 146.3-109.8l13.9-10.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176V384c0 35.3 28.7 64 64 64H360.2C335.1 417.6 320 378.5 320 336c0-5.6 .3-11.1 .8-16.6l-26.4 19.8zM640 336a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L480 353.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z" />
                    </svg>
                    Enviar para Aprobación
                </b-button>
            </div>
        </div>
        <section class="container__form">
            <section class="form__transactions">
                <div class="form__detail-money">
                    <h4 class="title__form">Detalles</h4>
                    <validation-observer ref="formDetailsPayment">
                        <b-row>
                            <b-col md="12" lg="4">
                                <validation-provider #default="{ errors }" name="Precio" rules="required">
                                    <b-form-group>
                                        <label for="precioSale" class="required">Precio</label>
                                        <b-input-group prepend="$" append="COP" @input="calculatorRateComission()">
                                            <Cleave id="price" class="form-control" v-model="formCreate.price"
                                                :class="{ 'is-invalid': errors.length > 0 }" :raw="true"
                                                :options="numberFormat"></Cleave>
                                        </b-input-group>
                                    </b-form-group>
                                </validation-provider>
                            </b-col>
                            <b-col md="12" lg="4">
                                <validation-provider #default="{ errors }" name="Fecha venta" rules="required">
                                    <b-form-group :state="errors.length > 0 ? false : null">
                                        <label for="dateSale" class="required">Fecha Venta</label>
                                        <input id="dateSale" type="hidden" v-model="formCreate.saleDate">
                                        <flat-pickr v-model="formCreate.saleDate" name="fecha" class="form-control"
                                            :config="{ enableTime: false, time_24hr: false, locale, dateFormat: 'Y-m-d', plugins }" />
                                    </b-form-group>
                                </validation-provider>
                            </b-col>
                            <b-col md="12" lg="4" v-if="optionsTransactions">
                                <validation-provider #default="{ errors }" name="Lado de Transacción" rules="required">
                                    <b-form-group :state="errors.length > 0 ? false : null">
                                        <label for="transaccion" class="required">Lado de Transacción</label>
                                        <v-select id="transaccion" autocomplete="off" v-model="formCreate.transactionSide"
                                            label="name" :options="optionsTransactions" :reduce="(type) => type.id" />
                                    </b-form-group>
                                </validation-provider>
                            </b-col>
                            <b-col md="6" lg="2">
                                <validation-provider #default="{ errors }" name="Tasa Comision" rules="required">
                                    <b-form-group :state="errors.length > 0 ? false : null">
                                        <label for="rateNumber" class="required">Tasa Comision</label>
                                        <b-input-group append="%" @input="calculatorRateComission('rateComssion')">
                                            <b-form-input id="rateNumber" class="form-control"  :state="errors.length > 0 ? false : null"
                                                v-model="formCreate.commissionRate" />
                                        </b-input-group>

                                    </b-form-group>
                                </validation-provider>
                            </b-col>
                            <b-col md="6" lg="4">
                                <validation-provider #default="{ errors }" name="Importe comisión" rules="required">
                                    <b-form-group>
                                        <label for="amountComision" class="required">Importe comisión</label>
                                        <b-input-group prepend="$" append="COP"  @input="calculatorRateComission('commissionAmount')">
                                            <Cleave id="amountComision" class="form-control" :raw="true"
                                                v-model="formCreate.commissionAmount" :options="numberFormat"
                                                :class="{ 'is-invalid': errors.length > 0 }"></Cleave>
                                        </b-input-group>
                                    </b-form-group>
                                </validation-provider>
                            </b-col>
                            <b-col md="6" lg="2">
                                <validation-provider #default="{ errors }" name="Comison agente" rules="required">
                                    <b-form-group :state="errors.length > 0 ? false : null">
                                        <label for="rateNumber" class="required">Comisión Agente</label>
                                        <b-input-group append="%" @input="calculatorCommison()">
                                            <cleave id="rateNumber" class="form-control" :raw="true"
                                                v-model="formCreate.commissionRateAgent" :options="number"
                                                :class="{ 'is-invalid': errors.length > 0 }" />
                                        </b-input-group>
                                    </b-form-group>
                                </validation-provider>
                            </b-col>
                        </b-row>
                    </validation-observer>
                </div>
                <div class="form_payment-transaction">
                    <h4 class="title__form">Forma de pago Transacción</h4>
                    <b-col md="12" lg="12">
                        <div class="form__agent">
                            <validation-observer ref="paymentTransaction">
                                <div class="form__agent-data">
                                    <b-col md="12" lg="4" v-if="optionsPayment">
                                        <validation-provider #default="{ errors }" name="metodo pago"
                                            rules="required">
                                            <b-form-group :state="errors.length > 0 ? false : null">
                                                <label for="payment" class="required">Selecciona Metodo pago</label>
                                                <v-select v-model="formPaymentTransaction.methodPayments"
                                                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="name"
                                                    :options="optionsPayment" :reduce="(type) => type.id" />
                                            </b-form-group>
                                        </validation-provider>
                                    </b-col>
                                    <b-col md="12" lg="4" v-if="optionsTypePayments">
                                        <validation-provider #default="{ errors }" name="forma pago"
                                            rules="required">
                                            <b-form-group :state="errors.length > 0 ? false : null">
                                                <label for="payment" class="required">Selecciona Forma Pago</label>
                                                <v-select v-model="formPaymentTransaction.paymentType"
                                                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="name"
                                                    :options="optionsTypePayments" :reduce="(type) => type.id" />
                                            </b-form-group>
                                        </validation-provider>
                                    </b-col> 
                                    <b-col md="12" lg="4" v-if="formPaymentTransaction.paymentType==1">
                                        <validation-provider #default="{ errors }" name="Lado de Transacción" rules="required">
                                            <b-form-group :state="errors.length > 0 ? false : null">
                                                <label for="transaccion" class="required">Nombre banco</label>
                                                <v-select id="transaccion" autocomplete="off" v-model="formPaymentTransaction.bankId"
                                                    label="name" :options="optionsBanks" :reduce="(type) => type.id" />
                                            </b-form-group>
                                        </validation-provider>
                                    </b-col>
                                </div>
                            </validation-observer>
                            <div class="form__agent-payment">
                                <div v-if="validateMetodPayment() === 1">
                                    <validation-observer ref="paymentTransactionMethod1">
                                        <b-row>
                                            <b-col md="12" lg="6">
                                                <validation-provider #default="{ errors }" name="Precio" rules="required">
                                                    <b-form-group>
                                                        <label for="price" class="required">Precio</label>
                                                        <b-input-group prepend="$" append="COP">
                                                            <Cleave id="price" class="form-control"
                                                                v-model="formPaymentColounmValue.price" :raw="true"
                                                                :options="numberFormat"
                                                                :class="{ 'is-invalid': errors.length > 0 }">
                                                            </Cleave>
                                                        </b-input-group>
                                                    </b-form-group>
                                                </validation-provider>
                                            </b-col>
                                            <b-col md="12" lg="6">
                                                <validation-provider #default="{ errors }" name="Fecha Estimada"
                                                    rules="required">
                                                    <b-form-group :state="errors.length > 0 ? false : null">
                                                        <label for="dateEstimation" class="required">Fecha Estimada</label>
                                                        <input id="dateEstimation" type="hidden"
                                                            v-model="formPaymentColounmValue.estimatedDate">
                                                        <flat-pickr v-model="formPaymentColounmValue.estimatedDate"
                                                            name="fecha" class="form-control"
                                                            :config="{ enableTime: false, time_24hr: false, locale, dateFormat: 'Y-m-d', plugins }" />
                                                    </b-form-group>
                                                </validation-provider>
                                            </b-col>
                                        </b-row>
                                    </validation-observer>
                                </div>
                                <div v-else-if="validateMetodPayment() === 2">
                                    <validation-observer ref="paymentTransactionMethod2">
                                        <div class="form__payment">
                                            <b-row md="12" lg="12">
                                                <b-col md="12" lg="4">
                                                    <validation-provider #default="{ errors }" name="Numero pagos"
                                                        rules="required">
                                                        <b-form-group>
                                                            <label for="Npagos" class="required">N. Pagos</label>
                                                            <b-form-input id="Npagos" type="number"
                                                                :state="errors.length > 0 ? false : null"
                                                                v-model="formPaymentColounmValue.numPayment"
                                                                @change="generateArrayDatesTransactions()" />
                                                        </b-form-group>
                                                    </validation-provider>
                                                </b-col>
                                            </b-row>
                                            <div class="list__items-payments">
                                                <b-col v-for="(item, index) in  this.formPaymentColounmValue.estimatedDate"
                                                    :key="index" class="item_payment">
                                                    <b-col md="12" lg="12">
                                                        <validation-provider #default="{ errors }" :name="item.name"
                                                            rules="required">
                                                            <b-form-group :state="errors.length > 0 ? false : null">
                                                                <label :for="item.name" class="required">{{ item.name }}
                                                                    pago</label>
                                                                <input :id="item.name" type="hidden" v-model="item.date">
                                                                <flat-pickr v-model="item.date" :name="item.name"
                                                                    class="form-control"
                                                                    :config="{ enableTime: false, time_24hr: false, locale, dateFormat: 'Y-m-d', plugins }" />
                                                            </b-form-group>
                                                        </validation-provider>
                                                    </b-col>
                                                    <b-col md="12" lg="12">
                                                        <validation-provider #default="{ errors }" :name="`price${index}`"
                                                            rules="required">
                                                            <b-form-group>
                                                                <label :for="`price${index}`" class="required">Pago</label>
                                                                <b-input-group prepend="$" append="COP">
                                                                    <Cleave :id="`price${index}`" class="form-control"
                                                                        v-model="item.price" :raw="true"
                                                                        :options="numberFormat"
                                                                        :class="{ 'is-invalid': errors.length > 0 }">
                                                                    </Cleave>
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
                    </b-col>
                </div>
                <div class="form__detail-agent">
                    <h4 class="title__form">Forma pago Agentes</h4>
                    <ul class="detail-agent__list">
                        <li v-for="(agent, index) in ArrayAgents" :key="index">
                            <div class="agent-list__header">
                                <h5>Agente: {{ index + 1 }}</h5>
                                <button class="list-header__icon" :class="[(index > 0) ? 'active' : '']"
                                    @click="deleteAgent(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path
                                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                    </svg>
                                </button>
                            </div>
                            <div class="d-flex align-items-center flex-wrap mb-1" v-if="isAdmin">
                                <b-col md="12" lg="3" >
                                    <b-button class="mr-1 text-nowrap" variant="success" 
                                        @click="openModalAgenteElite(index)"
                                        >
                                        Seleccionar Agente
                                    </b-button>
                                </b-col>
                            </div>
                            <FormAddAgent 
                                ref="formAddgent" 
                                :index="index"
                                :isAdmin="isAdmin"
                                :agentSelected="agentSelected[index]"
                                @update="(value, target) => updateAgent(value, target, index)"
                                @changePayments="changePayments" />
                        </li>
                    </ul>
                    <b-button variant="primary" @click="addAgent()" class="btn__add">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" heigth="16">
                            <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg>
                        Añadir Agente
                    </b-button>
                </div>

            </section>
            <aside class="form__aside">
                <p>Resumen Transacción</p>
                <ul class="form__aside-list">
                    <li>
                        <span>Empresa</span>
                        <span>
                            {{ currencyFormat(transactionAgentCompanyPorcentage.companyMoneyAmount) }}
                            <strong v-if="transactionAgentCompanyPorcentage.companyMoneyAmount"
                                style="color: var(--primary);">
                                ({{ formCreate.commissionRateCompany }}%)
                            </strong>
                        </span>
                    </li>
                    <li>
                        <span>Agente</span>
                        <span>
                            {{ currencyFormat(transactionAgentCompanyPorcentage.agentMoneyAmount) }}
                            <strong v-if="transactionAgentCompanyPorcentage.agentMoneyAmount"
                                style="color: var(--primary);">
                                ({{ formCreate.commissionRateAgent }}%)
                            </strong>
                        </span>
                    </li>
                    <li class="line"></li>
                    <li>
                        <span>Total</span>
                        <strong style="color: var(--primary);">
                            {{ currencyFormat(transactionAgentCompanyPorcentage.totalAmount) }}
                        </strong>
                    </li>
                </ul>
            </aside>
        </section>
        <!-- MODAL SELECCIONAR AGENTE ELITE -->
        <transition name="fade">
            <v-modal v-if="modalSelectAgent" @close="modalSelectAgent = false" titulo="Seleccionar agente elite" size="lg" footer>
                <component is="modalMembership" elegir :rango="false"  ref="tableAgents" />
                <template #footer>
                    <b-button variant="success" @click="getInfoAgent()">
                        Seleccionar
                    </b-button>
                </template>
            </v-modal>
        </transition>
    </div>
</template>

<script>
import Cleave from "vue-cleave-component";
import flatPickr from "vue-flatpickr-component";
import vSelect from "vue-select";
import {
    ValidationProvider,
    ValidationObserver,
} from "vee-validate";

// MIXINS
import mixinCreateTransaction from './mixinCreateTransaction'
import VModal from "@/views/componente/vModal";

import FormAddAgent from "./FormAddAgent.vue";
import paymentTransaction from "./paymentTransaction.vue";
import modalMembership from "@/views/admin/gestionMembresias/modalMembership.vue";

export default {
    mixins: [mixinCreateTransaction],
    data() {
        return {
            indexAgent:0,
            agentSelected:[''],
            modalSelectAgent:false,
            isAdmin:false,
            isFormDetail: false,
            isFormAgents: false,
            isFormPaymentTransaction:false,
            dataTransactions: null,
        }
    },
    components: {
        vSelect,
        Cleave,
        flatPickr,
        ValidationProvider,
        ValidationObserver,
        FormAddAgent,
        paymentTransaction,
        VModal,
        modalMembership
    },
    computed: {
        helpers() {
            return this.$store.state.appConfiguracion.options;
        },
        allAgents() {
            return this.helpers.agentes.map((agente) => {
                return { 'name': agente.primer_nombre, 'id': agente.id }
            })
        },
        optionsTransactions() {
            return this.$store.state.appTransactions.optionsTransactions;
        },
        optionsPayment() {
            return this.$store.state.appTransactions.optionsPayment;
        },
        optionsBanks() {
            return this.$store.state.appTransactions.optionsBanks;
        },
        optionsTypePayments() {
            return this.$store.state.appTransactions.optionsTypePayments;
        }
    },
    created() {
        this.dataTransactions = JSON.parse(localStorage.getItem('ordenTransaction'))
        this.isAdmin= this.$can('transaction_select_elite', 'transaction')
        this.$store.dispatch("appTransactions/getoOptionsTransactions")
        this.$store.dispatch("appTransactions/getOptionsPayment")
        this.$store.dispatch("appTransactions/getOptionsBanks")
        this.$store.dispatch("appTransactions/getOptionsTypePayments")
    },
    watch: {
        ['formCreate.commissionRate']() {
            if (Number(this.formCreate.commissionRate) >= 100) {
                this.formCreate.commissionRate = 100
            }
        }
    },
    methods: {
        getInfoAgent(){
            let value = this.$refs["tableAgents"].getInfoAgent();
            this.agentSelected[this.indexAgent]=value.id.toString();
            this.modalSelectAgent=false;
        },
        openModalAgenteElite(index){
            this.indexAgent=index
            this.modalSelectAgent=true
        }, 
        validateMetodPayment() {
            if (this.formPaymentTransaction.methodPayments) {
                return (this.formPaymentTransaction.methodPayments === 1) ? 1 : 2
            }
        },
        changePayments(index) {
            this.ArrayAgents[index].agentPaymentsColounmValue = {}
        },
        async checkFieldsForm() {
            await this.checkFieldsAgent();
            await this.checkFieldsDetails();
            await this.checkFieldsPaymentTransaction();
            setTimeout(() => {
                this.validateForm()
            }, 1000);
        },
        async checkFieldsPaymentTransaction(){
            let val1,val2=null
            val1 = new Promise((resolve,reject)=>{
                this.$refs.paymentTransaction.validate().then(success => {
                    if (success) {
                        resolve(true)
                    } else {
                        reject(false)
                    }
                }) 
            })
            if(this.formPaymentTransaction.methodPayments!=null){
                if(this.validateMetodPayment() ==1){
                    val2 = new Promise((resolve,reject)=>{
                        this.$refs.paymentTransactionMethod1.validate().then(success => {
                            if (success) {
                                resolve(true)
                            } else {
                                reject(false)
                            }
                        }) 
                    })
                }else{
                    val2 = new Promise((resolve,reject)=>{
                        this.$refs.paymentTransactionMethod2.validate().then(success => {
                            if (success) {
                                resolve(true)
                            } else {
                                reject(false)
                            }
                        }) 
                    })
                }
                Promise.all([val1, val2])
                    .then(response => {
                        this.isFormPaymentTransaction=true
                    }).catch(reason => {
                        this.isFormPaymentTransaction=false
                });
            }


        },
        async checkFieldsDetails() {
            await this.$refs.formDetailsPayment.validate().then(success => {
                if (success) {
                    this.isFormDetail = true
                } else {
                    this.isFormDetail = false
                }
            })
        },
        async checkFieldsAgent() {
            this.isFormAgents = true
            await this.$refs["formAddgent"].forEach(async (item) => {
                let res = await item.validateFullFields()
                if (!res) {
                    this.isFormAgents = false
                }
            })
        },
        validateForm() {
            if (this.isFormDetail && this.isFormAgents && this.isFormPaymentTransaction) {
                // this.showAlert({
                //     title: 'Enviado',
                //     text: 'Se ha enviado correctamente la transacción.',
                //     variant: "success"
                // })
                this.sendFormTransactions()

            } else {
                this.showAlert({
                    title: 'Algo salio mal',
                    text: 'Faltan Campos por llenar, valida nuevamente.',
                    variant: "danger"
                })
            }
        },

    }
}
</script>

<style scoped lang="scss">
#newTransactions {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
    border-radius: 15px;
    background-color: white;

    p {
        margin: 0;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
    }
}
.btn__back {
    max-width: 120px;
    svg {
        fill: white;
    }
}
.title__form{
    color: var(--primary);
    font-weight: bold;
}
.trans__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.trans__header-left {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    p {
        font-size: 18px;
        font-weight: bold;
    }

    svg {
        fill: var(--primary);
    }
}

.trans__header-right {
    svg {
        fill: white;
    }
}
.required::after {
    content: "*";
    color: #f00;
    margin-left: 6px;
}

.container__form {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
}

.form__transactions {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.form__detail-money {
    padding: 24px 36px;
    border-radius: 10px;
    border: 2px solid var(--primary);
    box-shadow: 0 0 15px var(--primary);
}

.form__detail-agent,
.form_payment-transaction {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 24px 36px;
    border-radius: 10px;
    border: 2px solid var(--primary);
    box-shadow: 0 0 15px var(--primary);

    .btn__add {
        svg {
            fill: white;
        }
    }
}

.detail-agent__list {
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.agent-list__header {
    display: flex;
    justify-content: space-between;
}

.list-header__icon {
    display: none;
    background: none;
    border: none;

    svg {
        width: 25px;
        height: 25px;
        fill: red;
    }
}

.list-header__icon.active {
    display: block;
}

.form__aside {
    min-width: 300px;
    max-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid var(--primary);
    border-radius: 10px;
    box-shadow: 0 0 15px var(--primary);

    p {
        font-size: 14px;
        color: var(--primary);
        width: 100%;
        padding-bottom: 0.5rem;
        font-weight: bold;
    }

}

.line {
    border-bottom: 2px solid var(--primary);
}

.form__aside-list {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;

    li {
        display: flex;
        justify-content: space-between
    }
}
.form__agent-data{
    display: flex;
    flex-wrap: wrap;
}

.list__items-payments {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
    grid-auto-rows: auto;
    grid-gap: 1.5rem;
}

.item_payment {
    box-shadow: 0 0 5px 5px gray;
    border-radius: 10px;
    padding: 8px;
    width: 350px;
}

@media (max-width:850px) {
    .container__form {
        flex-direction: column;
        align-items: center;
    }

    .form__aside {
        order: 1;
        max-width: 500px;
    }

    .form__transactions {
        order: 2;
        max-width: 500px;
    }

    .trans__header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }

    .trans__header-right {
        align-self: center;
    }
}

@media (max-width:420px) {
    .form__aside {
        width: 100%;
    }
}
</style>

