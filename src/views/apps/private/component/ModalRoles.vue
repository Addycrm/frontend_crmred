<template>
	<ValidationObserver ref="form">
		<b-form>
			<template v-for="input in inputs">
				<ValidationProvider v-slot="{ errors }" :name="input.label" rules="required">
	        <b-form-group :label="input.label" class="required">
	        	<template v-if="input.type == 'textarea'">
			        <div id="quill-toolbar"class="d-flex justify-content-center">
				        <button class="ql-bold" />
				        <button class="ql-italic" />
				        <button class="ql-underline" />
				      </div>
			    		<quill-editor id="quil-content"v-model="input.value" :class="{'is-invalid': errors.length > 0}" :options="editorOption"/>
	        	</template>
	        	<template v-else>
	          	<b-form-input v-model="input.value" type="text" :state="(errors.length > 0) ? false : null"/>
	        	</template>
	        </b-form-group>
	      </ValidationProvider>
			</template>
		</b-form>
	</ValidationObserver>
</template>
<script>
	import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
	import { quillEditor } from "vue-quill-editor";
	import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from "vee-validate"
import * as rules from 'vee-validate/dist/rules'
	export default {
		name: 'ModalRoles',
		components: {
			quillEditor,
			ValidationProvider,
			ValidationObserver,
		},
		props: {
			row: Object,
			type: {
				type: String,
				default: 'public'
			},
			inputs: {
				type: Object,
				default: () => {},
			}
		},
		data () {
			setInteractionMode('eager');
			Object.keys(rules).forEach(rule => {
	      extend(rule, rules[rule]);
	    });
			return {
				editorOption: {
	        modules: {
	          toolbar: "#quill-toolbar",
	        },
	        placeholder: "Escribe una nota",
	      }
			}
		},
		computed: {
			actions(){
        return this.$store.state.appRole.actions;
      },
		},
		mounted(){
		},
		methods: {
			onSubmit(){
				return new Promise(resolve => {
					this.$refs['form'].validate()
					.then(state => {
						let data = {
							type: this.type
						}

						if(this.row)
							data.id = this.row.id;

						for(let prop in this.inputs)
							Object.assign(data, {[prop]: this.inputs[prop].value});
						
						if(state){
							this.$http({
								url: 'api/auth/roles',
								method: 'post',
								data
							}).then(res => {
							  let value = {
									prop: this.type == 'public' ? 'roles' : 'role_users',
									value: res.data.data.roles
								}
							  this.$store.commit(!this.row ? 'appRole/ADD_STATE':'appRole/UPDATE_STATE', value);
			          this.$toast({
			          	component: ToastificationContent,
			         		position: "top-center",
			            props: {
			              icon: "CheckCircleIcon",
			              title: !this.row ? 'Role Creado': 'Role Actualizado',
			              variant: "success",
			              text: !this.row ? 'Tu role fue creado exitosamente': 'Tu role fue actualizado exitosamente'
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
<style>
	.is-invalid.quill-editor .ql-container {
  	order-color: #f00!important;
	}
</style>