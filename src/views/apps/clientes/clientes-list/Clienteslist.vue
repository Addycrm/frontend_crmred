<template>
  <b-card>
    <TablaClientes></TablaClientes>
  </b-card>
</template>

<script>
import TablaClientes from '@/views/apps/clientes/clientes-list/tablaClientes'
export default {
  name: 'clientesList',
  components: {
    TablaClientes
  }
}
</script>