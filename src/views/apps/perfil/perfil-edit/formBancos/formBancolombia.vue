
<template>
    <b-modal :id="infoModal.id" hide-footer size="xl">
        <template #modal-title>
            <span class="tituloModalInmueble">Seleccionar cliente</span>
        </template>
        <validation-observer ref="form">
            <b-row>
                <b-col md="6">
                    <b-form-group>
                        <validation-provider #default="{ errors }" name="email" rules="required|email">
                            <b-form-input v-model="email" type="email" :state="errors.length > 0 ? false : null"
                                placeholder="Email" />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group>
                        <validation-provider #default="{ errors }" name="password" rules="required|min:6">
                            <b-form-input v-model="passwordValue" type="password" :state="errors.length > 0 ? false : null"
                                placeholder="Password" />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>
            </b-row>
        </validation-observer>
    </b-modal>
</template>

<script>
import {
    BFormInput, BFormGroup, BButton, BRow, BCol, BCardText,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { password, required } from '@validations'

export default {
    components: {
        BFormInput,
        BFormGroup,
        BButton,
        BCardText,
        BRow,
        BCol,
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            // ? Default locale for VeeValidate is 'en'
            locale: 'en',
            email: '',
            passwordValue: '',
            password,
            required,
            infoModal: {
                id: "modal-bancolombia",
                title: "",
                content: {},
                contentPreguntas: {},
            },
        }
    },
    methods: {
        switchLoc() {
            // switch the locale.
            this.locale = this.locale === 'en' ? 'ar' : 'en'
            localize(this.locale)

            // re-validate to re-generate the messages.
            this.$refs.form.validate()
        },

        info(button) {
            this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        },
    },
}
</script>
