<template>
    <div>
        <validation-observer ref="simpleRules">
            <b-form>
                <b-row class="container-form">
                    <b-col md="7">
                        <b-form-group label="*Nombre propietario">
                            <validation-provider #default="{ errors }" name="nombre" rules="required">
                                <b-form-input v-model="nombreProperty" :state="errors.length > 0 ? false : null"
                                    placeholder="nombre propietario" :readonly="isInfoProperty" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>

                    </b-col>
                    <b-col md="7">
                        <b-form-group label="*Email propietario">
                            <validation-provider #default="{ errors }" name="Email" rules="required|email">
                                <b-form-input v-model="emailProperty" :state="errors.length > 0 ? false : null" type="email"
                                    placeholder="Email propietario" :readonly="isInfoProperty" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col md="7">
                        <validation-provider #default="{ errors }" name="selectTime" rules="required">
                            <b-form-group label="*Tiempo de citas">
                                <v-select v-model="selectTime" :class="[(!selectTime) ? 'invalid_select' : '']"
                                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="option"
                                    required />
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                    <b-col md="7">

                        <b-form-group label="*Seleccionar agentes">
                            <v-select v-model="selectAgent" :class="[(!selectAgent) ? 'invalid_select' : '']"
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="name" :options="allAgents"
                                required />
                        </b-form-group>
                    </b-col>
                    <!-- submit button -->
                    <b-col>
                        <b-button variant="success" type="submit" @click.prevent="validationForm">
                            <span v-show="stateSpinner" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            Generar informe
                        </b-button>
                        <b-button variant="primary" class="mt-auto" :href="codeInforme" target="_blank" v-if="codeInforme">
                            Ver informe
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </validation-observer>
        <!-- <button  type="button" class="btn btn-primary" @click="openModal">Abrir</button>
  <transition name="fade">
    <v-modal v-if="modalState" @close="modalState=false"  :titulo="detalles" size="lg">
      <component is="informeProperty"  :detail="inmueble"/>
    </v-modal>
  </transition> -->
    </div>
</template>

<script>
import vSelect from 'vue-select';
import {
    required, email, nombre
} from '@validations'
import moment from "moment";
import informeProperty from '../../public/informe-property/informeProperty.vue';
import VModal from "@/views/componente/vModal";
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
    components: {
        ValidationProvider,
        ValidationObserver,
        vSelect,
        informeProperty,
        VModal
    },

    data() {
        return {
            required,
            email,
            isInfoProperty: false,
            codeInforme: null,
            modalState: false,
            selectTime: null,
            selectAgent: null,
            allAgents: [],
            configurateData: {},
            startDate: null,
            endDate: null,
            nombreProperty: null,
            emailProperty: null,
            stateSpinner: null,
            option: [
                { title: 'Ultima semana', key: { name: 'days', val: 7 } },
                { title: 'Ultimos 15 dias', key: { name: 'days', val: 15 } },
                { title: 'Ultimo mes', key: { name: 'months', val: 1 } },
                { title: 'Ultimos 6 meses', key: { name: 'months', val: 6 } },
                { title: 'Ultimo año', key: { name: 'months', val: 12 } }],
        }
    },
    name: "modalInforme",
    props: {
        inmueble: Object
    },
    created() {
        this.allAgents = this.helpers.agentes.map((agente) => {
            return { 'name': agente.primer_nombre, 'id': agente.id }
        })
        this.allAgents.push({ 'name': 'Todos agentes', 'id': 'all' })
        this.validateInfoPropietario(this.inmueble.propietario_id)
    },
    methods: {
        validateInfoPropietario(propietario) {
            if (propietario) {
                this.nombreProperty = propietario.primer_nombre;
                this.emailProperty = propietario.email;
                this.isInfoProperty = true;
            }
        },
        validationForm() {
            this.$refs.simpleRules.validate().then(success => {
                if (success) {
                    this.stateSpinner = true

                    this.sendData()
                }
            })
        },
        openModal() {
            this.modalState = true
        },
        stateInput() {
            return this.selectTime && this.selectAgent && this.emailProperty;
        },
        async sendData() {
            if (this.configurateData != null && this.stateInput()) {
                this.endDate = moment().format("YYYY-MM-DD");
                this.startDate = moment().subtract(this.selectTime.key.val, this.selectTime.key.name).format("YYYY-MM-DD");
                const formData = new FormData;
                formData.append('startDate', this.startDate)
                formData.append('endDate', this.endDate)
                this.configurateData = {
                    'startDate': this.startDate,
                    'endDate': this.endDate,
                    'id_agent': this.selectAgent.id,
                    'property': this.inmueble.id

                }

                if (!this.isInfoProperty) {
                    Object.assign(this.configurateData, {
                        "name": this.nombreProperty,
                        'email': this.emailProperty,
                        'property': this.inmueble.id

                    })
                }
                await this.sendEmail()
            } else {
            }
        },

        async sendEmail() {
            try {
                const res = await this.$store.dispatch("appInformes/sendEmail", this.configurateData)
                this.codeInforme = res.data.data.link
            } catch (error) {
                console.error(error);
            }
            this.stateSpinner = false;
        }
    },
    computed: {
        helpers() {
            return this.$store.state.appConfiguracion.options;
        }
    },
}

</script>

<style scoped>
.invalid_select {
    border: 1px solid red;
}

.container-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
}
</style>
