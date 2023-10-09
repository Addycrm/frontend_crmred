<template>
	<ValidationObserver id="FormBlog" ref="form">
    <b-form>
      <b-row>
      	<b-col cols="12">
			    <b-form-file id="featured-image" class="d-none" @input="previewImage"></b-form-file>
      		<ValidationProvider v-slot="{ errors }" rules="required">
            <b-form-group label="Imagen Destacada" class="required" :state="!(errors.length > 0)">
            	<b-form-text class="mb-1">Tamaño de imagen sugerido: 970 x 425</b-form-text>
		      		<div class="content-featured-image">
		      			<b-overlay :show="overlay">
			      			<transition name="fade">
					      		<figure v-if="image" class="featured-image">
					      			<label  class="btn btn-icon d-flex justify-content-center align-items-center mr-10 btn-success rounded-pill" for="featured-image">
					      				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '15px'}" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
					      			</label>
					      			<cld-image v-if="image.indexOf('cloudinary') != -1" :public-id="image | urlImages" >
					              <cld-transformation gravity="center" height="250" width="750" crop="thumb" />
					            </cld-image>
					            <div v-else-if="image.indexOf('data:image') != -1" class="data-image">
					            	<img :src="image" alt="">
					            </div>
					            <div v-else class="imageStorage">
					              <img :src="imgStorageURL(image)" alt="">
					            </div>
					      		</figure>
			      			</transition>
				      		<label v-if="!image" class="add-image" for="featured-image">
				      			<div class="add-image-wrapper">
				      				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="max-width: 100px;" fill="currentColor"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M528 32H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48H528c26.51 0 48-21.49 48-48v-256C576 53.49 554.5 32 528 32zM223.1 96c17.68 0 32 14.33 32 32S241.7 160 223.1 160c-17.67 0-32-14.33-32-32S206.3 96 223.1 96zM494.1 311.6C491.3 316.8 485.9 320 480 320H192c-6.023 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.332-16.68l70-96C252.1 194.4 256.9 192 262 192c5.111 0 9.916 2.441 12.93 6.574l22.35 30.66l62.74-94.11C362.1 130.7 367.1 128 373.3 128c5.348 0 10.34 2.672 13.31 7.125l106.7 160C496.6 300 496.9 306.3 494.1 311.6zM456 432H120c-39.7 0-72-32.3-72-72v-240C48 106.8 37.25 96 24 96S0 106.8 0 120v240C0 426.2 53.83 480 120 480h336c13.25 0 24-10.75 24-24S469.3 432 456 432z"/></svg>
				      				<span class="mt-1">Cargar Imagen</span>
				      			</div>
				      		</label>
				      		<input type="hidden" :value="form.image">
		      			</b-overlay>
		      		</div>
              <b-form-invalid-feedback :state="!(errors.length > 0)">
                Debes cargar una Imagen
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
      	</b-col>
        <b-col  cols="12">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <b-form-group label="Título" class="required">
            	<b-form-input id="titulo" name="titulo" v-model="form.titulo" type="text" @input="slug" :state="errors.length > 0 ? false : null"/>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col  cols="12">
          <b-form-group label="URL Automática">
          	<div class="form-control" readonly>
          		{{form.slug}}
          	</div>
          </b-form-group>
        </b-col>
        <b-col  cols="12">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <b-form-group label="Descripción" class="required">
            	<b-form-input id="descripcion" name="descripcion" v-model="form.descripcion" type="text" :state="errors.length > 0 ? false : null"/>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col  cols="12">
					<ValidationProvider v-slot="{ errors }" rules="required">
	          <b-form-group label="Contenido" class="required" :state="!(errors.length > 0)">
	            <quill-editor
	              v-model="form.contenido"
	              :options="quillOption"
	              id="quill-content"
	            />
	          </b-form-group>
	        </ValidationProvider>
        </b-col>
      </b-row>
    </b-form>
  </ValidationObserver>
</template>
<script>
	import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
	import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from "vee-validate";
	import * as rules from 'vee-validate/dist/rules';
	import { quillEditor } from "vue-quill-editor";
	import { imgValidateURL } from "@/libs/helpers"
	export default {

		name: 'FormBlog',
		components:{
			ValidationProvider,
			ValidationObserver,
			quillEditor
		},
		props:{
			prop: {
				type: Object
			}
		},
		data () {
			setInteractionMode('eager');
	    extend('required', {
	      validate(value) {
	        return {
	          required: true,
	          valid: ['', null, undefined].indexOf(value) === -1
	        };
	      },
	      computesRequired: true
	    });

			return {
				form: {
					id: null,
					image: null,
					titulo: null,
					slug: null,
					descripcion: null,
					contenido: null,
					categorias: '',
					status: '',
				},
				image: '',
				overlay: false,
				quillOption: {
	        placeholder:
	          "Contenido del articulo",
	      },
	      imgValidateURL,
			}
		},
		mounted(){
			if(this.prop.tipo == 'edit'){
				for(let prop in this.form){
					Object.assign(this.form,{
						[prop]: this.prop.item[prop]
					});
				}
				Object.assign(this, {
					image: this.prop.item['image']
				})
			}
		},
		methods: {
			slug(a){
        let _slug = a.replace(/&/g, 'y');
        _slug = _slug.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
        _slug = _slug.replace(/ /g, '_');
        
        let id = this.prop.tipo == 'edit' ? this.form.id + '_' : '';

        this.form.slug = id + _slug.toLowerCase().trim();
      },
			async onSubmit(){
	      let formData = new FormData();
	      
	      for(let prop in this.form){
	      	if([null].indexOf(this.form[prop])){
	          switch(prop){
	            case 'image':
	              formData.append("files",  this.form[prop]);
	              break;
	            default:
	              formData.append(prop,  this.form[prop]);
	          }
	      	}
        }

	      return await this.$refs['form'].validate()
	      .then( async (state) => {
	        if(state){	
	        	return await this.$store.dispatch(`banners/${ this.prop.tipo == 'add' ? 'addblog' : 'updblog'}`, formData)
          	.then((response) => {
          		this.$emit('send', response.data.data);
          		this.$toast({
			          component: ToastificationContent,
			          props: {
			            title: this.prop.tipo == 'add' ? "Blog Creado" : "Blog Actualizado",
			            icon: "CheckCircleIcon",
			            text: this.prop.tipo == 'add' ? 'Tu Blog fue creado exitosamente' : 'Tu Blog fue actualizado exitosamente',
			            variant: "success"
			          }
			        });
	        		return state;
          	}).catch((error) => {
            	console.error(error)
            	this.$toast({
		            component: ToastificationContent,
		            props: {
		              title: 'Algo ha ocurrido',
		              icon: "AlertCircleIcon",
		              text: 'Actualiza el navegador, si el problema persiste comunicate con nosotros',
		              variant: "danger",
		            },
		          },{
		            timeout: 4000
		          });
          	});
	        }
	      })
	    },
	    previewImage(file) {
	    	this.overlay = true;
	    	if(file){
	    		this.form.image = file;
	        let reader = new FileReader();
	        reader.onload = (e) => {
	        	this.overlay = false;
	          this.image = e.target.result;
	        };
	        reader.readAsDataURL(file);
	    	}else{
        	this.overlay = false;
	    	}
	    },
		}
	}
</script>

<style lang="css">
  
  .ql-editor{
    min-height:200px;
  }
  .ql-container.ql-snow {
    border-radius: 0 0 0.351rem 0.351rem!important;
    border-top: none;
  }
  .add-image {
	  color: #999;
	  border: 2px dashed;
	  width: 100%;
	  padding-top: 33.3333%;
	  border-radius: 1rem;
	  position: relative;
	  cursor: pointer;
	  margin: 0;
	}
  .content-featured-image {
	  position: relative;
	  z-index: 1;
	  overflow: hidden;
	  border-radius: 1rem;
	}

	.featured-image {
	  margin: 0;
	  position: relative;
	  z-index: 1;
	  padding-top: 33.3333%;
	}

	.featured-image img {
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  object-fit: cover;
	  object-position: center;
	  top: 0;
	  left: 0;
	}

	.featured-image .btn {
	  position: absolute;
	  top: 0.5rem;
	  right: 0.5rem;
	  z-index: 1;
	}
	.add-image-wrapper {
	  position: absolute;
	  inset: 0;
	  padding: 1rem;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  font-size: 16px;
	}
	.is-invalid .add-image {
	  color: #ea5455;
	}
</style>

Lorem ipsum dolor, sit amet, consectetur adipisicing elit. Ut in ea enim necessitatibus soluta voluptatibus repellat cumque dolores, autem architecto aspernatur, ab ad iure. Nostrum eaque nesciunt sequi saepe iure.