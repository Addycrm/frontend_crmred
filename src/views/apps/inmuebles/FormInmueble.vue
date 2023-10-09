<template>
    <div id="FormInmueble">
        <b-row>
            <b-col cols="12" class="px-0">
                <form-wizard ref="wizardForm" v-bind="propsWizardForm">
                    <tab-content title="Información General" icon="feather icon-home"
                        :before-change="() => wizardFormValidate('wizardFormBasica')">
                        <ValidationObserver v-slot="data" ref="wizardFormBasica">
                            <b-row>
                                <b-col class="px-0">
                                    <div class="card mb-2">
                                        <div class="card-header p-0">
                                            <h2>Información General</h2>
                                        </div>
                                        <!-- Informacion Basica -->
                                        <div class="card-body">
                                            <b-row>
                                                <b-col>
                                                    <h3 class="sub-title-collapse">Información Básica</h3>
                                                </b-col>
                                            </b-row>
                                            <b-row v-if="prop.type != 'agregar'">
                                                <b-col>
                                                    <ValidationProvider v-slot="{ errors }" rules="required">
                                                        <b-form-group label="Estado de la publicación" class="required">
                                                            <b-form-radio-group v-model="form.estado_publicacion"
                                                                name="estado_publicacion">
                                                                <b-form-radio v-for="item in storeConfig.state_property"
                                                                    :key="item.id" :value="item.id"
                                                                    @click="changeStateProperty()" disabled>
                                                                    {{ item.name }}
                                                                </b-form-radio>
                                                            </b-form-radio-group>
                                                            <b-button variant="outline-primary"
                                                                @click="openModalStateProperty()" class="
                                                                    d-flex
                                                                    justify-content-center
                                                                    align-items-center
                                                                    m-10
                                                                " size="sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512" :style="{
                                                                        width: '1.25em',
                                                                        height: '1em',
                                                                    }" fill="currentColor">
                                                                    <path
                                                                        d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
                                                                </svg>
                                                                Cambiar estado
                                                            </b-button>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                            </b-row>
                                            <hr v-if="prop.type != 'agregar'" />
                                            <b-row class="mb-1">
                                                <b-col>
                                                    <input v-model="form.public_portal_inmobiliaria" type="checkbox"
                                                        id="public_portal_inmobiliaria" name="public_portal_inmobiliaria" />
                                                    <strong>
                                                        <h4 style="text-align:justify; display: inline-block;">Deseas que
                                                            este inmueble se publique con los datos de contacto de tu
                                                            empresa?</h4>
                                                    </strong>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col ms="12" md="6" lg="8" xl="8">
                                                    <ValidationProvider v-slot="{ errors }" name="Titulo del inmueble"
                                                        rules="required">
                                                        <b-form-group label="Titulo del Inmueble" class="required">
                                                            <VInput v-model="form.titulo_inmueble" id="titulo_inmueble"
                                                                name="titulo_inmueble"
                                                                :state="errors.length > 0 ? false : null" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="12" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Tipo de Inmueble"
                                                        rules="required">
                                                        <b-form-group label="Tipo de Inmueble" class="required"
                                                            :state="!(errors.length > 0)">
                                                            <v-select autocomplete="off" v-model="form.tipo_inmueble"
                                                                label="tipo" :options="storeConfig.property_type"
                                                                :reduce="(type) => type.id" :clearable="false" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="12" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Estado de la Propiedad"
                                                        rules="required">
                                                        <b-form-group label="Estado de la Propiedad" class="required"
                                                            :state="!(errors.length > 0)">
                                                            <v-select autocomplete="off" v-model="form.state_fisico"
                                                                label="name" :options="storeConfig.state_fisico"
                                                                :reduce="(type) => type.id" :clearable="false" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="12" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Segmento de Mercado"
                                                        rules="required">
                                                        <b-form-group label="Segmento de Mercado" class="required"
                                                            :state="!(errors.length > 0)">
                                                            <v-select autocomplete="off" v-model="form.segmento_mercado"
                                                                label="name" :options="storeConfig.segmento_mercado"
                                                                :reduce="(type) => type.id" :clearable="false" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="12" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Estrato" rules="required">
                                                        <b-form-group label="Estrato" class="required"
                                                            :state="!(errors.length > 0)">
                                                            <v-select autocomplete="off" v-model="form.estrato" label="name"
                                                                :options="storeConfig.estratos" :reduce="(type) => type.id"
                                                                :clearable="false" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="12" md="6" lg="4" xl="4">
                                                    <b-form-group label="Antiguedad">
                                                        <v-select autocomplete="off" v-model="form.antiguedad" label="name"
                                                            :options="storeConfig.antiguedad" :reduce="(type) => type.id"
                                                            :clearable="false" />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col ms="12" md="6" lg="4" xl="4">
                                                    <b-form-group label="Año de Construcción">
                                                        <b-form-input min="0" oninput="validity.valid||(value='');"
                                                            name="ano_construcion" v-model="form.ano_construcion"
                                                            type="number" />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col ms="12" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="N° de Matricula"
                                                        rules="required">
                                                        <b-form-group label="N° de Matricula" class="required">
                                                            <b-form-input name="N° de Matricula"
                                                                v-model="form.matricula_inmobiliaria" type="text"
                                                                :state="errors.length > 0 ? false : null" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>

                                                </b-col>
                                            </b-row>
                                        </div>
                                        <!-- Precio -->
                                        <div class="card-body">
                                            <b-row>
                                                <b-col>
                                                    <h3 class="sub-title-collapse">Precio</h3>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col ms="12" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Tipo de Negocio"
                                                        rules="required">
                                                        <b-form-group label="Tipo de Negocio" class="required"
                                                            :state="!(errors.length > 0)">
                                                            <v-select autocomplete="off" v-model="form.tipo_negocio"
                                                                label="tipo" :options="storeConfig.business_type"
                                                                :reduce="(type) => type.id" :clearable="false"
                                                                @input="form.rangue_price = null" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="12" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Rango de Precio"
                                                        rules="required">
                                                        <b-form-group label="Rango de Precio" class="required"
                                                            :state="!(errors.length > 0)">
                                                            <v-select autocomplete="off" v-model="form.rangue_price"
                                                                label="value" :options="rangue_price"
                                                                :reduce="(type) => type.id" :clearable="false"
                                                                :disabled="rangue_price.length == 0" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="12" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Tipo de Precio"
                                                        rules="required">
                                                        <b-form-group label="Tipo de Precio" class="required"
                                                            :state="!(errors.length > 0)">
                                                            <v-select autocomplete="off" v-model="form.tipo_precio"
                                                                label="tipo" :options="storeConfig.price_type"
                                                                :reduce="(type) => type.id" :clearable="false" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col v-if="form.tipo_negocio == 1 || form.tipo_negocio == 3
                                                    " ms="12" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Precio de Venta"
                                                        rules="required">
                                                        <b-form-group label="Precio de Venta" class="required">
                                                            <b-input-group prepend="$" append="COP">
                                                                <Cleave id="selling_price" v-model="form.selling_price"
                                                                    class="form-control"
                                                                    :class="{ 'is-invalid': errors.length > 0 }" :raw="true"
                                                                    :options="numberFormat"></Cleave>
                                                            </b-input-group>
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col v-if="form.tipo_negocio == 2 || form.tipo_negocio == 3
                                                    " ms="12" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Precio de Alquiler"
                                                        rules="required">
                                                        <b-form-group label="Precio de Alquiler" class="required">
                                                            <b-input-group prepend="$" append="COP">
                                                                <Cleave id="rental_price" v-model="form.rental_price"
                                                                    class="form-control"
                                                                    :class="{ 'is-invalid': errors.length > 0 }" :raw="true"
                                                                    :options="numberFormat"></Cleave>
                                                            </b-input-group>
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                    <ValidationProvider v-slot="{ errors }" label="Tipo de Alquiler"
                                                        rules="required">
                                                        <b-form-group label="Tipo de Alquiler" class="required"
                                                            :state="!(errors.length > 0)">
                                                            <v-select autocomplete="off" v-model="form.tiempo_alquiler"
                                                                label="tipo" :options="storeConfig.tipo_tiempo_alquiler"
                                                                :reduce="(type) => type.id" :clearable="false" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col v-if="form.tipo_negocio == 2 || form.tipo_negocio == 1 || form.tipo_negocio == 3
                                                    " ms="12" md="6" lg="4" xl="4">
                                                    <b-form-group label="Precio de Administración">
                                                        <b-input-group prepend="$" append="COP">
                                                            <Cleave id="precio_administracion"
                                                                v-model="form.precio_administracion" class="form-control"
                                                                :raw="true" :options="numberFormat"></Cleave>
                                                        </b-input-group>
                                                    </b-form-group>
                                                    <b-form-group label="Periodo de Administración">
                                                        <v-select autocomplete="off" v-model="form.periodo_admon"
                                                            label="tipo" :options="storeConfig.periodo_admon"
                                                            :reduce="(type) => type.id" :clearable="false" />
                                                    </b-form-group>
                                                </b-col>
                                            </b-row>
                                        </div>
                                        <!-- Detalles -->
                                        <div class="card-body">
                                            <b-row>
                                                <b-col>
                                                    <h3 class="sub-title-collapse">Detalles</h3>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col cols="12">
                                                    <ValidationProvider v-slot="{ errors }" name="Descripción"
                                                        rules="required">
                                                        <b-form-group label="Descripción" class="required">
                                                            <b-form-text class="mb-1">Caracteres restantes:
                                                                {{
                                                                    length - form.descripcion.length
                                                                }}</b-form-text>
                                                            <b-form-textarea id="descripcion" :value="form.descripcion"
                                                                @input="
                                                                    form.descripcion = $event.substr(0, length)
                                                                    " :maxlength="length" rows="6" max-rows="10"
                                                                :state="errors.length > 0 ? false : null"></b-form-textarea>
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col ms="6" md="6" lg="4" xl="4">
                                                    <b-form-group label="Frente">
                                                        <b-input-group append="m">
                                                            <b-form-input min="0" oninput="validity.valid||(value='');"
                                                                type="number" v-model="form.frente"></b-form-input>
                                                        </b-input-group>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col ms="6" md="6" lg="4" xl="4">
                                                    <b-form-group label="Fondo">
                                                        <b-input-group append="m">
                                                            <b-form-input min="0" oninput="validity.valid||(value='');"
                                                                type="number" v-model="form.fondo"></b-form-input>
                                                        </b-input-group>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col ms="6" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Área del Lote"
                                                        rules="required">
                                                        <b-form-group label="Área del Lote" class="required">
                                                            <b-input-group append="m²">
                                                                <b-form-input min="0" oninput="validity.valid||(value='');"
                                                                    type="number" v-model="form.area_lote"
                                                                    :state="errors.length > 0 ? false : null" />
                                                            </b-input-group>
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="6" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Área Construida"
                                                        rules="required">
                                                        <b-form-group label="Área Construida" class="required">
                                                            <b-input-group append="m²">
                                                                <b-form-input min="0" oninput="validity.valid||(value='');"
                                                                    type="number" v-model="form.area_contruida"
                                                                    :state="errors.length > 0 ? false : null" />
                                                            </b-input-group>
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="6" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Área Total"
                                                        rules="required">
                                                        <b-form-group label="Área Total" class="required">
                                                            <b-input-group append="m²">
                                                                <b-form-input min="0" oninput="validity.valid||(value='');"
                                                                    type="number" v-model="form.area_total"
                                                                    :state="errors.length > 0 ? false : null" />
                                                            </b-input-group>
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col ms="6" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Habitaciones"
                                                        rules="required">
                                                        <b-form-group label="Habitaciones" class="required">
                                                            <b-form-input min="0" oninput="validity.valid||(value='');"
                                                                type="number" v-model="form.habitaciones"
                                                                :state="errors.length > 0 ? false : null" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="6" md="6" lg="4" xl="4">
                                                    <ValidationProvider v-slot="{ errors }" name="Baños" rules="required">
                                                        <b-form-group label="Baños" class="required">
                                                            <b-form-input min="0" oninput="validity.valid||(value='');"
                                                                type="number" v-model="form.banos"
                                                                :state="errors.length > 0 ? false : null" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="6" md="6" lg="4" xl="4" v-if="validatetTypeProperty()">
                                                    <ValidationProvider v-slot="{ errors }" name="Piso" rules="required">
                                                        <b-form-group label="Ubicacion en piso" class="required">
                                                            <b-form-input min="1" oninput="validity.valid||(value='');"
                                                                type="number" v-model="form.floor_location"
                                                                :state="errors.length > 0 ? false : null" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="6" md="6" lg="4" xl="4" v-else>
                                                    <ValidationProvider v-slot="{ errors }" name="Niveles" rules="required">
                                                        <b-form-group label="Cantidad Niveles" class="required">
                                                            <b-form-input min="1" oninput="validity.valid||(value='');"
                                                                type="number" v-model="form.pisos"
                                                                :state="errors.length > 0 ? false : null" />
                                                            <small class="text-danger">{{ errors[0] }}</small>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col ms="6" md="6" lg="4" xl="4">
                                                    <b-form-group label="Parqueaderos">
                                                        <b-form-input min="0" oninput="validity.valid||(value='');"
                                                            type="number" v-model="form.cantidad_parqueadero" />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col ms="6" md="6" lg="4" xl="4">
                                                    <b-form-group label="Tipo de parqueadero">
                                                        <v-select autocomplete="off" v-model="form.parqueadero" label="tipo"
                                                            :options="storeConfig.parqueadero_type"
                                                            :reduce="(type) => type.id" />
                                                    </b-form-group>
                                                </b-col>
                                            </b-row>
                                        </div>
                                        <div class="card-body">
                                            <b-row>
                                                <b-col>
                                                    <h3 class="sub-title-collapse">Caracteristicas Inmueble</h3>
                                                </b-col>
                                            </b-row>
                                            <app-collapse accordion>
                                                <app-collapse-item :title="feature.nameMayus"
                                                    v-for="(feature, index) in arrayFeatures" :key="index"
                                                    sizeTitle="0.9rem">
                                                    <div class="card-body">
                                                        <!-- <b-row>
                              <b-col>
                                <h3 class="sub-title-collapse">
                                  {{ feature.name }}
                                </h3>
                              </b-col>
                            </b-row> -->
                                                        <b-row>
                                                            <b-col>
                                                                <!-- class="required" :state="!(errors.length > 0)" -->
                                                                <b-form-checkbox @change="
                                                                    toggle(
                                                                        $event,
                                                                        storeConfig[feature.namePath],
                                                                        feature.namePath
                                                                    )
                                                                    " v-model="allCheck[feature.namePath].all" :indeterminate="allCheck[feature.namePath].indeterminate
        " class="mb-2">
                                                                    <b>{{
                                                                        allCheck[feature.namePath].all
                                                                        ? "Deseleccionar todo"
                                                                        : "Seleccionar todo"
                                                                    }}</b>
                                                                </b-form-checkbox>
                                                                <ValidationProvider
                                                                    v-slot="{ errors, invalid, failed, valid }"
                                                                    :name="feature.name">
                                                                    <b-form-group class="mb-0 check-list">
                                                                        <b-form-checkbox-group :name="feature.namePath"
                                                                            v-model="form[feature.namePath]" stacked
                                                                            :state="errors.length > 0 ? false : null">
                                                                            <b-form-checkbox :name="feature.namePath"
                                                                                v-for="item in storeConfig[feature.namePath]"
                                                                                :key="item.id"
                                                                                :value="`{&quot;id&quot;:${item.id}}`">
                                                                                {{ item.texto }}
                                                                            </b-form-checkbox>
                                                                        </b-form-checkbox-group>
                                                                    </b-form-group>
                                                                </ValidationProvider>
                                                            </b-col>
                                                        </b-row>
                                                    </div>
                                                </app-collapse-item>
                                            </app-collapse>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col ms="6" md="6" lg="4" xl="4">
                                    <div class="card mb-2">
                                        <div class="card-header p-0" :style="!estado_propietario
                                                ? { borderRadius: 'calc(0.428rem - 1px)' }
                                                : ''
                                            ">
                                            <label for="estado_propietario" class="mb-0 w-100 cursor-pointer text-reset">
                                                <h2 class="d-flex align-items-center w-100">
                                                    <span>Propietario</span>
                                                    <b-form-checkbox id="estado_propietario" v-model="estado_propietario"
                                                        name="estado_propietario" class="custom-control-info ml-auto"
                                                        :style="{ paddingLeft: '18px' }" />
                                                </h2>
                                            </label>
                                        </div>
                                        <div v-if="estado_propietario && propietario != null" class="card-body">
                                            <b-row>
                                                <b-col ms="12" md="12" lg="12" xl="12">
                                                    <ValidationProvider v-slot="{ errors }" rules="required">
                                                        <b-form-group label="Nombre completo" class="required">
                                                            <b-form-input id="primer_nombre" name="primer_nombre"
                                                                v-model="propietario.primer_nombre" type="text"
                                                                :state="errors.length > 0 ? false : null" />
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>

                                                <b-col cols="12">
                                                    <ValidationProvider v-slot="{ errors }" rules="required">
                                                        <b-form-group label="Correo electronico" class="required">
                                                            <b-form-input id="email" name="email"
                                                                v-model="propietario.email" type="text"
                                                                :state="errors.length > 0 ? false : null" />
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col cols="12">
                                                    <ValidationProvider v-slot="{ errors }" rules="required">
                                                        <b-form-group label="Celular" class="required"
                                                            :state="!(errors.length > 0)">
                                                            <vue-phone-number-input id="celular" :error="errors.length > 0"
                                                                default-country-code="CO" v-model="propietario.celular"
                                                                :translations="{
                                                                    countrySelectorLabel: 'Codigo país',
                                                                    countrySelectorError: 'Elije un país',
                                                                    phoneNumberLabel: 'Celular',
                                                                    example: 'Ejemplo :',
                                                                }" @update="results = $event" @input="(a) => {
        if (wame) propietario.celular = a;
    }
    " />
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <!-- <b-col cols="12">
                          <b-form-group label="WhatsApp">
                            <vue-phone-number-input
                              id="telefono_fijo"
                              default-country-code="CO"
                              v-model="propietario.telefono_fijo"
                              :translations="{
                                countrySelectorLabel: 'Codigo país',
                                countrySelectorError: 'Elije un país',
                                phoneNumberLabel: 'WhatsApp',
                                example: 'Ejemplo :',
                              }"
                              @update="results = $event"
                              :disabled="wame"
                            />
                          </b-form-group>

                          <b-form-checkbox
                            id="wame"
                            v-model="wame"
                            name="wame"
                            class="mb-0 mt-1"
                          >
                            Usar el mismo número de Celular
                          </b-form-checkbox>
                        </b-col> -->
                                            </b-row>
                                        </div>
                                    </div>

                                    <div class="card mb-2">
                                        <div class="card-header p-0">
                                            <h2>Documentos</h2>
                                        </div>
                                        <div class="card-body">
                                            <b-row>
                                                <b-col cols="12">
                                                    <!-- CEDULA -->
                                                    <b-form-group v-for="(document, i) in documents.slice(0, 1)"
                                                        :key="document.id" :label="document.title">
                                                        <b-input-group>
                                                            <b-form-file @change="
                                                                setFilePDF($event, (value) => {
                                                                    form[document.parameter] = value;
                                                                })
                                                                " :id="document.id" :placeholder="filePDF(form[document.parameter])
            ? namePDF(form[document.parameter])
            : `Clic para buscar tu ${document.name} en PDF`
        " :browse-text="filePDF(form[document.parameter]) ? 'Remplazar' : 'Buscar'
        " />
                                                            <b-input-group-append v-if="filePDF(form[document.parameter])">
                                                                <b-button
                                                                    @click="downloadPDF(form[document.parameter], document.name)"
                                                                    v-b-tooltip.hover title="Descargar" class="btn-pdf"
                                                                    variant="success">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 512 512">
                                                                        <path
                                                                            d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
                                                                    </svg>
                                                                </b-button>
                                                                <b-button
                                                                    @click="viewPDF(form[document.parameter], document.name)"
                                                                    v-b-tooltip.hover title="Ver" class="btn-pdf"
                                                                    variant="info">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 384 512">
                                                                        <path
                                                                            d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256z" />
                                                                    </svg>
                                                                </b-button>
                                                            </b-input-group-append>
                                                        </b-input-group>
                                                        <b-alert variant="danger" :show="!document.typeIsValid"
                                                            class="mb-0">
                                                            <div class="alert-body">
                                                                <feather-icon icon="InfoIcon" class="mr-50" />
                                                                Asegurate que la extension del archivo sea ('.pdf'/'.PDF')
                                                            </div>
                                                        </b-alert>
                                                    </b-form-group>
                                                    <b-form-group v-for="(document, i) in documents.slice(1,)"
                                                        :key="document.id" :label="document.title">
                                                        <b-input-group>
                                                            <b-form-file @change="
                                                                setFilePDF($event, (value) => {
                                                                    form[document.parameter] = value;
                                                                })
                                                                " :id="document.id" :placeholder="filePDF(form[document.parameter])
            ? namePDF(form[document.parameter])
            : `Clic para buscar tu ${document.name} en PDF`
        " :browse-text="filePDF(form[document.parameter]) ? 'Remplazar' : 'Buscar'
        " />
                                                            <b-input-group-append v-if="filePDF(form[document.parameter])">
                                                                <b-button
                                                                    @click="downloadPDF(form[document.parameter], document.name)"
                                                                    v-b-tooltip.hover title="Descargar" class="btn-pdf"
                                                                    variant="success">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 512 512">
                                                                        <path
                                                                            d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
                                                                    </svg>
                                                                </b-button>
                                                                <b-button
                                                                    @click="viewPDF(form[document.parameter], document.name)"
                                                                    v-b-tooltip.hover title="Ver" class="btn-pdf"
                                                                    variant="info">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 384 512">
                                                                        <path
                                                                            d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256z" />
                                                                    </svg>
                                                                </b-button>
                                                            </b-input-group-append>
                                                        </b-input-group>
                                                        <b-alert variant="danger" :show="!document.typeIsValid"
                                                            class="mb-0">
                                                            <div class="alert-body">
                                                                <feather-icon icon="InfoIcon" class="mr-50" />
                                                                Asegurate que la extension del archivo sea ('.pdf'/'.PDF')
                                                            </div>
                                                        </b-alert>
                                                    </b-form-group>
                                                    <!-- <b-form-group label="Cedula (PDF)">
                            <b-input-group>
                              <b-form-file
                                @change="
                                  setFilePDF($event, (value) => {
                                    form.cedula = value;
                                  })
                                "
                                id="cedula"
                                :placeholder="
                                  filePDF(form.cedula)
                                    ? namePDF(form.cedula)
                                    : 'Clic para buscar tu Cedula en PDF'
                                "
                                :browse-text="
                                  filePDF(form.cedula) ? 'Remplazar' : 'Buscar'
                                "
                              />
                              <b-input-group-append v-if="filePDF(form.cedula)">
                                <b-button
                                  @click="downloadPDF(form.cedula, 'cedula')"
                                  v-b-tooltip.hover
                                  title="Descargar"
                                  class="btn-pdf"
                                  variant="success"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                  >
                                    <path
                                      d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z"
                                    />
                                  </svg>
                                </b-button>
                                <b-button
                                  @click="viewPDF(form.cedula, 'cedula')"
                                  v-b-tooltip.hover
                                  title="Ver"
                                  class="btn-pdf"
                                  variant="info"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                  >
                                    <path
                                      d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256z"
                                    />
                                  </svg>
                                </b-button>
                              </b-input-group-append>
                            </b-input-group>
                            <b-alert
                              v-height-fade.appear
                              variant="danger"
                              :show="!typeIsValid"
                              class="mb-0"
                            >
                              <div class="alert-body">
                                <feather-icon
                                  icon="InfoIcon"
                                  class="mr-50"
                                />
                                Asegurate que la extension del archivo sea ('.pdf'/'.PDF')
                              </div>
                            </b-alert>
                          </b-form-group> -->
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                            <div v-if="data.failed" class="list-error">
                                <div class="alert alert-danger p-1 mb-0 flex-grow-1 text-center"
                                    :style="{ fontSize: '14px' }">
                                    <p>Uno o más campos obligatorios se encuentran vacios, Valida e intenta nuevamente. </p>
                                </div>
                            </div>
                        </ValidationObserver>
                    </tab-content>
                    <tab-content title="Ubicación" icon="feather icon-map-pin"
                        :before-change="() => wizardFormValidate('wizardFormUbicacion')">
                        <ValidationObserver v-slot="data" ref="wizardFormUbicacion">
                            <b-row>
                                <b-col cols="12">
                                    <div class="card mb-1">
                                        <div class="card-header p-0">
                                            <h2>Ubicación</h2>
                                        </div>
                                        <div class="card-body">
                                            <b-row>
                                                <b-col ms="12" md="6" lg="6" xl="6">
                                                    <b-row>
                                                        <b-col ms="12" md="6" lg="6" xl="6">
                                                            <ValidationProvider v-slot="{ errors }" name="País"
                                                                rules="required">
                                                                <b-form-group label="País" class="required"
                                                                    :state="!(errors.length > 0)">
                                                                    <v-select autocomplete="off"
                                                                        v-model="ubicaciones['pais_id'].value"
                                                                        @input="resetUbicacion('pais_id')" label="name"
                                                                        :options="storeConfig.country"
                                                                        :reduce="(type) => type.id" :clearable="false" />
                                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </b-col>
                                                        <b-col ms="12" md="6" lg="6" xl="6">
                                                            <ValidationProvider v-slot="{ errors }" name="Departamento"
                                                                rules="required">
                                                                <b-form-group label="Departamento" class="required"
                                                                    :state="!(errors.length > 0)">
                                                                    <v-select autocomplete="off"
                                                                        v-model="ubicaciones['estado_id'].value"
                                                                        @input="resetUbicacion('estado_id')" label="name"
                                                                        :options="ubicaciones['estado_id'].options"
                                                                        :reduce="(type) => type.id" :disabled="ubicaciones['estado_id'].options.length ==
                                                                            0
                                                                            " :clearable="false" />
                                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </b-col>
                                                        <b-col ms="12" md="6" lg="6" xl="6">
                                                            <ValidationProvider v-slot="{ errors }" name="Ciudad"
                                                                rules="required">
                                                                <b-form-group label="Ciudad" class="required"
                                                                    :state="!(errors.length > 0)">
                                                                    <v-select autocomplete="off"
                                                                        v-model="ubicaciones['ciudad_id'].value"
                                                                        @input="resetUbicacion('ciudad_id')" label="name"
                                                                        :options="ubicaciones['ciudad_id'].options"
                                                                        :reduce="(type) => type.id" :disabled="ubicaciones['ciudad_id'].options.length ==
                                                                            0
                                                                            " :clearable="false" />
                                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </b-col>
                                                    </b-row>
                                                    <b-row align-v="center">
                                                        <b-col ms="12" md="6" lg="6" xl="6">
                                                            <b-form-group label="Dirección" class="required">
                                                                <GmapAutocomplete @place_changed="setPlaceModalPropety"
                                                                    name="direccion" data-dismiss="modal-map"
                                                                    @input="setAddressModalPropety"
                                                                    class="form-control gmap-input modal-map"
                                                                    :value="form.direccion" :options="{
                                                                        fields: [
                                                                            'geometry',
                                                                            'formatted_address',
                                                                            'address_components',
                                                                        ],
                                                                    }">
                                                                </GmapAutocomplete>
                                                                <ValidationProvider v-slot="{ errors }" name="Dirección"
                                                                    rules="required">
                                                                    <b-form-input class="pointer-events-none"
                                                                        :style="{ color: 'transparent' }" name="direccion"
                                                                        v-model="form.direccion"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        type="text" />
                                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                                </ValidationProvider>
                                                            </b-form-group>
                                                        </b-col>
                                                        <b-col ms="12" md="6" lg="6" xl="6" :style="{ width: '10em' }">
                                                            <ValidationProvider v-slot="{ errors }" name="Latitud"
                                                                rules="required">
                                                                <b-form-group label="Latitud" class="required">
                                                                    <b-form-input id="latitud" name="latitud"
                                                                        v-model="form.latitud"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        type="text" />
                                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </b-col>
                                                        <b-col cols="auto" class="p-0 pt-1"> - </b-col>
                                                        <b-col ms="12" md="6" lg="6" xl="6" :style="{ width: '10em' }">
                                                            <ValidationProvider v-slot="{ errors }" name="Longitud"
                                                                rules="required">
                                                                <b-form-group label="Longitud" class="required">
                                                                    <b-form-input id="longitud" name="longitud"
                                                                        v-model="form.longitud"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        type="text" />
                                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </b-col>
                                                        <b-col cols="12">
                                                            <div class="alert alert-warning p-1 text-center">
                                                                En caso de que tu dirección no este registrada,
                                                                <b>ubicala dando clic en el mapa.</b>
                                                            </div>
                                                        </b-col>
                                                    </b-row>
                                                    <b-row>
                                                        <b-col ms="12" md="6" lg="6" xl="6">
                                                            <b-form-group label="Zonas">
                                                                <v-select autocomplete="off"
                                                                    v-model="ubicaciones['zona_id'].value"
                                                                    @input="resetUbicacion('zona_id')" label="name"
                                                                    :options="ubicaciones['zona_id'].options"
                                                                    :reduce="(type) => type.id" :disabled="ubicaciones['zona_id'].options.length == 0
                                                                        " :clearable="false" />
                                                            </b-form-group>
                                                        </b-col>
                                                        <b-col ms="12" md="6" lg="6" xl="6">
                                                            <b-form-group label="Barrios">
                                                                <v-select autocomplete="off"
                                                                    v-model="ubicaciones['barrio_id'].value" label="name"
                                                                    :options="ubicaciones['barrio_id'].options"
                                                                    :reduce="(type) => type.id" :disabled="ubicaciones['barrio_id'].options.length == 0
                                                                        " :clearable="false" />
                                                            </b-form-group>
                                                        </b-col>
                                                        <b-col cols="12">
                                                            <div class="alert alert-danger p-1 text-left mb-0">
                                                                Los campos <b>'Zonas'</b> y <b>'Barrios'</b> son
                                                                requeridos para la sinconizacion en los portales
                                                                inmobiliarios.
                                                            </div>
                                                        </b-col>
                                                    </b-row>
                                                </b-col>
                                                <b-col>
                                                    <GmapMap v-if="map.show" @click="clickMap"
                                                        :center="{ lat: Number(form.latitud), lng: Number(form.longitud) }"
                                                        :zoom="15" style="width: 100%; height: 462px">
                                                        <GmapMarker :key="index" v-for="(m, index) in map.markers"
                                                            :position="m.position" @click="map.center = m.position" />
                                                    </GmapMap>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                            <div v-if="data.failed" class="list-error">
                                <div class="alert alert-danger p-1 mb-0 flex-grow-1 text-center"
                                    :style="{ fontSize: '14px' }">
                                    <b>Uno o más campos obligatorios se encuentran vacios, Valida e intenta nuevamente.</b>
                                </div>
                            </div>
                        </ValidationObserver>
                    </tab-content>
                    <tab-content title="Multimedia" icon="feather icon-image"
                        :before-change="() => wizardFormValidate('wizardFormMedia')"
                        v-if="prop.origin != 'TRANSACTION'"><b-col>
                            <ValidationObserver ref="wizardFormMedia">
                                <b-row>
                                    <b-col>
                                        <div class="card mb-2">
                                            <div class="card-header p-0">
                                                <h2>Medios</h2>
                                            </div>
                                            <div class="card-body">
                                                <b-row>
                                                    <b-col cols="12">
                                                        <b-form-group label="Cargar imagenes" class="required">
                                                            <p class="text_max">Cantidad maxima: 30</p>

                                                            <input class="d-none" type="file" multiple id="imagenes"
                                                                @change="uploadImages" accept="image/*" />
                                                            <ValidationProvider v-slot="{ errors }" name="images"
                                                                rules="required">
                                                                <input type="hidden" name="images"
                                                                    v-model="form.inmueble_imagenes" />
                                                                <draggable :list="form.inmueble_imagenes"
                                                                    class="contentThumbnails mb-1" @end="orderImages">
                                                                    <div class="thumb cursor-move"
                                                                        v-for="(item, i) in form.inmueble_imagenes"
                                                                        :key="i">
                                                                        <b-overlay :show="item.overlay" rounded="sm"
                                                                            class="m-auto" />
                                                                        <div v-if="!item.overlay">
                                                                            <b-button class="btnDeleteImage"
                                                                                variant="danger" @click="deleteImage(item)"
                                                                                :disabled="btnDelete">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 448 512">
                                                                                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                                    <path
                                                                                        d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                                                                                </svg>
                                                                            </b-button>
                                                                            <b-overlay :show="item.overlay" rounded="sm">
                                                                                <cld-image v-if="item.url.indexOf('cloudinary') != -1
                                                                                    " :public-id="item.url | urlImages">
                                                                                    <cld-transformation gravity="center"
                                                                                        height="250" width="250"
                                                                                        crop="thumb" />
                                                                                </cld-image>
                                                                                <div v-else class="imageStorage">
                                                                                    <img :src="imgValidateURL(item.url)"
                                                                                        class="image-card" alt="" />
                                                                                </div>
                                                                            </b-overlay>
                                                                        </div>
                                                                    </div>
                                                                    <label class="btnUpload" for="imagenes"
                                                                        v-if="form.inmueble_imagenes.length < 30">
                                                                        <span class="wrapperUpload">
                                                                            <span class="contentUpload">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 512 512">
                                                                                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                                    <path
                                                                                        d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z" />
                                                                                </svg>
                                                                            </span>
                                                                        </span>
                                                                    </label>
                                                                </draggable>
                                                                <b-form-invalid-feedback :state="!(errors.length > 0)">
                                                                    Debes cargar minimo una Imagen
                                                                </b-form-invalid-feedback>
                                                            </ValidationProvider>
                                                        </b-form-group>
                                                    </b-col>
                                                </b-row>
                                                <b-row>
                                                    <b-col cols="12">
                                                        <b-form-group label="YouTube">
                                                            <b-form-input id="url_video" name="url_video"
                                                                v-model="form.url_video" type="text" />
                                                        </b-form-group>
                                                        <div v-if="form.url_video" class="iframe-video">
                                                            <div v-if="form.url_video.indexOf('youtu') != -1"
                                                                class="iframe-wrapper mt-1">
                                                                <iframe width="640" height="360"
                                                                    :src="form.url_video | urlYoutube"
                                                                    title="YouTube video player" frameborder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowfullscreen></iframe>
                                                            </div>
                                                        </div>
                                                    </b-col>
                                                </b-row>
                                                <b-row>
                                                    <b-col cols="12">
                                                        <b-form-group label="VR Tour" class="mb-0">
                                                            <b-form-input id="video_3d" name="video_3d"
                                                                v-model="form.video_3d" type="text" />
                                                        </b-form-group>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                            </ValidationObserver>
                        </b-col>
                    </tab-content>
                    <template slot="footer" slot-scope="props">
                        <div v-if="prop.type == 'editar'">
                            <b-button variant="success" @click="wizardFormValidate(props.activeTabIndex)"
                                :disabled="btnState">
                                Guardar
                            </b-button>
                        </div>
                        <div v-else>
                            <div class="wizard-footer-left">
                                <b-button v-if="props.activeTabIndex > 0" @click="props.prevTab()" variant="outline-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" :style="{
                                        width: '1.25em',
                                        height: '1em',
                                        margin: '-0.5em',
                                        marginRight: '0.8rem',
                                        fontSize: '15px',
                                    }" fill="currentColor">
                                        <path
                                            d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
                                    </svg>
                                    <span class="align-middle"><b>Atras</b></span>
                                </b-button>
                            </div>
                            <div class="wizard-footer-right">
                                <b-button @click="
                                    !props.isLastStep
                                        ? props.nextTab()
                                        : wizardFormValidate(props.activeTabIndex)
                                    " :variant="!props.isLastStep ? 'primary' : 'success'">
                                    <span class="align-middle">{{
                                        !props.isLastStep ? "Siguiente" : "Agregar Inmueble"
                                    }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" :style="{
                                            width: '1.25em',
                                            height: '1em',
                                            margin: '-0.5em',
                                            marginLeft: '0.8rem',
                                            fontSize: '15px',
                                        }" fill="currentColor">
                                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                        <path
                                            d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
                                    </svg>
                                </b-button>
                            </div>
                        </div>
                    </template>
                </form-wizard>
            </b-col>
            <transition name="fade">
                <v-modal v-if="modalStateProperty" @close="modalStateProperty = false"
                    titulo="Cambiar estado de poblicación" footer>
                    <component is="modalChangeStateProperty" :inmueble="prop.inmueble" @closeModal="closeModal" />
                </v-modal>
            </transition>
        </b-row>
    </div>
</template>

<script>
import { FormWizard, TabContent, WizardButton } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import VInput from "@/views/componente/vInput";

import {
    ValidationProvider,
    ValidationObserver,
    setInteractionMode,
    extend,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";

import vSelect from "vue-select";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import draggable from "vuedraggable";
import Cleave from "vue-cleave-component";

import { onUnmounted } from "@vue/composition-api";
import { imgValidateURL } from "@/libs/helpers";

import { inject, watch, reactive, ref } from "@vue/composition-api";
import store from "@/store";
import VModal from "@/views/componente/vModal";

import modalChangeStateProperty from "@/views/apps/inmuebles/components/modalChangeStateProperty.vue";


//DESPLEGABLES
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'

export default {

    name: "FormInmueble",
    components: {
        ValidationProvider,
        ValidationObserver,
        vSelect,
        FormWizard,
        TabContent,
        WizardButton,
        draggable,
        Cleave,
        VModal,
        VInput,
        modalChangeStateProperty,
        AppCollapse,
        AppCollapseItem
    },
    props: {
        prop: Object,
    },
    data() {
        setInteractionMode("eager");
        Object.keys(rules).forEach((rule) => {
            extend(rule, rules[rule]);
        });

        return {
            modalStateProperty: false,
            isActive: false,
            imgValidateURL,
            id_temporal: Date.now(),
            length: 500,
            selected: false,
            form: {
                id: null,
                slug: null,
                titulo_inmueble: null,
                estado_publicacion: 2,
                segmento_mercado: null,
                antiguedad: null,
                ano_construcion: null,
                matricula_inmobiliaria: null,
                tipo_inmueble: null,
                state_fisico: null,
                estrato: null,
                tipo_negocio: null,
                rangue_price: null,
                selling_price: null,
                tipo_precio: null,
                rental_price: null,
                tiempo_alquiler: null,
                precio_administracion: null,
                periodo_admon: null,
                descripcion: "",
                frente: null,
                fondo: null,
                area_lote: null,
                area_contruida: null,
                area_total: null,
                habitaciones: null,
                banos: null,
                pisos: null,
                floor_location: null,
                cantidad_parqueadero: null,
                parqueadero: null,
                caracteristicas_internas: [],
                caracteristicas_externas: [],
                caracteristicas_tipo_fachada: [],
                caracteristicas_estado_construcion: [],
                caracteristicas_clasificacion: [],
                caracteristicas_orientacion: [],
                caracteristicas_ubicacion: [],
                caracteristicas_tarifas_adicionales_servicios_publico: [],
                inmueble_imagenes: [],
                url_video: null,
                video_3d: null,
                direccion: null,
                pais_id: null,
                estado_id: null,
                ciudad_id: null,
                zona_id: null,
                barrio_id: null,
                latitud: null,
                longitud: null,
                cedula: null,
                certificado_tradicion: null,
                predial: null,
                contract_brokerage: null,
                public_portal_inmobiliaria: false
            },
            inValideDireccion: false,
            propietario: {
                primer_nombre: null,
                primer_apellido: null,
                email: null,
                celular: null,
                telefono_fijo: null,
            },
            currentPlace: null,
            population: 8405837,
            map: {
                markers: [{ position: { lat: 3.4516467, lng: -76.5319854 } }],
                center: { lat: 3.4516467, lng: -76.5319854 },
                show: false,
            },

            ubicaciones: {
                pais_id: {
                    value: null,
                    props: {
                        api: "appLocalidades/getStates",
                        name: "Departamentos",
                    },
                },
                estado_id: {
                    value: null,
                    options: [],
                    props: {
                        api: "appLocalidades/getCiudades",
                        name: "Ciudades",
                    },
                },
                ciudad_id: {
                    value: null,
                    options: [],
                    props: {
                        api: "appLocalidades/getZona",
                        name: "Zonas",
                    },
                },
                zona_id: {
                    value: null,
                    options: [],
                    props: {
                        api: "appLocalidades/getBarrio",
                        name: "Barrios",
                    },
                },
                barrio_id: {
                    value: null,
                    options: [],
                },
            },
            estado_propietario: false,
            documents: [
                {
                    id: 'cedula',
                    title: 'Cedula (PDF)',
                    name: 'Cedula',
                    parameter: 'cedula',
                    typeIsValid: true,
                },
                {
                    id: 'tradicion',
                    title: 'Certificado de tradición (PDF)',
                    name: 'Certificado de tradición',
                    parameter: 'certificado_tradicion',
                    typeIsValid: true,
                },
                {
                    id: 'predial',
                    title: 'Predial (PDF)',
                    name: 'Predial',
                    parameter: 'predial',
                    typeIsValid: true,
                },
                {
                    id: 'contract_brokerage',
                    title: 'Contrato de corretaje (PDF)',
                    name: 'Contrato de corretaje',
                    parameter: 'contract_brokerage',
                    typeIsValid: true,
                },
            ],

            rangue_price: [],
            wame: false,
            btnState: false,
            btnDelete: false,
            numberFormat: {
                numeralPositiveOnly: true,
                numeral: true,
                numeralDecimalMark: ",",
                delimiter: ".",
            },

            allCheck: {
                caracteristicas_internas: {
                    all: false,
                    indeterminate: false,
                },
                caracteristicas_externas: {
                    all: false,
                    indeterminate: false,
                },
                caracteristicas_tipo_fachada: {
                    all: false,
                    indeterminate: false,
                },
                caracteristicas_estado_construcion: {
                    all: false,
                    indeterminate: false,
                },
                caracteristicas_clasificacion: {
                    all: false,
                    indeterminate: false,
                },
                caracteristicas_orientacion: {
                    all: false,
                    indeterminate: false,
                },
                caracteristicas_ubicacion: {
                    all: false,
                    indeterminate: false,
                },
                caracteristicas_tarifas_adicionales_servicios_publico: {
                    all: false,
                    indeterminate: false,
                },
            },
            arrayFeatures: [
                {
                    id: 1,
                    namePath: 'caracteristicas_internas',
                    name: 'Características internas',
                    nameMayus: 'INTERNAS'
                },
                {
                    id: 2,
                    namePath: 'caracteristicas_externas',
                    name: 'Características externas',
                    nameMayus: 'EXTERNAS'
                },
                {
                    id: 3,
                    namePath: 'caracteristicas_estado_construcion',
                    name: 'Características estado construccion',
                    nameMayus: 'ESTADO CONSTRUCCIÓN'
                },
                {
                    id: 4,
                    namePath: 'caracteristicas_tipo_fachada',
                    name: 'Características tipo fachada',
                    nameMayus: 'TIPO FACHADA'
                },
                {
                    id: 5,
                    namePath: 'caracteristicas_clasificacion',
                    name: 'Características clasificación',
                    nameMayus: 'CLASIFICACIÓN PROPIEDAD'
                },
                {
                    id: 6,
                    namePath: 'caracteristicas_orientacion',
                    name: 'Características orientación',
                    nameMayus: 'ORIENTACIÓN ZONA'
                },
                {
                    id: 7,
                    namePath: 'caracteristicas_ubicacion',
                    name: 'Características ubicación',
                    nameMayus: 'UBICACIÓN SITIOS CERCANOS'
                },
                {
                    id: 8,
                    namePath: 'caracteristicas_tarifas_adicionales_servicios_publico',
                    name: 'Características tarifas adicionales',
                    nameMayus: 'TARIFAS ADICIONALES'
                }

            ]
        };
    },
    computed: {
        storeConfig() {
            return this.$store.state.appConfiguracion.options;
        },
        selects() {
            return this.$store.state.apiInmueblePrivate.options;
        },
        agentSelect() {
            return this.$store.state.appAgents.selectAgent;
        },
        propsWizardForm() {
            return {
                color: "#7367F0",
                title: null,
                subtitle: null,
                layout: "horizontal",
                backButtonText: "Atras",
                nextButtonText: "Siguiente",
                finishButtonText:
                    this.prop.type == "editar" ? "Guardar inmueble" : "Agregar inmueble",
                class: "wizard-vertical mt-n1",
            };
        },
    },
    mounted() {
        this.watchCheckAll();
        Object.assign(this.map, { show: true });

        this.watchUbicaciones(this.ubicaciones);

        this.$watch(
            () => this.form.tipo_negocio,
            (a) => {
                this.rangue_price = this.storeConfig.rangue_price.filter((item) =>
                    a == 1 && item.type == "Venta"
                        ? true
                        : a == 2 && item.type == "Alquiler"
                            ? true
                            : a == 3
                                ? true
                                : false
                );
            }
        );

        let { type, inmueble } = this.prop;
        if (type == "editar") {
            this.setInmueble(inmueble);
            this.$refs["wizardForm"].activateAll();
        }
        // function syncCedula(payload){
        //   if(payload){
        //     return true
        //   }else{
        //     return false
        //   }
        // }
        // this.validateCedula =syncCedula(this.form['cedula'])
    },
    watch: {
        wame(a) {
            if (a) this.propietario.telefono_fijo = this.propietario.celular;
        },
        images(a) {
            if (a.length === 0) this.$parent.closeState(false);
        },
    },
    filters: {
        urlYoutube(value) {
            let _url = value;
            _url = _url.split("&");
            _url = _url.shift();

            let _variant = ["youtu.be/", "youtube.com/watch?v="];

            for (let v of _variant) {
                if (_url.indexOf(v) != -1) _url = _url.replace(v, "youtube.com/embed/");
            }

            return _url;
        },
    },
    methods: {
        closeModal() {
            this.modalStateProperty = false;
            this.$emit("reloadPage")
            setTimeout(() => {
                this.$emit("closeModalInmueble")
            }, 200);
        },
        openModalStateProperty() {
            this.modalStateProperty = true;
        },
        validatetTypeProperty() {
            const filterType = this.storeConfig.property_type.find((item) => item.id === this.form.tipo_inmueble)
            let property = ['Apartamento', 'Apartaestudios', 'Oficina'];
            if (filterType != null) {
                const res = property.some((element) => element === filterType.tipo)
                return res;
            }
            return false;
        },
        campoCedula(campo, clase) {
            if (campo === 'cedula') {
                return clase
            }
        },
        showToast(text) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: 'Falta campo cedula',
                    icon: 'BellIcon',
                    text,
                    variant: 'danger',
                },
            })
        },

        setInmueble(inmueble) {
            for (let prop in inmueble) {
                switch (prop) {
                    case "propietario":
                        this.propietario = inmueble[prop];
                        break;
                    case "tipo_negocio":
                        this.form[prop] = inmueble[prop].id;
                        break;
                    case "pais_id":
                    case "estado_id":
                    case "ciudad_id":
                    case "zona_id":
                    case "barrio_id":
                        this.ubicaciones[prop].value = inmueble[prop]
                            ? inmueble[prop].id
                            : null;
                        break;
                    case "estado_publicacion":
                        this.form[prop] = inmueble["state_inmueble"].id;
                        break;
                    case "inmueble_imagenes":
                        this.form[prop] = inmueble["inmueble_imagenes"];
                        break;
                    case "caracteristicas_internas":
                    case "caracteristicas_externas":
                    case "caracteristicas_tipo_fachada":
                    case 'caracteristicas_estado_construcion':
                    case 'caracteristicas_clasificacion':
                    case 'caracteristicas_orientacion':
                    case 'caracteristicas_ubicacion':
                    case 'caracteristicas_tarifas_adicionales_servicios_publico':
                        this.form[prop] = inmueble[prop].map((item) => `{"id":${item.id}}`);
                        break;
                    default:
                        this.form[prop] =
                            typeof inmueble[prop] === "object" && inmueble[prop] !== null
                                ? inmueble[prop].id
                                : !Number(inmueble[prop])
                                    ? inmueble[prop]
                                    : Number(inmueble[prop]);
                }
            }

            if (inmueble.latitud != null) {
                this.map.markers[0].position.lat = parseFloat(inmueble.latitud);
                this.map.markers[0].position.lng = parseFloat(inmueble.longitud);
            }
        },
        watchCheckAll() {
            for (let prop in this.allCheck) {
                this.$watch(
                    () => this.form[prop],
                    (a) => {
                        let all, indeterminate;
                        if (a.length === 0) {
                            all = false;
                            indeterminate = false;
                        } else if (a.length === this.storeConfig[prop].length) {
                            all = true;
                            indeterminate = false;
                        } else {
                            all = false;
                            indeterminate = true;
                        }
                        Object.assign(this.allCheck[prop], { all, indeterminate });
                    }
                );
            }
        },
        watchUbicaciones(elements) {
            for (let prop in elements) {
                this.$watch(
                    () => elements[prop].value,
                    (codigo) => {
                        Object.assign(this.form, { [prop]: codigo });

                        let keys = Object.keys(elements);
                        if (prop != keys[keys.length - 1] && codigo != null) {
                            let index = keys.indexOf(prop);
                            this.getUbicacion(elements, {
                                codigo,
                                prop: keys[index + 1],
                                api: elements[prop].props.api,
                                name: elements[prop].props.name,
                            });
                        }
                    }
                );
            }
        },
        jsonStrgfy(value) {
            return JSON.stringify(value);
        },
        toggle(event, options, checked) {
            this.form[checked] = event
                ? options.map((item) => `{"id":${item.id}}`)
                : [];
        },
        filterRangePrice() {
            Object.assign(this.form, { rangue_price: null });
        },
        resetUbicacion(prop) {
            let keys = Object.keys(this.ubicaciones),
                index = keys.indexOf(prop);
            keys.shift();
            keys.splice(0, index);
            for (let key of keys) {
                Object.assign(this.form, { [key]: null });
                Object.assign(this.options, { [key]: [] });
                Object.assign(this.ubicaciones[key], { value: null });
            }
        },
        namePDF(text) {
            let _name = text.split("/");
            _name = _name.pop();
            return _name;
        },
        setFilePDF(event, callback) {
            let value = event.target.files[0];
            const currentInput = this.documents.filter(document => document.id == event.target.id)[0];

            let filename = value.name;
            let extension = filename.replace(/^.*\./, '');
            if (extension == filename)
                extension = '';
            else {
                extension = extension.toLowerCase();
                if (extension == 'pdf') {
                    currentInput.typeIsValid = true;
                    callback(value);
                } else {
                    currentInput.typeIsValid = false;
                    event.target.value = '';
                }
            }
        },
        filePDF(value) {
            if (typeof value == "string") {
                if (value.indexOf(".pdf")) return true;
            }
            return false;
        },
        downloadPDF(data, type) {
            this.$store
                .dispatch("appInmueble/downloadPdf", { data: data, type: type })
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        viewPDF(data, type) {
            this.$store
                .dispatch("appInmueble/showPDF", { data: data, type: type })
                .then((response) => {
                    let _link = response;
                    _link.setAttribute("target", "_blank");
                    window.open(_link.click());
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async uploadImages(e) {
            let _files = e.target.files;

            if (this.form.inmueble_imagenes.length + _files.length > 30) {
                this.$swal({
                    icon: "error",
                    title: "Error",
                    text: "No puedes exceder la cantidad maxima de imagenes (Cantidad maxima: 30)",
                    showCloseButton: true,
                    customClass: {
                        confirmButton: "btn btn-danger",
                    },
                    confirmButtonText: "Ok",
                });
                return;
            }
            this.btnState = true;
            let _api = "api/auth/api-inmueble/add-image";
            if (this.prop.type == "agregar")
                _api = "api/auth/api-inmueble/add-image-temporal";

            for (let i = 0; i < _files.length; i++) {
                let formData = new FormData();
                formData.append(
                    "id",
                    this.prop.type == "agregar" ? this.id_temporal : this.form.id
                );
                formData.append("order", i);
                formData.append("files", _files[i]);

                this.form.inmueble_imagenes.unshift({ overlay: true });
                await this.$http
                    .post(_api, formData)
                    .then(async (response) => {
                        this.form.inmueble_imagenes.shift();
                        this.form.inmueble_imagenes = response.data.data;
                        this.btnState = false;
                    })
                    .catch((error) => {
                        this.btnState = false;
                        this.form.inmueble_imagenes.shift();
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Algo salio mal",
                                icon: "",
                                text: "Ha ocurrido un problema, intentalo mas tarde",
                                variant: "danger",
                            },
                        });
                    });

                // if (i == _files.length - 1) e.target.value = null;
            }
        },
        async deleteImage(image) {
            this.btnDelete = true;
            let formData = new FormData();
            formData.append("json", JSON.stringify(image));

            await this.$http
                .post("api/auth/api-inmueble/del-image", formData)
                .then((response) => {
                    this.form.inmueble_imagenes = this.form.inmueble_imagenes.filter(
                        (item) => {
                            if (image.id == item.id) return false;

                            return true;
                        }
                    );
                    this.btnDelete = false;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async orderImages(a) {
            for (let i = 0; i < this.form.inmueble_imagenes.length; i++) {
                this.form.inmueble_imagenes[i].order = i;
            }

            let _images = {
                codigo: this.prop.type == "agregar" ? this.id_temporal : this.form.id,
                imagenes: this.form.inmueble_imagenes,
            };

            await this.$http
                .post("/api/auth/api-inmueble/order-image", _images)
                .then()
                .catch((error) => {
                    console.error(error);
                });
        },

        slug(a) {
            let slug = a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            slug = slug.replace(/[^a-zA-Z0-9 ]/g, "");
            slug = slug.replace(/ /g, "-");
            this.form.slug = `${slug.toLowerCase().trim()}-${this.form.id}`;
        },
        /* == Start Validacion de Formulario == */
        async wizardFormValidate(ref) {
            let _validate =
                typeof ref == "string"
                    ? await this.$refs[ref].validate()
                    : await this.$refs["wizardForm"].$children[
                        ref
                    ].$children[0].validate();
            if (_validate && typeof ref == "number") {
                this.saveWizardForm();
            }
            return _validate;
        },
        async saveWizardForm() {
            this.overlay = true;
            await this.wizardFormComplete().then(() => {
                this.overlay = false;
            });
        },
        async wizardFormComplete() {
            this.btnState = true;
            let { type, origin } = this.prop;
            let formData = new FormData();

            if (type == "agregar") formData.append("id_temporal", this.id_temporal);

            if (type == "editar") this.slug(this.form.titulo_inmueble);

            for (let prop in this.form) {
                if (this.form[prop]) {
                    switch (prop) {
                        case "url_video":
                            if (this.form[prop].indexOf("youtu") != -1)
                                formData.append(prop, this.form[prop]);
                            break;
                        case "caracteristicas_internas":
                        case "caracteristicas_externas":
                        case "caracteristicas_tipo_fachada":
                        case 'caracteristicas_estado_construcion':
                        case 'caracteristicas_clasificacion':
                        case 'caracteristicas_orientacion':
                        case 'caracteristicas_ubicacion':
                        case 'caracteristicas_tarifas_adicionales_servicios_publico':
                            let array = this.form[prop].map((item) => JSON.parse(item));
                            formData.append(prop, JSON.stringify(array));
                            break;
                        case "inmueble_imagenes":
                            formData.append(prop, JSON.stringify(this.form[prop]));
                            break;
                        case "cedula":
                        case "certificado_tradicion":
                        case "predial":
                            formData.append(prop, this.form[prop]);
                            break;
                        default:
                            formData.append(prop, this.form[prop]);
                    }
                }
            }

            if (this.estado_propietario)
                formData.append("propietario", JSON.stringify(this.propietario));

            if (this.form.inmueble_imagenes.length > 0)
                formData.append("json", JSON.stringify(this.form.inmueble_imagenes));


            let _dispatch = ""
            if (type == "editar") {
                _dispatch = "editInmuebles";
            } else {
                _dispatch = "saveInmuebles";
                //OBTENER DATOS DE ID USUARIO
                let userID = null
                if (this.agentSelect) {
                    userID = this.agentSelect
                } else {
                    userID = JSON.parse(localStorage.getItem('userData'));
                }
                formData.append('user_id', userID.id)
            }


            await this.$store
                .dispatch(`apiInmueblePrivate/${_dispatch}`, formData)

                .then((res) => {
                    if (type == "editar") {
                        this.$store.commit("appAgents/UPDATE_INMUEBLE", res.data.inmueble);
                        this.$store.commit("appInmueble/UPDATE_INMUEBLE", res.data.inmueble);
                    }
                    else
                        this.$store.commit("appInmueble/ADD_INMUEBLE", res.data.inmueble);
                    this.$parent.closeModal(type);
                    this.$swal({
                        title:
                            this.prop.type == "editar"
                                ? "Actualización exitosa"
                                : "Registro exitoso",
                        text:
                            this.prop.type == "editar"
                                ? "Datos actualizados exitosamente"
                                : "Inmueble registrado exitosamente",
                        icon: "success",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                        confirmButtonText: "Cerrar",
                        buttonsStyling: false,
                    });
                    this.btnState = false;
                })
                .catch((error) => {
                    this.$toast(
                        {
                            component: ToastificationContent,
                            props: {
                                title: "Algo ha ocurrido",
                                icon: "AlertCircleIcon",
                                text: "Si el problema persiste comunicate con nosotros ",
                                variant: "danger",
                            },
                        },
                        {
                            timeout: 4000,
                        }
                    );
                    this.btnState = false;
                });
        },
        /* == End Validacion de Formulario == */
        // Localizacion en el mapa
        setAddressModalPropety(a) {
            Object.assign(this.form, {
                direccion: a.target.value,
            });
        },
        setPlaceModalPropety(place) {
            if (place.name) {
                Object.assign(this.form, {
                    direccion: place.name,
                });
            } else {
                Object.assign(this.form, {
                    direccion: place.formatted_address,
                    latitud: place.geometry.location.lat(),
                    longitud: place.geometry.location.lng(),
                });

                let marker = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };

                Object.assign(this.map.markers[0].position, marker);
                Object.assign(this.map.center, marker);
            }
        },
        clickMap(location) {
            let marker = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng(),
            };

            Object.assign(this.form, {
                latitud: marker.lat,
                longitud: marker.lng,
            });
            Object.assign(this.map.markers[0].position, marker);
        },
        async getUbicacion(elements, { codigo, api, name, prop }) {
            await this.$store
                .dispatch(api, { codigo })
                .then((response) => {
                    Object.assign(elements[prop], {
                        options: response,
                    });
                })
                .catch((error) => {
                    console.error(name, error);
                });
        },
        modalClick() {
            this.$parent.closeState();
            this.$parent.closeState(false);
        },
    },
};
</script>

<style lang="css" scoped>
.is-invalid-cedula {
    border: 1px solid red;
}

.text_max {
    color: red;
    font-weight: bold;
}

.sub-title-collapse {
    font-size: 16px;
    padding-bottom: 6px;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #d8d6de;
    color: #7367f0;
}

.card-body {
    padding-top: 1.5rem !important;
}

.card-body+.card-body {
    border-top: 1px solid #ebe9f1;
}

.card-body:nth-child(odd) {
    background: #fbfbfb;
}

.input-group-append .input-group-text {
    font-weight: 600;
}

.card .card-header {
    background: #7367f0;
    color: #fff;
}

.card .card-header h2 {
    color: inherit;
    font-size: 20px;
    padding: 1rem 1.5rem;
    margin: 0;
}

@media only screen and (max-width: 600px) {
    .contentThumbnails {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 15px;
    }
}

@media only screen and (min-width: 600px) {
    .contentThumbnails {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 190px));
        justify-content: center;
        grid-gap: 15px;
    }
}

.thumb img {
    border-radius: 6px;

    max-width: 100%;
}

.imageStorage {
    position: relative;
    padding-top: 100%;
}

.imageStorage img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.image-card {
    object-fit: contain !important;
}

.btnUpload {
    margin: 0;
    border: 2px dashed currentColor;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    cursor: pointer;
}

.btnUpload svg {
    width: 2.3rem;
    fill: currentColor;
}

.wrapperUpload {
    display: block;
    width: 100%;
    padding-top: 100%;
    position: relative;
}

.contentUpload {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
}

.contentThumbnails .thumb {
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 25%), 0 0 0 1px rgb(0 0 0 / 25%);
    border-radius: 6px;
}

.contentThumbnails .btn.btnDeleteImage {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    width: 2em;
    height: 2em;
    border-radius: 3em;
    position: absolute;
    right: -5px;
    top: -5px;
    z-index: 2;
}

.contentThumbnails .btn.btnDeleteImage svg {
    width: 1em;
    height: 1em;
    display: block;
    fill: currentColor;
}
</style>
<style lang="css" scoped>
.sub-title-collapse.required::after {
    content: "*";
    color: #f00;
    margin-left: 6px;
}

@media only screen and (max-width: 600px) {
    .check-list.form-group [role="group"] {
        column-count: 1;
        column-gap: 0;
    }
}

@media only screen and (min-width: 600px) {
    .check-list.form-group [role="group"] {
        column-count: 3;
        column-gap: 0;
    }
}

.modal-map {
    z-index: 20;
}

.modal-backdrop-map {
    z-index: 10;
}

.check-list.form-group [role="group"] .custom-checkbox {
    margin-bottom: 15px;
}

.custom-control.custom-checkbox label {
    cursor: pointer;
}

.gmap-input {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    border: none;
    background: #0000 !important;
}

#FormInmueble .list-error {
    margin: 0 -20px;
    background: #fff;
    padding: 20px 15px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    bottom: 80px;
    z-index: 2;
}

#FormInmueble .list-error .error {
    margin: 5px;
}

#FormInmueble .vue-form-wizard .wizard-card-footer {
    padding: 20px 25px;
    margin: 0px -25px -40px;
    border-radius: 0 0 6px 6px;
    background: #fbfbfb;
    position: sticky;
    bottom: 0;
    z-index: 2;
    border-top: 1px solid #ebe9f1;
}

#FormInmueble .vue-form-wizard {
    box-shadow: none !important;
    background: transparent;
}

#FormInmueble .vue-form-wizard .wizard-navigation .wizard-nav {
    padding: 0;
}

#FormInmueble .vue-form-wizard .wizard-tab-content {
    padding-left: 0;
    padding-right: 0;
}

.country-selector__list {
    bottom: 100% !important;
    top: inherit !important;
    margin-bottom: 10px !important;
}

.pac-container {
    z-index: 1050;
}

.btn-pdf svg {
    width: 1.25rem;
    height: 1em;
    display: block;
    font-size: 16px;
    fill: #fff;
}

.btn.btn-pdf {
    padding: 0 10px;
}

label[for].custom-file-label {
    cursor: pointer;
}

.iframe-wrapper {
    display: block;
    position: relative;
    padding-top: 56%;
}

.iframe-wrapper iframe {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.nav-pills .nav-link {
    background: #fff;
    border-color: #0003;
}

.nav-pills .nav-item+.nav-item {
    margin-left: 1rem;
}
</style>
