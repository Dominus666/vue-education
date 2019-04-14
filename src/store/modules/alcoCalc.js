import * as fb from 'firebase'

export default {
  state: {
    alcoGraphics: [],
    allUsers: [],
    currentAlcoUser: null
  },
  mutations: {
    ALCO_USER(state, payload) {
      state.alcoGraphics = payload
    },
    FETCH_ALL_USER(state, payload) {
      state.allUsers = payload
    },
    COMPARE_USER_ALCO(state, payload) {
      state.currentAlcoUser = payload
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
        Object.keys(allAlcoUser.val()).forEach((key)  => {
          resultAlcoUser.push({
            date: key,
            alcohol: allAlcoUser.val()[key]
          })
        })   
        commit('ALCO_USER', resultAlcoUser)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
      
    },
    async fetchUsers({commit}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const allUsers = await fb.database().ref(`users`).once('value')
        
        const fetchAllUsers = []
        Object.keys(allUsers.val()).forEach((key) => {
          fetchAllUsers.push(allUsers.val()[key].email)
        })
        commit('FETCH_ALL_USER', fetchAllUsers)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async currentAlcoUser({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const allUsers = await fb.database().ref(`users`).once('value')
        let currentAlcoUser = {}
        Object.keys(allUsers.val()).forEach((key) => {
          if(allUsers.val()[key].email === payload) {
              currentAlcoUser = allUsers.val()[key].alcoholsUser
              if(currentAlcoUser === undefined) {
                currentAlcoUser = {}
              }
          }
        })
        commit('COMPARE_USER_ALCO', currentAlcoUser)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    alcoGraphics (state) {
      return state.alcoGraphics
    },
    allUsers (state) {
      return state.allUsers
    },
    currentAlcoUser (state) {
      return state.currentAlcoUser
    }
  }
}
    