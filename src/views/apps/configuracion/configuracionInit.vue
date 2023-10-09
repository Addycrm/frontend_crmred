<template>
  <components is="EmpresaForm"></components>
</template>

<script>
  import  EmpresaForm from './EmpresaForm';
  export default {

    name: 'configuracionInit',
    components: {
      EmpresaForm
    },
    data () {
      return {

      }
    },
    mounted(){
      this.$store.dispatch("appConfig/setNavMenuhidden", true);
    }
  }
</script>

<style lang="css" scoped>
</style>
