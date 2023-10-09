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
                    name:"Fincaraiz",
                    method: 'get',
                    url: {
                        update:"api/auth/portales/fincarraiz"
                    },
                },
                {
                    name:"Clasificados El País",
                    method: 'get',
                    url:{
                        update:"api/auth/service/pais/update"
                    }
                    
    
                },
                {
                    name:"Metro cuadrado",
                    method: 'get',
                    url:{
                        update:"api/auth/service/metro_cuadrado/update"
                    }
    
                },
                {
                    name:"Ciencuadras",
                    method: 'post',
                    url:{
                        update:"api/auth/service/cienciuadra/update"
                    }                    
                },
                {
                    name:"Proppit",
                    method: 'get',
                    url:{
                        update:"api/auth/prippit/publicar"
                    } 
                },
                {
                    name:"Mercado Libre",
                    method: 'get',
                    url:{
                        update:"api/auth/portales/mercadolibre/update"
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
            return select;
        });
        this.updateValidatePortal(_portales,inmueble)
    },
    async updateValidatePortal(portales,inmueble){
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
                <span class="sr-only">Loading...</span
            </div>
            `
            try{
                //LLAMAMOS A LA API Y OBTENEMOS LA RESPUESTA
                if(portalSelect.name==="Ciencuadras"){
                    Object.assign(portalSelect,{
                        data: { inmueble: inmueble.id  }
                    })
                }
                let res = await this.deSyncPortal(portalSelect,inmueble.id);
                if(res.state){
                    //SI LA RESPUESTA ES POSITIVA
                    this.$refs[item.id][0].innerHTML = ""
                    this.$refs[item.id][0].innerHTML = `<p style="margin:0; color:#008000; font-weight:bold;">Actualizado</p>`
                    this.$refs[item.name][0].innerHTML = ""
                    this.$refs[item.name][0].innerHTML = 
                    `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg_icon"
                    style="width:40px; fill: #008000;">
                    <path
                        d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                    `
                     //ACUTALIZAMOS EL INMUEBLE CON LOS DATOS DE RESPUESTA
                    this.$store.commit("appInmueble/UPDATE_INMUEBLE",  res.data.inmueble);
                }else{
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
    
    deSyncPortal(portal,id) {
        return new Promise((resolve,reject) => {
          axiosIns({
            method:portal.method,
            url:(portal.name!='Ciencuadras')? `${portal.url.update}/${id}`:`${portal.url.update}`,
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