import * as fb from 'firebase'

export default {
  state: {
    posts: []
  },
  mutations: {
    loadPosts (state, payload) {
      state.posts = payload
    },
    createPost (state, payload) {
      state.posts.unshift(payload)
    },
    deletePost (state, payload) {
      const newPosts = state.posts.filter(el => el.id != payload);
      state.posts = (newPosts)
    },
    updatePost (state, {title, description, id}) {
      const post = state.posts.find(a => {
        return a.id === id
      })
      post.title = title
      post.description = description
    }
  },
  actions: {
    async createPost ({commit}, payload) {
      commit('clearError') 
      commit('setLoading', true)

      try {
        const img = payload.img
        const newPost = {
          title: payload.title,
          description: payload.description,
          userName: payload.userName
        }
        const post = await fb.database().ref('posts').push(payload)
        const fileData = await fb.storage().ref(`posts/${post.key}`).put(img)
        const imgSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await fb.database().ref('posts').child(post.key).update({ imgSrc })
        commit('createPost', {
          ...newPost,
          id: post.key,
          imgSrc
        });
      commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
      
    },
    async deletePost ({commit}, payload) {
      commit('clearError') 
      commit('setLoading', true)
      try {
        const deletePost = await fb.database().ref('posts').once('value')
        deletePost.val()
        Object.keys(deletePost.val()).forEach(key => {
          deletePost.val()[key]
            if(payload == key) {
              fb.database().ref('posts').child(key).remove()
              fb.storage().ref('posts').child(key).delete()
            }
        })
        commit('deletePost', payload)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
      
    },
    async updatePost ({commit}, {title, description, id}) {
      commit('clearError') 
      commit('setLoading', true)
      try {
        await fb.database().ref('posts').child(id).update({
          title,
          description
        })
        commit('updatePost', {title, description, id})
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchPosts({commit}) {
      commit('clearError') 
      commit('setLoading', true)
      try {
        const resultPosts = []
        const postVal = await fb.database().ref('posts').once('value')
        const posts = postVal.val()
        
        Object.keys(posts).forEach(key => {
          const post = posts[key]
          resultPosts.unshift(
            {
              ...post,
              id: key
            }
          )      
        })
        commit('loadPosts', resultPosts)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
   },
  getters: {
    posts (state) {
      return state.posts
    },
    postById (state) {
      return postsId => {
        return state.posts.find(posts => posts.id === postsId)
      }
    }
  }
}