<template>
  <div id="Calendar">
    <b-card no-body class="overflow-hidden">
      <b-row class="m-0">
        <b-col cols="auto" :class="{show}" class="p-2 calendarSideBar d-flex flex-column">
          <b-row class="mx-n1 mt-n1 flex-column">
            <b-col cols="auto" class="p-1">
              <b-button variant="primary" @click="sideBar = true" block>
                Agregar Cita
              </b-button>
            </b-col>
          </b-row>
          <CalendarFilter v-bind="filter"></CalendarFilter>
        </b-col>
        <b-col class="app-calendar">
          <b-overlay :show="overlay">
            <full-calendar
              ref="refCalendar"
              :options="options"
              class="full-calendar"
            >
              <template v-slot:eventContent="arg"  class="container_tipo">
                <span v-if="arg.event.extendedProps.inmueble_id">
                  <i >{{arg.event.extendedProps.inmueble_id.id}}: {{ arg.event.extendedProps.inmueble_id.titulo_inmueble}}</i>
                  <p> Tipo: {{  arg.event.extendedProps.t_cita.label  }}</p>
                </span>
                <span v-else>
                  <p> Tipo: {{  arg.event.extendedProps.t_cita.label  }}</p>
                </span>
              </template>
            </full-calendar>
          </b-overlay>
        </b-col>
      </b-row>
    </b-card>
    <transition name="slide-to-left">
      <v-modal v-if="sideBar" @close="closeSideBar" :titulo="!CalendarForm.calendar.id ? 'Agendar Cita' : 'Editar Cita'" sideBar sideBarOverlay size="xxs" overlayClose footer>
        <template #optiosnHeader>
          <div class="d-flex flex-grow-1">
            <template v-if="CalendarForm.calendar.id">
              <b-overlay :show="overlay" class="ml-auto">
                <b-button 
                @click="removeEvent(CalendarForm.calendar.id)"
                  size="sm" variant="danger" pill class="order-1 btn-icon d-flex justify-content-center align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :style="{width: '1.25em', height: '1em', margin: '-0.5em', fontSize: '1em'}" fill="currentColor"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                </b-button>
              </b-overlay>
            </template>
          </div>
        </template>
        <CalendarForm v-bind="CalendarForm" ref="CalendarForm" />
        <template #footer>
          <b-overlay :show="overlay">
            <b-button variant="success" @click="validateData">
              {{!CalendarForm.calendar.id ? 'Agendar' : 'Actualizar'}}
            </b-button>
            <b-button v-if="CalendarForm.calendar.id" variant="warning" @click="modalState = true">
              Estado de la Cita
            </b-button>
          </b-overlay>
        </template>
      </v-modal>
    </transition>
    <transition name="fade">
      <v-modal v-if="modalState" @close="modalState = false" titulo="Estado de la Cita" size="xxs">
        <ModalEstadoCita v-model="modalState" @close="sideBar = false" :agenda="CalendarForm.calendar.id"/>
      </v-modal>
    </transition>
  </div>
</template>
<script>
import VModal from "@/views/componente/vModal";
import FullCalendar from "@fullcalendar/vue";

import CalendarFilter from "./calendar-sidebar/CalendarFilter.vue";
import CalendarForm from "./calendar-event-handler/CalendarForm.vue";

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import locale from '@fullcalendar/core/locales/es';
import ModalEstadoCita from '@/views/apps/calendar/ModalEstadoCita';

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import mixinApis from '@/views/componente/mixinApis'
export default {
  name: 'Calendar',
  mixins:[mixinApis],
  components: {
    ModalEstadoCita,
    FullCalendar,
    CalendarFilter,
    CalendarForm,
    VModal,
  },
  data(){
    this.api.push({
      api: 'appCalendario/getEventos',
      data: {}
    },{
      api: 'appConfiguracion/getTaskTag',
      data: {}
    });
    return {
      optionsAlert:{},
      show: false,
      overlay: false,
      modalState: false,
      sideBar: false,
      CalendarForm: {
        calendar: {
          id: null,
          event: {
            t_cita:null,
            start:null,
            end:null,
            assignee: null,
            cliente_id:null,
            inmueble_id:null,
            direccion:null,
            nota:null
          }
        }
      },
    }
  },
  mounted(){
    this.optionsAlert= this.$swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
        },
        buttonsStyling: false
    })
  },
  computed:{
    filter(){
      return {
        t_cita: this.$store.state.appConfiguracion.tags.tcita,
        assignee: this.$store.state.appConfiguracion.options.agentes
      }
    },
    events(){
      return this.$store.state.appCalendar.calendars;
    },
    options(){
      let $this = this;
      return {
        events: this.events.result,
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        locale,
         customButtons: {
          sidebarToggle: {
            click:() => {
              $this.show = !$this.show;
            }
          }
        },
        headerToolbar: {
          start: 'sidebarToggle, prev,next, title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        },
        // eventResizableFromStart: true,
        // dragScroll: true,
        // navLinks: true,
        eventClassNames({event}){
          return [`bg-light-${event._def.extendedProps.t_cita.color}`];
        },
        eventClick({event}){
          $this.CalendarForm.calendar['id'] = Number(event.id);
          for(let prop in $this.CalendarForm.calendar.event){
            switch(prop){
              case 't_cita':
              case 'assignee':
                $this.CalendarForm.calendar.event[prop] = event.extendedProps[prop] ? event.extendedProps[prop].id : event.extendedProps[prop];
                break;
              case 'start':
                $this.CalendarForm.calendar.event[prop] = event.startStr;
                break;
              case 'end':
                $this.CalendarForm.calendar.event[prop] = event.endStr;
                break;
              default:
                $this.CalendarForm.calendar.event[prop] = event.extendedProps[prop];
            }
          }
          $this.sideBar = true;
        },
        editable: true,
        dayMaxEvents: true,
        dateClick({dateStr}) {
          $this.createCalendar({
            start: dateStr,
            end: `${dateStr} 23:55`
          });
        },
        async eventDrop({event}){
          let data = $this.CalendarForm.calendar;
          Object.assign(data, $this.CalendarForm.calendar);
            
          data['id'] = Number(event.id);
          for(let prop in data.event){
            switch(prop){
              case 't_cita':
              case 'assignee':
              case 'cliente_id':
              case 'inmueble_id':
                data.event[prop] = event.extendedProps[prop] ? event.extendedProps[prop].id : event.extendedProps[prop];
                break;
              case 'start':
                data.event[prop] = event.startStr;
                break;
              case 'end':
                data.event[prop] = event.endStr;
                break;
              default:
                data.event[prop] = event.extendedProps[prop];
            }
          }
          $this.overlay = true;
          await $this.sendEvent({data, id: data.id});
          $this.overlay = false;
        },
        selectable: true,
        select({startStr, endStr}) {
          $this.createCalendar({
            start: startStr,
            end: endStr
          });
        }
      }
    }
  },
  methods:{
    createCalendar(config){
      Object.assign(this.CalendarForm.calendar.event, config);
      this.sideBar = true;
    },
    closeSideBar(){
      this.sideBar = false;
      this.CalendarForm.calendar.id = null;
      for(let prop in this.CalendarForm.calendar.event){
        switch(prop){
          default:
            this.CalendarForm.calendar.event[prop] = null;
        }
      }
    },
    async removeEvent(id){
      this.optionsAlert.fire({
        title: "ELIMINAR CITA",
        text: `Estas seguro de eliminar la cita?`,
        icon: 'question',
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        reverseButtons: true
        }).then(async (result) => {
          if(result.isConfirmed){
            this.overlay = true;
            await this.$store.dispatch('appCalendar/removeEvent', id)
            .then(({state, data}) => {
              let toast = {
                component: ToastificationContent,
                position: "top-center",
              }
              if(state){
                this.$store.commit('appCalendar/REMOVE_CALENDARS', id);
                Object.assign(toast, {
                  props: {
                    icon: "CheckCircleIcon",
                    title: 'Cita Eliminada',
                    variant: "success",
                    text: 'Tu cita fue eliminada exitosamente',
                  }
                });
                this.closeSideBar();
              }else{
                Object.assign(toast, {
                  props: {
                    title: 'Algo salio mal',
                    icon: "AlertCircleIcon",
                    variant: "danger",
                    text: 'En este momento no se puede actualizar la tarea',
                  },
                });
              }
              this.$toast(toast);
            });
            this.overlay = false;
          }
        })
    },
    validateData(){
      const value = this.$refs['CalendarForm'].validateData()
      if(value.state){
        this.onSubmit()
      }else{
        this.$refs['CalendarForm'].makeToast(value.error)
      }
    },
    async onSubmit(){
      await this.$refs['CalendarForm'].onSubmit()

      .then(async data => {
        if(data){
          let {id} = this.CalendarForm.calendar
          this.sendEvent({data, id});
        }
      });
    },
    async sendEvent({data, id}){
      let toast = {
        component: ToastificationContent,
        position: "top-center",
      }
      this.overlay = true;
      await this.$store.dispatch('appCalendar/sendEvent', {data, id})
      .then(state => {
        if(state){
          this.closeSideBar();
          if(id){
            Object.assign(toast, {
              props: {
                title: 'Cita Actualizada',
                icon: "CheckCircleIcon",
                variant: "success",
                text: 'Tu cita se actualizo exitosamente',
              }
            });
          }else{
            Object.assign(toast, {
              props: {
                title: 'Cita Agendada',
                icon: "CheckCircleIcon",
                variant: "success",
                text: 'Tu cita se agendo exitosamente',
              },
            });
          }
        }else{
          Object.assign(toast, {
            props: {
              title: 'Algo salio mal',
              icon: "AlertCircleIcon",
              variant: "danger",
              text: 'En este momento no se puede actualizar la tarea',
            },
          });
        }
        this.$toast(toast);
      })
      this.overlay = false;
    }
  },
};
</script>
<style>
  .app-calendar .fc-view-harness{
    margin: 0!important;
  }
  .calendarSideBar{
    width: 250px;
  }
  a.fc-daygrid-more-link {
    padding-top: 10px;
    display: block;
  }

  .fc-daygrid-event span{
    display: inline-block;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .fc-event-main span{
    display: inline-block;
    height: 100%;
    overflow-y: hidden;
  }
  
</style>

<style lang="scss">
  @import "@core/scss/vue/apps/calendar.scss";
</style>
