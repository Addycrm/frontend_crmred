<template>
    <div id="modalForm">
        <b-button variant="primary"  class="btn__back" @click="backPage()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="16" height="16">
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
            </svg>
            Volver
        </b-button>
        <h2 class="modalForm__title">Nueva transacción</h2>
        <div class="form_header-elite" v-if="isAdmin">
            <h4>Seleccionar Agente</h4>
            <div class="container__btns">
                <b-button class="mr-1 text-nowrap" variant="success"
                @click="openModalAgenteElite()">
                    Seleccionar Agente Elite
                </b-button>
            </div>
        </div>
        <validation-observer ref="formAgentElite" v-if="isAdmin">
            <b-row>
                <b-col  sm="12"  md="6" lg="2" xl="2">
                    <validation-provider #default="{ errors }" name="ID Agente" rules="required">
                        <b-form-group>
                            <label for="idAgent" class="required">ID Agente <span>*</span></label>
                            <b-form-input id="idAgent" placeholder="ID codigo" v-model="formTransactions.idUser"
                                :state="errors.length > 0 ? false : null" :readonly="isInfoProperty" />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                    </validation-provider>
                </b-col>
                <b-col  sm="12"  md="6" lg="4" xl="4">
                    <validation-provider #default="{ errors }" name="Nombre Agente" rules="required">
                        <b-form-group>
                            <label for="nameAgent" class="required">Nombre Agente <span>*</span></label>
                            <b-form-input id="nameAgent" placeholder="Nombre agente..." v-model="formTransactions.nameUser"
                                :state="errors.length > 0 ? false : null" :readonly="isInfoProperty" />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                    </validation-provider>
                </b-col>
            </b-row>
        </validation-observer>
        <div class="form_header">
            <h4>Propiedad</h4>
            <div class="container__btns"  v-if="isAdmin">
                <b-button class="mr-1 text-nowrap" variant="success"  v-if="isAdmin"
                @click="getPropertiesAgentELite()" :disabled="agenElitetSelected===null"
                >
                    Seleccionar Propiedad Agente Elite
                </b-button>
                <b-button class="mr-1 text-nowrap" variant="info" :disabled="agenElitetSelected===null"
                @click="pageNewProperty()"
                >
                    Registrar Nueva Propiedad Agente Elite
                </b-button>
            </div>
            <div class="container__btns" v-else>
                <b-button class="mr-1 text-nowrap" variant="success"
                    @click="openModal()"
                >
                    Seleccionar Propiedad
                </b-button>
                <b-button class="mr-1 text-nowrap" variant="info"
                @click="pageNewProperty()"
                >
                    Registrar Nueva Propiedad
                </b-button>
            </div>
        </div>
        <div>
            <validation-observer ref="formProperty">
                <b-row>
                    <b-col  sm="12"  md="6" lg="6" xl="4">
                        <validation-provider #default="{ errors }" name="id Inmueble" rules="required">
                            <b-form-group>
                                <label for="id-codigo" class="required">ID codigo <span>*</span></label>
                                <b-form-input id="id-codigo" placeholder="ID codigo" v-model="formTransactions.inmuebleId"
                                    :state="errors.length > 0 ? false : null" :readonly="isInfoProperty" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                    <b-col  sm="12"  md="6" lg="6" xl="2">
                        <validation-provider #default="{ errors }" name="dias en la plataforma" rules="required">
                            <b-form-group>
                                <label for="days-plataform" class="required">Dias en la plataforma <span>*</span></label>
                                <b-form-input id="days-plataform" placeholder="Dias plataforma" v-model="formTransactions.plataformDays"
                                    :state="errors.length > 0 ? false : null" :readonly="isInfoProperty" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12"  md="6" lg="12">
                        <validation-provider #default="{ errors }" name="Dirección" rules="required">
                            <b-form-group>
                                <label for="direccion" class="required">Dirección <span>*</span></label>
                                <b-form-input id="direccion" placeholder="ingrese la dirección..."
                                    v-model="formTransactions.direccion" :state="errors.length > 0 ? false : null"
                                    :readonly="isInfoProperty" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col  sm="12" md="6" lg="3">
                        <validation-provider #default="{ errors }" name="Estado" rules="required">
                            <b-form-group>
                                <label for="state" class="required">Estado <span>*</span></label>
                                <b-form-input id="state" placeholder="Estado..." v-model="formTransactions.statePosition" :state="errors.length > 0 ? false : null" :readonly="isInfoProperty" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                    <b-col  sm="12" md="6" lg="3">
                        <validation-provider #default="{ errors }" name="Ciudad" rules="required">
                            <b-form-group>
                                <label for="city" class="required">Ciudad/Pueblo <span>*</span></label>
                                <b-form-input id="city" placeholder="Ciudad..." v-model="formTransactions.cityPosition" :state="errors.length > 0 ? false : null" :readonly="isInfoProperty" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                    <b-col  sm="12" md="6" lg="3">
                        <validation-provider #default="{ errors }" name="Zona" rules="required">
                            <b-form-group>
                                <label for="zone" class="required">Zona <span>*</span></label>
                                <b-form-input id="zone" placeholder="Ciudad..." v-model="formTransactions.zonePosition" :state="errors.length > 0 ? false : null" :readonly="isInfoProperty" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                    <b-col  sm="12" md="6" lg="3">
                        <validation-provider #default="{ errors }" name="Barrio" rules="required">
                            <b-form-group>
                                <label for="barrio" class="required">Barrio <span>*</span></label>
                                <b-form-input id="barrio" placeholder="Ciudad..." v-model="formTransactions.barrioPosition" :state="errors.length > 0 ? false : null" :readonly="isInfoProperty" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col  sm="12"  md="6" lg="6" v-if="typeContract">
                        <validation-provider #default="{ errors }" name="Tipo Contrato" rules="required">
                            <b-form-group :state="errors.length > 0 ? false : null">
                                <label for="contrato" class="required">Tipo Contrato <span>*</span></label>
                                <v-select
                                    autocomplete="on"
                                    label="name"
                                    v-model="formTransactions.tContractId"
                                    :options="typeContract"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>

                            </b-form-group>
                        </validation-provider>
                    </b-col>
                    <b-col  sm="12" md="6" lg="6" v-if="typeTransactions">
                        <validation-provider #default="{ errors }" name="Tipo Transacción" rules="required">
                            <b-form-group :state="errors.length > 0 ? false : null">
                                <label for="transaction" class="required">Tipo transacción <span>*</span></label>
                                <v-select
                                    autocomplete="on"
                                    label="name"
                                    v-model="formTransactions.Ttype"
                                    :options="typeTransactions"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                </b-row>
            </validation-observer>
        </div>
        <div class="form__btns">
            <b-button variant="danger" @click="backPage()">
                Cancelar
            </b-button>
            <b-button variant="primary" @click="validationForm()">
                Siguiente
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="16" height="16" fill="white">
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                </svg>
            </b-button>
        </div>
        <!-- MODAL PRPIEDADES ALL -->
        <transition name="fade">
            <v-modal v-if="modalState" @close="modalState = false" titulo="Seleccionar propiedad" size="lg" footer>
                <components is="searchInmuebles" elegir :rango="false"  ref="tableList" @sendActive="sendActive" />
                <template #footer>
                    <b-button variant="success" @click="getValue()" :disabled="sendState">
                        Seleccionar
                    </b-button>
                </template>
            </v-modal>
        </transition>
        <!--MODAL PROPIEDADES AGENTES ELITE -->
        <transition name="fade">
            <v-modal v-if="modalPropertyElite" @close="modalPropertyElite = false" titulo="Seleccionar propiedad" size="lg" footer>
                <component is="propertiesElite" ref="tablePropertiesElite" :agenElitetSelected="agenElitetSelected"/>
                <template #footer>
                    <b-button variant="success" @click="getPropertySelectedElite()" >
                        Seleccionar
                    </b-button>
                </template>
            </v-modal>
        </transition>
        <!-- MODAL SELECCIONAR AGENTE ELITE -->
        <transition name="fade">
            <v-modal v-if="modalAgentElite" @close="modalAgentElite = false" titulo="Seleccionar agente elite" size="lg" footer>
                <components is="agentElite" elegir :rango="false"  ref="tableAgentElite" @sendActive="sendActive" />
                <template #footer>
                    <b-button variant="success" @click="getInfoAgent()">
                        Seleccionar
                    </b-button>
                </template>
            </v-modal>
        </transition>
        <!-- MODAL AGREGAR NUEVA PROPIEDAD -->
        <transition name="fade">
            <v-modal v-if="modalStateNewProperty" @close="modalStateNewProperty=false" :titulo="
            modal.type == 'agregar' ? 'Agregar Inmueble' : 'Editar Inmueble'
            " size="lg">
            <component is="FormInmueble" :prop="modal" />
            </v-modal>
    </transition>
    </div>
</template>

<script>
import vSelect from "vue-select";
import VModal from "@/views/componente/vModal";
import searchInmuebles from "./SearchInmuebles.vue";
import FormInmueble from "@/views/apps/inmuebles/FormInmueble.vue"
import agentElite from "@/views/admin/agentes/modalTable.vue"
import propertiesElite from "./propertiesElite.vue";
import mixinFormTransactions from './mixinFormTransactions'
import { ValidationProvider, ValidationObserver } from 'vee-validate'


export default {
    mixins: [mixinFormTransactions],

    data() {
        return {
            modalPropertyElite:false,
            stateFieldsForm:false,
            modal:null,
            userID: null,
            modalState: false,
            modalAgentElite:false,
            sendState: false,
            modalStateNewProperty:false,
            storage:null,
            isAdmin:false,
        }
    },
    components: {
        vSelect,
        VModal,
        searchInmuebles,
        ValidationProvider,
        ValidationObserver,
        FormInmueble,
        agentElite,
        propertiesElite
    },
    created() {
        this.$store.dispatch("appTransactions/getTypeContract")
        this.$store.dispatch("appTransactions/getTypeTransactions")
        this.isAdmin= this.$can('transaction_select_elite', 'transaction')

    },
    mounted() {
        this.keyTransaction = JSON.parse(localStorage.getItem('keyTransaction'));
        this.storage = JSON.parse(localStorage.getItem('ordenTransaction'));
        if(this.storage.inmuebleId){
            this.formStorage();
        }
    },
    methods: {
        formStorage(){
            let claves = Object.keys(this.storage);
            for(let i=0; i< claves.length; i++){
                let clave = claves[i];
                this.formTransactions[clave] = this.storage[clave];
            }
        },
        async validationForm() {
            let val1,val2=false
            val1 = new Promise((resolve,reject)=>{
                this.$refs.formProperty.validate().then(success => {
                    if (success) {
                        resolve(true)
                    } else {
                        reject(false)
                    }
                })
            })
            val2 = new Promise((resolve,reject)=>{
                this.$refs.formAgentElite.validate().then(success => {
                    if (success) {
                        resolve(true)
                    } else {
                        reject(false)
                    }
                })
            })
            if(this.isAdmin){
                await Promise.all([val1, val2])
                    .then(() => {
                        this.stateFieldsForm=true
                    }).catch(() => {
                        this.stateFieldsForm=false
                });
            }else{
                await val1
                    .then(()=>this.stateFieldsForm=true)
                    .catch(()=>this.stateFieldsForm=false)
            }

            if(this.stateFieldsForm){
                this.handlePageTransactions()
            }
        },
        validateRoleUser(){
            if(!this.isAdmin){
                this.formTransactions.idUser = this.keyTransaction.idUser
            }
        },
        handlePageTransactions() {
            this.validateRoleUser()
            let data={}
            for (let prop in this.formTransactions){
                if(this.formTransactions[prop]!=null){
                    Object.assign(data,{[prop]:this.formTransactions[prop]})
                }
            }
            localStorage.setItem('ordenTransaction',JSON.stringify(data));
            this.$router.push({ name: 'transactions-agente-create', params: { idTransaction:this.keyTransaction.idTransaction} })
        },
        openModal() {
            this.modalState = true;
        },
        openModalAgenteElite(){
            this.modalAgentElite=true
        },
        getValue() {
            let value = this.$refs["tableList"].sendValue();
            this.inmuebleSelected = value
            this.modalState = false;
        },
        getInfoAgent(){
            let value = this.$refs["tableAgentElite"].getInfoAgent();
            this.agenElitetSelected=value
            this.modalAgentElite=false;
        },
        sendActive(e) {
            this.sendState = e;
        },
        backPage(){
            this.$router.push({ name: 'transactions-agente'})
        },
        pageNewProperty(){
            if(this.isAdmin){
                this.$store.commit("appAgents/SELECT_AGENT",this.agenElitetSelected)
            }
            this.modalStateNewProperty = true;
            this.modal = {
                type: "agregar",
                origin:'TRANSACTION'
            };
        },
        getPropertiesAgentELite(a=1) {
            let data = {
                idAgent:this.agenElitetSelected.id
            };
            let params = { page: a };
            this.$store.dispatch("appInmueble/getInmueblesAgentFilter", { data, params })
            this.modalPropertyElite=true
        },
        getPropertySelectedElite(){
            let value = this.$refs["tablePropertiesElite"].getInfoProperty();
            this.inmuebleSelected=value
            this.modalPropertyElite=false;
        }
    }
}
</script>

<style scoped lang="scss">
.form__btns {
    display: flex;
    justify-content: space-between;
}
.btn__back{
    max-width: 120px;
    svg{
        fill: white;
    }
}

#modalForm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 2rem;
    background-color: white;
}
.modalForm__title{
    color: var(--primary);
    font-weight: bold;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--primary);
}
.required {
    span {
        color: red;
    }
}
.container__btns{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>
