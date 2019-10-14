import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV === 'development',
  getters,
  modules: {
    app,
    settings,
    user,
    permission
  }
})

export default store
