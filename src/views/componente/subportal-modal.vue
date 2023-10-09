<template>
    <div>
        <b-container>
            <b-modal align="center" size="xl" :id="infoModal.id" ref="authenticate-modal" hide-footer responsive>
                <span v-if="subportales.length">
                    <div class="d-flex  justify-content-center mb-1">
                        <div class="demo-inline-spacing">
                            <b-button size="sm" variant="danger" @click="deletePortal(item)" v-if="stateCode">
                                Despublicar
                            </b-button>

                            <b-button size="sm" variant="success" @click="showToast()" v-if="stateCode">
                                Actualizar
                            </b-button>
                        </div>
                    </div>
                    <b-row class="d-flex justify-content-center ">
                        <span v-for="(item, index) in subportales" :key="index">
                            <b-col>
                                <b-card border-variant="primary" header-bg-variant="primary"
                                    header-text-variant="white" align='center' class="card-portal">
                                    <!-- <div class="card-header bg-primary text-white">
                                        <a :href=" linksHome[index].url" target="_blank" class="link__portal">  {{linksHome[index].url}}</a>
                                    </div> -->
                                    <a :href="item.code" target="_blank" class="link__portal" v-if="item.code">  
                                        <b-img v-bind="mainProps"  :class="[item.name=='mitula' ? 'activeClass' : '','img-modal']" :src="item.image" />
                                    </a>
                                    <a  :href=" linksHome[index].url" target="_blank" class="link__portal" v-else>  
                                        <b-img v-bind="mainProps"  :class="[item.name=='mitula' ? 'activeClass' : '','img-modal']" :src="item.image" />
                                    </a>

                                    <b-link class="card-link" v-if="item.code">
                                        <b-button size="sm" variant="success" @click="openLink(item.code)">
                                            {{ 'Ver en '+ item.name }}
                                        </b-button>
                                    </b-link>
                                </b-card>
                            </b-col>
                        </span>

                    </b-row>

                </span>
                <div v-else class="justify-content-center align-items-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </b-modal>
        </b-container>

    </div>
</template>

<script>
import { BModal, VBModal, BRow, BCol, BContainer } from "bootstrap-vue";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
    name: "subportalesComponent",

    components: {
        BModal,
        VBModal,
        BRow,
        BCol,
        BContainer,
    },
    data() {
        return {
            imgpath: null,
            subportales: [],
            stateCode:null,
            inmueble: null,
            visitas: 0,
            infoModal: {
                id: "modal-preguntas",
                title: "",
                content: {},
                contentPreguntas: {},
            },
            mainProps: {
                width: 100,
                height: 50,
                class: "m1",
            },
            linksHome:[
                {url:'https://casas.mitula.com.co/',},
                {url:'https://www.properati.com.co/'},
                {url:'https://www.puntopropiedad.com/'},
                {url:'https://www.trovit.com.co/'},
                {url:'https://www.nuroa.com.co/'},
                {url:'https://www.nuroa.com.co/'}
            ]
        };
    },

    computed: {
        portales() {
            return this.$store.state.appPortales.subportales;
        },
    },
    created() {
    },

    methods: {
        info(item, button) {
            this.infoModal.content = item;
            this.inmueble = button
            this.getSubportales();
            this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        },
        stateBtn(){
            this.stateCode = this.subportales.some(element =>{
                return element.code!=null
            })
        },

        openLink(data) {
            window.open(data);
        },
        showToast(){
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
        },
        async deletePortal() {
            this.$http({
                method: "delete",
                url: "api/auth/subportales-externo/" + this.inmueble.id,
            })
                .then((res) => {

                    this.$store.commit("appInmueble/UPDATE_INMUEBLE", res.data.data);
                    this.showToast();
                    this.$root.$emit("authenticate-modal").hide();

                    
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
            this.$refs['authenticate-modal'].hide()
        },
        async getSubportales() {
            let code = this.infoModal.content;
            this.subportales = [];
            await this.$store
                .dispatch("appPortales/fetchSubPortales")
                .then((response) => {
                    for (let i = 0; i < response.length; i++) {
                        for (let j = 0; j < code.length; j++) {
                            if (response[i].id == code[j].subportal_id) {
                                response[i].code = code[j].url;
                                response[i].views = code[j].views;
                                response[i].visits = code[j].visits;
                            }
                        }
                        this.subportales.push(response[i]);
                    }
                    this.visitas = this.subportales[0].visits;
                    this.stateBtn()

                    // this.subportales = response
                }).catch((error) => {
                });
        },
    },
};
</script>

<style scoped>
.card-portal {
    max-width: 20rem;
    min-width: 13rem;
    min-height: 60px;
    max-height: 139px;

}

.img-modal {
    width: 10rem;
    height: 4rem;
}
.activeClass{
  margin: 1rem 1rem;

  width: 8rem;
  height: 2.1rem;
}
.card-header{
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  font-size: 0.7rem !important;
  width: 100% !important;
}
.card-body{
    padding-top: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    padding-bottom: 10px;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;;
}
.link__portal{
    color: white !important;
}
</style>
