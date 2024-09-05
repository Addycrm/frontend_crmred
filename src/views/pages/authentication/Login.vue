<template>
    <b-overlay :show="overlay">

        <div class="auth-wrapper auth-v2">

            <b-row class="auth-inner m-0">
                <!-- Brand logo-->
                <router-link class="brand-logo" :to="{ name: 'inicio-home' }">
                    <b-img fluid :src="appLogoImage" alt="logo" />
                </router-link>
                <!-- /Brand logo-->

                <!-- Left Text-->
                <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
                    <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
                        <b-img fluid :src="imgUrl" alt="Login V2" />
                    </div>
                </b-col>
                <!-- /Left Text-->

                <!-- Login-->
                <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
                    <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
                        <b-card-title class="mb-1 font-weight-bold" title-tag="h2">
                            Bienvenido a {{ appName }}! 👋
                        </b-card-title>
                        <b-card-text class="mb-2">
                            Inicie sesión en su cuenta y comience la aventura
                        </b-card-text>



                        <!-- form -->
                        <validation-observer ref="loginForm" #default="{ invalid }">
                            <b-form class="auth-login-form mt-2" @submit.prevent="login">
                                <!-- email -->
                                <b-form-group label="Email" label-for="login-email">
                                    <validation-provider #default="{ errors }" name="Email" vid="email"
                                        rules="required|email">
                                        <b-form-input id="login-email" v-model="userEmail"
                                            :state="errors.length > 0 ? false : null" name="login-email"
                                            placeholder="homiup@ejemplo.com" />
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>

                                <!-- forgot password -->
                                <b-form-group>
                                    <div class="d-flex justify-content-between">
                                        <label for="login-password">Password</label>
                                        <b-link :to="{ name: 'auth-forgot-password' }">
                                            <small>Olvidaste tu contraseña?</small>
                                        </b-link>
                                    </div>
                                    <validation-provider #default="{ errors }" name="Password" vid="password"
                                        rules="required">
                                        <b-input-group class="input-group-merge"
                                            :class="errors.length > 0 ? 'is-invalid' : null">
                                            <b-form-input id="login-password" v-model="password"
                                                :state="errors.length > 0 ? false : null" class="form-control-merge"
                                                :type="passwordFieldType" name="login-password"
                                                placeholder="Contraseña" />
                                            <b-input-group-append is-text>
                                                <feather-icon class="cursor-pointer" :icon="passwordToggleIcon"
                                                    @click="togglePasswordVisibility" />
                                            </b-input-group-append>
                                        </b-input-group>
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>

                                <!-- checkbox -->
                                <b-form-group>
                                    <b-form-checkbox id="remember-me" v-model="status" name="checkbox-1">
                                       Recordarme
                                    </b-form-checkbox>
                                </b-form-group>

                                <!-- submit buttons -->
                                <b-button type="submit" variant="primary" block :disabled="overlay">
                                    Iniciar sesion
                                </b-button>
                            </b-form>
                        </validation-observer>

                        <b-card-text class="text-center mt-2">
                            <span>¿No tienes cuenta? </span>
                            <b-link :to="{ name: 'auth-register' }">
                                <span>Registrarme</span>
                            </b-link>
                        </b-card-text>

                        <!-- divider -->
                        <div class="divider my-2">
                            <div class="divider-text">
                                o
                            </div>
                        </div>

                        <!-- social buttons -->

                        <!-- divider -->
                        <div class="divider my-2">
                            <div class="divider-text">Iniciar sesión con</div>
                        </div>

                        <div class="auth-footer-btn d-flex justify-content-center">
                            <login-google></login-google>
                        </div>

                        <div class="mt-2">
                            <center>
                                <soporte-whatsapp />
                            </center>
                        </div>

                    </b-col>
                </b-col>
                <!-- /Login-->
            </b-row>

        </div>
    </b-overlay>

</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
    BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BAlert, VBTooltip,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import mixinUserdata from "@/views/pages/authentication/mixinUserdata";
import soporteWhatsapp from "../../componente/Soporte-whatsapp.vue";
import loginGoogle from "./components/LoginGoogle.vue";
import { HELPERS } from "@/libs/helpers.js";
import { $themeConfig } from '@themeConfig'


export default {
    directives: {
        'b-tooltip': VBTooltip,
    },
    components: {
        BRow,
        BCol,
        BLink,
        BFormGroup,
        BFormInput,
        BInputGroupAppend,
        BInputGroup,
        BFormCheckbox,
        BCardText,
        BCardTitle,
        BImg,
        BForm,
        BButton,
        BAlert,
        VuexyLogo,
        ValidationProvider,
        ValidationObserver,
        loginGoogle,
        "soporte-whatsapp": soporteWhatsapp,
    },
    mixins: [togglePasswordVisibility, mixinUserdata],
    setup() {
        const { appName, appLogoImage } = $themeConfig.app;

        return {
            appLogoImage,
            appName
        }
    },
    data() {
        return {
            status: '',
            password: null,
            userEmail: null,
            sideImg: require('@/assets/images/pages/login-v2.svg'),

            // validation rules
            required,
            email,
            overlay: false,
        }
    },
    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
        },
        imgUrl() {
            if (store.state.appConfig.layout.skin === 'dark') {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
                return this.sideImg
            }
            return this.sideImg
        },
    },
    methods: {
        async login() {
            this.overlay = true;
            await this.$http.post(HELPERS.URL_API + '/api/login', { email: this.userEmail, password: this.password })
                .then(async response => {
                    const { token } = response.data;

                    Object.assign(localStorage, {
                        accessToken: token.access_token,
                        refreshToken: token.refresh_token
                    });

                    await this.setUserData()
                        .then(async (userData) => {
                            await this.$router.replace(getHomeRouteForLoggedInUser(userData.role.slug))
                                .then(() => {
                                    this.overlay = false;
                                    this.$toast({
                                        component: ToastificationContent,
                                        props: {
                                            title: 'Bienvenido',
                                            icon: "CheckCircleIcon",
                                            text: userData.username,
                                            variant: "success",
                                        }
                                    });
                                });
                        }).catch(error => {
                            console.error(error);
                            this.$toast({
                                component: ToastificationContent,
                                props: {
                                    title: 'Algo salio mal',
                                    icon: "AlertCircleIcon",
                                    text: 'Si el problema persiste recarga la pagina o comunica con soporte',
                                    variant: "danger",
                                },
                            });
                        });
                }).catch(async error => {
                    console.error(error);
                    let { data } = error.response;
                    await this.$swal({
                        title: 'Alerta de verificación',
                        text: data.errorMessage,
                        icon: data.status === 404 ? 'info' : "warning",
                        showDenyButton: data.status === 404,
                        showConfirmButton: data.status !== 404,
                        customClass: {
                            denyButton: "btn btn-info",
                            confirmButton: "btn btn-warning",
                        },
                        confirmButtonText: "Cerrar",
                        denyButtonText: 'Registrarme',
                        buttonsStyling: false,
                    }).then(result => {
                        if (result.isDenied)
                            this.$router.replace({ path: '/register' })
                    })
                    this.overlay = false;
                });
        }


    },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>

<style lang="css" scoped>
.brand-logo img {
    width: 100%;
    max-width: 210px;
}
</style>
