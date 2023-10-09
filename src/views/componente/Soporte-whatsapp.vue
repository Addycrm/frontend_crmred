<template>
  <div class="whatsappSupport">
    ¿Tienes alguna duda o problema?<br><a :href="wame" target="_blank">Contáctanos</a>
  </div>
</template>

<script>
export default {
  name: "soporteWhatsapp",
  data() {
    return {
      path: "http://wa.me/",
      whatsapp: "573186155244",
    }
  },
  computed:{
    wame(){
      return this.path + this.whatsapp;
    }
  }
};
</script>