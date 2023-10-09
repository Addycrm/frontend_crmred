<template>
    <b-nav-item-dropdown
      right
      toggle-class="d-flex align-items-center dropdown-user-link"
      class="dropdown-user"
    >
      <template #button-content>
        <div class="d-sm-flex d-none user-nav">
          <p class="user-name font-weight-bolder mb-0">
            {{ userData.primer_nombre }}
          </p>
          <span class="user-status">{{ userData.username }}</span>

        </div>
        <b-avatar
          size="40"
          variant="light-primary"
          badge
          class="badge-minimal"
          badge-variant="success"
        >
          <template v-if="Boolean(userData.foto_persona)">
            <img :src="userData.foto_persona" class="img-fluid mx-auto d-block" />
          </template>
          <template v-else>
            <cld-image
              :public-id="
                userData.genero == 1
                  ? 'default/photo-default-male_elbsty'
                  : 'default/photo-default-female_aqhcir'
              "
              class="img-fluid mx-auto d-block"
            >
              <cld-transformation
                fetch-format="png"
                gravity="face"
                height="40"
                width="40"
                zoom="0.4"
                crop="thumb"
                radius="300"
              />
            </cld-image>
          </template>
        </b-avatar>
      </template>

      <b-dropdown-item
        v-if="userData.role.slug != 'visitantes'"
        @click="redirectDenendenciRole()"
        link-class="d-flex align-items-center"
      >
        <feather-icon size="16" icon="UserIcon" class="mr-50" />
        <span>Perfil </span>
      </b-dropdown-item>

      <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
        <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
        <span>Cerrar sesión</span>
      </b-dropdown-item></b-nav-item-dropdown
    >
  </template>

  <script>
  import {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  } from "bootstrap-vue";
  import { initialAbility } from "@/libs/acl/config";
  import mixinLogOut from "@/views/componente/mixinLogOut";
  import {
    ROLES_ADMIN,
    ROLES_AGENTE,
    ROLES_EMPRESA,
    ROLES_VISITANTE,
    ROLES_INMOBILIARIA,
  } from "@/libs/config/config.js";

  export default {
    components: {
      BNavItemDropdown,
      BDropdownItem,
      BDropdownDivider,
      BAvatar,
    },
    mixins: [mixinLogOut],
    data() {
      return {
        foto_persona: null,
        image: require("@/assets/images/avatars/perfil.png"),
      };
    },

    computed: {
      userData() {
        return this.$store.state.userData.userData;
      },

      infoData() {
        let data = this.$store.state.userData.userData;
        if (this.validURL(data.foto_persona)) {
          return data.foto_persona;
        } else {
          return "/storage/" + data.foto_persona;
        }
      },
    },

    created() {},

    methods: {
      redirectDenendenciRole() {
        if (this.userData.role.slug == ROLES_EMPRESA) {
          this.$router.push({ name: "pages-profile-agente" });
        } else if (this.userData.role.slug == ROLES_INMOBILIARIA) {
          this.$router.push({ name: "pages-profile" });
        } else if (this.userData.role.slug == ROLES_ADMIN) {
          this.$router.push({ name: "pages-profile-agente" });
        } else {
          this.$router.push({ name: "pages-profile-agente" });
        }
      },
      validURL(str) {
        let regexp =
          /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) {
          return true;
        } else {
          return false;
        }
      },
    },
  };
  </script>
