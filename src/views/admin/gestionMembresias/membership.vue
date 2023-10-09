<template>
    <div v-if="TableAllAgents" id="TableAllAgents">
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
                        <!-- AGENTE -->
                        <b-col cols="12" md="3" v-if="optionsPlans">
                            <b-form-group label="Plan">
                                <v-select v-model="query.plans" :options="optionsPlans" :reduce="(type) => type.id"
                                    label="code" />
                            </b-form-group>
                        </b-col>
                    </div>
                </app-collapse-item>
            </app-collapse>
        </div>
        <b-row>
            <b-col cols="12" class="d-flex justify-content-center justify-content-md-end">
                <b-button variant="success" @click="openModalForm()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{
                        width: '1.25em',
                        height: '1em',
                        margin: '-0.5em',
                        marginRight: '0.4rem',
                        fontSize: '1em',
                    }" fill="currentColor">
                        <path
                            d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                    </svg>
                    <span>
                        Crear agente
                    </span>
                </b-button>
            </b-col>
            <b-col cols="auto" class="mx-auto my-1">
                Clientes: <b class="text-primary">{{ TableAllAgents.to }}</b> de
                <b>{{ TableAllAgents.total }}</b>
            </b-col>

            <b-col cols="12">
                <h5 v-if="agentsAllSelected.length > 0">Has seleccionado: {{ agentsAllSelected.length }}</h5>
                <b-table hover small bordered responsive head-variant="primary" :items="ListAllAgents"
                    thead-class="primaryColor" :fields="fields" :select-mode="selectMode" ref="selectableTable" selectable
                    selected-variant="success" no-select-on-click>
                    <!-- <template #cell(check)="{ rowSelected }">
          <template v-if="rowSelected">
            <span aria-hidden="true">&check;</span>
            <span class="sr-only">Selected</span>
          </template>
          <template v-else>
            <span aria-hidden="true">&nbsp;</span>
            <span class="sr-only">Not selected</span>
          </template>
        </template> -->
                    <template #head(id)="data">
                        <div class="header">
                            <span>{{ data.label }}</span>
                        </div>
                    </template>
                    <template #head(created_at)="data">
                        <div class="header">
                            <span>{{ data.label }}</span>
                        </div>
                    </template>
                    <template #head(foto_persona)="data">
                        <div class="header">
                            <span>{{ data.label }}</span>
                        </div>
                    </template>
                    <template #head(primer_nombre)="data">
                        <div class="header">
                            <span>{{ data.label }}</span>
                        </div>
                    </template>
                    <template #head(email)="data">
                        <div class="header">
                            <span>{{ data.label }}</span>
                        </div>
                    </template>
                    <template #head(empresa.nombre)="data">
                        <div class="header">
                            <span>{{ data.label }}</span>
                        </div>
                    </template>
                    <template #head(code)="data">
                        <div class="header">
                            <span>{{ data.label }}</span>
                        </div>
                    </template>
                    <template #head(action)="data">
                        <div class="header">
                            <span>{{ data.label }}</span>
                        </div>
                    </template>
                    <template v-slot:cell(foto_persona)="data">
                        <b-avatar :src="data.value" />
                    </template>
                    <template #cell(created_at)="data">
                        <span style="font-size: 0.9em;">{{ data.item.created_at | fechaFormating }} ({{
                            dateCounter(data.item.created_at)
                        }})
                        </span>
                    </template>
                    <template #cell(payment_plans.code)="data">
                        <b-badge variant="primary" v-if="data.item.payment_plans.code == 'GRATIS'">
                            {{ data.item.payment_plans.code }}
                        </b-badge>
                        <b-badge variant="info" v-else-if="data.item.payment_plans.code == 'ESTANDAR'">
                            {{ data.item.payment_plans.code }}
                        </b-badge>
                        <b-badge variant="warning" v-else-if="data.item.payment_plans.code == 'ELITE'">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chess-queen"
                                width="30" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M16 16l2 -11l-4 4l-2 -5l-2 5l-4 -4l2 11" />
                                <path
                                    d="M8 16l-1.447 .724a1 1 0 0 0 -.553 .894v2.382h12v-2.382a1 1 0 0 0 -.553 -.894l-1.447 -.724h-8z" />
                                <path d="M12 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                <path d="M6 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                <path d="M18 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            </svg>
                            {{ data.item.payment_plans.code }}
                        </b-badge>
                    </template>
                    <template #cell(action)="data">
                        <div class="actions__btns">
                            <b-button variant="outline-success" @click="addAgent(data)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="16" height="16"
                                    fill="currentColor">
                                    <path
                                        d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                </svg>
                                Agregar
                            </b-button>
                            <b-button size="sm" variant="outline-danger" @click="deleteAgent(data)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="16" height="16"
                                    fill="currentColor">
                                    <path
                                        d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24 24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                                </svg>
                                Eliminar
                            </b-button>
                        </div>
                    </template>
                    <template #cell(edict)="data">
                            <b-button
                                @click="info($event.targuet, data.item)"
                                class="btn-icon d-flex justify-content-center align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                    :style="{ width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '14px' }"
                                    fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                    <path
                                        d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
                                </svg>
                            </b-button>

                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-row class="d-flex align-items-center" v-if="optionsPlans">
            <b-col md="4" sm="10">
                <h6>Seleccionar el plan que desea cambiar</h6>
                <v-select label="code" v-model="selected" :options="optionsPlans" />
            </b-col>
            <div>
            </div>
            <b-button variant="primary" size="md" class="d-inline-flex align-items-center btn__change"
                @click="verificationData">Cambiar plan
                <span v-if="agentsAllSelected.length > 0" class="label__btn">{{ agentsAllSelected.length }}</span>
            </b-button>
        </b-row>
        <!-- <b-modal id="bv-modal-verification-agent" size="lg"  hide-footer>
          <template #modal-title> Verificación cambio plan</template>
          <modalVerificationAgent :selectedAgents="selectedAgents" :selected="selected" ></modalVerificationAgent>
    </b-modal> -->

        <v-modal v-if="stateModal" @close="() => stateModal = false" titulo="Cambio de Membresia" center size="xs">
            <component is="modalVerificationAgent" :selected="selected" @closeModal="closeModal" />
        </v-modal>

        <!-- MODAL FORMULARIO -->

        <v-modal v-if="stateModalFormAgent" @close="() => stateModalFormAgent = false" titulo="Crear Agente" center
            size="xs" footer>
            <component is="FormUser" ref="modal" />
            <template #footer>
                <b-overlay :show="overlay">
                    <b-button @click="onSubmit" variant="success" :disabled="overlay">
                        Guardar
                    </b-button>
                </b-overlay>
            </template>
        </v-modal>


        <div class="d-flex flex-wrap align-items-center mt-1">
            <div class="d-flex">
                <b-pagination v-if="TableAllAgents.per_page < TableAllAgents.total" @change="getAgents" :value="currentPage"
                    :per-page="TableAllAgents.per_page" :total-rows="TableAllAgents.total" first-number last-number
                    prev-class="prev-arrow" next-class="next-arrow">
                    <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                    </template>
                    <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                    </template>
                </b-pagination>
            </div>
        </div>
        <transition name="fade">
            <v-modal v-if="modal.state" @close="modal.state = false" :titulo="modal.titulo" :size="modal.size"
                :footer="modal.footer">
                <component :is="modal.is" v-bind:row="modal.prop" ref="modal" />
                <template #footer>

                    <b-overlay :show="overlay">
                        <b-button @click="onSubmit" variant="success" :disabled="overlay">
                            {{ modal.prop.row ? 'Guardar' : 'Crear' }}
                        </b-button>
                    </b-overlay>
                </template>
            </v-modal>
        </transition>
        <userFormAgentComponent ref="userFormAgentComponent"></userFormAgentComponent>
    </div>
</template>

<script>
import agentAllMixins from './AllAgentsMixins.js';

import vSelect from 'vue-select'
import modalVerificationAgent from './modal/modalVerificationAgent.vue';

//date
import flatPickr from "vue-flatpickr-component";
import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
import { Spanish } from "flatpickr/dist/l10n/es.js";
//modal
import VModal from "@/views/componente/vModal";
import FormUser from '@/views/admin/gestionMembresias/modal/modalFormAddAgent.vue'
import mixinApis from '@/views/componente/mixinApis'

//desplegables
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import  userFormAgentComponent from "../../componente/userFormAgentComponent.vue";
import moment from "moment";
import "moment/locale/es";

export default {
    name: "membership",
    mixins: [agentAllMixins, mixinApis],
    components: {
        vSelect,
        modalVerificationAgent,
        flatPickr,
        AppCollapse,
        AppCollapseItem,
        VModal,
        userFormAgentComponent,
        FormUser
    },
    data() {
        return {
            modal: {
                state: false,
            },
            fields: [
                {
                    key: 'id', label: 'Id'
                },
                {
                    key: 'created_at', label: 'Fecha creación'
                },
                {
                    key: 'foto_persona', label: 'imagen',
                },
                {
                    key: 'primer_nombre', label: 'Nombre',
                },
                {
                    key: 'email', label: 'correo',
                },
                {
                    key: 'empresa.nombre', label: 'Nombre empresa',
                },
                {
                    key: 'payment_plans.code', label: 'Membresia',
                },
                {
                    key: 'action', label: 'Acciones',
                },
                {
                    key: 'edict', label: 'Editar',
                },
            ],
            apiOptions: [
                {
                    api: 'appUser/getUsers',
                    data: {}
                },
                {
                    api: 'appUser/getRolesUsers',
                    data: {}
                },

            ],
            stateModalFormAgent: false,
            stateModalFormAgentEdit: false,
            stateModal: false,
            selectMode: 'multi',
            search: 0,
            copySelected: [],
            selected: null,
            locale: Spanish,
            plugins: [
                new confirmDatePlugin({
                    confirmText: "Agregar",
                    showAlways: true,
                    theme: "dark",
                }),
            ],
            query: {
                titulo_inmueble: null,
            },

        }
    },
    computed: {
        config() {
            return {
                prop: '',
                btn: [{
                    variant: 'success',
                    texto: 'Editar Agente',
                    modal: {
                        titulo: 'Editar Agente',
                        is: 'FormUser',
                    }
                }],
            }
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
    updated() {
        this.validateCheck()
    },
    mounted() {
        this.initApis(this.apiOptions);

    },
    methods: {
        info(button, data) {
            return this.$refs.userFormAgentComponent.info(button, data)
        },
        async onSubmit() {
            this.overlay = true;
            await this.$refs['modal'].onSubmit()
                .then(state => {
                    this.modal.state = !state;
                });
            this.overlay = false;
        },
        openModalForm() {
            this.stateModalFormAgent = true
        },
        closeModal() {
            this.stateModal = false
            this.getAlLAgents()

        },
        verificationData() {
            if (this.selectallAgents.length > 0) {
                this.stateModal = true
            } else {
                this.$bvToast.toast('No has seleccionado ningun agente', {
                    title: "Información",
                    variant: "danger",
                    solid: true,
                })
            }
        },
        dateCounter(date) {
            const newDate = new Date(date).getTime();
            const time = moment(newDate);
            return moment(time, "YYYYMMDD").fromNow();
        },

        openModal(modal, row) {
            if (modal.footer == undefined)
                Object.assign(modal, { footer: true });

            if (!modal.prop)
                Object.assign(modal, { prop: {} });

            if (row)
                Object.assign(modal.prop, { row });

            Object.assign(this.modal, {
                state: true
            }, modal);
        },
    }

};
</script>
  <!-- <style lang="scss" scoped>
  @import '@core/scss/vue/libs/vue-select.scss';
  </style> -->

<style >
.primaryColor,
.table thead th {
    background-color: #7367f0 !important;
    color: white !important;
}
</style>

<style  lang="css" scoped>
#TableAllAgents {
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
}

.actions__btns {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.actions__btns button {
    max-height: 60px;
    max-width: 180px;
    width: 100%;
    font-size: 0.8em;
    padding: 8px;
}

.btn__change {
    position: relative;
}

.label__btn {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: var(--success);
    color: white;
    padding: 6px;
    border-radius: 50%;
}

.header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    gap: 4px;
}
</style>
