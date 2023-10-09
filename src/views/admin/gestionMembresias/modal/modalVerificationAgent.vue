<template>
  <div>
    <div class="d-flex justify-content-between mb-2">
      <h3>Verificacion de cambio de plan</h3>
      <b-badge variant="primary" size="lg" class="p-auto">
        <span>
          {{ selected.code }}
        </span>
      </b-badge>
    </div>
    <b-col cols="12">
      <b-table striped hover responsive :items="agentsAllSelected" :fields="fields" ref="selectableTable">
        <template v-slot:cell(userdata.foto_persona)="data">
          <b-avatar :src="data.value" />
        </template>
      </b-table>
    </b-col>
    <div class="container__btn">
      <button type="button" class="btn btn-primary" @click="handleChangePlans()">
        Cambiar a plan {{ selected.code }}
      </button>
    </div>
  </div>
</template>
<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  
  props: {
    selected:{}
  },
  data() {
    return {
      selectedAgents: null,
      fields: [
        {
          key: 'id', label: 'Id',
        },
        {
          key: 'userdata.foto_persona', label: 'imagen',
        },
        {
          key: 'userdata.primer_nombre', label: 'Nombre',
        },
      ],
    }
  },
  computed:{
    agentsAllSelected(){
        return this.$store.state.appAgents.selectallAgents;
    },
  },
  methods: {
    async handleChangePlans(){
      let userArray = this.agentsAllSelected.map((item) =>{
        return {id:item.id}
      })
        let data = {
          user:userArray,
          plan:this.selected.id
        }

        let res = await this.$store.dispatch('appAgents/changePlansAgent',data)
        
        if(res.succes){
          this.showToast()
          this.$emit("closeModal")
          this.$store.commit('appAgents/SELECT_AGENTS_ALL',[])
          this.$store.commit('appAgents/UPDATE_AGENTS_ALL')
        }else{
          this.$toast({
	          component: ToastificationContent,
	          props: {
	            title: 'Algo salio mal',
	            icon: "AlertCircleIcon",
	            text: 'No se pudo actualizar de membresia, intentalo nuevamente.',
	            variant: "danger",
	          },
	        })
        }
    },
    showToast(){
      this.$swal({
            title:"Actualización exitosa",
            text: "Agente actualizado exitosamente",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            confirmButtonText: "Cerrar",
            buttonsStyling: false,
          });
  }
}

}

</script>

<style scoped>
.container__btn{
  display: flex;
  justify-content: center;
}
</style>