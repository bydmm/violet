import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const modules = {}
const paths = ['userLoginDialog', 'userRegisterDialog',
               'stock', 'user',]

paths.forEach(path => {
  modules[path] = require(`./${path}/index.js`).default
})

const store = new Vuex.Store({
  strict: debug,
  state: {},
  modules
})

export default store
