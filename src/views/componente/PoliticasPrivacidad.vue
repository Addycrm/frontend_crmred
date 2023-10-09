<template>
    <div class="container my-4 px-2">
        <header class="mb-3">
            <router-link class="brand-logo" :to="{ name: 'inicio-home' }">
                <b-img fluid :src="appLogo" alt="logo" />
            </router-link>
        </header>
        <section class="container-main">
            <svg id="bg-services" width="100%" viewBox="0 0 1000 800">
                <defs>
                    <linearGradient id="PSgrad_02" x1="64.279%" x2="0%" y1="76.604%" y2="0%">
                        <stop offset="240%" stop-color="#8541ff" stop-opacity="1" />
                        <stop offset="100%" stop-color="#f0beff" stop-opacity="1" />
                    </linearGradient>
                </defs>
                <path fill-rule="evenodd" opacity="0.102" fill="url(#PSgrad_02)"
                    d="M801.878,3.146 L116.381,128.537 C26.052,145.060 -21.235,229.535 9.856,312.073 L159.806,710.157 C184.515,775.753 264.901,810.334 338.020,792.380 L907.021,652.668 C972.912,636.489 1019.383,573.766 1011.301,510.470 L962.013,124.412 C951.950,45.594 881.254,-11.373 801.878,3.146 Z" />
            </svg>
            <div class="container_text">
                <h2 class="title">POLÍTICA DE PRIVACIDAD</h2>
                <p class="text">
                    La siguiente Política de Privacidad describe cómo CRMRED recopila, utiliza y protege la información
                    personal y las imágenes proporcionadas por los usuarios de nuestra aplicación móvil. Al utilizar La
                    Aplicación, aceptas los términos y condiciones de esta Política de Privacidad.


                </p>

                <h3 class="subtitle">
                    1. Información que Recopilamos
                </h3>
                <h4 class="subtitle">
                    1.1. Información Personal
                </h4>
                <p class="text">
                    Cuando importas clientes desde tu dispositivo móvil, podemos recopilar la siguiente información
                    personal, que puede incluir, entre otros datos:

                    - Nombre
                    - Dirección de correo electrónico
                    - Número de teléfono
                    - Fotografías de identificación
                    - Otra información relevante para la gestión de clientes

                </p>
                <h4 class="subtitle">
                    1.2. Imágenes y Contenido Multimedia
                </h4>
                <p class="text">
                    La Aplicación puede acceder a imágenes y contenido multimedia almacenados en tu dispositivo móvil para
                    proporcionar servicios relacionados con la gestión de clientes. Esta información puede incluir, entre
                    otros datos:

                    - Fotografías de clientes
                    - Documentos escaneados
                    - Otros archivos multimedia relacionados con la gestión de clientes

                </p>
                <h4 class="subtitle">
                    2. Uso de la Información
                </h4>
                <p class="text">
                    Utilizamos la información recopilada para los siguientes fines:
                </p>
                <h4 class="subtitle">
                    2.1. Gestión de Clientes
                </h4>
                <p class="text">
                    Utilizamos la información personal y las imágenes para gestionar y organizar tus clientes de manera
                    eficiente dentro de La Aplicación.

                </p>

                <h4 class="subtitle">
                    2.2. Mejora de la Experiencia del Usuario
                </h4>
                <p class="text">
                    Podemos utilizar la información para mejorar la funcionalidad y la experiencia del usuario de La
                    Aplicación, así como para personalizar nuestros servicios según tus preferencias.
                </p>
                <h4 class="subtitle">
                    2.3. Comunicación
                </h4>
                <p class="text">
                    Podemos utilizar tu dirección de correo electrónico o número de teléfono para enviarte comunicaciones
                    relacionadas con La Aplicación, como actualizaciones, notificaciones importantes o información sobre
                    nuestros servicios.
                </p>
                <h4 class="subtitle">
                    3. Compartir Información
                </h4>
                <p class="text">

                    No compartiremos tu información personal o imágenes con terceros, excepto en las siguientes
                    circunstancias:

                    - Cuando tengamos tu consentimiento explícito para hacerlo.
                    - Cuando sea necesario cumplir con las leyes y regulaciones aplicables.
                    - Para proteger nuestros derechos, privacidad, seguridad o propiedad, así como la de nuestros usuarios y
                    el público en general.


                </p>
                <h4 class="subtitle">
                    4. Seguridad de la Información
                </h4>
                <p class="text">
                    Tomamos medidas razonables para proteger la información personal y las imágenes de los usuarios contra
                    accesos no autorizados o divulgación. Sin embargo, no podemos garantizar la seguridad absoluta de los
                    datos transmitidos a través de Internet o almacenados en nuestros sistemas.
                </p>
                <h4 class="subtitle">
                    5. Cambios en la Política de Privacidad
                </h4>
                <p class="text">
                    Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Te
                    notificaremos cualquier cambio significativo a través de la Aplicación o por otros medios.
                </p>
                <h4 class="subtitle">
                    5. Cambios en la Política de Privacidad
                </h4>
                <p class="text">
                    Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Te
                    notificaremos cualquier cambio significativo a través de la Aplicación o por otros medios.
                </p>
                <h4 class="subtitle">
                    6. Contacto
                </h4>
                <p class="text">
                    Si tienes alguna pregunta, comentario o inquietud relacionada con esta Política de Privacidad, por favor
                    contáctanos a través de soporte@crmred.co.

                    Al utilizar La Aplicación, aceptas los términos y condiciones de esta Política de Privacidad. Asegúrate
                    de revisar esta política regularmente para estar al tanto de cualquier cambio.

                </p>

            </div>
        </section>


    </div>
</template>

<script>
import { $themeConfig } from '@themeConfig';
export default {

    data() {
        return {
            appLogo: null
        }
    },

    created() {
        const { appName, appLogoImage } = $themeConfig.app;
        this.appLogo = appLogoImage;

    },

}
</script>

<style scoped>
.container-main {
    position: relative;
}

.container_text {
    position: absolute;
    top: 0;
    left: 0;
}

.brand-logo img {
    width: 100%;
    max-width: 210px;
}

.title {
    text-align: center;
    font-size: bold;
}

.subtitle {
    text-align: left;
    font-weight: bold;
}

.text {
    text-align: justify;
    color: black;
}
</style>
