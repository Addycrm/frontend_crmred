<template>
  <div class="container">
    <div class="container_plantilla">
      <h4>Plantilla de importacion de {{ dataImport }}:</h4>
      <b-button class="btn btn-success btn-plantilla" :href="urlPlantilla.example" :download="`plantilla-${dataImport}.xlsl`">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  class="svg-btn">
          <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
        </svg>
        Descargue aqui
      </b-button>
    </div>
    <div  class="container_plantilla">
      <h4>Importar contactos</h4>
      <b-form-file
        @input="previewImage"
        placeholder="Elija un archivo o suéltelo aquí..."
        drop-placeholder="Drop file here..."
      />
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      urlPlantilla:null,
      file: null,
    }
  },
  props:{
    dataImport:{
      type:String
    },
    urlsPortales:{
      type:Array
    }
  },
  created() {
    this.selectedUrlPlantilla()
  },
  methods: {
      selectedUrlPlantilla(){
        this.urlPlantilla=this.urlsPortales.find((element) =>{
          return element.name === this.dataImport
        })
      },
      previewImage() {
      this.$emit('closeModal')
      let input = event.target;
      this.file = input.files[0];
      this.$emit('importExcel',this.file, this.urlPlantilla)
    }
  },
}
</script>


<style scoped>
.container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.svg-btn{
  width: 1rem;
  height: 1rem;
  fill:  var(--primary);
}
.container_plantilla{
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.btn-plantilla{
  width: 16rem;
  align-self: center;
}
</style>