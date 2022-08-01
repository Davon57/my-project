import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import loginUser from './loginUser'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginUser
  },
  plugins: [
    createPersistedState({
      // 存储名字
      key: 'laboratory-client',
      // 指定模块
      paths: ['loginUser'],
      storage: window.localStorage
    })
  ]
})
