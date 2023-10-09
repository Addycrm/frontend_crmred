import Vue from "vue";
import axios from "axios";
import UniversalSocialauth from "universal-social-auth";

Vue.config.productionTip = false;

const options = {
  providers: {
    google: {
      authUri: "https://accounts.google.com/o/oauth2/auth",
      tokenUri: "https://oauth2.googleapis.com/token",
      clientId:
        "855760450791-s4jpuef4anqh003s5p83h29iqigg9sk1.apps.googleusercontent.com",
      redirectUri: process.env.MIX_API_URL + "auth/google/callback", // Your client app URL
    },
  },
};

const Oauth = new UniversalSocialauth(axios, options);

Vue.prototype.$axios = axios;
Vue.prototype.$Oauth = Oauth;
