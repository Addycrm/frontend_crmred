<template>
	<div id="CropImage" ref="CropImage">
		
	</div>
</template>

<script>
	import FilerobotImageEditor from 'filerobot-image-editor';
	export default {
		name: 'CropImage',
		data () {
			return {

			}
		},
		props: ['imagen', 'image'],
		model: {
			prop: 'image',
			event: 'change'
		},
		mounted(){
      this.imageEdit(this.$refs['CropImage'], this.imagen);
    },
		methods:{
			imageEdit($element, source){
				let $this = this;
        const { TABS } = FilerobotImageEditor;
        const config = {
          source,
          defaultSavedImageName: 'Prueba',
          language: 'es',
          closeAfterSave: true,
          getCurrentImgDataFnRef:{
					  extension: 'JPEG',
					  quality: 80,
					  size: {
					    width: 1920
					  },
					},
          Crop: {
            ratio: 3.2 / 1,
            maxWidth: 1920,
            autoResize: true,
            noPresets: true,
          },
          tabsIds: [TABS.RESIZE],
          defaultTabId: TABS.RESIZE,
          defaultSavedImageType: 'webp',
          onSave: (a, b) => {
          	let imagen = new File([a.imageBase64], a.fullName,{type: a.mimeType});
          	
          	this.$emit('image', a.imageBase64)
          	this.$emit('change', imagen);
          },
        };

        const filerobotImageEditor = new FilerobotImageEditor($element, config);
        filerobotImageEditor.render({
          onClose: (closingReason) => {
            this.$emit('close');
          }
        });
      }
		}
	}
</script>
<style>
	#CropImage {
	  position: absolute;
	  z-index: 9;
	  inset: 0;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  background: #00000080;
	}
	#CropImage > * {
	  height: 500px!important;
	  width: 90%;
	  max-width: 600px!important;
	}
</style>