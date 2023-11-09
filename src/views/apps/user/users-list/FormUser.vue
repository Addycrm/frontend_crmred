<template>
    <b-form id="FormUser">

        <ValidationObserver v-slot="data" ref="form">
            <b-row>
                <b-col cols="12">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-group label="Género" class="required">
                            <b-radio-group v-model="form.genero" name="genero">
                                <template v-for="item in storeConfig.gender">
                                    <b-form-radio :state="errorState(errors)" :key="item.id" :value="item.id">
                                        {{ item.name }}
                                    </b-form-radio>
                                </template>
                            </b-radio-group>
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
                <b-col cols="12">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-group label="Nombre completo" class="required">
                            <b-form-input v-model="form.primer_nombre" :state="errorState(errors)" trim />
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
                <b-col cols="6">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-group label="Tipo de Documento" class="required" :state="!(errors.length > 0)">
                            <v-select input-id="tipo_documento" v-model="form.tipo_identificacion" label="nombre"
                                :options="storeConfig.document_type" :reduce="(type) => type.id" :clearable="false" />
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
                <b-col cols="6">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-group label="N° de Identificación" class="required">
                            <b-form-input v-model="form.cedula_persona" :state="errorState(errors)" trim />
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
                <b-col cols="6">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-group v-if="type == 'user'" label="Role" class="required" :state="!(errors.length > 0)">
                            <v-select label="nombre" v-model="form.roles" :options="roles" :reduce="(type) => type.id"
                                :clearable="false" />
                        </b-form-group>
                        <b-form-group v-else label="Tipo de Cliente" class="required" :state="!(errors.length > 0)">
                            <v-select label="nombre" v-model="form.tipo_cliente"
                                :options="[{ id: 'agentes', nombre: 'Inmobiliria' }]" :reduce="(type) => type.id"
                                :clearable="false" />
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
                <b-col cols="6">
                    <ValidationProvider v-slot="{ errors }" rules="required|email">
                        <b-form-group label="E-mail" class="required">
                            <b-form-input v-model="form.email" :state="errorState(errors)" trim />
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
                <b-col cols="6">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-group label="Celular" class="required">
                            <vue-phone-number-input ref="inputCelular" v-model="phone.celular_movil"
                                :error="errors.length > 0" show-code-on-list :default-country-code="userdata.phonecode"
                                @update="(event) => {
                                    form.celular_movil = event.nationalNumber;
                                    wame.number = event.e164;
                                    if (wame.state) phone.celular_whatsapp = event.e164;
                                    exampleLabel(event)
                                }
                                    " :translations="{
        countrySelectorLabel: 'Código país',
        countrySelectorError: 'Elije un código',
        phoneNumberLabel: 'Celular',
        example: 'Ejemplo :',
    }" />
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
                <b-col cols="6">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-group label="WhatsApp" class="required">
                            <vue-phone-number-input ref="whatsapp" v-model="phone.celular_whatsapp"
                                :error="errors.length > 0" show-code-on-list :default-country-code="userdata.phonecode"
                                @update="form.celular_whatsapp = $event.e164" :translations="{
                                    countrySelectorLabel: 'Código país',
                                    countrySelectorError: 'Elije un código',
                                    phoneNumberLabel: 'WhatsApp',
                                    example: 'Ejemplo :',
                                }" :disabled="wame.state" />
                        </b-form-group>
                    </ValidationProvider>
                    <b-form-checkbox id="wame" v-model="wame.state" name="wame" class="mb-0 mt-1">
                        Usar el mismo numero de Celular
                    </b-form-checkbox>
                </b-col>
                <b-col cols="12">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                        <b-form-group label="Dirección" class="required">
                            <b-form-input v-model="form.direccion_persona" :state="errorState(errors)" trim />
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
                <b-col cols="12">
                    <ValidationProvider v-slot="{ errors }" name="País" rules="required">
                        <b-form-group label="País" class="required" :state="!(errors.length > 0)">
                            <v-select v-model="ubicaciones['id_pais'].value" @input="resetUbicacion('id_pais')" label="name"
                                :options="storeConfig.country" :reduce="(type) => type.id" :clearable="false" />
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
                <b-col cols="12">
                    <ValidationProvider v-slot="{ errors }" name="Departamento" rules="required">
                        <b-form-group label="Departamento" class="required" :state="!(errors.length > 0)">
                            <v-select v-model="ubicaciones['id_estado'].value" @input="resetUbicacion('id_estado')"
                                label="name" :options="ubicaciones['id_estado'].options" :reduce="(type) => type.id"
                                :disabled="ubicaciones['id_estado'].options.length == 0" :clearable="false" />
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
                <b-col cols="12">
                    <ValidationProvider v-slot="{ errors }" name="Ciudad" rules="required">
                        <b-form-group label="Ciudad" class="required" :state="!(errors.length > 0)">
                            <v-select v-model="ubicaciones['id_ciudad'].value" @input="resetUbicacion('id_ciudad')"
                                label="name" :options="ubicaciones['id_ciudad'].options" :reduce="(type) => type.id"
                                :clearable="false" :disabled="ubicaciones['id_ciudad'].options.length == 0" />
                        </b-form-group>
                    </ValidationProvider>
                </b-col>
            </b-row>
            <div v-if="data.failed" class="list-error">
                <div class="alert alert-danger p-1 mb-0 flex-grow-1 text-center" :style="{ fontSize: '14px' }">
                    <p>Uno o más campos obligatorios se encuentran vacios, Valida e intenta nuevamente. </p>
                </div>
            </div>
        </ValidationObserver>
    </b-form>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    ValidationProvider,
    ValidationObserver,
    setInteractionMode,
    extend,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import vSelect from "vue-select";
import { assert } from "@vueuse/shared";
export default {
    name: "FormUser",
    components: {
        ValidationProvider,
        ValidationObserver,
        vSelect,
    },
    props: {
        row: Object,
        type: {
            type: String,
            default: () => "user",
        },
    },
    data() {
        setInteractionMode("eager");
        Object.keys(rules).forEach((rule) => {
            extend(rule, rules[rule]);
        });
        return {
            exampleNumber: 10,
            phone: {
                celular_movil: null,
                celular_whatsapp: null,
            },
            wame: {
                state: false,
                number: null,
            },
            form: {
                foto_persona: 'https://crmred.co/storage/1671656115-png',
                primer_nombre: null,
                tipo_identificacion: null,
                cedula_persona: null,
                roles: null,
                tipo_cliente: null,
                genero: null,
                email: null,
                celular_movil: null,
                celular_whatsapp: null,
                direccion_persona: null,
                id_pais: null,
                id_estado: null,
                id_ciudad: null,
            },
            ubicaciones: {
                id_pais: {
                    value: null,
                    props: {
                        api: "appLocalidades/getStates",
                        name: "Departamentos",
                    },
                },
                id_estado: {
                    value: null,
                    options: [],
                    props: {
                        api: "appLocalidades/getCiudades",
                        name: "Ciudades",
                    },
                },
                id_ciudad: {
                    options: [],
                    value: null,
                },
            },
        };
    },
    watch: {
        "wame.state"(a) {
            if (a) {
                this.form.celular_whatsapp = this.wame.number;
                this.phone.celular_whatsapp = this.phone.celular_movil;
            }
        },
        'phone.celular_movil'() {
            this.phone.celular_movil = this.validateLengthNum(this.phone.celular_movil)
        },
        'phone.celular_whatsapp'() {
            this.phone.celular_whatsapp = this.validateLengthNum(this.phone.celular_whatsapp)
        },
    },
    computed: {
        storeConfig() {
            return this.$store.state.appConfiguracion.options;
        },
        roles() {
            return this.$store.state.appUser.roles_users;
        },

        userdata() {
            return this.$store.state.userData.userData;
        },

    },
    mounted() {

        this.watchUbicaciones();
        if (this.row) {
            this.setForm(this.row);
        }

    },
    methods: {
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
        setForm(row) {
            for (let prop in this.form) {
                if (row[prop]) {
                    switch (prop) {
                        case "celular_movil":
                        case "celular_whatsapp":
                            Object.assign(this.phone, { [prop]: row["celular_movil"] });
                            Object.assign(this.form, { [prop]: row[prop] });
                            break;
                        case "id_pais":
                        case "id_estado":
                        case "id_ciudad":
                            Object.assign(this.ubicaciones[prop], { value: row[prop].id });
                            break;
                        default:
                            Object.assign(this.form, {
                                [prop]: row[prop].id ? row[prop].id : row[prop],
                            });
                    }
                }
            }

            if (this.phone["celular_movil"] == this.phone["celular_whatsapp"]) {
                Object.assign(this.wame, {
                    state: true,
                    number: row["celular_whatsapp"],
                });
            }
        },
        errorState(error) {
            return error.length > 0 ? false : null;
        },
        onSubmit() {
            return new Promise((resolve) => {
                this.$refs["form"].validate().then((state) => {
                    if (state) {
                        if (this.row) Object.assign(this.form, { id: this.row.id });

                        this.$store
                            .dispatch(
                                this.row ? "appUser/updatedUser" : "appUser/addUser",
                                this.form
                            )
                            .then((res) => {
                                if (res) {
                                    if (!this.row) {
                                        this.$toast({
                                            component: ToastificationContent,
                                            position: "top-center",
                                            props: {
                                                icon: "CheckCircleIcon",
                                                title: "Agente Registrado",
                                                variant: "success",
                                                text: "El Agente fue registrado exitosamente",
                                            },
                                        });
                                    } else {
                                        this.$toast({
                                            component: ToastificationContent,
                                            position: "top-center",
                                            props: {
                                                icon: "CheckCircleIcon",
                                                title: "Agente Actualizado",
                                                variant: "success",
                                                text: "Los Datos del Agente fueron actualizados exitosamente",
                                            },
                                        });
                                    }
                                } else {
                                    this.$toast({
                                        component: ToastificationContent,
                                        position: "top-center",
                                        props: {
                                            title: "Algo salio mal",
                                            icon: "AlertCircleIcon",
                                            variant: "danger",
                                            text: "Si el problema persiste actualiza la pagina, si el problema persiste comunicate con soporte",
                                        },
                                    });
                                }
                                resolve(res);
                            });
                    } else {
                        resolve(state);
                    }
                });
            });
        },
        watchUbicaciones() {
            for (let prop in this.ubicaciones) {
                this.$watch(
                    () => this.ubicaciones[prop].value,
                    (codigo) => {
                        Object.assign(this.form, { [prop]: codigo });
                        let keys = Object.keys(this.ubicaciones);
                        if (prop != keys[keys.length - 1] && codigo != null) {
                            let index = keys.indexOf(prop);

                            this.getUbicacion({
                                codigo,
                                prop: keys[index + 1],
                                api: this.ubicaciones[prop].props.api,
                                name: this.ubicaciones[prop].props.name,
                            });
                        }
                    }
                );
            }
        },
        resetUbicacion(prop) {
            let keys = Object.keys(this.ubicaciones),
                index = keys.indexOf(prop);
            keys.shift();
            keys.splice(0, index);
            for (let key of keys) {
                Object.assign(this.form, { [key]: null });
                Object.assign(this.ubicaciones[key], { value: null, options: [] });
            }
        },
        async getUbicacion({ codigo, api, name, prop }) {
            await this.$store
                .dispatch(api, { codigo })
                .then((res) => {
                    this.ubicaciones[prop].options = res;
                })
                .catch((err) => {
                    console.error(name, err);
                });
        },
    },
};
</script>

<style lang="css" scoped></style>
