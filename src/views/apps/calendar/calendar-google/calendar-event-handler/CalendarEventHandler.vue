<template>
  <div>
    <b-sidebar
      id="sidebar-add-new-event"
      sidebar-class="sidebar-lg"
      :visible="isEventHandlerSidebarActive"
      bg-variant="white"
      shadow
      backdrop
      no-header
      right
      @change="(val) => $emit('update:is-event-handler-sidebar-active', val)"
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
          <h5 class="mb-0">
            {{ eventLocal.id ? "Actualizar" : "Agregar" }} Evento
          </h5>
          <div>
            <feather-icon
              v-if="eventLocal.id"
              icon="TrashIcon"
              class="cursor-pointer"
              @click="
                $emit('remove-event');
                hide();
              "
            />
            <feather-icon
              class="ml-1 cursor-pointer"
              icon="XIcon"
              size="16"
              @click="hide"
            />
          </div>
        </div>
      
        <!-- Body -->
        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
          <!-- Form -->
          <b-form
            class="p-2"
            @submit.prevent="handleSubmit(onSubmit)"
            @reset.prevent="resetForm"
          >
            <!-- Title -->
            <validation-provider
              #default="validationContext"
              name="Title"
              rules="required"
            >
              <b-form-group label="Titulo" label-for="event-title">
                <b-form-input
                  id="event-title"
                  v-model="eventLocal.summary"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="Event Title"
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Calendar -->
            <validation-provider
              #default="validationContext"
              name="Calendar"
              rules="required"
            >
              <b-form-group
                label="Calendario"
                label-for="calendar"
                :state="getValidationState(validationContext)"
              >
                <v-select
                  v-model="eventLocal.extendedProps.calendar"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="calendarOptions"
                  label="label"
                  :reduce="(calendar) => calendar.label"
                  input-id="calendar"
                >
                  <template #option="{ color, label }">
                    <div
                      class="rounded-circle d-inline-block mr-50"
                      :class="`bg-${color}`"
                      style="height: 10px; width: 10px"
                    />
                    <span> {{ label }}</span>
                  </template>

                  <template #selected-option="{ color, label }">
                    <div
                      class="rounded-circle d-inline-block mr-50"
                      :class="`bg-${color}`"
                      style="height: 10px; width: 10px"
                    />
                    <span> {{ label }}</span>
                  </template>
                </v-select>

                <b-form-invalid-feedback
                  :state="getValidationState(validationContext)"
                >
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Start Date -->
            <validation-provider
              #default="validationContext"
              name="Start Date"
              rules="required"
            >
              <b-form-group
                label="Fecha inicial"
                label-for="start-date"
                :state="getValidationState(validationContext)"
              >
                <flat-pickr
                  v-model="eventLocal.start.dateTime"
                  class="form-control"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                />
                <b-form-invalid-feedback
                  :state="getValidationState(validationContext)"
                >
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- End Date -->
            <validation-provider
              #default="validationContext"
              name="End Date"
              rules="required"
            >
              <b-form-group
                label="Fecha final"
                label-for="end-date"
                :state="getValidationState(validationContext)"
              >
                <flat-pickr
                  v-model="eventLocal.end.dateTime"
                  class="form-control"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                />
                <b-form-invalid-feedback
                  :state="getValidationState(validationContext)"
                >
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- All Day -->
            <b-form-group>
              <b-form-checkbox
                v-model="eventLocal.allDay"
                name="check-button"
                switch
                inline
              >
                Todos los dias
              </b-form-checkbox>
            </b-form-group>

            <!-- Event URL -->
            <validation-provider
              #default="validationContext"
              name="Event URL"
              rules="url"
            >
              <b-form-group label="URL del evento" label-for="event-url">
                <b-form-input
                  id="event-url"
                  v-model="eventLocal.htmlLink"
                  type="url"
                  :state="getValidationState(validationContext)"
                  placeholder="htttps://www.google.com"
                  trim
                />

                <b-form-invalid-feedback
                  :state="getValidationState(validationContext)"
                >
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Guests -->
            <b-form-group label="Agregar referidos" label-for="add-guests">
              <v-select
                v-model="eventLocal.extendedProps.guests"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                multiple
                :close-on-select="false"
                :options="guestsOptions"
                label="name"
                input-id="add-guests"
              >
                <template #option="{ avatar, name }">
                  <b-avatar size="sm" :src="avatar" />
                  <span class="ml-50 align-middle"> {{ name }}</span>
                </template>

                <template #selected-option="{ avatar, name }">
                  <b-avatar
                    size="sm"
                    class="border border-white"
                    :src="avatar"
                  />
                  <span class="ml-50 align-middle"> {{ name }}</span>
                </template>
              </v-select>
            </b-form-group>

            <!-- Location -->
            <b-form-group label="Localizacion" label-for="event-location">
              <b-form-input
                id="event-location"
                v-model="eventLocal.extendedProps.location"
                trim
                placeholder="Event Location"
              />
            </b-form-group>

            <!-- Textarea -->
            <b-form-group label="Descripcion" label-for="event-description">
              <b-form-textarea
                id="event-description"
                v-model="eventLocal.extendedProps.nota"
              />
            </b-form-group>

            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
              >
                {{ eventLocal.id ? "Actualizar" : "Agregar " }}
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
              >
                Limpiar
              </b-button>
            </div>
          </b-form>
        </validation-observer>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import {
  BSidebar,
  BForm,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BAvatar,
  BFormTextarea,
  BButton,
  BFormInvalidFeedback,
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import Ripple from "vue-ripple-directive";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email, url } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import { ref, toRefs } from "@vue/composition-api";
import useCalendarEventHandler from "./useCalendarEventHandler";

export default {
  components: {
    BButton,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormTextarea,
    BAvatar,
    vSelect,
    flatPickr,
    ValidationProvider,
    BFormInvalidFeedback,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: "isEventHandlerSidebarActive",
    data: "update:is-event-handler-sidebar-active",
  },
  props: {
    isEventHandlerSidebarActive: {
      type: Boolean,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
    clearEventData: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      required,
      email,
      url,
    };
  },
  setup(props, { emit }) {
    const clearFormData = ref(null);

    const {
      eventLocal,
      resetEventLocal,
      calendarOptions,

      // UI
      onSubmit,
      guestsOptions,
    } = useCalendarEventHandler(toRefs(props), clearFormData, emit);

    const { refFormObserver, getValidationState, resetForm, clearForm } =
      formValidation(resetEventLocal, props.clearEventData);

    clearFormData.value = clearForm;

    return {
      // Add New Event
      eventLocal,
      calendarOptions,
      onSubmit,
      guestsOptions,

      // Form Validation
      resetForm,
      refFormObserver,
      getValidationState,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
