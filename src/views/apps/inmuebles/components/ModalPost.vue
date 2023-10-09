<template>
  <div class="container__post">
    <div class="container__btns">
      <div class="btns_event-post">
        <button @click="verPost('post1')" :class="[(statePost1)?'check':'','btn_select']"> VER POST 1</button>
        <button @click="verPost('post2')"  :class="[(!statePost1)?'check':'','btn_select']"> VER POST 2</button>
      </div>
      <div class="container__btn" >
          <b-form-group
            label="Color Fondo 1"
            label-for="bgColor"
            class="mb-0 inputColor text-nowrap container-select__color"
          >
            <div class="colorBox">
              <b-form-input
                v-model="colorPrimario"
                id="bgColor"
                type="color"
                class="background__color"
              />
              <span :style="{ background: colorPrimario }" ></span>
            </div>
          </b-form-group>
          <b-form-group
            label="Color Fondo 2"
            label-for="fontColor"
            class="mb-0 inputColor text-nowrap container-select__color"
          >
            <div class="colorBox">
              <b-form-input
                v-model="colorSecundario"
                id="fontColor"
                type="color"
                value="black"
                class="background__color"
              />
              <span :style="{ background: colorSecundario }"></span>
            </div>
          </b-form-group>
          <b-form-group
            label="Color Fuente 1"
            label-for="fontColor"
            class="mb-0 inputColor text-nowrap container-select__color"
          >
            <div class="colorBox">
              <b-form-input
                v-model="colorFuente"
                id="fontColor"
                type="color"
                value="black"
                class="background__color"
              />
              <span :style="{ background: colorFuente }"></span>
            </div>
          </b-form-group>
          <b-form-group
            label="Color Fuente 2"
            label-for="fontColor"
            class="mb-0 inputColor text-nowrap container-select__color"
          >
            <div class="colorBox">
              <b-form-input
                v-model="colorPrecio"
                id="fontColor"
                type="color"
                value="black"
                class="background__color"
              />
              <span :style="{ background: colorPrecio }"></span>
            </div>
          </b-form-group>
      </div>
    </div>
    <div class="ModalPost" v-if="statePost1">
      <div class="postContainer">
        <div id="content" ref="post1" v-bind:style="{ 'background-image': 'url('+inmueble.inmueble_imagenes[0].url+')'}">
          <header :style="{backgroundColor:this.colorSecundario}">
            <picture class="logo" v-if="inmueble.user_id.empresa">
              <img
                v-if="inmueble.user_id.empresa.logo"
                :src="inmueble.user_id.empresa.logo"
                :alt="inmueble.user_id.empresa.razon_social"
              />
            </picture>
          </header>
          <div class="inmueble-details" :style="{backgroundColor:this.colorPrimario, color:this.colorFuente}">
            <h3 class="inmueble-details__id" :style="{color:this.colorFuente,   borderBottom: `2px solid ${this.colorFuente}`}"> 
              <span class="title__tipo" v-if="vistaTipoNegocio"> {{ vistaTipoNegocio }} - </span> 
              <span v-if="inmueble.tipo_inmueble">{{ inmueble.tipo_inmueble.tipo }} - </span>
              <span v-if="inmueble.barrio_id"> {{ inmueble.barrio_id.name }}</span>
              </h3>
            <!-- <h1 class="inmueble-details__title">
              {{ inmueble.id}}
            </h1> -->
            <h3 class="inmueble-details__name" :style="{color:this.colorFuente}">
              ID: {{ inmueble.id }}
            </h3>
            <ul class="caracteristics-list">

              <li v-if="inmueble.habitaciones" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" :style="{fill: this.colorFuente}">
                  <path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z"/>
                </svg>
                  <span class="caracteristics-list__item">
                    {{
                      FormatQuantity(
                        inmueble.habitaciones,
                        "Habitaciones",
                        "Habitacion"
                      )
                    }}
                  </span>
              </li>
              <li v-if="inmueble.banos">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" :style="{fill: this.colorFuente}">
                  <path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z"/>
                </svg>
                <span class="caracteristics-list__item">
                  {{ FormatQuantity(inmueble.banos, "Baños", "Baño") }}
                </span>
                
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" :style="{fill: this.colorFuente}">
                  <path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z"/>
                </svg>
                <span class="caracteristics-list__item">
                  {{ inmueble.area_contruida }}
                </span>
                <span class="und">m<sup>2</sup></span>
              </li>
              <li v-if="inmueble.ano_construcion">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" :style="{fill: this.colorFuente}">
                  <path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z"/>
                </svg>
                <span class="caracteristics-list__item">
                  {{ inmueble.ano_construcion}}
                </span>
              </li>
            </ul>
          </div>
          <div
            class="price"
            :style="{
              backgroundColor: this.colorSecundario,
            }"
          >
            <h2  :style="{color:this.colorFuente}">Valor:</h2>
            <p v-if="inmueble.selling_price" :style="styleFontColor">
              {{ currencyFormat(inmueble.selling_price) }}
            </p>
            <p v-else
            :style="{
              color: this.colorPrecio,
            }">
              {{ currencyFormat(inmueble.rental_price) }}</p>
          </div>
          <div class="images" v-if="inmueble.inmueble_imagenes.length > 1">
            <figure>
              <img
                :src="inmueble.inmueble_imagenes[1].url"
                :alt="inmueble.titulo_inmueble"
              />
            </figure>
            <figure v-if="inmueble.inmueble_imagenes.length > 2">
              <img
                :src="inmueble.inmueble_imagenes[2].url"
                :alt="inmueble.titulo_inmueble"
              />
            </figure>
          </div>
          <footer>
            <h2
              :style="{ color: this.colorFuente }"
            >
              Contáctanos
            </h2>
            <div>
              <div>
                <p v-if="this.inmueble.user_id.empresa.celular">
                  <img
                    style="color: red"
                    width="30px"
                    height="30px"
                    src="../../../../assets/images/icons/whatsappIcon.svg"
                    crossorigin="anonymous"
                    alt=""
                  />
                  <span
                    :style="{
                      color: this.colorPrecio,
                    }"
                    >{{
                      this.inmueble.created_by.userdata.celular_whatsapp ||
                      this.inmueble.created_by.userdata.celular_movil
                    }}</span
                  >
                </p>
              </div>
              <div>
                <p v-if="this.inmueble.user_id.empresa.pagina_web">
                  <img
                    width="30px"
                    height="30px"
                    src="../../../../assets/images/icons/browserIcon.svg"
                    crossorigin="anonymous"
                    alt=""
                  />
                  <span
                    :style="{
                      color: this.colorPrecio,
                    }"
                    >{{ this.inmueble.user_id.empresa.pagina_web }}</span
                  >
                </p>
              </div>
            </div>
            <small :style="{color: this.colorPrecio}"
              >Desarrollado por:
              <span style=" text-decoration: underline" :style="{color: this.colorPrecio}"
                >www.crmred.co</span
              ></small
            >
          </footer>
        </div>
      </div>
    </div>
    <div class="ModalPost2" v-else >
      <div id="post2">
        <div class="container-post2" :style="styleContainerPost" ref="post2">
        <div class="container__header" :style="styleFontColor">
          <div class="container__header-title">
            <p class="header_title-empresa"  v-if="inmueble.user_id.empresa.nombre" >
              {{inmueble.user_id.empresa.nombre  }}
            </p>
            <p v-if="inmueble.user_id.empresa.email" class="d-flex" style="gap: 6px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon_header-svg" :style="{fill:this.colorFuente}">
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
              </svg>
              <a :href="'mailto:'+inmueble.user_id.empresa.email" :style="styleFontColor" class="header__link header__link-email">
                {{inmueble.user_id.empresa.email  }}
              </a>
            </p>
            <p v-if="inmueble.user_id.empresa.pagina_web" :style="styleFontColor"  class="d-flex" style="gap: 6px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  class="icon_header-svg" :style="{fill:this.colorFuente}">
                <path d="M0 256C0 209.4 12.47 165.6 34.27 127.1L144.1 318.3C166 357.5 207.9 384 256 384C270.3 384 283.1 381.7 296.8 377.4L220.5 509.6C95.9 492.3 0 385.3 0 256zM365.1 321.6C377.4 302.4 384 279.1 384 256C384 217.8 367.2 183.5 340.7 160H493.4C505.4 189.6 512 222.1 512 256C512 397.4 397.4 511.1 256 512L365.1 321.6zM477.8 128H256C193.1 128 142.3 172.1 130.5 230.7L54.19 98.47C101 38.53 174 0 256 0C350.8 0 433.5 51.48 477.8 128V128zM168 256C168 207.4 207.4 168 256 168C304.6 168 344 207.4 344 256C344 304.6 304.6 344 256 344C207.4 344 168 304.6 168 256z"/>
              </svg>
              <a :href="inmueble.user_id.empresa.pagina_web" target="_blank"  :style="styleFontColor" class="header__link header__link-email">
                {{inmueble.user_id.empresa.pagina_web }}
              </a>
            </p>
  
          </div>
          <picture class="logo"  v-if="inmueble.user_id.empresa">
            <img
              v-if="inmueble.user_id.empresa.logo"
              :src="inmueble.user_id.empresa.logo"
              :alt="inmueble.user_id.empresa.razon_social"
            />
          </picture>
        </div>
          <h2 class="container_title" :style="styleFontColor">
          <span>{{ vistaTipoNegocio }}</span> - {{ inmueble.tipo_inmueble.tipo }}
<!--
          {{ inmueble.titulo_inmueble}} -->
        </h2>
          <p class="text_info" :style="styleFontColor">GRAN</p>
          <div class="container-image"  :style="{
            backgroundColor:this.colorFuente
          }">
            <p class="text-complement" :style="{backgroundColor:this.colorFuente, color:this.colorPrecio}">OPORTUNIDAD</p>
            <p class="text_barrio" v-if="inmueble.barrio_id" :style="{color:this.colorPrecio}">{{ inmueble.barrio_id.name  }}</p>
            <figure  v-if="inmueble.inmueble_imagenes.length>1" class="image_principal">
              <img :src="inmueble.inmueble_imagenes[0].url" :alt="inmueble.inmueble_imagenes[0].url" >
            </figure>
            <p class="container-image__price" 
            v-if="inmueble.rental_price" :style="{backgroundColor:this.colorFuente,color:this.colorPrecio }"
            > {{currencyFormat(inmueble.rental_price) }}</p>
            <p class="container-image__price" 
            v-if="inmueble.selling_price" :style="{backgroundColor:this.colorFuente,color:this.colorPrecio}"
            > {{ currencyFormat(inmueble.selling_price)}}</p>
          </div>
          <div class="container-meta" :style="styleFontColor">
            <div class="item-meta">
              <svg  class="icon_post" :style="{fill:this.colorFuente}" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 301.57"><path fill-rule="nonzero" d="M65.11 107.53 253.54 1.15a8.968 8.968 0 0 1 8.82.02l188.27 107.31c4.31 2.45 5.83 7.94 3.38 12.25a8.987 8.987 0 0 1-3.13 3.23L264.6 237.36c-2.99 1.83-6.64 1.69-9.44-.05L64.4 123.34c-4.25-2.55-5.64-8.07-3.09-12.32a8.912 8.912 0 0 1 3.8-3.49zm253.74 176.35c4.79 1.26 7.66 6.19 6.4 10.99-1.26 4.79-6.19 7.66-10.98 6.4l-30.27-8c-4.8-1.26-7.67-6.19-6.4-10.99l8.15-30.84c1.26-4.8 6.18-7.66 10.98-6.4 4.8 1.26 7.67 6.18 6.41 10.98l-2.81 10.61 179.38-103.48-9.85-2.64c-4.8-1.28-7.65-6.22-6.37-11.01 1.28-4.8 6.22-7.66 11.02-6.38l30.81 8.26c4.8 1.28 7.65 6.22 6.37 11.02l-8.1 30.24c-1.28 4.8-6.22 7.65-11.02 6.37-4.8-1.28-7.65-6.22-6.37-11.02l2.49-9.3-178.42 102.92 8.58 2.27zm-115.09 17.38c-4.96.41-9.32-3.28-9.72-8.23-.4-4.96 3.28-9.32 8.24-9.72l9.07-.77-187.91-112.3 2.36 8.82c1.28 4.79-1.57 9.73-6.37 11.01-4.8 1.29-9.74-1.57-11.02-6.37l-8.1-30.23c-1.28-4.8 1.57-9.74 6.37-11.02l30.81-8.26c4.8-1.28 9.74 1.57 11.02 6.37 1.28 4.8-1.57 9.73-6.37 11.02l-10.28 2.75 191.55 114.49-.87-10.23c-.4-4.95 3.28-9.31 8.24-9.71 4.95-.41 9.31 3.28 9.71 8.23l2.7 31.79c.41 4.95-3.28 9.31-8.23 9.72l-31.2 2.64zM257.9 19.29 86.88 115.84l173 103.36L428.5 116.54 257.9 19.29z"/>
              </svg>
              <p class="text-icon">Area lote</p>
              <p class="text-icon_data" v-if="inmueble.area_lote">{{ inmueble.area_lote }} m<sup>2</sup></p>
            </div>
            <div class="item-meta">
              <svg class="icon_post" :style="{fill:this.colorFuente}" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 301.55"><path fill-rule="nonzero" d="m31.69 154.31 191.77 114.61-.88-10.31c-.4-4.93 3.27-9.27 8.19-9.67 4.93-.4 9.27 3.27 9.67 8.19l2.7 31.8c.4 4.93-3.27 9.26-8.19 9.67l-31.21 2.64c-4.92.4-9.26-3.26-9.66-8.19-.4-4.93 3.26-9.27 8.19-9.67l9.22-.78L23.32 170.13l2.39 8.94c1.28 4.78-1.56 9.69-6.34 10.97-4.77 1.27-9.68-1.57-10.96-6.34l-8.1-30.25c-1.28-4.77 1.56-9.69 6.33-10.96l30.82-8.26c4.77-1.27 9.69 1.57 10.96 6.34 1.28 4.77-1.56 9.69-6.34 10.96l-10.39 2.78zm271.7 38.46-11.94-11.94c-3.5-3.49-3.5-9.17 0-12.67s9.18-3.5 12.68 0l15.02 15.02 109.48-66.64-64.78-36.93-86.08 62.19 6 6c3.49 3.49 3.49 9.17 0 12.67-3.5 3.5-9.18 3.5-12.68 0l-8.04-8.04-12.54 9.06c-4 2.88-9.58 1.97-12.46-2.03-2.88-4-1.98-9.59 2.03-12.47l106.72-77.1-88.9-50.68-46.69 26.36 36.57 32.38c.75.57 1.43 1.26 1.99 2.07 2.82 4.06 1.82 9.65-2.24 12.47l-92.35 64.22 40 23.9 24.53-20.06c3.82-3.13 9.47-2.56 12.6 1.26 3.14 3.83 2.57 9.48-1.25 12.61l-19.52 15.96 48.34 28.88 43.51-26.49zm147.5-68.85L264.58 237.33a8.893 8.893 0 0 1-9.24.04L64.39 123.29a9.055 9.055 0 0 1-3.18-3.29c-2.41-4.29-.89-9.74 3.4-12.15L253.05 1.46c2.71-1.77 6.29-2 9.3-.29l188.17 107.27c1.34.73 2.5 1.8 3.34 3.19 2.57 4.21 1.24 9.72-2.97 12.29zM194.76 54.85l-108 60.98 51.54 30.79 89.67-62.36-33.21-29.41zm124.09 229.1c4.77 1.26 7.63 6.16 6.37 10.93-1.25 4.77-6.15 7.63-10.93 6.37l-30.27-8c-4.78-1.26-7.63-6.16-6.38-10.93l8.16-30.85c1.26-4.77 6.16-7.62 10.93-6.37 4.77 1.26 7.62 6.16 6.37 10.93l-2.83 10.72 179.61-103.61-9.96-2.67c-4.78-1.28-7.62-6.19-6.34-10.96 1.27-4.78 6.19-7.62 10.96-6.34l30.82 8.26c4.77 1.27 7.61 6.19 6.33 10.96l-8.1 30.25c-1.28 4.77-6.19 7.61-10.96 6.34-4.78-1.28-7.62-6.19-6.34-10.97l2.52-9.42-178.66 103.06 8.7 2.3z"/>
              </svg>
              <p class="text-icon">Area construida</p>
              <p class="text-icon_data" v-if="inmueble.area_contruida">{{ inmueble.area_contruida }}m<sup>2</sup></p>
            </div>
            <div class="item-meta">
              <svg class="icon_post icon_post-width" :style="{fill:this.colorFuente}" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 457.03"><path fill-rule="nonzero" d="M69.24 0h373.51c11.67 0 22.29 4.78 29.96 12.45 7.68 7.68 12.46 18.31 12.46 29.97v194.86c3.52 2.4 6.78 5.07 9.73 8.01l.66.73c10.16 10.47 16.44 24.05 16.44 40.25v159.51c0 6.21-5.04 11.25-11.25 11.25h-19.74c-5.29 0-9.73-3.66-10.93-8.59-7.11-20.29-14.12-31.98-23.44-38.19-9.51-6.32-22.84-7.9-42.23-7.88l-313.54.46c-13.73-.31-22.56 3.56-28.85 10.57-7.19 8.01-12.17 20.58-17.26 35.9-1.54 4.7-5.93 7.68-10.62 7.68l-22.89.05C5.04 457.03 0 451.99 0 445.78V280.95c0-15.17 5.99-27.77 15.6-37.39l.74-.67c3.16-3.06 6.7-5.79 10.53-8.18L26.82 42c0-11.65 4.79-22.15 12.49-29.75A42.525 42.525 0 0 1 69.24 0zm-46.1 328.3-.65-.02v106.26h3.66c5.16-14.51 10.82-26.75 19.17-36.07 10.7-11.93 24.85-18.5 45.98-18.03l313.11-.47c23.76-.02 40.67 2.3 54.61 11.58 12.54 8.35 21.61 21.62 29.81 42.99h.68V328.28l-.66.02H23.14zm-.65-22.47.65-.02h465.71l.66.02v-19.56c0-9.86-3.81-18.14-9.96-24.55l-.56-.52c-4.92-4.92-11.22-8.79-18.31-11.49-12.78-2.73-25.26-5.22-37.48-7.48-13.79-2.15-27.16-4.07-40.18-5.76a11.163 11.163 0 0 1-4.83-.21l-5.04-1.04c-43.12-5.28-82.66-7.96-121.81-7.99-24.01-.02-47.96.96-72.6 2.94-43.39 4.33-88.49 12.09-138.25 23.13-.47.1-.95.18-1.41.22-2.58 1.59-4.96 3.39-7.05 5.39l-.52.56c-5.56 5.55-9.02 12.8-9.02 21.48v24.88zm32.6-81.73c22.5-4.01 43.9-7.38 64.59-10.14l-.03-45.02c0-15.1 6.18-28.85 16.12-38.78l.74-.67c9.89-9.55 23.31-15.44 38.04-15.44h162.9c15.11 0 28.84 6.18 38.77 16.12 9.94 9.94 16.13 23.68 16.13 38.77v45.36c10.97 1.68 22.12 3.55 33.48 5.63 8.4 1.31 16.94 2.7 25.66 4.17 3.81.65 7.55 1.52 11.19 2.61V42.42c0-5.45-2.26-10.44-5.87-14.06-3.61-3.61-8.6-5.87-14.06-5.87H69.24c-5.57 0-10.61 2.19-14.21 5.75-3.53 3.48-5.71 8.34-5.71 13.76v183.34c1.9-.47 3.83-.89 5.77-1.24zm206.77-20.65c29.94.14 59.19 1.78 85.13 4.96 7.55.79 15.18 1.7 22.86 2.7v-42.17c0-8.88-3.66-16.99-9.54-22.87-5.87-5.87-13.97-9.53-22.86-9.53h-162.9c-8.65 0-16.54 3.43-22.37 8.98l-.51.55c-5.87 5.87-9.52 13.98-9.52 22.87v42.15c36.75-5.25 78.88-7.84 119.71-7.64z"/>
              </svg>
              <p class="text-icon">Habitaciones</p>
              <p class="text-icon_data" v-if="inmueble.habitaciones">{{inmueble.habitaciones}}</p>
            </div>
            <div class="item-meta">
              <svg class="icon_post icon_post-width" :style="{fill:this.colorFuente}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 127.9 95.25" style="enable-background:new 0 0 127.9 95.25" xml:space="preserve"><g><path d="M98.97,22.32l-0.06-0.08c-0.31-0.45-0.93-0.55-1.37-0.24l-7.6,5.32c-0.45,0.31-0.55,0.93-0.24,1.37l0.06,0.08 c0.31,0.45,0.93,0.55,1.37,0.24l7.6-5.32C99.17,23.38,99.28,22.76,98.97,22.32L98.97,22.32L98.97,22.32z M119.01,52.32l-4.12,19.22 c-1.02,4.78-3.33,8.43-6.61,10.93c-2.27,1.73-4.98,2.88-8.03,3.45l2.7,5.78c0.58,1.25,0.04,2.74-1.21,3.32 c-1.25,0.58-2.74,0.04-3.32-1.21l-3.5-7.48H35.1l-3.5,7.48c-0.58,1.25-2.07,1.79-3.32,1.21c-1.25-0.58-1.79-2.07-1.21-3.32 l2.55-5.46c-3.9-0.34-7.1-1.59-9.68-3.73c-3.01-2.5-5.07-6.13-6.3-10.86L8.57,52.32H4.61c-1.26,0-2.41-0.52-3.25-1.35l0-0.01 l-0.01,0.01C0.52,50.13,0,48.98,0,47.71v-4.19c0-1.27,0.52-2.42,1.35-3.26c0.06-0.06,0.13-0.13,0.2-0.18 c0.81-0.73,1.88-1.17,3.05-1.17h0.61c0.17-1.82,0.87-3.54,1.95-5.04c1.1-1.54,2.62-2.85,4.35-3.75c1.74-0.91,3.71-1.42,5.7-1.36 c1.75,0.06,3.49,0.54,5.1,1.56c0.7-1.02,1.57-1.93,2.57-2.68c1.96-1.47,4.41-2.35,7.06-2.35c2.2,0,4.26,0.6,6.01,1.64 c1.37,0.81,2.55,1.9,3.47,3.18c2.79,0.22,5.31,1.41,7.2,3.23c1.55,1.5,2.67,3.42,3.16,5.56h67.25V14.1 c-1.46-7.17-5.6-9.12-11.13-8.33c2.49,4.34,2.17,8.75-1.36,13.25c0.45,0.73,0.41,1.53-0.08,2.38l-1.1,1.27 c-0.44,0.45-0.99,0.49-1.7-0.08L86.76,5.52c-0.46-0.55-0.37-1.03,0.17-1.45c1.2-1.47,1.35-1.72,3.48-1.36 c4.74-3.08,9.25-3.63,13.5-1.19c10.67-4.38,19.75,1.12,20.98,12.32l0,0V39.2c0.63,0.23,1.19,0.6,1.65,1.06 c0.83,0.83,1.35,1.99,1.35,3.26v4.19c0,1.27-0.52,2.42-1.35,3.26c-0.83,0.83-1.99,1.35-3.25,1.35H119.01L119.01,52.32z M89.4,14.1 l-0.06-0.08c-0.31-0.45-0.93-0.55-1.37-0.24l-7.6,5.32c-0.45,0.31-0.55,0.93-0.24,1.37l0.06,0.08c0.31,0.45,0.93,0.55,1.37,0.24 l7.6-5.32C89.61,15.16,89.71,14.54,89.4,14.1L89.4,14.1L89.4,14.1z M85.03,9.7l-0.06-0.08c-0.31-0.45-0.93-0.55-1.37-0.24 l-7.6,5.32c-0.45,0.31-0.55,0.93-0.24,1.37l0.06,0.08c0.31,0.45,0.93,0.55,1.37,0.24l7.6-5.32C85.23,10.76,85.34,10.14,85.03,9.7 L85.03,9.7L85.03,9.7z M93.76,18.35l-0.06-0.08c-0.31-0.45-0.93-0.55-1.37-0.24l-7.6,5.32c-0.45,0.31-0.55,0.93-0.24,1.37 l0.06,0.08c0.31,0.45,0.93,0.55,1.37,0.24l7.61-5.32C93.96,19.41,94.07,18.8,93.76,18.35L93.76,18.35L93.76,18.35z M10.29,38.91 h36.25c-0.32-0.74-0.79-1.4-1.37-1.95c-1.19-1.15-2.84-1.86-4.67-1.86c-0.28,0,0.02-0.01-0.17-0.01l-0.17,0.01 c-0.94,0.04-1.87-0.45-2.33-1.34c-0.54-1.03-1.38-1.9-2.41-2.51c-1-0.59-2.19-0.94-3.46-0.94c-1.54,0-2.95,0.5-4.06,1.33 c-1.11,0.84-1.94,2.01-2.3,3.35c-0.12,0.51-0.41,0.99-0.85,1.35c-1.07,0.87-2.65,0.71-3.52-0.36c-1.23-1.51-2.71-2.17-4.16-2.22 c-1.1-0.04-2.22,0.26-3.23,0.79c-1.02,0.54-1.92,1.32-2.59,2.24C10.78,37.45,10.44,38.17,10.29,38.91L10.29,38.91z M8.5,43.93 c-0.4,0.1-0.8,0.09-1.18,0h-2.3v3.36h117.86v-3.36H8.5L8.5,43.93z M13.74,52.32l4.74,18.07c0.96,3.68,2.48,6.45,4.66,8.25 c2.13,1.77,5,2.67,8.73,2.67h63.75c3.86,0,7.15-0.95,9.61-2.82c2.34-1.78,3.99-4.45,4.75-7.99l3.9-18.18H13.74L13.74,52.32z"/></g>
              </svg>
              <p class="text-icon">Baños</p>
              <p class="text-icon_data" v-if="inmueble.banos">{{inmueble.banos}}</p>
            </div>
            <div class="item-meta">
              <svg class="icon_post icon_post-width" :style="{fill:this.colorFuente}" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 469 512.42"><path fill-rule="nonzero" d="M191.82 93.36c27.85 0 53.07 11.31 71.31 29.54 18.23 18.23 29.53 43.46 29.53 71.3 0 27.85-11.3 53.07-29.53 71.31-18.24 18.23-43.46 29.53-71.31 29.53-27.84 0-53.07-11.3-71.3-29.53-18.23-18.24-29.54-43.46-29.54-71.31 0-27.84 11.31-53.07 29.54-71.3 18.23-18.23 43.46-29.54 71.3-29.54zm123.82 275.88 21.62 20.54 40.43-41.04c3.76-3.84 6.12-6.89 10.79-2.13l15.08 15.46c4.95 4.89 4.69 7.74.02 12.33l-57.73 56.73c-9.83 9.65-8.13 10.26-18.12.31l-37.51-37.29c-2.05-2.24-1.83-4.53.41-6.79l17.53-18.14c2.66-2.76 4.76-2.6 7.48.02zM348 270.39c33.39 0 63.66 13.55 85.55 35.44l.61.65c21.53 21.84 34.84 51.85 34.84 84.91 0 33.4-13.55 63.68-35.45 85.58l-.65.61c-21.83 21.52-51.84 34.84-84.9 34.84-33.4 0-63.65-13.57-85.54-35.45-21.94-21.9-35.49-52.18-35.49-85.58 0-33.37 13.57-63.62 35.45-85.52 21.89-21.93 52.18-35.48 85.58-35.48zm69.05 51.95c-17.66-17.67-42.1-28.6-69.05-28.6-26.96 0-51.42 10.93-69.08 28.6-17.65 17.64-28.59 42.1-28.59 69.05 0 26.96 10.92 51.42 28.59 69.08 17.64 17.64 42.1 28.59 69.08 28.59 26.7 0 50.94-10.73 68.56-28.06l.49-.53c17.67-17.66 28.6-42.12 28.6-69.08 0-26.7-10.74-50.94-28.07-68.56l-.53-.49zM197.53 485.87c7.56-4.8 14.91-9.92 22.02-15.28a149.47 149.47 0 0 0 13.51 18.57c-9.26 6.93-18.87 13.49-28.85 19.57-3.7 2.74-8.88 3.08-13 .48-44.87-28.52-82.58-62.92-112.28-100.19C38.05 357.7 12.26 300.79 3.44 246.01c-8.96-55.55-.56-109.03 27.07-152.51C41.4 76.35 55.34 60.72 72.37 47.15 111.36 16.08 156-.37 200.29.01c42.69.35 84.97 16.28 121.48 49.6 12.8 11.7 23.59 24.97 32.37 39.46 26.56 43.85 34.52 98.6 26.54 154.99-7.4-1.63-14.96-2.72-22.72-3.23 7.27-51.33.26-100.76-23.43-139.87-7.6-12.52-17-24.08-28.24-34.34-32.14-29.32-69.08-43.36-106.2-43.65-38.97-.32-78.53 14.37-113.42 42.18C71.78 77 59.56 90.73 49.97 105.83c-24.52 38.59-31.92 86.5-23.85 136.6 8.19 50.88 32.39 104.07 70.81 152.29 26.78 33.59 60.51 64.79 100.6 91.15zm49.33-346.7c-14.06-14.06-33.55-22.81-55.04-22.81-21.48 0-40.97 8.75-55.03 22.81-14.06 14.06-22.81 33.55-22.81 55.03 0 21.49 8.75 40.98 22.81 55.04 14.06 14.06 33.55 22.8 55.03 22.8 21.49 0 40.98-8.74 55.04-22.8 14.06-14.06 22.8-33.55 22.8-55.04 0-21.48-8.74-40.97-22.8-55.03z"/>
              </svg>
              <p class="text-icon">Ubicacion</p>
              <p class="text-icon_data" v-if=" inmueble.estado_id && inmueble.ciudad_id ">{{ inmueble.estado_id.name}},<br>{{ inmueble.ciudad_id.name}}</p>
            </div>
    
          </div>
          <div class="container-post2__list">
            <ul class="container-post2__list-images">
              <li  v-for="item in inmueble.inmueble_imagenes.slice(1,7)" :key="item.id" v-if="inmueble.inmueble_imagenes.length>=6">
                <figure  v-if="item.url">
                  <img :src="item.url" :alt="item.url" >
                </figure>
                <figure v-else>
                  <img src="https://res.cloudinary.com/dppmjy7uj/image/upload/v1675376591/assets_CRM/not_found_image.png" :alt="item.id" >
                </figure>
              </li>
            </ul>
          </div>
          <div>
            <div class="container-contact">
              <p :style="{color:this.colorFuente}">Para verla comunicarse al:</p>
              <div class="container-contact__cel" :style={backgroundColor:this.colorFuente,color:this.colorPrecio}>
                <span>
                  <img
                      style="color: red"
                      width="25px"
                      height="25px"
                      src="../../../../assets/images/icons/whatsappIcon.svg"
                      crossorigin="anonymous"
                      alt=""
                    />
                </span>
                <span class="contact__cel" v-if="inmueble.user_id.empresa.celular" >{{ inmueble.user_id.empresa.celular }} </span>
              </div>
              <p :style="{color: this.colorFuente}"
                >Desarrollado por:
                <span 
                  >www.crmred.co</span
                ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="inmueble.user_id.empresa" class="buttons__container">
        <a style="display: block; margin: 0 auto;" >
          <b-button
            variant="primary"
            class="button"
            size="md"
            @click="sharePost"
          >
            Compartir
          </b-button>
        </a>
        <a ref="downloadButton" style="display: block; margin: 0 auto;">
          <b-button
            variant="success"
            class="button"
            size="md"
            @click="downloadPost"
          >
            Descargar
          </b-button>
        </a>
    </div>
  </div>
</template>

<script>
import inmueble from "@/store/inmueble";
import domtoimage from "dom-to-image";
// import { validate, ValidationObserver } from "vee-validate";

export default {
  name: "ModalPost",
  data() {
    return {
      url_web:'',
      statePost1:true,
      styleContainerPost:null,
      styleFontColor:null,
      styleFontColorPrice:null,
      colorPrimario:'#111f39',
      colorSecundario:'#111f39',
      colorFuente:'white',
      colorPrecio:'black',
    };
  },

  props: {
    inmueble: Object,
  },
  computed:{
    vistaTipoNegocio(){
      let data  = this.inmueble.tipo_negocio.tipo
      let tipo = data.toLowerCase()
      let frase=''
      if(tipo==="alquiler"){
        frase='se alquila'

        return frase.toUpperCase()
      }else if(tipo=== "venta"){
        frase = "se vende"
        return frase.toUpperCase()
      }else{
        frase = "se vende-alquila"
        return frase.toUpperCase()
      }
    }
  },
  watch:{
    colorPrimario(){
      this.ChangeColorBackground()
    },
    colorSecundario(){
      this.ChangeColorBackground()
    },
    colorFuente(){
      this.ChangeColorFont()
    },
    colorPrecio(){
      this.ChangeColorPrice()
    }
  },
  created() {
    // this.colorPrimario= this.inmueble.user_id.empresa.color_primario;
    // this.colorSecundario=this.inmueble.user_id.empresa.color_secundario;
  },
  mounted() {
    this.url_web = `https://${this.inmueble.user_id.empresa.slug}.inmob.site/inmuebles/detalle/${this.inmueble.slug}`;
    this.ChangeColorFont()
    this.ChangeColorBackground()
  },
  methods: {

    ChangeColorBackground(){
      this.styleContainerPost={
      background: this.inmueble.user_id.empresa.color_primario,
      background: `radial-gradient(circle, ${this.colorSecundario} 0%, ${this.colorPrimario}  100%)`
    }
    },
    ChangeColorFont(){
      this.styleFontColor={
        color: this.colorFuente,
      }
    },
    ChangeColorPrice(){
      this.styleFontColorPrice={
        color:this.colorPrecio
      }
    },
    handleClickPost(){
      let el
      if(this.statePost1){
        el = this.$refs.post1;
      }else{
        el = this.$refs.post2;
      }
      return el;
    },
    verPost(payload){
      if(payload==='post1'){
        this.statePost1=true
      }else{
        this.statePost1=false
      }
    },
    currencyFormat(value) {
      return (
        "$" +
        new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits:0
        }).format(value)
      );
    },
    validateTypeInmueble(){
      if(this.inmueble.rental_price>0 &&this.inmueble.selling_price>0){
        const valType = 
        `SE ALQUILA: ${this.currencyFormat(this.inmueble.rental_price)}
        SE VENDE: ${this.currencyFormat(this.inmueble.selling_price)}`
        return valType
      }
      else if(this.inmueble.rental_price>0){
        const valType = 
        `SE ALQUILA: ${this.currencyFormat(this.inmueble.rental_price)}`
        return valType
      }else if(this.inmueble.selling_price>0){
        const valType = 
        `SE VENDE: ${this.currencyFormat(this.inmueble.selling_price)}`
        return valType
      }
    },
    FormatQuantity(value, typePlural, typeSingular) {
      return value > 1
        ? parseInt(value) + " " + typePlural
        : parseInt(value) + " " + typeSingular;
    },
    async sharePost() {

      if (!('share' in navigator)) {
        return
      }
      const typeInmueble = this.validateTypeInmueble();
      let el = this.handleClickPost();
      const inmuebleName = this.inmueble.titulo_inmueble;
      const inmuebleDescription =
`
${this.inmueble.titulo_inmueble}. 
${typeInmueble}.
${this.inmueble.area_contruida}m2 (Area construida).
${this.inmueble.area_lote}m2 (Area lote).
${this.inmueble.habitaciones} (Habitaciones).
${this.inmueble.banos} (baños).
${this.url_web}.`;
      
    domtoimage.toBlob(el)
      .then(function (blob) {
        const files = [new File([blob], inmuebleName + '.png', {type: blob.type})]
        const shareData = {
          text: inmuebleDescription,
          title: inmuebleName,
          files,
        }
        if (navigator.canShare(shareData)) {
          try {
            navigator.share(shareData)
          } catch (err) {
            if (err.name !== 'AbortError') {
              console.error(err.name, err.message)
            }
          }
        } else {
          console.warn("Sharing not supported", shareData);
        }
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
    },
    async downloadPost() {
      let el = this.handleClickPost();
      const inmuebleName = this.inmueble.titulo_inmueble;
      const downloadButton = this.$refs.downloadButton;
      domtoimage.toPng(el)
      .then( async function (dataUrl) { 
        downloadButton.href = dataUrl;
        downloadButton.download = await inmuebleName + '.png'
        await downloadButton.click();
      })
      .catch(function (error) {
      });
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li{
  list-style: none;
}
body {
  font-family: "Montserrat", sans-serif;
}
.figure{
  overflow: hidden;
}

.container__post{
  width: 100%;
  height:auto;
}
.btn_select{
  background-color: white ;
  color: var(--primary);
  padding: 8px 6px;
  border: 2px solid var(--primary);
  border-radius: 5px;
  font-weight: bold;
}

.check{
  background-color: var(--primary);
  color: white;

}

/* POST2 */
.ModalPost2{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}

#post2{
  height: auto;
  overflow: auto;
  max-width: 600px;
  margin: 20px auto;
}

.container-post2{
  display: flex;
  height: 100%;
  width: 100%;
  padding: 20px 10px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: white;
  position: relative;
  overflow: hidden;
}
.container__btns{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.btns_event-post{
  display: flex;
  gap: 6px;
}
.container__btn{
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill,minmax(82px,1fr));
  grid-auto-rows: 60px;
  justify-items: center;
  gap: 1rem;
}
@media (min-width:500px) {
  .container__btns{
  flex-direction: row;
}
.btns_event-post{
  flex-direction: column;
}
.btn_select{
  min-width: 120px;

}
}
@media (min-width: 830px) {
  .btns_event-post{
  flex-direction: row;
}
.container__btns{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.container__btn{
  max-width: 450px;
}
}
.colorBox{
  display: flex;
  justify-content: center;
}


.background__color{
max-width: 75px;
}
.container__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}
.container__header-title{
  max-width: 390px;
}
.container__header-title p{
  margin-bottom: 6px;
}
.header_title-empresa{
  font-size: 1.3em;
}
.icon_header-svg{
  width: 18px;
}
.container_title{
  color: #fdd93d;
  border-bottom: 4px solid;
 
}
.icon_post{
  width:50px;
  height:50px;
}
.item-meta{
  display:flex;
  flex-direction:column;
  align-items:center;
}
.text-icon_data{
  font-weight:bold;
  text-align: center;
}
.text-icon{
  font-size:10px;
  font-weight: bold;
}
.icon_post-width{
  width:30px;
  height:30px;
  margin:8px 0;
}
.text_info{
  font-size: 1.5em;
  font-weight: bold;
  color:#fdd93d;

}
.text-complement{
  text-align: center;
  padding: .3rem;
  color: black;
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  top: -30px;
  left:  calc( 50% - 100px );
  height: 40px;
  width: 200px;
}
.text_barrio{
  position: absolute;
  height: 25px;
  width: 140px;
  top: 20px;
  left:  calc( 50% - 70px );
  text-align: center;
  font-weight: bold;
  font-size: 1.3em;
  color: black;

}
.image_principal{
  max-width: 350px;
  object-fit: cover;
}
.image_principal img{
  width: 100%;
}
.container-image{
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fdd93d;
  margin-top: 1.2rem;
  padding: 8px;
}

.container-image__price{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .2rem;
  color: black;
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  bottom: -16px;
  left:  calc( 50% - 125px );
  height: 40px;
  width: 250px;
  border-radius: 5px;
}
.container-meta{
  display:flex;
  justify-content:center;
  margin-top: 1rem;
  gap:1.5rem;
}

.container-post2__list{
  display: flex;
  justify-content: center;
}
.container-post2__list-images{
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3,8rem);
  gap: 1rem;
  grid-auto-rows: 8rem;
}
.container-post2__list-images img{
  width: 100%;
  object-fit: contain;
}

.icon_svg{
  fill: #3dc152;
  height: 30px;
}
.container-contact__cel{
  padding: 0.3rem 1rem;
  width: 250px;
  text-align: center;
}

.container-contact p{
  text-align: center;
  margin-bottom: 6px;
  color:#fdd93d;
}

.list__line{
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
}
.list_left,.list_rigth{
  display: flex;
  gap: 1rem;
}
.item_line{
  height: 180px;
  width: 6px;
  background-color: #fdd93d;
}

.contact__cel{
  font-weight: bold;
  font-size: 1.4em;
}


/* POST 1 */
.title__tipo{
  font-weight: bold;
  font-size:1.2em;
}
.ModalPost {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}
.postContainer {
  width: 100%;
  overflow: auto;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
#content {
  color: #fff;
  width: 700px;
  height: 600px;
  position: relative;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.button {
  width: 200px;
  margin: 0 auto;
  padding: 14px;
  margin-top: 20px;
  font-size: 1.3em;
}
header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
}
.logo {
  width: 20%;
  height: 100%;
  display: block;
  padding: 6px 0;
}
.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.inmueble-details {
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 45%;
  height: 100%;
  padding: 24px;
  z-index: 1;
  -moz--clip-path: polygon(100% 0, 100% 38%, 0 100%, 0 100%, 0 0);
  -webkit-clip-path: polygon(100% 0, 100% 38%, 0 100%, 0 100%, 0 0);
  clip-path: polygon(100% 0, 100% 38%, 0 100%, 0 100%, 0 0);
}

.inmueble-details__id {
  font-size: 1.6em;
  padding-top: 18px;
}

.inmueble-details__name {
  color: #fff;
  width: 80%;
  margin-top: 6px;
  margin-bottom: 30px;
}

.caracteristics-list {
  list-style: none;
  padding-left: 0px;
}
.caracteristics-list__item{
  margin-left:6px;
}

.caracteristics-list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 20px;
}

.price {
  bottom: 160px;
  position: absolute;
  width: 60%;
  color: #fff;
  -moz-clip-path: polygon(100% 0, 80% 100%, 80% 100%, 0 100%, 0 0);
  -webkit-clip-path: polygon(100% 0, 80% 100%, 80% 100%, 0 100%, 0 0);
  clip-path: polygon(100% 0, 80% 100%, 80% 100%, 0 100%, 0 0);
  padding: 10px 20px;
  font-size: 1.2em;
  z-index: 2;
}

.price i {
  color: #fff;
}
.price p {
  margin-top: -2px;
  font-size: 1.6em;
  font-weight: 500;
}

.images {
  position: absolute;
  bottom: 100px;
  right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 2;
}

.images figure {
  border: 1px solid #fff;
  background-color: #fff;
  border-radius: 50%;
  padding: 6px;
  width: 180px;
  height: 180px;
  overflow: hidden;
}

.images figure:nth-child(1) {
  margin-right: -26px;
}

.images figure img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  padding-left: 120px;
  padding-top: 60px;
  height: 160px;
}

footer > div {
  display: flex;
  align-items: center;
}

footer h2 {
  font-size: 1.8em;
  margin-bottom: 8px;
  color: rgb(182, 36, 36);
}

footer div div {
  margin-right: 40px;
}

footer div div p {
  display: flex;
  align-items: center;
  color: rgb(182, 36, 36);
}

footer div div p img {
  margin-right: 4px;
}

footer small {
  position: absolute;
  right: 6px;
  bottom: 0;
}

/* @media only screen and (max-width: 768px) {
  #content {
    color: #fff;
    width: 700px;
    height: 600px;
    position: relative;
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 15px;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
  }
  .button {
    width: 200px;
    margin: 0 auto;
    padding: 14px;
    margin-top: 16px;
    font-size: 1.3em;
  }
  header {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
  }
  .logo {
    width: 20%;
    height: 100%;
    display: block;
  }
} */

.buttons__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width:700px) {
  #post2{
    width: 100%;
  }
  .container-post2{
    width: 600px;
  }

}
@media screen and (min-width: 768px) {
  .buttons__container {
    flex-direction: row;
  }
  .postContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }


}
</style>
