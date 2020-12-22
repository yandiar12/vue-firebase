
const state = {
  user: {
    loggedIn: false,
    data: null
  }
}

const getters = {
  user(state) {
    return state.user
  }
}

const mutations = {
  SET_LOGGED_IN (state, val) {
    state.user.loggedIn = val
  },
  SET_USER (state, data) {
    state.user.data = data
  }
}

const actions = {
  fetchUser ({ commit }, user) {
    commit('SET_LOGGED_IN', user !== null)
    if (user) {
      commit('SET_USER', {
        displayName: user.displayName,
        email: user.email
      })
    } else {
      commit("SET_USER", null)
    }
  }
}

export default { 
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}