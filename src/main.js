import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import History from './components/AppHistory.vue'
import './plugins/table.js'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
    render: h => h(History),
}).$mount('#app')
