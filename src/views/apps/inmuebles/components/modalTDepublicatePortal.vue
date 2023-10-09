<template>
    <section>
        <div v-if="tablaInmuebles" class="container__list">
            <button @click="depublicationMasive(appPortal.portales)" class="btn btn-warning">
                Despublicar ahora
            </button>
            <div class="container__item" v-for="inmueble in tablaInmuebles.data" :key="inmueble.id" >
              <div class="meta_inmueble">
                  <div>
                      <img v-if="inmueble.inmueble_imagenes.length>0" :src="inmueble.inmueble_imagenes[0].url" :alt="inmueble.titulo_inmueble" width="100" height="100">
                  </div>
                  <div>
                      <p>ID: {{ inmueble.id }}</p>
                      <p>Nombre : {{ inmueble.titulo_inmueble }}</p>
                  </div>
              </div>
              <div class="container_portales">
                <ul class="list_portal">
                  <li v-for="item in appPortal.portales" :key="item.name" class="item_portal">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon_check" :class="[(item.stateSync)?'check_sync':'']">
                      <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg> -->
                    <div :ref="item.id">
                    </div>
                    <div class="item_portal-logo">
                      <div :ref="item.name" class="container_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class=" svg_icon"
                          :class="[(validatecheck(inmueble,item)) ? 'check_positive' : '']" style="
                              width:40px;
                          ">
                          <path
                            d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
            
                      </div>
                      <div >
                        <img :src="item.image" style="height: 50px" />
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-if="stateError.length > 0" class="container_error">
                  <p>Si los errores persisten. Por favor copiar el error y enviarlo a soporte. </p>
                  <ul class="list_error">
                    <li v-for="item in stateError" :key="item.portal" class="item_error">
                      <div class="item-error_portal">
                        <p class="error_portal"> {{ item.portal }} :</p>
                        <p class="error_type">{{ item.error.errorMessage }} </p>
                      </div>
                      <button v-clipboard:copy="JSON.stringify(item.error)" v-clipboard:success="onCopy" v-clipboard:error="onError"
                        class="btn btn-primary">Copiar Error</button>
                    </li>
                  </ul>
          
                </div>
              </div>
            </div>
        </div>
    </section>
</template>

<script>
import mixinPortalesDesMasive from "@/views/apps/inmuebles/mixinDesPortalesMasive";

export default {
  mixins: [mixinPortalesDesMasive],
  data() {
    return {
    }
  },
  props: {
    tablaInmuebles:{
      type: Object
    }
  },
  methods: {
    onCopy: function (value, event) {
      alert('Copiado en el portapapeles')
    },
    onError: function (value, event) {
      alert('No se pudo copiar el texto al portapapeles')
    },
    validatecheck(inmueble,item) {
      let check = inmueble.portale_state_inmueble.some((element) => {
        return Number(item.id) == Number(element.id_portal)
      });
      return check

    },
    depublicationMasive(portales) {
        this.tablaInmuebles.data.map((inmueble)=>{
            this.selectPortales(portales, inmueble)
        })
      // this.validatePortal(portales,this.inmueble)
    }

  },
}
</script>
<style scoped>

.container__list{
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.container__item{
    padding: 12px;
    border:2px solid var(--primary);
    border-radius: 10px;

}
.meta_inmueble{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
}
li {
  list-style: none;
}
ul{
    padding: 0;
}

.container_icon {
  width: auto;
}

.container_portales {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item_error {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.error_portal{
  margin: 0;
  border-bottom: 2px solid white;
}
.error_type{
  margin: 0;
}
.item-error_portal{
  max-width: 500px;
}

.list_error {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.svg_icon {
  width: 40px;
  fill: gray;
}

.check_positive {
  fill: green;
}

.check_negative {
  fill: red;
}

.container_error {
  width: 100%;
  padding: 1rem;
  background-color: #ff4743;
  opacity: 0.6;
  color: white;
  font-weight: bold;
}

.list_portal {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: auto;
  gap: 0.5rem;
}

.check_sync {
  border: 2px solid green;
}

.icon_check {
  width: 30px;
  height: 30px;
}

.item_portal {
  display: flex;
  flex-direction:column;
  gap: 4px;
  justify-content:center;
  align-items:center;
}
.item_portal-logo{
  display: flex;
  gap: 1rem;
  justify-content:center;
  align-items:center;
}
</style>