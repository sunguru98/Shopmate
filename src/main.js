import imgToSvg from '@/assets/js/imgToSvg.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

window.Event = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log(to, from)
  document.title = to.meta.title
  next()
})
