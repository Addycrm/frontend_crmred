export default [
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/verify-email',
    name: 'verify',
    component: () => import('@/views/pages/authentication/email-confirm.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/login/terminos-condiciioes',
    name:'terminos',
    component:() => import ('@/views/pages/authentication/components/TerminosCondiciones.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/politicas-privacidad',
    name:'politicas',
    component:() => import ('@/views/componente/PoliticasPrivacidad.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/auth/:provider/callback',
    component: {
      template: '<div class="auth-component"></div>',
      meta: {
        layout: 'full',
        resource: 'Auth',

      },
    }

  },



  {
    path: '/register/:referral_code?',
    name: 'auth-register',
    component: () => import('@/views/pages/authentication/Register.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },

  {
    path: '/restablecer/password',
    name: 'auth-reset-password-v1',
    component: () => import('@/views/pages/authentication/ResetPassword-v1.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },


  {
    path: '/recuperar-password',
    name: 'auth-forgot-password',
    component: () => import('@/views/pages/authentication/ForgotPassword.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },

  {
    path: '/restablecer/message',
    name: 'message-reestablecer',
    component: () => import('@/views/pages/authentication/message-email.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },

  {
    path: '/pages/miscellaneous/volveremos-pronto',
    name: 'misc-coming-soon',
    component: () => import('@/views/pages/miscellaneous/ComingSoon.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/pages/miscellaneous/no-authorizado',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/pages/miscellaneous/en-mantenimiento',
    name: 'misc-under-maintenance',
    component: () => import('@/views/pages/miscellaneous/UnderMaintenance.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/pages/miscellaneous/error',
    name: 'misc-error',
    component: () => import('@/views/pages/miscellaneous/Error.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: '/perfil',
    name: 'pages-profile',
    component: () => import('@/views/pages/profile/Profile.vue'),
    meta: {
      action: "read",
      resource: "perfil_referido",
      // pageTitle: 'Mi perfil',
      // breadcrumb: [
      //   {
      //     text: 'Perfil',
      //   },
      // ],
    },
  },

  {
    path: '/inmo-agent',
    name: 'inmo-agent',
    component: () => import('@/views/admin/agentes/listAgenteComponent.vue'),
    meta: {
      layout: 'read',
      resource: 'elite',
    },
  },
  {
    path: '/inmo-agent/inmuebles/:id',
    name: 'inmueble-agent',
    component: () => import('@/views/admin/agentes/components/inmueblesAgent.vue'),
    meta: {
      resource: 'elite',
      action: 'read',
    },
  },
  {
    path: '/gestion-membresias',
    name: 'membership-management',
    component: () => import('@/views/admin/gestionMembresias/membership.vue'),
    meta: {
      layout: 'read',
      resource: 'elite',
    },
  },
  {
    path: '/perfil/agente',
    name: 'pages-profile-agente',
    component: () => import('@/views/pages/profile/ProfileAgente.vue'),
    meta: {
      action: 'read',
      resource: 'perfil_agente',
    },
  },

  {
    path: '/transacciones',
    name: 'transactions-agente',
    component: () => import('@/views/pages/transactions/index.vue'),
    meta: {
      action: 'read',
      resource: 'transaction',
    },
  },
  {
    path: '/transacciones/idTransaction=:idTransaction',
    name: 'transactions-agente-form',
    component: () => import('@/views/pages/transactions/components/FormNewTransactions2.vue'),
    meta: {
      action: 'read',
      resource: 'transaction',
    },
  },
  {
    path: '/transacciones/idTransaction=:idTransaction/create',
    name: 'transactions-agente-create',
    component: () => import('@/views/pages/transactions/components/CreateTransactions.vue'),
    meta: {
      action: 'read',
      resource: 'transaction',
    },
  },
  {
    path: '/perfil/agente/:code',
    name: 'pages-profile-agente-slug',
    component: () => import('@/views/pages/profile/ProfileAgentePublic.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },

  {
    path: '/profile/agente/edit',
    name: 'pages-profile-agente-edit',
    component: () => import('@/views/apps/perfil/perfil-edit/PerfilEdictAgente.vue'),
    meta: {
      action: 'read',
      resource: 'perfil_agente',
      // pageTitle: 'Editar perfil',
      // breadcrumb: [
      //   {
      //     text: 'Editar',
      //   },
      // ],
    },
  },

  {
    path: '/perfil/editar/',
    name: 'perfil-editar',
    component: () => import('@/views/apps/perfil/perfil-edit/PerfilEdit.vue'),
    meta: {
      action: 'updated',
      resource: 'perfil',
      pageTitle: 'Mi perfil',

    },
  },
  // {
  //   path: '/perfil/editar/',
  //   name: 'perfil-editar',
  //   component: () => import('@/views/apps/perfil/perfil-edit/PerfilEdit.vue'),
  //   meta: {
  //     action: 'read',
  //     resource: 'perfil_agente',
  //     pageTitle: 'Mi perfil',

  //   },
  // },

  {
    path: '/perfil/editar-socio/',
    name: 'perfil-editar-agente',
    component: () => import('@/views/apps/perfil/perfil-edit/PerfilEditAdmin.vue'),
    meta: {
      action: 'read',
      resource: 'perfil',
      pageTitle: 'Mi perfil',
      // breadcrumb: [
      //   {
      //     text: 'Perfil',
      //     router: ''
      //   },
      //   {
      //     text: 'Editar',
      //     active: true,
      //   },
      // ],
    },
  },


  {
    path: '/paginas/perfiles',
    name: 'perfiles',
    component: () => import('@/views/templates/perfiles/perfiles.vue'),
    meta: {
      action: 'read',
      resource: 'perfiles',
    },
  },

  {
    path: '/paginas/perfiles/list',
    name: 'perfiles-list',
    component: () => import('@/views/templates/perfiles/perfilesList.vue'),
    meta: {
      action: 'read',
      resource: 'perfiles',
    },
  },

  {
    path: '/paginas/perfiles/edit/:id',
    name: 'perfiles-edit',
    component: () => import('@/views/templates/perfiles/perfilesEdit.vue'),
    meta: {
      action: 'updated',
      resource: 'banners',
    },
  },




  {
    path: '/paginas/banners',
    name: 'banners',
    component: () => import('@/views/templates/banners/banners.vue'),
    meta: {
      action: 'read',
      resource: 'banners',
    },
  },

  {
    path: '/paginas/banners/list',
    name: 'banners-list',
    component: () => import('@/views/templates/banners/bannersList.vue'),
    meta: {
      action: 'read',
      resource: 'banners',
    },
  },

  {
    path: '/paginas/banners/edit/:id',
    name: 'banners-edit',
    component: () => import('@/views/templates/banners/bannersEdit.vue'),
    meta: {
      action: 'updated',
      resource: 'banners',
    },
  },


  {
    path: '/paginas/blogs',
    name: 'blogs',
    component: () => import('@/views/templates/blogs/blogs.vue'),
    meta: {
      action: 'read',
      resource: 'blogs',
    },
  },

  {
    path: '/paginas/blogs/list',
    name: 'blogs-list',
    component: () => import('@/views/templates/blogs/blogsList.vue'),
    meta: {
      action: 'read',
      resource: 'blogs',
    },
  },

  {
    path: '/paginas/blogs/edit/:id',
    name: 'blogs-edit',
    component: () => import('@/views/templates/blogs/blogsEdit.vue'),
    meta: {
      action: 'updated',
      resource: 'blogs',
    },
  },



  {
    path: '/paginas/template',
    name: 'template',
    component: () => import('@/views/templates/template/template.vue'),
    meta: {
      action: 'read',
      resource: 'template',
    },
  },

  {
    path: '/paginas/template/list',
    name: 'template-list',
    component: () => import('@/views/templates/template/templateList.vue'),
    meta: {
      action: 'read',
      resource: 'template',
    },
  },

  {
    path: '/paginas/template/edit/:id',
    name: 'template-edit',
    component: () => import('@/views/templates/template/templateEdit.vue'),
    meta: {
      action: 'updated',
      resource: 'template',
    },
  },


  {
    path: '/credenciales',
    name: 'credenciales',
    component: () => import('@/views/templates/credenciales/credencialesEdit.vue'),
    meta: {
      action: 'read',
      resource: 'credenciales',
    },
  },
]
