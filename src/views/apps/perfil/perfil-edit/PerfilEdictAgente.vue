<template>
  <b-card>
    <b-tabs pills>
      <b-tab active>
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">Datos basicos</span>
        </template>
        <b-row>
          <b-col cols="12" sm="6" class="mb-2">
            <b-media class="mb-2">
              <template #aside>
                <b-avatar v-bind:src="imageData" size="90px" rounded />
              </template>
              <h4 class="mb-1">Editar perfiles</h4>
              <b-form-file
                @change="previewImage"
                ref="file-input"
                placeholder="click para seleccionar una imagen"
                browse-text="Cargar"
                class="mb-2"
              ></b-form-file>
            </b-media>
          </b-col>
        </b-row>
        <user-edit-tab-account :userdata="userdatas" class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">Descripcion</span>
        </template>

        <user-edit-tab-information :userdata="userdatas" class="mt-2 pt-75" />
      </b-tab>

      <!-- Tab: Social -->
      <b-tab>
        <template #title>
          <feather-icon icon="Share2Icon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">Redes sociales</span>
        </template>
        <user-edit-tab-social :userdata="userdatas" class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>

    <b-row class="mt-2">
      <b-col>
        <b-button
          variant="primary"
          class="mb-1 mb-sm-0 mr-0 mr-sm-1"
          @click="enviarData()"
        >
          Guardar cambios
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BTab,
  BTabs,
  BCard,
  BAlert,
  BLink,
  BButton,
  BCol,
  BRow,
  BMedia,
  BAvatar,
  BFormFile,
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import UserEditTabAccount from "./components/UserEditTabAccount.vue";
import UserEditTabInformation from "./components/UserEditTabInformation.vue";
import UserEditTabSocial from "./components/UserEditTabSocial.vue";
import PerfilStoreModule from "../perfilStoreModule";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store/index";
import { quillEditor } from "vue-quill-editor";

const PERFIL_APP_STORE_MODULE_NAME = "appPerfil";

if (!store.hasModule(PERFIL_APP_STORE_MODULE_NAME))
  store.registerModule(PERFIL_APP_STORE_MODULE_NAME, PerfilStoreModule);

onUnmounted(() => {
  if (store.hasModule(PERFIL_APP_STORE_MODULE_NAME))
    store.unregisterModule(PERFIL_APP_STORE_MODULE_NAME);
});

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    BButton,
    BCol,
    BFormFile,
    BRow,
    BMedia,
    BAvatar,
    quillEditor,
    UserEditTabAccount,
    UserEditTabInformation,
    UserEditTabSocial,
    ToastificationContent,
  },

  computed: {
    userdata_sessions() {
      return this.$store.state.userData.userData;
    },
  },

  data() {
    return {
      userdatas: {
        id: null,
        email: null,
        genero: null,
        linkedin: null,
        facebook: null,
        instagram: null,
        cedula_persona: null,
        primer_nombre: null,
        foto_persona: null,
        descripcion: null,
        fecha_nacimiento: null,
        telefono_fijo: null,
        tipo_cliente: null,
        celular_movil: null,
        celular_whatsapp: null,
        direccion_persona: null,
        numero_cedula: null,
        codigo_pais: null,
        codigo_estado: null,
        codigo_ciudad: null,
      },

      imageData: "",
      imageDataPortada: "",
      file: "",
      payLoad: null,
      datosbasico: [],
      descripcion: "",
      social: {},
      snowOption: {
        modules: {
          toolbar: "#quill-toolbar",
        },
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus clientes.",
      },
    };
  },

  created() {
    this.userdatas.id = this.userdata_sessions.id;
    this.userdatas.email = this.userdata_sessions.email;
    this.userdatas.genero = this.userdata_sessions.genero;
    this.userdatas.linkedin = this.userdata_sessions.linkedin;
    this.userdatas.facebook = this.userdata_sessions.facebook;
    this.userdatas.instagram = this.userdata_sessions.instagram;
    this.userdatas.cedula_persona = this.userdata_sessions.cedula_persona;
    this.userdatas.primer_nombre = this.userdata_sessions.primer_nombre;
    this.userdatas.descripcion = this.userdata_sessions.descripcion;
    this.userdatas.fecha_nacimiento = this.userdata_sessions.fecha_nacimiento;
    this.userdatas.celular_movil = this.userdata_sessions.celular_movil;
    this.userdatas.celular_whatsapp = this.userdata_sessions.celular_whatsapp;
    this.userdatas.direccion_persona = this.userdata_sessions.direccion_persona;
    this.userdatas.codigo_pais = this.userdata_sessions.id_pais;
    this.userdatas.tipo_cliente = this.userdata_sessions.tipo_cliente;
    this.userdatas.codigo_estado = this.userdata_sessions.id_estado;
    this.userdatas.codigo_ciudad = this.userdata_sessions.id_ciudad;
    this.userdatas.foto_persona = this.userdata_sessions.foto_persona;

    this.getImagenes();

    this.getPaises();
    if (this.userdata_sessions.id_estado != null) {
      this.getEstados();
      if (this.userdata_sessions.id_ciudad != null) {
        this.getCiudades();
      }
    }
  },
  mounted() {
    this.$root.$on("estados", () => {
      this.getEstados();
    });

    this.$root.$on("ciudades", () => {
      this.getCiudades();
    });
  },

  methods: {
    getImagenes() {
      if (this.userdatas) {
        var portada = this.userdatas.foto_portada_persona;
        var profile = this.userdatas.foto_persona;
        if (profile.substr(0, 4) == "http") {
          this.imageData = profile;
        } else {
          this.imageData = "/storage/" + profile;
        }

        if (portada != null) {
          if (portada.substr(0, 4) == "http") {
            this.imageDataPortada = portada;
          } else {
            this.imageDataPortada = "/storage/" + portada;
          }
        }
      }
    },

    async enviarData() {
      let formData = new FormData();

      if (this.userdatas.foto_persona != "") {
        formData.append("foto_persona", this.userdatas.foto_persona);
      }

      if (this.userdatas.foto_portada_persona != "") {
        formData.append(
          "foto_portada_persona",
          this.userdatas.foto_portada_persona
        );
      }

      let social = {
        linkedin: this.userdatas.linkedin,
        facebook: this.userdatas.facebook,
        instagram: this.userdatas.instagram,
      };

      formData.append("id", this.userdatas.id);
      formData.append("telefono_fijo", this.userdatas.telefono_fijo);
      formData.append("primer_nombre", this.userdatas.primer_nombre);
      formData.append("whatsapp", this.userdatas.celular_whatsapp);
      formData.append("genero", this.userdatas.genero);
      formData.append("celular", this.userdatas.celular_movil);
      formData.append("code_tipo_documento", 1),
        formData.append("direccion_persona", this.userdatas.direccion_persona);
      formData.append("descripcion", this.userdatas.descripcion);
      formData.append("numero_cedula", this.userdatas.numero_cedula);
      formData.append("codigo_pais", this.userdatas.codigo_pais);
      formData.append("codigo_estado", this.userdatas.codigo_estado);
      formData.append("codigo_ciudad", this.userdatas.codigo_ciudad);
      formData.append("social", JSON.stringify(social));

      await store
        .dispatch("appPerfil/updatePerfilAgente", formData)
        .then((response) => {
          let user = response.data.userData;
          localStorage.setItem("userData", JSON.stringify(user));
          this.$store.commit("userData/UPDATE_USER_DATA", user);
          this.$ability.update(user.ability);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Actualizacion exitosa",
              icon: "EditIcon",
              variant: "success",
            },
          });
          this.$router.push({ name: "pages-profile-agente" });
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Completa todos los campos",
              icon: "EditIcon",
              variant: "danger",
            },
          });
        });
    },

    async getPaises() {
      await this.$store
        .dispatch("appLocalidades/getPaises")
        .then(() => {})
        .catch((error) => {
        });
    },

    async getEstados() {
      let codigo = this.userdatas.codigo_pais;
      await this.$store
        .dispatch("appLocalidades/getStates", { codigo })
        .then(() => {})
        .catch((error) => {
        });
    },

    async getCiudades() {
      let codigo = this.userdatas.codigo_estado;
      await this.$store
        .dispatch("appLocalidades/getCiudades", { codigo })
        .then((response) => {
          this.ciudades = response;
        })
        .catch((error) => {
        });
    },

    previewImage: function (event) {
      var input = event.target;
      this.userdatas.foto_persona = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    previewImagePortada: function (event) {
      var input = event.target;
      this.userdatas.foto_portada_persona = input.files[0];

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageDataPortada = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    socio(data) {
      let user = JSON.parse(localStorage.getItem("userData"));
      this.userdatas.id = user.id_user;
      if (data === "agentes") {
        this.userdatas.tipo_cliente = "agentes";
      } else {
        this.userdatas.tipo_cliente = "socio_referidor";
      }
    },

    validationTipoCliente() {
      this.enviarData();
    },
    toggleIndeterminate() {
      this.indeterminate = !this.indeterminate;
    },
  },
};
</script>