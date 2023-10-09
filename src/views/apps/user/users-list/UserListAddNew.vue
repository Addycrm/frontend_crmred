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
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1 ">
        <h5 class="mb-0">Agregar usuario</h5>
        <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide"/>
      </div>

      <!-- BODY -->
      <ValidationObserver #default="{ handleSubmit }" ref="refFormObserver">
        <!-- Form -->
        <b-form class="p-2" @submit.prevent="handleSubmit(onSubmit)">
          <!-- Full Name -->
          <ValidationProvider v-slot="{errors}" name="Nombre completo" rules="required">
            <b-form-group label="Nombre completo" class="required">
              <b-form-input
                v-model="userData.primer_nombre"
                :state="errorState(errors)"
                trim
              />
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{errors}" name="Genero" rules="required">
            <b-form-group label="Genero" class="required">
              <b-radio-group v-model="userData.genero" name="genero">
                <b-form-radio :state="errorState(errors)" :value="1"> Masculino </b-form-radio>
                <b-form-radio :state="errorState(errors)" :value="2"> Femenino </b-form-radio>
              </b-radio-group>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{errors}"
            name="Documento de identificación"
            rules="required"
          >
            <b-form-group label="Documento de identificación" class="required">
              <b-form-input
                v-model="userData.cedula_persona"
                :state="errorState(errors)"
                trim
              />
            </b-form-group>
          </ValidationProvider>
          <!-- Email -->
          <ValidationProvider v-slot="{errors}" name="Email" rules="required|email">
            <b-form-group label="E-mail" class="required">
              <b-form-input
                v-model="userData.email"
                :state="errorState(errors)"
                trim
              />
            </b-form-group>
          </ValidationProvider>

          <!-- Company -->
          <ValidationProvider v-slot="{errors} "name="Dirección" rules="required">
            <b-form-group label="Dirección" class="required">
              <b-form-input
                v-model="userData.direccion_persona"
                :state="errorState(errors)"
                trim
              />
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" name="Celular" rules="required">
            <b-form-group label="Celular" class="required">
              <vue-phone-number-input
                :error="errors.length > 0"
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
            </b-form-group>
          </ValidationProvider>

          <!-- Company -->
          <ValidationProvider v-slot="{errors}" name="WhatsApp" rules="required">
            <b-form-group label="WhatsApp" class="required">
              <vue-phone-number-input
                :error="errors.length > 0"
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
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{errors}"
            name="Rol del usuario"
            rules="required"
          >
            <b-form-group label="Rol" class="required" :state="!(errors.length > 0)">
              <v-select
                label="nombre"
                v-model="userData.roles"
                :options="roleOptions"
                :reduce="(val) => val.id"
                :clearable="false"
              />
            </b-form-group>
          </ValidationProvider>

          <!-- Plan -->
          <ValidationProvider v-slot="{errors}" name="País" rules="required">
            <b-form-group label="Pais" class="required" :state="!(errors.length > 0)">
              <v-select
                v-model="userData.id_pais"
                :options="paisesOptions"
                label="name"
                :reduce="(val) => val.id"
                :clearable="false"
                @input="getStates"
              />
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" name="Departamento" rules="required">
            <b-form-group label="Departamento" class="required" :state="!(errors.length > 0)">
              <v-select
                v-model="userData.id_estado"
                :options="states"
                @input="getCiudad"
                :reduce="(val) => val.id"
                label="name"
                :clearable="false"
              />
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider v-slot="{errors}" name="Ciudad" rules="required">
            <b-form-group label="Ciudad" class="required" :state="!(errors.length > 0)">
              <v-select
                v-model="userData.id_ciudad"
                :options="ciudades"
                :reduce="(val) => val.id"
                label="name"
                :clearable="false"
              />
            </b-form-group>
          </ValidationProvider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button variant="primary" class="mr-2" type="submit">
              Agregar
            </b-button>
            <b-button type="button" variant="outline-secondary" @click="hide">
              Cancelar
            </b-button>
          </div>
        </b-form>
      </ValidationObserver>
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

import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from "vee-validate";
import * as rules from 'vee-validate/dist/rules';

import { ref } from "@vue/composition-api";
import { required, alphaNum, email } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import countries from "@/@fake-db/data/other/countries";
import store from "@/store";
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import mixinInputState from '@/views/componente/mixinInputState'

export default {
  name: "UsersForm",
  mixins: [mixinInputState],
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
    setInteractionMode('eager');
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    return {
      required,
      alphaNum,
      email,
      states: [],
      ciudades: [],
    };
  },
  mounted(){
    for(let prop in this.userData){
      Object.assign(this.userData, {
        [prop]: null
      })
    }
  },
  watch:{
    isAddNewUserSidebarActive(a){
      if(a){
        for(let prop in this.userData){
          Object.assign(this.userData, {[prop]: null})
        }
      }
    }
  },
  methods: {
    errorState(error){
      return error.length > 0 ? false : null;
    },
    getStates() {
      this.$store.dispatch("appLocalidades/getStates", {
        codigo: this.userData.id_pais,
      }).then((data) => {
        this.states = data;
      });
    },
    getCiudad() {
      this.$store.dispatch("appLocalidades/getCiudades", {
        codigo: this.userData.id_estado,
      }).then((data) => {
        this.ciudades = data;
      });
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
    const userData = ref(blankUserData);

    const resetuserData = () => {
      userData.value = blankUserData;
    };

    const onSubmit = () => {
      store.dispatch("appUser/addUser", userData.value)
      .then((response) => {
        store.dispatch("appUser/fetchUsers");
        toast({
          component: ToastificationContent,
          props: {
            icon: "CheckCircleIcon",
            title: "Agente Creado",
            text: "Agente creado exitosamente",
            variant: "success",
          },
        });
        emit("update:is-add-new-user-sidebar-active", false);
      }).catch((error) => {
        let statu = error.response.data;
        if (statu.status == 400) {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Algo salio mal',
              text: statu.data,
              icon: "AlertCircleIcon",
              variant: "danger",
            },
          });
        } else {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Algo salio mal',
              text: 'Revisa que el correo o el numero de cedula no esten registrados en la base de datos',
              icon: "AlertCircleIcon",
              variant: "danger",
            },
          });
        }
        // emit("update:is-add-new-user-sidebar-active", false);
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

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
