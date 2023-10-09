<template>
    <div id="detailTransaction" >
        <div class="transaction__header"  ref="PDF-table__header">
            <div class="container_left">
                <h4 class="left__title ">
                    {{ propsDetail.inmueble.titulo_inmueble }}
                </h4>
                <p>
                    <span>
                        <b-badge :variant="stateTransaction(  propsDetail.transaction_state.id)">
                            {{  propsDetail.transaction_state.name }}
                        </b-badge>
                    </span>
                </p>
                <p v-if="propsDetail.id">
                    <span>
                        ID Transacción:
                    </span>
                    <span class="color__primary">
                        {{ propsDetail.id }}
                    </span>
                </p>
                <p v-if="propsDetail.inmueble.id">
                    <span>
                        ID Inmueble:
                    </span>
                    <span class="color__primary">
                        {{ propsDetail.inmueble.id }}
                    </span>
                </p>
                <p v-if="propsDetail.inmueble.direccion">
                    <span>
                        Dirección:
                    </span>
                    <span class="color__primary">
                        {{ propsDetail.inmueble.direccion }}
                    </span>
                </p>
                <p v-if="propsDetail.transactions_form.price">
                    <span>
                        Precio transacción: $
                    </span>
                    <span class="color__primary">
                        {{ currencyFormat(propsDetail.transactions_form.price) }}
                    </span>
                </p>
            </div>
            <div class="container__aside">
                <aside class="form__aside" v-if="propsDetail.transaction_agent_company_porcentage">
                    <p>Resumen Transacción</p>
                    <ul class="form__aside-list">
                        <li v-if="propsDetail.transaction_agent_company_porcentage.company_money_amount">
                            <span>Empresa</span>
                            <span>
                                {{ currencyFormat(propsDetail.transaction_agent_company_porcentage.company_money_amount) }}
                                <strong style="color: var(--primary);">
                                    ({{ propsDetail.transactions_form.company_percentage }}%)
                                </strong>
                            </span>
                        </li>
                        <li v-if="propsDetail.transaction_agent_company_porcentage.agent_money_amount">
                            <span>Agente</span>
                            <span>
                                {{ currencyFormat(propsDetail.transaction_agent_company_porcentage.agent_money_amount) }}
                                <strong style="color: var(--primary);">
                                    ({{ propsDetail.transactions_form.agent_percentage }}%)
                                </strong>
                            </span>
                        </li>
                        <li class="line"></li>
                        <li>
                            <span>Total</span>
                            <strong style="color: var(--primary);">
                                {{ currencyFormat(propsDetail.transaction_agent_company_porcentage.total_amount) }}
                            </strong>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
        <div class="container__btn-change" v-if="isAdmin">
            <!-- <b-button variant="success" @click="handleSendTransaction('APROBAR')">
                Aprobar Transaccion
            </b-button>
            <b-button variant="danger" @click="handleSendTransaction('RECHAZAR')">
                Rechazar Transaccion
            </b-button> -->
            <h4 class="title">Cambiar estado Transacción</h4>
            <v-select id="transaccion" autocomplete="off" v-model="stateNewTransaction" class="select-change"
                label="name" :options="optionsStateTransactions" />
            <b-button variant="success"
                @click="handleSendTransaction({ name: stateNewTransaction.name, id: propsDetail.id, idState: stateNewTransaction.id })">
                Cambiar estado
            </b-button>

        </div>
        <div class="container__tables" ref="PDF-table__transaction">
            <div class="tables__left" >
                <div v-if="isAdmin" class="table__agent-elite" >
                    <h4>Detalles Agente Elite</h4>
                    <div class="table__detail">
                        <div class="meta__row" v-if="propsDetail.user_id.id">
                            <span class="label">ID Agente:</span>
                            <span class="value">{{ propsDetail.user_id.id }}</span>
                        </div>
                        <div class="meta__row" v-if="propsDetail.user_id.userdata.primer_nombre">
                            <span class="label">Nombre agente:</span>
                            <span class="value">
                                {{propsDetail.user_id.userdata.primer_nombre }}
                            </span>
                        </div>
                        <!-- <div class="meta__row">
                            <span class="label">Nombre empresa:</span>
                            <span class="value">
                                {{ propsDetail.transactions_form.sale_date }}
                            </span>
                        </div> -->
                        <div class="meta__row" v-if="propsDetail.user_id.email">
                            <span class="label">Correo:</span>
                            <span class="value">
                                {{ propsDetail.user_id.email }}
                            </span>
                        </div>
                        <div class="meta__row" v-if="propsDetail.user_id.userdatacelular_whatsapp ">
                            <span class="label">Celular (WhatsApp):</span>
                            <span class="value">
                                {{ propsDetail.user_id.userdatacelular_whatsapp }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="table__transaction">
                    <h4>Detalles General Transacción</h4>
                    <div class="table__detail">
                        <div class="meta__row">
                            <span class="label">ID Transacción:</span>
                            <span class="value" v-if="propsDetail.id">{{ propsDetail.id }}</span>
                        </div>
                        <div class="meta__row" v-if="propsDetail.transactions_form.price">
                            <span class="label">Precio transacción:</span>
                            <span class="value">
                                $ {{ currencyFormat(propsDetail.transactions_form.price) }}
                            </span>
                        </div>
                        <div class="meta__row">
                            <span class="label">Fecha venta:</span>
                            <span class="value">
                                {{ propsDetail.transactions_form.sale_date }}
                            </span>
                        </div>
                        <div class="meta__row">
                            <span class="label">Tipo contrato:</span>
                            <span class="value">
                                {{ propsDetail.contract_type.name }}
                            </span>
                        </div>
                        <div class="meta__row">
                            <span class="label">Tipo transacción:</span>
                            <span class="value">
                                {{ propsDetail.transaction_type.name }}
                            </span>
                        </div>
                        <div class="meta__row">
                            <span class="label">Tasa comisón:</span>
                            <span class="value" v-if="propsDetail.transactions_form.commission_rate">
                                {{ propsDetail.transactions_form.commission_rate }} %
                            </span>
                        </div>
                        <div class="meta__row">
                            <span class="label">Importe comisión:</span>
                            <span class="value" v-if="propsDetail.transactions_form.commission_amount">
                                {{
                                    currencyFormat(propsDetail.transactions_form.commission_amount)
                                }}</span>
                        </div>
                        <!-- <div class="meta__row" v-if="propsDetail.transactions_form.agent_percentage">
                            <span class="label">Comisión agente:</span>
                            <span class="value">{{ propsDetail.transactions_form.agent_percentage }}</span>
                        </div> -->
                    </div>
                </div>
            </div>
            <div>
                <div class="table_payment" v-if="paymentForm" >
                    <h4>Forma Pago Transacción</h4>
                    <div class="table__detail">
                        <div class="meta__row">
                            <span class="label">Metodo Pago:</span>
                            <span class="value">{{ paymentForm.method_payment.name }}</span>
                        </div>
                        <div class="meta__row">
                            <span class="label">Forma Pago:</span>
                            <span class="value">
                                {{ paymentForm.payment_type.name }}
                            </span>
                        </div>
                        <div class="meta__row" v-if="paymentForm.payment_type.id == 1">
                            <span class="label">Nombre Banco:</span>
                            <span class="value">
                                {{ paymentForm.bank_id.name }}
                            </span>
                        </div>
                        <div class="meta__row">
                            <span class="label">Pagos:</span>
                            <span class="value">
                                <div v-if="paymentForm.method_payment.id == 1">
                                    <p class="transaction__item">
                                        <span class="label">Fecha: </span>
                                        <span>{{ paymentForm.agent_payments_colounm_value.estimatedDate }}</span>
                                    </p>
                                    <p class="transaction__item">
                                        <span class="label">Precio: </span>
                                        <span>{{ currencyFormat(paymentForm.agent_payments_colounm_value.price) }}</span>
                                    </p>
                                </div>
                                <div v-else>
                                    <div class="transactions-list__items">
                                        <div class="transaction__item"
                                            v-for="(payment, index) in paymentForm.agent_payments_colounm_value.estimatedDate"
                                            :key="index">
                                            <p>
                                                <span class="label">{{ payment.name }}:</span>
                                                <span>{{ payment.date }}</span>
                                            </p>
                                            <p>
                                                <span class="label">Precio: </span>
                                                <span>{{ currencyFormat(payment.price) }}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="table__agents" ref="PDF-table__agent">
            <h4>Forma Pago Agentes</h4>
            <b-table striped hover :items="propsDetail.transactions_form.transactions_form_agent" :fields="fields"
                selectable responsive select-mode="single">
                <template #cell(idUser)="data">
                    <span v-if="data.item.agent_payments">{{ data.item.agent_payments.id}}</span>
                </template>
                <template #cell(name)="data">
                    <span v-if="data.item.user_id">{{ data.item.user_id.userdata.primer_nombre }}</span>
                </template>
                <template #cell(payment)="data">
                    <span v-if="data.item.agent_payments">{{ data.item.agent_payments.name }}</span>
                </template>
                <template #cell(transaction)="data">
                    <div v-if="data.item.agent_payments.id == 1">
                        <p class="transaction__item">
                            <span class="label">Fecha: </span>
                            <span>{{ data.item.agent_payments_colounm_value.estimatedDate }}</span>
                        </p>
                        <p class="transaction__item">
                            <span class="label">Precio: </span>
                            <span>{{ currencyFormat(data.item.agent_payments_colounm_value.price) }}</span>
                        </p>
                    </div>
                    <div v-else>
                        <div class="transactions-list__items">
                            <div class="transaction__item"
                                v-for="(payment, index) in data.item.agent_payments_colounm_value.estimatedDate"
                                :key="index">
                                <p>
                                    <span class="label">{{ payment.name }} </span>
                                    <span>{{ payment.date }}</span>
                                </p>
                                <p>
                                    <span class="label">Precio: </span>
                                    <span>{{ currencyFormat(payment.price) }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </template>
            </b-table>
        </div>
        <div class="d-flex justify-content-center">
            <b-button variant="success" @click="DownloadPDF()" class="btn__print btn__disable">
                <div class="spinner-border text-primary" role="status" v-if="isLoadingPDF">
                    <span class="sr-only">Loading...</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="btn__print-icon" v-else>
                    <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                </svg>
                <span>DESCARGAR PDF</span>
            </b-button>
        </div>
        <footer class="footer-main" ref="footer">
            <p>CRM Red © 2023</p>
        </footer>
    </div>
</template>

<script>
import vSelect from "vue-select";
import mixinTransactions from "@/views/pages/transactions/mixinTransactions.js"
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

export default {
    mixins: [mixinTransactions],
    data() {
        return {
            newPDF:null,
            isLoadingPDF:false,
            stateNewTransaction: {},
            isAdmin: false,
            paymentForm: null,
            fields: [
                {
                    key: 'idUser', label: 'ID'
                },
                {
                    key: 'name', label: 'NOMBRE'
                },
                {
                    key: 'payment', label: 'METODO PAGO'
                },
                {
                    key: 'transaction', label: 'FORMA PAGO'
                },
            ],
            
        }
    },
    components: {
        vSelect
    },
    props: {
        propsDetail: {
            type: Object,
            default: null
        }
    },
    created() {
        this.isAdmin = this.$can('transaction_management', 'transaction')
        this.paymentForm = this.propsDetail.transactions_form.transactions_payment_form[0];
        this.stateNewTransaction = { ...this.propsDetail.transaction_state }
        this.newPDF = new jsPDF({unit: 'pt', format: 'a4'});

    },
    computed: {
        optionsStateTransactions() {
            return this.$store.state.appTransactions.optionsStateTransactions;
        }
    },
    methods: {
        async DownloadPDF(){
            this.isLoadingPDF=true
            let arrayPDF = [
                {
                    ref:'PDF-table__header',
                    factor:1
                },
                {
                    ref:'PDF-table__transaction',
                    factor:0.7
                },
                {
                    ref:'PDF-table__agent',
                    factor:1
                }
            ];
            let pageHeight = this.newPDF.internal.pageSize.height; // Tamaño de una pagina
            let pageWidth = this.newPDF.internal.pageSize.width-40; // Tamaño de una pagina
            let posicion=30 //posicion inical de la imagen
            let canvasAdd=null; //copia imagene
            let pageHeightLeft = pageHeight-100; //nos permitira identificar el espacio restamte de la hoja
            let factor=0 // si la imagen es mayor a la pagina

            //recorrer todas las tablas y pasarlas a imagen
            for (let i = 0; i < arrayPDF.length; i++) {
                await html2canvas(this.$refs[arrayPDF[i].ref],{ useCORS: true ,allowTaint:true,scale:1}).then(function(canvas) {
                        canvasAdd = canvas
                });
                const {width, height} = canvasAdd;
                //si la imagen tiene un ancho mayor a la de la hoja, aplicamos un factor de conversion
                width=width*arrayPDF[i].factor
                height=height*arrayPDF[i].factor

                if(width>pageWidth){
                    factor =pageWidth/width
                    width=width*factor
                    height=height*factor
                }
                //nos permitira añadir hojas cuando no tegan espacio la hoja actial
                if (pageHeightLeft - height <= 0) {
                    this.newPDF.addPage();
                    posicion = 30; // Pintaremos en el inicio de la nueva pagina
                    pageHeightLeft = pageHeight-100; //le quitamos el alto del footer
                }
                this.newPDF.addImage(canvasAdd, 'JPG', 20, posicion, width, height);
                posicion += height+20;
                pageHeightLeft -= height;
            }
            await this.footerPDF()
            this.newPDF.save(`${this.propsDetail.inmueble.titulo_inmueble}-transaction.pdf`);
            this.isLoadingPDF=false
        },
        async footerPDF(){
            let pageCount = this.newPDF.internal.getNumberOfPages()
            for (var i = 1; i <= pageCount; i++) {
                this.newPDF.setPage(i)
                let canvasAdd=null;
                await html2canvas(this.$refs.footer,{ windowWidth: 600, useCORS: true ,allowTaint:true,scale:1}).then(function(canvas) {
                    canvasAdd = canvas
                })
                const {width, height} = canvasAdd;
                this.newPDF.addImage(
                    canvasAdd, 'JPG',
                    0, 
                    this.newPDF.internal.pageSize.height-height, 
                    this.newPDF.internal.pageSize.width, 
                    height
                );
            }
        }

    },
}
</script>

<style scoped lang="scss">
#detailTransaction {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem 0;

    p {
        margin: 0;
    }
}

.container__tables {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 2rem;

}
.tables__left{
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.table__detail {
    display: flex;
    flex-direction: column;
}

.meta__row {
    display: flex;
    justify-content: space-between;
    padding: 8px;

    .label {
        color: var(--primary);
        font-weight: bold;
    }
}

.meta__row:nth-child(odd) {
    background: #f0f0f0;
}

.meta__row:nth-child(even):last-child {
    border-bottom: 1px solid #f0f0f0;
}

.transaction__header {
    display: flex;
    justify-content: space-between;
}

.color__primary {
    color: var(--primary);
    font-weight: bold;
}

.container_left {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    p {
        font-size: 16px;
    }
}

.container__btn-change {
    display: flex;
    flex-direction: column;
    width: auto;
    gap: 0.5rem;

    button {
        max-width: 160px;
    }

    .title {
        margin: 0;
        color: var(--primary);
    }

    .select-change {
        max-width: 200px;
    }
}

.container__aside {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    .aside__title {
        padding: 8px 6px;
        border: 3px solid var(--primary);
        border-radius: 8px;
        box-shadow: 10px 2px 20px 2px gray;

        .title {
            color: var(--primary);
            font-weight: bold;
        }
    }
}

.form__aside {
    min-width: 300px;
    max-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: white;
    border: 2px solid var(--primary);
    border-radius: 10px;

    ul {
        padding: 0;
    }

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

.transaction__item {
    font-weight: bold;

    .label {
        color: var(--primary);
    }
}

.transactions-list__items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.footer-main{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top: 4px solid #7367f0;
    background-color:#ebe9f1;
    padding: 10px;
    color: #7367f0;
    font-weight: bold;
}
.btn__print{
    display: flex;
    align-items: center;
    gap: 4px;
    max-width: 230px;
}
.btn__print-icon{
    width: 30px;
    height: 25px;
    fill: white;
}
@media (max-width:850px) {
    .btn__disable{
        display: none;
    }
}

@media (max-width:770px) {
    .transaction__header {
        flex-direction: column;
        gap: 1.5rem;
    }
}
</style>
