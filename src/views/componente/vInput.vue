<template>
	<b-form-input type="text" v-bind="$props" @input="result"></b-form-input>
</template>

<script>
export default {

  name: 'VInput',
  props: {
    value: {
    	type: String,
    	default: null
    },
    state: {
    	type: Boolean,
    	default: null
    },
    name: String,
    id: String,
    type: {
      type: String,
      default: 'capitalize'
    }
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  methods:{
    result(event){
      let value = event;
      switch(this.type){
        case 'capitalize':
          value = event.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
          break;
        case 'slug':
          value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
          value = value.replace(/&/g, 'y');
          value = value.replace(/ /g, '-').toLowerCase().trim();
          break;
      }
  		this.$emit('update', value);
    }
  }
}
</script>