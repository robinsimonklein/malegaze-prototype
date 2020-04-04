import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      mobileId: null
  },
  mutations: {
      setMobileId (state, data) {
          state.mobileId = data
      }
  },
  actions: {
  },
  modules: {
  }
})
