import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import Message from 'element-ui'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/index.css'

import formatDate from './utils/formatDate'
import formatNumber from './utils/formatNumber'
import formatTime from './utils/formatTime'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.use(Element)

Vue.filter('formatDate', formatDate)
Vue.filter('formatNumber', formatNumber)
Vue.filter('formatTime', formatTime)

axios.defaults.baseURL = 'http://localhost:3000';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
