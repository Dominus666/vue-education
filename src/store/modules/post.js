export default {
  state: {
    posts: [
      {id: '1', img: '', title: 'beer1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '},
      {id: '2', img: '', title: 'beer2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '},
      {id: '3', img: '', title: 'beer3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '},
      {id: '4', img: '', title: 'beer4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '}
    ]
  },
  mutations: {
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
    createPost (context, payload) {
      context.commit('createPost', payload);
    },
    deletePost (context, payload) {
      context.commit('deletePost', payload)
    },
    updatePost (context, payload) {
      context.commit('updatePost', payload)
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