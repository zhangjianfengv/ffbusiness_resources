import Vue from 'vue'
import VueRouter from 'vue-router'

import {BootstrapVue} from 'bootstrap-vue'
import './plugins/table.js'

import $ from 'jquery'
import AppHistory from "@/components/AppHistory.vue";
import AppMarketable from "@/components/AppMarketable.vue";
import App from "@/components/App.vue";
import AppItem from "@/components/AppItem.vue";

window.jQuery = $
window.$ = $

Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.config.productionTip = false
const routes = [
    // {path: '/', redirect: AppHistory},
    {path: '/', component: AppHistory},
    {path: '/history/', component: AppHistory},
    {path: '/marketable/', component: AppMarketable},
    {path: '/item/', component: AppItem}
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')

