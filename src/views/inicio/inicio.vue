<template>
    <div id="Home">
        <nav class="navbar navbar-expand-lg navbar-light" id="gtco-main-nav">
            <div class="container px-1">
                <a href="#Home">
                    <figure class="logo">
                        <img :src="appLogoImage" alt="">
                    </figure>
                </a>
                <button class="navbar-toggler" id='btn_menu-mobile' :class="{ 'open': menuState }" v-on:click="showMenuMobile"
                    data-target="#my-nav"><span class="bar1"></span><span class="bar2"></span> <span class="bar3"></span>
                </button>
                <div id="my-nav" class="flex-grow-1" :class="{ 'open': menuState }">
                    <ul class="navbar-nav mr-lg-auto">
                        <li class="nav-item"><a class="nav-link text_bold" href="#app-mobile"
                                @click="() => menuState = false">Aplicación móvil</a></li>
                        <li class="nav-item"><a class="nav-link text_bold" href="#beneficios"
                                @click="() => menuState = false">Beneficios</a></li>
                        <li class="nav-item"><a class="nav-link text_bold" href="#web"
                                @click="() => menuState = false">Páginas web</a></li>
                        <li class="nav-item"><a class="nav-link text_bold" href="#planes"
                                @click="() => menuState = false">Plan</a></li>
                        <li class="nav-item"><a class="nav-link text_bold" href="#contacto"
                                @click="() => menuState = false">Contacto</a></li>
                    </ul>
                    <div class="form-inline">
                        <router-link :to="{ name: 'auth-login' }"
                            class="btn btn-outline-dark my-1 mr-1 mr-lg-2 text-uppercase">Iniciar sesión</router-link>
                        <router-link :to="{ name: 'auth-register' }"
                            class="btn btn-info my-1 text-uppercase">Registrarse</router-link>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container-fluid gtco-banner-area" id="banner">
            <div class="container" style="margin: 0 auto;">
                <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6">
                        <h1>
                            CRM INMOBILIARIO<br>
                            <b>Real Estate Digital</b>
                        </h1>
                        <p class="mb-1">CRM multiplataforma y multiusuarios para Inmobiliarias y agentes independientes.
                            Gestiona tus inmuebles, tus clientes, tu agenda.</p>
                        <p class="mt-0">Automatiza campañas de marketing digital, obten tu página web y ten mayor
                            visibilidad en el mercado.</p>
                        <router-link :to="{ name: 'auth-register' }">
                            Registrarse
                            <i class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                    <path
                                        d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                                </svg>
                            </i>
                        </router-link>
                    </div>
                    <div class="col-md-10 col-lg-6 my-auto">
                        <sliderInicio :images="sliderImages"></sliderInicio>
                        <!-- <div class="images-banner"><img class="card-img-top img-fluid" src="./img/banner.png" alt=""></div> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid gtco-features" id="beneficios">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <svg id="bg-services" width="100%" viewBox="0 0 1000 800">
                            <defs>
                                <linearGradient id="PSgrad_02" x1="64.279%" x2="0%" y1="76.604%" y2="0%">
                                    <stop offset="0%" stop-color="#8541ff" stop-opacity="1" />
                                    <stop offset="100%" stop-color="#f0beff" stop-opacity="1" />
                                </linearGradient>
                            </defs>
                            <path fill-rule="evenodd" opacity="0.102" fill="url(#PSgrad_02)"
                                d="M801.878,3.146 L116.381,128.537 C26.052,145.060 -21.235,229.535 9.856,312.073 L159.806,710.157 C184.515,775.753 264.901,810.334 338.020,792.380 L907.021,652.668 C972.912,636.489 1019.383,573.766 1011.301,510.470 L962.013,124.412 C951.950,45.594 881.254,-11.373 801.878,3.146 Z" />
                        </svg>
                        <div class="row">
                            <div class="col-lg-12">
                                <h2 class="text-center">Beneficios</h2>
                                <p class="text-center">
                                    Ahorre tiempo y sea más efectivo aprovechando los beneficios que <b>CRM RED</b> tiene
                                    para usted.
                                </p>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-12 col-sm-6 col-lg-4 d-flex">
                                <div class="card text-center">
                                    <div class="oval"><img class="card-img-top" src="./img/icono-leads.png" alt=""></div>
                                    <div class="card-body">
                                        <h3 class="card-title">Leads automáticos</h3>
                                        <p class="card-text">
                                            <b>CRM RED</b> crea los leads de portales en el sistema como contactos de forma
                                            automática
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4 d-flex">
                                <div class="card text-center">
                                    <div class="oval"><img class="card-img-top" src="./img/icono-tareas.png" alt=""></div>
                                    <div class="card-body">
                                        <h3 class="card-title">Tareas</h3>
                                        <p class="card-text">
                                            Cree diversas tareas como gestión de clientes, proveedores, recordatorios y
                                            mucho más!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4 d-flex">
                                <div class="card text-center">
                                    <div class="oval"><img class="card-img-top" src="./img/icono-ficha-multiple.png" alt="">
                                    </div>
                                    <div class="card-body">
                                        <h3 class="card-title">Fichas múltiples</h3>
                                        <p class="card-text">
                                            Relacione todos los inmuebles que desea en un solo envío al cliente
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4 d-flex">
                                <div class="card text-center">
                                    <div class="oval"><img class="card-img-top" src="./img/icono-segumiento-de-negocio.png"
                                            alt=""></div>
                                    <div class="card-body">
                                        <h3 class="card-title">Seguimiento negocios</h3>
                                        <p class="card-text">
                                            Entérese del estado en el cual se encuentra cada uno de los negocios
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4 d-flex">
                                <div class="card text-center">
                                    <div class="oval"><img class="card-img-top" src="./img/icono-agenda.png" alt=""></div>
                                    <div class="card-body">
                                        <h3 class="card-title">Agenda</h3>
                                        <p class="card-text">
                                            Programe visitas a inmuebles, reuniones con clientes y eventos de todo tipo
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4 d-flex">
                                <div class="card text-center">
                                    <div class="oval"><img class="card-img-top" src="./img/icono-capacitaciones.png" alt="">
                                    </div>
                                    <div class="card-body">
                                        <h3 class="card-title">Captaciones</h3>
                                        <p class="card-text">
                                            Ingrese los inmuebles que desea administrar y realice seguimiento hasta lograrlo
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4 d-flex">
                                <div class="card text-center">
                                    <div class="oval"><img class="card-img-top" src="./img/icono-estadisticas.png" alt="">
                                    </div>
                                    <div class="card-body">
                                        <h3 class="card-title">Estadísticas gerenciales</h3>
                                        <p class="card-text">
                                            Con nuestras estadísticas podrás crear una trazabilidad de todo tu negocio
                                            inmobiliario para tomar decisiones estratégicas que potencien tu negocio
                                            inmobiliario.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-4 d-flex">
                                <div class="card text-center">
                                    <div class="oval"><img class="card-img-top" src="./img/icono-pagina-web.png" alt="">
                                    </div>
                                    <div class="card-body">
                                        <h3 class="card-title">Páginas web</h3>
                                        <p class="card-text">
                                            Crea páginas web de una manera fácil y sencilla con nuestras plantillas pensadas
                                            y diseñadas para potenciar tu negocio.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid gtco-features" id="app-mobile">
            <div class="container">
                <div class="row align-items-center flex-column-reverse flex-lg-row">
                    <div class="col-md-8 col-lg-7">
                        <div class="cover">
                            <svg class="back-bg" width="100%" viewBox="0 0 900 700" style="position:absolute; z-index: -1">
                                <defs>
                                    <linearGradient id="PSgrad_01" x1="64.279%" x2="0%" y1="76.604%" y2="0%">
                                        <stop offset="0%" stop-color="#8541ff" stop-opacity="1" />
                                        <stop offset="100%" stop-color="#f0beff" stop-opacity="1" />
                                    </linearGradient>
                                </defs>
                                <path fill-rule="evenodd" opacity="0.102" fill="url(#PSgrad_01)"
                                    d="M616.656,2.494 L89.351,98.948 C19.867,111.658 -16.508,176.639 7.408,240.130 L122.755,546.348 C141.761,596.806 203.597,623.407 259.843,609.597 L697.535,502.126 C748.221,489.680 783.967,441.432 777.751,392.742 L739.837,95.775 C732.096,35.145 677.715,-8.675 616.656,2.494 Z" />
                            </svg>
                            <!-- *************-->
                            <img src="./img/celular-mockup.png" class="img-fluid" alt="">
                        </div>
                    </div>
                    <div class="col-md-9 col-lg-5">
                        <h2>Aplicación móvil</h2>
                        <p>
                            Verifica el estado de tus inmuebles, agendamiento de citas y todas las herramientas que posee
                            nuestro CRM desde la palma de tu mano.
                        </p>
                        <div class="row my-2 btns-store">
                            <div class="col-auto"><a :style="{ background: 'none', padding: 0, margin: 0 }"
                                    href="https://play.google.com/store/apps/details?id=com.crmred.crmred"
                                    target="_blank"><img src="./img/btn-play-store.png" alt="" class="img-fluid"></a></div>
                            <div class="col-auto">
                                <img src="./img/btn-app-store.png" alt="" class="img-fluid">
                                <span class="coming-soon">
                                    PRÓXIMAMENTE
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid gtco-features" id="web">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-9 col-lg-4">
                        <h2>Página web inmobiliaria</h2>
                        <p>Muestra tus inmuebles en tu propio sitio web personalizado, configura tu logo, tus colores,
                            captura contactos de forma automática y realiza campañas de email marketing, todo esto
                            conservando y potencializando tu marca.</p>
                        <p><b>¡Lleva siempre el control de tus clientes e incrementa los negocios con tu portal!</b></p>
                    </div>
                    <div class="col-md-12 col-lg-8">
                        <svg id="bg-services" width="100%" viewBox="0 0 1000 800">
                            <defs>
                                <linearGradient id="PSgrad_02" x1="64.279%" x2="0%" y1="76.604%" y2="0%">
                                    <stop offset="0%" stop-color="#8541ff" stop-opacity="1" />
                                    <stop offset="100%" stop-color="#f0beff" stop-opacity="1" />
                                </linearGradient>
                            </defs>
                            <path fill-rule="evenodd" opacity="0.102" fill="url(#PSgrad_02)"
                                d="M801.878,3.146 L116.381,128.537 C26.052,145.060 -21.235,229.535 9.856,312.073 L159.806,710.157 C184.515,775.753 264.901,810.334 338.020,792.380 L907.021,652.668 C972.912,636.489 1019.383,573.766 1011.301,510.470 L962.013,124.412 C951.950,45.594 881.254,-11.373 801.878,3.146 Z" />
                        </svg>
                        <div class="row">
                            <div class="col">
                                <img src="https://res.cloudinary.com/dppmjy7uj/image/upload/v1679005346/banners-home/Imagen5_gy8hg7.png"
                                    class="img-fluid" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid gtco-features" id="portales">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col">
                        <h2 class="text-center">Portales integrados</h2>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid"
                            src="./img/portales/logo-fincaraiz.png" alt=""></div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid"
                            src="./img/portales/logo-clasificadoselpais.png" alt=""></div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid"
                            src="./img/portales/logo-metrocuadrado.png" alt=""></div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid"
                            src="./img/portales/logo-ciencuadras.png" alt=""></div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid"
                            src="./img/portales/logo-mitula.png" alt=""></div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid"
                            src="./img/portales/puntopropiedad-logo.png" alt=""></div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid"
                            src="./img/portales/logo-nestoria.png" alt=""></div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid" src="./img/portales/nuroa-logo.png"
                            alt=""></div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid"
                            src="./img/portales/properati-logo.png" alt=""></div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid"
                            src="./img/portales/trovit-logo.png" alt=""></div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2"><img class="img-fluid"
                            src="./img/portales/logo-mercado-libre.png" alt=""></div>
                </div>
            </div>
        </div>
        <div class="container-fluid gtco-features" id="planes">
            <div class="container">
                <div class="row">
                     <div class="col-lg-12">

                        <plansMembership />
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid gtco-features" id="contacto">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h2 class="text-center">Contáctanos</h2>
                        <p class="mb-2 text-center">
                            Escríbenos para resolver cualquier clase de duda que tengas,<br class="d-none d-md-block"> o si
                            requieres una atención más personalizada.
                        </p>
                    </div>
                </div>
                <div class="row justify-content-center mt-4">
                    <div class="col-12 col-md-8 col-xl-6 d-flex">
                        <form class="form">
                            <div class="row">
                                <div class="col">
                                    <fieldset class="form-group">
                                        <legend>Nombre <span class="required">*</span></legend>
                                        <input type="text" class="form-control">
                                    </fieldset>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm">
                                    <fieldset class="form-group">
                                        <legend>Correo electrónico <span class="required">*</span></legend>
                                        <input type="email" class="form-control">
                                    </fieldset>
                                </div>
                                <div class="col-12 col-sm">
                                    <fieldset class="form-group">
                                        <legend>Celular <span class="required">*</span></legend>
                                        <input type="text" class="form-control">
                                    </fieldset>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <fieldset class="form-group">
                                        <legend>Empresa <span class="required">*</span></legend>
                                        <input type="text" class="form-control">
                                    </fieldset>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <fieldset class="form-group">
                                        <legend>Mensaje <span class="required">*</span></legend>
                                        <textarea class="form-control"></textarea>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-auto">
                                    <b-form-group>
                                        <b-form-checkbox>
                                            Aceptar <a class="TyC" :href="Politica" target="_blank">política de
                                                privacidad</a>
                                        </b-form-checkbox>
                                    </b-form-group>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col text-center">
                                    <button class="btn submit-button">
                                        Enviar
                                        <i class="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 256 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                <path
                                                    d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                                            </svg>
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <footer class="container-fluid" id="gtco-footer">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <p class="text-center">CRM Red &copy; 2022</p>
                    </div>
                </div>
            </div>
        </footer>

    </div>
</template>

<script >
import { $themeConfig } from '@themeConfig';
import sliderInicio from './sliderInicio.vue'
import PlansMembership from "@/views/pages/authentication/components/plansMembership.vue"

//   import {  } from "../pages/authentication/components/plansMembership.vue";
export default {

    name: 'inicio',

    data() {
        return {
            Politica: 'https://res.cloudinary.com/addycrm/image/upload/v1653001354/default/politica-de_privacidad-crmred_sj1vvu.pdf',
            menuState: false,
            sliderImages: [
                {
                    url: 'https://res.cloudinary.com/dppmjy7uj/image/upload/v1678899038/banners-home/banner_blo8gp.png',
                    width: 600 + 'px',
                    height: 300 + 'px'
                },
                {
                    url: 'https://res.cloudinary.com/dppmjy7uj/image/upload/v1678992483/banners-home/Imagen3_t807ze.png',
                    width: 600 + 'px',
                    height: 600 + 'px'
                },
                {
                    url: 'https://res.cloudinary.com/dppmjy7uj/image/upload/v1678991419/banners-home/Imagen1_wp0ffx.png',
                    width: 600 + 'px',
                    height: 600 + 'px'
                },
                {
                    url: 'https://res.cloudinary.com/dppmjy7uj/image/upload/v1678993569/banners-home/Imagen4_favehw.png',
                    width: 650 + 'px',
                    height: 600 + 'px'
                }
            ]
        }
    },
    components: {
        sliderInicio,
        PlansMembership
    },
    mounted() {
        this.changeTab();
    },
    computed: {

    },
    methods: {
        changeTab() {
            for (let _ref in this.$refs) {
                this.$refs[_ref].addEventListener('click', () => {
                    let _colCardPlan = document.querySelectorAll('.col-card-plan');
                    _colCardPlan.forEach((item) => {
                        item.classList.add('off');
                        if (item.classList.contains(_ref))
                            item.classList.remove('off');
                    });

                    let _navPlan = document.querySelectorAll('.nav-planes .plan');
                    _navPlan.forEach((item) => {
                        item.classList.add('off');
                        if (item.classList.contains(_ref))
                            item.classList.remove('off');
                    });
                })
            }
        },

        showMenuMobile: function () {
            let state = false
            function onClickMenu(event) {
                if (document.getElementById('btn_menu-mobile').contains(event.target)) {
                    state = true
                }
                else {
                    state = false
                }
            }
            window.addEventListener('click', onClickMenu(event))
            this.menuState = !this.menuState
        }
    },
    setup() {
        const { appName, appLogoImage } = $themeConfig.app;

        return {
            appLogoImage,
        }
    },
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Open+Sans:wght@300;400;500;600;700&display=swap');

#Home {
    --color-pri: #7367f0;
    --color-sec: #3c30bf;
    --color-tri: #1c1193;

}

b {
    font-weight: 700;

}

p {
    font-family: "Open Sans";
    font-weight: 400;
    color: #666666;
    font-size: 16px;
    line-height: 2;

}

#Home {
    font-family: "Open Sans";
    font-weight: 400;
    color: #212529;

}

#beneficios {
    margin-top: 50px;
}

.images-banner {
    margin-right: -25%;
    margin-left: -30%;
    margin-top: 60px;

}

@media(max-width: 1199px) {
    .images-banner {
        margin-right: -10%;
        margin-left: -10%;
        margin-top: -20px;
    }
}

@media (min-width: 1200px) {
    .container {
        max-width: 1240px;

    }
}

#gtco-main-nav {
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 3;
    box-shadow: 0 0 10px #00000026;
    padding: 10px 0;

}

#gtco-main-nav .navbar-brand {
    font-size: 36px;
    font-family: "Lato";
    font-weight: 700;
    text-transform: uppercase;
    background: -webkit-linear-gradient(left, #1d3ede, #01e6f8);
    background: -ms-linear-gradient(left, #1d3ede, #01e6f8);
    background: -moz-linear-gradient(left, #1d3ede, #01e6f8);
    background: -o-linear-gradient(left, #1d3ede, #01e6f8);
    -webkit-background-clip: text;
    -ms-background-clip: text;
    -o-background-clip: text;
    -webkit-text-fill-color: transparent;
    -ms-text-fill-color: transparent;
    -o-text-fill-color: transparent;

}

#gtco-main-nav .bar1,
#gtco-main-nav .bar2,
#gtco-main-nav .bar3 {
    width: 25px;
    height: 2px;
    background-color: var(--color-pri);
    margin: 5px 0;
    transition: 0.4s;
    display: block;
    position: relative;

}

#gtco-main-nav .change .bar1 {
    -webkit-transform: rotate(-42deg) translate(-2px, 6px);
    transform: rotate(-42deg) translate(-2px, 6px);

}

#gtco-main-nav .change .bar2 {
    opacity: 0;

}

#gtco-main-nav .change .bar3 {
    -webkit-transform: rotate(46deg) translate(-4px, -8px);
    transform: rotate(46deg) translate(-4px, -8px);

}

#gtco-main-nav .navbar-nav li a {
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    padding: 5px 15px !important;
    text-transform: uppercase;

}

#gtco-main-nav .form-inline a {
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    padding: 5px 25px;
    border-radius: 20px;
    border-width: 2px !important;

}

#gtco-main-nav .form-inline a.btn-info {
    background: var(--color-tri) !important;
    border-color: var(--color-tri) !important;

}

#gtco-main-nav .form-inline a.btn-outline-dark {
    color: var(--color-pri);
    border-color: var(--color-pri) !important;
    background-color: transparent;

}

@media (max-width: 991px) {
    #gtco-main-nav .form-inline a.btn-outline-dark {
        border-color: #1d3ede;
        color: #1d3ede;

    }
}

#banner {
    min-height: 640px;
}

#banner::after {
    position: absolute;
    content: "";
    height: 600px;
    width: 900px;
    background-image: linear-gradient(-220deg, var(--color-sec), var(--color-pri));
    left: 49.5%;
    top: -50px;
    z-index: -1;
    border-radius: 50% 0 50% 50%;

}

#banner::before {
    position: absolute;
    content: "";
    height: 590px;
    width: 930px;
    background-image: -webkit-linear-gradient(to right, #e8eefc, #e6fafe);
    background-image: -moz-linear-gradient(to right, #e8eefc, #e6fafe);
    background-image: -ms-linear-gradient(to right, #e8eefc, #e6fafe);
    background-image: -o-linear-gradient(to right, #e8eefc, #e6fafe);
    background-image: linear-gradient(to right, #e8eefc, #e6fafe);
    left: 47.5%;
    top: -25px;
    z-index: -1;
    border-radius: 50% 0 50% 50%;

}

@media (min-width: 992px) and (max-width: 1400px) {
    #banner::after {
        height: 550px;
        width: 800px;
    }

    #banner::before {
        height: 540px;
        width: 810px;
    }
}

@media (max-width: 991px) {

    #banner::before,
    #banner::after {
        top: auto;
        bottom: 0;
        width: 100vw;
        height: auto;
        left: 50%;
        transform: translateX(-50%);
        padding-top: 25%;
        margin-bottom: 8%;
        border-radius: 0;
    }

    #banner::before {
        transform: scaleY(1.2) translateX(-50%);
    }
}

.gtco-banner-area a:not(.TyC),
.gtco-feature a:not(.TyC),
.gtco-features a:not(.TyC),
.gtco-news .owl-carousel .card a:not(.TyC),
.btn.submit-button {
    background-image: linear-gradient(to left, var(--color-pri) 0%, var(--color-sec) 100%);
    font-size: 18px;
    font-family: "Open Sans";
    font-weight: 600;
    color: #fff;
    border-radius: 50px;
    padding: 0.55em 1.7em;
    text-transform: uppercase;
    padding-right: 5px;
    text-decoration: none !important;
    display: inline-flex !important;
    align-items: center;

}

.gtco-banner-area a .icon,
.gtco-feature a .icon,
.gtco-features a .icon,
.gtco-news .owl-carousel .card a .icon,
.btn.submit-button .icon {
    background: #fff;
    border-radius: 50%;
    height: 1.5em;
    width: 1.5em;
    color: var(--color-pri);
    font-size: 1.4em;
    text-align: center;
    margin: -15px 0;
    margin-left: 0.6em;
    display: inline-flex;
    justify-content: center;
    align-items: center;

}

.btn .icon svg,
a .icon svg {
    width: 75%;
    height: 75%;
    fill: currentColor;
    position: static;
    margin: 0;
}

.gtco-feature h2,
.gtco-features h2 {
    font-family: "Lato";
    font-weight: 700;
    color: #000000;
    font-size: 36px;
    margin-bottom: 30px;
    text-transform: capitalize;

}

@media(max-width: 1199px) {

    .gtco-feature h2,
    .gtco-features h2 {
        font-size: 30px;
    }
}

.card {
    border: none;
    background: transparent;

}

.gtco-banner-area {
    min-height: 500px;
    position: relative;

}

.gtco-banner-area h1 {
    font-family: "Lato";
    font-weight: 300;
    font-size: 46px;
    color: #000000;
    max-width: 500px;
    margin-top: 70px;

}

.gtco-banner-area h1 b {
    color: var(--color-pri);

}

.gtco-banner-area h1 span {
    font-family: "Lato";
    font-weight: 500;

}

@media (max-width: 1199px) {
    .gtco-banner-area h1 {
        margin-top: 30px;
        font-size: 40px;

    }
}

.gtco-banner-area p {
    max-width: 450px;
    margin: 20px 0;
    line-height: 2 !important;
    font-size: 16px;
    margin-bottom: 40px;

}

@media(max-width: 1199px) {

    .gtco-banner-area h1,
    .gtco-banner-area p {
        max-width: none;
    }
}

.gtco-banner-area a {
    display: inline;
    padding: 0.55em 1.7em;
    padding-right: 5px;

}

.gtco-banner-area .col-md-6 .card .card-img-top {
    margin: 0 auto;
    margin-top: 30px;
    margin-right: 0;

}

@media (max-width: 1400px) {
    .gtco-banner-area .col-md-6 .card .card-img-top {
        max-width: 400px;
        margin-top: 20px;
        margin-right: auto;

    }
}

@media (max-width: 1199px) {
    .gtco-banner-area .col-md-6 .card .card-img-top {
        max-width: 350px;

    }
}

@media (max-width: 767px) {
    .gtco-banner-area .col-md-6 .card .card-img-top {
        margin-top: 100px;

    }
}

.gtco-feature {
    margin-top: 100px;

}

.gtco-feature .card .back-bg {
    margin-left: -30px !important;
    margin-top: -20px;

}

.gtco-feature .card svg {
    display: block;
    margin-left: auto;
    margin-right: auto;

}

.gtco-feature .card svg.defs {
    position: absolute;
    width: 0;
    height: 0;

}

.gtco-feature .card .squircle {
    width: 100%;
    height: 450px;
    background-position-x: -50px;

}

.gtco-feature p small {
    font-size: 16px;

}

.gtco-feature a {
    margin-top: 20px;
    display: inline-block;

}

.gtco-features {
    margin-top: 100px;

}

@media(max-width: 1199px) {
    .gtco-features {
        margin-top: 50px;
    }
}

.gtco-features svg {
    position: absolute;
    margin-left: -100px;
    margin-top: 40px;

}

@media (max-width: 767px) {
    .gtco-features svg {
        margin: 0 auto;
        margin-top: 200px;

    }
}

@media (max-width: 991px) {
    .gtco-features h2 {
        margin-top: 0;

    }
}

.gtco-features .col-lg-8 {
    padding: 10px 100px;

}

@media (max-width: 767px) {
    .gtco-features .col-lg-8 {
        padding: 10px 0;

    }
}

@media (max-width: 600px) {
    .gtco-features .col-lg-8 .row .col:first-child {
        margin-top: 50px;

    }
}

@media (max-width: 600px) {
    .gtco-features .col-lg-8 .col {
        flex: 0 0 100%;
        max-width: 100%;

    }
}

.gtco-features .card {
    background: #fff;
    margin: 30px 5px;
    padding: 20px 10px;
    border-radius: 20px;
    box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.08);
    overflow: visible;

}

.gtco-features .card .oval {
    background: linear-gradient(to right, #f1f6fd, #f0fbfe);
    padding: 10px;
    width: 150px;
    border-radius: 50%;
    margin: auto;
    transform: rotate(20deg);
    margin-top: 20px;

}

.gtco-features .card .card-img-top {
    max-width: 0.8in;
    margin: 0 auto;
    transform: rotate(-20deg);

}

.gtco-features .card h3 {
    font-family: "Lato";
    font-weight: 600;
    font-size: 22px;
    color: var(--color-sec);

}

.gtco-features .card p {
    font-size: 14px;
    line-height: 1.8 !important;

}

.gtco-numbers-block {
    margin: 100px auto;
    margin-top: 200px;
    color: #fff;

}

@media (max-width: 600px) {
    .gtco-numbers-block {
        margin-top: 100px;

    }
}

@media (max-width: 1299px) {
    .gtco-numbers-block .row {
        max-width: 1000px;
        margin: 0 auto;

    }
}

@media (max-width: 767px) {
    .gtco-numbers-block .row .col-3 {
        padding: 0;

    }
}

.gtco-numbers-block #custom-map::before {
    position: absolute;
    content: "";
    height: 100px;
    width: 100%;
    border: 2px solid red;

}

.gtco-numbers-block svg {
    margin-top: -100px;
    position: absolute;
    left: 0;
    max-width: 1500px;
    right: 0;
    margin-left: auto;
    margin-right: auto;

}

@media (max-width: 1299px) {
    .gtco-numbers-block svg {
        margin-top: -90px;

    }
}

@media (max-width: 1199px) {
    .gtco-numbers-block svg {
        margin-top: -60px;

    }
}

@media (max-width: 991px) {
    .gtco-numbers-block svg {
        margin-top: -40px;

    }
}

@media (max-width: 650px) {
    .gtco-numbers-block svg {
        margin-top: -20px;

    }
}

@media (max-width: 600px) {
    .gtco-numbers-block svg {
        margin-top: -10px;

    }
}

.gtco-numbers-block h5 {
    font-family: "Lato";
    font-weight: 700;
    font-size: 60px;

}

@media (max-width: 1299px) {
    .gtco-numbers-block h5 {
        font-size: 48px;

    }
}

@media (max-width: 767px) {
    .gtco-numbers-block h5 {
        font-size: 24px;

    }
}

@media (max-width: 600px) {
    .gtco-numbers-block h5 {
        margin: 0;
        font-size: 18px;

    }
}

.gtco-numbers-block p {
    font-family: "Lato";
    font-weight: 600;
    font-size: 24px;
    color: #fff;

}

@media (max-width: 1299px) {
    .gtco-numbers-block p {
        font-size: 18px;

    }
}

@media (max-width: 991px) {
    .gtco-numbers-block p {
        font-size: 16px;

    }
}

@media (max-width: 991px) {
    .gtco-numbers-block p {
        font-size: 16px;

    }
}

@media (max-width: 600px) {
    .gtco-numbers-block p {
        line-height: 1.1 !important;

    }
}

@media (max-width: 500px) {
    .gtco-numbers-block p {
        font-size: 8px;

    }
}

.gtco-testimonials {
    position: relative;
    margin-top: 200px;

}

@media (max-width: 767px) {
    .gtco-testimonials {
        margin-top: 100px;

    }
}

.gtco-testimonials h2 {
    font-family: "Lato";
    font-weight: 500;
    font-size: 36px;
    text-align: center;
    color: #333333;
    margin-bottom: 100px;

}

.gtco-testimonials .owl-stage-outer {
    padding-bottom: 30px;

}

.gtco-testimonials .owl-nav {
    display: none;

}

.gtco-testimonials .owl-dots {
    text-align: center;

}

.gtco-testimonials .owl-dots span {
    position: relative;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: block;
    background: #fff;
    border: 2px solid #01e6f8;
    margin: 0 5px;

}

.gtco-testimonials .owl-dots .active {
    box-shadow: none;

}

.gtco-testimonials .owl-dots .active span {
    background: #01e6f8;
    box-shadow: none;
    height: 12px;
    width: 12px;
    margin-bottom: -1px;

}

.gtco-testimonials .card {
    background: #fff;
    box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.08);
    margin: 0 30px;
    padding: 0 20px;
    border-radius: 50px;

}

.gtco-testimonials .card .card-img-top {
    max-width: 100px;
    border-radius: 50%;
    margin: 0 auto;
    border: 5px solid #1d3ede;
    width: 100px;
    height: 100px;

}

.gtco-testimonials .card h5 {
    color: #1d3ede;
    font-size: 21px;
    line-height: 1.3 !important;
    font-family: "Lato";
    font-weight: 500;

}

.gtco-testimonials .card h5 span {
    font-size: 18px;
    color: #666666;
    font-family: "Open Sans";
    font-weight: 400;

}

.gtco-testimonials .card p {
    font-size: 18px;

}

.gtco-testimonials .active {
    opacity: 0.5;
    transition: all 0.3s;

}

.gtco-testimonials .center {
    opacity: 1;

}

.gtco-testimonials .center h5 {
    font-size: 24px;

}

.gtco-testimonials .center h5 span {
    font-size: 20px;

}

.gtco-testimonials .center p {
    font-size: 20px;

}

.gtco-testimonials .center .card-img-top {
    max-width: 100%;
    height: 120px;
    width: 120px;

}

.gtco-features-list {
    margin-top: 100px;

}

.gtco-features-list .media {
    margin: 20px 0;

}

.gtco-features-list .oval {
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.1);
    padding: 15px;
    height: 60px;
    width: 60px;

}

.gtco-features-list .oval .align-self-start {
    width: 100%;
    padding: 3px;

}

.gtco-features-list .media-body {
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    padding-right: 20px;

}

.gtco-features-list .media-body h5 {
    font-family: "Lato";
    font-weight: 600;
    margin-bottom: 20px !important;
    font-size: 22px;

}

.gtco-logo-area {
    margin: 50px auto;

}

.gtco-logo-area .col .img-fluid {
    max-height: 32px;

}

@media (max-width: 600px) {
    .gtco-logo-area .col {
        flex: 0 0 50%;
        max-width: 50%;
        margin: 20px 0;

    }
}

.gtco-news {
    background: #fcfcfc;
    padding: 50px 0;
    margin: 100px auto;

}

.gtco-news h2 {
    font-size: 36px;
    font-weight: "Lato";
    font-weight: 500;
    text-align: center;
    margin-bottom: 50px;

}

.gtco-news .owl-carousel .owl-nav {
    display: block !important;
    position: absolute;
    top: 25%;
    width: 100%;

}

@media (max-width: 600px) {
    .gtco-news .owl-carousel .owl-nav {
        display: none !important;

    }
}

.gtco-news .owl-carousel .owl-nav .owl-prev,
.gtco-news .owl-carousel .owl-nav .owl-next {
    font-size: 120px;
    color: #666666;
    position: absolute;

}

.gtco-news .owl-carousel .owl-nav .owl-prev {
    left: -50px;

}

.gtco-news .owl-carousel .owl-nav .owl-next {
    right: -50px;

}

.gtco-news .owl-carousel .card {
    padding: 0 25px;

}

.gtco-news .owl-carousel .card .card-img-top {
    border-radius: 40px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);

}

.gtco-news .owl-carousel .card h5 {
    font-family: "Lato";
    font-weight: 500;
    font-size: 22px;
    color: #333333;
    margin-bottom: 20px;

}

@media (max-width: 767px) {
    .gtco-news .owl-carousel .card h5 {
        font-size: 18px;

    }
}

.gtco-news .owl-carousel .card p {
    font-size: 17px;

}

@media (max-width: 767px) {
    .gtco-news .owl-carousel .card p {
        font-size: 15px;

    }
}

.gtco-news .owl-carousel .card a {
    padding-top: 3px !important;
    padding-bottom: 3px !important;

}

#gtco-footer {
    padding-bottom: 20px;

}

#gtco-footer h4 {
    font-family: "Lato";
    font-weight: 500;
    font-size: 24px;
    color: #1d3ede;
    margin-bottom: 30px;

}

.form-group input,
.form-group textarea {
    background-color: white;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.08);
    border-radius: 50px;
    width: 100%;
    height: 50px;
    border: none;
    padding-left: 30px;
    color: #000;

}

.form-group input::-webkit-input-placeholder,
.form-group input::-moz-placeholder,
.form-group input:-ms-input-placeholder,
.form-group input:-moz-placeholder,
.form-group textarea::-webkit-input-placeholder,
.form-group textarea::-moz-placeholder,
.form-group textarea:-ms-input-placeholder,
.form-group textarea:-moz-placeholder {
    color: #999999;
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 18px;

}

.form-group textarea {
    min-height: 200px;
    border-radius: 30px;
    padding-top: 20px;
    padding-right: 20px;
    resize: none;

}

#gtco-footer .company-nav,
#gtco-footer .services-nav {
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 20px;

}

#gtco-footer .company-nav a:not(.TyC),
#gtco-footer .services-nav a {
    color: #666666;
    margin: 0;
    padding: 0;

}

#gtco-footer .follow-us-nav a {
    padding: 0 10px;
    color: #666666;

}

@media (max-width: 385px) {
    #gtco-footer .follow-us-nav a {
        padding-right: 0;

    }
}

#gtco-footer .follow-us-nav a .icon {
    font-size: 24px;

}

#gtco-footer .col-12 {
    margin-top: 90px;

}

#gtco-footer .col-12 p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 18px;
    color: #999999;

}

@media (max-width: 991px) {
    #gtco-footer .col-12 {
        margin-top: 20px;

    }
}

@media (max-width: 991px) {
    #gtco-footer .col-lg-6 {
        margin-bottom: 50px;

    }
}

.coming-soon {
    display: block;
    font-size: 18px;
    text-align: center;
    font-weight: 700;
    font-style: italic;
    color: var(--color-sec);

}

.gtco-features h2::after {
    content: '';
    background: var(--color-pri);
    display: block;
    width: 3rem;
    height: 3px;
    margin-top: 8px;
}

.gtco-features h2.text-center::after {
    margin-left: auto;
    margin-right: auto;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group legend {
    font-size: 1rem;
    line-height: 1.4 !important;
}

.form-group legend .required {
    color: red;
    font-size: 0.9em;
    margin-left: 8px;
}

.form {
    display: block;
    width: 100%;
}

.logo {
    margin-bottom: 0;
    margin-right: 1rem;
}

.logo img {
    height: 30px;
    width: auto;
    display: block;
}

.nav.nav-tabs {
    border-bottom: 0;
    justify-content: center;
}

.text_bold {
    font-weight: bold;

}

.nav-link {
    font-size: 2.5rem;
    padding: 8px 4px;
    color: var(--color-pri);
    background: #fff;
}

.nav-link:hover {
    cursor: pointer;
    border-radius: 20px;
    border: 1px solid var(--color-pri);
    transition: all ease 0.4s;

}

.nav.nav-tabs .nav-item:first-child .nav-link {
    border-left-width: 2px;
    border-radius: 10px 0 0 10px;
}

.nav.nav-tabs .nav-item:last-child .nav-link {
    border-right-width: 2px;
    border-radius: 0 10px 10px 0;
}

.nav.nav-tabs .nav-link.active {
    color: #fff;
    background: var(--color-pri);
}

ul.list-items {
    padding: 0;
    list-style: none;
    border-top: 1px solid #ddd;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
}

ul.list-items li.list-item {
    margin-top: 20px;
}

ul.list-items li.list-item span {
    font-size: 0.65em;
    line-height: 1.4 !important;
    display: block;
    color: #777;
    margin-top: 2px;
}

.table-planes tr {
    background: #fff;
}

.table-planes tr:nth-child(even) {
    background: #f3f3f3;
}

.card.plan,
.card.servicios {
    margin: 10px;
    padding: 0;
}

.table-planes {
    margin-top: 1rem;
}

.table-planes td {
    padding: 10px 25px;
    border: none;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.head-table {
    font-size: 24px;
    line-height: 1.4;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
    font-weight: 700;
    padding: 15px 25px;
    border-bottom: 2px solid #7367f0;
    border-radius: 20px 20px 0 0;

}

.head-table span {
    font-size: 0.6em;
    font-weight: 600;
    line-height: 1;
}

.head-table,
.table-planes td {
    justify-content: center;
}

.plan .head-table {
    color: #fff;
}

.plan.basic .head-table {
    background: var(--color-pri);
}

.plan.elite .head-table {
    background: var(--color-tri);
    border-color: var(--color-tri);
}

.plan.elite .head-table {
    background: linear-gradient(-45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C) center / 210%;
    border-color: transparent;
}

.table-planes .icon {
    width: 1.25em;
    display: block;
    font-size: 20px;
    color: var(--success);
}

.table-planes .icon svg {
    display: block;
    width: auto;
    height: 1em;
    position: static;
    margin: 0 auto;
    fill: currentColor;
}

.table-planes .icon.danger {
    color: var(--danger);
}

[data-label="Precio"] {
    font-size: 18px;
}

[data-label="Precio"] i {
    display: block;
    line-height: 1 !important;
    font-weight: 400;
    font-size: 0.75em;
    text-align: center;
}

.text-planes {
    font-size: 20px;
    text-align: center;
}

p.nota-planes {
    margin: 1rem 0 0;
    font-style: italic;
    font-size: 14px;

}

#contacto {
    background: linear-gradient(to top, #7367f01a:not(.TyC), #fff0);
}

#gtco-footer {
    background: #7367f01a;
}

#portales {
    padding-top: 80px;
    padding-bottom: 80px;
}

.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #0000;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

#portales {
    mix-blend-mode: multiply;
}

#my-nav {
    display: flex;
}

@media(max-width: 991px) {
    #my-nav {
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 100%;
        background: #fff;
        box-shadow: 3px 3px 10px #00000026;
        padding: 1rem 1.5rem 0;
        right: 0;
        margin: 1rem;
        width: 90%;
        max-width: 320px;
        opacity: 0;
        transform: translateY(-20px);
        pointer-events: none;
        transition: all ease 0.6s;
    }

    #gtco-main-nav .form-inline a {
        font-size: 14px !important;
        padding: 3px 15px !important;
    }

    #my-nav.open {
        opacity: 1;
        transform: none;
        pointer-events: auto;
    }

    .navbar-toggler.open .bar1 {
        transform: translateY(7px) rotate(45deg);
    }

    .navbar-toggler.open .bar2 {
        transform: rotate(45deg);
    }

    .navbar-toggler.open .bar3 {
        transform: translateY(-7px) rotate(-45deg);
    }

    .plan .head-table[data-v-ed4b9358] {
        color: #fff;
        position: sticky;
        top: 55px;
    }

    .table-planes td {
        color: #000;
        font-weight: 500;
        height: 90px;
    }

    td[data-label]::before {
        content: attr(data-label);
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 8px;
        text-align: center;
    }
}

@media(max-width: 767px) {
    .logo img {
        height: 25px;
    }

    .gtco-features .card {
        margin: 15px;
    }

    .gtco-banner-area h1 {
        font-size: 30px;
    }

    .gtco-banner-area p {
        font-size: 14px;
    }

    .images-banner {
        margin-top: 0;
        margin-left: -40%;
        margin-right: -5%;
    }

    .gtco-banner-area a:not(.TyC),
    .gtco-feature a:not(.TyC),
    .gtco-features a:not(.TyC),
    .gtco-news .owl-carousel .card a:not(.TyC),
    .btn.submit-button {
        font-size: 14px;
    }

    .gtco-feature h2,
    .gtco-features h2 {
        font-size: 24px;
    }

    p {
        font-size: 14px;
    }

    .gtco-features .card h3 {
        font-size: 20px;
    }

    #portales {
        padding-top: 40px;
        padding-bottom: 40px;
    }

    .text-planes {
        font-size: 14px;
    }

    .btns-store img {
        height: 11vw;
    }

    .plan .head-table {
        padding: 5%;
        margin: 2.5%;
        font-size: 14px;
        height: 50px;
        border-radius: 6px;
        border-bottom: none;
    }

    .nav-planes {
        background: #f6f6f6;
        position: sticky;
        top: 55px;
        z-index: 2;
    }

    :not(.nav-planes)>div>div>div>.head-table {
        display: none;
    }

    .nav-planes .plan.basic {
        transition: all ease 0.4s;
    }

    .nav-planes .plan.basic.off .head-table {
        background: #fff !important;
        color: var(--color-pri);
        box-shadow: inset 0 0 0 2px var(--color-pri);
    }

    .nav-planes .plan.elite.off .head-table {
        background: #fff !important;
        color: var(--color-tri);
        box-shadow: inset 0 0 0 2px var(--color-tri);
    }

    .nav-planes .plan.elite.off .head-table {
        background: #fff !important;
        color: #b48829;
        box-shadow: 0 0 0 2px #b58a2c;
    }

    .col-card-plan {
        transition: all ease 0.4s;
    }

    .col-card-plan.off {
        position: absolute;
        opacity: 0;
    }
}

.plane-state {
    position: relative;
}

.plane-state .seal-trial {
    position: absolute;
    z-index: 1;
    inset: 0;
    margin: auto;
    width: 60%;
    max-width: 400px;
}

.plane-state .seal-trial~.row {
    filter: grayscale(1);
    opacity: 0.7;
}</style>
<style>#app {
    overflow: hidden;
    overflow-y: auto;
}</style>
