import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import {
    ROLES_ADMIN,
    ROLES_AGENTE,
    ROLES_EMPRESA,
    ROLES_VISITANTE,
    ROLES_INMOBILIARIA
} from "@/libs/config/config.js";
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import apps from './routes/apps'
import dashboard from './routes/dashboard'
import uiElements from './routes/ui-elements/index'
import pages from './routes/pages'
import chartsMaps from './routes/charts-maps'
import formsTable from './routes/forms-tables'
import others from './routes/others'



Vue.use(VueRouter)

let route = "";
let user = localStorage.getItem("userData");
if (localStorage.getItem("userData") != null) {
    user = JSON.parse(user);
    switch (user.role.slug) {
        case ROLES_EMPRESA:
            route = "dashboard-agente"
            break;
        case ROLES_AGENTE:
            route = "dashboard-agente"
            break;
        case ROLES_VISITANTE:
            route = "perfil-editar"
            break;
        case ROLES_ADMIN:
            route = "inmobiliaria"
            break;
        case ROLES_INMOBILIARIA:
            route = "dashboard-agente"
            break;
        default:
            route = "apps-public-perfil"
    }
}
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            redirect: { name: route }
        },
        ...apps,
        ...dashboard,
        ...pages,
        ...chartsMaps,
        ...formsTable,
        ...uiElements,
        ...others,
        {
            path: '*',
            redirect: (user && user.role.slug == ROLES_VISITANTE) ? { name: route } : 'error-404',
        },
    ],
})
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none'
    }
})

router.beforeEach((to, _, next) => {
    const isLoggedIn = isUserLoggedIn()

    if (!canNavigate(to)) {
        // Redirect to login if not logged in
        if (!isLoggedIn)
            return next({ name: 'login' });
        // If logged in => not authorized
        return next({ name: 'misc-not-authorized' });
    }

    // Redirect if logged in
    if (to.meta.redirectIfLoggedIn && isLoggedIn) {
        const userData = getUserData()
        next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
    }

    return next()
});

export default router
