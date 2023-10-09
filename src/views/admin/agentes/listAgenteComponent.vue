<template>
  <b-card>
    <tableAgend></tableAgend>
  </b-card>
</template>

  <script>
import tableAgend from "@/views/admin/agentes/table.vue";
export default {
  name: "listAgenteComponent.vue",
  components: {
    tableAgend,
  },
};
</script>
