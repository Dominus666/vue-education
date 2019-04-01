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
        commit('setLoading', true)
        const favoritePost = payload.id;
        const currentDate = new Date().toString();
        const favoritePostDate = { [favoritePost] : currentDate}
        await fb.database().ref('users').child(`${payload.uid}/favoritesPosts`).update(favoritePostDate)
        commit('setLoading', false)
    },
    async fetchFavoritesPosts ({commit}) {
      commit('setLoading', true)
      const currentUser = this.state.user.user.uid
      const resultFavoritePost = []
      const idFavoritePost = await fb.database().ref(`users/${currentUser}/favoritesPosts`).once('value')
      await Object.keys(idFavoritePost.val()).forEach( async (key)  => {
        const currentFavoritesPosts = await fb.database().ref(`posts/${key}`).once('value')
        resultFavoritePost.push({
          ...currentFavoritesPosts.val(),
          id: key
        })
      })
      commit('FAVORITES_POSTS', resultFavoritePost)
      commit('setLoading', false)
    }
  },
  getters: {
    favoritesPosts (state) {
      return state.favoritesPosts
    }
  }
}
    