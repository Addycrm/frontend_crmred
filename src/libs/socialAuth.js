import Vue from 'vue'
import VueSocialauth from 'vue-social-auth'

Vue.use(VueSocialauth, {

    providers: {

      facebook: {
        clientId: '550019836339534',
        redirectUri: 'https://app.addy.la/auth/facebook/callback' // Your client app URL
      },
      google: {
        clientId: "855760450791-s4jpuef4anqh003s5p83h29iqigg9sk1.apps.googleusercontent.com",
        redirectUri:process.env.MIX_API_URL + "auth/google/callback", // Your client app URL
      }
    }
  })
