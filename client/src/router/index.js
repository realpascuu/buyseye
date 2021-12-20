import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /*vista login */ '../views/Login.vue'),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../components/Register.vue'),
        meta: {
            title: 'Registro'
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/',
        redirect: () => {
            if (localStorage.getItem('token') != null) {
                return '/home'
            }
            return '/login'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// poner título a la página
const DEFAULT_TITLE = 'Buyseye'
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
    if (localStorage.getItem('token') != null) {
        var decoded = jwt_decode(localStorage.getItem('token'))
        if (moment().unix() > decoded.exp) {
            console.log('¡Se borra token porque se ha expirado!')
            localStorage.removeItem('token');
            router.push('/');
        }
    }
});

export default router