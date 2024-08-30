export default [
  {
    title: "Escritorio",
    icon: "PieChartIcon",
    tagVariant: "light-warning",
    route: "dashboard-agente",
    action: "read",
    resource: "dashboard_agente",
  },
  {
    title: "Super Admin",
    icon: "LockIcon",
    action: "read",
    resource: "private",
    children: [
      {
        title: "Roles & Permisos",
        icon: "LockIcon",
        tagVariant: "light-warning",
        route: "private-permission",
        action: "read",
        resource: "private",
      },
      {
        title: "Portales",
        icon: "HomeIcon",
        route: "portales",
        tagVariant: "light-warning",
        action: "read",
        resource: "private",
      },

      {
        title: "Mercadeo",
        icon: "HomeIcon",
        route: "mercadeo-admin",
        tagVariant: "light-warning",
        action: "read",
        resource: "private",
      },

      {
        title: "Inmobiliarias",
        icon: "HomeIcon",
        route: "inmobiliaria",
        tagVariant: "light-warning",
        action: "read",
        resource: "private",
      },

      {
        title: "Localidades",
        icon: "MapPinIcon",
        route: "localidades",
        tagVariant: "light-warning",
        action: "read",
        resource: "private",
      },

      {
        title: "Inmuebles",
        icon: "Edit2Icon",
        action: "read",
        resource: "private",
        children: [
          {
            title: "Tipos de inmueble",
            icon: "MapPinIcon",
            route: "apps-opciones-add",
            action: "read",
            resource: "private",
          },
          {
            title: "Caracteristicas inmueble",
            icon: "MapPinIcon",
            route: "inmuebles-features",
            action: "read",
            resource: "private",
          }
        ]
      },
      {
        title: "Credenciales",
        icon: "Edit2Icon",
        route: "credenciales",
        tagVariant: "light-warning",
        action: "read",
        resource: "credenciales",
      },
      {
        title: "Templates",
        icon: "Edit2Icon",
        route: "template",
        tagVariant: "light-warning",
        action: "read",
        resource: "template",
        children: [
          {
            title: 'Crear Template',
            icon: 'WifiIcon',
            route: 'template',
            action: 'read',
            resource: 'template',

          },

          {
            title: 'Listado de Templates',
            icon: 'WifiIcon',
            route: 'template-list',
            action: 'read',
            resource: 'template',

          },
        ]
      },

      {
        title: "Perfiles",
        icon: "UsersIcon",
        route: "perfiles",
        tagVariant: "light-warning",
        action: "read",
        resource: "perfiles",
        children: [
          {
            title: 'Crear perfiles',
            icon: 'WifiIcon',
            route: 'perfiles',
            action: 'read',
            resource: 'perfiles',

          },

          {
            title: 'Listado de perfiles',
            icon: 'WifiIcon',
            route: 'perfiles-list',
            action: 'read',
            resource: 'perfiles',

          },
        ]
      },



    ]
  },

  {
    title: "Inicio",
    icon: "BookIcon",
    tagVariant: "light-warning",
    action: "read",
    resource: "home",
    children: [

      {
        title: "Dashboard Referido",
        icon: "HomeIcon",
        tagVariant: "light-warning",
        route: "inicio-home",
        action: "read",
        resource: "dashboard_referido",

      },
      {
        title: "Socio referidor",
        icon: "UserIcon",
        tagVariant: "light-warning",
        route: "pages-profile",
        action: "read",
        resource: "perfil_referido",

      },


    ]
  },
  {
    title: "Mi Perfil",
    icon: "UserIcon",
    tagVariant: "light-warning",
    route: "pages-profile-agente",
    action: "read",
    resource: "perfil_agente",
  },

  {
    title: 'Tareas',
    route: 'apps-todo',
    icon: 'ListIcon',
    action: 'read',
    resource: 'tareas',
  },
  {
    title: 'Agenda',
    route: 'apps-calendar',
    icon: 'CalendarIcon',
    action: "read",
    resource: "agendas",
  },





  // {
  //   title: "Inmubles",
  //   route: "apps-public-inmueble-list",
  //   icon: "HomeIcon",
  // },

  //Billetera

  // {
  //   title: "Billetera",
  //   icon: "CreditCardIcon",
  //   tagVariant: "light-warning",
  //   route: "apps-billetera-add",

  //   children: [
  //     {
  //       title: 'eCommerce',

  //     },
  //     {
  //       title: 'Analytics',
  //       route: 'dashboard-analytics',
  //     },
  //   ],
  // },

  // {
  //   title: 'Billetera',
  //   icon: 'HomeIcon',
  //   tagVariant: 'light-warning',
  //   route: 'apps-billetera',
  //   action: 'read',
  //   resource: 'billetera',
  // }
  // {
  //   title: "Dashboards",
  //   icon: "SettingsIcon",

  //   tagVariant: "light-warning",
  //   action: "read",
  //   resource: "admin",
  //   children: [
  //     {
  //       title: "Inmuebles",
  //       route: "listar-inmueble",
  //       action: "read",
  //       icon: "HomeIcon",
  //       resource: "inmuebles",
  //       tagVariant: "light-warning",
  //       children: [
  //         {
  //           title: "Listado inmuebles",
  //           route: "listar-inmueble",
  //           icon: "EyeIcon",
  //           action: "read",
  //           resource: "inmuebles",
  //         },
  //         {
  //           title: "Agregar inmuebles",
  //           route: "agregar-inmueble",
  //           icon: "SettingsIcon",
  //           action: "create",
  //           resource: "inmuebles",
  //         },
  //         // {
  //         //   title: 'Editar Inmueble',
  //         //   route: 'editar-inmueble',
  //         //   icon: "SettingsIcon",
  //         //   action: 'update',
  //         //   resource: 'inmuebles',
  //         // },
  //       ],
  //     },
  //     // {
  //     //   title: "Empresas",
  //     //   route: "apps-empresa-list",
  //     //   action: "read",
  //     //   resource: "empresas",
  //     //   tag: "2",
  //     //   tagVariant: "light-warning",
  //     //   children: [
  //     //     {
  //     //       title: "Listado",
  //     //       route: "apps-empresa-list",
  //     //       action: "read",
  //     //       resource: "empresas",
  //     //     },
  //     //     {
  //     //       title: "Crear",
  //     //       route: "apps-empresa-add",
  //     //       action: "read",
  //     //       resource: "empresas",
  //     //     },
  //     //   ],
  //     // },

  //     // {
  //     //   title: "Modulos",
  //     //   route: "apps-modulo-list",
  //     //   tag: "2",
  //     //   tagVariant: "light-warning",
  //     //   children: [
  //     //     {
  //     //       title: "Listado",
  //     //       route: "apps-modulo-list",
  //     //     },
  //     //     {
  //     //       title: "Crear",
  //     //       route: "apps-modulo-add",
  //     //     },
  //     //   ],
  //     // },
  //     // {
  //     //   title: "Roles",
  //     //   route: "apps-role-list",
  //     //   action: "read",
  //     //   resource: "roles",
  //     //   tag: "2",
  //     //   tagVariant: "light-warning",
  //     //   children: [
  //     //     {
  //     //       title: "Listado",
  //     //       route: "apps-role-list",
  //     //       action: "read",
  //     //       resource: "roles",
  //     //     },
  //     //     {
  //     //       title: "Crear",
  //     //       route: "apps-role-add",
  //     //       action: "read",
  //     //       resource: "roles",
  //     //     },
  //     //   ],
  //     // },
  //     // {
  //     //   title: "Usuarios",
  //     //   route: "apps-users-list",
  //     //   tag: "2",
  //     //   tagVariant: "light-warning",
  //     //   children: [
  //     //     {
  //     //       title: "Listado",
  //     //       route: "apps-users-list",
  //     //     },
  //     //     {
  //     //       title: "Crear usuario",
  //     //       route: "apps-users-add",
  //     //     },
  //     //   ],
  //     // },
  //     // {
  //     //   title: "Preguntas",
  //     //   route: "apps-pregunta-list",
  //     //   action: "read",
  //     //   resource: "preguntas",
  //     //   tag: "2",
  //     //   tagVariant: "light-warning",
  //     //   children: [
  //     //     {
  //     //       title: "Listado",
  //     //       route: "apps-pregunta-list",
  //     //     },
  //     //   ],
  //     // },
  //   ],
  // },
];
