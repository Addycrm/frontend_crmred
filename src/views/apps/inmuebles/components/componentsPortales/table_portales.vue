<template>
  <table id="customers">
    <tr>
      <th>Logo</th>
      <th>Nombre</th>
    </tr>
    <tr>
      <td>
        <img
          :src="data.image"
          alt=""
          class="img_portal"
          srcset=""
        />
      </td>
      <td>{{ data.name }}</td>
    </tr>
  </table>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>