
<template>
    <div>
        <b-modal :id="infoModal.id" :ref="infoModal.id" hide-footer size="lg" @ok="createTransactios" ok-title=""
            cancel-title="Cancelar" centered no-close-on-backdrop>
            <template #modal-title>
                <span>
                    <h1><strong>Paga con Nequi</strong></h1>
                </span>
            </template>
            <b-form>
                <b-form-group label="Número celular de tu cuenta Nequi" label-for="v-celular">
                    <validation-provider #default="{ errors }" name="celular|min:13" rules="required">
                        <vue-phone-number-input default-country-code="CO" :translations="{
                            countrySelectorLabel: 'Codigo pais',
                            countrySelectorError: 'Choisir un pays',
                            phoneNumberLabel: 'Numéro de Celular',

                            example: 'Ejemplo :',
                        }" v-model="transactions.payment_method.phone_number" @update="results = $event" />
                        <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                            campo requerido
                        </b-form-invalid-feedback>
                    </validation-provider>
                </b-form-group>

                <b-form-group>
                    <span>Recibiras una <strong>notificación push</strong> en tu celular.</span>
                </b-form-group>

                <b-form-group>
                    <b-form-checkbox id="register-privacy-policy" name="checkbox-1">
                        Acepto haber leído los <b-link :href="permalink" target="_blank">términos y condiciones y la
                            política de
                            privacidad</b-link> para hacer
                        este pago.

                    </b-form-checkbox>
                </b-form-group>

                <b-form-group>
                    <div class="demo-inline-spacing"> <b-button variant="outline-danger" block
                            @click="hideModal">Cancelar</b-button>
                        <b-button variant="primary" block @click="createTransactiosCrmred">Continuar con tu
                            pago de ${{ price_banck }} COP</b-button>
                    </div>
                </b-form-group>
            </b-form>
        </b-modal>
        <modalWithTimer ref="modalWithTimer"></modalWithTimer>

    </div>
</template>

<script>
import {
    BFormInput, BFormGroup, BButton, BRow, BCol, BCardText,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import modalWithTimer from "../components/modalWithTimer.vue";
import Ripple from 'vue-ripple-directive'


export default {
    directives: {
        Ripple,
    },
    components: {
        BFormInput,
        BFormGroup,
        BButton,
        BCardText,
        BRow,
        BCol,
        ValidationProvider,
        ValidationObserver,
        modalWithTimer
    },
    props: {
        price: {
            type: Number,
            default: 0
        }
    },
    computed: {
        price_banck() {
            return this.$store.state.appBancks.price;
        }
    },

    data() {
        return {
            locale: 'en',
            status: false,
            permalink: "",
            showForm: true,
            showTimer: false,
            minutes: 10,
            seconds: 0,
            timer: null,
            payment_method: null,
            transactions: {
                acceptance_token: "",
                amount_in_cents: 0,
                currency: "COP",
                customer_email: "",
                payment_method_server: null,
                payment_method:
                {
                    type: "NEQUI",
                    phone_number: ""
                }
            },
            infoModal: {
                id: "modal-nequi",
                title: "",
                content: {},
                contentPreguntas: {},
            },
        }
    },

    methods: {
        info(button, code) {
            this.transactions.payment_method_server = code
            this.getTokensTransactios()
            this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        },
        showModal() {
            this.$refs[this.infoModal.id].show()
        },
        hideModal() {
            this.$refs[this.infoModal.id].hide()
        },
        infoModalTime() {
            this.$refs.modalWithTimer.showModal();
        },
        infoModalTimeCloce() {
            this.$refs.modalWithTimer.hideModal();
        },

        async createTransactiosCrmred() {
            const acceptanceToken = await this.$store.state.appPayment.acceptance_token;
            const price = await this.$store.state.appBancks.price;
            const userdata = await this.$store.state.userData.userData;
            this.transactions.acceptance_token = acceptanceToken
            this.transactions.amount_in_cents = Number(price)
            this.transactions.customer_email = userdata.email
            this.transactions.payment_method.phone_number = this.transactions.payment_method.phone_number.replace(/\s+/g, '');

            await this.$store.dispatch("appBancks/createTransactions", this.transactions).then((res) => {
                this.transactions.reference = res.reference
                this.createTransactios(this.transactions);
            }).catch(() => {
            });

        },
        async createTransactios(transactions) {
            let price = transactions.amount_in_cents.toString();
            transactions.amount_in_cents = parseInt(price + "00");
            await this.$store.dispatch("appPayment/createTransactios", transactions)
                .then(() => {
                    this.hideModal();
                    this.infoModalTime();
                    return this.getTransactios();
                }).catch(err => {
                    this.getToast(err)
                });
        },

        async getTokensTransactios() {
            await this.$store.dispatch("appPayment/getTokensTransactios")
                .then((response) => {
                    this.permalink = response.permalink;
                }).catch(err => {
                    this.getToast(err)
                });

        },
        async getTransactios() {
            const idTransactions = this.$store.getters['appPayment/getIdTransactions'];
            let response = '';
            let startTime = Date.now();
            let count = 0;

            while (response !== 'ACEPT' && (Date.now() - startTime) < 6000000) {
                try {
                    response = await this.$store.dispatch('appPayment/getTransactios', idTransactions);
                    if (response === 'ERROR') {
                        this.hideModal();
                        this.infoModalTimeCloce()
                        this.getToast("Error en transaccion Nequi", "Error", "error")

                        break
                    }

                    if (response === 'DECLINED') {
                        this.hideModal();
                        this.infoModalTimeCloce()
                        this.getToast("La transacción fue cancelada", "Cancelada",  "warning")
                        break
                    }

                    if (response === 'APPROVED') {
                        this.$store.commit('appPayment/SET_TRANSACTION', this.transactions);
                        this.hideModal();
                        this.infoModalTimeCloce()
                        this.$root.$emit("sendUserForm");
                        this.getToast("Aprovaste la transaccion, Excelente!!!", "success")
                        break
                    }

                    if (response === 'PENDING') {
                        await new Promise(resolve => setTimeout(resolve, 500));
                    }
                } catch (err) {
                    return getToast(err)
                }

                count++;
            }
            if (response !== 'ACEPT') {
                console.log('El tiempo máximo de espera ha sido alcanzado');
            }
        },

        getToast(text, title, color) {
            this.$swal({
                title,
                text,
                icon: color,
                confirmButtonText: "Cerrar",
                customClass: {
                    confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
            });
        }

    },
}
</script>
