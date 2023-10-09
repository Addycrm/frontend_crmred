import store from '@/store'

import { computed } from '@vue/composition-api'

export default function useCalendarSidebar() {
  // ------------------------------------------------
  // calendarOptions
  // ------------------------------------------------
  const calendarOptions = computed(() => store.state.calendar.calendarOptions)

  // ------------------------------------------------
  // selectedCalendars
  // ------------------------------------------------
  const selectedCalendars = computed({
    get: () => store.state.calendar.selectedCalendars,
    set: val => {
      store.commit('calendar/SET_SELECTED_EVENTS', val)
    },
  })

  // ------------------------------------------------
  // checkAll
  // ------------------------------------------------
  const checkAll = computed({
    get: () => selectedCalendars.value.length === calendarOptions.value.length,
    set: val => {
      if (val) {
        selectedCalendars.value = calendarOptions.value.map(i => i.id)
      } else if (selectedCalendars.value.length === calendarOptions.value.length) {
        selectedCalendars.value = []
      }
    },
  })

  return {
    calendarOptions,
    selectedCalendars,
    checkAll,
  }
}
