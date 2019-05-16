import axios from 'axios'
import VueCookies from 'vue-cookies'
export default {
  state: {
    orderId: parseInt(VueCookies.get('orderId')) || null,
    stripeTokenId: sessionStorage.getItem('stripeTokenId') || null,
    amountAfterShipping: sessionStorage.getItem('amountToBePaid') || null,
    stripeResponse: null
  },
  getters: {
    getStripeResponse: state => state.stripeResponse
  },
  actions: {
    cancelPayment (context) {
      VueCookies.remove('orderId')
      context.commit('setOrderId', null)
    },

    async fetchStripeToken ({ commit }, { cardObj, stripeInstance }) {
      const { token, error } = await stripeInstance.createToken(cardObj)
      if (error) {
        // Inform the customer that there was an error.
        const errorElement = document.getElementById('card-errors')
        errorElement.textContent = error.message
      } else {
        sessionStorage.setItem('stripeTokenId', token.id)
        commit('setStripeTokenId', token.id)
      }
    },

    // POST RELATED ACTIONS
    async addAndReceiveOrderId ({ commit, rootState }, orderObj) {
      const response = await axios({
        method: 'POST',
        data: orderObj,
        headers: { 'user-key': rootState.accessToken || VueCookies.get('accessToken') },
        url: `${rootState.endpointAddress}/orders`
      })
      VueCookies.set('orderId', response.data.orderId)
      commit('setOrderId', response.data.orderId)
    },

    async receiveChargeFromServer ({ state, commit, rootState }) {
      commit('setLoadingState', true)
      let date = Date.now()
      let chargeObj = {
        stripeToken: state.stripeTokenId,
        order_id: state.orderId,
        descripton: `Purchased items at ${date} for ${state.amountAfterShipping}`,
        amount: parseInt(state.amountAfterShipping.replace('.', ''))
      }
      const response = await axios.post(`${rootState.endpointAddress}/stripe/charge`, chargeObj)
      commit('setStripeResponse', { ...response.data })
      commit('setLoadingState', false)
    }
  },
  mutations: {
    setStripeResponse (state, stripeObj) {
      state.stripeResponse = stripeObj
    },
    setStripeTokenId (state, tokenId) {
      state.stripeTokenId = tokenId
    },
    setAmountAfterShipping (state, amount) {
      state.amountAfterShipping = amount
    },
    setOrderId (state, orderId) {
      state.orderId = orderId
    }
  }
}
