import axios from 'axios'
export default {
  state: {
    products: {},
    singleProduct: {}
  },
  getters: {
    allProducts: state => state.products
  },
  mutations: {
    setSingleProduct (state, productObj) {
      state.singleProduct = productObj
    },
    setProducts (state, productsObj) {
      state.products = productsObj
    }
  },
  actions: {
    async getAttributesForProducts ({ commit, state, rootState }, response) {
      const allProducts = {
        count: response.data.count,
        products: response.data.rows
      }
      await Promise.all(allProducts.products.map(async singleProduct => {
        singleProduct.thumbnail = `${rootState.imagesEndpoint}/${singleProduct.thumbnail}`
        // Receiving details of particular product
        let details = await axios.get(`${rootState.endpointAddress}/products/${singleProduct.product_id}/details`)
        details = details.data[0]
        singleProduct.image = `${rootState.imagesEndpoint}/${details.image}`
        singleProduct.image_2 = `${rootState.imagesEndpoint}/${details.image_2}`
        // Receiving attributes for each row
        let attributes = await axios.get(`${rootState.endpointAddress}/attributes/inProduct/${singleProduct.product_id}`)
        attributes = attributes.data
        // Receiving categories for each row
        let categories = await axios.get(`${rootState.endpointAddress}/categories/inProduct/${singleProduct.product_id}`)
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

    async fetchProducts ({ commit, state, dispatch, rootState }, page = 1) {
      commit('setLoadingState', true, { root: true })
      const limit = 15
      const response = await axios.get(rootState.endpointAddress + `/products?page=${page}&limit=${limit}`)
      await dispatch('getAttributesForProducts', response)
        .then(allProducts => {
          commit('setProducts', allProducts)
          commit('setLoadingState', false, { root: true })
        })
    },

    async fetchProductsByDepartment ({ commit, state, dispatch, rootState }, { id, pageNumber }) {
      commit('setLoadingState', true, { root: true })
      const response = await axios.get(`${rootState.endpointAddress}/products/inDepartment/${id}?page=${pageNumber}&limit=15`)
      await dispatch('getAttributesForProducts', response)
        .then(allProducts => {
          commit('setProducts', allProducts)
          commit('setLoadingState', false, { root: true })
        })
    },

    async fetchProductsByCategory ({ commit, state, dispatch, rootState }, { id, pageNumber }) {
      commit('setLoadingState', true, { root: true })
      const response = await axios.get(`${rootState.endpointAddress}/products/inCategory/${id}?page=${pageNumber}&limit=15`)
      await dispatch('getAttributesForProducts', response)
        .then(allProducts => {
          commit('setProducts', allProducts)
          commit('setLoadingState', false, { root: true })
        })
    },

    async fetchProductsByID ({ commit, state, rootState }, productId) {
      const response = await axios.get(`${rootState.endpointAddress}/products/${productId}`)
      let productObj = response.data
      delete productObj.thumbnail
      delete productObj.display
      // Receiving details of particular product
      let details = await axios.get(`${rootState.endpointAddress}/products/${productObj.product_id}/details`)
      details = details.data[0]
      productObj.image = `${rootState.imagesEndpoint}/${details.image}`
      productObj.image_2 = `${rootState.imagesEndpoint}/${details.image_2}`
      // Receiving attributes for each row
      let attributes = await axios.get(`${rootState.endpointAddress}/attributes/inProduct/${productObj.product_id}`)
      attributes = attributes.data
      // Seperating colors and sizes
      // eslint-disable-next-line
      productObj.colors = attributes.filter(attribute => attribute.attribute_name === "Color")
      // eslint-disable-next-line
      productObj.sizes = attributes.filter(attribute => attribute.attribute_name === "Size")
      commit('setSingleProduct', productObj)
    },

    async fetchProductsBySearch ({ commit, state, dispatch, rootState }, searchQuery, page = 1) {
      commit('setLoadingState', true, { root: true })
      const response = await axios.get(`${rootState.endpointAddress}/products/search/?query_string=${searchQuery}&page=${page}&limit=15`)
      await dispatch('getAttributesForProducts', response)
        .then(allProducts => {
          commit('setProducts', allProducts)
          commit('setLoadingState', false, { root: true })
        })
    }
  }
}
