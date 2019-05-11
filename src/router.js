import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Home from '@/pages/PageHome.vue'
import Authorize from '@/pages/PageAuthorize.vue'
import ProductDetail from '@/pages/PageProductDetail.vue'
import Logout from '@/components/LogoutComponent.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Shopmate - Home'
      }
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      meta: {
        title: 'Shopmate - Detail'
      },
      props: true
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Authorize,
      meta: {
        title: 'Shopmate - Signin',
        requiresVisitor: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Authorize,
      meta: {
        title: 'Shopmate - Register',
        requiresVisitor: true
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to, from)
  document.title = to.meta.title
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
    } else {
      next({ name: 'Signin', query: { redirectTo: to.path } })
      document.title = 'Shopmate - Signin'
    }
  } else if (to.matched.some(route => route.meta.requiresVisitor)) {
    if (!store.getters.isLoggedIn) {
      next()
    } else {
      next({ name: 'Home' })
      document.title = 'Shopmate - Home'
    }
  } else {
    next()
  }
})
export default router
