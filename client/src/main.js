import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPLugin } from 'bootstrap-vue'

// Importar archivos CSS Bootstrap y BootstrapVue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

// Usar Bootstrap e Icons en el proyecto
Vue.use(BootstrapVue)
Vue.use(IconsPLugin)