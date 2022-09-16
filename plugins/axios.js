export default function ({ store, $axios, redirect }) {
  $axios.onResponse((res) => {
    const { data } = res
    if (!_.isEmpty(data)) {
      if (!data.success) { return Promise.reject(new Error(data.message)) }
    }
  })
  $axios.onError((err) => {
    const response = err.response
    const status = response?.data?.status ?? 400
    if (status === 401) {
      store.commit('authorization/setMenusMobile', [])
      store.commit('authorization/setRegionals', '')
      store.commit('authorization/setMenusBackoffice', [])
      store.commit('authorization/setInfo', [])
      store.commit('authorization/setToken', '')
      redirect('/login')
    }
    return Promise.reject(err)
  })
}
