/* eslint-disable camelcase */
/* eslint-disable no-undef */
import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
// All modules
import auth from './modules/auth'
import cart from './modules/cart'
import categories from './modules/categories'
import departments from './modules/departments'
import payment from './modules/payment'
import products from './modules/products'
import reviews from './modules/reviews'
import shipping from './modules/shipping'

Vue.use(Vuex)
Vue.use(VueCookies)

export default new Vuex.Store({
  modules: { auth, cart, categories, departments, payment, products, reviews, shipping },
  state: {
    loadingState: false,
    endpointAddress: `https://backendapi.turing.com`,
    imagesEndpoint: `https://backendapi.turing.com/images/products`
  },
  getters: {
    getLoadingState: state => state.loadingState
  },
  actions: {
    clearData ({ commit }) {
      sessionStorage.removeItem('stripeTokenId')
      sessionStorage.removeItem('amountToBePaid')
      commit('setAmountAfterShipping', null)
      sessionStorage.removeItem('shippingCostId')
      commit('setShoppingCartItems', [])
      if ($cookies.isKey('orderId')) {
        $cookies.remove('orderId')
      }
      commit('setOrderId', null)
    }
  },
  mutations: {
    setLoadingState (state, booleanValue) {
      state.loadingState = booleanValue
    }
  }
})
