<template>
	<b-form>
    <b-form-group>
			<b-form-checkbox-group v-model="data.actions" name="action">
				<b-row col cols="2" class="my-n10">
					<b-col class="py-10" v-for="item in actions" :key="item.id">
		      	<b-form-checkbox class="m-0" :value="item.id">{{item.title}}</b-form-checkbox>
					</b-col>
				</b-row>
	    </b-form-checkbox-group>
    </b-form-group>
	</b-form>
</template>
<script>
	import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
	export default {
		name: 'ModalPermisosAcciones',
		props: {
			row: Object,
		},
		data () {
			return {
				data: {
					actions: [],
					permission: this.row.id
				}
			}
		},
		computed: {
			actions(){
        return this.$store.state.appRole.actions;
      },
		},
		mounted(){
			this.setActions();
		},
		methods: {
			setActions(){
				for(let item of this.row.actions[0])
					this.data.actions.push(item.id);
			},
			onSubmit(){
				return new Promise(resolve => {
					this.$http({
						url: 'api/auth/actions',
						method: 'post',
						data: this.data
					}).then(res => {
					  let value = {
							prop: 'permissions',
							value: res.data.data
						}
					  this.$store.commit('appRole/UPDATE_STATE', value);
	          this.$toast({
	          	component: ToastificationContent,
	         		position: "top-center",
	            props: {
	              icon: "CheckCircleIcon",
	              title: 'Permiso Actualizado',
	              variant: "success",
	              text: 'Tu permiso se actualizo exitosamente'
	            }
	          });
	          resolve(true);
	        }).catch(err => {
	          console.error(err);
	          this.$toast({
	          	component: ToastificationContent,
	          	position: "top-center",
	            props: {
	              title: 'Algo salio mal',
	              icon: "AlertCircleIcon",
	              variant: "danger",
	              text: 'Si el problema persiste actualiza la pagina, si el problema persiste comunicate con soporte',
	            },
	          });
	          resolve(false);
	        });
				});
			}
		}
	}
</script>