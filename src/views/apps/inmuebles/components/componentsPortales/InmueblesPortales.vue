<template>
	<div id="Portal" class="contentPortlaModal">
    <div class="alert p-2 mt-3 alert-secondary" role="alert">
      <b-row align-v="center" v-if="state == 'publicado'">
        <b-col cols="auto">
          Codigo: {{portal.portales_codigo_response.codigo}}
        </b-col>
        <b-col cols="auto">
          <b-button variant="info" size="sm" :href="`https://www.fincaraiz.com.co/detail.aspx?a=${portal.portales_codigo_response.codigo}&preview=ov`" target="_blank">
            Ver en portal
          </b-button>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col>
          <h3 class="sync">Sincronizar este inmueble</h3>
        </b-col>
      </b-row>
    </div>
	</div>
</template>

<script>
export default {

  name: 'InmueblesPortales',
  props:{
  	portal: Object,
    state: String
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
  .sync {font-size: 18px;margin: 0!important;font-weight: 600;}
</style>