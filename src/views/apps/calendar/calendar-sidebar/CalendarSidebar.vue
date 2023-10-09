<template>
  <div
    class="
      sidebar-wrapper
      d-flex
      justify-content-between
      flex-column flex-grow-1
    "
  >
    <div class="p-2">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        aria-controls="sidebar-add-new-event"
        :aria-expanded="String(isEventHandlerSidebarActive)"
        variant="primary"
        block
        @click="$emit('update:isEventHandlerSidebarActive', true)"
      >
        Agregar evento
      </b-button>
      <div class="mt-3">
        <h5 class="app-label section-label mb-1">
          <span class="align-middle">Tipos de citas</span>
        </h5>
        <b-form-checkbox v-model="checkAll" class="mb-1">
          ver todos
        </b-form-checkbox>
        <b-form-group>
          <b-form-checkbox-group
            v-model="selectedCalendars"
            name="event-filter"
            stacked
          >
            <b-form-checkbox
              v-for="item in calendarOptions"
              :key="item.id"
              name="event-filter"
              :value="item.id"
              class="mb-1"
              :class="`custom-control-${item.color}`"
            >
              {{ item.label }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import Ripple from "vue-ripple-directive";
import useCalendarSidebar from "./useCalendarSidebar";

export default {
  directives: {
    Ripple,
  },
  props: {
    isEventHandlerSidebarActive: {
      type: Boolean,
      require: true,
    },
  },
  setup() {
    const { calendarOptions, selectedCalendars, checkAll } =
      useCalendarSidebar();

    return {
      calendarOptions,
      selectedCalendars,
      checkAll,
    };
  },
};
</script>

<style>
</style>
