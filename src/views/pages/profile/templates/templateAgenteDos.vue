<template>
  <table class="viewTemplate" :style="`--bg:${colors.color_fondo}; --font:${colors.color_fuente};`">
    <thead>
      <tr>
        <td>
          <b-container class="headerTemplate">
            <b-row class="position-relative align-items-end" align-v="center" align-h="center">
              <b-col cols="8" md="3">

                <figure class="fotoPerfil">
                  <template v-if="userData.foto_persona">
                    <img class="img-fluid mx-auto d-block" :src="userData.foto_persona" />
                  </template>
                  <img
                    v-else
                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                    class="img-fluid mx-auto d-block"
                    alt=""
                    srcset=""
                  />
                </figure>
              </b-col>
              <div class="w-100 d-block d-md-none"></div>
              <!-- Agente y empresa -->
              <b-col cols="8" md="auto" class="rotuloEmpresa order-md-0 d-none d-md-block flex-grow-1" :style="{width: '1%'}">
                <h1 class="nombrePerfil">{{userData.primer_nombre}}</h1>
                <h2 class="cargoPerfil"><span>Agente Inmobiliario</span></h2>
                <h3 class="tituloEmpresa">
                  {{empresa.nombre}}
                </h3>
                <span class="direccion">{{empresa.direccion}}</span>
              </b-col>
              <!-- Agente mobile -->
              <b-col cols="8" md="auto" class="rotuloEmpresa order-1 d-block d-md-none pl-0 mt-auto">
                <h1 class="nombrePerfil">{{userData.primer_nombre}}</h1>
                <h2 class="cargoPerfil"><span>Agente {{userData.genero == 1 ? 'Inmobiliario' : 'Inmobiliaria'}}</span></h2>
              </b-col>
              <!-- Empresa mobile -->
              <b-col cols="12" md="auto" class="rotuloEmpresa order-1 d-block d-md-none pt-1">
                <h3 class="tituloEmpresa">
                  {{empresa.nombre}}
                </h3>
                <span class="direccion">{{empresa.direccion}}</span>
              </b-col>
              <b-col class="logoEmpresa" cols="4" md="auto" align-self="start">
                <figure>
                  <img class="img-fluid mx-auto d-block maxWidthmg" :src="empresa.logo" />

                  
                </figure>
              </b-col>
            </b-row>
          </b-container>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="bodyContainer">
          <b-container class="bodyTemplate">
            <b-row>
              <b-col>
                <div class="descripcionPerfil" v-html="userData.descripcion"></div>
              </b-col>
            </b-row>
          </b-container>
          <figure :class="imgBg.name">
            <img v-if="imgBg.name != 'Casa'" :src="imgBg.url" :alt="imgBg.name" />
            <span v-else v-html="imgBg.url" ref="svgContainer"></span>
          </figure>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>
          <b-container class="footerTemplate">
            <b-row class="flex-column flex-md-row" align-v="start">
              <b-col order="1" order-md="0" class="closedFooter">
                <h5 class="copyRight">
                  {{empresa.nombre}} &copy; {{year}}
                </h5>
                <h6 class="firmaRedCRM">Powered by RED</h6>
              </b-col>
              <b-col  cols="auto">
                <div class="contactoPerfil iconos">
                  <h4>Contacto</h4>
                  <div class="linkIcon d-flex">
                    <a
                      v-if="userData.celular != null"
                      :href="`tel:${userData.celular}`"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M304 0h-224c-35.35 0-64 28.65-64 64v384c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64V64C368 28.65 339.3 0 304 0zM192 480c-17.75 0-32-14.25-32-32s14.25-32 32-32s32 14.25 32 32S209.8 480 192 480zM304 64v320h-224V64H304z"/></svg>      
                    </a>
                    <a
                      v-if="userData.email != null"
                      :href="`mailto:${userData.email}`"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/></svg>
                    </a>
                  </div>
                </div>
              </b-col>
              <b-col  cols="auto">
                <div class="rrssPerfil iconos">
                  <h4>Redes sociales</h4>
                  <div class="linkIcon d-flex">
                    <a
                      v-if="userData.facebook != null"
                      :href="userData.facebook"
                      target="_blank"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                    </a>
                    <a
                      v-if="userData.instagram != null"
                      :href="userData.instagram"
                      target="_blank"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                    </a>
                    <a
                      v-if="userData.linkedin != null"
                      :href="userData.linkedin"
                      target="_blank"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>
                    </a>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import mixinsTemplates from './mixinsTemplates.js'
export default {
  name: "templateAgenteDos",
  mixins: [mixinsTemplates],
  watch: {
    'colors.color_fondo': function(newColor) {
      const svgContainer = this.$refs.svgContainer;
      if (svgContainer instanceof Element) {
        // Modifica el estilo del SVG con el nuevo color de fondo
        const svg = svgContainer.querySelector('.CasaSvg path');
        if (svg) {
          svg.style.fill = newColor;
        }
      }
    },
  },
};
</script>


<style lang="css" scoped>
  
  /*View template*/
  .viewTemplate {
    width: 100%;
    max-width: 800px;
    background-color: #fff;
    color: var(--font);
    box-shadow: 3px 3px 10px -1px #00000026;
  }
  .viewTemplate .descripcionPerfil * {
    color: inherit!important;
    background: transparent!important;
  }
  .viewTemplate .descripcionPerfil a{
    color: var(--bg)!important;
    text-decoration: underline!important;
  }
  .viewTemplate tr > *{
    padding: 0;
  }

  .maxWidthmg{
    max-width: 11em;
  }
  .viewTemplate .logoEmpresa figure{
    margin: 0;
  }
  .viewTemplate .headerTemplate {
    padding: 30px;
  }

  .viewTemplate .nombrePerfil {
    font-size: 30px;
    margin-bottom: 0;
    line-height: 1.2;
    font-weight: 400;
    color: var(--font);
  }

  .viewTemplate .cargoPerfil {
    font-weight: 600;
    font-size: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--bg);
    align-self: flex-start;
    padding-right: 35px;
    color: var(--bg);
  }

  .viewTemplate .rotuloEmpresa {
    display: flex;
    flex-direction: column;
    font-size: 13px;
  }
  .viewTemplate .cargoPerfil span {
    opacity: 0.75;
  }

  .viewTemplate .tituloEmpresa {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 15px;
    color:var(--bg);
  }
  
  .viewTemplate .fotoPerfil {
    margin: 0;
    filter: drop-shadow(5px 5px 0 currentColor);
    color: var(--bg);
  }
  .bodyContainer{
    position: relative;
  }
  .viewTemplate .bodyTemplate {
    position: relative;
    z-index: 5;
    padding: 30px;
    font-weight: 500;
  }

  .viewTemplate .bodyTemplate p{
    font-size: 16px;
    line-height: 1.8;
  }

  /* #bgCon img{
    width: 100%;
    height: 100%;
    opacity: 0.7;
  } */

  .Ninguno{
    display:none;
  }
  .fondo1{
    position: absolute;
    bottom: -96px;
    left: calc(50% - 275px);
    z-index: 0;
    width: 550px;
    margin: 0;
  }
  .fondo1 img {
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }
  .Casa {
    position: absolute;
    top: 18px;
    right: 0px;
  }

  .viewTemplate .footerTemplate {
    padding: 30px;
    background: var(--bg);
  }
  .viewTemplate .footerTemplate,
  .viewTemplate .footerTemplate *{
    color: #fff!important;
  }
  .viewTemplate .footerTemplate .iconos {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
  }
  .viewTemplate .footerTemplate .iconos h4 {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
  }
  .viewTemplate .footerTemplate .iconos a {display: block;width: 1.25em;font-size: 22px; color: #fff;}
  .viewTemplate .footerTemplate .iconos a svg {display: block;height: 1em; fill:  currentColor;}  
  .viewTemplate .closedFooter{
    font-size: 14px;
  }
  .viewTemplate .copyRight{
    font-size: 1.07em;
  }
  .viewTemplate .firmaRedCRM {
    margin: 0;
    font-size: 1em;
    font-weight: 400;
    opacity: 0.75;
  }
  @media(max-width: 767px){
    .viewTemplate .fotoPerfil{
      max-width: 200px;
      margin: 0 auto;
      margin-bottom: 25px;
    }
    .viewTemplate .rotuloEmpresa {
      text-align: left;
    }

    .viewTemplate .cargoPerfil {
      padding-right: 20px;
      margin-bottom: 0;
      align-self: center;
    }
    .viewTemplate .nombrePerfil {
      font-size: 20px;
    }

    .viewTemplate .cargoPerfil {
      font-size: 14px;
    }

    .viewTemplate .tituloEmpresa {
      font-size: 13px;
    }

    .viewTemplate .headerTemplate {
      padding: 20px;
    }

    .viewTemplate .bodyTemplate {
      padding: 20px;
      padding-top: 0;
    }

    .viewTemplate .footerTemplate {
      padding: 20px;
    }
    .viewTemplate .footerTemplate .iconos {
      margin-bottom: 20px;
      text-align: center;
      align-items: center;
    }
    .viewTemplate .closedFooter[data-v-037359cc] {
      text-align: center;
      font-size: 12px;
    }
  }
</style>