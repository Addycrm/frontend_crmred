<template>
  <b-overlay :show="overlay">
    <b-card no-body>
      <template #header>
        <h3 class="mb-0 mr-2">Página Web</h3>
        <b-button
          v-if="url"
          class="text-nowrap mr-auto"
          size="md"
          variant="primary"
          target="_blank"
          :href="url"
        >
          <span class="align-middle">Ver Página</span>
        </b-button>
      </template>
    </b-card>
    <b-form-radio-group
      v-if="!emptyEmpresa"
      :checked="templates.option"
      id="template"
      @change="setTemplate"
      name="template"
      stacked
    >
      <b-row class="m-n1">
        <b-col
          class="p-1 col-sm-12 col-md-4"
          v-for="item in templates.items"
          :key="item.id"
        >
          <b-form-radio class="card-input" :value="item.id">
            <div class="thumbnails">
              >
              <img :src="item.imagen" class="img-fluid" /> 
            </div>
            <div class="title">
              <h2>
                {{ item.nombre }}
              </h2>
              <span class="check">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                  />
                </svg>
              </span>
            </div>
          </b-form-radio>
        </b-col>
      </b-row>
    </b-form-radio-group>
    <div v-else class="alert alert-warning p-2" :style="{ fontSize: '16px' }">
      Debes configurar primero tus datos de Empresa para poder usar este módulo
      <b-button
        class="ml-1"
        variant="warning"
        size="sm"
        :to="{ name: 'apps-configuration' }"
      >
        Configurar
      </b-button>
    </div>
  </b-overlay>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import mixinConfig from "@/views/componente/mixinConfig";
import mixinApis from "@/views/componente/mixinApis";
export default {
  name: "Templates",
  mixins: [mixinApis, mixinConfig],
  data() {
    return {
      overlay: false,
    };
  },
  computed: {
    templates() {
      return this.$store.state.banners.templates;
    },
  },
  mounted() {
    this.getTemplates();
  },
  methods: {
    async getTemplates() {
      if (this.templates.items.length === 0) {
        this.overlay = true;
        await this.$store
          .dispatch("banners/gettemplates")
          .then(() => {
            this.overlay = false;
          })
          .catch((error) => {
            console.error(error);
            this.$toast(
              {
                component: ToastificationContent,
                props: {
                  title: "Algo ha ocurrido",
                  icon: "AlertCircleIcon",
                  text: "Actualiza el navegador, si el problema persiste comunicate con nosotros",
                  variant: "danger",
                },
              },
              {
                timeout: 4000,
              }
            );
          });
      }
    },
    async setTemplate(id) {
      this.overlay = true;
      await this.$store
        .dispatch("banners/settemplates", id)
        .then((response) => {
          this.overlay = false;
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Actualizacion exitosa",
              icon: "CheckCircleIcon",
              text: "Tus plantilla se actualizo exitosamente",
              variant: "success",
            },
          });
        })
        .catch((error) => {
          this.overlay = false;
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: "Algo ha ocurrido",
                icon: "AlertCircleIcon",
                text: "Si el problema persiste comunicate con nosotros",
                variant: "danger",
              },
            },
            {
              timeout: 4000,
            }
          );
          console.error(error);
        });
    },
  },
};
</script>
<style>
.card-input.custom-control {
  width: 100%;
  padding: 0 !important;
  margin: 0 !important;
  box-shadow: 3px 3px 10px #00000026;
  border-radius: 10px;
  overflow: hidden;
}
.card-input.custom-control input {
  display: none;
}
.card-input.custom-control .custom-control-label {
  display: flex;
  flex-direction: column;
}
.card-input.custom-control .custom-control-label::before,
.card-input.custom-control .custom-control-label::after {
  display: none;
}
.card-input.custom-control .custom-control-label .thumbnails {
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding-top: 70%;
}
.card-input.custom-control .custom-control-label .thumbnails img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: all ease 1s;
}
.card-input.custom-control .custom-control-label:hover .thumbnails img {
  object-position: bottom center;
}
.card-input.custom-control .custom-control-label .title {
  padding: 1rem 1.5rem;
  position: relative;
  border-top: 1px solid #c0c0c0;
}
.card-input.custom-control .custom-control-label .title h2 {
  font-size: 18px;
  margin: 0;
  margin-right: 2rem;
  padding-right: 1rem;
  min-height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card-input.custom-control .custom-control-label .check {
  display: block;
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 3rem;
  border: 1px solid #c0c0c0;
  right: 1.5rem;
  top: 1rem;
  color: transparent;
  transition: all ease 0.4s;
}
.card-input.custom-control .custom-control-label .check svg {
  padding: 0.4rem;
  fill: currentColor;
}
.card-input.custom-control input:checked + .custom-control-label .check {
  background: var(--success);
  border-color: mintcream;
  color: #fff;
}
#template .card-input.custom-control .custom-control-label::before {
  content: "";
  display: block;
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 3px var(--success) !important;
  width: auto;
  height: auto;
  z-index: 2;
  background: transparent;
  border: none;
  border-radius: 10px;
  opacity: 0;
  transition: all ease 0.4s;
  pointer-events: none;
}
#template
  .card-input.custom-control
  input:checked
  + .custom-control-label::before {
  opacity: 1;
}
</style>