<template>
	<ValidationObserver ref="FormObserver">
    <b-form>
      <ValidationProvider v-slot="{errors}" rules="required">
        <b-form-group label="Estado de la Cita" class="required" :state="!(errors.length > 0)">
          <v-select
            v-model="form.state_cita"
            :options="estadoCita"
            label="name"
          />
            <!-- :reduce="type => type.id" -->
        </b-form-group>
      </ValidationProvider>
      <b-form-group label="Comentario">
        <b-form-textarea
				  v-model="form.comentario_cita"
				  rows="3"
				  max-rows="6"
				/>
      </b-form-group>
    </b-form>
    <b-button @click="onSubmit(form)" variant="info" class="mt-1">Guardar</b-button>
  </ValidationObserver>
</template>

<script>
	import {ValidationProvider, ValidationObserver, setInteractionMode, extend, } from "vee-validate";
	import * as rules from "vee-validate/dist/rules";
	import vSelect from "vue-select";
	import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
	export default {

		name: 'ModalEstadoCita',
		components: {
			ValidationProvider,
			vSelect,
			ValidationObserver,
		},
		props: ['modalState', 'agenda'],
		model: {
			prop: 'modalState',
			event: 'close'
		},
		data () {
			setInteractionMode("eager");
	    Object.keys(rules).forEach((rule) => {
	      extend(rule, rules[rule]);
	    });
			return {
				form: {
	        id_agenda: this.agenda,
	        state_cita: null,
	        comentario_cita: null,
	      }
			}
		},
		mounted(){
			this.$http({
				url: `api/auth/api-agenda-state/agenda_cita/${this.agenda}`,
				method: 'get'
			}).then(res => {
				this.setData(res.data.data.estado);
			}).catch(err => {

				let {status} = err.response;
				if(status !== 404){
					this.$emit('close');
					this.$toast({
	          component: ToastificationContent,
	          props: {
	            title: 'Algo salio mal',
	            icon: "AlertCircleIcon",
	            text: 'Si el problema persiste recargar la pagina o comunicate con soporte',
	            variant: "danger",
	          },
	        });
				}

			})
		},
		computed: {
			estadoCita(){
	      return this.$store.state.appConfiguracion.tags.stcita;
	    }
		},
		methods: {
			setData(data){
				for(let prop in this.form)
					if(prop != 'id')
						this.form[prop] = data[prop];
			},
			onSubmit(data){
				this.$refs['FormObserver'].validate()
				.then(state => {
					if(state){
						this.$http({
							url: 'api/auth/api-agenda-state/register',
							method: 'post',
							data
						}).then( res => {
							this.$toast({
		            component: ToastificationContent,
		            position: "top-center",
		            props: {
		              title: 'Estado Actualizado',
		              icon: "CheckCircleIcon",
		              variant: "success",
		              text: 'El estado del Inmueble ha sido actualizado exitosamente',
		            },
		          });
							this.$emit('close', false);
						}).catch(err => {
							this.$toast({
			          component: ToastificationContent,
			          props: {
			            title: 'Algo salio mal',
			            icon: "AlertCircleIcon",
			            text: 'Si el problema persiste recargar la pagina o comunicate con soporte',
			            variant: "danger",
			          },
			        });
						})
					}
				})
			}
		}
	}
</script>