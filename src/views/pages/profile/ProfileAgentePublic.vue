<template>
  <div id="ProfileAgenteVista">
    <components 
      :is="template"
      v-bind="props" 
    />
  </div>
</template>

<script>
import templateAgenteUno from './templates/templateAgenteUno.vue';
import templateAgenteDos from './templates/templateAgenteDos.vue';
export default {

  name: 'ProfileAgenteVista',

  data () {
    return {
      slug: '',
      props: {
        userData: {},
        empresa: {},
        colors: {},
      },
      selected: 0
    }
  },
  components:{
    templateAgenteUno,
    templateAgenteDos
  },
  computed:{
    template(){
      const {selected} = this;
      let temp =  
        selected == 1 ? 'templateAgenteUno':
        selected == 3 ? 'templateAgenteDos':
        '';

      return temp;
    }
  },
  mounted(){
      this.getParam();
  },
  methods: {
    async getParam(){
      this.slug = this.$route.params.code;
      await this.getUserData();
    },
    async getUserData(){
      await this.$store.dispatch('appUser/getUserSession', this.slug)
      .then((response)=>{
        Object.assign(this.props, {
          userData: response,
          empresa: response.empresa,
          colors: {
            color_fondo: response.color_fondo,
            color_fuente: response.color_fuente
          }
        })
        this.selected = response.profile.id
      }).catch((error)=>{
      });
    }
  }

}
</script>

<style lang="css" scoped>
  #ProfileAgenteVista{
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
