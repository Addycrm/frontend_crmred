<template>
  <div id="TableInmuebles2" v-if="tablaInmuebles!=null">
    <div class="inmuebles__header">
      <div class="container__agent"  v-if="agentSelect.userdata">
        <div class="container__agent-left">
          <b-avatar :src="agentSelect.userdata.foto_persona" size="120px" rounded />
        </div>
        <div class="container__agent-rigth">
          <h4 class="mb-1" style="color: var(--primary)" v-if="agentSelect.empresa">{{ agentSelect.empresa.nombre }}</h4>
          <h4 class="mb-1" v-else>{{  agentSelect.userdata.primer_nombre  }}</h4>
            <p class="text_agent">
              <strong style="color: var(--primary)">ID: </strong>{{ agentSelect.id }}
            </p>
            <p class="text_agent text_agent-email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-icon__email">
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
              </svg>
              {{ agentSelect.email }}
            </p>
        </div>
      </div>
      <div class="hader__btns">
        <b-button :to="{name:'inmo-agent'}"  variant="primary" class="btn__back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 30px; height: 20px; fill: white;">
            <path  d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"/>
          </svg>
          Volver
        </b-button>
      </div>
      <div>
      <app-collapse>
        <app-collapse-item title="FILTRO CÓDIGO" :isVisible="true">
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
              </div>
        </app-collapse-item>
      </app-collapse>
      </div>
      <div  class="d-flex flex-wrap justify-content-end">
        <div class="px-10 d-flex col-sm-6 justify-content-center col-md-auto">
          <b-button variant="danger" class="d-inline-flex align-items-center" @click="openDepublicateMasive()">
              <span class="align-middle">Despublicación Masiva</span>
            </b-button>
        </div>
      </div>
      <div v-if="!elegir" class="d-flex flex-wrap justify-content-end">
        <div class="p-10 d-flex col-sm-6 justify-content-center col-md-auto" v-if="$can('create', 'inmuebles')">
          <b-button variant="success" class="d-inline-flex align-items-center" @click="addInmueble">
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
          <b-button variant="primary" class="d-inline-flex align-items-center" @click="exportInmueble()">
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
          <b-button variant="primary" class="d-inline-flex align-items-center" @click="modalFile = true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{
              width: '1.25em',
              height: '1em',
              margin: '-0.5em',
              marginRight: '0.8rem',
              fontSize: '15px',
            }" fill="currentColor">
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
      </div>
      <div v-if="!elegir" class="d-flex flex-column col-sm-12 col-md-auto align-items-center px-0">
        <div class="col-auto p-0">
          <legend class="bv-no-focus-ring col-form-label pt-0  col-form-label-sm" style="margin-left:7px;
          margin-bottom: 2px;
        ">Vistas</legend>
          <div class="d-flex flex-wrap">
            <!-- BOTON VISTA DETAIL LIST -->
            <b-col cols="auto" class="px-10 pb-10 pt-0 d-flex showDisable" v-b-tooltip.hover title="Vista detalle">
              <b-button @click="viewList('detail-list')" :variant="listStyle == 'detail-list' ? 'info' : 'outline-info'"
                :class="listStyle == 'detail-list' ? 'pointer-events-none' : null"
                class="btn-icon d-flex justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{
                  width: '1.25em',
                  height: '1em',
                  margin: '-0.5em',
                  fontSize: '18px',
                }" fill="currentColor">
                  <path
                    d="M88 48C101.3 48 112 58.75 112 72V120C112 133.3 101.3 144 88 144H40C26.75 144 16 133.3 16 120V72C16 58.75 26.75 48 40 48H88zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H192C174.3 128 160 113.7 160 96C160 78.33 174.3 64 192 64H480zM480 224C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H192C174.3 288 160 273.7 160 256C160 238.3 174.3 224 192 224H480zM480 384C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H192C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384H480zM16 232C16 218.7 26.75 208 40 208H88C101.3 208 112 218.7 112 232V280C112 293.3 101.3 304 88 304H40C26.75 304 16 293.3 16 280V232zM88 368C101.3 368 112 378.7 112 392V440C112 453.3 101.3 464 88 464H40C26.75 464 16 453.3 16 440V392C16 378.7 26.75 368 40 368H88z" />
                </svg>
              </b-button>
            </b-col>
            <!-- BOTON VISTA GRID -->
            <b-col cols="auto" class="px-10 pb-10 pt-0 d-flex" v-b-tooltip.hover title="Vista en tarjeta">
              <b-button @click="viewList('grid')" :variant="listStyle == 'grid' ? 'info' : 'outline-info'"
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
          </div>
        </div>
      </div>
      <div class="col-sm-12 text-center" v-if="tablaInmuebles.to">
        Inmuebles: <b class="text-primary">{{ tablaInmuebles.to }}</b> de
        <b>{{ tablaInmuebles.total }}</b>
      </div>
    </div>

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
                <div v-if="props.column.field === 'actions'" class="d-inline-flex flex-column table__actions">
                  <b-button v-b-tooltip.hover title="Editar" pill variant="success"
                    v-if="$can('updated', 'inmuebles')" @click="editInmueble(props.row)" class="
                    d-flex
                    justify-content-center
                    align-items-center
                    m-10
                  " size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{
                      width: '1.25em',
                      height: '1em',
                    }" fill="currentColor">
                      <path
                        d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
                    </svg>
                    Editar
                  </b-button>
                  <b-button v-b-tooltip.hover @click="inmuebleDetail(props.row)" title="Ver Detalles" pill
                    variant="outline-primary"
                    class="
                    d-flex
                    justify-content-center
                    align-items-center
                    m-10
                  " size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" :style="{
                      width: '1.25em',
                      height: '1em',
                    }" fill="currentColor">
                      <path
                        d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM272 416h-160C103.2 416 96 408.8 96 400C96 391.2 103.2 384 112 384h160c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 352h-160C103.2 352 96 344.8 96 336C96 327.2 103.2 320 112 320h160c8.836 0 16 7.162 16 16C288 344.8 280.8 352 272 352zM288 272C288 280.8 280.8 288 272 288h-160C103.2 288 96 280.8 96 272C96 263.2 103.2 256 112 256h160C280.8 256 288 263.2 288 272z" />
                    </svg>
                    Detalle
                  </b-button>
                  <b-button v-b-tooltip.hover title="Ver Ficha" pill
                  variant="outline-primary"
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
                      <path
                        d="M224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM96 224c17.67 0 32 14.33 32 32S113.7 288 96 288S64 273.7 64 256S78.33 224 96 224zM318.1 439.5C315.3 444.8 309.9 448 304 448h-224c-5.9 0-11.32-3.248-14.11-8.451c-2.783-5.201-2.479-11.52 .7949-16.42l53.33-80C122.1 338.7 127.1 336 133.3 336s10.35 2.674 13.31 7.125L160 363.2l45.35-68.03C208.3 290.7 213.3 288 218.7 288s10.35 2.674 13.31 7.125l85.33 128C320.6 428 320.9 434.3 318.1 439.5zM256 0v128h128L256 0z" />
                    </svg>
                    Ficha
                  </b-button>
                  <b-button v-b-tooltip.hover
                    title="Cambiar estado publicación" pill
                    variant="outline-primary"
                    @click="openModalStateProperty(props.row)"
                    class="
                    d-flex
                    justify-content-center
                    align-items-center
                    m-10
                    "
                    size="sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                      :style="{
                        width: '1.25em',
                        height: '1em',
                      }" fill="currentColor"
                    >
                      <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                    </svg>
                    Estado
                  </b-button>
                </div>
                <div v-else-if="props.column.field === 'inmueble'">
                  <vistaDetail
                    :props="props"
                    @inmuebleDetail="inmuebleDetail"
                    @stateProperty="stateProperty"
                    ></vistaDetail>
                  <div >
                    <hr class="my-10" />
                    <b-row class="m-0">
                      <b-col class="p-10">
                        <ul class="portales-content-table-info-inmueble">
                          <li class="active outline cursor-pointer"
                          v-b-tooltip.hover.left.topleft
                          title="Red Fincaraiz">
                            <a
                              :href="(props.row.slug)?`https://redfincaraiz.com/properties/${props.row.slug}`:'https://redfincaraiz.com'"
                              target="_blank">
                              <span  class="state-portal sync">
                              </span>
                              <img src="@/assets/images/logo/LOGO-RED-FINCA-RAIZ.png" style="height: 40px;width: 70px;padding: 4px;" />

                            </a>
                          </li>
                          <template v-for="item in appPortal.portales">
                            <li v-b-tooltip.hover.left.topleft :title="item.name" :key="item.id"
                              v-if="item.state === 'active'" class="outline cursor-pointer">
                              <template v-if="
                                !statePortal(
                                  props.row.portale_state_inmueble,
                                  item,
                                  props.row.portales_codigo_response
                                )
                              ">
                                <span @click="
                                  syncPortal('create', {
                                    inmueble: props.row,
                                    portal: item,
                                    slug: item.slug,
                                  })
                                " class="state-portal"></span>
                              </template>
                              <template v-else>
                                <span @click="portalesState(item, props.row)" class="state-portal sync"></span>
                              </template>
                              <img :src="item.image" style="height: 40px" />
                            </li>
                          </template>
                          <div class="item_buttons item_buttons-outline">
                            <b-dropdown
                              variant="primary"
                              class="container_dropdown"
                              id="dropdown-1"
                              dropright
                            >
                              <template #button-content>
                                <feather-icon icon="Share2Icon" /> Compartir Portales
                              </template>
                              <b-dropdown-item variant="success" @click="publicationMasive(props.row)" >Publicación Masiva</b-dropdown-item>
                              <b-dropdown-item variant="warning" @click="DepublicationMasive(props.row)">Despublicación Masiva</b-dropdown-item>
                              <b-dropdown-item  @click="UpdatePortalMasive(props.row)">Actualización Masiva</b-dropdown-item>
                            </b-dropdown>
                          </div>
                          <!-- <li>
                            <button class="btn btn-primary btn-sm" @click="publicationMasive(props.row)">
                              Publicación<br>
                              Masiva
                            </button>
                            <button class="btn btn-warning btn-sm" @click="DepublicationMasive(props.row)">
                              Despublicación<br>
                              Masiva
                            </button>
                          </li> -->
                          <li>
                          </li>
                        </ul>
                      </b-col>
                    </b-row>
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
      </b-row>
    </template>

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
        <component is="DetailsInmuebles" :detail="rowSelected" />
      </v-modal>
    </transition>
    <transition name="fade">
      <v-modal v-if="fichaInmueble" @close="fichaInmueble = false" titulo="Ficha del Inmueble" footer>
        <components is="ModalFicha" :inmueble="propModalFicha"  />
        <template #footer>
          <b-button variant="danger" @click="fichaInmueble = false">
            Cerrar
          </b-button>
        </template>
      </v-modal>
    </transition>
    <transition name="fade">
        <v-modal v-if="modalStateProperty" @close="modalStateProperty = false" titulo="Cambiar estado de poblicación" >
          <component is="modalChangeStateProperty" :inmueble="rowSelected" @reloadPage="reloadPage" @closeModal="closeModal" />
        </v-modal>
      </transition>
    <transition name="bounce">
      <v-modal v-if="stateModalPubMasive" @close="()=> stateModalPubMasive=false"  titulo="Publicación de portales masivo" center
        size="md" >
        <component is="ModalMasivePortal" :inmueble="inmuebleSelectPortal" />
      </v-modal>
    </transition>
    <transition name="bounce">
      <v-modal v-if="stateModalDeMasive" @close="()=> stateModalDeMasive=false"  titulo="Despublicación de portales masivo" center
        size="md" >
        <component is="ModalDesMasivePortal" :inmueble="inmuebleSelectPortal" />
      </v-modal>
    </transition>
    <transition name="bounce">
        <v-modal v-if="stateModalUpdate" @close="()=> stateModalUpdate=false"  titulo="Actualización de portales masivo" center
          size="md" >
          <component is="modalUpdatePortales" :inmueble="inmuebleSelectPortal" />
        </v-modal>
      </transition>
    <subportales-component ref="subportalesComponent" />
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
import modalUpdatePortales from "@/views/apps/inmuebles/components/modalUpdatePortales.vue";

// // vista skeleton
// import skeletonLoading from '../components/skeletonLoadingMLS.vue'
import modalChangeStateProperty from "@/views/apps/inmuebles/components/modalChangeStateProperty.vue";
// vistas
import vistaGrid from "@/views/apps/inmuebles/components/vistas/vistaGrid.vue";
import vistaDetail from '@/views/apps/inmuebles/components/vistas/vistaDetail.vue'

//desplegables
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import { HELPERS } from "../../../../libs/helpers";
export default {
  name: "inmueblesAgent",
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
    vistaDetail,
    ModalMasivePortal,
    ModalDesMasivePortal,
    modalChangeStateProperty,
    modalUpdatePortales
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
    return {
      actualPage:false,
      modalStateProperty:false,
      inmuebleSelectPortal:null,
      stateModalPubMasive:false,
      stateModalDeMasive:false,
      stateModalUpdate:false,
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
      param:null,
      // query: {
      //   titulo_inmueble: null,
      //   created_by: null,
      //   state_fisico: null,
      //   state_inmueble: null,
      //   tipo_inmueble: null,
      //   tipo_negocio: null,
      //   pais_id: null,
      //   estado_id: null,
      //   ciudad_id: null,
      //   zona_id: null,
      //   barrio_id: null,
      //   number_page: 6,
      //   codigo_externo: null,
      //   id: null,
      //   code_portal:null,
      //   min_price: null,
      //   max_price: null,
      //   filterPrice:null,
      // },
      query:{
        codigo_externo:null,
        id:null
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
    agentSelect() {
      // return this.$store.state.appAgents.selectAgent;
      return JSON.parse(localStorage.getItem('selectAgentElite'))
    },
    tablaInmuebles() {
      return this.$store.state.appInmueble.tabla;
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
    this.watchQuerys();  },
  mounted() {
    // this.watchUbicaciones();
    // this.ubicaciones.pais_id.value=48
    if (screen.width <= 767) {
      this.viewList("grid");
    }
    if(this.viewCalendarInmueble!=null){
      this.listStyle=this.viewCalendarInmueble
    }
    this.getInmuebles()

  },
  destroyed() {
    this.$emit("sendActive", true);
    // this.$store.commit("appAgents/SELECT_AGENT",null)
    localStorage.removeItem('selectAgentElite');
  },
  methods: {
    openDepublicateMasive(){
      this.$swal({
        title: 'DESPUBLICACIÓN MASIVA',
        text: "Despublicar los inmuebles del agente?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.depublicateMasiveAgent()
          this.$store.dispatch()

          this.$swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

      this.$swal({
        title: 'DESPUBLICACIÓN MASIVA',
        text: "Despublicar los inmuebles del agente?",
        icon: 'warning',
        confirmButtonText: 'Look up',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText:'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {

          try{
            let res = await this.depublicateMasiveAgent()
              if (!res) {
                throw new Error(response.statusText)
              }else{
                this.$swal.fire(
                  'DESPUBLICACIÓN MASIVA',
                  'La despublicación masiva ha sido exitosa.',
                  'success'
                )
              }
          }catch(error) {
              this.$swal.showValidationMessage(
                `Hubo un error, intenta nuevamente.`
              )
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
          })
        }
      })
    },
    async depublicateMasiveAgent(){
      let data = {
        email:this.agentSelect.email
      }
      try{
        let res = await this.$store.dispatch("appInmueble/depublicateMasiveAgent", {...data})
        return res

      }catch(err){

      }
    },
    reloadPage(){
      this.getInmuebles(this.actualPage)
    },
    closeModal(){
      this.modalStateProperty=false
    },
    openModalStateProperty(prop){
      this.modalStateProperty=true;
      this.rowSelected=prop
    },
    publicationMasive(payload){
      this.stateModalPubMasive=true
      this.inmuebleSelectPortal=payload

    },
    DepublicationMasive(payload){
      this.stateModalDeMasive=true
      this.inmuebleSelectPortal=payload
    },
    UpdatePortalMasive(payload){
      this.stateModalUpdate=true
      this.inmuebleSelectPortal=payload
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
      this.param = this.$route.params;

      this.actualPage=a
      this.overlay = true;
      let params = { page: a };
      let data = {
        idAgent:this.param.id
      };
      for (let prop in this.query)
        if (this.query[prop]) data[prop] = this.query[prop];
      try{
        let res
        if(this.param.id!=null){
          res = await this.$store.dispatch("appInmueble/getInmueblesAgentFilter", { data, params })
        }
        this.overlay = false;
        if (!res) {
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
      }catch(error){

      }
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
        // origin:true
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
<style lang="css">

.container_dropdown ul{
  /* bottom:-100px !important;
  transition: 2s; */
  transform: none !important;
  left: 215px !important;
  top: -90px !important;
  box-shadow: 0 0 20px 5px gray !important;
}


</style>

<style scoped lang="css">
#TableInmuebles2{
  padding: 1.5rem;
  background-color: white;
  border-radius: 10px;
}
.inmuebles__header{
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.container__agent{
  display: flex;
  gap: 8px;
}
.text_agent{
  margin: 0;
  margin-bottom: 4px;
  overflow: hidden;
}
.svg-icon__email{
  width: 20px;
  height: 20px;
  fill: var(--primary);
}
.container__agent-rigth{
  width: 100%;
}
.disble-container{
  display: none !important;
}
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
.portales-content-table-info-inmueble .outline {
  position: relative;
  outline: 1px solid #d5d5d5;
  outline-offset: -1px;
  z-index: 1;
  margin: 3px;
}
.item_buttons.item_buttons-outline{
  position: relative;
  outline: none;
  margin: auto 0;
}


.portales-content-table-info-inmueble li {
  position: relative;
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

/*.table.b-table th {
    white-space: nowrap;
    font-size: 12px;
    font-weight: 600;
  }
  .precio {
    font-weight: 600;
    white-space: nowrap;
  }*/
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
  .container__agent{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container__agent-rigth{
    text-align: center;
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
