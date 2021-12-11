import Vue from 'vue'
import VueRouter from 'vue-router'

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
        redirect: '/login'
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
});

export default router