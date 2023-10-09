<template>
  <b-modal
    centered
    size="lg"
    :id="infoModal.id"
    ref="modal-add-cliente"
    title="Seleccionar Clentes"
    ok-title="Seleccionar"
    hide-footer
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    @ok="hendleOk"
  >
    <b-row>
      <b-col cols="12">
        <form-wizard
          ref="wizard"
          color="#7367F0"
          :title="null"
          :subtitle="null"
          shape="square"
          finish-button-text="Registrar"
          back-button-text="Atras"
          next-button-text="Siguiente"
          class="wizard-vertical mb-3"
          @on-complete="validationTipoform"
        >
          <!-- account datails tab -->
          <tab-content title="Información básica">
            <validation-observer>
              <b-row>
                <b-col cols="12" class="mb-2">
                  <h5 class="mb-0">Información básica</h5>
                  <small class="text-muted">
                    Ingresa todos los campos, si tienes (*) Son
                    obligatorios</small
                  >
                </b-col>

                <b-col md="12">
                  <b-form-group label="* Tipo cliente" label-for="v-tipo">
                    <validation-provider
                      #default="{ errors }"
                      name="tipo"
                      rules="required"
                    >
                      <v-select
                        v-model="form.tipo_cliente"
                        :options="tipo_clientes"
                        label="nombre"
                        :value="tipo_clientes.id"
                        :clearable="false"
                        input-id="tipo_cliente"
                      />

                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                        campo requerido
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-row
                    v-for="(item, index) in itemsCorreo"
                    :id="item.id"
                    :key="item.id"
                    ref="row"
                  >
                    <b-col md="10">
                      <b-form-group
                        label="* Correo electronico"
                        label-for="v-correo"
                      >
                        <validation-provider
                          #default="{ errors }"
                          name="correo"
                          rules="required|email"
                        >
                          <b-form-input
                            size="sm"
                            id="v-correo"
                            v-model="item.correo"
                            type="email"
                            placeholder="Escribe tu correo electronico"
                            :state="errors.length > 0 ? false : null"
                          />
                          <b-form-invalid-feedback
                            :state="errors.length > 0 ? false : null"
                          >
                            campo requerido
                          </b-form-invalid-feedback>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-button-group size="sm">
                        <b-button
                          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                          variant="danger"
                          class="mt-0 mt-md-2"
                          @click="removeItemCorreo(index)"
                        >
                          <feather-icon icon="Trash2Icon" class="mr-25" />
                        </b-button>

                        <b-button
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          variant="primary"
                          class="mt-0 mt-md-2"
                          @click="repeateAgainCorreo"
                        >
                          <feather-icon icon="PlusIcon" class="mr-25" />
                        </b-button>
                      </b-button-group>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col md="12">
                  <b-form-group label="* Nombres" label-for="v-nombre">
                    <validation-provider
                      #default="{ errors }"
                      name="nombre"
                      rules="required"
                    >
                      <b-form-input
                        id="v-primer_nombre"
                        v-model="form.nombre"
                        type="text"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Escribe tu nombre"
                      />
                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                        campo requerido
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-form-group label="*Apellidos" label-for="v-apellido">
                    <validation-provider
                      #default="{ errors }"
                      name="apellido"
                      rules="required"
                    >
                      <b-form-input
                        id="v-apellido"
                        v-model="form.apellido"
                        type="text"
                        placeholder="Escribe tu apellido"
                        :state="errors.length > 0 ? false : null"
                      />
                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                        campo requerido
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-row
                    v-for="(item, index) in items"
                    :id="item.id"
                    :key="item.id"
                    ref="row"
                  >
                    <b-col md="10">
                      <b-form-group
                        label="* Telefono Celular"
                        label-for="v-celular"
                      >
                        <validation-provider
                          #default="{ errors }"
                          name="celular|min:13"
                          rules="required"
                        >
                          <vue-phone-number-input
                            default-country-code="CO"
                            :translations="{
                              countrySelectorLabel: 'Codigo pais',
                              countrySelectorError: 'Choisir un pays',
                              phoneNumberLabel: 'Numéro de Celular',
                              example: 'Ejemplo :',
                            }"
                            v-model="item.celular"
                            @update="results = $event"
                          />

                          <b-form-invalid-feedback
                            :state="errors.length > 0 ? false : null"
                          >
                            campo requerido
                          </b-form-invalid-feedback>
                        </validation-provider>
                      </b-form-group></b-col
                    >
                    <b-col>
                      <b-button-group size="sm">
                        <b-button
                          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                          variant="danger"
                          class="mt-0 mt-md-2"
                          @click="removeItem(index)"
                        >
                          <feather-icon icon="Trash2Icon" class="mr-25" />
                        </b-button>
                        <b-button
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          variant="primary"
                          class="mt-0 mt-md-2"
                          @click="repeateAgain"
                        >
                          <feather-icon icon="PlusIcon" class="mr-25" />
                        </b-button> </b-button-group
                    ></b-col>
                  </b-row>
                </b-col>

                <b-col md="12">
                  <b-form-group label="* WhatsApp" label-for="v-telefono">
                    <validation-provider
                      #default="{ errors }"
                      name="telefono|min:13"
                      rules="required"
                    >
                      <vue-phone-number-input
                        default-country-code="CO"
                        :translations="{
                          countrySelectorLabel: 'Codigo pais',
                          countrySelectorError: 'Choisir un pays',
                          phoneNumberLabel: 'Numéro de telefono',
                          example: 'Ejemplo :',
                        }"
                        v-model="form.telefono"
                        @update="results = $event"
                      />

                      <b-form-invalid-feedback
                        :state="errors.length > 0 ? false : null"
                      >
                        campo requerido
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-form-group label="* Genero" label-for="v-genero">
                    <div class="demo-inline-spacing">
                      <b-form-radio
                        v-model="form.genero"
                        name="masculino"
                        value="2"
                        class="custom-control-primary"
                      >
                        Masculino
                      </b-form-radio>
                      <b-form-radio
                        v-model="form.genero"
                        name="femenino"
                        value="1"
                        class="custom-control-primary"
                      >
                        Femenino
                      </b-form-radio>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
            </validation-observer>
          </tab-content>
        </form-wizard>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import {
  BModal,
  BRow,
  BCol,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormFile,
  BButton,
  BFormInvalidFeedback,
  BFormCheckboxGroup,
  BFormRadio,
  BFormDatepicker,
  BButtonGroup,
  BInputGroupPrepend,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { heightTransition } from "@core/mixins/ui/transition";
import { required, email } from "@validations";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import { ValidationProvider, ValidationObserver } from "vee-validate";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import vSelect from "vue-select";

export default {
  name: "modalClientes",
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BButton,
    BInputGroupPrepend,

    BFormSelect,
    BButtonGroup,

    BFormFile,
    BFormInvalidFeedback,
    BFormCheckboxGroup,
    BFormRadio,
    BFormDatepicker,
    FormWizard,
    TabContent,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    ToastificationContent,
  },

  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      infoModal: {
        id: "modal-add-cliente",
        title: "",
        content: {},
        contentPreguntas: {},
      },

      items: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          celular: "",
        },
      ],

      itemsCorreo: [
        {
          id: 1,
          selected: "male",
          selected1: "designer",
          prevHeight: 0,
          correo: "",
        },
      ],
      nextTodoId: 2,
      snowOption: {
        theme: "snow",
        placeholder:
          "En este apartado, escribe toda la descripción necesaria para tus clientes.",
        readOnly: true,
      },

      options: {
        phone: {
          phone: true,
          phoneRegionCode: "US",
        },
        prefix: {
          prefix: "+57",
          blocks: [3, 3, 3, 4],
          uppercase: true,
        },
      },

      estados: [],
      ciudades: [],
      required,
      checked: false,
      email,

      form: {
        user_id: JSON.parse(localStorage.getItem("userData")),
        tipo_cliente: null,
        nombre: null,
        apellido: null,
        correos: [],
        telefono: null,
        celulares: [],
        genero: null,
      },
      tipo_clientes: [],
      results: null,
    };
  },
  mounted() {
       this.initTrHeight();
   
  },
  methods: {
    info(button) {
    
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    hideModal() {
      this.$refs["modal-add-cliente"].hide();
    },

    hendleOk(event) {
      let emit = "selectedClientesModal";
      if (this.module == "calendar") {
        this.selectMode = "single";
        emit = "selectedClientesCalendar";
      }
      this.$root.$emit(emit, {
        selected: this.selected,
      });
      this.hideModal();
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pNits due to filtering
      this.totalRows = filteredItems.length;
      this.currentPNit = 1;
    },

    repeateAgain() {
      this.items.push({
        id: (this.nextTodoId += this.nextTodoId),
      });

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
      });
    },
    repeateAgainCorreo() {
      this.itemsCorreo.push({
        id: (this.nextTodoId += this.nextTodoId),
      });

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
      });
    },

    removeItem(index) {
      this.items.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },

    removeItemCorreo(index) {
      this.itemsCorreo.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },
    initTrHeight() {
      this.trSetHeight(null);
      // this.$nextTick(() => {
      //   this.trSetHeight(this.$refs.form.scrollHeight);
      // });
    },

    chekiar() {
      if (this.checked == true) {
        this.form.telefono = this.form.celular;
      }
    },
    getTipoCliente() {
      this.$store
        .dispatch("appDocumentos/getTipoCliente")
        .then((response) => {
          this.tipo_clientes = response;
        })
        .catch((error) => {
        });
    },

    getTipoDocumento() {
      this.$store
        .dispatch("appDocumentos/getTipoDocumento")
        .then((response) => {})
        .catch((error) => {
        });
    },
    getPaises() {
      this.$store
        .dispatch("appLocalidades/getPaises")
        .then((response) => {})
        .catch((error) => {
        });
    },

    getEstados() {
      let codigo = this.form.pais.id;
      this.$store
        .dispatch("appLocalidades/getStates", { codigo })
        .then((response) => {
          this.estados = response;
        })
        .catch((error) => {
        });
    },

    getCiudades() {
      let codigo = this.form.departamento.id;
      this.$store
        .dispatch("appLocalidades/getCiudades", { codigo })
        .then((response) => {
          this.ciudades = response;
        })
        .catch((error) => {
        });
    },

    validationTipoform() {
      this.items.forEach((element) => {
        this.form.celulares.push({ numero: element.celular });
      });

      this.itemsCorreo.forEach((element) => {
        this.form.correos.push({ correo: element.correo });
      });

      this.$store
        .dispatch("appCliente/addClient", this.form)
        .then((response) => {
          this.form.correos = [];
          this.form.numeros = [];
          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.data.message,
              icon: "EditIcon",
              variant: "success",
            },
          });
          this.hideModal();
        })
        .catch(() => {
          this.form.correos = [];
          this.form.numeros = [];
        });
    },
  },

  created() {
    this.getTipoDocumento();
    this.getTipoCliente();
    this.getPaises();

    window.addEventListener("resize", this.initTrHeight);
  },

  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },
};
</script>