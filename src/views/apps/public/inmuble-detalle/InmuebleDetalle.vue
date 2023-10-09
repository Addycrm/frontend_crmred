<template>
  <div id="InmuebleDetail" ref="InmuebleDetail">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 p-2">
          <div class="row mx-n1 mt-n1 align-items-center">
            <div class="col-12 px-1 pt-1 d-block d-md-none">
              <h1 class="tituloInmueble mb-0">{{inmueble.titulo_inmueble}}</h1>
            </div>
            <div v-if="empresa.id" class="col-12 col-md-6 p-1 order-1 order-md-0">
              <div class="empresa rotulo row align-items-center">
                <figure class="logo-empresa m-0 col-3 col-md-auto">
                  <cld-image v-if="empresa.logo" :public-id="empresa.logo | urlImages" class="img-fluid">
                    <cld-transformation height="120" width="200" crop="fit" />
                  </cld-image>
                  <cld-image v-else public-id="default/crmred-logo_dh7faw" class="img-fluid">
                    <cld-transformation height="120" width="200" crop="fit" />
                  </cld-image>
                </figure>
                <div class="datosEmpresa col-9 col-md-auto d-flex flex-column pl-0">
                  <div class="rol">
                    <span class="text">
                      Empresa
                    </span>
                  </div>
                  <div class="nombre">
                    <span class="text">
                      {{empresa.nombre}}
                    </span>
                  </div>
                  <div v-if="empresa.celular" class="dataContact celular">
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M320 0H64C37.5 0 16 21.5 16 48v416C16 490.5 37.5 512 64 512h256c26.5 0 48-21.5 48-48v-416C368 21.5 346.5 0 320 0zM240 447.1C240 456.8 232.8 464 224 464H159.1C151.2 464 144 456.8 144 448S151.2 432 160 432h64C232.8 432 240 439.2 240 447.1zM304 384h-224V64h224V384z"/></svg>
                    </span>
                    <span class="text">
                      {{empresa.celular}}
                    </span>
                  </div>
                  <div v-if="empresa.email" class="dataContact email">
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/></svg>
                    </span>
                    <span class="text">
                      {{empresa.email}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="agente.id" class="col-12 col-md-6 p-1">
              <div class="agente rotulo row align-items-center justify-content-end">
                <figure class="logo-agente m-0 col-3 col-md-auto order-1">
                  <span class="canvas">
                    <cld-image v-if="agente.foto_persona" :public-id="agente.foto_persona | urlImages" class="img-fluid mx-auto d-block">
                      <cld-transformation fetch-format="png" />
                      <cld-transformation gravity="face" height="150" width="150" zoom="0.5" crop="thumb" />
                      <cld-transformation radius="300" />
                    </cld-image>
                    <cld-image v-else :public-id="agente.genero == 1 ? 'default/photo-default-male_elbsty' : 'default/photo-default-female_aqhcir'" class="img-fluid mx-auto d-block">
                      <cld-transformation fetch-format="png" />
                      <cld-transformation gravity="face" height="150" width="150" zoom="0.5" crop="thumb" />
                      <cld-transformation radius="300" />
                    </cld-image>
                  </span>
                </figure>
                <div class="datosAgente col-9 col-md-auto d-flex flex-column pr-0">
                  <div class="rol">
                    <span class="text">
                      Agente inmobiliario
                    </span>
                  </div>
                  <div class="nombre">
                    <span class="text">
                      {{agente.primer_nombre}}
                    </span>
                  </div>
                  <div v-if="agente.celular_whatsapp" class="dataContact celular">
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M320 0H64C37.5 0 16 21.5 16 48v416C16 490.5 37.5 512 64 512h256c26.5 0 48-21.5 48-48v-416C368 21.5 346.5 0 320 0zM240 447.1C240 456.8 232.8 464 224 464H159.1C151.2 464 144 456.8 144 448S151.2 432 160 432h64C232.8 432 240 439.2 240 447.1zM304 384h-224V64h224V384z"/></svg>
                    </span>
                    <span class="text">
                      {{agente.celular_whatsapp}}
                    </span>
                  </div>
                  <div v-if="agente.email" class="dataContact email">
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/></svg>
                    </span>
                    <span class="text">
                      {{agente.email}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 p-1">
              <div class="row mb-1">
                <div class="col-12">
                  <Slider :items="inmueble.inmueble_imagenes"></Slider>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col d-none d-md-block">
                  <h1 class="tituloInmueble">{{inmueble.titulo_inmueble}}</h1>
                </div>
                <div class="col-auto my-1 my-md-0" v-if="inmueble.url_video || inmueble.video_3d">
                  <b-button-group>
                    <b-button size="sm" v-if="inmueble.url_video" class="btn-video" variant="danger" :href="inmueble.url_video" target="_blank">
                      <i class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
                      </i>
                      Ver video
                    </b-button>
                    <b-button size="sm" v-if="inmueble.video_3d" class="btn-video" variant="warning" :href="inmueble.video_3d" target="_blank">
                      <i class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M576 64H64c-35.2 0-64 28.8-64 64v256c0 35.2 28.8 64 64 64l128.3 .0001c25.18 0 48.03-14.77 58.37-37.73l27.76-61.65c7.875-17.5 24-28.63 41.63-28.63s33.75 11.13 41.63 28.63l27.75 61.63c10.35 22.98 33.2 37.75 58.4 37.75L576 448c35.2 0 64-28.8 64-64v-256C640 92.8 611.2 64 576 64zM160 304c-35.38 0-64-28.63-64-64s28.62-63.1 64-63.1s64 28.62 64 63.1S195.4 304 160 304zM480 304c-35.38 0-64-28.63-64-64s28.62-63.1 64-63.1s64 28.62 64 63.1S515.4 304 480 304z"/></svg>
                      </i>
                      Video Tour
                    </b-button>
                  </b-button-group>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="metaDataInmueble">
                    <div class="preciosInmueble">
                      <div class="valor venta" v-if="dataValidate(inmueble.precio_venta)">
                        <span class="label">Venta:</span>
                        <b>{{inmueble.precio_venta | precio}}</b>
                      </div>
                      <div class="valor alquiler" v-if="dataValidate(inmueble.precio_alquiler)">
                        <span class="label">Alquiler:</span>
                        <b>{{inmueble.precio_alquiler | precio}}</b>
                      </div>
                    </div>
                    <div class="metaInmueble rows">
                      <div class="meta tipo">
                        <span class="label">Tipo de inmueble:</span>
                        <span class="value">{{inmueble.tipo_inmueble}}</span>
                      </div>
                      <div class="meta tipo">
                        <span class="label">Tipo de negocio:</span>
                        <span class="value"><b>{{inmueble.tipo_negocio}}</b></span>
                      </div>
                      <div class="meta tipo">
                        <span class="label">Tipo de segmento:</span>
                        <span class="value"><b>{{inmueble.segmento_mercado}}</b></span>
                      </div>
                      <div class="meta tipo">
                        <span class="label">Estrato:</span>
                        <span class="value">{{inmueble.estrato}}</span>
                      </div>
                      <!-- <div class="meta tipo" v-if="dataValidate(inmueble.direccion)">
                        <span class="label">Dirección:</span>
                        <span class="value">{{inmueble.direccion}}</span>
                      </div> -->
                    </div>
                    <div v-if="inmueble.barrio_id" class="metaInmueble mt-1">
                      <div class="barrio">
                        Barrio: <span>{{inmueble.barrio_id.name}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row detalleInmueble mt-1">
                <div class="col">
                  <div class="wrapperDetalleInmueble descripcionGeneral">
                    <h2 class="tituloDetalleInmueble">Descripción general</h2>
                    <div class=" textoDetalleInmueble mb-4">
                      <p>{{inmueble.descripcion}}</p>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <div class="tableDetalleInmueble">
                          <div class="tableRow">
                            <span class="tableLablel">Habitaciones:</span>
                            <span class="tableValue">{{inmueble.habitaciones}}</span>
                          </div>
                          <div class="tableRow">
                            <span class="tableLablel">Baños:</span>
                            <span class="tableValue">{{inmueble.banos}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="tableDetalleInmueble">
                          <div class="tableRow">
                            <span class="tableLablel">Pisos:</span>
                            <span class="tableValue">{{inmueble.pisos}}</span>
                          </div>
                          <div class="tableRow" v-if="dataValidate(inmueble.cantidad_parqueadero)">
                            <span class="tableLablel">Parqueaderos:</span>
                            <span class="tableValue">{{inmueble.cantidad_parqueadero}}</span>
                          </div>
                          <div class="tableRow" v-if="inmueble.parqueadero">
                            <span class="tableLablel">Tipo de parqueadero:</span>
                            <span class="tableValue">{{inmueble.parqueadero.tipo}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="wrapperDetalleInmueble areaGeneral mt-5">
                    <h2 class="tituloDetalleInmueble">Area del inmueble</h2>
                    <div class="row">
                      <div class="col-12 col-md-6 flex-grow-1">
                        <div class="tableDetalleInmueble">
                          <div class="tableRow">
                            <span class="tableLabel">Area Lote:</span>
                            <span class="tableValue">{{inmueble.area_lote}} <span class="und">m<sup>2</sup></span></span>
                          </div>
                          <div class="tableRow">
                            <span class="tableLabel">Area Construida:</span>
                            <span class="tableValue">{{inmueble.area_contruida}} <span class="und">m<sup>2</sup></span></span>
                          </div>
                          <div class="tableRow">
                            <span class="tableLabel">Area Total:</span>
                            <span class="tableValue">{{inmueble.area_total}} <span class="und">m<sup>2</sup></span></span>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6 mt-1 mt-md-0" v-if="dataValidate(inmueble.fondo) || dataValidate(inmueble.frente)">
                        <div class="tableDetalleInmueble">
                          <div class="tableRow" v-if="dataValidate(inmueble.fondo)">
                            <span class="tableLabel">Fondo:</span>
                            <span class="tableValue">{{inmueble.fondo}} <span class="und">m</span></span>
                          </div>
                          <div class="tableRow" v-if="dataValidate(inmueble.frente)">
                            <span class="tableLabel">Frente:</span>
                            <span class="tableValue">{{inmueble.frente}} <span class="und">m</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="wrapperDetalleInmueble attrGeneral mt-5">
                    <div class="row">
                      <div class="col">
                        <h2 class="tituloDetalleInmueble">Caracteristicas internas</h2>
                        <ul class="attrList">
                          <li class="itemAttrList" v-for="(item, i) in inmueble.caracteristicas_internas" :key="i">
                            <span class="textAttrList">
                              {{item}}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="row mt-4">
                      <div class="col">
                        <h2 class="tituloDetalleInmueble">Caracteristicas Externas</h2>
                        <ul class="attrList">
                          <li class="itemAttrList" v-for="(item, i) in inmueble.caracteristicas_externas" :key="i">
                            <span class="textAttrList">
                              {{item}}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div v-if="inmueble.latitud" class="wrapperDetalleInmueble googleMaps mt-5">
                    <h2 class="tituloDetalleInmueble">Ubicación</h2>
                    <Map class="flex-grow-1" :data="inmueble" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Map from '@/views/apps/inmuebles/components/Map'
  import Slider from '@/views/apps/inmuebles/components/SliderInmuebleDetail'
  import { imgValidateURL, dataValidate } from "@/libs/helpers"
  export default {

    name: 'InmuebleDetail',
    components: {
      Map,
      Slider,
    },
    mounted(){
      document.documentElement.style.cssText = `--tm-color:${this.primario};`;
      this.intiInmuebleDetail();
    },
    data () {
      return {
        imgValidateURL,
        dataValidate,
        visibleSlider: true,
        detail: {},
        empresa: {
          id: null,
          logo: null,
          nombre: null,
          email: null,
          celular: null,
        },
        agente: {
          id: null,
          primer_nombre: null,
          foto_persona: null,
          genero: null,
          celular_whatsapp: null,
          email: null,
        },
        primario: '#7367f0',
        inmueble:{
          tipo_inmueble: null,
          tipo_negocio: null,
          ciudad_id: null,
          estado_id: null,
          estrato: null,
          segmento_mercado: null,
          caracteristicas_internas: null,
          caracteristicas_externas: null,
          id: null,
          precio_venta: null,
          precio_alquiler: null,
          latitud: null,
          longitud: null,
          titulo_inmueble: null,
          descripcion: null,
          habitaciones: null,
          banos: null,
          cantidad_parqueadero: null,
          ano_construcion: null,
          area_contruida: null,
          area_lote: null,
          area_total: null,
          fondo: null,
          frente: null,
          pisos: null,
          portale_state_inmueble: null,
          portales_codigo_response: null,
          portales_urls: null,
          slug: null,
          inmueble_imagenes: null,
          direccion: null,
          barrio_id: null,
          parqueadero: null,
          url_video: null,
          video_3d: null,
        }
      }
    },
    watch:{
      primario(color){
        document.documentElement.style.setProperty('--tm-color', color);
      },
    },
    methods:{
      async intiInmuebleDetail(){
        const {slug, code} = this.$route.params;
        await this.$store
        .dispatch("appInmueble/fetchInmueble", {slug, code})
        .then((inmueble) => {
          const {agente, empresa} = inmueble;
          if(empresa){
            for(let prop in this.empresa){
              Object.assign(this.empresa,{
                [prop]: empresa[prop]
              })
            }
            Object.assign(this,{
              primario: empresa.color_primario
            })
          }

          if(agente){
            const { userdata, email } = agente;
            Object.assign(userdata, {email});
            for(let prop in this.agente){
              Object.assign(this.agente,{
                [prop]: userdata[prop]
              })
            }
            Object
          }

          let _isJson = ['tipo_inmueble', 'tipo_negocio', 'ciudad_id', 'estado_id', 'estrato', 'segmento_mercado'];
          for(let prop of _isJson){
            if(inmueble[prop]){
              Object.assign(this.inmueble, {
                [prop]: inmueble[prop].name ? inmueble[prop].name : inmueble[prop].tipo
              });
            }
          }

          let _isArray = ['caracteristicas_internas', 'caracteristicas_externas'];
          for(let prop of _isArray){
            if(inmueble[prop]){
              let value = inmueble[prop].map( el => el.texto);
              Object.assign(this.inmueble,{
                [prop]: value
              });
            }
          }

          let _isNumber = ['id', 'precio_venta', 'precio_alquiler', 'latitud', 'longitud'];
          for(let prop of _isNumber){
            if(inmueble[prop]){
              Object.assign(this.inmueble,{
                [prop]: Number(inmueble[prop])
              });
            }
          }

          let _isString = ['titulo_inmueble', 'descripcion', 'habitaciones', 'banos', 'cantidad_parqueadero', 'ano_construcion', 'area_contruida', 'area_lote', 'area_total', 'fondo', 'frente', 'pisos', 'portale_state_inmueble', 'portales_codigo_response', 'portales_urls', 'slug'];
          for(let prop of _isString){
            if(inmueble[prop]){
              Object.assign(this.inmueble,{
                [prop]: inmueble[prop].toString()
              });
            }
          }

          let _Images = ['inmueble_imagenes'];
          for(let prop of _Images){
            if(inmueble[prop]){
              Object.assign(this.inmueble,{
                [prop]: inmueble[prop].map( el => el.url)
              });
            }
          }

          let _Direccion = ['direccion', 'barrio_id', 'parqueadero'];
          for(let prop of _Direccion){
            if(inmueble[prop]){
              Object.assign(this.inmueble,{
                [prop]: inmueble[prop]
              });
            }
          }
          let _valueCanonico = ['url_video', 'video_3d'];
          for(let prop of _valueCanonico){
            if(inmueble[prop]){
              Object.assign(this.inmueble,{
                [prop]: inmueble[prop]
              });
            }
          }
        }).catch((error) => {
          console.error('intiInmuebleDetail', error);
        });
      },
    }

  }
</script>

<style lang="css" >
  #InmuebleDetail {background: #fff;overflow-x: hidden;}
  @media only screen and (min-width: 768px){
    body {background: #f0f0f0;}
    #InmuebleDetail {margin: 20px auto;max-width: 1024px;box-shadow: 2px 2px 10px -1px #00000026;}
  }

  .detalleInmueble {
    line-height: 1.8;
  }
  .tituloDetalleInmueble {
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 15px;
    border-bottom: 1px solid #ebe9f1;
    padding-bottom: 6px;
  }
  .tableDetalleInmueble {
    width: 100%;
  }
  .tableDetalleInmueble.column-count{
    column-count: 2;
    column-gap: 30px;
  }

  .tableDetalleInmueble .tableRow {
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
  }

  .tableDetalleInmueble .tableRow .tableValue:last-child {
    text-align: right;
    font-weight: 600;
  }

  .tableDetalleInmueble .tableRow span {
    padding: 8px 13px;
  }

  .tableDetalleInmueble .tableRow:nth-child(odd) {
    background: #f0f0f0;
  }
  .tableDetalleInmueble .tableRow:nth-child(even):last-child {
    border-bottom: 1px solid #f0f0f0;
  }

  .textoDetalleInmueble > :first-child {
    padding-top: 0;
    margin-top: 0;
  }

  .textoDetalleInmueble > :last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  ul.attrList {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin:-8px;
  }

  ul.attrList li.itemAttrList {
    display: flex;
    align-items: center;
    padding: 8px 20px;
    line-height: 1.6;
    border: 1px solid var(--tm-color);
    font-weight: 500;
    border-radius: 0.25rem;
    margin: 8px;
  }

  .iconAttrList {
    width: 1.25em;
    margin-right: 10px;
    font-size: 20px;
    color: var(--tm-color);
    opacity: 0.6;
  }
  .sideBarInmueble {
    border: 1px solid #ebe9f1;
    padding: 20px 35px;
    border-radius: 6px;
  }

  .title-form {
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
  }

  .titleMap {font-size: 14px;font-weight: 600;text-transform: uppercase;margin-bottom: 10px;}

  .infoMap {padding: 0;list-style: none;margin: 0;font-size: 12px;}

  .infoMap b {font-weight: 500;}
  .metaDataInmueble .valor {
    font-size: 28px;
    line-height: 1;
  }

  .metaDataInmueble .preciosInmueble .label {
    font-size: 16px;
    display: block;
    margin-bottom: 6px;
  }

  .metaDataInmueble .valor+.valor {
    margin-top: 15px;
  }
  .metaDataInmueble .valor b {
    color: var(--tm-color);
    font-weight: 700;
  }

  .metaDataInmueble .metaInmueble {
    font-size: 14px;
    margin-top: 20px;
  }

  .metaDataInmueble .metaInmueble .meta {
    display: flex;
  }
  .metaInmueble.rows .meta.tipo {padding: 5px 10px;margin: 0;}

  .metaInmueble.rows .meta.tipo:nth-child(odd) {background: #f5f5f5;}
  .metaDataInmueble .metaInmueble .meta .value {
    margin-left: auto;
    padding-left: 8px;
    text-align: right;
  }

  .metaDataInmueble .metaInmueble .meta.direccion {
    border-top: 1px solid #ebe9f1;
    padding-top: 5px;
    margin-top: 5px;
  }

  .metaDataInmueble .barrio {
    padding: 10px 35px;
    background: #e4e4e4;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
  .metaDataInmueble .barrio span{
    font-weight: 700;
    color: var(--tm-color);
  }
  .sideBarInmueble .metaDataInmueble .barrio{
    margin: 20px -35px -20px;
  }
  .tituloInmueble {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 30px;
    color: var(--tm-color);
    line-height: 1.4;
  }
  @media(max-width: 991px){
    .tableDetalleInmueble.column-count{
      column-count: 1;
    }
  }
  @media(max-width: 767px){
    .metaDataInmueble .valor{
      font-size: 22px;
    }
    .metaInmueble.rows .meta.tipo{
      padding: 10px;
    }
    #InmuebleDetail{
      font-size: 14px;
    }
    ul.attrList li.itemAttrList {
      padding: 8px 16px;
      line-height: 1.4;
      font-size: 14px;
    }
    .tituloInmueble {
      font-size: 20px;
      text-align: center;
    }
    .tituloDetalleInmueble{
      font-size: 16px;
    }
  }
  .logo-empresa {max-width: 150px;}
  .rotulo .nombre {text-transform: uppercase;font-weight: 700;}
  .rotulo .dataContact {display: flex;align-items: center;font-size: 0.85em;margin-top: 4px;}
  .rotulo .icon {display: flex;height: 1em;justify-content: center;width: 1.25em;fill: #878787;margin-right: 6px; font-size: 1.1em;}
  .rotulo .datosAgente {direction: rtl; text-align: right; }
  .rotulo .datosAgente .icon {margin-right: 0; margin-left: 6px;}
  .rotulo .icon svg {width: auto;height: 100%;display: block;}
  .logo-agente {width: 150px;}
  .logo-agente img {filter: drop-shadow(3px 3px 5px #00000026);  max-width: 100%; display: block;}
  .rol {font-size: 12px;text-transform: capitalize;font-weight: 500;opacity: 0.75;}
  .rol::after {content: '';display: block;width: 3em;height: 1px;background: var(--tm-color);margin: 2px 0;}
  .btn-video {display: flex;align-items: center;}
  .btn-video .icon {width: 1.25em;font-size: 1.4em;margin: -1em 0; margin-right: 0.5em;}
  .btn-video .icon svg {display: block;fill: currentColor;width: auto;height: 1em;}
</style>
