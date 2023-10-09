<template>

<div class="container-card">
  <b-card
    img-alt="Image"
    img-left
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    v-for="item in plataform" :key="item.name"
  >
  <h5 class="title__card">{{item.slogan}}</h5>
  <div class="container-data">
    <img :src="item.logo" :width="item.width" :height="item.height" />
    <b-button :href="item.url" variant="primary" target="_blank">Acceder</b-button>
  </div>

  </b-card>
</div>
</template>

<script>
  export default {

    name: 'item-plataform',
    data(){
      return{
        plataform:[
          {
            name:'Red Academy',
            slogan:'Aprende de los Profesionales mas Exitosos en la Industria Inmobiliaria',
            logo:'https://res.cloudinary.com/reality-inmo/image/upload/v1678746142/inmuebles/crmred/kwacademy-nuevo-black_tjxj2u.png',
            url:'https://academy.red-realestate.com/',
            width:170,
            height:80,
          },
          {
            name:'RedFincaraiz',
            slogan:'Red Fincaraíz es una plataforma líder en el ámbito de bienes raíces.',
            logo:'https://res.cloudinary.com/dv0z0qvha/image/upload/v1696347261/BANNERS/RED-REALESTATE/LOGO-RED-FINCA-RAIZ_1_jnr9sx_rh7nos.png',
            url:'https://redfincaraiz.com/',
            width:100,
            height:100,
          },
          {
            name:'RedPartners',
            slogan:'Red Partners es un programa de vanguardia diseñado para impulsar a agentes',
            logo:'https://res.cloudinary.com/dv0z0qvha/image/upload/v1696347381/BANNERS/RED-REALESTATE/redPatners_o39apm_xgelqo.svg',
            url:'https://res.cloudinary.com/reality-inmo/image/upload/v1692804335/PRESENTACIO%CC%81N_RED_PARTNERS_AGO_2023_doktp6.pdf',
            width:180,
            height:100,
          },
          {
            name:'Red Travel',
            slogan:'Imagina tener a tu alcance una puerta abierta a un universo de destinos esperando a ser explorados.',
            logo:'https://res.cloudinary.com/dv0z0qvha/image/upload/v1696347770/BANNERS/RED-REALESTATE/RED_TRAVEL_LIFESTYLE_1_zy5vbk.png',
            url:'https://red-realestate.com/giveaways/',
            width:170,
            height:85,
          },
          {
            name:'digital-money',
            slogan:'Real Estate Digital Money (RED MONEY) es una Criptomoneda respaldada en inversiones digitales',
            logo:'https://res.cloudinary.com/reality-inmo/image/upload/v1678746143/inmuebles/crmred/r-logo-2_yh4upj.png',
            url:'https://myredmoney.com/',
            width:50,
            height:50,
          },
        //   {
        //     name:'inversor',
        //     slogan:'Invierte en la compra y venta de propiedad raiz inteligentemente',
        //     logo:'https://res.cloudinary.com/reality-inmo/image/upload/v1678746142/inmuebles/crmred/logo-reducido-3_wrkveg.png',
        //     url:'https://inversorinmobiliario.co/',
        //     width:110,
        //     height:90,
        //   },
        //   {
        //     name:'red-inmobiliaria',
        //     slogan:'Accede a inventarios corporativos de inmuebles y convenios',
        //     logo:'https://res.cloudinary.com/reality-inmo/image/upload/v1678746142/inmuebles/crmred/red-inmobiliaria_kg9rfn.png',
        //     url:'https://www.red-inmobiliaria-colombia.inmob.site/',
        //     width:150,
        //     height:90,

        //   }
        ]
      }
    }

  }
</script>
<style>
.card-img-top{
  width:50%;
  max-height:150px;
  object-fit:cover;
}
.container-card{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  grid-auto-rows:300px;
  grid-gap:1rem;
  padding:1rem;
  background-color:white;
}
.container-data{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
}
.title__card{
  color: var(--primary);
  font-weight: bold;
}
</style>
