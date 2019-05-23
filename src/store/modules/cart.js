import axios from 'axios'
export default {
  state: {
    cartId: localStorage.getItem('cartId') || null,
    shoppingCartItems: [],
    shoppingCartItemsImages: []
  },
  getters: {
    getShoppingCartItems: state => state.shoppingCartItems,
    getCartId: state => state.cartId,
    cartTotalAmount: state => {
      let total = state.shoppingCartItems.reduce((acc, item) => acc + parseFloat(item.subtotal), 0)
      return parseFloat(Math.round(total * 100) / 100).toFixed(2)
    }
  },
  mutations: {
    addCartItemImage (state, cartItemIdObj) {
      state.shoppingCartItemsImages.push(cartItemIdObj)
    },
    setCartId (state, cartId) {
      state.cartId = cartId
    },
    setShoppingCartItems (state, cartItems) {
      state.shoppingCartItems = cartItems
    },
    deleteShoppingCartItem (state, shoppingCartItemId) {
      state.shoppingCartItems = state.shoppingCartItems.filter(item => item.item_id !== shoppingCartItemId)
    }
  },
  actions: {
    async fetchCartId ({ commit, state, rootState }) {
      const response = await axios.get(`${rootState.endpointAddress}/shoppingCart/generateUniqueId`)
      commit('setCartId', response.data.cart_id)
      localStorage.setItem('cartId', response.data.cart_id)
      return response.data.cart_id
    },

    async fetchProductsOnCart ({ commit, state, rootState }) {
      const response = await axios.get(`${rootState.endpointAddress}/shoppingcart/${state.cartId}`)
      response.data.forEach(item => {
        commit('addCartItemImage', { itemId: item.item_id, itemImage: item.image })
      })
      commit('setShoppingCartItems', response.data)
    },

    async addItemToCart ({ state, commit, rootState }, cartObj) {
      // cartObject contains {cartId, productId, attributes}
      commit('setLoadingState', true)
      const response = await axios.post(`${rootState.endpointAddress}/shoppingcart/add`, cartObj)
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

    // eslint-disable-next-line camelcase
    async updateCartItemQuantity ({ state, commit, rootState }, { item_id, quantity }) {
      // eslint-disable-next-line
      let response = await axios.put(`${rootState.endpointAddress}/shoppingcart/update/${item_id}`, { item_id, quantity })
      response.data.forEach(item => {
        item.image = state.shoppingCartItemsImages.find(image => item.item_id === image.itemId).itemImage
      })
      commit('setShoppingCartItems', response.data)
    },

    async removeShoppingCartItem ({ state, commit, rootState }, cartItemId) {
      await axios.delete(`${rootState.endpointAddress}/shoppingcart/removeProduct/${cartItemId}`)
      commit('deleteShoppingCartItem', cartItemId)
    },

    async emptyShoppingCart ({ commit, rootState }, cartId) {
      commit('setLoadingState', true)
      const response = await axios.delete(`${rootState.endpointAddress}/shoppingcart/empty/${cartId}`)
      commit('setShoppingCartItems', response.data)
      commit('setLoadingState', false)
    }
  }
}
