export default function ({ $axios, store }) {
  const token = store.getters['authorization/token']
  $axios.setToken(token, 'Bearer')
}
