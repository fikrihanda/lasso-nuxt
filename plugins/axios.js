export default function ({ store, $axios }) {
  $axios.onError((err) => {
    const response = err.response
    const { status = 500 } = response?.data
    if (status === 401) {
      store.commit('authorization/setMenusMobile', [])
      store.commit('authorization/setRegionals', '')
      store.commit('authorization/setMenusBackoffice', [])
      store.commit('authorization/setInfo', [])
      store.commit('authorization/setToken', '')
    }
    return Promise.reject(err)
  })
}
