import Vue from 'vue';
import Vuex from 'vuex';
import post from './modules/post'
import favoritesPosts from './modules/favoritesPosts'
import alcoCalc from './modules/alcoCalc'
import common from './modules/common'
import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      post,
      favoritesPosts,
      alcoCalc,
      common,
      user
    }
  })