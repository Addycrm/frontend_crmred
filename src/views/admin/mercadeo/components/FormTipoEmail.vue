<template>
	<ValidationObserver ref="FormTipoEmail">
		<b-form @submit.prevent="handleSubmit(onSubmit)">
			<b-form-group label="Nombre" class="required">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <b-form-input
            id="name"
            name="name"
            v-model="form.name"
            placeholder="Nombre"
          />
          <b-form-invalid-feedback :state="!(errors.length > 0)">
            Registra un Nombre
          </b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
      <b-form-group label="Descripción" class="required mb-0">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <b-form-input
            id="description"
            name="description"
            v-model="form.description"
            placeholder="Descripción"
          />
          <b-form-invalid-feedback :state="!(errors.length > 0)">
            Registra una Descripción
          </b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
		</b-form>
	</ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from 'vee-validate/dist/rules';

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
export default {

  name: 'FormTipoEmail',
  components:{
  	ValidationProvider,
		ValidationObserver
  },
  data () {
  	Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
  	
    return {
    	form: {
    		id: null,
    		name: null,
    		description: null
    	}
    }
  },
  props:['prop'],
  mounted(){
  	if(this.prop){
  		for(let prop in this.form){
  			Object.assign(this.form,{
  				[prop]: this.prop[prop]
  			})
  		}
  	}
  },
  methods:{
  	async onSubmit(){
  		let form = {};
  		for(let prop in this.form){
  			if(this.form[prop]){
	  			Object.assign(form, {
	  				[prop]: this.form[prop]
	  			});
  			}
  		}
  		return await this.$refs['FormTipoEmail'].validate()
  		.then( async (state) => {
  			if(state){
		    	this.$store.dispatch("appMercadeoAdmin/sendMercadeoType", form)
		    	.then(response => {
		    		this.$toast({
		          component: ToastificationContent,
		          props: {
		            title: "Tipo de Email Registrado",
		            icon: "CheckCircleIcon",
		            text: 'Tus Tipo de Email se ha registrado exitosamente',
		            variant: "success"
		          }
		        });
		    	}).catch(error => {
		    		this.$toast({
		          component: ToastificationContent,
		          props: {
		            title: 'Algo ha ocurrido',
		            icon: "AlertCircleIcon",
		            text: 'Si el problema persiste comunicate con nosotros',
		            variant: "danger",
		          },
		        },{
		        	timeout: 4000
		        });
		    	});
  			}
  			return state;
  		})

  	}
  }
}
</script>

<style lang="css" scoped>
</style>