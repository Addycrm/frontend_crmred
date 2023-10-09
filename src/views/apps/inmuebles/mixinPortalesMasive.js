import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { axiosIns } from '@/libs/axios'
import axios from "axios";
export default {
    data() {
        return{
            state:null,
            portales:[],
            stateError:[],
            urlPortal:[
                {
                    id:1,
                    name:"Fincaraiz",
                    method: 'get',
                    url: {
                        publicate:"api/auth/portales/fincarraiz",
                        depublicate:"api/auth/fincarraiz/despublicar"
                    },
                },
                {
                    id:2,
                    name:"Clasificados El País",
                    method: 'get',
                    url:{
                        publicate: "api/auth/service/pais/sincronizar",
                        depublicate:"api/auth/service/pais/desactivar"
                    }
                },
                {
                    id:3,
                    name:"Metro cuadrado",
                    method: 'get',
                    url:{
                        publicate: "api/auth/service/metro_cuadrado",
                        depublicate:"api/auth/service/metro_cuadrado/despublicar"
                    }

                },
                {
                    id:4,
                    name:"Ciencuadras",
                    method: 'post',
                    url:{
                        publicate:"api/auth/service/cienciuadra",
                        depublicate:"api/auth/service/cienciuadra/desactivar"
                    }
                },
                {
                    id:5,
                    name:"Proppit",
                    method: 'get',
                    url:{
                        publicate:"api/auth/prippit/publicar",
                        depublicate:"api/auth/subportales-externo"
                    }
                },
                {
                    id:6,
                    name:"Mercado Libre",
                    method: 'get',
                    url:{
                        publicate:"api/auth/portales/mercadolibre/sincronizar",
                        depublicate:"api/auth/portales/mercadolibre/despublicar"
                    }
                }
            ]
        }
    },
    computed: {
        appPortal() {
            return this.$store.state.appPortales;
        },
        localidades_ciencuadra() {
            return this.$store.state.appPortales.localidades_ciencuadra;
        },
    },
    mounted() {
        this.portales = this.appPortal
    },

    methods:{
        // SELECCIONAMOS LOS PORTALES QUE FALTAN POR PUBLICAR EN _portales
        selectPortales(portales,inmueble){
            let _portales = portales.filter((element) =>{
            let select= inmueble.portale_state_inmueble.find((item) =>{
                return Number(item.id_portal) == Number(element.id)
            })
            return !select
            });
            this.validatePortal(_portales,inmueble)
        },

    async validatePortal(portales,inmueble){
        // COMENZAMOS A SINCRONIZAR EN LOS PORTALEES
        portales.map(async (item)=>{
            let portalSelect = this.urlPortal.find((element) =>{
                return item.name == element.name
            })
            //INDICA QUE ESTA CARGANDO
            this.$refs[item.name][0].innerHTML = ""
            this.$refs[item.name][0].innerHTML =
            `
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            `
            let options = {
                title:'Sincronizar Inmueble' ,
                icon:'info'
                ,
                showCancelButton: true,
                customClass: {
                    confirmButton: "btn btn-info",
                    cancelButton: 'btn btn-danger ml-1',
                },
                confirmButtonText: 'Sincronizar',
                cancelButtonText: 'Cancelar',
                buttonsStyling: false,
            };
            let value={}

            //LLAMAMOS A LA API Y RECIBIMOS LA RESPUESTA
            try{
                //SI EL PORTAL ES CIENCUADRAS ES UN METODO POST Y DEBEMOS PEDIRLE A USUARIO QUE INGRESE LA LOCALIDAD
                //Y ESA LOCALIDAD LA ENVIAMOS EN LOS HEADERS DE LA PETICION
                if(portalSelect.name==="Ciencuadras"){
                    await this.getLocalidadesCiencuadra(inmueble.ciudad_id.id);
                    Object.assign(options, {
                        input: 'select',
                        inputOptions: this.localidades_ciencuadra,
                        inputPlaceholder: 'Selecciona una localidad',
                        inputValidator: (localidad) => {
                            return new Promise((resolve) => {
                                if (localidad) {
                                    Object.assign(value, { localidad });
                                    resolve()
                                } else {
                                    resolve('Debes de elegir una localidad')
                                }
                            })
                        }
                    });
                    await this.$swal.fire(
                        options
                    )
                    //INCLUIMOS AL OBJETO DE PORTAL SELECCIONADO EL ID INMUEBLE Y LOCALIDAD
                    Object.assign(portalSelect,{
                        data: { inmueble: inmueble.id, localidad: value.localidad }
                    })
                }
                //LLAMAMOS A LA API Y OBTENEMOS LA RESPUESTA
                let res = await this.syncPortal(portalSelect,inmueble.id);
                if(res.state){
                    //SI LA RESPUESTA ES POSITIVA
                    this.$refs[item.name][0].innerHTML = ""
                    this.$refs[item.name][0].innerHTML =
                    `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class=" svg_icon"
                    style="
                        width:40px;
                        fill:green;
                    ">
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg>
                    `
                    //ACUTALIZAMOS EL INMUEBLE CON LOS DATOS DE RESPUESTA
                    this.$store.commit("appInmueble/UPDATE_INMUEBLE",  res.data.inmueble);
                }else{
                    //SI LA RESPUESTA ES NEGATIVA
                    //LOS ERRORES GENERADOS LOS GUARDAMOS
                    let errorMessage=null
                    switch (portalSelect.id) {
                        case 3:
                            errorMessage={
                                errorMessage:"Validar que el numero de imagenes del inmueble sea menor o igual a 30, Validar el año de construcción."
                            }
                            break;

                        default:
                            errorMessage = (res.error.response.data)?res.error.response.data:res.error.message;
                            break;
                        }
                        this.stateError.push({
                            portal:portalSelect.name,
                            error:errorMessage
                        })

                    this.$refs[item.name][0].innerHTML = ""
                    this.$refs[item.name][0].innerHTML =
                    `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                    class="svg_icon"
                    style="
                        width:40px;
                        fill:red;
                        "
                    >
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg>
                    `
                }
            }catch(error){
            }
        })
    },
    async getLocalidadesCiencuadra(city) {
        await this.$store.dispatch("appPortales/getLocalidadesCiencuadra", city);
    },
    notification(sync='create') {
        this.$toast({
            component: ToastificationContent,
            props: {
                title:
                    sync == 'create' ? 'Inmueble Sincronizado' :
                        sync == 'update' ? 'Inmueble Actualizado' :
                            'Inmueble Despublicado'
                ,
                icon: "CheckCircleIcon",
                text:
                    sync == 'create' ? 'Tu Inmueble ha sido publicado exitosamente' :
                        sync == 'update' ? 'Tu Inmueble ha sido actualizado exitosamente' :
                            'Tu Inmueble ha sido despublicado exitosamente'
                ,
                variant: "success",
            },
        });
    },

    syncPortal(portal,id) {
        return new Promise((resolve,reject) => {
          axiosIns({
            method:portal.method,
            url:(portal.name!='Ciencuadras')? `${portal.url.publicate}/${id}`:`${portal.url.publicate}`,
            data:portal.data
          })
            .then(res => {
              let data = res.data.data;
              resolve({ state:true, data });
            }).catch(error => {
              resolve({state:false,error});
            })
        });
      },
 }

}
