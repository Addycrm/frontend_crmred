<template>
  <b-card>
    <TableInmueble />

  </b-card>
</template>

<script>
import TableInmueble from '@/views/apps/inmuebles/inmueble-list/tableInmueble'
export default {

  name: 'InmuebleList',
  components:{
    TableInmueble
  }
}
</script>