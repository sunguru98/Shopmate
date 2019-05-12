import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Home from '@/pages/PageHome.vue'
import Authorize from '@/pages/PageAuthorize.vue'
import ProductDetail from '@/pages/PageProductDetail.vue'
import Delivery from '@/pages/PageDelivery.vue'
import Confirmation from '@/pages/PageConfirmation.vue'
import Payment from '@/pages/PagePayment.vue'
import Success from '@/pages/PageSuccess.vue'
import Failure from '@/pages/PageFailure.vue'
import Logout from '@/components/LogoutComponent.vue'
import Profile from '@/pages/PageProfile.vue'

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
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        title: 'Shopmate - Profile',
        requiresAuth: true
      }
    },
    {
      path: '/checkout/delivery',
      name: 'Delivery',
      component: Delivery,
      meta: {
        title: 'Shopmate - Delivery',
        requiresAuth: true
      }
    },
    {
      path: '/checkout/confirmation',
      name: 'Confirmation',
      component: Confirmation,
      meta: {
        title: 'Shopmate - Confirmation',
        requiresAuth: true
      }
    },
    {
      path: '/checkout/paymentinfo',
      name: 'Payment',
      component: Payment,
      meta: {
        title: 'Shopmate - Payment',
        requiresAuth: true
      }
    },
    {
      path: '/checkout/success',
      name: 'Success',
      component: Success,
      meta: {
        title: 'Shopmate - Success',
        requiresAuth: true
      }
    },
    {
      path: '/checkout/failure',
      name: 'Failure',
      component: Failure,
      meta: {
        title: 'Shopmate - Failure',
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
    } else {
      next({ name: 'Signin' })
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
