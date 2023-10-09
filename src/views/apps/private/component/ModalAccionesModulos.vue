<template>
	<ValidationObserver ref="form">
		<b-form>
			<template v-for="input in inputs">
				<ValidationProvider  v-slot="{ errors }" :name="input.label" rules="required">
	        <b-form-group :label="input.label" class="required">
	          <b-form-input v-model="input.value" type="text" :state="(errors.length > 0) ? false : null"/>
	        </b-form-group>
	      </ValidationProvider>
			</template>
		</b-form>
	</ValidationObserver>
</template>
<script>
	import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
	import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from "vee-validate"
	import * as rules from 'vee-validate/dist/rules'
	export default {
		name: 'ModalAccionesModulos',
		components: {
			ValidationProvider,
			ValidationObserver
		},
		props: {
			prop: String,
			commit: String,
			row: Object,
			config: Object,
			inputs: {
				type: Object,
				default: () => {}
			},
		},
		data () {
			setInteractionMode('eager');
			Object.keys(rules).forEach(rule => {
	      extend(rule, rules[rule]);
	    });
			return {

			}
		},
		methods: {
			onSubmit(){
				return new Promise(resolve => {
					this.$refs['form'].validate()
					.then(state => {
						let data = {}

						if(this.row)
							data.id = this.row.id;

						for(let prop in this.inputs)
							Object.assign(data, {[prop]: this.inputs[prop].value});

						Object.assign(this.config, {data});

						if(state){
							this.$http(this.config).then(res => {
								let value = {
									prop: this.prop,
									value: res.data.data
								}
			          this.$store.commit(!this.row ? 'appRole/ADD_STATE':'appRole/UPDATE_STATE', value);
			          this.$toast({
			          	component: ToastificationContent,
			         		position: "top-center",
			            props: {
			              icon: "CheckCircleIcon",
			              title: 'Registro exitoso',
			              variant: "success",
			              text: 'Datos registrado exitosamente'
			            }
			          });
			          resolve(true);
			        }).catch(err => {
			          console.error(err);
			          this.$toast({
			          	component: ToastificationContent,
			          	position: "top-center",
			            props: {
			              title: 'Algo salio mal',
			              icon: "AlertCircleIcon",
			              variant: "danger",
			              text: 'Si el problema persiste actualiza la pagina, si el problema persiste comunicate con soporte',
			            },
			          });
			          resolve(false);
			        });
						}else{
							resolve(false);
						}
					})
				});
			}
		}
	}
</script>