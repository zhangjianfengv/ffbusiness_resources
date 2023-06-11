import Vue from 'vue'
import VueRouter from 'vue-router'

import {BootstrapVue} from 'bootstrap-vue'
import './plugins/table.js'

import $ from 'jquery'
import AppHistory from "@/components/AppHistory.vue";
import AppMarketable from "@/components/AppMarketable.vue";
import App from "@/components/App.vue";

window.jQuery = $
window.$ = $

Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.config.productionTip = false
// new Vue({
//     render: h => h(History),
//     methods: {}
// }).$mount('#app')
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    {path: '/', redirect: AppHistory},
    {path: '/history', component: AppHistory},
    {path: '/marketable', component: AppMarketable}
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
    render: h => h(App),
    router
}).$mount('#app')

// 现在，应用已经启动了！

// const app = new Vue({
//     el: '#app',
//     data: {
//         currentRoute: window.location.pathname
//     },
//     computed: {
//         ViewComponent() {
//             const matchingView = routes[this.currentRoute]
//             // return matchingView
//             //     ? require('./components/' + matchingView + '.vue')
//             //     : require('./pages/404.vue')
//             return require('./components/' + matchingView + '.vue')
//         }
//     },
//     render(h) {
//         return h(this.ViewComponent)
//     }
// })
//
// window.addEventListener('popstate', () => {
//     app.currentRoute = window.location.pathname
// })
//


