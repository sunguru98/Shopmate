import axios from 'axios'
export default {
  state: {
    categories: {}
  },
  getters: {
    allCategories: state => state.categories,
    filteredCategories: state => id => state.categories.filter(category => category.department_id === id)
  },
  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    }
  },
  actions: {
    async fetchCategories ({ state, commit, rootState }) {
      const response = await axios.get(`${rootState.endpointAddress}/categories`)
      commit('setCategories', response.data.rows)
    }
  }
}
