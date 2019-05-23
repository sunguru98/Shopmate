/* eslint-disable camelcase */
import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  state: {
    accessToken: VueCookies.get('accessToken') || null,
    userDetails: {}
  },
  getters: {
    getUserDetails: state => state.userDetails,
    isLoggedIn: state => state.accessToken !== null,
    hasAddress: state => state.userDetails.address_1 !== null && state.userDetails.city !== null && state.userDetails.country !== null,
    fetchFirstName: state => {
      if (Object.keys(state.userDetails).length > 0) {
        return state.userDetails.name.split(' ').length > 0 ? state.userDetails.name.split(' ')[0] : state.userDetails.name
      }
      return ''
    }
  },
  mutations: {
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
    },
    setUserDetails (state, userObj) {
      state.userDetails = userObj
    }
  },
  actions: {
    logOut ({ commit, dispatch, rootState }, response) {
      VueCookies.remove('accessToken')
      VueCookies.remove('orderId')
      if (!response) {
        localStorage.removeItem('cartId')
        dispatch('fetchCartId')
        dispatch('emptyShoppingCart')
      }
      commit('setAccessToken', null)
      commit('setUserDetails', {})
    },

    async signInUser ({ commit, dispatch, rootState }, { email, password }) {
      let response = await axios.post(`${rootState.endpointAddress}/customers/login`, { email, password })
      VueCookies.set('accessToken', response.data.accessToken, response.data.expires_in)
      commit('setAccessToken', response.data.accessToken)
      await dispatch('fetchUserDetails')
    },

    async fetchUserDetails ({ state, commit, rootState }) {
      const response = await axios({
        method: 'GET',
        headers: { 'user-key': VueCookies.get('accessToken') },
        url: `${rootState.endpointAddress}/customer`
      })
      commit('setUserDetails', { ...response.data })
    },

    async registerUser ({ commit, dispatch, rootState }, { name, email, password }) {
      const response = await axios.post(`${rootState.endpointAddress}/customers`, { name, email, password })
      if (!rootState.cart.cartId) {
        await dispatch('fetchCartId')
      }
      localStorage.setItem('cartId', rootState.cart.cartId)
      VueCookies.set('accessToken', response.data.accessToken, response.data.expires_in)
      commit('setAccessToken', response.data.accessToken)
      commit('setUserDetails', { ...response.data.customer })
    },

    async updateUserCredentials ({ state, commit, dispatch, rootState }, userObj) {
      commit('setLoadingState', true)
      await axios({
        method: 'PUT',
        data: userObj,
        headers: { 'user-key': VueCookies.get('accessToken') },
        url: `${rootState.endpointAddress}/customer`
      })
      dispatch('logOut')
      commit('setLoadingState', false)
    },

    async updateUserAddress ({ state, commit, rootState }, { address_1, city, country, postal_code, region, shipping_region_id }) {
      commit('setLoadingState', true)
      const response = await axios({
        method: 'PUT',
        data: { address_1, city, country, postal_code, region, shipping_region_id },
        headers: { 'user-key': VueCookies.get('accessToken') },
        url: `${rootState.endpointAddress}/customers/address`
      })
      commit('setUserDetails', { ...response.data })
      commit('setLoadingState', false)
    }
  }
}
