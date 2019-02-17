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
    async createPost (context, payload) {
      const newPost = {
        title: payload.title,
        description: payload.description
      }
      const post = await fb.database().ref('posts').push(payload)
      context.commit('createPost', {
        ...newPost,
        id: post.key
      });
    },
    async deletePost (context, payload) {
      const deletePost = await fb.database().ref('posts').once('value')
      deletePost.val()
      Object.keys(deletePost.val()).forEach(key => {
        deletePost.val()[key]
          if(payload == key) {
            fb.database().ref('posts').child(key).remove()
          }
        context.commit('deletePost', payload)
      })
    },
    updatePost (context, payload) {
      context.commit('updatePost', payload)
    },
    async fetchPosts({commit}) {
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
        commit('loadPosts', resultPosts)
      })
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