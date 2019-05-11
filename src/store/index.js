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
    cartId: $cookies.get('cartId') || null,
    shoppingCartItems: [],
    shoppingCartItemsImages: [],
    endpointAddress: `https://backendapi.turing.com`,
    products: {},
    reviews: {},
    singleProduct: {},
    categories: {},
    departments: {},
    imagesEndpoint: `https://backendapi.turing.com/images/products`
  },
  getters: {
    getShoppingCartItems: state => state.shoppingCartItems,
    getCartId: state => state.cartId,
    getLoadingState: state => state.loadingState,
    allProducts: state => state.products,
    allDepartments: state => state.departments,
    allCategories: state => state.categories,
    allReviews: state => state.reviews,
    // Computations
    cartTotalAmount: state => {
      let total = state.shoppingCartItems.reduce((acc, item) => acc + parseFloat(item.subtotal), 0)
      return parseFloat(Math.round(total * 100) / 100).toFixed(2)
    },
    isLoggedIn: state => state.accessToken !== null,
    fetchFirstName: state => Object.keys(state.userDetails).length > 0 ? state.userDetails.name.split(' ')[0] : ''
  },
  actions: {
    // Common function
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

    logOut ({ commit }) {
      $cookies.remove('accessToken')
      commit('setAccessToken', null)
    },

    // All GET Methods
    async fetchCartId ({ commit, state }) {
      const response = await axios.get(`${state.endpointAddress}/shoppingCart/generateUniqueId`)
      $cookies.set('cartId', response.data.cart_id, '30min')
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

    // POST RELATED ACTIONS
    async postReview ({ state, commit, dispatch }) {
    },

    async addItemToCart ({ state, commit }, cartObj) {
      // cartObject contains {cartId, productId, attributes}
      commit('setLoadingState', true)
      const response = await axios.post(`${state.endpointAddress}/shoppingcart/add`, cartObj)
      response.data.forEach(item => commit('addCartItemImage', { itemId: item.item_id, itemImage: item.image }))
      commit('setShoppingCartItems', response.data)
      commit('setLoadingState', false)
      return response.data.map(item => item.item_id)
    },

    async addItemsToCart ({ state, commit, dispatch }, { cartObj, cartQuantity }) {
      commit('setLoadingState', true)
      const receivedItemId = await dispatch('addItemToCart', { ...cartObj })
      await dispatch('updateCartItemQuantity', { item_id: receivedItemId, quantity: cartQuantity })
      commit('setLoadingState', false)
    },

    async signInUser ({ state, commit }, { email, password }) {
      const response = await axios.post(`${state.endpointAddress}/customers/login`, { email, password })
      console.log(response.data)
      $cookies.set('accessToken', response.data.accessToken, response.data.expires_in)
      commit('setAccessToken', response.data.accessToken)
      commit('setUserDetails', { ...response.data.customer })
    },

    async registerUser ({ state, commit }, { name, email, password }) {
      const response = await axios.post(`${state.endpointAddress}/customers`, { name, email, password })
      console.log(response.data)
      $cookies.set('accessToken', response.data.accessToken, response.data.expires_in)
      commit('setAccessToken', response.data.accessToken)
      commit('setUserDetails', { ...response.data.customer })
    },

    // DELETE RELATED ACTIONS
    async removeShoppingCartItem ({ state, commit }, cartItemId) {
      console.log(cartItemId)
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
    }
  },
  mutations: {
    addCartItemImage (state, cartItemIdObj) {
      state.shoppingCartItemsImages.push(cartItemIdObj)
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
