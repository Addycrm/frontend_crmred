<template>
  <div id="user-profile">
    <profile-header :userdata="tprofileData" />
    <!-- profile info  -->
    <section id="profile-info">
      <b-row>
        <b-col lg="12">
          <div class="d-flex">
            <!-- input -->
          </div>
        </b-col>

        <!-- about suggested page and twitter feed -->
        <b-col lg="12">
          <b-alert
            v-if="tprofileData.role.slug === 'visitantes'"
            show
            variant="danger"
            style="padding:12px"
          >
            Tu perfil esta incompleto, por favor actualiza la información
          </b-alert>
        </b-col>

        <!--/ about suggested page and twitter feed -->

        <!-- post -->
        <b-col lg="4" cols="12" order="1" order-lg="2">
          <profile-post :userdata="tprofileData" />
        </b-col>
        <!-- <b-col lg="8" cols="12" order="1" order-lg="2">
          <profile-billetera :posts="profileData.post" />
        </b-col> -->
        <!-- post -->

        <!-- latest photos suggestion and polls -->

        <!--/ latest photos suggestion and polls -->
      </b-row>
    </section>
    <!--/ profile info  -->
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BAlert,
  BFormInput,
  BFormGroup,
  BButton,
} from "bootstrap-vue";

import ProfileHeader from "./ProfileHeader.vue";
import ProfilePost from "./ProfilePost.vue";
import ProfileBilletera from "./ProfileBilletera";
import Ripple from "vue-ripple-directive";

/* eslint-disable global-require */
export default {
  components: {
    BRow,
    BCol,
    BAlert,
    ProfileHeader,
    ProfilePost,
    ProfileBilletera,
    BFormInput,
    BFormGroup,
    BButton,
    Ripple,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      message: "Clic en el boton para copiar tu link",
      userData: JSON.parse(localStorage.getItem("userData")),
    };
  },

  computed: {
    tprofileData() {
      return this.$store.state.userData.userData;
    },
  },

  methods: {
    doCopy() {
      this.message =
         process.env.MIX_API_URL + "register/" + this.tprofileData.referral_code;
      this.$copyText(this.message).then(
        () => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Url copiada",
              icon: "BellIcon",
            },
          });
        },
        () => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Can not copy!",
              icon: "BellIcon",
            },
          });
        }
      );
    },
  },
  created() {},
};
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-profile.scss";
</style>
