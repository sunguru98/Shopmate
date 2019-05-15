/* eslint-disable camelcase */
import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
export default {
  state: {
    reviews: {}
  },
  getters: {
    allReviews: state => state.reviews
  },
  mutations: {
    addNewReview (state, reviewObj) {
      Vue.set(state.reviews, state.reviews.length, reviewObj)
    },
    setReviews (state, reviewsObj) {
      state.reviews = reviewsObj
    }
  },
  actions: {
    async fetchReviewsByProductID ({ commit, rootState }, productId) {
      const response = await axios.get(`${rootState.endpointAddress}/products/${productId}/reviews`)
      let reviews = response.data.filter(review => review.rating <= 5 && review.rating > 0)
      commit('setReviews', reviews)
    },
    async addReview ({ state, commit, rootState }, { product_id, review, rating }) {
      let date = Date.now()
      let reviewObject = { created_on: date, review, rating, name: rootState.auth.userDetails.name }
      commit('addNewReview', { ...reviewObject })
      await axios({
        method: 'POST',
        data: { product_id, review, rating },
        headers: { 'user-key': VueCookies.get('accessToken') },
        url: `${rootState.endpointAddress}/products/${product_id}/reviews`
      })
    }
  }
}
