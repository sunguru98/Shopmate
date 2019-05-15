import axios from 'axios'
import VueCookies from 'vue-cookies'
export default {
  state: {
    orderId: parseInt(VueCookies.get('orderId')) || null,
    amountAfterShipping: sessionStorage.getItem('amountToBePaid') || null,
    stripeResponse: null
  },
  getters: {
  },
  actions: {
    cancelPayment () {
      VueCookies.remove('orderId')
    },

    async fetchStripeToken ({ commit, state, dispatch }, { cardObj, stripeInstance }) {
      const { token, error } = await stripeInstance.createToken(cardObj)
      if (error) {
        // Inform the customer that there was an error.
        const errorElement = document.getElementById('card-errors')
        errorElement.textContent = error.message
      } else {
        let date = Date.now()
        let chargeObj = {
          stripeToken: token.id,
          order_id: state.orderId,
          descripton: `Purchased items at ${date} for ${state.amountAfterShipping}`,
          amount: parseInt(state.amountAfterShipping.replace('.', ''))
        }
        dispatch('recieveChargeFromServer', { ...chargeObj })
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

    async recieveChargeFromServer ({ state, commit, rootState }, chargeObj) {
      console.log('Entered')
      commit('setLoadingState', true)
      const response = await axios.post(`${rootState.endpointAddress}/stripe/charge`, chargeObj)
      commit('setStripeResponse', { ...response.data })
      commit('setLoadingState', false)
      return response.data
    }
  },
  mutations: {
    setStripeResponse (state, stripeObj) {
      state.stripeResponse = stripeObj
    },
    setAmountAfterShipping (state, amount) {
      state.amountAfterShipping = amount
    },
    setOrderId (state, orderId) {
      state.orderId = orderId
    }
  }
}
