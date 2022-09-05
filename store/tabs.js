const initState = {
  items: []
}

const checkItem = (items, name) => {
  return items.findIndex(item => item.name === name)
}

export const state = () => initState

export const getters = {
  items: state => state.items
}

export const mutations = {
  add (state, data) {
    const check = checkItem(state.items, data.name)
    if (check === -1) {
      state.items.push(data)
    }
  },
  remove (state, data) {
    const check = checkItem(state.items, data.name)
    if (check !== -1) {
      state.items.splice(check, 1)
    }
  },
  destroy (state) {
    state.items = []
  }
}

export const actions = {
  add ({ commit }, data) {
    commit('add', data)
  },
  remove ({ commit }, data) {
    commit('remove', data)
  },
  destroy ({ commit }) {
    commit('destroy')
  }
}
