import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

// Importar archivos CSS Bootstrap y BootstrapVue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import anime from 'animejs'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

// Usar Bootstrap e Icons en el proyecto
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(anime)