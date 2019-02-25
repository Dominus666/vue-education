import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import * as fb from 'firebase/app'
import './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  
  created () {
    var config = {
      apiKey: "AIzaSyCYtNoyLbwj_O0h27Te88QpD0XWwCEhmy0",
      authDomain: "my-blog-c2c89.firebaseapp.com",
      databaseURL: "https://my-blog-c2c89.firebaseio.com",
      projectId: "my-blog-c2c89",
      storageBucket: "my-blog-c2c89.appspot.com",
      messagingSenderId: "725672705260"
    };
    fb.initializeApp(config)
    this.$store.dispatch('fetchPosts')
    fb.auth().onAuthStateChanged(user => {
      if(user) {
        fb.database().ref(`users/${user.uid}`).once('value').then(user => {
          this.$store.dispatch('autoLoginUser', user.val())
        })
      }
    })
  }
}).$mount('#app')
