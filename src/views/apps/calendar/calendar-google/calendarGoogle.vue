<template>
  <div class="app-calendar overflow-hidden border">
    <googleData></googleData>

    <!-- <FullCalendar :options="calendarOptions" /> -->

    <div class="row no-gutters">
      <!-- Sidebar -->

      <!-- Calendar -->
      <div class="col position-relative">
        <div class="card shadow-none border-0 mb-0 rounded-0">
          <div class="card-body pb-0">
            <full-calendar
              ref="refCalendar"
              :options="calendarOptions"
              class="full-calendar"
            />
          </div>
        </div>
      </div>

      <!-- Sidebar Overlay -->
      <div
        class="body-content-overlay"
        :class="{ show: isCalendarOverlaySidebarActive }"
        @click="isCalendarOverlaySidebarActive = false"
      />
      <calendar-event-handler
        v-model="isEventHandlerSidebarActive"
        :event="event"
        :clear-event-data="clearEventData"
        @remove-event="removeEvent"
        @add-event="addEvent"
        @update-event="updateEvent"
      />
    </div>
  </div>
</template>


<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";

import interactionPlugin from "@fullcalendar/interaction";
import store from "@/store";
import { onUnmounted } from "@vue/composition-api";
import calendarStoreModule from "../calendarStoreModule";
import CalendarSidebar from "./calendar-sidebar/CalendarSidebar.vue";
import CalendarEventHandler from "./calendar-event-handler/CalendarEventHandler.vue";
import useCalendar from "./useCalendarGoogle";
import googleData from "./google-data.vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    CalendarSidebar,
    CalendarEventHandler,
    googleData,
  },

  data() {
    return {
    

      data: [],
    };
  },

  directives: {
    Ripple,
  },

  computed: {
    dataGoogle() {
      return this.$store.state.calendar.dataGoogle;
    },
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      this.$root.$on(
        "dataCalendarGoogle",
        function (payLoad) {
          if (this.payLoad != payLoad) {
            this.calendarOptions.events = payLoad;
          }
        }.bind(this)
      );
    },
  },

  setup() {
    const CALENDAR_APP_STORE_MODULE_NAME = "calendar";

    // Register module
    if (!store.hasModule(CALENDAR_APP_STORE_MODULE_NAME))
      store.registerModule(CALENDAR_APP_STORE_MODULE_NAME, calendarStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CALENDAR_APP_STORE_MODULE_NAME))
        store.unregisterModule(CALENDAR_APP_STORE_MODULE_NAME);
    });

    const {
      refCalendar,
      isCalendarOverlaySidebarActive,
      event,
      clearEventData,
      addEvent,
      updateEvent,
      removeEvent,
      fetchEvents,
      refetchEvents,
      calendarOptions,
      // ----- UI ----- //
      isEventHandlerSidebarActive,
    } = useCalendar();

    fetchEvents();

    return {
      refCalendar,
      isCalendarOverlaySidebarActive,
      event,
      clearEventData,
      addEvent,
      updateEvent,
      removeEvent,
      refetchEvents,
      calendarOptions,
      // ----- UI ----- //
      isEventHandlerSidebarActive,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/apps/calendar.scss";
</style>
