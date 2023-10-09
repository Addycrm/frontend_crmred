<template>
  <b-card
    class="profile-header mb-2"
    :img-src="portada"
    img-top
    alt="cover photo"
    body-class="p-0"
  >
    <!-- profile picture -->
    <div class="position-relative">
      <div class="profile-img-container d-flex align-items-center">
        <div class="profile-img">
          <b-img
            style="height: 100%"
            @click="info(userdata.foto_persona, $event.target)"
            :src="foto_persona"
            rounded
            fluid
            alt="profile photo"
          />
        </div>
        <!-- profile title -->
        <div class="profile-title ml-3">
          <h2 class="text-white">{{ primer_nombre }}</h2>
          <p class="text-white">
            {{ rol }}
          </p>
        </div>
        <image-component ref="modalImage" />
        <!--/ profile title -->
      </div>
    </div>
    <!--/ profile picture -->

    <!-- profile navbar -->
    <div class="profile-header-nav">
      <b-navbar toggleable="md" type="light">
        <!-- toggle button -->
        <b-navbar-toggle class="ml-auto" target="nav-text-collapse">
          <feather-icon icon="AlignJustifyIcon" size="21" />
        </b-navbar-toggle>
        <!--/ toggle button -->

        <!-- collapse -->
        <b-collapse id="nav-text-collapse" is-nav>
          <b-tabs pills class="profile-tabs mt-1 mt-md-0" nav-class="mb-0">
            <template #tabs-start>
              <b-nav-item role="presentation" active class="font-weight-bold">
                <span class="d-none d-md-block">Perfil</span>
                <feather-icon icon="RssIcon" class="d-block d-md-none" />
              </b-nav-item>
            </template>

            <!-- edit buttons -->
            <template #tabs-end>
              <b-button variant="primary" class="ml-auto" @click="goProfile()">
                <feather-icon icon="EditIcon" class="d-block d-md-none" />
                <span class="font-weight-bold d-none d-md-block"
                  >Editar perfil</span
                >
              </b-button>
            </template>
            <!-- edit buttons -->
          </b-tabs>
        </b-collapse>
        <!--/ collapse -->
      </b-navbar>
    </div>
    <!--/ profile navbar -->
  </b-card>
</template>

<script>
import {
  BCard,
  BImg,
  BNavbar,
  BNavbarToggle,
  BCollapse,
  BTabs,
  BNavItem,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import imageComponent from "../../componente/Image-component.vue";
export default {
  components: {
    BCard,
    BTabs,
    BButton,
    BNavItem,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
    "image-component": imageComponent,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      portada: require("@/assets/images/profile/user-uploads/timeline.jpg"),
      foto_persona: require("@/assets/images/avatars/perfil.png"),
      primer_nombre: "",
      primer_apellido: "",
      rol: "",
    };
  },

  computed: {},

  created() {
    if (this.userdata.foto_persona != null) {
      if (this.validURL(this.userdata.foto_persona)) {
        this.foto_persona = this.userdata.foto_persona;
      } else {
        this.foto_persona = "/storage/" + this.userdata.foto_persona;
      }
    }

    this.primer_apellido = this.userdata.primer_apellido;
    this.primer_nombre = this.userdata.primer_nombre;

    if (this.userdata.role.slug == "socio_referidor") {
      this.rol = "Socio Referidor";
    } else if (this.userdata.role.slug == "administrator") {
      this.rol = "Administrador";
    }

    if (this.userdata.role.slug != "socio_referidor") {
      this.portada =  require("@/assets/images/profile/user-uploads/usucapion.jpg")
    }
  },

  props: {
    userdata: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    validURL(str) {
      let regexp =
        /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      if (regexp.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    goProfile() {
      if (this.userdata.role.slug == "visitantes") {
        this.$router.push({ name: "perfil-editar" });
      } else {
        this.$router.push({ name: "perfil-editar-agente" });
      }
    },

    info(item, button) {
      this.$refs.modalImage.info(this.foto_persona, button);
    },
  },
};
</script>

<style>
</style>