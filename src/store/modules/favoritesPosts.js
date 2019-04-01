import * as fb from 'firebase'

export default {
  state: {
    favoritesPosts: []
  },
  mutations: {
    FAVORITES_POSTS(state, payload) {
      state.favoritesPosts = (payload)
    }
  },
  actions: {
    async addFavoritePost({commit}, payload) {
        commit('clearError')
        commit('setLoading', true)
        try {
          const favoritePost = payload.id;
          const currentDate = new Date().toString();
          const favoritePostDate = { [favoritePost] : currentDate}
          await fb.database().ref('users').child(`${payload.uid}/favoritesPosts`).update(favoritePostDate)
          commit('setLoading', false)
        } catch (error) {
          commit('setLoading', false)
          commit('setError', error.message)
          throw error
        }
        
    },
    async fetchFavoritesPosts ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const currentUser = this.state.user.user.uid
        const resultFavoritePost = []
        const idFavoritePost = await fb.database().ref(`users/${currentUser}/favoritesPosts`).once('value')
        if(idFavoritePost.val() !== null) {
          await Object.keys(idFavoritePost.val()).forEach( async (key)  => {
            const currentFavoritesPosts = await fb.database().ref(`posts/${key}`).once('value')
            resultFavoritePost.push({
              ...currentFavoritesPosts.val(),
              id: key
            })
          })
        }
        commit('FAVORITES_POSTS', resultFavoritePost)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
      
    }
  },
  getters: {
    favoritesPosts (state) {
      return state.favoritesPosts
    }
  }
}
    