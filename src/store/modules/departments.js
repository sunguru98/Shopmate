import axios from 'axios'
export default {
  state: {
    departments: {}
  },
  getters: {
    allDepartments: state => state.departments
  },
  mutations: {
    setDepartments (state, departments) {
      state.departments = departments
    }
  },
  actions: {
    async fetchDepartments ({ commit, state, rootState }) {
      const response = await axios.get(`${rootState.endpointAddress}/departments`)
      commit('setDepartments', response.data)
    }
  }
}
