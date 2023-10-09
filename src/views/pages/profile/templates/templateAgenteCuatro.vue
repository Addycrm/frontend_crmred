<template>
    <div class="template2">
        <table class="viewTemplate" :style="`--bg:${colors.color_fondo}; --font:${colors.color_fuente};`">
          <tbody class="layOut">
            <tr class="viewTemplate__info">
              <td>
                  <header class="viewTemplate__info__header">
                    <figure class="viewTemplate__info__header__profileImg">
                        <template v-if="userData.foto_persona">
                          <img :src="userData.foto_persona" :alt="userData.primer_nombre" />
                        </template>
                        <img v-else src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="foto" />
                    </figure>
                    <div class="viewTemplate__info__header__info">
                      <h1>{{userData.primer_nombre}}</h1>
                      <h2>Agente inmobilario</h2>
                    </div>
                  </header>
                  <main class="viewTemplate__info__main">
                    <div v-html="userData.descripcion" class="viewTemplate__info__main__des">
                    </div>
                  </main>
                  <footer class="viewTemplate__info__footer">
                    <figure class="viewTemplate__info__footer__company">
                        <img :src="empresa.logo" alt="" />
                    </figure>
                    <div class="viewTemplate__info__footer__info">
                      <div>
                        <h2>{{empresa.nombre}}</h2>
                        <p>{{empresa.direccion}}</p>
                      </div>
                      <div class="socialMedia">
                        <div class="contactoPerfil iconos">
                          <div class="linkIcon">
                            <a v-if="userData.celular != null" class="linkIcon" :href="`tel:${userData.celular}`">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M304 0h-224c-35.35 0-64 28.65-64 64v384c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64V64C368 28.65 339.3 0 304 0zM192 480c-17.75 0-32-14.25-32-32s14.25-32 32-32s32 14.25 32 32S209.8 480 192 480zM304 64v320h-224V64H304z"
                                />
                                </svg>
                            </a>
                            <a v-if="userData.email != null" class="linkIcon" :href="`mailto:${userData.email}`">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"
                                />
                                </svg>
                            </a>
                            <a v-if="userData.facebook != null" class="linkIcon" :href="userData.facebook" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                />
                                </svg>
                            </a>
                            <a v-if="userData.instagram != null" class="linkIcon" :href="userData.instagram" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                                />
                                </svg>
                            </a>
                            <a v-if="userData.linkedin != null" class="linkIcon" :href="userData.linkedin" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                />
                                </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </footer>
              </td>
            </tr>
            <tr class="viewTemplate__photo">
              <td>
                <figure>
                  <img src="https://res.cloudinary.com/dumnq4c3n/image/upload/v1690924803/15621-NQG9N7_1_xrsp86.png" alt="" />
                </figure>
              </td>
            </tr>
        </tbody>
        </table>
    </div>
  </template>
  
  <script>
    import mixinsTemplates from './mixinsTemplates.js'
    export default {
      name: "templateAgenteCuatro",
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
    :root {
        --bg: red;
        --font: #000;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 62.5%;
      }
      body {
        font-family: "Montserrat";
      }
      .template2 {
        display: grid;
        justify-content: center;
        margin-top: 2rem;
      }
      /*View template*/
      .viewTemplate {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        max-width: 888px;
        /* height: 444px; */
        color: var(--font);
        box-shadow: 3px 3px 10px -1px #00000026;
        background-color: #fff;
      }
      .layOut{
        display: flex;
      }
      .viewTemplate__info {
        position: relative;
        display: flex;
        flex-direction: column;
        /* width: 60%; */
        padding: 10px 0px 10px 10px;
        transition: all 0.3s ease-in-out;
      }
      .viewTemplate__photo {
        /* width: 40%; */
        height: 48%;
        transition: all 0.3s ease-in-out;
      }
      .viewTemplate__photo td {
        height: 444px;
      }
      .viewTemplate__photo figure {
        margin: 0;
        width: 100%;
        height: 100%;
      }
      .viewTemplate__photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
  
      /*HEADER*/
      .viewTemplate__info__header {
        display: flex;
        align-items: center;
        gap: 20px;
      }
      .viewTemplate__info__header__profileImg {
        width: 108px;
        height: 108px;
        border-radius: 50%;
        overflow: hidden;
      }
      .viewTemplate__info__header__profileImg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .viewTemplate__info__header__info h1 {
        font-size: 1.8rem;
      }
      .viewTemplate__info__header__info h2 {
        font-size: 1.3rem;
      }
  
      /*MAIN*/
      .viewTemplate__info__main__des {
        font-size: 1rem;
        padding: 24px 10px 68px 10px;
      }
  
      /*FOOTER*/
      .viewTemplate__info__footer {
        position: absolute;
        bottom: -140px;
        left: 10px;
        display: flex;
        align-items: center;
        /* flex-wrap: wrap; */
        /* gap: 20px; */
        /* width: 600px; */
        padding: 8px;
        background-color: var(--bg);
        transition: all 0.3s ease-in-out;
      }
  
      .viewTemplate__info__footer__company {
        width: 94px;
        height: 94px;
      }
      .viewTemplate__info__footer__company img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
  
      .viewTemplate__info__footer__info h2 {
        font-size: 1.8rem;
        color: #fff;
      }
      .viewTemplate__info__footer__info p {
        font-size: 1.3rem;
        color: #fff;
      }
  
      .socialMedia {
        display: flex;
        margin-top: 12px;
      }
      .linkIcon {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
      }
      .linkIcon a {
        width: 18px;
        height: 16px;
      }
      .linkIcon a svg {
        width: 100%;
        height: 100%;
        fill: #fff;
      }
  
      /*RESPONSIVE*/
      @media screen and (min-width: 420px) {
        .viewTemplate__photo {
          height: 40%;
        }
        .viewTemplate__info__footer {
          bottom: 4px;
          gap: 10px;
        }
      }
  
      @media screen and (min-width: 600px) {
        .viewTemplate__photo {
          height: 30%;
        }
        .viewTemplate__info__footer {
          width: 500px;
        }
      }
  
      @media screen and (min-width: 746px) {
        .viewTemplate {
          flex-direction: row;
          height: 444px;
        }
        .viewTemplate__info {
          width: 60%;
        }
        .viewTemplate__info__main__des {
          padding: 9px 10px 68px 10px;
        }
        .viewTemplate__info__footer {
          bottom: 6px;
        }
        .viewTemplate__photo {
          width: 40%;
          height: 100%;
        }
      }
  
      @media screen and (min-width: 800px) {
        .viewTemplate__info__footer {
          bottom: 30px;
          width: 600px;
        }
      }
  </style>