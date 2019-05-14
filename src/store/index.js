/* eslint-disable camelcase */
/* eslint-disable no-undef */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)
Vue.use(VueCookies)

export default new Vuex.Store({
  state: {
    accessToken: $cookies.get('accessToken') || null,
    userDetails: {},
    loadingState: false,
    cartId: localStorage.getItem('cartId'),
    shoppingCartItems: [],
    shoppingCartItemsImages: [],
    endpointAddress: `https://backendapi.turing.com`,
    products: {},
    reviews: {},
    singleProduct: {},
    categories: {},
    departments: {},
    imagesEndpoint: `https://backendapi.turing.com/images/products`,
    shippingRegions: [],
    shippingCosts: [],
    orderId: parseInt($cookies.get('orderId')) || null,
    amountAfterShipping: sessionStorage.getItem('amountToBePaid') || null,
    stripeResponse: {}
  },
  getters: {
    getShoppingCartItems: state => state.shoppingCartItems,
    getCartId: state => state.cartId,
    getLoadingState: state => state.loadingState,
    allProducts: state => state.products,
    allDepartments: state => state.departments,
    allCategories: state => state.categories,
    allReviews: state => state.reviews,
    allShippingRegions: state => state.shippingRegions,
    getUserDetails: state => state.userDetails,

    // Computations
    cartTotalAmount: state => {
      let total = state.shoppingCartItems.reduce((acc, item) => acc + parseFloat(item.subtotal), 0)
      return parseFloat(Math.round(total * 100) / 100).toFixed(2)
    },
    isLoggedIn: state => state.accessToken !== null,
    fetchFirstName: state => Object.keys(state.userDetails).length > 0 ? state.userDetails.name.split(' ')[0] : ''
  },
  actions: {
    // Common functions
    async getAttributesForProducts ({ commit, state }, response) {
      const allProducts = {
        count: response.data.count,
        products: response.data.rows
      }
      await Promise.all(allProducts.products.map(async singleProduct => {
        singleProduct.thumbnail = `${state.imagesEndpoint}/${singleProduct.thumbnail}`
        // Receiving details of particular product
        let details = await axios.get(`${state.endpointAddress}/products/${singleProduct.product_id}/details`)
        details = details.data[0]
        singleProduct.image = `${state.imagesEndpoint}/${details.image}`
        singleProduct.image_2 = `${state.imagesEndpoint}/${details.image_2}`
        // Receiving attributes for each row
        let attributes = await axios.get(`${state.endpointAddress}/attributes/inProduct/${singleProduct.product_id}`)
        attributes = attributes.data
        // Receiving categories for each row
        let categories = await axios.get(`${state.endpointAddress}/categories/inProduct/${singleProduct.product_id}`)
        categories = categories.data
        // Seperating colors and sizes
        // eslint-disable-next-line
        singleProduct.colors = attributes.filter(attribute => attribute.attribute_name === "Color")
        // eslint-disable-next-line
        singleProduct.sizes = attributes.filter(attribute => attribute.attribute_name === "Size")
        singleProduct.category = categories[0]
      }))
      return allProducts
    },

    logOut ({ commit, dispatch }) {
      console.log('Called')
      $cookies.remove('accessToken')
      $cookies.remove('orderId')
      localStorage.removeItem('cartId')
      commit('setShoppingCartItems', [])
      commit('setAccessToken', null)
      dispatch('fetchCartId')
    },

    cancelPayment () {
      $cookies.remove('orderId')
    },

    clearData ({ commit }) {
      sessionStorage.removeItem('amountToBePaid')
      commit('setAmountAfterShipping', null)
      sessionStorage.removeItem('shippingCostId')
      commit('setShoppingCartItems', [])
      if ($cookies.isKey('orderId')) {
        $cookies.remove('orderId')
      }
      commit('setOrderId', null)
    },

    // All GET Methods
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

    async fetchCartId ({ commit, state }) {
      const response = await axios.get(`${state.endpointAddress}/shoppingCart/generateUniqueId`)
      console.log(response)
      commit('setCartId', response.data.cart_id)
    },

    async fetchProductsOnCart ({ commit, state }) {
      const response = await axios.get(`${state.endpointAddress}/shoppingcart/${state.cartId}`)
      response.data[0].forEach(item => commit('addCartItemImage', { itemId: item.item_id, itemImage: item.image }))
      commit('setShoppingCartItems', response.data[0])
    },

    async fetchProducts ({ commit, state, dispatch }, page = 1) {
      commit('setLoadingState', true)
      const limit = 15
      const response = await axios.get(state.endpointAddress + `/products?page=${page}&limit=${limit}`)
      await dispatch('getAttributesForProducts', response)
        .then(allProducts => {
          commit('setProducts', allProducts)
          commit('setLoadingState', false)
        })
    },

    async fetchProductsByDepartment ({ commit, state, dispatch }, departmentId) {
      commit('setLoadingState', true)
      const response = await axios.get(`${state.endpointAddress}/products/inDepartment/${departmentId}?limit=15`)
      await dispatch('getAttributesForProducts', response)
        .then(allProducts => {
          commit('setProducts', allProducts)
          commit('setLoadingState', false)
        })
    },

    async fetchProductsByCategory ({ commit, state, dispatch }, categoryId) {
      commit('setLoadingState', true)
      const response = await axios.get(`${state.endpointAddress}/products/inCategory/${categoryId}?limit=15`)
      await dispatch('getAttributesForProducts', response)
        .then(allProducts => {
          commit('setProducts', allProducts)
          commit('setLoadingState', false)
        })
    },

    async fetchProductsByID ({ commit, state }, productId) {
      const response = await axios.get(`${state.endpointAddress}/products/${productId}`)
      let productObj = response.data
      delete productObj.thumbnail
      delete productObj.display
      // Receiving details of particular product
      let details = await axios.get(`${state.endpointAddress}/products/${productObj.product_id}/details`)
      details = details.data[0]
      productObj.image = `${state.imagesEndpoint}/${details.image}`
      productObj.image_2 = `${state.imagesEndpoint}/${details.image_2}`
      // Receiving attributes for each row
      let attributes = await axios.get(`${state.endpointAddress}/attributes/inProduct/${productObj.product_id}`)
      attributes = attributes.data
      // Seperating colors and sizes
      // eslint-disable-next-line
      productObj.colors = attributes.filter(attribute => attribute.attribute_name === "Color")
      // eslint-disable-next-line
      productObj.sizes = attributes.filter(attribute => attribute.attribute_name === "Size")
      commit('setSingleProduct', productObj)
    },

    async fetchReviewsByProductID ({ commit, state }, productId) {
      const response = await axios.get(`${state.endpointAddress}/products/${productId}/reviews`)
      let reviews = response.data.filter(review => review.rating <= 5 && review.rating > 0)
      window.reviews = reviews
      commit('setReviews', reviews)
    },

    async fetchProductsBySearch ({ commit, state, dispatch }, searchQuery, page = 1) {
      commit('setLoadingState', true)
      const response = await axios.get(`${state.endpointAddress}/products/search/?query_string=${searchQuery}&page=${page}&limit=15`)
      await dispatch('getAttributesForProducts', response)
        .then(allProducts => {
          commit('setProducts', allProducts)
          commit('setLoadingState', false)
        })
    },

    async fetchDepartments ({ commit, state }) {
      const response = await axios.get(`${state.endpointAddress}/departments`)
      commit('setDepartments', response.data)
    },

    async fetchCategories ({ state, commit }) {
      const response = await axios.get(`${state.endpointAddress}/categories`)
      commit('setCategories', response.data.rows)
    },

    async fetchUserDetails ({ state, commit }) {
      const response = await axios({
        method: 'GET',
        headers: { 'user-key': $cookies.get('accessToken') },
        url: `${state.endpointAddress}/customer`
      })
      commit('setUserDetails', { ...response.data })
    },

    async fetchShippingRegions ({ state, commit }) {
      const response = await axios.get(`${state.endpointAddress}/shipping/regions`)
      commit('setShippingRegions', response.data)
    },

    async fetchShippingCosts ({ state, commit }) {
      const response = await axios.get(`${state.endpointAddress}/shipping/regions/${state.userDetails.shipping_region_id}`)
      commit('setShippingCosts', response.data)
    },

    // POST RELATED ACTIONS
    async addAndReceiveOrderId ({ state, commit }, orderObj) {
      const response = await axios({
        method: 'POST',
        data: orderObj,
        headers: { 'user-key': state.accessToken || $cookies.get('accessToken') },
        url: `${state.endpointAddress}/orders`
      })
      $cookies.set('orderId', response.data.orderId)
      commit('setOrderId', response.data.orderId)
    },

    async addReview ({ state, commit, dispatch }, { product_id, review, rating }) {
      let date = Date.now()
      let reviewObject = { created_on: date, review, rating, name: state.userDetails.name }
      commit('addNewReview', { ...reviewObject })
      await axios({
        method: 'POST',
        data: { product_id, review, rating },
        headers: { 'user-key': $cookies.get('accessToken') },
        url: `${state.endpointAddress}/products/${product_id}/reviews`
      })
    },

    async addItemToCart ({ state, commit }, cartObj) {
      // cartObject contains {cartId, productId, attributes}
      commit('setLoadingState', true)
      const response = await axios.post(`${state.endpointAddress}/shoppingcart/add`, cartObj)
      response.data.forEach(item => commit('addCartItemImage', { itemId: item.item_id, itemImage: item.image }))
      commit('setShoppingCartItems', response.data)
      commit('setLoadingState', false)
      let itemIds = response.data.map(item => item.item_id)
      return itemIds[itemIds.length - 1]
    },

    async addItemsToCart ({ state, commit, dispatch }, { cartObj, cartQuantity }) {
      commit('setLoadingState', true)
      const receivedItemId = await dispatch('addItemToCart', { ...cartObj })
      await dispatch('updateCartItemQuantity', { item_id: receivedItemId, quantity: cartQuantity })
      commit('setLoadingState', false)
    },

    async signInUser ({ state, commit, dispatch }, { email, password }) {
      let response = await axios.post(`${state.endpointAddress}/customers/login`, { email, password })
      $cookies.set('accessToken', response.data.accessToken, response.data.expires_in)
      if (!state.cartId) {
        dispatch('fetchCartId')
      }
      localStorage.setItem('cartId', state.cartId)
      commit('setAccessToken', response.data.accessToken)
      await dispatch('fetchUserDetails')
    },

    async registerUser ({ state, commit }, { name, email, password }) {
      const response = await axios.post(`${state.endpointAddress}/customers`, { name, email, password })
      console.log(response.data)
      $cookies.set('accessToken', response.data.accessToken, response.data.expires_in)
      commit('setAccessToken', response.data.accessToken)
      commit('setUserDetails', { ...response.data.customer })
    },

    async signInWithFacebook ({ state, commit }, accessToken) {
      const response = await axios.post(`${state.endpointAddress}/customers/facebook`, { access_token: accessToken })
      console.log(response)
    },

    async recieveChargeFromServer ({ state, commit }, chargeObj) {
      console.log('Entered')
      commit('setLoadingState', true)
      const response = await axios.post(`${state.endpointAddress}/stripe/charge`, chargeObj)
      commit('setLoadingState', false)
      commit('setStripeResponse', { ...response.data })
      return response.data
    },

    // DELETE RELATED ACTIONS
    async removeShoppingCartItem ({ state, commit }, cartItemId) {
      await axios.delete(`${state.endpointAddress}/shoppingCart/removeProduct/${cartItemId}`)
      commit('deleteShoppingCartItem', cartItemId)
    },

    // PUT RELATED ACTIONS
    // eslint-disable-next-line
    async updateCartItemQuantity ({ state, commit }, { item_id, quantity }) {
      // eslint-disable-next-line
      let response = await axios.put(`${state.endpointAddress}/shoppingCart/update/${item_id}`, { item_id, quantity })
      response.data.forEach(item => {
        item.image = state.shoppingCartItemsImages.find(image => item.item_id === image.itemId).itemImage
      })
      commit('setShoppingCartItems', response.data)
    },

    async updateUserCredentials ({ state, commit, dispatch }, userObj) {
      commit('setLoadingState', true)
      const response = await axios({
        method: 'PUT',
        data: userObj,
        headers: { 'user-key': $cookies.get('accessToken') },
        url: `${state.endpointAddress}/customer`
      })
      console.log(response)
      dispatch('logOut')
      commit('setLoadingState', false)
    },

    async updateUserAddress ({ state, commit }, { address_1, city, country, postal_code, region, shipping_region_id }) {
      commit('setLoadingState', true)
      const response = await axios({
        method: 'PUT',
        data: { address_1, city, country, postal_code, region, shipping_region_id },
        headers: { 'user-key': $cookies.get('accessToken') },
        url: `${state.endpointAddress}/customers/address`
      })
      console.log(response)
      commit('setUserDetails', { ...response.data.customer })
      commit('setLoadingState', false)
    }
  },
  mutations: {
    addNewReview (state, reviewObj) {
      Vue.set(state.reviews, state.reviews.length, reviewObj)
    },
    setStripeResponse (state, stripeObj) {
      state.stripeResponse = stripeObj
    },
    setAmountAfterShipping (state, amount) {
      state.amountAfterShipping = amount
    },
    setOrderId (state, orderId) {
      state.orderId = orderId
    },
    setShippingRegions (state, shippingRegions) {
      state.shippingRegions = shippingRegions
    },
    addCartItemImage (state, cartItemIdObj) {
      state.shoppingCartItemsImages.push(cartItemIdObj)
    },
    setShippingCosts (state, shippingCosts) {
      state.shippingCosts = shippingCosts
    },
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
    },
    setUserDetails (state, userObj) {
      state.userDetails = userObj
    },
    setCartId (state, cartId) {
      state.cartId = cartId
    },
    setShoppingCartItems (state, cartItems) {
      state.shoppingCartItems = cartItems
    },
    setReviews (state, reviewsObj) {
      state.reviews = reviewsObj
    },
    setSingleProduct (state, productObj) {
      state.singleProduct = productObj
    },
    setLoadingState (state, booleanValue) {
      state.loadingState = booleanValue
    },
    setProducts (state, productsObj) {
      state.products = productsObj
    },
    setCategories (state, categories) {
      state.categories = categories
    },
    setDepartments (state, departments) {
      state.departments = departments
    },
    deleteShoppingCartItem (state, shoppingCartItemId) {
      state.shoppingCartItems = state.shoppingCartItems.filter(item => item.item_id !== shoppingCartItemId)
    }
  }
})
