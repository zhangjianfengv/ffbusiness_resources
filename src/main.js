import './plugins/table.js'
import {createApp} from 'vue'
import App from './App.vue'

let app = createApp(App);
app.config.productionTip = false
app.mount('#app')
