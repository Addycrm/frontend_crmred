<template>
  <div id="Perfil">
    <b-row align-h="center">
      <b-col cols="12" xl="auto" class="formPerfil">
        <transition name="fade">
          <FormPerfil v-if="stateForm" @setData="setForm"></FormPerfil>
        </transition>
      </b-col>
      <b-col cols="12" xl="auto" class="templateDesign">
        <div
          v-if="emptyEmpresa"
          class="alert alert-warning p-2"
          :style="{ fontSize: '16px' }"
        >
          <b-row align-v="center">
            <b-col>
              Debes configurar primero tus datos de Empresa para poder usar este
              módulo
            </b-col>
            <b-col cols="auto">
              <b-button
                variant="warning"
                size="sm"
                :to="{ name: 'apps-configuration' }"
              >
                Configurar
              </b-button>
            </b-col>
          </b-row>
        </div>
        <template v-else>
          <b-overlay :show="overlay">
            <b-form-radio-group
              v-model="perfiles.option"
              id="template"
              @change="setTemplate"
              name="template"
              stacked
            >
              <b-row class="m-n1 itemsTemplate">
                <b-col

                  class="p-1 flexRes"
                  v-for="item in perfiles.items"
                  :key="item.id"
                >
                  <b-form-radio class="card-input" :value="item.id" >
                    <div class="thumbnails">
                      <img class="img-fluid" :src="item.imagen" />
                    </div>
                    <div class="title">
                      <h2>
                        {{ item.nombre }}
                      </h2>
                      <span class="check">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
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
            <b-row class="">
              <BgAgent :option="perfiles.option" :imgBgs="imgBgs" @setBg="setBg" />
            </b-row>
            <b-row align-v="end" class="mt-1">
              <b-col sm="12" md="6" lg="6" class="groupColor">
                <b-form-group
                  label="Color principal"
                  label-for="bgColor"
                  class="mb-0 inputColor text-nowrap"
                >
                  <div class="colorBox">
                    <b-form-input
                      v-model="colors.color_fondo"
                      id="bgColor"
                      type="color"
                    />
                    <span :style="{ background: colors.color_fondo }"></span>
                  </div>
                </b-form-group>
                <b-form-group
                  label="Color texto"
                  label-for="fontColor"
                  class="mb-0 inputColor text-nowrap"
                >
                  <div class="colorBox">
                    <b-form-input
                      v-model="colors.color_fuente"
                      id="fontColor"
                      type="color"
                      value="black"
                    />
                    <span :style="{ background: colors.color_fuente }"></span>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="auto" class="ml-auto mt-2">
                <b-button-group>
                  <b-button
                    variant="success"
                    size="sm"
                    @click="sendColor(colors)"
                    >Guardar colores</b-button
                  >
                  <b-button variant="info" size="sm" @click="viewProfile"
                    >Ver tarjeta virtual</b-button
                  >
                </b-button-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="d-flex flex-column align-items-center mt-2">
                  <transition name="fade" mode="out-in">
                    <components
                      v-if="empresa"
                      :is="
                        perfiles.option == 1  
                          ? 'templateAgenteUno'
                          : perfiles.option == 3
                          ? 'templateAgenteDos'
                          : perfiles.option == 6
                          ? 'templateAgenteTres'
                          : perfiles.option == 7
                          ? 'templateAgenteCuatro'
                          : ''
                      "
                      :userData="form"
                      :empresa="empresa"
                      :colors="colors"
                      :imgBg="imgBg"
                    />
                  </transition>
              </b-col>
            </b-row>
          </b-overlay>
        </template>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import FormPerfil from "./component/FormPerfil";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import templateAgenteUno from "./templates/templateAgenteUno";
import templateAgenteDos from "./templates/templateAgenteDos";
import templateAgenteTres from "./templates/templateAgenteTres";
import templateAgenteCuatro from "./templates/templateAgenteCuatro.vue";

import store from "@/store";

import mixinApis from "@/views/componente/mixinApis";
import mixinConfig from "@/views/componente/mixinConfig";
import mixinProfile from "@/views/pages/profile/mixinProfile";
import BgAgent from "./component/BgAgent.vue";
import mixinBgImgs from "./mixinBgImgs";

export default {
  name: "ProfileAgente",
  mixins: [mixinApis, mixinProfile, mixinConfig, mixinBgImgs],
  components: {
    FormPerfil,
    templateAgenteUno,
    templateAgenteDos,
    templateAgenteTres,
    templateAgenteCuatro,
    BgAgent
},
  data() {
    return {
      form: {},
      stateForm: false,
      overlay: false,
      colors: {
        color_fondo: "#7367f0",
        color_fuente: "#5e5873",
      },
      imgBg: {
        id: 0,
        name: "Ninguno",
        url: "https://www.htmlcsscolor.com/preview/gallery/F8F8F8.png"
      },
      imgBgs: [],  
    };
  },
  computed: {
    userData() {
      return this.$store.state.userData.userData;
    },
  },
  mounted() {
    this.setColor();
    console.log("perfiles", this.perfiles);
  },
  watch: {
    'perfiles.option' (){
      const bgs = this.perfiles.items.find(bg => {
        return  bg.id === this.perfiles.option
      })
      this.imgBgs = bgs.perfiles_background
    }
  },
  methods: {
    setForm(value) {
      Object.assign(this, { form: value });
    },
    async setTemplate(id) {
      console.log("template before", id);
      // const bgs = this.perfiles.items.find((item) => {
      //   return item.id == id;
      // })
      // console.log(bgs);
      // this.imgBgs = bgs.perfiles_background
      this.overlay = true;
      await this.$store.dispatch("appProfile/setPerfiles", id).then((state) => {
        if (state) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Actualizacion exitosa",
              icon: "CheckCircleIcon",
              text: "Tus plantilla se actualizo exitosamente",
              variant: "success",
            },
          });
        } else {
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
        }
      });
      this.overlay = false;
    },
    setBg(imgChoosen) {
      console.log("imgChoosen", imgChoosen);
      Object.assign(this.imgBg, imgChoosen)
      console.log("imageToRender", this.imgBg);
    },
    async sendBg() {
      
    },
    setColor() {
      Object.assign(this.colors, {
        color_fondo: this.userData.color_fondo,
        color_fuente: this.userData.color_fuente,
      });
    },
    async sendColor(data) {
      this.overlay = true;
      console.log(data);
      await this.$store
        .dispatch("userData/updatePerfilAgente", data)
        .then((state) => {
          if (state) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Actualizacion exitosa",
                icon: "CheckCircleIcon",
                text: "Tus colores se han actualizado exitosamente",
                variant: "success",
              },
            });
          } else {
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
          }
        });

      this.overlay = false;
    },
    viewProfile() {
      console.log(this.userData.slug);
      let routeData = this.$router.resolve({
        path: "/perfil/agente/" + this.userData.slug,
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>
<style lang="css" scoped>
.itemsTemplate {
  flex-wrap: nowrap !important;
  overflow: auto !important;
  margin-bottom: 10px !important;
}
.flexRes{
  flex: 0 0 50%;
}
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
  padding-top: 60%;
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

.formPerfil {
  max-width: 800px;
  width: 50%;
}
.templateDesign {
  width: 25%;
  flex-grow: 1;
}
.inputColor label {
  font-size: inherit !important;
  margin-bottom: 10px;
}
.inputColor input {
  height: 28px !important;
  width: 10em;
  padding: 0 !important;
  opacity: 0;
  cursor: pointer;
}
.inputColor .colorBox {
  position: relative;
  border-radius: 0.358rem;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px #d8d6de;
}
.inputColor .colorBox span {
  position: absolute;
  pointer-events: none;
  inset: 0;
}
.groupColor {
  display: flex;
}
.inputColor {
  width: 1%;
  flex-grow: 1;
}
.groupColor .inputColor:first-child .colorBox {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.groupColor .inputColor:last-child .colorBox {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
</style>
