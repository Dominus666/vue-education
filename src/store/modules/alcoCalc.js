import * as fb from 'firebase'

export default {
  state: {
    alcoGraphics: []
  },
  mutations: {
    ALCO_USER(state, payload) {
      state.alcoGraphics = payload
    }
  },
  actions: {
    async alcoUser ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const alcoUserDate = { [payload.date] : payload.alco}
        await fb.database().ref('users').child(`${payload.uid}/alcoholsUser`).update(alcoUserDate)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchAlcoUser ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const currentUser = this.state.user.user.uid
        const allAlcoUser = await fb.database().ref(`users/${currentUser}/alcoholsUser`).once('value')
        const resultAlcoUser = []
        if(allAlcoUser.val() !== null) {
          Object.keys(allAlcoUser.val()).forEach((key)  => {
            resultAlcoUser.push({
              date: key,
              alcohol: allAlcoUser.val()[key]
            })
          })
        }      
        commit('ALCO_USER', resultAlcoUser)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
      
    }
  },
  getters: {
    
  }
}
    