export default [
  {
    header: 'MODULOS REDCRM',
  },
  // {
  //   title: 'Modulo personas',
  //   icon: 'UserIcon',
  //   action: 'read',
  //   resource: 'referidos',
  //   children: [
  //     {
  //       title: 'Lista',
  //       route: 'apps-persona-list',
  //     },
  //     {
  //       title: 'Vista previa',
  //       route: { name: 'apps-persona-preview', params: { id: 3242 } },
  //     },
  //     {
  //       title: 'Editar',
  //       route: { name: 'apps-persona-edit', params: { id: 4934 } },
  //     },
  //     {
  //       title: 'Mas',
  //       route: { name: 'apps-persona-add' },
  //     },
  //   ],
  // },


  {
    title: "Inmuebles",
    icon: "HomeIcon",
    route: "listar-inmueble",
    action: "read",
    resource: "inmuebles",
    tagVariant: "light-warning",
    children: [
      {
        title: "Mis Inmuebles",
        route: "listar-inmueble",
        icon: "EyeIcon",
        action: "read",
        resource: "inmuebles",
      },

      {
        title: "MLS",
        route: "mls",
        icon: "EyeIcon",
        action: "read",
        resource: "inmuebles",
      },

    ],
  },
  {
    title: 'CRM',
    icon: 'UsersIcon',
    route: 'apps-cliente-list',
    action: 'read',
    resource: 'clientes',
    // tag: 1,
    // tagVariant: 'light-success',
    children: [
      {
        title: 'Lista de Clientes',
        route: 'apps-cliente-list',
        action: 'read',
        icon: 'UserPlusIcon',
        resource: 'clientes',
      },
      {
        title: 'Embudo Negocios',
        route: 'clientes-negocios',
        action: 'read',
        icon: 'UserPlusIcon',
        resource: 'clientes',
      },
      {
        title: 'Leads Portales',
        route: 'apps-cliente-contact',
        action: 'read',
        icon: 'UserPlusIcon',
        resource: 'clientes',
      },
      {
        title: 'Lista de Propietarios',
        route: { name: 'apps-propietarios-list' },
        icon: 'UserCheckIcon',
        action: 'read',
        resource: 'clientes',
        // tag: 'Nuevo',
        // tagVariant: 'success',
      },

    ],
  },

  {
    title: "Agentes Elite",
    icon: "AwardIcon",
    route: "inmo-agent",
    action: "read",
    resource: "elite",
    tagVariant: "light-warning",
  },
  {
    title: "Gestión Membresias",
    icon: "UserPlusIcon",
    route: "membership-management",
    action: "read",
    resource: "elite",
    tagVariant: "light-warning",
  },
  {
    title: 'Referidos',
    icon: 'UserPlusIcon',
    route: 'apps-referido-list',
    action: 'read',
    resource: 'referidos',
    children: [
      {
        title: 'Listado referido',
        route: 'apps-referido-list',
        action: 'read',
        resource: 'referidos',
      },
      {
        title: 'Crear referido',
        route: { name: 'apps-referido-add' },
        action: 'create',
        resource: 'referidos',
      },

    ],
  },

  {
    title: 'Mercadeo',
    icon: 'MailIcon',
    route: 'mercadeo',
    action: 'read',
    resource: 'mercadeo',
    children: [
      // {
      //   title: 'Crear plantilla',
      //   route: 'create-email',
      //   icon: 'MailIcon',
      //   action: 'create',
      //   resource: 'mercadeo',
      // },
      {
        title: 'E-Mail Marketing',
        icon: 'SendIcon',
        route: 'email-create',
        action: 'create',
        resource: 'mercadeo',
      },

      {
        title: 'Historial E-mail',
        route: 'programar-email',
        icon: 'InboxIcon',
        action: 'read',
        resource: 'mercadeo',
        // tag: 'new',
        // tagVariant: 'success',
        disabled: false,
      }


    ]
  },



  {
    title: 'Página Web',
    route: 'plantillas',
    action: 'read',
    resource: 'pagina_web',
    icon: 'MonitorIcon',
    children: [
      {
        title: 'Plantillas',
        icon: 'LayoutIcon',
        route: 'plantillas',
        action: 'read',
        resource: 'pagina_web',

      },
      {
        title: 'Banners',
        icon: 'ImageIcon',
        route: 'banners-list',
        action: 'read',
        resource: 'banners',
      },
      {
        title: 'Blog',
        icon: 'FileTextIcon',
        route: 'blogs-list',
        action: 'read',
        resource: 'blogs',
        /*children: [
          {
            title: 'Crear blog',
            icon: 'WifiIcon',
            route: 'blogs',
            action: 'create',
            resource: 'blogs',

          },
          {
            title: 'Listado de Blogs',
            icon: 'WifiIcon',
            route: 'blogs-list',
            action: 'read',
            resource: 'blogs',

          },
        ]*/

      },

      {
        title: 'Contactos',
        icon: 'PhoneIcon',
        route: 'contactos',
        action: 'read',
        resource: 'contact',

      },
      {
        title: 'Interesados',
        icon: 'PhoneIncomingIcon',
        route: 'interested',
        action: 'read',
        resource: 'interested',

      },
      /*{
        title: 'Banners',
        icon: 'MonitorIcon',
        route: 'banners',
        action: 'read',
        resource: 'banners',
        children: [
          {
            title: 'Crear banner',
            icon: 'WifiIcon',
            route: 'banners',
            action: 'read',
            resource: 'banners',

          },

          {
            title: 'Listado de Banners',
            icon: 'WifiIcon',
            route: 'banners-list',
            action: 'read',
            resource: 'banners',

          },
        ]

      },*/
      /*   {
           title: 'Paginas',
           icon: 'FileIcon',
           route: 'paginas',
           action: 'read',
           resource: 'paginas',

         },*/
    ]
  },

  {
    title: "Reportes",
    icon: "TrendingUpIcon",
    tagVariant: "light-warning",
    route: "apps-reportes",
    action: "read",
    resource: "reportes",
    // children: [
    //   {
    //     title: "Datos estadisticos",
    //     icon: "MapPinIcon",
    //     route: "apps-configuration",
    //     tagVariant: "light-warning",
    //     action: "read",
    //     resource: "configuration",
    //   }
    // ]
  },
  {
    title: "Configuracion",
    icon: "SettingsIcon",
    tagVariant: "light-warning",
    route: "apps-configuration",
    action: "read",
    resource: "configuration",
    children: [
      {
        title: "Datos inmobiliaria",
        icon: "MapPinIcon",
        route: "apps-configuration",
        tagVariant: "light-warning",
        action: "read",
        resource: "configuration",
      },

      {
        title: "Portales",
        icon: "ServerIcon",
        route: "portales-credentiales",
        tagVariant: "light-warning",
        action: "read",
        resource: "portales-credentiales",
      },

      {
        title: 'Agentes',
        icon: 'UsersIcon',
        route: 'apps-usuario-list',
        action: 'read',
        resource: 'usuarios',

      },
      {
        title: "Roles y Permisos",
        icon: "UnlockIcon",
        tagVariant: "light-warning",
        route: "apps-role-list",
        action: "read",
        resource: "permisos",

      },

    ]
  },
  {
    title: "Plataformas digitales",
    icon: "ChromeIcon",
    tagVariant: "light-warning",
    action: "read",
    route: "apps-plataform",
    resource: "configuration"
  }

  // CRM



  // {
  //   title: 'Tour',
  //   route: 'extensions-tour',
  //   icon: 'FileTextIcon',
  //   action: 'read',
  //   resource: 'crm',
  // },

  // INMUEBLES

  // {
  //   title: 'Inmuebles',
  //   icon: 'ServerIcon',
  //   route: 'apps-e-commerce-shop',
  //   action: 'read',
  //   resource: 'inmuebles',

  //   children: [
  //     {
  //       title: 'Agregar Inmueble',
  //       route: 'agregar-inmueble',
  //       // action: 'read',
  //       // resource: 'inmuebles',
  //     },
  //     {
  //       title: 'Editar Inmueble',
  //       route: 'editar-inmueble',
  //       // action: 'read',
  //       // resource: 'inmuebles',
  //     },
  //     {
  //       title: 'Filtros',
  //       route: 'apps-e-commerce-shop',
  //       // action: 'read',
  //       // resource: 'inmuebles',
  //     },
  //     {
  //       title: 'Detalles',
  //       route: { name: 'apps-e-commerce-product-details', params: { slug: 'apple-watch-series-5-27' } },
  //       // action: 'read',
  //       // resource: 'inmuebles',
  //     },
  //     {
  //       title: 'Favoritos',
  //       route: 'apps-e-commerce-wishlist',
  //       // action: 'read',
  //       // resource: 'inmuebles',
  //     },
  //     {
  //       title: 'Checkout',
  //       route: 'apps-e-commerce-checkout',
  //     },
  //   ],
  // },

  /*{
    title: 'Chat',
    route: 'apps-chat',
    icon: 'MessageSquareIcon',
  },
  {
    title: 'Todo',
    route: 'apps-todo',
    icon: 'CheckSquareIcon',
  },
  {
    title: 'Calendar',
    route: 'apps-calendar',
    icon: 'CalendarIcon',
  },
  {
    title: 'Invoice',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'List',
        route: 'apps-invoice-list',
      },
      {
        title: 'Preview',
        route: { name: 'apps-invoice-preview', params: { id: 4987 } },
      },
      {
        title: 'Edit',
        route: { name: 'apps-invoice-edit', params: { id: 4987 } },
      },
      {
        title: 'Add',
        route: { name: 'apps-invoice-add' },
      },
    ],
  },
  {
    title: 'eCommerce',
    icon: 'ShoppingCartIcon',
    children: [
      {
        title: 'Shop',
        route: 'apps-e-commerce-shop',
      },
      {
        title: 'Details',
        route: { name: 'apps-e-commerce-product-details', params: { slug: 'apple-watch-series-5-27' } },
      },
      {
        title: 'Wishlist',
        route: 'apps-e-commerce-wishlist',
      },
      {
        title: 'Checkout',
        route: 'apps-e-commerce-checkout',
      },
    ],
  },
  {
    title: 'User',
    icon: 'UserIcon',
    children: [
      {
        title: 'List',
        route: 'apps-users-list',
      },
      {
        title: 'View',
        route: { name: 'apps-users-view', params: { id: 21 } },
      },
      {
        title: 'Edit',
        route: { name: 'apps-users-edit', params: { id: 21 } },
      },
    ],
  },
  {
    title: 'Pages',
    icon: 'FileIcon',
    children: [
      {
        title: 'Authentication',
        icon: 'CircleIcon',
        children: [
          {
            title: 'Login v1',
            route: 'auth-login-v1',
            target: '_blank',
          },
          {
            title: 'Login v2',
            route: 'auth-login-v2',
            target: '_blank',
          },
          {
            title: 'Register v1',
            route: 'auth-register-v1',
            target: '_blank',
          },
          {
            title: 'Register v2',
            route: 'auth-register-v2',
            target: '_blank',
          },
          {
            title: 'Forgot Password v1',
            route: 'auth-forgot-password-v1',
            target: '_blank',
          },
          {
            title: 'Forgot Password v2',
            route: 'auth-forgot-password-v2',
            target: '_blank',
          },
          {
            title: 'Reset Password v1',
            route: 'auth-reset-password-v1',
            target: '_blank',
          },
          {
            title: 'Reset Password v2',
            route: 'auth-reset-password-v2',
            target: '_blank',
          },
        ],
      },
      {
        title: 'Account Settings',
        route: 'pages-account-setting',
      },
      {
        title: 'Profile',
        route: 'pages-profile',
      },
      {
        title: 'Faq',
        route: 'pages-faq',
      },
      {
        title: 'Knowledge Base',
        route: 'pages-knowledge-base',
      },
      {
        title: 'Pricing',
        route: 'pages-pricing',
      },
      {
        title: 'Blog',
        children: [
          {
            title: 'List',
            route: 'pages-blog-list',
          },
          {
            title: 'Detail',
            route: { name: 'pages-blog-detail', params: { id: 1 } },
          },
          {
            title: 'Edit',
            route: { name: 'pages-blog-edit', params: { id: 1 } },
          },
        ],
      },
      {
        title: 'Mail Templates',
        children: [
          {
            title: 'Welcome',
            href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-welcome.html',
          },
          {
            title: 'Reset Password',
            href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-reset-password.html',
          },
          {
            title: 'Verify Email',
            href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-verify-email.html',
          },
          {
            title: 'Deactivate Account',
            href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-deactivate-account.html',
          },
          {
            title: 'Invoice',
            href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-invoice.html',
          },
          {
            title: 'Promotional',
            href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-promotional.html',
          },
        ],
      },
      {
        title: 'Miscellaneous',
        icon: 'CircleIcon',
        children: [
          {
            title: 'Coming Soon',
            route: 'misc-coming-soon',
            target: '_blank',
          },
          {
            title: 'Not Authorized',
            route: 'misc-not-authorized',
            target: '_blank',
          },
          {
            title: 'Under Maintenance',
            route: 'misc-under-maintenance',
            target: '_blank',
          },
          {
            title: 'Error',
            route: 'misc-error',
            target: '_blank',
          },
        ],
      },
    ],
  },*/
]
