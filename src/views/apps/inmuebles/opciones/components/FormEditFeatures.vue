<template>
    <div class="features">
            <b-col cols="12">
                <div class="container_table">
                    <div class="table_left">
                        <p class="title_table">ID</p>
                        <p>{{ propFeature.data.id }}</p>
                    </div>
                    <div class="table_right">
                        <p class="title_table">Nombre</p>
                        <p>{{ propFeature.data.texto }}</p>
                    </div>
                </div>
            </b-col>
            <validation-observer ref="formFeatures">
                <b-col cols="12">
                    <b-form-group
                        label="Nombre de la caracteristica:"
                        label-for="nameFeature"
                        label-size="md"
                    >
                    <validation-provider
                        #default="{ errors }"
                        name="nameFeature"
                        rules="required"
                        >
                        <b-form-input
                        id="nameFeature"
                        :state="errors.length > 0 ? false:null"
                        placeholder="Nuevo valor"
                        v-model="newName"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group
                        label="Código CPANEL:"
                        label-for="cpanel"
                        label-size="md"
                    >
                    <validation-provider
                        #default="{ errors }"
                        name="cpanel"
                        rules="required"
                        >
                        <b-form-input
                        id="cpanel"
                        :state="errors.length > 0 ? false:null"
                        placeholder="Nuevo valor"
                        v-model="newCpanel"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                </b-col>
            </validation-observer>
            
        <b-button variant="success" @click="validateForm()">Guardar</b-button>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import {
  required
} from '@validations'
export default{
    data(){
        return{
            required,
            newName:null,
            newCpanel:null,
        }
    },
    components:{
        ValidationProvider,
        ValidationObserver,
    },
    props:{
        propFeature:{
            typpe:Object
        }
    },
    mounted() {
        this.newName = this.propFeature.data.texto;
        if(this.propFeature.data[ this.propFeature.configUrl.pathCpanel]){
            this.newCpanel = this.propFeature.data[ this.propFeature.configUrl.pathCpanel].codigo
        }
    },
    methods:{
        showToast({title,text,variant}) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title,
          icon: 'BellIcon',
          text,
          variant,
        },
      })
    },
        validateForm(){
        this.$refs.formFeatures.validate().then(success => {
            if (success) {
            this.stateSpinner=true
            this.HandleSendForm()
            }
        })
        },
        async HandleSendForm(){
            let data = {
                id:this.propFeature.data.id,
                value:this.newName,
                cpanel:this.newCpanel,
                configUrl:this.propFeature.configUrl.url
            }
            let res = await this.$store.dispatch("featureStoreModule/sendFormFeatures",data)
            if(res.success){
                this.showToast({
                    title:'Actualización Exitosa',
                    text:'Se ha registrado correctamente',
                    variant:'success'
                })
                this.$emit('updateFeaturesTable', res.data)

            }else{
                this.showToast({
                    title:'Hubo un error!',
                    text:'Intenta nuevamente',
                    variant:'danger'
                })
            }

        }
    }
}
</script>
<style scoped lang="scss">
p{
    margin: 0;
    padding: 0;
}

.features{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
}
.container_table{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 250px;
    margin: 0 auto;
    .title_table{
        color: var(--primary);
        font-weight: bold;
    }
}
.table_left,.table_right{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>