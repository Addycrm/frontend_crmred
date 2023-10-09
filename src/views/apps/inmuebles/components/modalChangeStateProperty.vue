<template>
    <div class="modalProperty">
        <div class="header-modal">
            <div class="container__left" v-if="inmueble.inmueble_imagenes.length>0">
                <img :src="inmueble.inmueble_imagenes[0].url" alt="">
            </div>
            <div class="container__rigth">
                <h5>{{ inmueble.titulo_inmueble }}</h5>
                <p> <strong>ID: </strong>{{ inmueble.id }}</p>
                <b-badge class="m-sm-auto" :variant="stateVariant(inmueble.state_inmueble.id)">
                    {{ inmueble.state_inmueble.name }}
                </b-badge>
            </div>
        </div>
        <h5>Seleccione el nuevo estado de la publicación:</h5>
        <b-form-group >
            <!-- <label for="transaccion" class="required">Estado de publicación:</label> -->
            <v-select id="transaccion" autocomplete="off" v-model="stateProperty" label="name"
                :options="storeConfig.state_property" />
        </b-form-group>
        <b-col sm="12" class="d-flex justify-content-center">
            <b-button variant="primary" @click="alertChange()" :disabled="stateDepubicate">Cambiar estado</b-button>
        </b-col>
        <div class="container_portales" v-show="stateDepubicate">
            <ul class="list_portal">
                <li v-for="item in appPortal.portales" :key="item.name" class="item_portal">
                    <div :ref="item.id">
                    </div>
                    <div class="item_portal-logo">
                        <div :ref="item.name" class="container_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class=" svg_icon"
                                :class="[(validatecheck(item)) ? 'check_positive' : '']" style="width:40px;">
                                <path
                                    d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                            </svg>
                        </div>
                        <div>
                            <img :src="item.image" style="height: 50px" />
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="stateError.length > 0" class="container_error">
                <p>Si los errores persisten. Por favor copiar el error y enviarlo a soporte.</p>
                <ul class="list_error">
                    <li v-for="item in stateError" :key="item.portal" class="item_error">
                        <div class="item-error_portal">
                            <p class="error_portal"> {{ item.portal }} :</p>
                            <p class="error_type">{{ item.error.errorMessage }} </p>
                        </div>
                        <button v-clipboard:copy="JSON.stringify(item.error)" v-clipboard:success="onCopy"
                            v-clipboard:error="onError" class="btn btn-primary">Copiar Error</button>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
import vSelect from "vue-select";
import mixinPortalesMasive from "@/views/apps/inmuebles/mixinDesPortalesMasive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { axiosIns } from '@/libs/axios'

export default {
    mixins: [mixinPortalesMasive],
    data() {
        return {
            stateProperty: {},
            stateDepubicate:false,
            optionsAlert:{},
        }
    },
    components: {
        vSelect,
    },
    props: {
        inmueble: { 
            type:Object 
        }
    },
    computed: {
        storeConfig() {
            return this.$store.state.appConfiguracion.options;
        },
    },
    mounted() {
        this.stateProperty = this.inmueble.state_inmueble
        this.optionsAlert= this.$swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    },
    methods: {
        alertChange(){
            let title=''
            switch (this.stateProperty.id) {
                case 3:
                    title="El inmueble estara disponible por los proximos 30 días y luego sera eliminado.";
                    break;
                case 4:
                    title="El inmueble sera inabilitado en estos momentos.";
                    break;
                default:
                    title="El inmueble sera habilitado.";
                    break;
            }
            this.optionsAlert.fire({
            title: "CAMBIAR ESTADO",
            text:title,
            icon: 'warning',
            showCloseButton: true,
            showCancelButton: true,

            confirmButtonText: 'Aceptar',
            cancelButtonText:'Cancelar',
            reverseButtons: true
            }).then((result) => {
                if(result.isConfirmed){
                    this.changeState()
                }
            })
        },
        changeState() {
            let data = {
                state: this.stateProperty.id,
                property: this.inmueble.id,
            }
            if(this.stateProperty.id!=2){
                this.stateDepubicate=true
                this.depublicationMasive(this.appPortal.portales)
            }
            this.handleStateProperty(data)
        },
        onCopy: function (value, event) {
            alert('Copiado en el portapapeles')
        },
        onError: function (value, event) {
            alert('No se pudo copiar el texto al portapapeles')
        },
        validatecheck(item) {
            let check = this.inmueble.portale_state_inmueble.some((element) => {
                return Number(item.id) == Number(element.id_portal)
            });
            return check

        },
        depublicationMasive(portales) {
            this.selectPortales(portales, this.inmueble)
            // this.validatePortal(portales,this.inmueble)
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
        handleStateProperty(data) {
            // this.overlay = true;
            axiosIns({
                data,
                method: "post",
                url: "api/auth/api-inmueble-update-state",
            })
                .then((res) => {
                // this.overlay = false;
                this.$store.commit("appInmueble/UPDATE_INMUEBLE", res.data.data);
                this.$emit("reloadPage")
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
                this.optionsAlert.fire({
                    title: "ESTADO ACTUALIZADO",
                    text: "Tu estado del inmueble ha sido actualizado",
                    showCloseButton: false,
                    showCancelButton: false,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    reverseButtons: true
                    }).then((result) => {
                        if(result.isConfirmed){
                            this.$emit("closeModal")
                        }
                    })
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
    }
}
</script>

<style scoped lang="scss">
p {
    margin: 0;
}
li {
    list-style: none;
}
ul{
    padding: 0;
}
.modalProperty{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    height: auto;
    h5{
        margin: 0;
    }
}

.header-modal{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    // justify-content:left;
    // gap: 1rem;
    // flex-wrap: wrap;
    // width: 100%;
    // height: auto;
    // margin-bottom: 1rem;
}
.container__left{
    img{
        width: 100px;
        height: 100px;
    }
}


.container_icon {
    width: auto;
}

.container_portales {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
}

.item_error {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
}

.error_portal {
    margin: 0;
    border-bottom: 2px solid white;
}

.error_type {
    margin: 0;
}

.item-error_portal {
    max-width: 500px;
}

.list_error {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.svg_icon {
    width: 40px;
    fill: gray;
}

.check_positive {
    fill: green;
}

.check_negative {
    fill: red;
}

.container_error {
    width: 100%;
    padding: 1rem;
    background-color: #ff4743;
    opacity: 0.6;
    color: white;
    font-weight: bold;
}

.list_portal {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: auto;
    gap: 0.5rem;
}

.check_sync {
    border: 2px solid green;
}

.icon_check {
    width: 30px;
    height: 30px;
}

.item_portal {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
    align-items: center;
}

.item_portal-logo {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
}

@media (max-width:550px) {
    .header-modal{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .container__rigth{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h5{
            text-align: center;
        }
    }
}
</style>