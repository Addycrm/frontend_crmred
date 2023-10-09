import { initialAbility } from "@/libs/acl/config";

export default {
	methods: {
		logout() {
			let keys = ['userData', 'accessToken', 'refreshToken', ];
			for(let key of keys)
	      localStorage.removeItem(key);
      
      this.$router.push({ name: "auth-login" });
      this.$store.commit("userData/DELETE");
      this.$ability.update(initialAbility);
      location.reload();
    },
	}
}