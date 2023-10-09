<template>
	<b-form>
		<b-overlay :show="overlay"	>
			<template v-for="(permiso, index) in permisos">
				<hr v-if="index != 0">
		    <b-form-group :label="permiso.title" label-size="lg" label-class="font-weight-bolder" :key="permiso.id">
					<b-form-checkbox-group v-model="permiso.value" name="action">
						<b-row col cols="3" class="my-n10">
							<b-col class="py-10" v-for="item in permiso.actions" :key="item.id">
				      	<b-form-checkbox class="m-0" :value="{id: item.id}">{{item.title}}</b-form-checkbox>
							</b-col>
						</b-row>
			    </b-form-checkbox-group>
		    </b-form-group>
			</template>
		</b-overlay>
	</b-form>
</template>
<script>
	import ToastificationContent from "@core/components/toastification/ToastificationContent"
	import mixinApis from '@/views/componente/mixinApis'
	export default {
		name: 'ModalPermisosRoles',
		mixins:[mixinApis],
		props: {
			row: Object,
		},
		data () {
			return {
				permisos: [],
				overlay: false,
				apiOptions: [
          {
            api: 'appRole/getPermissionsActions',
            data: {}
          }
        ]
			}
		},
		computed: {
			permissions(){
        return this.$store.state.appRole.permissions;
      },
		},
		async mounted(){
			await this.initApis(this.apiOptions);
			this.setActions();
		},
		methods: {
			setActions(){
				this.permisos = this.permissions.filter(item => {
					item.value = [];

					for(let permiso of this.row.permissions)
						if(item.id == permiso.id)
							for(let action of permiso.actions)
								item.value.push({id: action.id});
							
					return item.actions.length > 0;
				});
			},
			async sendActions(data){
				this.overlay = true;
				await this.onSubmit(data);
				this.overlay = false;
			},
			onSubmit(){
				let data = {
					role: this.row.id,
					permission: [],
				};
				for(let item of this.permisos)
					if(item.value.length)
						data.permission.push({
							id: item.id,
					  	actions: item.value
						});
				
				return new Promise(resolve => {
					this.$http({
						url: 'api/auth/permission/permissions-active-role',
						method: 'post',
						data
					}).then(res => {
						let value = {
							prop: 'role_users',
							value: res.data.data.role
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