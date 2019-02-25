export default {
  state: {
    alcohols: [
      
    ]
  },
  mutations: {
    addAlco(state, payload) {
      state.alcohols.push(payload)
    }
  },
  actions: {
    addAlco ({commit}, payload) {
      commit('addAlco', payload)
    }
  },
  getters: {
    alco(state) {
      return state.alcohols
    }
  }
}
    