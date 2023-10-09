import Vue from 'vue'
import Vuex from 'vuex'

// Modules
//import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import inmuebleStoreModule from "@/views/apps/public/inmuebleStoreModule";
import templateStoreModule from "@/views/templates/templateStoreModule";

import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import userData from './user-data'
import dashboardData from './dashboard-data'
import appLocalidades from './app-localidades'
import appConfiguracion from "./app-configuration";
import appDocumentos from './app-documentos';
import clienteStoreModule from '@/views/apps/clientes/clienteStoreModule';
import userStoreModule from '@/views/apps/user/userStoreModule';
import MercadeoStoreModule from '@/views/apps/mercadeo/MercadeoStoreModule';
import DashboardStoreModule from '@/views/apps/dashboard/DashboardStoreModule';
import todoStoreModule from '@/views/apps/tareas/todoStoreModule';
import calendarStoreModule from '@/views/apps/calendar/calendarStoreModule';
import roleStoreModule from '@/views/apps/roles/roleStoreModule';
import InmuebleStoreModule from '@/views/apps/inmuebles/InmuebleStoreModule';
import FeatureStoreModule from '@/views/apps/inmuebles/FeaturesStoreModule.js'
import inmobiliariaStoreModule from '@/views/apps/inmobiliarias/inmobiliariaStoreModule';
import portalesStoreModule from '@/views/apps/portales/portalesStoreModule';
import contactStoreModule from '@/views/apps/contactos/contactStoreModule';
import mercadeoAdminStoreModule from '@/views/admin/mercadeo/mercadeoAdminStoreModule';
import authStoreModule from '@/views/pages/authentication/authStoreModule';
import appTemplate from '@/views/templates/templateStoreModule';
import appPerfil from "@/views/apps/perfil/perfilStoreModule";
import appEmpresas from "./app-empresas/empresaStoreModule";
import appInformes from "./app-informes"
import appTransactions from "./app-transactions"
import appPayment from "./app-payment"
import agentStoreModule from '@/views/admin/agentes/agentStoreModule';
import InterestedStoreModule from '@/views/apps/contactos/interested/InterestedStoreModule';
import appBanck from './app-banck';


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    "appTransactions":appTransactions,
    "appBancks": appBanck,

    "appPayment":appPayment,
    'appAgents': agentStoreModule,
    "appCalendar": calendarStoreModule,
    'appCalendario': calendarStoreModule,
    "appContact": contactStoreModule,
    "appMercadeoAdmin": mercadeoAdminStoreModule,
    "authModule": authStoreModule,
    'apiInmueblePrivate': InmuebleStoreModule,
    'featureStoreModule':FeatureStoreModule,
    'appCliente': clienteStoreModule,
    'appInmobiliaria': inmobiliariaStoreModule,
    'appInmueble': inmuebleStoreModule,
    'appMercadeo': MercadeoStoreModule,
    'appPortales': portalesStoreModule,
    'appRole': roleStoreModule,
    'appTareas': todoStoreModule,
    'appUser': userStoreModule,
    'banners':templateStoreModule,
    'interested' : InterestedStoreModule,
    // 'appDashboard': DashboardStoreModule,
    appEmpresas,
    appInformes,
    app,
    appConfig,
    appConfiguracion,
    appDocumentos,
    appLocalidades,
    appPerfil,
    appTemplate,
    dashboardData,
    userData,
    verticalMenu,
  },
  strict: process.env.DEV,
})
