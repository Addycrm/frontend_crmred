<template>
    <div>
      <div id="TableInmuebles">
        <div class="mb-2" cols-lg="5" cols-sm="auto">
          <!-- FILTROS MLS -->
          <app-collapse accordion>
            <!-- FILTRO GENERAL -->
            <app-collapse-item title="FILTRO GENERAL" :isVisible="true" >
              <div class="d-flex flex-wrap container__filter">
                <span class="span-title">FILTRO GENERAL</span>
                <!-- NOMBRE -->
                <b-col cols="12" md="3">
                  <b-form-group label="Nombre inmueble">
                    <b-form-input :value="query.titulo_inmueble" @change="setQuery('titulo_inmueble', $event)"
                      placeholder="Buscar..." name="search" type="search" trim />
                  </b-form-group>
                </b-col>

                <!-- AGENTE -->
                <b-col cols="12" md="3">
                  <b-form-group label="Agente">
                    <v-select v-model="query.created_by" :options="storeConfig.agentes" :reduce="(type) => type.id"
                      label="primer_nombre" />
                  </b-form-group>
                </b-col>
                <!-- ESTADO INMUEBLE -->
                <b-col cols="12" md="3">
                  <b-form-group label="Estado del Inmueble">
                    <v-select v-model="query.state_fisico" :options="storeConfig.state_fisico" :reduce="(type) => type.id"
                      label="name" />
                  </b-form-group>
                </b-col>
                <!-- TIPO INMUEBLE -->
                <b-col cols="12" md="3">
                  <b-form-group label="Tipo de Inmueble">
                    <v-select v-model="query.tipo_inmueble" :options="storeConfig.property_type" :reduce="(type) => type.id"
                      label="tipo" />
                  </b-form-group>
                </b-col>
                <!-- TIPO NEGOCIO -->
                <b-col cols="12" md="4" lg="3">
                  <!-- <b-form-group label="Tipo de Negocio">
                    <v-select v-model="query.tipo_negocio" :options="storeConfig.business_type" :reduce="(type) => type.id"
                      label="tipo" />
                  </b-form-group> -->
                  <b-form-group label="Tipo de negocio" class="mb-1">
                    <div class="demo-inline-spacing" d-flex flex-wrap>
                      <b-form-checkbox v-model="query.tipo_negocio" style="margin-top: 6px;" value="1">
                        Venta
                      </b-form-checkbox>
                      <b-form-checkbox v-model="query.tipo_negocio" style="margin-top: 6px;" value="2">
                        Alquiler
                      </b-form-checkbox>
                      <b-form-checkbox v-model="query.tipo_negocio" style="margin-top: 6px;" value="3" >
                        Venta - Alquiler
                      </b-form-checkbox>
                    </div>
                  </b-form-group>
                </b-col>
                <!-- RANGO DE PRECIOS -->
                <b-col cols="12" md="4" lg="3" class="d-flex flex-wrap container_range-price" >
                  <b-form-group label="Rango de precios" >
                    <b-input-group prepend="$" class="">
                      <cleave id="number"
                        v-model="min_price"
                        class="form-control "
                        :options="{
                        numeral: true,
                        numericOnly:true,
                        numeralThousandsGroupStyle: 'thousand',
                        }"
                        placeholder="valor minimo"
                        />
                    </b-input-group>
                    <b-input-group prepend="$"  class="" >
                      <cleave id="number"
                        v-model="max_price"
                        class="form-control "
                        placeholder="valor máximo"
                        :options="{
                        numeral: true,
                        numericOnly:true,
                        numeralThousandsGroupStyle: 'thousand',
                        onValueChanged:(e)=>searchRange(e)
                        }"
                        />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </div>
            </app-collapse-item>
            <!-- FILTROS POR UBICACION -->
            <app-collapse-item title="FILTRO UBICACION" >
              <div class="d-flex flex-wrap container__filter">
                <span class="span-title">FILTRO UBICACION</span>
                <!-- FILTRO PAIS -->
                <b-col cols="12" md="4" sm="12" v-for="(value, prop) in ubicaciones" :key="prop">
                  <b-form-group :label="value.props.label">
                    <v-select
                    v-model="ubicaciones[prop].value" label="name"
                    @input="
                      () => {
                        value.props.api ? resetUbicacion(prop) : null;
                      }
                    "
                    :reduce="(type) => type.id"
                    :options="
                          prop == 'pais_id'
                            ? storeConfig.country
                            : ubicaciones[prop].options
                        "
                    :disabled="
                          prop == 'pais_id'
                            ? storeConfig.country.length == 0
                            : ubicaciones[prop].options.length == 0
                        "
                    />
                  </b-form-group>
                </b-col>
              </div>
            </app-collapse-item>
            <!-- FILTRO POR CODIGO -->
            <app-collapse-item title="FILTRO CÓDIGO">
                <div class="d-flex flex-wrap container__filter">
                  <span class="span-title">FILTRO CÓDIGO</span>
                  <b-col cols="12" md="3">
                    <b-form-group label="Código externo">
                      <b-form-input :value="query.codigo_externo" @change="setQuery('codigo_externo', $event)"
                        placeholder="Código..." name="code" type="text" trim />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="3">
                    <b-form-group label="Código CRMRED">
                      <b-form-input :value="query.id" @change="setQuery('id', $event)" placeholder="Código..." name="code"
                        type="text" trim />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="3">
                    <b-form-group label="Código Portal">
                      <b-form-input :value="query.code_portal" @change="setQuery('code_portal', $event)" placeholder="Código..." name="code"
                        type="text" trim />
                    </b-form-group>
                  </b-col>
                </div>
            </app-collapse-item>
          </app-collapse>
        </div>
        <b-row class="py-1 m-n10" align-v="end">
          <b-col cols="auto" class="p-10">
            <b-button @click="clearFilter"> Limpiar Filtro </b-button>
          </b-col>
          <!-- CAMPO ESTADO -->
          <b-col cols="auto" class="p-10" :style="{ width: '10em' }">
            <b-form-group label="Estado" label-size="sm" class="mb-0">
              <v-select v-model="query.state_inmueble" :options="storeConfig.state_property" :reduce="(type) => type.id"
                label="name" />
            </b-form-group>
          </b-col>
          <b-col cols="auto" class="p-10" :style="{ width: '8em' }">
            <b-form-group label="Por página" label-size="sm" class="mb-0">
              <v-select v-model="query.number_page" :options="pageOptions" :reduce="(type) => type.value"
                :clearable="false" label="text" />
            </b-form-group>
          </b-col>
          <!-- ORDEN ASCENDENTE Y DESCENDIENTE -->
          <div v-show="showTipoNegocio">
            <div class="p-10 sm-3 col-md-auto" :style="{ width: '12em' }">
              <b-form-group label="Orden por precio" label-size="sm" class="mb-0">
                <v-select v-model="query.filterPrice" :reduce="(type) => type.value"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="optionsType" label="text" />
              </b-form-group>
            </div>
          </div>
          <div v-if="!elegir" class="d-flex flex-column col-sm-12 col-md-auto align-items-center px-0">
            <div class="col-auto p-0">
              <legend class="bv-no-focus-ring col-form-label pt-0  col-form-label-sm" style="margin-left:7px;
              margin-bottom: 2px;
            ">Vistas</legend>
              <div class="d-flex flex-wrap">
                <!-- BOTON VISTA DETAIL LIST -->
                <b-col cols="auto" class="px-10 pb-10 pt-0 d-flex showDisable" v-b-tooltip.hover title="Vista detalle">
                  <b-button @click="viewList('detail-list')" :variant="listStyle == 'detail-list' ? 'primary' : 'outline-primary'"
                    :class="listStyle == 'detail-list' ? 'pointer-events-none' : null"
                    class="btn-icon d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{
                      width: '1.25em',
                      height: '1em',
                      margin: '-0.5em',
                      fontSize: '18px',
                    }" fill="currentColor">
                      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path
                        d="M88 48C101.3 48 112 58.75 112 72V120C112 133.3 101.3 144 88 144H40C26.75 144 16 133.3 16 120V72C16 58.75 26.75 48 40 48H88zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H192C174.3 128 160 113.7 160 96C160 78.33 174.3 64 192 64H480zM480 224C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H192C174.3 288 160 273.7 160 256C160 238.3 174.3 224 192 224H480zM480 384C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H192C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384H480zM16 232C16 218.7 26.75 208 40 208H88C101.3 208 112 218.7 112 232V280C112 293.3 101.3 304 88 304H40C26.75 304 16 293.3 16 280V232zM88 368C101.3 368 112 378.7 112 392V440C112 453.3 101.3 464 88 464H40C26.75 464 16 453.3 16 440V392C16 378.7 26.75 368 40 368H88z" />
                    </svg>
                  </b-button>
                </b-col>
                <!-- BOTON VISTA TABLA -->
                <b-col cols="auto" class="px-10 pb-10 pt-0 d-flex showDisable" v-b-tooltip.hover title="Vista en tabla">
                  <b-button @click="viewList('table')" :variant="listStyle == 'table' ? 'primary' : 'outline-primary'"
                    :class="listStyle == 'table' ? 'pointer-events-none' : null"
                    class="btn-icon d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{
                      width: '1.25em',
                      height: '1em',
                      margin: '-0.5em',
                      fontSize: '18px',
                      }"  fill="currentColor">
                      <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64V416H224V160H64zm384 0H288V416H448V160z"/>
                    </svg>
                  </b-button>
                </b-col>
                <!-- BOTON VISTA GRID -->
                <b-col cols="auto" class="px-10 pb-10 pt-0 d-flex" v-b-tooltip.hover title="Vista en tarjeta">
                  <b-button @click="viewList('grid')" :variant="listStyle == 'grid' ? 'primary' : 'outline-primary'"
                    :class="listStyle == 'grid' ? 'pointer-events-none' : null"
                    class="btn-icon d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{
                      width: '1.25em',
                      height: '1em',
                      margin: '-0.5em',
                      fontSize: '18px',
                    }" fill="currentColor">
                      <path
                        d="M384 96V224H256V96H384zm0 192V416H256V288H384zM192 224H64V96H192V224zM64 288H192V416H64V288zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                    </svg>
                  </b-button>
                </b-col>
                <!-- BOTON VISTA MAP LIST -->
                <b-col cols="auto" class="px-10 pb-10 pt-0 d-flex" v-b-tooltip.hover title="Vista mapa">
                  <b-button @click="viewList('map-list')" :variant="listStyle == 'map-list' ? 'primary' : 'outline-primary'"
                    :class="listStyle == 'map-list' ? 'pointer-events-none' : null"
                    class="btn-icon d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" :style="{
                      width: '1.25em',
                      height: '1em',
                      margin: '-0.5em',
                      fontSize: '18px',
                    }" fill="currentColor">
                      <path
                        d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" />
                    </svg>
                  </b-button>
                </b-col>
              </div>
            </div>
          </div>
          <b-col class="p-0"></b-col>

          <template v-if="!elegir" class="d-flex flex-wrap justify-content-center">
              <div class="p-10 d-flex col-sm-6 justify-content-center col-md-auto" v-if="$can('create', 'inmuebles')">
                <b-button variant="primary" class="d-inline-flex align-items-center" @click="addInmueble">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{
                    width: '1.25em',
                    height: '1em',
                    margin: '-0.5em',
                    marginRight: '0.8rem',
                    fontSize: '1em',
                  }" fill="currentColor">
                    <path
                      d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                  </svg>
                  <span class="align-middle">Agregar Inmuebles</span>
                </b-button>
              </div>
            <div class="p-10 d-flex col-sm-5 justify-content-center col-md-auto" v-if="$can('create', 'inmuebles')">
              <b-button variant="success" class="d-inline-flex align-items-center" @click="exportInmueble()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{
                  width: '1.25em',
                  height: '1em',
                  margin: '-0.5em',
                  marginRight: '0.8rem',
                  fontSize: '1em',
                }" fill="currentColor">
                  <path
                    d="M384 128h-128V0L384 128zM256 160H384v304c0 26.51-21.49 48-48 48h-288C21.49 512 0 490.5 0 464v-416C0 21.49 21.49 0 48 0H224l.0039 128C224 145.7 238.3 160 256 160zM255 295L216 334.1V232c0-13.25-10.75-24-24-24S168 218.8 168 232v102.1L128.1 295C124.3 290.3 118.2 288 112 288S99.72 290.3 95.03 295c-9.375 9.375-9.375 24.56 0 33.94l80 80c9.375 9.375 24.56 9.375 33.94 0l80-80c9.375-9.375 9.375-24.56 0-33.94S264.4 285.7 255 295z" />
                </svg>
                <span class="align-middle">Exportar Excel</span>
              </b-button>
            </div>
            <div class="p-10 d-flex col-sm-5 justify-content-center col-md-auto" v-if="$can('create', 'inmuebles')">
              <b-button variant="success" class="d-inline-flex align-items-center" @click="modalFile = true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{
                  width: '1.25em',
                  height: '1em',
                  margin: '-0.5em',
                  marginRight: '0.8rem',
                  fontSize: '15px',
                }" fill="currentColor">
                  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z" />
                </svg>
                <span class="align-middle">Importar</span>
              </b-button>
              <v-modal v-if="modalFile" @close="modalFile = false" size="sm" titulo="Importar Excel" footer>
                <b-form-file placeholder="Elija un archivo o déjelo aquí...." drop-placeholder="Deja el archivo aquí...."
                  browse-text="Buscar" @change="onFileChange" :disabled="overlay" />
                <img :src="imgExcel" class="img-fluid d-block mx-auto mt-1" alt="" />

                <template #footer>
                  <b-overlay :show="overlay" class="d-flex flex-wrap justify-content-center" style="gap: 6px">
                    <b-button variant="success" @click="importExcel" :disabled="!import_file">
                      Subir archivo
                    </b-button>
                    <b-button variant="warning"
                      href="https://res.cloudinary.com/reality-inmo/raw/upload/v1671461011/excel/clientes_ni8tix.xlsx"
                      download="plantilla-clientes.xlsx">
                      Descargar plantilla
                    </b-button>
                  </b-overlay>
                </template>
              </v-modal>
            </div>
          </template>
          <div class="col-sm-12 text-center">
            Inmuebles: <b class="text-primary">{{ tablaInmuebles.to }}</b> de
            <b>{{ tablaInmuebles.total }}</b>
          </div>
        </b-row>
        <template v-if="tablaInmuebles.data">
          <b-row class="mt-1">
            <!-- VISTA GRID -->
            <div v-if="listStyle == 'grid'" style="width: 100%;">
              <div class="p-1" style="width: 100%;">
                <vistaGrid  :inmueblesMap = "inmueblesMap"  @inmuebleDetailGrid="inmuebleDetail"></vistaGrid>
                <!-- PAGINADO -->
                <div class="d-flex flex-wrap align-items-center mt-1">
                  <div class="d-flex">
                    <b-pagination v-if="tablaInmuebles.per_page < tablaInmuebles.total" @change="getInmuebles"
                    :value="currentPage" :per-page="tablaInmuebles.per_page" :total-rows="tablaInmuebles.total"
                    first-number last-number prev-class="prev-arrow" next-class="next-arrow">
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>
                  </div>
                </div>
              </div>
            </div>
            <!-- VISTA LISTA DETALLE -->
            <b-col cols="12" v-else-if="listStyle == 'detail-list'">
              <b-overlay :show="overlay">
                <VueGoodTable styleClass="vgt-table striped table-label-hidden" v-bind="goodTable.props"
                  v-on="goodTable.events">
                  <template slot="emptystate">
                    <div class="text-center p-1">No hay Inmuebles registrados</div>
                  </template>
                  <template slot="table-row" slot-scope="props">
                    <div v-if="props.column.field === 'inmueble'">
                      <vistaDetail
                        :props="props"
                        @inmuebleDetail="inmuebleDetail"
                        @stateProperty="stateProperty"
                        ></vistaDetail>
                      <div >
                        <hr class="my-10" />
                      </div>
                    </div>
                  </template>
                  <template slot="pagination-bottom" slot-scope="props">
                    <div class="d-flex flex-wrap align-items-center mt-1">
                      <div class="d-flex">
                        <b-pagination v-if="tablaInmuebles.per_page < tablaInmuebles.total" @change="getInmuebles"
                          :value="currentPage" :per-page="tablaInmuebles.per_page" :total-rows="tablaInmuebles.total"
                          first-number last-number prev-class="prev-arrow" next-class="next-arrow">
                          <template #prev-text>
                            <feather-icon icon="ChevronLeftIcon" size="18" />
                          </template>
                          <template #next-text>
                            <feather-icon icon="ChevronRightIcon" size="18" />
                          </template>
                        </b-pagination>
                      </div>
                    </div>
                  </template>
                </VueGoodTable>
              </b-overlay>
            </b-col>
            <!-- VISTA TABLA -->
            <div  v-else-if="listStyle=='table'" style="width: 100%;">
              <vistaTable :inmueblesMap="inmueblesMap"  @inmuebleDetailTable="inmuebleDetail" ></vistaTable>
              <div class="d-flex flex-wrap align-items-center mt-1">
                  <div class="d-flex">
                    <b-pagination v-if="tablaInmuebles.per_page < tablaInmuebles.total" @change="getInmuebles" :value="currentPage" :per-page="tablaInmuebles.per_page" :total-rows="tablaInmuebles.total" first-number last-number prev-class="prev-arrow" next-class="next-arrow">
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>
                  </div>
                </div>
            </div>
            <!-- VISTA MAPA -->
            <b-col v-else-if="listStyle == 'map-list'">
              <GmapMap :center="{ lat: 1.24, lng: 104.32 }" :zoom="14" map-type-id="terrain"
                style="width: 100%; height: 800px">
                <GmapMarker v-for="(inmueble, index) in inmueblesMap" :key="index" ref="myMarker" :clickable="true"
                  :position="
                    google &&
                    new google.maps.LatLng(inmueble.latitud, inmueble.longitud)
                  " @click="inmueble.mapOpen = !inmueble.mapOpen">
                  <gmap-info-window :options="
                    infoPopUp({
                      id: inmueble.id,
                      name: inmueble.titulo_inmueble,
                      price: inmueble.rental_price || inmueble.selling_price,
                      image: inmueble.inmueble_imagenes[0].url,
                    })
                  " :opened="inmueble.mapOpen" @closeclick="inmueble.mapOpen = false" />
                </GmapMarker>
              </GmapMap>
            </b-col>
          </b-row>
        </template>
        <subportales-component ref="subportalesComponent" />
      </div>
    </div>
  </template>
  <script>
  import DetailsInmuebles from "@/views/apps/inmuebles/components/detailsInmuebles.vue";
import FormInmueble from "@/views/apps/inmuebles/FormInmueble.vue";
import VSelect from "vue-select";
import VModal from "@/views/componente/vModal";
import { VueGoodTable } from "vue-good-table";
import { imgValidateURL } from "@/libs/helpers";
import { VBModal } from "bootstrap-vue";
import ModalFicha from "@/views/apps/inmuebles/components/ModalFicha.vue";
import statePortales from "@/views/apps/inmuebles/components/statePortales.vue";

import mixinPortales from "@/views/apps/inmuebles/mixinPortales";
import mixinApis from "@/views/componente/mixinApis";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import mixinConfig from "@/views/componente/mixinConfig";

import subportalesComponent from "@/views/componente/subportal-modal.vue";

import { gmapApi } from "vue2-google-maps";
import moment from "moment";
import "moment/locale/es";

import Cleave from "vue-cleave-component";
//modales
import ModalMasivePortal from "@/views/apps/inmuebles/components/ModalMasivePortal.vue";
import ModalDesMasivePortal from  "@/views/apps/inmuebles/components/modalDesMasivePortal.vue";
import modalInforme from "@/views/apps/inmuebles/components/modalInforme.vue";

// // vista skeleton
// import skeletonLoading from '../components/skeletonLoadingMLS.vue'


// vistas
import vistaGrid from '@/views/apps/inmuebles/components/vistas/vistaGrid.vue'
import vistaTable from '@/views/apps/inmuebles/components/vistas/vistaTable.vue'
import vistaDetail from '@/views/apps/inmuebles/components/vistas/vistaDetail.vue'

//desplegables
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import { HELPERS } from "@/libs/helpers";
  export default {
    name: "TableInmueble",
    mixins: [mixinApis, mixinPortales, mixinConfig],
    components: {
      AppCollapse,
      AppCollapseItem,
      DetailsInmuebles,
      FormInmueble,
      VSelect,
      VueGoodTable,
      VModal,
      ModalFicha,
      statePortales,
      Cleave,
      "subportales-component": subportalesComponent,
      vistaGrid,
      vistaTable,
      vistaDetail,
      ModalMasivePortal,
      ModalDesMasivePortal,
      modalInforme
    },
    provide() {
      let $this = this;
      return {
        editar(slug) {
          $this.editInmueble(slug);
        },
      };
    },

    directives: {
      "b-modal": VBModal,
    },
    props: {
      elegir: {
        type: Boolean,
      },
      rango: {
        type: Boolean,
      },
      viewCalendarInmueble:{
        type:String
      },
    },
    filters: {
      fechaFormating: function (value) {
        if (value) {
          let date = new Date(value);
          return date.toLocaleString();
        }
      },
    },
    data() {
      // this.api.push({
      //   api: "appInmueble/getInmuebles",
      //   data: { number_page: 6 },
      // });
      return {
        stateModalInforme:false,
        inmuebleSelectPortal:null,
        stateModalPubMasive:false,
        stateModalDeMasive:false,
        startApiInmuebles:true,
        loading: true,
        max_price: null,
        min_price: null,
        currentHash: location.hash,
        listStyle: "detail-list",
        imgValidateURL,
        currentPage: 1,
        import_file: null,
        modalFile: false,
        query: {
          titulo_inmueble: null,
          created_by: null,
          state_fisico: null,
          state_inmueble: null,
          tipo_inmueble: null,
          tipo_negocio: null,
          pais_id: null,
          estado_id: null,
          ciudad_id: null,
          zona_id: null,
          barrio_id: null,
          number_page: 6,
          codigo_externo: null,
          id: null,
          code_portal:null,
          min_price: null,
          max_price: null,
          filterPrice:null,
        },
        portal: {
          state: false,
          current: {},
          inmueble: {},
        },

        inmueble: [{}],

        overlay: false,
        modalState: false,
        sideBarState: false,
        fichaInmueble: false,

        modal: {},

        filterState: false,
        rowSelected: {},

        ubicaciones: {
          pais_id: {
            value: null,
            props: {
              api: "appLocalidades/getStates",
              name: "Departamentos",
              label: "Países",
            },
          },
          estado_id: {
            options: [],
            value: null,
            props: {
              api: "appLocalidades/getCiudades",
              name: "Ciudades",
              label: "Departamento",
            },
          },
          ciudad_id: {
            options: [],
            value: null,
            props: {
              api: "appLocalidades/getZona",
              name: "Zonas",
              label: "Ciudad",
            },
          },
          zona_id: {
            options: [],
            value: null,
            props: {
              api: "appLocalidades/getBarrio",
              name: "Barrios",
              label: "Zonas",
            },
          },
          barrio_id: {
            options: [],
            value: null,
            props: {
              api: null,
              name: "Ciudades",
              label: "Barrios",
            },
          },
        },

        propModalFicha: null,
        form: {
          cardNumber: null,
          date: null,
          phone: null,
        },
        optionsType: [
          {  text: 'Ascendente', value:'ASC' },
          { text: 'Descendente', value:'DESC' },
        ],
      }
    },
    computed: {
      google: gmapApi,
      showTipoNegocio(){
        if(this.query.tipo_negocio ===1|| this.query.tipo_negocio ===2){
          return true
        }else{
          return false
        }
      },
      inmueblesMap() {
        this.tablaInmuebles.data.map((inmueble) => {
          this.$set(inmueble, "mapOpen", true);
        });
        return this.tablaInmuebles.data;
      },
      userData() {
        return JSON.parse(localStorage.getItem("userData"));
      },
      storeConfig() {
        return this.$store.state.appConfiguracion.options;
      },
      tablaInmuebles() {
        return this.$store.state.appInmueble.tabla;
      },
      pageOptions() {
        return [
          { value: 6, text: "6" },
          { value: 12, text: "12" },
          { value: 18, text: "18" },
        ];
      },
      goodTable() {
        let table = {
          props: {
            columns: [
              {
                tdClass: "align-middle label-hidden",
                thClass: "text-nowrap mobileState",
                field: "inmueble",
                label: "Inmueble",
              },
            ],
            rows: this.tablaInmuebles.data,
            paginationOptions: {
              enabled: true,
              perPage: Infinity,
            },
            rowStyleClass: this.rowStyleClass,
          },
          events: {},
        };

        if (this.elegir) {
          if (this.rango) {
            Object.assign(table.events, {
              "on-selected-rows-change": (a) => {
                this.inmueble = a.selectedRows;
                this.$emit("sendActive", a.selectedRows ? false : true);
              },
            });
            Object.assign(table.props, {
              selectOptions: {
                enabled: true,
                selectionText: "Filas seleccionadas",
                clearSelectionText: "Limpiar",
              },
            });
          } else {
            Object.assign(table.events, {
              "on-row-click": this.inmuebleDetail,
            });
          }
        }
        return table;
      },
    },
    created(){
      this.watchQuerys();
    },
    mounted() {
        this. viewList("detail-list")
        this.watchUbicaciones();
        this.ubicaciones.pais_id.value=48

      if(this.viewCalendarInmueble!=null){
        this.listStyle=this.viewCalendarInmueble
      }

    },
    destroyed() {
      this.$emit("sendActive", true);
    },
    methods: {
      modalInforme(){
        this.stateModalInforme=true
      },
      publicationMasive(payload){
        this.stateModalPubMasive=true
        this.inmuebleSelectPortal=payload

      },
      DepublicationMasive(payload){
        this.stateModalDeMasive=true
        this.inmuebleSelectPortal=payload
      },
      onRowSelected(items){
        this.inmuebleDetail(items[0])
      },
      loadingCompleted() {
        return this.loading = false;
      },
      searchRange() {
        if( Number(this.max_price)>0 ){
        if(this.max_price>= this.min_price){
          this.query.max_price = Number(this.max_price);
          if(this.min_price<1){
            this.query.min_price = 1;
          }else{
            this.query.min_price = Number(this.min_price);
          }
        }
        }
      },
      infoPopUp: function ({ id, image, name, price }) {
        return {
          content: `
          <a href="#details-${id}" style="display: flex; flex-direction: column; max-width: 130px;">
            <picture>
              <img style="width: 100%; height: 70px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" src="${image}" />
              </picture>
              <b style="display: inline-block; margin-bottom: 3px">${id}</b>
              <h5><b>${this.cutText(name)}</b></h5>
              <b style="word-wrap:break-word;">$${this.currencyFormat(price) || precio
            }</b>
            </a>
          `,
          pixelOffset: {
            width: 0,
            height: -20,
          },
        };
      },
      dateCounter(date) {
        const newDate = new Date(date).getTime();
        const time = moment(newDate);
        return moment(time, "YYYYMMDD").fromNow();
      },
      currencyFormat(value) {
        return new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        }).format(value);
      },
      cutText(value) {
        return value.slice(0, 24).trimEnd() + "...";
      },
      info(value, button) {
        this.$refs.subportalesComponent.info(value, button);
      },
      setQuery(prop, value) {
        this.query[prop] = value;
      },
      filterByPrice(items, min, max) {
        // items.filter(item => (item.rental_price > min) && (item.rental_price < max))
      },
      onFileChange(e) {
        this.import_file = e.target.files[0];
      },
      stateProperty(data) {
        this.overlay = true;
        this.$http({
          data,
          method: "post",
          url: "api/auth/api-inmueble-update-state",
        })
          .then((res) => {
            this.overlay = false;
            this.$store.commit("appInmueble/UPDATE_INMUEBLE", res.data.data);
            this.$toast({
              component: ToastificationContent,
              position: "top-center",
              props: {
                title: "Estado Actualizado",
                icon: "CheckCircleIcon",
                variant: "success",
                text: "El estado del Inmueble ha sido actualizado exitosamente",
              },
            });
          })
          .catch((err) => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Algo salio mal",
                icon: "AlertCircleIcon",
                text: "Si el problema persiste recargar la pagina o comunicate con soporte",
                variant: "danger",
              },
            });
          });
      },
      stateVariant(state) {
        let variant;
        switch (state) {
          case 3:
            variant = "light-danger";
            break;
          case 4:
            variant = "light-warning";
            break;
          default:
            variant = "light-primary";
        }
        return variant;
      },
      // Obtener Inmuebles
      async getInmuebles(a = 1) {
        // scroll a la pantalla
        window.scrollTo({
          top: 500,
          behavior: "smooth",
        });
        this.overlay = true;
        let params = { page: a };
        let data = {};
        for (let prop in this.query)
          if (this.query[prop]) data[prop] = this.query[prop];

        await this.$store
          .dispatch("appInmueble/getInmuebles", { data, params })
          .then((state) => {
            if (!state) {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: "Algo salio mal",
                  icon: "AlertCircleIcon",
                  text: "Si el problema persiste recargar la pagina o comunicate con soporte",
                  variant: "danger",
                },
              });
            }
          });
        this.overlay = false;
      },
      watchQuerys() {
        let keys = Object.keys(this.ubicaciones);
        if(this.startApiInmuebles){
          this.getInmuebles()
          this.startApiInmuebles=false
        }
        for (let prop in this.query) {
          this.$watch(
            () => this.query[prop],
            (a) => {
              if (!keys.includes(prop)) this.getInmuebles();
            }
          );
        }
      },
      watchUbicaciones() {
        for (let prop in this.ubicaciones) {
          this.$watch(
            () => this.ubicaciones[prop].value,
            (codigo) => {
              Object.assign(this.query, { [prop]: codigo });

              this.getInmuebles().then(() => {
                let keys = Object.keys(this.ubicaciones);
                if (prop != keys[keys.length - 1] && codigo != null) {
                  let index = keys.indexOf(prop);
                  this.getUbicacion({
                    codigo,
                    prop: keys[index + 1],
                    api: this.ubicaciones[prop].props.api,
                    name: this.ubicaciones[prop].props.name,
                  });
                }
              });
            }
          );
        }
      },

      portalesState(current, inmueble) {
        if (HELPERS.MIX_PROPPIT != current.slug) {
          Object.assign(this.portal, { state: true, current, inmueble });
        } else {
          this.$refs.subportalesComponent.info(
            inmueble.subportalescode,
            inmueble
            );
        }
      },

      modalFicha(slug) {
        this.propModalFicha = slug;
        this.fichaInmueble = true;
      },
      sendValue() {
        for (let item of this.inmueble)
          Object.assign(item, { vgtSelected: false });
        return this.rango ? this.inmueble : this.inmueble[0];
      },

      addInmueble() {
        this.modalState = true;
        this.modal = {
          type: "agregar",
        };
      },
      editInmueble(inmueble) {
        this.modalState = true;
        this.modal = {
          type: "editar",
          inmueble,
        };
      },

      // Seleccionar Inmueble de la Tabla
      rowStyleClass(row) {
        if(this.rowSelected.id!=null){
          return this.rowSelected.id == row.id ? "success" : "";
        }
      },

      inmuebleDetail(row) {
        row.mls = false;
        if (this.elegir) {
          this.inmueble = [row.row];
          this.rowSelected = row.row;
          this.$emit("sendActive", false);
        } else {
          if (this.rowSelected.id == row.id) {
            this.clearTable();
          } else {
            this.rowSelected = row;
            this.sideBarState = true;
          }
        }
        this.$store.commit("appInmueble/SET_INMUEBLE_SELECT", this.rowSelected)

      },

      clearTable() {
        this.rowSelected = {};
        this.sideBarState = false;
      },

      closeModalInmueble(value) {
        this.modalState = false;
      },

      async exportInmueble() {
        this.overlay = true;
        await this.$store
          .dispatch("appInmueble/exportInmueble", this.query)
          .then(() => {
            this.overlay = false;
          })
          .catch((error) => {
          });
      },
      async importExcel() {
        this.overlay = true;
        let formData = new FormData();
        formData.append("file", this.import_file);

        await this.$http
          .post("api/auth/api-inmueble/import", formData, {
            headers: { "Content-type": "multipart/form-data" },
          })
          .then((response) => {
            this.getInmuebles();
            //  this.customers();
            if (response.status === 200) {
              this.overlay = false;
              this.modalFile = false;
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: "Archivo Importado",
                  icon: "CheckCircleIcon",
                  text: "Clientes importados exitosamente",
                  variant: "success",
                },
              });
            }
          })
          .catch((error) => {
            this.overlay = false;
            this.modalFile = false;
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Algo salio mal",
                icon: "AlertCircleIcon",
                text: error.response.data,
                variant: "danger",
              },
            });
          });
      },

      // Limpiar filtro
      clearFilter() {
        this.resetUbicacion();
        for (let i in this.query) if (i != "number_page") this.query[i] = null;
      },

      // Select de ubicaciones (pasi, departamento, ciudad)
      resetUbicacion(prop) {
        let keys = Object.keys(this.ubicaciones),
          index = keys.indexOf(prop);
        if (prop) {
          keys.shift();
          keys.splice(0, index);
        }
        for (let key of keys) {
          Object.assign(this.query, { [key]: null });
          Object.assign(this.ubicaciones[key], { value: null, options: [] });
        }
      },
      async getUbicacion({ codigo, api, name, prop }) {
        await this.$store
          .dispatch(api, { codigo })
          .then((response) => {
            this.ubicaciones[prop].options = response;
          })
          .catch((error) => {
          });
      },
      viewList(listStyle) {
        let storage = JSON.parse(localStorage.getItem("ui-setting"));
        Object.assign(storage, { listStyle });
        localStorage.setItem("ui-setting", JSON.stringify(storage));
        this.listStyle = listStyle;
      },
    },
    watch: {
      $route() {
        this.currentHash = location.hash;
        const hashId = Number(this.currentHash.split("-")[1]);
        const row = this.goodTable.props.rows.filter(
          (item) => item.id === hashId
        )[0];
        this.inmuebleDetail(row);
        location.hash = "";
      },

      max_price(value) {
        if (!value) {
          this.searchRange();
        }
      },

      min_price(value) {
        if (!value) {
          this.searchRange();
        }
      },
    },
  };
  </script>

  <style scoped lang="css">

  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
  .table-info-inmueble {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .card-grid {
    height: 800px;
  }

  .table-info-inmueble .title {
    font-size: 1rem;
    font-weight: bold;
    color: black;
    margin: 0;
    text-transform: uppercase;
    border-bottom: 1px solid #888 ;
  }
  .container_price{
    width: 150px;
  }

  .table-info-inmueble .label {
    display: block;
    font-size: 0.9em;
    margin-bottom: 5px;
  }

  .table-info-inmueble-thumbnail {
    position: relative;
    width: 80px;
    height: 120px;
    z-index: 1;
    margin: 0;
    background: #d5d5d5;
    display: flex;
  }

  .table-info-inmueble-thumbnail img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .table-info-inmueble-thumbnail svg {
    width: 60%;
    margin: auto;
    fill: #000;
    opacity: 0.25;
  }

  .table-info-inmueble hr {
    margin: 0.7rem 0;
  }

  div.pac-container {
    z-index: 1050 !important;
  }

  .portales-content-table-info-inmueble {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: -3px;
    width: auto;
  }

  .portales-content-table-info-inmueble li {
    position: relative;
    outline: 1px solid #d5d5d5;
    outline-offset: -1px;
    z-index: 1;
    margin: 3px;
  }

  .portales-content-table-info-inmueble li .state-portal {
    position: absolute;
    inset: 0;
    display: block;
    z-index: 1;
  }

  .portales-content-table-info-inmueble li .state-portal.sync {
    outline: 3px solid #28c76f;
    outline-offset: -3px;
  }

  /**/
  .title-tab {
    overflow: hidden;
    white-space: nowrap;
    width: 12em;
    text-overflow: ellipsis;
  }

  .grid-table-info-inmueble>* {
    width: 100%;
    flex-basis: inherit;
    flex-grow: 0;
  }
  .hover-row_item{
    padding: 0.5rem;
  }

  @media (max-width: 767px) {
    .showDisable {
      display: none !important;
    }
  }

  @media (min-width: 480px) {
    .grid-table-info-inmueble>* {
      width: calc(100% / 2);
    }
  }

  @media (min-width: 768px) {
    .grid-table-info-inmueble>* {
      width: calc(100% / 4);
    }
  }

  @media (min-width: 1700px) {
    .grid-table-info-inmueble>* {
      width: auto;
      flex-basis: 0;
      flex-grow: 1;
    }
  }

  @media (max-width: 576px) {
    .table__actions {
      display: flex;
      flex-direction: row !important;
    }
  }

  #TableInmuebles .vgt-wrap .vgt-table {
    font-size: 12px;
  }

  .td-sticky {
    position: sticky;
    z-index: 2;
  }

  .td-sticky.left {
    left: 0;
  }

  .td-sticky.right {
    right: 0;
  }

  .vgt-table.striped tbody tr td {
    background: #fff;
  }

  .vgt-table.striped tbody tr:nth-of-type(odd) td {
    background: #f3f3f5;
    border-left: none;
  }

  .vgt-table tr.success td {
    background: #28c76f4d !important;
  }

  select.swal2-select {
    width: 100%;
    margin: 1em 0;
  }

  .table-label-hidden .label-hidden::before {
    display: none;
  }

  .table-label-hidden .label-hidden {
    text-align: left !important;
  }

  .card {
    height: auto;
    max-height: 400px;
  }

  .card-image {
    max-height: 180px;
    margin-bottom: 0.8em;
  }

  .card-price {
    font-size: 20px;
  }

  .border_card {
    border: 4px solid #e3e4e5;
  }

  .border_card:hover {
    box-shadow: 4px 4px 8px 8px rgba(0, 0, 0, 0.2) !important;
  }

  .container__filter {
    position: relative;
    border: 2px solid #7367f0;
    padding: 1.2rem 0;
    border-radius: 16px;
    margin-bottom: 1.4rem;
  }

  .span-title {
    position: absolute;
    left: 1rem;
    top: -1rem;
    background-color: white;
    z-index: 5;
    padding: 6px;
    font-weight: bold;
    color: #7367f0;
  }
  </style>
