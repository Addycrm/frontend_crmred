<template>
  <div>
    <div id="TableInmuebles">
      <div class="mb-2" cols-lg="5" cols-sm="auto">
        <!-- FILTROS MLS -->
        <app-collapse accordion >
          <app-collapse-item  title="FILTRO GENERAL" :isVisible="true">
            <!-- FILTRO GENERAL -->
            <div class="d-flex flex-wrap container__filter">
              <span class="span-title">FILTRO GENERAL</span>
              <!-- NOMBRE -->
              <b-col cols="12" md="3" lg="5">
                <b-form-group label="Nombre inmueble">
                  <b-form-input :value="query.titulo_inmueble" @change="setQuery('titulo_inmueble', $event)"
                    placeholder="Buscar..." name="search" type="search" trim />
                </b-form-group>
              </b-col>
              <!-- INMOBILIARIAS -->
              <b-col cols="12" md="3" lg="4">
                <b-form-group label="Inmobiliarias">
                  <v-select v-model="query.empresa" :options="filterEmpresas" :reduce="(type) => type.agente.id"
                    label="nombre">
                    <!-- <v-select v-model="query.empresa" :options="filterEmpresas" :reduce="(type) => type.agente.id" label="name" > -->
                    <template #option="{ agente, nombre }">
                      <span> {{ nombre+ ' - ' }} </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-home" style="color: #7367f0;">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <b>
                        <span style="color: #7367f0;">{{ agente.inmuebles_count }}</span>
                      </b>
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
              <!-- TIPO DE INMUEBLE -->
              <b-col cols="12" md="3">
                <b-form-group label="Tipo de Inmueble">
                  <v-select v-model="query.tipo_inmueble" :options="storeConfig.property_type" :reduce="(type) => type.id"
                    label="tipo" />
                </b-form-group>
              </b-col>
              <!-- TIPO DE NEGOCIO -->
              <b-col cols="12" md="4" lg="3">
                <!-- <b-form-group label="Tipo de Negocio">
                  <v-select v-model="query.tipo_negocio" :options="storeConfig.business_type" :reduce="(type) => type.id"
                    label="tipo" />
                </b-form-group> -->
                <b-form-group label="Tipo de negocio" class="mb-1">
                  <div class="container-filter__checkbox">
                    <b-form-checkbox v-model="query.tipo_negocio" style="margin-top: 6px;" value="1">
                      Venta
                    </b-form-checkbox>
                    <b-form-checkbox v-model="query.tipo_negocio" style="margin-top: 6px;" value="2">
                      Alquiler
                    </b-form-checkbox>
                    <b-form-checkbox v-model="query.tipo_negocio" style="margin-top: 6px;" value="3" >
                      Vender - Alquiler
                    </b-form-checkbox>
                  </div>
                </b-form-group>
              </b-col>
              <!-- RANGO DE PRECIOS -->
              <b-col cols="12" md="4" lg="3" class="d-flex flex-wrap container_range-price" >
                <b-form-group label="Rango de precios" >
                  <b-input-group prepend="$" class="" @change="searchRange()">
                    <cleave id="number"
                      v-model="min_price"
                      class="form-control "
                      :options="{
                      numeral: true,
                      numericOnly:true,
                      numeralThousandsGroupStyle: 'thousand',
                      }"
                      placeholder="valor mínimo"
                      />
                  </b-input-group>
                  <b-input-group prepend="$"  class=""  @change="searchRange()">
                    <cleave id="number"
                      v-model="max_price"
                      class="form-control "
                      placeholder="valor máximo"
                      :options="{
                      numeral: true,
                      numericOnly:true,
                      numeralThousandsGroupStyle: 'thousand',
                      }"
                      />
                  </b-input-group>
                </b-form-group>
                <!-- <b-button @click="searchRange" variant="outline-primary" class="my-auto" style="height: 3rem">
                  Buscar
                </b-button> -->
              </b-col>

            </div>
          </app-collapse-item>
          <app-collapse-item title="FILTRO UBICACIÓN">
            <!-- FITLRO POR UBICACION -->
            <div class="d-flex flex-wrap container__filter">
              <span class="span-title">FILTRO UBICACIÓN</span>
              <!-- FILTRO PAIS -->
              <b-col cols="12" md="4" sm="12" v-for="(value, prop) in ubicaciones" :key="prop">
                <b-form-group :label="value.props.label">
                  <v-select v-model="ubicaciones[prop].value" label="name" @input="
                    () => {
                      value.props.api ? resetUbicacion(prop) : null;
                    }
                  " :reduce="(type) => type.id" :options="
                    prop == 'pais_id'
                      ? storeConfig.country
                      : ubicaciones[prop].options
                  " :disabled="
                    prop == 'pais_id'
                      ? storeConfig.country.length == 0
                      : ubicaciones[prop].options.length == 0
                  " />
                </b-form-group>
              </b-col>

            </div>
          </app-collapse-item>
          <app-collapse-item title="FILTRO CÓDIGO">
            <!-- FILTRO POR CODIGO -->
            <div class="d-flex flex-wrap container__filter">
              <span class="span-title">FILTRO CÓDIGO</span>
              <b-col cols="12" md="3">
                <b-form-group label="Código Control Panel">
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
        <div  class="p-10 col-sm-10 col-md-auto text-center">
          <b-button @click="clearFilter"> Limpiar Filtro </b-button>
        </div>
        <!-- <b-col cols="auto" class="p-10" :style="{ width: '10em' }">
          <b-form-group label="Estado" label-size="sm" class="mb-0">
            <v-select v-model="query.state_inmueble" :options="storeConfig.state_property" :reduce="(type) => type.id"
              label="name" />
          </b-form-group>
        </b-col> -->
        <div  class=" col-sm-12 col-md-auto d-flex justify-content-center p-0">
          <div class="p-10 col-sm-3 col-md-auto" :style="{ width: '8em' }">
            <b-form-group label="Por página" label-size="sm" class="mb-0">
              <v-select v-model="query.number_page" :options="pageOptions" :reduce="(type) => type.value"
                :clearable="false" label="text" />
            </b-form-group>
          </div>
          <!-- ORDEN ASCENDENTE Y DESCENDIENTE -->
          <div v-show="showTipoNegocio">
            <div  class="p-10 sm-3 col-md-auto" :style="{ width: '12em' }">
              <b-form-group label="Orden por precio" label-size="sm" class="mb-0">
                <v-select v-model="query.filterPrice" :reduce="(type) => type.value"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="optionsType" label="text" />
              </b-form-group>
            </div>
          </div>
        </div>
        <div v-if="!elegir" class="d-flex flex-column col-sm-12 col-md-auto align-items-center px-0">
          <div class="col-auto p-0">
            <legend class="bv-no-focus-ring col-form-label pt-0 col-form-label-sm" style="margin-left:7px;
            margin-bottom:2px;"
            >Vistas</legend>
            <div class="d-flex flex-wrap">
              <!-- BOTON VISTA DETAIL LIST -->
              <b-col cols="auto" class="px-10 pb-10 pt-0 d-flex showDisable" v-b-tooltip.hover title="Vista en detalle">
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
              <b-col cols="auto" class="px-10 pb-10 pt-0 d-flex" v-b-tooltip.hover title="Vista tarjeta">
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
        <!-- <b-col cols="12" lg="auto" class="p-0 flex-grow-1"></b-col> -->
        <div  class="col-sm-12 text-center">
          Inmuebles: <b class="text-primary">{{ tablaInmuebles.to }}</b> de
          <b>{{ tablaInmuebles.total }}</b>
        </div>
        <b-col class="p-0"></b-col>
      </b-row>
      <div v-if="tablaInmuebles.data" v-show="!overlay">
        <b-row class="mt-1" >
          <!-- VISTA GRID -->
          <div v-if="listStyle == 'grid'" style="width: 100%;">
            <div  class="p-1" style="width: 100%;">
              <vistaGrid  :inmueblesMap = "inmueblesMap"  @inmuebleDetailGrid="inmuebleDetail"></vistaGrid>
            </div>
          </div>
          <!-- VISTA LISTA DETALLE -->
          <b-col cols="12" v-else-if="listStyle=='detail-list'">
            <VueGoodTable  styleClass="vgt-table striped table-label-hidden"
            v-bind="goodTable.props"
              v-on="goodTable.events">
              <template slot="emptystate">
                <div class="text-center p-1">
                  No hay Inmuebles registrados
                </div>
              </template>
              <template slot="table-row" slot-scope="props">
                <div v-if="props.column.field === 'actions'" class="d-inline-flex flex-md-column">
                  <b-button v-b-tooltip.hover @click="inmuebleDetail(props.row)" title="Ver Detalles" pill
                    variant="outline-primary" class="
                        d-flex
                        justify-content-center
                        align-items-center
                        m-10
                      " size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" :style="{
                      width: '1.25em',
                      height: '1em',
                    }" fill="currentColor">
                      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path
                        d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM272 416h-160C103.2 416 96 408.8 96 400C96 391.2 103.2 384 112 384h160c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 352h-160C103.2 352 96 344.8 96 336C96 327.2 103.2 320 112 320h160c8.836 0 16 7.162 16 16C288 344.8 280.8 352 272 352zM288 272C288 280.8 280.8 288 272 288h-160C103.2 288 96 280.8 96 272C96 263.2 103.2 256 112 256h160C280.8 256 288 263.2 288 272z" />
                    </svg>
                    Detalle
                  </b-button>
                  <b-button v-b-tooltip.hover title="Ver Ficha" pill variant="outline-primary"
                    v-if="$can('read', 'inmuebles')" @click="modalFicha(props.row)" class="
                        d-flex
                        justify-content-center
                        align-items-center
                        m-10
                      " size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" :style="{
                      width: '1.25em',
                      height: '1em',
                    }" fill="currentColor">
                      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path
                        d="M224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM96 224c17.67 0 32 14.33 32 32S113.7 288 96 288S64 273.7 64 256S78.33 224 96 224zM318.1 439.5C315.3 444.8 309.9 448 304 448h-224c-5.9 0-11.32-3.248-14.11-8.451c-2.783-5.201-2.479-11.52 .7949-16.42l53.33-80C122.1 338.7 127.1 336 133.3 336s10.35 2.674 13.31 7.125L160 363.2l45.35-68.03C208.3 290.7 213.3 288 218.7 288s10.35 2.674 13.31 7.125l85.33 128C320.6 428 320.9 434.3 318.1 439.5zM256 0v128h128L256 0z" />
                    </svg>
                    Ficha
                  </b-button>
                </div>
                <div v-else-if="props.column.field === 'inmueble'">
                  <b-row class="table-info-inmueble m-0 cursor-pointer hover-row_item">
                    <b-col cols="auto" class="p-10" v-show="listStyle == 'detail-list'">
                      <figure class="table-info-inmueble-thumbnail cursor-pointer">
                        <template v-if="props.row.inmueble_imagenes[0]">
                          <cld-image v-if="
                            props.row.inmueble_imagenes[0].url.indexOf(
                                'cloudinary'
                            ) != -1
                          " :public-id="
                              props.row.inmueble_imagenes[0].url | urlImages
                            ">
                            <cld-transformation gravity="center" width="80" height="120" crop="thumb" />
                          </cld-image>
                          <img v-else :src="
                            imgValidateURL(
                              props.row.inmueble_imagenes[0].url
                            )
                          " alt="" />
                        </template>
                        <template v-else>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                            <path
                              d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z" />
                          </svg>
                        </template>
                      </figure>
                    </b-col>
                    <b-col class="p-10 content-table-info-inmueble">
                      <b-row class="mx-n10 mt-n10 order-1 order-sm-0" align-v="center">
                        <b-col class="p-10">
                          <h5 @click="inmuebleDetail(props.row)" class="title cursor-pointer">
                            <b class="text-primary mr-10">{{ props.row.id }}:</b>{{
                              props.row.titulo_inmueble
                            }}.<br />
                            <b style="
                              display:inline-block;
                              font-size:10px;
                                color:#333;
                                padding-top:8px;
                                ">
                              Fecha de creación:
                              {{ props.row.created_at | fechaFormating }} ({{
                                dateCounter(props.row.created_at)
                              }})
                            </b>
                          </h5>
                        </b-col>
                        <span class="d-flex flex-wrap ml-auto align-items-center"
                          v-if="props.row.user_id.empresa">
                          <div v-if="validatorUserdata(props.row.created_by)">
                            <a :href="showAgente(props.row.created_by.userdata.slug)" target="_blank">
                            <b-avatar class="mr-1" size="lg" href="#" :src="props.row.user_id.empresa.logo" />
                            <span class="background_color"
                            >
                              {{ props.row.user_id.empresa.nombre }}</span>
                            </a>
                          </div>
                        </span>
                        <span class="d-flex flex-wrap ml-auto align-items-center"
                          v-else
                          >
                          <div v-if="validatorUserdata(props.row.created_by)">
                            <a :href="(props.row.created_by.userdata !=null)?showAgente(props.row.created_by.userdata.slug):''" target="_blank">
                              <b-avatar class="mr-1" size="lg" :src="(props.row.created_by.userdata!=null)?props.row.created_by.userdata.foto_persona:''
                              " />
                              <span class="background_color">
                                {{
                                  props.row.created_by.userdata.primer_nombre
                                }}</span>
                            </a>
                          </div>
                        </span>
                        <b-col cols="12" sm="auto" class="p-10 ml-auto d-flex flex-wrap">
                          <b-button v-b-tooltip.hover title="Contactar Agente" pill variant="primary"
                            v-if="$can('updated', 'inmuebles')" @click="infoContact(props.row.created_by)" size="sm">
                            <feather-icon icon="PhoneOutgoingIcon" class="mr-10" />Contactar
                          </b-button>
                        </b-col>
                        <b-col cols="12" sm="auto" class="p-10 ml-auto d-flex flex-wrap">
                              <b-badge class="d-flex mx-auto justify-content-center" :style="{ width: '80px' }"
                                :variant="stateVariant(props.row.state_inmueble.id)
                                ">
                                {{ props.row.state_inmueble.name }}
                              </b-badge>
                            <!-- <b-dropdown-item v-for="item in storeConfig.state_property" :key="item.id" :disabled="
                              props.row.state_inmueble.id == item.id
                            "
                              @click="
                                  stateProperty({
                                    state: item.id,
                                    property: props.row.id,
                                  })
                              ">
                              {{ item.name }}
                            </b-dropdown-item> -->
                        </b-col>
                      </b-row>
                      <hr class="my-10" />
                      <b-row @click="inmuebleDetail(props.row)" class="mx-n10 mb-n10 grid-table-info-inmueble">
                        <b-col class="p-10">
                          <b class="label">Estado de la Propiedad:</b>
                          <span class="value font-weight-bold text-success">
                            {{ props.row.state_fisico.name }}
                          </span>
                        </b-col>
                        <b-col class="p-10">
                          <b class="label">Tipo de Negocio:</b>
                          <span class="value" v-if="props.row.tipo_negocio">{{
                            props.row.tipo_negocio.tipo
                          }}</span>
                        </b-col>
                        <!-- VALIDAR POR TIPO DE NEGOCIO -->
                        <!-- SI ES VENTA -->
                        <b-col class="p-10 " v-if="props.row.tipo_negocio.tipo=='Venta'">
                          <b class="label container_price" >Valor de Venta:</b>
                          <span class="value font-weight-bolder text-primary container_price">
                              {{ props.row.selling_price | precio }}
                          </span>
                        </b-col>
                        <!-- ALQUILER -->
                        <b-col class="p-10" v-else-if="props.row.tipo_negocio.tipo=='Alquiler'">
                          <b class="label container_price" >Valor de Alquiler:</b>
                          <span class="value font-weight-bolder text-primary container_price ">
                              {{ props.row.rental_price | precio }}
                          </span>
                        </b-col>
                        <!-- AMBOS -->
                        <b-col v-else  class="p-10 ">
                          <b-col class="p-10" >
                            <b class="label container_price" >Valor de Venta:</b>
                            <span class="value font-weight-bolder text-primary container_price">
                                {{ props.row.selling_price | precio }}
                            </span>
                          </b-col>
                          <b-col class="p-10 container_price" >
                            <b class="label container_price" >Valor de Alquiler:</b>
                            <span class="value font-weight-bolder text-primary container_price">
                                {{ props.row.rental_price | precio }}
                            </span>
                          </b-col>
                        </b-col>
                        <!-- VALOR ADMIN -->
                        <b-col class="p-10" v-if="props.row.precio_administracion >0" >
                            <b class="label container_price" >Valor de Administación:</b>
                            <span class="value font-weight-bolder text-primary container_price">
                              $ {{currencyFormat(props.row.precio_administracion)}}
                            </span>
                          </b-col>
                        <b-col class="p-10">
                          <b class="label">Zona:</b>
                          <span class="value">
                            <template v-if="props.row.zona_id">
                              {{ props.row.zona_id.name }}
                            </template>
                            <template v-else> ---- </template>
                          </span>
                        </b-col>
                        <b-col class="p-10">
                          <b class="label">Barrio:</b>
                          <span class="value font-weight-bolder text-primary">
                            <template v-if="props.row.barrio_id">
                              {{ props.row.barrio_id.name }}
                            </template>
                            <template v-else> ---- </template>
                          </span>
                        </b-col>
                        <b-col class="p-10">
                          <b class="label">Ciudad:</b>
                          <span class="value">
                            <template v-if="props.row.ciudad_id">
                              {{ props.row.ciudad_id.name }}
                            </template>
                            <template v-else> ---- </template>
                          </span>
                        </b-col>
                        <b-col class="p-10">
                          <b class="label">Departamento:</b>
                          <span class="value">
                            <template v-if="props.row.estado_id">
                              {{ props.row.estado_id.name }}
                            </template>
                            <template v-else> ---- </template>
                          </span>
                        </b-col>
                        <b-col class="p-10">
                          <b class="label">Area Construida:</b>
                          <span class="value">
                            <template v-if="props.row.area_contruida">
                              {{ props.row.area_contruida }} m<sup>2</sup>
                            </template>
                            <template v-else> ---- </template>
                          </span>
                        </b-col>
                        <b-col class="p-10">
                          <b class="label">Area Lote:</b>
                          <span class="value">
                            <template v-if="props.row.area_lote">
                              {{ props.row.area_lote }} m<sup>2</sup>
                            </template>
                            <template v-else> ---- </template>
                          </span>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
              </template>

                <!-- <div class="d-flex flex-wrap justify-content-center align-items-center mt-1">
                  <div class="d-flex">
                    <b-pagination v-if="tablaInmuebles.per_page < tablaInmuebles.total" @change="getInmueblesPublic"
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
                </div> -->
            </VueGoodTable>
          </b-col>
          <!-- VISTA TABLA -->
          <div cols="12"  v-else-if="listStyle=='table'" style="width: 100%;">
            <div style="width: 100%;" >
              <vistaTable  :inmueblesMap="inmueblesMap"  @inmuebleDetailTable="inmuebleDetail" @sortingChanged="sortingChangedTable" />
              <!-- <div class="d-flex flex-wrap justify-content-center align-items-center mt-1">
                  <div class="d-flex">
                    <b-pagination v-if="tablaInmuebles.per_page < tablaInmuebles.total" @change="getInmueblesPublic" :value="currentPage" :per-page="tablaInmuebles.per_page" :total-rows="tablaInmuebles.total" first-number last-number prev-class="prev-arrow" next-class="next-arrow">
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>
                  </div>
              </div> -->
            </div>
          </div>
          <!-- VISTA LISTA MAPA -->
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
                    image: inmueble.inmueble_imagenes[0],
                  })
                " :opened="inmueble.mapOpen" @closeclick="inmueble.mapOpen = false" />
              </GmapMarker>
            </GmapMap>
          </b-col>
        </b-row>
        <!-- PAGINACION -->
        <div class="d-flex flex-wrap justify-content-center align-items-center mt-1">
            <div class="d-flex">
              <b-pagination v-if="tablaInmuebles.per_page < tablaInmuebles.total" @change="getInmueblesPublic" :value="currentPage" :per-page="tablaInmuebles.per_page" :total-rows="tablaInmuebles.total" first-number last-number prev-class="prev-arrow" next-class="next-arrow">
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
      <loadingBar v-show="overlay"/>
      <transition name="fade">
        <v-modal v-if="modalState" @close="closeModalInmueble" :titulo="
          modal.type == 'agregar' ? 'Agregar Inmueble' : 'Editar Inmueble'
        " size="lg">
          <component is="FormInmueble" :prop="modal" />
        </v-modal>
      </transition>

      <transition name="fade">
        <v-modal v-if="portal.state" @close="portal.state = false" titulo="Estado del Portal" size="xs">
          <component is="statePortales" :portal="portal" />
        </v-modal>
      </transition>

      <transition name="slide-to-left">
        <v-modal v-if="sideBarState" @close="clearTable" ref="modalInmueble" titulo="Detalle del inmueble" sideBar
          size="md">
          <component is="DetailsInmuebles" :detail="rowSelected" @infoContactDetail="infoContact"/>
        </v-modal>
      </transition>

      <transition name="fade">
        <v-modal v-if="fichaInmueble" @close="fichaInmueble = false" titulo="Ficha del Inmueble" footer>
          <components is="ModalFicha" :inmueble="propModalFicha" />
          <template #footer>
            <b-button variant="danger" @click="fichaInmueble = false">
              Cerrar
            </b-button>
          </template>
        </v-modal>
      </transition>
      <subportales-component ref="subportalesComponent" />

      <transition name="fade">
        <v-modal v-if="modalStateContact" @close="modalStateContact = false"  ref="modalcontactar" titulo="Ficha de Contacto" size="xs">
          <component is="modalContact"  :agent="contactAgent" />
        </v-modal>
      </transition>
    </div>
  </div>

</template>
<script>
import DetailsInmuebles from "../components/detailsInmuebles";
import FormInmueble from "../FormInmueble";
import VSelect from "vue-select";
import VModal from "@/views/componente/vModal";
import { VueGoodTable } from "vue-good-table";
import { imgValidateURL } from "@/libs/helpers";
import { VBModal } from "bootstrap-vue";
import ModalFicha from "../components/ModalFicha";
import statePortales from "../components/statePortales";
import mixinPortales from "@/views/apps/inmuebles/mixinPortales";
import mixinApis from "@/views/componente/mixinApis";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import mixinConfig from "@/views/componente/mixinConfig";
import subportalesComponent from "@/views/componente/subportal-modal.vue";
import modalContact from "../components/modalContactar.vue";
import { gmapApi } from "vue2-google-maps";
import moment from "moment";
import "moment/locale/es";
import Cleave from 'vue-cleave-component';
//vistas
import vistaGrid from '../components/vistas/vistaGrid.vue'
import vistaTable from '../components/vistas/vistaTable.vue'
// vista loading
import loadingBar from "@/views/componente/loadingBar.vue";
//desplegables
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'


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
    modalContact,
    vistaGrid,
    vistaTable,
    loadingBar
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
  },
  filters: {
    fechaFormating: function (value) {
      if (value) {
        let date = new Date(value);
        return date.toLocaleString();
      }
    },

    nombre(data) {
      return data.primer_nombre;
    },
    checkImage(url) {
      this.found();
      this.$http
        .get("/good-table/basic")
        .then((res) => {
          return url;
        })
        .catch((error) => {
        });
    },
  },

  data() {
    // this.api.push({
    //   api: "appInmueble/getInmueblesPublic",
    //   data: { number_page: 6 },
    // });
    return {
      modalStateContact:false,
      contactAgent:{},
      startApiInmuebles:true,
      loading: true,
      min_price: null,
      listEmpresas: [],
      filterEmpresas: [],
      listEmpresaCount: [],
      max_price: null,
      currentHash: location.hash,
      listStyle: (JSON.parse(localStorage.getItem("ui-setting")).listStyle==="list")?"detail-list":JSON.parse(localStorage.getItem("ui-setting")).listStyle,
      imgValidateURL,
      currentPage: 1,
      import_file: null,
      modalFile: false,
      query: {
        titulo_inmueble: null,
        empresa: null,
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
        filterTable:null,
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
      optionsType: [
        {  text: 'Ascendente', value:'ASC' },
        { text: 'Descendente', value:'DESC' },
      ],
      fields: [
        {
          key: 'id', label: 'Id',
        },
        {
          key: 'titulo_inmueble', label: 'Nombre inmueble', headerTitle:"Nombre del inmueble"
        },
        {
          key: 'area_contruida', label: 'Area construida', headerTitle:"Area construida del inmueble"
        },
        {
          key: 'tipo_negocio.tipo', label: 'Tipo negocio', headerTitle:"Tipo negocio del inmueble"
        },
        {
          key: 'valor_price', label: 'valor', headerTitle:"valor del inmueble"
        },
        {
          key: 'estado_id.name', label: 'Departamento',
        },
        {
          key: 'ciudad_id.name', label: 'Ciudad',
        },
        {
          key: 'barrio_id.name', label: 'Barrio',
        }
        ,
        {
          key: 'created_at', label: 'fecha creacion',
        }
      ],
    };
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
    storeConfig() {
      return this.$store.state.appConfiguracion.options;
    },
    empresas() {
      return this.$store.state.empresa.empresa;

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
          compactMode: true,
          columns: [
            {
              tdClass: "align-middle label-hidden",
              thClass: "text-nowrap",
              field: "inmueble",
              label: "Inmueble",
            },
            {
              tdClass: "align-middle text-center",
              thClass: "text-nowrap",
              field: "actions",
              label: "Acciones",
              width: "90px",
            },
          ],
          rows: this.tablaInmuebles.data,
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
  created() {
     this.fetchInvoices();
    this.watchQuerys();

  },

  async mounted() {
    this.watchUbicaciones();
    this.ubicaciones.pais_id.value=48

    if (screen.width <= 767) {
      this.viewList('grid')
      this.sizeWindow = screen.width
    }
  },
  destroyed() {
    this.$emit("sendActive", true);
  },
  methods: {
    sortingChangedTable(value){
      const {sortBy,sortDesc}=value;
      let sort=null;
      if(sortDesc){
        sort="DESC"
      }else{
        sort="ASC"
      }
      if(sortBy!=null){
        this.query.filterTable={
          [sortBy]:sort
        }
      }
    },

    validatorUserdata(data){
      if(data){
        if(data.userdata){
          return true
        }else{
          return false
        }
      }
    },
    onRowSelected(items){
      this.inmuebleDetail(items[0])
    },
    filterPriceOrden(select){
      this.setQuery('filterOrden',select)
      // this.query.filterOrden= select
    },
    showAgente(url){
      const urlAgente = process.env.MIX_API_URL+"perfil/agente/"+url
      return urlAgente
    },

    searchRange(e) {
      if( Number(this.max_price)>0 ){
        if(Number(this.max_price)>= Number(this.min_price)  ){
          this.query.max_price = Number(this.max_price);
          this.query.min_price = Number(this.min_price);
          if(Number(this.min_price)<1){
            this.query.min_price = 1;
          }else{
            this.query.min_price = Number(this.min_price);
          }
        }

        }
    },
    infoPopUp: function ({ id, image, name, price }) {
      let imageCurrent;
      if(image == undefined){
        imageCurrent = 'http://www.crmred.co/images/_/_/_/_/redcrm/frontend/src/assets/images/logo/logo-crmred.svg'
      } else{
        imageCurrent = image.url
      }
      return {
        content: `
        <a href="#details-${id}" style="display: flex; flex-direction: column; max-width: 130px;">
          <picture>
            <img style="width: 100%; height: 70px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" src="${imageCurrent}" />
            </picture>
            <b style="display: inline-block; margin-bottom: 3px">${id}</b>
            <h5><b>${this.cutText(name)}</b></h5>
            <b>$${this.currencyFormat(price) || precio}</b>
          </a>
        `,
        pixelOffset: {
          width: 0,
          height: -20,
        },
      };
    },
    dateCounter(date) {
      return moment(date, "YYYYMMDD").fromNow();
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
    infoContact(value, button) {
      this.modalStateContact=true;
      this.contactAgent=value;
    },

    fetchInvoices() {
      this.$store
        .dispatch("appEmpresas/fetchEmpresas", {})
        .then((response) => {
          this.listEmpresas = response.data.empresas
          this.filterEmpresas = this.listEmpresas.filter((empresa) => {
            return empresa.agente.inmuebles_count != 0
          })
          this.filterEmpresas.sort((a, b) => {
            return b.agente.inmuebles_count - a.agente.inmuebles_count
          })
        })

        .catch((error) => { });
    },

    setQuery(prop, value) {
      this.query[prop] = value;
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
              text: "Si el problema persiste recargar la página o comunicate con soporte",
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
    async getInmueblesPublic(a = 1) {
      // scroll a la pantalla
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.overlay = true;
      let params = { page: a };
      let data = {};
      for (let prop in this.query)
        if (this.query[prop]) data[prop] = this.query[prop];

      await this.$store
        .dispatch("appInmueble/getInmueblesPublic", { data, params })
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
        this.getInmueblesPublic()
        this.startApiInmuebles=false
      }
      for (let prop in this.query) {
        this.$watch(
          () => this.query[prop],
          (a) => {
            if (!keys.includes(prop))
            {
              return this.getInmueblesPublic();
            }
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
            this.getInmueblesPublic().then(() => {
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
      Object.assign(this.portal, { state: true, current, inmueble });
    },

    modalFicha(row) {
      row.mls = true;
      this.propModalFicha = row;
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
      return this.rowSelected.id == row.id ? "success" : "";
    },

    inmuebleDetail(row) {

      row.mls = true;
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
          this.getInmueblesPublic();
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
    sizeWindow(){
      this.sizeWindow = screen.width
    },
    selectedType(){
      if(this.selectedType.value!= null){
        this.filterPriceOrden(this.selectedType.text)
      }
    },
    $route() {
      this.currentHash = location.hash;
      const hashId = Number(this.currentHash.split("-")[1]);
      const row = this.goodTable.props.rows.filter(
        (item) => item.id === hashId
      )[0];
      this.inmuebleDetail(row);
      location.hash = "";
    },

  },
};
</script>

<style scoped lang="css">
.table-info-inmueble {
  margin-top: 6px;
  margin-bottom: 6px;
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

.container-filter__checkbox{
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/*.table.b-table th {
      white-space: nowrap;
      font-size: 12px;
      font-weight: 600;
    }
    .precio {
      font-weight: 600;
      white-space: nowrap;
    }*/
.grid-table-info-inmueble> * {
  width: 100%;
  flex-basis: inherit;
  flex-grow: 0;
}
.hover-row_item{
  padding: 0.5rem;
}
@media(max-width:767px) {
  .showDisable {
    display: none !important;
  }
  .container-filter__checkbox{
    flex-direction: column;
    gap: 0.5rem;
  }

}

@media (min-width: 480px) {
  .grid-table-info-inmueble> * {
    width: calc(100% / 2);
  }
}

@media (min-width: 768px) {
  .grid-table-info-inmueble> * {
    width: calc(100% / 4);
  }
}

@media (min-width: 1700px) {
  .grid-table-info-inmueble> * {
    width: auto;
    flex-basis: 0;
    flex-grow: 1;
  }
}
#TableInmuebles .vgt-wrap .vgt-table {
  font-size: 12px;
}

#TableInmuebles {
  background-color: white;
  padding: 16px;
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
  max-height: 420px;
}

.card-image {
  max-height: 180px;
  margin-bottom: .8em;
}

.card-price {
  font-size: 20px;
}

.background_color {
  background-color: #95989c;
  border-radius: 5px;
  padding: 4px;
  color: white;
}

.border_card {
  border: 4px solid #e3e4e5;
}

.border_card:hover {
  box-shadow: 4px 4px 8px 8px rgba(0, 0, 0, 0.2);
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
.container_range-price{
  gap: 0.8rem;
}

.input_price-range{
  background-color: #dcdcdc;
  border: 1px solid #a5a1a1;

}
</style>
