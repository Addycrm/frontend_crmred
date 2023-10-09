<template>
  <div>
    <b-overlay :show="show" rounded="sm">
        <b-col>
          <div class="d-flex flex-wrap" style="gap:1rem;">
            <b-card class="container-card col-md-auto">
                <b-card-text>
                  <h3>
                    <strong>Importar links y vistas de inmuebles </strong>
                  </h3>
                </b-card-text>
                <b-row>
                  <b-col>
                    <b-button variant="success" @click="showModalmport('inmuebles')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-btn_import">
                        <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/>
                      </svg>
                      Importar
                    </b-button>
                  </b-col>
                </b-row>
            </b-card>
            <b-card class="container-card col-md-auto">
                <b-card-text>
                  <h3>
                    <strong>Importar contactos de portal Proppit</strong>
                  </h3>
                </b-card-text>
                <b-row>
                  <b-col>
                    <b-button variant="success" @click="showModalmport('contactos-proppit')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-btn_import">
                        <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/>
                      </svg>
                      Importar
                    </b-button>
                  </b-col>
                </b-row>
            </b-card>
            <b-card class="container-card col-md-auto">
                <b-card-text>
                  <h3>
                    <strong>Importar contactos portal Ciencuadra</strong>
                  </h3>
                </b-card-text>
                <b-row>
                  <b-col>
                    <b-button variant="success" @click="showModalmport('contactos-ciencuadra')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-btn_import">
                        <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/>
                      </svg>
                      Importar
                    </b-button>
                  </b-col>
                </b-row>
            </b-card>
            <b-card class="container-card col-md-auto">
                <b-card-text>
                  <h3>
                    <strong>Importar contactos portal MetroCuadrado</strong>
                  </h3>
                </b-card-text>
                <b-row>
                  <b-col>
                    <b-button variant="success" @click="showModalmport('contactos-metrocuadrado')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-btn_import">
                        <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/>
                      </svg>
                      Importar
                    </b-button>
                  </b-col>
                </b-row>
            </b-card>
          </div>
        </b-col>
        <b-col>
        </b-col>
      <v-modal v-if="stateModalContact" @close="stateModalContact = false" titulo="Importar contactos" >
          <component is="importContact" @importExcel="importExcel" @closeModal="closeModal" :dataImport="typeImport" :urlsPortales="urlsPortales"/>
        </v-modal>
    </b-overlay>
  </div>
</template>

<script>
import VModal from "@/views/componente/vModal";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import importContact from './profile/component/importContact.vue'
export default {
  data() {
    return {
      typeImport:null,
      apiImport:null,
      file: null,
      show: false,
      stateModalContact:false,
      urlsPortales:[
        {
          name:'inmuebles',
          url:'api/auth/subportales/import-contact',
          example:'https://res.cloudinary.com/reality-inmo/raw/upload/v1676930127/inmuebles/impordata_ez8ig2.xlsx'
        },
        {
          name:'contactos-proppit',
          url:'api/auth/subportales/import-proppit',
          example:'https://res.cloudinary.com/reality-inmo/raw/upload/v1685055183/leads_ejemplo_ugfmat.xlsx'
        },
        {
          name:'contactos-ciencuadra',
          url:'api/auth/clientes-import-ciencuadra',
          example:'https://res.cloudinary.com/reality-inmo/raw/upload/v1678380185/inmuebles/ejemplociencuadra_ty9vrw.xlsx'
        },
        {
          name:'contactos-metrocuadrado',
          url:'api/auth/clientes-import-metrocuadrado',
          example:'https://res.cloudinary.com/reality-inmo/raw/upload/v1684353829/metrocuadrado_flp0ir.xlsx'
        }
      ]
    };
  },
  components:{
    importContact,
    VModal,
  },
  methods: {
    closeModal(){
      this.stateModalContact = false
    },
    showModalmport(data){
      this.typeImport=data
      this.stateModalContact=true
    },
    async importExcel(file,select) {
      
      this.show = true;
      let formData = new FormData();
      formData.append("file", file);
      await this.$http
        .post(`${select.url}`,formData,{
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.status === 200) {
            this.show = false;
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
          this.show = false;
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
  },
};
</script>
<style scoped>
.svg-btn_import{
  width: 1rem;
  height: 1rem;
  fill: white;
}


@media (min-width:726px) {
  .container-card{
    width: 500px;
  }
}
</style>
