const initState = {
  selected: {}
}

export const state = () => initState

export const getters = {
  selected: state => state.selected
}

export const mutations = {
  // eslint-disable-next-line no-return-assign
  setSelected: (state, payload) => state.selected = payload
}
