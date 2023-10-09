<template>
	<ValidationObserver ref="form">
		<b-form>
			<template v-for="(input, prop) in inputs">
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
	        	<template v-else-if="input.type == 'file'">
	        		<b-row align-v="end">
	        			<b-col cols="auto">
	        				<b-img v-bind="image.props" :src="image.value" rounded alt="Rounded image"></b-img>
	        			</b-col>
	        			<b-col>
			        		<b-form-file
							      @input="previewImage($event, input)"
							      :state="(errors.length > 0) ? false : null"
							      placeholder="Buscar Imagen..."
							      drop-placeholder="Arrastrar Imagen..."
							      browse-text='Buscar'
							    />
							    <input type="hidden" :value="input.value">
	        			</b-col>
	        		</b-row>
	        	</template>
	        	<template v-else-if="input.type == 'radio'">
	        		<b-form-radio-group v-model="input.value" :name="prop">
	        			<b-form-radio v-for="(item, i) in input.options" :key="i" :value="item.value" :state="(errors.length > 0) ? false : null">
	        				{{item.text}}
	        			</b-form-radio>
	        		</b-form-radio-group>
	        	</template>
	        	<template v-else-if="input.type == 'vInput'">
	        		<VInput v-model="input.value" v-bind="input.props" :state="(errors.length > 0) ? false : null"/>
	        	</template>
	        	<template v-else>
	          	<b-form-input v-model="input.value" :type="input.type" :state="(errors.length > 0) ? false : null"/>
	        	</template>
	        </b-form-group>
	      </ValidationProvider>
			</template>
		</b-form>
	</ValidationObserver>
</template>
<script>
	import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from "vee-validate"
	import * as rules from 'vee-validate/dist/rules'
	import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
	import { quillEditor } from "vue-quill-editor";
	import VInput from '@/views/componente/vInput'
	export default {
		name: 'VForm',
		components: {
			quillEditor,
			ValidationProvider,
			ValidationObserver,
			VInput
		},
		props: {
			row:{
				type: Object
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
				image: {
					value: null,
					props: { 
						blank: true,
						blankColor: '#ddd',
						width: 100,
						height: 60,
						style: {
							objectFit: 'cover',
							objectPosition: 'top center'
						}
					}
				},
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
			this.setData();
		},
		methods: {
			setData(){
				if(this.inputs.image.value){
					this.image.value = this.inputs.image.value;
					this.image.props.blank = false;
				}					
			},
			previewImage(file, input) {
	    	this.overlay = true;
	    	if(file){
	    		input.value = file;
	        let reader = new FileReader();
	        reader.onload = (e) => {
	        	this.overlay = false;
	          this.image.value = e.target.result;
	        	this.image.props.blank = false;
	        };
	        reader.readAsDataURL(file);
	    	}else{
        	this.overlay = false;
	    	}
	    },
			onSubmit(){
				return new Promise(resolve => {
					this.$refs['form'].validate()
					.then(state => {

						let data = new FormData();

						if(this.row)
      				data.append('id', this.row.id);

						for(let prop in this.inputs)
							if(this.inputs[prop].value)
      					data.append(prop, this.inputs[prop].value);

						resolve({state, data})
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