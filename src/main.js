import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(VueCookies)

window.Event = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
