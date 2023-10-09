export default {
	methods: {
		setUserData(){	
			return new Promise ((resolve, reject) => {
				this.$store
	      .dispatch('authModule/getUserdata')
	      .then(async response => {
	        const {userData} = response;

	        this.$store.commit("userData/UPDATE_USER_DATA", userData);
	        this.$ability.update(userData.ability);

	        resolve(userData);
	       
	      }).catch(error => {
	      	reject(error);
	      });
			})
		}
	}
}