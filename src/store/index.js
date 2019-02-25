import Vue from 'vue';
import Vuex from 'vuex';
import post from './modules/post'
import common from './modules/common'
import user from './modules/user'
import calculator from './modules/calculator'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      post,
      common,
      user,
      calculator
    }
  })