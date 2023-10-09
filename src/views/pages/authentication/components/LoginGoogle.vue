<template>
  <div class="auth-footer-btn d-flex justify-content-center">
    <b-button @click="AuthProvider('google')" class="social-login google">
      <i class="icon">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
      </i>
      Google
    </b-button>
  </div>
</template>
<script>
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  name: "loginGoogle",
  inject: ['overlay'],
  methods: {
    AuthProvider(provider) {
      var self = this;

      this.$auth
        .authenticate(provider)
        .then((response) => {
          self.SocialLogin(provider, response);
        })
        .catch((err) => {
          console.error({ err: err });
        });
    },
    SocialLogin(provider, response) {
      this.overlay(true);
      this.$http
        .post("/sociallogin/" + provider, response)
        .then(res => {
          this.overlay(false);
          const { userData, token } = res.data.data;
          Object.assign(localStorage,{
            accessToken: token.access_token,
            refreshToken: token.refresh_token
          });

          this.$store.commit("userData/UPDATE_USER_DATA", userData);
          this.$ability.update(userData.ability);

          this.$router.replace(getHomeRouteForLoggedInUser(userData.role.slug))
          .then(() => {
            this.$toast({
              component: ToastificationContent,
              position: "top-center",
              props: {
                title: `Bienvenid@ ${
                  userData.segundo_nombre || userData.username
                }`,
                icon: "CoffeeIcon",
                variant: "success",
                text: ``,
              },
            });
          });
        }).catch(err => {
          console.error(err.response);
          this.overlay(false);
          this.$toast({
            component: ToastificationContent,
            position: "top-center",
            props: {
              title: "No puedes iniciar sesion",
              icon: "EditIcon",
              variant: "danger",
            },
          });
        });
    },
  },
};
</script>

<style lang="css" scoped>
  .auth-wrapper .auth-footer-btn .btn.social-login{
    display: flex;
    align-items: center;
    font-size: 18px;
    padding: 0.5rem 1.25rem!important;
    border: none;
    background-color: #fff!important;
    color: #444!important;
    box-shadow: 2px 2px 10px 0 #00000026;
  }
  .btn.social-login .icon {
    width: 1.25em;
    margin-right: 8px;
    font-size: 1.2em;
    fill: currentColor;
  }
  .btn.social-login .icon svg{
    display: block;
    width: 100%;
  }

</style>