export default {
	methods: {
    errorState(error){
      return error.length > 0 ? false : null;
    }
	}
}