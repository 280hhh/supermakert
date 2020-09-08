import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入全局样式
import './assets/global.css'

import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://106.13.54.46:8081'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')