export default [
  {
    path: '/pagina-web',
    name: 'plantillas',
    meta: {
      resource: 'pagina_web',
      action: 'read',
    },
    component: () => import('@/views/templates/templates'),

  },
]

