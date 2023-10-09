<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewUserSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div
        class="
          d-flex
          justify-content-between
          align-items-center
          content-sidebar-header
          px-2
          py-1
        "
      >
        <h5 class="mb-0">Agregar nuevo usuario</h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- BODY -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <!-- Full Name -->
          <validation-provider
            #default="validationContext"
            name="Nombre completo"
            rules="required"
          >
            <b-form-group label="Nombre completo" label-for="primer-nombre">
              <b-form-input
                size="sm"
                id="primer-nombre"
                v-model="userData.primer_nombre"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="tu nombre completo"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <b-form-group label="* Genero" label-for="v-genero">
            <div class="demo-inline-spacing">
              <b-form-radio
                v-model="userData.genero"
                name="masculino"
                value="1"
                class="custom-control-primary"
              >
                Masculino
              </b-form-radio>
              <b-form-radio
                v-model="userData.genero"
                name="femenino"
                value="2"
                class="custom-control-primary"
              >
                Femenino
              </b-form-radio>
            </div>
          </b-form-group>
          <validation-provider
            #default="validationContext"
            name="cedula persona"
            rules="required"
          >
            <b-form-group label="Numero de cedula" label-for="cedula">
              <b-form-input
                size="sm"
                id="cedula"
                v-model="userData.cedula_persona"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Tu cedula"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- Email -->
          <validation-provider
            #default="validationContext"
            name="Email"
            rules="required|email"
          >
            <b-form-group label="E-mail" label-for="email">
              <b-form-input
                size="sm"
                id="email"
                v-model="userData.email"
                :state="getValidationState(validationContext)"
                trim
                placeholder="Tu correo"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Company -->
          <validation-provider
            #default="validationContext"
            name="direccion"
            rules="required"
          >
            <b-form-group label="Direccion" label-for="direccion">
              <b-form-input
                size="sm"
                id="direccion"
                v-model="userData.direccion_persona"
                :state="getValidationState(validationContext)"
                trim
                placeholder="Tu direccion"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            #default="validationContext"
            name="Company"
            rules="required"
          >
            <b-form-group label="Celular" label-for="celular">
              <vue-phone-number-input
                default-country-code="CO"
                :translations="{
                  countrySelectorLabel: 'Codigo pais',
                  countrySelectorError: 'Choisir un pays',
                  phoneNumberLabel: 'Numéro de Celular',
                  example: 'Ejemplo:',
                }"
                v-model="userData.celular_movil"
                @update="results = $event"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Company -->
          <validation-provider
            #default="validationContext"
            name="Company"
            rules="required"
          >
            <b-form-group label="WhatsApp" label-for="WhatsApp">
              <vue-phone-number-input
                default-country-code="CO"
                :translations="{
                  countrySelectorLabel: 'Codigo pais',
                  countrySelectorError: 'Choisir un pays',
                  phoneNumberLabel: 'Numéro de whatsapp',
                  example: 'Ejemplo:',
                }"
                v-model="userData.celular_whatsapp"
                @update="results = $event"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            #default="validationContext"
            name="Rol del usuario"
            rules="required"
          >
            <b-form-group
              label="Role"
              label-for="user-role"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="userData.roles"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="roleOptions"
                label="nombre"
                :reduce="(val) => val.id"
                :clearable="false"
                input-id="user-role"
              />
              <b-form-invalid-feedback
                :state="getValidationState(validationContext)"
              >
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Plan -->
          <validation-provider
            #default="validationContext"
            name="Country"
            rules="required"
          >
            <b-form-group
              label="Pais"
              label-for="country"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="userData.id_pais"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="paisesOptions"
                label="name"
                @input="getStates"
                :reduce="(val) => val.id"
                :clearable="false"
                input-id="paises"
              />
              <b-form-invalid-feedback
                :state="getValidationState(validationContext)"
              >
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            #default="validationContext"
            name="Departamento"
            rules="required"
          >
            <b-form-group
              label="Estados"
              label-for="estado"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="userData.id_estado"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="states"
                @input="getCiudad"
                :reduce="(val) => val.id"
                label="name"
                :clearable="false"
                input-id="estado"
              />
              <b-form-invalid-feedback
                :state="getValidationState(validationContext)"
              >
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            #default="validationContext"
            name="Ciudad"
            rules="required"
          >
            <b-form-group
              label="Ciudad"
              label-for="ciudad"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="userData.id_ciudad"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="ciudades"
                :reduce="(val) => val.id"
                label="name"
                :clearable="false"
                input-id="ciudades"
              />
              <b-form-invalid-feedback
                :state="getValidationState(validationContext)"
              >
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Agregar
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancelar
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButton,
  BFormRadio,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref } from "@vue/composition-api";
import { required, alphaNum, email } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import countries from "@/@fake-db/data/other/countries";
import store from "@/store";
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,
    BFormRadio,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },

  directives: {
    Ripple,
  },

  model: {
    prop: "isAddNewUserSidebarActive",
    event: "update:is-add-new-user-sidebar-active",
  },

  props: {
    isAddNewUserSidebarActive: {
      type: Boolean,
      required: true,
    },
    roleOptions: {
      type: Array,
      required: true,
    },
    paisesOptions: {
      type: Array,
      required: true,
    },

    planOptions: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      required,
      alphaNum,
      email,
      states: [],
      ciudades: [],
    };
  },

  methods: {
    getStates() {
      this.$store
        .dispatch("appLocalidades/getStates", {
          codigo: this.userData.id_pais,
        })
        .then((data) => {
          this.states = data;
        })
        .catch(() => {});
    },

    getCiudad() {
      this.$store
        .dispatch("appLocalidades/getCiudades", {
          codigo: this.userData.id_estado,
        })
        .then((data) => {
          this.ciudades = data;
        })
        .catch(() => {});
    },
  },

  setup(props, { emit }) {
    const blankUserData = {
      primer_nombre: "",
      segundo_nombre: "",
      email: "",
      primer_apellido: "",
      segundo_apellido: "",
      celular_movil: "",
      celular_whatsapp: "",
      direccion_persona: "",
      fecha_nacimiento: "",
      genero: "",
      username: "",
      email: "",
      roles: null,
      currentPlan: null,
      company: "",
      id_pais: "",
      id_estado: "",
      id_ciudad: "",
      telefono_fijo: "",
    };
    const toast = useToast();
    const userData = ref(JSON.parse(JSON.stringify(blankUserData)));

    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(blankUserData));
    };

    const onSubmit = () => {
      store
        .dispatch("appUser/addUser", userData.value)
        .then(() => {
          store.dispatch("appInmobiliaria/getInmobiliaria");
          emit("update:is-add-new-user-sidebar-active", false);
        })
        .catch((error) => {
          toast({
            component: ToastificationContent,
            props: {
              title:
                "Revisa que el correo o el numero de cedula no esten registrados en la base de datos",
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        });
    };

    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetuserData);

    return {
      userData,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
