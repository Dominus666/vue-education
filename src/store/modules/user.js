import * as fb from 'firebase'

export default {
  state: {
    user: null,
    favoritesPosts: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    FAVORITES_POSTS(state, payload) {
      state.favoritesPosts = payload
    }
  },
  actions: {
    async registerUser({commit}, payload) {
      commit('setLoading', true)
      const registerUser = payload
      const user = await fb.auth().createUserWithEmailAndPassword(registerUser.email, registerUser.password)
      const uid = user.user.uid
      registerUser.uid = uid
      registerUser.likePosts = []
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
    async addLikePost({commit}, payload) {
      commit('setLoading', true)
      const likePost = payload.id;
      const postVal = await fb.database().ref('users').child(`${payload.uid}/likePosts`).once('value');
      const likePosts = postVal.val();

      if(likePosts !== null) {
        const checkLikes =  Object.values(likePosts).find(key => {
          return key === likePost
        })
        if(checkLikes === undefined) {
          await fb.database().ref('users').child(`${payload.uid}/likePosts`).push(likePost)
        }
      }else {
        await fb.database().ref('users').child(`${payload.uid}/likePosts`).push(likePost)
      }
      
      commit('setLoading', false)
    },
    async fetchLikedPosts ({commit}) {
      commit('setLoading', true)
      const currentUser = this.state.user.user.uid
      const resultLikedPost = []
      const idLikedPost = await fb.database().ref(`users/${currentUser}/likePosts`).once('value')
      await Object.values(idLikedPost.val()).forEach( async (key)  => {
        const currentPosts = await fb.database().ref(`posts/${key}`).once('value')
        resultLikedPost.push(currentPosts.val())
      })
      commit('FAVORITES_POSTS', resultLikedPost)
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
    },
    favoritesPosts (state) {
      return state.favoritesPosts
    }
  }
}
    