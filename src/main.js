import Vue from 'vue'
import VueRouter from 'vue-router'

import {BootstrapVue} from 'bootstrap-vue'
import "bootstrap-icons/font/bootstrap-icons.css";
import './plugins/table.js'
import './plugins/selectpicker'
import $ from 'jquery'
import AppHistory from "@/components/AppHistory.vue";
import AppMarketable from "@/components/AppMarketable.vue";
import App from "@/components/App.vue";
import AppItem from "@/components/AppItem.vue";
import VueCookies from 'vue-cookies'
import AppCurrent from "@/components/AppCurrent.vue";
import AppMy from "@/components/AppMy.vue";
import About from "@/components/About.vue";

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueCookies)
window.jQuery = $
Vue.config.errorHandler = function (err, vm, info) {
    console.log(err);
    console.log(info);
}

Vue.config.productionTip = false
const routes = [
    {path: '/', component: AppHistory},
    {path: '/history/', component: AppHistory},
    {path: '/marketable/', component: AppMarketable},
    {path: '/current/', name: 'AppCurrent', component: AppCurrent},
    {path: '/my/', name: 'AppMy', component: AppMy},
    {path: '/about/', name: 'AppMy', component: About},
    {path: '/item/', component: AppItem}
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')

