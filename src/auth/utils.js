import {
    ROLES_ADMIN,
    ROLES_AGENTE,
    ROLES_EMPRESA,
    ROLES_VISITANTE,
    ROLES_INMOBILIARIA,
  } from "@/libs/config/config.js";


  export const isUserLoggedIn = () => {
    return localStorage.getItem('userData')
  }

  export const getUserData = () => JSON.parse(localStorage.getItem('userData'))


  export const getHomeRouteForLoggedInUser = userRole => {
    console.log(userRole)
    switch(userRole){
      case ROLES_EMPRESA:
        return { name: 'dashboard-agente' };
        break;
      case ROLES_AGENTE:
        return { name: 'dashboard-agente' };
        break;
      case ROLES_ADMIN:
        return { name: 'dashboard-agente' };
        break;
      case ROLES_VISITANTE:
        return { name: 'perfil-editar' };
        break;
      case ROLES_INMOBILIARIA:
        return { name: 'dashboard-agente' };
        break;
      default:
        return { name: 'apps-public-perfil' }
    }
   /* if (userRole == ROLES_EMPRESA) return
    if (userRole == ROLES_AGENTE) return
    if (userRole == ROLES_ADMIN) return
    if (userRole == ROLES_VISITANTE) return
    if (userRole === ROLES_SOCIO_REFERIDOR) return
    if (userRole != ROLES_SOCIO_REFERIDOR) return { name: 'apps-public-perfil' }
    return { name: 'auth-login' }*/
  }
