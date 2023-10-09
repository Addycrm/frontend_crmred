export default [

  {
    path: '/apps/calendar',
    name: 'apps-calendar',

    component: () => import('@/views/apps/calendar/Calendar.vue'),
    meta: {
      resource: 'agendas',
      action: 'read',
    },
  },

  {
    path: '/inmuebles-opciones/types',
    name: 'apps-opciones-add',
    component: () => import('@/views/apps/inmuebles/opciones/opciones.vue'),
    meta: {
      resource: 'opciones',
      action: 'read',
      //pageTitle: 'opciones',
      // breadcrumb: [
      //   {
      //     text: 'opciones',
      //   },
      //   {
      //     text: 'Agregar',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/inmuebles-opciones/caracteristicas',
    name: 'inmuebles-features',
    component: () => import('@/views/apps/inmuebles/opciones/OptionsFeaturesInmuebles.vue'),
    meta: {
      resource: 'opciones',
      action: 'read',
      //pageTitle: 'opciones',
      // breadcrumb: [
      //   {
      //     text: 'opciones',
      //   },
      //   {
      //     text: 'Agregar',
      //     active: true,
      //   },
      // ],
    },
  },



  {
    path: '/apps/calendar/calendar',
    name: 'apps-calendar-google',
    component: () => import('@/views/apps/calendar/calendarExample.vue'),
    meta: {
      resource: 'agendas',
      action: 'read',
    },
  },


  // *===============================================---*
  // *--------- EMAIL & IT'S FILTERS N LABELS -------------------------------*
  // *===============================================---*
  // {
  //   path: '/apps/email',
  //   name: 'apps-email',
  //   component: () => import('@/views/apps/email/Email.vue'),
  //   meta: {
  //     contentRenderer: 'sidebar-left',
  //     contentClass: 'email-application',
  //   },
  // },


  // *===============================================---*
  // *--------- TODO & IT'S FILTERS N TAGS ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/todo',
    name: 'apps-todo',
    component: () => import('@/views/apps/tareas/Todo.vue'),
    meta: {
      resource: 'tareas',
      action: 'read',
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
    },
  },
  {
    path: '/apps/todo/:filter',
    name: 'apps-todo-filter',
    component: () => import('@/views/apps/tareas/Todo.vue'),
    meta: {
      resource: 'tareas',
      action: 'read',
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
      navActiveLink: 'apps-todo',
    },
    beforeEnter(to, _, next) {
      if (['important', 'completed', 'deleted'].includes(to.params.filter)) next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/apps/todo/tag/:tag',
    name: 'apps-todo-tag',
    component: () => import('@/views/apps/tareas/Todo.vue'),
    meta: {
      resource: 'tareas',
      action: 'read',
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
      navActiveLink: 'apps-todo',
    },
    beforeEnter(to, _, next) {
      //  if (['equipo', 'bajo', 'medio', 'alto', 'actualizado'].includes(to.params.tag))
      next()
      // else next({ name: 'error-404' })
    },
  },

  // *===============================================---*
  // *--------- CHAT  ---------------------------------------*
  // *===============================================---*


  // *===============================================---*
  // *--------- ECOMMERCE  ---------------------------------------*
  // *===============================================---*
  // {
  //   path: '/apps/e-commerce/shop',
  //   name: 'apps-e-commerce-shop',
  //   component: () => import('@/views/apps/e-commerce/e-commerce-shop/ECommerceShop.vue'),
  //   meta: {
  //     contentRenderer: 'sidebar-left-detached',
  //     contentClass: 'ecommerce-application',
  //     //pageTitle: 'Shop',
  //     breadcrumb: [
  //       {
  //         text: 'ECommerce',
  //       },
  //       {
  //         text: 'Shop',
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: '/apps/e-commerce/wishlist',
  //   name: 'apps-e-commerce-wishlist',
  //   component: () => import('@/views/apps/e-commerce/e-commerce-wishlist/ECommerceWishlist.vue'),
  //   meta: {
  //     //pageTitle: 'Wishlist',
  //     contentClass: 'ecommerce-application',
  //     breadcrumb: [
  //       {
  //         text: 'ECommerce',
  //       },
  //       {
  //         text: 'Wishlist',
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: '/apps/e-commerce/checkout',
  //   name: 'apps-e-commerce-checkout',
  //   component: () => import('@/views/apps/e-commerce/e-commerce-checkout/ECommerceCheckout.vue'),
  //   meta: {
  //     //pageTitle: 'Checkout',
  //     contentClass: 'ecommerce-application',
  //     breadcrumb: [
  //       {
  //         text: 'ECommerce',
  //       },
  //       {
  //         text: 'Checkout',
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: '/apps/e-commerce/:slug',
  //   name: 'apps-e-commerce-product-details',
  //   component: () => import('@/views/apps/e-commerce/e-commerce-product-details/ECommerceProductDetails.vue'),
  //   meta: {
  //     //pageTitle: 'Product Details',
  //     contentClass: 'ecommerce-application',
  //     breadcrumb: [
  //       {
  //         text: 'ECommerce',
  //       },
  //       {
  //         text: 'Shop',
  //         active: true,
  //       },
  //       {
  //         text: 'Product Details',
  //         active: true,
  //       },
  //     ],
  //   },
  // },

  // *===============================================---*
  // *--------- Billetera ---- ---------------------------------------*
  // *================================================---*
  {
    path: '/permisos/',
    name: 'permisos-user',
    component: () => import('@/views/apps/user/users-list/UsersList.vue'),
    meta: {
      resource: 'billetera',
      action: 'read',
      //pageTitle: 'Billetera',
      // breadcrumb: [
      //   {
      //     text: 'Billetera',
      //   },
      //   {
      //     text: 'perfil',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/billetera/ver/',
    name: 'apps-billetera-ver',
    component: () => import('@/views/apps/perfil/billetera/users-view/UsersView.vue'),
    meta: {
      resource: 'billetera',
      action: 'read',
      //pageTitle: 'Billetera',
      // breadcrumb: [
      //   {
      //     text: 'Ver',
      //   },
      //   {
      //     text: 'iD',
      //     active: true,
      //   },
      // ],
    },
  },

  {
    path: '/perfil/public/',
    name: 'apps-public-perfil',
    component: () => import('@/views/pages/profile/ProfilePublic.vue'),
    meta: {
      resource: 'perfil_public',
      action: 'read',
    },
  },
  {
    path: '/billetera/crear',
    name: 'apps-billetera-add',
    component: () => import('@/views/apps/perfil/billetera/users-edit/UsersEdit.vue'),
    meta: {
      resource: 'billetera',
      action: 'read',
      //pageTitle: 'Billetera',
      // breadcrumb: [
      //   {
      //     text: 'Ver',
      //   },
      //   {
      //     text: 'crear',
      //     active: true,
      //   },
      // ],
    },
  },




  {
    path: '/localidades',
    name: 'localidades',
    component: () => import('@/views/apps/localidades/localidades.vue'),
    meta: {
      resource: 'localidades',
      action: 'read',
    },


  },
  {
    path: '/departamentos/:id',
    name: 'localidades-departamentos',
    component: () => import('@/views/apps/localidades/components/DepartamentoList.vue'),
    meta: {
      resource: 'departamentos',
      action: 'read',
    },


  },

  {
    path: '/ciudades/:id',
    name: 'localidades-ciudades',
    component: () => import('@/views/apps/localidades/components/CiudadesList.vue'),
    meta: {
      resource: 'departamentos',
      action: 'read',
    },
  },



  {
    path: '/zonas/:id',
    name: 'localidades-zonas',
    component: () => import('@/views/apps/localidades/components/ZonaList.vue'),
    meta: {
      resource: 'departamentos',
      action: 'read',
    },


  },
  {
    path: '/barrios/:id',
    name: 'localidades-barrios',
    component: () => import('@/views/apps/localidades/components/BarrioList.vue'),
    meta: {
      resource: 'departamentos',
      action: 'read',
    },


  },


  // reles //

  {
    path: '/roles/',
    name: 'apps-role-list',
    component: () => import('@/views/apps/roles/role-list/RoleList.vue'),
    meta: {
      resource: 'permisos',
      action: 'read',
    },
  },

  {
    path: '/roles/permission/:slug',
    name: 'apps-role-permission',
    component: () => import('@/views/apps/roles/components/addPermission.vue'),
  },

  {
    path: '/private/roles',
    name: 'private-permission',
    component: () => import('@/views/apps/private/permission.vue'),
  },
  {
    path: '/roles/crear',
    name: 'apps-role-add',
    component: () => import('@/views/apps/roles/role-add/RoleAdd.vue'),
  },

  {
    path: '/contact/modules',
    name: 'contactos',
    component: () => import('@/views/apps/contactos/contacto.vue'),
    meta: {
      resource: 'contact',
      action: 'read',

    },
  },

  {
    path: '/interested/modules',
    name: 'interested',
    component: () => import('@/views/apps/contactos/interested/interested.vue'),
    meta: {
      resource: 'interested',
      action: 'read',

    },
  },

  // Clientes
  // Referidos //
  {
    path: '/clientes/agregar',
    name: 'apps-cliente-add',
    component: () => import('@/views/apps/clientes/clientes-add/ClientesAdd.vue'),
    meta: {
      resource: 'clientes',
      action: 'read',
      //pageTitle: 'clientes',

    },
  },

  {
    path: '/clientes/editar/:id',
    name: 'apps-cliente-edit',
    component: () => import('@/views/apps/clientes/clientes-edit/ClientesEdit.vue'),
    meta: {
      resource: 'clientes',
      action: 'read',
      //pageTitle: 'clientes',

    },
  },

  {
    path: '/usuarios',
    name: 'apps-usuario-list',
    meta: {
      resource: 'usuarios',
      action: 'read',
    },
    component: () => import('@/views/apps/user/users-list/UsersList.vue'),
  },

  {
    path: '/portales-crendentiales',
    name: 'portales-credentiales',
    component: () => import('@/views/apps/configuracion/portales-credentiales.vue'),
    meta: {
      action: "read",
      resource: "portales-credentiales",
    },
  },


  {
    path: '/configuration',
    meta: {
      resource: "configuration",
      action: 'read',
    },
    name: 'apps-configuration',
    component: () => import('@/views/apps/configuracion/configuracion.vue'),
  },
  {
    path: '/plataformas-digitales',
    name: 'apps-plataform',
    meta: {
      resource: "configuration",
      action: 'read',
    },

    component: () => import('@/views/apps/plataformDigital/plataformDigital.vue'),
  },
  {
    path: '/planes',
    name: 'plan-membership',
    component: () => import('@/views/pages/authentication/components/plansMembership.vue'),
    meta: {
      action: 'read',
      resource: 'configuration',
    },
  },
  {
    path: '/registrar/empresas',
    meta: {
      resource: "configuration",
      action: 'updated',
      pageTitle: 'Empresa',
    },
    name: 'apps-configuration-init',
    component: () => import('@/views/apps/configuracion/configuracionInit.vue'),
  },


  {
    path: '/clientes/',
    name: 'apps-cliente-list',
    component: () => import('@/views/apps/clientes/clientes-list/Clienteslist.vue'),
    meta: {
      resource: 'clientes',
      action: 'read',
      //pageTitle: 'Listado de clientes',

    },
  },
  {
    path: '/clientes-negocios',
    name: 'clientes-negocios',
    component: () => import('@/views/apps/clientes/negocios/embudoNegocios.vue'),
    meta: {
      resource: 'clientes',
      action: 'read',
      //pageTitle: 'Listado de clientes',

    },
  },


  {
    path: '/contactos-portales/',
    name: 'apps-cliente-contact',
    component: () => import('@/views/apps/contactos/portales-contactos.vue'),
    meta: {
      resource: 'clientes',
      action: 'read',
      //pageTitle: 'Listado de clientes',

    },
  },

  {
    path: '/propietarios/',
    name: 'apps-propietarios-list',
    component: () => import('@/views/apps/clientes/clientes-list/propietarios.vue'),
    meta: {
      resource: 'clientes',
      action: 'read',
      //pageTitle: 'Listado de clientes',

    },
  },

  // *===============================================---*
  // *--------- CRM FLM ---------------------------------*
  // *===============================================---*
  {
    path: '/apps/tareas',
    name: 'apps-crm-sidebar',
    component: () => import('@/views/apps/tareas/Todo.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
      resource: 'tareas',
      action: 'read',
    },
  },
  {
    path: '/apps/tareas/:filter',
    name: 'apps-crm-filter',
    component: () => import('@/views/apps/tareas/Todo.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
      navActiveLink: 'apps-todo',
      resource: 'tareas',
      action: 'create',
    },
    beforeEnter(to, _, next) {
      if (['important', 'completed', 'deleted'].includes(to.params.filter)) next()
      else next({ name: 'error-404' })
    },
  },

  // {
  //   path: '/prueba',
  //   name: 'prueba-drop',
  //   component: () => import('@/views/apps/inmuebles/pruebadrapdrop.vue'),
  //   meta: {
  //     resource: 'tareas',
  //     action: 'create',
  //   }
  // },
  // {
  //   path: '/apps/tareas/tag/:tag',
  //   name: 'apps-todo-tag',
  //   component: () => import('@/views/apps/tareas/Todo.vue'),
  //   meta: {
  //     contentRenderer: 'sidebar-left',
  //     contentClass: 'todo-application',
  //     navActiveLink: 'apps-todo',
  //     resource: 'tareas',
  //     action: 'create',
  //   },
  //   beforeEnter(to, _, next) {
  //     if (['team', 'low', 'medium', 'high', 'update'].includes(to.params.tag))
  //       next()
  //     else next({ name: 'error-404' })
  //   },
  // },

  // *===============================================---*
  // *--------- inmuebles FLM-------------------------*
  // *===============================================---*

  {
    path: '/apps/inmuebles/list',
    name: 'listar-inmueble',
    component: () => import('@/views/apps/inmuebles/inmueble-list/InmuebleList.vue'),
    meta: {
      //pageTitle: 'Lista de inmuebles',
      resource: 'inmuebles',
      action: 'read',

    },
  },
  {
    path: '/mls',
    name: 'mls',
    component: () => import('@/views/apps/inmuebles/mls/listMls.vue'),
    meta: {
      //pageTitle: 'Lista de inmuebles',
      resource: 'inmuebles',
      action: 'read',

    },
  },

  {
    path: '/mercadeo',
    name: 'mercadeo',
    component: () => import('@/views/apps/mercadeo/email/list.vue'),
    meta: {
      //pageTitle: 'Lista de mercadeo',
      resource: 'mercadeo',
      action: 'read',

    },
  },

  {
    path: '/mercadeo/email/create',
    name: 'create-email',
    component: () => import('@/views/apps/mercadeo/email/create.vue'),
    meta: {
      //pageTitle: 'Lista de mercadeo',
      resource: 'mercadeo',
      action: 'create',

    },
  },

  {
    path: '/mercadeo/email/list',
    name: 'list-email',
    component: () => import('@/views/apps/mercadeo/email/list.vue'),
    meta: {
      //pageTitle: 'Lista de plantillas',
      resource: 'mercadeo',
      action: 'read',

    },
  },




  {
    path: '/report/agents-properties/:report/:user',
    component: {
        template: '<div></div>',

      },
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: false,
      },
  },

  {
    path: '/inmuebles/ficha/:slug/:code',
    component: {
      template: '<div></div>',

    },
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: false,
    },

  },



  {
    path: '/inmuebles/:slug/:code/:type?',
    name: 'inmuebles-details',
    component: () => import('@/views/apps/public/inmuble-detalle/InmuebleDetalle.vue'),
    meta: {
      //pageTitle: 'Inmuebles detail',
      contentClass: 'ecommerce-application',
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: false,

      // breadcrumb: [
      //   {
      //     text: 'Detalles',
      //   },
      //   {
      //     text: 'Casas',
      //     active: false,
      //   },
      //   {
      //     text: 'Sur',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/informes/propiedad/:linkInforme',
    name: 'informe-property',
    component: () => import('@/views/apps/public/informe-property/informeProperty.vue'),
    meta: {
      //pageTitle: 'Inmuebles detail',
      contentClass: 'ecommerce-application',
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: false,

      // breadcrumb: [
      //   {
      //     text: 'Detalles',
      //   },
      //   {
      //     text: 'Casas',
      //     active: false,
      //   },
      //   {
      //     text: 'Sur',
      //     active: true,
      //   },
      // ],
    },
  },


  {
    path: '/storage/public/inmueble/documentos/:slug',
    name: 'inmuebles-details-ducumento',
    component: () => import('@/views/apps/public/inmuble-detalle/InmuebleDetalle.vue'),
    meta: {
      //pageTitle: 'Inmuebles detail',
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: false,

      // breadcrumb: [
      //   {
      //     text: 'Detalles',
      //   },
      //   {
      //     text: 'Casas',
      //     active: false,
      //   },
      //   {
      //     text: 'Sur',
      //     active: true,
      //   },
      // ],
    },
  },

  {
    path: '/private/inmuebles/:slug',
    name: 'inmuebles-detalles',
    component: () => import('@/views/apps/public/inmuble-detalle/InmuebleDetalle.vue'),
    meta: {
      //pageTitle: 'Inmuebles detalle',
      contentClass: 'ecommerce-application',
      resource: 'inmuebles',
      action: 'read',

      // breadcrumb: [
      //   {
      //     text: 'Detalles',
      //   },
      //   {
      //     text: 'Casas',
      //     active: false,
      //   },
      //   {
      //     text: 'Sur',
      //     active: true,
      //   },
      // ],
    },
  },






]
