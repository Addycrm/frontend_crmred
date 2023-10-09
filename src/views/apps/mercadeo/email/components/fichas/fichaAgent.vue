<template>
<body>
    <div class="container">
        <div class="row mx-n3">
            <div class="col p-3 d-flex flex-column align-items-center justify-content-center">
                <table class="viewTemplate">
                    <thead>
                        <tr>
                            <td>
                                <div class="headerTemplate container">
                                    <div class="row align-items-center" v-if="user.empresa">
                                        <div class="col-12 col-md-3" >
                                            <figure class="logoEmpresa">
                                                <img v-if="user.empresa.logo" class="img-fluid" :src="user.empresa.logo" alt="" />
                                                <img v-else class="img-fluid" src="" alt="" />
                                            </figure>
                                        </div>
                                        <div cols="12" md="9" class="col-12 col-md-9 rotuloEmpresa">
                                            <h1 class="tituloEmpresa" v-if="user.empresa">
                                                {{user.empresa.nombre}}
                                            </h1>
                                            <span class="direccion">{{ user.empresa.direccion }}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="bodyTemplate container">
                                    <div class="row">
                                        <div class="col">
                                            <h2 class="nombrePerfil">{{user.primer_nombre}} {{ user.primer_apellido }}</h2>
                                            <h3 class="cargoPerfil">
                                                Agente Inmobiliario
                                            </h3>
                                            <figure class="fotoPerfil">
                                                <img v-if="user.foto_persona" class="img-fluid image-perfil" :src="user.foto_persona" alt="" />
                                                <img v-else class="img-fluid image-perfil" src="https://latarta.com.co/wp-content/uploads/2018/06/default-placeholder.png" alt="" />
                                            </figure>
                                            <div class="descripcionPerfil" v-html="user.descripcion">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <div class="footerTemplate container">
                                    <div class="row justify-content-center">
                                        <div class="contactoPerfil iconos col-8 col-md-6">
                                            <h4>Contacto</h4>
                                            <a v-if="user.celular_movil">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                    <path d="M304 0h-224c-35.35 0-64 28.65-64 64v384c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64V64C368 28.65 339.3 0 304 0zM192 480c-17.75 0-32-14.25-32-32s14.25-32 32-32s32 14.25 32 32S209.8 480 192 480zM304 64v320h-224V64H304z" />
                                                </svg>
                                            </a>
                                            <a v-if="user.email" >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                    <path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" />
                                                </svg>
                                            </a>
                                        </div>
                                        <div class="rrssPerfil iconos col-8 col-md-6" cols="8" md="6">
                                            <h4>Redes sociales</h4>
                                            <a v-if="user.facebook" target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                </svg>
                                            </a>
                                            <a v-if="user.instagram"  target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                                </svg>
                                            </a>
                                            <a :href="user.linkedin" target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="closedFooter col">
                                            <h5 class="copyRight" v-if="user.empresa">
                                                {{ user.empresa.nombre }} &copy; {{ 2023 }} |
                                                <span class="firmaRedCRM">CRM RED</span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</body>
</template>

<script>
    const rootElement = document.documentElement;
export default {
props:{
    user:{
        type:Object
    }
},
watch: {

},

mounted() {
    rootElement.style.setProperty("--bg", (this.user.color_fondo) ? this.user.color_fondo: '#7367f0');
    rootElement.style.setProperty(" --font", (this.user.color_fuente == '#ffffff')? '#5e5873':this.user.color_fuente);

},
}
</script>


<style scoped>
    :root{
        --bg: '#7367f0';
        --font: '#5e5873';
    }
    body {
        font-family: 'Montserrat';
    }



    .viewTemplate {
        width:100%;
        max-width: 800px;
        background-color: #fff;
        color: var(--font);
        box-shadow: 3px 3px 10px -1px #00000026;
    }

    .viewTemplate .descripcionPerfil * {
        color: inherit !important;
        background: transparent !important;
    }

    .viewTemplate .descripcionPerfil a {
        color: var(--bg) !important;
        text-decoration: underline !important;
    }

    .viewTemplate tr>* {
        padding: 0;
    }

    .viewTemplate .headerTemplate,
    .viewTemplate .footerTemplate {
        padding: 25px 35px;
    }

    .viewTemplate .bodyTemplate {
        padding: 35px;
        background: #0000000d;
        box-shadow: inset 0 10px 10px -10px #00000026, inset 0 -10px 10px -10px #00000026;
    }

    .viewTemplate .logoEmpresa {
        margin: 0;
    }

    .viewTemplate .bodyTemplate .fotoPerfil {
        margin: 25px auto;
        max-width: 300px;
        width: 100%;
    }

    .image-perfil{
        max-height:300px;
        width:100%;
        object-fit: cover;
        }

    .viewTemplate .bodyTemplate p {
        font-size: 16px;
        line-height: 1.8;
    }

    .viewTemplate .rotuloEmpresa {
        text-align: right;
        display: flex;
        flex-direction: column;
    }

    .viewTemplate .tituloEmpresa {
        font-size: 24px;
        font-weight: 700;
        color: var(--bg) !important;
    }
    .direccion{
        color: var(--font) !important;

    }

    .viewTemplate .nombrePerfil {
        text-align: center;
        font-size: 35px;
        font-weight: 400;
        text-transform: capitalize;
        line-height: 1;
        margin: 0;
    }

    .viewTemplate .cargoPerfil {
        font-size: 18px;
        text-transform: uppercase;
        text-align: center;
        font-weight: 700;
        margin: 8px 0 0;
        color: var(--bg);
        opacity: 0.85;
    }

    .viewTemplate .footerTemplate {
        background: var(--bg);
    }

    .viewTemplate .footerTemplate,
    .viewTemplate .footerTemplate * {
        color: #fff !important;
    }

    .viewTemplate .footerTemplate .iconos {
        display: flex;
        flex-wrap: wrap;
    }

    .viewTemplate .footerTemplate .iconos h4 {
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 600;
    }

    .viewTemplate .footerTemplate .iconos h4 {
        width: 100%;
        margin-bottom: 8px;
    }

    .viewTemplate .footerTemplate .iconos a {
        display: block;
        width: 1.25em;
        font-size: 22px;
        color: #fff;
    }

    .viewTemplate .footerTemplate .iconos a svg {
        display: block;
        height: 1em;
        fill: currentColor;
    }
    

    @media (min-width: 768px) {
        .viewTemplate .footerTemplate .contactoPerfil.iconos {
            justify-content: flex-end;
            text-align: right;
        }

        .viewTemplate .footerTemplate .iconos+.iconos {
            border-left: 1px solid #ebe9f1;
        }
    }

    .viewTemplate .footerTemplate .closedFooter {
        text-align: center;
        margin-top: 35px;
    }

    .viewTemplate .footerTemplate .copyRight {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        margin-bottom: 0;
    }

    .viewTemplate .footerTemplate .firmaRedCRM {
        opacity: 0.85;
    }

    @media (max-width: 767px) {
        .viewTemplate .rotuloEmpresa {
            text-align: center;
            font-size: 13px;
        }

        .viewTemplate .tituloEmpresa {
            font-size: 18px;
        }

        .viewTemplate .logoEmpresa {
            margin: 0 auto 1rem;
        }

        .viewTemplate .logoEmpresa img {
            margin: 0 auto;
            display: block;
            max-width: 220px;
        }

        .viewTemplate .bodyTemplate .fotoPerfil {
            max-width: 220px;
        }

        .viewTemplate .nombrePerfil {
            font-size: 26px;
        }

        .viewTemplate .cargoPerfil {
            font-size: 13px;
        }

        .viewTemplate .headerTemplate,
        .viewTemplate .bodyTemplate,
        .viewTemplate .footerTemplate {
            padding: 20px;
        }

        .viewTemplate .footerTemplate .iconos {
            text-align: center;
            justify-content: center;
        }

        .viewTemplate .footerTemplate .iconos+.iconos {
            border-top: 1px solid #ebe9f1;
            padding-top: 15px;
            margin-top: 15px;
        }

        .viewTemplate .footerTemplate .closedFooter {
            margin-top: 20px;
        }

        .viewTemplate .footerTemplate .copyRight {
            font-size: 12px;
        }
    }
</style>