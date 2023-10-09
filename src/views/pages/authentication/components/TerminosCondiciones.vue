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
          La presente Política de Privacidad establece los términos en que CRM RED usa y protege
          la información que es proporcionada por sus usuarios al momento de utilizar su sitio
          web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios.
          Cuando le pedimos llenar los campos de información personal con la cual usted pueda
          ser identificado, lo hacemos asegurando que sólo se emplea de acuerdo con los
          términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con
          el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar
          continuamente esta página para asegurarse que está de acuerdo con dichos cambios.
        </p>
        <h4 class="subtitle">
          1. INFORMACIÓN QUE ES RECOGIDA
        </h4>
        <p class="text">
          Nuestro sitio web podrá recoger información personal por ejemplo: Nombre,
          información de contacto como su dirección de correo electrónica e información
          demográfica. Así mismo cuando sea necesario podrá ser requerida información
          específica para procesar algún pedido o realizar una entrega o facturación.
        </p>
        <h4 class="subtitle">
          2. USO DE LA INFORMACIÓN RECOGIDA
        </h4>
        <p class="text">
          Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio
          posible, particularmente para mantener un registro de usuarios, de pedidos en caso que
          aplique, y mejorar nuestros productos y servicios. Es posible que sean enviados correos
          electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos
          productos y otra información publicitaria que consideremos relevante para usted o que
          pueda brindar algún beneficio, estos correos electrónicos serán enviados a la dirección
          que usted proporcione y podrán ser cancelados en cualquier momento.
          CRM RED está altamente comprometido para cumplir con el compromiso de mantener
          su información segura. Usamos los sistemas más avanzados y los actualizamos
          constantemente para asegurarnos que no exista ningún acceso no autorizado.
        </p>
        <h4 class="subtitle">
          3. COOKIES
        </h4>
        <p class="text">
          Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso
          para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve
          entonces para tener información respecto al tráfico web, y también facilita las futuras
          recurrencias. Otra función que tienen las cookies es que con ellas las web pueden
          reconocerse individualmente y por tanto brindarte el mejor servicio personalizado de su
          web.
        <p class="text">
          Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas
          y su frecuencia. Esta información es empleada únicamente para análisis estadístico y
          después la información se elimina de forma permanente. Usted puede eliminar las
          cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a
          proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de
          su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione
          directamente. Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de
          navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio
          web. También usted puede cambiar la configuración de su ordenador para declinar las
          cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.
        </p>
        </p>

        <h4 class="subtitle">4. ENLACES A TERCEROS
        </h4>
        <p class="text">
          Este sitio web pudiera contener enlaces a otros sitios que pudieran ser de su interés.
          Una vez que usted dé clic en estos enlaces y abandone nuestra página, ya no tenemos
          control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los
          términos o privacidad ni de la protección de sus datos en esos otros sitios terceros.
          Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es
          recomendable que los consulte para confirmar que usted está de acuerdo con estas.

        </p>
        <h4 class="subtitle" >
          5. CONTROL DE SU INFORMACIÓN PERSONAL
        </h4>
        <p class="text">
          En cualquier momento usted puede restringir la recopilación o el uso de la información
          personal que es proporcionada a nuestro sitio web. Cada vez que se le solicite rellenar
          un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de
          recibir información por correo electrónico. En caso de que haya marcado la opción de
          recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.


        </p>
        <p class="text">
          Esta compañía no venderá, cederá ni distribuirá la información personal que es
          recopilada sin su consentimiento, salvo que sea requerido por un juez con una orden
          judicial.
        </p>
        <p class="text">
          CRM RED se reserva el derecho de cambiar los términos de la presente Política de
          Privacidad en cualquier momento.
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