// import Vue, {createApp} from '@vue/compat';
// import BootstrapVue from 'bootstrap-vue'
//
// import App from './App.vue'
// import './plugins/table.js'
//
// Vue.use(BootstrapVue);
// let app = createApp(App);
// app.config.productionTip = false
// app.mount('#app');
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

Vue.use(BootstrapVue)

import './plugins/table.js'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
