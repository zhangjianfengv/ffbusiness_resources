import Vue from 'vue'
import {BootstrapVue} from 'bootstrap-vue'
import History from './components/AppHistory.vue'
import './plugins/table.js'
import $ from 'jquery'

window.jQuery = $
window.$ = $

Vue.use(BootstrapVue);
Vue.config.productionTip = false
new Vue({
    render: h => h(History),
    methods: {}
}).$mount('#app')


