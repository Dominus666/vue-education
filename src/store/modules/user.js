import * as fb from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser({commit}, payload) {
      commit('setLoading', true)
      const registerUser = payload
      const user = await fb.auth().createUserWithEmailAndPassword(registerUser.email, registerUser.password)
      const uid = user.user.uid
      registerUser.uid = uid
      await fb.database().ref(`users/${registerUser.uid}/`).set(payload)
      commit('setUser', {registerUser})
      commit('setLoading', false)
    },

    async loginUser({commit}, payload) {
      commit('setLoading', true)
      const loginUser = payload
      const user = await fb.auth().signInWithEmailAndPassword(loginUser.email, loginUser.password)
      const uid = user.user.uid
      loginUser.uid = uid
      const currentUser = await fb.database().ref(`users/${uid}`).once('value')
      if(currentUser.val().admin != undefined) {
        loginUser.admin = currentUser.val().admin
      }else {
        loginUser.admin = false
      }
      commit('setUser', {loginUser})
      commit('setLoading', false)
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', payload)
    },
    logoutUser ({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
    