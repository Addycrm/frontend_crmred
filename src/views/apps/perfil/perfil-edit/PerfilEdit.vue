<template>
    <b-row>
        <b-col cols="12">
            <b-overlay :show="overlay">
                <form-wizard color="#7367F0" :title="null" :subtitle="null" layout="horizontal" finish-button-text="Enviar"
                    back-button-text="Atras" next-button-text="Siguiente" class="wizard-vertical">
                    <tab-content title="Información básica" :before-change="validateFormBasic">
                        <b-col>
                            <ValidationObserver ref="wizardFormBasica">
                                <b-row>
                                    <b-col cols="12" md="6">
                                        <b-media class="mb-2">
                                            <template #aside>
                                                <b-avatar v-bind:src="image" size="90px" rounded />
                                            </template>
                                            <h4 class="mb-1">Foto de perfil</h4>
                                            <button @click="showModalImage" class="btn__foto-perfil btn btn-primary">
                                                <span class="modify_image">
                                                    Modificar foto perfil
                                                </span>
                                                <span class="load_image">
                                                    Cargar
                                                </span>
                                            </button>
                                        </b-media>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="6">
                                        <b-form-group label="Tipo de cliente" class="required">
                                            <ValidationProvider v-slot="{ errors }" rules="required">
                                                <b-form-radio-group v-model="form.tipo_cliente" name="some-radios">
                                                    <b-form-radio value="agentes">
                                                        Inmobiliaria
                                                    </b-form-radio>
                                                    <!-- <b-form-radio v-model="form.tipo_cliente"name="some-radios"value="socio_referidor"> Socio referidor </b-form-radio> -->
                                                </b-form-radio-group>
                                                <b-form-invalid-feedback :state="!(errors.length > 0)">
                                                    Elije un Tipo de cliente
                                                </b-form-invalid-feedback>
                                            </ValidationProvider>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" md="6">
                                        <b-form-group label="Nombre Completo" class="required">
                                            <ValidationProvider v-slot="{ errors }" rules="required">
                                                <b-form-input :state="errorState(errors)" name="nombre" trim
                                                    v-model="form.primer_nombre" placeholder="Nombres y Apellidos" />
                                            </ValidationProvider>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" md="4">
                                        <ValidationProvider v-slot="{ errors }" rules="required">
                                            <b-form-group label="Tipo de Documento" :state="!(errors.length > 0)"
                                                class="required">
                                                <v-select v-model="form.tipo_identificacion" label="nombre"
                                                    :options="storeConfig.document_type" :reduce="type => type.id"
                                                    :clearable="false" />
                                            </b-form-group>
                                        </ValidationProvider>
                                    </b-col>
                                    <b-col cols="12" md="4">
                                        <b-form-group label="N° de Identificación" class="required">
                                            <ValidationProvider v-slot="{ errors }" rules="required|min:6">
                                                <b-form-input :state="errorState(errors)" id="n_identificacion"
                                                    name="n_identificacion" trim v-model="form.numero_cedula"
                                                    :disabled="!Boolean(form.tipo_identificacion)" />
                                            </ValidationProvider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" md="4">
                                        <ValidationProvider v-slot="{ errors }" rules="required">
                                            <b-form-group label="Fecha de nacimiento" class="required"
                                                :state="!(errors.length > 0)">
                                                <input type="hidden" :value="form.fecha_nacimiento">
                                                <flat-pickr v-model="form.fecha_nacimiento" name="fecha_nacimiento"
                                                    class="form-control" :config="{ locale }" />
                                            </b-form-group>
                                        </ValidationProvider>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" md="4">
                                        <b-form-group label="País">
                                            <v-select v-model="ubicaciones['id_pais'].value"
                                                @input="resetUbicacion('id_pais')" label="name"
                                                :options="storeConfig.country" :reduce="type => type.id"
                                                :clearable="false" />
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" md="4">
                                        <b-form-group label="Departamento">
                                            <v-select v-model="ubicaciones['id_estado'].value"
                                                @input="resetUbicacion('id_estado')" label="name"
                                                :options="ubicaciones['id_estado'].options" :reduce="type => type.id"
                                                :disabled="ubicaciones['id_estado'].options.length == 0"
                                                :clearable="false" />
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" md="4">
                                        <b-form-group label="Ciudad">
                                            <v-select v-model="ubicaciones['id_ciudad'].value"
                                                @input="resetUbicacion('id_ciudad')" label="name"
                                                :options="ubicaciones['id_ciudad'].options" :reduce="type => type.id"
                                                :clearable="false"
                                                :disabled="ubicaciones['id_ciudad'].options.length == 0" />
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" md="4">
                                        <b-form-group label="Correo electrónico" class="required">
                                            <div class="form-control" readonly>
                                                {{ userData.email }}
                                            </div>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" md="4">
                                        <ValidationProvider v-slot="{ errors }" rules="required">
                                            <b-form-group label="Celular" class="required">
                                                <vue-phone-number-input ref="inputCelular" v-model="phone.celular"
                                                    :error="errors.length > 0" show-code-on-list default-country-code="CL"
                                                    :preferred-countries="['CL']" @update="(event) => {
                                                        form.celular = event.nationalNumber;
                                                        wame.number = event.e164;
                                                        if (wame.state)
                                                            phone.whatsapp = event.e164;
                                                        exampleLabel(event)
                                                    }" :translations="{
                                                        countrySelectorLabel: 'Codigo pais',
                                                        countrySelectorError: 'Elije un código',
                                                        phoneNumberLabel: 'Celular',
                                                        example: 'Ejemplo :',
                                                    }" />
                                            </b-form-group>
                                        </ValidationProvider>
                                    </b-col>
                                    <b-col cols="12" md="4">
                                        <ValidationProvider v-slot="{ errors }" rules="required">
                                            <b-form-group label="WhatsApp" class="required">
                                                <vue-phone-number-input ref="whatsapp" v-model="phone.whatsapp"
                                                    :error="errors.length > 0" show-code-on-list default-country-code="CL"
                                                    :preferred-countries="['CL']" @update="form.whatsapp = $event.e164"
                                                    :translations="{
                                                        countrySelectorLabel: 'Codigo pais',
                                                        countrySelectorError: 'Elije un código',
                                                        phoneNumberLabel: 'WhatsApp',
                                                        example: 'Ejemplo :',
                                                    }" :disabled='wame.state' />
                                            </b-form-group>
                                        </ValidationProvider>
                                        <b-form-checkbox id="wame" v-model="wame.state" name="wame" class="mb-0 mt-1">
                                            Usar el mismo numero de Celular
                                        </b-form-checkbox>
                                    </b-col>
                                </b-row>
                            </ValidationObserver>
                        </b-col>
                    </tab-content>
<!--

                    <tab-content title="Seleccionar Plan" :before-change="validateFormPlan">
                        <b-col>
                            <ValidationObserver ref="wizardFormPlan">
                                <plansMembership :propsSelect="{ enableBtn: true, enableDefaultPlan: this.planDefault }"
                                    @selectPlan="selectPlan" />
                            </ValidationObserver>
                        </b-col>
                    </tab-content> -->
                    <!-- <tab-content title="Escoger metodo de pago" :before-change="validateFormPago">
                        <b-col>
                            <ValidationObserver ref="wizardFormPlan">
                                <paymentMethod :propsSelect="planDefault"></paymentMethod>
                                 <plansMembership :propsSelect="{enableBtn:true,enableDefaultPlan:this.planDefault}" @selectPlan="selectPlan"/>
                            </ValidationObserver>
                        </b-col>
                    </tab-content> -->

                </form-wizard>
                <v-modal v-if="stateCropImage" @close="closeModal" ref="modalInmueble" titulo="Imagen de perfil" responsive
                    size="md">
                    <component is="selectImage" :image="image" @closeModal="closeModal" @adjustImage="imageSelected" />
                </v-modal>
            </b-overlay>
        </b-col>
    </b-row>
</template>
<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from 'vee-validate/dist/rules';

import selectImage from "@/views/pages/profile/component/selectImage.vue";
import VModal from "@/views/componente/vModal";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import PlansMembership from "@/views/pages/authentication/components/plansMembership.vue"
import paymentMethod from "@/views/apps/perfil/perfil-edit/components/paymentMethod.vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import { Spanish } from "flatpickr/dist/l10n/es.js"

export default {
    components: {
        FormWizard,
        TabContent,
        ToastificationContent,
        ValidationObserver,
        ValidationProvider,
        vSelect,
        flatPickr,
        PlansMembership,
        paymentMethod,
        selectImage,
        VModal
    },
    data() {
        Object.keys(rules).forEach(rule => {
            extend(rule, rules[rule]);
        });

        return {
            stateCropImage: null,
            planUser: null,
            planDefault: 4,//Basico
            exampleNumber: 10,
            overlay: false,
            phone: {
                celular: null,
                whatsapp: null,
            },
            wame: {
                state: false,
                number: null
            },
            transactions: {},
            form: {
                foto_persona: null,
                tipo_cliente: 'agentes',
                primer_nombre: null,
                tipo_identificacion: null,
                numero_cedula: null,
                fecha_nacimiento: null,
                id_pais: null,
                id_estado: null,
                id_ciudad: null,
                celular: null,
                whatsapp: null,
                planId: null
            },

            ubicaciones: {
                id_pais: {
                    value: null,
                    props: {
                        api: 'appLocalidades/getStates',
                        name: 'Departamentos',
                    }
                },
                id_estado: {
                    value: null,
                    options: [],
                    props: {
                        api: 'appLocalidades/getCiudades',
                        name: 'Ciudades',
                    }
                },
                id_ciudad: {
                    value: null,
                    options: [],
                },
            },
            locale: Spanish,
            image: null,
        };
    },
    props: {
        type: {
            type: String,
            default: 'registrar'
        },
    },
    watch: {
        'wame.state'(a) {
            if (a) {
                this.form.whatsapp = this.wame.number
                this.phone.whatsapp = this.phone.celular
            }
        },
        "phone.whatsapp"() {
            if (!this.wame.state) {
                this.phone.whatsapp = this.validateLengthNum(this.phone.whatsapp)
            } else {
                this.form.whatsapp = this.wame.number;
                this.phone.whatsapp = this.validateLengthNum(this.phone.celular);
            }
        },
        "phone.celular"(e) {
            this.phone.celular = this.validateLengthNum(this.phone.celular)
        }
    },
    computed: {
        optionsPlans() {
            return this.$store.state.appAgents.optionsPlans;
        },
        storeConfig() {
            return this.$store.state.appConfiguracion.options
        },
        userData() {
            return JSON.parse(localStorage.getItem("userData"));
        },
    },
    mounted() {

        this.getOptionsPlans();

        if (this.type == 'registrar')
            this.$store.dispatch("appConfig/setNavMenuhidden", true);

        for (let prop in this.ubicaciones) {
            this.$watch(() => this.ubicaciones[prop].value, (codigo) => {

                Object.assign(this.form, {
                    [prop]: codigo
                });

                if (prop != 'id_ciudad' && codigo != null) {
                    let keys = Object.keys(this.ubicaciones),
                        index = keys.indexOf(prop);

                    this.getUbicacion({
                        codigo,
                        prop: keys[index + 1],
                        api: this.ubicaciones[prop].props.api,
                        name: this.ubicaciones[prop].props.name,
                    });

                }
            });
        }
    },
    methods: {

        getTransactios(data) {
            console.log(data)
            this.transactions = { ...data };
            console.log(this.transactions);
        },
        async imageSelected(blob, imagecrop) {
            this.form.foto_persona = blob;
            this.image = imagecrop
        },
        closeModal() {
            this.stateCropImage = false;
        },
        showModalImage() {
            this.stateCropImage = true
        },
        getOptionsPlans() {
            this.$store.dispatch('appAgents/getOptionsPlans');
        },
        selectPlan(prop) {
            this.planDefault = prop;
        },
        errorState(error) {
            return error.length > 0 ? false : null;
        },
        validateLengthNum(num) {
            if (num != null) {
                let lengthNumber = num.replace(/\s+/g, '')
                if (lengthNumber.length >= this.exampleNumber) {
                    return lengthNumber.slice(0, this.exampleNumber);
                } else {
                    return num
                }
            }
        },
        exampleLabel(e) {
            let example = this.$refs['inputCelular'].$children[1].$refs.label.innerText;
            if (example != 'Celular') {
                example = example.split(':')[1].replace(/\s+/g, '');
                this.exampleNumber = example.length;
            }
        },
        async sendFormRegister() {
            this.overlay = true;
            this.planUser = this.optionsPlans.find((item) => {
                return item.id == this.planDefault;
            })

            this.form.planId = this.planUser.id;

            const transaccion = this.$store.getters['appPayment/getTransaction'];
            this.form.transactions = JSON.stringify(transaccion)
            let formData = new FormData();
            for (let prop in this.form) {
                if (this.form[prop]) {
                    switch (prop) {
                        case "foto_persona":
                            formData.append('foto_persona', this.form.foto_persona, 'name' + new Date().getTime() + '.jpeg')
                            break;

                        default:
                            formData.append(prop, this.form[prop]);
                            break;
                    }
                }
            }

            await this.$store.dispatch("appPerfil/addPerfil", formData)
                .then(res => {
                    const user = res.data.userData;
                    if (this.type == 'registrar') {
                        Object.assign(user, {
                            color_fondo: '#5e5873',
                            color_fuente: '#7367f0'
                        });
                        localStorage.setItem("userData", JSON.stringify(user));
                        this.$store.commit("userData/UPDATE_USER_DATA", user);
                        this.$ability.update(user.ability);
                    }
                    this.wizardFormComplete()

                }).catch(err => {
                    let { numero_cedula, celular } = err.response.data.message;

                    if (numero_cedula || celular) {
                        for (let prop in err.response.data.message) {
                            this.$toast({
                                component: ToastificationContent,
                                props: {
                                    icon: "AlertCircleIcon",
                                    title: 'Algo ha ocurrido',
                                    text: err.response.data.message[prop][0],
                                    variant: "danger",
                                },
                            }, {
                                timeout: 4000
                            });
                        }
                    } else {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                icon: "AlertCircleIcon",
                                title: 'Algo ha ocurrido',
                                text: 'Actualiza el navegador, si el problema persiste comunicate con nosotros',
                                variant: "danger",
                            },
                        }, {
                            timeout: 4000
                        });
                    }
                });
            this.overlay = false
        },
        validateFormBasic() {
            return new Promise((resolve, reject) => {
                this.$refs.wizardFormBasica.validate().then(success => {
                    if (success) {
                        this.sendFormRegister()
                        resolve(true)
                    } else {
                        reject()

                    }
                })
            })
        },
        // validateFormPlan() {
        //     return new Promise((resolve, reject) => {

        //         if (this.planDefault) {
        //             //   this.sendFormRegister()
        //             resolve(true)
        //         } else {
        //             reject()
        //         }
        //     })
        // },
        // validateFormPago() {
        //     return new Promise((resolve, reject) => {
        //         const transaction = this.$store.getters['appPayment/getTransaction'];
        //         if (transaction != null) {
        //             this.sendFormRegister()
        //             resolve(true)
        //         } else {
        //             reject()
        //         }
        //     })
        // },
        redirigirWhatsApp() {
            // Número de teléfono al que deseas enviar un mensaje en WhatsApp
            var numeroTelefono = '3183749090';
            let textWhatssap =
                `Estoy interesad@ en adquirir el PLAN ELITE de CRMED.%0ANombre Completo: ${this.form.primer_nombre}.%0ACorreo: ${this.userData.email}`
            // Formato de enlace para redirigir a WhatsApp con el número de teléfono
            var enlaceWhatsApp = 'https://wa.me/' + numeroTelefono + '?text=' + textWhatssap;

            // Crea un elemento temporal <a> y establece su atributo 'href' al enlace de WhatsApp
            var enlaceTemporal = document.createElement('a');
            enlaceTemporal.href = enlaceWhatsApp;

            // Establece el atributo 'target' en '_blank' para abrir WhatsApp en una nueva pestaña
            enlaceTemporal.target = '_blank';

            // Haz clic en el enlace temporal para redirigir a WhatsApp
            enlaceTemporal.click();
        },

        showAlert({ title, text }) {
            this.$swal({
                title,
                text,
                icon: "warning",
                confirmButtonText: "Cerrar",
                customClass: {
                    confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
            });
        },
        logout() {
            let keys = ['userData', 'accessToken', 'refreshToken',];
            for (let key of keys)
                localStorage.removeItem(key);

            this.$router.push({ name: "auth-login" });
            this.$store.dispatch("appConfig/setNavMenuhidden", false)

            this.$store.commit("userData/DELETE");
            this.$ability.update(initialAbility);
            location.reload();
        },
        wizardFormComplete() {

            if (this.planUser.id == 3) {
                this.showAlert({
                    title: 'Registro exitoso',
                    text: 'Se te contactara con un asesor para mayor información del PLAN ELITE'
                })

                this.redirigirWhatsApp();
                this.logout();
            } else {
                if (this.type == 'registrar') {

                    this.showAlert({
                        title: 'Registro exitoso',
                        text: 'Completa los datos de tu inmobiliaria.'
                    })
                    this.$router.push({ name: "apps-configuration" });
                    this.$store.dispatch("appConfig/setNavMenuhidden", false)
                }
            }

        },
        resetUbicacion(prop) {
            let keys = Object.keys(this.ubicaciones),
                index = keys.indexOf(prop);
            keys.shift();
            keys.splice(0, index);
            for (let key of keys) {
                Object.assign(this.form, { [key]: null });
                Object.assign(this.options, { [key]: [] });
                Object.assign(this.ubicaciones[key], { value: null });
            }
        },
        async getUbicacion({ codigo, api, name, prop }) {
            await this.$store
                .dispatch(api, { codigo })
                .then(res => {
                    this.ubicaciones[prop].options = res;
                })
                .catch((error) => {
                    console.error(name, error);
                });
        },
        previewImage(event) {
            var input = event.target;
            this.form.foto_persona = input.files[0];
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = (e) => {
                    this.image = e.target.result;
                };
            }
        },

    },
    created() {
        this.$root.$on('sendUserForm', this.validateFormBasic);
    }
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-wizard.scss";
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>

<style scoped>
.btn__foto-perfil {
    display: flex;
    padding: 0.7rem 1rem;
    border: 1px solid #d8d6de;
    border-radius: 6px;
    background-color: white;
    width: 100%;
    justify-content: space-between;
}
</style>
