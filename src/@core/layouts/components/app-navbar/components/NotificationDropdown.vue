<template>
    <b-nav-item-dropdown
      class="dropdown-notification mr-25"
      menu-class="dropdown-menu-media"
      right
    >
      <template #button-content>
        <feather-icon
          :badge="agenda.length"
          badge-classes="bg-danger"
          class="text-body"
          icon="BellIcon"
          size="21"
        />
      </template>

      <!-- Header -->
      <li class="dropdown-menu-header">
        <div class="dropdown-header d-flex">
          <h4 class="notification-title mb-0 mr-auto">
            Notificaciones
          </h4>
          <b-badge
            pill
            variant="light-primary"
          >
            {{agenda.length}}
          </b-badge>
        </div>
      </li>
      <!-- Notifications -->
      <ul
      class="list__notification"
      >
        <!-- Account Notification -->
        <li
          v-for="notification in agenda"
          :key="notification.id"
          class="item-agenda"
        >
          <b-media>
            <template #aside>
              <!-- <b-avatar
                size="32"
                :src="notification.avatar"
                :text="notification.avatar"
                :variant="notification.type"
              /> -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="icon_svg">
                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/>
              </svg>
            </template>
            <p class="media-heading">
              <span class="font-weight-bolder">
                {{ notification["t_cita"].label }}
              </span>
            </p>
            <small class="notification-text">{{ formatDate(notification.start, { month: "short", day: "numeric", year: "numeric", hourCycle: "h12", hour: "numeric", minute: "numeric"})   }} /
              {{ formatDate(notification.end,{month: "short", day: "numeric", year: "numeric",hourCycle: "h12", hour: "numeric", minute: "numeric"}) }}</small>
          </b-media>
        </li>
      </ul>

      <!-- Cart Footer -->
      <li class="dropdown-menu-footer">
      <b-button
              v-if="this.agenda.length>0"
              class="mb-1"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
                block
                :to="{name: 'apps-calendar'}"
              >
                Ver Agenda
              </b-button>
      </li>
    </b-nav-item-dropdown>
  </template>

  <script>
  import {
    BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton, BFormCheckbox,
  } from 'bootstrap-vue';
  import moment from "moment";

  import nil from 'uuid/dist/nil'
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import Ripple from 'vue-ripple-directive'
  import { formatDate } from '@core/utils/filter'

  export default {
    data() {
      return {
        perfectScrollbarSettings:[],
        db:null,
        validateHora: new Date(),
        formatDate
      }
    },
    components: {
      BNavItemDropdown,
      BBadge,
      BMedia,
      BLink,
      BAvatar,
      VuePerfectScrollbar,
      BButton,
      BFormCheckbox,
    },
    directives: {
      Ripple,
    },

    computed: {
      agenda() {
        return this.$store.state.appCalendario.escritorio
      },
      tablaClientes() {
        return this.$store.state.appCliente.contact_portal
      },
    },
    methods: {

    },




  }
  </script>
  <style scoped>
  li{
    list-style: none;
  }
  .list__notification{
    padding: 10px;
    padding-left:16px;
  }
  .item-agenda{
    margin: 6px;
  }
  .icon_svg{
    width: 25px;
    fill: var(--primary);
  }
  </style>
