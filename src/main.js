import Vue from 'vue'
import {BootstrapVue} from 'bootstrap-vue'
import './plugins/table.js'
import routes from './routes'

import $ from 'jquery'

window.jQuery = $
window.$ = $

Vue.use(BootstrapVue);
Vue.config.productionTip = false
// new Vue({
//     render: h => h(History),
//     methods: {}
// }).$mount('#app')

const app = new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent() {
            const matchingView = routes[this.currentRoute]
            // return matchingView
            //     ? require('./components/' + matchingView + '.vue')
            //     : require('./pages/404.vue')
            return require('./components/' + matchingView + '.vue')
        }
    },
    render(h) {
        return h(this.ViewComponent)
    }
})

window.addEventListener('popstate', () => {
    app.currentRoute = window.location.pathname
})



