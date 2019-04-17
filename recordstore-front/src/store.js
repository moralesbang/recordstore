import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    signedIn: false
  },
  mutations: {
    setSignedIn(state, value) {
      state.signedIn = value
      console.log('New state', state.signedIn)
    }
  },
  actions: {
    toggleSignedIn({ commit, state }) {
      state.signedIn
        ? commit('setSignedIn', false)
        : commit('setSignedIn', true)
    }
  }
})
