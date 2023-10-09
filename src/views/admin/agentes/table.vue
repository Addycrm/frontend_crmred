
<template>
    <div class="tableAgents">
        <div class="mb-2" cols-lg="5" cols-sm="auto">
            <app-collapse>
                <app-collapse-item title="FILTRO GENERAL" :isVisible="true">
                    <!-- ID -->
                    <div class="d-flex flex-wrap">
                        <b-col cols="12" md="3">
                            <b-form-group label="ID Agente">
                                <b-form-input :value="query.idAgent" @change="setQuery('idAgent', $event)"
                                    placeholder="Buscar id..." type="search" trim />
                            </b-form-group>
                        </b-col>
                        <!-- NOMBRE -->
                        <b-col cols="12" md="3">
                            <b-form-group label="Nombre Agente">
                                <b-form-input :value="query.nameAgent" @change="setQuery('nameAgent', $event)"
                                    placeholder="Buscar nombre..." type="search" trim />
                            </b-form-group>
                        </b-col>
                        <!-- CORREO -->
                        <b-col cols="12" md="3">
                            <b-form-group label="Correo Agente">
                                <b-form-input :value="query.emailAgent" @change="setQuery('emailAgent', $event)"
                                    placeholder="Buscar correo..." type="email" trim />
                            </b-form-group>
                        </b-col>
                    </div>
                </app-collapse-item>
                <app-collapse-item title="FILTRO POR FECHAS">
                    <!-- FECHA REGISTRO -->
                    <div class="d-flex flex-wrap">
                        <b-col cols="12" md="3">
                            <b-form-group label="Fecha Inicial">
                                <div class="container__flat-pickr">
                                    <flat-pickr v-model="query.start" name="fechaInicio" class="form-control" :config="{
                                        enableTime: false,
                                        time_24hr: false,
                                        maxDate: maxDateStart,
                                        locale,
                                        plugins,
                                        dateFormat: 'Y-m-d'
                                    }" />
                                    <button class="flat-pickr__btn" @click="cleanDate('start')">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="15"
                                            heigth="15">
                                            <path
                                                d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                                        </svg>
                                    </button>

                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="3">
                            <b-form-group label="Fecha Final">
                                <div class="container__flat-pickr">
                                    <flat-pickr v-model="query.end" name="fechaInicio" class="form-control" :config="{
                                        enableTime: false,
                                        time_24hr: false,
                                        maxDate: maxDateEnd,
                                        minDate: query.start,
                                        locale,
                                        plugins,
                                        dateFormat: 'Y-m-d'
                                    }" />
                                    <button class="flat-pickr__btn" @click="cleanDate('end')">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="15"
                                            heigth="15">
                                            <path
                                                d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                                        </svg>
                                    </button>
                                </div>
                            </b-form-group>
                        </b-col>
                    </div>
                </app-collapse-item>
            </app-collapse>
        </div>
        <div class="flex-column d-flex align-items-center flex-sm-row justify-content-center justify-content-sm-between">
            <b-button variant="secondary" @click="clearFilter()" :style="{
                maxHeight: '3rem',
                maxWidth: '140px',
                margin: '2px 6px'
            }"> Limpiar </b-button>
            <b-button variant="warning" class="d-inline-flex align-items-center" @click="exportExcel" :style="{
                maxHeight: '3rem',
                maxWidth: '140px',
                margin: '2px 6px'
            }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{
                    width: '1.25em',
                    height: '1em',
                    margin: '-0.5em',
                    marginRight: '0.8rem',
                    fontSize: '15px',
                }" fill="currentColor">
                    <path
                        d="M384,352v64c0,17.7-14.3,32-32,32H96c-17.7,0-32-14.3-32-32v-64c0-17.7-14.3-32-32-32S0,334.3,0,352v64c0,53,43,96,96,96 h256c53,0,96-43,96-96v-64c0-17.7-14.3-32-32-32S384,334.3,384,352z M246.6,342.6l128-128c12.5-12.5,12.5-32.8,0-45.3 c-12.5-12.5-32.8-12.5-45.3,0L256,242.7V32c0-17.7-14.3-32-32-32s-32,14.3-32,32v210.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3,0 s-12.5,32.8,0,45.3l128,128C213.9,355.1,234.1,355.1,246.6,342.6z" />
                </svg>
                <span class="align-middle">Exportar</span>
            </b-button>
        </div>

        <b-row>
            <b-col cols="auto" class="mx-auto my-1">
                Clientes: <b class="text-primary">{{ tableAgents.to }}</b> de
                <b>{{ tableAgents.total }}</b>
            </b-col>

        </b-row>

        <b-row class="mt-1">
            <b-col cols="12">
                <b-overlay :show="overlay">
                    <!-- TABLA DE AGENTES -->
                    <b-col cols="12">
                        <b-table hover small bordered head-variant="primary" thead-class="primaryColor" responsive
                            :items="listAgentesPage" :fields="fields" ref="selectableTable" select-mode="single">
                            <template #cell(userdata.foto_persona)="data">
                                <b-avatar class="mr-1" :src="data.value" size="4rem" />
                            </template>
                            <template #cell(created_at)="data">
                                <span style="font-size: 0.8em;">{{ data.item.created_at | fechaFormating }} ({{
                                    dateCounter(data.item.created_at)
                                }})
                                </span>
                            </template>
                            <template #cell(inmuebles_count)="data">
                                <div class="d-flex justify-content-center">
                                    <b-badge variant="primary" class="">
                                        {{ data.item.count }}
                                    </b-badge>
                                </div>
                            </template>

                            <template #cell(estado_user)="data">
                                <div class="d-flex justify-content-center">
                                    <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                                        <template v-slot:button-content>
                                            <b-badge variant="light-primary">
                                                {{ data.item.estado_user }}
                                            </b-badge>
                                        </template>
                                        <b-dropdown-item
                                            @click="changeStateInmueble({ users: data.item.id, estado: 'activo' })">
                                            <feather-icon icon="UserIcon" class="mr-50" />
                                            <span>Activo</span>
                                        </b-dropdown-item>
                                        <b-dropdown-item
                                            @click="changeStateInmueble({ users: data.item.id, estado: 'inactivo' })">
                                            <feather-icon icon="UserIcon" class="mr-50" />
                                            <span>Inactivo</span>
                                        </b-dropdown-item>
                                    </b-dropdown>

                                </div>
                            </template>


                            <template #cell(action)="data">

                                <span>
                                    <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                                        <template v-slot:button-content>
                                            <feather-icon icon="MoreVerticalIcon" size="16"
                                                class="text-body align-middle mr-25" />
                                        </template>

                                        <b-dropdown-item @click="showListEstate(data.item)" :to="toRedirectAgent"
                                            ref="buttonRedirect">
                                            <feather-icon icon="HomeIcon" class="mr-50" />
                                            <span>Ver inmuebles</span>
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </span>

                                <!-- <b-button>ACTIVO</b-button>
                                <b-button variant="primary" :to="toRedirectAgent" ref="buttonRedirect"
                                    @click="showListEstate(data.item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-house-up" viewBox="0 0 16 16">
                                        <path
                                            d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z" />
                                        <path
                                            d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 1 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.707l1.5-1.5a.5.5 0 0 1 .708 0Z" />
                                    </svg>
                                    Ver inmuebles
                                </b-button> -->

                            </template>
                        </b-table>

                    </b-col>
                    <div class="d-flex flex-wrap align-items-center mt-1">
                        <div class="d-flex">
                            <b-pagination v-if="tableAgents.per_page < tableAgents.total" @change="getAgents"
                                :value="currentPage" :per-page="tableAgents.per_page" :total-rows="tableAgents.total"
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
                </b-overlay>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import agentEliteMixins from "./agentEliteMixins.js";
import selectedAgend from "./selected.vue";
import VSelect from "vue-select";
import VModal from "@/views/componente/vModal";
import ClientesForm from "@/views/apps/clientes/clientes-list/ClientesForm";
import TableInmueble from "@/views/apps/inmuebles/inmueble-list/tableInmueble";
import Ripple from 'vue-ripple-directive';
import moment from "moment";
//desplegables
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
//date
import flatPickr from "vue-flatpickr-component";
import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
import { Spanish } from "flatpickr/dist/l10n/es.js";

export default {

    name: "tableAgend",
    directives: {
        Ripple,
    },
    mixins: [agentEliteMixins],
    components: {
        VSelect,
        VModal,
        ClientesForm,
        selectedAgend,
        TableInmueble,
        AppCollapse,
        AppCollapseItem,
        flatPickr
    },
    data() {
        return {
            ModalStateInmuebles: null,
            modalStateAgent: false,
            selectAgent: null,
            toRedirectAgent: null,
            locale: Spanish,
            plugins: [
                new confirmDatePlugin({
                    confirmText: "Agregar",
                    showAlways: true,
                    theme: "dark",
                }),
            ],
            fields: [
                {
                    key: 'id', label: 'ID Agente'
                },
                {
                    key: 'estado_user', label: 'Estado', headerTitle: "Estado del agente"
                },
                {
                    key: 'userdata.foto_persona', label: 'Imagen', headerTitle: "Imagen del agente"
                },
                {
                    key: 'created_at', label: 'Fecha registro', headerTitle: "Fecha registro"
                },
                {
                    key: 'userdata.primer_nombre', label: 'Cliente', headerTitle: "Nombre del cliente"
                },
                {
                    key: 'email', label: 'Email', headerTitle: "Email del agente"
                },
                {
                    key: 'userdata.celular_movil', label: 'Celular',
                },
                {
                    key: 'empresa.nombre', label: 'Empresa',
                },
                {
                    key: 'inmuebles_count', label: 'Num. Inmuebles',
                },
                {
                    key: 'action', label: 'Acciones',
                },
            ],
        }
    },
    filters: {
        fechaFormating: function (value) {
            if (value) {
                let date = moment(value).format('L');
                return date
            }
        }
    },
    methods: {
        showModalAgent() {
            this.modalStateAgent = true
        },
        closeModalAgent() {
            this.modalStateAgent = false
            this.initApis(this.apiClientes);
        },
        cleanDate(data) {
            this.query[data] = null;
        },
        showListEstate(data) {
            this.$router.push({ name: 'inmueble-agent', params: { id: data.id } });
            this.getInmueblesAgent(data);
        },

        changeStateInmueble(item) {
            const data = {
                users: item.users,
                estado: item.estado
            }
            this.$store.dispatch('appAgents/changeStateAgente', data)
                .then(response => {
                    this.getAgents()
                }).catch(error => {

                });
        },


        dateCounter(date) {
            const newDate = new Date(date).getTime();
            const time = moment(newDate);
            return moment(time, "YYYYMMDD").fromNow();
        },
    },

};
</script>
<!-- <style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style> -->

<style lang="css" scoped>
.container__flat-pickr {
    display: flex;
}

.flat-pickr__btn {
    border: 1px solid #d9d7df;
    background-color: white;
}

.flat-pickr__btn svg {
    fill: var(--primary);
}

.icon {
    width: 1.25em;
    font-size: 24px;
    display: flex;
    color: var(--primary);
    justify-content: center;
    /* margin: 0 auto; */
}

.icon svg {
    display: block;
    width: auto;
    height: 1em;
    fill: currentColor;
}

.icon.whatsapp {
    color: #57d163;
}

.badge {
    position: relative;
    z-index: 1;
    overflow: hidden;
}

.badge::after {
    content: "";
    position: absolute;
    inset: 0;
    display: block;
    background: currentColor;
    opacity: 0.15;
}

.badge-blue {
    color: #009aff;
}

.badge-pink {
    color: var(--pink);
}

.vgt-table tr.clickable.success td {
    background: #28c76f4d !important;
}

@media(max-width: 676px) {
    .marginLeft {
        margin: auto;
        margin-top: 8px;
    }
}
</style>
