<template>
  <span>
    <b-row class="mb-2" cols-lg="5">
      <b-col cols="12" md="3">
        <b-form-group label="Nombre">
          <b-form-input
            :value="query.titulo_inmueble"
            @change="setQuery('titulo_inmueble', $event)"
            placeholder="Buscar..."
            name="search"
            type="search"
            trim
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="3">
        <b-form-group label="Agente">
          <v-select
            v-model="query.created_by"
            :options="storeConfig.agentes"
            :reduce="(type) => type.id"
            label="primer_nombre"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="3">
        <b-form-group label="Estado del Inmueble">
          <v-select
            v-model="query.state_fisico"
            :options="storeConfig.state_fisico"
            :reduce="(type) => type.id"
            label="name"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="3">
        <b-form-group label="Tipo de Inmueble">
          <v-select
            v-model="query.tipo_inmueble"
            :options="storeConfig.property_type"
            :reduce="(type) => type.id"
            label="tipo"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="4">
        <b-form-group label="Tipo de Negocio">
          <v-select
            v-model="query.tipo_negocio"
            :options="storeConfig.business_type"
            :reduce="(type) => type.id"
            label="tipo"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="4" v-for="(value, prop) in ubicaciones" :key="prop">
        <b-form-group :label="value.props.label">
          <v-select
            v-model="ubicaciones[prop].value"
            label="name"
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
      <b-col cols="12" md="3">
        <b-form-group label="Código externo">
          <b-form-input
            :value="query.codigo_externo"
            @change="setQuery('codigo_externo', $event)"
            placeholder="Codigo..."
            name="code"
            type="text"
            trim
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="3">
        <b-form-group label="Código HOMIUP">
          <b-form-input
            :value="query.id"
            @change="setQuery('id', $event)"
            placeholder="Codigo..."
            name="code"
            type="text"
            trim
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="py-1 m-n10" align-v="end">
      <b-col cols="auto" class="p-10">
        <b-button @click="clearFilter"> Limpiar Filtro </b-button>
      </b-col>
      <b-col cols="auto" class="p-10" :style="{ width: '10em' }">
        <b-form-group label="Estado" label-size="sm" class="mb-0">
          <v-select
            v-model="query.state_inmueble"
            :options="storeConfig.state_property"
            :reduce="(type) => type.id"
            label="name"
          />
        </b-form-group>
      </b-col>
      <b-col cols="auto" class="p-10" :style="{ width: '8em' }">
        <b-form-group label="Por pagína" label-size="sm" class="mb-0">
          <v-select
            v-model="query.number_page"
            :options="pageOptions"
            :reduce="(type) => type.value"
            :clearable="false"
            label="text"
          />
        </b-form-group>
      </b-col>
      <template v-if="!elegir">
        <b-col cols="auto" class="p-10 d-flex ml-md-auto ml-lg-0">
          <b-button
            @click="viewList('list')"
            :variant="listStyle == 'list' ? 'info' : 'outline-info'"
            :class="listStyle == 'list' ? 'pointer-events-none' : null"
            class="btn-icon d-flex justify-content-center align-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              :style="{
                width: '1.25em',
                height: '1em',
                margin: '-0.5em',
                fontSize: '18px',
              }"
              fill="currentColor"
            >
              <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
              />
            </svg>
          </b-button>
        </b-col>
        <b-col cols="auto" class="p-10 d-flex">
          <b-button
            @click="viewList('detail-list')"
            :variant="listStyle == 'detail-list' ? 'info' : 'outline-info'"
            :class="listStyle == 'detail-list' ? 'pointer-events-none' : null"
            class="btn-icon d-flex justify-content-center align-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              :style="{
                width: '1.25em',
                height: '1em',
                margin: '-0.5em',
                fontSize: '18px',
              }"
              fill="currentColor"
            >
              <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M88 48C101.3 48 112 58.75 112 72V120C112 133.3 101.3 144 88 144H40C26.75 144 16 133.3 16 120V72C16 58.75 26.75 48 40 48H88zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H192C174.3 128 160 113.7 160 96C160 78.33 174.3 64 192 64H480zM480 224C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H192C174.3 288 160 273.7 160 256C160 238.3 174.3 224 192 224H480zM480 384C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H192C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384H480zM16 232C16 218.7 26.75 208 40 208H88C101.3 208 112 218.7 112 232V280C112 293.3 101.3 304 88 304H40C26.75 304 16 293.3 16 280V232zM88 368C101.3 368 112 378.7 112 392V440C112 453.3 101.3 464 88 464H40C26.75 464 16 453.3 16 440V392C16 378.7 26.75 368 40 368H88z"
              />
            </svg>
          </b-button>
        </b-col>
      </template>
      <b-col cols="12" lg="auto" class="p-0 flex-grow-1"></b-col>
      <b-col class="p-10">
        Inmuebles: <b class="text-primary">{{ tablaInmuebles.to }}</b> de
        <b>{{ tablaInmuebles.total }}</b>
      </b-col>
      <b-col class="p-0"></b-col>
      <template v-if="!elegir">
        <b-col
          cols="auto"
          class="p-10 d-flex ml-auto"
          v-if="$can('create', 'inmuebles')"
        >
          <b-button
            variant="primary"
            class="d-inline-flex align-items-center"
            @click="addInmueble"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              :style="{
                width: '1.25em',
                height: '1em',
                margin: '-0.5em',
                marginRight: '0.8rem',
                fontSize: '1em',
              }"
              fill="currentColor"
            >
              <path
                d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
              />
            </svg>
            <span class="align-middle">Agregar Inmuebles</span>
          </b-button>
        </b-col>
        <b-col
          cols="auto"
          class="p-10 d-flex"
          v-if="$can('create', 'inmuebles')"
        >
          <b-button
            variant="success"
            class="d-inline-flex align-items-center"
            @click="exportInmueble()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              :style="{
                width: '1.25em',
                height: '1em',
                margin: '-0.5em',
                marginRight: '0.8rem',
                fontSize: '1em',
              }"
              fill="currentColor"
            >
              <path
                d="M384 128h-128V0L384 128zM256 160H384v304c0 26.51-21.49 48-48 48h-288C21.49 512 0 490.5 0 464v-416C0 21.49 21.49 0 48 0H224l.0039 128C224 145.7 238.3 160 256 160zM255 295L216 334.1V232c0-13.25-10.75-24-24-24S168 218.8 168 232v102.1L128.1 295C124.3 290.3 118.2 288 112 288S99.72 290.3 95.03 295c-9.375 9.375-9.375 24.56 0 33.94l80 80c9.375 9.375 24.56 9.375 33.94 0l80-80c9.375-9.375 9.375-24.56 0-33.94S264.4 285.7 255 295z"
              />
            </svg>
            <span class="align-middle">Exportar Excel</span>
          </b-button>
        </b-col>

        <b-col class="p-10 d-flex" v-if="$can('create', 'inmuebles')">
          <b-button
            variant="success"
            class="d-inline-flex align-items-center"
            @click="modalFile = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              :style="{
                width: '1.25em',
                height: '1em',
                margin: '-0.5em',
                marginRight: '0.8rem',
                fontSize: '15px',
              }"
              fill="currentColor"
            >
              <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z"
              />
            </svg>
            <span class="align-middle">Importar</span>
          </b-button>
          <v-modal
            v-if="modalFile"
            @close="modalFile = false"
            size="sm"
            titulo="Importar Excel"
            footer
          >
            <b-form-file
              placeholder="Elija un archivo o déjelo aquí...."
              drop-placeholder="Deja el archivo aquí...."
              browse-text="Buscar"
              @change="onFileChange"
              :disabled="overlay"
            />
            <img
              :src="imgExcel"
              class="img-fluid d-block mx-auto mt-1"
              alt=""
            />

            <template #footer>
              <b-overlay :show="overlay">
                <b-button
                  variant="success"
                  @click="importExcel"
                  :disabled="!import_file"
                >
                  Subir archivo
                </b-button>
                <b-button
                  variant="warning"
                  href="https://res.cloudinary.com/reality-inmo/raw/upload/v1671461011/excel/clientes_ni8tix.xlsx"
                  download="plantilla-clientes.xlsx"
                >
                  Descargar plantilla
                </b-button>
              </b-overlay>
            </template>
          </v-modal>
        </b-col>
      </template>
    </b-row>
  </span>
</template>

<script>
export default {
  name: "filterComponent",
  props: {
    query: {
      type: Array,
    },
  },
};
</script>

<style>
</style>