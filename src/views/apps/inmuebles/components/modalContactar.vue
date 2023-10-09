<template>
  <div id="InmuebleDetail" ref="InmuebleDetail" >
    <div class="container-card" v-if="agent.userdata!=null">
      <p class="card-text">{{ agent.userdata.primer_nombre }}</p>
      <a :href="(agent.userdata !=null)?showAgente(agent.userdata.slug):''" target="_blank">
        <b-avatar class="mr-1 card-iamge" size="12rem"  :src="agent.userdata.foto_persona" />
      </a>
    </div>
    <div>
      <h4>
        <strong>
          Escoge algunas de las opciones para contactar con la
          inmobiliaria</strong
        >
      </h4>
      <div class="demo-inline-spacing d-flex justify-content-center">
        <b-img
          thumbnail
          class="img-width-contact"
          :src="require('@/assets/images/redes/phone.png')"
          @click="openLink('phone')"
          alt="Image 1"
        ></b-img>
        <b-img
          thumbnail
          class="img-width-contact"
          :src="require('@/assets/images/redes/email.png')"
          @click="openLink('email')"
          alt="Image 1"
        ></b-img>
        <b-img
          thumbnail
          class="img-width-contact"
          :src="require('@/assets/images/redes/whatsapp.png')"
          @click="openLink('whatsapp')"
          alt="Image 1"
        ></b-img>
      </div>
    </div>
  </div>
</template>

<script>
import {HELPERS } from "@/libs/helpers"

export default {
  name: "modalContactar",
  props:{
    agent: Object,
  },
  data() {
    return {
      mainProps: {
        width: 75,
        height: 75,
        class: "m1",
      },
      infoModal: {
        id: "modal-contacto",
        title: "",
        content: {},
        contentPreguntas: {},
      },
    };
  },

  methods: {
    info(item, button) {
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    showAgente(url){
      const urlAgente = HELPERS.API_URL+"perfil/agente/"+url
      return urlAgente
    },

    openLink(social) {
      let cont = this.agent;
      let phone = null;
      let email = null;

      if (cont.empresa) {
         phone = cont.empresa.celular.replace(/\s+/g, "");
         email = cont.empresa.email;
      } else {
          phone = cont.userdata.celular_movil
          email = cont.email
      }

      switch (social) {
        case "whatsapp":
          window.open(`https://wa.me/+57${phone}`, "_blank");
          break;
        case "phone":
          window.open(`tel:${phone}`);
          break;
        case "email":
          window.open(`mailto:${email}`, "_blank");
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
.img-width-contact {
  min-width: 5em;
  max-height: 5em;
}
.img-width-contact:hover{
  cursor: pointer;
  border: 2px solid var(--primary);
  box-shadow: 0px 0px 8px var(--primary);
}
.container-card{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
  z-index: 1000 !important;
}


.card-iamge:hover{
  box-shadow: 0px 0px 20px var(--primary);

}
.card-text{
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary);
}
</style>
