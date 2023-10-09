// Full Calendar Plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

// eslint-disable-next-line object-curly-newline
import { ref, computed, watch, onMounted } from '@vue/composition-api'
import store from '@/store'

export default function userCalendar() {
  // Use toast
  const toast = useToast()
  // ------------------------------------------------
  // refCalendar
  // ------------------------------------------------
  const refCalendar = ref(null)
  const isEventHandlerSidebarActive = ref(false)
  // ------------------------------------------------
  // calendarApi
  // ------------------------------------------------
  let calendarApi = null
  onMounted(() => {
    calendarApi = refCalendar.value.getApi()
  })

  // ------------------------------------------------
  // calendars
  // ------------------------------------------------
  const calendarsColor = computed(() => store.state.calendar.calendarOptions)

  // ------------------------------------------------
  // event
  // ------------------------------------------------
  const blankEvent = {

    start: '',
    end: '',

    url: '',
    extendedProps: {
      inmueble_id: null,
      cliente_id: null,
      nota: '',
      direccion: '',
      t_cita: null,
    },


  }
  const event = ref(JSON.parse(JSON.stringify(blankEvent)))
  const clearEventData = () => {
    event.value = JSON.parse(JSON.stringify(blankEvent))
  }

  // *===========================================================================---*
  // *--------- Calendar API Function/Utils --------------------------------------------*
  // Template Future Update: We might move this utils function in its own file
  // *===========================================================================---*

  // ------------------------------------------------
  // (UI) addEventInCalendar
  // ? This is useless because this just add event in calendar and not in our data
  // * If we try to call it on new event then callback & try to toggle from calendar we get two events => One from UI and one from data
  // ------------------------------------------------
  // const addEventInCalendar = eventData => {
  //   toast({
  //     component: ToastificationContent,
  //     position: 'bottom-right',
  //     props: {
  //       title: 'Event Added',
  //       icon: 'CheckIcon',
  //       variant: 'success',
  //     },
  //   })
  //   calendarApi.addEvent(eventData)
  // }

  // ------------------------------------------------
  // (UI) updateEventInCalendar
  // ------------------------------------------------
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {

    toast({
      component: ToastificationContent,
      props: {
        title: 'Se actualizo el evento',
        icon: 'CheckIcon',
        variant: 'success',
      },
    })

    const existingEvent = calendarApi.getEventById(updatedEventData.id)

    // --- Set event properties except date related ----- //
    // ? Docs: https://fullcalendar.io/docs/Event-setProp
    // dateRelatedProps => ['start', 'end', 'allDay']
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]
      existingEvent.setProp(propName, updatedEventData[propName])
    }

    // --- Set date related props ----- //
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(updatedEventData.start, updatedEventData.end, { allDay: updatedEventData.allDay })

    // --- Set event's extendedProps ----- //
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]
      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
    }
  }




  // ------------------------------------------------
  // (UI) removeEventInCalendar
  // ------------------------------------------------
  const removeEventInCalendar = eventId => {
    isEventHandlerSidebarActive.value = false;
    toast({
      component: ToastificationContent,
      position: 'bottom-right',
      props: {
        title: 'Se elimino el evento',
        icon: 'TrashIcon',
        variant: 'danger',
      },
    })
    calendarApi.getEventById(eventId).remove()
  }

  // ------------------------------------------------
  // 
  // ? It will return just event data from fullCalendar's EventApi which is not required for event mutations and other tasks
  // ! You need to update below function as per your extendedProps
  // ------------------------------------------------
  const grabEventDataFromEventApi = eventApi => {
    const {
      id,
      title,
      start,
      end,
      // eslint-disable-next-line object-curly-newline
      extendedProps: { calendar, guests, location, nota, direccion,
        t_cita: { color, label },
        inmueble_id: { titulo_inmueble, matricula_inmobiliaria },
        cliente_id: { nombre, correos, user_id, tipo_identificacion, tipo_cliente, genero } },
      
      allDay,
    } = eventApi

    return eventApi
  }

  // ------------------------------------------------
  // addEvent
  // ------------------------------------------------
  const addEvent = eventData => {
    let props = {}
    for(let prop in eventData.extendedProps){
      if([null, {}, "", undefined].indexOf(eventData.extendedProps[prop]) == -1){
        Object.assign(props, {
          [prop]: eventData.extendedProps[prop].id ? eventData.extendedProps[prop].id : eventData.extendedProps[prop]
        });
      }
    }
    Object.assign(eventData,{extendedProps: props})
    store.dispatch('calendar/addEvent', { event: eventData }).then(() => {
      // eslint-disable-next-line no-use-before-define
      refetchEvents()
    })
  }

  // ------------------------------------------------
  // updateEvent
  // ------------------------------------------------
  const updateEvent = eventData => {
    let props = {}
    for(let prop in eventData.extendedProps){
      if([null, {}, "", undefined].indexOf(eventData.extendedProps[prop]) == -1){
        switch(prop){
          case 't_cita':
          case 'inmueble_id':
          case 'cliente_id':
            Object.assign(props, {
              [prop]: eventData.extendedProps[prop].id
            });
            break;
          default:
            Object.assign(props, {
              [prop]: eventData.extendedProps[prop]
            });
        }
      }
    }
    Object.assign(eventData,{extendedProps: props})
    store.dispatch('calendar/updateEvent', { event: eventData }).then(response => {
      refetchEvents()
      const updatedEvent = response.data.agenda

      const propsToUpdate = ['id', 'title', 'nota', 'direccion']
      const extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description']

      updateEventInCalendar(updatedEvent, propsToUpdate, extendedPropsToUpdate)

    })
  }

  // ------------------------------------------------
  // removeEvent
  // ------------------------------------------------
  const removeEvent = () => {
    const eventId = event.value.id
    store.dispatch('calendar/removeEvent', { id: eventId }).then(() => {
      removeEventInCalendar(eventId);
    }).catch(error => {
      console.error(error);
    });
  }

  // ------------------------------------------------
  // refetchEvents
  // ------------------------------------------------
  const refetchEvents = () => {
    calendarApi.refetchEvents()
  }

  // ------------------------------------------------
  // selectedCalendars
  // ------------------------------------------------
  const selectedCalendars = computed(() => store.state.calendar.selectedCalendars)

  watch(selectedCalendars, () => {
    refetchEvents()
  })

  // --------------------------------------------------------------------------------------------------
  // AXIOS: fetchEvents
  // * This will be called by fullCalendar to fetch events. Also this can be used to refetch events.
  // --------------------------------------------------------------------------------------------------
  const fetchEvents = (info, successCallback) => {
    // If there's no info => Don't make useless API call
    if (!info) return

    // Fetch Events from API endpoint
    store
      .dispatch('calendar/fetchEvents', {
        calendars: { calendar: selectedCalendars.value }
      })
      .then(response => {
        successCallback(response)
      })
      .catch((error) => {
        toast({
          component: ToastificationContent,
          props: {
            title: error,
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }


  const fetchTipoCitasData = () => {
    // If there's no info => Don't make useless API call
    store
      .dispatch('calendar/fetchTipoCitas')
      .then(response => {
        response.data
      })
      .catch(() => {

      })
  }

  const getEstadosCitas = () => {
     store
      .dispatch("calendar/fetchEstadoAgendaCitas")
      .then(() => { })
      .catch((data) => {
        
      });
  }

  const fetchClientes = () => {
    // If there's no info => Don't make useless API call
    store
      .dispatch('calendar/fetchTipoCitas')
      .then(response => {
        response.data
      })
      .catch(() => {

      })
  }

  const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    events: fetchEvents,


    editable: true,

    eventResizableFromStart: true,


    dragScroll: true,


    dayMaxEvents: 2,


    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      let colorName = ""
      for (let i = 0; i < calendarsColor.value.length; i++) {
        if (calendarsColor.value[i].id == calendarEvent._def.extendedProps.t_cita.id) {
          colorName = calendarEvent._def.extendedProps.t_cita.color
        }

      }
      return [
        `bg-light-${colorName}`,
      ]
    },
    eventClick({ event: clickedEvent }) {
      
      const {id, _instance:{range}, _def:{extendedProps}} = clickedEvent;

      Object.assign(event.value, range, {extendedProps, id});
      isEventHandlerSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        // --- This dummy text actual icon rendering is handled using SCSS ----- //
        text: 'sidebar',
        click() {
          // eslint-disable-next-line no-use-before-define
          isCalendarOverlaySidebarActive.value = !isCalendarOverlaySidebarActive.value
        },
      },
    },

    dateClick(info) {
      Object.assign(event.value, { start: info.date })
      isEventHandlerSidebarActive.value = true
    },


    direction: computed(() => (store.state.appConfig.isRTL ? 'rtl' : 'ltr')),
    rerenderDelay: 350,
  })
  

  // ------------------------------------------------------------------------

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*



  watch(isEventHandlerSidebarActive, (a) => {
    if(!a){
      
      for(let prop in event.value){
        switch(prop){
          case 'extendedProps':
            Object.assign(event.value, {[prop]: {
              inmueble_id: null,
              cliente_id: null,
              nota: '',
              direccion: '',
              t_cita: null
            }})
            break;
          default:
          Object.assign(event.value, {[prop]: ''})
        }
      }
    }
  })

  const isCalendarOverlaySidebarActive = ref(false)

  return {
    refCalendar,
    isCalendarOverlaySidebarActive,
    calendarOptions,
    event,
    clearEventData,
    addEvent,
    updateEvent,
    removeEvent,
    refetchEvents,
    fetchTipoCitasData,
    fetchClientes,
    getEstadosCitas,
    fetchEvents,

    // ----- UI ----- //
    isEventHandlerSidebarActive,
  }
}
