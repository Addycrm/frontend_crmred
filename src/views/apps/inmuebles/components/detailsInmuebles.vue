<template>
  <div id="InmuebleDetail" ref="InmuebleDetail">
    <b-overlay :show="overlay">
      <div class="row pb-1 justify-content-center">
        <b-navbar toggleable="lg" type="dark" class="nav_mobile">
          <b-navbar-toggle :class="[(stateMenuMobile)?'icon__toogle-selected':'']" target="nav-collapse" class="icon__toogle" @click="showOptionsMobile()">
              <p  v-if="!stateMenuMobile" class="toogle__title">Más opciones</p>
              <svg v-if="stateMenuMobile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon__svg-close"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" v-else class="icon__svg" >
                <path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>
              </svg>
          </b-navbar-toggle>
          <b-collapse id="nav-collapse"  is-nav class="menu__colapse">
            <b-navbar-nav>
                <b-nav-item >
                  <b-button
                    class="m-1 btn_open-modal"
                    variant="outline-primary"
                    @click="
                      openModal({
                        is: 'ModalAgendar',
                        titulo: 'Agendar cita',
                        footer: true,
                        prop: { form: agendarCita },
                      })
                    "
                  >
                    Agendar Cita
                  </b-button>
                </b-nav-item>
                <b-nav-item>
                  <b-button
                    size="md"
                    class="m-1 btn_open-modal"
                    variant="outline-primary"
                    v-if="$can('read', 'inmuebles')"
                    @click="modalFicha(inmueble)"
                  >
                    Ver ficha
                  </b-button>
                </b-nav-item>
                <b-nav-item  v-show="!inmueble.mls">
                  <b-button
                    size="md"
                    class="m-1 btn_open-modal"
                    variant="outline-primary"
                    @click="
                      openModal({
                        is: 'ModalHistorial',
                        titulo: 'Historial de citas',
                        size: 'lg',
                        footer: false,
                        prop: { inmueble: detail },
                      })
                    "
                  >
                    Historial
                  </b-button>
                </b-nav-item>
                <b-nav-item v-show="!inmueble.mls">
                  <b-button  
                    size="md"
                    class="m-1 btn_open-modal"
                    variant="outline-primary"
                    @click="
                      openModal({
                        is: 'ModalPortales',
                        titulo: 'Sincronización de portales',
                        size: 'md',
                        footer: false,
                        prop: { inmueble: detail },
                      })
                    "
                  >
                    Sincronizar
                  </b-button>
                </b-nav-item>
                <b-nav-item  v-show="!inmueble.mls">
                  <b-button
                    size="md"
                    class="m-1 btn_open-modal"
                    variant="outline-primary"
                    @click="
                      openModal({
                        is: 'modalInforme',
                        titulo: 'Configurar informe propietario',
                        size: 'md',
                        footer: false,
                        prop: { inmueble: detail },
                      })
                    "
                  >
                    Informe
                  </b-button>
                </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <div class="col-auto d-flex flex-wrap border-moadal_detalle container__disable">
          <b-button
            size="md"
            class="m-1 btn_open-modal hover__btn-primary"
            variant="outline-primary"
            @click="
              openModal({
                is: 'ModalAgendar',
                titulo: 'Agendar cita',
                footer: true,
                prop: { form: agendarCita },
              })
            "
          >
            Agendar Cita
          </b-button>
          <b-button
            size="md"
            class="m-1 btn_open-modal hover__btn-primary"
            variant="outline-primary"
            v-if="$can('read', 'inmuebles')"
            @click="modalFicha(inmueble)"
          >
            Ver ficha
          </b-button>
          <b-button
            v-if="!inmueble.mls"
            size="md"
            class="m-1 btn_open-modal hover__btn-primary"
            variant="outline-primary"
            @click="
              openModal({
                is: 'ModalHistorial',
                titulo: 'Historial de citas',
                size: 'lg',
                footer: false,
                prop: { inmueble: detail },
              })
            "
          >
            Historial
          </b-button>
          <b-button
            v-if="!inmueble.mls"
            size="md"
            class="m-1 btn_open-modal hover__btn-primary"
            variant="outline-primary"
            @click="
              openModal({
                is: 'ModalPortales',
                titulo: 'Sincronización de portales',
                size: 'md',
                footer: false,
                prop: { inmueble: detail },
              })
            "
          >
            Sincronizar
          </b-button>
          <b-button
            v-if="!inmueble.mls"
            size="md"
            class="m-1 btn_open-modal hover__btn-primary"
            variant="outline-primary"
            @click="
              openModal({
                is: 'modalInforme',
                titulo: 'Configurar informe propietario',
                size: 'md',
                footer: false,
                prop: { inmueble: detail },
              })
            "
          >
            Informe
          </b-button>
        </div>
        <div class="col-auto ml-auto btn-editar" v-if="!inmueble.mls">
          <b-button-group>
            <b-button
              size="md"
              v-if="editar"
              variant="success"
              @click="editar(inmueble)"
            >
              Editar
            </b-button>
            <!-- <b-button size="sm" variant="info" target="_blank" :to="{name: 'inmuebles-details', params: { slug: inmueble.slug }}">
              Ver Ficha
            </b-button> -->
          </b-button-group>
          <b-button
            v-if="(detail.user_id.empresa)"
            variant="outline-primary"
            title="Imagen para redes"
            class="hover__btn-primary"
            @click="openModal({
              is: 'ModalPost',
              titulo: 'Postear Inmueble',
              size: 'md',
              prop: { inmueble: detail },
            })"
          >
            <feather-icon icon="Share2Icon" />
            Imagen para redes
          </b-button>
        </div>
      </div>
      <!-- Contactar agente -->
      <div class="row">
        <b-col cols="12" class="pb-10 d-flex container_contactar" v-if="inmueble.mls">
          <b-button v-b-tooltip.hover title="Editar" pill variant="primary"
            v-if="$can('updated', 'inmuebles')" @click="infoContactDetail(inmueble.created_by)" size="md">
            <feather-icon icon="PhoneOutgoingIcon" class="mr-10" />Contactar Agente
          </b-button>
        </b-col>
      </div>
      <div class="row m-n1">
        <div class="col-12 p-2">
          <div class="row mb-1" v-if="inmueble.inmueble_imagenes.length > 0">
            <div class="col-12">
              <transition name="fade">
                <Slider
                  v-if="visibleSlider"
                  mounted
                  :items="inmueble.inmueble_imagenes"
                ></Slider>
              </transition>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h1 class="tituloInmueble">
                <span class="id-inmueble">ID: {{ inmueble.id }}</span>
                <span v-if="$can('show_created_inmueble', 'inmuebles')" 
                  class="text-info_created text-info_created-color">
                    <span v-if=" inmueble.created_by.userdata">
                        Creado por:
                      {{ inmueble.created_by.userdata.primer_nombre }}
                    </span>
                </span>
                <br/>
                <span v-if="inmueble.properties_request_code_external">
                  <span v-if="inmueble.properties_request_code_external.length > 0" class="cpanel-inmueble ">
                    código CPanel: {{ inmueble.properties_request_code_external[0].code }}
                  </span>
                </span>
                {{ inmueble.titulo_inmueble }}
              </h1>
            </div>
            <div
              class="col-auto"
              v-if="inmueble.url_video || inmueble.video_3d"
            >
              <b-button-group>
                <b-button
                  size="sm"
                  v-if="inmueble.url_video"
                  class="btn-video"
                  variant="danger"
                  :href="inmueble.url_video"
                  target="_blank"
                >
                  <i class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path
                        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                      />
                    </svg>
                  </i>
                  Ver video
                </b-button>
                <b-button
                  size="sm"
                  v-if="inmueble.video_3d"
                  class="btn-video"
                  variant="warning"
                  :href="inmueble.video_3d"
                  target="_blank"
                >
                  <i class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path
                        d="M576 64H64c-35.2 0-64 28.8-64 64v256c0 35.2 28.8 64 64 64l128.3 .0001c25.18 0 48.03-14.77 58.37-37.73l27.76-61.65c7.875-17.5 24-28.63 41.63-28.63s33.75 11.13 41.63 28.63l27.75 61.63c10.35 22.98 33.2 37.75 58.4 37.75L576 448c35.2 0 64-28.8 64-64v-256C640 92.8 611.2 64 576 64zM160 304c-35.38 0-64-28.63-64-64s28.62-63.1 64-63.1s64 28.62 64 63.1S195.4 304 160 304zM480 304c-35.38 0-64-28.63-64-64s28.62-63.1 64-63.1s64 28.62 64 63.1S515.4 304 480 304z"
                      />
                    </svg>
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
                  <div
                    class="valor venta"
                    v-if="dataValidate(inmueble.selling_price)"
                  >
                    <span class="label">Venta:</span>
                    <b class="price">{{ inmueble.selling_price | precio }}</b>
                  </div>
                  <div
                    class="valor alquiler"
                    v-if="dataValidate(inmueble.rental_price)"
                  >
                    <span class="label">Alquiler:</span>
                    <b class="price">{{ inmueble.rental_price | precio }}</b>
                  </div>
                </div>
                <div class="metaInmueble rows">
                  <div class="meta tipo">
                    <span class="label">Tipo de inmueble:</span>
                    <span class="value" v-if="inmueble.tipo_inmueble">{{ inmueble.tipo_inmueble.tipo }}</span>
                    <span class="value" v-else>No definido</span>
                  </div>
                  <div class="meta tipo" v-if="inmueble.precio_administracion>0">
                    <span class="label">Valor Administracion:</span>
                    <span class="value">
                      $ {{currencyFormat( inmueble.precio_administracion)}}
                    </span>
                  </div>
                  <div class="meta tipo">
                    <span class="label">Tipo de negocio:</span>
                    <span class="value"
                      ><b>{{ inmueble.tipo_negocio.tipo }}</b></span
                    >
                  </div>
                  <div class="meta tipo">
                    <span class="label">Tipo de segmento:</span>
                    <span class="value" v-if="inmueble.segmento_mercado"
                      ><b>{{ inmueble.segmento_mercado.name }}</b></span
                    >
                  </div>
                  <div class="meta tipo">
                    <span class="label">Estrato:</span>
                    <span class="value" v-if="inmueble.estrato">{{
                      inmueble.estrato.name
                    }}</span>
                  </div>
                  <div class="meta tipo" v-if="!inmueble.mls">
                    <span class="label">Dirección:</span>
                    <span class="value">{{ inmueble.direccion }}</span>
                  </div>
                  <div v-if="inmueble.ano_construcion" class="meta tipo">
                    <span class="label">Ano de construcción:</span>
                    <span class="value">{{ inmueble.ano_construcion }}</span>
                  </div>
                </div>
                <div v-if="inmueble.barrio_id" class="metaInmueble mt-1">
                  <div class="barrio">
                    Barrio: <span>{{ inmueble.barrio_id.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row detalleInmueble mt-1">
            <div class="col">
              <div class="wrapperDetalleInmueble descripcionGeneral">
                <h2 class="tituloDetalleInmueble">Descripción general</h2>
                <div class="textoDetalleInmueble mb-4">
                  <p class="inmueble_descripcion">{{ inmueble.descripcion }}</p>
                </div>
                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="tableDetalleInmueble">
                      <div class="tableRow">
                        <span class="tableLablel">Habitaciones:</span>
                        <span class="tableValue">{{
                          inmueble.habitaciones
                        }}</span>
                      </div>
                      <div class="tableRow">
                        <span class="tableLablel">Baños:</span>
                        <span class="tableValue">{{ inmueble.banos }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="tableDetalleInmueble">
                      <div class="tableRow" v-if="validatetTypeProperty()">
                        <span class="tableLablel" >Ubicación en piso:</span>
                        <span class="tableValue" v-if=" inmueble.floor_location">{{ inmueble.floor_location }}</span>
                        <span class="tableValue" v-else>{{ inmueble.pisos }}</span>

                      </div>
                      <div class="tableRow"  v-else>
                        <span class="tableLablel" >Cantidad Niveles:</span>
                        <span class="tableValue">{{ inmueble.pisos }}</span>
                      </div>

                      <div
                        class="tableRow"
                        v-if="dataValidate(inmueble.cantidad_parqueadero)"
                      >
                        <span class="tableLablel">Parqueaderos:</span>
                        <span class="tableValue">{{
                          inmueble.cantidad_parqueadero
                        }}</span>
                      </div>
                      <div class="tableRow" v-if="inmueble.parqueadero">
                        <span class="tableLablel">Tipo de parqueadero:</span>
                        <span class="tableValue">{{
                          inmueble.parqueadero.tipo
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wrapperDetalleInmueble areaGeneral mt-5">
                <h2 class="tituloDetalleInmueble">Área del inmueble</h2>
                <div class="row">
                  <div class="col-12 col-md-6 flex-grow-1">
                    <div class="tableDetalleInmueble">
                      <div class="tableRow">
                        <span class="tableLabel">Área Lote:</span>
                        <span class="tableValue"
                          >{{ inmueble.area_lote }}
                          <span class="und">m<sup>2</sup></span></span
                        >
                      </div>
                      <div class="tableRow">
                        <span class="tableLabel">Área Construida:</span>
                        <span class="tableValue"
                          >{{ inmueble.area_contruida }}
                          <span class="und">m<sup>2</sup></span></span
                        >
                      </div>
                      <div class="tableRow">
                        <span class="tableLabel">Área Total:</span>
                        <span class="tableValue"
                          >{{ inmueble.area_total }}
                          <span class="und">m<sup>2</sup></span></span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-12 col-md-6 mt-1 mt-md-0"
                    v-if="
                      dataValidate(inmueble.fondo) ||
                      dataValidate(inmueble.frente)
                    "
                  >
                    <div class="tableDetalleInmueble">
                      <div class="tableRow" v-if="dataValidate(inmueble.fondo)">
                        <span class="tableLabel">Fondo:</span>
                        <span class="tableValue"
                          >{{ inmueble.fondo }} <span class="und">m</span></span
                        >
                      </div>
                      <div
                        class="tableRow"
                        v-if="dataValidate(inmueble.frente)"
                      >
                        <span class="tableLabel">Frente:</span>
                        <span class="tableValue"
                          >{{ inmueble.frente }}
                          <span class="und">m</span></span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wrapperDetalleInmueble attrGeneral mt-5">
                <h2 class="tituloDetalleInmueble">Caracteristicas del inmueble</h2>

                <app-collapse accordion>
                  <template v-for="(feature,index) in arrayFeatures">
                    <template v-if="inmueble[feature.namePath]">
                      <app-collapse-item v-if="inmueble[feature.namePath].length>0" :title="feature.nameMayus" :key="index" 
                      :styleProps="{
                        backgroundColor:'white',
                        border:'2px solid var(--primary)',
                        borderRadius:'10px',
                        padding:'8px'
                        }"
                        sizeTitle="0.9rem"
                        >
                        <div class="row" >
                          <div class="col">
                            <!-- <h2 class="tituloDetalleInmueble">
                              {{ feature.name }}
                            </h2> -->
                            <ul class="attrList">
                              <li
                                class="itemAttrList"
                                v-for="(item, i) in inmueble[feature.namePath]"
                                :key="i"
                                v-if="item"
                              >
                                <span class="textAttrList" v-if="item">
                                  {{ item.texto }}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </app-collapse-item>
                    </template>
                  </template>
                </app-collapse>
                <!-- <div class="row mt-4" v-if="inmueble.caracteristicas_externas">
                  <div class="col">
                    <h2 class="tituloDetalleInmueble">
                      Caracteristicas Externas
                    </h2>
                    <ul class="attrList">
                      <li
                        class="itemAttrList"
                        v-for="(item, i) in inmueble.caracteristicas_externas"
                        :key="i"
                        v-if="item"
                      >
                        <span class="textAttrList" v-if="item">
                          {{ item.texto }}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div> -->
              </div>
              <div
                v-if="inmueble.latitud"
                class="wrapperDetalleInmueble googleMaps mt-5"
              >
                <h2 class="tituloDetalleInmueble">Ubicación</h2>
                <Map class="flex-grow-1" :data="detail" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
    <!-- modal informe -->
    <transition name="fade">
      <v-modal
        v-if="modalState"
        @close="modalState = false"
        :titulo="modal.titulo"
        :size="modal.size"
        :footer="modal.footer"
      >
        <component :is="modal.is" v-bind="modal.prop" ref="modal" />
        <template #footer>
          <b-overlay :show="overlay">
            <b-button variant="success" @click="onSubmit" :disabled="overlay">
              Agendar Cita
            </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
    <!-- Contactar Agente -->

    <!-- Modal Agendar cita -->
    <transition name="fade">
      <v-modal
        v-if="modalState"
        @close="modalState = false"
        :titulo="modal.titulo"
        :size="modal.size"
        :footer="modal.footer"
      >
        <component :is="modal.is" v-bind="modal.prop" ref="modal" />
        <template #footer>
          <b-overlay :show="overlay">
            <b-button variant="success" @click="onSubmit" :disabled="overlay">
              Agendar Cita
            </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
    <transition name="fade">
      <v-modal
        v-if="fichaInmueble"
        @close="fichaInmueble = false"
        titulo="Ficha del Inmueble"
        footer
      >
        <components is="ModalFicha" :inmueble="inmueble" />
        <template #footer>
          <b-button variant="danger" @click="fichaInmueble = false">
            Cerrar
          </b-button>
        </template>
      </v-modal>
    </transition>
  </div>
</template>

<script>
import Map from "@/views/apps/inmuebles/components/Map";
import Slider from "@/views/apps/inmuebles/components/SliderInmuebleDetail";
import VModal from "@/views/componente/vModal";
import ModalFicha from "./ModalFicha.vue";
import ModalAgendar from "./ModalAgendar";
import ModalPortales from "./modalPortales";
import modalInforme from "./modalInforme.vue";
import ModalPost from "./ModalPost.vue";
import ModalHistorial from "./ModalHistorial";
import { dataValidate } from "@/libs/helpers";
import modalContactar from "../components/modalContactar.vue";

import inmueble from "@/store/inmueble";

//DESPLEGABLES
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'


export default {
  name: "InmuebleDetail",
  // props: {
  //   detail: Object,
  // },
  inject: {
    editar: {
      from: "editar",
      default: () => false,
    },
  },
  computed: {
    inmueble() {
      return this.detail;
    },
    detail() {
      return this.$store.state.appInmueble.inmuebleSelect;
    },

    portales() {
      return this.$store.state.appPortales.portales;
    },
    events() {
      return this.$store.state.appCalendar.calendars;
    },
  },
  components: {
    Map,
    Slider,
    ModalAgendar,
    ModalFicha,
    ModalPortales,
    modalInforme,
    ModalHistorial,
    ModalPost,
    VModal,
    "modal-contactar": modalContactar,
    AppCollapse,
    AppCollapseItem
  },
  watch: {
    inmueble() {
      this.visibleSlider = false;
    },
  },
  mounted() {
    this.visibleSlider = true;
    Object.assign(this.agendarCita,{ inmueble_id: this.detail})
  },
  updated() {
    this.visibleSlider = true;
  },
  data() {
    return {
      dataValidate,
      api: "api/clientes/interested",
      stateMenuMobile:false,
      modalState: false,
      visibleSlider: false,
      modal: {},
      sideBarState:false,
      overlay: false,
      agendarCita: {
        t_cita: null,
        start: null,
        end: null,
        assignee: null,
        cliente_id: null,
        direccion: null,
        nota: null,
      },
      fichaInmueble: false,
      propModalFicha: null,
      arrayFeatures:[
        {
          id:1,
          namePath:'caracteristicas_internas',
          name:'Características internas',
          nameMayus:'INTERNAS'
        },
        {
          id:2,
          namePath:'caracteristicas_externas',
          name:'Características externas',
          nameMayus:'EXTERNAS'
        },
        {
          id:3,
          namePath:'caracteristicas_estado_construcion',
          name: 'Características estado construccion',
          nameMayus:'ESTADO CONSTRUCCIÓN'
        },
        {
          id:4,
          namePath:'caracteristicas_tipo_fachada',
          name:'Características tipo fachada',
          nameMayus:'TIPO FACHADA'
        },
        {
          id:5,
          namePath:'caracteristicas_clasificacion',
          name:'Características clasificación',
          nameMayus:'CLASIFICACIÓN PROPIEDAD'
        },
        {
          id:6,
          namePath:'caracteristicas_orientacion',
          name:'Características orientación',
          nameMayus:'ORIENTACIÓN ZONA'
        },
        {
          id:7,
          namePath:'caracteristicas_ubicacion',
          name:'Características ubicación',
          nameMayus:'UBICACIÓN SITIOS CERCANOS'
        },
        {
          id:8,
          namePath:'caracteristicas_tarifas_adicionales_servicios_publico',
          name:'Características tarifas adicionales',
          nameMayus:'TARIFAS ADICIONALES'
        }

      ]
    };
  },
  methods: {

    // geocodeLatLng(geocoder) {
    //   const latlng = {
    //     lat:  40.714224,
    //     lng: -73.961452
    //   };

    //   geocoder
    //     .geocode({ location: latlng })
    //     .then((response) => {
    //       if (response.results[0]) {
    //         console.log(response.results[0])
    //       } else {
    //         window.alert("No results found");
    //       }
    //     })
    //     .catch((e) => window.alert("Geocoder failed due to: " + e));
    // },
    showOptionsMobile(){
      this.stateMenuMobile=!this.stateMenuMobile
    },
    validatetTypeProperty(){
      let property = ['Apartamento','Apartaestudios','Oficina'];
      if(this.detail.tipo_inmueble){
        const res = property.some((element) => element === this.detail.tipo_inmueble.tipo)
        return res;
      }
      return false
    },
    infoContactDetail(value, button){
      this.$emit('infoContactDetail', value)
    },
    currencyFormat(value) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(value);
    },
    openModal(e) {
      this.modal = e;
      this.modalState = true;
      this.stateMenuMobile=false
    },
    closeModal(form) {
      for (let prop in form) if (prop != "inmueble_id") form[prop] = null;
      this.modalState = false;
    },
    modalFicha(inmueble) {
      this.propModalFicha = inmueble;
      this.fichaInmueble = true;
      this.stateMenuMobile=false
    },
    async onSubmit() {
      await this.$refs["modal"].onSubmit().then(async (data) => {
        await this.$http({
          url: "api/auth/api-agenda",
          method: "post",
          data,
        })
          .then((res) => {
            let agendas = res.data.data;

            if (this.events.full.length > 0)
              this.$store.commit("appCalendar/ADD_CALENDARS", agendas);

            this.$swal({
              title: "!Excelente!",
              text: "!Su cita se registro correctamente!",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
            this.overlay = false;
            this.closeModal(this.agendarCita);
          })
          .catch(() => {
            this.$swal({
              title: "Algo salio mal!",
              text: error,
              icon: "error",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>

.nav_mobile{

  position: relative;
  display: none;
  justify-content: right;
  width: 100%;
  background-color: white;
}
.icon__toogle{
  display: flex;
  align-items: center;
  gap:4px;
  color: #7367f0;
  font-size: 1.1rem;
  border: 2px solid var(--primary);
  border-radius: 10px;

}
.icon__toogle-selected{
  border: 2px solid var(--primary);
  border-radius: 10px 10px 0 0;
}
.toogle__title{
  margin: 0;
  font-weight: bold;
}
.icon__svg{
    fill: var(--primary);
    width: 40px;
    height: 30px;
}
.icon__svg-close{
    width: 40px;
    height: 30px;
    fill: #ea5455;

}
.menu__colapse{
  position: absolute;
  left: 14;
  top: 45px;
  background-color: white;
  z-index: 1;
  border: 2px solid var(--primary);
  border-radius: 10px 0 5px 5px;
  box-shadow: 0 0 40px 5px gray;
  padding: 0 16px;
  width: 60%;
}
.detalleInmueble {
  line-height: 1.8;
  z-index: 999;
}

.btn-informe{
  display: none;
}

.text-info_created{
  font-size: 10px;
  color: #333;
  padding-top: 4px;
}
.text-info_created-color{
  color: var(--primary);
  font-weight: bold;
}

.tituloDetalleInmueble {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 15px;
  border-bottom: 1px solid #ebe9f1;
  padding-bottom: 6px;
}
.tableDetalleInmueble {
  width: 100%;
}
.tableDetalleInmueble.column-count {
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
  margin: -8px;
}

ul.attrList li.itemAttrList {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  line-height: 1.6;
  border: 1px solid #7367f0;
  font-weight: 500;
  border-radius: 0.25rem;
  margin: 8px;
}

.iconAttrList {
  width: 1.25em;
  margin-right: 10px;
  font-size: 20px;
  color: #7367f0;
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

.inmueble_descripcion,.tituloInmueble {
  text-align: justify;
}
.container_contactar{
    display: flex;
    justify-content: right;
}
@media (max-width: 991px) {
  .tableDetalleInmueble.column-count {
    column-count: 1;
  }
}
@media (max-width: 767px) {
  ul.attrList li.itemAttrList {
    padding: 8px 16px;
    line-height: 1.4;
    font-size: 14px;
  }


  .container_contactar{
    justify-content: center ;
  }
}
.titleMap {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.infoMap {
  padding: 0;
  list-style: none;
  margin: 0;
  font-size: 12px;
}

.infoMap b {
  font-weight: 500;
}
.metaDataInmueble .valor {
  font-size: 28px;
  line-height: 1;
}

.metaDataInmueble .preciosInmueble .label {
  font-size: 16px;
  display: block;
  margin-bottom: 6px;
}

.metaDataInmueble .valor + .valor {
  margin-top: 15px;
}
.metaDataInmueble .valor b {
  color: #7367f0;
  font-weight: 700;
}

.metaDataInmueble .metaInmueble {
  font-size: 14px;
  margin-top: 20px;
}

.metaDataInmueble .metaInmueble .meta {
  display: flex;
}
.metaInmueble.rows .meta.tipo {
  padding: 5px 10px;
  margin: 0;
}

.metaInmueble.rows .meta.tipo:nth-child(odd) {
  background: #f5f5f5;
}
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
  margin: 0;
  padding: 10px 35px;
  background: #e4e4e4;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.metaDataInmueble .barrio span {
  font-weight: 700;
  color: #7367f0;
}
.sideBarInmueble .metaDataInmueble .barrio {
  margin: 20px -35px -20px;
}
.tituloInmueble {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  line-height: 1.4;
  color: #7367f0;
}
.price{
    font-size: 1.2rem;
  }
.btn-video {
  display: flex;
  align-items: center;
}
.btn-video .icon {
  width: 1.25em;
  font-size: 1.4em;
  color: inherit;
  margin: -1em 0;
  margin-right: 0.5em;
}
.btn-video .icon svg {
  display: block;
  fill: currentColor;
  width: auto;
  height: 1em;
}
.portales-inmueble {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: -6px -6px 0;
  position: relative;
  z-index: 3;
}

.item-portales-inmueble {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 6px;
}

.item-portales-inmueble img {
  display: block;
  height: 65px;
  outline: 1px solid #ebe9f1;
  border-radius: 0.358rem;
}

.item-portales-inmueble .badge {
  position: absolute;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  top: 5px;
  left: 5px;
}

.item-portales-inmueble .btn-group {
  margin-top: 6px;
}

.item-portales-inmueble .btn-group svg {
  fill: currentColor;
  display: block;
  width: 1.25em;
  height: 1em;
  font-size: 14px;
  margin: -0.2em;
}

.item-portales-inmueble .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: #ebe9f1 !important;
}
.id-inmueble {
  display: block;
  line-height: 1;
  margin-bottom: 5px;
  font-size: 0.7em;
  filter: hue-rotate(25deg);
}

.cpanel-inmueble {
  display: block;
  line-height: 1;
  font-size: 0.7em;
  filter: hue-rotate(50deg);
}
.hover__btn-primary{
  transition: 0.3s;

}
.hover__btn-primary:hover{
  background-color: var(--primary) !important;
  color: white !important;
}

@media(max-width:500px){
  .nav_mobile{
    position: relative;
    display: flex;
    justify-content: right;
    width: 100%;
    background-color: white;
  }
  .border-moadal_detalle.container__disable{
    display: none !important;
  }
  .btn_open-modal{
    width: 150px;
    font-size: 0.9rem;
    margin: 4px !important;
  }
  

  .tituloInmueble,.id-inmueble,.cpanel-inmueble,.tituloDetalleInmueble{
    font-size: 1rem !important;
  }

  .price{
    font-size: 1.2rem;
  }
  .border-moadal_detalle{
    border-bottom: 4px solid #7367f0;
    margin-bottom: 2px;
  }
  .btn-editar{
    margin-top: 10px;
  }
}
</style>
