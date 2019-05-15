import axios from 'axios'
export default {
  state: {
    shippingRegions: [],
    shippingCosts: []
  },
  getters: {
    allShippingRegions: state => state.shippingRegions
  },
  actions: {
    async fetchShippingRegions ({ state, commit, rootState }) {
      const response = await axios.get(`${rootState.endpointAddress}/shipping/regions`)
      commit('setShippingRegions', response.data)
    },

    async fetchShippingCosts ({ state, commit, rootState }) {
      const response = await axios.get(`${rootState.endpointAddress}/shipping/regions/${state.userDetails.shipping_region_id}`)
      commit('setShippingCosts', response.data)
    }
  },
  mutations: {
    setShippingRegions (state, shippingRegions) {
      state.shippingRegions = shippingRegions
    },
    setShippingCosts (state, shippingCosts) {
      state.shippingCosts = shippingCosts
    }
  }
}
