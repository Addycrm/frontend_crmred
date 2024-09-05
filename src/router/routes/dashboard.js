export default [
  // {
  //   path: '/dashboard/analytics',
  //   name: 'dashboard-analytics',
  //   component: () => import('@/views/dashboard/analytics/Analytics.vue'),
  //   meta: {
  //     resource: 'home',
  //     action: 'read',
  //   },
  // },
  {
    name: 'subportales-import',
    path: '/subportales-import',
    meta: {
      //pageTitle: 'Programar E-Mail',
      resource: 'mercadeo',
      action: 'read',

    },
    component: () => import('@/views/pages/subportales_import.vue'),
  },

  {
    name: 'programar-email',
    path: '/historial-email',
    meta: {
      //pageTitle: 'Programar E-Mail',
      resource: 'mercadeo',
      action: 'read',

    },
    component: () => import('@/views/apps/mercadeo/email/NewArrivals.vue'),
  },

  {

    name: 'email-create',
    path: '/programar-email-create',
    meta: {
      //pageTitle: 'Crear E-Mail',
      resource: 'mercadeo',
      action: 'read',

    },
    component: () => import('@/views/apps/mercadeo/email/programarEmail.vue'),
  },
  // Perfil
  {
    name: 'dashboard-agente',
    path: '/dashboar-agente',
    component: () => import('@/views/apps/dashboard/dashboard.vue'),
    meta: {
      resource: 'dashboard_agente',
      action: 'read',
      // //pageTitle: 'Dashboard Inmobiliaria',
      //breadcrumb: [

      // {
      //   text: 'pagina',
      // },
      // {
      //   text: 'perfil',
      //   active: true,
      // },
      //],
    },
  },

  {
    name: 'reportes',
    path: '/reportes',
    component: () => import('@/views/apps/dashboard/reportes.vue'),
    meta: {
      resource: 'reportes',
      action: 'list',
    },
  },


  // {
  //   path: '/inicio',
  //   name: 'inicio-home',
  //   component: () => import('@/views/inicio/inicio.vue'),
  //   meta: {
  //     layout: 'full',
  //     resource: 'Auth',
  //     redirectIfLoggedIn: true,
  //   },
  // },

  {
    path: '/inmobiliaria',
    name: 'inmobiliaria',
    component: () => import('@/views/apps/inmobiliarias/inmobiliaria.vue'),
    meta: {
      action: "read",
      resource: "private",
    },
  },

  {
    path: '/portales',
    name: 'portales',
    component: () => import('@/views/apps/portales/portales.vue'),
    meta: {
      action: "read",
      resource: "private",
    },
  },

  {
    path: '/mercadeo-admin',
    name: 'mercadeo-admin',
    component: () => import('@/views/admin/mercadeo/mercadeo.vue'),
    meta: {
      action: "read",
      resource: "private",
    },
  },
]
