import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Home from '@/pages/PageHome.vue'
import Authorize from '@/pages/PageAuthorize.vue'
import ProductDetail from '@/pages/PageProductDetail.vue'
import Delivery from '@/pages/PageDelivery.vue'
import Confirmation from '@/pages/PageConfirmation.vue'
import Payment from '@/pages/PagePayment.vue'
import Finish from '@/pages/PageFinal.vue'
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
        requiresAuth: true,
        requiresUserDetails: true,
        redirectPageAfterReachingPayment: true
      }
    },
    {
      path: '/checkout/confirmation',
      name: 'Confirmation',
      component: Confirmation,
      meta: {
        title: 'Shopmate - Confirmation',
        requiresAuth: true,
        redirectPageAfterReachingPayment: true,
        requiresUserDetails: true
      }
    },
    {
      path: '/checkout/payment',
      name: 'Payment',
      component: Payment,
      meta: {
        title: 'Shopmate - Payment',
        requiresUserDetails: true,
        requiresOrderId: true,
        requiresAuth: true
      }
    },
    {
      path: '/checkout/finish',
      name: 'Finish',
      component: Finish,
      meta: {
        title: 'Shopmate - Finish',
        requiresAuth: true,
        requiresTokenId: true,
        requiresStripeResponse: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(from, to)
  document.title = to.meta.title
  // Login related guards
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      // If order id is generated then we shouldnt go back, since it causes errors
      if (to.matched.some(route => route.meta.redirectPageAfterReachingPayment)) {
        !store.state.payment.orderId ? next() : next({ name: 'Payment' })
      } else if (to.matched.some(route => route.meta.requiresOrderId)) {
        !store.state.payment.orderId ? next({ name: 'Home' }) : next()
      } else {
        next()
      }
      // The payment page must only show if the order id is generated
      if (to.matched.some(route => route.meta.requiresOrderId)) {
        console.log('Entering Payment guard')
        if (!store.state.payment.orderId) {
          console.log('No order Id')
          next({ name: 'Home' })
        } else {
          next()
        }
      } else {
        next()
      }
      // If the user doesnt fill out the details then reminding him to update the address
      if (to.matched.some(route => route.meta.requiresUserDetails)) {
        console.log('Has Address', store.getters.hasAddress)
        if (!store.getters.hasAddress) {
          console.log('User details are not filled')
          next({ name: 'Profile' })
        } else {
          next()
        }
      } else {
        next()
      }
      // The final page must only show if the stripe token is present
      if (to.matched.some(route => route.meta.requiresTokenId)) {
        console.log('Entering stripe route guard', to.matched.some(route => route.meta.requiresTokenId))
        if (!store.state.payment.stripeTokenId) {
          console.log('No stripe token Id')
          next({ name: 'Home' })
        } else {
          next()
        }
      } else {
        next()
      }
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
