<template>
    <b-card title="Listado de Clientes Interesdos">
        <div class="col-md-12 col-sm-12">
            <b-form-group label-for="filterInput"
                class="mb-0">
                <b-input-group size="sm">
                    <b-form-input placeholder="Buscar" label-cols-sm="12" label-align-sm="left" label-size="md"
                        label-for="filterInput" class="mb-0" v-model="search_property" />
                    <b-input-group-append>
                        <b-button variant="outline-primary" @click="searchInterested">
                            Buscar
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </div>
            <div class="col-sm-12 text-center my-1">
                Contactos: <b class="text-primary">{{ interested.to }}</b> de
                <b>{{ interested.total }}</b>
            </div>
            <b-table 
                v-if="interested.data" striped hover responsive class="position-relative" 
                :busy="isBusy"
                :items="interested.data" 
                :fields="fields">
                <template #table-busy>
                    <div class="text-center text-danger my-2">
                        <!-- <b-spinner class="align-middle"></b-spinner>
                        <strong>cargando...</strong> -->
                        <loadingContact/>
                    </div>
                </template>
                <template #cell(created_at)="data">
                    <strong>{{ data.item.created_at | fechaFormating }}</strong>
                </template>

                <template #cell(estado)="data">
                    <b-badge variant="success">
                        {{ data.value }}
                    </b-badge>
                </template>
                <template #cell(actions)="data">
                    <div class="d-flex flex-wrap">
                        <b-button
                            v-if="data.item.whatsapp"
                            :href="`https://api.whatsapp.com/send?phone=${replaceNum(data.item.whatsapp)}`"
                            pill
                            variant="success"
                            target="_blank"
                            class="
                            btn-icon
                            d-flex
                            justify-content-center
                            align-items-center
                            m-10
                            "
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            :style="{
                                width: '1.25em',
                                height: '1em',
                                margin: '-0.5em',
                                fontSize: '20px',
                            }"
                            fill="currentColor"
                            >
                            <path
                                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                            />
                            </svg>
                        </b-button>
                        <b-button
                            v-if="data.item.main_mail"
                            :href="'mailto:' + data.item.main_mail"
                            pill
                            variant="primary"
                            class="
                            btn-icon
                            d-flex
                            justify-content-center
                            align-items-center
                            m-10
                            "
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            :style="{
                                width: '1.25em',
                                height: '1em',
                                margin: '-0.5em',
                                fontSize: '15px',
                            }"
                            fill="currentColor"
                            >
                            <path
                                d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"
                            />
                            </svg>
                        </b-button>
                    </div>
                </template>
            </b-table>

            <div class="d-flex flex-wrap justify-content-center align-items-center mt-1">
                <b-pagination v-if="interested.per_page < interested.total"  v-model="currentPage"  @change="getInterested"  :total-rows="interested.total" :per-page="interested.per_page"
                    first-number last-number prev-class="prev-item" next-class="next-item" class="mb-0">
                    <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                    </template>
                    <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                    </template>
                </b-pagination>
            </div>
</b-card>
</template>

<script>
// vista loading
import loadingContact from "@/views/componente/loadingContact.vue";
const API = process.env.MIX_API_URL + 'api/auth/cliente_interested';
export default {

    data() {
        return {
            sortBy: '',
            isBusy: false,
            search_property: null,
            currentPage: 1,
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            fields: [
                { key: 'created_at', label: 'Fecha de creación',},
                { key: 'main_mail', label: 'Correo'},
                { key: 'main_cell_phone', label: 'Celular'},
                { key: 'nombre', label: 'Nombre'},
                { key: 'estado', label: 'Estado'},
                {key:'actions', label:'Acciones'}
            ],
        }
    },
    components:{
    loadingContact,
},
    filters: {
        fechaFormating: function (value) {
            if (value) {
                let date = new Date(value);
                return date.toLocaleString();
            }
        },
    },
    computed: {
        interested() {
            return this.$store.state.appContact.interested;
        },
    },
    watch: {
        // currentPage: {
        //     handler: function (value) {
        //         this.getInterested(value);
        //     }
        // }
    },

    created() {
        this.getInterested();
    },

    methods: {
        replaceNum(num){
            return num.replace(/^\+57/, "");
        },
        async getInterested(a = 1) {
            let params = { page: a };
            this.isBusy = true;
            try{
                let res = await this.$store.dispatch('appContact/fetchInterested',{params})
                this.isBusy = false
            }catch(error){
                this.isBusy = false
            }
        },

        async searchInterested() {
            this.isBusy = true;
            await this.$store.dispatch('interested/searchInterested', { url: API, value: this.search_property }).then(() => {
                this.isBusy = false
            }).catch((res) => {
                this.isBusy = false
            })
        }
    },
}
</script>
