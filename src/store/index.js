import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingState: false,
    endpointAddress: `https://backendapi.turing.com`,
    products: {},
    categories: {},
    departments: {},
    imagesEndpoint: `https://backendapi.turing.com/images/products`
  },
  getters: {
    getLoadingState: state => state.loadingState,
    allProducts: state => state.products,
    allDepartments: state => state.departments,
    allCategories: state => state.categories
  },
  actions: {
    async fetchProducts ({ commit, state, dispatch }, page = 1) {
      commit('setLoadingState', true)
      const limit = 15
      const response = await axios.get(state.endpointAddress + `/products?page=${page}&limit=${limit}`)
      const allProducts = {
        count: response.data.count,
        products: response.data.rows
      }
      await dispatch('getAttributesForProducts', allProducts)
      commit('setProducts', allProducts)
      commit('setLoadingState', false)
    },
    async fetchDepartments ({ commit, state }) {
      const response = await axios.get(`${state.endpointAddress}/departments`)
      commit('setDepartments', response.data)
    },
    async fetchCategories ({ state, commit }) {
      const response = await axios.get(`${state.endpointAddress}/categories`)
      commit('setCategories', response.data.rows)
    },

    // Common function
    getAttributesForProducts ({ commit, state }, allProducts) {
      return Promise.all(allProducts.products.map(async singleProduct => {
        singleProduct.thumbnail = `${state.imagesEndpoint}/${singleProduct.thumbnail}`
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
    }
  },
  mutations: {
    setLoadingState (state, booleanValue) {
      state.loadingState = booleanValue
    },
    setProducts (state, productsObj) {
      console.log(productsObj)
      state.products = productsObj
    },
    setCategories (state, categories) {
      state.categories = categories
    },
    setDepartments (state, departments) {
      state.departments = departments
    }
  }
})
